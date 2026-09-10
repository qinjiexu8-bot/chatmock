import { ImageResponse } from "next/og";
import { livePages } from "@/lib/seo";
import { blogPosts } from "@/lib/blog";

/**
 * 每页专属 OpenGraph 分享图（1200x630，构建期静态生成）。
 * /og/{slug} —— slug 与页面路径一一对应，各页 metadata 显式引用。
 * 品牌色 #4b61fa = oklch(56.9% .227 270.9) 的 sRGB 近似。
 */

export const runtime = "nodejs";
export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

interface OgCopy {
  title: string;
  sub: string;
}

function buildCopy(): Map<string, OgCopy> {
  const map = new Map<string, OgCopy>();

  for (const p of livePages) {
    map.set(p.slug, {
      title: p.h1.replace(/^Free /, ""),
      sub: `${p.name} generator · Free, no signup, no watermark`,
    });
    map.set(`examples/${p.slug}`, {
      title: `${p.name} Chat Screenshot Examples`,
      sub: "Live-rendered examples gallery",
    });
  }
  for (const b of blogPosts) {
    map.set(`blog/${b.slug}`, { title: b.title, sub: "ChatMock Blog" });
  }
  map.set("examples", {
    title: "Chat Screenshot Examples, Rendered Live",
    sub: "Creator DMs · Team workflows · Group threads · Everyday plans",
  });
  map.set("blog", {
    title: "Chat Mockup Guides and Design References",
    sub: "ChatMock Blog",
  });

  return map;
}

export function generateStaticParams() {
  return [...buildCopy().keys()].map((slug) => ({
    slug: slug.split("/"),
  }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const copy = buildCopy().get(slug.join("/")) ?? {
    title: "Free Chat Mockup Generator",
    sub: "Free, no signup, no watermark",
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #f0f2ff 0%, #e4e9ff 55%, #d9e0ff 100%)",
          position: "relative",
        }}
      >
        {/* 顶部渐变细条 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            background: "linear-gradient(90deg, #4b61fa, #8b5cf6, #4b61fa)",
            display: "flex",
          }}
        />
        {/* 装饰气泡（右上 / 左下） */}
        <div
          style={{
            position: "absolute",
            top: 68,
            right: 72,
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 210,
              height: 64,
              borderRadius: 32,
              background: "#4b61fa",
              display: "flex",
              alignItems: "center",
              paddingLeft: 28,
            }}
          >
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: 5, background: "#ffffff" }} />
              <div style={{ width: 10, height: 10, borderRadius: 5, background: "#ffffff" }} />
              <div style={{ width: 10, height: 10, borderRadius: 5, background: "#ffffff" }} />
            </div>
          </div>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              background: "#c9d2f5",
              display: "flex",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 150,
            right: 72,
            width: 150,
            height: 56,
            borderRadius: 28,
            background: "#ffffff",
            border: "1px solid #c9d2f5",
            display: "flex",
            alignItems: "center",
            paddingLeft: 22,
          }}
        >
          <div style={{ display: "flex", gap: 7 }}>
            <div style={{ width: 9, height: 9, borderRadius: 5, background: "#8fa1f7" }} />
            <div style={{ width: 9, height: 9, borderRadius: 5, background: "#8fa1f7" }} />
          </div>
        </div>

        {/* 主内容 */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 14,
              background: "#4b61fa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 30,
                height: 22,
                background: "#ffffff",
                borderRadius: 7,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
              }}
            >
              <div style={{ width: 4.5, height: 4.5, borderRadius: 3, background: "#4b61fa" }} />
              <div style={{ width: 4.5, height: 4.5, borderRadius: 3, background: "#4b61fa" }} />
              <div style={{ width: 4.5, height: 4.5, borderRadius: 3, background: "#4b61fa" }} />
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#4b61fa", letterSpacing: -0.5 }}>
            ChatMock
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 940 }}>
          <div
            style={{
              display: "flex",
              fontSize: copy.title.length > 42 ? 64 : 76,
              fontWeight: 700,
              color: "#14142b",
              letterSpacing: -2.5,
              lineHeight: 1.12,
            }}
          >
            {copy.title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 27,
              color: "#3d3d5c",
            }}
          >
            {copy.sub}
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["No signup", "No watermark", "Nothing uploaded"].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                padding: "9px 22px",
                borderRadius: 999,
                background: "#ffffff",
                border: "1px solid #c9d2f5",
                color: "#4b61fa",
                fontSize: 21,
                fontWeight: 600,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
