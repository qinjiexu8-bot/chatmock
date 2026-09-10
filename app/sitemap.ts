import type { MetadataRoute } from "next";
import { abs, livePages } from "@/lib/seo";
import { blogPosts } from "@/lib/blog";

/**
 * 只收录 live: true 的页面。
 * 未上线的平台页不进 sitemap、不做内链 —— 避免薄内容页拖累整体质量分
 * （scaled content abuse 是本项目最大的 SEO 风险，见《关键词策略与AdSense执行手册》）。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: abs("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...livePages.map((p) => ({
      url: abs(`/${p.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    { url: abs("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...blogPosts.map((p) => ({
      url: abs(`/blog/${p.slug}`),
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: abs("/acceptable-use"),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    },
    {
      url: abs("/privacy"),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    },
    {
      url: abs("/about"),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    },
  ];
}
