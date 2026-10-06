import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs } from "@/lib/seo";
import { getPost } from "@/lib/blog";

const SLUG = "how-to-make-a-fake-whatsapp-chat";
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
            mockup by hand in Figma. If you would rather start from a finished scene, the{" "}
            <Link href="/examples">chat screenshot examples</Link> gallery shows complete
            conversations you can borrow structure from.
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
            the image will be zoomed. Exports skip the phone frame by default — a real screenshot never contains
            the phone body. Keep it off when compositing into a video frame or a design:
            an entire phone inside a scene that already has a phone looks redundant.
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

          <h2>Three scenes, line by line</h2>
          <p>
            Abstract advice about &ldquo;natural rhythm&rdquo; is hard to act on, so here are
            three everyday scenes laid out line by line, with the reason the pacing is arranged
            that way. All three are the kind of benign logistics and small-talk threads the{" "}
            <Link href="/examples">examples gallery</Link> uses.
          </p>
          <p>
            <strong>The plans thread.</strong> One side opens with a question, the other
            confirms, then a small practical detail, then a one-word close:
          </p>
          <ul>
            <li>&ldquo;still on for sat?&rdquo;</li>
            <li>&ldquo;yeah — 7 at the usual place&rdquo;</li>
            <li>&ldquo;i&apos;ll bring the speakers&rdquo;</li>
            <li>&ldquo;perfect&rdquo;</li>
          </ul>
          <p>
            The rhythm here is fast and even, because plans get settled quickly. Note that the
            longest bubble is not the opener but the practical detail, and that the thread ends
            on a single word — real logistics rarely sign off with a paragraph. This is the
            shape to use when you need a screenshot that simply reads as normal.
          </p>
          <p>
            <strong>The left-on-read thread.</strong> Someone raises something mildly awkward,
            sends a fuller message, then resolves it themselves before anyone answers:
          </p>
          <ul>
            <li>&ldquo;quick q about the invoice&rdquo;</li>
            <li>&ldquo;no rush but could you check the total when you get a sec?&rdquo;</li>
            <li>&ldquo;actually never mind, sorted it 🙂&rdquo;</li>
          </ul>
          <p>
            The pacing is deliberately lopsided: three messages from one side, nothing from the
            other. The third message walking back the second is the whole point, and it is why
            the double text exists in the first place. Ending on a friendly self-resolution is
            what keeps the scene light rather than pointed.
          </p>
          <p>
            <strong>The check-in thread.</strong> A short hello, a gap, then an answer much
            later:
          </p>
          <ul>
            <li>&ldquo;you around this week?&rdquo;</li>
            <li>&ldquo;free thurs if that works&rdquo;</li>
            <li>&ldquo;thurs is good&rdquo;</li>
          </ul>
          <p>
            What makes this one work is the uneven timing rather than the words. In the editor,
            set the first message to two grey ticks and the last to blue so the screenshot
            carries the silence visually instead of stating it. Three lines is enough; adding
            more turns a check-in into a plan.
          </p>

          <h2>Using the three tick states as a storytelling tool</h2>
          <p>
            WhatsApp is unusual in having three distinct receipt states, and each one says
            something different. A single grey tick means the message left your phone but has
            not reached theirs — their phone is off or offline. Two grey ticks mean it arrived
            but has not been opened. Two blue ticks mean it was read. That is a small grammar,
            and it lets a screenshot say things that the words do not.
          </p>
          <p>
            The most-used beat is the blue tick with no reply: a message that is read and then
            ignored. To stage it, give the last outgoing bubble blue ticks and end the thread
            there. The second beat is the opposite — a message stuck at one grey tick, which
            reads as a phone that is switched off or out of signal, useful when the story is
            about someone being unreachable rather than unwilling. Two grey ticks is the
            neutral, unremarkable state, and most of a believable thread should sit there.
          </p>
          <p>
            The trap is uniformity. A conversation where every outgoing message is blue-read
            looks staged, because in real life most messages linger at two grey ticks for hours.
            Pick the one or two messages whose state carries meaning, set those deliberately, and
            leave the rest grey. If you want a second opinion on which states a real thread
            shows, the{" "}
            <Link href="/whatsapp-chat-generator">WhatsApp generator</Link> exposes all three so
            you can compare them side by side before exporting.
          </p>

          <h2>Pairing a group thread with a one-to-one</h2>
          <p>
            Plenty of stories need two screens: a group where something is announced or argued
            out in public, and a private thread where it is actually discussed. Building both is
            straightforward, but the pair only works if the viewer believes they belong to the
            same phone.
          </p>
          <p>
            The mechanics matter. Build the group scene with the{" "}
            <Link href="/group-chat-generator">group chat generator</Link> and the private scene
            with the <Link href="/whatsapp-chat-generator">WhatsApp generator</Link>, then hold
            the two consistent: reuse the same participant names, the same light or dark mode,
            and the same wallpaper, so the two images look like two screens from one account
            rather than two unrelated mockups. If the group has five members, the private thread
            should be with one of those five, not a new name.
          </p>
          <p>
            Remember that ticks mean something heavier in a group. Two blue ticks in a
            one-to-one means one person read it; in a group they mean everyone did, which is
            rare, so most group messages should sit at two grey ticks. Keeping the group a little
            unreliable and the private thread precise mirrors how these things actually happen,
            and it is the detail that makes a two-image scene hold together. The{" "}
            <Link href="/group-chat-screenshot-guide">group chat guide</Link> goes deeper on
            multi-person staging.
          </p>

          <h2>The boundary the tool will not cross</h2>
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

      <SiteFooter trademark={{ name: "WhatsApp", owner: "Meta Platforms, Inc." }} />
    </>
  );
}
