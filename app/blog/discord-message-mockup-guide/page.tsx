import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs } from "@/lib/seo";
import { getPost } from "@/lib/blog";

const SLUG = "discord-message-mockup-guide";
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
            Discord screenshots show up everywhere gaming content lives: clan recruitment
            posts, developer update recaps, streamer Q&amp;As, moderator callout
            threads. And they fail in a very consistent way — most fake Discord screenshots
            are drawn like WhatsApp or iMessage, with left and right bubbles and a green
            header. Anyone who opens Discord daily clocks it as fake before reading a word,
            because Discord is not a bubble app. It is a row-based layout, and that single
            structural fact decides everything else.
          </p>
          <p>
            This guide walks through building one that survives a glance from an actual
            user, using the free{" "}
            <Link href="/discord-chat-generator">Discord chat generator</Link>. Everything
            runs in the browser, exports a high-resolution PNG, and — starting this week —
            supports uploading a photo for every member, not just the channel icon.
          </p>

          <h2>The layout is rows, not bubbles</h2>
          <p>
            Every Discord message is a full-width row: a 40px avatar on the left, then a
            coloured username with a timestamp beside it, then the message text underneath,
            wrapping across the whole channel width. There is no left/right alignment, no
            bubble shape, no tail. When someone sends several messages in a row, the avatar
            and username appear only once — subsequent messages indent to align with the
            text, not the avatar. Generators that repeat the avatar on every line get it
            wrong; so do ones that draw two coloured columns of bubbles.
          </p>
          <p>
            The username colour is not decoration either. Discord derives it from roles, so
            regular members often share a near-white default while moderators and boosters
            carry stronger colours. A channel where every user has a different vivid colour
            reads as staged; two or three shared colours with one or two accents reads as
            real.
          </p>

          <h2>Dark mode is the default — design for it first</h2>
          <p>
            Discord&apos;s dark theme is not an inversion of light mode; it is the app&apos;s
            home. The channel background sits around <code>#313338</code>, the sidebar is a
            step darker, and text is a soft off-white rather than pure white. If your mockup
            uses pure black or pure white text on mid-grey, it will look off without the
            viewer being able to say why. Light mode exists and is worth using when the
            surrounding video or slide is light-themed — just do not treat it as the default.
          </p>
          <p>
            The exact values matter less than the relationships: sidebar darker than chat
            area, timestamps and dividers in a muted grey, and the channel header carrying a
            <code>#</code> prefix with the topic line beside it. Our{" "}
            <Link href="/messaging-app-ui-colour-reference">messaging app colour
            reference</Link> lists the values we use.
          </p>

          <h2>Building the screenshot, step by step</h2>
          <ol>
            <li>
              <strong>Name the channel.</strong> Type it into the <em>Contact → Name</em>{" "}
              field — the <code>#</code> prefix is added automatically — and write a topic
              line. A believable topic (&ldquo;no spoilers for ep. 12&rdquo;) does more for
              realism than any colour choice.
            </li>
            <li>
              <strong>Add the members.</strong> Each participant gets a username, a role
              colour, and — new — an uploaded avatar. Without a photo the generator draws a
              coloured initial circle, which is exactly what Discord does for default
              avatars. Two or three members is enough for most scenes.
            </li>
            <li>
              <strong>Write grouped messages.</strong> Real Discord conversations are runs:
              one person firing off three short lines, then a gap, then a reply. Let the
              generator group them — avatar and username once per run.
            </li>
            <li>
              <strong>Pick the theme last.</strong> Dark for gaming and community content,
              light when the mockup sits inside a bright design. Export at 2x for thumbnails,
              3x if the text will be read at small size.
            </li>
          </ol>

          <h2>The tells that give a fake away</h2>
          <ul>
            <li>Bubbles with tails — Discord has never used them.</li>
            <li>A timestamp on every single message instead of once per group.</li>
            <li>24-hour timestamps — Discord uses &ldquo;Today at 9:32&rdquo; phrasing.</li>
            <li>Everyone having a different bright username colour.</li>
            <li>A green or blue app header — Discord&apos;s top bar is the channel name with
              a <code>#</code>, nothing else.</li>
          </ul>

          <h2>Where the line is</h2>
          <p>
            A staged moderator conversation in a parody video is a creative device; the same
            screenshot presented as evidence that someone said something is not. We publish
            an <Link href="/acceptable-use">Acceptable Use Policy</Link> and ask that mockups
            stay recognisable as staged work. If you are staging conversations for fiction,
            the <Link href="/examples">examples gallery</Link> has complete scenes you can
            borrow structure from, including a{" "}
            <Link href="/examples/discord-chat-generator">Discord-specific set</Link>.
          </p>
        </article>

        <p className="mt-10 text-[14px]">
          <Link href="/blog" className="text-primary underline underline-offset-2">
            ← Back to the blog
          </Link>
        </p>
      </main>

      <SiteFooter trademark={{ name: "Discord", owner: "Discord Inc." }} />
    </>
  );
}
