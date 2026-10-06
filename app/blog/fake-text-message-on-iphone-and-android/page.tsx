import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs } from "@/lib/seo";
import { getPost } from "@/lib/blog";

const SLUG = "fake-text-message-on-iphone-and-android";
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
              battery/signal cluster on the right, and no camera cutout at all
              — the reason our exports skip the phone frame by default: a real screenshot is captured by the OS and never contains the body of the phone.
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

          <h2>iPhone and Android, item by item</h2>
          <p>
            The two interfaces diverge in a handful of specific places, and once you can see
            them side by side it becomes easy to tell which platform a screenshot was built
            for. Here is the comparison the two generators implement, detail by detail.
          </p>
          <table>
            <thead>
              <tr>
                <th>Detail</th>
                <th>iPhone (iMessage)</th>
                <th>Android (Google Messages)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Header</td>
                <td>
                  Contact name centred under a small round avatar, with a blue video-call icon
                  on the right
                </td>
                <td>
                  A blue letter-avatar circle beside the name, with a subtitle line and phone
                  and video icons
                </td>
              </tr>
              <tr>
                <td>Outgoing colour</td>
                <td>Apple blue, softer and slightly pastel</td>
                <td>
                  Google blue <code>#1a73e8</code>, the same blue in both modes
                </td>
              </tr>
              <tr>
                <td>Bubble radius</td>
                <td>18px, fully rounded capsules</td>
                <td>20px Material capsules</td>
              </tr>
              <tr>
                <td>Last bubble in a run</td>
                <td>A bottom corner tucks in to about 5px, marking the end of a burst</td>
                <td>The sender-side corner squares to about 6px</td>
              </tr>
              <tr>
                <td>Bubble width cap</td>
                <td>About 72% of the column</td>
                <td>About 75% of the column</td>
              </tr>
              <tr>
                <td>Where the time sits</td>
                <td>
                  One centred &ldquo;iMessage&rdquo; and date line at the very top, and nothing
                  inside the bubbles
                </td>
                <td>
                  A centred date marker at the top; a per-message clock varies between Android
                  messaging clients and OS versions, so the safe default is to leave it out
                </td>
              </tr>
              <tr>
                <td>Delivery marker</td>
                <td>A small grey Delivered or Read line under the last outgoing message</td>
                <td>A small grey Read label under the last outgoing message</td>
              </tr>
              <tr>
                <td>Status bar</td>
                <td>iPhone arrangement — and because a real screenshot never captures hardware, no camera cutout appears</td>
                <td>Clock on the left, signal and battery on the right, no camera cutout</td>
              </tr>
            </tbody>
          </table>
          <p>
            Read as a set, the differences are small but they compound. A screenshot with
            iMessage&apos;s pastel blue, an 18px radius and a single top date line is
            unmistakably iPhone; swap in Google blue, a 20px capsule and the Android header
            shape and you are on Google Messages. Mixing the two — Apple&apos;s blue on an
            Android frame, or an Android letter avatar over an iMessage layout — is what makes
            a mockup feel wrong to a viewer who cannot say why.
          </p>

          <h2>RCS versus SMS: what actually changes in a screenshot</h2>
          <p>
            The read receipt is the one place the underlying protocol shows up on screen, and it
            is worth understanding because it decides whether a label is even plausible. Older
            SMS is a plain store-and-forward service: your message reaches the recipient and the
            network reports delivery at best, but there is no signal back to your screen that a
            person opened it. RCS, the newer standard Google Messages uses, can carry read
            receipts — but only when both parties are on capable phones and carriers and the
            feature is enabled, which is why &ldquo;it depends&rdquo; is the honest answer.
          </p>
          <p>
            For a mockup that means a simple rule. If you are staging a plain-SMS scene, ending
            the thread on your own bubble with a Read label invites a close look at something the
            protocol may not support — a Delivered-style marker, or no marker at all, stays
            plausible. If you intend the thread to be an RCS conversation between two modern
            Android phones, the small grey Read label is exactly right, and leaving it off is
            equally valid because read receipts can simply be turned off.
          </p>
          <p>
            The same logic applies to typing indicators and higher-resolution media: they belong
            to the richer protocol, so a screenshot that shows them is implicitly claiming an
            RCS conversation. None of this is visible in most viewers&apos; day-to-day use, which
            is precisely why getting it right marks a mockup as thoughtful rather than
            approximate. For a complete Android scene, the{" "}
            <Link href="/android-sms-generator">Android SMS generator</Link> already renders the
            Read label the RCS way, and the{" "}
            <Link href="/android-sms-screenshot-guide">Android screenshot guide</Link> walks
            through the rest of the frame.
          </p>

          <h2>Use it as a prop, not as proof</h2>
          <p>
            A staged text conversation used in a skit, a design review or a classroom exercise
            is a legitimate creative device. The same image used to manufacture evidence, to
            impersonate someone, or to deceive a specific person is not, and{" "}
            <Link href="/acceptable-use">our Acceptable Use Policy</Link> draws that line
            explicitly. Make things audiences recognise as staged — the good kind of fake is the
            one nobody is ever tempted to submit as proof.
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

      <SiteFooter
        trademark={{ name: "iMessage", owner: "Apple Inc." }}
      />
    </>
  );
}
