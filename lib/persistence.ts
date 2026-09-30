/**
 * 草稿本地持久化（localStorage）
 *
 * 三条硬约束（写错任何一条都会变成"用户数据丢失"级别的 bug）：
 *
 * 1. **只在浏览器端碰 localStorage**。所有读写都必须在 effect / 事件里发生，
 *    绝不能出现在 useState 初始化器里 —— 那会让客户端首次渲染的 DOM 与
 *    服务端预渲染的 HTML 不一致，触发 React 水合告警（本站是纯静态预渲染，
 *    34 条路由每次构建都要过这关）。
 *
 * 2. **键按平台分开**（`chatmock:v1:conversation:<platformId>`）。共用一把键会让
 *    切平台时把上一个平台的会话写到新平台下 —— 刷新后 WhatsApp 页里躺着
 *    一段 iMessage 的对话。
 *
 * 3. **读回来的东西一律当作不可信输入做归一化**。localStorage 是可以被用户手工
 *    改、被旧版本代码写脏、被浏览器插件污染的。归一化同时承担三件事：丢弃
 *    结构不对的记录、裁剪长度上限、把 platformId 不匹配的记录挡在门外。
 *
 * 配额策略：图片（头像 / 消息配图）以 dataURL 形式存在，是体积大户，几张手机
 * 原图就能撑爆 5MB 配额。溢出时**降级为只存文字**再存一次 —— 宁可丢掉图片，
 * 也不能让用户辛苦打的整段对话一起丢。
 */

import {
  createDefaultConversation,
  defaultStatusBar,
  type Conversation,
  type Message,
  type Participant,
  type PlatformId,
  type ReceiptState,
  type StatusBar,
} from "./types";

const VERSION = "v1";
const PREFIX = `chatmock:${VERSION}`;

/** 单条会话的存储键（按平台隔离） */
export function conversationKey(platformId: string): string {
  return `${PREFIX}:conversation:${platformId}`;
}

/** 全局偏好（缩放倍率 / 手机外框）的存储键 */
export const PREFS_KEY = `${PREFIX}:prefs`;

/** 长度上限：防止一条被污染的记录把页面撑爆 */
const MAX_MESSAGES = 120;
const MAX_PARTICIPANTS = 24;
const MAX_TEXT = 4000;

// ---------------------------------------------------------------- 归一化

function asString(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v.slice(0, MAX_TEXT) : fallback;
}

function isDataImage(v: unknown): v is string {
  return typeof v === "string" && v.startsWith("data:image/");
}

function normalizeParticipant(raw: unknown, index: number): Participant | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const id = asString(o.id);
  if (!id) return null;
  const color = asString(o.color);
  return {
    id,
    name: asString(o.name, `Member ${index + 1}`),
    avatar: isDataImage(o.avatar) ? o.avatar : null,
    isSelf: o.isSelf === true,
    ...(color ? { color } : {}),
  };
}

function normalizeMessage(
  raw: unknown,
  index: number,
  participantIds: Set<string>
): Message | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const senderId = asString(o.senderId);
  // 发送者已不存在（用户删过成员又靠旧记录恢复）→ 丢弃该条，
  // 否则渲染组件会取到 undefined 参与者而崩掉整页
  if (!senderId || !participantIds.has(senderId)) return null;

  const receipt: ReceiptState | undefined =
    o.receipt === "sent" || o.receipt === "delivered" || o.receipt === "read"
      ? o.receipt
      : undefined;
  const call =
    o.call === "outgoing" || o.call === "incoming" || o.call === "missed" ? o.call : undefined;

  return {
    id: asString(o.id) || `m_restored_${index}`,
    senderId,
    text: asString(o.text),
    timestamp: asString(o.timestamp, "9:41"),
    ...(isDataImage(o.image) ? { image: o.image } : {}),
    ...(receipt ? { receipt } : {}),
    ...(call ? { call } : {}),
    ...(o.video === true ? { video: true } : {}),
  };
}

function normalizeStatusBar(raw: unknown): StatusBar {
  const base = { ...defaultStatusBar };
  if (!raw || typeof raw !== "object") return base;
  const o = raw as Record<string, unknown>;
  return {
    time: asString(o.time, base.time),
    battery:
      typeof o.battery === "number" && o.battery >= 0 && o.battery <= 100
        ? Math.round(o.battery)
        : base.battery,
    wifi: o.wifi !== false,
    signal:
      typeof o.signal === "number" && o.signal >= 0 && o.signal <= 4
        ? Math.round(o.signal)
        : base.signal,
  };
}

/**
 * 把任意输入归一化为一份可安全喂给渲染器的 Conversation。
 * 返回 null 表示这条记录不可用（结构坏 / 平台不匹配），调用方应退回默认会话。
 */
export function normalizeConversation(
  raw: unknown,
  platformId: PlatformId
): Conversation | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;

  // 平台不匹配 → 丢弃。这条守卫是"切平台串味"的唯一防线
  if (o.platformId !== platformId) return null;

  const participants = (Array.isArray(o.participants) ? o.participants : [])
    .map(normalizeParticipant)
    .filter((p): p is Participant => p !== null)
    .slice(0, MAX_PARTICIPANTS);
  if (!participants.length) return null;
  // 没有"我"就渲染不出外发气泡，整页语义就废了
  if (!participants.some((p) => p.isSelf)) return null;

  const ids = new Set(participants.map((p) => p.id));
  const messages = (Array.isArray(o.messages) ? o.messages : [])
    .map((m, i) => normalizeMessage(m, i, ids))
    .filter((m): m is Message => m !== null)
    .slice(0, MAX_MESSAGES);

  const base = createDefaultConversation(platformId);

  return {
    platformId,
    mode: o.mode === "dark" ? "dark" : "light",
    title: asString(o.title, base.title),
    subtitle: asString(o.subtitle, base.subtitle),
    avatar: isDataImage(o.avatar) ? o.avatar : null,
    participants,
    // 消息全被过滤掉时不能留空数组，否则渲染成一片空白
    messages: messages.length ? messages : base.messages,
    statusBar: normalizeStatusBar(o.statusBar),
    showStatusBar: o.showStatusBar !== false,
    dateSeparator: asString(o.dateSeparator, base.dateSeparator),
    ...(typeof o.deliveryText === "string"
      ? { deliveryText: o.deliveryText.slice(0, MAX_TEXT) }
      : {}),
  };
}

// ---------------------------------------------------------------- 会话读写

export type SaveStatus =
  /** 完整保存 */
  | "saved"
  /** 保存成功但丢掉了图片（配额不够） */
  | "partial"
  /** 完全没保存（隐私模式 / 配额耗尽 / localStorage 被禁用） */
  | "failed";

/** 剥掉所有 dataURL 图片，用于配额溢出后的降级重试 */
function stripImages(c: Conversation): Conversation {
  return {
    ...c,
    avatar: null,
    participants: c.participants.map((p) => ({ ...p, avatar: null })),
    messages: c.messages.map((m) => ({ ...m, image: null })),
  };
}

export function loadConversation(platformId: PlatformId): Conversation | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(conversationKey(platformId));
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    // 兼容两种外壳：带 savedAt 的信封、以及早期直接落库的裸会话
    const payload =
      parsed && typeof parsed === "object" && "conversation" in parsed
        ? (parsed as { conversation: unknown }).conversation
        : parsed;
    return normalizeConversation(payload, platformId);
  } catch {
    return null;
  }
}

export function saveConversation(platformId: PlatformId, conversation: Conversation): SaveStatus {
  if (typeof window === "undefined") return "failed";
  const write = (c: Conversation) =>
    window.localStorage.setItem(
      conversationKey(platformId),
      JSON.stringify({ v: VERSION, savedAt: Date.now(), conversation: c })
    );
  try {
    write(conversation);
    return "saved";
  } catch {
    try {
      write(stripImages(conversation));
      return "partial";
    } catch {
      return "failed";
    }
  }
}

export function clearConversation(platformId: PlatformId): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(conversationKey(platformId));
  } catch {
    /* 清不掉也无所谓：下一次保存会覆盖同一把键 */
  }
}

// ---------------------------------------------------------------- 偏好

export interface Prefs {
  scale: number;
  frame: boolean;
}

export function loadPrefs(): Partial<Prefs> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(PREFS_KEY);
    if (!raw) return {};
    const o: unknown = JSON.parse(raw);
    if (!o || typeof o !== "object") return {};
    const p = o as Record<string, unknown>;
    return {
      scale: typeof p.scale === "number" && p.scale >= 1 && p.scale <= 3 ? Math.round(p.scale) : undefined,
      frame: typeof p.frame === "boolean" ? p.frame : undefined,
    };
  } catch {
    return {};
  }
}

export function savePrefs(prefs: Prefs): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch {
    /* 偏好丢了无关紧要，静默忽略 */
  }
}
