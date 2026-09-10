import type { Metadata } from "next";
import Link from "next/link";
import GeneratorShell from "@/components/generator/GeneratorShell";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs, site } from "@/lib/seo";
import { whatsappCallTheme } from "@/lib/themes";

const SLUG = "whatsapp-call-generator";
const CANONICAL = `/${SLUG}`;

export const metadata: Metadata = {
  title: "Free WhatsApp Call Log Generator — No Signup | ChatMock",
  description:
    "Create realistic WhatsApp call log mockups in your browser. Incoming, outgoing and missed calls with direction arrows, durations and the bottom tab bar. Free, no signup, no watermark.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
    url: abs(CANONICAL),
    title: "Free WhatsApp Call Log Generator — No Signup",
    description:
      "Build realistic WhatsApp call log mockups with direction arrows and the Calls tab layout. Free, no signup, PNG export.",
  },
  twitter: { card: "summary_large_image" },
};

const FAQ = [
  {
    q: "Is this WhatsApp call log generator free?",
    a: "Yes — every feature is free, with no signup, no email wall, no daily limit and no watermark on your export. PNG download works at 1x, 2x and 3x resolution.",
  },
  {
    q: "What do the arrows next to each call mean?",
    a: "They show call direction the same way the real app does: a green arrow pointing up-right means an outgoing call you placed, a green arrow pointing down-left means an incoming call you received, and a red arrow means a missed call. In the real app, missed calls also turn the caller's name red — this generator reproduces that too.",
  },
  {
    q: "Can I add a call duration?",
    a: "Yes. Each row has an optional duration note (for example 12 min) rendered as small grey text under the direction line. The real app shows durations for completed calls, so adding a few makes the log look lived-in.",
  },
  {
    q: "Is the bottom tab bar included?",
    a: "Yes. The Calls screen renders with the full five-tab bottom navigation (Status, Calls, Chats, Communities, Settings) with Calls highlighted in green — the same structure as the real app. Screenshots without the tab bar read as cropped rather than authentic.",
  },
  {
    q: "Is my data uploaded to a server?",
    a: "No. The mockup is rendered entirely on your device and the PNG is generated in your browser. Names, numbers and durations never leave your computer or phone — you can disconnect from the internet after loading the page and keep working.",
  },
  {
    q: "What resolution can I export?",
    a: "1x (390px wide), 2x (780px) or 3x (1170px). For thumbnails and blog posts, 2x is usually the sweet spot. Use 3x when the screenshot will be zoomed into or printed.",
  },
  {
    q: "Can I use the mockups commercially?",
    a: "Yes, for legitimate creative work: videos, presentations, teaching material, fiction and design. You may not use them to deceive, defraud, harass, impersonate anyone or fabricate evidence. The Acceptable Use Policy has the full boundary.",
  },
];

export default function WhatsAppCallGeneratorPage() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "WhatsApp Call Log Generator",
    url: abs(CANONICAL),
    applicationCategory: "DesignApplication",
    operatingSystem: "Any (web browser)",
    browserRequirements: "Requires JavaScript. Works in modern browsers.",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Calls tab layout with bottom navigation bar",
      "Direction arrows: outgoing, incoming and missed (red)",
      "Video call entries with camera icon and 'video call' label",
      "Missed calls render the caller name in red",
      "Optional call durations",
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
      { "@type": "ListItem", position: 2, name: "WhatsApp Call Log Generator", item: abs(CANONICAL) },
    ],
  };

  return (
    <>
      <SiteHeader current={SLUG} />
      <JsonLd data={[webApp, faq, breadcrumb]} />

      <main className="mx-auto max-w-6xl px-5 pt-10">
        <div className="max-w-3xl">
          <h1 className="font-display text-[34px] sm:text-[42px] font-semibold tracking-tight leading-[1.1] text-foreground">
            Free WhatsApp Call Log Generator
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-black/65">
            Build a realistic WhatsApp Calls screen mockup in your browser and download a
            high-resolution PNG — no signup, no watermark, no upload. Incoming, outgoing and
            missed calls with correct direction arrows, optional durations, and the full
            bottom tab bar.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[13.5px] text-black/55">
            <span>✓ No account required</span>
            <span>✓ No watermark, ever</span>
            <span>✓ Nothing leaves your device</span>
            <span>✓ Works on mobile</span>
          </div>
        </div>

        <div className="mt-8">
          <GeneratorShell platformId="whatsapp-call" />
        </div>

        <article className="prose-cm max-w-3xl mt-14">
          <h2>How to create a WhatsApp call log mockup in four steps</h2>
          <ol>
            <li>
              <strong>Keep the header as Calls.</strong> The page ships with the header
              pre-filled as <code>Calls</code> — that is what the real tab is called, so
              leave it unless your scene genuinely needs something else.
            </li>
            <li>
              <strong>Add the callers.</strong> Each participant in the editor is one caller.
              Add as many as your log needs, each with a name and avatar. Three to six
              entries is the range where a call log looks naturally used.
            </li>
            <li>
              <strong>Set the calls.</strong> Each row has a sender (the caller), a direction
              — Outgoing, Incoming or Missed — and a time. Add optional duration notes like{" "}
              <code>12 min</code> for completed calls; real logs mix short and long
              durations, and one or two missed calls make it believable.
            </li>
            <li>
              <strong>Export.</strong> Pick 1x, 2x or 3x and hit <em>Download PNG</em>. The
              phone frame is on by default; untick it when you are compositing the screenshot
              into a larger design.
            </li>
          </ol>

          <h2>What makes a WhatsApp call log actually look real</h2>
          <p>
            The Calls screen shares a colour system with the chat view but a completely
            different structure — it is a list, not a conversation, and generators that
            render it as chat bubbles with a phone icon are getting it wrong. Here is what
            ChatMock reproduces:
          </p>
          <table>
            <thead>
              <tr>
                <th>Element</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Direction arrows</td>
                <td>
                  Green up-right = outgoing, green down-left = incoming, red down-left =
                  missed (<code>#ea4335</code>)
                </td>
              </tr>
              <tr>
                <td>Missed calls</td>
                <td>
                  Caller name renders in the same red as the arrow, exactly like the real app
                </td>
              </tr>
              <tr>
                <td>Row layout</td>
                <td>
                  46px avatar, bold name, direction + time on the second line, green phone
                  icon on the right
                </td>
              </tr>
              <tr>
                <td>Bottom tab bar</td>
                <td>
                  Status / Calls / Chats / Communities / Settings, with Calls highlighted in
                  green (<code>#00a884</code>)
                </td>
              </tr>
              <tr>
                <td>Durations</td>
                <td>
                  Optional small grey text under the direction line for completed calls
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            Two details separate a convincing call log from a fake. First,{" "}
            <strong>the arrow grammar</strong>: real users read those arrows without thinking,
            and a log where every call points the same direction looks staged — real usage
            mixes incoming, outgoing and the occasional missed call. Second,{" "}
            <strong>the tab bar</strong>: the Calls screen is never shown without the bottom
            navigation in a genuine screenshot. Cropping it off is the normal workaround for
            generators that cannot render it.
          </p>

          <h2>Everything you can customise</h2>
          <ul>
            <li>Caller names and avatar photos</li>
            <li>Unlimited call entries, reorderable, any caller</li>
            <li>Direction per call: outgoing, incoming or missed — plus a Video toggle for camera-call entries</li>
            <li>Time per call, plus optional duration notes</li>
            <li>Light or dark mode</li>
            <li>Status bar: clock, carrier, battery and signal</li>
            <li>Optional phone frame</li>
          </ul>

          <h2>What people use call log mockups for</h2>
          <p>
            The Calls screen appears in storytelling where the evidence is who called whom
            and when: a missing-person scene, a &ldquo;they called me 14 times&rdquo; story
            beat, an HR or safeguarding training module, or a comedy sketch about ignoring
            calls. The information density of a call log — names, directions, times — is what
            makes it useful on screen, and also why getting the arrow grammar wrong is so
            visible.
          </p>
          <p>
            The line, as everywhere on this site, is intent. Illustrating, parodying,
            teaching and designing are fine. Using a fabricated call log to deceive someone,
            harass a person, impersonate someone or fabricate evidence is not — and there are
            no templates here for fake bank, government, medical or legal notices. The{" "}
            <Link href="/acceptable-use">Acceptable Use Policy</Link> has the full boundary.
          </p>

          <h2>Why it runs entirely in your browser</h2>
          <p>
            Everything is rendered locally with plain HTML and CSS, and the PNG is generated
            on your device — nothing is transmitted, stored or logged. That is why the editor
            keeps working with your wifi switched off, and why there is no record of your
            mockups anywhere on our side.
          </p>

          <h2>Other generators</h2>
          <p>
            For conversations rather than calls, the{" "}
            <Link href="/whatsapp-chat-generator">WhatsApp chat generator</Link> covers
            one-to-one threads with blue ticks and dark mode, and the{" "}
            <Link href="/group-chat-generator">group chat generator</Link> handles
            multi-participant chats. iPhone,{" "}
            <Link href="/messenger-chat-generator">Messenger</Link>,{" "}
            <Link href="/discord-chat-generator">Discord</Link>,{" "}
            <Link href="/telegram-chat-generator">Telegram</Link>,{" "}
            <Link href="/instagram-dm-generator">Instagram</Link> and{" "}
            <Link href="/snapchat-chat-generator">Snapchat</Link> are also live — see the{" "}
            <Link href="/#generators">generator index</Link>.
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

      <SiteFooter trademark={whatsappCallTheme.trademark} />
    </>
  );
}
