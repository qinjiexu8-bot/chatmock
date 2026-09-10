import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs } from "@/lib/seo";
import { getPost } from "@/lib/blog";

const SLUG = "why-we-refuse-fake-bank-alerts";
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
        <p className="text-[13px] text-black/40">
          {post.date} · {post.readMinutes} min read
        </p>
        <h1 className="font-display mt-2 text-[32px] sm:text-[38px] font-semibold tracking-tight leading-[1.15] text-foreground">
          {post.title}
        </h1>

        <article className="prose-cm mt-8">
          <p>
            If you run a mockup tool, one search term keeps offering itself to you: fake bank
            alert generator. The search volume is real, the traffic is easy, and the exit
            analytics from sites that serve it tell you exactly what happens next — a large
            share of visitors screenshot a fabricated payment notification and send it to
            someone as proof. We decided on day one that ChatMock would never build templates
            for bank notifications, payment receipts, government documents or legal papers. This
            post is the reasoning, because the decision shapes what this site is.
          </p>

          <h2>The use case is not ambiguous</h2>
          <p>
            Chat mockups have an honest audience: creators staging a story, designers filling a
            presentation, teachers building exercises. You can tell because the artefact is
            understood by everyone involved to be staged — the viewer of the final video knows,
            the client knows, the classroom knows.
          </p>
          <p>
            A fake bank alert has no equivalent honest use. Nobody needs a mock payment
            notification for a design presentation — a plainly watermarked illustration would do
            the job. The reason people search for a pixel-perfect, watermark-free fake bank
            alert is to make one specific person believe a specific payment happened: rent that
            was not paid, a deposit that was never made, a refund that does not exist. The
            artefact is designed to be mistaken for evidence. That is not an edge case of the
            tool; that is the product.
          </p>

          <h2>The harm is measurable</h2>
          <p>
            Payment-screenshot fraud is one of the most common low-tech scams reported across
            marketplaces, rental platforms and peer-to-peer sales. The pattern is always the
            same: a buyer or tenant sends a screenshot showing a completed transfer, the seller
            releases the goods or hands over the keys, and the bank statement later shows nothing
            arrived. The image is not proof of anything — but it arrives with enough social
            pressure (&ldquo;I just sent it, check again&rdquo;) that people act on it.
          </p>
          <p>
            Every tool that makes those images frictionless enlarges the supply. We are not
            naive enough to think refusal eliminates the practice; dedicated fraud tools exist.
            But there is a difference between a tool that exists in a corner of the internet and
            one that ranks on page one next to legitimate searches. Where a tool sits in the
            results determines who finds it. We choose not to be that entry point.
          </p>

          <h2>What we do build, and the bright line</h2>
          <p>
            Everything ChatMock offers shares one property: the output is a{" "}
            <strong>conversation</strong>, and conversations are understood as things people
            stage. A staged WhatsApp exchange in a comedy skit is fine. A fabricated bank
            notification is never fine. The{" "}
            <Link href="/acceptable-use">Acceptable Use Policy</Link> draws the line in those
            terms: illustrations, parody, fiction, design and teaching — yes; impersonation,
            evidence-faking, harassment and financial deception — no, and no template will exist
            for it.
          </p>
          <p>
            In practice the bright line runs through four categories we will not template:
            financial documents and payment notifications; government IDs and official notices;
            medical records and results; and legal documents. Not &ldquo;with a
            watermark&rdquo;, not &ldquo;for verified users&rdquo; — not at all.
          </p>

          <h2>What this costs, and why it is worth it</h2>
          <p>
            Refusing that traffic has a price in raw numbers, and we are fine with it. The
            audience we want — creators, designers, educators — searches for platform-specific
            tools like a{" "}
            <Link href="/whatsapp-chat-generator">WhatsApp chat generator</Link> or an{" "}
            <Link href="/fake-text-message-generator">iPhone text message mockup</Link>, uses
            them for something recognisably creative, and comes back because the details are
            right. That audience does not need us to carry the other category, and the other
            category puts the whole project at risk: ad networks, hosting providers and payment
            processors all treat fraud-adjacent tools as toxic, and one category can take down
            everything around it.
          </p>
          <p>
            There is also a simpler reason. The people harmed by payment-screenshot fraud are
            overwhelmingly individuals selling second-hand goods, landlords renting rooms,
            small traders — people for whom the faked amount can be a month of income. A tool
            that shrugs and takes the traffic is making a choice about whose convenience
            matters. We would rather leave that search volume on the table.
          </p>

          <h2>For creators: the honest alternative</h2>
          <p>
            If you are writing a story that involves a payment, you do not need a fake bank
            notification — you need the audience to understand a payment happened, and dialogue,
            narration or a clearly fictional prop does that better anyway. The moment your
            artefact needs to survive being shown to a bank, a landlord or a police officer, it
            has stopped being a prop. That is the test, and it is not a close call.
          </p>
        </article>

        <div className="mt-12 border-t border-black/10 pt-6">
          <h2 className="text-[16px] font-semibold tracking-tight text-foreground">
            Related guides
          </h2>
          <ul className="mt-3 space-y-2 text-[14.5px]">
            {[
              "chat-screenshots-in-video-storytelling",
              "how-to-make-a-fake-whatsapp-chat"
            ].map((rslug) => {
              const rel = getPost(rslug)!;
              return (
                <li key={rslug}>
                  <Link href={`/blog/${rslug}`} className="text-primary hover:underline underline-offset-2">
                    {rel.title}
                  </Link>
                </li>
              );
            })}
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
