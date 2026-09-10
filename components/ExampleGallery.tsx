import Link from "next/link";
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
import { livePages } from "@/lib/seo";
import type { ExampleItem } from "@/lib/examples";

/** 与 GeneratorShell 相同的平台 → 渲染组件映射（纯展示，服务端可渲染）。 */
export function ChatRenderer({ item }: { item: ExampleItem }) {
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

export function ExampleCard({
  item,
  platformName,
  showPlatformBadge = true,
}: {
  item: ExampleItem;
  platformName: string;
  showPlatformBadge?: boolean;
}) {
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
        {showPlatformBadge ? (
          <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-[11.5px] font-medium text-primary">
            {platformName}
            {item.conversation.mode === "dark" ? " · Dark" : ""}
          </span>
        ) : item.conversation.mode === "dark" ? (
          <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-[11.5px] font-medium text-primary">
            Dark mode
          </span>
        ) : null}
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
