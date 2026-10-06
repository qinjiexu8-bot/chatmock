import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs } from "@/lib/seo";
import { getPost } from "@/lib/blog";

const SLUG = "messaging-app-ui-colour-reference";
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

          <h2>Checking dark mode: inversion is not recolouring</h2>
          <p>
            The first thing to internalise is that a dark theme is not the light theme turned
            inside out. If you took each light value and subtracted it from white, WhatsApp
            light&apos;s outgoing bubble <code>#d9fdd3</code> would become a dark red-violet,
            and the incoming bubble <code>#ffffff</code> would become <code>#000000</code>. The
            real app does neither: the outgoing bubble becomes a deep green{" "}
            <code>#005c4b</code> with light text, and the incoming bubble lifts to{" "}
            <code>#202c33</code> — deliberately <em>above</em> the{" "}
            <code>#0b141a</code> background so it separates from it instead of vanishing into
            it.
          </p>
          <p>
            That gives you a three-point test for any dark render. Take the background, the
            incoming bubble and the outgoing bubble: in a correct theme they are three distinct
            values, the incoming bubble sits lighter than the background, and the accent
            survives unchanged where the app treats it as a brand colour. WhatsApp&apos;s read
            tick is the clearest example — the blue <code>#53bdeb</code> is identical in both
            modes, because it is an accent rather than a tint. A screenshot whose read ticks
            change colour between modes was not built from the real palette.
          </p>
          <p>
            Hue is allowed to move, too. Telegram&apos;s light outgoing bubble is a pale green{" "}
            <code>#eeffde</code>, but its dark outgoing bubble is a steel blue{" "}
            <code>#2b5278</code> — not a dimmed green. So when you check a mockup, ask whether
            the dark palette was <em>chosen</em> for a dark background or merely derived from
            the light one. A green bubble on a near-black Telegram screen answers that question
            on its own.
          </p>

          <h2>Why headers and navigation bars get recoloured wrong</h2>
          <p>
            The header is the element people rebuild from memory, and memory reliably keeps the
            wrong version. The clearest case is WhatsApp: on iPhone the header is not green at
            all — it picks up the beige of the wallpaper, the same <code>#efeae2</code> as the
            chat background, while the Android build wears the teal-green most people picture.
            A green header sitting above an iOS-style WhatsApp thread is one of the quickest
            fakes to catch, and it happens because people remember the app&apos;s brand colour
            instead of the screen in front of them.
          </p>
          <p>
            The same pattern repeats across the family. Meta&apos;s apps use a white or
            near-white header regardless of how colourful the bubbles are: Instagram&apos;s DM
            header is plain white with black text, and Messenger&apos;s is white too. Telegram
            breaks the rule in the opposite direction — its header is a floating capsule rather
            than a solid bar, so there is no full-width header colour to copy at all. Snapchat
            is the loud exception, with a bright yellow header over a white conversation area,
            and Discord replaces the header with a channel name and a topic line.
          </p>
          <p>
            Two relationships are worth memorising because they catch most header errors. First,
            a header that adds a colour the bubbles do not use is usually wrong — the header is
            normally a neutral surface or the app&apos;s single accent, not a third colour.
            Second, navigation chrome (tab bars, sidebars) tends to sit a step away from the
            content surface rather than sharing it, so Discord&apos;s dark sidebar reads a shade
            darker than the channel behind it. If the sidebar and the chat area are the same
            flat value, the mockup is missing depth the real app has.
          </p>

          <h2>Reading a screenshot backwards</h2>
          <p>
            The table is at least as useful in reverse: shown a screenshot, you can work out
            whether it is plausible without knowing the exact value it used. Start with
            relationships rather than hex codes. Is the incoming bubble on the correct side of
            the background? Is the accent consistent with the app&apos;s brand — a blue tick
            that is not WhatsApp&apos;s blue, or an Instagram bubble that is a flat colour
            instead of a gradient, is already suspect.
          </p>
          <p>
            Then match the header to the platform family. White header with a gradient bubble
            points at Instagram; white header with a flat blue bubble and a Seen line points at
            Messenger; a floating capsule over a doodle wallpaper points at Telegram; a{" "}
            <code>#</code>-prefixed channel name with a topic line points at Discord; a yellow
            bar over a white surface points at Snapchat. If a screenshot&apos;s header
            contradicts its bubbles, one of the two was borrowed from another app.
          </p>
          <p>
            Finally, remember that measurement has limits: an eyedropper on a downloaded image
            returns the compressed, colour-managed version, which drifts from the value the app
            actually uses. So treat the table as the reference and a screenshot as evidence
            about <em>relationships</em>, not exact numbers. For the full reader&apos;s
            checklist, including non-colour tells, see{" "}
            <Link href="/how-to-spot-a-fake-screenshot">the spotting guide</Link>; for what a
            file can and cannot prove about its own origin, see{" "}
            <Link href="/screenshot-metadata-and-authenticity">the metadata piece</Link>.
          </p>

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

        <div className="mt-12 border-t border-black/10 pt-6">
          <h2 className="text-[16px] font-semibold tracking-tight text-foreground">
            Related guides
          </h2>
          <ul className="mt-3 space-y-2 text-[14.5px]">
            {[
              "how-to-make-a-fake-whatsapp-chat",
              "fake-text-message-on-iphone-and-android",
              "telegram-chat-screenshot-guide"
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

      <SiteFooter trademark={{ name: "WhatsApp", owner: "Meta Platforms, Inc." }} />
    </>
  );
}
