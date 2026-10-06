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

          <h2>From blank canvas to exported DM</h2>
          <ol>
            <li>
              <strong>Set the account.</strong> Lowercase usernames read as more real —
              Instagram handles are rarely capitalised. Upload an avatar if the account
              would plausibly have one; otherwise the neutral initial circle appears, same
              as the app.
            </li>
            <li>
              <strong>Keep the exchange short.</strong> Meme-page DMs are short and punchy: a
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

          <h2>Three scenes, three compositions</h2>
          <p>
            The same interface reads completely differently depending on what the conversation
            is doing, so it is worth building the composition around the scene rather than
            around the app. Three shapes cover most Instagram DM content, and each one pulls
            the eye to a different part of the screen.
          </p>
          <p>
            <strong>The creator business DM.</strong> A brand or collaborator opens with a
            short, slightly formal line; the creator replies with something warmer. Here the
            weight sits at the top of the thread, so keep the first incoming bubble the
            longest and let the replies shrink. Leave the thread closed with a Seen line under
            your own last message — an unanswered pitch is one of the most common shapes in
            real inboxes, and it reads as ordinary rather than rude because everyone
            recognises it.
          </p>
          <p>
            <strong>The friends&apos; banter thread.</strong> Casual DMs work in bursts: two
            or three short outgoing bubbles in a row, answered with a single word. The gradient
            bubble makes long text harder to read than a flat one, so real users keep these
            lines short anyway. Because Instagram stacks every bubble as a full capsule with no
            grouping notch, a rapid burst starts to feel like a list — which is exactly why the
            banter shape works best under about six messages.
          </p>
          <p>
            <strong>The brand retraction request.</strong> A partnership falls through and one
            side asks for a post to come down. This scene needs a calm, measured tone and a
            Seen line under the final message from the side being asked. It is a quiet
            composition: no exclamation marks, no stacked bubbles, one clear ask in the last
            outgoing bubble where the eye lands.
          </p>

          <h2>Handling the gradient bubble in dark mode</h2>
          <p>
            Dark mode is where Instagram mockups most often drift, because the instinct is to
            treat the whole screen as a photograph and darken everything. That is not what the
            app does. The conversation background drops to pure black and incoming bubbles
            darken to a deep grey, but the outgoing bubble keeps the identical purple-to-pink
            gradient it wears in light mode — the same violet-to-pink sweep, edge to edge.
          </p>
          <p>
            The reason is that the gradient is a brand mark rather than a theme colour. A theme
            colour is chosen to sit at a comfortable contrast against its background and is
            expected to change when that background changes; a brand mark is meant to stay
            recognisable regardless. So in dark mode the outgoing text stays white, the
            gradient stays put, and only the surfaces around it move. That is also why you
            cannot repair a dark-mode mockup by dimming the gradient — a washed-out purple
            reads as a different app.
          </p>
          <p>
            One practical consequence: against pure black the grey incoming bubbles are a
            subtle step, so a thread that is nothing but incoming messages looks flat. Real
            dark-mode DMs tend to be a mix, and the gradient bubble becomes the brightest
            object on the screen. Build the scene so at least one outgoing message anchors it,
            and let the Seen line sit under that bubble if the beat calls for it.
          </p>

          <h2>Why each tell gives a fake away</h2>
          <p>
            Knowing the tells is only half of it; knowing why they are tells is what lets you
            fix an unfamiliar mistake. Every giveaway below breaks a rule the app follows
            consistently.
          </p>
          <ul>
            <li>
              <strong>Ticks inside bubbles.</strong> Instagram has no per-message receipt
              system to draw from. Read state is communicated once, as a Seen line, so a tick
              anywhere on the screen is borrowed from WhatsApp or Telegram rather than
              Instagram.
            </li>
            <li>
              <strong>Blue or green outgoing bubbles.</strong> Blue is Messenger and green is
              WhatsApp or the iPhone SMS default. Both are Meta products, which is exactly why
              the mistake happens — but a viewer sorts an app by its bubble colour in well
              under a second, and the wrong sibling gets picked.
            </li>
            <li>
              <strong>A timestamp under every bubble.</strong> Instagram groups messages and
              marks time between groups with a small centred stamp; it does not label each
              message. Per-bubble stamps turn a familiar stack into a log.
            </li>
            <li>
              <strong>Tails on bubbles.</strong> Instagram&apos;s capsules are fully rounded
              and tail-less, and they do not narrow at the start or end of a run either. A tail
              implies a bubble geometry inherited from iMessage or WhatsApp.
            </li>
            <li>
              <strong>A presence dot in the header.</strong> The DM header shows the username,
              avatar and call icons, and no &ldquo;active now&rdquo; line. Adding one imports a
              feature the screen simply does not have.
            </li>
          </ul>
          <p>
            The faster route to correctness is to copy the relationships rather than the values
            by eye; our{" "}
            <Link href="/messaging-app-ui-colour-reference">colour reference</Link> lists
            Instagram DM light and dark next to the other apps, and{" "}
            <Link href="/how-to-spot-a-fake-screenshot">the spotting guide</Link> walks through
            the same details from the reader&apos;s side. To see the composition rules applied
            to finished scenes first, the{" "}
            <Link href="/examples/instagram-dm-generator">Instagram DM examples</Link> render
            complete threads you can rebuild in the{" "}
            <Link href="/instagram-dm-generator">generator</Link>.
          </p>

          <h2>Where staging ends and deception begins</h2>
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
