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
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        // Messenger 默认头像的蓝渐变
        background: "linear-gradient(135deg,#0099ff,#0064e0)",
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

export default function MessengerChat({ conversation, theme }: Props) {
  const c = theme.colors[conversation.mode];
  const { bubble, features } = theme;

  const selfId =
    conversation.participants.find((p) => p.isSelf)?.id ?? "self";

  const msgs = conversation.messages;

  // "Seen" 只挂在最后一条外发消息所在组的末尾
  let lastSelfIdx = -1;
  msgs.forEach((m, i) => {
    if (m.senderId === selfId) lastSelfIdx = i;
  });

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
        className="flex items-center px-3"
        style={{
          background: c.headerBg,
          height: 54,
          flexShrink: 0,
          paddingTop: 2,
          borderBottom: `0.5px solid ${conversation.mode === "dark" ? "#3a3b3c" : "#e4e6eb"}`,
        }}
      >
        <svg width="12" height="20" viewBox="0 0 12 20" fill="none" style={{ flexShrink: 0 }}>
          <path
            d="M10.5 1.5 L2 10 L10.5 18.5"
            stroke={c.headerText}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="flex-1 flex flex-col items-center" style={{ marginLeft: -8 }}>
          {features.avatar ? (
            <Avatar src={conversation.avatar} name={conversation.title} size={28} />
          ) : null}
          <div
            style={{
              color: c.headerText,
              fontSize: 12,
              fontWeight: 600,
              lineHeight: 1.25,
              marginTop: 1,
              maxWidth: 170,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {conversation.title}
          </div>
        </div>

        {/* 通话 + 视频 */}
        <div className="flex items-center gap-3.5" style={{ color: c.accent }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M16 12.2v1.9c0 .9-.8 1.6-1.7 1.5-2.3-.2-4.5-.9-6.5-2.1a15.6 15.6 0 0 1-4.8-4.8C1.8 6.7 1.1 4.5.9 2.2.8 1.3 1.5.5 2.4.5h1.9c.8 0 1.5.6 1.6 1.4.1.8.3 1.5.6 2.2.2.5.1 1.1-.2 1.5L5.5 7c-.3.4-.3.9 0 1.2a11.9 11.9 0 0 0 4.3 3.5c.4.2.9.2 1.2-.1l1.3-1.1c.4-.3 1-.4 1.5-.2.7.3 1.4.5 2.2.6.8.1 1.4.8 1.4 1.6Z"
              fill="currentColor"
            />
          </svg>
          <svg width="20" height="15" viewBox="0 0 20 15" fill="none">
            <rect x="0.75" y="1.75" width="12.5" height="11.5" rx="2.8" stroke="currentColor" strokeWidth="1.5" />
            <path d="M14.5 5.6 L19.2 3.2 v8.6 l-4.7-2.4 z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
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
          const prev = msgs[i - 1];
          const next = msgs[i + 1];
          const newGroup = !prev || prev.senderId !== m.senderId;
          const endGroup = !next || next.senderId !== m.senderId;
          const isFirst = i === 0;
          const isLast = i === msgs.length - 1;

          // Messenger 组内气泡角落规则：靠发送者一侧，组首顶角、组末底角收窄为 6px，
          // 单条消息四角全圆。远离发送者一侧始终全圆。
          const R = bubble.radius;
          const S = 6;
          const single = newGroup && endGroup;
          const senderTop = single ? R : newGroup ? S : R;
          const senderBottom = single ? R : endGroup ? S : R;

          const showSeen =
            isSelf &&
            endGroup &&
            i === lastSelfIdx &&
            isLast &&
            features.deliveryLine &&
            (conversation.deliveryText ?? "").length > 0;

          return (
            <div key={m.id}>
              <div
                className={`flex items-end ${isSelf ? "justify-end" : "justify-start"}`}
                style={{ marginTop: newGroup ? 8 : 2 }}
              >
                {/* incoming 组末气泡外侧挂头像 */}
                {!isSelf && endGroup ? (
                  <span style={{ marginRight: 6, marginBottom: 1 }}>
                    <Avatar
                      src={conversation.avatar}
                      name={conversation.title}
                      size={26}
                    />
                  </span>
                ) : !isSelf ? (
                  <span style={{ width: 32, flexShrink: 0 }} />
                ) : null}

                <div
                  style={{
                    background: isSelf ? c.outgoingBubble : c.incomingBubble,
                    color: isSelf ? c.outgoingText : c.incomingText,
                    fontSize: bubble.fontSize,
                    lineHeight: 1.3,
                    padding: m.image && !m.text ? 0 : "8px 14px",
                    borderRadius: bubble.radius,
                    borderTopRightRadius: isSelf ? senderTop : R,
                    borderBottomRightRadius: isSelf ? senderBottom : R,
                    borderTopLeftRadius: isSelf ? R : senderTop,
                    borderBottomLeftRadius: isSelf ? R : senderBottom,
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
                        borderRadius: m.text ? "12px 12px 0 0" : 18,
                      }}
                    />
                  ) : null}

                  {m.text ? (
                    <div style={m.image ? { padding: "7px 0 9px" } : undefined}>{m.text}</div>
                  ) : null}
                </div>
              </div>

              {/* 组末下方：时间戳 + Seen */}
              {endGroup && (features.deliveryLine || !features.perMessageTimestamp) ? (
                <div
                  className={`flex ${isSelf ? "justify-end" : "justify-start"}`}
                  style={{
                    marginTop: 2,
                    marginBottom: isLast ? 4 : 6,
                    paddingRight: isSelf ? 4 : 0,
                    paddingLeft: isSelf ? 0 : 38,
                  }}
                >
                  <span style={{ fontSize: 11, color: c.timestamp }}>
                    {m.timestamp}
                    {showSeen && conversation.deliveryText
                      ? `  ·  ${conversation.deliveryText}`
                      : ""}
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
          minHeight: 58,
          flexShrink: 0,
          paddingTop: 8,
          paddingBottom: 16,
          borderTop: `0.5px solid ${conversation.mode === "dark" ? "#3a3b3c" : "#e4e6eb"}`,
        }}
      >
        {/* 相机圆钮 */}
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: c.incomingBubble,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
            <path
              d="M11 3.5 V2.6 c0-.9-.7-1.6-1.6-1.6 H6.6 C5.7 1 5 1.7 5 2.6 v0.9 H2.4 C1.6 3.5 1 4.1 1 4.9 v6.7 c0 .8.6 1.4 1.4 1.4 h11.2 c.8 0 1.4-.6 1.4-1.4 V4.9 c0-.8-.6-1.4-1.4-1.4 H11 Z"
              stroke={c.accent}
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            <circle cx="8" cy="8" r="2.6" stroke={c.accent} strokeWidth="1.4" />
          </svg>
        </div>

        {/* Aa 输入胶囊 */}
        <div
          className="flex-1 flex items-center justify-between"
          style={{
            background: conversation.mode === "dark" ? "#262626" : "#f0f2f5",
            borderRadius: 18,
            padding: "7px 12px",
            minHeight: 34,
          }}
        >
          <span style={{ fontSize: 15, color: c.timestamp, fontWeight: 500 }}>Aa</span>
          <div className="flex items-center gap-2.5" style={{ color: c.accent }}>
            <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
              <rect x="0.75" y="1.75" width="14.5" height="11" rx="2.6" stroke="currentColor" strokeWidth="1.4" />
              <circle cx="5" cy="6" r="1.4" fill="currentColor" />
              <path d="M1.5 11.5 L5.5 8 l3 2.5 3.5-3 2.5 2" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
            <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
              <rect x="4" y="1" width="4" height="9" rx="2" stroke="currentColor" strokeWidth="1.4" />
              <path d="M1 7.5 a5 5 0 0 0 10 0 M6 12.5 V15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* 发送键 */}
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="13" cy="13" r="12.25" fill={c.accent} />
          <path
            d="M7.5 13.4 c-.6-.3-.6-1.1.05-1.35 L18 8.1 c.65-.25 1.3.4 1.05 1.05 L15.1 19.6 c-.25.65-1.05.65-1.35.05 L11.6 15.5 a.8.8 0 0 0-.35-.35 L7.5 13.4 Z"
            fill="#fff"
            transform="rotate(8 13 13)"
          />
        </svg>
      </div>
    </div>
  );
}
