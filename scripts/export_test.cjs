/* Export chain verification: open generator, click Download PNG, capture the download. */
const { chromium } = require(
  "/Users/xuqinjie/.workbuddy/binaries/node/versions/22.22.2-2/lib/node_modules/@playwright/cli/node_modules/playwright"
);

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ["--disable-gpu", "--no-sandbox", "--disable-software-rasterizer"],
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  // 1. Homepage visual check (font fix confirmation)
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.screenshot({ path: "/tmp/final-home.png" });
  const logoFont = await page.$eval("header a", (el) => getComputedStyle(el).fontFamily);
  const h1Font = await page.$eval("h1", (el) => getComputedStyle(el).fontFamily);
  console.log("LOGO_FONT:", logoFont.slice(0, 60));
  console.log("H1_FONT:", h1Font.slice(0, 60));

  // 2. Export test on WhatsApp generator
  await page.goto("http://localhost:3000/whatsapp-chat-generator", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500); // fonts.ready + first render
  const [download] = await Promise.all([
    page.waitForEvent("download", { timeout: 30000 }),
    page.click("text=Download PNG"),
  ]);
  const out = "/tmp/export-test.png";
  await download.saveAs(out);
  console.log("DOWNLOAD_SAVED:", out);

  await browser.close();
})().catch((e) => {
  console.error("TEST_FAILED:", e.message);
  process.exit(1);
});
