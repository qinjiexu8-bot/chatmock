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
        <p className="text-[13px] text-black/55">
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

          <h2>Where a forged notification sits in the chain</h2>
          <p>
            It helps to be precise about what a fake payment screenshot is <em>for</em>, because
            the people who make them are not trying to fool a bank — they are trying to buy
            minutes from a person. In the patterns that get reported most often across
            marketplaces, rental listings and peer-to-peer sales, the screenshot is not the
            scam; it is the lubricant. It arrives to answer one question — &ldquo;did you
            send it?&rdquo; — so that the next step can happen: releasing the item, handing
            over the keys, shipping before funds clear.
          </p>
          <p>
            That is why the image is engineered the way it is. It does not need to survive a
            fraud investigation; it needs to survive about thirty seconds of a stranger&apos;s
            attention while they are standing in a doorway or holding a parcel. The social
            pressure does the rest: once someone has been told &ldquo;I just sent it, check
            again,&rdquo; contesting it feels rude, and rudeness is a surprisingly strong
            lever. The forged notification is built to exploit exactly that moment, and a tool
            that produces one in a couple of clicks — no watermark, no friction — is
            industrialising the moment rather than just selling an image.
          </p>
          <p>
            Seen this way, the question &ldquo;is the artefact harmful?&rdquo; answers itself.
            The artefact has no life outside that moment. Nobody keeps a fake bank alert in a
            scrapbook.
          </p>

          <h2>How platforms and banks actually catch it</h2>
          <p>
            The reassuring part is that the screenshot is not the record. A payment exists in
            the ledger, not in an image, so the authoritative check is never the message someone
            forwards you — it is your own balance in the official app, or a statement from the
            bank. Banks settle transfers on their own systems, and pending entries appear there
            whether or not anyone sent a screenshot. A PNG can imitate the notification; it
            cannot put money in an account.
          </p>
          <p>
            Beyond the ledger, detection tends to work at the level of the file and the flow
            rather than the pixels. Platforms look at behaviour — accounts that repeatedly
            produce or forward the same images, listings that generate disputes — and payment
            apps surface pending-versus-cleared states precisely so a recipient does not have to
            judge a picture in the moment. The details vary by bank, app and country, and none of
            it is something a screenshot can speak to. The practical rule for anyone on the
            receiving end is simply: verify in the app that holds the money, never in the message
            that claims it moved.
          </p>

          <h2>&ldquo;I would only use it properly&rdquo; is not a design argument</h2>
          <p>
            The most common objection is personal: <em>I would not use it to defraud anyone, so
            why not offer it?</em> It is a reasonable thing to say and it does not survive
            contact with how a public tool actually works. You cannot audit intent at the point
            of publication. A template that is indexed and ranked is found by whoever searches
            for it, and the person who searched for a watermark-free fake bank alert is usually
            not looking for a design exercise — that is the whole reason the search exists.
          </p>
          <p>
            There is also an asymmetry the self-discipline argument misses. The honest uses of a
            chat mockup are broad and shallow: illustration, parody, teaching, prototyping. The
            honest uses of a pixel-perfect payment notification are close to nil, while its
            dishonest use is its reason for existing. When a feature&apos;s honest demand is
            near zero and its harm is concentrated, refusing it costs almost nothing and removes
            a real instrument. We are not weighing a person&apos;s good intentions against their
            alternatives; we are weighing two very different distributions of use.
          </p>
          <p>
            The same logic is why the line is drawn by category rather than by quality. It is
            not that a <em>bad</em> fake bank alert is fine and a good one is not — it is that
            the notification itself is the harmful artefact, so no version of it gets built,
            watermarked or otherwise. Every other conversation-shaped tool on this site stays
            inside its honest band: unmistakably staged, and useful to the people who stage
            things on purpose. The{" "}
            <Link href="/acceptable-use">Acceptable Use Policy</Link> sets that out in full.
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
