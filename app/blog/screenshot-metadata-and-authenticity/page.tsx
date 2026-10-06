import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs } from "@/lib/seo";
import { getPost } from "@/lib/blog";

const SLUG = "screenshot-metadata-and-authenticity";
const post = getPost(SLUG)!;

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: { canonical: `/blog/${SLUG}` },
  openGraph: {
    type: "article",
    url: abs(`/blog/${SLUG}`),
    title: post.title,
    description: post.description,
    images: [abs(`/og/blog/${SLUG}`)],
  },
  twitter: {
    card: "summary_large_image",
    images: [abs(`/og/blog/${SLUG}`)],
  },
};

export default function Post() {
  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "ChatMock" },
    publisher: { "@type": "Organization", name: "ChatMock", url: "https://chatmock.net" },
    mainEntityOfPage: abs(`/blog/${SLUG}`),
  };

  return (
    <>
      <SiteHeader />
      <JsonLd data={article} />

      <main className="mx-auto max-w-3xl px-5 pt-12">
        <div className="mb-3">
          <Breadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: "Blog", href: "/blog" },
              { name: post.title },
            ]}
          />
        </div>
        <p className="text-[13px] text-black/55">
          {post.date} · {post.readMinutes} min read
        </p>
        <h1 className="font-display mt-2 text-[32px] sm:text-[38px] font-semibold tracking-tight leading-[1.15] text-foreground">
          {post.title}
        </h1>

        <article className="prose-cm mt-8">
          <p>
            People treat a screenshot as a document: a file that recorded an event and can now
            be inspected for the truth. That mental model comes from photographs and scanned
            papers, where a file often does carry provenance. A chat screenshot is a different
            kind of object entirely, and the gap between what people assume it proves and what
            it actually records is the whole story. This piece lays out the technical facts, and
            where a fact depends on the device or the operating system version, it says so
            instead of guessing.
          </p>

          <h2>What a screenshot file actually is</h2>
          <p>
            When you capture the screen, the system reads the framebuffer — the final composited
            image the display is about to show — and writes it to a new file. It is a copy of
            pixels, created by the operating system at that moment. Nothing about that process
            witnesses the conversation on screen. The system does not know whether the bubbles
            came from a server, a local database, or a drawing routine. A screenshot is a
            rendering, and a rendering can be produced by any program that can draw.
          </p>
          <p>
            That is why the file format matters less than people expect. What you have is an
            image, and the question &ldquo;is this image a record of a real event?&rdquo; is not
            answered by the image format. It is answered, if at all, by the surrounding evidence.
          </p>

          <h2>Why chat screenshots usually carry almost no EXIF</h2>
          <p>
            Camera photos tend to include EXIF metadata: capture time, device model, exposure,
            sometimes location. Screenshots generally do not carry that kind of record. On most
            phones a screenshot is saved or exported as a PNG, and the metadata attached to it
            is minimal — often nothing beyond basic image dimensions, and occasionally a small
            software tag naming the OS or an app. The exact fields vary by device, OS version
            and how the file was shared, so it is fair to say a screenshot usually has
            <em> very little</em> EXIF rather than <em>none</em>, and unfair to claim a specific
            field will always be present or always be missing.
          </p>
          <p>
            The practical consequence is blunt: with a phone screenshot, there is often nothing
            technical in the file that ties it to a device or a moment. Absence of metadata is
            normal for a genuine screenshot, which also means absence cannot be used as proof of
            faking, and presence cannot be used as proof of truth.
          </p>

          <h2>What PNG chunks do and do not record</h2>
          <p>
            PNG is a container built from chunks. Some are required for the image to display;
            others are optional text and time chunks that can hold descriptions, author strings
            or a modification time. Two things follow. First, optional chunks are optional —
            most screenshots simply do not include them. Second, because the format is open and
            well documented, those chunks can be added, edited or stripped by ordinary tools.
            A PNG that contains a tidy creation-time chunk is not more trustworthy than one that
            contains nothing; both states are trivially reachable by hand.
          </p>
          <p>
            This is the part that surprises people who think of metadata as a seal. In an open
            container format, metadata is a claim written next to the picture. It is useful for
            organising files and useless as a guarantee, because anything that can write the
            file can write the claim.
          </p>

          <h2>Timestamps are easy to change and easy to misread</h2>
          <p>
            File timestamps feel authoritative because they look like machinery. They are not.
            The modified time on a file can be set by the program that writes it, and utilities
            exist on every major platform that change file times deliberately. Even without
            tampering, a timestamp tells you about file handling, not about the event: copy a
            file between systems, sync it through a service, or restore it from a backup, and
            the time can reflect the transfer rather than the capture.
          </p>
          <p>
            There is a further trap. A timestamp recorded in one time zone and read in another
            can be off by hours without anyone lying. So a discrepancy between the clock shown
            inside the screenshot and the file time is worth noticing, but it is not by itself
            proof of anything — it is a question to ask, not an answer.
          </p>

          <h2>Can a PNG be edited without leaving visible traces?</h2>
          <p>
            A PNG stores pixels using lossless compression, which is one reason people assume
            edits are detectable. In practice, editing a screenshot region — changing text,
            pasting a bubble, altering a number — then re-saving produces a new, valid PNG. The
            lossless codec means the edited area is not smeared the way a re-saved JPEG would
            be, so the usual &ldquo;compression artifacts around the edit&rdquo; heuristic is
            weaker on PNG than folklore suggests. Resizing or re-encoding through another tool
            can leave other traces, and JPEG-based screenshots (some Android and share
            pipelines) do carry compression patterns that can reveal a paste.
          </p>
          <p>
            So the honest answer is layered: some edits leave artifacts, some leave none that a
            casual inspection will find, and the outcome depends on the tool, the format and the
            resaving path. Anyone who tells you a PNG can always be proven edited, or never can
            be, is overstating a case that depends on specifics.
          </p>

          <h2>What a screenshot proves about a conversation</h2>
          <p>
            Set aside forensics and ask the plain question: does this image establish that a
            conversation happened? It establishes that some software rendered these pixels at
            some point. It does not establish who sent what, on which device, or whether the
            account ever existed. Chat content of real value to an investigation lives with the
            platform or on the original device — in message databases, server records, or
            account metadata the platform controls — not in a picture of the screen.
          </p>
          <p>
            This is why serious disputes do not rest on screenshots when better sources are
            available. Where a platform can produce account or message records, those carry far
            more weight because they were generated and held outside the hands of the person
            making the claim. A screenshot from a party&apos;s own phone is the version of the
            evidence most within their control, and it is treated accordingly.
          </p>

          <h2>The checklist people actually use</h2>
          <ul>
            <li>
              <strong>Ask for the original.</strong> A file that has been through several apps
              and re-shares has lost whatever small provenance it had. The earliest copy you can
              obtain is the most useful.
            </li>
            <li>
              <strong>Prefer platform data.</strong> Where a platform or service can supply
              records directly, those outrank any screen image.
            </li>
            <li>
              <strong>Corroborate separately.</strong> A calendar entry, a call log, a second
              device, a bank statement — anything generated independently of the screenshot.
            </li>
            <li>
              <strong>Read the image critically.</strong> The layout tells in a{" "}
              <Link href="/blog/how-to-spot-a-fake-screenshot">fake-screenshot checklist</Link>{" "}
              are not proof, but they are cheap and often decisive.
            </li>
            <li>
              <strong>Do not over-read metadata.</strong> Missing EXIF is normal; a tidy
              timestamp chunk is not a signature.
            </li>
          </ul>

          <h2>Why this matters even outside a courtroom</h2>
          <p>
            Most people who get fooled by a fabricated screenshot never see a judge. They are
            marketplace sellers told a transfer went through, landlords shown a deposit receipt,
            moderators weighing a harassment complaint, or colleagues forwarded a &ldquo;leaked&rdquo;
            message. In all of those settings the image arrives with social pressure attached —
            the sender is waiting, the room is watching — and the cost of pausing to verify feels
            higher than the cost of believing.
          </p>
          <p>
            Understanding that a screenshot is a rendering, not a record, changes that
            calculation. It is a reason to keep the file for what it is worth and to look for a
            second source before acting. It is also the reason this site treats the difference as
            a bright line:{" "}
            <Link href="/acceptable-use">staging a conversation for a story</Link> is a creative
            act, while presenting one as evidence is fraud, and no amount of convincing pixels
            changes which of those you are doing. The same distinction governs{" "}
            <Link href="/blog/is-it-legal-to-use-mockups-in-ads">where marketing use sits</Link>,
            which is a question of disclosure rather than file format.
          </p>
        </article>

        <div className="mt-12 border-t border-black/10 pt-6">
          <h2 className="text-[16px] font-semibold tracking-tight text-foreground">
            Related guides
          </h2>
          <ul className="mt-3 space-y-2 text-[14.5px]">
            {["how-to-spot-a-fake-screenshot", "ui-recreation-ethics-and-trademarks"].map(
              (rslug) => {
                const rel = getPost(rslug)!;
                return (
                  <li key={rslug}>
                    <Link href={`/blog/${rslug}`} className="text-primary hover:underline underline-offset-2">
                      {rel.title}
                    </Link>
                  </li>
                );
              }
            )}
          </ul>
        </div>

        <p className="mt-10 text-[14px]">
          <Link href="/blog" className="text-primary underline underline-offset-2">
            ← Back to the blog
          </Link>
        </p>
      </main>

      <SiteFooter />
    </>
  );
}
