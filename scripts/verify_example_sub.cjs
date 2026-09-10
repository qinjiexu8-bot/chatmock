const { chromium } = require("playwright-core");

(async () => {
  const browser = await chromium.launch({ headless: true, args: ["--disable-gpu", "--no-sandbox"] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000/examples/whatsapp-chat-generator", { waitUntil: "networkidle" });
  await page.screenshot({ path: "scripts/output/verify-example-sub.png" });
  // 滚到画廊区
  await page.evaluate(() => window.scrollTo(0, 700));
  await page.waitForTimeout(300);
  await page.screenshot({ path: "scripts/output/verify-example-sub-gallery.png" });

  // 总览页 pills 链接检查
  await page.goto("http://localhost:3000/examples", { waitUntil: "networkidle" });
  const pill = page.locator("a[href='/examples/android-sms-generator']").first();
  console.log("overview pill to sub-gallery:", await pill.count());

  // 工具页 "See examples" 直达子画廊
  await page.goto("http://localhost:3000/telegram-chat-generator", { waitUntil: "networkidle" });
  const seeLink = page.locator("a[href='/examples/telegram-chat-generator']");
  console.log("generator -> sub-gallery link:", await seeLink.count());

  await browser.close();
})();
