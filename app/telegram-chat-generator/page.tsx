import type { Metadata } from "next";
import Link from "next/link";
import GeneratorShell from "@/components/generator/GeneratorShell";
import Breadcrumb from "@/components/Breadcrumb";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs, site, pageName } from "@/lib/seo";
import { telegramTheme } from "@/lib/themes";

const SLUG = "telegram-chat-generator";
const CANONICAL = `/${SLUG}`;

export const metadata: Metadata = {
  title: "Free Telegram Chat Generator — No Signup, No Watermark",
  description:
    "Create realistic Telegram chat mockups in your browser. Edit names, avatars, checkmarks, day dividers and dark mode, then export a high-resolution PNG. Free, no signup, no watermark.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
    url: abs(CANONICAL),
    images: [abs(`/og/${SLUG}`)],
    title: "Free Telegram Chat Generator — No Signup, No Watermark",
    description:
      "Build realistic Telegram conversation mockups with green outgoing bubbles and checkmarks. Free, no signup, PNG export.",
  },
  twitter: {
    card: "summary_large_image",
    images: [abs(`/og/${SLUG}`)],
  },
};

const FAQ = [
  {
    q: "Is this Telegram chat generator free?",
    a: "Yes — every feature on this page is free, with no signup, no email wall, no daily limit and no watermark on your export. PNG download works at 1x, 2x and 3x resolution.",
  },
  {
    q: "What do the checkmarks mean?",
    a: "Telegram uses only two states: a single check means the message was sent to the server, a double check means it was read. There is no separate 'delivered' state like on WhatsApp — the editor lets you pick all three, and the renderer maps 'delivered' and 'read' to the double check, matching the real app.",
  },
  {
    q: "Why is the outgoing bubble light green?",
    a: "That is Telegram's signature. On the light iOS theme, your own bubbles are a pale green (#eeffde) while incoming bubbles are white; in dark mode your bubbles become steel blue (#2b5278). Generators that copy WhatsApp's colour scheme into a Telegram frame are immediately recognisable as fakes.",
  },
  {
    q: "Is my conversation uploaded to a server?",
    a: "No. The mockup is rendered entirely on your device and the PNG is generated in your browser, then saved directly to your downloads. Nothing you type ever leaves your computer or phone — disconnect from the internet after loading the page and the editor keeps working.",
  },
  {
    q: "What resolution can I export?",
    a: "1x (390px wide), 2x (780px) or 3x (1170px). For thumbnails and blog posts, 2x is usually the right balance of sharpness and file size. Use 3x for print or zoomed-in shots.",
  },
  {
    q: "Can I add images inside the chat?",
    a: "Yes. Any message can carry an image attachment with a caption. Uploaded images are read locally in your browser and rendered inside the bubble with Telegram's rounded corners.",
  },
  {
    q: "Can I use the mockups commercially?",
    a: "Yes, for legitimate creative work: videos, presentations, teaching material, fiction and design. You may not use them to deceive, defraud, harass, impersonate anyone or fabricate evidence. See the Acceptable Use Policy for the full boundary.",
  },
];

export default function TelegramGeneratorPage() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Telegram Chat Generator",
    url: abs(CANONICAL),
    applicationCategory: "DesignApplication",
    operatingSystem: "Any (web browser)",
    browserRequirements: "Requires JavaScript. Works in modern browsers.",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Signature light-green outgoing bubbles (#eeffde)",
      "Dark mode with steel-blue bubbles (#2b5278)",
      "Two-state checkmarks: sent (single) and read (double, green)",
      "Timestamps inside bubbles, bottom-right",
      "Image attachments with captions",
      "Day divider pills",
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
      { "@type": "ListItem", position: 2, name: "Telegram Chat Generator", item: abs(CANONICAL) },
    ],
  };

  return (
    <>
      <SiteHeader current={SLUG} />
      <JsonLd data={[webApp, faq, breadcrumb]} />

      <main className="mx-auto max-w-6xl px-5 pt-10">
        {/* 面包屑（与 JSON-LD BreadcrumbList 对应） */}
        <div className="mb-4">
          <Breadcrumb items={[{ name: "Home", href: "/" }, { name: pageName("telegram-chat-generator") }]} />
        </div>
        <div className="max-w-3xl">
          <h1 className="font-display text-[34px] sm:text-[42px] font-semibold tracking-tight leading-[1.1] text-foreground">
            Free Telegram Chat Generator
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-black/65">
            Build a realistic Telegram conversation mockup in your browser and download a
            high-resolution PNG — no signup, no watermark, no upload. Signature green
            outgoing bubbles, two-state checkmarks, day dividers, light and dark mode, and
            export at 1x, 2x or 3x.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[13.5px] text-black/55">
            <span>✓ No account required</span>
            <span>✓ No watermark, ever</span>
            <span>✓ Nothing leaves your device</span>
            <span>✓ Works on mobile</span>
          </div>
        </div>

        <div className="mt-8">
          <GeneratorShell platformId="telegram" />
        </div>

        <article className="prose-cm max-w-3xl mt-14">
          <h2>How to create a Telegram chat mockup in four steps</h2>
          <ol>
            <li>
              <strong>Set the contact.</strong> Type a name into <em>Contact → Name</em>, add
              a status line such as <code>online</code> or{" "}
              <code>last seen 5 minutes ago</code>, and upload an avatar if you want one.
              Without a photo, ChatMock draws a solid-colour initial circle like Telegram&apos;s
              default avatars.
            </li>
            <li>
              <strong>Write the conversation.</strong> Use <em>+ Alex</em> or <em>+ Me</em> to
              add messages, flip each one between the two sides, and reorder with the arrows.
              Uploading an image turns that message into a photo bubble with a caption.
            </li>
            <li>
              <strong>Set the checkmarks.</strong> For outgoing messages pick{" "}
              <em>Sent</em> (single check) or <em>Read</em> (double green check). Remember
              that Telegram has no delivered state — a conversation where every message sits
              at a single check reads as &ldquo;they have not opened the app&rdquo;, which is
              a useful look for specific scenes.
            </li>
            <li>
              <strong>Export.</strong> Choose 1x, 2x or 3x and hit <em>Download PNG</em>.
              Exports are plain screen captures by default — a real screenshot never
              includes the phone body. Tick <em>Phone frame</em> only when you want a
              device-mockup look for a thumbnail, slide or design.
            </li>
          </ol>

          <h2>What makes a Telegram screenshot actually look real</h2>
          <p>
            Telegram shares bubble mechanics with WhatsApp but nothing else, which is exactly
            why the two are so often confused by generators. Here are the values ChatMock
            uses, taken from the real app:
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
                <td>Chat background (wallpaper tone)</td>
                <td>
                  <code>#e7ebf0</code>
                </td>
                <td>
                  <code>#0e1621</code>
                </td>
              </tr>
              <tr>
                <td>Outgoing bubble</td>
                <td>
                  <code>#eeffde</code> — the signature pale green
                </td>
                <td>
                  <code>#2b5278</code> — steel blue
                </td>
              </tr>
              <tr>
                <td>Incoming bubble</td>
                <td>
                  <code>#ffffff</code>
                </td>
                <td>
                  <code>#182533</code>
                </td>
              </tr>
              <tr>
                <td>Read checkmarks</td>
                <td colSpan={2}>
                  Green, two states only (sent / read)
                </td>
              </tr>
              <tr>
                <td>Header</td>
                <td>
                  <code>#ffffff</code>, dark text
                </td>
                <td>
                  <code>#17212b</code>, white text
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            Three details do the heavy lifting. <strong>The pale green outgoing bubble</strong>{" "}
            is Telegram&apos;s most recognisable trait — WhatsApp&apos;s #d9fdd3 is close but
            not the same, and dark mode inverts completely to steel blue.{" "}
            <strong>Checkmarks have only two states</strong>: single for sent, double green
            for read — no delivered step. And <strong>the header is white in light mode</strong>{" "}
            with dark text, same family as WhatsApp&apos;s beige iPhone header; a green header on a
            Telegram screenshot is an instant giveaway.
          </p>

          <h2>Everything you can customise</h2>
          <ul>
            <li>Contact name, status line and avatar photo</li>
            <li>Light or dark mode, both matching the real app</li>
            <li>Unlimited messages, reorderable, with per-message timestamps</li>
            <li>Checkmarks: single (sent) or double green (read)</li>
            <li>Image attachments with captions</li>
            <li>Day divider pill text (Yesterday, July 28, anything)</li>
            <li>Status bar: clock, carrier, battery and signal</li>
            <li>Optional iPhone-style phone frame</li>
          </ul>

          <h2>What people use Telegram mockups for</h2>
          <p>
            Telegram scenes appear in crypto and tech explainer videos, privacy-themed
            sketches, tutorials that walk through channel conversations, and fiction that
            unfolds over messaging. The interface is clean and immediately recognisable to
            its (very large) user base, and the pale-green bubbles photograph well in video
            thumbnails — which is precisely why the details above matter: audiences notice
            when a &ldquo;Telegram&rdquo; screenshot has the wrong green.
          </p>
          <p>
            As everywhere on this site, the line is intent. Illustrating, parodying, teaching
            and designing are fine. Using a fabricated conversation to deceive someone,
            harass a person, impersonate someone or fabricate evidence is not — and there are
            no templates here for fake bank, government, medical or legal notices. The{" "}
            <Link href="/acceptable-use">Acceptable Use Policy</Link> has the full boundary.
          </p>

          <h2>Why it runs entirely in your browser</h2>
          <p>
            Everything is rendered locally with plain HTML and CSS, and the PNG is generated
            on your device — nothing is transmitted, stored or logged. That is why the editor
            keeps working with your wifi switched off, and why there is no gallery of staged
            conversations sitting on our servers.
          </p>

          <h2>Other generators</h2>
          <p>
            ChatMock covers the platforms people actually search for, one at a time: the{" "}
            <Link href="/whatsapp-chat-generator">WhatsApp chat generator</Link>, the{" "}
            <Link href="/fake-text-message-generator">iPhone text message generator</Link>,
            the <Link href="/group-chat-generator">group chat generator</Link>, the{" "}
            <Link href="/messenger-chat-generator">Messenger chat generator</Link> and the{" "}
            <Link href="/discord-chat-generator">Discord chat generator</Link> are all live.
            See the <Link href="/#generators">generator index</Link> for the full list.
          </p>

          <p>
            For a deeper walkthrough of the details above, read the full{" "}
            <Link href="/blog/telegram-chat-screenshot-guide">Telegram chat screenshot guide</Link> on the blog.
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

      <SiteFooter trademark={telegramTheme.trademark} />
    </>
  );
}
