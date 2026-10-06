import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { abs } from "@/lib/seo";
import { getPost } from "@/lib/blog";

const SLUG = "messenger-chat-mockup-guide";
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
            Facebook Messenger is one of the most-mocked chat interfaces on the internet, and
            one of the most consistently wrong. The usual failure is not colour but geometry:
            generators draw it like WhatsApp, with a tail on every bubble and a timestamp
            tucked inside it, and anyone who uses Messenger daily registers the fakeness
            before reading a single message. Messenger has no tails, does not stamp time
            inside bubbles, and treats a run of messages from one person as a single visual
            block. Get those three structural facts right and the platform starts to read as
            itself.
          </p>
          <p>
            This guide walks through the details that separate a convincing Messenger mockup
            from a generic one, using the free{" "}
            <Link href="/messenger-chat-generator">Messenger chat generator</Link>. Everything
            renders in the browser, the PNG is generated on your device, and nothing you type
            is uploaded anywhere.
          </p>

          <h2>Messenger is a geometry problem, not a colour problem</h2>
          <p>
            Messenger has almost no signature colour. There is one blue — <code>#0084ff</code>{" "}
            — and it fills outgoing bubbles in both light and dark mode. Everything else is
            greyscale: a white conversation in light mode, a pure black one in dark mode, grey
            incoming bubbles, grey secondary text. Compare that with WhatsApp, where the green
            is the identity, or Snapchat, where the yellow is. In Messenger, if your greys are
            a shade off nobody notices; if your bubble shape is wrong, everybody does.
          </p>
          <p>
            The practical consequence is that details you might treat as minor elsewhere
            become the load-bearing ones here. Corner radius, the way consecutive bubbles
            stack, where the avatar hangs, and where the Seen line goes — all four are
            geometry or placement decisions rather than colour choices, and all four are what
            an experienced user is actually reading when they glance at a thread.
          </p>

          <h2>The values the real app uses</h2>
          <p>
            These are the values ChatMock bakes into the Messenger generator, taken from the
            real client. If you are rebuilding the interface by hand in a design tool, start
            from this table rather than from memory.
          </p>
          <table>
            <thead>
              <tr>
                <th>Element</th>
                <th>Light mode</th>
                <th>Dark mode</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Chat background</td>
                <td>
                  <code>#ffffff</code>
                </td>
                <td>
                  <code>#000000</code>
                </td>
              </tr>
              <tr>
                <td>Outgoing bubble</td>
                <td colSpan={2}>
                  <code>#0084ff</code> — the same blue in both modes, white text
                </td>
              </tr>
              <tr>
                <td>Incoming bubble</td>
                <td>
                  <code>#e4e6eb</code>
                </td>
                <td>
                  <code>#303031</code>
                </td>
              </tr>
              <tr>
                <td>Bubble shape</td>
                <td colSpan={2}>
                  18px capsules with <strong>no tails</strong>
                </td>
              </tr>
              <tr>
                <td>Contact avatar</td>
                <td colSpan={2}>
                  Beside the <em>last</em> bubble of each of their groups, not every bubble
                </td>
              </tr>
              <tr>
                <td>Seen / time labels</td>
                <td colSpan={2}>
                  Small grey text <em>under</em> the groups, never inside bubbles
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            The single most common mistake is copying the iMessage tail. Messenger bubbles are
            capsules — fully rounded on all four corners when a message stands alone. There is
            no tail, ever. A fast sanity check while designing is to zoom out: a real
            Messenger thread looks like a column of rounded rectangles, not a column of speech
            balloons.
          </p>

          <h2>Grouped messages and the 6px corner rule</h2>
          <p>
            When one person sends several messages in a row, Messenger does not repeat the
            full capsule for each one. It draws the run as a block: the corners facing the
            next message in the same group tighten from 18px down to about 6px on the
            sender&apos;s side, so the bubbles visually connect into one thought. The first and
            last bubbles of a run are the ones that get this treatment, which is why a
            three-message run has two loosened ends and a tight middle.
          </p>
          <p>
            This is why runs matter for realism. A thread where every bubble is a separate,
            perfectly rounded capsule reads as a list of unrelated lines, not a conversation.
            When you build a mockup, resist the urge to alternate senders on every line. Real
            chats cluster: someone types two words, then thinks, then adds a third message,
            and only then does the other person reply. Reproducing that rhythm does more for
            the screenshot than any amount of colour tuning.
          </p>

          <h2>Seen, timestamps and avatar placement</h2>
          <p>
            Three placement rules carry most of the authenticity. Each is easy to get wrong
            and easy to check.
          </p>
          <ul>
            <li>
              <strong>The Seen label sits under your last outgoing message only.</strong> Not
              under every outgoing message, and never inside a bubble. In the editor this is
              the <em>Contact → Delivery</em> field: write <code>Seen</code>, write a time, or
              clear it entirely.
            </li>
            <li>
              <strong>Time labels sit under each group as small grey text.</strong> Messenger
              does not stamp individual bubbles, so a timestamp inside a bubble is an
              immediate tell.
            </li>
            <li>
              <strong>Your contact&apos;s avatar hangs beside the last bubble of each of
              their groups</strong>, not beside every bubble. With no photo uploaded, the
              generator draws a blue-gradient initial circle — exactly what the real app does
              for a contact without a picture.
            </li>
            <li>
              <strong>Your own messages never carry an avatar on the right.</strong> Avatars
              mark the other person; the right side is anonymous by design.
            </li>
          </ul>
          <p>
            There is a useful side effect hidden in the Seen rule. If your conversation ends
            on your own message with no Seen line underneath, it reads as a message the other
            person has not opened yet. That is a very specific emotional state — the
            unanswered message — and it costs nothing to stage once you know the Delivery
            field controls it. Clearing the field is a scene decision, not a missing setting.
          </p>

          <h2>Four moves, in order</h2>
          <ol>
            <li>
              <strong>Choose the contact and the presence line.</strong> Type a name into{" "}
              <em>Contact → Name</em> and upload an avatar if the scene needs one. The header
              status line is editable too: <code>Active now</code> and its variants are the
              realistic choices.
            </li>
            <li>
              <strong>Lay out the runs.</strong> Give one side two or three consecutive rows
              before the other answers — the avatar then hangs beside the last bubble of the
              run rather than beside every line. A row can carry an image, caption included.
            </li>
            <li>
              <strong>Group the runs.</strong> Let two or three consecutive messages come from
              the same sender before the other person answers. The generator applies the 6px
              corner rule automatically, but it only helps if your script has runs to group.
            </li>
            <li>
              <strong>Set the Seen status.</strong> Under <em>Contact → Delivery</em>, write{" "}
              <code>Seen</code> or a time; leave it empty for an unanswered thread. The line
              only ever appears under the final outgoing message.
            </li>
            <li>
              <strong>Export.</strong> 1x is 390px wide, 2x is 780px, 3x is 1170px. For
              thumbnails and blog images, 2x is the usual balance of sharpness and file size.
              Leave <em>Phone frame</em> off unless you specifically want a device mockup — a
              real screenshot never includes the phone body.
            </li>
          </ol>

          <h2>The tells that give a fake Messenger screenshot away</h2>
          <ul>
            <li>Bubble tails. Messenger has never drawn them.</li>
            <li>
              Every bubble rounded to the same 18px, with no tightening where a run starts or
              ends.
            </li>
            <li>The avatar repeated beside every message instead of once per group.</li>
            <li>
              A timestamp inside a bubble, or a Seen line under more than the last outgoing
              message.
            </li>
            <li>
              A blue that shifts between light and dark mode. The outgoing fill is{" "}
              <code>#0084ff</code> in both; only the background and the incoming bubble move.
            </li>
            <li>
              A heavy coloured header bar. The real Messenger header is white (or black) with
              a name and a small grey status line underneath.
            </li>
          </ul>

          <h2>Troubleshooting the scenes that go wrong</h2>
          <p>
            Three situations come up again and again. The first is dark mode: Messenger dark
            is not an inverted light mode. The outgoing blue is unchanged, the incoming bubble
            moves to <code>#303031</code>, and the background goes to pure black. If you also
            darken the blue, the result looks like a different app entirely.
          </p>
          <p>
            The second is image-heavy threads. A photo bubble keeps the same corner logic as a
            text bubble and can carry a caption underneath. The mistake to avoid is giving the
            photo a different radius from the text — they share the 18px capsule shape, and
            the run rule applies to mixed text-and-photo groups too.
          </p>
          <p>
            The third is the group-versus-one-to-one mix-up. If more than two people are in the
            thread, you are no longer building Messenger: a multi-person conversation uses
            coloured sender names and a member-list header, which is what the{" "}
            <Link href="/group-chat-generator">group chat generator</Link> reproduces. Meta
            also runs a second messaging interface with its own rules, covered by the{" "}
            <Link href="/instagram-dm-generator">Instagram DM generator</Link>. Mixing
            Messenger conventions with either of those is what makes a mockup feel synthetic,
            even when every individual colour is correct.
          </p>

          <h2>The rule we hold to</h2>
          <p>
            A staged Messenger conversation in a sketch, a design review, a teaching exercise
            or a piece of fiction is a creative device. The same screenshot presented as proof
            that someone actually said something is not, and the difference is intent rather
            than pixels. We publish an <Link href="/acceptable-use">Acceptable Use Policy</Link>{" "}
            covering that boundary, and there are deliberately no templates here for fake
            bank, government, medical or legal notices. If you would like to study complete
            scenes before building your own, the{" "}
            <Link href="/examples/messenger-chat-generator">Messenger examples gallery</Link>{" "}
            renders live, and the{" "}
            <Link href="/blog/messaging-app-ui-colour-reference">messaging app colour
            reference</Link> lists the same values used above alongside the other platforms.
          </p>
        </article>

        <div className="mt-12 border-t border-black/10 pt-6">
          <h2 className="text-[16px] font-semibold tracking-tight text-foreground">
            Related guides
          </h2>
          <ul className="mt-3 space-y-2 text-[14.5px]">
            {["messaging-app-ui-colour-reference", "instagram-dm-screenshot-guide"].map(
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

      <SiteFooter trademark={{ name: "Messenger", owner: "Meta Platforms, Inc." }} />
    </>
  );
}
