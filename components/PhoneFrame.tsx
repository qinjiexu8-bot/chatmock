"use client";

import type { StatusBar, ThemeMode } from "@/lib/types";

interface Props {
  statusBar: StatusBar;
  showStatusBar: boolean;
  mode: ThemeMode;
  /** 是否渲染手机外框。关闭时输出＝真机截图形态（完整矩形、无开孔） */
  frame?: boolean;
  /**
   * 状态栏风格：ios=时间靠左、右侧图标组；android=时间靠左、运营商名、右侧图标组。
   * 注意：灵动岛/挖孔是硬件开孔，真机截图里不存在，只在 frame（设备 mockup）下画。
   */
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
 * - android wifi：Pixel 状态栏三段式扇形（内楔块 + 中弧带 + 外弧带，
 *   均匀 0.08R 缝隙、径向平切端），与 iOS 弧带式不共用，详见 AndroidWifiIcon
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

/**
 * Android（Pixel 状态栏）wifi：三段式扇形，与 iOS 的弧带式结构相近但几何不同
 * —— 扇形顶点更钝（半角 42.5°，iOS 47°）、端部平切、间隙均匀。
 *
 * 为什么不是实心扇形：旧版直接照搬 Material `signal_wifi_4_bar` 的实心扇
 * （`M24 4.98C…L12 17Z`），在 16.9px 的 1x 尺寸下会糊成一坨实心三角，
 * 与旁边 4 根分段信号条的视觉密度完全不一致。真机状态栏用的是三段式：
 * 内楔块 + 中弧带 + 外弧带，两道 0.08R 的均匀缝隙让它在小尺寸下仍能读出
 * "wifi" 而不是"实心块"。A/B 记录：scripts/output/wifi-ab5.png
 * （生成脚本 scripts/qa/wifi-ab.cjs，可重跑）
 *
 * 几何（viewBox 0 0 24 17.75，顶点 (12, 17.75)，R = 17.75，半角 42.5°）：
 * - 内楔块 0 → 0.51R   （顶点实心，顶部为弧）
 * - 中弧带 0.59R → 0.71R
 * - 外弧带 0.79R → 1.00R
 * - 两处缝隙均为 0.08R，端部径向平切（非 round cap）
 */
function AndroidWifiIcon({ color }: { color: string }) {
  return (
    <svg width="16.9" height="12.5" viewBox="0 0 24 17.75" fill="none">
      {/* 内楔块 */}
      <path
        d="M12 17.75 L5.884 11.0758 A9.0525 9.0525 0 0 1 18.116 11.0758 Z"
        fill={color}
      />
      {/* 中弧带 */}
      <path
        d="M3.4856 8.4573 A12.6025 12.6025 0 0 1 20.5144 8.4573 L19.0751 10.0291 A10.4725 10.4725 0 0 0 4.9249 10.0291 Z"
        fill={color}
      />
      {/* 外弧带 */}
      <path
        d="M0.0083 4.6633 A17.75 17.75 0 0 1 23.9917 4.6633 L21.4735 7.4112 A14.0225 14.0225 0 0 0 2.5265 7.4112 Z"
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
      {/* 灵动岛（iOS）/ 挖孔（Android）——只在设备 mockup 里画。
          真机截图永远是一张完整矩形：刘海、灵动岛、挖孔都是屏幕上的硬件开孔，
          不会被截进图里（灵动岛只在有 Live Activity 运行时才会入镜）。
          所以默认输出＝截图模式，不画；勾了 phone frame 才是"设备展示图"，
          有机身就该有开孔，此时画出。 */}
      {frame ? (
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full"
          style={{
            top: 8,
            width: isAndroid ? 18 : 96,
            height: isAndroid ? 18 : 26,
            background: "#000000",
          }}
        />
      ) : null}
      <div className="flex items-center gap-[7px]">
        {/* 真机 iOS 在 app 内不显示运营商名，仅 Android 样式显示 */}
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
