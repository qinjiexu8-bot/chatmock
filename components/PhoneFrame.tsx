"use client";

import type { StatusBar, ThemeMode } from "@/lib/types";

interface Props {
  statusBar: StatusBar;
  showStatusBar: boolean;
  mode: ThemeMode;
  /** 是否渲染手机外框。关闭时只输出聊天内容本身 */
  frame?: boolean;
  /** 状态栏风格：ios=灵动岛，android=居中挖孔、时间靠左 */
  statusBarStyle?: "ios" | "android" | "none";
  /** 状态栏背景色（一般传主题 header 背景）。不传则按明暗模式取色 */
  statusBarBg?: string;
  children: React.ReactNode;
}

/** 相对亮度：>0.55 视为浅色背景，用深色文字 */
function luminance(hex: string): number {
  const m = hex.replace("#", "");
  const full =
    m.length === 3
      ? m
          .split("")
          .map((ch) => ch + ch)
          .join("")
      : m;
  const r = parseInt(full.slice(0, 2), 16) / 255;
  const g = parseInt(full.slice(2, 4), 16) / 255;
  const b = parseInt(full.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
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
  statusBarStyle = "ios",
  statusBarBg,
  children,
}: Props) {
  const isAndroid = statusBarStyle === "android";

  // 状态栏文字色：优先按传入背景的亮度决定（WhatsApp 绿 header 要白字，
  // Telegram/Messenger 白 header 要黑字），否则退回按模式取色
  const barColor = statusBarBg
    ? luminance(statusBarBg) > 0.55
      ? "#111b21"
      : "#f2f2f2"
    : mode === "dark"
      ? "#e9edef"
      : "#111b21";
  const barBackground = statusBarBg ?? (mode === "dark" ? "#000000" : "#ffffff");

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
        background: barBackground,
        flexShrink: 0,
      }}
    >
      <span>{statusBar.time}</span>
      {/* 灵动岛（iOS）/ 挖孔（Android） */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          top: 8,
          width: isAndroid ? 18 : 96,
          height: isAndroid ? 18 : 26,
          background: "#000000",
        }}
      />
      <div className="flex items-center gap-1.5">
        {/* iOS 状态栏从不显示运营商名（会被灵动岛遮住），仅 Android 样式显示 */}
        {isAndroid && statusBar.carrier ? (
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
    // 纯截图模式：真实手机截图 = 屏幕内容（含状态栏），永远不含机身边框。
    // 尺寸与带框时的屏幕一致（390x780），保证 1x/2x/3x 导出规格统一。
    return (
      <div className="flex flex-col w-full overflow-hidden" style={{ width: 390, height: 780 }}>
        {statusBarEl}
        <div className="flex-1 flex flex-col min-h-0">{children}</div>
      </div>
    );
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
        // 固定高度：flex-1 的聊天区恰好填满，导出不会出现底部空洞
        style={{ borderRadius: 36, height: 780 }}
      >
        {statusBarEl}
        <div className="flex-1 flex flex-col">{children}</div>
      </div>
    </div>
  );
}
