// 全平台功能回归：10 个生成器逐个过「加消息/编辑/明暗模式/图片消息/头像/
// 通话类型/参与者/导出/重置」，断言产出物（下载 PNG 的真实尺寸），不探针。
// 用法: NODE_PATH=... node scripts/qa/tools.cjs [--only slug]
const { chromium } = require("playwright-core");
const fs = require("fs");

const IMAGE = "/tmp/qa-image.png";
const VIEW = { width: 1440, height: 900 };

// 每平台的功能开关（与 lib/themes.ts 对齐）
const PLATFORMS = [
  { slug: "whatsapp-chat-generator", img: true, receipt: true },
  { slug: "messenger-chat-generator", img: true, delivery: true },
  { slug: "group-chat-generator", participants: true },
  { slug: "fake-text-message-generator", img: true, delivery: true },
  { slug: "instagram-dm-generator", img: true, delivery: true },
  { slug: "discord-chat-generator", img: true, participants: true, memberAvatars: true },
  { slug: "telegram-chat-generator", img: true, receipt: true },
  { slug: "snapchat-chat-generator", img: true, delivery: true },
  { slug: "whatsapp-call-generator", callLog: true },
  { slug: "android-sms-generator", img: true, delivery: true },
];

const results = [];
function report(name, pass, detail) {
  results.push({ name, pass, detail });
  console.log(`[${pass ? "PASS" : "FAIL"}] ${name} — ${detail}`);
}

async function pngSize(file) {
  const buf = fs.readFileSync(file);
  if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error("not a PNG");
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}

async function testPlatform(browser, p) {
  const ctx = await browser.newContext({ viewport: VIEW, acceptDownloads: true });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e).slice(0, 120)));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text().slice(0, 120));
  });

  const tag = p.slug;
  try {
    await page.goto(`http://localhost:3000/${p.slug}`, { waitUntil: "networkidle" });

    const panel = page.locator('div[class*="max-h-[78vh]"]');
    const taCount = () => page.locator("textarea").count();
    const before = await taCount();

    // 1) 加消息 ×2（数量严格 +2，防止 spread 漏掉回归）
    for (let i = 0; i < 2; i++) {
      await page.getByRole("button", { name: "+ Me" }).click();
      await page.waitForTimeout(80);
    }
    const afterAdd = await taCount();
    report(`${tag} add-message`, afterAdd === before + 2, `${before} -> ${afterAdd} (expect ${before + 2})`);

    // 2) 编辑最后一条并确认受控输入保留
    const tas = page.locator("textarea");
    await tas.nth(afterAdd - 1).fill("QA probe message");
    await page.waitForTimeout(120);
    const kept = (await tas.nth(afterAdd - 1).inputValue()) === "QA probe message";
    report(`${tag} edit-persist`, kept, "fill 后 value 保留");

    // 3) 明暗模式切换（按钮进入激活态）
    await page.getByRole("button", { name: "dark" }).click();
    await page.waitForTimeout(120);
    const darkCls = await page.getByRole("button", { name: "dark" }).getAttribute("class");
    report(`${tag} dark-mode`, /bg-black\/5/.test(darkCls || ""), "按钮进入激活态");
    await page.getByRole("button", { name: "light" }).click();

    // 4) 图片消息（有该功能的平台）
    if (p.img) {
      const card = page.locator("div.rounded-xl").filter({ has: page.locator("textarea") }).last();
      await card.locator('input[type="file"]').setInputFiles(IMAGE);
      await page.waitForTimeout(250);
      const hasRemove = await card.getByRole("button", { name: "Remove" }).count();
      report(`${tag} image-message`, hasRemove === 1, "上传后出现 Remove 按钮");
    }

    // 5) 回执选择（whatsapp/telegram）
    if (p.receipt) {
      const card = page.locator("div.rounded-xl").filter({ has: page.locator("textarea") }).last();
      const sel = card.locator("select").nth(1); // [0]=发送者 [1]=回执
      await sel.selectOption("delivered");
      report(`${tag} receipt`, (await sel.inputValue()) === "delivered", "select delivered 生效");
    }

    // 6) 通话记录（whatsapp-call）
    if (p.callLog) {
      const card = page.locator("div.rounded-xl").filter({ has: page.locator("textarea") }).last();
      const callSel = card.locator("select").nth(1);
      await callSel.selectOption("missed");
      await card.locator('input[type="checkbox"]').check();
      const videoOn = await card.locator('input[type="checkbox"]').isChecked();
      report(`${tag} call-log`, (await callSel.inputValue()) === "missed" && videoOn, "missed + video 勾选生效");
    }

    // 7) 参与者管理（group/discord）
    if (p.participants) {
      const addBtn = page.getByRole("button", { name: "+ Add participant" });
      await addBtn.click();
      await page.waitForTimeout(100);
      const nameInputs = await page.locator('input[value^="Member "]').count();
      report(`${tag} participants`, nameInputs >= 1, `新增 Member 输入框 ${nameInputs} 个`);
    }

    // 8) Discord 成员头像按钮
    if (p.memberAvatars) {
      const avBtns = await page.locator('[title="Upload avatar"]').count();
      report(`${tag} member-avatars`, avBtns >= 3, `头像上传按钮 ${avBtns} 个`);
    }

    // 9) Phone frame 勾选不报错
    await page.getByRole("checkbox", { name: /phone frame/i }).check();
    await page.waitForTimeout(150);
    await page.getByRole("checkbox", { name: /phone frame/i }).uncheck();

    // 10) 导出 PNG：真下载 + 解析 IHDR 尺寸
    const [download] = await Promise.all([
      page.waitForEvent("download", { timeout: 30000 }),
      page.getByRole("button", { name: "Download PNG" }).click(),
    ]);
    const file = "/tmp/qa-export.png";
    await download.saveAs(file);
    const { w, h } = await pngSize(file);
    const dimsOk = w === 780 && h === 1560; // 390x780 @2x
    report(`${tag} export`, dimsOk, `${download.suggestedFilename()} ${w}x${h}`);

    // 11) Reset 回到初始
    await page.getByRole("button", { name: "Reset" }).click();
    await page.waitForTimeout(150);
    const afterReset = await taCount();
    report(`${tag} reset`, afterReset === before, `${afterAdd} -> ${afterReset} (expect ${before})`);

    // 12) console 零报错
    report(`${tag} console`, errors.length === 0, errors.length ? errors.join(" | ") : "clean");
  } catch (e) {
    report(`${tag} EXCEPTION`, false, String(e).slice(0, 200));
  } finally {
    await ctx.close();
  }
}

(async () => {
  const only = process.argv.includes("--only")
    ? process.argv[process.argv.indexOf("--only") + 1]
    : null;
  const targets = only ? PLATFORMS.filter((p) => p.slug === only) : PLATFORMS;

  const browser = await chromium.launch({
    executablePath:
      process.env.CHROME_PATH ||
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });
  for (const p of targets) await testPlatform(browser, p);
  await browser.close();

  const fails = results.filter((r) => !r.pass);
  console.log(`\n===== ${results.length - fails.length}/${results.length} PASS =====`);
  if (fails.length) {
    console.log("FAILED:", fails.map((f) => f.name).join(", "));
    process.exit(1);
  }
})();
