/**
 * PNG 导出
 *
 * 选型说明（方案 7.2）：用 modern-screenshot 而不是 html2canvas。
 * html2canvas 不支持 oklch()，而 Tailwind v4 默认输出 oklch 色值，会直接崩。
 * modern-screenshot 走 SVG foreignObject，对现代 CSS 兼容性好得多。
 *
 * 关键点：必须 await document.fonts.ready，否则字体还没加载完就被截图，
 * 导出结果会回退到系统字体、排版错乱。这是这类工具最常见的线上 bug。
 */

export async function exportNodeAsPng(
  node: HTMLElement,
  opts: { scale?: number; filename?: string } = {}
): Promise<void> {
  const { scale = 2, filename = "chatmock.png" } = opts;

  if (typeof document !== "undefined" && "fonts" in document) {
    await document.fonts.ready;
  }

  const { domToBlob } = await import("modern-screenshot");

  // 头像/图片都是本地 dataURL，不需要走 fetch 抓取，避免跨域开销
  const blob = await domToBlob(node, {
    scale,
    backgroundColor: null,
  });

  if (!blob) throw new Error("Export failed: empty blob");

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  // 立刻 revoke 会让部分浏览器下载中断，留一点缓冲
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
