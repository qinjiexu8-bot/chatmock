/* Visual check: crop the status bar area of iOS (whatsapp) and Android (android-sms) generators. */
const { chromium } = require("playwright-core");

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ["--disable-gpu", "--no-sandbox", "--disable-software-rasterizer"],
  });

  for (const [slug, label] of [
    ["whatsapp-chat-generator", "ios"],
    ["android-sms-generator", "android"],
  ]) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 960 }, deviceScaleFactor: 3 });
    await page.goto(`http://localhost:3000/${slug}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);
    const el = page.locator("[data-export-root]");
    const box = await el.boundingBox();
    // 只截顶部状态栏区域
    await page.screenshot({
      path: `scripts/output/verify-wifi-${label}.png`,
      clip: { x: box.x, y: box.y, width: box.width, height: 60 },
    });
    console.log(`PASS ${label} -> scripts/output/verify-wifi-${label}.png`);
    await page.close();
  }

  await browser.close();
})().catch((e) => {
  console.error("TEST_FAILED:", e.message);
  process.exit(1);
});
