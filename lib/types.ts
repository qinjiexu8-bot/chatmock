/**
 * ChatMock 核心数据模型
 *
 * 设计约束（来自方案 7.1）：12 个平台共用同一套会话数据模型，只换 PlatformTheme。
 * 新增一个平台 = 新增一份 PlatformTheme + 一个渲染组件，不改这里的任何类型。
 */

export type ThemeMode = "light" | "dark";

/** 已读回执：单灰勾=已发送，双灰勾=已送达，双蓝勾=已读 */
export type ReceiptState = "sent" | "delivered" | "read";

export type PlatformId =
  | "whatsapp"
  | "imessage"
  | "messenger"
  | "text-message"
  | "android-sms"
  | "discord"
  | "telegram"
  | "instagram-dm"
  | "group-chat"
  | "snapchat"
  | "whatsapp-call";

export interface Participant {
  id: string;
  name: string;
  /** dataURL，本地处理不上传 */
  avatar: string | null;
  isSelf: boolean;
  /** 群聊里每个发送者的名字颜色 */
  color?: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  /** dataURL */
  image?: string | null;
  /** HH:mm */
  timestamp: string;
  receipt?: ReceiptState;
  /** 仅通话记录页使用：该行的通话方向 */
  call?: "outgoing" | "incoming" | "missed";
  /** 仅通话记录页使用：视频通话（方向由 call 决定，媒介由本字段决定） */
  video?: boolean;
}

export interface StatusBar {
  time: string;
  battery: number; // 0-100
  wifi: boolean;
  signal: number; // 0-4
  carrier: string;
}

export interface Conversation {
  platformId: PlatformId;
  mode: ThemeMode;
  /** header 主标题（对方名字 / 群名） */
  title: string;
  /** header 副标题（online / last seen today at 20:14 / typing...） */
  subtitle: string;
  avatar: string | null;
  participants: Participant[];
  messages: Message[];
  statusBar: StatusBar;
  showStatusBar: boolean;
  dateSeparator: string;
  /** 仅 iOS Messages 使用：末条外发消息下方的投递状态行（Delivered / Read / Sending） */
  deliveryText?: string;
}

// ---------------------------------------------------------------- 主题

export interface ThemeColors {
  /** 聊天区背景 */
  chatBg: string;
  /** 顶部栏背景 */
  headerBg: string;
  headerText: string;
  headerSubText: string;
  /** 收件气泡 */
  incomingBubble: string;
  incomingText: string;
  /** 外发气泡 */
  outgoingBubble: string;
  outgoingText: string;
  /** 时间戳 / 次要文字 */
  timestamp: string;
  /** 强调色（WhatsApp 蓝勾、链接等） */
  accent: string;
  /** 日期分隔符胶囊 */
  pillBg: string;
  pillText: string;
  /** 输入栏 / 底部区 */
  footerBg: string;
}

export interface PlatformTheme {
  id: PlatformId;
  name: string;
  slug: string;
  /** 商标声明用，每页页脚必须输出 */
  trademark: { name: string; owner: string };
  colors: { light: ThemeColors; dark: ThemeColors };
  bubble: {
    radius: number;
    /** 气泡最大宽度占聊天区百分比 */
    maxWidthPct: number;
    fontSize: number;
    fontFamily: string;
    /** 首条消息是否带小尖角 */
    tailOnFirst: boolean;
  };
  features: {
    /** 是否渲染已读回执（WhatsApp 勾） */
    receipt: boolean;
    avatar: boolean;
    dateSeparator: boolean;
    /** 群聊：显示彩色发送者名 */
    senderNames: boolean;
    imageMessage: boolean;
    /** 每条气泡内是否显示时间戳（iMessage 没有，只有顶部日期 + 末条 Delivered） */
    perMessageTimestamp: boolean;
    /** 末条外发消息下方是否显示投递状态行（iMessage 的 Delivered） */
    deliveryLine: boolean;
    /** 通话记录页：消息行渲染为通话条目，编辑器显示方向选择器 */
    callLog?: boolean;
  };
  statusBarStyle: "ios" | "android" | "none";
  supportedModes: ThemeMode[];
}

// ---------------------------------------------------------------- 默认会话

export const defaultStatusBar: StatusBar = {
  time: "9:41",
  battery: 82,
  wifi: true,
  signal: 4,
  carrier: "Carrier",
};

export function createDefaultConversation(platformId: PlatformId): Conversation {
  const self: Participant = {
    id: "self",
    name: "You",
    avatar: null,
    isSelf: true,
  };
  const other: Participant = {
    id: "other",
    name: "Alex",
    avatar: null,
    isSelf: false,
  };
  return {
    platformId,
    mode: "light",
    title: "Alex",
    subtitle: "online",
    avatar: null,
    participants: [self, other],
    messages: [
      { id: "m1", senderId: "other", text: "Hey! Did you see the new mockup?", timestamp: "9:32", },
      { id: "m2", senderId: "self", text: "Just opened it. Looks spot on.", timestamp: "9:33", receipt: "read" },
      { id: "m3", senderId: "other", text: "Right? Nobody will guess it's a mockup.", timestamp: "9:34" },
      { id: "m4", senderId: "self", text: "Exporting the PNG now.", timestamp: "9:35", receipt: "read" },
    ],
    statusBar: { ...defaultStatusBar },
    showStatusBar: true,
    dateSeparator: "Today",
    deliveryText: "Delivered",
  };
}

export function newId(prefix = "id"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}
