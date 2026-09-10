/**
 * 聊天应用涂鸦壁纸共享模块（Telegram / WhatsApp 等真机默认壁纸都有涂鸦层）。
 * 用 SVG data-URI tile 实现，modern-screenshot 导出安全。
 * 线稿风格：手绘 emoji 涂鸦（爱心/星星/笑脸/幽灵/菠萝/气泡/音符/汉堡/伞/花）。
 */

export function doodleTile(stroke: string, op: number): string {
  const p = (d: string, t = "") =>
    `<path d="${d}" fill="none" stroke="${stroke}" stroke-opacity="${op}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" ${t}/>`;
  const c = (cx: number, cy: number, r: number, extra = "") =>
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${stroke}" stroke-opacity="${op}" stroke-width="1.7" ${extra}/>`;
  const g = (x: number, y: number, r: number, inner: string) =>
    `<g transform="translate(${x} ${y}) rotate(${r})">${inner}</g>`;

  const heart = p("M0 5 C0 1.5 4 -0.5 7 2.5 C10 -0.5 14 1.5 14 5 C14 9 7 13 7 13 C7 13 0 9 0 5 Z");
  const star = p("M7 0 L8.8 4.6 L13.8 5 L10 8.2 L11.2 13 L7 10.4 L2.8 13 L4 8.2 L0.2 5 L5.2 4.6 Z");
  const smiley =
    c(7, 7, 6.4) +
    `<circle cx="4.8" cy="5.6" r="0.9" fill="${stroke}" fill-opacity="${op}"/>` +
    `<circle cx="9.2" cy="5.6" r="0.9" fill="${stroke}" fill-opacity="${op}"/>` +
    p("M4.2 8.6 a3.4 3.4 0 0 0 5.6 0");
  const ghost = p("M1 13 V6 a6 6 0 0 1 12 0 v7 l-2-1.6 -2 1.6 -2-1.6 -2 1.6 -2-1.6 Z") +
    `<circle cx="4.8" cy="6" r="0.8" fill="${stroke}" fill-opacity="${op}"/>` +
    `<circle cx="9.2" cy="6" r="0.8" fill="${stroke}" fill-opacity="${op}"/>`;
  const pineapple =
    `<ellipse cx="7" cy="9.5" rx="4.6" ry="5.4" fill="none" stroke="${stroke}" stroke-opacity="${op}" stroke-width="1.7"/>` +
    p("M7 4.2 C6 2.5 6 1 7 0 M7 4.2 C7.8 2.4 9.2 1.4 10.6 1.2 M7 4.2 C6.2 2.4 4.8 1.4 3.4 1.2") +
    p("M4.5 7.5 L9.5 11.5 M9.5 7.5 L4.5 11.5");
  const bubble =
    p("M1 4 a3 3 0 0 1 3-3 h6 a3 3 0 0 1 3 3 v4 a3 3 0 0 1 -3 3 h-4 l-3.4 3 v-3 a3 3 0 0 1 -2.6-3 Z") +
    `<circle cx="5.4" cy="6" r="0.8" fill="${stroke}" fill-opacity="${op}"/>` +
    `<circle cx="8" cy="6" r="0.8" fill="${stroke}" fill-opacity="${op}"/>` +
    `<circle cx="10.6" cy="6" r="0.8" fill="${stroke}" fill-opacity="${op}"/>`;
  const note = p("M4 13 V2.5 L12 1 v10.5") + `<ellipse cx="2.4" cy="13" rx="1.8" ry="1.4" fill="${stroke}" fill-opacity="${op}"/>` + `<ellipse cx="10.4" cy="11.5" rx="1.8" ry="1.4" fill="${stroke}" fill-opacity="${op}"/>`;
  const burger = p("M1 4 a6 4 0 0 1 12 0 Z M1 7 h12 M1.5 10 c2 1.6 8.5 1.6 11 0");
  const umbrella = p("M0 6 a7 7 0 0 1 14 0 Z M7 -0.5 v1 M7 6 v6 a2 2 0 0 0 4 0");
  const flower =
    c(7, 7, 2.2) +
    c(7, 2.6, 2) + c(11, 5.6, 2) + c(9.5, 10.4, 2) + c(4.5, 10.4, 2) + c(3, 5.6, 2);

  const tile =
    `<svg xmlns="http://www.w3.org/2000/svg" width="280" height="280" viewBox="0 0 280 280">` +
    g(28, 36, -12, heart) +
    g(120, 22, 10, star) +
    g(206, 48, -6, smiley) +
    g(58, 108, 8, ghost) +
    g(162, 116, -10, pineapple) +
    g(246, 104, 6, bubble) +
    g(24, 196, -8, note) +
    g(108, 204, 4, burger) +
    g(198, 214, -8, umbrella) +
    g(258, 190, 0, flower) +
    g(80, 258, 14, star) +
    g(160, 258, -14, heart) +
    `</svg>`;

  return `url("data:image/svg+xml,${encodeURIComponent(tile)}")`;
}
