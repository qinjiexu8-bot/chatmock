// 只截状态栏右侧图标簇，4x 放大细看
const { chromium } = require("playwright-core");

(async () => {
  const browser = await chromium.launch({
    executablePath:
      process.env.CHROME_PATH ||
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 5 });
  await page.goto("http://localhost:3000/whatsapp-chat-generator", { waitUntil: "networkidle" });
  const el = page.locator("[data-export-root]");
  const box = await el.boundingBox();
  // 图标簇在状态栏右上：相对预览根节点 (x≈300-390, y≈0-44)
  await page.screenshot({
    path: "scripts/output/icons-zoom.png",
    clip: { x: box.x + 280, y: box.y, width: 110, height: 44 },
  });
  await browser.close();
  console.log("saved scripts/output/icons-zoom.png");
})();
