/** 全站 JSON-LD 结构化数据校验：解析每页所有 ld+json 块，报告类型与解析错误 */
const { chromium } = require("playwright-core");
const fs = require("fs");

(async () => {
  const routes = fs
    .readFileSync("/tmp/routes.txt", "utf8")
    .split("\n")
    .filter(Boolean);
  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });
  const page = await browser.newPage();
  const problems = [];
  const typeCount = {};
  let ok = 0;

  for (const r of routes) {
    await page.goto(`http://localhost:3000${r}`, { waitUntil: "domcontentloaded" });
    const blocks = await page.evaluate(() =>
      [...document.querySelectorAll('script[type="application/ld+json"]')].map(
        (s) => s.textContent
      )
    );
    if (!blocks.length) {
      problems.push(`${r}: 无 JSON-LD`);
      continue;
    }
    for (const b of blocks) {
      try {
        const data = JSON.parse(b);
        const types = [].concat(data["@type"] || []);
        types.forEach((t) => (typeCount[t] = (typeCount[t] || 0) + 1));
        ok++;
      } catch (e) {
        problems.push(`${r}: JSON 解析失败 — ${e.message.slice(0, 60)}`);
      }
    }
    // 顺带检查 canonical 与 og:title
    const meta = await page.evaluate(() => ({
      canonical: !!document.querySelector('link[rel="canonical"]'),
      og: !!document.querySelector('meta[property="og:title"]'),
      twitter: !!document.querySelector('meta[name="twitter:card"]'),
    }));
    if (!meta.canonical || !meta.og || !meta.twitter)
      problems.push(`${r}: canonical=${meta.canonical} og=${meta.og} twitter=${meta.twitter}`);
  }

  await browser.close();
  console.log(`JSON-LD 块解析成功: ${ok} | 类型分布:`, typeCount);
  console.log(problems.length ? "问题:\n" + problems.join("\n") : "问题: 无");
})();
