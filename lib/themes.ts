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

export const themes: Partial<Record<PlatformId, PlatformTheme>> = {
  whatsapp: whatsappTheme,
  "text-message": textMessageTheme,
};

export function getTheme(id: PlatformId): PlatformTheme {
  const t = themes[id];
  if (!t) throw new Error(`Theme not implemented: ${id}`);
  return t;
}
