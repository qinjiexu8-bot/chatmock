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
  {
    slug: "messenger-chat-mockup-guide",
    title: "How to Make a Realistic Facebook Messenger Screenshot",
    description:
      "Messenger's identity is geometry, not colour: capsule bubbles, grouped avatars and a Seen line under one message only. A guide to building a Messenger mockup that survives a close look.",
    date: "2026-10-06",
    readMinutes: 7,
  },
  {
    slug: "group-chat-screenshot-guide",
    title: "How to Make a Group Chat Screenshot With Multiple Participants",
    description:
      "Group chats are the hardest mockups to fake: several senders, coloured names, grouped bubbles and natural pacing. How to stage a multi-person thread that reads as real.",
    date: "2026-10-06",
    readMinutes: 7,
  },
  {
    slug: "snapchat-chat-screenshot-guide",
    title: "How to Make a Snapchat Chat Screenshot (Without the Usual Mistakes)",
    description:
      "Snapchat's colour logic runs backwards from what most generators assume: a yellow header over a white chat surface. The details that make a Snapchat mockup believable.",
    date: "2026-10-06",
    readMinutes: 6,
  },
  {
    slug: "whatsapp-call-log-screenshot-guide",
    title: "How to Make a WhatsApp Call Log Screenshot",
    description:
      "The Calls tab is a list, not a conversation — which is why so many call-log mockups look wrong. Directions, durations, missed calls and the five-tab bottom bar, explained.",
    date: "2026-10-06",
    readMinutes: 6,
  },
  {
    slug: "android-sms-screenshot-guide",
    title: "How to Make a Google Messages Screenshot on Android",
    description:
      "Material bubbles, Google blue, a left-aligned clock and an RCS Read marker: how Android messaging mockups differ from their iPhone cousins, and the details that sell them.",
    date: "2026-10-06",
    readMinutes: 7,
  },
  {
    slug: "how-to-spot-a-fake-screenshot",
    title: "How to Spot a Fake Chat Screenshot: 9 Details That Give It Away",
    description:
      "Wrong bubble radius, a green iPhone header, a timestamp on every line. A practical checklist for telling a staged chat screenshot from a real one — and why it is getting harder.",
    date: "2026-10-06",
    readMinutes: 8,
  },
  {
    slug: "screenshot-metadata-and-authenticity",
    title: "Screenshot Metadata and Authenticity: What a PNG Actually Proves",
    description:
      "Can a screenshot prove a conversation happened? What EXIF, PNG chunks and file timestamps do and do not record — and why screenshots are the weakest evidence people trust most.",
    date: "2026-10-06",
    readMinutes: 7,
  },
  {
    slug: "is-it-legal-to-use-mockups-in-ads",
    title: "Is It Legal to Use Chat Mockups in Ads and Marketing?",
    description:
      "Staged conversations in advertising touch disclosure rules, platform brand guidelines and consumer law. A plain-English look at where marketing use crosses a line.",
    date: "2026-10-06",
    readMinutes: 8,
  },
  {
    slug: "ui-recreation-ethics-and-trademarks",
    title: "Recreating App Interfaces: Where Trademark and Fair Use Lines Sit",
    description:
      "Design mockups routinely redraw other companies' interfaces. What trademark law actually protects, how nominative use works, and why the honest answer is about context, not pixels.",
    date: "2026-10-06",
    readMinutes: 8,
  },
  {
    slug: "chat-mockups-in-teaching-and-research",
    title: "Using Chat Mockups in Teaching, Research and Prototyping",
    description:
      "Staged conversations are a serious tool in classrooms, user research and product prototyping — as long as participants know what they are looking at. How practitioners use them well.",
    date: "2026-10-06",
    readMinutes: 7,
  },
];

export function getPost(slug: string): BlogPostMeta | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
