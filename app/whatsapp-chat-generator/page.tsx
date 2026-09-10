import type { Metadata } from "next";
import Link from "next/link";
import GeneratorShell from "@/components/generator/GeneratorShell";
import Breadcrumb from "@/components/Breadcrumb";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs, site, pageName } from "@/lib/seo";
import { whatsappTheme } from "@/lib/themes";

const SLUG = "whatsapp-chat-generator";
const CANONICAL = `/${SLUG}`;

export const metadata: Metadata = {
  title: "Free WhatsApp Chat Generator — No Signup, No Watermark",
  description:
    "Create realistic WhatsApp chat mockups in your browser. Edit names, avatars, blue ticks, timestamps and dark mode, then export a high-resolution PNG. Free forever, no signup, no watermark.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
    url: abs(CANONICAL),
    images: [abs(`/og/${SLUG}`)],
    title: "Free WhatsApp Chat Generator — No Signup, No Watermark",
    description:
      "Create realistic WhatsApp chat mockups in your browser and export high-resolution PNGs. Free, no signup, no watermark, nothing uploaded.",
  },
  twitter: {
    card: "summary_large_image",
    images: [abs(`/og/${SLUG}`)],
  },
};

const FAQ = [
  {
    q: "Is this WhatsApp chat generator really free?",
    a: "Yes. Every feature on this page is free, and we do not put a watermark on your export. There is no signup, no email wall and no daily limit. You can also export at 1x, 2x or 3x resolution at no cost.",
  },
  {
    q: "Do I need to install anything?",
    a: "No. Everything runs directly in your browser tab using HTML and CSS — there is no app to download and no plugin to install. It works on Chrome, Safari, Firefox and Edge, on desktop and mobile.",
  },
  {
    q: "Is my conversation uploaded to a server?",
    a: "No. The mockup is rendered entirely on your device, and the PNG is generated locally and downloaded as a file. Nothing you type — names, messages or uploaded avatars — ever leaves your browser. You can verify this by opening the page and disconnecting from the internet; the generator keeps working.",
  },
  {
    q: "What resolution can I export?",
    a: "You can export at 1x (390px wide), 2x (780px) or 3x (1170px). For YouTube thumbnails, blog headers and slide decks, 2x is usually the right balance of sharpness and file size. Use 3x if the image will be printed or zoomed into.",
  },
  {
    q: "Can I add images inside the chat bubbles?",
    a: "Yes. Each message can carry an image attachment. Uploaded images are read locally with the FileReader API and displayed inside the bubble with WhatsApp's rounded corners, above any caption text you add.",
  },
  {
    q: "Can I make group chats?",
    a: "Yes — use the dedicated group chat generator. It supports multiple participants with the coloured sender names WhatsApp uses in groups, per-member names and timestamps, and the same export options as this page.",
  },
  {
    q: "Can I use the mockups commercially?",
    a: "Yes, for legitimate purposes: YouTube videos, client presentations, app store screenshots, course material, fiction and design work. You may not use them to deceive, defraud, harass, impersonate or fabricate evidence. See our Acceptable Use Policy for the full boundary.",
  },
];

export default function WhatsAppGeneratorPage() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "WhatsApp Chat Generator",
    url: abs(CANONICAL),
    applicationCategory: "DesignApplication",
    operatingSystem: "Any (web browser)",
    browserRequirements: "Requires JavaScript. Works in modern browsers.",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Light and dark mode",
      "Custom contact name, status and avatar",
      "Blue tick read receipts (sent / delivered / read)",
      "Per-message timestamps and date separator",
      "Image attachments inside bubbles",
      "Status bar time, carrier, battery and signal",
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
      { "@type": "ListItem", position: 2, name: "WhatsApp Chat Generator", item: abs(CANONICAL) },
    ],
  };

  return (
    <>
      <SiteHeader current={SLUG} />
      <JsonLd data={[webApp, faq, breadcrumb]} />

      <main className="mx-auto max-w-6xl px-5 pt-10">
        {/* 面包屑（与 JSON-LD BreadcrumbList 对应） */}
        <div className="mb-4">
          <Breadcrumb items={[{ name: "Home", href: "/" }, { name: pageName("whatsapp-chat-generator") }]} />
        </div>
        {/* ---------------- H1 + 导语 ---------------- */}
        <div className="max-w-3xl">
          <h1 className="font-display text-[34px] sm:text-[42px] font-semibold tracking-tight leading-[1.1] text-foreground">
            Free WhatsApp Chat Generator
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-black/65">
            Build a realistic WhatsApp conversation mockup in your browser and download a
            high-resolution PNG — no signup, no watermark, no upload. Edit the contact name,
            status text, avatar, message bubbles, blue ticks and timestamps, switch between
            light and dark mode, and export at 1x, 2x or 3x.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[13.5px] text-black/55">
            <span>✓ No account required</span>
            <span>✓ No watermark, ever</span>
            <span>✓ Nothing leaves your device</span>
            <span>✓ Works on mobile</span>
          </div>
        </div>

        {/* ---------------- 工具 ---------------- */}
        <div className="mt-8">
          <GeneratorShell platformId="whatsapp" />
        </div>

        {/* ---------------- 正文内容（low value content 防线） ---------------- */}
        <article className="prose-cm max-w-3xl mt-14">
          <h2>How to create a WhatsApp chat mockup in four steps</h2>
          <ol>
            <li>
              <strong>Set the contact.</strong> Type the name into the <em>Contact → Name</em>{" "}
              field, write a status line such as <code>online</code> or{" "}
              <code>last seen today at 20:14</code>, and upload an avatar if you want one.
              Without an avatar, ChatMock draws a neutral grey initial circle, the same way
              WhatsApp does for contacts without a profile photo.
            </li>
            <li>
              <strong>Write the conversation.</strong> Use <em>+ Alex</em> or <em>+ Me</em> to
              add messages. Each message can be flipped between the two sides with the sender
              toggle, reordered with the arrows, and given its own timestamp. Uploading an
              image turns that message into a photo bubble with a caption.
            </li>
            <li>
              <strong>Set the read receipts.</strong> For outgoing messages you can pick{" "}
              <em>Sent</em> (one grey tick), <em>Delivered</em> (two grey ticks) or{" "}
              <em>Read</em> (two blue ticks). This detail is what most mockup tools get wrong,
              and it is the first thing a viewer subconsciously checks.
            </li>
            <li>
              <strong>Export.</strong> Choose 1x, 2x or 3x and hit <em>Download PNG</em>. Exports are plain screen captures by default — a real screenshot never
              contains the phone body. Tick <em>Phone frame</em> only when you want a
              device-mockup look for a thumbnail, slide or composite design.
            </li>
          </ol>

          <h2>What makes a WhatsApp mockup actually look real</h2>
          <p>
            Most generators approximate the interface and hope nobody looks closely. WhatsApp
            users see this screen hundreds of times a day, so the tells are immediate: the
            wrong header, the wrong bubble colour, a tick that is the wrong shade of blue. On
            an iPhone the navigation bar is not green — it picks up the beige of the wallpaper,
            which is the single most-cloned mistake in WhatsApp mockups. Here are the values
            ChatMock uses, taken from the real app:
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
                  <code>#efeae2</code>
                </td>
                <td>
                  <code>#0b141a</code>
                </td>
              </tr>
              <tr>
                <td>Header bar (iPhone)</td>
                <td>
                  <code>#efeae2</code>
                </td>
                <td>
                  <code>#202c33</code>
                </td>
              </tr>
              <tr>
                <td>Incoming bubble</td>
                <td>
                  <code>#ffffff</code>
                </td>
                <td>
                  <code>#202c33</code>
                </td>
              </tr>
              <tr>
                <td>Outgoing bubble</td>
                <td>
                  <code>#d9fdd3</code>
                </td>
                <td>
                  <code>#005c4b</code>
                </td>
              </tr>
              <tr>
                <td>Blue ticks</td>
                <td>
                  <code>#53bdeb</code>
                </td>
                <td>
                  <code>#53bdeb</code>
                </td>
              </tr>
              <tr>
                <td>Timestamp / secondary text</td>
                <td>
                  <code>#667781</code>
                </td>
                <td>
                  <code>#8696a0</code>
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            Three more details matter as much as colour. <strong>Bubble radius is 8px</strong>,
            not the 16–18px pill shape most clones use. <strong>Grouped messages lose their
            tail</strong> — only the first bubble in a consecutive run from the same sender gets
            the little corner notch, and its top corner is squared off where the notch sits.
            And <strong>bubbles cap at roughly 75% of the chat width</strong>; let them run
            wider and the screenshot instantly reads as fake.
          </p>

          <h2>Everything you can customise</h2>
          <ul>
            <li>Contact name, status line and avatar photo</li>
            <li>Light or dark mode (both match the real app, not an inversion filter)</li>
            <li>Unlimited messages, reorderable, with per-message timestamps</li>
            <li>Read receipts: sent, delivered or read</li>
            <li>Image attachments with captions</li>
            <li>Date separator text (TODAY, YESTERDAY, or any label you need)</li>
            <li>Status bar: clock, carrier name, battery percentage and signal strength</li>
            <li>Optional iPhone-style phone frame with the notch</li>
          </ul>

          <h2>What people use these mockups for</h2>
          <p>
            The honest answer: mostly legitimate, boring, creative work. YouTubers and TikTok
            creators use them to stage the setup of a story without doxxing a real conversation.
            Product designers drop them into wireframe presentations to show a messaging flow
            in a familiar shell. Teachers build dialogue exercises. Novelists and screenwriters
            draft scenes that play out over text. Support teams document what a good reply looks
            like without pasting a customer&apos;s real messages into a slide.
          </p>
          <p>
            Where it crosses the line is intent. A mockup used to illustrate, parody or teach is
            fine. The same image used to make someone believe something happened that did not —
            to mislead a friend, to fake evidence, to impersonate a person or an institution —
            is not, and we do not want that traffic. Our{" "}
            <Link href="/acceptable-use">Acceptable Use Policy</Link> spells out the boundary,
            and the tool itself refuses to be a bank-notice or legal-document factory.
          </p>

          <h2>Why it runs entirely in your browser</h2>
          <p>
            Two reasons. Privacy first: your conversation never travels to a server, so there is
            no database of other people&apos;s staged chats to leak. Speed second: rendering
            locally means the preview updates as you type, with no round trip, and the export
            is generated by your own GPU. The side effect is that you can load this page and
            then turn off your wifi — the generator keeps working perfectly.
          </p>

          <h2>Other generators</h2>
          <p>
            ChatMock is expanding one platform at a time, because a mockup is only convincing
            when the small details are right. Also live: the{" "}
            <Link href="/fake-text-message-generator">iPhone text message generator</Link>,{" "}
            the <Link href="/group-chat-generator">group chat generator</Link> and the{" "}
            <Link href="/messenger-chat-generator">Messenger chat generator</Link>. See the{" "}
            <Link href="/#generators">generator index</Link> for the full list.
          </p>

          <p>
            For a deeper walkthrough of the details above, read the full{" "}
            <Link href="/blog/how-to-make-a-fake-whatsapp-chat">WhatsApp chat screenshot guide</Link> on the blog.
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

      <SiteFooter trademark={whatsappTheme.trademark} />
    </>
  );
}
