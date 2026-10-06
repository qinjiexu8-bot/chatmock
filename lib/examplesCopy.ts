/**
 * /examples/{slug} 分平台画廊页的独特文案。
 *
 * 每个平台一组：intro（导语）、designNotes（还原的设计细节）、useCases（适用场景）、
 * faqs（3 条常见问答）。目的是让每个子画廊都有平台专属的实质内容，
 * 避免模板化薄页（AdSense low value content 风险）。
 */

export interface ExamplePageCopy {
  intro: string;
  designNotes: string[];
  useCases: string;
  /**
   * 「这个构图为什么这样设计」—— 每条围绕一个真实取舍（气泡密度与节奏、
   * 时间戳节奏、明暗与配色关系、视觉重心与留白），必须落在该平台的事实上，
   * 平台之间不得互相套用。
   */
  composition: { heading: string; body: string }[];
  faqs: { q: string; a: string }[];
}

export const examplePageCopy: Record<string, ExamplePageCopy> = {
  whatsapp: {
    intro:
      "WhatsApp mockups live or die on the small things: the beige header, the doodle wallpaper behind every bubble, the blue double ticks that only appear once a message is read. The examples on this page were all rendered live by the same engine as our WhatsApp chat generator — nothing here is a screenshot of a real phone or a real conversation.",
    designNotes: [
      "iOS-style WhatsApp header in the authentic beige, with video and call icons — not the Android green variant",
      "Signature doodle wallpaper on the chat background, in both light and dark mode",
      "Blue double-tick read receipts and a full per-message timestamp editor",
      "Flex-anchored timestamps that never spill outside the bubble, at any message length",
    ],
    useCases:
      "Creator collab threads, product sign-offs and small everyday logistics are the three WhatsApp scenarios people rebuild most often — which is why the gallery covers all three, including one in dark mode.",
    composition: [
      {
        heading: "Why the rhythm is uneven on purpose",
        body:
          "A real WhatsApp thread is not a column of equal-width bubbles. Look at the five-message collab scene: a long opener from Maya, a shorter question, your two-line reply, then a one-line sign-off. We cap every bubble at roughly three quarters of the chat width, so a detailed message wraps onto three or four lines while a quick confirmation stays a stub. That mismatch is the point. When every bubble is padded to the same length the eye reads a form, not a conversation. In the editor, resist the urge to balance the two sides: let one person type a paragraph and the other answer in four words, and keep the final outgoing bubble short so the blue ticks land under something punchy.",
      },
      {
        heading: "Dark mode is a repaint, not an inversion",
        body:
          "WhatsApp dark mode is where most mockups fall apart, because flipping the light theme does not produce it. The chat surface drops to a near-black, green-tinged #0b141a, but the incoming bubble lifts to #202c33 so it separates from the wallpaper instead of vanishing into it. Your own bubble is not a dimmed #d9fdd3 — it becomes a deep green #005c4b with light text, and the header takes #202c33, one step off the conversation surface rather than the beige of the light theme. Only the read ticks carry over untouched: the blue stays #53bdeb in both modes, because it is the app's accent rather than a tint. Change any one of those relationships and the dark render stops reading as WhatsApp.",
      },
      {
        heading: "Grouping and timestamps inside the bubble",
        body:
          "Two small mechanics keep a WhatsApp thread legible. First, grouping: when the same sender fires several messages in a row, only the first bubble carries the corner notch and the rest stack with squared edges, so a three-line burst reads as one beat rather than three messages from three people. Second, the timestamp. WhatsApp places a small time inside the bottom-right of every bubble, in a muted grey (#667781 on light, #8696a0 on dark) that stays subordinate to the message text. That is a different contract from apps that print a time under each group: because the stamp lives inside the bubble, a long message and a single-word reply both keep it tucked away from the content instead of colliding with it.",
      },
    ],
    faqs: [
      {
        q: "Are these real WhatsApp screenshots?",
        a: "No. Every example is drawn in your browser by the ChatMock engine to look like WhatsApp on iOS. No real accounts, numbers or conversations are involved.",
      },
      {
        q: "How do I make my own version?",
        a: "Open the WhatsApp chat generator, start from a conversation shaped like the examples, and edit names, messages, ticks and timestamps. Export is a high-resolution PNG, free and watermark-free.",
      },
      {
        q: "Can I switch the example to dark mode?",
        a: "Yes — one of the three examples on this page already uses dark mode, and in the generator a single Appearance toggle flips the whole mockup between light and dark.",
      },
    ],
  },
  messenger: {
    intro:
      "Facebook Messenger has its own visual dialect: capsule bubbles, the Active now subtitle, and a Seen marker rather than read ticks. The examples here show both the light and dark render paths of our Messenger chat generator, so you can pick the tone that matches your scene.",
    designNotes: [
      "Rounded capsule bubbles with Messenger's exact spacing rhythm",
      "Active now subtitle and a Seen marker under the last outgoing message",
      "Dark mode with the authentic deep-grey conversation surface",
      "Editable delivery text — Seen, Seen just now, or cleared entirely",
    ],
    useCases:
      "Client check-ins, family coordination and craft-fair logistics are the most-requested Messenger scenes — all of them read as believable weekly-life conversations without naming any real brand or person.",
    composition: [
      {
        heading: "Geometry does the work, not colour",
        body:
          "Messenger looks plain and is unusually easy to get wrong, because almost all of its identity sits in shape rather than colour. Incoming bubbles are the same grey in both themes, your own are the same blue (#0084ff) whether the app is light or dark, and there are no tails anywhere. What separates a real Messenger screenshot from a fake one is how messages stack: consecutive bubbles from one sender stay fully rounded capsules, then the first and last in the run narrow to a 6px corner on the sender's side. That subtle squaring is what makes a burst read as a block. Swap it for the iMessage tail, or round every corner equally, and anyone who uses Messenger spots it in a second.",
      },
      {
        heading: "You see the avatar once per group",
        body:
          "Where does the contact's photo go in Messenger? Beside the last bubble of each of their message groups — and only there. A person who sends three messages in a row shows their avatar once, next to the third, with the earlier two tucked above it. Our client check-in scene follows that rule, so the header avatar and the beside-the-bubble avatar are the same face without the image turning into a repeated stamp. Low-quality generators put the avatar on every bubble, which both clutters the layout and contradicts the app. The header still carries the name and an Active now subtitle; the per-group avatar is the second, quieter cue that tells you who is speaking without a name on every line.",
      },
      {
        heading: "Time sits under the group",
        body:
          "Messenger never puts a clock inside a bubble. Time labels sit under each group of messages as small grey text, and the Seen marker follows the same rule at the very bottom of the thread. That is a different rhythm from WhatsApp, where the time is tucked into each bubble's corner. The practical effect is that a Messenger thread shows fewer, larger time steps: one under the opening exchange, one under the reply, and Seen only beneath your last outgoing message. When we compose an example we let those group labels mark the natural beats of the conversation and keep the bubbles themselves clean. A time stamped inside every grey and blue capsule is one of the quickest ways to make a Messenger mockup look generated.",
      },
    ],
    faqs: [
      {
        q: "Does the Seen marker update automatically?",
        a: "You control it with the Delivery field — type Seen, Seen just now, or leave it empty. It only appears under the last outgoing message, exactly like the real app.",
      },
      {
        q: "Is this safe to use in a video?",
        a: "Yes, for fiction and illustration. Our mockups are recreations for storytelling, teaching and design — read the acceptable use policy before publishing anything that could be mistaken for a real exchange.",
      },
      {
        q: "Can I mock a group conversation in Messenger?",
        a: "For multi-person scenes, use the group chat generator — it renders Messenger-style bubbles with per-participant colours and names.",
      },
    ],
  },
  "group-chat": {
    intro:
      "Group chats are where mockups earn their realism: several senders, coloured names, overlapping replies and natural pacing. These examples are rendered by the same engine as our group chat generator, with up to four participants and per-person colours you can change.",
    designNotes: [
      "Per-participant sender names in distinct colours, editable per member",
      "Initial-circle avatars in matching hues, or upload your own images",
      "WhatsApp-style group layout with the member list in the header subtitle",
      "Mixed light and dark scenes so group threads work in both tones",
    ],
    useCases:
      "Trip logistics, household planning, reunion threads and building-wide logistics are the four classic group scenes — between them they show pacing, colour variety and the quiet moment where someone finally commits.",
    composition: [
      {
        heading: "Colour tells you who is talking",
        body:
          "In a WhatsApp group the sender's name is the primary way you track who is speaking, and it arrives in a colour drawn from a fixed palette. The cabin-weekend scene runs four voices — Alex, Sam, Jordan and you — and each incoming name carries its own hue so the thread stays readable at a glance even though the bubbles themselves are all the same green and white. Your own messages carry no label at all: they sit on the right and you know they are yours. That asymmetry is real behaviour, and labelling your own bubbles is one of the quickest giveaways of a generated group chat. When you build one, choose colours that stay far apart, and make sure at least two members actually talk.",
      },
      {
        heading: "Why most group ticks stay grey",
        body:
          "The tick states in a group carry a heavier meaning than in a one-to-one chat. A single grey tick means sent, two grey ticks mean delivered, and two blue ticks mean every member has read it. In a group of four or six that last condition is rare — someone is always asleep — so most messages in a believable group sit at two grey ticks, with blue reserved for the one message everybody clearly saw. Our examples use that sparingly. A mockup where every outgoing bubble is blue-read reads as staged the moment you notice it, because it implies a room of people all looking at their phones at the same second. Let the group be a little unreliable; it is more convincing.",
      },
      {
        heading: "The member list carries the crowd",
        body:
          "Where a one-to-one chat puts a presence line under the name, a WhatsApp group puts the member list: You, Alex, Sam, Jordan. That subtitle is doing quiet work. It tells the viewer how many people are in the room, which is what makes a four-speaker thread read as a real group rather than four separate chats stitched together. A group of five that only ever shows two voices feels thin, so our scenes deliberately include members who speak once and a closing line that hands the conversation to someone else. Keep the list in the order the real app would show it, and let the pacing stay uneven: groups are noisy, and a tidy, even rotation is the giveaway.",
      },
    ],
    faqs: [
      {
        q: "How many participants can I add?",
        a: "As many as you need. In the generator, add members with + Alex and flip each message to the right sender; colours are assigned per participant.",
      },
      {
        q: "Do the colours match the real app?",
        a: "The palette mirrors the tones group chats use on iOS. Colours are editable, so you can nudge them toward your own reference screenshot.",
      },
      {
        q: "Can I mix image messages into the thread?",
        a: "Yes — uploading an image on a message turns it into a rounded media bubble with an optional caption, exactly how the examples handle photos.",
      },
    ],
  },
  "text-message": {
    intro:
      "The iPhone Messages look is the most recognisable chat UI in the world: green and grey bubbles, the Delivered line, and 9:41 in the status bar. All three examples were rendered live with our iPhone text message generator, including the exact bubble geometry and receipt placement.",
    designNotes: [
      "Authentic green outgoing / grey incoming bubbles with iOS corner radii",
      "Delivered or Read line under the last outgoing bubble, fully editable",
      "Status bar with the classic 9:41 time and SF Symbols-style signal icons",
      "SMS and iMessage pacing — short bursts that read like real thumbs",
    ],
    useCases:
      "Launch-day approvals, evening-plan threads and shift swaps are the three most reused iMessage scenes: compact, fast-moving and instantly legible even at thumbnail size.",
    composition: [
      {
        heading: "One timestamp, at the very top",
        body:
          "iOS Messages shows a single time line at the top of a thread — Today 9:41 — and then nothing. No bubble in an iPhone conversation carries its own clock. That is the opposite of WhatsApp and Telegram, and it is the fastest tell of a fake iPhone screenshot: put a small time in the corner of each grey and blue bubble and the image stops being iOS immediately. Our examples follow the real rule, so the whole thread shares one date header and the only other status text is the Delivered line at the bottom. If a scene needs to convey a long gap, the honest way is a second date separator further down, the way a real thread adds Yesterday when the conversation resumes the next morning.",
      },
      {
        heading: "Short bursts and a tail on the last",
        body:
          "iMessage bubbles are rounder than WhatsApp's — a full 18px radius on the whole capsule — and the tail behaves in reverse. Instead of marking the first message of a run, the narrowed corner appears on the last bubble, so a pair of outgoing messages reads as one block that resolves at the bottom. We also hold bubbles to about 72% of the width. That matters because iPhone users type in bursts: a film time, a row number, a one-line answer. If you widen the bubbles to fill the screen edge to edge, a two-thumb exchange suddenly looks like a scripted transcript. Keep most messages to one or two lines, let a single one carry the detail, and let the green and grey alternate quickly.",
      },
      {
        heading: "The Delivered line only at the end",
        body:
          "The Delivered or Read line is the most misused element on iPhone mockups. In the real app it sits under the last outgoing message and nowhere else; the moment your contact replies it disappears, because the ball is back in their court. Our launch-approval scene ends on Priya's message and shows no line at all — that is correct. The shift-swap thread ends on your own bubble, so Delivered appears once, small and grey. Generators that stamp every outgoing bubble with a status line look busy and wrong. As a scene device the line is genuinely useful: an image that ends on your message with no Delivered underneath reads as unopened, which is exactly the beat some stories need.",
      },
    ],
    faqs: [
      {
        q: "Green or blue bubbles — which will I get?",
        a: "Outgoing bubbles follow the app's default green SMS look. The tone and wording of the conversation is what sells the scene either way.",
      },
      {
        q: "Can I change the time in the status bar?",
        a: "Yes — the status bar detail section lets you set the time, battery level and signal strength, or hide the status bar entirely for a cleaner crop.",
      },
      {
        q: "What resolution should I export?",
        a: "2x (780px wide) suits most videos and blogs. Use 3x when the mockup will be zoomed into, and 1x for quick storyboard drafts.",
      },
    ],
  },
  "instagram-dm": {
    intro:
      "Instagram DMs carry the platform's visual DNA: a slim gradient-adjacent header, tight bubble stacks and a Seen marker instead of read ticks. These examples come straight from our Instagram DM generator, including the Mon 9:41-style date separator format.",
    designNotes: [
      "Compact bubble stack with Instagram's tighter line spacing",
      "Seen marker under the last outgoing message, editable or clearable",
      "Day separators in the real app's abbreviated format (Mon 9:41)",
      "Light and dark renders so the thread matches your video's grade",
    ],
    useCases:
      "Brand-partnership replies, repost requests and weekend-plan threads cover the whole Instagram range: the professional creator inbox at one end, the casual friend catch-up at the other.",
    composition: [
      {
        heading: "Your bubble is a gradient",
        body:
          "Instagram's sender bubble is not a colour you can pick from a swatch — it is a gradient running from a violet (#a033ff) on the left edge to a pink (#e24aa2) on the right. That sweep is the platform's most portable signature, and crucially it survives dark mode untouched: the conversation background drops to pure black and incoming bubbles darken to #262626, but your own messages keep the same purple-to-pink fade, because it is a brand mark rather than a theme colour. The practical tradeoff is that you cannot substitute a flat blue or a single purple and still look like Instagram. A plain sender bubble reads as Messenger or something generic, and the gradient is doing more identification work than any other element on the screen.",
      },
      {
        heading: "Seen is an avatar, not a word",
        body:
          "In a real Instagram DM the read receipt is not just the word Seen. A tiny round version of the recipient's avatar sits beside the label, under your last outgoing message, and that little face is the part people forget. Reproducing it means the header avatar and the Seen avatar are the same person, which is what sells the detail. Text-only Seen lines are the single most common tell in fake Instagram screenshots — they look approximately right until you hold them beside the app. As always it appears once, beneath the final message you sent, never under an incoming bubble. If your scene needs an unopened conversation, clearing the label is the correct move; a thread that ends on your message with no Seen reads as an unread DM.",
      },
      {
        heading: "Every bubble stays fully round",
        body:
          "Instagram is the one messenger that does not reshape bubbles when messages stack. Every bubble is a full capsule — no tail, and no narrowed corner where a run begins or ends, unlike Messenger and Android, which square off the edges of a group. The result is a loose, evenly spaced stack rather than a joined block, and it changes how many messages you want: because nothing visually merges, a rapid burst starts to feel like a list, so a little restraint goes further here. Time markers follow the same logic. Instagram does not label individual messages; an occasional small centred stamp appears between groups, which is enough to orient the reader without turning the thread into a log.",
      },
    ],
    faqs: [
      {
        q: "Can I show the Seen status under my reply?",
        a: "Yes — the Delivery field controls it. Type Seen and it appears under the last outgoing message, matching how Instagram marks read state.",
      },
      {
        q: "Do the examples include avatars?",
        a: "They use initial-circle avatars by default; in the generator you can upload any image per participant and it renders in the header and beside messages.",
      },
      {
        q: "Is the export really watermark-free?",
        a: "Yes. Every ChatMock export is a clean PNG at 1x, 2x or 3x with no watermark and no signup, on every generator including this one.",
      },
    ],
  },
  discord: {
    intro:
      "Discord mockups follow different rules from phone chats: a channel header instead of a contact, row-based messages, and coloured usernames that carry a role. The examples here are rendered by our Discord chat generator, from #general triage and an announcements-style scene to a hobby server past midnight.",
    designNotes: [
      "Row-based message layout with compact avatars and inline timestamps",
      "Per-member username colours that read like role colours",
      "Channel-style header with a subtitle instead of a presence line",
      "Dark mode as the native tone, with a light render available too",
    ],
    useCases:
      "Bug triage and community event threads are the two Discord staples — one shows the tool as a workspace, the other as a creator's community hub.",
    composition: [
      {
        heading: "Discord has rows, not bubbles",
        body:
          "The first thing to unlearn about Discord is the bubble. Messages are full-width rows against a flat surface, and nobody — including you — gets a right-aligned capsule. In the general-channel triage scene your own patch note sits on the left exactly like the others; you know it is yours from the username and avatar, not because it shifted sides. This is why a Discord mockup built from WhatsApp parts is obvious to anyone who uses the app: the left-right split, the rounded blue bubble, the tail — none of them exist here. When you compose a scene, think in lines rather than boxes. The layout is denser than a phone chat, so a little text goes a long way and the column itself is the only container.",
      },
      {
        heading: "Avatar, name and time appear once",
        body:
          "Discord groups a person's consecutive messages under one header: a 40px avatar, the coloured username, and an inline timestamp like Today at 9:32, all on a single line. Any further message from that person is indented underneath with just the text — no repeat of the avatar, name or time. That is the opposite of phone chats, where each bubble is its own unit. It also changes what you write: a burst of three lines reads as one thought, so short continuation lines feel natural and clean. The timestamp marks the rhythm of the channel, and because it appears once per group you get far fewer of them than in a bubble app. Getting that grouping right is most of what makes a Discord screenshot believable.",
      },
      {
        heading: "Dark is the native Discord tone",
        body:
          "Discord's default surface is a dark grey, not a black, and that specific value — #313338 — is the app's identity. Text runs a soft off-white (#dbdee1) rather than pure white, secondary text and timestamps drop to a muted grey (#949ba4), and the accent that shows up on links and role names is blurple (#5865f2). A light render exists, but it is the exception, so our examples lean dark and let the coloured usernames carry the contrast. Notice what dark mode is not: it is not the light theme inverted. The greys are lifted deliberately so long reading sessions stay comfortable, and the message input sits a shade above the channel background. Repaint the whole thing pure black and it stops looking like Discord.",
      },
    ],
    faqs: [
      {
        q: "Can I change the channel name?",
        a: "Yes — the Title field is the channel name and the Subtitle field sits under it, so you can set #general, #announcements or your own community's naming.",
      },
      {
        q: "Do usernames keep their colours?",
        a: "Each participant can have their own colour, applied to their username on every message — the same way role colours colourise Discord member names.",
      },
      {
        q: "Is there a dark mode version?",
        a: "One example is already dark, and the generator's Appearance toggle flips the entire mockup — bubbles, header and background — in one click.",
      },
    ],
  },
  telegram: {
    intro:
      "Telegram's chat look is distinctive: the doodle wallpaper behind translucent bubbles, double ticks for delivery, and a floating capsule header. All three examples are live renders from our Telegram chat generator, with the wallpaper drawn in code rather than pasted as an image.",
    designNotes: [
      "SVG doodle wallpaper tile shared by both light and dark scenes",
      "Floating iOS-style capsule header with the avatar on the right",
      "Double-tick sent state and a last seen subtitle you can edit",
      "Bubble tails on the first message of each group, flex-anchored timestamps",
    ],
    useCases:
      "Trip planning, sprint handoffs and a language-exchange meet-up show Telegram's three common lives: the friendly travel thread, the tidy remote-work channel and the study swap.",
    composition: [
      {
        heading: "The green that is not WhatsApp's",
        body:
          "Telegram's outgoing bubble is the detail that separates it from every other messenger, and it is not the green people expect. In light mode it is a pale, almost mint green (#eeffde) — close to WhatsApp's #d9fdd3 but noticeably cooler and lighter, sitting on a soft grey-blue wallpaper rather than beige. In dark mode it abandons green entirely and becomes a steel blue (#2b5278) against a deep blue-night background (#0e1621), with incoming bubbles a darker slate (#182533). That is the whole tell: Telegram dark mode is not a dimmed echo of its light theme, it is a different palette. A generator that keeps WhatsApp's greens inside a Telegram frame is recognisable as fake before you read a single word.",
      },
      {
        heading: "Two tick states, never three",
        body:
          "Telegram's checkmarks carry less information than WhatsApp's — by design. There are only two states: one check means the message reached the server, two checks mean it was read. There is no separate delivered step, so a conversation where every bubble sits at a single check reads as they have not opened the app, not as a stalled delivery. That changes how you compose a scene. You cannot shade a message as delivered-but-unread, because the real app has no such state; you either leave it at one check or commit to two. Our examples use the double check sparingly, on the messages that close a thought, and let earlier bubbles sit at a single check so the thread has a natural read-through rhythm.",
      },
      {
        heading: "Wallpaper and the floating header",
        body:
          "Two things give Telegram its airiness. The first is the wallpaper: a repeating doodle tile drawn in code, not pasted as an image, sitting behind translucent bubbles so the pattern stays faintly visible through the gaps. The second is the header — a floating capsule that hovers over the chat rather than a solid bar welded to the top, with the avatar on the right and the name and a last-seen line inside it. Between conversations, day divider pills break the thread: Yesterday, July 28, whatever the scene needs. Those pills do the same job as a date separator elsewhere, but they float. The result is a screen with more visible background than WhatsApp, which is exactly why the wallpaper has to be drawn rather than filled flat.",
      },
    ],
    faqs: [
      {
        q: "Is the wallpaper part of the export?",
        a: "Yes — the doodle pattern is drawn as part of the mockup, so the exported PNG keeps the wallpaper exactly as you see it here.",
      },
      {
        q: "Can I use this for a Telegram group scene?",
        a: "The generator supports multiple participants with per-person names; for true group-chat layouts across platforms, the group chat generator is a better fit.",
      },
      {
        q: "What does the subtitle show?",
        a: "Anything you type — last seen recently, typing…, online. It sits in the floating header exactly where Telegram places it.",
      },
    ],
  },
  snapchat: {
    intro:
      "Snapchat's chat surface is instantly recognisable: the yellow header, lavender outgoing bubbles and the Delivered line. These examples are rendered by our Snapchat chat generator, and the dark variant shows how the theme shifts without losing the app's identity.",
    designNotes: [
      "Signature yellow header that survives in both light and dark mode",
      "Lavender outgoing bubbles with Snapchat's rounded geometry",
      "Delivered status under the last outgoing message, fully editable",
      "Short-burst pacing that mirrors how the app is actually used",
    ],
    useCases:
      "Beach-day plans, library cram sessions and story takeovers are the three scenes people ask for most — casual, friendly and unmistakably Snapchat at a glance.",
    composition: [
      {
        heading: "Yellow stops at the header",
        body:
          "The most common Snapchat fake fills the entire screen with yellow. The real app does not. Its signature #fffc00 lives in the header bar — with black text and icons — and stops there; the conversation area beneath is plain white in light mode and pure black in dark mode. That split is the whole design. Because the header is such a loud, saturated band, the quiet surface underneath gives the thread room to breathe, and it also means the header colour never competes with the bubbles for attention. When you compose a scene, treat the yellow as a frame rather than a background: one bright strip at the top, everything else neutral. Get the split wrong and the screenshot reads as a fan-made graphic instead of a phone capture.",
      },
      {
        heading: "Lavender now, deep purple later",
        body:
          "Snapchat's outgoing bubble is a soft lavender (#d9a7f9) in light mode, and the dark render swaps it for a deep saturated purple (#5b3a8e). That pairing is worth understanding rather than eyeballing. On white, the lavender has to stay light enough to hold black text comfortably, so it sits high on the value scale. On black, a pale lavender would glare, so the theme pushes to a darker, more saturated purple and flips the text to white. The incoming bubbles move in the opposite direction — light grey (#f0f0f0) on white, near-black (#262626) on dark. The relationship holds in both modes: a pink-purple speaker side against a neutral listener side, with the yellow header constant overhead.",
      },
      {
        heading: "Avatars every time, Delivered underneath",
        body:
          "Snapchat marks incoming messages differently from most apps: a small avatar hangs beside each one, not once per group. If your contact sends four messages you see four little faces down the left edge, which makes the layout feel chatty and instantaneous — fitting for an app built around bursts. Outgoing messages carry no avatar but do carry a Delivered label in small grey text. Notice what is missing: Snapchat puts no timestamp inside the bubbles. A time, when you need one, belongs in the header or as a top-of-thread marker, not pasted into every capsule. Between the repeated avatars and the Delivered labels the screen is busier than a WhatsApp thread, so we keep the message text short to match the platform's pace.",
      },
    ],
    faqs: [
      {
        q: "Does the yellow header stay in dark mode?",
        a: "Yes — one example shows the dark render, where the conversation surface darkens while the header keeps the app's signature colour.",
      },
      {
        q: "Can I fake a Snap streak?",
        a: "You can type any status or timestamp text, but our mockups are conversation screens — they don't render streak counters or the camera screen.",
      },
      {
        q: "Is the export free of branding?",
        a: "The mockup recreates Snapchat's interface for illustration; ChatMock adds no watermark of its own. Follow the acceptable use policy when publishing.",
      },
    ],
  },
  "android-sms": {
    intro:
      "Android messages have their own grammar: Google's Material blue, a clean status bar, and a Read marker under RCS. All three examples were rendered by our Android SMS generator, which draws the Android status bar the way a real screenshot does — clock on the left, icons on the right, no camera cutout — unlike the iPhone pages.",
    designNotes: [
      "Material Design bubbles with the large 20px radius and Google blue",
      "Android status bar: clock on the left, signal and battery on the right",
      "Read marker under the last outgoing message, editable like RCS",
      "Carrier label and subtitle line for a believable contacts entry",
    ],
    useCases:
      "Courier updates, appointment confirmations and volunteer rotas are the most-recreated SMS scenes — short, practical and instantly believable on a Material canvas.",
    composition: [
      {
        heading: "Material capsules are wider than iMessage",
        body:
          "Google Messages uses Material Design, and the giveaway is the bubble radius. Where iOS Messages rounds to 18px, Google's capsules go out to about 20px, and the corners square off differently: when one person sends several messages in a row, the last bubble in that run tightens to a 6px corner on the sender's side. Outgoing bubbles are Google blue (#1a73e8) with white text, the same blue in light and dark mode; incoming bubbles are a light grey (#f1f3f4) that darkens to #303134 when the app is in night mode. Because both the radius and the corner behaviour are larger and looser than Apple's, a screenshot borrowed from an iPhone template looks subtly wrong to any Android user.",
      },
      {
        heading: "Read is text, not a tick",
        body:
          "Android messaging does not borrow WhatsApp's tick language. There is no single grey tick, no double tick, and no blue read receipt anywhere on the screen. Under RCS, Google Messages confirms a read with a small grey word — Read — sitting beneath the last outgoing message, and that is the only receipt the interface shows. For a mockup this simplifies things: you either display that one label or you leave it off. It also adds a scene cue the ticks cannot express, since clearing it implies your message has not been seen. Everything about directionality lives in the bubble colour instead: Google blue means you sent it, grey means they did, and there is nothing else to decode.",
      },
      {
        heading: "The status bar is Android-shaped",
        body:
          "Android and iPhone screenshots differ before you reach the first message, and the status bar is where it starts. On Android the clock sits on the left with the signal and battery cluster on the right; on iPhone the arrangement is split differently and the top of the screen carries a camera cutout. Because a real screenshot never captures the hardware hole, our Android page draws a clean rectangle with no notch or island, and the clock on the left. For the same reason the phone frame starts switched off here: dropping an Android interface into an iPhone-style shell with a Dynamic Island would look wrong at a glance. If you are compositing the mockup into a device image, turn the frame on deliberately and use an Android-shaped one.",
      },
    ],
    faqs: [
      {
        q: "Which app does this look like?",
        a: "Google Messages, the default SMS/RCS app on most Android phones — Material bubbles, blue outgoing messages and a pill-shaped input field.",
      },
      {
        q: "Why is the status bar different from the iPhone pages?",
        a: "Because the phone is different: Android puts the clock on the left with the signal and battery cluster on the right, and our Android pages draw that layout — with no camera cutout, since a real screenshot never captures the hardware hole.",
      },
      {
        q: "Can I change the Read label?",
        a: "Yes — type Read with a time, just Delivered, or clear it for an unanswered message. It sits under the last outgoing bubble like RCS does.",
      },
    ],
  },
  "whatsapp-call": {
    intro:
      "A call log tells a story in numbers: durations, directions and the occasional missed call. This gallery pairs the WhatsApp chat generator with its call-log sibling — incoming, outgoing, video and missed entries, each with editable duration and timestamp.",
    designNotes: [
      "Incoming, outgoing and missed entries with correct arrow and colour codes",
      "Video-call entries with the green camera icon and 'video call' label",
      "The authentic five-tab bottom bar: Status, Calls, Chats, Communities, Settings",
      "Yesterday-style date entries mixed with same-day times",
    ],
    useCases:
      "Weekly sync logs, calls-with-home threads and a friends' catch-up log all work as supporting props next to a chat scene — one screen of context that makes the story feel real.",
    composition: [
      {
        heading: "The arrow grammar of a call log",
        body:
          "A call log is read through its arrows, and every one of them means something specific. A green arrow pointing up and to the right marks a call you placed; a green arrow pointing down and to the left marks one you received; a red arrow means you missed it, and in the real app the caller's name turns the same red (#ea4335). That grammar is why a log where every row points the same direction looks staged — real usage is a messy mix, mostly outgoing, a couple of incoming, the occasional miss. Our weekly-sync example deliberately includes all three. When you build one, resist the tidy version: a history with a missed entry, an unanswered one and a long call from last night reads as authentic far faster than a clean list of answered calls.",
      },
      {
        heading: "A list wants different spacing",
        body:
          "The Calls screen is a list, not a conversation, and it wants different spacing from a chat. Each row leads with a 46px avatar, a bold caller name, then a second line carrying the direction and the time, with a green phone icon parked on the right. Completed calls can carry a duration as small grey text under that direction line, and it is the durations that make the log feel lived-in — six minutes beside forty-two says more about the relationship than any amount of styling. Because the row is horizontal and information-dense we keep names short and let the mixed durations do the work. Rendering a call log as chat bubbles with a phone icon, which some generators do, misreads the whole screen.",
      },
      {
        heading: "Keeping the tab bar and the green",
        body:
          "Two things anchor the call log to WhatsApp. The first is the bottom navigation: Status, Calls, Chats, Communities, Settings, with Calls highlighted in the app's green (#00a884). A genuine screenshot of this screen almost always includes that bar, so cropping it off is the standard workaround for tools that cannot draw it — which makes its absence a quiet tell. The second is the colour continuity: the call log borrows WhatsApp's green for its accents and the same red for missed entries, so it sits visually beside a chat thread from the same account. What it does not borrow is the chat structure. This is a list of rows, and treating it as anything else breaks the illusion before a viewer reads a single name.",
      },
    ],
    faqs: [
      {
        q: "Can I mix calls and chats in one mockup?",
        a: "They're separate generators — build the chat with one and the call log with the other, then use both images in sequence in your video or deck.",
      },
      {
        q: "What does a missed call look like?",
        a: "A red arrow label with the duration field empty — leave the text blank and the entry renders as a missed call, as in the example above.",
      },
      {
        q: "Can I show a video call?",
        a: "Yes — tick the Video box on any call entry and the row renders with a green camera icon and an 'Incoming/Outgoing video call' label, as in the first example above.",
      },
    ],
  },
};
