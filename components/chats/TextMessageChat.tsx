"use client";

import type { Conversation, Message, PlatformTheme } from "@/lib/types";

interface Props {
  conversation: Conversation;
  theme: PlatformTheme;
}

function Avatar({
  src,
  name,
  size = 32,
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
        background: "linear-gradient(180deg,#a8adb5,#858b94)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: size * 0.42,
        fontWeight: 400,
        flexShrink: 0,
      }}
    >
      {name.slice(0, 1).toUpperCase()}
    </div>
  );
}

export default function TextMessageChat({ conversation, theme }: Props) {
  const c = theme.colors[conversation.mode];
  const { bubble, features } = theme;

  const selfId =
    conversation.participants.find((p) => p.isSelf)?.id ?? "self";

  const msgs = conversation.messages;
  const lastMsg = msgs[msgs.length - 1];
  const showDelivery =
    features.deliveryLine &&
    lastMsg &&
    lastMsg.senderId === selfId &&
    (conversation.deliveryText ?? "").length > 0;

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
          height: 52,
          flexShrink: 0,
          paddingTop: 2,
          borderBottom: `0.5px solid ${conversation.mode === "dark" ? "#38383a" : "#c6c6c8"}`,
        }}
      >
        {/* 返回箭头（iOS 蓝） */}
        <svg width="12" height="20" viewBox="0 0 12 20" fill="none" style={{ flexShrink: 0 }}>
          <path
            d="M10.5 1.5 L2 10 L10.5 18.5"
            stroke="#0b84ff"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* 居中：头像 + 名字 */}
        <div
          className="flex-1 flex flex-col items-center"
          style={{ marginLeft: -12 }}
        >
          {features.avatar ? (
            <Avatar src={conversation.avatar} name={conversation.title} size={30} />
          ) : null}
          <div
            style={{
              color: c.headerText,
              fontSize: 12,
              fontWeight: 600,
              lineHeight: 1.25,
              marginTop: 1,
              maxWidth: 180,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {conversation.title}
          </div>
        </div>

        {/* 右侧 FaceTime/视频占位 */}
        <svg width="22" height="16" viewBox="0 0 22 16" fill="none" style={{ flexShrink: 0 }}>
          <rect x="0.75" y="1.75" width="13.5" height="12.5" rx="3.2" stroke="#0b84ff" strokeWidth="1.5" />
          <path d="M15.5 6.6 L21 3.6 v8.8 l-5.5-3 z" stroke="#0b84ff" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </div>

      {/* ---------------- Chat area ---------------- */}
      <div
        className="flex-1 flex flex-col px-3 py-2"
        style={{ background: c.chatBg, overflow: "hidden" }}
      >
        {/* 顶部：iMessage + 日期（iOS 惯例，气泡内无时间戳） */}
        {features.dateSeparator && conversation.dateSeparator ? (
          <div className="flex flex-col items-center" style={{ marginBottom: 10 }}>
            <span style={{ fontSize: 11.5, color: c.timestamp, marginBottom: 3 }}>
              iMessage
            </span>
            <span style={{ fontSize: 11.5, color: c.timestamp, fontWeight: 500 }}>
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
          const sender = conversation.participants.find((p) => p.id === m.senderId);

          return (
            <div
              key={m.id}
              className={`flex ${isSelf ? "justify-end" : "justify-start"}`}
              style={{ marginTop: newGroup ? 2 : 2, marginBottom: endGroup ? 4 : 0 }}
            >
              <div
                style={{
                  background: isSelf ? c.outgoingBubble : c.incomingBubble,
                  color: isSelf ? c.outgoingText : c.incomingText,
                  fontSize: bubble.fontSize,
                  lineHeight: 1.3,
                  padding: m.image && !m.text ? 0 : "8px 14px",
                  borderRadius: bubble.radius,
                  // iOS 的"尾巴"：一组消息的最后一条，底角收窄
                  borderBottomRightRadius: isSelf && endGroup ? 5 : bubble.radius,
                  borderBottomLeftRadius: !isSelf && endGroup ? 5 : bubble.radius,
                  maxWidth: `${bubble.maxWidthPct}%`,
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                  overflow: "hidden",
                }}
              >
                {features.senderNames && !isSelf && sender?.color ? (
                  <div style={{ color: sender.color, fontSize: 13, fontWeight: 500, marginBottom: 2 }}>
                    {sender.name}
                  </div>
                ) : null}

                {m.image ? (
                  <img
                    src={m.image}
                    alt=""
                    style={{
                      display: "block",
                      width: "100%",
                      borderRadius: m.text ? "12px 12px 0 0" : 16,
                      marginBottom: m.text ? 0 : 0,
                    }}
                  />
                ) : null}

                {m.text ? (
                  <div style={m.image ? { padding: "7px 0 9px" } : undefined}>{m.text}</div>
                ) : null}
              </div>
            </div>
          );
        })}

        {/* 末条外发消息下方：Delivered 行 */}
        {showDelivery ? (
          <div
            className="flex justify-end"
            style={{ marginTop: 2, paddingRight: 6 }}
          >
            <span style={{ fontSize: 11.5, color: c.timestamp, fontWeight: 500 }}>
              {conversation.deliveryText}
            </span>
          </div>
        ) : null}
      </div>

      {/* ---------------- Footer（纯视觉） ---------------- */}
      <div
        className="flex items-center gap-2.5 px-3"
        style={{
          background: c.footerBg,
          minHeight: 56,
          flexShrink: 0,
          paddingTop: 8,
          paddingBottom: 16,
          borderTop: `0.5px solid ${conversation.mode === "dark" ? "#38383a" : "#c6c6c8"}`,
        }}
      >
        {/* App 抽屉按钮 */}
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="11" cy="11" r="9.5" stroke="#0b84ff" strokeWidth="1.5" />
          <circle cx="7.5" cy="8.5" r="1.2" fill="#0b84ff" />
          <circle cx="14.5" cy="8.5" r="1.2" fill="#0b84ff" />
          <circle cx="7.5" cy="13.5" r="1.2" fill="#0b84ff" />
          <circle cx="14.5" cy="13.5" r="1.2" fill="#0b84ff" />
        </svg>

        <div
          className="flex-1 flex items-center justify-between"
          style={{
            border: `1px solid ${conversation.mode === "dark" ? "#3a3a3c" : "#c7c7cc"}`,
            borderRadius: 18,
            padding: "6px 10px",
            minHeight: 34,
          }}
        >
          <span style={{ fontSize: 15, color: c.timestamp }}>iMessage</span>
          <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
            <rect x="0.75" y="2.75" width="18.5" height="12.5" rx="3.4" stroke="#0b84ff" strokeWidth="1.4" />
            <circle cx="10" cy="9" r="3.2" stroke="#0b84ff" strokeWidth="1.4" />
            <path d="M6.5 2.75 L7.8 0.9 h4.4 l1.3 1.85" stroke="#0b84ff" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
