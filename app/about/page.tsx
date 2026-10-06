import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs, site } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About ChatMock",
  description:
    "ChatMock builds free, browser-based chat mockup generators with accurate platform UI details. Who runs the project, how we verify interface details, and why nothing is uploaded.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: abs("/about"),
    title: "About ChatMock",
    description:
      "An independent, browser-based mockup project — who runs it, how we verify UI details, and why it is free.",
    images: [abs("/og/about")],
  },
  twitter: { card: "summary_large_image", images: [abs("/og/about")] },
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About ChatMock",
          description:
            "Who runs ChatMock, how we verify platform interface details, and why nothing you type is uploaded.",
          url: abs("/about"),
          isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
          publisher: { "@type": "Organization", name: site.orgName, url: site.url },
        }}
      />
      <main className="mx-auto max-w-3xl px-5 pt-12">
        <h1 className="font-display text-[32px] font-semibold tracking-tight text-foreground">
          About ChatMock
        </h1>

        <article className="prose-cm mt-6">
          <p>
            ChatMock is a small, focused project with one goal: produce chat screenshots that
            survive a close look. Not &ldquo;close enough for a thumbnail&rdquo; — correct
            bubble radius, correct green, correct blue on the read receipt, correct behaviour
            when several messages in a row come from the same person. Anyone can arrange text
            into two columns of speech bubbles; the value is entirely in whether a person who
            uses that app every day would believe the image.
          </p>

          <h2>Who runs this</h2>
          <p>
            ChatMock is an independent project built and maintained by a very small team of
            designers and front-end engineers — not a company with a content department, and
            not a network of generated sites. The same people who write the pages also build the
            renderers, answer the mailbox and fix the bugs. That has two visible consequences:
            the site moves one platform at a time rather than publishing a dozen approximations
            at once, and every correction that arrives by email gets read by someone who can act
            on it.
          </p>
          <p>
            We work across the UTC+8 time zone. There is no office address to list and no phone
            line, because a static browser tool does not need either; email is the real channel
            and the <Link href="/contact">Contact page</Link> explains how it works and what we
            can actually help with.
          </p>

          <h2>When this started</h2>
          <p>
            The first generator went live in <strong>September 2026</strong>. The project grew
            out of a simple frustration: the existing mockup tools were either watermarked,
            account-gated, or wrong in ways that any regular user of the app would spot
            immediately — WhatsApp with a green iPhone header, Discord drawn as bubbles,
            Telegram using WhatsApp&apos;s green. The plan from day one was to publish fewer
            platforms, get each one right, and let the accuracy be the product.
          </p>

          <h2>How we verify interface details</h2>
          <p>
            Every platform page documents the values we render — bubble colours, corner radii,
            header treatment, tick states — and those values come from the real apps, checked
            against current builds rather than copied from an old blog post or an icon pack.
            Where a platform behaves in a way that surprises people, we write down why: WhatsApp
            &apos;s iPhone header picks up the wallpaper tone instead of the brand green;
            Telegram has only two checkmark states, not three; Discord has never used bubbles
            with tails. Those notes are the reason the{" "}
            <Link href="/blog/messaging-app-ui-colour-reference">colour reference</Link> exists,
            and the reason we ask users to send corrections — a wrong detail reported by someone
            who opens the app daily is worth more to us than any screenshot we could gather
            ourselves.
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
            team templates, an API) rather than things taken away from the free tier. There is
            no advertising shown on the site today; if that changes, the{" "}
            <Link href="/privacy">Privacy Policy</Link> is where it will be disclosed.
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
            WhatsApp, Messenger, Instagram, Discord, Telegram, Snapchat, Google Messages, TikTok
            and Apple are trademarks of their respective owners. ChatMock is an independent
            project and is not affiliated with, endorsed by or sponsored by any of them. Every
            interface shown here is a recreation built for mockups, illustration and
            presentations.
          </p>

          <h2>Responsible use</h2>
          <p>
            These tools exist for creative work: video, design, teaching, fiction, demos. They
            are not for deception, harassment, impersonation or fabricated evidence, and we do
            not build templates for fake bank, government, medical or legal documents. The full
            boundary is in the <Link href="/acceptable-use">Acceptable Use Policy</Link>, and the
            legal terms — ownership of your exports, warranty and liability — are in the{" "}
            <Link href="/terms">Terms of Service</Link>.
          </p>

          <h2>Contact</h2>
          <p>
            hello@chatmock.net — bug reports and feature requests welcome. If you spot a UI
            detail we got wrong on a platform you use daily, tell us; that is the single most
            useful email we get. The <Link href="/contact">Contact page</Link> lists the other
            things the inbox handles, and how quickly to expect a reply.
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
