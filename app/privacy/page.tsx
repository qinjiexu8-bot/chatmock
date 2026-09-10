import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "ChatMock renders every chat mockup locally in your browser. No account, no upload, no conversation data on any server. Read the full privacy policy.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 pt-12">
        <h1 className="text-[32px] font-semibold tracking-tight text-[#0f1c17]">
          Privacy Policy
        </h1>
        <p className="mt-2 text-[14px] text-black/50">Last updated: September 2026</p>

        <article className="prose-cm mt-8">
          <h2>The short version</h2>
          <p>
            ChatMock has no accounts, no database of conversations, and no server-side
            rendering. Your text, names and uploaded images stay on your device. The PNG you
            export is generated in your browser and downloaded directly to your file system.
          </p>

          <h2>What we do not collect</h2>
          <ul>
            <li>We do not collect the content of your conversations.</li>
            <li>We do not upload avatars or images you add to a mockup.</li>
            <li>We do not require an email address, account or login.</li>
            <li>We do not sell or share personal data, because we do not have any to sell.</li>
          </ul>

          <h2>What we do collect</h2>
          <p>
            Standard, aggregated analytics: page views, referrer, country, device type and
            browser, used to understand which generators people actually want. We do not attach
            this to an identity and we do not track you across other websites.
          </p>
          <p>
            Our hosting provider records ordinary server logs (IP address, timestamp, requested
            URL) for security and uptime. These are not linked to the content of any mockup,
            because that content never reaches our servers.
          </p>

          <h2>Cookies and advertising</h2>
          <p>
            We use no cookies for tracking or personalisation. If advertising is introduced
            later, third-party vendors including Google may use cookies to serve ads based on
            prior visits to this or other websites. Google&apos;s use of advertising cookies
            can be controlled at <strong>google.com/settings/ads</strong>, and you can opt out
            of third-party cookies more broadly at <strong>aboutads.info</strong>. This page
            will be updated before any advertising is enabled.
          </p>

          <h2>Local storage</h2>
          <p>
            Some editors remember your last mockup in your browser&apos;s local storage so you
            do not lose work on refresh. This data lives on your device only and can be cleared
            at any time from your browser settings.
          </p>

          <h2>Children</h2>
          <p>
            ChatMock is not directed at children under 13, and we do not knowingly collect data
            from them.
          </p>

          <h2>Changes</h2>
          <p>
            If this policy changes materially, we will update the date at the top of this page.
          </p>

          <h2>Contact</h2>
          <p>hello@chatmock.net — subject line <strong>Privacy</strong>.</p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
