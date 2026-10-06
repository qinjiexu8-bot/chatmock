import type { Metadata } from "next";
import Link from "next/link";
import GeneratorShell from "@/components/generator/GeneratorShell";
import Breadcrumb from "@/components/Breadcrumb";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs, site, pageName } from "@/lib/seo";
import { androidSmsTheme } from "@/lib/themes";

const SLUG = "android-sms-generator";
const CANONICAL = `/${SLUG}`;

export const metadata: Metadata = {
  title: "Free Android SMS Generator — Google Messages Mockup",
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
    q: "Is the Android SMS generator free?",
    a: "Yes — every control is open, with no signup, no email step, no cap and no watermark on the exported file.",
  },
  {
    q: "Which messaging app does this imitate?",
    a: "Google Messages, the default SMS and RCS app on most Android phones, with its Material Design language: large-radius bubbles, Google blue for outgoing messages, a clean background and a pill-shaped input. Samsung's own Messages app looks different and is not covered here yet.",
  },
  {
    q: "Where does the Android status bar put the clock?",
    a: "On the left, with signal and battery on the right and no camera cutout — because a real screenshot never captures the hardware hole. An iPhone-style status bar on an Android mockup is an instant giveaway, so this page draws the Android one.",
  },
  {
    q: "What does the Read note under a message mean?",
    a: "Under RCS, Google Messages shows a Read confirmation below the last outgoing message once the recipient has seen it. The label is editable — write Read with a time, use just Delivered, or clear it for a message that has not been opened yet.",
  },
  {
    q: "Why is the phone frame handled differently here?",
    a: "Because an Android interface inside an iPhone-style handset would look wrong, this page keeps the frame off and shows a bare screenshot edge by default, exactly as a real capture would appear. You can still switch the frame on if a composition calls for it.",
  },
  {
    q: "Why are the bubbles rounder than on iPhone?",
    a: "Material Design uses larger capsules — around 20px — and the last bubble in a run narrows to about 6px on the sender's side. Borrowing iMessage's 18px geometry for an Android mockup is one of those details that quietly breaks the illusion.",
  },
  {
    q: "Does my SMS text get sent anywhere?",
    a: "No. The thread is composed and the PNG generated entirely on your own device, so the names, numbers and messages stay in the browser and the file goes straight to your downloads. Disconnect after the page loads and it keeps working.",
  },
  {
    q: "Can I use the mockups commercially?",
    a: "Yes, across ordinary creative and educational work: explainer videos, slide decks, lesson material, short fiction and design comps. Faking evidence, impersonating a company, or otherwise deceiving people is off-limits, and the Acceptable Use Policy spells that out.",
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
      "Android status bar: clock left, icons right, no camera cutout",
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
        {/* 面包屑（与 JSON-LD BreadcrumbList 对应） */}
        <div className="mb-4">
          <Breadcrumb items={[{ name: "Home", href: "/" }, { name: pageName("android-sms-generator") }]} />
        </div>
        <div className="max-w-3xl">
          <h1 className="font-display text-[34px] sm:text-[42px] font-semibold tracking-tight leading-[1.1] text-foreground">
            Free Android SMS Generator
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-black/65">
            Build a realistic Google Messages conversation mockup in your browser and
            download a high-resolution PNG — no signup, no watermark, no upload. Material
            blue bubbles, RCS Read receipts, an Android status bar with the clock on the left,
            and export at 1x, 2x or 3x.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[13.5px] text-black/55">
            <span>✓ Free with no email gate</span>
            <span>✓ No watermark added</span>
            <span>✓ Material 20px capsules</span>
            <span>✓ Clock-left Android status bar</span>
          </div>
        </div>

        <div className="mt-8">
          <GeneratorShell platformId="android-sms" />
        </div>

        <article className="prose-cm max-w-3xl mt-14">
          <h2>How to create an Android SMS mockup in four steps</h2>
          <ol>
            <li>
              <strong>Set the contact.</strong> Type the name into <em>Contact → Name</em> and
              add an avatar. With no photo, ChatMock draws the blue initial circle Google
              Messages uses for a contact without a picture.
            </li>
            <li>
              <strong>Write the conversation.</strong> <em>+ Alex</em> and <em>+ Me</em> add
              bubbles and the sender toggle flips their side. Google Messages uses wide 20px
              capsules, and the final bubble in a run squares off slightly on the sender&apos;s
              side; a photo attaches as a rounded media bubble with a caption.
            </li>
            <li>
              <strong>Set the Read label.</strong> <em>Contact → Delivery</em> starts at{" "}
              <code>Read</code>, printed under your last outgoing message the way RCS confirms
              it. Blank it out for a message that has not been seen yet.
            </li>
            <li>
              <strong>Export.</strong> Choose 2x for most on-screen uses, 3x if the shot will
              be enlarged or printed, and download. The frame is off by default here, since an
              Android screen inside an iPhone-style shell would look wrong, but the{" "}
              <em>Phone frame</em> toggle is there if a composition needs the device outline.
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
                  Android style: clock on the left, signal and battery on the right, no camera cutout
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            The tells here are structural. Google Messages bubbles are{" "}
            <strong>Material Design capsules</strong> — larger radius than iMessage, with the
            last message in a run squaring off slightly on the sender&apos;s side. The{" "}
            <strong>Read confirmation is text, not a tick</strong>: no blue double-checks
            anywhere. And the <strong>status bar is a clean rectangle</strong> — clock on the left, signal and battery on the right, and no camera cutout, because a real screenshot never captures the hardware hole. Any of these details borrowed
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
            <li>Status bar: clock, battery and signal (Android layout)</li>
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
            The deciding factor, as everywhere on ChatMock, is intent. Mockups built to
            illustrate, to parody, to teach or to design are welcome; a fabricated message used
            to deceive, to harass, to impersonate a company or institution, or to fake evidence
            is not. No bank, government, medical or legal notice templates are offered here,
            and the <Link href="/acceptable-use">Acceptable Use Policy</Link> lays the whole
            boundary out.
          </p>

          <h2>Nothing is sent from this page</h2>
          <p>
            The contact, the Material bubbles and the Read line are drawn with plain HTML and CSS
            on your own device, and the PNG is encoded there before it is saved. Since nothing is
            transmitted or stored, the editor runs happily offline — load the page first, then
            cut the connection as a test.
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
            <Link href="/whatsapp-call-generator">WhatsApp call log generator</Link>. Android
            holds the majority of global phone share, so if an iOS-only mockup would miss half
            your audience, the{" "}
            <Link href="/blog/fake-text-message-on-iphone-and-android">iPhone &amp; Android text message guide</Link>{" "}
            covers both sides.
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
