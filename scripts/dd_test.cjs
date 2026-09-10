// 排查"下拉没到底就隐藏"：
// 1) 桌面 More 下拉（1280x600 矮视口）  2) 移动端汉堡菜单（390x844）
const { chromium } = require("playwright-core");

(async () => {
  const browser = await chromium.launch({
    executablePath:
      process.env.CHROME_PATH ||
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });

  // ---- 桌面：矮视口打开 More 下拉 ----
  const d = await browser.newPage({ viewport: { width: 1280, height: 600 } });
  await d.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await d.getByRole("button", { name: /more/i }).click();
  await d.waitForTimeout(300);
  const panel = d.locator("header .menu-pop").first();
  const pb = await panel.boundingBox();
  const vp = d.viewportSize();
  console.log(`[桌面 More] 视口高=${vp.height} 面板 top=${pb.y} bottom=${pb.y + pb.height} 高=${pb.height} 超出视口=${pb.y + pb.height - vp.height}px`);
  await d.screenshot({ path: "scripts/output/dd-desktop-600.png" });
  // 尝试在面板内滚动
  await panel.hover();
  await d.mouse.wheel(0, 200);
  await d.waitForTimeout(200);
  const pb2 = await panel.boundingBox();
  console.log(`[桌面 More] 滚动后面板 bottom=${pb2.y + pb2.height}（若不变说明面板无滚动，靠页面滚动也带不动 sticky header）`);
  await d.close();

  // ---- 移动：390x844 汉堡菜单滚到底 ----
  const m = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  await m.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await m.getByRole("button", { name: /open menu/i }).click();
  await m.waitForTimeout(300);
  const menu = m.locator("header > .menu-pop");
  const mb = await menu.boundingBox();
  console.log(`[移动菜单] 视口高=844 面板 top=${mb.y} bottom=${mb.y + mb.height} 高=${mb.height} 超出视口=${mb.y + mb.height - 844}px`);
  // scrollHeight vs clientHeight：判断能否滚
  const scrollInfo = await menu.evaluate((el) => ({
    scrollH: el.scrollHeight, clientH: el.clientHeight,
  }));
  console.log(`[移动菜单] scrollHeight=${scrollInfo.scrollH} clientHeight=${scrollInfo.clientH} 可滚=${scrollInfo.scrollH > scrollInfo.clientHeight}`);
  await menu.evaluate((el) => el.scrollTo(0, el.scrollHeight));
  await m.waitForTimeout(300);
  const cta = m.getByText("Start creating").last();
  const cb = await cta.boundingBox();
  console.log(`[移动菜单] 滚到底后 CTA bottom=${cb ? cb.y + cb.height : "N/A"}（应 ≤ 844 且完整可见）`);
  await m.screenshot({ path: "scripts/output/dd-mobile-bottom.png" });
  await m.close();

  await browser.close();
})();
