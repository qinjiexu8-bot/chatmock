import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs } from "@/lib/seo";
import { getPost } from "@/lib/blog";

const SLUG = "discord-message-mockup-guide";
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
            Discord screenshots show up everywhere gaming content lives: clan recruitment
            posts, developer update recaps, streamer Q&amp;As, moderator callout
            threads. And they fail in a very consistent way — most fake Discord screenshots
            are drawn like WhatsApp or iMessage, with left and right bubbles and a green
            header. Anyone who opens Discord daily clocks it as fake before reading a word,
            because Discord is not a bubble app. It is a row-based layout, and that single
            structural fact decides everything else.
          </p>
          <p>
            This guide walks through building one that survives a glance from an actual
            user, using the free{" "}
            <Link href="/discord-chat-generator">Discord chat generator</Link>. Everything
            runs in the browser, exports a high-resolution PNG, and — starting this week —
            supports uploading a photo for every member, not just the channel icon.
          </p>

          <h2>The layout is rows, not bubbles</h2>
          <p>
            Every Discord message is a full-width row: a 40px avatar on the left, then a
            coloured username with a timestamp beside it, then the message text underneath,
            wrapping across the whole channel width. There is no left/right alignment, no
            bubble shape, no tail. When someone sends several messages in a row, the avatar
            and username appear only once — subsequent messages indent to align with the
            text, not the avatar. Generators that repeat the avatar on every line get it
            wrong; so do ones that draw two coloured columns of bubbles.
          </p>
          <p>
            The username colour is not decoration either. Discord derives it from roles, so
            regular members often share a near-white default while moderators and boosters
            carry stronger colours. A channel where every user has a different vivid colour
            reads as staged; two or three shared colours with one or two accents reads as
            real.
          </p>

          <h2>Dark mode is the default — design for it first</h2>
          <p>
            Discord&apos;s dark theme is not an inversion of light mode; it is the app&apos;s
            home. The channel background sits around <code>#313338</code>, the sidebar is a
            step darker, and text is a soft off-white rather than pure white. If your mockup
            uses pure black or pure white text on mid-grey, it will look off without the
            viewer being able to say why. Light mode exists and is worth using when the
            surrounding video or slide is light-themed — just do not treat it as the default.
          </p>
          <p>
            The exact values matter less than the relationships: sidebar darker than chat
            area, timestamps and dividers in a muted grey, and the channel header carrying a
            <code>#</code> prefix with the topic line beside it. Our{" "}
            <Link href="/messaging-app-ui-colour-reference">messaging app colour
            reference</Link> lists the values we use.
          </p>

          <h2>Staging the channel view</h2>
          <ol>
            <li>
              <strong>Name the channel.</strong> Type it into the <em>Contact → Name</em>{" "}
              field — the <code>#</code> prefix is added automatically — and write a topic
              line. A believable topic (&ldquo;no spoilers for ep. 12&rdquo;) does more for
              realism than any colour choice.
            </li>
            <li>
              <strong>Add the members.</strong> Each participant gets a username, a role
              colour, and — new — an uploaded avatar. Without a photo the generator draws a
              coloured initial circle, which is exactly what Discord does for default
              avatars. Two or three members is enough for most scenes.
            </li>
            <li>
              <strong>Write grouped messages.</strong> Real Discord conversations are runs:
              one person firing off three short lines, then a gap, then a reply. Let the
              generator group them — avatar and username once per run.
            </li>
            <li>
              <strong>Pick the theme last.</strong> Dark for gaming and community content,
              light when the mockup sits inside a bright design. Export at 2x for thumbnails,
              3x if the text will be read at small size.
            </li>
          </ol>

          <h2>The tells that give a fake away</h2>
          <ul>
            <li>Bubbles with tails — Discord has never used them.</li>
            <li>A timestamp on every single message instead of once per group.</li>
            <li>24-hour timestamps — Discord uses &ldquo;Today at 9:32&rdquo; phrasing.</li>
            <li>Everyone having a different bright username colour.</li>
            <li>A green or blue app header — Discord&apos;s top bar is the channel name with
              a <code>#</code>, nothing else.</li>
          </ul>

          <h2>The channel header and the topic line</h2>
          <p>
            Where a phone app puts a contact, Discord puts a channel. The header leads with a{" "}
            <code>#</code>, then the channel name, then a topic line underneath — and that topic
            line is doing more work than most people give it credit for. A believable topic reads
            like a small house rule or a piece of channel context: what the channel is for, or a
            constraint people agreed on. Keep it lowercase, short, and specific to the room.
          </p>
          <p>
            The hash belongs in the channel name, not the topic. If your scene shows{" "}
            <code>#general</code>, the topic sits beside it as plain text. And the header carries
            member and search affordances, not a phone-style back arrow with a contact avatar —
            that is an iMessage header pasted onto a Discord frame, and it is one of the easiest
            mistakes to spot because the top of the screen is where the eye starts.
          </p>
          <p>
            A useful habit is to write the topic before the messages. It forces you to decide what
            the room is, which then shapes who speaks and how. A channel about a game update and a
            channel about a community event produce very different conversations, and the topic is
            the cheapest way to communicate that context to the viewer in a single line.
          </p>

          <h2>How username colours actually distribute</h2>
          <p>
            Discord colours come from roles, which means a real channel is mostly monochrome with
            a few accents rather than a rainbow. Most members share the near-white default, while
            moderators, boosters and other role-holders carry stronger colours. In a six-person
            log, seeing four or five default names and one or two coloured ones is exactly the
            distribution you would expect.
          </p>
          <p>
            Two boundaries are easy to overstep. The colour belongs to the username only — the
            message text stays the standard off-white, never tinted to match the name. And the
            coloured circle beside a member is an avatar, not a name colour; a member can have a
            tinted avatar while their name stays default. When every speaker has a vivid name and
            a matching coloured avatar, the channel reads as a character lineup rather than a
            room.
          </p>
          <p>
            Colour also does narrative work if you let it. Giving one participant a distinct
            colour makes them read as the moderator or the person with authority, so you can cast
            a role without spelling it out. Let that person speak once or twice with their colour
            doing the labelling, and leave everyone else at default.
          </p>

          <h2>Desktop form and conversation width</h2>
          <p>
            Part of why Discord mockups look off is the frame around the rows. Discord is
            primarily a desktop app as well as a mobile one, and on desktop the message column is
            not the full window — it sits between a channel list on the left and a member list on
            the right. A row that fills an extremely wide canvas therefore reads as a
            desktop-captured screen, while a narrow column reads as the mobile app.
          </p>
          <p>
            This matters for export because Discord rows, unlike phone bubbles, are not capped to
            a fraction of the width — they are meant to fill the column. So the thing controlling
            your line length is the width you export at, not a bubble cap you can set. Decide
            which device you want the screenshot to imply and pick the canvas width to match;
            then keep the left inset of the rows consistent, because that inset is what makes a
            grouped run align under its avatar rather than drifting.
          </p>
          <p>
            If you are dropping the mockup into a video or a slide, the same logic as any other
            platform applies: pick the export scale for the size it will be shown at, and keep
            the frame off unless the shot calls for a physical device. The{" "}
            <Link href="/discord-chat-generator">Discord chat generator</Link> exports a clean
            PNG, and the{" "}
            <Link href="/chat-screenshots-in-video-storytelling">video storytelling guide</Link>{" "}
            covers how long to hold a screenshot on screen once you have it.
          </p>

          <h2>Keeping a mockup honest</h2>
          <p>
            A staged moderator conversation in a parody video is a creative device; the same
            screenshot presented as evidence that someone said something is not. We publish
            an <Link href="/acceptable-use">Acceptable Use Policy</Link> and ask that mockups
            stay recognisable as staged work. If you are staging conversations for fiction,
            the <Link href="/examples">examples gallery</Link> has complete scenes you can
            borrow structure from, including a{" "}
            <Link href="/examples/discord-chat-generator">Discord-specific set</Link>.
          </p>
        </article>

        <div className="mt-12 border-t border-black/10 pt-6">
          <h2 className="text-[16px] font-semibold tracking-tight text-foreground">
            Related guides
          </h2>
          <ul className="mt-3 space-y-2 text-[14.5px]">
            {[
              "messaging-app-ui-colour-reference",
              "chat-screenshots-in-video-storytelling"
            ].map((rslug) => {
              const rel = getPost(rslug)!;
              return (
                <li key={rslug}>
                  <Link href={`/blog/${rslug}`} className="text-primary hover:underline underline-offset-2">
                    {rel.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="mt-10 text-[14px]">
          <Link href="/blog" className="text-primary underline underline-offset-2">
            ← Back to the blog
          </Link>
        </p>
      </main>

      <SiteFooter trademark={{ name: "Discord", owner: "Discord Inc." }} />
    </>
  );
}
