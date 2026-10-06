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
    q: "Is the iPhone text message generator free?",
    a: "Yes, in full. No signup, no email requirement, no cap on how many mockups you make and no watermark on the result — every control, dark mode included, is yours to use.",
  },
  {
    q: "Does it produce blue iMessage bubbles or green SMS bubbles?",
    a: "This page renders the iMessage blue, which is what most people picture when they ask for an iPhone text screenshot. The green SMS style follows a different set of rules, so it is planned as its own page rather than a colour swap here.",
  },
  {
    q: "Why is there no time on each message?",
    a: "iOS Messages does not print one. The app shows a single timestamp at the top of the thread and a small Delivered or Read note under the last outgoing bubble, nothing per message. A clock inside every bubble is the fastest giveaway of a fake iPhone screenshot.",
  },
  {
    q: "What can I type in the Delivered line?",
    a: "Any text you like — Delivered, Read, Sending, or nothing at all. Clearing it is how a thread looks the instant after your contact replies, and that one small choice makes a screenshot noticeably more believable.",
  },
  {
    q: "So you can make fake text messages?",
    a: "That is exactly what the tool is for. Type a contact, add the bubbles, set the Delivered line and download a PNG at up to 3x. It runs entirely in the browser, so nothing you enter is uploaded and the result holds up in video edits, decks and mockups.",
  },
  {
    q: "Is anything sent to a server while I build an iMessage?",
    a: "Nothing. The conversation is composed with plain HTML and CSS on your device and the PNG is encoded there too, then saved to your downloads. Names, messages and pictures never cross the network — load the page, go offline, and it keeps working.",
  },
  {
    q: "Why is there no bubble around a photo message?",
    a: "Because iOS drops the padding for image messages: a photo fills its own rounded frame with no coloured background behind it, unlike a text bubble. This generator matches that, so a picture message does not look like a text message with a photo glued on.",
  },
  {
    q: "Is commercial use allowed?",
    a: "For honest purposes — videos, presentations, course material, fiction, design — yes. You may not use a composed thread to deceive, harass, impersonate or fabricate evidence; our Acceptable Use Policy covers the full boundary.",
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
            <span>✓ Free, no signup needed</span>
            <span>✓ No watermark, no branding</span>
            <span>✓ 18px iOS bubbles with tails</span>
            <span>✓ Delivered / Read line included</span>
          </div>
        </div>

        <div className="mt-8">
          <GeneratorShell platformId="text-message" />
        </div>

        <article className="prose-cm max-w-3xl mt-14">
          <h2>How to create an iPhone text message mockup in four steps</h2>
          <ol>
            <li>
              <strong>Set the contact.</strong> Type the name into{" "}
              <em>Contact → Name</em>; the header takes the plain centred iOS layout. Add an
              avatar, or let ChatMock fall back to the grey initial circle iOS shows for a
              contact with no picture.
            </li>
            <li>
              <strong>Write the messages.</strong> <em>+ Alex</em> and <em>+ Me</em> add
              bubbles; the sender toggle moves one to the other side and the arrows reorder the
              thread. iOS keeps the narrowed tail on the last bubble of a run, so grouping
              happens on its own. A photo message drops the coloured background entirely — no
              padding, just the rounded image — which is exactly how iOS draws it.
            </li>
            <li>
              <strong>Set the delivery line.</strong> <em>Contact → Delivery</em> accepts{" "}
              <code>Delivered</code>, <code>Read</code>, <code>Sending</code>, or nothing at
              all; the text sits beneath your final outgoing bubble and nowhere else. Clearing
              it is the trick for a thread the other person has just answered.
            </li>
            <li>
              <strong>Export.</strong> Choose your scale and download: 2x is plenty for a web
              page or a thumbnail, while 3x is the one to reach for if the shot will be
              printed on a case, a poster or a handout. <em>Phone frame</em> begins off, to
              match a real iOS screenshot, and is only there for device composites.
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
            <li>Status bar: clock, battery and signal</li>
            <li>Optional iPhone-style phone frame with the Dynamic Island</li>
          </ul>

          <h2>Fake text messages, done responsibly</h2>
          <p>
            Whether you searched for a fake text message generator, a fake iPhone message
            creator or an iMessage screenshot maker, you are looking for the same thing: an
            image of a conversation that never happened, composed by hand instead of captured
            from a real phone. The answer to "can you make fake text messages?" is therefore
            yes — type a contact and a few bubbles above, tweak the Delivered line, and
            download the PNG. No account, no app, no upload.
          </p>
          <p>
            One distinction keeps this useful instead of harmful: a fake text message is a
            prop when its audience knows it is staged, and a forgery when it is presented as
            real. Every use that works — films, classrooms, UX presentations, comedy sketches
            — sits on the prop side of that line. The section below goes through what those
            uses look like, and where the boundary sits.
          </p>

          <h2>What people use these mockups for</h2>
          <p>
            Mostly legitimate creative work. Creators stage the setup of a story without
            publishing anyone&apos;s real messages. Designers show how a notification or reply
            flow reads in a familiar shell. Teachers build dialogue exercises. Screenwriters
            draft the scenes that play out over text. What they all have in common is that
            the audience understands the conversation is illustrative.
          </p>
          <p>
            What separates a stage prop from a forgery is intent. Illustrating, parodying,
            teaching or designing with a mockup is fine; using one to make someone believe
            something that never happened — faking evidence, impersonating a person or an
            institution, misleading a reader — is not, and we do not host that. No bank,
            government, medical or legal templates exist on this site, and the{" "}
            <Link href="/acceptable-use">Acceptable Use Policy</Link> sets the boundary out.
          </p>

          <h2>Rendered inside the browser, start to finish</h2>
          <p>
            The contact, the bubbles and the Delivered line are composed with plain HTML and CSS
            in your browser, and the PNG is encoded on your own hardware before it reaches your
            downloads. Nothing is transmitted or logged, so you can load the page, go offline,
            and keep working exactly as before.
          </p>

          <h2>Other generators</h2>
          <p>
            Looking for a different platform? The{" "}
            <Link href="/whatsapp-chat-generator">WhatsApp chat generator</Link> is live,
            including dark mode, blue ticks and image messages — and so are the{" "}
            <Link href="/group-chat-generator">group chat generator</Link> with coloured
            sender names and the{" "}
            <Link href="/messenger-chat-generator">Messenger chat generator</Link>. If you
            would rather browse finished results before choosing, the{" "}
            <Link href="/examples">examples page</Link> gathers them in one place.
          </p>

          <p>
            For a deeper walkthrough of the details above, read the full{" "}
            <Link href="/blog/fake-text-message-on-iphone-and-android">iPhone &amp; Android text message guide</Link> on the blog.
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
