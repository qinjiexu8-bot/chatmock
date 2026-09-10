/**
 * 平台迷你图标（16×16，几何简化版品牌标）。
 * 用于导航 More 下拉、移动端菜单、生成器切换条等导航面。
 * 纯 SVG，无外部资源，服务端可渲染，导出安全。
 */

const BRAND = {
  whatsapp: "#25D366",
  messenger: "#0084FF",
  instagramA: "#F58529",
  instagramB: "#DD2A7B",
  instagramC: "#8134AF",
  discord: "#5865F2",
  telegram: "#229ED9",
  snapchat: "#FFFC00",
  android: "#34A853",
  imessage: "#34C759",
  text: "#111b21",
} as const;

export function PlatformIcon({ platformId }: { platformId: string }) {
  switch (platformId) {
    case "whatsapp":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="7" fill={BRAND.whatsapp} />
          <path
            d="M8 3.4a4.5 4.5 0 0 0-3.9 6.75L3.6 12.4l2.35-.6A4.5 4.5 0 1 0 8 3.4Z"
            fill="#fff"
          />
          <path
            d="M6.2 5.6c.15-.05.4-.05.55.25l.45.95c.1.25 0 .45-.15.6l-.3.3c-.1.1-.1.25-.05.35.25.45.85 1.05 1.35 1.3.15.05.3.05.4-.05l.35-.35c.15-.15.4-.2.6-.1l.95.5c.3.15.3.4.25.55-.1.5-.65.9-1.15.9-1.9 0-4.1-2.2-4.1-4.1 0-.5.4-1.05.9-1.15Z"
            fill={BRAND.whatsapp}
          />
        </svg>
      );
    case "messenger":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="7" fill={BRAND.messenger} />
          <path d="M4 9.6 7 5.5l2 1.9 3-1.9-3 4.4-2-1.7L4 9.6Z" fill="#fff" />
        </svg>
      );
    case "group-chat":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M8 2.2c3.4 0 6 2.2 6 5.1s-2.6 5.1-6 5.1c-.6 0-1.2-.07-1.75-.2L3.6 13.8l.5-2.4C2.8 10.5 2 9 2 7.3c0-2.9 2.6-5.1 6-5.1Z"
            fill={BRAND.whatsapp}
          />
          <circle cx="5.4" cy="7.3" r="1" fill="#fff" />
          <circle cx="8" cy="7.3" r="1" fill="#fff" />
          <circle cx="10.6" cy="7.3" r="1" fill="#fff" />
        </svg>
      );
    case "text-message":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M8 2.6c3.3 0 5.7 2 5.7 4.7S11.3 12 8 12c-.5 0-1-.05-1.5-.15L3.8 13.4l.4-2.1C3 10.4 2.3 9 2.3 7.3c0-2.7 2.4-4.7 5.7-4.7Z"
            fill={BRAND.imessage}
          />
        </svg>
      );
    case "instagram-dm":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="ig-g" x1="2" y1="14" x2="14" y2="2">
              <stop offset="0" stopColor={BRAND.instagramA} />
              <stop offset="0.5" stopColor={BRAND.instagramB} />
              <stop offset="1" stopColor={BRAND.instagramC} />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="12" height="12" rx="4" fill="url(#ig-g)" />
          <circle cx="8" cy="8" r="2.7" stroke="#fff" strokeWidth="1.3" fill="none" />
          <circle cx="11.1" cy="4.9" r="0.9" fill="#fff" />
        </svg>
      );
    case "discord":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M13.2 3.9A11.6 11.6 0 0 0 10.4 3l-.35.7a10 10 0 0 0-4.1 0L5.6 3a11.6 11.6 0 0 0-2.8.9C1 6.6.65 9.2.9 11.8A11.7 11.7 0 0 0 4.4 13.6l.7-1.15c-.4-.15-.8-.35-1.15-.55l.3-.25a8.3 8.3 0 0 0 7.5 0l.3.25c-.35.2-.75.4-1.15.55l.7 1.15a11.7 11.7 0 0 0 3.5-1.8c.3-3-.5-5.55-1.9-7.9Z"
            fill={BRAND.discord}
          />
          <ellipse cx="5.9" cy="8.6" rx="1.15" ry="1.3" fill="#fff" />
          <ellipse cx="10.1" cy="8.6" rx="1.15" ry="1.3" fill="#fff" />
        </svg>
      );
    case "telegram":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="7" fill={BRAND.telegram} />
          <path d="M3.9 7.8 12 4.6c.4-.15.75.1.6.65L11.2 11c-.1.4-.35.5-.7.3L8.4 9.7 7.3 10.8c-.15.15-.3.2-.45.05l.2-2.15 4-3.6-4.9 3.05-1.9-.65c-.4-.15-.4-.55-.35-.7Z" fill="#fff" />
        </svg>
      );
    case "snapchat":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="1.5" y="1.5" width="13" height="13" rx="4" fill={BRAND.snapchat} />
          <path
            d="M8 3.6c1.3 0 2.2 1 2.2 2.3 0 .6-.05 1.15-.1 1.6.35.1.8-.15 1.05-.05.3.1.25.45-.1.65-.3.2-.85.35-.95.7-.05.25.5 1.3 1.5 1.75.2.1.15.35-.1.45-.35.15-.9.2-1.05.4-.1.15-.05.4-.25.5-.25.1-.75-.1-1.25-.1-.5 0-.75.55-1.95.55s-1.45-.55-1.95-.55c-.5 0-1 .2-1.25.1-.2-.1-.15-.35-.25-.5-.15-.2-.7-.25-1.05-.4-.25-.1-.3-.35-.1-.45 1-.45 1.55-1.5 1.5-1.75-.1-.35-.65-.5-.95-.7-.35-.2-.4-.55-.1-.65.25-.1.7.15 1.05.05-.05-.45-.1-1-.1-1.6C5.8 4.6 6.7 3.6 8 3.6Z"
            fill="#fff"
            stroke="#2b2b2b"
            strokeWidth="0.5"
          />
        </svg>
      );
    case "android-sms":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4.2 4.2 3 2.6M11.8 4.2 13 2.6" stroke={BRAND.android} strokeWidth="1.2" strokeLinecap="round" />
          <path d="M2.8 6.5c0-2.6 2.3-4.3 5.2-4.3s5.2 1.7 5.2 4.3v3.2c0 1.2-.9 2.1-2.1 2.1H4.9c-1.2 0-2.1-.9-2.1-2.1V6.5Z" fill={BRAND.android} />
          <circle cx="5.9" cy="6.8" r="0.95" fill="#fff" />
          <circle cx="10.1" cy="6.8" r="0.95" fill="#fff" />
        </svg>
      );
    case "whatsapp-call":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="7" fill={BRAND.whatsapp} />
          <path
            d="M11.6 10.2v1.1c0 .5-.45.9-.95.9-1.35-.1-2.65-.55-3.8-1.25a9.1 9.1 0 0 1-2.8-2.8C3.35 7 2.9 5.7 2.8 4.35c-.05-.5.35-.95.85-.95h1.1c.45 0 .85.35.9.8.05.45.2.9.35 1.3.1.25.05.55-.15.75l-.55.6a7.7 7.7 0 0 0 2.6 2.6l.6-.55c.2-.2.5-.3.75-.15.4.15.85.3 1.3.35.45.05.8.45.8.9Z"
            fill="#fff"
          />
        </svg>
      );
    default:
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="2" y="2" width="12" height="12" rx="4" fill="#4b61fa" />
        </svg>
      );
  }
}
