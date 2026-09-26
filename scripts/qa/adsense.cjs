/**
 * AdSense 接入验收：ads.txt + AdSense 代码段（真实浏览器）
 *
 * 检查项：
 *  1. {BASE}/ads.txt 返回 200 + text/plain，且内容与 pub-id 行**逐字符一致**（含结尾换行）
 *  2. 预渲染 HTML 里存在**真实可抓取**的 <script ... adsbygoogle ...>（不是只有 preload link）
 *  3. 该 script 出现在 <head> 内
 *  4. 浏览器实跑：pagead2.googlesyndication.com 脚本返回 200，且 window.adsbygoogle 存在
 *  5. 首页 console / pageerror 干净
 *  6. 站点仍不投放广告（页面里不得出现 <ins class="adsbygoogle">，审核期要求）
 *
 * ⚠️ 常见坑：Next.js App Router 里用 next/script 的 beforeInteractive 只会输出
 *    `<link rel=preload as=script>`，真实 <script> 由运行时客户端注入 —— 原始 HTML 抓不到，
 *    AdSense 代码段验证会失败。必须渲染**原生 <script async src>**（React 19 会提升进 <head>）。
 *
 * 用法：BASE=https://chatmock.net node scripts/qa/adsense.cjs
 */
const { chromium } = require("playwright-core");
const fs = require("fs");

const BASE = process.env.BASE || "http://localhost:3000";
const EXPECT =
  process.env.ADS_TXT_LINE ||
  fs.readFileSync("public/ads.txt", "utf8").replace(/\r\n/g, "\n");

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
    args: ["--disable-blink-features=AutomationControlled"],
  });
  const ctx = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  });
  const page = await ctx.newPage();
  const errors = [];
  const gReq = [];
  page.on("pageerror", (e) => errors.push(String(e).slice(0, 160)));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text().slice(0, 160));
  });
  page.on("response", (r) => {
    if (r.url().includes("pagead2.googlesyndication.com"))
      gReq.push(r.status() + " " + r.url().slice(0, 80));
  });

  try {
    // --- 1) ads.txt ---
    const res = await ctx.request.get(`${BASE}/ads.txt`);
    const body = (await res.text()).replace(/\r\n/g, "\n");
    report(
      "ads.txt served",
      res.status() === 200 && /text\/plain/.test(res.headers()["content-type"] || ""),
      `${res.status()} ${res.headers()["content-type"]} (${body.trim().length} 字符)`,
    );
    report(
      "ads.txt content exact",
      body === EXPECT,
      body === EXPECT
        ? JSON.stringify(body)
        : `内容不一致 → 实际 ${JSON.stringify(body)} / 期望 ${JSON.stringify(EXPECT)}`,
    );

    // --- 2/3) 原始 HTML 里的 script ---
    await page.goto(BASE + "/", { waitUntil: "load" });
    const dom = await page.content();
    const tags = [...dom.matchAll(/<script[^>]*adsbygoogle[^>]*>/g)].map((m) => m[0]);
    const html = await (await ctx.request.get(BASE + "/")).text();
    const rawTags = [...html.matchAll(/<script[^>]*adsbygoogle[^>]*>/g)].map((m) => m[0]);
    report(
      "script in prerendered HTML",
      rawTags.length === 1,
      rawTags.length === 1
        ? rawTags[0]
        : `找到 ${rawTags.length} 条（期望 1 条真实 script；只有 preload link 说明用了 next/script）`,
    );
    const headEnd = html.indexOf("</head>");
    const idx = html.indexOf("adsbygoogle");
    report("script in <head>", idx > 0 && idx < headEnd, `字节 ${idx} < </head> ${headEnd}`);

    // --- 4) 脚本真的能加载 ---
    await page.waitForTimeout(2500);
    const ok = gReq.some((s) => s.startsWith("200"));
    report(
      "adsense script loads",
      ok,
      gReq.join(" | ") || "未观察到对 pagead2.googlesyndication.com 的请求（可能被网络拦截）",
    );
    const hasGlobal = await page.evaluate(() => typeof window.adsbygoogle === "object");
    report("window.adsbygoogle present", hasGlobal, `typeof = ${hasGlobal ? "object" : "undefined"}`);

    // --- 5) console ---
    const real = errors.filter((e) => !/404|Failed to load resource|ERR_BLOCKED/.test(e));
    report("console clean", real.length === 0, real.length ? real.join(" | ") : "无异常报错");

    // --- 6) 审核期不得出现"我们放的"广告位 ---
    // 注意：AdSense 脚本自己会注入一个 <ins class="adsbygoogle adsbygoogle-noablate">（反广告拦截探针），
    // 它是 display:none + 0×0 + data-ad-status="unfilled"，没有视觉占位 —— 不能当成广告位。
    const rawSlots = [...html.matchAll(/<ins[^>]*adsbygoogle[^>]*>/g)].length;
    report("no slots in our HTML", rawSlots === 0, `预渲染 HTML 里 <ins adsbygoogle> = ${rawSlots}（我们不放广告位）`);
    const visible = await page.evaluate(
      () =>
        [...document.querySelectorAll("ins.adsbygoogle")].filter((el) => {
          if (el.classList.contains("adsbygoogle-noablate")) return false;
          const r = el.getBoundingClientRect();
          return r.width > 1 && r.height > 1;
        }).length,
    );
    report("no visible ad on page", visible === 0, `可见广告位 ${visible} 个（脚本注入的 noablate 探针已排除）`);

    // --- 7) 成本透明：AdSense 引入的第三方请求与体积（不计入 Vercel edge requests）---
    const third = await page.evaluate(() =>
      performance
        .getEntriesByType("resource")
        .filter((e) => /pagead2\.googlesyndication\.com|doubleclick|google\.com\/pagead/.test(e.name))
        .map((e) => ({ name: e.name.split("?")[0], kb: Math.round((e.transferSize || 0) / 102.4) / 10 })),
    );
    const kb = Math.round(third.reduce((s, x) => s + x.kb, 0) * 10) / 10;
    console.log(`INFO  third-party cost  —  ${third.length} 条请求 / ${kb} kB（域名：${[...new Set(third.map((t) => t.name))].join(", ") || "无"}）`);
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
