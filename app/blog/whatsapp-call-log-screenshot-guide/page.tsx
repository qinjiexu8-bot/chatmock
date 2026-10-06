import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs } from "@/lib/seo";
import { getPost } from "@/lib/blog";
import { whatsappTheme } from "@/lib/themes";

const SLUG = "whatsapp-call-log-screenshot-guide";
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
            Most people building a WhatsApp mockup open a chat generator and never leave it,
            because the conversation is the natural place to stage a story. But a whole class
            of scenes does not live in the chat at all — it lives in the Calls tab. Who called
            whom, how many times, how long they spoke, and who was ignored. That information
            sits in a list, and the list has its own grammar, which is why call-log mockups so
            often look wrong even when every colour is borrowed correctly from the chat view.
          </p>
          <p>
            This guide covers the WhatsApp Calls screen and how to build one that reads as
            real, using the free <Link href="/whatsapp-call-generator">WhatsApp call log
            generator</Link>. It renders locally, exports a high-resolution PNG, and uploads
            nothing.
          </p>

          <h2>A call log is a list, not a conversation</h2>
          <p>
            The Calls tab shares WhatsApp&apos;s colour system with the chat view, which is the
            trap. Because the greens match, it is easy to assume the layout matches too, and to
            render the screen as a stack of bubbles with a phone icon bolted on. That is the
            single most common mistake. A call log has no bubbles, no left and right sides, and
            no message text at all. It is a vertical list of rows, and each row is a small
            block of information arranged in columns.
          </p>
          <p>
            In the real app each row carries a 46px avatar on the left, a bold caller name, a
            second line with the call direction and the time, and a green phone icon on the
            right. That right-side icon is a small but reliable marker: it is present on every
            row, and its absence is one of the first things a regular user notices.
          </p>

          <h2>Reading the arrows</h2>
          <p>
            The direction arrows are the heart of the screen, and they follow a strict colour
            and angle grammar. Real users read them without thinking, which is exactly why a
            log that gets them wrong feels off before you can articulate why.
          </p>
          <table>
            <thead>
              <tr>
                <th>Element</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Outgoing call</td>
                <td>Green arrow pointing up and to the right</td>
              </tr>
              <tr>
                <td>Incoming call</td>
                <td>Green arrow pointing down and to the left</td>
              </tr>
              <tr>
                <td>Missed call</td>
                <td>
                  Red arrow pointing down and to the left (<code>#ea4335</code>)
                </td>
              </tr>
              <tr>
                <td>Missed caller name</td>
                <td>
                  Renders in the same red as the arrow, exactly like the real app
                </td>
              </tr>
              <tr>
                <td>Row layout</td>
                <td>
                  46px avatar, bold name, direction and time on the second line, green phone
                  icon on the right
                </td>
              </tr>
              <tr>
                <td>Bottom tab bar</td>
                <td>
                  Status / Calls / Chats / Communities / Settings, Calls highlighted in green
                  (<code>#00a884</code>)
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            The important consequence of the missed-call rule is that red does double duty. A
            missed call turns both the arrow and the caller&apos;s name red. Generators that
            recolour only the arrow, or that leave the name black, produce a row that is close
            but not right — and because missed calls are usually the emotional centre of a
            scene, that is the row you least want to get wrong.
          </p>

          <h2>The five-tab bottom bar</h2>
          <p>
            Every genuine screenshot of the Calls screen includes the bottom navigation bar,
            because it is part of the screen. It has five tabs — Status, Calls, Chats,
            Communities and Settings — and Calls is highlighted in green, matching the accent.
            Three of those names are worth memorising if you are rebuilding the screen by hand,
            because moving or renaming them is a giveaway: the order is fixed and the labels are
            short.
          </p>
          <p>
            This is where a lot of otherwise-decent mockups fall down. A generator that cannot
            render the bar leaves it out, and the resulting screenshot looks cropped rather than
            authentic. The eye reads the missing bar as an unfinished screen, even when it is
            only a sliver at the bottom. If your composition genuinely needs the crop, take it
            deliberately and consistently — do not simply omit the bar and hope.
          </p>

          <h2>Durations, and how a log looks lived-in</h2>
          <p>
            Each row can carry an optional duration note — <code>12 min</code>, for example —
            rendered as small grey text under the direction line. The real app shows durations
            for completed calls, and mixing them is what makes a log feel used rather than
            generated. A column where every completed call happens to last exactly the same
            number of minutes is one of the quieter tells, because real call lengths are
            irregular.
          </p>
          <p>
            The same instinct applies to the overall shape of the log. Real usage is messy:
            a couple of calls to one person, a long gap, a missed call at an odd hour, a video
            call that nobody picked up. Three to six entries is the range where a call log
            looks naturally populated; beyond that you are committing to getting many more
            rows consistent. Direction should vary, and at least one entry should be missed —
            a log where every call went through reads as staged.
          </p>

          <h2>Building it step by step</h2>
          <ol>
            <li>
              <strong>Keep the header as Calls.</strong> The page ships with the header
              pre-filled as <code>Calls</code>, which is what the real tab is called. Leave it
              unless your scene genuinely needs something else.
            </li>
            <li>
              <strong>Add the callers.</strong> Each participant in the editor is one caller,
              with a name and an avatar. Three to six entries is the believable range.
            </li>
            <li>
              <strong>Set each call.</strong> Give every row a caller, a direction — Outgoing,
              Incoming or Missed — and a time. Add optional duration notes such as{" "}
              <code>12 min</code> for completed calls, and use the Video toggle for camera
              entries, which render with a camera icon and a &ldquo;video call&rdquo; label.
            </li>
            <li>
              <strong>Vary the directions.</strong> Mix incoming and outgoing, and include one
              or two missed calls so the arrow grammar is doing its job.
            </li>
            <li>
              <strong>Export.</strong> Choose 1x, 2x or 3x and download the PNG. The phone
              frame is on by default on this page; untick it if you are compositing the
              screenshot into a larger design.
            </li>
          </ol>

          <h2>The tells that give a fake call log away</h2>
          <ul>
            <li>Call rows drawn as chat bubbles with a phone icon attached.</li>
            <li>Missing bottom tab bar — the cropped-screen look.</li>
            <li>Every call pointing the same direction, or no missed calls at all.</li>
            <li>
              A missed call whose arrow is red but whose caller name stayed black, instead of
              both turning red.
            </li>
            <li>Identical durations on every completed call.</li>
            <li>No green phone icon on the right of each row.</li>
            <li>
              A header that says something other than <code>Calls</code>, or a Calls tab that is
              not highlighted in the bottom bar.
            </li>
          </ul>

          <h2>Trade-offs: missed calls, video entries and the frame</h2>
          <p>
            Missed calls are the most expressive element on the screen and the easiest to
            overuse. One or two make a log feel human; a column of five red arrows turns the
            scene into something that reads as a plot device rather than a phone. If the story
            is &ldquo;they called me and I did not answer&rdquo;, a single missed call at an
            awkward hour carries more weight than a wall of them.
          </p>
          <p>
            Video entries are a smaller trade-off. The camera icon and the &ldquo;video
            call&rdquo; label are accurate, but they draw attention, so use them where the
            medium matters to the scene. And the phone frame is a composition choice rather
            than a realism one: a genuine screenshot is a rectangle of screen with no phone
            around it, so leave the frame off when the mockup stands alone and turn it on only
            when the device silhouette helps a thumbnail or slide.
          </p>
          <p>
            One more practical note: this screen only makes sense as itself. If you drift back
            into message-style layout, you are building the chat view, and the{" "}
            <Link href="/whatsapp-chat-generator">WhatsApp chat generator</Link> is the right
            tool for that, with its own bubble and tick grammar. The two screens share colours
            but nothing else, and mixing them — a phone icon inside a bubble, a duration inside
            a chat row — is what produces a screenshot that looks like WhatsApp and behaves
            like nothing.
          </p>

          <h2>Consent, context and the call log</h2>
          <p>
            A call log is a useful prop for storytelling where the evidence is who contacted
            whom and when: a missing-person scene, a &ldquo;they would not stop calling&rdquo;
            beat, an HR or safeguarding training module, a comedy sketch about dodging calls.
            All of that is legitimate creative and educational use, and the information density
            of a call log is exactly what makes it useful on screen. Fabricating a call log to
            deceive someone, harass a person or produce false evidence is a different matter
            entirely, and no amount of interface accuracy changes that. Our{" "}
            <Link href="/acceptable-use">Acceptable Use Policy</Link> draws the line, and we
            keep no templates for fake bank, government, medical or legal notices. If you want
            to study the arrow grammar on complete scenes first, the{" "}
            <Link href="/examples/whatsapp-call-generator">call log examples gallery</Link>{" "}
            renders them live.
          </p>
        </article>

        <div className="mt-12 border-t border-black/10 pt-6">
          <h2 className="text-[16px] font-semibold tracking-tight text-foreground">
            Related guides
          </h2>
          <ul className="mt-3 space-y-2 text-[14.5px]">
            {["how-to-make-a-fake-whatsapp-chat", "screenshot-metadata-and-authenticity"].map(
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

      <SiteFooter trademark={whatsappTheme.trademark} />
    </>
  );
}
