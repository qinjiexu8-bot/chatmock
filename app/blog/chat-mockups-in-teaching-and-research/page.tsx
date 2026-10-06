import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs } from "@/lib/seo";
import { getPost } from "@/lib/blog";

const SLUG = "chat-mockups-in-teaching-and-research";
const post = getPost(SLUG)!;

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: { canonical: `/blog/${SLUG}` },
  openGraph: {
    type: "article",
    url: abs(`/blog/${SLUG}`),
    title: post.title,
    description: post.description,
    images: [abs(`/og/blog/${SLUG}`)],
  },
  twitter: {
    card: "summary_large_image",
    images: [abs(`/og/blog/${SLUG}`)],
  },
};

export default function Post() {
  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "ChatMock" },
    publisher: { "@type": "Organization", name: "ChatMock", url: "https://chatmock.net" },
    mainEntityOfPage: abs(`/blog/${SLUG}`),
  };

  return (
    <>
      <SiteHeader />
      <JsonLd data={article} />

      <main className="mx-auto max-w-3xl px-5 pt-12">
        <div className="mb-3">
          <Breadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: "Blog", href: "/blog" },
              { name: post.title },
            ]}
          />
        </div>
        <p className="text-[13px] text-black/55">
          {post.date} · {post.readMinutes} min read
        </p>
        <h1 className="font-display mt-2 text-[32px] sm:text-[38px] font-semibold tracking-tight leading-[1.15] text-foreground">
          {post.title}
        </h1>

        <article className="prose-cm mt-8">
          <p>
            A staged conversation is, in the right setting, a serious instrument. Teachers use
            fabricated exchanges to build case studies and prompt discussion. Researchers use
            them as stimuli in controlled studies. Product teams use them to test how a feature
            feels before it exists. In every one of those settings the mockup is understood by
            everyone involved to be a constructed thing — and that shared understanding is what
            separates a legitimate use from a deceptive one. This piece is about how
            practitioners use chat mockups well, and where the boundaries sit.
          </p>

          <h2>Why staged conversations work as a teaching device</h2>
          <p>
            Conversations are the natural format for material about communication, negotiation,
            conflict and online behaviour, because they carry context in a form students already
            read fluently. A screenshot of a messaging exchange gives a class something concrete
            to analyse: tone, pacing, escalation, what was left unsaid. Compared with a
            paragraph of description, it lets students point at evidence on the screen and argue
            about it.
          </p>
          <p>
            The key design property is that the content is under the instructor&apos;s control.
            A teacher building an exercise can tune the exchange to isolate exactly the feature
            being taught — a boundary being crossed, a misread signal, a moment where someone
            could have de-escalated — which a real conversation scraped from somewhere would not
            allow. Staging is not a shortcut here; it is the point.
          </p>

          <h2>Designing exercises that make students think</h2>
          <p>
            The strongest exercises use a mockup as a prompt, not as an answer key. An exchange
            that ends ambiguously invites students to judge what happened and defend their
            reading; one that ends with an obvious villain teaches less. Borrowing layout
            accuracy from the{" "}
            <Link href="/blog/messaging-app-ui-colour-reference">colour reference</Link> makes
            the artefact feel like the real thing, which raises engagement, while the content
            stays deliberately unresolved.
          </p>
          <p>
            Good practice also means building variants. Two versions of the same exchange, one
            where a message is answered quickly and one where it is ignored, let a class examine
            how small changes alter meaning. This kind of controlled comparison is exactly what
            fictional stimuli are for, and it is almost impossible to assemble from authentic
            conversations while respecting the privacy of the people in them.
          </p>

          <h2>Informed consent in user research</h2>
          <p>
            When a mockup is used in a study with human participants, the ethical centre of
            gravity shifts from the artefact to the participant. Participants should know what
            they are looking at and what is being measured, and they should be able to withdraw.
            Showing a fabricated interface without context, especially where the study is about
            trust or deception, needs deliberate justification and, normally, review by an ethics
            body or institutional review process appropriate to the setting.
          </p>
          <p>
            Practice varies widely by field and institution, so it is worth being explicit about
            what the study design actually requires rather than assuming. The general principle
            that most research ethics frameworks share is straightforward: participants should
            not be misled about the nature of the research itself, even when the research
            materials involve fiction.
          </p>

          <h2>Prototyping before the real interface exists</h2>
          <p>
            In product work, a mockup does a different job: it stands in for an interface that
            has not been built. A staged conversation lets a team test how a notification feels,
            how much text a bubble can hold, or whether a proposed feature changes the rhythm of
            a thread — all before writing code. The mockup is a thinking tool, and its accuracy
            matters only insofar as it shapes the reaction you are trying to measure.
          </p>
          <p>
            The common failure mode is treating a polished mockup as a validated design. A
            screenshot that looks finished invites stakeholders to react to its surface rather
            than to the question underneath. Teams that get value from this practice tend to be
            explicit that the artefact is disposable and that what is being tested is a
            hypothesis, not a product. If you are prototyping inside a specific platform&apos;s
            layout, a tool such as our{" "}
            <Link href="/whatsapp-chat-generator">WhatsApp chat generator</Link> or{" "}
            <Link href="/telegram-chat-generator">Telegram chat generator</Link> can produce a
            realistic surface quickly, which is useful precisely because the interface is not the
            thing being invented.
          </p>

          <h2>The line between a stimulus and a fake</h2>
          <p>
            Everything above depends on a shared premise: the people who encounter the mockup
            understand that it is constructed. The moment that premise breaks, the same artefact
            changes character. A staged exchange used to teach or to test is a stimulus. The same
            exchange presented to someone as a record of what a real person said is a deception,
            regardless of how it was made.
          </p>
          <p>
            That is why labelling is not a bureaucratic afterthought in this work; it is the
            thing that keeps the practice on the right side. In teaching material, in
            publications, in studies and in prototypes, saying plainly that the conversation is
            illustrative protects both the audience and the practitioner. The{" "}
            <Link href="/acceptable-use">Acceptable Use Policy</Link> draws the same line for the
            tools on this site: illustration, teaching and design yes; impersonation and
            evidence-faking no.
          </p>

          <h2>Citing and labelling mockups in publications</h2>
          <p>
            If a constructed conversation appears in a paper, a slide deck or a public report,
            the reader needs to be able to tell it apart from real data. A caption or a footnote
            that states the conversation is fictional and describes how it was produced does more
            than satisfy an ethics requirement — it lets other researchers understand the method.
            Where a mockup is a stimulus in a study, describing how it was built and what was
            varied is part of making the work reproducible.
          </p>
          <p>
            The same discipline applies to visual style. A mockup that is obviously an
            illustration in context is self-labelling in part; a pixel-perfect recreation with no
            caption is not. The more faithful the artefact, the more the labelling has to carry.
            That is a design tension worth resolving on purpose rather than by accident.
          </p>

          <h2>Accessibility and inclusion in staged screens</h2>
          <p>
            Fictional interfaces are also an opportunity, because everything in them is a choice.
            Names, avatars and message content can reflect a range of people rather than default
            to a single demographic, and colour choices can be checked against contrast
            requirements so the material works for readers with low vision. Where a mockup is
            used as a stimulus in a study, the accessibility of the artefact is part of the
            accessibility of the study.
          </p>
          <p>
            It is also worth remembering that the platforms being imitated have accessibility
            features of their own — larger text settings, reduced motion, high-contrast modes —
            and a mockup that ignores them can misrepresent how a real interface behaves for some
            users. For teaching material about interface design, that is a teaching point in
            itself.
          </p>

          <h2>Building a reusable mockup library for a course or team</h2>
          <p>
            Once a course or a team depends on staged conversations, the sensible move is to
            treat them as assets: a small library of scenes, each documented with what it is for,
            what it varies and a clear statement that it is fictional. This saves rebuilding from
            scratch, keeps labelling consistent, and makes it easy to retire material that has
            gone stale as the interfaces it imitates change.
          </p>
          <p>
            A library also makes review practical. Instead of judging each artefact in isolation,
            a team can hold one standard — every item labelled, every stimulus documented, every
            reproduction built rather than lifted — and check new material against it. The{" "}
            <Link href="/examples">examples gallery</Link> shows the kind of complete scenes that
            can seed such a set, and the notes on{" "}
            <Link href="/blog/ui-recreation-ethics-and-trademarks">recreating interfaces</Link>{" "}
            cover how to build them without borrowing another company&apos;s assets.
          </p>
          <p>
            Used this way, chat mockups sit comfortably alongside other teaching and research
            tools. They are constructed objects that say so, put to work answering real questions.
            The value was never in the fidelity alone; it was in the control that lets a teacher
            or researcher shape a case to the exact point they want to examine. A colleague can
            pick up the same scene, change one variable, and compare results, which is far harder
            to arrange with material drawn from real conversations.
          </p>
        </article>

        <div className="mt-12 border-t border-black/10 pt-6">
          <h2 className="text-[16px] font-semibold tracking-tight text-foreground">
            Related guides
          </h2>
          <ul className="mt-3 space-y-2 text-[14.5px]">
            {["ui-recreation-ethics-and-trademarks", "screenshot-metadata-and-authenticity"].map(
              (rslug) => {
                const rel = getPost(rslug)!;
                return (
                  <li key={rslug}>
                    <Link href={`/blog/${rslug}`} className="text-primary hover:underline underline-offset-2">
                      {rel.title}
                    </Link>
                  </li>
                );
              }
            )}
          </ul>
        </div>

        <p className="mt-10 text-[14px]">
          <Link href="/blog" className="text-primary underline underline-offset-2">
            ← Back to the blog
          </Link>
        </p>
      </main>

      <SiteFooter />
    </>
  );
}
