import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader, JsonLd } from "@/components/SiteChrome";
import TextMessageChat from "@/components/chats/TextMessageChat";
import WhatsAppChat from "@/components/chats/WhatsAppChat";
import MessengerChat from "@/components/chats/MessengerChat";
import DiscordChat from "@/components/chats/DiscordChat";
import TelegramChat from "@/components/chats/TelegramChat";
import InstagramChat from "@/components/chats/InstagramChat";
import SnapchatChat from "@/components/chats/SnapchatChat";
import WhatsAppCallLog from "@/components/chats/WhatsAppCallLog";
import AndroidSmsChat from "@/components/chats/AndroidSmsChat";
import { getTheme } from "@/lib/themes";
import { examples, TOPICS, type ExampleItem } from "@/lib/examples";
import { livePages, site, abs } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Chat Screenshot Examples — WhatsApp, iMessage, Telegram & More | ChatMock",
  description:
    "Browse realistic chat screenshot examples by scene: creator DMs, team workflows, group threads and everyday plans. Every example is rendered live — open the matching free generator and make your own.",
  alternates: { canonical: abs("/examples") },
};

/** 与 GeneratorShell 相同的平台 → 渲染组件映射（纯展示，服务端可渲染）。 */
function ChatRenderer({ item }: { item: ExampleItem }) {
  const theme = getTheme(item.platformId);
  const { conversation } = item;
  switch (item.platformId) {
    case "whatsapp":
    case "group-chat":
      return <WhatsAppChat conversation={conversation} theme={theme} />;
    case "text-message":
      return <TextMessageChat conversation={conversation} theme={theme} />;
    case "messenger":
      return <MessengerChat conversation={conversation} theme={theme} />;
    case "discord":
      return <DiscordChat conversation={conversation} theme={theme} />;
    case "telegram":
      return <TelegramChat conversation={conversation} theme={theme} />;
    case "instagram-dm":
      return <InstagramChat conversation={conversation} theme={theme} />;
    case "snapchat":
      return <SnapchatChat conversation={conversation} theme={theme} />;
    case "whatsapp-call":
      return <WhatsAppCallLog conversation={conversation} theme={theme} />;
    case "android-sms":
      return <AndroidSmsChat conversation={conversation} theme={theme} />;
    default:
      return null;
  }
}

const SCALE = 0.78; // 390 宽的屏幕内容缩放进卡片

function ExampleCard({ item, platformName }: { item: ExampleItem; platformName: string }) {
  const gen = livePages.find((p) => p.platformId === item.platformId);
  return (
    <article className="w-[312px] shrink-0">
      <div className="overflow-hidden rounded-[var(--radius-card)] border border-black/10 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <div
          className="overflow-hidden"
          style={{ height: Math.round(780 * SCALE), width: Math.round(390 * SCALE) }}
        >
          <div
            style={{
              width: 390,
              height: 780,
              transform: `scale(${SCALE})`,
              transformOrigin: "top left",
            }}
          >
            <ChatRenderer item={item} />
          </div>
        </div>
      </div>
      <div className="mt-3 px-1">
        <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-[11.5px] font-medium text-primary">
          {platformName}
          {item.conversation.mode === "dark" ? " · Dark" : ""}
        </span>
        <h3 className="mt-2 text-[16.5px] font-semibold leading-snug tracking-tight text-foreground">
          {item.title}
        </h3>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
          {item.description}
        </p>
        {gen ? (
          <Link
            href={`/${gen.slug}`}
            className="mt-2 inline-flex items-center gap-1 text-[13.5px] font-medium text-primary hover:underline underline-offset-2"
          >
            Open the {gen.name} generator →
          </Link>
        ) : null}
      </div>
    </article>
  );
}

export default function ExamplesPage() {
  const nameOf = (platformId: string) =>
    livePages.find((p) => p.platformId === platformId)?.name ?? platformId;

  return (
    <>
      <SiteHeader current="examples" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Chat Screenshot Examples",
          url: abs("/examples"),
          description:
            "Realistic chat screenshot examples rendered live with the ChatMock engine, grouped by scene.",
          isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Chat screenshot examples",
          itemListElement: examples.map((e, i) => {
            const gen = livePages.find((p) => p.platformId === e.platformId);
            return {
              "@type": "ListItem",
              position: i + 1,
              name: e.title,
              url: gen ? abs(`/${gen.slug}`) : abs("/examples"),
            };
          }),
        }}
      />

      <main>
        {/* ---------------- Hero ---------------- */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-4">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-[12.5px] font-medium text-primary">
              Examples
            </span>
            <h1 className="font-display mt-4 text-[34px] sm:text-[42px] font-semibold tracking-tight leading-[1.08] text-foreground">
              Chat screenshot examples, rendered live
            </h1>
            <p className="mt-4 text-[16.5px] leading-relaxed text-muted-foreground">
              Study a scene before you build it. Every example below is a working conversation
              rendered by the same engine that powers our generators — the bubbles, ticks,
              headers and wallpapers you see are exactly what you can export, not marketing
              images.
            </p>
            <p className="mt-3 text-[16.5px] leading-relaxed text-muted-foreground">
              We grouped the gallery by the scenes people actually make rather than by app:
              creator DMs, team workflows, group threads and everyday plans. Find the scene
              that fits, open the matching generator, change the names and timing, and export
              your version in one click — free, no signup, no watermark.
            </p>

            {/* 场景锚点导航 */}
            <nav className="mt-6 flex flex-wrap gap-2">
              {TOPICS.map((t) => (
                <a
                  key={t.id}
                  href={`#topic-${t.id}`}
                  className="rounded-full border border-black/10 bg-white/80 px-4 py-1.5 text-[13px] text-black/70 transition hover:border-primary/40 hover:text-primary"
                >
                  {t.label}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {/* ---------------- 场景分区 ---------------- */}
        {TOPICS.map((t) => {
          const items = examples.filter((e) => e.topic === t.id);
          if (!items.length) return null;
          return (
            <section
              key={t.id}
              id={`topic-${t.id}`}
              className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 scroll-mt-24"
            >
              <div className="hairline" />
              <h2 className="font-display mt-8 text-[24px] sm:text-[27px] font-semibold tracking-tight text-foreground">
                {t.label}
              </h2>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                {t.blurb}
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-10">
                {items.map((item) => (
                  <ExampleCard
                    key={item.id}
                    item={item}
                    platformName={nameOf(item.platformId)}
                  />
                ))}
              </div>
            </section>
          );
        })}

        {/* ---------------- 平台速览 ---------------- */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14">
          <div className="hairline" />
          <h2 className="font-display mt-8 text-[24px] sm:text-[27px] font-semibold tracking-tight text-foreground">
            Every example starts in a free generator
          </h2>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Each scene above was made with one of the tools below. Open any generator and you
            start from a conversation shaped like these examples — then edit every name,
            message, timestamp and colour.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {livePages.map((p) => (
              <Link
                key={p.slug}
                href={`/${p.slug}`}
                className="rounded-full border border-black/10 bg-white/80 px-4 py-1.5 text-[13px] text-black/70 transition hover:border-primary/40 hover:text-primary"
              >
                {p.name} generator
              </Link>
            ))}
          </div>
        </section>

        {/* ---------------- 收尾 CTA ---------------- */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14">
          <div className="hairline" />
          <div className="py-12">
            <h2 className="font-display text-[24px] sm:text-[27px] font-semibold tracking-tight text-foreground">
              Found a scene that works? Make your version.
            </h2>
            <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
              Pick an example, open its generator, and change the names, timing and reactions
              until it reads right. Everything renders locally in your browser — nothing is
              uploaded, and exports are high-resolution PNGs without a watermark.
            </p>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
              Use them for video storytelling, UI presentations, teaching material and design
              mockups — and read our{" "}
              <Link href="/acceptable-use" className="text-primary hover:underline underline-offset-2">
                acceptable use policy
              </Link>{" "}
              before publishing: mockups are for illustration, never for deception.
            </p>
            <Link
              href={`/${livePages[0]?.slug ?? "whatsapp-chat-generator"}`}
              className="mt-6 inline-flex items-center h-11 px-6 rounded-full bg-primary text-primary-foreground text-[14px] font-medium hover:opacity-90 transition"
            >
              Open the editor →
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
