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

/**
 * iOS 状态栏三件套，按真机几何绘制：
 * - cellularbars：4 根全圆角胶囊信号条（rx = 半宽），高度 4/6.5/9/11.5，
 *   间隙 1.5（真机观感：细条、清透、胶囊头），非激活 30% 透明
 * - wifi：实心扇形切三片（楔形底 + 两条厚弧带，径向平切端），几何按真机截图实测，
 *   详见 WifiIcon 注释与 scripts/output/real-device-wifi2.png
 * - android wifi：Pixel 状态栏实心扇形楔块（Material network_wifi 外弧），
 *   与 iOS 弧带式完全不同，不能共用
 * - battery：圆角描边外壳（35% 透明度）+ 内部胶囊电量 + 右侧逗号形正极
 */

function SignalBars({ level, color }: { level: number; color: string }) {
  const bars = [
    { x: 0, h: 4 },
    { x: 4.5, h: 6.5 },
    { x: 9, h: 9 },
    { x: 13.5, h: 11.5 },
  ];
  return (
    <svg width="16.5" height="12" viewBox="0 0 16.5 12" fill="none">
      {bars.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={12 - b.h}
          width="3"
          height={b.h}
          rx="1.5"
          fill={color}
          opacity={i < level ? 1 : 0.3}
        />
      ))}
    </svg>
  );
}

/**
 * iOS 状态栏 wifi：实心扇形切三片（楔形底 + 两条厚弧带），几何按真机截图实测
 * （scripts/output/real-device-wifi2.png，1179px 原机微信状态栏 10x 放大量取）：
 * - 弧带端部为径向平切（非 round cap），跨度 ±47°
 * - 三段比例（R = 外弧外半径）：楔形 0→0.35R，中带 0.41R→0.68R，外带 0.74R→1.0R，
 *   间隙 0.055R（细缝，比图标库的 wifi 间隙窄得多）
 * - 旧版 SF 路径 + 描边加粗会让端部勾卷、圆点鼓包（wifi-ab3.png A/B 记录）
 */
function WifiIcon({ color }: { color: string }) {
  const cx = 7.75;
  const cy = 10.9; // 扇形顶点（底部尖点）
  const SIN = Math.sin((47 * Math.PI) / 180);
  const COS = Math.cos((47 * Math.PI) / 180);
  const pt = (r: number, side: 1 | -1) =>
    `${(cx + side * r * SIN).toFixed(2)} ${(cy - r * COS).toFixed(2)}`;
  /** 环形弧带：内径 r1 → 外径 r2，两端径向平切 */
  const band = (r1: number, r2: number) => (
    <path
      d={`M ${pt(r2, -1)} A ${r2} ${r2} 0 0 1 ${pt(r2, 1)} L ${pt(r1, 1)} A ${r1} ${r1} 0 0 0 ${pt(r1, -1)} Z`}
      fill={color}
    />
  );
  return (
    <svg width="15.5" height="11.1" viewBox="0 0 15.5 11.1" fill="none">
      {/* 楔形底：顶点在 cy，两侧展开 ±47°，顶部为弧 */}
      <path d={`M ${cx} ${cy} L ${pt(3.4, -1)} A 3.4 3.4 0 0 1 ${pt(3.4, 1)} Z`} fill={color} />
      {band(3.95, 6.6)}
      {band(7.15, 9.7)}
    </svg>
  );
}

/** Android（Pixel 状态栏）wifi：实心扇形楔块，Material network_wifi 外弧 */
function AndroidWifiIcon({ color }: { color: string }) {
  return (
    <svg width="16.9" height="12.5" viewBox="0 0 24 17.75" fill="none">
      <path
        d="M24 4.98C20.93 1.9 16.69 0 12 0C7.31 0 3.07 1.9 0 4.98L12 17L24 4.98Z"
        fill={color}
      />
    </svg>
  );
}

function Battery({ level, color }: { level: number; color: string }) {
  return (
    <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
      <rect
        x="0.5"
        y="0.5"
        width="23.5"
        height="12"
        rx="3.8"
        stroke={color}
        strokeOpacity="0.35"
      />
      <rect
        x="2"
        y="2"
        width={Math.max(2, (level / 100) * 20.5)}
        height="9"
        rx="1.8"
        fill={color}
      />
      <path
        d="M25.5 4.4v4.2c1-.35 1.5-1.1 1.5-2.1s-.5-1.75-1.5-2.1Z"
        fill={color}
        fillOpacity="0.4"
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
        fontSize: 15,
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
      <div className="flex items-center gap-[7px]">
        {/* iOS 状态栏从不显示运营商名（会被灵动岛遮住），仅 Android 样式显示 */}
        {isAndroid && statusBar.carrier ? (
          <span style={{ fontSize: 12, fontWeight: 500, marginRight: 2 }}>
            {statusBar.carrier}
          </span>
        ) : null}
        <SignalBars level={statusBar.signal} color={barColor} />
        {statusBar.wifi ? (
          isAndroid ? (
            <AndroidWifiIcon color={barColor} />
          ) : (
            <WifiIcon color={barColor} />
          )
        ) : null}
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
