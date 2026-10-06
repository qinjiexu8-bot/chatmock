import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs } from "@/lib/seo";
import { getPost } from "@/lib/blog";

const SLUG = "is-it-legal-to-use-mockups-in-ads";
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
            A staged chat screenshot has become a standard advertising device. Brands show a
            customer raving about a product, a support bot resolving an issue, a group of friends
            planning a trip around a service. The format borrows the trust people extend to
            conversation, and it works. It also runs into a set of rules that most marketers
            never think about until a complaint lands: advertising disclosure, endorsement rules,
            platform brand guidelines and consumer protection law. This piece maps the terrain in
            general terms. It is written for a global audience, so it deliberately avoids
            country-specific conclusions.
          </p>

          <h2>This is not legal advice, and why that matters</h2>
          <p>
            Nothing here is legal advice, and reading it does not create any kind of professional
            relationship. Advertising, trademark and consumer law differ substantially between
            jurisdictions and change over time; a practice that is routine in one country can be
            regulated in another. The aim of this article is to name the questions you should be
            asking and the general principles that most legal systems share, not to answer them
            for your specific campaign. If an advertisement carries real commercial risk, the
            only responsible move is to consult a qualified lawyer in the jurisdiction where it
            will run.
          </p>
          <p>
            The reason to say this plainly is that &ldquo;is it legal?&rdquo; has no single
            answer. The honest version of the answer is almost always &ldquo;it depends on
            where, on what the ad claims, and on how a reasonable member of the audience
            understands it.&rdquo; Everything below is written inside that frame.
          </p>

          <h2>The first question is disclosure, not the mockup</h2>
          <p>
            Regulators in many jurisdictions focus less on whether a conversation was staged and
            more on whether the audience is likely to be misled about it. A obviously stylised,
            cartoon-ish chat used as a design motif reads as decoration. A screenshot presented
            as a real, unedited customer exchange reads as a factual claim: that this
            conversation happened, with this person, saying this. The same pixels can fall on
            either side, and what moves them is context — surrounding copy, visual style, and
            whether anything signals that the image is illustrative.
          </p>
          <p>
            This is why the general principle most systems share is about impression rather than
            technique. Ask what a reasonable viewer would take the image to mean. If the answer
            is &ldquo;a real customer said this,&rdquo; then the mockup is functioning as a
            testimonial, and testimonial rules apply. If the answer is &ldquo;this is a designed
            illustration of our product,&rdquo; the exposure is usually different.
          </p>

          <h2>Testimonials and endorsements are the highest-risk use</h2>
          <p>
            The riskiest pattern is a fabricated conversation that presents invented praise as
            though it came from a real customer. In many jurisdictions, advertising rules
            require endorsements to reflect genuine opinion and to be based on real experience,
            and they require a material connection between an endorser and the advertiser to be
            disclosed. A made-up chat attributed to an invented person sits awkwardly against
            those principles, and a chat attributed to a real, identifiable person without their
            permission is worse.
          </p>
          <p>
            The safer construction is to separate the illustration from the claim. Use a mockup
            to show how a product feels to use, with a visible label that it is an illustration;
            keep the actual testimonial claims in a channel where you can substantiate them. Many
            brands do exactly this — the chat image sells the experience, the copy carries the
            claims, and the two are not fused together.
          </p>

          <h2>Platform brand guidelines are not law, but they bind you</h2>
          <p>
            Separate from any statute, each messaging platform publishes its own rules about how
            its name, logo and interface may appear in third-party material. Those are private
            terms, not legislation, but they are enforceable through trademark law, app store
            policies, advertising network reviews and, in practice, the platform simply
            complaining to your host or ad platform. Using another company&apos;s interface to
            suggest that they endorse your product is a common tripwire.
          </p>
          <p>
            For mockup work, the practical reading is to avoid implying a partnership, a
            sponsorship or an official status that does not exist. The deeper questions about
            recreating interfaces at all — trademark, trade dress and the boundaries of fair use
            — are their own topic, covered in{" "}
            <Link href="/blog/ui-recreation-ethics-and-trademarks">the interface recreation
            guide</Link>.
          </p>

          <h2>Consumer protection and the &ldquo;likely to mislead&rdquo; test</h2>
          <p>
            Most consumer protection frameworks converge on a similar idea: advertising must not
            be likely to mislead a reasonable consumer about a material fact. A fake chat can
            mislead in quiet ways. A staged exchange that implies a discount is permanent, a
            treatment is medically effective, or a financial return is typical is not primarily
            a screenshot problem — it is a claims problem, and the format simply carries the
            claim in a more believable wrapper.
          </p>
          <p>
            Because the underlying test is about the impression created, the general advice is to
            audit what your mockup <em>implies</em>, not just what it literally says. Invented
            numbers, invented urgency, and invented third-party praise are the usual ingredients
            of a complaint, regardless of how well or badly the interface was drawn.
          </p>

          <h2>Comparative and review-style advertising</h2>
          <p>
            A related pattern is the mockup that stages a comparison: a customer praising your
            product and disparaging a named competitor, in the form of a chat. Comparative claims
            carry their own rules in many places, and they usually require the comparison to be
            truthful, substantiated and not misleading. Fabricating a conversation in which an
            invented person dislikes a competitor is a weak foundation for a claim you may be
            asked to prove.
          </p>
          <p>
            Even where no specific comparative rule applies, naming a competitor in a staged
            conversation raises trademark and unfair-competition questions. As a default posture,
            keep fabricated chats about your own product and your own category, and let
            comparisons live in copy you can defend.
          </p>

          <h2>Copyright and trademark inside the advertisement</h2>
          <p>
            A mockup that redraws a well-known chat interface brings two intellectual property
            questions into the ad at once: the company&apos;s trademarks in its name and visual
            identity, and any copyright in its icons, fonts or artwork. Trademark law generally
            cares about whether use creates confusion about source or implies endorsement;
            copyright generally cares about copying protected expression. The two overlap but
            answer different questions, which is why &ldquo;it is just a layout&rdquo; is not
            automatically a complete defence.
          </p>
          <p>
            When the ad&apos;s whole purpose is to look like a real conversation on a specific
            platform, the risk that a viewer reads the interface as an endorsement of your
            product is higher than when the chat is generic. That is a contextual judgement, not
            a bright line, and it is exactly the kind of judgement a lawyer should make before a
            large campaign runs.
          </p>

          <h2>A practical checklist before you publish</h2>
          <ul>
            <li>
              <strong>Label illustrative content.</strong> If the conversation did not happen,
              make the ad visually signal that it is a representation rather than a record.
            </li>
            <li>
              <strong>Do not invent endorsers.</strong> Attribute praise only to real people who
              gave it, and disclose paid or material relationships where required.
            </li>
            <li>
              <strong>Check the platform&apos;s own guidelines.</strong> Many brands publish
              rules about using their name and interface; read them before, not after.
            </li>
            <li>
              <strong>Audit the implications.</strong> List the factual claims your mockup
              implies and confirm each one is true and substantiated.
            </li>
            <li>
              <strong>Separate illustration from claims.</strong> Let visuals sell the
              experience and keep the verifiable claims in copy you can stand behind.
            </li>
            <li>
              <strong>Keep a record.</strong> Note where each image came from and what it was
              labelled, so a later question has an answer.
            </li>
          </ul>

          <h2>When to actually ask a lawyer</h2>
          <p>
            General principles are useful for shaping a habit; they are not a substitute for
            advice on a specific campaign. If your advertisement makes health, financial or
            safety claims, if it names a competitor, if it uses a real person&apos;s name or
            likeness, or if it deliberately mimics a major brand&apos;s interface to borrow its
            trust, the sensible threshold for getting professional advice has been crossed. The
            size of the campaign and the jurisdiction it runs in decide how much that matters.
          </p>
          <p>
            Within those limits, the spirit of the rules is easier to follow than the letter. Do
            not use a staged conversation to make someone believe something untrue. Our own
            position on that is set out in the{" "}
            <Link href="/acceptable-use">Acceptable Use Policy</Link>, and the reasoning behind
            the hardest case — fabricated financial notices — is in{" "}
            <Link href="/blog/why-we-refuse-fake-bank-alerts">why we refuse to make fake bank
            alerts</Link>. Marketing use of a labelled illustration is a different act from
            passing off an image as a record, and keeping that difference visible is most of the
            work. See also the{" "}
            <Link href="/terms">site terms</Link> for how that applies to tools built here.
          </p>
        </article>

        <div className="mt-12 border-t border-black/10 pt-6">
          <h2 className="text-[16px] font-semibold tracking-tight text-foreground">
            Related guides
          </h2>
          <ul className="mt-3 space-y-2 text-[14.5px]">
            {["ui-recreation-ethics-and-trademarks", "why-we-refuse-fake-bank-alerts"].map(
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
