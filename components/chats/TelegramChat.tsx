"use client";

import type { Conversation, Message, PlatformTheme, ReceiptState, ThemeMode } from "@/lib/types";
import { doodleTile } from "@/lib/doodle";

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
  size = 36,
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

function wallpaper(mode: ThemeMode): React.CSSProperties {
  if (mode === "dark") {
    return {
      background: `linear-gradient(160deg, #141f2b 0%, #0e1621 55%, #0b1219 100%)`,
      backgroundImage: `${doodleTile("#7d8e98", 0.14)}, linear-gradient(160deg, #141f2b 0%, #0e1621 55%, #0b1219 100%)`,
      backgroundSize: "280px 280px, cover",
    };
  }
  return {
    backgroundImage: `${doodleTile("#ffffff", 0.5)}, linear-gradient(160deg, #8fca7a 0%, #c8e09a 55%, #ececa6 100%)`,
    backgroundSize: "280px 280px, cover",
  };
}

export default function TelegramChat({ conversation, theme }: Props) {
  const c = theme.colors[conversation.mode];
  const { bubble, features } = theme;
  const mode = conversation.mode;

  const selfId =
    conversation.participants.find((p) => p.isSelf)?.id ?? "self";

  // iOS 真机：header 是浮动在壁纸上的半透明胶囊，头像在右侧
  const headerPill = mode === "dark" ? "rgba(23,33,43,0.78)" : "rgba(255,255,255,0.72)";
  const inputPill = mode === "dark" ? "rgba(35,46,60,0.85)" : "rgba(255,255,255,0.82)";

  return (
    <div
      className="flex flex-col w-full h-full"
      style={{
        ...wallpaper(mode),
        fontFamily: bubble.fontFamily,
      }}
    >
      {/* ---------------- Header：半透明浮动胶囊，头像在右（iOS 布局） ---------------- */}
      <div className="px-2.5 pt-1.5" style={{ flexShrink: 0 }}>
        <div
          className="flex items-center gap-2.5"
          style={{
            background: headerPill,
            borderRadius: 16,
            padding: "5px 9px",
            boxShadow: mode === "dark" ? "none" : "0 1px 3px rgba(0,0,0,0.08)",
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
          <div className="flex-1 min-w-0 text-center">
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
          {features.avatar ? (
            <Avatar src={conversation.avatar} name={conversation.title} size={36} />
          ) : null}
        </div>
      </div>

      {/* ---------------- Chat area ---------------- */}
      <div
        className="flex-1 flex flex-col gap-[3px] px-3 py-3"
        style={{ overflow: "hidden" }}
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
                {/* Telegram iOS 尾巴挂在组首气泡顶部、朝发送者一侧 */}
                {bubble.tailOnFirst && newGroup ? (
                  <span
                    style={{
                      position: "absolute",
                      top: 0,
                      [isSelf ? "right" : "left"]: -6,
                      width: 0,
                      height: 0,
                      borderTop: `11px solid ${isSelf ? c.outgoingBubble : c.incomingBubble}`,
                      [isSelf ? "borderLeft" : "borderRight"]: "9px solid transparent",
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
                    // 组首顶部靠发送者一侧收角（尾巴挂在那里）
                    [isSelf ? "borderTopRightRadius" : "borderTopLeftRadius"]:
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

                  {m.text ? (
                    <div style={{ display: "flex", alignItems: "flex-end" }}>
                      <span style={{ flex: "1 1 auto", minWidth: 0, wordBreak: "break-word" }}>
                        {m.text}
                      </span>
                      <span
                        className="inline-flex items-center gap-1"
                        style={{ marginLeft: 8, marginBottom: -1, height: 13, flexShrink: 0 }}
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
                  ) : m.image ? (
                    // 纯图片消息：时间戳右对齐浮在图片下方
                    <div
                      className="flex justify-end items-center gap-1"
                      style={{ paddingTop: 3 }}
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
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ---------------- Footer：透明浮动在壁纸上（iOS 布局） ---------------- */}
      <div
        className="flex items-center gap-2 px-2.5"
        style={{
          minHeight: 54,
          flexShrink: 0,
          paddingTop: 6,
          paddingBottom: 12,
        }}
      >
        <div
          className="flex-1 flex items-center gap-2.5"
          style={{
            background: inputPill,
            borderRadius: 20,
            padding: "8px 12px",
            minHeight: 36,
            boxShadow: mode === "dark" ? "none" : "0 1px 3px rgba(0,0,0,0.06)",
          }}
        >
          {/* 回形针在左（iOS 真机布局） */}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
            <path
              d="M14.5 7.8 L8.9 13.4 a4.2 4.2 0 0 1-6-6 L9 1.3 a2.8 2.8 0 0 1 4 4 L7 11.3 a1.4 1.4 0 0 1-2-2 L10 4.3"
              stroke={c.timestamp}
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ fontSize: 14.5, color: c.timestamp, flex: 1 }}>Message</span>
          {/* 贴纸 + 麦克风在右 */}
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" style={{ flexShrink: 0 }}>
            <rect x="1" y="1" width="15" height="15" rx="4.5" stroke={c.timestamp} strokeWidth="1.4" />
            <circle cx="6.2" cy="6.6" r="1" fill={c.timestamp} />
            <circle cx="10.8" cy="6.6" r="1" fill={c.timestamp} />
            <path d="M5.8 9.6 a3.4 3.4 0 0 0 5.4 0" stroke={c.timestamp} strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <svg width="14" height="17" viewBox="0 0 12 16" fill="none" style={{ flexShrink: 0 }}>
            <rect x="4" y="1" width="4" height="9" rx="2" stroke={c.timestamp} strokeWidth="1.4" />
            <path d="M1 7.5 a5 5 0 0 0 10 0 M6 12.5 V15" stroke={c.timestamp} strokeWidth="1.4" strokeLinecap="round" />
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
