import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs } from "@/lib/seo";
import { getPost } from "@/lib/blog";

const SLUG = "android-sms-screenshot-guide";
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
            Most text-message mockups on the internet are iPhone mockups. Search for any guide
            and you will find iMessage blue, a rounded iPhone header, a centred clock — and it
            is genuinely a problem, because the majority of phones in the world run Android.
            A convincing Android screenshot is not an iPhone screenshot recoloured. Google
            Messages has its own Material Design language, its own status bar, its own way of
            confirming that a message was read, and its own bubble geometry. Borrow any of the
            iPhone conventions and the result looks like an Android phone pretending to be an
            iPhone, which is a very specific kind of wrong.
          </p>
          <p>
            This guide covers how to build a Google Messages screenshot that holds up, using
            the free <Link href="/android-sms-generator">Android SMS generator</Link>. It runs
            entirely in the browser and exports a high-resolution PNG.
          </p>

          <h2>Android is not a recoloured iPhone</h2>
          <p>
            The instinct when building an Android mockup is to take everything you know about
            iMessage and swap blue for blue. That gets you a screenshot with the right general
            feel and half a dozen small errors, and the errors are the ones Android users spot
            first. The two interfaces differ at every level: bubble radius, bubble grouping,
            read confirmation, status bar, and header structure.
          </p>
          <p>
            Google Messages is Material Design, and Material has a recognisable softness — large
            corner radii, generous padding, a clean rectangular surface. iMessage is tighter,
            tail-driven and more compact. Once you internalise that the two come from different
            design traditions, the individual differences stop feeling arbitrary and start
            looking like a system you can follow.
          </p>

          <h2>The values the real app uses</h2>
          <p>
            These are the values the generator bakes in, taken from the real client. If you are
            rebuilding the interface by hand, start here.
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
                <td colSpan={2}>
                  <code>#1a73e8</code> — Google blue, white text, in both modes
                </td>
              </tr>
              <tr>
                <td>Incoming bubble</td>
                <td>
                  <code>#f1f3f4</code>
                </td>
                <td>
                  <code>#303134</code>
                </td>
              </tr>
              <tr>
                <td>Bubble shape</td>
                <td colSpan={2}>
                  20px capsules; the last bubble in a run narrows to 6px on the sender&apos;s
                  side
                </td>
              </tr>
              <tr>
                <td>Read confirmation</td>
                <td colSpan={2}>
                  Small grey <em>Read</em> under the last outgoing message
                </td>
              </tr>
              <tr>
                <td>Status bar</td>
                <td colSpan={2}>
                  Android style: clock on the left, signal and battery on the right, no camera
                  cutout
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            Two numbers here are worth committing to memory because they are the most frequently
            botched. The outgoing blue is <code>#1a73e8</code> — noticeably deeper and cooler
            than iMessage&apos;s lighter blue — and it does not change between light and dark
            mode. The bubble radius is 20px, larger than iMessage&apos;s, which is what gives
            the Material bubbles their soft capsule look.
          </p>

          <h2>Read is text, not ticks</h2>
          <p>
            This is the detail that trips up the most Android mockups. Google Messages does not
            use a tick system. There are no grey ticks, no double ticks, no blue ticks anywhere
            on the screen. Under RCS, the app confirms delivery with a small grey{" "}
            <code>Read</code> label beneath the last outgoing message — plain text, not a
            symbol.
          </p>
          <p>
            A mockup with blue double-checks is borrowing WhatsApp or iMessage, and it is wrong
            for Android in a way that any daily user registers immediately. The label is
            editable in the generator: write <code>Read</code> with a time, keep it as just{" "}
            <code>Delivered</code>, or clear it for a message that has not been seen yet. As
            with Messenger&apos;s Seen line, leaving it off is a scene decision — it means the
            recipient has not read the message, which is a specific and useful state.
          </p>

          <h2>The status bar tells</h2>
          <p>
            There is a clean structural difference between the two mobile worlds that shows up
            in every screenshot: the status bar. On Android it is a plain rectangle with the
            clock on the left and the signal and battery icons on the right. There is no camera
            cutout, no notch, no dynamic island — because a real screenshot captures the
            display, not the hardware hole punched into it.
          </p>
          <p>
            The generator renders the Android layout by default: clock left, icons right, no
            cutout. That last point is a common failure in hand-built mockups, where a designer
            copies an iPhone silhouette and leaves a notch visible in an Android screenshot. It
            is a small detail that immediately signals the screen was assembled from the wrong
            template.
          </p>
          <p>
            The related decision is the phone frame. It is off by default on this page, and
            that default is correct: an Android interface inside an iPhone shell looks wrong,
            and a real screenshot never includes the phone body in the first place. Turn the
            frame on only when you specifically want a device-mockup look for a thumbnail or
            slide, and if you do, make sure the shell is Android-shaped.
          </p>

          <h2>From an empty editor to a finished screenshot</h2>
          <ol>
            <li>
              <strong>Choose the contact.</strong> Type a name into <em>Contact → Name</em> and
              upload an avatar. Without one, the generator draws a blue initial circle, the way
              Google Messages renders contacts without photos.
            </li>
            <li>
              <strong>Type the thread.</strong> Android messaging reads as short bursts, so keep
              most rows to a line or two and let the reply land in the final bubble. Any row can
              carry an image, and it renders as a rounded media bubble above the caption text.
            </li>
            <li>
              <strong>Set the Read label.</strong> Under <em>Contact → Delivery</em> the label
              defaults to <code>Read</code>, shown under your last outgoing message the way RCS
              confirms it. Clear it for a message that has not been seen.
            </li>
            <li>
              <strong>Group your runs.</strong> Let two or three messages come from the same
              sender before the reply. The generator tightens the connecting corners to 6px
              automatically, but it needs runs to work with.
            </li>
            <li>
              <strong>Export.</strong> Pick 1x, 2x or 3x and download the PNG. The phone frame
              starts off — an Android interface in an iPhone shell would look wrong — but you
              can enable it if your composition needs one.
            </li>
          </ol>

          <h2>The tells that give a fake Google Messages screenshot away</h2>
          <ul>
            <li>
              Blue double-check ticks. Google Messages confirms with a text <code>Read</code>{" "}
              label, never a tick.
            </li>
            <li>
              An iPhone status bar: a centred or right-aligned clock, a notch, or a camera
              cutout. Android puts the clock on the left with no cutout.
            </li>
            <li>
              iMessage&apos;s lighter blue instead of Google blue <code>#1a73e8</code>.
            </li>
            <li>
              18px bubbles. Material capsules are 20px, with the sender-side corner narrowing
              to 6px at the end of a run.
            </li>
            <li>
              A <code>Delivered</code> label standing in for <code>Read</code> on an RCS-style
              thread.
            </li>
            <li>Bubble tails, and a phone frame shaped like an iPhone.</li>
            <li>
              A grey or coloured header bar. The Google Messages header is a clean surface with
              the contact name and a letter avatar.
            </li>
          </ul>

          <h2>Trade-offs: Samsung Messages, RCS versus SMS, and the frame</h2>
          <p>
            The first trade-off is which Android app you are imitating. Google Messages is the
            stock SMS and RCS app on most Android phones, and it is what this generator
            reproduces. Samsung&apos;s own Messages app is a different layout with different
            geometry, and it is not covered here — so if your scene is set on a Samsung device,
            be aware the screen you build is Google&apos;s, not Samsung&apos;s. Mixing the two
            is a small but real inconsistency.
          </p>
          <p>
            The second trade-off is RCS versus SMS. The <code>Read</code> label belongs to RCS,
            the richer messaging standard where delivery and read states are real. Pure SMS does
            not reliably return that information, so a plain SMS thread showing{" "}
            <code>Read</code> is slightly optimistic — though it reads as believable to most
            audiences, and if your scene needs the read state, RCS is the honest framing.
          </p>
          <p>
            The third is the phone frame, already covered above: off by default, worth turning on
            only for composed layouts, and never an iPhone shell around an Android screen.
            Getting the frame wrong undoes an otherwise accurate mockup, because the shell is the
            first thing the eye sees.
          </p>
          <p>
            If your scene is set on an iPhone instead, the{" "}
            <Link href="/fake-text-message-generator">iPhone text message generator</Link> covers
            iMessage with its own bubble geometry and Delivered line. The two interfaces are not
            interchangeable, and the{" "}
            <Link href="/blog/fake-text-message-on-iphone-and-android">
              comparison of text messaging on iPhone and Android
            </Link>{" "}
            walks through the differences side by side.
          </p>

          <h2>Staying on the right side of the line</h2>
          <p>
            SMS screenshots show up in stories where the delivery channel is the point: a text
            that lands at the worst possible moment, a one-time code, a message from an unknown
            number. Tutorials and security-awareness material use them constantly, because SMS
            is the one interface every phone owner recognises regardless of platform, and with
            Android holding the majority of global phone share, an iOS-only mockup collection
            misses much of the audience. All of that is legitimate creative and educational
            work. Fabricating a message to deceive someone, harass a person, impersonate a
            company or institution, or create false evidence is not, and the message channel
            makes no difference to that. The{" "}
            <Link href="/acceptable-use">Acceptable Use Policy</Link> has the full boundary, and
            there are no templates here for fake bank, government, medical or legal notices. To
            see finished Android scenes before you build your own, the{" "}
            <Link href="/examples/android-sms-generator">Android examples gallery</Link> renders
            them live.
          </p>
        </article>

        <div className="mt-12 border-t border-black/10 pt-6">
          <h2 className="text-[16px] font-semibold tracking-tight text-foreground">
            Related guides
          </h2>
          <ul className="mt-3 space-y-2 text-[14.5px]">
            {["fake-text-message-on-iphone-and-android", "how-to-spot-a-fake-screenshot"].map(
              (rslug) => {
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
              }
            )}
          </ul>
        </div>

        <p className="mt-10 text-[14px]">
          <Link href="/blog" className="text-primary underline underline-offset-2">
            ← Back to the blog
          </Link>
        </p>
      </main>

      <SiteFooter trademark={{ name: "Google Messages", owner: "Google LLC" }} />
    </>
  );
}
