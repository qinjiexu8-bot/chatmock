/**
 * Vercel Web Analytics 接线验收（真实浏览器 + 真实请求观测）
 *
 * ⚠️ 关键前提：Vercel 的 collector 脚本（observability script v0.1.3）开头就有
 *    `if (navigator.webdriver || UA.includes("Headless")) return;` —— 无头自动化流量被
 *    官方主动排除。所以本脚本必须绕过这两条判定（--disable-blink-features=AutomationControlled
 *    + 覆盖掉 User-Agent 里的 Headless 字样），否则会出现"脚本 200 但不执行、没有信标"
 *    的假阴性。这不是站点问题。
 *
 * 检查项：
 *  1. 预渲染 HTML 不含 analytics 痕迹（脚本是客户端注入，首屏零影响）
 *  2. <head> 注入了同名源 collector 脚本（线上路径形如 /<hash>/script.js，本地为 /_vercel/insights/script.js）
 *     —— 脚本路径与上报端点由平台下发的 NEXT_PUBLIC_VERCEL_OBSERVABILITY_* 决定，不要写死
 *  3. 该脚本带 defer 且返回 2xx
 *  4. window.va 已被真实实现接管（不再是只入队的 stub）⇒ 脚本确实执行了
 *  5. SPA 内点击导航触发一次 pageview 上报
 *  6. view 信标落到 collector 的 view 端点且状态 < 400 ⇒ 后台确实在收数
 *  7. 未引入 speed-insights，console 无异常
 *
 * 用法：BASE=https://chatmock.net node scripts/qa/analytics.cjs
 *      本地跑（collector 脚本必 404）时第 3/5/6 项标注为预期失败。
 */
const { chromium } = require("playwright-core");

const BASE = process.env.BASE || "http://localhost:3000";
const IS_LOCAL = /localhost|127\.0\.0\.1/.test(BASE);
const UA =
  process.env.QA_UA ||
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36";

const results = [];
function report(name, pass, detail) {
  results.push({ name, pass });
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}  —  ${detail}`);
}
/**
 * 本地跑时 collector 脚本必然 404（该端点只存在于 Vercel 平台），
 * 连带第 3~6 项无意义 —— 记 SKIP 而不是 FAIL，避免污染 CI 退出码。
 */
function reportOrSkip(name, pass, detail, localSkipNote) {
  if (IS_LOCAL && !pass) {
    results.push({ name, pass: true });
    console.log(`SKIP  ${name}  —  ${localSkipNote}`);
    return;
  }
  report(name, pass, detail);
}

(async () => {
  const browser = await chromium.launch({
    executablePath:
      process.env.CHROME_PATH ||
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--disable-blink-features=AutomationControlled"],
  });
  const ctx = await browser.newContext({ userAgent: UA });
  const page = await ctx.newPage();

  // 端点不写死：默认是 /_vercel/insights/{view,event}，线上由 dataset 覆盖为 /<hash>/{view,event}
  const isBeacon = (u) => /\/(view|event|session)$/.test(new URL(u).pathname);
  const isCollector = (u) => /script\.js$/.test(new URL(u).pathname) && !u.includes("/_next/static");

  const trk = [];
  const errors = [];
  page.on("request", (r) => {
    if (/_rsc=/.test(r.url())) return;
    if (isBeacon(r.url()) || isCollector(r.url()))
      trk.push({ req: r, url: r.url(), method: r.method(), type: r.resourceType() });
  });
  page.on("response", (r) => {
    const hit = trk.find((x) => x.req === r.request());
    if (hit) hit.status = r.status();
  });
  page.on("pageerror", (e) => errors.push(String(e).slice(0, 160)));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text().slice(0, 160));
  });

  const collectorSrc = () =>
    page.evaluate(() =>
      [...document.head.querySelectorAll("script[src]")]
        .map((s) => s.getAttribute("src"))
        .find((s) => /script\.js$/.test(s) && !s.startsWith("/_next")),
    );

  try {
    // --- 1) 原始 HTML 不含 analytics 痕迹 ---
    const raw = await (await ctx.request.get(BASE + "/")).text();
    report(
      "static HTML clean",
      !/insights|vercel-scripts/.test(raw),
      /insights|vercel-scripts/.test(raw)
        ? "静态 HTML 里出现了 analytics 脚本"
        : "预渲染 HTML 无 analytics 脚本（首屏请求数零变化）",
    );

    await page.goto(BASE + "/", { waitUntil: "load" });
    // 等 hydration（React 挂上后才会有 window.va）
    await page.waitForFunction(() => typeof window.va === "function").catch(() => {});
    await page.waitForTimeout(2500);

    // --- 2) 注入脚本 ---
    const src = await collectorSrc();
    report("script injected", !!src, src || "head 里没有找到 collector 脚本");

    // --- 3) defer + 2xx ---
    const tag = await page.evaluate(() => {
      const s = [...document.head.querySelectorAll("script[src]")].find(
        (x) => /script\.js$/.test(x.getAttribute("src")) && !x.getAttribute("src").startsWith("/_next"),
      );
      return s ? { defer: s.hasAttribute("defer") } : null;
    });
    const scriptReq = trk.find((r) => isCollector(r.url));
    reportOrSkip(
      "script loaded",
      !!scriptReq && scriptReq.status >= 200 && scriptReq.status < 300 && tag && tag.defer,
      scriptReq
        ? `${scriptReq.status} ${scriptReq.url} defer=${tag ? tag.defer : "?"}`
        : "未发出 collector 脚本请求",
      "本地无 collector 端点（线上为 200），跳过",
    );

    // --- 4) window.va 是否被真实实现接管 ---
    const vaImpl = await page.evaluate(() => String(window.va));
    const real = typeof vaImpl === "string" && !vaImpl.includes("vaq.push") && vaImpl.length > 4;
    reportOrSkip(
      "collector took over",
      real,
      real
        ? "window.va 已是真实实现（脚本执行成功）"
        : "window.va 仍是入队 stub（脚本未执行：本地 404，或浏览器被判为自动化流量）",
      "本地 collector 404，window.va 停留在入队 stub（预期）",
    );

    // --- 5) SPA 内点击导航 → 再次 pageview（用真实点击，等 URL 变化）---
    const before = trk.filter((r) => isBeacon(r.url)).length;
    let nav = "未发生";
    const link = await page.evaluate(() => {
      const a = [...document.querySelectorAll('a[href^="/"]')].find(
        (x) => /generator/.test(x.getAttribute("href")) && x.offsetParent !== null,
      );
      return a ? a.getAttribute("href") : null;
    });
    if (link) {
      await page.click(`a[href="${link}"]`).catch(() => {});
      await page.waitForURL(`**${link}`, { timeout: 8000 }).catch(() => {});
      await page.waitForTimeout(2000);
      nav = `${link} → ${page.url()}`;
    }
    const beacons = trk.filter((r) => isBeacon(r.url));
    reportOrSkip(
      "SPA nav reported",
      beacons.length > before,
      link ? `点击 ${nav}，view 信标 ${before} -> ${beacons.length}` : "首页没找到可点的站内 generator 链接",
      `本地无 collector，信标不产生（页面跳转本身已发生：${nav}）`,
    );

    // --- 6) 信标状态（决定后台是否真在收数）---
    reportOrSkip(
      "beacon accepted",
      beacons.length > 0 && beacons.some((b) => b.status < 400),
      beacons.length
        ? beacons
            .map(
              (b) =>
                `${b.method} ${b.status === undefined ? "（响应未在观测窗口内返回/keepalive）" : b.status} ${b.url}`,
            )
            .join(" | ")
        : "未发出 view 信标（线上若无信标说明后台未开启 Analytics）",
      "本地无 collector，无信标（预期）",
    );

    // --- 7) 无额外 SDK、console 干净 ---
    report(
      "no extra SDK",
      !trk.some((r) => r.url.includes("speed-insights")),
      `analytics 相关请求 ${trk.length} 条：${trk.map((r) => r.url).join(", ") || "无"}`,
    );
    const realErrors = errors.filter((e) => !/404|Failed to load resource/.test(e));
    report("console clean", realErrors.length === 0, realErrors.length ? realErrors.join(" | ") : "无异常报错");
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
