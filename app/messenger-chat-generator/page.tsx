import type { Metadata } from "next";
import Link from "next/link";
import GeneratorShell from "@/components/generator/GeneratorShell";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs, site } from "@/lib/seo";
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
    title: "Free Messenger Chat Generator — No Signup, No Watermark",
    description:
      "Build realistic Facebook Messenger conversation mockups with Seen status and dark mode. Free, no signup, PNG export.",
  },
  twitter: { card: "summary_large_image" },
};

const FAQ = [
  {
    q: "Is this Messenger chat generator free?",
    a: "Yes — no signup, no email wall, no daily limit and no watermark on the export. PNG download at 1x, 2x or 3x resolution is free, as is every editing feature on the page.",
  },
  {
    q: "What does the Seen status mean and can I change it?",
    a: "In Messenger, Seen appears under your last outgoing message once the other person has read it. In the editor, the Delivery field controls that line: write Seen, leave a time, or clear it entirely to show a conversation the other person has not opened yet. The line only ever appears under the final outgoing message, the same rule the real app follows.",
  },
  {
    q: "Why are there no timestamps inside the bubbles?",
    a: "Messenger does not work that way. Time labels sit under each group of messages as small grey text, not inside the bubbles. Generators that stamp every bubble get this wrong, and it is one of the quickest tells of a fake screenshot.",
  },
  {
    q: "Why does the avatar appear next to only some messages?",
    a: "Because that is the real behaviour: your contact's avatar hangs beside the last bubble of each of their message groups, not next to every bubble. Repeating the avatar on every message is a common mistake in low-quality generators.",
  },
  {
    q: "Is my conversation uploaded to a server?",
    a: "No. The mockup is rendered entirely on your device, and the PNG is generated in your browser and saved directly to your downloads. Names, messages and uploaded images never leave your computer or phone — you can disconnect from the internet after loading the page and keep working.",
  },
  {
    q: "What resolution can I export?",
    a: "1x (390px wide), 2x (780px) or 3x (1170px). For YouTube thumbnails, blog posts and presentations, 2x is usually the right balance of sharpness and file size. Use 3x for print or when the screenshot will be zoomed into.",
  },
  {
    q: "Can I use the mockups commercially?",
    a: "Yes, for legitimate creative work: videos, presentations, teaching material, fiction and design. You may not use them to deceive, defraud, harass, impersonate anyone or fabricate evidence. See the Acceptable Use Policy for the full boundary.",
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
            <span>✓ No account required</span>
            <span>✓ No watermark, ever</span>
            <span>✓ Nothing leaves your device</span>
            <span>✓ Works on mobile</span>
          </div>
        </div>

        <div className="mt-8">
          <GeneratorShell platformId="messenger" />
        </div>

        <article className="prose-cm max-w-3xl mt-14">
          <h2>How to create a Messenger mockup in four steps</h2>
          <ol>
            <li>
              <strong>Set the contact.</strong> Type a name into <em>Contact → Name</em> and
              upload an avatar if you want one. The avatar shows in the header and hangs
              beside your contact&apos;s message groups — without a photo, ChatMock draws a
              blue-gradient initial circle like the real default.
            </li>
            <li>
              <strong>Write the conversation.</strong> Add messages with{" "}
              <em>+ Alex</em> or <em>+ Me</em>, flip each one between the two sides, reorder
              with the arrows. Uploading an image turns that message into a photo bubble with
              a caption.
            </li>
            <li>
              <strong>Set the Seen status.</strong> Under <em>Contact → Delivery</em>, write{" "}
              <code>Seen</code>, a time, or clear the field. The line appears under your last
              outgoing message only. Detail worth knowing: a conversation that ends on{" "}
              <em>your</em> message with no Seen line reads as &ldquo;they never opened
              it&rdquo; — useful for specific scenes.
            </li>
            <li>
              <strong>Export.</strong> Pick 1x, 2x or 3x and hit <em>Download PNG</em>.
              Exports are plain screen captures by default — a real screenshot never
              includes the phone body. Tick <em>Phone frame</em> only when you want a
              device-mockup look for a thumbnail, slide or design.
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
            <li>Status bar: clock, carrier, battery and signal</li>
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
            The line, as always, is intent. Illustrating, parodying, teaching and designing
            are fine. Using a fabricated conversation to deceive someone, harass a person,
            impersonate someone or fabricate evidence is not — and this site deliberately
            offers no templates for fake bank, government, medical or legal notices. The{" "}
            <Link href="/acceptable-use">Acceptable Use Policy</Link> has the full boundary.
          </p>

          <h2>Why it runs entirely in your browser</h2>
          <p>
            Everything is rendered locally with plain HTML and CSS, and the PNG is generated
            on your device — nothing is transmitted, stored or logged. That is also why the
            editor keeps working if you switch off your wifi after loading the page, and why
            there is no gallery of other people&apos;s staged conversations anywhere on our
            servers.
          </p>

          <h2>Other generators</h2>
          <p>
            ChatMock covers the platforms people actually search for, one at a time: the{" "}
            <Link href="/whatsapp-chat-generator">WhatsApp chat generator</Link>, the{" "}
            <Link href="/fake-text-message-generator">iPhone text message generator</Link>{" "}
            and the <Link href="/group-chat-generator">group chat generator</Link> with
            coloured sender names are all live. See the{" "}
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

      <SiteFooter trademark={messengerTheme.trademark} />
    </>
  );
}
