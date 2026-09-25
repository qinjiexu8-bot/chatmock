/**
 * Vercel Web Analytics 接线验收（真实浏览器 + 真实请求观测）
 *
 * 检查项：
 *  1. <head> 里被注入 script[src*="/_vercel/insights/script.js"]（客户端 effect 注入，不进静态 HTML）
 *  2. 该脚本确实被请求（本地必然 404，Vercel 上是 200——这正说明"只在平台上生效"）
 *  3. 脚本带 defer（不阻塞首屏）
 *  4. window.va 队列存在（SDK 已初始化）
 *  5. 客户端路由跳转后 vaq 增长（SPA 内每次导航都记一次 pageview）
 *  6. 静态 HTML（未执行 JS 的原始响应）里**不含** analytics 脚本 —— 不影响首屏/预渲染
 *  7. 未引入 GA4 之外的额外阻塞资源，console 无异常报错
 *
 * 用法：BASE=https://chatmock.net node scripts/qa/analytics.cjs
 */
const { chromium } = require("playwright-core");

const BASE = process.env.BASE || "http://localhost:3000";
const results = [];
function report(name, pass, detail) {
  results.push({ name, pass });
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}  —  ${detail}`);
}

(async () => {
  const browser = await chromium.launch({
    executablePath:
      process.env.CHROME_PATH ||
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });
  const ctx = await browser.newContext();
  const page = await ctx.newPage();

  const reqs = [];
  const errors = [];
  page.on("request", (r) => {
    if (r.url().includes("_vercel/insights") || r.url().includes("_vercel/speed-insights"))
      reqs.push({ url: r.url(), type: r.resourceType(), method: r.method() });
  });
  page.on("response", (r) => {
    if (r.url().includes("_vercel/insights")) {
      const hit = reqs.find((x) => x.url === r.url() && !x.status);
      if (hit) hit.status = r.status();
    }
  });
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text().slice(0, 160));
  });

  try {
    // --- 6) 原始 HTML（不执行 JS）不含 analytics 脚本 ---
    const raw = await (await ctx.request.get(BASE + "/")).text();
    report(
      "static HTML clean",
      !raw.includes("_vercel/insights"),
      raw.includes("_vercel/insights") ? "静态 HTML 里出现了 insights 脚本" : "预渲染 HTML 无 analytics 脚本（首屏零影响）",
    );

    await page.goto(BASE + "/", { waitUntil: "load" });
    await page.waitForTimeout(1500);

    // --- 1) head 注入 ---
    const src = await page.evaluate(() => {
      const s = document.head.querySelector('script[src*="/_vercel/insights/script.js"]');
      return s ? s.getAttribute("src") : null;
    });
    report("script injected", !!src, src || "head 里没有找到 insights 脚本");

    // --- 3) defer ---
    const defer = await page.evaluate(() => {
      const s = document.head.querySelector('script[src*="/_vercel/insights/script.js"]');
      return s ? s.hasAttribute("defer") : null;
    });
    report("script deferred", defer === true, `defer=${defer}`);

    // --- 4) window.va ---
    const hasVa = await page.evaluate(() => typeof window.va === "function");
    report("window.va ready", hasVa, `window.va 已初始化 = ${hasVa}`);

    // --- 5) SPA 内客户端跳转也记一次 pageview（同一 document 内队列增长）---
    const before = await page.evaluate(() => (window.vaq || []).length);
    const clicked = await page.evaluate(() => {
      const a = [...document.querySelectorAll('a[href^="/"]')].find(
        (x) => /generator/.test(x.getAttribute("href")) && !x.getAttribute("href").includes("#"),
      );
      if (!a) return null;
      const href = a.getAttribute("href");
      a.click();
      return href;
    });
    await page.waitForTimeout(1500);
    const after = await page.evaluate(() => (window.vaq || []).length);
    const url = page.url();
    report(
      "SPA nav pageview",
      !!clicked && after > before,
      clicked
        ? `点击 ${clicked} → ${url}，vaq ${before} -> ${after}`
        : "首页没找到可点的站内 generator 链接",
    );

    // --- 2) 脚本被请求（本地 404 属预期）---
    const scriptReq = reqs.find((r) => r.url.includes("script.js"));
    report(
      "script requested",
      !!scriptReq,
      scriptReq
        ? `${scriptReq.status || "?"} ${scriptReq.url}${scriptReq.status === 404 ? "（本地 404 属预期，Vercel 上为 200）" : ""}`
        : "未发出 script.js 请求",
    );

    // --- 6b) 未引入 speed-insights ---
    report(
      "no extra insights",
      !reqs.some((r) => r.url.includes("speed-insights")),
      `insights 请求 ${reqs.length} 条（script.js 每次硬导航 1 条；Vercel 上受缓存头影响）`,
    );

    // --- 7) console（本地 script.js 404 属预期，不计入）---
    const realErrors = errors.filter(
      (e) => !/Vercel Web Analytics/.test(e) && !/404/.test(e),
    );
    report("console clean", realErrors.length === 0, realErrors.length ? realErrors.join(" | ") : "无异常报错");

    console.log(`\nvaq=${after}（已上报/排队的事件数，本地 404 时停留在队列）`);
    console.log("insights requests:", JSON.stringify(reqs, null, 2));
  } catch (e) {
    report("EXCEPTION", false, String(e).slice(0, 200));
  } finally {
    await ctx.close();
    await browser.close();
  }

  const fails = results.filter((r) => !r.pass);
  console.log(`\n===== ${results.length - fails.length}/${results.length} PASS =====`);
  if (fails.length) {
    console.log("FAILED:", fails.map((f) => f.name).join(", "));
    process.exit(1);
  }
})();
