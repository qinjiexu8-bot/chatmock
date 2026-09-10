"use client";

import type { Conversation, Message, PlatformTheme } from "@/lib/types";

interface Props {
  conversation: Conversation;
  theme: PlatformTheme;
}

function Avatar({
  src,
  name,
  size,
}: {
  src: string | null;
  name: string;
  size: number;
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
  // Bitmoji 位近似：黄色圆 + 深色首字母
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#fffc00",
        border: "1px solid rgba(0,0,0,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#000000",
        fontSize: size * 0.42,
        fontWeight: 600,
        flexShrink: 0,
      }}
    >
      {name.slice(0, 1).toUpperCase()}
    </div>
  );
}

export default function SnapchatChat({ conversation, theme }: Props) {
  const c = theme.colors[conversation.mode];
  const { bubble, features } = theme;

  const selfId =
    conversation.participants.find((p) => p.isSelf)?.id ?? "self";

  const msgs = conversation.messages;

  return (
    <div
      className="flex flex-col w-full h-full"
      style={{
        background: c.chatBg,
        fontFamily: bubble.fontFamily,
      }}
    >
      {/* ---------------- 黄色 Header（Snapchat 身份所在） ---------------- */}
      <div
        className="flex items-center gap-2.5 px-3"
        style={{
          background: c.headerBg,
          height: 52,
          flexShrink: 0,
          paddingTop: 2,
          borderBottom: "1px solid rgba(0,0,0,0.9)",
        }}
      >
        <svg width="11" height="19" viewBox="0 0 11 19" fill="none" style={{ flexShrink: 0 }}>
          <path
            d="M9.5 1.5 L1.5 9.5 L9.5 17.5"
            stroke="#000000"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span
          style={{
            color: "#000000",
            fontSize: 16,
            fontWeight: 700,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {conversation.title}
        </span>

        <span className="flex-1" />

        {/* 通话 + 视频（黑描边） */}
        <svg width="18" height="18" viewBox="0 0 19 19" fill="none" style={{ flexShrink: 0 }}>
          <path
            d="M16.5 13.3v2c0 .9-.8 1.7-1.7 1.6-2.4-.2-4.7-1-6.8-2.2a16.4 16.4 0 0 1-5-5C1.8 7.6 1 5.3.8 2.9.7 2 1.4 1.2 2.3 1.2h2c.8 0 1.5.6 1.6 1.4.1.8.3 1.6.6 2.3.2.5.1 1.1-.3 1.5l-1 1.1a14 14 0 0 0 4.7 4.7l1.1-1c.4-.4 1-.5 1.5-.3.7.3 1.5.5 2.3.6.8.1 1.4.8 1.4 1.6Z"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
        <svg width="20" height="15" viewBox="0 0 20 15" fill="none" style={{ flexShrink: 0 }}>
          <rect x="0.75" y="1.75" width="12.5" height="11.5" rx="2.8" stroke="#000000" strokeWidth="1.5" />
          <path d="M14.5 5.6 L19.2 3.2 v8.6 l-4.7-2.4 z" stroke="#000000" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </div>

      {/* ---------------- 聊天区（白/黑底，不是黄！） ---------------- */}
      <div
        className="flex-1 flex flex-col px-3 py-3"
        style={{ background: c.chatBg, overflow: "hidden" }}
      >
        {features.dateSeparator && conversation.dateSeparator ? (
          <div className="flex justify-center" style={{ marginBottom: 12 }}>
            <span style={{ fontSize: 11.5, color: c.timestamp, fontWeight: 600 }}>
              {conversation.dateSeparator}
            </span>
          </div>
        ) : null}

        {msgs.map((m: Message, i: number) => {
          const isSelf = m.senderId === selfId;
          const prev = msgs[i - 1];
          const next = msgs[i + 1];
          const endGroup = !next || next.senderId !== m.senderId;
          const isLast = i === msgs.length - 1;
          const sender = conversation.participants.find((p) => p.id === m.senderId);

          const showDelivered =
            isSelf &&
            features.deliveryLine &&
            (conversation.deliveryText ?? "").length > 0 &&
            endGroup;

          return (
            <div key={m.id}>
              <div
                className={`flex items-end ${isSelf ? "justify-end" : "justify-start"}`}
                style={{ marginTop: 6 }}
              >
                {/* Snapchat 每条 incoming 左侧都挂头像 */}
                {!isSelf ? (
                  <span style={{ marginRight: 6 }}>
                    <Avatar
                      src={sender?.isSelf ? null : conversation.avatar}
                      name={conversation.title}
                      size={26}
                    />
                  </span>
                ) : null}

                <div
                  style={{
                    background: isSelf ? c.outgoingBubble : c.incomingBubble,
                    color: isSelf ? c.outgoingText : c.incomingText,
                    fontSize: bubble.fontSize,
                    lineHeight: 1.3,
                    padding: m.image && !m.text ? 0 : "8px 14px",
                    borderRadius: bubble.radius,
                    maxWidth: `${bubble.maxWidthPct}%`,
                    wordBreak: "break-word",
                    whiteSpace: "pre-wrap",
                    overflow: "hidden",
                  }}
                >
                  {m.image ? (
                    <img
                      src={m.image}
                      alt=""
                      style={{
                        display: "block",
                        width: "100%",
                        borderRadius: 16,
                      }}
                    />
                  ) : null}

                  {m.text ? (
                    <div style={m.image ? { padding: "7px 0 9px" } : undefined}>{m.text}</div>
                  ) : null}
                </div>
              </div>

              {/* outgoing 组末下方：Delivered 小字 */}
              {showDelivered ? (
                <div
                  className="flex justify-end"
                  style={{ marginTop: 2, marginBottom: 2, paddingRight: 4 }}
                >
                  <span style={{ fontSize: 11, color: c.timestamp, fontWeight: 500 }}>
                    {conversation.deliveryText}
                  </span>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* ---------------- Footer（纯视觉） ---------------- */}
      <div
        className="flex items-center gap-2.5 px-3"
        style={{
          background: c.footerBg,
          minHeight: 56,
          flexShrink: 0,
          paddingTop: 8,
          paddingBottom: 14,
          borderTop: `0.5px solid ${conversation.mode === "dark" ? "#262626" : "#e8e8e8"}`,
        }}
      >
        {/* Bitmoji 位 */}
        <Avatar src={null} name="You" size={32} />

        <div
          className="flex-1 flex items-center justify-between"
          style={{
            border: `1px solid ${conversation.mode === "dark" ? "#363636" : "#dcdcdc"}`,
            borderRadius: 20,
            padding: "7px 13px",
            minHeight: 36,
          }}
        >
          <span style={{ fontSize: 14.5, color: c.timestamp }}>Send a chat</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="8" cy="8" r="7.25" stroke={c.timestamp} strokeWidth="1.4" />
            <circle cx="5.6" cy="6.6" r="0.95" fill={c.timestamp} />
            <circle cx="10.4" cy="6.6" r="0.95" fill={c.timestamp} />
            <path d="M5.3 9.6 a3.3 3.3 0 0 0 5.4 0" stroke={c.timestamp} strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
