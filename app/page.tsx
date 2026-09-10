import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { generatorPages, livePages, site } from "@/lib/seo";

export const metadata: Metadata = {
  title: `${site.name} — Free Chat Mockup Generator, No Signup`,
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
};

export default function HomePage() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: site.name,
    url: site.url,
    applicationCategory: "DesignApplication",
    operatingSystem: "Any (web browser)",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: site.description,
    publisher: { "@type": "Organization", name: site.orgName, url: site.url },
  };

  return (
    <>
      <SiteHeader />
      <JsonLd data={webApp} />

      <main className="mx-auto max-w-6xl px-5 pt-14">
        <div className="max-w-3xl">
          <p className="text-[13px] font-medium tracking-wide uppercase text-[#008069]">
            100% free · No signup · No watermark
          </p>
          <h1 className="mt-3 text-[38px] sm:text-[50px] font-semibold tracking-tight leading-[1.06] text-[#0f1c17]">
            Free chat mockup generator
          </h1>
          <p className="mt-5 text-[18px] leading-relaxed text-black/65">
            Create realistic chat screenshots for WhatsApp, Messenger, Instagram DM and more.
            Everything renders in your browser — nothing is uploaded, nothing is stored, and
            your PNG export carries no watermark.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={`/${livePages[0]?.slug ?? "whatsapp-chat-generator"}`}
              className="px-5 py-3 rounded-xl bg-[#008069] text-white text-[14.5px] font-medium hover:bg-[#006b58] transition"
            >
              Open the WhatsApp generator →
            </Link>
            <Link
              href="#generators"
              className="px-5 py-3 rounded-xl border border-black/15 text-[14.5px] hover:border-black/35 transition"
            >
              See all generators
            </Link>
          </div>
        </div>

        <section id="generators" className="mt-16 scroll-mt-20">
          <h2 className="text-[24px] font-semibold tracking-tight text-[#0f1c17]">
            Chat mockup generators
          </h2>
          <p className="mt-2 text-[15.5px] text-black/60 max-w-2xl">
            We build one platform at a time and get the details right — exact bubble colours,
            read receipts, timestamps and dark mode. Pages marked <em>coming soon</em> are next
            in the queue.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {generatorPages.map((p) => {
              const live = p.live;
              const inner = (
                <>
                  <span className="flex items-center justify-between">
                    <span className="font-medium text-[15.5px] text-[#0f1c17]">{p.name}</span>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full border ${
                        live
                          ? "border-[#008069]/30 text-[#008069] bg-[#008069]/5"
                          : "border-black/12 text-black/45"
                      }`}
                    >
                      {live ? "Live" : "Coming soon"}
                    </span>
                  </span>
                  <span className="mt-1.5 block text-[13.5px] leading-relaxed text-black/55">
                    {p.description.length > 118
                      ? `${p.description.slice(0, 118)}…`
                      : p.description}
                  </span>
                </>
              );

              return live ? (
                <Link
                  key={p.slug}
                  href={`/${p.slug}`}
                  className="block p-4 rounded-2xl border border-black/12 hover:border-black/30 hover:shadow-sm transition"
                >
                  {inner}
                </Link>
              ) : (
                <div
                  key={p.slug}
                  className="block p-4 rounded-2xl border border-dashed border-black/15 opacity-70"
                >
                  {inner}
                </div>
              );
            })}
          </div>
        </section>

        <article className="prose-cm max-w-3xl mt-16">
          <h2>What is a chat mockup?</h2>
          <p>
            A chat mockup is a realistic-looking screenshot of a messaging conversation that
            never actually happened. It is a design asset, in the same family as a device
            frame or a browser window mockup: something you drop into a video, a slide, a
            thumbnail or a story to show a conversation instead of describing it.
          </p>
          <p>
            People reach for them constantly. A creator staging the opening line of a story. A
            designer showing what a notification flow looks like in context. A teacher
            writing a dialogue exercise. A founder putting a customer conversation on a pitch
            slide without publishing anyone&apos;s private messages. In every one of those
            cases, the alternative is either a real screenshot (a privacy problem) or a grey
            box with placeholder text (a clarity problem).
          </p>

          <h2>Why ChatMock is different</h2>
          <p>
            <strong>It runs entirely in your browser.</strong> No upload, no account, no
            server rendering your conversations. The page keeps working after you disconnect
            from the internet, which is the easiest way to verify that claim yourself.
          </p>
          <p>
            <strong>No watermark, and no paywall on the basics.</strong> The whole point of a
            mockup is that it looks real; a logo stamped across it defeats the purpose. PNG
            export at 1x, 2x and 3x is free.
          </p>
          <p>
            <strong>The details are correct.</strong> Bubble radius, the way consecutive
            messages lose their tail, the exact shade of blue on a read receipt, the cap on
            bubble width. These are the things that betray a fake screenshot, and they are
            different on every platform — which is why we build one platform properly at a
            time rather than shipping twelve approximations.
          </p>

          <h2>Using mockups responsibly</h2>
          <p>
            A mockup is a creative tool, and like any creative tool it depends on intent.
            Illustrating, parodying, teaching and designing are all fine. Using a fabricated
            conversation to deceive someone, to harass or impersonate a person, or to
            manufacture evidence is not — and we do not want that traffic. Read the{" "}
            <Link href="/acceptable-use">Acceptable Use Policy</Link> if you are unsure where
            your use case falls.
          </p>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
