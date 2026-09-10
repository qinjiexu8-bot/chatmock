"use client";

import type { Conversation, Message, PlatformTheme, ReceiptState } from "@/lib/types";
import { doodleTile } from "@/lib/doodle";

interface Props {
  conversation: Conversation;
  theme: PlatformTheme;
}

/** WhatsApp 已读回执：单灰勾 / 双灰勾 / 双蓝勾 */
function Ticks({ state, color }: { state: ReceiptState; color: string }) {
  if (state === "sent") {
    return (
      <svg width="16" height="11" viewBox="0 0 16 11" fill="none" style={{ flexShrink: 0 }}>
        <path
          d="M1 6.1 L4.1 9.2 L10.4 2.4"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg width="18" height="11" viewBox="0 0 18 11" fill="none" style={{ flexShrink: 0 }}>
      <path
        d="M1 6.1 L4.1 9.2 L12.4 2.4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.4 6.1 L10.5 9.2 L16.9 2.4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Avatar({
  src,
  name,
  size = 40,
}: {
  src: string | null;
  name: string;
  size?: number;
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          objectFit: "cover",
          flexShrink: 0,
        }}
      />
    );
  }
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "linear-gradient(135deg,#c9c6bf,#9aa5a0)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: size * 0.42,
        fontWeight: 500,
        flexShrink: 0,
      }}
    >
      {name.slice(0, 1).toUpperCase()}
    </div>
  );
}

void Avatar;

/**
 * WhatsApp 默认壁纸：浅色 = 米色底 + 白色涂鸦线稿（真机默认 doodle 壁纸）；
 * 深色 = 纯 #0b141a（真机深色默认壁纸无明显涂鸦）。
 */
function wallpaper(mode: "light" | "dark"): React.CSSProperties {
  if (mode === "dark") {
    return { background: "#0b141a" };
  }
  return {
    background: "#efeae2",
    backgroundImage: doodleTile("#ffffff", 0.4),
    backgroundSize: "280px 280px",
  };
}

export default function WhatsAppChat({ conversation, theme }: Props) {
  const c = theme.colors[conversation.mode];
  const { bubble, features } = theme;

  const selfId =
    conversation.participants.find((p) => p.isSelf)?.id ?? "self";

  return (
    <div
      className="flex flex-col w-full h-full"
      style={{
        background: c.chatBg,
        fontFamily: bubble.fontFamily,
      }}
    >
      {/* ---------------- Header（iOS 版：无绿头、无头像，标题居中） ---------------- */}
      <div
        className="relative flex items-center px-3"
        style={{
          background: c.headerBg,
          height: 54,
          flexShrink: 0,
        }}
      >
        <svg width="11" height="19" viewBox="0 0 11 19" fill="none" style={{ flexShrink: 0 }}>
          <path
            d="M9.5 1.5 L1.5 9.5 L9.5 17.5"
            stroke={c.headerText}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {/* 绝对居中标题块（真机 iOS 导航模式） */}
        <div
          className="absolute left-1/2 -translate-x-1/2 text-center"
          style={{ maxWidth: "55%", top: "50%", transform: "translate(-50%, -50%)" }}
        >
          <div
            style={{
              color: c.headerText,
              fontSize: 16.5,
              fontWeight: 600,
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {conversation.title}
          </div>
          {conversation.subtitle ? (
            <div style={{ color: c.headerSubText, fontSize: 12, lineHeight: 1.3 }}>
              {conversation.subtitle}
            </div>
          ) : null}
        </div>
        <div className="ml-auto flex items-center gap-5" style={{ color: c.headerText }}>
          <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
            <rect x="0.8" y="1.8" width="12" height="12.4" rx="2.6" stroke="currentColor" strokeWidth="1.6" />
            <path d="M13.6 6.6 L19 4.2 v7.6 l-5.4-2.4 z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M16 12.2v1.9c0 .9-.8 1.6-1.7 1.5-2.3-.2-4.5-.9-6.5-2.1a15.6 15.6 0 0 1-4.8-4.8C1.8 6.7 1.1 4.5.9 2.2.8 1.3 1.5.5 2.4.5h1.9c.8 0 1.5.6 1.6 1.4.1.8.3 1.5.6 2.2.2.5.1 1.1-.2 1.5L5.5 7c-.3.4-.3.9 0 1.2a11.9 11.9 0 0 0 4.3 3.5c.4.2.9.2 1.2-.1l1.3-1.1c.4-.3 1-.4 1.5-.2.7.3 1.4.5 2.2.6.8.1 1.4.8 1.4 1.6Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      {/* ---------------- Chat area ---------------- */}
      <div
        className="flex-1 flex flex-col gap-[6px] px-3 py-3"
        style={wallpaper(conversation.mode)}
      >
        {features.dateSeparator && conversation.dateSeparator ? (
          <div className="flex justify-center mb-1">
            <span
              style={{
                background: c.pillBg,
                color: c.pillText,
                fontSize: 12,
                padding: "5px 12px",
                borderRadius: 8,
                boxShadow: "0 1px 0.5px rgba(11,20,26,0.13)",
              }}
            >
              {conversation.dateSeparator}
            </span>
          </div>
        ) : null}

        {conversation.messages.map((m: Message, i: number) => {
          const isSelf = m.senderId === selfId;
          const prev = conversation.messages[i - 1];
          const newGroup = !prev || prev.senderId !== m.senderId;
          const sender = conversation.participants.find((p) => p.id === m.senderId);

          return (
            <div
              key={m.id}
              className={`flex ${isSelf ? "justify-end" : "justify-start"}`}
              style={{ marginTop: newGroup ? 4 : 0 }}
            >
              <div className="relative" style={{ maxWidth: `${bubble.maxWidthPct}%` }}>
                {/* 首条消息的尖角 */}
                {bubble.tailOnFirst && newGroup ? (
                  <span
                    style={{
                      position: "absolute",
                      top: 0,
                      [isSelf ? "right" : "left"]: -6,
                      width: 0,
                      height: 0,
                      borderTop: `8px solid ${isSelf ? c.outgoingBubble : c.incomingBubble}`,
                      [isSelf ? "borderRight" : "borderLeft"]: "8px solid transparent",
                      borderBottom: "8px solid transparent",
                    }}
                  />
                ) : null}

                <div
                  style={{
                    background: isSelf ? c.outgoingBubble : c.incomingBubble,
                    color: isSelf ? c.outgoingText : c.incomingText,
                    fontSize: bubble.fontSize,
                    lineHeight: 1.35,
                    padding: "6px 8px 8px 9px",
                    borderRadius: bubble.radius,
                    [isSelf ? "borderTopRightRadius" : "borderTopLeftRadius"]:
                      newGroup ? 0 : bubble.radius,
                    boxShadow: "0 1px 0.5px rgba(11,20,26,0.13)",
                    wordBreak: "break-word",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {features.senderNames && !isSelf ? (
                    <div
                      style={{
                        color: sender?.color ?? c.accent,
                        fontSize: 13,
                        fontWeight: 500,
                        marginBottom: 2,
                      }}
                    >
                      {sender?.name ?? ""}
                    </div>
                  ) : null}

                  {m.image ? (
                    <img
                      src={m.image}
                      alt=""
                      style={{
                        display: "block",
                        width: "100%",
                        borderRadius: 6,
                        marginBottom: m.text ? 5 : 0,
                      }}
                    />
                  ) : null}

                  {m.text ? (
                    // flex 布局防 float 悬垂：float 在末行宽度不足时会掉出气泡背景外
                    <div style={{ display: "flex", alignItems: "flex-end" }}>
                      <span style={{ flex: "1 1 auto", minWidth: 0, wordBreak: "break-word" }}>
                        {m.text}
                      </span>
                      <span
                        className="inline-flex items-center gap-1"
                        style={{ marginLeft: 8, marginBottom: -1, height: 14, flexShrink: 0 }}
                      >
                        <span style={{ fontSize: 11, color: c.timestamp, lineHeight: "14px" }}>
                          {m.timestamp}
                        </span>
                        {features.receipt && isSelf && m.receipt ? (
                          <Ticks
                            state={m.receipt}
                            color={m.receipt === "read" ? c.accent : c.timestamp}
                          />
                        ) : null}
                      </span>
                    </div>
                  ) : m.image ? (
                    <div
                      className="flex justify-end items-center gap-1"
                      style={{ paddingTop: 3 }}
                    >
                      <span style={{ fontSize: 11, color: c.timestamp, lineHeight: "14px" }}>
                        {m.timestamp}
                      </span>
                      {features.receipt && isSelf && m.receipt ? (
                        <Ticks
                          state={m.receipt}
                          color={m.receipt === "read" ? c.accent : c.timestamp}
                        />
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ---------------- Footer（iOS 版：左侧波形圆钮 + 胶囊输入框，无绿色麦克风） ---------------- */}
      <div
        className="flex items-center gap-3 px-3"
        style={{
          background: c.footerBg,
          minHeight: 56,
          flexShrink: 0,
          paddingBottom: 12,
          paddingTop: 8,
        }}
      >
        {/* 语音备忘录圆钮 */}
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: conversation.mode === "dark" ? "#2a3942" : "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 1px 1.5px rgba(11,20,26,0.1)",
          }}
        >
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
            {[
              { x: 0.5, h: 5 },
              { x: 4.5, h: 10 },
              { x: 8.5, h: 14 },
              { x: 12.5, h: 8 },
              { x: 16.5, h: 4 },
            ].map((b, i) => (
              <rect
                key={i}
                x={b.x}
                y={(14 - b.h) / 2}
                width="2.2"
                height={b.h}
                rx="1.1"
                fill={conversation.mode === "dark" ? "#8696a0" : "#54656f"}
              />
            ))}
          </svg>
        </div>
        {/* 输入胶囊：Message 占位 + 右端表情/加号（真机 iOS 结构） */}
        <div
          className="flex-1 flex items-center"
          style={{
            background: conversation.mode === "dark" ? "#2a3942" : "#ffffff",
            borderRadius: 20,
            padding: "8px 14px",
            minHeight: 38,
          }}
        >
          <span style={{ fontSize: 15.5, color: "#8696a0" }}>Message</span>
          <span className="ml-auto flex items-center gap-3.5" style={{ color: conversation.mode === "dark" ? "#8696a0" : "#54656f" }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8.4" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="7" cy="8.2" r="1.1" fill="currentColor" />
              <circle cx="13" cy="8.2" r="1.1" fill="currentColor" />
              <path d="M6.4 12 a4.4 4.4 0 0 0 7.2 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </svg>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2.5 v13 M2.5 9 h13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
