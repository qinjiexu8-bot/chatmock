/* 验证：Discord 逐成员头像上传 → 预览渲染；group-chat 无头像按钮（如实渲染） */
const { chromium } = require("playwright-core");

// 1x1 红色 PNG
const PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  "base64"
);

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ["--disable-gpu", "--no-sandbox"],
  });
  const results = [];
  const check = (name, ok) => results.push(`${ok ? "PASS" : "FAIL"} ${name}`);
  const errors = [];

  // 1. Discord 页：给第二个参与者上传头像
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("http://localhost:3000/discord-chat-generator", { waitUntil: "networkidle" });

  // 参与者区的头像上传按钮（每个参与者行一个）
  const avatarBtns = page.locator('button[title="Upload avatar"], button[title="Change avatar"]');
  const btnCount = await avatarBtns.count();
  check(`discord shows per-member avatar buttons (got ${btnCount})`, btnCount >= 2);

  // 上传头像到第一个按钮对应的参与者（file input 是按钮的相邻兄弟）
  await page
    .locator('button[title="Upload avatar"] + input[type="file"]')
    .first()
    .setInputFiles({
      name: "avatar.png",
      mimeType: "image/png",
      buffer: PNG,
    });
  await page.waitForTimeout(500);
  // 预览区（导出节点内）应出现 dataURL 头像
  const previewImgs = await page
    .locator('[data-export-root] img[src^="data:image"]')
    .count();
  check(`discord preview renders uploaded avatar (got ${previewImgs})`, previewImgs >= 1);
  await page.screenshot({ path: "scripts/output/verify-member-avatar.png" });

  // 2. group-chat 页：参与者行是色点而非头像按钮（WhatsApp 群聊如实渲染）
  const gc = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  gc.on("pageerror", (e) => errors.push(e.message));
  await gc.goto("http://localhost:3000/group-chat-generator", { waitUntil: "networkidle" });
  const gcAvatarBtns = await gc
    .locator('button[title="Upload avatar"], button[title="Change avatar"]')
    .count();
  check(`group-chat has NO avatar buttons (got ${gcAvatarBtns})`, gcAvatarBtns === 0);

  // FAQ 已改为如实陈述
  const faqText = await gc.locator("body").innerText();
  check("group-chat FAQ no longer claims roadmap", !/on the roadmap/i.test(faqText));

  check(`zero console errors`, errors.length === 0);
  console.log(results.join("\n"));
  await browser.close();
  process.exit(results.some((r) => r.startsWith("FAIL")) ? 1 : 0);
})();
