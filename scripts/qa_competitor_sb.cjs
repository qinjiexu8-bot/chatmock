/* 竞品状态栏走查：thefake.design / zeoob 顶部区域截图 */
const { chromium } = require("playwright-core");
const path = require("path");
const fs = require("fs");

const OUT = path.join(__dirname, "output");
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const exe = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  const browser = await chromium.launch({ executablePath: exe, headless: true });

  // thefake.design
  try {
    const p1 = await browser.newPage({ viewport: { width: 1440, height: 1600 }, deviceScaleFactor: 3 });
    await p1.goto("https://thefake.design/whatsapp-chat-generator", { waitUntil: "networkidle", timeout: 45000 });
    await p1.waitForTimeout(2000);
    // 找预览手机元素：截页面顶部两屏，人工定位状态栏
    await p1.screenshot({ path: path.join(OUT, "comp-thefake-full.png"), fullPage: false });
    console.log("thefake ok");
    await p1.close();
  } catch (e) { console.log("thefake FAIL:", e.message.slice(0, 120)); }

  // zeoob
  try {
    const p2 = await browser.newPage({ viewport: { width: 1440, height: 1600 }, deviceScaleFactor: 3 });
    await p2.goto("https://zeoob.com/whatsapp-chat-generator/", { waitUntil: "domcontentloaded", timeout: 45000 });
    await p2.waitForTimeout(3000);
    await p2.screenshot({ path: path.join(OUT, "comp-zeoob-full.png"), fullPage: false });
    console.log("zeoob ok");
    await p2.close();
  } catch (e) { console.log("zeoob FAIL:", e.message.slice(0, 120)); }

  await browser.close();
})();
