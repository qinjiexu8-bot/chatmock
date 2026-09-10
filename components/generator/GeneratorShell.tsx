"use client";

import { useCallback, useRef, useState } from "react";
import EditorPanel from "@/components/EditorPanel";
import PhoneFrame from "@/components/PhoneFrame";
import TextMessageChat from "@/components/chats/TextMessageChat";
import WhatsAppChat from "@/components/chats/WhatsAppChat";
import MessengerChat from "@/components/chats/MessengerChat";
import { exportNodeAsPng } from "@/lib/export";
import { getTheme } from "@/lib/themes";
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
  const [frame, setFrame] = useState(true);
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-0 border border-black/10 rounded-2xl overflow-hidden bg-white">
      {/* ---------------- 左：编辑面板 ---------------- */}
      <div className="border-b lg:border-b-0 lg:border-r border-black/10 bg-[#fbfcfc]">
        <div className="max-h-[78vh] overflow-y-auto p-5">
          <EditorPanel
            conversation={conversation}
            setConversation={setConversation}
            theme={theme}
          />
        </div>
      </div>

      {/* ---------------- 右：预览 + 导出 ---------------- */}
      <div className="flex flex-col">
        <div className="flex flex-wrap items-center gap-2 px-5 py-3 border-b border-black/10 bg-white">
          <button
            onClick={download}
            disabled={busy}
            className="px-4 py-2 rounded-lg bg-[#008069] text-white text-[13.5px] font-medium hover:bg-[#006b58] disabled:opacity-60 transition"
          >
            {busy ? "Exporting…" : "Download PNG"}
          </button>

          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-black/5">
            {SCALES.map((s) => (
              <button
                key={s.value}
                onClick={() => setScale(s.value)}
                className={`px-2.5 py-1.5 rounded-md text-[12.5px] transition ${
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
            className="px-3 py-2 rounded-lg border border-black/15 text-[12.5px] text-black/60 hover:border-black/30"
          >
            Reset
          </button>
        </div>

        <div className="flex-1 flex items-start justify-center p-6 sm:p-10 bg-[radial-gradient(circle_at_1px_1px,#e6eaea_1px,transparent_0)] [background-size:18px_18px]">
          <div ref={exportRef} data-export-root>
            <PhoneFrame
              statusBar={conversation.statusBar}
              showStatusBar={conversation.showStatusBar}
              mode={conversation.mode}
              frame={frame}
            >
              {platformId === "whatsapp" || platformId === "group-chat" ? (
                <WhatsAppChat conversation={conversation} theme={theme} />
              ) : platformId === "text-message" ? (
                <TextMessageChat conversation={conversation} theme={theme} />
              ) : platformId === "messenger" ? (
                <MessengerChat conversation={conversation} theme={theme} />
              ) : null}
            </PhoneFrame>
          </div>
        </div>

        <p className="px-5 pb-4 text-[11.5px] text-black/40 text-center">
          Everything runs in your browser. Nothing you type is uploaded to a server.
        </p>
      </div>
    </div>
  );
}
