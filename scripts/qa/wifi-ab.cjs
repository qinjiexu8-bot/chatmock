/* WiFi 状态栏图标 A/B 对照：真实尺寸 + 10x 放大，并排渲染候选方案。
   用法：NODE_PATH=<workspace>/node_modules node scripts/qa/wifi-ab.cjs [out.png] */
const { chromium } = require("playwright-core");

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

/** 极坐标取点：apex 为扇形顶点，r 半径，side ±1 */
const geo = (apexX, apexY, halfDeg) => {
  const RAD = (halfDeg * Math.PI) / 180;
  const SIN = Math.sin(RAD), COS = Math.cos(RAD);
  const pt = (r, side) =>
    `${(apexX + side * r * SIN).toFixed(3)} ${(apexY - r * COS).toFixed(3)}`;
  /** 环形弧带：内径→外径，两端径向平切（真机观感） */
  const band = (r1, r2) =>
    `M ${pt(r2, -1)} A ${r2.toFixed(3)} ${r2.toFixed(3)} 0 0 1 ${pt(r2, 1)} ` +
    `L ${pt(r1, 1)} A ${r1.toFixed(3)} ${r1.toFixed(3)} 0 0 0 ${pt(r1, -1)} Z`;
  /** 楔形块：顶点在 apex 的实心扇 */
  const wedge = (r) => `M ${apexX} ${apexY} L ${pt(r, -1)} A ${r.toFixed(3)} ${r.toFixed(3)} 0 0 1 ${pt(r, 1)} Z`;
  return { pt, band, wedge };
};

const APEX_X = 12, APEX_Y = 17.75, R = 17.75, HALF = 42.5;
const g = geo(APEX_X, APEX_Y, HALF);

const VARIANTS = {
  "A. 现状（实心扇形）": [
    "M24 4.98C20.93 1.9 16.69 0 12 0C7.31 0 3.07 1.9 0 4.98L12 17L24 4.98Z",
  ],
  // 三段式扇形：内楔块 + 中弧带 + 外弧带，间隙 ≈0.08R（径向平切端）
  "B. 三段 · 间隙 0.08R": [
    g.wedge(0.52 * R),
    g.band(0.60 * R, 0.74 * R),
    g.band(0.82 * R, 1.0 * R),
  ],
  "C. 三段 · 间隙 0.06R（更实）": [
    g.wedge(0.52 * R),
    g.band(0.58 * R, 0.74 * R),
    g.band(0.80 * R, 1.0 * R),
  ],
  "D. 三段 · 楔块收窄 0.46R": [
    g.wedge(0.46 * R),
    g.band(0.56 * R, 0.72 * R),
    g.band(0.80 * R, 1.0 * R),
  ],
  "E. 两段（外弧 + 楔块，Android 11 风格）": [
    g.wedge(0.62 * R),
    g.band(0.78 * R, 1.0 * R),
  ],
};

const wrap = (paths) =>
  `<svg width="16.9" height="12.5" viewBox="0 0 24 17.75" fill="none">${paths
    .map((d) => `<path d="${d}" fill="#111b21"/>`)
    .join("")}</svg>`;

const signal = (level = 4) =>
  `<svg width="16.5" height="12" viewBox="0 0 16.5 12" fill="none">${[
    { x: 0, h: 4 }, { x: 4.5, h: 6.5 }, { x: 9, h: 9 }, { x: 13.5, h: 11.5 },
  ]
    .map((b, i) => `<rect x="${b.x}" y="${12 - b.h}" width="3" height="${b.h}" rx="1.5" fill="#111b21" opacity="${i < level ? 1 : 0.3}"/>`)
    .join("")}</svg>`;

const battery = `<svg width="27" height="13" viewBox="0 0 27 13" fill="none"><rect x="0.5" y="0.5" width="23.5" height="12" rx="3.8" stroke="#111b21" stroke-opacity="0.35"/><rect x="2" y="2" width="${(0.82 * 20.5).toFixed(1)}" height="9" rx="1.8" fill="#111b21"/><path d="M25.5 4.4v4.2c1-.35 1.5-1.1 1.5-2.1s-.5-1.75-1.5-2.1Z" fill="#111b21" fill-opacity="0.4"/></svg>`;

const barRow = (svg, scale = 1) =>
  `<div style="display:flex;align-items:center;gap:${7 * scale}px;background:#fff;padding:${4 * scale}px ${10 * scale}px;border-radius:${8 * scale}px;width:max-content">
     <span style="font:500 ${12 * scale}px Roboto,sans-serif;color:#111b21">Carrier</span>
     <span style="display:inline-flex;transform:scale(${scale});transform-origin:left center">${signal()}</span>
     <span style="display:inline-flex;margin-left:${(16.5 * (scale - 1))}px;transform:scale(${scale});transform-origin:left center">${svg}</span>
     <span style="display:inline-flex;margin-left:${(27 * (scale - 1))}px;transform:scale(${scale});transform-origin:left center">${battery}</span>
   </div>`;

const cell = (label, svg, isWinner) => `
  <div style="border:1px solid ${isWinner ? "#4b61fa" : "#e3e3e8"};border-radius:10px;padding:14px 16px;background:#fff">
    <div style="font:600 12px -apple-system,sans-serif;color:${isWinner ? "#4b61fa" : "#555"};margin-bottom:10px">${label}</div>
    <div style="display:flex;align-items:center;gap:22px;flex-wrap:wrap">
      <div>
        <div style="font:500 10px -apple-system,sans-serif;color:#999;margin-bottom:4px">1x（导出基准，最关键）</div>
        ${barRow(svg, 1)}
      </div>
      <div>
        <div style="font:500 10px -apple-system,sans-serif;color:#999;margin-bottom:4px">3x</div>
        ${barRow(svg, 3)}
      </div>
    </div>
    <div style="margin-top:16px">
      <div style="font:500 10px -apple-system,sans-serif;color:#999;margin-bottom:4px">8x 放大</div>
      <div style="transform:scale(8);transform-origin:left top;height:${12.5 * 8 + 4}px;width:max-content">
        <div style="background:#fff;padding:2px">${svg}</div>
      </div>
    </div>
  </div>`;

const html = `<!doctype html><meta charset="utf-8">
<body style="margin:0;background:#f2f2f5;padding:20px">
<div style="display:flex;flex-direction:column;gap:14px;width:max-content">
  ${Object.entries(VARIANTS)
    .map(([k, v]) => cell(k, wrap(v), false))
    .join("")}
</div>
</body>`;

(async () => {
  const b = await chromium.launch({ executablePath: CHROME });
  const p = await b.newPage({ viewport: { width: 620, height: 1400 }, deviceScaleFactor: 2 });
  await p.setContent(html, { waitUntil: "load" });
  await p.screenshot({ path: process.argv[2] || "scripts/output/wifi-ab4.png", fullPage: true });
  await b.close();
  console.log("wifi A/B 已输出:", process.argv[2] || "scripts/output/wifi-ab4.png");
})();
