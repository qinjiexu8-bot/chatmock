import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader, JsonLd } from "@/components/SiteChrome";
import { ExampleCard } from "@/components/ExampleGallery";
import { examples } from "@/lib/examples";
import { examplePageCopy } from "@/lib/examplesCopy";
import { livePages, site, abs } from "@/lib/seo";

/**
 * /examples/{generatorSlug} 分平台示例画廊。
 *
 * 硬约束（同《关键词策略与AdSense执行手册》）：
 * - slug 必须与对应生成器页一致（/examples/whatsapp-chat-generator ↔ /whatsapp-chat-generator）
 * - 每页必须有平台专属实质内容（intro/designNotes/useCases/FAQ），不做模板化薄页
 * - 只为 live: true 的生成器页生成子画廊
 */

export function generateStaticParams() {
  return livePages.map((p) => ({ slug: p.slug }));
}

/** 全静态架构：未预渲染的 slug 直接 404，不走运行时渲染。 */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = livePages.find((p) => p.slug === slug);
  if (!page) return {};
  return {
    title: `${page.name} Chat Screenshot Examples (Free, Live-Rendered) | ChatMock`,
    description: `Realistic ${page.name} chat screenshot examples rendered live — light and dark scenes you can study, then rebuild in the free ${page.name} generator. No signup, no watermark.`,
    alternates: { canonical: `/examples/${slug}` },
    openGraph: {
      type: "website",
      url: abs(`/examples/${slug}`),
      title: `${page.name} Chat Screenshot Examples — Rendered Live`,
      description: `Study real ${page.name} mockup scenes, then open the free generator and make your own. No signup, no watermark.`,
      images: [abs(`/og/examples/${slug}`)],
    },
    twitter: {
      card: "summary_large_image",
      images: [abs(`/og/examples/${slug}`)],
    },
  };
}

export default async function PlatformExamplesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = livePages.find((p) => p.slug === slug);
  if (!page) notFound();

  const items = examples.filter((e) => e.platformId === page.platformId);
  const copy = examplePageCopy[page.platformId];
  if (!items.length || !copy) notFound();

  const others = livePages.filter((p) => p.slug !== slug);

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${page.name} chat screenshot examples`,
    itemListElement: items.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: e.title,
      url: abs(`/examples/${slug}`),
    })),
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Examples", item: abs("/examples") },
      {
        "@type": "ListItem",
        position: 3,
        name: `${page.name} Examples`,
        item: abs(`/examples/${slug}`),
      },
    ],
  };

  return (
    <>
      <SiteHeader current="examples" />
      <JsonLd data={[itemList, faq, breadcrumb]} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ---------------- Hero ---------------- */}
        <section className="pt-14 pb-2">
          <nav aria-label="Breadcrumb" className="text-[13px] text-black/45">
            <Link href="/examples" className="hover:text-black/70">
              Examples
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-black/70">{page.name}</span>
          </nav>
          <div className="mt-4 max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-[12.5px] font-medium text-primary">
              {page.name} examples
            </span>
            <h1 className="font-display mt-4 text-[34px] sm:text-[42px] font-semibold tracking-tight leading-[1.08] text-foreground">
              {page.name} chat screenshot examples
            </h1>
            <p className="mt-4 text-[16.5px] leading-relaxed text-muted-foreground">
              {copy.intro}
            </p>
          </div>
        </section>

        {/* ---------------- 示例画廊 ---------------- */}
        <section className="pt-10">
          <div className="flex flex-wrap gap-x-6 gap-y-10">
            {items.map((item) => (
              <ExampleCard key={item.id} item={item} platformName={page.name} />
            ))}
          </div>
        </section>

        {/* ---------------- 设计细节 ---------------- */}
        <section className="pt-14">
          <div className="hairline" />
          <div className="py-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            <div>
              <h2 className="font-display text-[22px] sm:text-[24px] font-semibold tracking-tight text-foreground">
                Design details we reproduce
              </h2>
              <ul className="mt-4 space-y-2.5">
                {copy.designNotes.map((note) => (
                  <li key={note} className="flex gap-2.5 text-[14.5px] leading-relaxed text-muted-foreground">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-[22px] sm:text-[24px] font-semibold tracking-tight text-foreground">
                Where these scenes shine
              </h2>
              <p className="mt-4 text-[14.5px] leading-relaxed text-muted-foreground">
                {copy.useCases}
              </p>
              <Link
                href={`/${page.slug}`}
                className="mt-5 inline-flex items-center h-10 px-5 rounded-full bg-primary text-primary-foreground text-[13.5px] font-medium hover:opacity-90 transition"
              >
                Make your {page.name} mockup →
              </Link>
            </div>
          </div>
        </section>

        {/* ---------------- FAQ ---------------- */}
        <section className="pt-4">
          <div className="hairline" />
          <div className="py-10 max-w-3xl">
            <h2 className="font-display text-[22px] sm:text-[24px] font-semibold tracking-tight text-foreground">
              {page.name} mockup questions
            </h2>
            <div className="mt-5 divide-y divide-black/[0.06]">
              {copy.faqs.map((f) => (
                <div key={f.q} className="py-4">
                  <h3 className="text-[15.5px] font-semibold text-foreground">{f.q}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted-foreground">
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- 其他平台画廊 ---------------- */}
        <section className="pt-4">
          <div className="hairline" />
          <div className="py-10">
            <h2 className="font-display text-[22px] sm:text-[24px] font-semibold tracking-tight text-foreground">
              Browse examples by platform
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={`/examples/${p.slug}`}
                  className="rounded-full border border-black/10 bg-white/80 px-4 py-1.5 text-[13px] text-black/70 transition hover:border-primary/40 hover:text-primary"
                >
                  {p.name} examples
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
