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
  // IG 默认头像：灰底 + 深灰人形轮廓的近似（实色圆 + 首字母）
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: size * 0.42,
        fontWeight: 600,
        flexShrink: 0,
      }}
    >
      {name.slice(0, 1).toUpperCase()}
    </div>
  );
}

export default function InstagramChat({ conversation, theme }: Props) {
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
        fontFamily: bubble.fontFamily,
      }}
    >
      {/* ---------------- Header ---------------- */}
      <div
        className="flex items-center gap-2.5 px-3"
        style={{
          background: c.headerBg,
          height: 54,
          flexShrink: 0,
          paddingTop: 2,
          borderBottom: `0.5px solid ${conversation.mode === "dark" ? "#262626" : "#dbdbdb"}`,
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

        <Avatar src={conversation.avatar} name={conversation.title} size={30} />

        <span
          style={{
            color: c.headerText,
            fontSize: 15,
            fontWeight: 600,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {conversation.title}
        </span>

        {/* 用户名旁的下拉箭头 */}
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ flexShrink: 0 }}>
          <path
            d="M1 1 L5 5 L9 1"
            stroke={c.headerText}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span className="flex-1" />

        {/* 电话 + 视频 */}
        <div className="flex items-center gap-4" style={{ color: c.headerText }}>
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
            <path
              d="M16.5 13.3v2c0 .9-.8 1.7-1.7 1.6-2.4-.2-4.7-1-6.8-2.2a16.4 16.4 0 0 1-5-5C1.8 7.6 1 5.3.8 2.9.7 2 1.4 1.2 2.3 1.2h2c.8 0 1.5.6 1.6 1.4.1.8.3 1.6.6 2.3.2.5.1 1.1-.3 1.5l-1 1.1a14 14 0 0 0 4.7 4.7l1.1-1c.4-.4 1-.5 1.5-.3.7.3 1.5.5 2.3.6.8.1 1.4.8 1.4 1.6Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
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
          const isLast = i === msgs.length - 1;

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
                {/* incoming 组末外侧挂小头像 */}
                {!isSelf && endGroup ? (
                  <span style={{ marginRight: 6, marginBottom: 1 }}>
                    <Avatar src={conversation.avatar} name={conversation.title} size={24} />
                  </span>
                ) : !isSelf ? (
                  <span style={{ width: 30, flexShrink: 0 }} />
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
                        borderRadius: 18,
                      }}
                    />
                  ) : null}

                  {m.text ? (
                    <div style={m.image ? { padding: "7px 0 9px" } : undefined}>{m.text}</div>
                  ) : null}
                </div>
              </div>

              {/* 末条外发组下方：对方小头像 + Seen */}
              {showSeen ? (
                <div
                  className="flex items-center justify-end gap-1.5"
                  style={{ marginTop: 4, marginBottom: 4 }}
                >
                  <Avatar src={conversation.avatar} name={conversation.title} size={16} />
                  <span style={{ fontSize: 11.5, color: c.timestamp, fontWeight: 500 }}>
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
        }}
      >
        {/* 相机圆钮 */}
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="15" cy="15" r="14.25" stroke={c.headerText} strokeWidth="1.5" />
          <rect x="9" y="10.5" width="12" height="9" rx="2.4" stroke={c.headerText} strokeWidth="1.4" />
          <path d="M12 10.5 L13.2 8.5 h3.6 L18 10.5" stroke={c.headerText} strokeWidth="1.4" strokeLinejoin="round" />
          <circle cx="15" cy="15" r="2.4" stroke={c.headerText} strokeWidth="1.4" />
        </svg>

        <div
          className="flex-1 flex items-center"
          style={{
            border: `1px solid ${conversation.mode === "dark" ? "#363636" : "#dbdbdb"}`,
            borderRadius: 22,
            padding: "8px 14px",
            minHeight: 36,
          }}
        >
          <span style={{ fontSize: 15, color: c.timestamp }}>Message…</span>
        </div>

        <div className="flex items-center gap-3.5" style={{ color: c.headerText, flexShrink: 0 }}>
          {/* 麦克风 */}
          <svg width="15" height="19" viewBox="0 0 15 19" fill="none">
            <rect x="4.7" y="1" width="5.6" height="9.4" rx="2.8" stroke="currentColor" strokeWidth="1.4" />
            <path d="M2 8.6 a5.5 5.5 0 0 0 11 0 M7.5 14.1 V17.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          {/* 图库 */}
          <svg width="19" height="17" viewBox="0 0 19 17" fill="none">
            <rect x="0.75" y="1.75" width="17.5" height="13.5" rx="2.6" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="5.5" cy="6.2" r="1.5" fill="currentColor" />
            <path d="M1.5 13.5 L6.5 9 l3.5 3 4-3.5 3.5 3" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
          {/* 爱心 */}
          <svg width="19" height="17" viewBox="0 0 19 17" fill="none">
            <path
              d="M9.5 15.8 C4 12 1.2 9 1.2 5.9 1.2 3.4 3.1 1.5 5.5 1.5 c1.6 0 3.1.9 4 2.2.9-1.3 2.4-2.2 4-2.2 2.4 0 4.3 1.9 4.3 4.4 0 3.1-2.8 6.1-8.3 9.9Z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
