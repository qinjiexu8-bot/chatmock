/**
 * Edge Requests 分类计数（可复用）
 *
 * 用途：给《Vercel Edge Requests 审计》提供可复现的数字——冷缓存首访 / 同上下文复访
 *       各命中多少条请求，其中多少条**真走网络**（=真计入 Vercel edge requests），
 *       以及 RSC 预取占了多少。
 *
 * 用法：
 *   node scripts/qa/edge-requests.cjs                     # 默认测 / 与 /whatsapp-chat-generator
 *   node scripts/qa/edge-requests.cjs / /examples /blog   # 指定路径
 *   BASE=https://chatmock.net node scripts/qa/edge-requests.cjs   # 指向线上
 *
 * 方法学（重要，两个坑都踩过，别再退化）：
 *
 *   坑 1：`page.on("request")` 对**缓存命中**同样派发事件，所以它给出的总数会把
 *        immutable 的 /_next/static/* 缓存命中一起算进来，明显虚高。
 *        ⇒ 它只能用来枚举「派发了哪些请求」，不能当"真走网络"的判据。
 *
 *   坑 2：CDP `Network.responseReceived` 的 `response.fromDiskCache` 在
 *        Chromium 近年版本上**不可靠**——实测 immutable 的 css/font/js 在复访时
 *        仍报 fromDiskCache=false，等于判据全假。别用它。
 *
 *   ⇒ 正确判据是 **Resource Timing 的 `transferSize > 0`**（本站资源无跨域限制，
 *      数值可信）。304 条件请求同样计入：它真走了边缘，只是转移体小。
 *      （这也是本审计早期基线 41/12 用的口径，换口径就没法前后对比。）
 *
 * 所以这里两条腿走路：
 *   - CDP request 事件 → 枚举 + 分类（拿到 URL 与类型）
 *   - Resource Timing  → 判定每个 URL 是否真走网络（transferSize > 0）
 *
 * 计数口径：
 *   - 只统计指向本站的请求；第三方（AdSense / doubleclick 等）单列，**不计入 Vercel edge requests**
 *   - `?_rsc=` 归入 prefetch 桶：next/link 预取的 RSC 载荷，是本审计的主要优化对象。
 *     它响应头是 `max-age=0, must-revalidate` ⇒ **每次派发都是一次真请求**，无法靠缓存省掉
 *   - 冷缓存 = 全新 context 首次访问；复访 = 同一 context 内 reload（模拟真实用户的第二次 PV）
 *
 * 注意：不使用 waitUntil "networkidle"——站上挂了 AdSense 后第三方持续轮询，
 * networkidle 几乎永不满足（详见项目 MEMORY.md 的验证纪律）。
 */
const { chromium } = require("playwright-core");

const BASE = process.env.BASE || "http://localhost:3000";
const BASE_HOST = new URL(BASE).hostname;
const WAIT_MS = Number(process.env.WAIT_MS || 3000);

const CATEGORIES = ["document", "prefetch(rsc)", "js", "css", "font", "image", "other"];

function categorize(url, type) {
  let host;
  try {
    host = new URL(url).hostname;
  } catch {
    return null;
  }
  if (host !== BASE_HOST) return "third-party";

  if (type === "Document") return "document";
  if (/[?&]_rsc=/.test(url)) return "prefetch(rsc)";
  if (type === "Script") return "js";
  if (type === "Stylesheet") return "css";
  if (type === "Font") return "font";
  if (type === "Image") return "image";
  return "other";
}

/** 取 Resource Timing，返回 transferSize > 0 的 URL 集合（= 真走网络）。 */
async function networkedUrls(page) {
  const entries = await page.evaluate(() => {
    const out = performance.getEntriesByType("resource").map((e) => ({
      name: e.name,
      transferSize: e.transferSize,
    }));
    const nav = performance.getEntriesByType("navigation")[0];
    if (nav) out.push({ name: nav.name, transferSize: nav.transferSize });
    return out;
  });
  return new Set(entries.filter((e) => e.transferSize > 0).map((e) => e.name));
}

/** 访问一次，返回本站请求记录（net = 是否真走网络）。 */
async function visit(page, path) {
  const records = [];
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Network.enable");

  const onRequest = ({ requestId, request, type }) => {
    const bucket = categorize(request.url, type);
    if (!bucket) return;
    records.push({ requestId, url: request.url, type, bucket, status: null, net: false });
  };
  const onResponse = ({ requestId, response }) => {
    const rec = records.find((r) => r.requestId === requestId);
    if (rec) rec.status = response.status;
  };

  cdp.on("Network.requestWillBeSent", onRequest);
  cdp.on("Network.responseReceived", onResponse);

  try {
    await page.goto(BASE + path, { waitUntil: "load", timeout: 45000 });
    await page.waitForTimeout(WAIT_MS);
    const net = await networkedUrls(page);
    for (const r of records) r.net = net.has(r.url);
  } finally {
    cdp.off("Network.requestWillBeSent", onRequest);
    cdp.off("Network.responseReceived", onResponse);
    await cdp.detach().catch(() => {});
  }
  return records;
}

function summarize(records) {
  const counts = Object.fromEntries(CATEGORIES.map((c) => [c, { dispatched: 0, net: 0 }]));
  const third = { dispatched: 0, net: 0 };

  for (const r of records) {
    const target = r.bucket === "third-party" ? third : counts[r.bucket];
    target.dispatched += 1;
    if (r.net) target.net += 1;
  }

  const sum = (key) => Object.values(counts).reduce((a, c) => a + c[key], 0);
  return { counts, third, dispatched: sum("dispatched"), net: sum("net") };
}

function fmt(s) {
  const parts = CATEGORIES.filter((c) => s.counts[c].dispatched > 0).map(
    (c) => `${c}=${s.counts[c].net}/${s.counts[c].dispatched}`,
  );
  return (
    `真走网络 ${String(s.net).padStart(3)} 条 / 派发 ${String(s.dispatched).padStart(3)} 条` +
    `  (${parts.join(" ")}；格式=真走网络/派发)  第三方(不计)=${s.third.dispatched}`
  );
}

(async () => {
  const paths = process.argv.slice(2).filter((a) => a.startsWith("/"));
  const targets = paths.length ? paths : ["/", "/whatsapp-chat-generator"];

  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--disable-blink-features=AutomationControlled"],
  });

  console.log(`BASE = ${BASE}\n`);
  const table = {};

  for (const path of targets) {
    const ctx = await browser.newContext({
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      viewport: { width: 1440, height: 900 },
    });
    const page = await ctx.newPage();

    const cold = summarize(await visit(page, path));
    const warmRecords = await visit(page, path);
    const warm = summarize(warmRecords);
    table[path] = { cold, warm };

    console.log(`${path}`);
    console.log(`  冷缓存首访  ${fmt(cold)}`);
    console.log(`  同会话复访  ${fmt(warm)}`);
    const pf = warmRecords.filter((r) => r.bucket === "prefetch(rsc)");
    console.log(`  复访期 RSC 预取 ${pf.length} 条（真走网络 ${pf.filter((r) => r.net).length} 条）:`);
    for (const r of pf) console.log(`      ${r.url.replace(BASE, "")}`);
    console.log("");

    await ctx.close();
  }

  const sumNet = (k) => targets.reduce((a, p) => a + table[p][k].net, 0);
  const sumPf = (k) => targets.reduce((a, p) => a + table[p][k].counts["prefetch(rsc)"].net, 0);

  const coldNet = sumNet("cold");
  const warmNet = sumNet("warm");
  const warmPf = sumPf("warm");
  console.log(
    `合计：冷缓存真走网络 ${coldNet} 条 / 复访真走网络 ${warmNet} 条；` +
      `复访中预取 ${warmPf} 条` +
      (warmNet ? `（占复访 ${Math.round((warmPf / warmNet) * 100)}%）` : ""),
  );

  await browser.close();
})();
