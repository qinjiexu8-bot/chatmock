"use client";

import type { Conversation, Message, PlatformTheme } from "@/lib/types";

interface Props {
  conversation: Conversation;
  theme: PlatformTheme;
}

/** Discord 默认头像：纯色圆 + 首字母（真机是 Discord 形状，用首字母圆近似） */
function Avatar({
  src,
  name,
  color,
  size = 40,
}: {
  src: string | null;
  name: string;
  color?: string;
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
        background: color ?? "#5865f2",
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

export default function DiscordChat({ conversation, theme }: Props) {
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
      {/* ---------------- 频道 Header ---------------- */}
      <div
        className="flex items-center gap-2 px-3"
        style={{
          background: c.headerBg,
          height: 48,
          flexShrink: 0,
          paddingTop: 2,
          borderBottom: `1px solid ${conversation.mode === "dark" ? "#26282c" : "#e3e5e8"}`,
        }}
      >
        <span style={{ color: c.headerSubText, fontSize: 20, fontWeight: 700 }}>#</span>
        <span
          style={{
            color: c.headerText,
            fontSize: 15.5,
            fontWeight: 600,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {conversation.title}
        </span>
        <span
          style={{
            marginLeft: 6,
            color: c.headerSubText,
            fontSize: 12.5,
            borderLeft: `1px solid ${conversation.mode === "dark" ? "#3f4147" : "#e3e5e8"}`,
            paddingLeft: 10,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {conversation.subtitle}
        </span>
        <span className="flex-1" />
        {/* 置顶 / 成员 / 搜索图标 */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
          <path d="M3 1.5 h10 l-1.5 4.5 H4.5 Z" stroke={c.headerSubText} strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M8 6 v5 M6 13.5 h4" stroke={c.headerSubText} strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <svg width="17" height="15" viewBox="0 0 17 15" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="6" cy="4.5" r="2.6" stroke={c.headerSubText} strokeWidth="1.4" />
          <path d="M1 13.5 a5 5 0 0 1 10 0" stroke={c.headerSubText} strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="12.5" cy="5.5" r="2" stroke={c.headerSubText} strokeWidth="1.4" />
          <path d="M11.5 9.2 a4.4 4.4 0 0 1 4.8 4.3" stroke={c.headerSubText} strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="6.5" cy="6.5" r="4.75" stroke={c.headerSubText} strokeWidth="1.4" />
          <path d="M10.2 10.2 L14 14" stroke={c.headerSubText} strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </div>

      {/* ---------------- 消息区（行式布局，无气泡） ---------------- */}
      <div
        className="flex-1 flex flex-col px-4 py-3"
        style={{ background: c.chatBg, overflow: "hidden" }}
      >
        {features.dateSeparator && conversation.dateSeparator ? (
          <div
            className="flex items-center gap-2"
            style={{ marginBottom: 10 }}
          >
            <span
              style={{ flex: 1, height: 1, background: conversation.mode === "dark" ? "#3f4147" : "#e3e5e8" }}
            />
            <span style={{ fontSize: 11.5, color: c.timestamp, fontWeight: 600 }}>
              {conversation.dateSeparator}
            </span>
            <span
              style={{ flex: 1, height: 1, background: conversation.mode === "dark" ? "#3f4147" : "#e3e5e8" }}
            />
          </div>
        ) : null}

        {msgs.map((m: Message, i: number) => {
          const prev = msgs[i - 1];
          const newGroup = !prev || prev.senderId !== m.senderId;
          const sender = conversation.participants.find((p) => p.id === m.senderId);
          const senderName = sender?.name ?? conversation.title;
          const senderColor = sender?.color ?? c.headerText;

          return (
            <div
              key={m.id}
              className="flex"
              style={{ marginTop: newGroup ? 10 : 0, marginBottom: 2 }}
            >
              {/* 头像列：仅组首显示，续行留空缩进 */}
              {newGroup ? (
                <span style={{ marginRight: 12, marginTop: 2 }}>
                  <Avatar
                    src={sender?.avatar ?? null}
                    name={senderName}
                    color={sender?.color}
                    size={40}
                  />
                </span>
              ) : (
                <span style={{ width: 52, flexShrink: 0 }} />
              )}

              <div style={{ flex: 1, minWidth: 0 }}>
                {newGroup ? (
                  <div className="flex items-baseline gap-2" style={{ marginBottom: 1 }}>
                    <span
                      style={{
                        color: senderColor,
                        fontSize: 15.5,
                        fontWeight: 600,
                        lineHeight: 1.375,
                      }}
                    >
                      {sender?.isSelf ? "You" : senderName}
                    </span>
                    <span style={{ color: c.timestamp, fontSize: 11.5 }}>
                      {conversation.dateSeparator} at {m.timestamp}
                    </span>
                  </div>
                ) : null}

                {m.image ? (
                  <img
                    src={m.image}
                    alt=""
                    style={{
                      display: "block",
                      maxWidth: 320,
                      maxHeight: 240,
                      borderRadius: 8,
                      marginBottom: m.text ? 6 : 2,
                    }}
                  />
                ) : null}

                {m.text ? (
                  <div
                    style={{
                      color: c.incomingText,
                      fontSize: bubble.fontSize,
                      lineHeight: 1.375,
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    {m.text}
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {/* ---------------- 输入区（纯视觉） ---------------- */}
      <div
        className="px-4"
        style={{
          background: c.footerBg,
          flexShrink: 0,
          paddingTop: 2,
          paddingBottom: 18,
        }}
      >
        <div
          className="flex items-center gap-2.5 px-3"
          style={{
            background: conversation.mode === "dark" ? "#383a40" : "#ebedef",
            borderRadius: 8,
            minHeight: 44,
          }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="10" stroke={c.timestamp} strokeWidth="1.5" />
            <path d="M11 6.5 v9 M6.5 11 h9" stroke={c.timestamp} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 14.5, color: c.timestamp, flex: 1 }}>
            Message #{conversation.title}
          </span>
          {/* 礼物 / GIF / 贴纸 / emoji */}
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" style={{ flexShrink: 0 }}>
            <rect x="1.5" y="4.5" width="14" height="11" rx="2" stroke={c.timestamp} strokeWidth="1.4" />
            <path d="M1.5 8 h14 M8.5 4.5 c-1.5-3 2.5-3.5 2.5-1 0 1.5-2.5 1-2.5 1 Zm0 0 c1.5-3-2.5-3.5-2.5-1 0 1.5 2.5 1 2.5 1 Z" stroke={c.timestamp} strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="8.5" cy="8.5" r="7" stroke={c.timestamp} strokeWidth="1.4" />
            <circle cx="6" cy="7" r="1" fill={c.timestamp} />
            <circle cx="11" cy="7" r="1" fill={c.timestamp} />
            <path d="M5.5 10 a4 4 0 0 0 6 0" stroke={c.timestamp} strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
