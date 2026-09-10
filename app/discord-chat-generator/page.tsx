import type { Metadata } from "next";
import Link from "next/link";
import GeneratorShell from "@/components/generator/GeneratorShell";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs, site } from "@/lib/seo";
import { discordTheme } from "@/lib/themes";

const SLUG = "discord-chat-generator";
const CANONICAL = `/${SLUG}`;

export const metadata: Metadata = {
  title: "Free Discord Chat Generator — Server Message Mockups",
  description:
    "Create realistic Discord server conversation mockups in your browser. Edit channel name, usernames, role colours and dark mode, then export a high-resolution PNG. Free, no signup, no watermark.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
    url: abs(CANONICAL),
    images: [abs(`/og/${SLUG}`)],
    title: "Free Discord Chat Generator — Server Message Mockups",
    description:
      "Build realistic Discord channel message mockups with coloured usernames and avatars. Free, no signup, PNG export.",
  },
  twitter: {
    card: "summary_large_image",
    images: [abs(`/og/${SLUG}`)],
  },
};

const FAQ = [
  {
    q: "Is this Discord chat generator free?",
    a: "Yes — no signup, no email wall, no daily limit and no watermark on the export. Every editing feature, including role colours and image attachments, is free, and PNG export works at 1x, 2x and 3x.",
  },
  {
    q: "Why do Discord messages not look like chat bubbles?",
    a: "Because they are not. Discord renders messages as full-width rows: a 40px avatar, a coloured username with a timestamp, then the message text underneath. There is no left/right alignment and no bubble shape. Generators that show Discord as blue-and-grey bubbles are copying WhatsApp or iMessage, and the result looks wrong to anyone who uses the app.",
  },
  {
    q: "Why are my own messages on the left too?",
    a: "That is correct behaviour. Discord does not right-align your messages — everyone in the channel reads the same left-to-right column. Right-aligning your own messages is the single fastest tell of a fake Discord screenshot.",
  },
  {
    q: "Can I set custom username colours?",
    a: "Yes. In the editor, each participant gets a colour, which mimics how Discord assigns role colours. The default palette includes the classic Discord greens, pinks, oranges and blurple; you can pick a different colour per member to match the roles in your scene.",
  },
  {
    q: "Is my conversation uploaded to a server?",
    a: "No. The mockup is rendered entirely in your browser, and the PNG is generated on your device and saved straight to your downloads. Channel names, usernames and messages never leave your computer — you can disconnect from the internet after loading the page and keep working.",
  },
  {
    q: "What resolution can I export?",
    a: "1x (390px wide), 2x (780px) or 3x (1170px). For thumbnails and blog posts, 2x is usually the sweet spot; use 3x when the screenshot will be zoomed into or printed.",
  },
  {
    q: "Can I use the mockups commercially?",
    a: "Yes, for legitimate creative work: videos, thumbnails, presentations, teaching material, fiction and design. You may not use them to deceive, defraud, harass, impersonate anyone or fabricate evidence. The Acceptable Use Policy has the full boundary.",
  },
];

export default function DiscordGeneratorPage() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Discord Chat Generator",
    url: abs(CANONICAL),
    applicationCategory: "DesignApplication",
    operatingSystem: "Any (web browser)",
    browserRequirements: "Requires JavaScript. Works in modern browsers.",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Authentic row-based Discord layout (no bubbles)",
      "Channel header with # name and topic",
      "Coloured usernames (role colours) per member",
      "40px avatars at the start of each message group",
      "'Today at 9:32' timestamps next to usernames",
      "Light and dark mode (dark is Discord's default)",
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
      { "@type": "ListItem", position: 2, name: "Discord Chat Generator", item: abs(CANONICAL) },
    ],
  };

  return (
    <>
      <SiteHeader current={SLUG} />
      <JsonLd data={[webApp, faq, breadcrumb]} />

      <main className="mx-auto max-w-6xl px-5 pt-10">
        <div className="max-w-3xl">
          <h1 className="font-display text-[34px] sm:text-[42px] font-semibold tracking-tight leading-[1.1] text-foreground">
            Free Discord Chat Generator
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-black/65">
            Build a realistic Discord channel conversation mockup in your browser — coloured
            usernames, avatars, the classic dark theme, and no signup, no watermark, no
            upload. Edit the channel, write the conversation, and export a high-resolution
            PNG at 1x, 2x or 3x.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[13.5px] text-black/55">
            <span>✓ No account required</span>
            <span>✓ No watermark, ever</span>
            <span>✓ Nothing leaves your device</span>
            <span>✓ Works on mobile</span>
          </div>
        </div>

        <div className="mt-8">
          <GeneratorShell platformId="discord" />
        </div>

        <article className="prose-cm max-w-3xl mt-14">
          <h2>How to create a Discord conversation mockup in four steps</h2>
          <ol>
            <li>
              <strong>Name the channel.</strong> Type the channel name into{" "}
              <em>Contact → Name</em> — it renders as <code># general</code> style in the
              header, with your topic line next to it. Use a single lowercase word with
              dashes for the most authentic look, the way real servers are named.
            </li>
            <li>
              <strong>Add the members.</strong> Each participant gets a username and a colour
              that mimics Discord role colours. Three to five speakers is the sweet spot for
              a convincing scene — real servers have many lurkers and few talkers.
            </li>
            <li>
              <strong>Write the conversation.</strong> Every message has a sender dropdown,
              so you can weave the dialogue between members. Discord groups consecutive
              messages from the same person: the avatar and username appear once, then the
              following messages indent underneath. The renderer reproduces that grouping
              automatically.
            </li>
            <li>
              <strong>Export.</strong> Pick 1x, 2x or 3x and hit <em>Download PNG</em>.
              Exports are plain screen captures by default — a real screenshot never
              includes the phone body. Tick <em>Phone frame</em> only when you want a
              device-mockup look for a thumbnail, slide or design.
            </li>
          </ol>

          <h2>What makes a Discord screenshot actually look real</h2>
          <p>
            Discord is the platform most generators get completely wrong, because its layout
            shares nothing with WhatsApp or iMessage. The values ChatMock uses, taken from
            the desktop app:
          </p>
          <table>
            <thead>
              <tr>
                <th>Element</th>
                <th>Dark mode (default)</th>
                <th>Light mode</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Chat background</td>
                <td>
                  <code>#313338</code>
                </td>
                <td>
                  <code>#ffffff</code>
                </td>
              </tr>
              <tr>
                <td>Message text</td>
                <td>
                  <code>#dbdee1</code>
                </td>
                <td>
                  <code>#313338</code>
                </td>
              </tr>
              <tr>
                <td>Username (no role colour)</td>
                <td>
                  <code>#f2f3f5</code>
                </td>
                <td>
                  <code>#060607</code>
                </td>
              </tr>
              <tr>
                <td>Timestamps / secondary text</td>
                <td colSpan={2}>
                  <code>#949ba4</code>
                </td>
              </tr>
              <tr>
                <td>Blurple (accent)</td>
                <td colSpan={2}>
                  <code>#5865f2</code>
                </td>
              </tr>
              <tr>
                <td>Message input</td>
                <td>
                  <code>#383a40</code>
                </td>
                <td>
                  <code>#ebedef</code>
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            Three structural details separate a real Discord screenshot from a fake one.
            First, <strong>there are no bubbles at all</strong> — messages are full-width
            rows, and your own messages are left-aligned exactly like everyone else&apos;s.
            Right-aligned blue bubbles in a &ldquo;Discord&rdquo; screenshot are an instant
            giveaway. Second, <strong>the avatar and username appear once per message
            group</strong>, with continuation messages indented below. Third,{" "}
            <strong>timestamps read &ldquo;Today at 9:32&rdquo;</strong> and sit next to the
            username, not inside or under each message.
          </p>

          <h2>Everything you can customise</h2>
          <ul>
            <li>Channel name (renders with the # prefix) and topic line</li>
            <li>Unlimited members, each with a username and role colour</li>
            <li>Unlimited messages, reorderable, any sender</li>
            <li>Automatic message grouping with 40px avatars</li>
            <li>Image attachments, rendered Discord-style with rounded corners</li>
            <li>Date divider text</li>
            <li>Light and dark mode — dark is Discord&apos;s default look</li>
            <li>Status bar and optional iPhone-style phone frame</li>
          </ul>

          <h2>What people use Discord mockups for</h2>
          <p>
            Discord scenes show up wherever gaming and creator culture does: YouTube
            thumbnails and TikTok skits staged around a server conversation, community
            managers demonstrating how a welcome channel reads, educators building walkthroughs
            of classroom servers, and writers drafting group banter that would be tedious to
            describe in prose. The row-based layout is dense with information — usernames,
            colours, timestamps — which is exactly why a convincing one is hard to fake by
            hand and why the details above matter.
          </p>
          <p>
            As everywhere on this site, the line is intent. Illustrating, parodying, teaching
            and designing are fine. Using a fabricated conversation to deceive someone, harass
            a person, impersonate a community or fabricate evidence is not — and there are no
            templates here for fake bank, government, medical or legal notices. The{" "}
            <Link href="/acceptable-use">Acceptable Use Policy</Link> has the full boundary.
          </p>

          <h2>Why it runs entirely in your browser</h2>
          <p>
            Everything is rendered locally with plain HTML and CSS, and the PNG is generated
            on your device. Nothing is transmitted, stored or logged — which is why the editor
            keeps working if you switch off your wifi after loading the page, and why there is
            no database of staged conversations anywhere on our side.
          </p>

          <h2>Other generators</h2>
          <p>
            ChatMock covers the platforms people actually search for, one at a time: the{" "}
            <Link href="/whatsapp-chat-generator">WhatsApp chat generator</Link>, the{" "}
            <Link href="/fake-text-message-generator">iPhone text message generator</Link>,
            the <Link href="/group-chat-generator">group chat generator</Link> and the{" "}
            <Link href="/messenger-chat-generator">Messenger chat generator</Link> are all
            live. See the <Link href="/#generators">generator index</Link> for the full list.
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

      <SiteFooter trademark={discordTheme.trademark} />
    </>
  );
}
