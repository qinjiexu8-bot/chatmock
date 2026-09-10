"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import EditorPanel from "@/components/EditorPanel";
import { PlatformIcon } from "@/components/PlatformIcon";
import PhoneFrame from "@/components/PhoneFrame";
import TextMessageChat from "@/components/chats/TextMessageChat";
import WhatsAppChat from "@/components/chats/WhatsAppChat";
import MessengerChat from "@/components/chats/MessengerChat";
import DiscordChat from "@/components/chats/DiscordChat";
import TelegramChat from "@/components/chats/TelegramChat";
import InstagramChat from "@/components/chats/InstagramChat";
import SnapchatChat from "@/components/chats/SnapchatChat";
import WhatsAppCallLog from "@/components/chats/WhatsAppCallLog";
import AndroidSmsChat from "@/components/chats/AndroidSmsChat";
import { exportNodeAsPng } from "@/lib/export";
import { getTheme } from "@/lib/themes";
import { livePages } from "@/lib/seo";
import {
  createDefaultConversation,
  type Conversation,
  type PlatformId,
} from "@/lib/types";

interface Props {
  platformId: PlatformId;
}

/** 各平台的默认会话差异（WhatsApp 用 TODAY，iOS 用真实时间格式，群聊自带成员） */
const PLATFORM_DEFAULTS: Partial<Record<PlatformId, Partial<Conversation>>> = {
  "text-message": { dateSeparator: "Today 9:41", deliveryText: "Delivered" },
  messenger: {
    dateSeparator: "Today 9:41",
    subtitle: "Active now",
    deliveryText: "Seen",
  },
  telegram: {
    dateSeparator: "Today",
    subtitle: "last seen recently",
  },
  "instagram-dm": {
    dateSeparator: "Mon 9:41",
    subtitle: "",
    deliveryText: "Seen",
  },
  snapchat: {
    dateSeparator: "Today",
    subtitle: "",
    deliveryText: "Delivered",
  },
  "whatsapp-call": {
    title: "Calls",
    subtitle: "",
    participants: [
      { id: "self", name: "You", avatar: null, isSelf: true },
      { id: "p_emma", name: "Emma", avatar: null, isSelf: false },
      { id: "p_marcus", name: "Marcus", avatar: null, isSelf: false },
      { id: "p_sofia", name: "Sofia", avatar: null, isSelf: false },
    ],
    messages: [
      { id: "c1", senderId: "p_marcus", text: "12 min", timestamp: "9:32", call: "incoming" },
      { id: "c2", senderId: "p_sofia", text: "3 min", timestamp: "8:15", call: "outgoing" },
      { id: "c3", senderId: "p_emma", text: "", timestamp: "Yesterday", call: "missed" },
      { id: "c4", senderId: "p_marcus", text: "27 min", timestamp: "Yesterday", call: "outgoing" },
    ],
  },
  "android-sms": {
    dateSeparator: "Today",
    subtitle: "Mobile",
    deliveryText: "Read",
  },
  discord: {
    title: "general",
    subtitle: "Welcome to the server",
    dateSeparator: "Today",
    participants: [
      { id: "self", name: "You", avatar: null, isSelf: true, color: "#5865f2" },
      { id: "p_alex", name: "alex_plays", avatar: null, isSelf: false, color: "#eb459e" },
      { id: "p_sam", name: "samstream", avatar: null, isSelf: false, color: "#57f287" },
    ],
    messages: [
      { id: "d1", senderId: "p_alex", text: "Stream starts at 8, do not be late.", timestamp: "7:52" },
      { id: "d2", senderId: "p_sam", text: "Setting up my mic right now.", timestamp: "7:54" },
      { id: "d3", senderId: "self", text: "I will join from the laptop.", timestamp: "7:56" },
      { id: "d4", senderId: "p_alex", text: "Ping me when you are in.", timestamp: "7:57" },
    ],
  },
  "group-chat": {
    title: "Weekend Trip",
    subtitle: "You, Alex, Sam, Jordan",
    participants: [
      { id: "self", name: "You", avatar: null, isSelf: true },
      { id: "p_alex", name: "Alex", avatar: null, isSelf: false, color: "#e542a3" },
      { id: "p_sam", name: "Sam", avatar: null, isSelf: false, color: "#02a698" },
      { id: "p_jordan", name: "Jordan", avatar: null, isSelf: false, color: "#dc691a" },
    ],
    messages: [
      { id: "g1", senderId: "p_alex", text: "Guys, the cabin is booked for Saturday.", timestamp: "9:32" },
      { id: "g2", senderId: "p_sam", text: "Perfect. Who is driving?", timestamp: "9:33" },
      { id: "g3", senderId: "self", text: "I can take three people + gear.", timestamp: "9:34", receipt: "read" },
      { id: "g4", senderId: "p_jordan", text: "Claiming a seat right now.", timestamp: "9:35" },
      { id: "g5", senderId: "p_alex", text: "Parking is free after 6pm, by the way.", timestamp: "9:36" },
    ],
  },
};

function defaultConversation(platformId: PlatformId): Conversation {
  const base = createDefaultConversation(platformId);
  return { ...base, ...(PLATFORM_DEFAULTS[platformId] ?? {}) };
}

const SCALES = [
  { label: "1x", value: 1 },
  { label: "2x", value: 2 },
  { label: "3x", value: 3 },
];

export default function GeneratorShell({ platformId }: Props) {
  const theme = getTheme(platformId);
  const [conversation, setConversation] = useState<Conversation>(() =>
    defaultConversation(platformId)
  );
  // 默认不带手机外框：手机截图是 OS 层面截取的屏幕内容，永远不会有机身。
  // 外框只作为"设备 mockup"风格选项保留（Phone frame 勾选）。
  const [frame, setFrame] = useState(false);
  const [scale, setScale] = useState(2);
  const [busy, setBusy] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);

  const download = useCallback(async () => {
    if (!exportRef.current) return;
    setBusy(true);
    try {
      const safeName = (conversation.title || "chat").replace(/[^\w-]+/g, "_").slice(0, 40);
      await exportNodeAsPng(exportRef.current, {
        scale,
        filename: `chatmock-${theme.slug}-${safeName}.png`,
      });
    } catch (e) {
      console.error(e);
      alert("Export failed. Please try again, or switch to 1x scale.");
    } finally {
      setBusy(false);
    }
  }, [conversation.title, scale, theme.slug]);

  const reset = useCallback(() => {
    setConversation(defaultConversation(platformId));
  }, [platformId]);

  // 预览自适应：小屏容器 < 预览宽（390 无框 / 带框更宽）时按比例缩放显示。
  // transform 只加在包裹层上，导出节点 [data-export-root] 本身尺寸不变，导出不受影响。
  const previewBoxRef = useRef<HTMLDivElement>(null);
  const [fitScale, setFitScale] = useState(1);
  const [chatSize, setChatSize] = useState({ w: 390, h: 780 });

  useEffect(() => {
    const box = previewBoxRef.current;
    const node = exportRef.current;
    if (!box || !node) return;
    const measure = () => {
      const w = node.offsetWidth || 390;
      const h = node.offsetHeight || 780;
      setChatSize({ w, h });
      setFitScale(Math.min(1, box.clientWidth / w));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(box);
    ro.observe(node);
    return () => ro.disconnect();
  }, [frame, platformId]);

  return (
    <div className="rounded-[var(--radius-panel)] border border-black/[0.08] overflow-clip bg-white/80 shadow-[0_8px_30px_rgba(30,35,80,0.06)]">
      {/* ---------------- 顶部：平台切换条（工具页之间一键横跳） ---------------- */}
      <div className="border-b border-black/[0.08] bg-[#f8f9fd] px-3 py-2">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <span className="shrink-0 pr-1 text-[11px] font-medium uppercase tracking-wider text-black/35">
            Switch
          </span>
          {livePages.map((p) => {
            const active = p.platformId === platformId;
            return (
              <Link
                key={p.slug}
                href={`/${p.slug}`}
                aria-current={active ? "page" : undefined}
                className={`shrink-0 px-3 h-8 inline-flex items-center gap-1.5 rounded-full text-[12.5px] whitespace-nowrap transition ${
                  active
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-black/60 hover:bg-black/5 hover:text-black"
                }`}
              >
                <PlatformIcon platformId={p.platformId} />
                {p.name}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr]">
        {/* ---------------- 左：编辑面板 ----------------
            flex-col + lg:flex-1：桌面端编辑区滚动容器铺满整列高度（与右侧
            预览列等高，背景/边框不留截断），内容超出时容器内部滚动；
            min-h-0 允许 flex 子项收缩到内容高度以下，否则 overflow 失效。
            移动端单列堆叠时仍用 max-h-[78vh] 封顶。 */}
        <div className="border-b lg:border-b-0 lg:border-r border-black/[0.08] bg-[#f8f9fd] flex flex-col">
          <div className="max-h-[78vh] lg:max-h-none lg:min-h-0 lg:flex-1 overflow-y-auto overscroll-contain p-5">
            <EditorPanel
              conversation={conversation}
              setConversation={setConversation}
              theme={theme}
            />
          </div>
        </div>

      {/* ---------------- 右：预览 + 导出 ---------------- */}
      <div className="flex flex-col bg-white/60">
        <div className="flex flex-wrap items-center gap-2 px-5 py-3 border-b border-black/[0.08] bg-white/70">
          <button
            onClick={download}
            disabled={busy}
            className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-[13.5px] font-medium hover:opacity-90 disabled:opacity-60 transition"
          >
            {busy ? "Exporting…" : "Download PNG"}
          </button>

          <div className="flex items-center gap-1 p-0.5 rounded-full bg-black/5">
            {SCALES.map((s) => (
              <button
                key={s.value}
                onClick={() => setScale(s.value)}
                className={`px-2.5 py-1.5 rounded-full text-[12.5px] transition ${
                  scale === s.value
                    ? "bg-white shadow-sm font-medium"
                    : "text-black/55 hover:text-black/80"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-1.5 text-[12.5px] text-black/60 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={frame}
              onChange={(e) => setFrame(e.target.checked)}
              className="w-3.5 h-3.5"
            />
            Phone frame
          </label>

          <span className="flex-1" />

          <button
            onClick={reset}
            className="px-3 py-2 rounded-full border border-black/12 text-[12.5px] text-black/60 hover:border-black/30"
          >
            Reset
          </button>
        </div>

        <div
          ref={previewBoxRef}
          className="flex-1 flex items-start justify-center overflow-hidden p-4 sm:p-10"
        >
          <div
            className="relative"
            style={{ width: chatSize.w * fitScale, height: chatSize.h * fitScale }}
          >
            <div
              style={{
                width: chatSize.w,
                transform: `scale(${fitScale})`,
                transformOrigin: "top left",
              }}
            >
              <div ref={exportRef} data-export-root>
            <PhoneFrame
              statusBar={conversation.statusBar}
              showStatusBar={conversation.showStatusBar}
              mode={conversation.mode}
              frame={frame}
              statusBarStyle={theme.statusBarStyle}
              statusBarBg={theme.colors[conversation.mode].headerBg}
            >
              {platformId === "whatsapp" ? (
                <WhatsAppChat conversation={conversation} theme={theme} />
              ) : platformId === "text-message" ? (
                <TextMessageChat conversation={conversation} theme={theme} />
              ) : platformId === "messenger" ? (
                <MessengerChat conversation={conversation} theme={theme} />
              ) : platformId === "group-chat" ? (
                <WhatsAppChat conversation={conversation} theme={theme} />
              ) : platformId === "discord" ? (
                <DiscordChat conversation={conversation} theme={theme} />
              ) : platformId === "telegram" ? (
                <TelegramChat conversation={conversation} theme={theme} />
              ) : platformId === "instagram-dm" ? (
                <InstagramChat conversation={conversation} theme={theme} />
              ) : platformId === "snapchat" ? (
                <SnapchatChat conversation={conversation} theme={theme} />
              ) : platformId === "whatsapp-call" ? (
                <WhatsAppCallLog conversation={conversation} theme={theme} />
              ) : platformId === "android-sms" ? (
                <AndroidSmsChat conversation={conversation} theme={theme} />
              ) : null}
            </PhoneFrame>
          </div>
            </div>
          </div>
        </div>

        <p className="px-5 pb-4 text-[11.5px] text-black/40 text-center">
          Everything runs in your browser. Nothing you type is uploaded to a server.
        </p>
      </div>

      <div className="text-center pb-6 -mt-1">
        <Link
          href={`/examples/${livePages.find((p) => p.platformId === platformId)?.slug ?? ""}`}
          className="inline-flex items-center gap-1 text-[13.5px] font-medium text-primary hover:underline underline-offset-2"
        >
          See {theme.name} screenshot examples →
        </Link>
      </div>
      </div>
    </div>
  );
}
