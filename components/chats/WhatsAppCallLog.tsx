"use client";

import type { Conversation, Message, PlatformTheme } from "@/lib/types";

interface Props {
  conversation: Conversation;
  theme: PlatformTheme;
}

function Avatar({
  src,
  name,
  size = 46,
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

/** WhatsApp 通话方向箭头：outgoing 右上、incoming 左下、missed 红色左下 */
function DirectionArrow({ call }: { call: "outgoing" | "incoming" | "missed" }) {
  const color = call === "missed" ? "#ea4335" : "#00a884";
  if (call === "outgoing") {
    return (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0 }}>
        <path d="M2.5 12.5 L12 3 M6 3 h6 v6" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0 }}>
      <path d="M12.5 2.5 L3 12 M9 12 H3 V6" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function WhatsAppCallLog({ conversation, theme }: Props) {
  const c = theme.colors[conversation.mode];

  const msgs = conversation.messages;

  return (
    <div
      className="flex flex-col w-full h-full"
      style={{
        background: c.chatBg,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      {/* ---------------- Header：Calls 标签页 ---------------- */}
      <div
        className="flex items-end justify-between px-4"
        style={{
          background: c.headerBg,
          height: 64,
          flexShrink: 0,
          paddingBottom: 8,
        }}
      >
        <span
          style={{
            color: c.headerText,
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "-0.01em",
          }}
        >
          {conversation.title || "Calls"}
        </span>
        <div className="flex items-center gap-5" style={{ color: c.headerText }}>
          <svg width="21" height="17" viewBox="0 0 21 17" fill="none">
            <rect x="0.75" y="1.75" width="13.5" height="13.5" rx="3" stroke="currentColor" strokeWidth="1.6" />
            <path d="M15.5 6.4 L20.2 3.8 v9.4 l-4.7-2.6 z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="8" cy="8" r="5.75" stroke="currentColor" strokeWidth="1.6" />
            <path d="M12.3 12.3 L16.5 16.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <svg width="4" height="16" viewBox="0 0 4 16" fill="none">
            <circle cx="2" cy="3" r="1.6" fill="currentColor" />
            <circle cx="2" cy="8" r="1.6" fill="currentColor" />
            <circle cx="2" cy="13" r="1.6" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* ---------------- 通话记录列表 ---------------- */}
      <div
        className="flex-1 flex flex-col"
        style={{ background: c.chatBg, overflow: "hidden", paddingTop: 4 }}
      >
        {msgs.map((m: Message) => {
          const sender = conversation.participants.find((p) => p.id === m.senderId);
          const call = m.call ?? "incoming";
          const isMissed = call === "missed";

          return (
            <div key={m.id} className="flex items-center gap-3 px-4" style={{ padding: "9px 16px" }}>
              <Avatar src={sender?.avatar ?? null} name={sender?.name ?? "?"} size={46} />

              <div className="flex-1 min-w-0">
                <div
                  style={{
                    color: isMissed ? "#ea4335" : c.headerText,
                    fontSize: 16,
                    fontWeight: 600,
                    lineHeight: 1.3,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {sender?.name ?? "Unknown"}
                </div>
                <div className="flex items-center gap-1.5" style={{ marginTop: 1 }}>
                  <DirectionArrow call={call} />
                  <span style={{ fontSize: 13.5, color: isMissed ? "#ea4335" : c.timestamp }}>
                    {isMissed ? "Missed" : call === "outgoing" ? "Outgoing" : "Incoming"}
                    {m.timestamp ? `, ${m.timestamp}` : ""}
                  </span>
                </div>
                {/* 可选时长备注（来自消息文本） */}
                {m.text ? (
                  <div style={{ fontSize: 12.5, color: c.timestamp, marginTop: 1 }}>{m.text}</div>
                ) : null}
              </div>

              {/* 右侧绿色电话图标 */}
              <svg width="22" height="22" viewBox="0 0 19 19" fill="none" style={{ flexShrink: 0 }}>
                <path
                  d="M16.5 13.3v2c0 .9-.8 1.7-1.7 1.6-2.4-.2-4.7-1-6.8-2.2a16.4 16.4 0 0 1-5-5C1.8 7.6 1 5.3.8 2.9.7 2 1.4 1.2 2.3 1.2h2c.8 0 1.5.6 1.6 1.4.1.8.3 1.6.6 2.3.2.5.1 1.1-.3 1.5l-1 1.1a14 14 0 0 0 4.7 4.7l1.1-1c.4-.4 1-.5 1.5-.3.7.3 1.5.5 2.3.6.8.1 1.4.8 1.4 1.6Z"
                  stroke="#00a884"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          );
        })}
      </div>

      {/* ---------------- 底部五标签导航（真机结构） ---------------- */}
      <div
        className="flex items-center justify-around px-2"
        style={{
          background: c.footerBg,
          minHeight: 56,
          flexShrink: 0,
          paddingBottom: 14,
          paddingTop: 6,
          borderTop: `0.5px solid ${conversation.mode === "dark" ? "#111b21" : "#e3e6e8"}`,
        }}
      >
        {[
          { label: "Status", active: false },
          { label: "Calls", active: true },
          { label: "Chats", active: false },
          { label: "Communities", active: false },
          { label: "Settings", active: false },
        ].map((tab) => {
          const col = tab.active ? "#00a884" : c.timestamp;
          // 真机 iOS WhatsApp 底栏五图标：Status 圆环缺口 / Calls 听筒 /
          // Chats 气泡 / Communities 双人 / Settings 齿轮
          const icons: Record<string, React.ReactNode> = {
            Status: (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="8.6" stroke={col} strokeWidth="1.8" strokeDasharray="41 13" strokeLinecap="round" transform="rotate(54 11 11)" />
                <circle cx="11" cy="11" r="4.2" fill="none" stroke={col} strokeWidth="1.8" />
              </svg>
            ),
            Calls: (
              <svg width="21" height="21" viewBox="0 0 18 18" fill="none">
                <path
                  d="M16 12.2v1.9c0 .9-.8 1.6-1.7 1.5-2.3-.2-4.5-.9-6.5-2.1a15.6 15.6 0 0 1-4.8-4.8C1.8 6.7 1.1 4.5.9 2.2.8 1.3 1.5.5 2.4.5h1.9c.8 0 1.5.6 1.6 1.4.1.8.3 1.5.6 2.2.2.5.1 1.1-.2 1.5L5.5 7c-.3.4-.3.9 0 1.2a11.9 11.9 0 0 0 4.3 3.5c.4.2.9.2 1.2-.1l1.3-1.1c.4-.3 1-.4 1.5-.2.7.3 1.4.5 2.2.6.8.1 1.4.8 1.4 1.6Z"
                  fill={col}
                />
              </svg>
            ),
            Chats: (
              <svg width="21" height="21" viewBox="0 0 22 22" fill="none">
                <path
                  d="M11 2.6c-5 0-9 3.5-9 7.8 0 2.4 1.3 4.6 3.3 6l-.6 3.2 3.4-1.8c.9.2 1.9.4 2.9.4 5 0 9-3.5 9-7.8s-4-7.8-9-7.8Z"
                  stroke={col}
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            Communities: (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="8" cy="7.5" r="3.2" stroke={col} strokeWidth="1.7" />
                <path d="M2.5 18.5c.6-3 2.9-4.6 5.5-4.6s4.9 1.6 5.5 4.6" stroke={col} strokeWidth="1.7" strokeLinecap="round" />
                <circle cx="15.5" cy="8.5" r="2.5" stroke={col} strokeWidth="1.5" />
                <path d="M15.5 13.6c2.1.2 3.6 1.6 4.1 3.9" stroke={col} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ),
            Settings: (
              <svg width="21" height="21" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="3" stroke={col} strokeWidth="1.7" />
                <path
                  d="M11 2.8l1.2 2.4 2.6-.6 1.4 2.3 2.5.8-.3 2.7 1.8 2-1.8 2 .3 2.7-2.5.8-1.4 2.3-2.6-.6L11 21l-1.2-2.4-2.6.6-1.4-2.3-2.5-.8.3-2.7-1.8-2 1.8-2-.3-2.7 2.5-.8 1.4-2.3 2.6.6L11 2.8Z"
                  stroke={col}
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
            ),
          };
          return (
            <div
              key={tab.label}
              className="flex flex-col items-center gap-0.5"
              style={{ flex: 1 }}
            >
              {icons[tab.label]}
              <span
                style={{
                  fontSize: 10.5,
                  fontWeight: tab.active ? 600 : 400,
                  color: tab.active ? "#00a884" : c.timestamp,
                }}
              >
                {tab.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
