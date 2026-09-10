/* Export chain regression: click Download PNG on two generators, save and sanity-check the PNGs. */
const { chromium } = require("playwright-core");

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ["--disable-gpu", "--no-sandbox", "--disable-software-rasterizer"],
  });
  const results = [];

  for (const [slug, label] of [
    ["whatsapp-chat-generator", "whatsapp"],
    ["discord-chat-generator", "discord"],
  ]) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto(`http://localhost:3000/${slug}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500); // fonts.ready + first render
    const [download] = await Promise.all([
      page.waitForEvent("download", { timeout: 30000 }),
      page.getByRole("button", { name: "Download PNG" }).click(),
    ]);
    const out = `/tmp/export-test-${label}.png`;
    await download.saveAs(out);
    results.push(`PASS export ${label} -> ${out}`);
    await page.close();
  }

  console.log(results.join("\n"));
  await browser.close();
})().catch((e) => {
  console.error("TEST_FAILED:", e.message);
  process.exit(1);
});
