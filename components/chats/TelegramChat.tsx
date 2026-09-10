"use client";

import type { Conversation, Message, PlatformTheme, ReceiptState } from "@/lib/types";

interface Props {
  conversation: Conversation;
  theme: PlatformTheme;
}

/**
 * Telegram 回执：单勾=已发送，双勾=已读（没有"已送达"态，delivered 也渲染成双勾）。
 * 与 WhatsApp 的差别：勾是细线条风格，双勾不重叠。
 */
function Ticks({ state, color }: { state: ReceiptState; color: string }) {
  if (state === "sent") {
    return (
      <svg width="14" height="10" viewBox="0 0 14 10" fill="none" style={{ flexShrink: 0 }}>
        <path
          d="M1 5.2 L4 8.2 L9.6 1.8"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg width="19" height="10" viewBox="0 0 19 10" fill="none" style={{ flexShrink: 0 }}>
      <path
        d="M1 5.2 L4 8.2 L9.6 1.8"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.8 5.2 L9.8 8.2 L15.4 1.8"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Avatar({
  src,
  name,
  size = 38,
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
  // Telegram 默认头像：实色圆 + 白色首字母
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#72d5fd",
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

export default function TelegramChat({ conversation, theme }: Props) {
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
      {/* ---------------- Header ---------------- */}
      <div
        className="flex items-center gap-3 px-3"
        style={{
          background: c.headerBg,
          height: 56,
          flexShrink: 0,
          paddingTop: 4,
          borderBottom: `0.5px solid ${conversation.mode === "dark" ? "#101921" : "#e3e6e8"}`,
        }}
      >
        <svg width="11" height="19" viewBox="0 0 11 19" fill="none" style={{ flexShrink: 0 }}>
          <path
            d="M9.5 1.5 L1.5 9.5 L9.5 17.5"
            stroke={c.headerText}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {features.avatar ? (
          <Avatar src={conversation.avatar} name={conversation.title} size={38} />
        ) : null}
        <div className="flex-1 min-w-0">
          <div
            style={{
              color: c.headerText,
              fontSize: 16,
              fontWeight: 600,
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {conversation.title}
          </div>
          <div style={{ color: c.headerSubText, fontSize: 12.5, lineHeight: 1.3 }}>
            {conversation.subtitle}
          </div>
        </div>
        <div className="flex items-center gap-4" style={{ color: c.headerText }}>
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
            <path
              d="M16.5 13.3v2c0 .9-.8 1.7-1.7 1.6-2.4-.2-4.7-1-6.8-2.2a16.4 16.4 0 0 1-5-5C1.8 7.6 1 5.3.8 2.9.7 2 1.4 1.2 2.3 1.2h2c.8 0 1.5.6 1.6 1.4.1.8.3 1.6.6 2.3.2.5.1 1.1-.3 1.5l-1 1.1a14 14 0 0 0 4.7 4.7l1.1-1c.4-.4 1-.5 1.5-.3.7.3 1.5.5 2.3.6.8.1 1.4.8 1.4 1.6Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          <svg width="4" height="16" viewBox="0 0 4 16" fill="none">
            <circle cx="2" cy="3" r="1.6" fill="currentColor" />
            <circle cx="2" cy="8" r="1.6" fill="currentColor" />
            <circle cx="2" cy="13" r="1.6" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* ---------------- Chat area ---------------- */}
      <div
        className="flex-1 flex flex-col gap-[3px] px-3 py-3"
        style={{ background: c.chatBg }}
      >
        {features.dateSeparator && conversation.dateSeparator ? (
          <div className="flex justify-center mb-1.5">
            <span
              style={{
                background: c.pillBg,
                color: c.pillText,
                fontSize: 12.5,
                fontWeight: 500,
                padding: "4px 12px",
                borderRadius: 14,
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
                {bubble.tailOnFirst && newGroup ? (
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      [isSelf ? "right" : "left"]: -5,
                      width: 0,
                      height: 0,
                      borderBottom: `9px solid ${isSelf ? c.outgoingBubble : c.incomingBubble}`,
                      [isSelf ? "borderLeft" : "borderRight"]: "7px solid transparent",
                      borderTop: "4px solid transparent",
                    }}
                  />
                ) : null}

                <div
                  style={{
                    background: isSelf ? c.outgoingBubble : c.incomingBubble,
                    color: isSelf ? c.outgoingText : c.incomingText,
                    fontSize: bubble.fontSize,
                    lineHeight: 1.35,
                    padding: "6px 9px 7px 10px",
                    borderRadius: bubble.radius,
                    [isSelf ? "borderBottomRightRadius" : "borderBottomLeftRadius"]:
                      newGroup ? 4 : bubble.radius,
                    wordBreak: "break-word",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {features.senderNames && !isSelf ? (
                    <div
                      style={{
                        color: sender?.color ?? c.accent,
                        fontSize: 13.5,
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
                        borderRadius: 8,
                        marginBottom: m.text ? 5 : 0,
                      }}
                    />
                  ) : null}

                  {m.text ? <span>{m.text}</span> : null}

                  <span
                    className="inline-flex items-center gap-1 align-bottom"
                    style={{ float: "right", marginLeft: 8, marginTop: 5, height: 13 }}
                  >
                    <span style={{ fontSize: 11, color: c.timestamp, lineHeight: "13px" }}>
                      {m.timestamp}
                    </span>
                    {features.receipt && isSelf && m.receipt ? (
                      <Ticks
                        state={m.receipt}
                        color={m.receipt === "sent" ? c.timestamp : c.accent}
                      />
                    ) : null}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ---------------- Footer（纯视觉） ---------------- */}
      <div
        className="flex items-center gap-2.5 px-3"
        style={{
          background: c.footerBg,
          minHeight: 54,
          flexShrink: 0,
          paddingTop: 8,
          paddingBottom: 14,
          borderTop: `0.5px solid ${conversation.mode === "dark" ? "#101921" : "#e3e6e8"}`,
        }}
      >
        <div
          className="flex-1 flex items-center gap-2.5"
          style={{
            background: conversation.mode === "dark" ? "#232e3c" : "#f1f4f7",
            borderRadius: 20,
            padding: "8px 13px",
            minHeight: 36,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="9" cy="9" r="8.25" stroke={c.timestamp} strokeWidth="1.4" />
            <circle cx="6.2" cy="7.4" r="1" fill={c.timestamp} />
            <circle cx="11.8" cy="7.4" r="1" fill={c.timestamp} />
            <path d="M6 10.6 a3.6 3.6 0 0 0 6 0" stroke={c.timestamp} strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 14.5, color: c.timestamp, flex: 1 }}>Message</span>
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" style={{ flexShrink: 0 }}>
            <path
              d="M14.5 7.8 L8.9 13.4 a4.2 4.2 0 0 1-6-6 L9 1.3 a2.8 2.8 0 0 1 4 4 L7 11.3 a1.4 1.4 0 0 1-2-2 L10 4.3"
              stroke={c.timestamp}
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            // Telegram 输入右侧的绿色麦克风/发送键
            background: "#4fae4e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {/* 麦克风（输入为空时的真机状态） */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="5.4" y="1.2" width="5.2" height="8.6" rx="2.6" stroke="#fff" strokeWidth="1.4" />
            <path d="M3 7.8 a5 5 0 0 0 10 0 M8 12.8 v2.4" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
