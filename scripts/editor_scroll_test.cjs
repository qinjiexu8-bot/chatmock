// 精确复现：编辑面板（max-h-78vh 容器）加 18 条消息后滚到底，检查最后内容是否完整
const { chromium } = require("playwright-core");

(async () => {
  const browser = await chromium.launch({
    executablePath:
      process.env.CHROME_PATH ||
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 800 } });
  await page.goto("http://localhost:3000/whatsapp-chat-generator", { waitUntil: "networkidle" });

  // 编辑面板 = 带 max-h 的滚动容器（左栏内）
  const panel = page.locator('div[class*="max-h-[78vh]"]');
  console.log("面板定位数:", await panel.count());

  // 连点 18 次 "+ Alex"
  for (let i = 0; i < 18; i++) {
    await page.getByRole("button", { name: "+ Alex" }).click();
    await page.waitForTimeout(25);
  }
  await page.waitForTimeout(300);

  const info = await panel.evaluate((el) => {
    el.scrollTop = el.scrollHeight;
    return {
      scrollH: el.scrollHeight, clientH: el.clientHeight, top: el.scrollTop,
      rect: el.getBoundingClientRect(),
    };
  });
  console.log(`[编辑面板] scrollH=${info.scrollH} clientH=${info.clientH} 滚到底scrollTop=${info.top}`);
  console.log(`[编辑面板] 视口位置 top=${info.rect.top.toFixed(0)} bottom=${info.rect.bottom.toFixed(0)}（视口高=800）`);

  // 最后一个 textarea（最后一条消息）是否完整可见
  const boxes = await panel.locator("textarea").all();
  console.log("消息 textarea 总数:", boxes.length);
  const last = boxes[boxes.length - 1];
  const lb = await last.boundingBox();
  console.log(`[最后消息] bottom=${(lb.y + lb.height).toFixed(0)} vs 面板bottom=${info.rect.bottom.toFixed(0)} vs 视口=800`);

  // 页面级滚动状态：body 是否也被滚动了
  const bodyScroll = await page.evaluate(() => document.documentElement.scrollTop);
  console.log("页面 scrollTop =", bodyScroll);

  await page.screenshot({ path: "scripts/output/editor-bottom2.png" });
  await browser.close();
})();
