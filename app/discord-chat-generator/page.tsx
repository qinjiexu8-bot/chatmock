import type { Metadata } from "next";
import Link from "next/link";
import GeneratorShell from "@/components/generator/GeneratorShell";
import Breadcrumb from "@/components/Breadcrumb";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs, site, pageName } from "@/lib/seo";
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
    q: "Does the Discord chat generator cost anything?",
    a: "No. There is no signup, no email wall, no limit on mockups and no watermark on the file — role colours, avatars and image attachments are all free to use.",
  },
  {
    q: "Why are Discord messages not in bubbles?",
    a: "Because the real app does not use them. Discord renders every message as a full-width row: a 40px avatar, a coloured username with a timestamp, then the text underneath, with no left/right alignment at all. Showing Discord as blue-and-grey bubbles means the generator copied WhatsApp or iMessage, and anyone who uses the app will spot it instantly.",
  },
  {
    q: "Why is my own message on the left as well?",
    a: "That is how Discord actually behaves — everyone reads the same left-to-right column, and your messages are not pushed to the right. Right-aligning your own posts is the quickest way to expose a fake Discord screenshot.",
  },
  {
    q: "Can each person have their own role colour?",
    a: "Yes. Every participant gets a colour that stands in for a Discord role, drawn from a palette that includes the familiar greens, pinks, oranges and blurple. Assign one per member to match the roles in your scene.",
  },
  {
    q: "What happens to the avatar on a run of messages?",
    a: "Discord groups consecutive messages from the same person: the avatar and username appear once at the top, and the following messages indent beneath them with no repeated name. The renderer applies that grouping automatically so a fast back-and-forth does not look like a wall of headers.",
  },
  {
    q: "Does the channel name or my messages ever reach a server?",
    a: "Never. The channel is rendered inside your browser and the PNG is encoded on your own device, so the channel name, the usernames and the messages stay there. Cut your connection after loading the page and the editor will carry on without noticing.",
  },
  {
    q: "What does the timestamp next to a username look like?",
    a: "It reads in Discord's own style — something like Today at 9:32 — and sits beside the username rather than inside or under the message. That placement is one of the small things that separates a realistic row layout from a sloppy one.",
  },
  {
    q: "Can I use Discord mockups commercially?",
    a: "For legitimate work — videos, thumbnails, presentations, teaching, fiction, design — yes. Deceiving someone, impersonating a person or community, or fabricating evidence is not permitted, and the Acceptable Use Policy lays out the line.",
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
      "40px avatars at the start of each message group — upload a photo per member",
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
        {/* 面包屑（与 JSON-LD BreadcrumbList 对应） */}
        <div className="mb-4">
          <Breadcrumb items={[{ name: "Home", href: "/" }, { name: pageName("discord-chat-generator") }]} />
        </div>
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
            <span>✓ Free, no signup, no limits</span>
            <span>✓ No watermark on the PNG</span>
            <span>✓ Row layout, not bubbles</span>
            <span>✓ Role colours per member</span>
          </div>
        </div>

        <div className="mt-8">
          <GeneratorShell platformId="discord" />
        </div>

        <article className="prose-cm max-w-3xl mt-14">
          <h2>How to create a Discord conversation mockup in four steps</h2>
          <ol>
            <li>
              <strong>Name the channel.</strong> Put the channel in <em>Contact → Name</em> and
              it renders with a <code>#</code> prefix in the header, with the topic line beside
              it. A short lowercase word with dashes looks the most like a real server.
            </li>
            <li>
              <strong>Add the members.</strong> Give each participant a username and a colour
              standing in for a Discord role — greens, pinks, oranges and blurple are all in
              the palette. Three to five speakers is the sweet spot, since real servers carry
              many lurkers and few talkers.
            </li>
            <li>
              <strong>Write the messages.</strong> A sender dropdown on each message lets the
              conversation weave between members. Discord&apos;s grouping rule does the visual
              work: consecutive lines from one person share a single 40px avatar and username
              at the top, with the rest indented beneath and no repeated header — and your own
              posts stay on the left like everyone else&apos;s.
            </li>
            <li>
              <strong>Export.</strong> Discord is a desktop-shaped interface, so export at
              the width your channel really renders rather than thinking in phone sizes: 1x
              for a quick check, 2x for most uses, 3x when the dense row layout has to stay
              legible at large sizes. There is no handset shell by default, because a real
              Discord capture has none — turn <em>Phone frame</em> on only if you
              deliberately want the device look.
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
            <li>Unlimited members, each with a username, role colour and uploadable avatar</li>
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
            Intent governs everything on this site. Parody, illustration, teaching and design
            are all fine uses of a mockup; a fabricated conversation used to deceive someone,
            to harass a person, to impersonate a community, or to fake evidence is not, and we
            do not want that traffic. ChatMock offers no bank, government, medical or legal
            templates — the{" "}
            <Link href="/acceptable-use">Acceptable Use Policy</Link> holds the whole boundary.
          </p>

          <h2>The channel stays on your device</h2>
          <p>
            The server name, channel name, usernames and messages are all rendered with plain
            HTML and CSS in your browser, and the PNG is generated locally. Nothing is sent or
            logged, so a conversation full of role colours and channel names never leaves the
            machine it was typed on — pull the plug after loading and it keeps working.
          </p>

          <h2>Other generators</h2>
          <p>
            Discord is the odd one out among the ChatMock tools, so it is worth contrasting:
            the <Link href="/group-chat-generator">group chat generator</Link> handles
            multi-person threads that do use bubbles and coloured names, and the{" "}
            <Link href="/telegram-chat-generator">Telegram chat generator</Link> shows what a
            two-state checkmark looks like where Discord has none. The{" "}
            <Link href="/blog">blog</Link> compares the layouts in more depth.
          </p>

          <p>
            For a deeper walkthrough of the details above, read the full{" "}
            <Link href="/blog/discord-message-mockup-guide">Discord message screenshot guide</Link> on the blog.
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
