import type { Metadata } from "next";
import Link from "next/link";
import GeneratorShell from "@/components/generator/GeneratorShell";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs, site } from "@/lib/seo";
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
    title: "Free Snapchat Chat Generator — No Signup, No Watermark",
    description:
      "Build realistic Snapchat conversation mockups with the yellow header and Delivered status. Free, no signup, PNG export.",
  },
  twitter: { card: "summary_large_image" },
};

const FAQ = [
  {
    q: "Is the whole Snapchat chat screen yellow?",
    a: "No — and this is the most common mistake in fake Snapchat screenshots. The signature yellow (#fffc00) appears in the header bar and the app's main screens, but the conversation area itself is white in light mode and pure black in dark mode. This generator gets that split right.",
  },
  {
    q: "Is this Snapchat chat generator free?",
    a: "Yes — every feature is free, with no signup, no email wall, no daily limit and no watermark on your export. PNG download works at 1x, 2x and 3x resolution.",
  },
  {
    q: "Why does Delivered appear under my messages?",
    a: "Snapchat shows a small grey Delivered label under outgoing messages once they reach the recipient's device — it is part of the interface, not an extra. The label is editable in the editor, so you can remove it or replace it for specific scenes.",
  },
  {
    q: "Is my conversation uploaded to a server?",
    a: "No. The mockup is rendered entirely on your device, and the PNG is generated in your browser and saved directly to your downloads. Usernames, messages and uploaded images never leave your computer or phone — you can disconnect from the internet after loading the page and keep working.",
  },
  {
    q: "What resolution can I export?",
    a: "1x (390px wide), 2x (780px) or 3x (1170px). For thumbnails and posts, 2x is usually the sweet spot between sharpness and file size. Use 3x when the screenshot will be zoomed into or printed.",
  },
  {
    q: "Can I add images inside the chat?",
    a: "Yes. Any message can carry an image attachment with a caption. Uploaded images are read locally in your browser and rendered as rounded media bubbles.",
  },
  {
    q: "Can I use the mockups commercially?",
    a: "Yes, for legitimate creative work: videos, thumbnails, presentations, teaching material, fiction and design. You may not use them to deceive, defraud, harass, impersonate anyone or fabricate evidence. The Acceptable Use Policy has the full boundary.",
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
        <div className="max-w-3xl">
          <h1 className="text-[34px] sm:text-[42px] font-semibold tracking-tight leading-[1.1] text-[#0f1c17]">
            Free Snapchat Chat Generator
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-black/65">
            Build a realistic Snapchat conversation mockup in your browser and download a
            high-resolution PNG — no signup, no watermark, no upload. Signature yellow
            header, lavender outgoing bubbles, the Delivered label, dark mode, and export at
            1x, 2x or 3x.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[13.5px] text-black/55">
            <span>✓ No account required</span>
            <span>✓ No watermark, ever</span>
            <span>✓ Nothing leaves your device</span>
            <span>✓ Works on mobile</span>
          </div>
        </div>

        <div className="mt-8">
          <GeneratorShell platformId="snapchat" />
        </div>

        <article className="prose-cm max-w-3xl mt-14">
          <h2>How to create a Snapchat chat mockup in four steps</h2>
          <ol>
            <li>
              <strong>Set the contact.</strong> Type the name into{" "}
              <em>Contact → Name</em> — it renders in the yellow header. Upload an avatar, or
              let ChatMock draw a yellow initial circle that reads like a Bitmoji placeholder.
            </li>
            <li>
              <strong>Write the conversation.</strong> Add messages with{" "}
              <em>+ Emma</em> or <em>+ Me</em>, flip each one between the two sides, and
              reorder with the arrows. Uploading an image turns that message into a rounded
              media bubble with a caption.
            </li>
            <li>
              <strong>Set the Delivered label.</strong> Under <em>Contact → Delivery</em>, the
              label defaults to <code>Delivered</code>. It appears under your outgoing
              messages in small grey text — clear it or replace it if your scene needs a
              different state.
            </li>
            <li>
              <strong>Export.</strong> Pick 1x, 2x or 3x and hit <em>Download PNG</em>.
              Untick <em>Phone frame</em> when you are compositing the screenshot into a
              thumbnail, post or slide.
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
            <li>Status bar: clock, carrier, battery and signal</li>
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
            The line, as everywhere on this site, is intent. Illustrating, parodying,
            teaching and designing are fine. Using a fabricated conversation to deceive
            someone, harass a person, impersonate someone or fabricate evidence is not — and
            there are no templates here for fake bank, government, medical or legal notices.
            The <Link href="/acceptable-use">Acceptable Use Policy</Link> has the full
            boundary.
          </p>

          <h2>Why it runs entirely in your browser</h2>
          <p>
            Everything is rendered locally with plain HTML and CSS, and the PNG is generated
            on your device — nothing is transmitted, stored or logged. That is why the editor
            keeps working with your wifi switched off, and why there is no database of staged
            conversations anywhere on our side.
          </p>

          <h2>Other generators</h2>
          <p>
            ChatMock covers the platforms people actually search for, one at a time: the{" "}
            <Link href="/whatsapp-chat-generator">WhatsApp chat generator</Link>, the{" "}
            <Link href="/fake-text-message-generator">iPhone text message generator</Link>,
            the <Link href="/group-chat-generator">group chat generator</Link>, the{" "}
            <Link href="/messenger-chat-generator">Messenger chat generator</Link>, the{" "}
            <Link href="/discord-chat-generator">Discord chat generator</Link>, the{" "}
            <Link href="/telegram-chat-generator">Telegram chat generator</Link> and the{" "}
            <Link href="/instagram-dm-generator">Instagram DM generator</Link> are all live.
            See the <Link href="/#generators">generator index</Link> for the full list.
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
