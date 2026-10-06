import type { Metadata } from "next";
import Link from "next/link";
import GeneratorShell from "@/components/generator/GeneratorShell";
import Breadcrumb from "@/components/Breadcrumb";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs, site, pageName } from "@/lib/seo";
import { messengerTheme } from "@/lib/themes";

const SLUG = "messenger-chat-generator";
const CANONICAL = `/${SLUG}`;

export const metadata: Metadata = {
  title: "Free Messenger Chat Generator — No Signup, No Watermark",
  description:
    "Create realistic Facebook Messenger conversation mockups in your browser. Edit names, avatars, the Seen status and dark mode, then export a high-resolution PNG. Free, no signup, no watermark.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
    url: abs(CANONICAL),
    images: [abs(`/og/${SLUG}`)],
    title: "Free Messenger Chat Generator — No Signup, No Watermark",
    description:
      "Build realistic Facebook Messenger conversation mockups with Seen status and dark mode. Free, no signup, PNG export.",
  },
  twitter: {
    card: "summary_large_image",
    images: [abs(`/og/${SLUG}`)],
  },
};

const FAQ = [
  {
    q: "Does the Messenger chat generator cost anything?",
    a: "Nothing. There is no account, no email wall, no daily ceiling and no watermark stamped on the export — every control in the editor, the Seen line included, is open and free.",
  },
  {
    q: "What does the Seen line actually track?",
    a: "In Messenger, Seen appears under your last outgoing message once the recipient has opened the thread. The Delivery field drives that line: write Seen, add a time, or clear it. It only ever attaches to the final message you sent, never to earlier ones — the same rule the real app follows.",
  },
  {
    q: "Why is there no clock inside the bubbles?",
    a: "Because Messenger does not draw one there. Time labels sit beneath each group of messages as small grey text instead of inside the bubbles. Tools that stamp a timestamp into every bubble are easy to spot, and it is one of the quickest tells of a staged screenshot.",
  },
  {
    q: "Why does the avatar sit beside only some messages?",
    a: "That is the genuine behaviour, not a flaw: your contact's picture hangs next to the last bubble of each of their groups rather than beside every single message. Repeating it on every bubble is a mistake low-effort generators make constantly.",
  },
  {
    q: "Does anything I type reach a Facebook or Messenger server?",
    a: "No. The thread is drawn by your own browser and the PNG is encoded on your own device before it lands in your downloads. Names, messages and any picture you load never travel over the network, so you can cut your connection after the page opens and keep working offline.",
  },
  {
    q: "Why do the bubbles look like capsules without tails?",
    a: "Real Messenger bubbles are 18px capsules with no tails at all; inside a run of messages the first and last bubble narrow to 6px on the sender's side so the group appears to stack. Copying an iMessage tail or rounding every corner to the same value is what makes most fakes look wrong.",
  },
  {
    q: "What colour is the outgoing bubble in dark mode?",
    a: "The same #0084ff blue as in light mode — Messenger keeps the sender bubble identical across themes rather than darkening it. Only the background and the incoming bubbles change, which is a detail generators that simply invert the palette get wrong.",
  },
  {
    q: "Can I use Messenger mockups in commercial projects?",
    a: "For legitimate work — videos, presentations, teaching, fiction, design — yes. What you may not do is present a fabricated thread as real, harass or impersonate anyone, or fake evidence, and the Acceptable Use Policy sets out the whole boundary.",
  },
];

export default function MessengerGeneratorPage() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Messenger Chat Generator",
    url: abs(CANONICAL),
    applicationCategory: "DesignApplication",
    operatingSystem: "Any (web browser)",
    browserRequirements: "Requires JavaScript. Works in modern browsers.",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Messenger-style capsule bubbles, light and dark mode",
      "Custom contact name and avatar",
      "Seen status under the last outgoing message",
      "Group-of-messages corner geometry (6px sender-side)",
      "Image attachments with captions",
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
      { "@type": "ListItem", position: 2, name: "Messenger Chat Generator", item: abs(CANONICAL) },
    ],
  };

  return (
    <>
      <SiteHeader current={SLUG} />
      <JsonLd data={[webApp, faq, breadcrumb]} />

      <main className="mx-auto max-w-6xl px-5 pt-10">
        {/* 面包屑（与 JSON-LD BreadcrumbList 对应） */}
        <div className="mb-4">
          <Breadcrumb items={[{ name: "Home", href: "/" }, { name: pageName("messenger-chat-generator") }]} />
        </div>
        <div className="max-w-3xl">
          <h1 className="font-display text-[34px] sm:text-[42px] font-semibold tracking-tight leading-[1.1] text-foreground">
            Free Messenger Chat Generator
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-black/65">
            Build a realistic Facebook Messenger conversation mockup in your browser and
            download a high-resolution PNG — no signup, no watermark, no upload. Edit the
            contact, write the conversation, control the Seen status, switch between light
            and dark mode, and export at 1x, 2x or 3x.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[13.5px] text-black/55">
            <span>✓ No account, no email, no card</span>
            <span>✓ Nothing stamped on your export</span>
            <span>✓ Tail-less capsule bubbles</span>
            <span>✓ Thread never leaves the browser</span>
          </div>
        </div>

        <div className="mt-8">
          <GeneratorShell platformId="messenger" />
        </div>

        <article className="prose-cm max-w-3xl mt-14">
          <h2>How to create a Messenger mockup in four steps</h2>
          <ol>
            <li>
              <strong>Set the contact.</strong> Type the name into <em>Contact → Name</em> and
              add a header line such as <code>Active now</code>. Drop in an avatar and it shows
              beside the name and next to the last bubble of each of their groups; leave it out
              and ChatMock draws the blue-gradient initial circle.
            </li>
            <li>
              <strong>Write the thread.</strong> Add rows with <em>+ Alex</em> or <em>+ Me</em>{" "}
              and switch a message&apos;s side with the sender toggle. Messenger stacks a run
              from one person by squaring the corners where the group starts and ends, and the
              contact&apos;s picture hangs beside that group&apos;s final bubble only — never
              beside every line. Photos attach straight to a bubble with a caption.
            </li>
            <li>
              <strong>Set the Seen line.</strong> <em>Contact → Delivery</em> drives the small
              grey Seen note under your final outgoing message; type <code>Seen</code>, a time,
              or clear the field. Messenger only ever labels the last message you sent, so a
              thread with no Seen line reads as one the other person has not opened.
            </li>
            <li>
              <strong>Export.</strong> Choose the multiplier that matches the destination —
              1x for a rough draft, 2x for a blog header or thumbnail, 3x for anything that
              will be enlarged — then press <em>Download PNG</em>. <em>Phone frame</em> stays
              off unless you switch it on, which hands you the flat, phone-free rectangle a
              real capture produces; turning it on wraps the thread in a device outline for
              mockup shots.
            </li>
          </ol>

          <h2>What makes a Messenger screenshot actually look real</h2>
          <p>
            Messenger looks simple and is surprisingly easy to get wrong, because almost all
            of its identity is in geometry rather than colour. Here are the values ChatMock
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
                  <code>#0084ff</code> — the same blue in both modes
                </td>
              </tr>
              <tr>
                <td>Incoming bubble</td>
                <td>
                  <code>#e4e6eb</code>
                </td>
                <td>
                  <code>#303031</code>
                </td>
              </tr>
              <tr>
                <td>Bubble shape</td>
                <td colSpan={2}>
                  18px capsules with <strong>no tails</strong>; in a run of messages, the
                  first and last bubbles narrow to 6px on the sender&apos;s side
                </td>
              </tr>
              <tr>
                <td>Contact avatar</td>
                <td colSpan={2}>
                  Beside the <em>last</em> bubble of each of their groups — not every bubble
                </td>
              </tr>
              <tr>
                <td>Seen / time labels</td>
                <td colSpan={2}>
                  Small grey text <em>under</em> the message groups, never inside bubbles
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            The single biggest tell in fake Messenger screenshots is bubble geometry. Real
            Messenger bubbles are tail-less capsules, and consecutive messages visually
            &ldquo;stack&rdquo; by squaring the corners where the group starts and ends. Fake
            ones usually copy the iMessage tail or round every corner to 18px, and either
            choice is spotted in a second. The second tell is the avatar: in the real app it
            appears once per message group, not once per message.
          </p>

          <h2>Everything you can customise</h2>
          <ul>
            <li>Contact name and avatar photo</li>
            <li>Header status line (Active now, or anything else)</li>
            <li>Light or dark mode, both matching the real app</li>
            <li>Unlimited messages, reorderable, either side</li>
            <li>Seen status text under the last outgoing message</li>
            <li>Image attachments with captions</li>
            <li>Date line at the top of the thread</li>
            <li>Status bar: clock, battery and signal</li>
            <li>Optional iPhone-style phone frame</li>
          </ul>

          <h2>What people use Messenger mockups for</h2>
          <p>
            Messenger threads show up constantly in video work because the interface is
            familiar to billions of people and reads clearly even at thumbnail size. Creators
            use it to stage conversations for sketches without publishing anyone&apos;s real
            messages. Designers demonstrate reply flows and auto-reply behaviour. Teachers
            build dialogue exercises. Writers draft scenes that unfold over chat. The common
            thread is that the audience knows the conversation is illustrative.
          </p>
          <p>
            The intent behind the image is what decides. A thread composed to illustrate,
            parody, teach or design sits on the right side of it; the same thread dressed up as
            a genuine exchange, used to mislead, to harass, to pass as another person, or to
            manufacture evidence, does not — and this site offers no bank, government, medical
            or legal notice templates. Read the{" "}
            <Link href="/acceptable-use">Acceptable Use Policy</Link> for the whole rule.
          </p>

          <h2>Handled entirely on your own device</h2>
          <p>
            The contact&apos;s name, the thread and the Seen line never cross the network — a
            Messenger mockup here is painted by your browser with plain HTML and CSS, and the
            PNG is encoded locally before it is saved to your downloads. Switch your wifi off
            after the page loads and the editor keeps going, which is the simplest proof that
            nothing is being sent anywhere.
          </p>

          <h2>Other generators</h2>
          <p>
            ChatMock covers the platforms people actually search for, one at a time: the{" "}
            <Link href="/whatsapp-chat-generator">WhatsApp chat generator</Link>, the{" "}
            <Link href="/fake-text-message-generator">iPhone text message generator</Link>{" "}
            and the <Link href="/group-chat-generator">group chat generator</Link> with
            coloured sender names are all live. Once you have a thread you like, the{" "}
            <Link href="/examples">examples page</Link> is the quickest way to see how it
            compares with the other platforms.
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

      <SiteFooter trademark={messengerTheme.trademark} />
    </>
  );
}
