/* 状态栏图标放大截图：iOS 亮/暗 + Android，用于图标走查 */
const { chromium } = require("playwright-core");
const path = require("path");
const fs = require("fs");

const OUT = path.join(__dirname, "output");
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const exe = fs.existsSync("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")
    ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    : undefined;
  const browser = await chromium.launch({
    executablePath: exe,
    headless: true,
    channel: exe ? undefined : "chrome",
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1400 }, deviceScaleFactor: 3 });
  await page.goto("http://localhost:3000/whatsapp-chat-generator", { waitUntil: "networkidle" });

  // iOS 亮色：截整个预览区顶部（含状态栏）
  const frame = page.locator("[data-export-root]");
  await frame.screenshot({ path: path.join(OUT, "sb-current-ios-light.png") });

  // 切暗色
  await page.getByRole("button", { name: "dark", exact: true }).first().click();
  await page.waitForTimeout(300);
  await frame.screenshot({ path: path.join(OUT, "sb-current-ios-dark.png") });

  // 状态栏特写（放大裁剪顶部 48px）
  const clip = await frame.boundingBox();
  await page.screenshot({
    path: path.join(OUT, "sb-current-zoom-light.png"),
    clip: { x: clip.x, y: clip.y, width: clip.width, height: 48 },
  });

  // Android 页
  await page.goto("http://localhost:3000/android-sms-generator", { waitUntil: "networkidle" });
  await frame.screenshot({ path: path.join(OUT, "sb-current-android.png") });
  const clip2 = await frame.boundingBox();
  await page.screenshot({
    path: path.join(OUT, "sb-current-zoom-android.png"),
    clip: { x: clip2.x, y: clip2.y, width: clip2.width, height: 48 },
  });

  await browser.close();
  console.log("done ->", OUT);
})();
