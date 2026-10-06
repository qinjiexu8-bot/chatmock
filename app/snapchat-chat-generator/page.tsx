import type { Metadata } from "next";
import Link from "next/link";
import GeneratorShell from "@/components/generator/GeneratorShell";
import Breadcrumb from "@/components/Breadcrumb";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs, site, pageName } from "@/lib/seo";
import { snapchatTheme } from "@/lib/themes";

const SLUG = "snapchat-chat-generator";
const CANONICAL = `/${SLUG}`;

export const metadata: Metadata = {
  title: "Free Snapchat Chat Generator — No Signup, No Watermark",
  description:
    "Create realistic Snapchat conversation mockups in your browser. Signature yellow header, lavender outgoing bubbles, Delivered status and dark mode, then export a high-resolution PNG. Free, no signup, no watermark.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
    url: abs(CANONICAL),
    images: [abs(`/og/${SLUG}`)],
    title: "Free Snapchat Chat Generator — No Signup, No Watermark",
    description:
      "Build realistic Snapchat conversation mockups with the yellow header and Delivered status. Free, no signup, PNG export.",
  },
  twitter: {
    card: "summary_large_image",
    images: [abs(`/og/${SLUG}`)],
  },
};

const FAQ = [
  {
    q: "Is the whole Snapchat screen yellow?",
    a: "No — and that misconception is the most frequent error in fake Snapchat shots. The signature yellow (#fffc00) fills the header and the app's main screens, but the conversation itself is white in light mode and black in dark mode, and this page keeps that split correct.",
  },
  {
    q: "Why does Delivered appear under my messages?",
    a: "Snapchat puts a small grey Delivered note below outgoing messages once they reach the other device — it is part of the interface rather than something extra. The editor lets you edit that label, drop it, or change it for a particular scene.",
  },
  {
    q: "If it is not yellow, what colour is my bubble?",
    a: "Lavender, #d9a7f9, on the light theme and a deep purple in dark mode — the sender bubble is deliberately neither yellow nor blue. Getting this wrong is the second-most common Snapchat mistake after the all-yellow screen.",
  },
  {
    q: "Why is the header yellow but the icons black?",
    a: "Because Snapchat keeps a bright #fffc00 header with black text and icons in both light and dark mode. The contrast is part of the look, and a mockup that swaps it for white icons on yellow no longer reads as Snapchat.",
  },
  {
    q: "Can I drop a photo into the conversation?",
    a: "Yes. Any message can hold an image with a caption, read locally from your device and drawn as a rounded media bubble — no uploading to a third-party host and nothing leaving your browser.",
  },
  {
    q: "Is the Snapchat chat generator free?",
    a: "Every part of it is. No account, no email gate, no daily limit and no watermark on the output, and the PNG is downloadable at 1x, 2x or 3x.",
  },
  {
    q: "Does a Snapchat mockup get sent to a server?",
    a: "Not at all. The whole conversation is rendered in your browser and the PNG is generated on your own device before being saved to your downloads. Names, messages and images stay put, so you can disconnect from the internet after the page loads and keep working.",
  },
  {
    q: "Can I use the mockups in commercial work?",
    a: "For legitimate purposes — videos, thumbnails, presentations, teaching, fiction, design — yes. What you cannot do is pass a fabricated conversation off as real, harass or impersonate someone, or fake evidence; the Acceptable Use Policy explains where the line sits.",
  },
];

export default function SnapchatGeneratorPage() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Snapchat Chat Generator",
    url: abs(CANONICAL),
    applicationCategory: "DesignApplication",
    operatingSystem: "Any (web browser)",
    browserRequirements: "Requires JavaScript. Works in modern browsers.",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Signature yellow header (#fffc00) with white chat area",
      "Lavender outgoing bubbles, grey incoming bubbles",
      "Delivered label under outgoing messages",
      "Per-message avatars on incoming messages",
      "Light and dark mode",
      "Image attachments with captions",
      "PNG export at 1x, 2x and 3x",
    ],
    publisher: { "@type": "Organization", name: site.orgName, url: site.url },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Snapchat Chat Generator", item: abs(CANONICAL) },
    ],
  };

  return (
    <>
      <SiteHeader current={SLUG} />
      <JsonLd data={[webApp, faq, breadcrumb]} />

      <main className="mx-auto max-w-6xl px-5 pt-10">
        {/* 面包屑（与 JSON-LD BreadcrumbList 对应） */}
        <div className="mb-4">
          <Breadcrumb items={[{ name: "Home", href: "/" }, { name: pageName("snapchat-chat-generator") }]} />
        </div>
        <div className="max-w-3xl">
          <h1 className="font-display text-[34px] sm:text-[42px] font-semibold tracking-tight leading-[1.1] text-foreground">
            Free Snapchat Chat Generator
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-black/65">
            Build a realistic Snapchat conversation mockup in your browser and download a
            high-resolution PNG — no signup, no watermark, no upload. Signature yellow
            header, lavender outgoing bubbles, the Delivered label, dark mode, and export at
            1x, 2x or 3x.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[13.5px] text-black/55">
            <span>✓ Free, with nothing to install</span>
            <span>✓ No watermark on the file</span>
            <span>✓ True #fffc00 yellow header</span>
            <span>✓ Lavender outgoing bubbles</span>
          </div>
        </div>

        <div className="mt-8">
          <GeneratorShell platformId="snapchat" />
        </div>

        <article className="prose-cm max-w-3xl mt-14">
          <h2>How to create a Snapchat chat mockup in four steps</h2>
          <ol>
            <li>
              <strong>Set the contact.</strong> Type the name into <em>Contact → Name</em> and
              it lands in the black-on-yellow header. Upload an avatar, or take the yellow
              initial circle ChatMock draws as a stand-in for a Bitmoji.
            </li>
            <li>
              <strong>Write the messages.</strong> Add lines with <em>+ Emma</em> or{" "}
              <em>+ Me</em>, swap the side with the sender toggle and reorder with the arrows.
              Snapchat gives each incoming message its own small avatar rather than grouping
              them, so the left side stays busy; a photo becomes a rounded media bubble with a
              caption.
            </li>
            <li>
              <strong>Set the Delivered label.</strong> <em>Contact → Delivery</em> seeds the
              field with <code>Delivered</code>, which prints as small grey text beneath your
              outgoing lines. Replace it or clear it whenever the scene calls for a different
              state.
            </li>
            <li>
              <strong>Export.</strong> Snapchat mockups live in vertical feeds, so 2x is the
              natural pick for a Story, a Reel cover or a TikTok frame; 1x is fine for a
              rough layout and 3x only really matters for print. The export is a bare
              rectangle until you enable <em>Phone frame</em>, which adds the handset outline
              for thumbnail-style compositions.
            </li>
          </ol>

          <h2>What makes a Snapchat screenshot actually look real</h2>
          <p>
            Snapchat is the platform generators get wrong most often, because its colour
            logic is backwards from what people assume. Here are the values ChatMock uses,
            taken from the real app:
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
                <td>Header bar</td>
                <td colSpan={2}>
                  <code>#fffc00</code> — yellow, with black text and icons, in both modes
                </td>
              </tr>
              <tr>
                <td>Chat area</td>
                <td>
                  <code>#ffffff</code> — white, <strong>not yellow</strong>
                </td>
                <td>
                  <code>#000000</code>
                </td>
              </tr>
              <tr>
                <td>Outgoing bubble</td>
                <td>
                  Lavender <code>#d9a7f9</code>
                </td>
                <td>
                  Deep purple <code>#5b3a8e</code>
                </td>
              </tr>
              <tr>
                <td>Incoming bubble</td>
                <td>
                  <code>#f0f0f0</code>
                </td>
                <td>
                  <code>#262626</code>
                </td>
              </tr>
              <tr>
                <td>Delivered label</td>
                <td colSpan={2}>
                  Small grey text under outgoing messages
                </td>
              </tr>
              <tr>
                <td>Timestamps</td>
                <td colSpan={2}>
                  Never inside bubbles
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            The single biggest tell in fake Snapchat screenshots is an all-yellow screen.
            Real Snapchat chats have a yellow header over a white (or black) conversation
            area, and generators that fill the whole screen with #fffc00 are instantly
            recognisable. The second tell is the outgoing bubble colour: it is lavender, not
            yellow, not blue, and not grey. And third, the Delivered label sits under
            outgoing messages as plain grey text — a detail most generators omit entirely.
          </p>

          <h2>Everything you can customise</h2>
          <ul>
            <li>Contact name (in the yellow header) and avatar photo</li>
            <li>Light or dark mode, both matching the real app</li>
            <li>Unlimited messages, reorderable, either side</li>
            <li>Delivered label text — or remove it entirely</li>
            <li>Image attachments with captions</li>
            <li>Date marker at the top of the thread</li>
            <li>Status bar: clock, battery and signal</li>
            <li>Optional iPhone-style phone frame</li>
          </ul>

          <h2>What people use Snapchat mockups for</h2>
          <p>
            Snapchat conversations show up constantly in storytime videos, teen-drama
            sketches, and social media safety tutorials — the platform&apos;s ephemerality
            makes &ldquo;here is what the message said&rdquo; the natural visual device.
            Teachers and awareness campaigns use it for the same reason. Because the
            interface is so colour-distinct, audiences recognise it at thumbnail size, which
            is also why the yellow/white split matters: getting it wrong undermines the whole
            frame.
          </p>
          <p>
            As on every page here, the deciding factor is intent. Snaps and chats composed to
            illustrate, to parody, to teach or to design something are perfectly fine; a
            made-up conversation turned loose to deceive someone, to harass them, to impersonate
            a person, or to forge evidence is not. There are no bank, government, medical or
            legal templates on ChatMock, and the{" "}
            <Link href="/acceptable-use">Acceptable Use Policy</Link> covers the boundary in
            full.
          </p>

          <h2>Composed locally, never uploaded</h2>
          <p>
            The conversation, the yellow header and the Delivered label are all drawn by your
            browser with plain HTML and CSS, and the PNG is encoded locally before it is saved.
            Nothing is stored or transmitted, so once the page is loaded you can disconnect and
            keep building mockups offline.
          </p>

          <h2>Other generators</h2>
          <p>
            Snapchat is the most colour-specific platform here, so it pays to compare it with
            the others: the{" "}
            <Link href="/instagram-dm-generator">Instagram DM generator</Link> is the closest
            cousin, using its own purple-to-pink gradient instead of lavender, while the{" "}
            <Link href="/fake-text-message-generator">iPhone text message generator</Link>{" "}
            covers the plain iMessage look. Both are live, and so is the rest of the ChatMock
            set — the <Link href="/examples">examples gallery</Link> is the fastest way to see
            them side by side.
          </p>

          <h2>Frequently asked questions</h2>
          {FAQ.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </article>
      </main>

      <SiteFooter trademark={snapchatTheme.trademark} />
    </>
  );
}
