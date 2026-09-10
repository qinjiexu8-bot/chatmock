"use client";

import type { Conversation, Message, PlatformTheme } from "@/lib/types";

interface Props {
  conversation: Conversation;
  theme: PlatformTheme;
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
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#1a73e8",
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

export default function AndroidSmsChat({ conversation, theme }: Props) {
  const c = theme.colors[conversation.mode];
  const { bubble, features } = theme;

  const selfId =
    conversation.participants.find((p) => p.isSelf)?.id ?? "self";

  const msgs = conversation.messages;
  const lastSelfIdx = (() => {
    let idx = -1;
    msgs.forEach((m, i) => {
      if (m.senderId === selfId) idx = i;
    });
    return idx;
  })();

  return (
    <div
      className="flex flex-col w-full h-full"
      style={{
        background: c.chatBg,
        fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* ---------------- Header（Material 风格） ---------------- */}
      <div
        className="flex items-center gap-3 px-3"
        style={{
          background: c.headerBg,
          height: 56,
          flexShrink: 0,
          paddingTop: 4,
          borderBottom: `0.5px solid ${conversation.mode === "dark" ? "#2a2a2c" : "#e8eaed"}`,
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
          <Avatar src={conversation.avatar} name={conversation.title} size={36} />
        ) : null}
        <div className="flex-1 min-w-0">
          <div
            style={{
              color: c.headerText,
              fontSize: 16,
              fontWeight: 500,
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {conversation.title}
          </div>
          <div style={{ color: c.headerSubText, fontSize: 12, lineHeight: 1.3 }}>
            {conversation.subtitle}
          </div>
        </div>
        <div className="flex items-center gap-4" style={{ color: c.headerSubText }}>
          <svg width="20" height="15" viewBox="0 0 20 15" fill="none">
            <rect x="0.75" y="1.75" width="12.5" height="11.5" rx="2.8" stroke="currentColor" strokeWidth="1.5" />
            <path d="M14.5 5.6 L19.2 3.2 v8.6 l-4.7-2.4 z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          <svg width="17" height="17" viewBox="0 0 19 19" fill="none">
            <path
              d="M16.5 13.3v2c0 .9-.8 1.7-1.7 1.6-2.4-.2-4.7-1-6.8-2.2a16.4 16.4 0 0 1-5-5C1.8 7.6 1 5.3.8 2.9.7 2 1.4 1.2 2.3 1.2h2c.8 0 1.5.6 1.6 1.4.1.8.3 1.6.6 2.3.2.5.1 1.1-.3 1.5l-1 1.1a14 14 0 0 0 4.7 4.7l1.1-1c.4-.4 1-.5 1.5-.3.7.3 1.5.5 2.3.6.8.1 1.4.8 1.4 1.6Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* ---------------- Chat area ---------------- */}
      <div
        className="flex-1 flex flex-col px-3 py-3"
        style={{ background: c.chatBg, overflow: "hidden" }}
      >
        {features.dateSeparator && conversation.dateSeparator ? (
          <div className="flex justify-center" style={{ marginBottom: 10 }}>
            <span style={{ fontSize: 12, color: c.timestamp, fontWeight: 500 }}>
              {conversation.dateSeparator}
            </span>
          </div>
        ) : null}

        {msgs.map((m: Message, i: number) => {
          const isSelf = m.senderId === selfId;
          const next = msgs[i + 1];
          const endGroup = !next || next.senderId !== m.senderId;
          const isLast = i === msgs.length - 1;

          const showRead =
            isSelf &&
            endGroup &&
            i === lastSelfIdx &&
            isLast &&
            features.deliveryLine &&
            (conversation.deliveryText ?? "").length > 0;

          return (
            <div key={m.id}>
              <div
                className={`flex ${isSelf ? "justify-end" : "justify-start"}`}
                style={{ marginTop: 2 }}
              >
                <div
                  style={{
                    background: isSelf ? c.outgoingBubble : c.incomingBubble,
                    color: isSelf ? c.outgoingText : c.incomingText,
                    fontSize: bubble.fontSize,
                    lineHeight: 1.35,
                    padding: m.image && !m.text ? 0 : "9px 14px",
                    borderRadius: bubble.radius,
                    // Google Messages：组内首/末气泡靠发送者一侧略收
                    borderBottomRightRadius: isSelf && endGroup ? 6 : bubble.radius,
                    borderBottomLeftRadius: !isSelf && endGroup ? 6 : bubble.radius,
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
                        borderRadius: m.text ? "16px 16px 0 0" : 20,
                      }}
                    />
                  ) : null}

                  {m.text ? (
                    <div style={m.image ? { padding: "7px 0 9px" } : undefined}>{m.text}</div>
                  ) : null}
                </div>
              </div>

              {/* RCS 已读回执：末条外发下方 "Read" */}
              {showRead ? (
                <div className="flex justify-end" style={{ marginTop: 2, marginBottom: 4, paddingRight: 6 }}>
                  <span style={{ fontSize: 11, color: c.timestamp, fontWeight: 500 }}>
                    {conversation.deliveryText}
                  </span>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* ---------------- Footer（Material 输入栏，纯视觉） ---------------- */}
      <div
        className="flex items-center gap-2.5 px-3"
        style={{
          background: c.footerBg,
          minHeight: 58,
          flexShrink: 0,
          paddingTop: 8,
          paddingBottom: 14,
        }}
      >
        <div
          className="flex-1 flex items-center gap-2.5"
          style={{
            background: conversation.mode === "dark" ? "#303134" : "#f1f3f4",
            borderRadius: 24,
            padding: "8px 13px",
            minHeight: 38,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="9" cy="9" r="8.25" stroke={c.timestamp} strokeWidth="1.4" />
            <circle cx="6.2" cy="7.4" r="1" fill={c.timestamp} />
            <circle cx="11.8" cy="7.4" r="1" fill={c.timestamp} />
            <path d="M6 10.6 a3.6 3.6 0 0 0 6 0" stroke={c.timestamp} strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 14.5, color: c.timestamp, flex: 1 }}>Text message</span>
          <svg width="16" height="16" viewBox="0 0 17 17" fill="none" style={{ flexShrink: 0 }}>
            <path
              d="M14.5 7.8 L8.9 13.4 a4.2 4.2 0 0 1-6-6 L9 1.3 a2.8 2.8 0 0 1 4 4 L7 11.3 a1.4 1.4 0 0 1-2-2 L10 4.3"
              stroke={c.timestamp}
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="11" cy="11" r="10.25" fill={c.accent} />
          <path
            d="M6.5 11.6 c-.6-.3-.6-1.1.05-1.35 L15 7 c.65-.25 1.3.4 1.05 1.05 L12.4 17.2 c-.25.65-1.05.65-1.35.05 L9.6 13.8 a.8.8 0 0 0-.35-.35 L6.5 11.6 Z"
            fill="#fff"
            transform="translate(-1.5 -2.2)"
          />
        </svg>
      </div>
    </div>
  );
}
