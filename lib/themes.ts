import type { PlatformId, PlatformTheme } from "./types";

/**
 * 平台主题注册表
 *
 * 新增平台 = 在这里加一份 PlatformTheme + 写对应的渲染组件。
 * 数据模型（lib/types.ts）不需要动。
 *
 * 色值来源：各平台真机 UI。这是"像素级还原"卖点的基础，
 * 也是每个页面"平台 UI 细节拆解"内容区块的数据来源 —— 写错会同时毁掉产品和内容。
 */

const SYSTEM_FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export const whatsappTheme: PlatformTheme = {
  id: "whatsapp",
  name: "WhatsApp",
  slug: "whatsapp-chat-generator",
  trademark: { name: "WhatsApp", owner: "Meta Platforms, Inc." },
  colors: {
    light: {
      chatBg: "#efeae2",
      headerBg: "#008069",
      headerText: "#ffffff",
      headerSubText: "rgba(255,255,255,0.72)",
      incomingBubble: "#ffffff",
      incomingText: "#111b21",
      outgoingBubble: "#d9fdd3",
      outgoingText: "#111b21",
      timestamp: "#667781",
      accent: "#53bdeb",
      pillBg: "#ffffff",
      pillText: "#667781",
      footerBg: "#f0f2f5",
    },
    dark: {
      chatBg: "#0b141a",
      headerBg: "#202c33",
      headerText: "#e9edef",
      headerSubText: "#8696a0",
      incomingBubble: "#202c33",
      incomingText: "#e9edef",
      outgoingBubble: "#005c4b",
      outgoingText: "#e9edef",
      timestamp: "#8696a0",
      accent: "#53bdeb",
      pillBg: "#182229",
      pillText: "#8696a0",
      footerBg: "#111b21",
    },
  },
  bubble: {
    radius: 8,
    maxWidthPct: 75,
    fontSize: 15,
    fontFamily: SYSTEM_FONT,
    tailOnFirst: true,
  },
  features: {
    receipt: true,
    avatar: true,
    dateSeparator: true,
    senderNames: false,
    imageMessage: true,
    perMessageTimestamp: true,
    deliveryLine: false,
  },
  statusBarStyle: "ios",
  supportedModes: ["light", "dark"],
};

/**
 * iOS Messages（iMessage / SMS）
 *
 * 与 WhatsApp 的三个结构性差异，写错任何一个整张图就废：
 * 1. 气泡圆角 18px（WhatsApp 只有 8px）
 * 2. 气泡内**没有**时间戳 —— 只有顶部一行 "iMessage / Today 9:41"
 * 3. 末条外发消息下方单独一行灰色 "Delivered"，而不是气泡里的勾
 */
export const textMessageTheme: PlatformTheme = {
  id: "text-message",
  name: "iPhone Text Message",
  slug: "fake-text-message-generator",
  trademark: { name: "iPhone and iMessage", owner: "Apple Inc." },
  colors: {
    light: {
      chatBg: "#ffffff",
      headerBg: "#f9f9f9",
      headerText: "#000000",
      headerSubText: "#8e8e93",
      incomingBubble: "#e9e9eb",
      incomingText: "#000000",
      outgoingBubble: "#0b84ff",
      outgoingText: "#ffffff",
      timestamp: "#8e8e93",
      accent: "#0b84ff",
      pillBg: "transparent",
      pillText: "#8e8e93",
      footerBg: "#f9f9f9",
    },
    dark: {
      chatBg: "#000000",
      headerBg: "#1c1c1e",
      headerText: "#ffffff",
      headerSubText: "#8e8e93",
      incomingBubble: "#26262a",
      incomingText: "#ffffff",
      outgoingBubble: "#0b84ff",
      outgoingText: "#ffffff",
      timestamp: "#8e8e93",
      accent: "#0b84ff",
      pillBg: "transparent",
      pillText: "#8e8e93",
      footerBg: "#1c1c1e",
    },
  },
  bubble: {
    radius: 18,
    maxWidthPct: 72,
    fontSize: 16,
    fontFamily: SYSTEM_FONT,
    tailOnFirst: false,
  },
  features: {
    receipt: false,
    avatar: true,
    dateSeparator: true,
    senderNames: false,
    imageMessage: true,
    perMessageTimestamp: false,
    deliveryLine: true,
  },
  statusBarStyle: "ios",
  supportedModes: ["light", "dark"],
};

/**
 * 群聊（WhatsApp 群聊 UI 体系）
 *
 * 与单聊共用色值和气泡几何，差异只有两点：
 * 1. incoming 消息显示发送者名字，颜色取自固定色板（真机行为）
 * 2. header 副标题是成员列表（"You, Alex, Sam"）而不是 online 状态
 */
export const groupChatTheme: PlatformTheme = {
  ...whatsappTheme,
  id: "group-chat",
  name: "Group Chat",
  slug: "group-chat-generator",
  features: {
    ...whatsappTheme.features,
    senderNames: true,
  },
};

/**
 * Facebook Messenger
 *
 * 与前两种平台的结构性差异：
 * 1. 气泡无尾巴，胶囊感大圆角 18px；连续消息组朝发送者一侧收窄为 6px
 * 2. incoming 气泡头像挂在整个"组"的末条外侧，而不是 header 里
 * 3. 已读状态是末条外发消息下方的 "Seen" 小字，不是气泡内勾
 */
export const messengerTheme: PlatformTheme = {
  id: "messenger",
  name: "Messenger",
  slug: "messenger-chat-generator",
  trademark: { name: "Messenger", owner: "Meta Platforms, Inc." },
  colors: {
    light: {
      chatBg: "#ffffff",
      headerBg: "#ffffff",
      headerText: "#050505",
      headerSubText: "#65676b",
      incomingBubble: "#e4e6eb",
      incomingText: "#050505",
      outgoingBubble: "#0084ff",
      outgoingText: "#ffffff",
      timestamp: "#65676b",
      accent: "#0084ff",
      pillBg: "transparent",
      pillText: "#65676b",
      footerBg: "#ffffff",
    },
    dark: {
      chatBg: "#000000",
      headerBg: "#000000",
      headerText: "#e4e6eb",
      headerSubText: "#b0b3b8",
      incomingBubble: "#303031",
      incomingText: "#e4e6eb",
      outgoingBubble: "#0084ff",
      outgoingText: "#ffffff",
      timestamp: "#b0b3b8",
      accent: "#0084ff",
      pillBg: "transparent",
      pillText: "#b0b3b8",
      footerBg: "#000000",
    },
  },
  bubble: {
    radius: 18,
    maxWidthPct: 70,
    fontSize: 15,
    fontFamily: SYSTEM_FONT,
    tailOnFirst: false,
  },
  features: {
    receipt: false,
    avatar: true,
    dateSeparator: true,
    senderNames: false,
    imageMessage: true,
    perMessageTimestamp: false,
    deliveryLine: true,
  },
  statusBarStyle: "ios",
  supportedModes: ["light", "dark"],
};

/**
 * Discord（频道消息，桌面/移动通用布局）
 *
 * 第五种结构 —— 与前四种完全不同：
 * 1. 没有气泡：消息是通栏"行"，左右对齐概念消失（自己的消息也靠左）
 * 2. 每组消息开头一行：40px 头像 + 彩色用户名 + "Today at 9:32"，续行只缩进文本
 * 3. 暗色是默认主题（#313338），这是 Discord 的身份色
 */
export const discordTheme: PlatformTheme = {
  id: "discord",
  name: "Discord",
  slug: "discord-chat-generator",
  trademark: { name: "Discord", owner: "Discord Inc." },
  colors: {
    light: {
      chatBg: "#ffffff",
      headerBg: "#ffffff",
      headerText: "#060607",
      headerSubText: "#949ba4",
      incomingBubble: "#ffffff",
      incomingText: "#313338",
      outgoingBubble: "#ffffff",
      outgoingText: "#313338",
      timestamp: "#949ba4",
      accent: "#5865f2",
      pillBg: "#ffffff",
      pillText: "#949ba4",
      footerBg: "#ffffff",
    },
    dark: {
      chatBg: "#313338",
      headerBg: "#313338",
      headerText: "#f2f3f5",
      headerSubText: "#949ba4",
      incomingBubble: "#313338",
      incomingText: "#dbdee1",
      outgoingBubble: "#313338",
      outgoingText: "#dbdee1",
      timestamp: "#949ba4",
      accent: "#5865f2",
      pillBg: "#313338",
      pillText: "#949ba4",
      footerBg: "#313338",
    },
  },
  bubble: {
    radius: 0,
    maxWidthPct: 100,
    fontSize: 15,
    fontFamily: SYSTEM_FONT,
    tailOnFirst: false,
  },
  features: {
    receipt: false,
    avatar: true,
    dateSeparator: true,
    senderNames: true,
    imageMessage: true,
    perMessageTimestamp: false,
    deliveryLine: false,
  },
  statusBarStyle: "ios",
  supportedModes: ["light", "dark"],
};

/**
 * Telegram（iOS 单聊）
 *
 * 第六种结构 —— 与 WhatsApp 同为"气泡内时间戳+勾"，但气质完全不同：
 * 1. 外发气泡是签名性的淡绿 #eeffde（暗色为蓝 #2b5278），不是 WhatsApp 绿白
 * 2. 勾只有两种语义：单勾=已发送，双勾=已读（没有"已送达"态）
 * 3. 聊天背景是壁纸感的浅灰蓝 #e7ebf0（暗色 #0e1621 深蓝夜色）
 */
export const telegramTheme: PlatformTheme = {
  id: "telegram",
  name: "Telegram",
  slug: "telegram-chat-generator",
  trademark: { name: "Telegram", owner: "Telegram FZ-LLC" },
  colors: {
    light: {
      chatBg: "#e7ebf0",
      headerBg: "#ffffff",
      headerText: "#000000",
      headerSubText: "#8e9d9f",
      incomingBubble: "#ffffff",
      incomingText: "#000000",
      outgoingBubble: "#eeffde",
      outgoingText: "#000000",
      timestamp: "#a1aab3",
      accent: "#4fae4e",
      pillBg: "#ffffff",
      pillText: "#8e9d9f",
      footerBg: "#ffffff",
    },
    dark: {
      chatBg: "#0e1621",
      headerBg: "#17212b",
      headerText: "#ffffff",
      headerSubText: "#7d8e98",
      incomingBubble: "#182533",
      incomingText: "#ffffff",
      outgoingBubble: "#2b5278",
      outgoingText: "#ffffff",
      timestamp: "#7d8e98",
      accent: "#62bd5a",
      pillBg: "#1f2c39",
      pillText: "#7d8e98",
      footerBg: "#17212b",
    },
  },
  bubble: {
    radius: 16,
    maxWidthPct: 75,
    fontSize: 15,
    fontFamily: SYSTEM_FONT,
    tailOnFirst: true,
  },
  features: {
    receipt: true,
    avatar: true,
    dateSeparator: true,
    senderNames: false,
    imageMessage: true,
    perMessageTimestamp: true,
    deliveryLine: false,
  },
  statusBarStyle: "ios",
  supportedModes: ["light", "dark"],
};

export const themes: Partial<Record<PlatformId, PlatformTheme>> = {
  whatsapp: whatsappTheme,
  "text-message": textMessageTheme,
  "group-chat": groupChatTheme,
  messenger: messengerTheme,
  discord: discordTheme,
  telegram: telegramTheme,
};

export function getTheme(id: PlatformId): PlatformTheme {
  const t = themes[id];
  if (!t) throw new Error(`Theme not implemented: ${id}`);
  return t;
}
