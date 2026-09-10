import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs } from "@/lib/seo";
import { getPost } from "@/lib/blog";

const SLUG = "chat-screenshots-in-video-storytelling";
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
        <p className="text-[13px] text-black/40">
          {post.date} · {post.readMinutes} min read
        </p>
        <h1 className="font-display mt-2 text-[32px] sm:text-[38px] font-semibold tracking-tight leading-[1.15] text-foreground">
          {post.title}
        </h1>

        <article className="prose-cm mt-8">
          <p>
            Scroll through any storytime corner of YouTube, TikTok or Instagram Reels and you
            will find them: screenshots of text conversations doing the narrative heavy lifting.
            The ex who texted back after three years. The scammer who got strung along for a
            week. The boss who sent the message at 2 a.m. Chat screenshots have become one of
            the most efficient storytelling devices in short-form video, because they import an
            entire relationship into a single frame.
          </p>
          <p>
            This guide is for creators who use them well: what makes a staged conversation
            watchable, how to shoot and reveal it so the audience stays immersed, and where the
            ethical line sits. The{" "}
            <Link href="/whatsapp-chat-generator">WhatsApp generator</Link>,{" "}
            <Link href="/fake-text-message-generator">text message generator</Link> and other
            ChatMock tools are built exactly for this kind of staged storytelling — and the{" "}
            <Link href="/examples">examples gallery</Link> shows finished scenes from DM
            outreach to group threads if you need a starting structure.
          </p>

          <h2>Why chat screenshots work on screen</h2>
          <p>
            Three properties make them uniquely efficient props. First, they are{" "}
            <strong>readable at a glance</strong> — a viewer processes a screenshot of a
            conversation faster than a voiceover describing the same exchange. Second, they are{" "}
            <strong>intimate</strong>: we are wired to treat other people&apos;s messages as
            privileged information, so a screenshot triggers curiosity that a scripted scene
            does not. Third, they are <strong>verifiable-feeling</strong> — text on a familiar
            interface feels like evidence, even when everyone watching knows it is staged. That
            last property is powerful and double-edged, and we will come back to it.
          </p>

          <h2>Staging: write the conversation like a scene, not a transcript</h2>
          <p>
            The best staged chats are written like screenplays. Each message is a beat; the
            reveal lands in the last bubble, because that is where the eye stops. Practical
            rules that separate convincing staging from obvious fabrication:
          </p>
          <ul>
            <li>
              <strong>Keep it short.</strong> Four to eight messages tell a complete beat.
              Twenty-message walls cannot be read on a phone screen anyway — viewers pause, skim
              and scroll on.
            </li>
            <li>
              <strong>Let the rhythm be uneven.</strong> Real chats have double texts, delayed
              replies and one-word answers. Perfect turn-taking is the loudest tell of a fake.
            </li>
            <li>
              <strong>Use interface details as drama.</strong> A &ldquo;Delivered&rdquo; line
              with no reply says being ignored. A read tick that changes to blue says being
              seen and dismissed. Timestamps can carry a three-hour silence without a word of
              dialogue.
            </li>
            <li>
              <strong>Blur what does not matter.</strong> In the edit, a slight zoom and a
              blurred contact name create mystery and protect you from implying a real person.
            </li>
          </ul>

          <h2>Shooting the reveal</h2>
          <p>
            How the screenshot enters the frame matters as much as its content. The three
            standard techniques, in rising order of production effort:
          </p>
          <ol>
            <li>
              <strong>Static insert.</strong> The screenshot fills the frame for two to four
              seconds with a voiceover reading the messages aloud. Works everywhere; the
              voiceover controls pacing.
            </li>
            <li>
              <strong>Simulated scroll.</strong> The screenshot slowly scrolls through the
              conversation. Creates the feeling of snooping through someone&apos;s phone — use
              sparingly, as it raises the &ldquo;am I allowed to see this?&rdquo; tension.
            </li>
            <li>
              <strong>Phone in hand.</strong> A real hand holds a phone showing the
              conversation. Highest immersion, and the reason ChatMock offers an optional phone
              frame with an accurate status bar — the frame sells the physicality.
            </li>
          </ol>
          <p>
            Export at 2x for video use (780px wide is plenty for a full-screen insert on any
            vertical video), and keep the phone frame off (it is off by default) when you composite the screen
            into your own device mockup.
          </p>

          <h2>Disclosure: the line that keeps the format alive</h2>
          <p>
            Here is the uncomfortable part. The same properties that make chat screenshots
            effective props make them effective misinformation. A staged conversation presented
            as a real event — &ldquo;my mum texted me this, I&apos;m shaking&rdquo; — is
            indistinguishable from a fabricated one, and audiences have learned to be sceptical.
            The creators who last are the ones whose audience is in on the device: the
            conversation is clearly a dramatisation, labelled in the caption or the voiceover,
            used to tell a story rather than to manufacture a fact.
          </p>
          <p>
            The practical test we apply to our own tools: if the content requires the viewer to
            believe the screenshot is genuine evidence to land its effect, it has crossed the
            line. Skits, parodies, design presentations and teaching material all pass. Fake
            receipts, fake evidence for disputes, impersonation of real people — that is
            fabrication, and it is why{" "}
            <Link href="/acceptable-use">ChatMock&apos;s Acceptable Use Policy</Link> exists and
            why we refuse to build templates for fake bank alerts or government notices. The
            storytime format only works while audiences can trust creators to flag what is
            staged. Protect that, and the format keeps working for you.
          </p>

          <h2>A pre-publish checklist</h2>
          <ul>
            <li>Is the staging labelled (caption, voiceover or context) as a dramatisation?</li>
            <li>Does the conversation tell one clear beat, readably, in under eight bubbles?</li>
            <li>Are the interface details right — bubble colours, ticks, timestamps, widths?</li>
            <li>Could any message be read as impersonating a real, identifiable person?</li>
            <li>Does the reveal land in the last bubble, where the eye stops?</li>
          </ul>
          <p>
            Five yeses means the screenshot is doing its job: a prop the audience enjoys, in on
            the joke, and none the worse for it.
          </p>
        </article>

        <div className="mt-12 border-t border-black/10 pt-6">
          <h2 className="text-[16px] font-semibold tracking-tight text-foreground">
            Related guides
          </h2>
          <ul className="mt-3 space-y-2 text-[14.5px]">
            {[
              "how-to-make-a-fake-whatsapp-chat",
              "why-we-refuse-fake-bank-alerts"
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

      <SiteFooter />
    </>
  );
}
