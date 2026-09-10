/* Full-site audit: status codes, meta uniqueness, word counts, console errors. */
const { chromium } = require(
  "/Users/xuqinjie/.workbuddy/binaries/node/versions/22.22.2-2/lib/node_modules/@playwright/cli/node_modules/playwright"
);

const ROUTES = [
  "/",
  "/whatsapp-chat-generator", "/messenger-chat-generator", "/group-chat-generator",
  "/fake-text-message-generator", "/instagram-dm-generator", "/snapchat-chat-generator",
  "/telegram-chat-generator", "/discord-chat-generator", "/whatsapp-call-generator",
  "/android-sms-generator",
  "/blog",
  "/blog/how-to-make-a-fake-whatsapp-chat",
  "/blog/fake-text-message-on-iphone-and-android",
  "/blog/chat-screenshots-in-video-storytelling",
  "/blog/why-we-refuse-fake-bank-alerts",
  "/blog/messaging-app-ui-colour-reference",
  "/acceptable-use", "/privacy", "/about",
];

(async () => {
  const browser = await chromium.launch({ headless: true, args: ["--disable-gpu", "--no-sandbox"] });
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on("console", (m) => {
    if (m.type() === "error" && !m.text().includes("favicon")) consoleErrors.push(m.text().slice(0, 120));
  });
  page.on("pageerror", (e) => consoleErrors.push("PAGEERROR: " + String(e).slice(0, 120)));

  const results = [];
  for (const r of ROUTES) {
    const resp = await page.goto("http://localhost:3000" + r, { waitUntil: "networkidle", timeout: 30000 });
    const data = await page.evaluate(() => {
      const title = document.title;
      const desc = document.querySelector('meta[name="description"]')?.content || "";
      const main = document.querySelector("main");
      const words = main ? main.innerText.trim().split(/\s+/).length : 0;
      const h2s = main ? main.querySelectorAll("h2").length : 0;
      const canon = document.querySelector('link[rel="canonical"]')?.href || "";
      return { title, desc, words, h2s, canon };
    });
    results.push({ route: r, status: resp.status(), ...data });
  }

  // duplicate meta check
  const titles = new Map(), descs = new Map();
  for (const r of results) {
    titles.set(r.title, (titles.get(r.title) || 0) + 1);
    descs.set(r.desc, (descs.get(r.desc) || 0) + 1);
  }
  const dupTitles = [...titles].filter(([, n]) => n > 1);
  const dupDescs = [...descs].filter(([, n]) => n > 1);

  console.log("ROUTE | STATUS | WORDS | H2 | CANON_OK");
  for (const r of results) {
    const canonOk = r.canon.includes("chatmock.net");
    const flag = r.words < 300 ? " <-- THIN" : "";
    console.log(`${r.route} | ${r.status} | ${r.words} | ${r.h2s} | ${canonOk}${flag}`);
  }
  console.log("\nDUP_TITLES:", JSON.stringify(dupTitles));
  console.log("DUP_DESCS:", JSON.stringify(dupDescs.map(([t]) => t.slice(0, 60))));
  console.log("CONSOLE_ERRORS:", consoleErrors.length ? consoleErrors.slice(0, 10) : "none");

  await browser.close();
})().catch((e) => { console.error("AUDIT_FAILED:", e.message); process.exit(1); });
