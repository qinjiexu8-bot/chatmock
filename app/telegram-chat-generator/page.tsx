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
    q: "Is the Telegram chat generator free to use?",
    a: "It is — no account, no email wall, no daily cap and no watermark on the file you download. Every switch on the page, from day dividers to dark mode, is open without payment.",
  },
  {
    q: "How many checkmark states does Telegram have?",
    a: "Only two. A single check means the message reached the server and a double check means it was read; there is no separate delivered state as there is on WhatsApp. The editor still offers all three choices and maps delivered onto the double check, which is what the real client does.",
  },
  {
    q: "Why is the sender bubble pale green?",
    a: "That is Telegram's signature: on the light theme your own bubbles are a soft green (#eeffde) and incoming ones are white. Generators that paste WhatsApp's colours into a Telegram frame give themselves away immediately.",
  },
  {
    q: "What does the bubble turn into in dark mode?",
    a: "Steel blue, #2b5278. Telegram does not simply darken the green — it switches the outgoing bubble to a deep blue-grey while the background drops to near-black, so the two themes do not look like the same image dimmed.",
  },
  {
    q: "What is the day divider pill for?",
    a: "Real Telegram threads label the date with a small centred pill — Yesterday, July 28, anything you like — and the editor exposes that text so long conversations can be split across days the way they are in the app.",
  },
  {
    q: "Can I place images inside the chat?",
    a: "Yes. Any message can carry a picture with a caption, read locally from your device and rendered inside the bubble with Telegram's rounded corners.",
  },
  {
    q: "Does Telegram see the chat I compose here?",
    a: "It cannot, because nothing is transmitted. The mockup is built and rasterised entirely on your own machine, so names, messages and images stay in the browser and the PNG lands only in your downloads. Turn off your connection after loading the page and it still works.",
  },
  {
    q: "May I publish or sell the mockups?",
    a: "For honest creative work — videos, courses, presentations, fiction, design — yes. Presenting a fabricated thread as genuine, impersonating someone or manufacturing evidence is not allowed, and the Acceptable Use Policy gives the full picture.",
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
            <span>✓ Free and account-free</span>
            <span>✓ Zero watermark on export</span>
            <span>✓ Two-state ticks, like the app</span>
            <span>✓ Doodle wallpaper drawn in code</span>
          </div>
        </div>

        <div className="mt-8">
          <GeneratorShell platformId="telegram" />
        </div>

        <article className="prose-cm max-w-3xl mt-14">
          <h2>How to create a Telegram chat mockup in four steps</h2>
          <ol>
            <li>
              <strong>Set the contact.</strong> Enter the name in <em>Contact → Name</em> and
              choose a status line — <code>online</code> or{" "}
              <code>last seen 5 minutes ago</code> — for the white header. A photo is optional;
              without one ChatMock uses the solid-colour initial circle Telegram shows by
              default.
            </li>
            <li>
              <strong>Write the chat.</strong> <em>+ Alex</em> and <em>+ Me</em> add bubbles,
              the sender toggle moves a message across, and the arrows reorder them. Like
              WhatsApp, a run from one sender keeps the tail on its first bubble only; a
              caption can ride along with any image.
            </li>
            <li>
              <strong>Set the checks.</strong> Telegram knows just two states, so pick a single
              check for sent or a double green check for read — there is no delivered step to
              set. A long thread left at single checks reads as unopened, which is its own
              useful scene.
            </li>
            <li>
              <strong>Export.</strong> Reach for 3x when a Telegram shot is going onto
              merchandise or a large poster, 2x for the web and video thumbnails, and 1x when
              you are only checking the layout. <em>Phone frame</em> stays off for a clean
              screenshot edge — switch it on if you need the device shell around the chat for
              a marketing composite.
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
            <li>Status bar: clock, battery and signal</li>
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
            The intent behind a thread is what matters, here as much as anywhere on ChatMock.
            Using one to illustrate, to parody, to teach or to design is acceptable; using one
            to deceive a person, to harass them, to pose as somebody else, or to fabricate
            evidence is not. The site holds no bank, government, medical or legal notice
            templates, and the{" "}
            <Link href="/acceptable-use">Acceptable Use Policy</Link> spells the boundary out.
          </p>

          <h2>Built and encoded on your machine</h2>
          <p>
            Names, status lines and checkmarks are painted with plain HTML and CSS inside the
            tab, and the PNG is rasterised on your own device before it downloads. No part of
            the thread is transmitted or retained, which is why the editor is perfectly happy
            with the network switched off.
          </p>

          <h2>Other generators</h2>
          <p>
            ChatMock covers the platforms people actually search for, one at a time: the{" "}
            <Link href="/whatsapp-chat-generator">WhatsApp chat generator</Link>, the{" "}
            <Link href="/fake-text-message-generator">iPhone text message generator</Link>,
            the <Link href="/group-chat-generator">group chat generator</Link>, the{" "}
            <Link href="/messenger-chat-generator">Messenger chat generator</Link> and the{" "}
            <Link href="/discord-chat-generator">Discord chat generator</Link> are all live.
            Telegram sits closest to WhatsApp of that group, so if you need the three-state
            ticks instead of two, switch to the{" "}
            <Link href="/whatsapp-chat-generator">WhatsApp page</Link>.
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
