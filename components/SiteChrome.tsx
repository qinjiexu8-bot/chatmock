"use client";

import { useState } from "react";
import Link from "next/link";
import { livePages, site } from "@/lib/seo";
import { PlatformIcon } from "@/components/PlatformIcon";

export function SiteHeader({ current }: { current?: string }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreActive = livePages.slice(4).some((p) => p.slug === current);

  const navLinkClass = (slug: string) =>
    `shrink-0 px-3 min-h-10 inline-flex items-center rounded-full transition ${
      current === slug
        ? "bg-primary/10 text-primary font-medium"
        : "hover:bg-black/5 hover:text-black"
    }`;

  const menuLinkClass = (slug: string) =>
    `inline-flex w-full items-center gap-2.5 px-3 py-2 rounded-xl text-[13.5px] transition ${
      current === slug
        ? "bg-primary/10 text-primary font-medium"
        : "text-black/75 hover:bg-black/5"
    }`;

  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/85 border-b border-black/[0.06]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 第一行：桌面 3 列网格（logo / 导航 / CTA）；移动 logo + 汉堡 */}
        <div className="grid h-14 lg:h-16 grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center gap-3">
          <Link href="/" className="group inline-flex items-center gap-2 select-none">
            <span className="font-script text-primary text-[1.3rem] lg:text-[1.45rem] leading-relaxed transition-transform duration-200 ease-out group-hover:-rotate-2 group-hover:scale-[1.03]">
              {site.name}
            </span>
          </Link>

          {/* 桌面导航 */}
          <nav className="hidden lg:flex items-center gap-1 text-[13.5px] text-black/60">
            {livePages.slice(0, 4).map((p) => (
              <Link key={p.slug} href={`/${p.slug}`} className={navLinkClass(p.slug)}>
                {p.name}
              </Link>
            ))}
            {/* 其余生成器收纳进 More 下拉，任何页面都能直达全部工具 */}
            <div className="relative group">
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={moreOpen}
                onClick={() => setMoreOpen((v) => !v)}
                className={`shrink-0 px-3 min-h-10 inline-flex items-center gap-1 rounded-full transition ${
                  moreActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-black/5 hover:text-black"
                }`}
              >
                More
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  aria-hidden="true"
                  className={`transition-transform ${moreOpen ? "rotate-180" : ""}`}
                >
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {moreOpen ? (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setMoreOpen(false)} aria-hidden="true" />
                  <div className="absolute left-0 top-full z-20 mt-1 w-64 rounded-2xl border border-black/[0.08] bg-white shadow-[0_12px_32px_rgba(30,35,80,0.14)] p-2 menu-pop">
                    <p className="px-2 pb-1.5 pt-0.5 text-[10.5px] font-medium uppercase tracking-wider text-black/55">
                      More generators
                    </p>
                    {livePages.slice(4).map((p) => (
                      <Link
                        key={p.slug}
                        href={`/${p.slug}`}
                        onClick={() => setMoreOpen(false)}
                        className={menuLinkClass(p.slug)}
                      >
                        <PlatformIcon platformId={p.platformId} />
                        {p.name}
                      </Link>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
            <Link href="/examples" className={navLinkClass("examples")}>
              Examples
            </Link>
            <Link href="/blog" className={navLinkClass("blog")}>
              Blog
            </Link>
          </nav>

          {/* 桌面右侧 CTA */}
          <span className="hidden lg:flex justify-end">
            <Link
              href={`/${livePages[0]?.slug ?? "whatsapp-chat-generator"}`}
              className="inline-flex items-center h-10 px-4 rounded-full bg-primary text-primary-foreground text-[13px] font-medium hover:opacity-90 transition"
            >
              Start creating →
            </Link>
          </span>

          {/* 移动端汉堡按钮 */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="lg:hidden justify-self-end inline-flex h-10 w-10 items-center justify-center rounded-full text-black/70 transition hover:bg-black/5"
          >
            {open ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path
                  d="M3 3l12 12M15 3L3 15"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none" aria-hidden="true">
                <path
                  d="M1 1.5h18M1 8h18M1 14.5h18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 移动端下拉菜单 */}
      {open ? (
        <div className="lg:hidden menu-pop border-t border-black/[0.06] bg-white/95 px-4 pt-4 pb-5 max-h-[calc(100dvh-3.5rem)] overflow-y-auto">
          <p className="px-1 text-[11px] font-medium uppercase tracking-wider text-black/40">
            Generators
          </p>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {livePages.map((p) => (
              <Link key={p.slug} href={`/${p.slug}`} onClick={close} className={menuLinkClass(p.slug)}>
                <PlatformIcon platformId={p.platformId} />
                {p.name}
              </Link>
            ))}
          </div>

          <p className="mt-4 px-1 text-[11px] font-medium uppercase tracking-wider text-black/40">
            Explore
          </p>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            <Link href="/examples" onClick={close} className={menuLinkClass("examples")}>
              Examples
            </Link>
            <Link href="/blog" onClick={close} className={menuLinkClass("blog")}>
              Blog
            </Link>
          </div>

          <Link
            href={`/${livePages[0]?.slug ?? "whatsapp-chat-generator"}`}
            onClick={close}
            className="mt-5 flex h-11 items-center justify-center rounded-full bg-primary text-primary-foreground text-[14px] font-medium"
          >
            Start creating →
          </Link>
        </div>
      ) : null}
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
            <Link href="/examples" className="hover:text-black">
              Examples
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

        <p className="mt-3 text-black/55">
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
