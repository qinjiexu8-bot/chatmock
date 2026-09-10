import { ImageResponse } from "next/og";

/**
 * 站点级 OpenGraph 分享图（1200x630，构建时静态生成）。
 * 所有路由默认继承；分享到 Twitter/X、Facebook、WhatsApp 等时展示。
 * 品牌色 #4b61fa = oklch(56.9% .227 270.9) 的 sRGB 近似。
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "ChatMock — Free chat mockup generator, no signup, no watermark";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f0f2ff 0%, #e4e9ff 55%, #d9e0ff 100%)",
          position: "relative",
        }}
      >
        {/* 顶部渐变细条（站点 hairline 的呼应） */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            background: "linear-gradient(90deg, #4b61fa, #8b5cf6, #4b61fa)",
          }}
        />
        {/* 图标块 */}
        <div
          style={{
            width: 132,
            height: 132,
            borderRadius: 33,
            background: "#4b61fa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 76,
              height: 58,
              background: "#ffffff",
              borderRadius: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <div style={{ width: 9, height: 9, borderRadius: 5, background: "#4b61fa" }} />
            <div style={{ width: 9, height: 9, borderRadius: 5, background: "#4b61fa" }} />
            <div style={{ width: 9, height: 9, borderRadius: 5, background: "#4b61fa" }} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 120px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 700,
              color: "#14142b",
              letterSpacing: -3,
              marginBottom: 18,
            }}
          >
            ChatMock
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 31,
              color: "#3d3d5c",
              marginBottom: 44,
              maxWidth: 860,
              textAlign: "center",
              lineHeight: 1.4,
            }}
          >
            Free chat mockup generator for WhatsApp, Messenger, Telegram and more
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            {["No signup", "No watermark", "Nothing uploaded"].map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  padding: "10px 26px",
                  borderRadius: 999,
                  background: "#ffffff",
                  border: "1px solid #c9d2f5",
                  color: "#4b61fa",
                  fontSize: 24,
                  fontWeight: 600,
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}
