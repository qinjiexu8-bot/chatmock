import Script from "next/script";

/**
 * GA4 接线：环境变量 NEXT_PUBLIC_GA_ID 存在时才渲染 gtag 脚本。
 * 未配置（本地开发 / 尚未建 GA4 属性）时返回 null，零副作用；
 * 部署到 Vercel 后在项目环境变量里填上即可自动激活，无需改代码。
 *
 * 站点内埋点（与手册第 6 章验收指标对应）：
 * - export_png 事件：GeneratorShell 下载成功时触发（访问→导出转化率）
 */
export function GA4() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
      </Script>
    </>
  );
}
