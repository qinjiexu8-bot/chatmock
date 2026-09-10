import type { Metadata } from "next";
import Link from "next/link";
import GeneratorShell from "@/components/generator/GeneratorShell";
import Breadcrumb from "@/components/Breadcrumb";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs, site, pageName } from "@/lib/seo";
import { instagramDmTheme } from "@/lib/themes";

const SLUG = "instagram-dm-generator";
const CANONICAL = `/${SLUG}`;

export const metadata: Metadata = {
  title: "Free Instagram DM Generator — No Signup, No Watermark",
  description:
    "Create realistic Instagram direct message mockups in your browser. Gradient bubbles, seen status, dark mode and image messages, then export a high-resolution PNG. Free, no signup, no watermark.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
    url: abs(CANONICAL),
    images: [abs(`/og/${SLUG}`)],
    title: "Free Instagram DM Generator — No Signup, No Watermark",
    description:
      "Build realistic Instagram DM mockups with gradient bubbles and seen status. Free, no signup, PNG export.",
  },
  twitter: {
    card: "summary_large_image",
    images: [abs(`/og/${SLUG}`)],
  },
};

const FAQ = [
  {
    q: "Is this Instagram DM generator free?",
    a: "Yes — no signup, no email wall, no daily limit and no watermark on the export. Every editing feature, including image messages and dark mode, is free, and PNG export works at 1x, 2x and 3x resolution.",
  },
  {
    q: "Why is the outgoing bubble a gradient?",
    a: "Because that is how Instagram renders your own messages. Since the platform unified its chat themes, outgoing DM bubbles use a purple-to-pink gradient rather than a flat colour. Generators that use a plain blue or grey bubble for the sender side do not look like Instagram.",
  },
  {
    q: "What does the Seen indicator look like?",
    a: "Under your last outgoing message, Instagram shows a tiny version of the recipient's avatar next to the word Seen. This generator reproduces exactly that — a small round avatar plus the label — and the label text is editable if you want a different state or want to remove it.",
  },
  {
    q: "Why are there no timestamps next to each message?",
    a: "Instagram does not label individual messages. Time markers appear occasionally between message groups as small centred grey text. Stamping every bubble is the fastest way to make an Instagram DM screenshot look fake.",
  },
  {
    q: "Is my conversation uploaded to a server?",
    a: "No. The mockup is rendered entirely on your device, and the PNG is generated in your browser and saved straight to your downloads. Usernames, messages and uploaded images never leave your computer or phone — you can disconnect from the internet after loading the page and keep working.",
  },
  {
    q: "What resolution can I export?",
    a: "1x (390px wide), 2x (780px) or 3x (1170px). For thumbnails and posts, 2x is usually the sweet spot between sharpness and file size. Use 3x when the screenshot will be zoomed into or printed.",
  },
  {
    q: "Can I use the mockups commercially?",
    a: "Yes, for legitimate creative work: videos, thumbnails, presentations, teaching material, fiction and design. You may not use them to deceive, defraud, harass, impersonate anyone or fabricate evidence. The Acceptable Use Policy has the full boundary.",
  },
];

export default function InstagramDmGeneratorPage() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Instagram DM Generator",
    url: abs(CANONICAL),
    applicationCategory: "DesignApplication",
    operatingSystem: "Any (web browser)",
    browserRequirements: "Requires JavaScript. Works in modern browsers.",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Official gradient outgoing bubbles (purple → pink)",
      "Seen indicator with recipient mini-avatar",
      "Light and dark mode",
      "Image attachments rendered as rounded media bubbles",
      "Group time markers between messages",
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
      { "@type": "ListItem", position: 2, name: "Instagram DM Generator", item: abs(CANONICAL) },
    ],
  };

  return (
    <>
      <SiteHeader current={SLUG} />
      <JsonLd data={[webApp, faq, breadcrumb]} />

      <main className="mx-auto max-w-6xl px-5 pt-10">
        {/* 面包屑（与 JSON-LD BreadcrumbList 对应） */}
        <div className="mb-4">
          <Breadcrumb items={[{ name: "Home", href: "/" }, { name: pageName("instagram-dm-generator") }]} />
        </div>
        <div className="max-w-3xl">
          <h1 className="font-display text-[34px] sm:text-[42px] font-semibold tracking-tight leading-[1.1] text-foreground">
            Free Instagram DM Generator
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-black/65">
            Build a realistic Instagram direct message mockup in your browser and download a
            high-resolution PNG — no signup, no watermark, no upload. Signature gradient
            bubbles, the tiny-avatar Seen indicator, dark mode, and export at 1x, 2x or 3x.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[13.5px] text-black/55">
            <span>✓ No account required</span>
            <span>✓ No watermark, ever</span>
            <span>✓ Nothing leaves your device</span>
            <span>✓ Works on mobile</span>
          </div>
        </div>

        <div className="mt-8">
          <GeneratorShell platformId="instagram-dm" />
        </div>

        <article className="prose-cm max-w-3xl mt-14">
          <h2>How to create an Instagram DM mockup in four steps</h2>
          <ol>
            <li>
              <strong>Set the account.</strong> Type the username into{" "}
              <em>Contact → Name</em> — it renders in the header next to the avatar, the way
              Instagram shows the handle. Upload an avatar, or let ChatMock draw an
              Instagram-colour gradient initial circle.
            </li>
            <li>
              <strong>Write the conversation.</strong> Add messages with{" "}
              <em>+ Alex</em> or <em>+ Me</em>, flip each one between the two sides, and
              reorder with the arrows. Uploading an image turns that message into a rounded
              media bubble with an optional caption.
            </li>
            <li>
              <strong>Set the Seen indicator.</strong> Under <em>Contact → Delivery</em>, the
              label defaults to <code>Seen</code>. It renders under your last outgoing
              message with a tiny version of the recipient&apos;s avatar — clear the field to
              show a conversation they have not opened yet.
            </li>
            <li>
              <strong>Export.</strong> Pick 1x, 2x or 3x and hit <em>Download PNG</em>.
              Exports are plain screen captures by default — a real screenshot never
              includes the phone body. Tick <em>Phone frame</em> only when you want a
              device-mockup look for a post, thumbnail or slide.
            </li>
          </ol>

          <h2>What makes an Instagram DM screenshot actually look real</h2>
          <p>
            Instagram DMs are visually simple and unusually easy to get subtly wrong. Here
            are the values ChatMock uses, taken from the real app:
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
                  <code>#000000</code>
                </td>
              </tr>
              <tr>
                <td>Outgoing bubble</td>
                <td colSpan={2}>
                  Gradient <code>#a033ff → #e24aa2</code> — not a flat colour
                </td>
              </tr>
              <tr>
                <td>Incoming bubble</td>
                <td>
                  <code>#efefef</code>
                </td>
                <td>
                  <code>#262626</code>
                </td>
              </tr>
              <tr>
                <td>Bubble shape</td>
                <td colSpan={2}>
                  18px capsules, no tails, no corner narrowing between grouped messages
                </td>
              </tr>
              <tr>
                <td>Seen indicator</td>
                <td colSpan={2}>
                  Mini avatar + label under the last outgoing message only
                </td>
              </tr>
              <tr>
                <td>Timestamps</td>
                <td colSpan={2}>
                  Occasional centred markers between groups, never per bubble
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            Two details carry the realism. First, <strong>the gradient</strong>: outgoing
            bubbles fade from purple into pink, and that gradient survives in both light and
            dark mode — a flat blue sender bubble reads as Messenger, not Instagram. Second,{" "}
            <strong>the Seen indicator is an avatar, not text alone</strong>: a tiny round
            photo of the recipient appears next to the label under your last message. Text-only
            Seen lines are the most common tell in fake Instagram screenshots.
          </p>

          <h2>Everything you can customise</h2>
          <ul>
            <li>Username and avatar photo (header and Seen indicator)</li>
            <li>Light or dark mode, both matching the real app</li>
            <li>Unlimited messages, reorderable, either side</li>
            <li>Seen label text — or remove it entirely</li>
            <li>Image attachments with captions</li>
            <li>Group time marker text</li>
            <li>Status bar: clock, carrier, battery and signal</li>
            <li>Optional iPhone-style phone frame</li>
          </ul>

          <h2>What people use Instagram DM mockups for</h2>
          <p>
            Instagram threads dominate creator-adjacent video: brand-deal sketches,
            &ldquo;DMing my favourite artist&rdquo; formats, UGC course material showing how
            a collaboration request reads, and fiction that plays out over a creator&apos;s
            inbox. The audience knows the interface intimately, which cuts both ways — the
            screenshot reads instantly, and small errors read just as fast.
          </p>
          <p>
            The line, as everywhere on this site, is intent. Illustrating, parodying,
            teaching and designing are fine. Using a fabricated conversation to deceive
            someone, harass a person, impersonate a creator or brand, or fabricate evidence
            is not — and there are no templates here for fake bank, government, medical or
            legal notices. The <Link href="/acceptable-use">Acceptable Use Policy</Link> has
            the full boundary.
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
            <Link href="/discord-chat-generator">Discord chat generator</Link> and the{" "}
            <Link href="/telegram-chat-generator">Telegram chat generator</Link> are all
            live. See the <Link href="/#generators">generator index</Link> for the full list.
          </p>

          <p>
            For a deeper walkthrough of the details above, read the full{" "}
            <Link href="/blog/instagram-dm-screenshot-guide">Instagram DM screenshot guide</Link> on the blog.
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

      <SiteFooter trademark={instagramDmTheme.trademark} />
    </>
  );
}
