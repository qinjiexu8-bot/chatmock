// 移动端分栏（Edit/Preview）+ 草稿本地持久化 的端到端实测。
//
// 覆盖的是本轮 UI/数据安全改动，全部靠**真实交互 + 真实 localStorage + 刷新**验证：
//   A. 移动端：默认在编辑栏、预览隐藏；切到预览能看到刚改的文案；预览缩放未塌陷；
//      切回编辑栏滚动位置保住
//   B. 持久化：编辑后落库 → 刷新恢复；平台之间互不串味；Reset 清空
//   C. 桌面端：不受分栏改造影响（两栏同屏、没有切换条）
//   D. 示例库：总数与分平台数量对得上（防"做厚"只改了数据没生效）
//
// 用法: node scripts/qa/ux-persist.cjs           （本地，需先 npm start）
//       BASE=https://chatmock.net node scripts/qa/ux-persist.cjs
const { chromium } = require("playwright-core");

const BASE = process.env.BASE || "http://localhost:3000";
const SLUG = "whatsapp-chat-generator";
const OTHER_SLUG = "telegram-chat-generator";
const QA_TITLE = "QA Draft 4711";
const KEY = (id) => `chatmock:v1:conversation:${id}`;

const MOBILE = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true };
const DESKTOP = { viewport: { width: 1440, height: 900 } };

const results = [];
function report(name, pass, detail) {
  results.push({ name, pass, detail });
  console.log(`[${pass ? "PASS" : "FAIL"}] ${name} — ${detail}`);
}

function collectErrors(page) {
  const errors = [];
  const bad = [];
  page.on("pageerror", (e) => errors.push(String(e).slice(0, 140)));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text().slice(0, 140));
  });
  page.on("response", (r) => {
    if (r.status() >= 400) bad.push(r.url());
  });
  return { errors, bad };
}

const EDITOR = 'div[class*="overscroll-contain"]';
const EXPORT = "[data-export-root]";

const nameInput = (page) => page.locator('label:has-text("Name") input').first();

(async () => {
  const browser = await chromium.launch({
    executablePath:
      process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });

  // ================================================================ A + B：移动端
  const ctx = await browser.newContext({ ...MOBILE });
  const page = await ctx.newPage();
  const { errors, bad } = collectErrors(page);

  await page.goto(`${BASE}/${SLUG}`, { waitUntil: "load" });
  await page.getByRole("button", { name: "+ Me" }).first().waitFor({ state: "visible" });

  const editTab = page.getByRole("button", { name: "Edit", exact: true });
  const previewTab = page.getByRole("button", { name: "Preview", exact: true });

  // A1) 移动端有分栏切换条
  report("mobile/tabs-present", await editTab.isVisible(), "Edit/Preview 切换条可见");

  // A2) 默认落在编辑栏：预览不可见、编辑区可见
  const exportVisibleAtStart = await page.locator(EXPORT).isVisible();
  const editorVisibleAtStart = await page.locator(EDITOR).first().isVisible();
  report(
    "mobile/default-edit-tab",
    !exportVisibleAtStart && editorVisibleAtStart,
    `preview=${exportVisibleAtStart} editor=${editorVisibleAtStart}（期望 preview=false）`
  );

  // A3) 改文案 + 加一条消息，并把编辑器滚到底部
  await nameInput(page).fill(QA_TITLE);
  await page.getByRole("button", { name: "+ Me" }).click();
  await page.waitForTimeout(150);
  const taCount = await page.locator("textarea").count();
  const scrolled = await page.locator(EDITOR).first().evaluate((el) => {
    el.scrollTop = 180;
    return el.scrollTop;
  });
  report("mobile/editor-scrollable", scrolled > 60, `编辑区可滚动 scrollTop=${scrolled}`);

  // A4) 切到预览：预览可见，且**看到的是刚改的文案**（这正是本改动要解决的问题）
  await previewTab.click();
  await page.waitForTimeout(250);
  const previewVisible = await page.locator(EXPORT).isVisible();
  const downloadVisible = await page.getByRole("button", { name: "Download PNG" }).isVisible();
  report(
    "mobile/preview-visible",
    previewVisible && downloadVisible,
    `preview=${previewVisible} download=${downloadVisible}`
  );

  const textInPreview = await page
    .locator(EXPORT)
    .innerText()
    .catch(() => "");
  report(
    "mobile/preview-shows-edits",
    textInPreview.includes(QA_TITLE),
    `预览内出现「${QA_TITLE}」=${textInPreview.includes(QA_TITLE)}`
  );

  // A5) 预览自适应缩放没有塌陷（隐藏时 clientWidth=0 曾会把 scale 压成 0）
  const scale = await page.locator(EXPORT).evaluate((el) => {
    const t = getComputedStyle(el.parentElement).transform;
    const m = t.match(/matrix\(([^,]+),/);
    return m ? Number(m[1]) : 1;
  });
  report("mobile/preview-fit-scale", scale > 0.7 && scale <= 1, `fitScale=${scale.toFixed(3)}`);

  // A6) 切回编辑栏：滚动位置必须保住（否则等于把"来回滚"换个形式复现）
  await editTab.click();
  await page.waitForTimeout(200);
  const restoredScroll = await page
    .locator(EDITOR)
    .first()
    .evaluate((el) => el.scrollTop);
  report(
    "mobile/scroll-kept",
    Math.abs(restoredScroll - scrolled) <= 2,
    `${scrolled} -> ${restoredScroll}`
  );

  // A7) 编辑器里此刻应能直接看到预览侧工具栏？—— 不需要，但预览侧必须已隐藏
  const editorBack = await page.locator(EDITOR).first().isVisible();
  report("mobile/back-to-edit", editorBack, "编辑区重新可见");

  // B1) 落库（debounce 400ms）
  await page.waitForTimeout(700);
  const storedRaw = await page.evaluate((k) => window.localStorage.getItem(k), KEY("whatsapp"));
  let stored = null;
  try {
    stored = JSON.parse(storedRaw || "null");
  } catch {
    /* 保持 null */
  }
  report(
    "draft/written",
    !!stored && stored.conversation && stored.conversation.title === QA_TITLE,
    stored ? `title=${stored.conversation.title} messages=${stored.conversation.messages.length}` : "未写入"
  );

  // B2) 刷新恢复
  await page.reload({ waitUntil: "load" });
  await page.getByRole("button", { name: "+ Me" }).first().waitFor({ state: "visible" });
  await page.waitForTimeout(300);
  const afterReloadTitle = await nameInput(page).inputValue();
  const afterReloadCount = await page.locator("textarea").count();
  report(
    "draft/restored-after-reload",
    afterReloadTitle === QA_TITLE && afterReloadCount === taCount,
    `title=${afterReloadTitle} messages=${afterReloadCount}（期望 ${taCount}）`
  );
  const hint = await page.locator(EDITOR).first().innerText();
  report(
    "draft/restored-hint-visible",
    /restored from this browser/i.test(hint),
    "编辑区给出「已恢复草稿」提示"
  );

  // B3) 平台隔离：切到 Telegram，不能看到 WhatsApp 的草稿
  await page.goto(`${BASE}/${OTHER_SLUG}`, { waitUntil: "load" });
  await page.getByRole("button", { name: "+ Me" }).first().waitFor({ state: "visible" });
  await page.waitForTimeout(300);
  const tgTitle = await nameInput(page).inputValue();
  report("draft/platform-isolated", tgTitle !== QA_TITLE, `telegram title=${tgTitle}（≠ ${QA_TITLE}）`);

  // 顺手在 Telegram 建一份草稿，验证两把键并存互不覆盖
  await nameInput(page).fill("TG Draft 9922");
  await page.waitForTimeout(700);
  const both = await page.evaluate(
    (keys) => keys.map((k) => (window.localStorage.getItem(k) ? "有" : "无")),
    [KEY("whatsapp"), KEY("telegram")]
  );
  report("draft/per-platform-keys", both[0] === "有" && both[1] === "有", `wa=${both[0]} tg=${both[1]}`);

  // B4) 回到 WhatsApp，草稿仍在（没被 Telegram 那一轮覆盖）
  await page.goto(`${BASE}/${SLUG}`, { waitUntil: "load" });
  await page.getByRole("button", { name: "+ Me" }).first().waitFor({ state: "visible" });
  await page.waitForTimeout(300);
  report(
    "draft/survives-platform-switch",
    (await nameInput(page).inputValue()) === QA_TITLE,
    `title=${await nameInput(page).inputValue()}`
  );

  // B5) Reset 清空草稿
  await previewTab.click();
  await page.getByRole("button", { name: "Reset" }).click();
  await page.waitForTimeout(700);
  const afterReset = await nameInput(page).inputValue();
  await page.reload({ waitUntil: "load" });
  await page.getByRole("button", { name: "+ Me" }).first().waitFor({ state: "visible" });
  await page.waitForTimeout(300);
  const afterResetReload = await nameInput(page).inputValue();
  report(
    "draft/reset-clears",
    afterReset === "Alex" && afterResetReload === "Alex",
    `reset后=${afterReset} 刷新后=${afterResetReload}`
  );

  // B6) 移动端全程 console 干净
  const onlyInsights404 = bad.length > 0 && bad.every((u) => u.includes("/_vercel/insights"));
  const realErrors = errors.filter((e) => !(/404/.test(e) && onlyInsights404));
  report("mobile/console", realErrors.length === 0, realErrors.length ? realErrors.join(" | ") : "clean");
  await ctx.close();

  // ================================================================ C：桌面端
  const dctx = await browser.newContext({ ...DESKTOP });
  const dpage = await dctx.newPage();
  const d = collectErrors(dpage);
  await dpage.goto(`${BASE}/${SLUG}`, { waitUntil: "load" });
  await dpage.getByRole("button", { name: "+ Me" }).first().waitFor({ state: "visible" });

  const tabVisibleDesktop = await dpage.getByRole("button", { name: "Preview", exact: true }).isVisible();
  const bothPanes =
    (await dpage.locator(EDITOR).first().isVisible()) &&
    (await dpage.locator(EXPORT).isVisible());
  report(
    "desktop/no-tabs-and-both-panes",
    !tabVisibleDesktop && bothPanes,
    `切换条可见=${tabVisibleDesktop} 两栏同屏=${bothPanes}`
  );
  const dOnlyInsights = d.bad.length > 0 && d.bad.every((u) => u.includes("/_vercel/insights"));
  const dReal = d.errors.filter((e) => !(/404/.test(e) && dOnlyInsights));
  report("desktop/console", dReal.length === 0, dReal.length ? dReal.join(" | ") : "clean");
  await dctx.close();

  // ================================================================ D：示例库计数
  const ectx = await browser.newContext({ ...DESKTOP });
  const epage = await ectx.newPage();
  const e = collectErrors(epage);
  const want = [
    ["/examples", 31],
    ["/examples/whatsapp-chat-generator", 3],
    ["/examples/group-chat-generator", 4],
    ["/examples/discord-chat-generator", 3],
  ];
  for (const [path, expect] of want) {
    await epage.goto(`${BASE}${path}`, { waitUntil: "load" });
    await epage.locator("article").first().waitFor({ state: "visible" });
    const n = await epage.locator("article").count();
    report(`examples${path}-count`, n === expect, `${n}（期望 ${expect}）`);
  }
  const eOnlyInsights = e.bad.length > 0 && e.bad.every((u) => u.includes("/_vercel/insights"));
  const eReal = e.errors.filter((x) => !(/404/.test(x) && eOnlyInsights));
  report("examples/console", eReal.length === 0, eReal.length ? eReal.join(" | ") : "clean");
  await ectx.close();

  await browser.close();

  const fails = results.filter((r) => !r.pass);
  console.log(`\n===== ${results.length - fails.length}/${results.length} PASS =====`);
  if (fails.length) {
    console.log("FAILED:", fails.map((f) => f.name).join(", "));
    process.exit(1);
  }
})();
