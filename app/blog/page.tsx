import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs, site } from "@/lib/seo";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Chat Mockup Guides and Design References",
  description:
    "Guides on creating chat mockups responsibly: platform UI details, storytelling techniques for creators, and the ethics of fabricated conversations.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${site.name} Blog`,
    url: abs("/blog"),
    publisher: { "@type": "Organization", name: site.orgName, url: site.url },
    blogPost: blogPosts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      url: abs(`/blog/${p.slug}`),
    })),
  };

  return (
    <>
      <SiteHeader />
      <JsonLd data={blogSchema} />

      <main className="mx-auto max-w-5xl px-5 pt-12">
        <div className="max-w-2xl">
          <h1 className="font-display text-[34px] sm:text-[40px] font-semibold tracking-tight leading-[1.1] text-foreground">
            Blog
          </h1>
          <p className="mt-3 text-[16.5px] leading-relaxed text-muted-foreground">
            Guides and references for making chat mockups well: the real UI values of each
            platform, storytelling techniques, and the boundaries we hold.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {blogPosts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
              <article className="h-full rounded-[var(--radius-card)] border border-black/8 bg-white/80 p-6 transition-all duration-200 group-hover:border-primary/40 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
                <h2 className="font-display text-[19px] font-semibold tracking-tight leading-snug text-foreground">
                  {p.title}
                </h2>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
                <p className="mt-4 text-[12.5px] font-medium text-primary/80">
                  {p.date} · {p.readMinutes} min read
                </p>
              </article>
            </Link>
          ))}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
