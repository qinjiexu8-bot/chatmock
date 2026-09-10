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
 * iOS 状态栏三件套，按 SF Symbols 真实几何绘制：
 * - cellularbars：4 根胶囊形信号条（rx ≈ 半宽，非小圆角），高度 4.5/7/9.5/12
 * - wifi：SF Symbols「wifi」官方字形路径（底部是圆角楔块而非圆点，
 *   两道端头斜切、四角圆润的实心弧带，比例 1.22:1）
 * - android wifi：Pixel 状态栏实心扇形楔块（Material network_wifi 外弧），
 *   与 iOS 弧带式完全不同，不能共用
 * - battery：圆角描边外壳（35% 透明度）+ 内部胶囊电量 + 右侧逗号形正极
 */

function SignalBars({ level, color }: { level: number; color: string }) {
  const bars = [
    { x: 0, h: 4.5 },
    { x: 4.8, h: 7 },
    { x: 9.6, h: 9.5 },
    { x: 14.4, h: 12 },
  ];
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
      {bars.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={12 - b.h}
          width="3.5"
          height={b.h}
          rx="1.2"
          fill={color}
          opacity={i < level ? 1 : 0.3}
        />
      ))}
    </svg>
  );
}

/** SF Symbols「wifi」官方字形路径（brendanballon/sfsymbols-svg 导出，坐标原值） */
const SF_WIFI_PATH = `
    M 36.91015625,7.390625
    Q 36.48046875,7.390625 36.029296875,7.6591796875
    Q 35.578125,7.927734375 34.8046875,8.6796875
    L 28.123046875,15.103515625
    Q 27.822265625,15.404296875 27.7470703125,15.7373046875
    Q 27.671875,16.0703125 27.88671875,16.4140625
    Q 28.74609375,17.57421875 30.12109375,18.5625
    Q 31.49609375,19.55078125 33.236328125,20.1630859375
    Q 34.9765625,20.775390625 36.91015625,20.775390625
    Q 38.80078125,20.775390625 40.51953125,20.1845703125
    Q 42.23828125,19.59375 43.61328125,18.626953125
    Q 44.98828125,17.66015625 45.84765625,16.54296875
    Q 46.126953125,16.177734375 46.0732421875,15.791015625
    Q 46.01953125,15.404296875 45.71875,15.103515625
    L 39.015625,8.6796875
    Q 38.2421875,7.90625 37.791015625,7.6484375
    Q 37.33984375,7.390625 36.91015625,7.390625
    Z
    M 20.75390625,22.494140625
    L 16.5859375,26.662109375
    Q 16.2421875,27.005859375 16.220703125,27.392578125
    Q 16.19921875,27.779296875 16.5,28.14453125
    Q 18.583984375,30.6796875 21.7421875,32.677734375
    Q 24.900390625,34.67578125 28.7783203125,35.8251953125
    Q 32.65625,36.974609375 36.91015625,36.974609375
    Q 41.1640625,36.974609375 45.052734375,35.8251953125
    Q 48.94140625,34.67578125 52.099609375,32.6884765625
    Q 55.2578125,30.701171875 57.3203125,28.14453125
    Q 57.62109375,27.779296875 57.599609375,27.37109375
    Q 57.578125,26.962890625 57.234375,26.662109375
    L 53.06640625,22.515625
    Q 52.658203125,22.12890625 52.1962890625,22.12890625
    Q 51.734375,22.12890625 51.369140625,22.537109375
    Q 49.650390625,24.384765625 47.3408203125,25.845703125
    Q 45.03125,27.306640625 42.3671875,28.1337890625
    Q 39.703125,28.9609375 36.91015625,28.939453125
    Q 34.16015625,28.9609375 31.49609375,28.14453125
    Q 28.83203125,27.328125 26.533203125,25.888671875
    Q 24.234375,24.44921875 22.55859375,22.6015625
    Q 22.150390625,22.171875 21.6669921875,22.12890625
    Q 21.18359375,22.0859375 20.75390625,22.494140625
    Z
    M 9.23828125,34.07421875
    L 5.54296875,37.833984375
    Q 5.220703125,38.177734375 5.19921875,38.5859375
    Q 5.177734375,38.994140625 5.45703125,39.359375
    Q 7.884765625,42.345703125 11.30078125,44.8701171875
    Q 14.716796875,47.39453125 18.8525390625,49.2529296875
    Q 22.98828125,51.111328125 27.5751953125,52.1318359375
    Q 32.162109375,53.15234375 36.91015625,53.15234375
    Q 41.6796875,53.15234375 46.255859375,52.12109375
    Q 50.83203125,51.08984375 54.95703125,49.2421875
    Q 59.08203125,47.39453125 62.498046875,44.8701171875
    Q 65.9140625,42.345703125 68.36328125,39.359375
    Q 68.642578125,38.994140625 68.642578125,38.5859375
    Q 68.642578125,38.177734375 68.27734375,37.833984375
    L 64.58203125,34.138671875
    Q 64.1953125,33.751953125 63.72265625,33.7412109375
    Q 63.25,33.73046875 62.86328125,34.095703125
    Q 57.814453125,39.509765625 51.1650390625,42.32421875
    Q 44.515625,45.138671875 36.91015625,45.138671875
    Q 29.34765625,45.138671875 22.7197265625,42.32421875
    Q 16.091796875,39.509765625 11,34.1171875
    Q 10.61328125,33.708984375 10.119140625,33.708984375
    Q 9.625,33.708984375 9.23828125,34.07421875
    Z`;

function WifiIcon({ color }: { color: string }) {
  return (
    <svg width="15.5" height="12.7" viewBox="0 0 73.82 60.54" fill="none">
      {/* 源文件为 scale(1,-1) 翻转存储，这里等价还原 y 轴 */}
      <g transform="translate(0,60.54) scale(1,-1)">
        <path
          d={SF_WIFI_PATH}
          fill={color}
          stroke={color}
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
      </g>
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
