import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { livePages } from "@/lib/seo";

/**
 * 自定义 404：品牌一致 + 引导回工具页/示例页，
 * 避免默认 404 把访客直接送走，也防止失效外链流失爬虫权重。
 */
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 pt-20 pb-24 text-center">
        <p className="text-[64px] font-bold leading-none text-primary/25">404</p>
        <h1 className="font-display mt-4 text-[32px] sm:text-[38px] font-semibold tracking-tight text-foreground">
          This page doesn&apos;t exist
        </h1>
        <p className="mt-4 text-[16.5px] leading-relaxed text-muted-foreground">
          The link may be outdated or mistyped. Everything on ChatMock is one click
          away — pick a generator below and start a mockup, or browse real examples.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {livePages.map((p) => (
            <Link
              key={p.slug}
              href={`/${p.slug}`}
              className="rounded-full border border-black/10 bg-white/80 px-4 py-2 text-[13.5px] text-black/70 transition hover:border-primary/40 hover:text-primary"
            >
              {p.name} generator
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center h-11 px-6 rounded-full bg-primary text-primary-foreground text-[14px] font-medium hover:opacity-90 transition"
          >
            Back to home →
          </Link>
          <Link
            href="/examples"
            className="inline-flex items-center h-11 px-6 rounded-full border border-black/12 text-[14px] font-medium text-black/70 hover:border-black/30"
          >
            Browse examples
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
