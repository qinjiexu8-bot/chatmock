import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs, site } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "How to reach the ChatMock team: bug reports, UI accuracy corrections, copyright and trademark complaints, business enquiries and abuse reports. One real inbox, answered by the people who build the tool.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: abs("/contact"),
    title: "Contact ChatMock",
    description:
      "One real inbox for bug reports, UI accuracy corrections, copyright complaints and business enquiries. No ticket queue, no chatbot.",
    images: [abs("/og/contact")],
  },
  twitter: { card: "summary_large_image", images: [abs("/og/contact")] },
};

/**
 * 单一真实邮箱，无表单。
 *
 * 有意不放假表单：站上没有任何后端接收提交（全站是静态预渲染，生成器完全在浏览器内跑），
 * 表单没有收信端，比没有联系方式更伤信任——审核方点一下就知道是空壳。
 * 行文刻意与 /privacy 的 "What we do not collect" 对齐：我们拿不到你的对话内容，
 * 所以也承诺不了"帮你查一下那条消息"。
 */
export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact ChatMock",
          description:
            "How to reach the ChatMock team for bug reports, UI accuracy corrections, copyright complaints and business enquiries.",
          url: abs("/contact"),
          isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
          publisher: { "@type": "Organization", name: site.orgName, url: site.url },
        }}
      />
      <main className="mx-auto max-w-3xl px-5 pt-12">
        <h1 className="font-display text-[32px] font-semibold tracking-tight text-foreground">
          Contact
        </h1>
        <p className="mt-2 text-[14px] text-black/50">Last updated: October 2026</p>

        <article className="prose-cm mt-8">
          <p>
            ChatMock is a small independent project, and this inbox goes straight to the people
            who build and maintain it. There is no ticket queue, no chatbot and no offshore
            support layer — just an email address that a human reads. Because the project is
            small, we answer the messages that help the tool and skip the ones that only ask us
            to do something a static website cannot do.
          </p>

          <h2>Email us</h2>
          <p>
            <strong>hello@chatmock.net</strong>
          </p>
          <p>
            Putting a short subject prefix in the line makes routing immediate:{" "}
            <code>Bug</code>, <code>UI correction</code>, <code>Copyright</code>,{" "}
            <code>Business</code>, <code>Abuse</code> or <code>Privacy</code>. Anything sent
            without a prefix still gets read — it just takes a little longer to sort.
          </p>

          <h2>What we can actually help with</h2>
          <ul>
            <li>
              <strong>Bug reports.</strong> The generator exports a broken image, a bubble is
              clipped, a control does nothing, a page fails to load. Tell us the platform page,
              the browser and the device, and — if you can — the exact steps that triggered it.
            </li>
            <li>
              <strong>UI accuracy corrections.</strong> This is the single most useful email we
              receive. If a colour, corner radius, tick state or timestamp position is wrong on a
              platform you use every day, send the correction. We verify against the real app and
              fix it; several of the details in our{" "}
              <Link href="/blog/messaging-app-ui-colour-reference">colour reference</Link> came
              from exactly this kind of note.
            </li>
            <li>
              <strong>Copyright and trademark complaints.</strong> If you believe a name, logo or
              screenshot recreation on this site infringes a right you hold, write to us with the
              specific page and the material concerned. We act on substantiated complaints,
              including removing material where that is the right outcome.
            </li>
            <li>
              <strong>Business and partnership enquiries.</strong> Licensing, embedding, bulk
              export or API access for a product or agency workflow. Tell us what you need and
              what scale you are working at.
            </li>
            <li>
              <strong>Press and content.</strong> If you are writing about mockup tools,
              screenshot authenticity or the ethics of fabricated conversations, we are happy to
              give a direct answer on the record.
            </li>
            <li>
              <strong>Reports of misuse.</strong> If someone has used ChatMock to produce an
              image that violates our{" "}
              <Link href="/acceptable-use">Acceptable Use Policy</Link>, send the image and the
              context in which you found it. See the note below on what we can and cannot do
              about it.
            </li>
            <li>
              <strong>Privacy questions.</strong> Anything about data, analytics or local storage
              — see the <Link href="/privacy">Privacy Policy</Link> first, then ask.
            </li>
          </ul>

          <h2>Response times</h2>
          <p>
            We aim to reply within <strong>two to three business days</strong>. UI accuracy
            corrections and clear bug reports are usually answered faster, because they are the
            ones we can act on immediately. Business enquiries that need a proposal take longer.
            If a week passes with no reply, resend once — occasionally a message lands in spam.
          </p>

          <h2>What we cannot do</h2>
          <p>
            Being honest about this saves everyone time. ChatMock has no accounts and no server
            that stores mockups — every conversation you build is rendered and exported inside
            your own browser. That is the core of the{" "}
            <Link href="/privacy">privacy design</Link>, and it has a practical consequence:{" "}
            <strong>we cannot see, retrieve or delete anything you created.</strong> We cannot
            recover a mockup you lost, tell you what a conversation contained, or confirm whether
            someone used the tool to make a particular image. We also cannot take down an image
            posted on another platform — that request belongs with the platform hosting it,
            though we will always answer questions about the tool itself.
          </p>

          <h2>Why there is no contact form</h2>
          <p>
            A form on this site would have nothing behind it. The whole product is a static
            page that draws pixels in your browser; there is no application server to receive a
            submission, and a form that silently drops messages is worse than no form at all.
            A plain email address is the honest version of the same thing — and it means you have
            a record of what you sent us.
          </p>

          <h2>Before you write</h2>
          <p>
            A few pages already answer the most common questions: the{" "}
            <Link href="/about">About page</Link> explains how the project works and why it is
            free, the <Link href="/examples">examples gallery</Link> shows complete scenes you
            can rebuild, and the <Link href="/blog">blog</Link> collects the platform-specific
            guides. If your question is already covered there, the answer will arrive faster than
            any reply.
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
