import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs } from "@/lib/seo";
import { getPost } from "@/lib/blog";

const SLUG = "messaging-app-ui-colour-reference";
const post = getPost(SLUG)!;

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: { canonical: `/blog/${SLUG}` },
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
        <p className="text-[13px] text-black/40">
          {post.date} · {post.readMinutes} min read
        </p>
        <h1 className="font-display mt-2 text-[32px] sm:text-[38px] font-semibold tracking-tight leading-[1.15] text-foreground">
          {post.title}
        </h1>

        <article className="prose-cm mt-8">
          <p>
            Every chat mockup lives or dies on colour. The interface is familiar to billions of
            people, which means a wrong green is spotted in under a second — not consciously,
            but as a feeling that something is off. This reference collects the actual bubble,
            header and accent colours of the five most-mocked messaging apps, in light and dark
            mode, as used by the generators on this site. Bookmark it if you build mockups by
            hand in Figma; the{" "}
            <Link href="/#generators">generators</Link> already bake these values in.
          </p>

          <h2>WhatsApp</h2>
          <p>
            The most-mocked interface on the internet, and the one most often wrong. On an
            iPhone the header is not green at all — it picks up the beige of the wallpaper
            (#efeae2), while the Android build wears the teal-green most people picture. The
            outgoing bubble is a soft sage green — not the header green, and definitely not the
            saturated green most clones use. Bubble radius is a modest 12px with a corner tail,
            not the 16–18px pill shape people remember.
          </p>
          <table>
            <thead>
              <tr>
                <th>Element</th>
                <th>Light mode</th>
                <th>Dark mode</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Chat background</td>
                <td>
                  <code>#efeae2</code>
                </td>
                <td>
                  <code>#0b141a</code>
                </td>
              </tr>
              <tr>
                <td>Header bar (iPhone)</td>
                <td>
                  <code>#efeae2</code>
                </td>
                <td>
                  <code>#202c33</code>
                </td>
              </tr>
              <tr>
                <td>Incoming bubble</td>
                <td>
                  <code>#ffffff</code>
                </td>
                <td>
                  <code>#202c33</code>
                </td>
              </tr>
              <tr>
                <td>Outgoing bubble</td>
                <td>
                  <code>#d9fdd3</code>
                </td>
                <td>
                  <code>#005c4b</code>
                </td>
              </tr>
              <tr>
                <td>Blue read ticks</td>
                <td>
                  <code>#53bdeb</code>
                </td>
                <td>
                  <code>#53bdeb</code>
                </td>
              </tr>
              <tr>
                <td>Secondary text</td>
                <td>
                  <code>#667781</code>
                </td>
                <td>
                  <code>#8696a0</code>
                </td>
              </tr>
            </tbody>
          </table>

          <h2>iMessage (iPhone text messages)</h2>
          <p>
            Apple&apos;s blue is softer than most recreations — it leans pastel, and it pairs
            with a light grey incoming bubble. The details that matter: no timestamps inside
            bubbles (they sit in centred dividers between groups), and the small
            &ldquo;Delivered&rdquo; line under the last outgoing message.
          </p>
          <table>
            <thead>
              <tr>
                <th>Element</th>
                <th>Light mode</th>
                <th>Dark mode</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Chat background</td>
                <td>
                  <code>#ffffff</code>
                </td>
                <td>
                  <code>#000000</code>
                </td>
              </tr>
              <tr>
                <td>Outgoing bubble</td>
                <td>
                  <code>#0b93f6</code>
                </td>
                <td>
                  <code>#2652d9</code>
                </td>
              </tr>
              <tr>
                <td>Incoming bubble</td>
                <td>
                  <code>#e5e5ea</code>
                </td>
                <td>
                  <code>#26252a</code>
                </td>
              </tr>
              <tr>
                <td>Outgoing text</td>
                <td>
                  <code>#ffffff</code>
                </td>
                <td>
                  <code>#ffffff</code>
                </td>
              </tr>
            </tbody>
          </table>

          <h2>Google Messages (Android SMS)</h2>
          <p>
            Material blue is bluer and colder than Apple&apos;s. Unlike iMessage, timestamps
            live inside the bubbles, and the header uses a letter avatar rather than a photo.
          </p>
          <table>
            <thead>
              <tr>
                <th>Element</th>
                <th>Light mode</th>
                <th>Dark mode</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Chat background</td>
                <td>
                  <code>#ffffff</code>
                </td>
                <td>
                  <code>#1f1f1f</code>
                </td>
              </tr>
              <tr>
                <td>Outgoing bubble</td>
                <td>
                  <code>#1a73e8</code>
                </td>
                <td>
                  <code>#0b57d0</code>
                </td>
              </tr>
              <tr>
                <td>Incoming bubble</td>
                <td>
                  <code>#f1f3f4</code>
                </td>
                <td>
                  <code>#2d2f31</code>
                </td>
              </tr>
              <tr>
                <td>Accent / actions</td>
                <td>
                  <code>#1a73e8</code>
                </td>
                <td>
                  <code>#a8c7fa</code>
                </td>
              </tr>
            </tbody>
          </table>

          <h2>Telegram</h2>
          <p>
            Telegram&apos;s light mode outgoing bubble is a pale green with fully rounded,
            tail-less bubbles — geometrically closer to iMessage than WhatsApp. The desktop and
            mobile clients differ slightly; these are the mobile values.
          </p>
          <table>
            <thead>
              <tr>
                <th>Element</th>
                <th>Light mode</th>
                <th>Dark mode</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Chat background</td>
                <td>
                  <code>#ffffff</code> (patterned wallpaper)
                </td>
                <td>
                  <code>#0f0f0f</code>
                </td>
              </tr>
              <tr>
                <td>Outgoing bubble</td>
                <td>
                  <code>#eeffde</code>
                </td>
                <td>
                  <code>#2b5278</code>
                </td>
              </tr>
              <tr>
                <td>Incoming bubble</td>
                <td>
                  <code>#ffffff</code>
                </td>
                <td>
                  <code>#212121</code>
                </td>
              </tr>
              <tr>
                <td>Check marks (read)</td>
                <td>
                  <code>#4fae4e</code>
                </td>
                <td>
                  <code>#63d0fd</code>
                </td>
              </tr>
            </tbody>
          </table>

          <h2>Messenger and Instagram DM</h2>
          <p>
            Meta&apos;s pair share a family look: fully rounded, tail-less bubbles on white
            (or near-black), blue for Messenger, a purple-to-pink gradient for Instagram. Both
            use small &ldquo;Seen&rdquo; captions instead of tick systems.
          </p>
          <table>
            <thead>
              <tr>
                <th>Element</th>
                <th>Messenger light</th>
                <th>Instagram DM light</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Outgoing bubble</td>
                <td>
                  <code>#0084ff</code>
                </td>
                <td>
                  <code>#3797f0</code> (gradient accents <code>#a033ff</code>→<code>#e24aa2</code>)
                </td>
              </tr>
              <tr>
                <td>Incoming bubble</td>
                <td>
                  <code>#f0f0f0</code>
                </td>
                <td>
                  <code>#efefef</code>
                </td>
              </tr>
              <tr>
                <td>Chat background</td>
                <td>
                  <code>#ffffff</code>
                </td>
                <td>
                  <code>#ffffff</code>
                </td>
              </tr>
            </tbody>
          </table>

          <h2>How to use these numbers</h2>
          <p>
            Two warnings from experience. First, screenshot colours lie: taking a screenshot,
            eyedropping it and trusting the result gives you the compressed, colour-managed
            version — close, but noticeably off next to a real device. The tables above are the
            values the real clients use. Second, colour is only half the game; geometry does the
            other half. Bubble radius, tail placement, timestamp position and max bubble width
            (roughly 75% of chat width everywhere) matter as much as hex codes. If you would
            rather not juggle either, the{" "}
            <Link href="/whatsapp-chat-generator">WhatsApp</Link>,{" "}
            <Link href="/fake-text-message-generator">iMessage</Link>,{" "}
            <Link href="/telegram-chat-generator">Telegram</Link> and{" "}
            <Link href="/messenger-chat-generator">Messenger</Link> generators ship with all of
            it pre-set — free, no signup, no watermark.
          </p>
        </article>

        <p className="mt-10 text-[14px]">
          <Link href="/blog" className="text-primary underline underline-offset-2">
            ← Back to the blog
          </Link>
        </p>
      </main>

      <SiteFooter trademark={{ name: "WhatsApp", owner: "Meta Platforms, Inc." }} />
    </>
  );
}
