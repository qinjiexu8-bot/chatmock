import Link from "next/link";
import { livePages, site } from "@/lib/seo";

export function SiteHeader({ current }: { current?: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-black/10 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-5 h-14 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[13px] font-bold"
            style={{ background: "#008069" }}
          >
            C
          </span>
          <span className="font-semibold tracking-tight">{site.name}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-4 text-[13.5px] text-black/60 overflow-x-auto">
          {livePages.map((p) => (
            <Link
              key={p.slug}
              href={`/${p.slug}`}
              className={
                current === p.slug
                  ? "text-black font-medium whitespace-nowrap"
                  : "hover:text-black whitespace-nowrap"
              }
            >
              {p.name}
            </Link>
          ))}
        </nav>

        <span className="flex-1" />

        <span className="hidden sm:inline text-[12px] text-black/45 whitespace-nowrap">
          No signup · No watermark
        </span>
      </div>
    </header>
  );
}

export function SiteFooter({ trademark }: { trademark?: { name: string; owner: string } }) {
  return (
    <footer className="border-t border-black/10 bg-[#fbfcfc] mt-16">
      <div className="mx-auto max-w-6xl px-5 py-10 text-[13px] text-black/55">
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-5">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <Link href="/acceptable-use" className="hover:text-black">
            Acceptable Use
          </Link>
          <Link href="/privacy" className="hover:text-black">
            Privacy
          </Link>
          <Link href="/about" className="hover:text-black">
            About
          </Link>
        </div>

        {trademark ? (
          <p className="mb-3">
            <strong className="text-black/70">{trademark.name}</strong> is a trademark of{" "}
            {trademark.owner}. {site.name} is not affiliated with, endorsed by, or sponsored by{" "}
            {trademark.owner}. All interface elements shown here are recreations made for
            mockups, illustrations and presentations.
          </p>
        ) : null}

        <p className="mb-3">
          {site.name} is intended for legitimate creative and illustrative purposes only —
          video production, UI/UX presentations, teaching materials, fiction and design
          mockups. Do not use generated images to deceive, defraud, harass, defame or
          impersonate anyone, or to fabricate evidence. See the{" "}
          <Link href="/acceptable-use" className="underline">
            Acceptable Use Policy
          </Link>
          .
        </p>

        <p className="text-black/40">
          © {new Date().getFullYear()} {site.name}. All content is processed locally in your
          browser.
        </p>
      </div>
    </footer>
  );
}

/** JSON-LD 注入。AdSense 审核期需要明确的结构化数据，也利于 rich result。 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
