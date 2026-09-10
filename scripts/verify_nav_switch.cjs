const { chromium } = require("playwright-core");

(async () => {
  const browser = await chromium.launch({ headless: true, args: ["--disable-gpu", "--no-sandbox"] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. 生成器页：切换条
  await page.goto("http://localhost:3000/messenger-chat-generator", { waitUntil: "networkidle" });
  const strip = page.locator("a[href='/android-sms-generator']");
  console.log("switch strip android link count:", await strip.count());
  await page.screenshot({ path: "scripts/output/verify-switch-strip.png" });

  // 点击切换条中的 Android SMS，验证一键横跳
  await strip.first().click();
  await page.waitForLoadState("networkidle");
  console.log("after click url:", page.url());
  const h1 = await page.locator("h1").first().textContent();
  console.log("h1:", h1);

  // 2. 桌面导航 More 下拉
  const moreBtn = page.locator("header button:has-text('More')");
  console.log("more button count:", await moreBtn.count());
  await moreBtn.click();
  await page.waitForTimeout(300);
  const dropdownLinks = await page.locator(".menu-pop a").allTextContents();
  console.log("dropdown items:", dropdownLinks.join(", "));
  await page.screenshot({ path: "scripts/output/verify-more-dropdown.png" });

  // 3. 移动端：切换条横向滚动
  const mp = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mp.goto("http://localhost:3000/android-sms-generator", { waitUntil: "networkidle" });
  await mp.screenshot({ path: "scripts/output/verify-mobile-strip.png" });

  // 4. 控制台错误检查
  const errors = [];
  const cp = await browser.newPage();
  cp.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  await cp.goto("http://localhost:3000/whatsapp-chat-generator", { waitUntil: "networkidle" });
  console.log("console errors:", errors.length);

  await browser.close();
})();
