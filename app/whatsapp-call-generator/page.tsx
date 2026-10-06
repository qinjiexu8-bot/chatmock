import type { Metadata } from "next";
import Link from "next/link";
import GeneratorShell from "@/components/generator/GeneratorShell";
import Breadcrumb from "@/components/Breadcrumb";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs, site, pageName } from "@/lib/seo";
import { whatsappCallTheme } from "@/lib/themes";

const SLUG = "whatsapp-call-generator";
const CANONICAL = `/${SLUG}`;

export const metadata: Metadata = {
  title: "Free WhatsApp Call Log Generator — No Signup",
  description:
    "Create realistic WhatsApp call log mockups in your browser. Incoming, outgoing and missed calls with direction arrows, durations and the bottom tab bar. Free, no signup, no watermark.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
    url: abs(CANONICAL),
    images: [abs(`/og/${SLUG}`)],
    title: "Free WhatsApp Call Log Generator — No Signup",
    description:
      "Build realistic WhatsApp call log mockups with direction arrows and the Calls tab layout. Free, no signup, PNG export.",
  },
  twitter: {
    card: "summary_large_image",
    images: [abs(`/og/${SLUG}`)],
  },
};

const FAQ = [
  {
    q: "Is the WhatsApp call log generator free?",
    a: "It is, and there is nothing to sign up for — no account, no email gate, no limit and no watermark on the PNG you export.",
  },
  {
    q: "What do the arrows beside each call mean?",
    a: "They mirror the real app's direction grammar: a green arrow pointing up-right is an outgoing call, a green arrow pointing down-left is one you received, and a red arrow marks a missed call. Missed calls also turn the caller's name red, just as WhatsApp does.",
  },
  {
    q: "Can I give a call a duration?",
    a: "Yes — each row takes an optional duration note such as 12 min, printed as small grey text under the direction line. Genuine logs show a duration for completed calls, so including a couple makes the list feel lived-in.",
  },
  {
    q: "Is the bottom tab bar included?",
    a: "Always. The Calls screen renders with its full five-tab navigation — Status, Calls, Chats, Communities, Settings — with Calls highlighted in green, the same arrangement as the real app. A screenshot with the bar cropped off reads as a crop rather than a capture.",
  },
  {
    q: "Should the phone frame be on?",
    a: "It starts off, so the export looks like a plain screen capture the way a real one does; enable Phone frame only when the log is going into a device-mockup composite. That default keeps the image honest unless you ask for the handset outline.",
  },
  {
    q: "What kind of data fills a believable call log?",
    a: "A convincing log mixes directions — a few outgoing, a couple incoming and the occasional missed call — plus short and long durations and times spread across the day. A list where every row points the same way looks staged, so vary them.",
  },
  {
    q: "Is my data uploaded to a server?",
    a: "Nothing leaves your device. The log is rendered in your browser and the PNG is generated there too before it is saved, so names, numbers and durations stay put. You can go offline after loading the page and the editor carries on.",
  },
  {
    q: "Can I use the call log mockups commercially?",
    a: "For legitimate work — videos, presentations, training material, fiction, design — yes. Using a fabricated log to deceive someone, impersonate a person or fabricate evidence is not acceptable, and the Acceptable Use Policy has the full boundary.",
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
        {/* 面包屑（与 JSON-LD BreadcrumbList 对应） */}
        <div className="mb-4">
          <Breadcrumb items={[{ name: "Home", href: "/" }, { name: pageName("whatsapp-call-generator") }]} />
        </div>
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
            <span>✓ Free, no signup at all</span>
            <span>✓ Watermark-free download</span>
            <span>✓ Calls tab with 5-tab bar</span>
            <span>✓ Red missed-call arrows</span>
          </div>
        </div>

        <div className="mt-8">
          <GeneratorShell platformId="whatsapp-call" />
        </div>

        <article className="prose-cm max-w-3xl mt-14">
          <h2>How to create a WhatsApp call log mockup in four steps</h2>
          <ol>
            <li>
              <strong>Leave the header as Calls.</strong> The page opens with the header already
              set to <code>Calls</code>, which is the real tab name — change it only if the
              scene genuinely needs something else.
            </li>
            <li>
              <strong>List the callers.</strong> Each participant becomes one row in the log: a
              name and an avatar apiece. Between three and six entries is the range where a
              call log looks naturally used rather than padded.
            </li>
            <li>
              <strong>Set each call.</strong> A row takes a caller, a direction — Outgoing,
              Incoming or Missed — and a time, plus an optional duration like{" "}
              <code>12 min</code>. Real logs mix directions and lengths, and one or two red
              missed entries are what sell it.
            </li>
            <li>
              <strong>Export.</strong> Pick 2x for screens and 3x if the log will be printed,
              then download. <em>Phone frame</em> begins off, giving you the flat rectangle a
              real capture produces; switch it on when you want the log framed inside a
              handset for a device mockup.
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
            <li>Status bar: clock, battery and signal</li>
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
            Intent is what decides, just as it does on every page of this site. Call logs
            composed to illustrate, to parody, to teach or to design are fine; a fabricated log
            used to deceive someone, to harass a person, to impersonate them, or to manufacture
            evidence is not acceptable, and this page will not become a bank, government,
            medical or legal notice factory. The{" "}
            <Link href="/acceptable-use">Acceptable Use Policy</Link> spells out the boundary.
          </p>

          <h2>Local rendering, offline-proof</h2>
          <p>
            Caller names, numbers, directions and durations are laid out with plain HTML and CSS
            inside your browser, and the PNG is generated on your own device before the download
            starts. No row of the log is sent anywhere or kept on a server, so you can
            disconnect after the page loads and keep editing.
          </p>

          <h2>Other generators</h2>
          <p>
            For conversations rather than calls, the{" "}
            <Link href="/whatsapp-chat-generator">WhatsApp chat generator</Link> covers
            one-to-one threads with blue ticks and dark mode, and the{" "}
            <Link href="/group-chat-generator">group chat generator</Link> handles
            multi-participant chats. The{" "}
            <Link href="/android-sms-generator">Android SMS generator</Link> is the closest
            cousin to this page in spirit — another list-style screen rather than a bubble
            thread — and the{" "}
            <Link href="/examples">examples gallery</Link> shows the whole set at once.
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
