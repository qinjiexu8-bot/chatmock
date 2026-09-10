import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Acceptable Use Policy",
  description:
    "What ChatMock mockups may and may not be used for. Chat mockups are for illustration, parody, teaching and design — not for deception, harassment, impersonation or fabricated evidence.",
  alternates: { canonical: "/acceptable-use" },
  robots: { index: true, follow: true },
};

export default function AcceptableUsePage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 pt-12">
        <h1 className="font-display text-[32px] font-semibold tracking-tight text-foreground">
          Acceptable Use Policy
        </h1>
        <p className="mt-2 text-[14px] text-black/50">Last updated: September 2026</p>

        <article className="prose-cm mt-8">
          <p>
            ChatMock generates images of fictional conversations. They are a design and
            illustration asset. This policy exists because a tool that produces realistic
            screenshots can be misused, and we would rather state the boundary plainly than
            discover it later.
          </p>

          <h2>Allowed</h2>
          <ul>
            <li>Video, film and social content where the conversation is clearly staged</li>
            <li>UI/UX presentations, wireframes, product demos and pitch decks</li>
            <li>Teaching materials, dialogue exercises and classroom examples</li>
            <li>Fiction, scriptwriting, comics and storytelling</li>
            <li>Personal jokes and pranks among consenting adults, where nobody is harmed
              and nobody is misled about anything that matters</li>
            <li>Parody and commentary, where a reasonable viewer would understand it is not
              a real conversation</li>
          </ul>

          <h2>Not allowed</h2>
          <ul>
            <li>
              <strong>Deception and fraud.</strong> Using a mockup to make someone believe a
              conversation occurred when it did not, especially to obtain money, credentials,
              access or any material advantage.
            </li>
            <li>
              <strong>Fabricated evidence.</strong> Submitting or preparing a mockup for use in
              legal, disciplinary, immigration, insurance, employment or academic proceedings.
            </li>
            <li>
              <strong>Impersonation.</strong> Presenting a fabricated conversation as the words
              of a real person, company, institution or public figure in a way that damages
              them or misleads others.
            </li>
            <li>
              <strong>Harassment, defamation and abuse.</strong> Including revenge contexts,
              bullying, stalking, and non-consensual intimate content.
            </li>
            <li>
              <strong>Forged documents and institutional notices.</strong> ChatMock is not a
              tool for producing fake bank alerts, payment confirmations, invoices, tax or
              government communications, medical records, court or police notices, or shipping
              and delivery confirmations. We do not build templates for these, and using the
              tool to approximate them is prohibited.
            </li>
            <li>
              <strong>Minors.</strong> Any sexualised, exploitative or harmful content
              involving minors. No exceptions, and we report it.
            </li>
            <li>
              <strong>Misinformation at scale.</strong> Manufacturing conversations to support
              a false claim about a person, company, election, public health matter or
              emergency.
            </li>
          </ul>

          <h2>Why the &ldquo;no fake documents&rdquo; line is drawn there</h2>
          <p>
            A fake chat between two friends is theatre. A fake bank transfer notification is a
            fraud instrument — it exists to make someone release money or data. The distinction
            is not about how realistic the image is, it is about what it is for. That is the
            line this policy enforces, and it is why you will not find banking, government,
            medical or legal templates anywhere on this site.
          </p>

          <h2>What we can and cannot do</h2>
          <p>
            Everything you create is rendered in your own browser. We do not receive, store or
            see your conversations, so we cannot proactively review them and we have nothing to
            hand over. What we can do is remove features that exist mainly to enable abuse,
            refuse to build the templates listed above, and cooperate fully with lawful
            requests about the site itself.
          </p>

          <h2>Reporting</h2>
          <p>
            If you believe someone has used ChatMock to create an image that violates this
            policy, contact us with the image and the context. Include the platform where you
            encountered it. Reports about content hosted elsewhere are best directed at that
            platform first, since that is where it can actually be taken down — but we will
            review every report we receive.
          </p>

          <h2>Contact</h2>
          <p>
            hello@chatmock.net — subject line <strong>Acceptable Use</strong>.
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
