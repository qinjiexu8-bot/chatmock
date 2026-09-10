import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs } from "@/lib/seo";
import { getPost } from "@/lib/blog";

const SLUG = "how-to-make-a-fake-whatsapp-chat";
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
            A WhatsApp screenshot is the universal prop of internet storytelling. It shows up
            in YouTube skits, TikTok voiceover series, product demos, classroom exercises and
            UX presentations — anywhere a conversation needs to be shown rather than
            described. And because the audience sees the real interface every day, the bar
            for looking real is high: a wrong green, a missing tick or a bubble at the wrong
            width gets noticed within seconds.
          </p>
          <p>
            This guide walks through making one properly, using the free{" "}
            <Link href="/whatsapp-chat-generator">WhatsApp chat generator</Link> — no signup,
            no watermark, everything rendered in your own browser. The same principles apply
            whichever tool you use, so it is worth reading even if you end up building the
            mockup by hand in Figma.
          </p>

          <h2>Step 1: Start from the scene, not the screen</h2>
          <p>
            The most common mistake is opening the generator first and improvising. Work out
            the scene before touching any tool: who is talking, what do they want, and what
            does the viewer need to understand from this screenshot in five seconds? A
            staged conversation that exists to deliver one clear beat — the reveal, the
            excuse, the awkward double-text — needs four to eight messages, not twenty.
            Short conversations are also easier to make look natural, because real chats are
            full of abbreviations, typos and uneven reply times.
          </p>

          <h2>Step 2: Set the contact the way the app would</h2>
          <p>
            In the real app, the header shows the saved contact name, a status line, and a
            profile photo. The details matter: an <code>online</code> subtitle implies the
            person is in the app right now; <code>last seen today at 20:14</code> implies
            they went quiet — which can be the entire point of your scene. If you leave the
            avatar empty, a neutral grey initial circle appears, which is what the real app
            shows for contacts without photos. That is usually more believable than a
            too-perfect stock photo.
          </p>

          <h2>Step 3: Write messages that read like typing, not writing</h2>
          <p>
            Real conversations have texture. Reply lengths are uneven. Punctuation is
            inconsistent. Someone sends three short messages where a formal writer would send
            one paragraph. A few concrete habits:
          </p>
          <ul>
            <li>Match register: close friends compress (&ldquo;u up?&rdquo;), colleagues expand.</li>
            <li>Let one side dominate. Most real chats have a texter and a replier.</li>
            <li>Group consecutive messages: three bubbles in a row from one person is the
              single most natural rhythm in WhatsApp.</li>
            <li>Put the beat in the last message of the exchange — that is where the eye
              lands.</li>
          </ul>

          <h2>Step 4: Sweat the receipts</h2>
          <p>
            Read receipts are where fake screenshots go to die. WhatsApp has exactly three
            states: one grey tick (sent), two grey ticks (delivered), two blue ticks (read).
            A conversation where every outgoing message is blue-read looks staged, because in
            real life most messages sit at two grey ticks for hours. Set the last one or two
            to blue, leave the rest grey, and the screenshot instantly feels lived-in.
          </p>

          <h2>Step 5: Export at the right resolution</h2>
          <p>
            Export at 2x for thumbnails and presentations (780px wide), 3x for print or when
            the image will be zoomed. If you are compositing the screenshot into a video
            frame or a design, turn off the phone frame and export just the screen —
            compositing an entire phone into a scene that already has a phone looks
            redundant.
          </p>

          <h2>What makes viewers smell a fake</h2>
          <p>
            Three tells cover almost every bad mockup. Wrong colours — the outgoing bubble is{" "}
            <code>#d9fdd3</code>, not the green of the header. Bubbles too wide — real ones
            cap around three-quarters of the screen. And timestamps — they belong inside the
            bubble next to the ticks, never floating outside. The{" "}
            <Link href="/whatsapp-chat-generator">generator</Link> handles all three by
            default, which is the point: the tool should make the correct thing the easy
            thing.
          </p>

          <h2>Where the line is</h2>
          <p>
            A fabricated conversation used to illustrate, parody or teach is a creative
            device as old as fiction. The same image used to deceive someone — fake evidence,
            impersonation, harassment — is something else entirely, and it is the reason
            ChatMock publishes an{" "}
            <Link href="/acceptable-use">Acceptable Use Policy</Link> and refuses to build
            templates for fake bank, government or legal notices. Make things people will
            recognise as staged; do not make things designed to be mistaken for evidence.
          </p>
        </article>

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
