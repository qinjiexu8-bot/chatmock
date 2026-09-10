import type { Metadata } from "next";
import Link from "next/link";
import GeneratorShell from "@/components/generator/GeneratorShell";
import Breadcrumb from "@/components/Breadcrumb";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs, site, pageName } from "@/lib/seo";
import { textMessageTheme } from "@/lib/themes";

const SLUG = "fake-text-message-generator";
const CANONICAL = `/${SLUG}`;

export const metadata: Metadata = {
  title: "Free iPhone Text Message Generator — No Signup, No Watermark",
  description:
    "Create realistic iPhone iMessage and SMS text message mockups in your browser. Edit the contact, messages, delivery status and dark mode, then export a high-resolution PNG. Free, no signup, no watermark.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
    url: abs(CANONICAL),
    images: [abs(`/og/${SLUG}`)],
    title: "Free iPhone Text Message Generator — No Signup, No Watermark",
    description:
      "Create realistic iPhone text message mockups in your browser and export high-resolution PNGs. Free, no signup, nothing uploaded.",
  },
  twitter: {
    card: "summary_large_image",
    images: [abs(`/og/${SLUG}`)],
  },
};

const FAQ = [
  {
    q: "Is this iPhone text message generator free?",
    a: "Yes — completely. There is no signup, no email wall, no daily limit and no watermark on your export. PNG download at 1x, 2x or 3x resolution costs nothing.",
  },
  {
    q: "Does it make blue iMessage bubbles or green SMS bubbles?",
    a: "This generator renders iMessage-style blue bubbles, which is what most people mean when they search for an iPhone text screenshot. The green SMS variant follows a different layout and is planned as its own page — we would rather ship one correct style than one approximation of two.",
  },
  {
    q: "Why are there no timestamps on each message?",
    a: "Because the real app does not show them. iOS Messages displays a single timestamp header at the top of a conversation, then a small Delivered or Read line under the last outgoing message — not a time inside every bubble. Generators that stamp each bubble get this wrong, and it is one of the fastest tells of a fake screenshot.",
  },
  {
    q: "Is my conversation uploaded anywhere?",
    a: "No. The mockup is rendered on your device with plain HTML and CSS, and the PNG is generated in your browser and saved straight to your downloads. Names, messages and uploaded images never leave your computer or phone. You can verify this by loading the page and then disconnecting from the internet — everything keeps working.",
  },
  {
    q: "What resolution can I export?",
    a: "1x (390px wide), 2x (780px) or 3x (1170px). For YouTube thumbnails, blog posts and presentations, 2x is the sweet spot. Use 3x for print or when the screenshot will be zoomed into on screen.",
  },
  {
    q: "Can I change what the Delivered line says?",
    a: "Yes. The delivery field accepts any text — Delivered, Read, Sending, or empty if you want no status line at all, which is how a conversation looks right after the contact replies.",
  },
  {
    q: "Can I use the mockups commercially?",
    a: "Yes, for legitimate creative work: videos, presentations, course material, fiction and design. You may not use them to deceive, defraud, harass, impersonate anyone, or fabricate evidence. See the Acceptable Use Policy for the full boundary.",
  },
];

export default function TextMessageGeneratorPage() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "iPhone Text Message Generator",
    url: abs(CANONICAL),
    applicationCategory: "DesignApplication",
    operatingSystem: "Any (web browser)",
    browserRequirements: "Requires JavaScript. Works in modern browsers.",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "iMessage-style blue bubbles, light and dark mode",
      "Custom contact name and avatar",
      "Delivered / Read / Sending status line",
      "Image attachments with captions",
      "Authentic iOS details: 18px bubbles, tail on last message, no per-message timestamps",
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
      { "@type": "ListItem", position: 2, name: "iPhone Text Message Generator", item: abs(CANONICAL) },
    ],
  };

  return (
    <>
      <SiteHeader current={SLUG} />
      <JsonLd data={[webApp, faq, breadcrumb]} />

      <main className="mx-auto max-w-6xl px-5 pt-10">
        {/* 面包屑（与 JSON-LD BreadcrumbList 对应） */}
        <div className="mb-4">
          <Breadcrumb items={[{ name: "Home", href: "/" }, { name: pageName("fake-text-message-generator") }]} />
        </div>
        <div className="max-w-3xl">
          <h1 className="font-display text-[34px] sm:text-[42px] font-semibold tracking-tight leading-[1.1] text-foreground">
            Free iPhone Text Message Generator
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-black/65">
            Build a realistic iPhone text message mockup in your browser and download a
            high-resolution PNG — no signup, no watermark, no upload. Edit the contact,
            write the conversation, flip between light and dark mode, and export at 1x,
            2x or 3x.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[13.5px] text-black/55">
            <span>✓ No account required</span>
            <span>✓ No watermark, ever</span>
            <span>✓ Nothing leaves your device</span>
            <span>✓ Works on mobile</span>
          </div>
        </div>

        <div className="mt-8">
          <GeneratorShell platformId="text-message" />
        </div>

        <article className="prose-cm max-w-3xl mt-14">
          <h2>How to create an iPhone text message mockup in four steps</h2>
          <ol>
            <li>
              <strong>Set the contact.</strong> Type a name into{" "}
              <em>Contact → Name</em> and upload an avatar if you want one. Without a photo,
              ChatMock draws a neutral grey initial circle, matching how iOS renders contacts
              with no picture.
            </li>
            <li>
              <strong>Write the conversation.</strong> Add messages with{" "}
              <em>+ Alex</em> or <em>+ Me</em>, flip each one between the two sides, and
              reorder with the arrows. Uploading an image turns that message into a photo
              bubble — on iOS, photo messages have no background padding, which is exactly how
              this generator renders them.
            </li>
            <li>
              <strong>Set the delivery line.</strong> Under <em>Contact → Delivery</em> you can
              write <code>Delivered</code>, <code>Read</code>, <code>Sending</code> — or clear
              it entirely. The line only appears under the last outgoing message, the same
              rule the real app follows. Delete it when the other person has just replied;
              that detail alone makes a screenshot noticeably more convincing.
            </li>
            <li>
              <strong>Export.</strong> Pick 1x, 2x or 3x and hit <em>Download PNG</em>. Exports are plain screen captures by default — a real screenshot never
              includes the phone body. Tick <em>Phone frame</em> if you want a
              device-mockup look instead of a full-screen capture.
            </li>
          </ol>

          <h2>What makes an iPhone text screenshot actually look real</h2>
          <p>
            People look at this interface all day, so the errors are spotted instantly. Here
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
                <td>
                  <code>#0b84ff</code>
                </td>
                <td>
                  <code>#0b84ff</code>
                </td>
              </tr>
              <tr>
                <td>Incoming bubble</td>
                <td>
                  <code>#e9e9eb</code>
                </td>
                <td>
                  <code>#26262a</code>
                </td>
              </tr>
              <tr>
                <td>Bubble radius</td>
                <td colSpan={2}>
                  <code>18px</code> — not the 8–10px most clones use
                </td>
              </tr>
              <tr>
                <td>Delivery line</td>
                <td colSpan={2}>
                  Under the last outgoing message only, never inside bubbles
                </td>
              </tr>
              <tr>
                <td>Timestamps</td>
                <td colSpan={2}>
                  Once at the top of the conversation, never per message
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            Two structural details trip up almost every other generator. First,{" "}
            <strong>the bubble tail sits at the bottom, not the top</strong>: only the last
            message in a consecutive run gets the narrowed bottom corner. Second,{" "}
            <strong>iOS Messages has no per-message timestamps</strong> — one date line at the
            top of the thread, one Delivered/Read line under the last outgoing bubble, and
            nothing else. A time inside every bubble is the single fastest tell of a fake
            iPhone screenshot.
          </p>

          <h2>Blue iMessage versus green SMS</h2>
          <p>
            On iPhone, the bubble colour encodes the transport: blue means iMessage (data,
            Apple&apos;s own service), green means SMS or MMS (carrier network). That
            distinction carries meaning in the screenshot — a conversation full of green
            bubbles implies an Android contact or a dead signal, blue implies another iPhone
            user. This generator renders the blue iMessage style; the green SMS variant is
            planned as a separate page with its own layout rules, because the two are not a
            simple colour swap.
          </p>

          <h2>Everything you can customise</h2>
          <ul>
            <li>Contact name and avatar photo</li>
            <li>Light or dark mode, both matching the real app</li>
            <li>Unlimited messages, reorderable, either side</li>
            <li>Delivery line text: Delivered, Read, Sending, or removed</li>
            <li>Image attachments with captions</li>
            <li>Date line at the top of the thread</li>
            <li>Status bar: clock, carrier, battery and signal</li>
            <li>Optional iPhone-style phone frame with the notch</li>
          </ul>

          <h2>What people use these mockups for</h2>
          <p>
            Mostly legitimate creative work. Creators stage the setup of a story without
            publishing anyone&apos;s real messages. Designers show how a notification or reply
            flow reads in a familiar shell. Teachers build dialogue exercises. Screenwriters
            draft the scenes that play out over text. What they all have in common is that
            the audience understands the conversation is illustrative.
          </p>
          <p>
            Where it crosses the line is intent. A mockup used to illustrate, parody or teach
            is fine; the same image used to make someone believe something happened that did
            not — to fake evidence, to impersonate a person or institution, to mislead — is
            not, and we do not want that traffic. The{" "}
            <Link href="/acceptable-use">Acceptable Use Policy</Link> spells out the boundary,
            and the site deliberately offers no templates for bank, government, medical or
            legal notices.
          </p>

          <h2>Why it runs entirely in your browser</h2>
          <p>
            Privacy first: your conversation never touches a server, so there is no database
            of staged chats to leak. Speed second: rendering locally means the preview updates
            as you type and the export is generated by your own machine. You can load this
            page, turn off your wifi, and keep working — that is the proof.
          </p>

          <h2>Other generators</h2>
          <p>
            Looking for a different platform? The{" "}
            <Link href="/whatsapp-chat-generator">WhatsApp chat generator</Link> is live,
            including dark mode, blue ticks and image messages — and so are the{" "}
            <Link href="/group-chat-generator">group chat generator</Link> with coloured
            sender names and the{" "}
            <Link href="/messenger-chat-generator">Messenger chat generator</Link>. See the{" "}
            <Link href="/#generators">generator index</Link> for the full list.
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

      <SiteFooter trademark={textMessageTheme.trademark} />
    </>
  );
}
