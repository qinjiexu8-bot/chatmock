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
        <p className="text-[13px] text-black/55">
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

          <h2>Assembling the Telegram screen</h2>
          <ol>
            <li>
              <strong>Set the name and the status line.</strong> Type the name, then a status
              line — <code>last seen recently</code> is the most common in real screenshots and
              safer than <code>online</code>, which implies the person is in the app right
              now.
            </li>
            <li>
              <strong>Write an uneven exchange.</strong> Real threads mix a long paragraph with
              one-word replies; when every bubble is the same length the wallpaper stops looking
              like a backdrop and starts looking like a form. Three to eight rows carries a
              scene.
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

          <h2>How the wallpaper is made: drawn, not pasted</h2>
          <p>
            Every Telegram screenshot carries a doodle wallpaper behind the bubbles, and the
            way that pattern is produced decides how good the export looks. There are two
            approaches: paste a bitmap tile as an image, or draw the pattern in code. A pasted
            tile is quick, but it has a fixed resolution, so at a 3x export it softens, and it
            tends to reveal its own seams where the tile repeats unless the artwork was built
            to wrap cleanly.
          </p>
          <p>
            The Telegram pages here draw the pattern as a vector tile instead, which is what the{" "}
            <Link href="/examples/telegram-chat-generator">Telegram examples</Link> use. A
            code-drawn tile stays crisp at any export scale, because it is re-rendered at the
            target size rather than enlarged, and the same tile can be recoloured for both
            modes instead of shipping two separate images. That last point matters: the light
            wallpaper is a pale grey-blue and the night-mode wallpaper is a deep blue-night
            tone, but the doodle underneath is identical — only the tint changes.
          </p>
          <p>
            The practical effect a viewer sees is that the pattern shows through the gaps
            between bubbles at a consistent faintness, and it never turns into visible stripes
            of a repeated photo. If your mockup&apos;s wallpaper looks like a flat colour in
            one area and a pattern in another, that is the signature of a badly tiled image.
          </p>

          <h2>Day dividers and date pills: where they belong</h2>
          <p>
            Telegram separates two kinds of time information, and mixing them up is a common
            tell. The small time tucked into a bubble is the per-message timestamp. The larger,
            centred, floating chip is the day divider or date pill — the thing that reads
            &ldquo;Yesterday&rdquo; or a date. The pill does not describe a message; it
            describes a gap between groups of messages.
          </p>
          <p>
            That means a pill belongs exactly once at each seam where the conversation resumes
            on a new day, sitting between the last message of the previous day and the first of
            the next. It should never be dropped between two messages sent minutes apart, and
            it should never replace a timestamp inside a bubble. A conversation that stays
            inside a single day does not need a pill at all.
          </p>
          <p>
            Treat the pill as a scene device rather than decoration. One pill near the top tells
            the viewer the thread is older than it looks; a second pill further down, with a
            shorter exchange below it, tells them the conversation resumed after a silence
            without a word of dialogue. Because it floats over the wallpaper rather than
            sitting in a solid bar, it also keeps Telegram&apos;s airy feel — the same reason
            the header is a capsule rather than a welded-on bar.
          </p>

          <h2>Why night mode is steel blue, not a dimmed green</h2>
          <p>
            The single most revealing Telegram detail is what happens to the outgoing bubble in
            dark mode. In light mode it is the signature pale green <code>#eeffde</code>; in
            night mode it abandons green altogether and becomes a steel blue{" "}
            <code>#2b5278</code>, with incoming bubbles a dark slate{" "}
            <code>#182533</code> against a blue-night background <code>#0e1621</code>.
          </p>
          <p>
            People assume night mode is the light theme turned down, so they keep a green
            bubble and just reduce its brightness. That produces a muddy colour that belongs to
            neither theme and reads as wrong immediately. The real night palette is a different
            scheme built around cool blue-greys, and the green simply does not belong in it. The
            read check marks stay green-adjacent (a lighter green than the light theme uses) but
            everything structural moves to blue.
          </p>
          <p>
            The test is quick: put the light and dark versions side by side and ask whether the
            dark one looks like the light one dimmed or like a separate design. For Telegram the
            answer should be the latter. If your dark outgoing bubble is still greenish, you
            have built a dimmed light theme, not night mode — and anyone who uses the app after
            dark will feel it before they can name it.
          </p>

          <h2>What this generator refuses to be</h2>
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

        <div className="mt-12 border-t border-black/10 pt-6">
          <h2 className="text-[16px] font-semibold tracking-tight text-foreground">
            Related guides
          </h2>
          <ul className="mt-3 space-y-2 text-[14.5px]">
            {[
              "messaging-app-ui-colour-reference",
              "how-to-make-a-fake-whatsapp-chat"
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

      <SiteFooter trademark={{ name: "Telegram", owner: "Telegram FZ-LLC" }} />
    </>
  );
}
