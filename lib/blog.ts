/**
 * 博客文章注册表
 *
 * AdSense 申请前硬清单要求 5 篇实质原创 blog（《关键词策略与AdSense执行手册》）。
 * 新增文章：在此加一条元数据 + 在 app/blog/<slug>/page.tsx 写正文。
 * sitemap / 博客索引页 / 页脚链接自动同步。
 */

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  readMinutes: number;
}

export const blogPosts: BlogPostMeta[] = [
  {
    slug: "how-to-make-a-fake-whatsapp-chat",
    title: "How to Make a Fake WhatsApp Chat (for Videos, Design and Teaching)",
    description:
      "A step-by-step guide to creating realistic WhatsApp chat screenshots for storytelling, UI presentations and teaching — plus the details that make or break a mockup.",
    date: "2026-09-10",
    readMinutes: 7,
  },
  {
    slug: "fake-text-message-on-iphone-and-android",
    title: "How to Make a Fake Text Message on iPhone and Android",
    description:
      "iMessage blue bubbles and Google Messages Material blue follow different rules. How to create convincing text message screenshots on both platforms, for free.",
    date: "2026-09-10",
    readMinutes: 6,
  },
  {
    slug: "chat-screenshots-in-video-storytelling",
    title: "Chat Screenshots in Video Storytelling: A Creator's Guide",
    description:
      "Why fabricated conversations dominate storytime videos, how to stage them so audiences stay immersed, and where the ethical line sits.",
    date: "2026-09-10",
    readMinutes: 8,
  },
  {
    slug: "why-we-refuse-fake-bank-alerts",
    title: "Why We Refuse to Make Fake Bank Alerts (and What They Cost People)",
    description:
      "Fake bank notification generators are a fraud instrument, not a design tool. Inside the decision to leave that traffic on the table.",
    date: "2026-09-10",
    readMinutes: 6,
  },
  {
    slug: "messaging-app-ui-colour-reference",
    title: "The Exact Colours of Messaging Apps: A UI Reference for Designers",
    description:
      "The real bubble, header and accent colours of WhatsApp, iMessage, Telegram, Messenger and Instagram DM — light and dark — in one reference table.",
    date: "2026-09-10",
    readMinutes: 9,
  },
  {
    slug: "discord-message-mockup-guide",
    title: "How to Make a Discord Message Screenshot (Dark Mode Done Right)",
    description:
      "Discord mockups fail when they are drawn like WhatsApp bubbles. Row layout, 40px avatars, role colours and the details that make a Discord screenshot read as real.",
    date: "2026-09-10",
    readMinutes: 6,
  },
  {
    slug: "telegram-chat-screenshot-guide",
    title: "How to Make a Telegram Chat Screenshot That Looks iOS-Real",
    description:
      "Telegram's checkmarks, wallpaper and floating header follow different rules from WhatsApp. A guide to Telegram chat mockups on iPhone, light and night mode.",
    date: "2026-09-10",
    readMinutes: 6,
  },
  {
    slug: "instagram-dm-screenshot-guide",
    title: "How to Make an Instagram DM Screenshot for Memes and Reels",
    description:
      "The layout rules behind a convincing Instagram DM mockup: gradient rings, rounded grey-and-purple bubbles, Seen status and the details meme pages get wrong.",
    date: "2026-09-10",
    readMinutes: 6,
  },
];

export function getPost(slug: string): BlogPostMeta | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
