import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs } from "@/lib/seo";
import { getPost } from "@/lib/blog";

const SLUG = "telegram-chat-screenshot-guide";
const post = getPost(SLUG)!;

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: { canonical: `/blog/${SLUG}` },
  openGraph: {
    type: "article",
    url: abs(`/blog/${SLUG}`),
    title: post.title,
    description: post.description,
    images: [abs(`/og/blog/${SLUG}`)],
  },
  twitter: {
    card: "summary_large_image",
    images: [abs(`/og/blog/${SLUG}`)],
  },
};

export default function Post() {
  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "ChatMock" },
    publisher: { "@type": "Organization", name: "ChatMock", url: "https://chatmock.net" },
    mainEntityOfPage: abs(`/blog/${SLUG}`),
  };

  return (
    <>
      <SiteHeader />
      <JsonLd data={article} />

      <main className="mx-auto max-w-3xl px-5 pt-12">
        <div className="mb-3">
          <Breadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: "Blog", href: "/blog" },
              { name: post.title },
            ]}
          />
        </div>
        <p className="text-[13px] text-black/40">
          {post.date} · {post.readMinutes} min read
        </p>
        <h1 className="font-display mt-2 text-[32px] sm:text-[38px] font-semibold tracking-tight leading-[1.15] text-foreground">
          {post.title}
        </h1>

        <article className="prose-cm mt-8">
          <p>
            Telegram screenshots carry a specific aesthetic: the textured wallpaper behind
            the bubbles, the floating rounded header, outgoing bubbles in a pale green that
            no other messaging app uses. They show up in crypto-community posts, channel
            announcement recaps and privacy-themed storytelling — and they fail when someone
            clones WhatsApp and recolours it. Telegram shares a grandfather with WhatsApp
            (both descend from the same era of chat design), but its iPhone app has its own
            visual language, and that is what this guide recreates.
          </p>
          <p>
            You can build everything below with the free{" "}
            <Link href="/telegram-chat-generator">Telegram chat generator</Link> — no
            signup, everything rendered in your browser, high-resolution PNG export.
          </p>

          <h2>Checkmarks: two states, not three</h2>
          <p>
            This is the single most common mistake. WhatsApp has three receipt states
            (sent, delivered, read); Telegram has two — one check means sent, two checks
            mean read. There is no &ldquo;delivered&rdquo; state and no blue colour: both
            check states render in the same muted tone. A Telegram mockup with blue double
            ticks or a delivered state is instantly wrong to anyone who uses the app. If the
            story needs &ldquo;they saw it and did not reply&rdquo;, the beat is two checks,
            not a colour change.
          </p>

          <h2>The iPhone shell: wallpaper and floating header</h2>
          <p>
            On iOS, Telegram&apos;s chat background is a subtle doodle wallpaper — faint
            hand-drawn patterns over a pale grey-blue that shifts to a deep night blue in
            dark mode. The header is not a solid bar pinned to the edges: it is a floating
            capsule with rounded corners, sitting above the wallpaper, with the contact name
            and status centred and the avatar on the right. Messages have small tails on the
            first bubble of a group, and outgoing bubbles are a pale green in light mode and
            a desaturated blue in night mode.
          </p>
          <p>
            Timestamps live inside the bubble like WhatsApp, but the status line under the
            contact name follows Telegram conventions: <code>last seen recently</code>,
            <code>last seen 5 minutes ago</code>, or simply <code>online</code>. Our{" "}
            <Link href="/examples/telegram-chat-generator">Telegram examples gallery</Link>{" "}
            shows complete scenes in both modes if you want a reference before editing.
          </p>

          <h2>Building the screenshot, step by step</h2>
          <ol>
            <li>
              <strong>Set the contact.</strong> Type the name, then a status line —
              <code>last seen recently</code> is the most common in real screenshots and
              safer than <code>online</code>, which implies the person is in the app right
              now.
            </li>
            <li>
              <strong>Write the conversation.</strong> Same advice as any platform: uneven
              reply lengths, a texter and a replier, the story beat in the last bubble.
              Three to eight messages carries a scene; more reads as staged.
            </li>
            <li>
              <strong>Set the checks.</strong> One check for sent, two for read. Leave most
              of the conversation at one check — a wall of double-checked messages looks
              rehearsed.
            </li>
            <li>
              <strong>Choose the mode and export.</strong> Light mode for daytime story
              scenes, night mode for anything set after dark. Export at 2x for thumbnails and
              slides, 3x for print or zoomed crops.
            </li>
          </ol>

          <h2>The tells that give a fake away</h2>
          <ul>
            <li>Three-state or blue read receipts — Telegram has one check and two checks,
              same colour.</li>
            <li>A solid, edge-to-edge green header — real iOS Telegram has a floating
              capsule over wallpaper.</li>
            <li>White outgoing bubbles — Telegram&apos;s outgoing bubble is pale green in
              light mode.</li>
            <li>A plain white or grey background with no wallpaper texture.</li>
            <li>Group-chat features (coloured sender names) in a one-to-one chat.</li>
          </ul>

          <h2>Where the line is</h2>
          <p>
            Telegram&apos;s association with crypto communities makes fake channel posts a
            favourite of scam scripts, which is exactly why staged screenshots should stay
            visibly staged. A mockup used to illustrate, parody or teach is fine; one
            designed to be mistaken for evidence is not, and our{" "}
            <Link href="/acceptable-use">Acceptable Use Policy</Link> draws that line
            explicitly. If you are staging a scene and want a head start, the{" "}
            <Link href="/examples">examples gallery</Link> renders complete conversations
            live on every generator page.
          </p>
        </article>

        <p className="mt-10 text-[14px]">
          <Link href="/blog" className="text-primary underline underline-offset-2">
            ← Back to the blog
          </Link>
        </p>
      </main>

      <SiteFooter trademark={{ name: "Telegram", owner: "Telegram FZ-LLC" }} />
    </>
  );
}
