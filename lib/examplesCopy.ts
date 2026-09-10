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
      "Creator collab threads, product sign-offs and family-plan scenes are the three WhatsApp scenarios people rebuild most often — which is why the gallery covers all three, including one in dark mode.",
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
        a: "Yes — one of the two examples on this page already uses dark mode, and in the generator a single Appearance toggle flips the whole mockup between light and dark.",
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
      "Client check-ins and family coordination threads are the most-requested Messenger scenes: both read as believable weekly-life conversations without naming any real brand or person.",
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
      "Trip logistics and household planning are the two classic group scenes — they show pacing, colour variety and the quiet moment where someone confirms with a receipt.",
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
      "The iPhone Messages look is the most recognisable chat UI in the world: green and grey bubbles, the Delivered line, and 9:41 in the status bar. Both examples were rendered live with our iPhone text message generator, including the exact bubble geometry and receipt placement.",
    designNotes: [
      "Authentic green outgoing / grey incoming bubbles with iOS corner radii",
      "Delivered or Read line under the last outgoing bubble, fully editable",
      "Status bar with the classic 9:41 time and SF Symbols-style signal icons",
      "SMS and iMessage pacing — short bursts that read like real thumbs",
    ],
    useCases:
      "Launch-day approvals and evening-plan threads are the two most reused iMessage scenes: compact, fast-moving and instantly legible even at thumbnail size.",
    faqs: [
      {
        q: "Green or blue bubbles — which will I get?",
        a: "Outgoing bubbles follow the app's default green SMS look. The tone and wording of the conversation is what sells the scene either way.",
      },
      {
        q: "Can I change the time in the status bar?",
        a: "Yes — the status bar detail section lets you set the time, carrier and battery level, or hide the status bar entirely for a cleaner crop.",
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
      "Brand-partnership replies and weekend-plan threads cover the two Instagram extremes: the professional creator inbox and the casual friend catch-up.",
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
      "Discord mockups follow different rules from phone chats: a channel header instead of a contact, row-based messages, and coloured usernames that carry a role. The examples here are rendered by our Discord chat generator, from #general triage to an announcements-style scene.",
    designNotes: [
      "Row-based message layout with compact avatars and inline timestamps",
      "Per-member username colours that read like role colours",
      "Channel-style header with a subtitle instead of a presence line",
      "Dark mode as the native tone, with a light render available too",
    ],
    useCases:
      "Bug triage and community event threads are the two Discord staples — one shows the tool as a workspace, the other as a creator's community hub.",
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
      "Telegram's chat look is distinctive: the doodle wallpaper behind translucent bubbles, double ticks for delivery, and a floating capsule header. Both examples are live renders from our Telegram chat generator, with the wallpaper drawn in code rather than pasted as an image.",
    designNotes: [
      "SVG doodle wallpaper tile shared by both light and dark scenes",
      "Floating iOS-style capsule header with the avatar on the right",
      "Double-tick sent state and a last seen subtitle you can edit",
      "Bubble tails on the first message of each group, flex-anchored timestamps",
    ],
    useCases:
      "Trip planning and sprint handoffs show Telegram's two common lives: the friendly travel thread and the tidy remote-work channel.",
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
      "Beach-day plans and library cram sessions are the two scenes people ask for most — casual, friendly and unmistakably Snapchat at a glance.",
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
      "Android messages have their own grammar: Google's Material blue, a punch-hole status bar, and a Read marker under RCS. Both examples were rendered by our Android SMS generator, which draws the Android status bar — time on the left, no notch — unlike the iPhone pages.",
    designNotes: [
      "Material Design bubbles with the large 20px radius and Google blue",
      "Android status bar with centred punch-hole camera and time on the left",
      "Read marker under the last outgoing message, editable like RCS",
      "Carrier label and subtitle line for a believable contacts entry",
    ],
    useCases:
      "Courier updates and appointment confirmations are the most-recreated SMS scenes — short, transactional and instantly believable on a Material canvas.",
    faqs: [
      {
        q: "Which app does this look like?",
        a: "Google Messages, the default SMS/RCS app on most Android phones — Material bubbles, blue outgoing messages and a pill-shaped input field.",
      },
      {
        q: "Why is the status bar different from the iPhone pages?",
        a: "Because the phone is different: Android shows the time on the left with a centred punch-hole camera, and our Android pages draw that layout.",
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
      "Weekly sync logs and calls-with-home threads work as supporting props next to a chat scene — one screen of context that makes the story feel real.",
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
