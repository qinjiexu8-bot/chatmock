import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "About ChatMock",
  description:
    "ChatMock builds free, browser-based chat mockup generators with accurate platform UI details. No signup, no watermark, nothing uploaded. Here's why and how.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 pt-12">
        <h1 className="font-display text-[32px] font-semibold tracking-tight text-foreground">
          About ChatMock
        </h1>

        <article className="prose-cm mt-6">
          <p>
            ChatMock is a small, focused project with one goal: produce chat screenshots that
            survive a close look. Not &ldquo;close enough for a thumbnail&rdquo; — correct
            bubble radius, correct green, correct blue on the read receipt, correct behaviour
            when several messages in a row come from the same person.
          </p>

          <h2>Why we build one platform at a time</h2>
          <p>
            Twelve approximate generators is easy. Twelve convincing ones is not: each platform
            has its own bubble geometry, colour system, timestamp placement and dark mode
            behaviour, and getting any of them slightly wrong is exactly what makes a mockup
            read as fake. So we ship one platform, get the details right, and move to the next.
            WhatsApp came first because it is the most requested by a wide margin.
          </p>

          <h2>Why it is free</h2>
          <p>
            A mockup tool with a watermark on the output is self-defeating — the entire value is
            that the image looks real. So the core generator is free, with no account and no
            export limit. If we ever add paid features, they will be additive (batch export,
            team templates, an API) rather than things taken away from the free tier.
          </p>

          <h2>Why it runs in your browser</h2>
          <p>
            Rendering client-side is faster for you and safer for us: there is no server holding
            thousands of staged conversations, real-looking and occasionally about real people.
            Nothing you type is transmitted. You can prove this by loading a generator and then
            turning off your wifi — it keeps working.
          </p>

          <h2>Trademarks</h2>
          <p>
            WhatsApp, Messenger, Instagram, Discord, Telegram, Snapchat, TikTok and Apple are
            trademarks of their respective owners. ChatMock is an independent project and is not
            affiliated with, endorsed by or sponsored by any of them. Every interface shown here
            is a recreation built for mockups, illustration and presentations.
          </p>

          <h2>Responsible use</h2>
          <p>
            These tools exist for creative work: video, design, teaching, fiction, demos. They
            are not for deception, harassment, impersonation or fabricated evidence, and we do
            not build templates for fake bank, government, medical or legal documents. The full
            boundary is in the <a href="/acceptable-use">Acceptable Use Policy</a>.
          </p>

          <h2>Contact</h2>
          <p>
            hello@chatmock.net — bug reports and feature requests welcome. If you spot a UI
            detail we got wrong on a platform you use daily, tell us; that is the single most
            useful email we get.
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
