import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs } from "@/lib/seo";
import { getPost } from "@/lib/blog";

const SLUG = "fake-text-message-on-iphone-and-android";
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
            &ldquo;Make a fake text message&rdquo; means two completely different things
            depending on which side of the platform divide your audience is on. On iPhone, a
            text lives in iMessage: blue bubbles, no timestamps inside the bubbles, a small
            &ldquo;Delivered&rdquo; line underneath. On Android, it lives in Google Messages:
            Material-flavoured blue, timestamped bubbles, a different header entirely. Audiences
            notice instantly when the two are mixed, because both interfaces are among the most
            viewed screens in the world.
          </p>
          <p>
            This guide covers both, using the free{" "}
            <Link href="/fake-text-message-generator">text message generator</Link> and the{" "}
            <Link href="/android-sms-generator">Android SMS generator</Link> — no signup, no
            watermark, everything rendered locally in your browser.
          </p>

          <h2>iPhone: the rules of an iMessage mockup</h2>
          <p>
            iMessage is deceptively minimal, which is exactly why errors stand out. Get these
            four details right and the screenshot passes a casual glance every time:
          </p>
          <ul>
            <li>
              <strong>Bubble colour:</strong> outgoing is the Apple blue, incoming is light grey.
              Never use WhatsApp green or a saturated default web blue — the Apple blue is
              softer than most people remember.
            </li>
            <li>
              <strong>No timestamps inside bubbles.</strong> Times appear as small centred
              dividers between groups of messages, not per-bubble.
            </li>
            <li>
              <strong>The delivery line.</strong> Under the last outgoing message sits a tiny
              grey &ldquo;Delivered&rdquo; label. It is one of the most-looked-at details in the
              whole screenshot — including it, with the right wording and weight, does more for
              realism than any other single element.
            </li>
            <li>
              <strong>Bubble shape and width.</strong> Fully rounded ends, and a width cap
              around three-quarters of the screen. A bubble that stretches edge to edge reads as
              fake before anyone reads a word.
            </li>
          </ul>

          <h2>Android: the rules of a Google Messages mockup</h2>
          <p>
            The{" "}
            <Link href="/android-sms-generator">Android SMS generator</Link> follows Google
            Messages, which behaves differently from iMessage in ways that are easy to get
            wrong:
          </p>
          <ul>
            <li>
              <strong>Bubbles carry their own timestamps.</strong> Unlike iMessage, the time
              sits inside the bubble next to the text, in a smaller, muted shade.
            </li>
            <li>
              <strong>Header shows the contact with a letter avatar.</strong> Google Messages
              uses a coloured circle with the contact&apos;s initial, not a photo by default.
            </li>
            <li>
              <strong>The blue is different.</strong> Google&apos;s Material blue is closer to a
              classic link blue than Apple&apos;s pastel-leaning bubble. Reusing the iMessage
              blue on an Android frame is a dead giveaway.
            </li>
            <li>
              <strong>Status bar geometry.</strong> Android shows the clock on the left and the
              battery/signal cluster on the right, with a camera hole punch rather than a notch
              — the reason our Android preview turns the phone frame off by default.
            </li>
          </ul>

          <h2>Choosing the right platform for your scene</h2>
          <p>
            Match the device to the character, not to your own phone. A teenager in the US is
            believably on iMessage; a small-business owner in Europe or Asia is more likely on
            WhatsApp or Telegram; an Android flagship user in almost any market is on Google
            Messages or a manufacturer&apos;s SMS app. If your video or slide deck shows an
            iPhone frame around Google Messages colours, the audience will not be able to name
            the error, but they will feel it — and that faint wrongness costs you immersion.
          </p>
          <p>
            A practical trick from storyboard artists: decide the platform first, then let it
            shape the dialogue. iMessage&apos;s &ldquo;Delivered&rdquo; line is a storytelling
            tool — a message marked delivered but never answered says &ldquo;being ignored&rdquo;
            without a single word of dialogue. On Android, the visible in-bubble timestamps let
            you show a three-hour gap between messages as pure visual information.
          </p>

          <h2>Typing rhythm: the part no generator can do for you</h2>
          <p>
            The screenshots that convince are the ones where the conversation has rhythm.
            Real texting is lopsided — one person sends four messages while the other sends one.
            Typos happen and usually stay uncorrected. Punctuation fades in casual chats and
            returns in awkward ones. And the most natural pattern of all is the double text: two
            short messages in a row from the same sender, the second one walking back the first.
            If every exchange in your mockup is a tidy question and a tidy answer, it reads as
            written correspondence, not a conversation.
          </p>

          <h2>Exporting for video and slides</h2>
          <p>
            Both generators export PNG at 1x, 2x and 3x. For video overlays and slide decks, 2x
            is the sweet spot: sharp on a retina screen without bloating file size. For a
            phone-in-hand shot in a video, turn the phone frame on; for a full-screen insert
            where you will add your own motion and shadows, turn it off and export just the
            screen. And as always, everything is generated on your device — no account, no
            upload, no watermark.
          </p>

          <h2>Where the line is</h2>
          <p>
            A staged text conversation used in a skit, a design review or a classroom exercise
            is a legitimate creative device. The same image used to manufacture evidence, to
            impersonate someone, or to deceive a specific person is not, and{" "}
            <Link href="/acceptable-use">our Acceptable Use Policy</Link> draws that line
            explicitly. Make things audiences recognise as staged — the good kind of fake is the
            one nobody is ever tempted to submit as proof.
          </p>
        </article>

        <p className="mt-10 text-[14px]">
          <Link href="/blog" className="text-primary underline underline-offset-2">
            ← Back to the blog
          </Link>
        </p>
      </main>

      <SiteFooter
        trademark={{ name: "iMessage", owner: "Apple Inc." }}
      />
    </>
  );
}
