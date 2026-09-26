/**
 * Google AdSense 站点代码（AdSense 代码段）。
 *
 * 为什么不用 next/script：`strategy="beforeInteractive"` 在 App Router 的**静态预渲染**里
 * 只输出一条 `<link rel="preload" as="script">`，真正的 `<script src>` 由运行时在客户端注入
 * —— 原始 HTML 里抓不到执行标签，AdSense 的代码段验证会失败。
 * 所以这里直接渲染原生 `<script>`：React 19 会把带 `async` 的脚本**提升进 `<head>`**，
 * 静态 HTML 里就是一条真实可抓取的标签。
 *
 * 自证命令：`curl -s https://chatmock.net/ | grep -o '<script[^>]*adsbygoogle[^>]*>'`
 * - pub-id 是公开信息（本就写在 ads.txt 里），无需环境变量；换账号改这一处。
 * - 现在只做"网站所有权验证 + 审核"，站点**不投放广告**；广告位（<ins class="adsbygoogle">）
 *   等审核通过后再单独接，避免审核期出现空广告位或违反 AdSense 政策。
 * - 脚本来自第三方域名（pagead2.googlesyndication.com），**不计入 Vercel edge requests**。
 */
export const ADSENSE_CLIENT = "ca-pub-1642154997659311";

export function AdSense() {
  return (
    <script
      async
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
    />
  );
}
