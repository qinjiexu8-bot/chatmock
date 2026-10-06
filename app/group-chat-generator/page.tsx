import type { Metadata } from "next";
import Link from "next/link";
import GeneratorShell from "@/components/generator/GeneratorShell";
import Breadcrumb from "@/components/Breadcrumb";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs, site, pageName } from "@/lib/seo";
import { groupChatTheme } from "@/lib/themes";

const SLUG = "group-chat-generator";
const CANONICAL = `/${SLUG}`;

export const metadata: Metadata = {
  title: "Free Group Chat Generator — Multiple Participants, No Signup",
  description:
    "Create realistic WhatsApp group chat mockups with multiple participants, coloured sender names and per-member avatars. Free, no signup, no watermark, high-resolution PNG export.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
    url: abs(CANONICAL),
    images: [abs(`/og/${SLUG}`)],
    title: "Free Group Chat Generator — Multiple Participants, No Signup",
    description:
      "Build realistic WhatsApp group chat mockups with coloured sender names and multiple participants. Free, no signup, PNG export.",
  },
  twitter: {
    card: "summary_large_image",
    images: [abs(`/og/${SLUG}`)],
  },
};

const FAQ = [
  {
    q: "How many people can I put in one group?",
    a: "As many as the scene calls for — there is no fixed ceiling, and the editor simply grows a scrollable member list with a name and a colour for each. For believability, three to eight active voices is the range most real group threads sit in.",
  },
  {
    q: "Why is every sender's name a different colour?",
    a: "Because WhatsApp assigns each member a colour from a fixed palette so messages can be attributed at a glance, and this generator copies that rule: pick a colour per member or let the automatic assignment do it.",
  },
  {
    q: "Why is my own name missing from my messages?",
    a: "That is correct, not a bug. Outgoing messages sit on the right with no label — you already know they are yours — while incoming messages carry the sender's name in their colour. Generators that name your own bubbles are recognised as fakes at once.",
  },
  {
    q: "Why don't members have profile pictures in the thread?",
    a: "Because real WhatsApp groups do not show them: the thread uses coloured names, not avatars, and adding photos there would immediately look fake. You can still set the group photo in the header — and if a scene really needs a face per speaker, the Discord chat generator accepts an avatar for every participant.",
  },
  {
    q: "What does a blue tick mean in a group?",
    a: "Blue means every member has read the message, which is why genuine group threads usually sit at two grey ticks instead. A mockup where every message is blue-read tends to feel staged, so the editor lets you leave most of them delivered.",
  },
  {
    q: "Is the group chat generator free?",
    a: "Completely. Participants, unlimited messages, dark mode and PNG download are all open with no signup and no email gate, and the exported file carries no watermark from us.",
  },
  {
    q: "Do the member names and messages leave my device?",
    a: "They do not. Everything is painted in your browser and the PNG is generated locally, so the group name, the members and the dialogue stay on your machine. Disconnect after loading the page and the editor will keep working as proof.",
  },
  {
    q: "Can I sell or publish the group mockups?",
    a: "The mockups are yours to use in legitimate work — a video, a course, a demo, a novel, a design. Faking evidence, impersonating a person or group, or otherwise deceiving people is off-limits; the Acceptable Use Policy has the details.",
  },
];

export default function GroupChatGeneratorPage() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Group Chat Generator",
    url: abs(CANONICAL),
    applicationCategory: "DesignApplication",
    operatingSystem: "Any (web browser)",
    browserRequirements: "Requires JavaScript. Works in modern browsers.",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Unlimited participants with editable names",
      "Coloured sender names from the real palette",
      "Member list as the header subtitle",
      "Blue tick read receipts (sent / delivered / read)",
      "Light and dark mode",
      "Image attachments inside bubbles",
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
      { "@type": "ListItem", position: 2, name: "Group Chat Generator", item: abs(CANONICAL) },
    ],
  };

  return (
    <>
      <SiteHeader current={SLUG} />
      <JsonLd data={[webApp, faq, breadcrumb]} />

      <main className="mx-auto max-w-6xl px-5 pt-10">
        {/* 面包屑（与 JSON-LD BreadcrumbList 对应） */}
        <div className="mb-4">
          <Breadcrumb items={[{ name: "Home", href: "/" }, { name: pageName("group-chat-generator") }]} />
        </div>
        <div className="max-w-3xl">
          <h1 className="font-display text-[34px] sm:text-[42px] font-semibold tracking-tight leading-[1.1] text-foreground">
            Free Group Chat Generator
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-black/65">
            Build a realistic group chat mockup with multiple participants, coloured sender
            names and blue ticks — no signup, no watermark, no upload. Add as many members as
            the scene needs, write the conversation, and export a high-resolution PNG at 1x,
            2x or 3x.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[13.5px] text-black/55">
            <span>✓ Free with unlimited members</span>
            <span>✓ No watermark anywhere</span>
            <span>✓ Names coloured per participant</span>
            <span>✓ Works on any phone or laptop</span>
          </div>
        </div>

        <div className="mt-8">
          <GeneratorShell platformId="group-chat" />
        </div>

        <article className="prose-cm max-w-3xl mt-14">
          <h2>How to create a group chat mockup in four steps</h2>
          <ol>
            <li>
              <strong>Name the group.</strong> Enter the group title in{" "}
              <em>Contact → Name</em> and set the subtitle to the member roll — on the real app
              that line reads like <code>You, Alex, Sam, Jordan</code>, and it is the first
              detail the eye checks under the title.
            </li>
            <li>
              <strong>Add the speakers.</strong> <em>+ Add participant</em> creates as many
              members as the scene needs; each one takes a name and a colour drawn from
              WhatsApp&apos;s own palette. <em>You</em> is fixed, because the screenshot is
              written from your side of the thread.
            </li>
            <li>
              <strong>Write the exchange.</strong> Every message carries a sender dropdown, so
              dialogue can bounce between members the way a real group zigzags. The rule to
              remember is the tick logic: blue only appears once <em>every</em> member has
              read, which is why most group messages sit at two grey ticks. Any message can
              hold a captioned photo.
            </li>
            <li>
              <strong>Export.</strong> Set the scale — 1x for a quick look, 2x for the web,
              3x for print — then press <em>Download PNG</em>. The frame stays off so you get
              the clean, edge-to-edge capture a phone actually saves; enable{" "}
              <em>Phone frame</em> only when the group shot has to read as a physical device
              in a thumbnail or slide.
            </li>
          </ol>

          <h2>What makes a group chat screenshot look real</h2>
          <p>
            Group chats are harder to fake than one-to-one conversations, because there are
            more moving parts and the eye catches inconsistency fast. These are the details
            ChatMock handles:
          </p>
          <ul>
            <li>
              <strong>Coloured sender names.</strong> Every incoming message shows the
              sender&apos;s name in their assigned colour. Your own outgoing messages never
              carry a name label.
            </li>
            <li>
              <strong>Member count in the header.</strong> The line under the group name lists
              the members — a group of five that only ever shows two speakers reads as fake
              immediately, so add quiet members too.
            </li>
            <li>
              <strong>Correct tick semantics.</strong> One grey tick (sent), two grey ticks
              (delivered), two blue ticks (read). In groups, blue ticks mean every member has
              read it — which is why most real group messages sit at two grey ticks. Mockups
              where every message is blue-read tend to look staged.
            </li>
            <li>
              <strong>Message grouping.</strong> Consecutive messages from the same sender
              share bubble alignment, and only the first message in a run gets the corner
              notch.
            </li>
          </ul>

          <h2>Everything you can customise</h2>
          <ul>
            <li>Group name and member-list subtitle</li>
            <li>Unlimited participants, each with an editable name and colour</li>
            <li>Unlimited messages, reorderable, any sender</li>
            <li>Read receipts per outgoing message: sent, delivered or read</li>
            <li>Image attachments with captions</li>
            <li>Date separator text</li>
            <li>Status bar: clock, battery and signal</li>
            <li>Light and dark mode</li>
            <li>Optional iPhone-style phone frame</li>
          </ul>

          <h2>What people use group chat mockups for</h2>
          <p>
            The group format is where most creative requests live. A comedy sketch needs four
            friends arguing about weekend plans. A course module shows a team coordinating a
            project. A screenwriter drafts the scene where the group thread falls apart. A
            product team demos how a support conversation would look in a community group.
            All of these have the same requirement: the conversation has to feel like it
            happened between several real people, which is exactly what the per-member
            colours and names are for.
          </p>
          <p>
            Intent is the deciding factor here, as it is across ChatMock. Illustrated, parodied,
            taught and designed conversations are all fine; a fabricated thread deployed to
            deceive, to stalk or harass, to impersonate a group, or to fake evidence is not.
            You will find no templates for bank, government, medical or legal notices here —
            the full rule lives in the{" "}
            <Link href="/acceptable-use">Acceptable Use Policy</Link>.
          </p>

          <h2>No server ever sees the group</h2>
          <p>
            The group title, the member roll and every message are rendered with plain HTML and
            CSS on your own machine, and the PNG is written to disk locally. Because no copy is
            uploaded, there is no server-side record of your members or dialogue to leak — and
            pulling the network cable after the page loads changes nothing at all.
          </p>

          <h2>Other generators</h2>
          <p>
            Need a one-to-one conversation instead? The{" "}
            <Link href="/whatsapp-chat-generator">WhatsApp chat generator</Link> handles
            single chats with blue ticks and dark mode, the{" "}
            <Link href="/fake-text-message-generator">iPhone text message generator</Link>{" "}
            covers iMessage-style threads, and the{" "}
            <Link href="/messenger-chat-generator">Messenger chat generator</Link> handles
            Facebook conversations. If you are still deciding which format fits your scene,
            the <Link href="/blog">blog</Link> walks through one-to-one versus group mockups.
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

      <SiteFooter trademark={groupChatTheme.trademark} />
    </>
  );
}
