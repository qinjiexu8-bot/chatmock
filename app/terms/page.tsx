import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs, site } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern use of ChatMock: what the service is, who owns the mockups you create, the trademark position on interface recreations, and the limits of our liability.",
  alternates: { canonical: "/terms" },
  openGraph: {
    type: "website",
    url: abs("/terms"),
    title: "Terms of Service — ChatMock",
    description:
      "What the service is, who owns the mockups you create, and the limits of our liability.",
    images: [abs("/og/terms")],
  },
  twitter: { card: "summary_large_image", images: [abs("/og/terms")] },
};

/**
 * 服务条款。
 *
 * 与 /privacy、/acceptable-use 的分工：隐私页讲数据怎么处理，AUP 讲内容边界，
 * 本页讲**法律关系**（所有权、担保、责任、适用法律）。
 *
 * ⚠️ §11 适用法律：按运营主体的主营业地法域书写，未指名具体国家。
 *    若需要点明法域（如"中华人民共和国法律"），在此处替换并同步更新日期。
 */
export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Terms of Service",
          description:
            "The terms governing use of ChatMock: ownership of your exports, the trademark position on interface recreations, and the limits of our liability.",
          url: abs("/terms"),
          isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
          publisher: { "@type": "Organization", name: site.orgName, url: site.url },
        }}
      />
      <main className="mx-auto max-w-3xl px-5 pt-12">
        <h1 className="font-display text-[32px] font-semibold tracking-tight text-foreground">
          Terms of Service
        </h1>
        <p className="mt-2 text-[14px] text-black/50">Last updated: October 2026</p>

        <article className="prose-cm mt-8">
          <p>
            These Terms govern your use of chatmock.net and the chat mockup generators and
            examples published on it (together, &ldquo;the Service&rdquo;). By using the Service
            you accept these Terms. If you do not accept them, please do not use the Service.
            There is no account to create and nothing to sign, so this page is the whole
            agreement.
          </p>

          <h2>1. What the Service is</h2>
          <p>
            ChatMock is a free, browser-based tool for composing images that look like
            conversations on messaging platforms, for use in creative, educational and design
            work. Everything renders locally in your browser; the exported PNG is produced on
            your own device. There is no account, no subscription and no server-side storage of
            the conversations you build. How that affects your data is set out in the{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>

          <h2>2. Your mockups are yours</h2>
          <p>
            You keep all rights to the conversations you compose and the images you export. We
            claim no ownership over them, we do not receive a licence to them, and we could not
            use them even if we wanted to — they never reach our servers. You are free to use
            your exports commercially, subject to the limits in section 5 and the{" "}
            <Link href="/acceptable-use">Acceptable Use Policy</Link>.
          </p>
          <p>
            What you are responsible for is how a mockup is presented. An image that is clearly
            staged illustration is one thing; the same image presented as a real exchange is
            another, and that decision — and its consequences — are yours, not ours.
          </p>

          <h2>3. Interface recreations and trademarks</h2>
          <p>
            WhatsApp, Messenger, Instagram, Discord, Telegram, Snapchat, Google Messages, Apple,
            Android and the other platform names used on this site are trademarks of their
            respective owners. ChatMock is an independent project. It is not affiliated with,
            endorsed by, sponsored by or approved by any of those companies.
          </p>
          <p>
            Every interface shown or generated here is an original recreation built in HTML and
            CSS for illustration, parody, teaching and design. We do not redistribute platform
            software, fonts or proprietary image assets. If you hold rights in material you
            believe is reproduced improperly, contact us as described in section 10.
          </p>

          <h2>4. Free of charge, with no warranty of availability</h2>
          <p>
            The Service is provided free of charge. Because there is no payment, there is no
            service level: we may change, suspend or discontinue any part of the Service at any
            time, and we do not guarantee that any particular generator, format or export size
            will remain available. We also do not guarantee that a detail of a recreation is
            current — messaging apps change their interfaces, and while we try to track those
            changes, the mockups are illustrations, not specification documents.
          </p>

          <h2>5. Acceptable use</h2>
          <p>
            Your use of the Service must comply with our{" "}
            <Link href="/acceptable-use">Acceptable Use Policy</Link>, which forms part of these
            Terms. In summary, ChatMock is for illustration, parody, teaching, fiction, design
            and demonstration. It must not be used to deceive, defraud, harass or impersonate
            anyone, to fabricate evidence for any legal, disciplinary, employment, insurance or
            academic proceeding, or to produce fake bank, payment, government, medical, court or
            police notices. We do not provide templates for those uses, and using the tool to
            approximate them is a breach of these Terms.
          </p>

          <h2>6. Disclaimer of warranties</h2>
          <p>
            The Service is provided <strong>&ldquo;as is&rdquo; and &ldquo;as
            available&rdquo;</strong>, without warranties of any kind, whether express or
            implied, including merchantability, fitness for a particular purpose and
            non-infringement. We do not warrant that the Service will be uninterrupted,
            error-free, or that any recreation will match a platform&apos;s current interface.
          </p>

          <h2>7. Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, ChatMock and the people who operate it are
            not liable for any indirect, incidental, special, consequential or punitive damages,
            or for any loss of profits, goodwill, data or opportunity, arising out of or relating
            to your use of the Service — including any claim arising from how you used an image
            you created. Because the Service is provided free of charge, our total aggregate
            liability to you is limited to zero. Nothing in these Terms excludes liability that
            cannot lawfully be excluded.
          </p>

          <h2>8. Indemnity</h2>
          <p>
            If a third party brings a claim against us because of your use of the Service or your
            breach of these Terms — for example, a claim arising from a mockup you published —
            you agree to indemnify and hold us harmless against that claim and any resulting
            costs.
          </p>

          <h2>9. Third-party services</h2>
          <p>
            The site loads a small number of third-party resources, including analytics and the
            Google AdSense review script described in the{" "}
            <Link href="/privacy">Privacy Policy</Link>. Those providers operate under their own
            terms and privacy practices, which we do not control.
          </p>

          <h2>10. Contact and complaints</h2>
          <p>
            Questions about these Terms, and copyright or trademark complaints, go to{" "}
            <strong>hello@chatmock.net</strong> with the subject line <code>Terms</code>,{" "}
            <code>Copyright</code> or <code>Abuse</code> as appropriate. The{" "}
            <Link href="/contact">Contact page</Link> lists what we can and cannot act on.
          </p>

          <h2>11. Governing law</h2>
          <p>
            These Terms are governed by the laws of the jurisdiction in which the ChatMock
            operator has its principal place of business, without regard to conflict-of-law
            rules. Any dispute will be brought in the courts of that jurisdiction.
          </p>

          <h2>12. Changes to these Terms</h2>
          <p>
            If these Terms change materially, we will update the date at the top of this page.
            Continued use of the Service after a change means you accept the revised Terms.
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
