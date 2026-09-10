import Link from "next/link";
import { livePages, site } from "@/lib/seo";

export function SiteHeader({ current }: { current?: string }) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/75 border-b border-black/[0.06]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center gap-3">
        {/* Logo：手写体，hover 微旋转（竞品同款细节） */}
        <Link href="/" className="group inline-flex items-center gap-2 select-none">
          <span className="font-script text-primary text-[1.3rem] lg:text-[1.45rem] leading-relaxed transition-transform duration-200 ease-out group-hover:-rotate-2 group-hover:scale-[1.03]">
            {site.name}
          </span>
        </Link>

        {/* 中部导航 */}
        <nav className="hidden lg:flex items-center gap-1 text-[13.5px] text-black/60">
          {livePages.slice(0, 5).map((p) => (
            <Link
              key={p.slug}
              href={`/${p.slug}`}
              className={`px-3 min-h-10 inline-flex items-center rounded-full transition ${
                current === p.slug
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-black/5 hover:text-black"
              }`}
            >
              {p.name}
            </Link>
          ))}
          <Link
            href="/blog"
            className={`px-3 min-h-10 inline-flex items-center rounded-full transition ${
              current === "blog"
                ? "bg-primary/10 text-primary font-medium"
                : "hover:bg-black/5 hover:text-black"
            }`}
          >
            Blog
          </Link>
        </nav>

        {/* 右侧 CTA */}
        <span className="hidden lg:flex justify-end">
          <Link
            href={`/${livePages[0]?.slug ?? "whatsapp-chat-generator"}`}
            className="inline-flex items-center h-10 px-4 rounded-full bg-primary text-primary-foreground text-[13px] font-medium hover:opacity-90 transition"
          >
            Start creating →
          </Link>
        </span>

        {/* 移动端右 CTA 简化 */}
        <span className="lg:hidden justify-self-end">
          <Link
            href={`/${livePages[0]?.slug ?? "whatsapp-chat-generator"}`}
            className="inline-flex items-center h-9 px-3.5 rounded-full bg-primary text-primary-foreground text-[12.5px] font-medium"
          >
            Start →
          </Link>
        </span>
      </div>
    </header>
  );
}

export function SiteFooter({ trademark }: { trademark?: { name: string; owner: string } }) {
  return (
    <footer className="mt-16">
      <div className="hairline" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-[13px] text-black/55">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/" className="hover:text-black">
              Home
            </Link>
            <Link href="/blog" className="hover:text-black">
              Blog
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
          <span className="font-script text-primary text-[1.1rem]">{site.name}</span>
        </div>

        {trademark ? (
          <p className="mt-5">
            <strong className="text-black/70">{trademark.name}</strong> is a trademark of{" "}
            {trademark.owner}. {site.name} is not affiliated with, endorsed by, or sponsored
            by {trademark.owner}. All interface elements shown here are recreations made for
            mockups, illustrations and presentations.
          </p>
        ) : null}

        <p className="mt-3">
          {site.name} is intended for legitimate creative and illustrative purposes only —
          video production, UI/UX presentations, teaching materials, fiction and design
          mockups. Do not use generated images to deceive, defraud, harass, defame or
          impersonate anyone, or to fabricate evidence. See the{" "}
          <Link href="/acceptable-use" className="underline">
            Acceptable Use Policy
          </Link>
          .
        </p>

        <p className="mt-3 text-black/40">
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
