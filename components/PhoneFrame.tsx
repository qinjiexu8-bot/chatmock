"use client";

import type { StatusBar, ThemeMode } from "@/lib/types";

interface Props {
  statusBar: StatusBar;
  showStatusBar: boolean;
  mode: ThemeMode;
  /** 是否渲染手机外框。关闭时只输出聊天内容本身 */
  frame?: boolean;
  children: React.ReactNode;
}

function SignalBars({ level, color }: { level: number; color: string }) {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={i * 4.6}
          y={9 - i * 2.6}
          width="3"
          height={3 + i * 2.6}
          rx="0.8"
          fill={color}
          opacity={i < level ? 1 : 0.3}
        />
      ))}
    </svg>
  );
}

function WifiIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <path
        d="M1 4.2a10 10 0 0 1 14 0"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M3.6 6.9a6.4 6.4 0 0 1 8.8 0"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="8" cy="10" r="1.3" fill={color} />
    </svg>
  );
}

function Battery({ level, color }: { level: number; color: string }) {
  return (
    <svg width="26" height="13" viewBox="0 0 26 13" fill="none">
      <rect
        x="0.5"
        y="0.5"
        width="22"
        height="12"
        rx="3.5"
        stroke={color}
        strokeOpacity="0.4"
      />
      <rect
        x="2"
        y="2"
        width={Math.max(2, (level / 100) * 19)}
        height="9"
        rx="2"
        fill={color}
      />
      <path
        d="M24.2 4.4v4.2c1-.3 1.5-.9 1.5-2.1s-.5-1.8-1.5-2.1Z"
        fill={color}
        fillOpacity="0.5"
      />
    </svg>
  );
}

export default function PhoneFrame({
  statusBar,
  showStatusBar,
  mode,
  frame = true,
  children,
}: Props) {
  const onDark = mode === "dark";
  const barColor = onDark ? "#e9edef" : "#111b21";

  const statusBarEl = showStatusBar ? (
    <div
      className="relative flex items-center justify-between px-7 pb-1 select-none"
      style={{
        height: 44,
        paddingTop: 14,
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, sans-serif",
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: "0.02em",
        color: barColor,
        flexShrink: 0,
      }}
    >
      <span>{statusBar.time}</span>
      {/* 灵动岛 */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          top: 8,
          width: 96,
          height: 26,
          background: "#000000",
        }}
      />
      <div className="flex items-center gap-1.5">
        {statusBar.carrier ? (
          <span style={{ fontSize: 12, fontWeight: 500, marginRight: 2 }}>
            {statusBar.carrier}
          </span>
        ) : null}
        <SignalBars level={statusBar.signal} color={barColor} />
        {statusBar.wifi ? <WifiIcon color={barColor} /> : null}
        <Battery level={statusBar.battery} color={barColor} />
      </div>
    </div>
  ) : null;

  if (!frame) {
    return <div className="flex flex-col w-full h-full">{children}</div>;
  }

  return (
    <div
      className="relative mx-auto"
      style={{
        width: 390,
        background: "#1c1c1e",
        borderRadius: 46,
        padding: 11,
        boxShadow: "0 18px 46px rgba(0,0,0,0.22)",
      }}
    >
      <div
        className="flex flex-col overflow-hidden"
        style={{ borderRadius: 36, minHeight: 700 }}
      >
        {statusBarEl}
        <div className="flex-1 flex flex-col">{children}</div>
      </div>
    </div>
  );
}
