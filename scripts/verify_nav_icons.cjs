/* 验证：More 下拉图标、移动菜单图标、切换条图标、面包屑、博客 OG 图 */
const { chromium } = require("playwright-core");

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ["--disable-gpu", "--no-sandbox"],
  });
  const results = [];
  const check = (name, ok) => {
    results.push(`${ok ? "PASS" : "FAIL"} ${name}`);
  };

  // 1. 桌面：More 下拉展开，含 6 项 + 图标
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("http://localhost:3000/messenger-chat-generator", { waitUntil: "networkidle" });
  await page.click('button:has-text("More")');
  await page.waitForTimeout(300);
  const dropItems = await page.locator('nav .menu-pop a').count();
  check(`dropdown has 6 items (got ${dropItems})`, dropItems === 6);
  const dropIcons = await page.locator('nav .menu-pop a svg').count();
  check(`dropdown has icons (got ${dropIcons})`, dropIcons === 6);
  await page.screenshot({ path: "scripts/output/verify-more-icons.png" });
  // 面包屑存在
  const crumb = await page.locator('nav[aria-label="Breadcrumb"]').innerText();
  check(`breadcrumb text ok (${crumb.replace(/\n/g, " ")})`, /Home/.test(crumb) && /Messenger/.test(crumb));
  await page.screenshot({ path: "scripts/output/verify-breadcrumb.png", clip: { x: 0, y: 0, width: 900, height: 420 } });

  // 2. 切换条图标
  const stripIcons = await page.locator('a[href="/whatsapp-chat-generator"] svg').count();
  check(`switcher strip has icons (got ${stripIcons})`, stripIcons >= 1);

  // 3. 移动端：汉堡菜单图标
  const mob = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mob.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await mob.click('button[aria-label="Open menu"]');
  await mob.waitForTimeout(300);
  const mobIcons = await mob.locator("header .menu-pop a svg").count();
  check(`mobile menu has icons (got ${mobIcons})`, mobIcons === 10);
  await mob.screenshot({ path: "scripts/output/verify-mobile-icons.png" });

  // 4. 博客 OG 图 meta
  const blog = await browser.newPage();
  await blog.goto("http://localhost:3000/blog/how-to-make-a-fake-whatsapp-chat", { waitUntil: "networkidle" });
  const og = await blog.locator('meta[property="og:image"]').getAttribute("content");
  check(`blog og:image (${og})`, og && og.includes("/og/blog/how-to-make-a-fake-whatsapp-chat"));

  // 5. OG 图可访问
  const res = await page.request.get("http://localhost:3000/og/blog/how-to-make-a-fake-whatsapp-chat");
  check(`og image status ${res.status()} ${res.headers()["content-type"]}`, res.status() === 200 && res.headers()["content-type"].includes("png"));

  check(`zero console errors`, errors.length === 0);
  console.log(results.join("\n"));
  await browser.close();
  process.exit(results.some((r) => r.startsWith("FAIL")) ? 1 : 0);
})();
