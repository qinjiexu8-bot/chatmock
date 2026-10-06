import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs } from "@/lib/seo";
import { getPost } from "@/lib/blog";

const SLUG = "snapchat-chat-screenshot-guide";
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
            Snapchat is the platform chat-mockup generators get wrong most often, and they get
            it wrong in the same direction every time: too much yellow. The assumption is that
            because Snapchat is the yellow app, a Snapchat chat screenshot should be yellow.
            It is not. The yellow lives in the header bar and on the app&apos;s home screens;
            the conversation itself is white in light mode and black in dark mode. Anyone who
            uses the app sees the difference instantly, even if they could not name it.
          </p>
          <p>
            This guide goes through the details that make a Snapchat conversation read as real,
            using the free <Link href="/snapchat-chat-generator">Snapchat chat generator</Link>.
            The mockup renders in the browser, the PNG is generated on your device, and nothing
            you type is uploaded.
          </p>

          <h2>The colour logic runs backwards from what people assume</h2>
          <p>
            Most chat interfaces put the brand colour where the conversation is: WhatsApp&apos;s
            green bubbles, Messenger&apos;s blue, iMessage&apos;s blue. Snapchat does the
            opposite. Its signature yellow is confined to the header, which sits above the
            chat like a band, and the conversation area below it is a plain surface — white in
            light mode, pure black in dark. The brand colour frames the chat without touching
            it.
          </p>
          <p>
            This is why the &ldquo;all-yellow Snapchat&rdquo; mockup is such a reliable tell.
            It is not a subtle colour error; it is a structural one. The generator reproduces
            the split, so the header is yellow while the message area stays neutral, and that
            single decision removes the most common failure in one stroke.
          </p>

          <h2>The values the real app uses</h2>
          <p>
            These are the values ChatMock bakes into the Snapchat generator, taken from the
            real client. If you are building the screen by hand, begin here instead of working
            from memory.
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
                <td>Header bar</td>
                <td colSpan={2}>
                  <code>#fffc00</code> — yellow, with black text and icons, in both modes
                </td>
              </tr>
              <tr>
                <td>Chat area</td>
                <td>
                  <code>#ffffff</code> — white, <strong>not yellow</strong>
                </td>
                <td>
                  <code>#000000</code>
                </td>
              </tr>
              <tr>
                <td>Outgoing bubble</td>
                <td>
                  Lavender <code>#d9a7f9</code>
                </td>
                <td>
                  Deep purple <code>#5b3a8e</code>
                </td>
              </tr>
              <tr>
                <td>Incoming bubble</td>
                <td>
                  <code>#f0f0f0</code>
                </td>
                <td>
                  <code>#262626</code>
                </td>
              </tr>
              <tr>
                <td>Delivered label</td>
                <td colSpan={2}>Small grey text under outgoing messages</td>
              </tr>
              <tr>
                <td>Timestamps</td>
                <td colSpan={2}>Never inside bubbles</td>
              </tr>
            </tbody>
          </table>
          <p>
            Notice what is missing from the outgoing column: yellow. The bubble you send is
            lavender in light mode and a deep purple in dark mode — not yellow, not blue, not
            grey. Generators that reach for the brand colour here produce something that looks
            like Snapchat from a distance and wrong up close. The header is the only place
            <code>#fffc00</code> belongs on this screen.
          </p>

          <h2>The Delivered label</h2>
          <p>
            Snapchat does not use a tick system. There are no grey or blue ticks anywhere in
            the conversation. Instead, outgoing messages carry a small grey{" "}
            <code>Delivered</code> label — a text confirmation, the same idea as the
            &ldquo;Read&rdquo; line in Google Messages, but with its own wording and its own
            placement. It sits under the outgoing messages as plain grey text, and it is one of
            the details most generators simply omit.
          </p>
          <p>
            The label is editable. It defaults to <code>Delivered</code>, and you can clear it
            entirely or replace it if your scene needs a different state — a sent-but-not-
            arrived message, for instance. Because the real app shows the label rather
            generously on outgoing messages, keeping it visible is usually the more authentic
            choice; removing it everywhere makes the thread look unusually empty on the right
            side.
          </p>
          <p>
            The absence of ticks has a knock-on effect worth noting: any Snapchat mockup with
            blue double-checks is borrowing a WhatsApp or iMessage convention, and it will read
            as wrong to anyone who uses the app, even if they cannot say why.
          </p>

          <h2>Avatars hang beside every incoming message</h2>
          <p>
            This is a small structural detail that separates Snapchat from most other
            interfaces loaded into the same generators. In WhatsApp, an avatar appears once per
            message group. In Snapchat&apos;s chat view, a small avatar sits beside{" "}
            <em>each</em> incoming message, not just the last one in a run. When you see the
            real screen, that repeated avatar on the left is part of the visual rhythm.
          </p>
          <p>
            Reproducing it matters because dropping it — showing the avatar only on the group
            end, as you would for WhatsApp — makes the left column feel sparse and shifts the
            whole balance of the layout. If no photo is uploaded, the generator draws a yellow
            initial circle in the spirit of the Bitmoji placeholder; a real contact photo is
            obviously better where you have one.
          </p>
          <p>
            There is a subtler consequence worth knowing. With an avatar eating into the left
            margin, incoming bubbles have less horizontal room than outgoing ones, so the same
            sentence wraps at a different point depending on which side it sits on. The
            generator caps bubbles at roughly 72% of the chat width and lets the avatar consume
            part of that column. If you paste one long paragraph into both sides and the two
            bubbles wrap identically, the avatar probably is not being accounted for — a small
            detail, but one that only appears in screenshots built from the wrong template.
          </p>

          <h2>The build, move by move</h2>
          <ol>
            <li>
              <strong>Set the name and avatar.</strong> Type the name into{" "}
              <em>Contact → Name</em> — it renders in the yellow header — and upload an avatar,
              or let the generator draw the yellow initial circle.
            </li>
            <li>
              <strong>Compose the burst.</strong> Snapchat threads are fast and fragmentary: a
              couple of words per row, then a longer line. Keep incoming rows short so the small
              avatar beside them does not crowd the text.
            </li>
            <li>
              <strong>Leave the Delivered label in place.</strong> It defaults to{" "}
              <code>Delivered</code> under your outgoing messages. Only clear it if the scene
              specifically needs an unsent message.
            </li>
            <li>
              <strong>Choose the mode.</strong> Light is the everyday look; dark is common for
              late-night and storytime scenes. Both match the real app, and both keep the
              yellow header.
            </li>
            <li>
              <strong>Export.</strong> 1x is 390px wide, 2x is 780px, 3x is 1170px. For posts
              and thumbnails, 2x is the usual balance of sharpness and file size.
            </li>
          </ol>

          <h2>The tells that give a fake Snapchat screenshot away</h2>
          <ul>
            <li>
              An all-yellow screen. The chat area is white in light mode and black in dark; only
              the header is <code>#fffc00</code>.
            </li>
            <li>
              A yellow, blue or grey outgoing bubble. It is lavender in light mode and deep
              purple in dark.
            </li>
            <li>A missing Delivered label on outgoing messages.</li>
            <li>
              Read receipts or ticks. Snapchat uses neither; the Delivered label is the only
              confirmation.
            </li>
            <li>
              An avatar only at the end of a sender&apos;s group, instead of beside every
              incoming message.
            </li>
            <li>Timestamps inside bubbles.</li>
            <li>
              A white or grey header. The header is the one place the brand yellow lives, and a
              neutral header makes the whole screen read as a generic messenger.
            </li>
          </ul>

          <h2>Trade-offs: chat screens versus stories</h2>
          <p>
            Snapchat shows up in two distinct shapes in creative work, and they need different
            mockups. Story frames are full-screen, vertical, often photographed, and dominated
            by the camera layer. The chat screen — the one this guide covers — is a list of
            messages with a yellow header, and it is what storytime videos and safety tutorials
            actually use when they need to show &ldquo;here is what the message said&rdquo;.
          </p>
          <p>
            The temptation is to build the chat screen as if it were a story frame: full-bleed
            colour, heavy overlays, a caption running across the middle. Resist it. A chat
            screenshot and a story frame are different objects, and a chat screen with story
            styling looks like neither. Keep the chat view clean and let the header carry the
            brand.
          </p>
          <p>
            A second trade-off is the phone frame. It is off by default, and it should usually
            stay off: a real screenshot is a rectangle of screen, not a picture of a phone. The
            frame is for thumbnail and slide compositions where you want the device silhouette
            for context. And a third choice — light or dark — should follow the surrounding
            design rather than habit. Both palettes are correct; the wrong one is whichever
            clashes with the page or video around it.
          </p>
          <p>
            If you are mocking up a different ephemeral-feeling interface, the{" "}
            <Link href="/instagram-dm-generator">Instagram DM generator</Link> covers Meta&apos;s
            gradient bubbles with a similarly visual, image-forward feel. And to compare the
            underlying hex values across platforms, the{" "}
            <Link href="/blog/messaging-app-ui-colour-reference">
              messaging app colour reference
            </Link>{" "}
            puts Snapchat&apos;s yellow-and-lavender pairing next to everyone else&apos;s.
          </p>

          <h2>Why we keep the boundary visible</h2>
          <p>
            Snapchat conversations appear constantly in teen-drama sketches, storytime videos
            and social-safety teaching material, and the platform&apos;s ephemerality is
            exactly why: &ldquo;here is what the message said&rdquo; is the natural visual
            device when the message supposedly disappeared. That is legitimate creative and
            educational use. Presenting the same fabricated conversation as real evidence of
            what a person said is not, and the boundary is intent rather than appearance. The{" "}
            <Link href="/acceptable-use">Acceptable Use Policy</Link> sets it out, and there
            are no templates here for fake bank, government, medical or legal notices. The{" "}
            <Link href="/examples/snapchat-chat-generator">Snapchat examples gallery</Link>{" "}
            renders complete scenes live if you want to study the header, bubble and Delivered
            details before building your own.
          </p>
        </article>

        <div className="mt-12 border-t border-black/10 pt-6">
          <h2 className="text-[16px] font-semibold tracking-tight text-foreground">
            Related guides
          </h2>
          <ul className="mt-3 space-y-2 text-[14.5px]">
            {["instagram-dm-screenshot-guide", "how-to-spot-a-fake-screenshot"].map((rslug) => {
              const rel = getPost(rslug)!;
              return (
                <li key={rslug}>
                  <Link
                    href={`/blog/${rslug}`}
                    className="text-primary hover:underline underline-offset-2"
                  >
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

      <SiteFooter trademark={{ name: "Snapchat", owner: "Snap Inc." }} />
    </>
  );
}
