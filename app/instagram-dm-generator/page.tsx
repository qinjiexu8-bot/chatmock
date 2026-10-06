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
    q: "Is the Instagram DM generator free?",
    a: "It is. There is no signup, no email step, no limit on how many DMs you mock up and no watermark on the export — gradient bubbles, the Seen marker and dark mode are all included at no cost.",
  },
  {
    q: "Why is the sender's bubble a gradient?",
    a: "Because Instagram draws your own messages that way. Since the platform unified its chat themes, outgoing DMs fade from purple to pink instead of using a flat colour, and a plain blue or grey sender bubble reads as some other app entirely.",
  },
  {
    q: "What does the Seen marker look like?",
    a: "Under your last outgoing message Instagram places a tiny copy of the recipient's avatar beside the word Seen. This editor reproduces exactly that — a small round photo plus the label — and the label text can be edited or cleared if your scene needs a different state.",
  },
  {
    q: "Why is there no timestamp beside each DM?",
    a: "Instagram does not label individual messages. Time markers appear now and then between groups of messages as small centred grey text. Stamping a time onto every bubble is the quickest way to make a DM screenshot read as fake.",
  },
  {
    q: "Does the gradient survive dark mode?",
    a: "Yes — the purple-to-pink fade stays in both light and dark themes, which is a detail generators that merely invert their palette miss. It is also the clearest way to tell an Instagram DM apart from a Messenger thread at a glance.",
  },
  {
    q: "Does the text of my DM get uploaded anywhere?",
    a: "Nowhere. The mockup is drawn in your browser and the PNG is encoded on your own device before it reaches your downloads. Usernames, messages and any image you add stay local, so switching off your wifi after the page opens changes nothing.",
  },
  {
    q: "How should the username render?",
    a: "As a handle in the header, sitting next to the avatar the way Instagram shows an account. Type the name without the @ if you prefer, upload a picture, or let ChatMock fall back to a gradient initial circle like the default avatar.",
  },
  {
    q: "Am I allowed to use DM mockups commercially?",
    a: "For legitimate creative work — videos, thumbnails, presentations, teaching, fiction, design — yes. Deceiving someone, impersonating a creator or a brand, or fabricating evidence is not acceptable, and the Acceptable Use Policy sets out that line.",
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
            <span>✓ Completely free, no signup</span>
            <span>✓ Export is watermark-free</span>
            <span>✓ Purple-to-pink gradient bubbles</span>
            <span>✓ Seen marker with mini avatar</span>
          </div>
        </div>

        <div className="mt-8">
          <GeneratorShell platformId="instagram-dm" />
        </div>

        <article className="prose-cm max-w-3xl mt-14">
          <h2>How to create an Instagram DM mockup in four steps</h2>
          <ol>
            <li>
              <strong>Set the account.</strong> Put the username in <em>Contact → Name</em> —
              it sits in the header beside the avatar, exactly as Instagram prints a handle.
              Upload a picture, or keep the Instagram-coloured gradient initial circle ChatMock
              draws by default.
            </li>
            <li>
              <strong>Write the DMs.</strong> <em>+ Alex</em> and <em>+ Me</em> add messages and
              the sender toggle swaps sides. Instagram stacks a run of messages from one person
              without narrowing the corners, so the capsules simply repeat at a steady width.
              Images render as rounded media bubbles with an optional caption.
            </li>
            <li>
              <strong>Set the Seen marker.</strong> Under <em>Contact → Delivery</em> the label
              defaults to <code>Seen</code>, and it draws under your last outgoing message next
              to a miniature of the recipient&apos;s avatar. Empty the field and the thread
              reads as one they have not opened.
            </li>
            <li>
              <strong>Export.</strong> Pick a multiplier first: 2x suits the tall, portrait
              framing Instagram itself uses, 1x is enough for a quick draft and 3x covers
              anything that will be blown up or printed. Leave <em>Phone frame</em> off for
              an ordinary screenshot, and switch it on when the DM has to sit inside a phone
              for a Story graphic or a slide.
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
            <li>Status bar: clock, battery and signal</li>
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
            Intent, not the image itself, decides whether a DM mockup is harmless. Parody,
            illustration, teaching and design work are all welcome; a fabricated exchange used
            to deceive, to harass someone, to impersonate a creator or a brand, or to invent
            evidence is not. This site carries no templates for bank, government, medical or
            legal notices — the{" "}
            <Link href="/acceptable-use">Acceptable Use Policy</Link> explains the boundary.
          </p>

          <h2>Your handle never touches a server</h2>
          <p>
            The username, the avatar and the whole DM thread stay inside the browser: the layout
            is drawn with plain HTML and CSS and the PNG is generated on your own device. Turn
            off your connection once the page has loaded and the editor carries on — proof that
            no handle, message or photo was posted anywhere.
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
            live. Two worth a look from here: the Discord page, where messages have no
            bubbles at all, and the Telegram page, where the checkmarks come in only two
            states.
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
