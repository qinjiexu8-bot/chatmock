import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs } from "@/lib/seo";
import { getPost } from "@/lib/blog";

const SLUG = "how-to-spot-a-fake-screenshot";
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
            A screenshot lands in a group chat, a marketplace listing or a dispute, and it
            does one job very well: it ends the discussion. Nobody asks how the file was
            made, because it looks like the app, so it is treated as the app. That reflex is
            what makes chat screenshots the weakest evidence people trust most. Knowing the
            tells takes ten minutes and pays off every time someone waves an image at you as
            proof.
          </p>
          <p>
            What follows is a checklist, not a tutorial. It is built from the layout rules
            real messaging apps follow — the same rules a careful mockup has to obey to pass
            inspection, and the same ones a sloppy fake breaks. You can see the whole set
            applied in the{" "}
            <Link href="/blog/messaging-app-ui-colour-reference">messaging app colour
            reference</Link>, and if you want to know why a screenshot never proves much on
            its own, the companion piece on{" "}
            <Link href="/blog/screenshot-metadata-and-authenticity">screenshot metadata</Link>{" "}
            goes deeper.
          </p>

          <h2>1. Timestamps follow platform rules, not yours</h2>
          <p>
            The fastest tell is usually the timestamp, because apps disagree with each other
            about where time belongs. iOS messaging puts a time label once — at the top of a
            conversation, or after a long gap — and then lets messages stand without a clock
            beside them. A screenshot that prints an identical right-aligned time next to
            every single bubble is imitating a chat app that does not exist on that platform.
          </p>
          <p>
            Android follows a different convention, and the difference shows up twice: in how
            conversations are labelled and in the status bar, where the system clock sits on
            the left side of the strip. Exact placement and wording vary between devices,
            launchers and system versions, so treat any single rule as a strong hint rather
            than a verdict. The reliable signal is inconsistency: a mockup that mixes an
            iOS-style single header timestamp with Android-style per-row times has borrowed
            from two systems at once.
          </p>

          <h2>2. Bubble geometry and the 8px radius</h2>
          <p>
            Bubbles are drawn, never photographed, so their geometry is a fingerprint. WhatsApp
            uses a tight corner radius — on the order of eight pixels — with a small tail on
            the last bubble of a group. A bubble that is nearly circular, or one where every
            message carries its own tail, reads as decorative rather than functional. Real
            apps only grow a tail on the final bubble of a consecutive run; grouped messages
            above it share a flatter edge.
          </p>
          <p>
            The same logic applies to spacing. Real chats group messages sent close together,
            tightening the gap between them, then open a wider gap before the next speaker.
            Mockups that use one uniform vertical rhythm for every line produce a texture that
            the eye registers as flat even when it cannot name why.
          </p>

          <h2>3. Colour values change with the theme</h2>
          <p>
            Every app has a light palette and a dark palette, and they are not inversions of
            each other. WhatsApp pushes its outgoing bubble to a pale green around{" "}
            <code>#d9fdd3</code> over a beige chat background near <code>#efeae2</code>, and
            its read ticks to a specific blue around <code>#53bdeb</code>. Telegram uses a
            light green near <code>#eeffde</code> in day mode and a steel blue near{" "}
            <code>#2b5278</code> at night. Discord&apos;s dark channel sits around{" "}
            <code>#313338</code> and never uses bubbles at all.
          </p>
          <p>
            Fakes drift in two directions: they invent saturated colours that no app ships, or
            they reuse one palette for both modes. If a &ldquo;dark mode&rdquo; screenshot has
            the same green bubble as the light one, that is not a theme — that is a recoloured
            background. Because these values are only stable to within the app and the version,
            use them as a family resemblance check, not a hexadecimal subpoena.
          </p>

          <h2>4. The status bar, and the notch that should not be there</h2>
          <p>
            A screenshot is captured from the screen itself, which means it records what the
            display is rendering — not the physical hardware around it. On a phone with a
            notch or a pill-shaped cutout, the captured image does not draw the cutout as a
            black shape; the surrounding area simply fills with the app background. So a
            screenshot that includes a crisp, drawn notch or island is almost always a device
            frame applied afterwards or a photograph of a screen, not a file that came straight
            off the phone.
          </p>
          <p>
            That is not automatically dishonest — device frames are a standard presentation
            prop — but it does mean the file is a reconstruction, and it tells you the person
            who made it was assembling, not capturing. The status bar also carries tells of its
            own: battery percentage that does not match the described time of day, a carrier
            name that never existed, or a signal meter that contradicts the story.
          </p>

          <h2>5. Checkmarks, delivery states and read receipts</h2>
          <p>
            Delivery indicators are a small language with strict grammar. WhatsApp moves from a
            single grey tick to double grey ticks on delivery, then to blue ticks once the
            message is read. A screenshot that shows blue ticks on every message instantly, or
            blue ticks on a one-to-one chat where the other person never replied, has skipped a
            step the app would not skip. Group chats are subtler still: the moment a message
            turns blue depends on how many participants have opened it.
          </p>
          <p>
            If you are checking a screenshot that hinges on &ldquo;they read it,&rdquo; this is
            where to look first. Read receipts are also easy for the sender to disable in the
            real app, which is a useful reminder that their absence proves nothing either way.
          </p>

          <h2>6. Names, avatars and language that is too clean</h2>
          <p>
            Human detail is hard to fake and easy to over-polish. Real group chats show a mix
            of display names, some with emoji, some that are clearly nicknames, and a scatter of
            default or outdated avatars. Names get coloured by app rules rather than by mood.
            Fakes tend to give everyone a neat, full name and a uniform avatar treatment.
          </p>
          <p>
            Text is the other half. Real conversations contain typos, half-finished sentences,
            double-sends while someone was still typing, and filler. A thread where every
            message is perfectly capitalised, punctuated and on-topic reads like a script,
            because it is one. Watch also for messages that conveniently summarise things the
            viewer needs to know &mdash; a confession, an amount, a date &mdash; which is a
            narrative instinct, not a chat instinct.
          </p>

          <h2>7. The file itself carries traces</h2>
          <p>
            Open the file, not just the picture. Screenshots taken on a phone are usually
            delivered as PNG with almost no camera metadata, so the absence of EXIF is normal
            and proves little. What is more useful is the edited history: an image that has been
            opened, cropped and re-saved in a photo editor often changes dimensions, adds a
            familiar software string, or picks up a second-generation compression pattern around
            pasted text. None of these is conclusive on its own, and all of them are readable in
            seconds.
          </p>

          <h2>8. The conversation as a whole</h2>
          <p>
            Step back from the pixels and read the thread like a story. Real chats drift, repeat
            themselves and carry context that only the participants understand. Fakes exist to
            deliver one piece of information to a specific reader, so they open with no greeting
            and close the moment the point lands. Pacing is another tell: a long exchange where
            every reply arrives in the same rhythm does not resemble how two people actually
            type at each other.
          </p>
          <p>
            The strongest check is external. A conversation that matters is usually corroborated
            somewhere — a calendar entry, a call log, a second device. If the image is the only
            thing standing behind a claim, the correct posture is disbelief, not analysis.
          </p>

          <h2>9. What to do when you honestly cannot tell</h2>
          <p>
            Some fakes are indistinguishable from the real thing, and pretending otherwise
            helps no one. When a good mockup is done well, the tells above may all pass, because
            the person who made it understood the same rules you do. In that case, stop
            evaluating the picture and change what you depend on: ask for the original device,
            request platform-side records where a platform can provide them, or look for
            independent confirmation.
          </p>
          <p>
            That is also the honest reason this site exists. A tool like our{" "}
            <Link href="/whatsapp-chat-generator">WhatsApp chat generator</Link> makes staged
            conversations for videos, design and teaching, and it makes them accurate enough to
            fool a casual glance &mdash; which is exactly why the{" "}
            <Link href="/acceptable-use">Acceptable Use Policy</Link> draws a hard line at
            using any image as evidence or impersonation. The tells in this checklist are not a
            promise of detection. They are a reminder that a screenshot has never been proof of
            anything by itself.
          </p>
        </article>

        <div className="mt-12 border-t border-black/10 pt-6">
          <h2 className="text-[16px] font-semibold tracking-tight text-foreground">
            Related guides
          </h2>
          <ul className="mt-3 space-y-2 text-[14.5px]">
            {["screenshot-metadata-and-authenticity", "is-it-legal-to-use-mockups-in-ads"].map(
              (rslug) => {
                const rel = getPost(rslug)!;
                return (
                  <li key={rslug}>
                    <Link href={`/blog/${rslug}`} className="text-primary hover:underline underline-offset-2">
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

      <SiteFooter />
    </>
  );
}
