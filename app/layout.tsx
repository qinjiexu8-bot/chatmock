import type { Metadata } from "next";
import { Inter, Space_Grotesk, Pacifico } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/seo";

// 与 thefake.design 同款字体体系：
// - Space Grotesk：营销页无衬线主字体（其 --font-page-sans 首选）
// - Inter：正文兜底
// - Pacifico：手写体 logo（其 header 用法一致）
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pacifico",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "chat mockup generator",
    "fake chat generator",
    "whatsapp chat generator",
    "conversation mockup",
    "chat screenshot maker",
  ],
  authors: [{ name: site.orgName }],
  creator: site.orgName,
  publisher: site.orgName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: site.twitter,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${pacifico.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
