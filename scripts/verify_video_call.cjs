const { chromium } = require("playwright-core");

(async () => {
  const browser = await chromium.launch({ headless: true, args: ["--disable-gpu", "--no-sandbox"] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. 子画廊里的通话日志示例应含 "Outgoing video call" 文案
  await page.goto("http://localhost:3000/examples/whatsapp-call-generator", { waitUntil: "networkidle" });
  const videoLabel = await page.getByText("Outgoing video call").count();
  console.log("video label in sub-gallery:", videoLabel);
  await page.evaluate(() => window.scrollTo(0, 500));
  await page.waitForTimeout(300);
  await page.screenshot({ path: "scripts/output/verify-video-call.png" });

  // 2. 生成器编辑器：Video 勾选框存在，勾选后预览切换
  await page.goto("http://localhost:3000/whatsapp-call-generator", { waitUntil: "networkidle" });
  const videoCheckbox = page.locator("label:has-text('Video') input");
  console.log("video checkbox count:", await videoCheckbox.count());
  await videoCheckbox.first().check();
  await page.waitForTimeout(300);
  const previewVideo = await page.getByText("Incoming video call").count();
  console.log("preview shows video label after tick:", previewVideo > 0);
  await page.screenshot({ path: "scripts/output/verify-video-editor.png" });

  // 控制台错误
  const errors = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  await page.reload({ waitUntil: "networkidle" });
  console.log("console errors:", errors.length);

  await browser.close();
})();
