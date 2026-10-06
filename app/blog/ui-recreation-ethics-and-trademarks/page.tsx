import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs } from "@/lib/seo";
import { getPost } from "@/lib/blog";

const SLUG = "ui-recreation-ethics-and-trademarks";
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
            Designers redraw other people&apos;s interfaces constantly. A presentation shows a
            mocked-up onboarding flow in the style of a familiar app; a case study illustrates a
            proposed feature inside a chat window everyone recognises; a classroom exercise asks
            students to critique a messaging layout. None of this involves copying a screenshot.
            It involves recreating an interface, and that practice lives in a grey zone between
            perfectly normal and genuinely risky. This piece explains the concepts that decide
            where a particular recreation sits, in general terms that apply across legal systems.
          </p>

          <h2>None of this is legal advice</h2>
          <p>
            This is a conceptual overview, not legal advice, and it should not be relied on to
            make a decision about a specific design or campaign. Trademark, copyright and
            unfair-competition rules vary by jurisdiction and by the facts of each case, and
            reasonable lawyers can disagree about the same recreation. What follows describes the
            questions courts and counsel typically ask, so that you can recognise when a project
            has crossed into territory that warrants real advice. When the stakes are commercial,
            get that advice from someone qualified in the relevant jurisdiction.
          </p>

          <h2>What trademark law protects, and what it does not</h2>
          <p>
            Trademark law, in broad outline across many systems, protects signs that identify the
            source of goods or services — names, logos, sometimes colours and shapes — against
            uses that confuse consumers about who is behind something, or that dilute a famous
            mark. What it generally does not do is grant a company ownership of a layout concept,
            a two-column conversation, or the general idea of bubbles on a background. Protection
            is about source identification, not about pixels as such.
          </p>
          <p>
            That distinction is the foundation of the whole topic. Copying a logo is a trademark
            question. Drawing a generic chat window that happens to resemble a category of apps
            is usually not, because nothing in it tells the viewer who made the software. The
            trouble starts when the recreation includes the elements that do identify a source —
            the logo, the wordmark, the distinctive visual identity — or when the surrounding
            context implies a relationship that does not exist.
          </p>

          <h2>Nominative use: naming a platform without pretending to be it</h2>
          <p>
            Many legal systems recognise some form of nominative — or referential — use: you can
            use another&apos;s trademark to refer to that other, when you genuinely need to name
            it and you do not suggest sponsorship. A tutorial titled &ldquo;how to design for
            WhatsApp&rdquo; is describing the platform. A product that presents itself as an
            official WhatsApp feature is not. The line runs through likelihood of confusion and
            implication of endorsement, not through whether the name appears.
          </p>
          <p>
            In practice, this is why mockup work so often carries a disclaimer. A clear statement
            that the recreation is not affiliated with or endorsed by the platform owner is an
            attempt to keep the use referential. It is not a magic spell — a disclaimer cannot
            undo a genuinely confusing or deceptive presentation — but it addresses the specific
            concern that a viewer might think the software came from the brand.
          </p>

          <h2>Trade dress and the &ldquo;look and feel&rdquo; question</h2>
          <p>
            Some jurisdictions protect not just names and logos but the overall appearance of a
            product or its packaging, sometimes called trade dress or get-up, where that
            appearance has become associated with a single source. Applied to software interfaces,
            this is a contested and fact-specific area: a look and feel is only protectable, if at
            all, when it is distinctive and identifies a source, and courts weigh whether the
            features are functional or generic. The reliable takeaway is that interface
            appearance is not automatically free to copy, and it is not automatically protected
            either.
          </p>
          <p>
            Because it depends on distinctiveness and on how the market reads the design, the
            answer changes with how recognisable the interface is and how it is used. Recreating
            a chat window as a neutral backdrop for a story is a long way from building a
            competing product that mimics another&apos;s interface to trade on its reputation.
          </p>

          <h2>Copyright in icons, fonts and artwork</h2>
          <p>
            Copyright is a separate question and often the more concrete one, because it attaches
            to specific expression: an illustrated icon set, a custom typeface, a piece of
            artwork, a distinctive sound. A layout of plain bubbles over a solid colour may
            contain very little protected expression. The instant you reproduce another
            company&apos;s icon artwork or embed its proprietary font, you are dealing with
            copied expression rather than an idea, and that is where copyright questions become
            real.
          </p>
          <p>
            This is why recreating an interface tends to be safer when it is genuinely a
            recreation — redrawn with your own geometry, your own iconography, your own type —
            rather than a lift of the original&apos;s assets. The most common mistakes in mockup
            work are not conceptual; they are practical, such as screenshotting real artwork or
            using a found icon file without knowing its licence. Our{" "}
            <Link href="/blog/messaging-app-ui-colour-reference">messaging app colour
            reference</Link> exists partly so that recreations can be built from documented
            values rather than from copied files.
          </p>

          <h2>Platform brand guidelines as a private rulebook</h2>
          <p>
            Independent of the law, most large platforms publish brand and developer guidelines
            describing how their marks may be used. These are contractual and policy documents,
            not statutes, but they shape the practical risk: they are cited in takedown requests,
            app store reviews and advertising rejections. Following them is not a legal safe
            harbour, and breaching them is not automatically illegal, but a project that ignores
            them invites friction that a project that reads them usually avoids.
          </p>
          <p>
            In practice, the guidelines often say sensible things: do not imply partnership, do
            not alter the mark, do not use the interface to suggest endorsement. Those map onto
            the same concerns the law is worried about, which is not a coincidence.
          </p>

          <h2>Context decides more than pixel accuracy</h2>
          <p>
            If you take one idea from this piece, take this: the legal and ethical weight of a
            recreation comes mostly from the context around it, not from how closely it matches
            the original. A pixel-accurate mockup used in an educational critique is a different
            act from the same file used to convince a customer that a platform endorses a
            product. Same pixels, different exposure, and the surrounding text, labelling and
            commercial purpose are what move it.
          </p>
          <p>
            That is why the useful questions are not &ldquo;did I get the radius right?&rdquo;
            but &ldquo;what will a viewer think this is, and what will they think about who made
            it?&rdquo; A recreation that reads as a study of a design is comfortable. One that
            reads as an official artefact from the brand is not.
          </p>

          <h2>A workable ethics test for designers</h2>
          <ul>
            <li>
              <strong>Would the brand object, and on what ground?</strong> If the answer is
              &ldquo;they would think we were impersonating them,&rdquo; the problem is
              identifiable and fixable.
            </li>
            <li>
              <strong>Does the recreation borrow identity or just style?</strong> Logos,
              wordmarks and official badges are identity. A bubble shape is closer to style.
            </li>
            <li>
              <strong>Is the asset lifted or redrawn?</strong> Redrawn geometry is one thing; a
              copied icon file is another.
            </li>
            <li>
              <strong>Is the context honest?</strong> Label illustrations as illustrations and
              keep the platform&apos;s role in the picture accurate.
            </li>
            <li>
              <strong>Would a disclaimer be accurate?</strong> If a &ldquo;not affiliated&rdquo;
              line would be true and clarifying, it is usually worth adding.
            </li>
          </ul>

          <h2>Habits that keep mockups defensible</h2>
          <p>
            None of these habits requires a lawyer, and each one lowers risk before anyone has to
            think about the law. Build interfaces from documented values rather than screenshots.
            Keep a clear, honest line between a recreation and the real product. Avoid implying
            official status or endorsement. Label illustrative material in finished work. When a
            project moves from a design exercise into a commercial advertisement, treat that as
            the moment to reconsider — the questions, and the stakes, change.
          </p>
          <p>
            We build mockups on those habits. The site&apos;s{" "}
            <Link href="/acceptable-use">Acceptable Use Policy</Link> sets out the uses we
            support, the{" "}
            <Link href="/about">about page</Link> explains the intent behind the tools, and the
            wider set of rules around{" "}
            <Link href="/blog/is-it-legal-to-use-mockups-in-ads">using mockups in advertising</Link>{" "}
            is worth reading alongside this one. Recreating an interface is an ordinary design
            activity. The work is keeping it recognisably a recreation.
          </p>
        </article>

        <div className="mt-12 border-t border-black/10 pt-6">
          <h2 className="text-[16px] font-semibold tracking-tight text-foreground">
            Related guides
          </h2>
          <ul className="mt-3 space-y-2 text-[14.5px]">
            {["is-it-legal-to-use-mockups-in-ads", "chat-mockups-in-teaching-and-research"].map(
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
