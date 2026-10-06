import type { Metadata } from "next";
import Link from "next/link";
import GeneratorShell from "@/components/generator/GeneratorShell";
import Breadcrumb from "@/components/Breadcrumb";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs, site, pageName } from "@/lib/seo";
import { whatsappTheme } from "@/lib/themes";

const SLUG = "whatsapp-chat-generator";
const CANONICAL = `/${SLUG}`;

export const metadata: Metadata = {
  title: "Free WhatsApp Chat Generator — No Signup, No Watermark",
  description:
    "Create realistic WhatsApp chat mockups in your browser. Edit names, avatars, blue ticks, timestamps and dark mode, then export a high-resolution PNG. Free forever, no signup, no watermark.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
    url: abs(CANONICAL),
    images: [abs(`/og/${SLUG}`)],
    title: "Free WhatsApp Chat Generator — No Signup, No Watermark",
    description:
      "Create realistic WhatsApp chat mockups in your browser and export high-resolution PNGs. Free, no signup, no watermark, nothing uploaded.",
  },
  twitter: {
    card: "summary_large_image",
    images: [abs(`/og/${SLUG}`)],
  },
};

const FAQ = [
  {
    q: "Is the WhatsApp chat generator free to use?",
    a: "It is, and it stays that way. Nothing on this page asks for an account, an email address or a card, there is no cap on how many mockups you build, and the PNG you export carries no watermark or branding from us.",
  },
  {
    q: "Do I need to install anything?",
    a: "No app and no extension — the editor is a single web page. Open it in Chrome, Safari, Firefox or Edge on a laptop or a phone and everything, from the contact avatar to the blue ticks, is drawn live inside the tab.",
  },
  {
    q: "Where does the conversation go when I export it?",
    a: "Straight to your own downloads folder and nowhere else. The thread is painted by your browser and the PNG is encoded on your own machine, so no copy of the names, messages or avatars is ever posted anywhere. Pull the network cable after the page has loaded and the editor carries on as if nothing happened.",
  },
  {
    q: "What do the single, double and blue ticks mean?",
    a: "WhatsApp has three states and this editor exposes every one of them: a single grey tick is sent, two grey ticks are delivered, and two blue ticks (#53bdeb) mean read. Plenty of mockup tools flatten all three into one look, which is exactly the kind of slip that makes a screenshot feel wrong.",
  },
  {
    q: "Why is the iPhone header beige instead of WhatsApp green?",
    a: "Because on iOS the chat header takes its tint from the wallpaper, not from the brand green — against the stock background it reads as a warm beige. Painting that bar bright green is the single most common mistake in WhatsApp mockups, and this page avoids it on purpose.",
  },
  {
    q: "Why are the bubble corners tighter than in other tools?",
    a: "Real WhatsApp bubbles use an 8px corner radius. Many generators round them into a pill, closer to 16 or 18px, which looks fine on its own and instantly wrong beside the real app. Here you get the correct, tighter geometry.",
  },
  {
    q: "Can I attach a photo to a message?",
    a: "Yes. Any bubble can carry an image, read straight from your device and shown above whatever caption you type, with WhatsApp's own corner treatment. There is no separate upload step and nothing is sent to an image host.",
  },
  {
    q: "May I use the finished mockups in commercial work?",
    a: "For honest uses — a video, a pitch deck, a course, a novel, a design comp — yes, freely. The limit is deception: offering a composed image as somebody's real correspondence is where it stops being acceptable, and our Acceptable Use Policy spells that boundary out in full.",
  },
];

export default function WhatsAppGeneratorPage() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "WhatsApp Chat Generator",
    url: abs(CANONICAL),
    applicationCategory: "DesignApplication",
    operatingSystem: "Any (web browser)",
    browserRequirements: "Requires JavaScript. Works in modern browsers.",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Light and dark mode",
      "Custom contact name, status and avatar",
      "Blue tick read receipts (sent / delivered / read)",
      "Per-message timestamps and date separator",
      "Image attachments inside bubbles",
      "Status bar time, battery level and signal strength",
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
      { "@type": "ListItem", position: 2, name: "WhatsApp Chat Generator", item: abs(CANONICAL) },
    ],
  };

  return (
    <>
      <SiteHeader current={SLUG} />
      <JsonLd data={[webApp, faq, breadcrumb]} />

      <main className="mx-auto max-w-6xl px-5 pt-10">
        {/* 面包屑（与 JSON-LD BreadcrumbList 对应） */}
        <div className="mb-4">
          <Breadcrumb items={[{ name: "Home", href: "/" }, { name: pageName("whatsapp-chat-generator") }]} />
        </div>
        {/* ---------------- H1 + 导语 ---------------- */}
        <div className="max-w-3xl">
          <h1 className="font-display text-[34px] sm:text-[42px] font-semibold tracking-tight leading-[1.1] text-foreground">
            Free WhatsApp Chat Generator
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-black/65">
            Build a realistic WhatsApp conversation mockup in your browser and download a
            high-resolution PNG — no signup, no watermark, no upload. Edit the contact name,
            status text, avatar, message bubbles, blue ticks and timestamps, switch between
            light and dark mode, and export at 1x, 2x or 3x.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[13.5px] text-black/55">
            <span>✓ Free forever, no signup</span>
            <span>✓ Watermark-free PNG</span>
            <span>✓ Authentic beige iPhone header</span>
            <span>✓ Three-state ticks drawn correctly</span>
          </div>
        </div>

        {/* ---------------- 工具 ---------------- */}
        <div className="mt-8">
          <GeneratorShell platformId="whatsapp" />
        </div>

        {/* ---------------- 正文内容（low value content 防线） ---------------- */}
        <article className="prose-cm max-w-3xl mt-14">
          <h2>How to create a WhatsApp chat mockup in four steps</h2>
          <ol>
            <li>
              <strong>Set the contact.</strong> Put the name in <em>Contact → Name</em> and add
              a status line — <code>online</code>, <code>typing…</code> or{" "}
              <code>last seen today at 20:14</code> — so the beige iOS header reads like a
              real thread. Skip the avatar and ChatMock draws the neutral grey initial circle
              WhatsApp uses for a contact with no photo.
            </li>
            <li>
              <strong>Write the messages.</strong> Use <em>+ Alex</em> and <em>+ Me</em> to
              alternate speakers; each bubble can be flipped with the sender toggle and
              reordered with the arrows. Consecutive messages from one side stack together —
              only the first in a run keeps the little tail, the rest square off against it.
              Any photo message can take a caption.
            </li>
            <li>
              <strong>Set the blue ticks.</strong> The read state of each outgoing message is
              yours to choose: one grey tick for sent, two grey for delivered, two blue
              (<code>#53bdeb</code>) for read. A thread left at two grey ticks is normal; a
              wall of blue reads as staged.
            </li>
            <li>
              <strong>Export.</strong> Press <em>Download PNG</em> and choose a scale: 1x for
              a fast preview, 2x for screens and thumbnails, 3x when the image is headed for
              a poster or printed packaging. Leave <em>Phone frame</em> unticked for an
              ordinary capture, because a genuine screenshot never shows the handset itself;
              tick it only if you want the framed-device look for a hero image.
            </li>
          </ol>

          <h2>What makes a WhatsApp mockup actually look real</h2>
          <p>
            Most generators approximate the interface and hope nobody looks closely. WhatsApp
            users see this screen hundreds of times a day, so the tells are immediate: the
            wrong header, the wrong bubble colour, a tick that is the wrong shade of blue. On
            an iPhone the navigation bar is not green — it picks up the beige of the wallpaper,
            which is the single most-cloned mistake in WhatsApp mockups. Here are the values
            ChatMock uses, taken from the real app:
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
                  <code>#efeae2</code>
                </td>
                <td>
                  <code>#0b141a</code>
                </td>
              </tr>
              <tr>
                <td>Header bar (iPhone)</td>
                <td>
                  <code>#efeae2</code>
                </td>
                <td>
                  <code>#202c33</code>
                </td>
              </tr>
              <tr>
                <td>Incoming bubble</td>
                <td>
                  <code>#ffffff</code>
                </td>
                <td>
                  <code>#202c33</code>
                </td>
              </tr>
              <tr>
                <td>Outgoing bubble</td>
                <td>
                  <code>#d9fdd3</code>
                </td>
                <td>
                  <code>#005c4b</code>
                </td>
              </tr>
              <tr>
                <td>Blue ticks</td>
                <td>
                  <code>#53bdeb</code>
                </td>
                <td>
                  <code>#53bdeb</code>
                </td>
              </tr>
              <tr>
                <td>Timestamp / secondary text</td>
                <td>
                  <code>#667781</code>
                </td>
                <td>
                  <code>#8696a0</code>
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            Three more details matter as much as colour. <strong>Bubble radius is 8px</strong>,
            not the 16–18px pill shape most clones use. <strong>Grouped messages lose their
            tail</strong> — only the first bubble in a consecutive run from the same sender gets
            the little corner notch, and its top corner is squared off where the notch sits.
            And <strong>bubbles cap at roughly 75% of the chat width</strong>; let them run
            wider and the screenshot instantly reads as fake.
          </p>

          <h2>Everything you can customise</h2>
          <ul>
            <li>Contact name, status line and avatar photo</li>
            <li>Light or dark mode (both match the real app, not an inversion filter)</li>
            <li>Unlimited messages, reorderable, with per-message timestamps</li>
            <li>Read receipts: sent, delivered or read</li>
            <li>Image attachments with captions</li>
            <li>Date separator text (TODAY, YESTERDAY, or any label you need)</li>
            <li>Status bar: clock, battery percentage and signal strength</li>
            <li>Optional iPhone-style phone frame with the Dynamic Island</li>
          </ul>

          <h2>What a fake WhatsApp chat generator is — and what it isn&apos;t</h2>
          <p>
            People land on this page through different names: a fake WhatsApp chat generator,
            a fake WhatsApp conversation maker, a WhatsApp chat screenshot creator. They all
            describe the same tool — one that composes an image of a WhatsApp conversation
            without a real account, a real contact or a real phone. That is exactly what the
            editor above does: type the messages, set the ticks and timestamps, switch between
            light and dark mode, and download a finished PNG in seconds.
          </p>
          <p>
            The word <em>fake</em> in that search describes the image, not the intent. A
            staged conversation is a prop — everyone watching the video or reading the slide
            understands it was composed, the same way they know a stock photo is not your
            office. What the word should never describe is an image presented as real
            correspondence. That distinction — not the technology — decides whether using a
            chat generator is harmless or harmful, and the section below shows what the
            harmless side looks like in practice.
          </p>

          <h2>What people use these mockups for</h2>
          <p>
            The honest answer: mostly legitimate, boring, creative work. YouTubers and TikTok
            creators use them to stage the setup of a story without doxxing a real conversation.
            Product designers drop them into wireframe presentations to show a messaging flow
            in a familiar shell. Teachers build dialogue exercises. Novelists and screenwriters
            draft scenes that play out over text. Support teams document what a good reply looks
            like without pasting a customer&apos;s real messages into a slide.
          </p>
          <p>
            What settles it is intent. A mockup that illustrates, parodies or teaches is doing
            its job. The same picture used to convince someone that something happened which
            did not — a borrowed identity, an invented piece of evidence, a staged reply
            offered as real — is where it stops being acceptable, and we would rather not host
            that traffic. Our{" "}
            <Link href="/acceptable-use">Acceptable Use Policy</Link> draws the line in detail,
            and this tool is deliberately useless as a bank-notice or legal-document factory.
          </p>

          <h2>Why nothing you type leaves this tab</h2>
          <p>
            The contact name, the status line and every message are drawn with plain HTML and
            CSS inside your browser, and the PNG is rasterised on your own machine before it
            lands in your downloads. There is no server in the loop, which is why you can load
            the page, kill your connection and carry on editing as though nothing changed —
            and why there is no gallery of other people&apos;s staged chats sitting anywhere
            on our side.
          </p>

          <h2>Other generators</h2>
          <p>
            ChatMock is expanding one platform at a time, because a mockup is only convincing
            when the small details are right. Also live: the{" "}
            <Link href="/fake-text-message-generator">iPhone text message generator</Link>,{" "}
            the <Link href="/group-chat-generator">group chat generator</Link> and the{" "}
            <Link href="/messenger-chat-generator">Messenger chat generator</Link> — the{" "}
            <Link href="/examples">examples gallery</Link> lines their finished PNGs up side
            by side if you would rather look before you pick a platform.
          </p>

          <p>
            For a deeper walkthrough of the details above, read the full{" "}
            <Link href="/blog/how-to-make-a-fake-whatsapp-chat">WhatsApp chat screenshot guide</Link> on the blog.
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

      <SiteFooter trademark={whatsappTheme.trademark} />
    </>
  );
}
