import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs } from "@/lib/seo";
import { getPost } from "@/lib/blog";

const SLUG = "instagram-dm-screenshot-guide";
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
        <p className="text-[13px] text-black/55">
          {post.date} · {post.readMinutes} min read
        </p>
        <h1 className="font-display mt-2 text-[32px] sm:text-[38px] font-semibold tracking-tight leading-[1.15] text-foreground">
          {post.title}
        </h1>

        <article className="prose-cm mt-8">
          <p>
            Instagram DM screenshots are the backbone of meme pages: the &ldquo;slide into
            the DMs&rdquo; format, influencer-drama recaps, brand banter posts, reddit-style
            reaction compilations. The format is so common that audiences read these
            screenshots instantly — which also means they notice instantly when something is
            off. An Instagram DM mockup drawn with WhatsApp-style ticks or a green bubble
            gets scrolled past, or worse, called out in the comments.
          </p>
          <p>
            This guide covers what the real interface does, then how to recreate it with the
            free <Link href="/instagram-dm-generator">Instagram DM generator</Link> —
            browser-only, no signup, no watermark, PNG export.
          </p>

          <h2>The anatomy of a real Instagram DM</h2>
          <p>
            Instagram&apos;s conversation screen is white (pure black in dark mode) with
            rounded bubbles and no tails. Incoming messages are a light grey{" "}
            <code>#efefef</code> with black text; outgoing messages carry the
            signature purple-to-pink gradient (<code>#a033ff</code> into{" "}
            <code>#e24aa2</code>) with white text. There are no read ticks inside bubbles —
            the read state is a <strong>Seen</strong> line under the most recent outgoing
            message, in small grey text. Bubbles do not carry per-message timestamps; a
            centred date pill appears when the conversation spans days.
          </p>
          <p>
            The header is the contact&apos;s username with their avatar and a back arrow,
            plus call and video icons on the right. Note what is missing: no online dot by
            default, no status line unless you count the activity indicator, and no app-wide
            green. Generators that add WhatsApp-style headers or tick marks are the fastest
            way to spot a fake.
          </p>

          <h2>Building the screenshot, step by step</h2>
          <ol>
            <li>
              <strong>Set the contact.</strong> Lowercase usernames read as more real —
              Instagram handles are rarely capitalised. Upload an avatar if the account
              would plausibly have one; otherwise the neutral initial circle appears, same
              as the app.
            </li>
            <li>
              <strong>Write the exchange.</strong> Meme-page DMs are short and punchy: a
              hook, a reply, a punchline. Long paragraphs are for email, not DMs — and the
              gradient bubble makes long outgoing text hard to read, which real users
              unconsciously avoid.
            </li>
            <li>
              <strong>Decide the Seen beat.</strong> The <em>Seen</em> line appears under
              your last outgoing message. &ldquo;Seen at the wrong time&rdquo; — left on read
              after a vulnerable message — is the single most reused beat in DM meme
              content, and the generator lets you control exactly which message carries it.
            </li>
            <li>
              <strong>Match the mode to the feed.</strong> Dark-mode screenshots blend into
              night-time scrolling; light-mode ones pop on dark backgrounds. Export at 2x
              for feed posts, 3x when the screenshot is the whole content.
            </li>
          </ol>

          <h2>The tells that give a fake away</h2>
          <ul>
            <li>Read ticks inside bubbles — Instagram has none; it is the Seen line or
              nothing.</li>
            <li>Blue or green outgoing bubbles instead of the purple-pink gradient.</li>
            <li>Timestamps under every bubble — real DMs only show date dividers.</li>
            <li>Tails on bubbles — Instagram bubbles are tail-less rounded rectangles.</li>
            <li>An online &ldquo;active now&rdquo; dot in places the real app never shows
              it.</li>
          </ul>
          <p>
            The colour relationships are worth internalising rather than copying by eye. Our{" "}
            <Link href="/messaging-app-ui-colour-reference">messaging app colour
            reference</Link> lists the exact values for Instagram DM light and dark, next to
            WhatsApp, iMessage, Telegram and Messenger.
          </p>

          <h2>Where the line is</h2>
          <p>
            DM memes work because everyone understands they are staged. The same image
            presented as real evidence that someone sent a message — impersonation, fake
            receipts, harassment — is a different thing entirely, and it is the line our{" "}
            <Link href="/acceptable-use">Acceptable Use Policy</Link> draws. Keep mockups
            recognisable as mockups. For a head start on scene structure, the{" "}
            <Link href="/examples/instagram-dm-generator">Instagram DM examples gallery</Link>{" "}
            renders complete conversations live, ready to remix in the generator.
          </p>
        </article>

        <div className="mt-12 border-t border-black/10 pt-6">
          <h2 className="text-[16px] font-semibold tracking-tight text-foreground">
            Related guides
          </h2>
          <ul className="mt-3 space-y-2 text-[14.5px]">
            {[
              "messaging-app-ui-colour-reference",
              "chat-screenshots-in-video-storytelling"
            ].map((rslug) => {
              const rel = getPost(rslug)!;
              return (
                <li key={rslug}>
                  <Link href={`/blog/${rslug}`} className="text-primary hover:underline underline-offset-2">
                    {rel.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="mt-10 text-[14px]">
          <Link href="/blog" className="text-primary underline underline-offset-2">
            ← Back to the blog
          </Link>
        </p>
      </main>

      <SiteFooter trademark={{ name: "Instagram", owner: "Meta Platforms, Inc." }} />
    </>
  );
}
