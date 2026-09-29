#!/usr/bin/env node
/**
 * IndexNow 批量推送
 *
 * 用途：把站点 URL 主动推给 IndexNow 参与的搜索引擎（Bing / Yandex / Naver /
 *       Seznam / Yep 等），比被动等爬虫发现快得多。Bing 的索引同时供给
 *       Copilot、ChatGPT 搜索与 DuckDuckGo。
 *
 * 前置条件（缺一不可）：
 *   1. 站点根目录放着 key 文件：public/<KEY>.txt，内容**就是 KEY 本身**
 *   2. 该文件已部署上线（脚本会先自检，取不到就直接退出，不做无效推送）
 *
 * 用法：
 *   node scripts/indexnow.cjs                 # 从线上 sitemap 现取 URL 清单（默认，永远最新）
 *   node scripts/indexnow.cjs --file          # 改用本地 scripts/output/submit-urls.txt
 *   node scripts/indexnow.cjs --dry           # 只打印将要推送的内容，不发请求
 *   node scripts/indexnow.cjs https://chatmock.net/ https://chatmock.net/blog   # 只推指定 URL
 *   BASE=https://chatmock.net node scripts/indexnow.cjs
 *
 * 响应码含义（IndexNow 规范）：
 *   200 = 全部接收    202 = 已接收，key 校验待完成（正常）
 *   400 = 请求格式错  403 = key 无效（key 文件内容/路径不对）
 *   422 = URL 不属于该 host，或 key 与 host 不匹配
 *   429 = 请求过于频繁（当天别重复推同一批）
 *
 * 注意：全站 34 条 URL 一次性推送是合规的（单次上限 10,000 条），
 *       但**不要当天反复推同一批**——会被 429，且对收录没有额外好处。
 *       新增页面后再推增量即可。
 */
const fs = require("node:fs");
const path = require("node:path");

const BASE = process.env.BASE || "https://chatmock.net";
const ORIGIN = new URL(BASE).origin;
const HOST = new URL(BASE).hostname;

/** IndexNow 通用端点：一次提交同步给所有参与引擎（无需分别推 Bing/Yandex）。 */
const ENDPOINT = "https://api.indexnow.org/indexnow";

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const explicitUrls = args.filter((a) => a.startsWith("http"));

/** 找出 public/ 里那个 <32位hex>.txt —— key 文件名即 key 内容。 */
function findKey() {
  const pub = path.join(__dirname, "..", "public");
  if (!fs.existsSync(pub)) {
    throw new Error(`找不到 public/ 目录：${pub}`);
  }
  const candidates = fs
    .readdirSync(pub)
    .filter((f) => /^[0-9a-f]{8,128}\.txt$/i.test(f) && f !== "ads.txt");
  if (candidates.length === 0) {
    throw new Error("public/ 下没有形如 <key>.txt 的 IndexNow 密钥文件");
  }
  if (candidates.length > 1) {
    throw new Error(`public/ 下有多个密钥文件，请只留一个：${candidates.join(", ")}`);
  }
  const file = path.join(pub, candidates[0]);
  const key = fs.readFileSync(file, "utf8").trim();
  return { key, fileName: candidates[0], filePath: file };
}

async function fetchSitemapUrls() {
  const res = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap 取回 ${res.status}`);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
  if (urls.length === 0) throw new Error("sitemap 里解析不到任何 <loc>");
  return urls;
}

function fromLocalFile() {
  const p = path.join(__dirname, "output", "submit-urls.txt");
  if (!fs.existsSync(p)) throw new Error(`找不到本地清单：${p}`);
  return fs
    .readFileSync(p, "utf8")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

/**
 * 自检密钥文件是否真的可从站点根取到。
 * 这是 IndexNow 唯一的"所有权证明"机制——文件取不到，推送必然 403/422。
 */
async function verifyKey(key, fileName) {
  const url = `${ORIGIN}/${fileName}`;
  const res = await fetch(url);
  const body = res.ok ? (await res.text()).trim() : "";
  return { url, status: res.status, body, ok: res.ok && body === key };
}

(async () => {
  const { key, fileName } = findKey();
  console.log(`站点       ${ORIGIN}`);
  console.log(`密钥文件   public/${fileName}（${key.length} 字节 hex）`);

  if (!flag("--dry")) {
    const v = await verifyKey(key, fileName);
    console.log(`自检       GET ${v.url} → ${v.status}${v.ok ? " ✅ 内容与 key 一致" : " ❌ 内容不一致或不可达"}`);
    if (!v.ok) {
      console.error(
        "\n密钥文件还没上线（或内容不对），先部署再推。\n" +
          "IndexNow 靠这个文件证明域名归属，跳过自检做推送只会拿到 403/422。",
      );
      process.exit(2);
    }
  }

  let urls;
  if (explicitUrls.length) {
    urls = explicitUrls;
    console.log(`清单来源   命令行指定 ${urls.length} 条`);
  } else if (flag("--file")) {
    urls = fromLocalFile();
    console.log(`清单来源   scripts/output/submit-urls.txt（${urls.length} 条）`);
  } else {
    urls = await fetchSitemapUrls();
    console.log(`清单来源   线上 sitemap.xml（${urls.length} 条）`);
  }

  const foreign = urls.filter((u) => new URL(u).hostname !== HOST);
  if (foreign.length) {
    console.error(`\n以下 URL 不属于 ${HOST}，IndexNow 会整批 422，已中止：`);
    for (const u of foreign) console.error(`  ${u}`);
    process.exit(3);
  }

  console.log(`\n待推送 ${urls.length} 条：`);
  for (const u of urls) console.log(`  ${u}`);

  if (flag("--dry")) {
    console.log("\n（--dry：只打印，未发送请求）");
    return;
  }

  const payload = {
    host: HOST,
    key,
    keyLocation: `${ORIGIN}/${fileName}`,
    urlList: urls,
  };

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  const MEANING = {
    200: "全部接收",
    202: "已接收，key 校验待完成（正常）",
    400: "请求格式错误",
    403: "key 无效——检查 key 文件内容与路径",
    422: "URL 不属于该 host，或 key 与 host 不匹配",
    429: "请求过于频繁——当天不要重复推同一批",
  };
  console.log(
    `\nPOST ${ENDPOINT}\n  → ${res.status} ${res.statusText}  ${MEANING[res.status] || "（未列出的响应码，请查 IndexNow 文档）"}`,
  );
  const body = await res.text();
  if (body) console.log(`  body: ${body.slice(0, 300)}`);

  process.exit(res.ok || res.status === 202 ? 0 : 1);
})();
