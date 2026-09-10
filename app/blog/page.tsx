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
  openGraph: {
    type: "website",
    url: abs("/blog"),
    title: "Blog — Chat Mockup Guides and Design References",
    description:
      "Guides on creating chat mockups responsibly: platform UI details, storytelling techniques for creators, and the ethics of fabricated conversations.",
    images: [abs("/og/blog")],
  },
  twitter: {
    card: "summary_large_image",
    images: [abs("/og/blog")],
  },
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

        <div className="prose-cm mt-8 max-w-2xl">
          <p>
            ChatMock exists because the details of a chat interface matter — the exact bubble
            colour, the tick states, where the timestamp sits. This blog is where we write
            those details down. Some posts are practical how-tos that pair with our{" "}
            <Link href="/#generators">free generators</Link>; others are reference material we
            wished existed when we were building the tools, like the exact colour values of
            five messaging apps in one table.
          </p>
          <p>
            We also write about the part of this space nobody else covers honestly: where
            staged conversations are a legitimate creative device, and where they become a
            deception tool. That line is why we publish an{" "}
            <Link href="/acceptable-use">Acceptable Use Policy</Link> and why we refuse to
            build certain templates entirely, even when the search traffic says we should.
            Everything here is original, written in-house, and updated when the platforms
            change their interfaces.
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
