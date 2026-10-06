import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs } from "@/lib/seo";
import { getPost } from "@/lib/blog";
import { whatsappTheme } from "@/lib/themes";

const SLUG = "group-chat-screenshot-guide";
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
            A group chat is the hardest kind of conversation mockup to get right. A one-to-one
            thread has two voices, one geometry and a short list of details to check. A group
            thread multiplies all of it: several senders, several name colours, bubbles that
            group differently for each person, and a member list in the header that has to
            match who actually speaks. Audiences do not read group screenshots character by
            character — they scan for whether the thread feels like it happened between real
            people — and that scan catches inconsistencies fast.
          </p>
          <p>
            This guide covers what a group chat mockup has to reproduce to survive that scan,
            using the free <Link href="/group-chat-generator">group chat generator</Link> and
            the WhatsApp group interface it mimics. Everything is rendered locally and exported
            as a high-resolution PNG.
          </p>

          <h2>Why group chats fail where one-to-one threads pass</h2>
          <p>
            In a two-person thread, the eye has very little to compare. One name, one avatar,
            one colour scheme, and two sides of bubbles. Almost any plausible layout reads as
            real because there is nothing to contradict it. A group thread removes that
            forgiveness. The moment three or four names appear in different colours, the eye
            has a pattern to check: does this name always carry the same colour, does the
            header list match the speakers, does the conversation move the way a group
            conversation moves?
          </p>
          <p>
            There is no single trick that fixes a group mockup. It is a set of small rules,
            each of which is individually obvious and collectively decisive. Most of the
            guides that get this wrong are not lying about the interface; they simply apply
            one-to-one habits to a multi-person screen.
          </p>

          <h2>Coloured sender names are the whole point</h2>
          <p>
            WhatsApp assigns every group member a name colour from a fixed palette so messages
            are attributable at a glance. Scroll a real group and you learn each person by
            colour before you finish reading their name. A mockup has to reproduce that
            relationship exactly: a given member uses the same colour on every message, and
            two different members do not share a colour.
          </p>
          <p>
            The generator exposes a colour per participant, with automatic assignment from the
            same palette the real app draws from if you do not want to pick. The rule that
            matters is consistency over variety. A thread where colours drift, or where a
            member appears once in green and once in orange, reads as assembled by hand, which
            is the opposite of the effect you want.
          </p>
          <p>
            One further rule is easy to break: your own outgoing messages never carry a name
            label. In the real app the right side is implicitly you, and it stays unlabelled.
            Generators that print your own name above your own bubbles are detected instantly,
            because no group chat a user has ever seen looks like that.
          </p>

          <h2>The member list in the header</h2>
          <p>
            Under the group name, WhatsApp shows the member list — a line that reads something
            like <code>You, Alex, Sam, Jordan</code>. It looks like decoration and is in fact
            the first thing an experienced eye checks, because it declares who is in the room.
            If the header lists five people and only two ever speak, the screenshot is not
            wrong in any single pixel, but it is obviously staged.
          </p>
          <p>
            The practical fix is to seed the conversation with quiet members: one-line
            reactions, a thumbs-up, an &ldquo;lol&rdquo; from someone who otherwise says
            nothing. Real groups have lurkers, and including two of them costs a couple of
            messages while removing the most common structural tell. Set the subtitle to the
            member list in the same order the real app would, and keep the names short.
          </p>

          <h2>Tick semantics in a group are different</h2>
          <p>
            In a one-to-one chat, the blue double tick means the one other person has read the
            message. In a group, blue ticks mean <em>every</em> member has read it — which is
            why most real group messages you send sit at two grey ticks for a long time. This
            is the single most under-appreciated detail in group mockups, and it also explains
            why threads built entirely from blue-read messages look wrong: that state is
            genuinely rare in a busy group.
          </p>
          <ul>
            <li>
              <strong>One grey tick</strong> — sent to the server.
            </li>
            <li>
              <strong>Two grey ticks</strong> — delivered, but not everyone has opened it.
            </li>
            <li>
              <strong>Two blue ticks</strong> — every member of the group has read it.
            </li>
          </ul>
          <p>
            The generator lets you set the receipt per outgoing message, so you can mix states
            the way a real thread does. A believable log usually has mostly grey and only one
            or two messages that turn blue late in the conversation.
          </p>

          <h2>Grouping and pacing</h2>
          <p>
            WhatsApp groups a sender&apos;s consecutive messages so the bubbles connect, with
            only the first message in a run taking the corner notch. That grouping is what
            makes a fast back-and-forth legible instead of a wall of identical bubbles. Your
            script should therefore have runs: one person firing two or three short lines,
            then a reply from someone else, then maybe a second reply from a third person.
          </p>
          <p>
            Pacing is a script problem, not a settings problem, and it is where most group
            mockups feel artificial. Real group conversations overlap. People answer a message
            three lines after it appeared. Two people reply to the same message at once.
            Someone posts an unrelated line and the thread moves on. Writing a transcript that
            alternates strictly — A, B, C, A, B, C — produces a thread that reads as a script
            rather than a chat. Let the order wander, and let at least one exchange go
            slightly unanswered.
          </p>

          <h2>Building it step by step</h2>
          <ol>
            <li>
              <strong>Name the group.</strong> Type the group name into <em>Contact → Name</em>{" "}
              and set the subtitle to the member list. Getting the list right matters more than
              most people expect, because it is the first line under the name.
            </li>
            <li>
              <strong>Add the members.</strong> Use <em>+ Add participant</em> for as many
              speakers as the scene needs, each with a name and a colour. Between three and
              eight active speakers is the range where a group feels real; beyond that a
              screenshot becomes unreadable.
            </li>
            <li>
              <strong>Write the conversation with runs.</strong> Every message has a sender
              dropdown, so you can bounce dialogue between members the way a real group
              zigzags — and give one or two quiet members a single line each.
            </li>
            <li>
              <strong>Set the receipts.</strong> Leave most outgoing messages on delivered and
              let only the last one or two go blue.
            </li>
            <li>
              <strong>Export.</strong> Pick 1x, 2x or 3x and download the PNG. Leave the phone
              frame off unless you want a device presentation; a real screenshot never includes
              the phone body.
            </li>
          </ol>

          <h2>The tells that give a fake group chat away</h2>
          <ul>
            <li>Your own messages carry your name above the bubbles.</li>
            <li>
              A member&apos;s colour changes between messages, or two members share a colour.
            </li>
            <li>
              A profile photo next to every message. Real WhatsApp groups show coloured names,
              not member avatars, in the message list.
            </li>
            <li>
              A header listing five members when only two speak — the quiet-member problem.
            </li>
            <li>Every outgoing message sitting on two blue ticks.</li>
            <li>
              Every message from a sender drawn as a fully separate bubble, with no grouping.
            </li>
            <li>
              A header that shows an online status instead of the member list, which is a
              one-to-one habit.
            </li>
          </ul>

          <h2>Trade-offs worth knowing before you start</h2>
          <p>
            The first trade-off is avatars. It is tempting to upload a photo for every member,
            but the WhatsApp message list does not show member avatars — it shows coloured
            names. Only the group photo appears, in the header. If your scene genuinely needs a
            face beside each participant, that is a different interface: the{" "}
            <Link href="/discord-chat-generator">Discord chat generator</Link> supports
            uploading an avatar for every member because Discord rows do carry them.
          </p>
          <p>
            The second trade-off is length. A group screenshot that runs for forty messages
            has to get every name, colour and tick right forty times, and the more entries you
            add the more likely one of them drifts. Short threads — eight to fourteen messages
            — carry the same information and are forgiving. If you need a long thread, export
            in sections rather than one tall image.
          </p>
          <p>
            The third is light versus dark mode. Both are supported and both match the real
            app, so choose by context: dark for gaming or late-night scenes, light when the
            screenshot will sit inside a bright design. Do not mix the two palettes — the
            bubble greens differ between modes, and swapping them is the kind of error that
            only shows up on a real device.
          </p>
          <p>
            For the underlying colour values, the{" "}
            <Link href="/blog/messaging-app-ui-colour-reference">
              messaging app colour reference
            </Link>{" "}
            lists them next to the other platforms, and if you want a two-person thread
            instead, the <Link href="/whatsapp-chat-generator">WhatsApp chat generator</Link>{" "}
            handles that with the same palette and no member list.
          </p>

          <h2>What a group mockup must never become</h2>
          <p>
            A staged group conversation in a comedy sketch, a course module, a screenwriting
            draft or a product demo is a creative device, and the per-member names and colours
            exist precisely to make those scenes legible. The same fabricated thread presented
            as evidence that a group of real people said something is not acceptable — that is
            a matter of intent, not of pixels. The{" "}
            <Link href="/acceptable-use">Acceptable Use Policy</Link> spells out the boundary,
            and there are no templates on this site for fake bank, government, medical or legal
            notices. If you want to see finished multi-speaker scenes before writing your own,
            the <Link href="/examples/group-chat-generator">group chat examples gallery</Link>{" "}
            renders them live with the values described here.
          </p>
        </article>

        <div className="mt-12 border-t border-black/10 pt-6">
          <h2 className="text-[16px] font-semibold tracking-tight text-foreground">
            Related guides
          </h2>
          <ul className="mt-3 space-y-2 text-[14.5px]">
            {["how-to-make-a-fake-whatsapp-chat", "chat-screenshots-in-video-storytelling"].map(
              (rslug) => {
                const rel = getPost(rslug)!;
                return (
                  <li key={rslug}>
                    <Link
                      href={`/blog/${rslug}`}
                      className="text-primary hover:underline underline-offset-2"
                    >
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

      <SiteFooter trademark={whatsappTheme.trademark} />
    </>
  );
}
