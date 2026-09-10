import type { Metadata } from "next";
import Link from "next/link";
import GeneratorShell from "@/components/generator/GeneratorShell";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs, site } from "@/lib/seo";
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
    title: "Free Group Chat Generator — Multiple Participants, No Signup",
    description:
      "Build realistic WhatsApp group chat mockups with coloured sender names and multiple participants. Free, no signup, PNG export.",
  },
  twitter: { card: "summary_large_image" },
};

const FAQ = [
  {
    q: "How many participants can I add?",
    a: "As many as you need. There is no hard cap — the editor grows a scrollable participant list, and each member gets a name and a colour. For realism, most convincing mockups use between three and eight active speakers, which is also how real group chats behave.",
  },
  {
    q: "Why do sender names have different colours?",
    a: "Because the real app does it. WhatsApp assigns each group member a name colour from a fixed palette so messages are attributable at a glance. This generator uses the same behaviour — pick a colour per member, or accept the automatic assignment.",
  },
  {
    q: "Why does my own name not appear on my messages?",
    a: "That is correct behaviour, not a bug. In the real app, outgoing messages sit on the right without a name label — you know they are yours. Incoming messages carry the sender's name in their assigned colour. Generators that label your own bubbles are instantly recognisable as fakes.",
  },
  {
    q: "Is this group chat generator free?",
    a: "Yes. Adding participants, unlimited messages, dark mode and PNG export at 1x, 2x or 3x are all free, with no signup, no email wall and no watermark on the output.",
  },
  {
    q: "Is my conversation uploaded to a server?",
    a: "No. Everything is rendered in your browser and the PNG is generated on your device. Nothing you type — the group name, the members, the messages — ever leaves your computer or phone. You can confirm this by disconnecting from the internet after loading the page; the editor keeps working.",
  },
  {
    q: "Can I use my own avatars for each member?",
    a: "Per-member avatar upload is on the roadmap. The contact avatar field is available today, and members without photos render as neutral initial circles, exactly like the real app does for contacts without a profile photo.",
  },
  {
    q: "Can I use the mockups commercially?",
    a: "Yes, for legitimate creative work: videos, presentations, teaching material, fiction and design. You may not use them to deceive, defraud, harass, impersonate anyone or fabricate evidence. The Acceptable Use Policy has the full boundary.",
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
        <div className="max-w-3xl">
          <h1 className="text-[34px] sm:text-[42px] font-semibold tracking-tight leading-[1.1] text-[#0f1c17]">
            Free Group Chat Generator
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-black/65">
            Build a realistic group chat mockup with multiple participants, coloured sender
            names and blue ticks — no signup, no watermark, no upload. Add as many members as
            the scene needs, write the conversation, and export a high-resolution PNG at 1x,
            2x or 3x.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[13.5px] text-black/55">
            <span>✓ No account required</span>
            <span>✓ No watermark, ever</span>
            <span>✓ Nothing leaves your device</span>
            <span>✓ Works on mobile</span>
          </div>
        </div>

        <div className="mt-8">
          <GeneratorShell platformId="group-chat" />
        </div>

        <article className="prose-cm max-w-3xl mt-14">
          <h2>How to create a group chat mockup in four steps</h2>
          <ol>
            <li>
              <strong>Name the group.</strong> Type the group name into{" "}
              <em>Contact → Name</em>. Set the subtitle to the member list — on the real app
              this line reads like <code>You, Alex, Sam, Jordan</code>, and getting it right
              matters more than most people expect, because it is the first thing the eye
              checks under the group name.
            </li>
            <li>
              <strong>Add the members.</strong> Use <em>+ Add participant</em> to create as
              many speakers as the scene needs. Each member gets a name and a colour from the
              same palette the real app draws from. You is fixed — it is the perspective of
              the screenshot.
            </li>
            <li>
              <strong>Write the conversation.</strong> Every message has a sender dropdown, so
              you can bounce the dialogue between members exactly the way a real group
              conversation zigzags. Upload an image on any message to turn it into a photo
              bubble with a caption.
            </li>
            <li>
              <strong>Export.</strong> Choose 1x, 2x or 3x and hit <em>Download PNG</em>. Turn
              off <em>Phone frame</em> if you are dropping the screenshot into a thumbnail or
              a slide rather than showing a whole phone.
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
            <li>Status bar: clock, carrier, battery and signal</li>
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
            As with every tool on this site, the line is intent. Illustrating, parodying,
            teaching and designing are fine. Using a fabricated group conversation to deceive
            someone, harass a person, impersonate a group or fabricate evidence is not — and
            there are no templates on this site for fake bank, government, medical or legal
            notices. The <Link href="/acceptable-use">Acceptable Use Policy</Link> has the
            full boundary.
          </p>

          <h2>Why it runs entirely in your browser</h2>
          <p>
            Your group name, members and messages are rendered locally with plain HTML and
            CSS, and the PNG is generated on your device. Nothing is transmitted, which is why
            the editor keeps working with your wifi switched off. It also means there is no
            gallery of other people&apos;s staged conversations sitting on a server somewhere.
          </p>

          <h2>Other generators</h2>
          <p>
            Need a one-to-one conversation instead? The{" "}
            <Link href="/whatsapp-chat-generator">WhatsApp chat generator</Link> handles
            single chats with blue ticks and dark mode, the{" "}
            <Link href="/fake-text-message-generator">iPhone text message generator</Link>{" "}
            covers iMessage-style threads, and the{" "}
            <Link href="/messenger-chat-generator">Messenger chat generator</Link> handles
            Facebook conversations. See the{" "}
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

      <SiteFooter trademark={groupChatTheme.trademark} />
    </>
  );
}
