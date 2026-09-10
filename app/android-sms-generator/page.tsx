import type { Metadata } from "next";
import Link from "next/link";
import GeneratorShell from "@/components/generator/GeneratorShell";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs, site } from "@/lib/seo";
import { androidSmsTheme } from "@/lib/themes";

const SLUG = "android-sms-generator";
const CANONICAL = `/${SLUG}`;

export const metadata: Metadata = {
  title: "Free Android SMS Generator — Google Messages Mockup | ChatMock",
  description:
    "Create realistic Android SMS and Google Messages mockups in your browser. Material blue bubbles, Read receipts, Android status bar and dark mode, then export a high-resolution PNG. Free, no signup, no watermark.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
    url: abs(CANONICAL),
    images: [abs(`/og/${SLUG}`)],
    title: "Free Android SMS Generator — Google Messages Mockup",
    description:
      "Build realistic Google Messages mockups with Material blue bubbles and Read receipts. Free, no signup, PNG export.",
  },
  twitter: {
    card: "summary_large_image",
    images: [abs(`/og/${SLUG}`)],
  },
};

const FAQ = [
  {
    q: "Is this Android SMS generator free?",
    a: "Yes — every feature is free, with no signup, no email wall, no daily limit and no watermark on your export. PNG download works at 1x, 2x and 3x resolution.",
  },
  {
    q: "Which app does this mockup look like?",
    a: "Google Messages, the default SMS/RCS app on most Android phones — with its Material Design language: large-radius bubbles, Google's blue for outgoing messages, a clean white (or dark grey) background, and a pill-shaped input field. If you need Samsung's own Messages app instead, that uses a different layout and is not covered here yet.",
  },
  {
    q: "Why does the phone frame look different from the iPhone pages?",
    a: "Because it is. This page renders an Android-style status bar — a centred punch-hole camera, time on the left, no notch — and the phone frame is off by default, since an Android interface inside an iPhone shell would look wrong. You can still enable the frame if you prefer.",
  },
  {
    q: "What does the Read label mean?",
    a: "Under RCS (rich messaging), Google Messages shows a Read confirmation under the last outgoing message once the recipient has seen it. The label is editable — write Read with a time, just Delivered, or clear it for a message that has not been seen.",
  },
  {
    q: "Is my conversation uploaded to a server?",
    a: "No. The mockup is rendered entirely on your device, and the PNG is generated in your browser and saved straight to your downloads. Nothing you type ever leaves your computer or phone — disconnect from the internet after loading the page and the editor keeps working.",
  },
  {
    q: "What resolution can I export?",
    a: "1x (390px wide), 2x (780px) or 3x (1170px). For thumbnails and blog posts, 2x is usually the sweet spot. Use 3x when the screenshot will be zoomed into or printed.",
  },
  {
    q: "Can I use the mockups commercially?",
    a: "Yes, for legitimate creative work: videos, presentations, teaching material, fiction and design. You may not use them to deceive, defraud, harass, impersonate anyone or fabricate evidence. The Acceptable Use Policy has the full boundary.",
  },
];

export default function AndroidSmsGeneratorPage() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Android SMS Generator",
    url: abs(CANONICAL),
    applicationCategory: "DesignApplication",
    operatingSystem: "Any (web browser)",
    browserRequirements: "Requires JavaScript. Works in modern browsers.",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Google Messages Material Design bubbles",
      "Outgoing blue #1a73e8, incoming grey, large 20px radius",
      "RCS Read confirmation under the last outgoing message",
      "Android status bar with punch-hole camera (no notch)",
      "Light and dark mode",
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
      { "@type": "ListItem", position: 2, name: "Android SMS Generator", item: abs(CANONICAL) },
    ],
  };

  return (
    <>
      <SiteHeader current={SLUG} />
      <JsonLd data={[webApp, faq, breadcrumb]} />

      <main className="mx-auto max-w-6xl px-5 pt-10">
        <div className="max-w-3xl">
          <h1 className="font-display text-[34px] sm:text-[42px] font-semibold tracking-tight leading-[1.1] text-foreground">
            Free Android SMS Generator
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-black/65">
            Build a realistic Google Messages conversation mockup in your browser and
            download a high-resolution PNG — no signup, no watermark, no upload. Material
            blue bubbles, RCS Read receipts, an Android status bar with punch-hole camera,
            and export at 1x, 2x or 3x.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[13.5px] text-black/55">
            <span>✓ No account required</span>
            <span>✓ No watermark, ever</span>
            <span>✓ Nothing leaves your device</span>
            <span>✓ Works on mobile</span>
          </div>
        </div>

        <div className="mt-8">
          <GeneratorShell platformId="android-sms" />
        </div>

        <article className="prose-cm max-w-3xl mt-14">
          <h2>How to create an Android SMS mockup in four steps</h2>
          <ol>
            <li>
              <strong>Set the contact.</strong> Type a name into <em>Contact → Name</em> and
              upload an avatar. Without one, ChatMock draws a blue initial circle, the way
              Google Messages renders contacts without photos.
            </li>
            <li>
              <strong>Write the conversation.</strong> Add messages with{" "}
              <em>+ Alex</em> or <em>+ Me</em>, flip each one between the two sides, and
              reorder with the arrows. Uploading an image turns that message into a rounded
              media bubble with a caption.
            </li>
            <li>
              <strong>Set the Read label.</strong> Under <em>Contact → Delivery</em>, the
              label defaults to <code>Read</code>, shown under your last outgoing message the
              way RCS confirms it. Clear it for a message that has not been seen yet.
            </li>
            <li>
              <strong>Export.</strong> Pick 1x, 2x or 3x and hit <em>Download PNG</em>. The
              phone frame starts off on this page — an Android interface in an iPhone shell
              would look wrong — but you can turn it on if your composition needs one.
            </li>
          </ol>

          <h2>What makes a Google Messages screenshot actually look real</h2>
          <p>
            Android messaging has its own design language, distinct from every iOS messenger.
            Here are the values ChatMock uses, taken from the real app:
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
                  <code>#1a73e8</code> — Google blue, white text
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
                  Android style: centred punch-hole camera, time on the left, no notch
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            The tells here are structural. Google Messages bubbles are{" "}
            <strong>Material Design capsules</strong> — larger radius than iMessage, with the
            last message in a run squaring off slightly on the sender&apos;s side. The{" "}
            <strong>Read confirmation is text, not a tick</strong>: no blue double-checks
            anywhere. And the <strong>status bar has no notch</strong> — a punch-hole camera
            centred at the top, with the clock on the left. Any of these details borrowed
            from an iPhone screenshot breaks the illusion immediately.
          </p>

          <h2>Everything you can customise</h2>
          <ul>
            <li>Contact name and avatar photo</li>
            <li>Light or dark mode, both matching the real app</li>
            <li>Unlimited messages, reorderable, either side</li>
            <li>Read label text — or remove it entirely</li>
            <li>Image attachments with captions</li>
            <li>Date marker at the top of the thread</li>
            <li>Status bar: clock, carrier, battery and signal (Android layout)</li>
            <li>Optional phone frame (off by default on this page)</li>
          </ul>

          <h2>What people use Android SMS mockups for</h2>
          <p>
            SMS screenshots appear in stories where the delivery channel itself is the point:
            a text that lands at the worst moment, a two-factor code, a message from an
            unknown number. Tutorials and security-awareness material use them constantly,
            because SMS is the one interface every phone owner recognises regardless of
            platform. And with Android holding the majority of global phone share, an
            iOS-only mockup collection misses half the audience — which is why this page
            exists.
          </p>
          <p>
            The line, as everywhere on this site, is intent. Illustrating, parodying,
            teaching and designing are fine. Using a fabricated message to deceive someone,
            harass a person, impersonate a company or institution, or fabricate evidence is
            not — and there are no templates here for fake bank, government, medical or legal
            notices. The <Link href="/acceptable-use">Acceptable Use Policy</Link> has the
            full boundary.
          </p>

          <h2>Why it runs entirely in your browser</h2>
          <p>
            Everything is rendered locally with plain HTML and CSS, and the PNG is generated
            on your device — nothing is transmitted, stored or logged. That is why the editor
            keeps working with your wifi switched off, and why there is no record of your
            mockups anywhere on our side.
          </p>

          <h2>Other generators</h2>
          <p>
            ChatMock covers the platforms people actually search for, one at a time: the{" "}
            <Link href="/whatsapp-chat-generator">WhatsApp chat generator</Link>, the{" "}
            <Link href="/fake-text-message-generator">iPhone text message generator</Link>,
            the <Link href="/group-chat-generator">group chat generator</Link>, the{" "}
            <Link href="/messenger-chat-generator">Messenger chat generator</Link>, the{" "}
            <Link href="/discord-chat-generator">Discord chat generator</Link>, the{" "}
            <Link href="/telegram-chat-generator">Telegram chat generator</Link>, the{" "}
            <Link href="/instagram-dm-generator">Instagram DM generator</Link>, the{" "}
            <Link href="/snapchat-chat-generator">Snapchat chat generator</Link> and the{" "}
            <Link href="/whatsapp-call-generator">WhatsApp call log generator</Link>. See
            the <Link href="/#generators">generator index</Link> for the full list.
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

      <SiteFooter trademark={androidSmsTheme.trademark} />
    </>
  );
}
