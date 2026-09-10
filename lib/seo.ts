/**
 * 全站 SEO 配置
 *
 * 硬约束来自《关键词策略与AdSense执行手册》：
 * 1. 每个生成器页必须有 800-1500 词实质原创内容（low value content 是 4 次被拒的直接原因）
 * 2. 每页必须输出商标声明 + 可接受使用声明（AdSense 审核 + 商标合规）
 * 3. 页面数量一期卡死 12 个，分批发布，避免 scaled content abuse
 */

export const site = {
  name: "ChatMock",
  domain: "chatmock.net",
  url: "https://chatmock.net",
  tagline: "Free chat mockup generator — no signup, no watermark",
  description:
    "Create realistic chat mockups for WhatsApp, Messenger, Instagram DM and more. 100% free, no signup, no watermark, and everything renders in your browser — nothing is uploaded.",
  twitter: "@chatmock",
  /** 用于 JSON-LD */
  orgName: "ChatMock",
};

export function abs(path: string): string {
  const p = path.startsWith("/") ? path : "/" + path;
  return site.url + p;
}

/** 所有已上线的生成器页。新增一页就在这里加一条，sitemap/导航自动同步。 */
export interface GeneratorPage {
  platformId: string;
  slug: string; // URL 路径（不含斜杠）
  name: string; // 平台名
  h1: string;
  title: string;
  description: string;
  batch: "P0" | "P1" | "P2";
  live: boolean;
}

export const generatorPages: GeneratorPage[] = [
  {
    platformId: "whatsapp",
    slug: "whatsapp-chat-generator",
    name: "WhatsApp",
    h1: "Free WhatsApp Chat Generator",
    title: "Free WhatsApp Chat Generator — No Signup, No Watermark | ChatMock",
    description:
      "Create realistic WhatsApp chat mockups in your browser. Edit names, avatars, blue ticks, timestamps and dark mode, then export a high-resolution PNG. Free, no signup, no watermark.",
    batch: "P0",
    live: true,
  },
  {
    platformId: "messenger",
    slug: "messenger-chat-generator",
    name: "Messenger",
    h1: "Free Messenger Chat Generator",
    title: "Free Messenger Chat Generator — No Signup, No Watermark | ChatMock",
    description:
      "Build realistic Facebook Messenger conversation mockups. Customise names, avatars, seen receipts and dark mode, then download a high-resolution PNG for free.",
    batch: "P0",
    live: false,
  },
  {
    platformId: "group-chat",
    slug: "group-chat-generator",
    name: "Group Chat",
    h1: "Free Group Chat Generator",
    title: "Free Group Chat Generator — Multiple Participants | ChatMock",
    description:
      "Generate group chat mockups with multiple participants, coloured sender names and per-member avatars. Free, no signup, export PNG in one click.",
    batch: "P0",
    live: true,
  },
  {
    platformId: "text-message",
    slug: "fake-text-message-generator",
    name: "iPhone Text Message",
    h1: "Free iPhone Text Message Generator",
    title: "Free iPhone Text Message Generator — No Signup | ChatMock",
    description:
      "Create realistic iPhone iMessage and SMS text message mockups. Edit the contact, timestamps, read receipts and dark mode, then export a PNG for free.",
    batch: "P0",
    live: true,
  },
  {
    platformId: "instagram-dm",
    slug: "instagram-dm-generator",
    name: "Instagram DM",
    h1: "Free Instagram DM Generator",
    title: "Free Instagram DM Generator — No Signup, No Watermark | ChatMock",
    description:
      "Design realistic Instagram direct message mockups with dark mode, avatars and seen status. Free to use, no signup, high-resolution PNG export.",
    batch: "P1",
    live: false,
  },
  {
    platformId: "discord",
    slug: "discord-chat-generator",
    name: "Discord",
    h1: "Free Discord Chat Generator",
    title: "Free Discord Chat Generator — Server Mockups | ChatMock",
    description:
      "Build Discord server conversation mockups with roles, coloured usernames and avatars. Free, no signup, export a high-resolution PNG.",
    batch: "P1",
    live: false,
  },
  {
    platformId: "telegram",
    slug: "telegram-chat-generator",
    name: "Telegram",
    h1: "Free Telegram Chat Generator",
    title: "Free Telegram Chat Generator — No Signup | ChatMock",
    description:
      "Create realistic Telegram chat mockups with custom names, avatars, checkmarks and day dividers. Free, no signup, no watermark.",
    batch: "P1",
    live: false,
  },
  {
    platformId: "snapchat",
    slug: "snapchat-chat-generator",
    name: "Snapchat",
    h1: "Free Snapchat Chat Generator",
    title: "Free Snapchat Chat Generator — No Signup | ChatMock",
    description:
      "Make realistic Snapchat conversation mockups with Bitmoji-style avatars, streak indicators and chat backgrounds. Free, no signup, PNG export.",
    batch: "P1",
    live: false,
  },
  {
    platformId: "android-sms",
    slug: "android-sms-generator",
    name: "Android SMS",
    h1: "Free Android SMS Generator",
    title: "Free Android SMS Generator — Google Messages Mockup | ChatMock",
    description:
      "Create Android SMS and Google Messages mockups with custom contact names, timestamps and delivery status. Free, no signup, no watermark.",
    batch: "P2",
    live: false,
  },
  {
    platformId: "whatsapp-call",
    slug: "whatsapp-call-generator",
    name: "WhatsApp Call",
    h1: "Free WhatsApp Call Log Generator",
    title: "Free WhatsApp Call Log Generator — No Signup | ChatMock",
    description:
      "Build realistic WhatsApp call log and incoming call screen mockups. Customise caller name, call type, duration and timestamp. Free, no signup.",
    batch: "P2",
    live: false,
  },
  {
    platformId: "tiktok-dm",
    slug: "tiktok-dm-generator",
    name: "TikTok DM",
    h1: "Free TikTok DM Generator",
    title: "Free TikTok DM Generator — No Signup | ChatMock",
    description:
      "Create realistic TikTok direct message mockups for videos, thumbnails and presentations. Free, no signup, high-resolution PNG export.",
    batch: "P2",
    live: false,
  },
];

export const livePages = generatorPages.filter((p) => p.live);
