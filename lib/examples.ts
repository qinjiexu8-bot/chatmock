/**
 * 示例画廊数据（/examples）
 *
 * 每个示例复用核心 Conversation 模型 + 平台渲染组件，在页面里实时渲染出
 * 真实截图形态 —— 不是静态图片，编辑器里改任何参数都能得到同样的质量。
 *
 * 内容安全约束：所有对话文案必须是无害的日常/工作场景（协作、策划、
 * 日常安排），禁止银行、政务、医疗等敏感模板（见 /acceptable-use）。
 */

import type { Conversation, Message, Participant, PlatformId } from "./types";
import { defaultStatusBar } from "./types";

export type ExampleTopic = "creator" | "team" | "group" | "everyday";

export const TOPICS: {
  id: ExampleTopic;
  label: string;
  blurb: string;
}[] = [
  {
    id: "creator",
    label: "Creator DMs",
    blurb:
      "Collab outreach, draft reviews and paid-partnership replies — the social-first conversations people mock up most often.",
  },
  {
    id: "team",
    label: "Team workflows",
    blurb:
      "Launch approvals, client check-ins, bug triage and sign-off threads that still feel native to each app.",
  },
  {
    id: "group",
    label: "Group threads",
    blurb:
      "Multi-person chats showing group dynamics: coloured sender names, mixed pacing and natural participant variety.",
  },
  {
    id: "everyday",
    label: "Everyday plans",
    blurb:
      "Trip planning, weekend invites and delivery updates — the casual threads that make a mockup feel lived-in.",
  },
];

export interface ExampleItem {
  id: string;
  platformId: PlatformId;
  topic: ExampleTopic;
  title: string;
  description: string;
  conversation: Conversation;
}

const self = (name = "You"): Participant => ({
  id: "self",
  name,
  avatar: null,
  isSelf: true,
});

const other = (id: string, name: string, color?: string): Participant => ({
  id,
  name,
  avatar: null,
  isSelf: false,
  ...(color ? { color } : {}),
});

function m(
  id: string,
  senderId: string,
  text: string,
  timestamp: string,
  receipt?: Message["receipt"],
  call?: Message["call"],
  video?: boolean
): Message {
  return {
    id,
    senderId,
    text,
    timestamp,
    ...(receipt ? { receipt } : {}),
    ...(call ? { call } : {}),
    ...(video ? { video } : {}),
  };
}

function conv(
  platformId: PlatformId,
  overrides: Partial<Conversation> & { messages: Message[] }
): Conversation {
  return {
    platformId,
    mode: "light",
    title: "Alex",
    subtitle: "online",
    avatar: null,
    participants: [self(), other("p1", "Alex")],
    statusBar: { ...defaultStatusBar },
    showStatusBar: true,
    dateSeparator: "Today",
    ...overrides,
  };
}

export const examples: ExampleItem[] = [
  // ------------------------------------------------ Creator DMs
  {
    id: "wa-collab",
    platformId: "whatsapp",
    topic: "creator",
    title: "Creator collab outreach",
    description:
      "A WhatsApp exchange with blue read ticks, a warm opener and a concrete next step — the structure most creator collab scenes need.",
    conversation: conv("whatsapp", {
      title: "Maya",
      subtitle: "online",
      participants: [self(), other("p1", "Maya")],
      messages: [
        m("e1", "p1", "Hey! Loved your latest reel — the pacing on it is so clean.", "10:12"),
        m("e2", "p1", "We're planning a short collab series for next month. Would you be up for it?", "10:13"),
        m("e3", "self", "Thank you! Yes, sounds fun — what did you have in mind?", "10:15", "read"),
        m("e4", "p1", "A three-part mini series, one reel each. I'll send the draft brief over.", "10:16"),
        m("e5", "self", "Perfect, send it through 👌", "10:17", "read"),
      ],
    }),
  },
  {
    id: "ig-seen",
    platformId: "instagram-dm",
    topic: "creator",
    title: "Paid collab reply with Seen",
    description:
      "An Instagram DM thread with the gradient outgoing bubble and a Seen marker on the last reply, shaped like a real brand-partnership conversation.",
    conversation: conv("instagram-dm", {
      title: "Ana",
      subtitle: "",
      dateSeparator: "Mon 9:41",
      deliveryText: "Seen",
      participants: [self(), other("p1", "Ana")],
      messages: [
        m("e1", "self", "Hi Ana! Sending over the draft captions for the spring set.", "11:02"),
        m("e2", "p1", "These look great — the tone matches our page really well.", "11:20"),
        m("e3", "self", "I can adjust the CTA if you want something softer.", "11:21"),
        m("e4", "p1", "Keep it as is. The invoice is with our team now ✨", "11:24"),
      ],
    }),
  },
  {
    id: "wa-dark-review",
    platformId: "whatsapp",
    topic: "team",
    title: "Design sign-off in dark mode",
    description:
      "The same WhatsApp engine in dark mode: deep wallpaper, blue read ticks and a compact approval arc for product work.",
    conversation: conv("whatsapp", {
      mode: "dark",
      title: "Ben",
      subtitle: "last seen today at 14:11",
      participants: [self(), other("p1", "Ben")],
      messages: [
        m("e1", "self", "New landing hero is pushed to staging.", "14:02"),
        m("e2", "p1", "Checking now… the spacing reads much better.", "14:05"),
        m("e3", "p1", "One nit: the badge under the H1 feels slightly heavy.", "14:06"),
        m("e4", "self", "Dropped it to 12px. Refresh and look again?", "14:08", "read"),
        m("e5", "p1", "Perfect. Ship it 🚀", "14:09"),
      ],
    }),
  },
  // ------------------------------------------------ Team workflows
  {
    id: "im-launch",
    platformId: "text-message",
    topic: "team",
    title: "Launch approval thread",
    description:
      "An iPhone Messages thread with the Delivered line under the last bubble — clean, compact approvals for a launch morning.",
    conversation: conv("text-message", {
      title: "Priya",
      subtitle: "",
      dateSeparator: "Today 9:41",
      deliveryText: "Delivered",
      participants: [self(), other("p1", "Priya")],
      messages: [
        m("e1", "p1", "Release notes are final. Copy is with legal.", "8:40"),
        m("e2", "self", "Great. Are we still on for the 10am rollout?", "8:42"),
        m("e3", "p1", "Yes — marketing assets are scheduled too.", "8:43"),
        m("e4", "self", "Amazing. Fingers crossed for a smooth one.", "8:45"),
      ],
    }),
  },
  {
    id: "ms-client",
    platformId: "messenger",
    topic: "team",
    title: "Client check-in with Seen",
    description:
      "A Messenger thread with the Seen marker and rounded capsule bubbles — a weekly recap that turns into a decision.",
    conversation: conv("messenger", {
      title: "Dana",
      subtitle: "Active now",
      dateSeparator: "Today 9:41",
      deliveryText: "Seen",
      participants: [self(), other("p1", "Dana")],
      messages: [
        m("e1", "self", "Morning Dana! Weekly recap is in your inbox.", "9:02"),
        m("e2", "p1", "Thanks! Reviewing after standup.", "9:10"),
        m("e3", "p1", "Numbers look strong. Let's double the ad budget next week.", "9:26"),
        m("e4", "self", "Noted — I'll prep the updated plan today.", "9:28"),
      ],
    }),
  },
  {
    id: "dc-triage",
    platformId: "discord",
    topic: "team",
    title: "Bug triage in #general",
    description:
      "Discord's row-based layout with coloured usernames and inline timestamps — a reproduction, diagnosis and green test run in four lines.",
    conversation: conv("discord", {
      title: "general",
      subtitle: "Welcome to the server",
      dateSeparator: "Today",
      participants: [
        self(),
        other("p1", "alex_dev", "#eb459e"),
        other("p2", "samstream", "#57f287"),
      ],
      messages: [
        m("e1", "p2", "Auth tokens expire after five minutes on staging — anyone else?", "7:52"),
        m("e2", "p1", "Repro'd. It's the clock skew on the new pod.", "7:55"),
        m("e3", "self", "Patch is up. Can someone re-run the login suite?", "7:58"),
        m("e4", "p2", "Green across the board now ✅", "8:04"),
      ],
    }),
  },
  {
    id: "wc-sync",
    platformId: "whatsapp-call",
    topic: "team",
    title: "Weekly sync call log",
    description:
      "A WhatsApp call history screen with incoming, outgoing and missed entries — useful as a supporting prop next to a chat thread.",
    conversation: conv("whatsapp-call", {
      title: "Calls",
      subtitle: "",
      participants: [
        self(),
        other("p_emma", "Emma"),
        other("p_marcus", "Marcus"),
        other("p_sofia", "Sofia"),
      ],
      messages: [
        m("c1", "p_marcus", "42 min", "10:02", undefined, "incoming"),
        m("c2", "p_sofia", "18 min", "9:14", undefined, "outgoing"),
        m("c3", "p_emma", "", "Yesterday", undefined, "missed"),
        m("c4", "p_marcus", "27 min", "Yesterday", undefined, "outgoing"),
      ],
    }),
  },
  // ------------------------------------------------ Group threads
  {
    id: "gc-cabin",
    platformId: "group-chat",
    topic: "group",
    title: "Cabin weekend group thread",
    description:
      "Four participants with coloured sender names, mixed pacing and logistics that resolve naturally — the group-chat benchmark scene.",
    conversation: conv("group-chat", {
      title: "Cabin Weekend",
      subtitle: "You, Alex, Sam, Jordan",
      participants: [
        self(),
        other("p_alex", "Alex", "#e542a3"),
        other("p_sam", "Sam", "#02a698"),
        other("p_jordan", "Jordan", "#dc691a"),
      ],
      messages: [
        m("e1", "p_alex", "Cabin is booked for Saturday ✅", "9:32"),
        m("e2", "p_sam", "Who's driving?", "9:33"),
        m("e3", "self", "I can take three people plus gear.", "9:34", "read"),
        m("e4", "p_jordan", "Seat claimed. I'll bring the speaker.", "9:35"),
        m("e5", "p_alex", "Parking is free after 6pm, by the way.", "9:36"),
      ],
    }),
  },
  {
    id: "tg-trip",
    platformId: "telegram",
    topic: "everyday",
    title: "Weekend trip planning",
    description:
      "Telegram's doodle wallpaper, double ticks and translucent header — two people locking in trains and a dinner booking.",
    conversation: conv("telegram", {
      title: "Lena",
      subtitle: "last seen recently",
      dateSeparator: "Today",
      participants: [self(), other("p1", "Lena")],
      messages: [
        m("e1", "p1", "Train tickets are booked — 9:15 Saturday.", "18:21"),
        m("e2", "self", "Legend. I'll sort the dinner reservation.", "18:23", "read"),
        m("e3", "p1", "That place by the harbour had great reviews.", "18:24"),
        m("e4", "self", "Booked for 7pm, table for four.", "18:30", "read"),
        m("e5", "p1", "See you at the station 🚆", "18:31"),
      ],
    }),
  },
  {
    id: "sc-weekend",
    platformId: "snapchat",
    topic: "everyday",
    title: "Weekend plan in Snapchat",
    description:
      "Snapchat's signature yellow header, lavender outgoing bubbles and Delivered line — short, casual and immediately recognisable.",
    conversation: conv("snapchat", {
      title: "Mia",
      subtitle: "",
      dateSeparator: "Today",
      deliveryText: "Delivered",
      participants: [self(), other("p1", "Mia")],
      messages: [
        m("e1", "self", "Beach tomorrow? Forecast says 26°", "16:40"),
        m("e2", "p1", "Yes!! I'll bring the cooler", "16:44"),
        m("e3", "self", "I've got snacks and the speaker", "16:45"),
        m("e4", "p1", "Perfect. 9am at mine?", "16:47"),
      ],
    }),
  },
  {
    id: "as-delivery",
    platformId: "android-sms",
    topic: "everyday",
    title: "Delivery update thread",
    description:
      "Google Messages with the Material-blue outgoing bubble, clean status bar and a Read marker — the everyday utility scene.",
    conversation: conv("android-sms", {
      title: "Courier",
      subtitle: "Mobile",
      dateSeparator: "Today",
      deliveryText: "Read",
      participants: [self(), other("p1", "Courier")],
      messages: [
        m("e1", "p1", "Your parcel arrives today between 2 and 4pm.", "12:05"),
        m("e2", "self", "Can you leave it with the concierge?", "12:31"),
        m("e3", "p1", "Noted — the driver will ring the front desk.", "12:33"),
      ],
    }),
  },
  // ------------------------------------------------ Platform gallery #2
  {
    id: "ig-cafe",
    platformId: "instagram-dm",
    topic: "everyday",
    title: "Cafe date planning",
    description:
      "A casual Instagram DM exchange with the compact bubble stack and double-tap energy — weekend plans that stay light and visual.",
    conversation: conv("instagram-dm", {
      title: "Rina",
      subtitle: "",
      dateSeparator: "Today",
      deliveryText: "Seen",
      participants: [self(), other("p1", "Rina")],
      messages: [
        m("e1", "self", "That new place near the station looks so good", "15:12"),
        m("e2", "p1", "Right?? The latte art alone is worth the trip", "15:14"),
        m("e3", "self", "Saturday around 2? I'll book a table", "15:15"),
        m("e4", "p1", "Works for me ☕", "15:18"),
      ],
    }),
  },
  {
    id: "im-movienight",
    platformId: "text-message",
    topic: "everyday",
    title: "Movie night invite",
    description:
      "Green and grey iMessage bubbles with typing-indicator pacing — the classic two-thumb Friday night thread on iPhone.",
    conversation: conv("text-message", {
      title: "Sam",
      subtitle: "",
      dateSeparator: "Today 9:41",
      deliveryText: "Delivered",
      participants: [self(), other("p1", "Sam")],
      messages: [
        m("e1", "self", "Cinema at 8? The new one everyone's posting about", "17:40"),
        m("e2", "p1", "I was literally about to text you the same thing", "17:41"),
        m("e3", "self", "Haha great minds. Row F back left?", "17:42"),
        m("e4", "p1", "Booked. Snacks on me 🍿", "17:45"),
      ],
    }),
  },
  {
    id: "ms-family",
    platformId: "messenger",
    topic: "everyday",
    title: "Sunday family dinner",
    description:
      "A Messenger thread in dark mode with the Seen marker — coordinating a family roast across three time zones.",
    conversation: conv("messenger", {
      mode: "dark",
      title: "Mum",
      subtitle: "Active 2h ago",
      dateSeparator: "Today 9:41",
      deliveryText: "Seen",
      participants: [self(), other("p1", "Mum")],
      messages: [
        m("e1", "p1", "Sunday roast is on. 1pm, everyone's coming.", "10:05"),
        m("e2", "self", "I'll bring dessert — the one from the market?", "10:12"),
        m("e3", "p1", "Perfect. Your sister's bringing the dog.", "10:15"),
        m("e4", "self", "Best news all week 😄", "10:16"),
      ],
    }),
  },
  {
    id: "dc-event",
    platformId: "discord",
    topic: "creator",
    title: "Community event announcement",
    description:
      "A creator pinning an event in #announcements with coloured roles and quick member reactions — Discord's community rhythm in one screen.",
    conversation: conv("discord", {
      title: "announcements",
      subtitle: "Community hub",
      dateSeparator: "Today",
      participants: [
        self(),
        other("p1", "mod_jules", "#f0b232"),
        other("p2", "pixelpine", "#5865f2"),
      ],
      messages: [
        m("e1", "p1", "Community game night this Friday, 8pm UTC — same voice channel.", "12:00"),
        m("e2", "p2", "Adding it to the calendar now.", "12:04"),
        m("e3", "p1", "Prizes for the winners, as always 👑", "12:06"),
        m("e4", "self", "Count me in!", "12:11"),
      ],
    }),
  },
  {
    id: "tg-handoff",
    platformId: "telegram",
    topic: "team",
    title: "Sprint handoff notes",
    description:
      "Telegram in dark mode with double ticks — a tidy end-of-sprint handoff that reads like the tool it stands in for.",
    conversation: conv("telegram", {
      mode: "dark",
      title: "Omar",
      subtitle: "last seen recently",
      dateSeparator: "Today",
      participants: [self(), other("p1", "Omar")],
      messages: [
        m("e1", "self", "Sprint 14 wrap: all tickets closed except the export bug.", "18:02"),
        m("e2", "p1", "I'll take the export bug into Sprint 15.", "18:10"),
        m("e3", "self", "Docs are updated too — handoff notes in Notion.", "18:12", "read"),
        m("e4", "p1", "Legend. See you at planning Monday 🙌", "18:15"),
      ],
    }),
  },
  {
    id: "sc-study",
    platformId: "snapchat",
    topic: "team",
    title: "Study session streaks",
    description:
      "Snapchat's playful side: lavender bubbles, a Delivered line and the kind of short bursts students actually send between classes.",
    conversation: conv("snapchat", {
      mode: "dark",
      title: "Jo",
      subtitle: "",
      dateSeparator: "Today",
      deliveryText: "Delivered",
      participants: [self(), other("p1", "Jo")],
      messages: [
        m("e1", "self", "Library at 4? Exam cram round two", "13:30"),
        m("e2", "p1", "Ugh fine. Coffee first though", "13:34"),
        m("e3", "self", "Obviously. I'll grab us a table", "13:35"),
        m("e4", "p1", "Bringing flash cards 📚", "13:39"),
      ],
    }),
  },
  {
    id: "as-appointment",
    platformId: "android-sms",
    topic: "team",
    title: "Appointment confirmation",
    description:
      "A business-style SMS thread with the Read marker and Material bubbles — appointment reminders are one of the most recreated text scenes.",
    conversation: conv("android-sms", {
      title: "Bright Smile Dental",
      subtitle: "Mobile",
      dateSeparator: "Today",
      deliveryText: "Read",
      participants: [self(), other("p1", "Bright Smile Dental")],
      messages: [
        m("e1", "p1", "Reminder: your check-up is Thu 11 Sep at 3:30pm.", "9:00"),
        m("e2", "self", "Can I move it to 4:30?", "9:22"),
        m("e3", "p1", "Done — see you Thu at 4:30pm.", "9:25"),
      ],
    }),
  },
  {
    id: "wc-family",
    platformId: "whatsapp-call",
    topic: "everyday",
    title: "Calls with home",
    description:
      "A personal call history mixing voice and video entries across a couple of days — the warm, everyday counterpart to a chat thread.",
    conversation: conv("whatsapp-call", {
      title: "Calls",
      subtitle: "",
      participants: [
        self(),
        other("p_emma", "Mum"),
        other("p_marcus", "Dad"),
        other("p_sofia", "Aisha"),
      ],
      messages: [
        m("c1", "p_emma", "32 min", "20:15", undefined, "outgoing", true),
        m("c2", "p_sofia", "8 min", "18:40", undefined, "incoming"),
        m("c3", "p_marcus", "", "Sunday", undefined, "missed"),
        m("c4", "p_emma", "14 min", "Sunday", undefined, "incoming"),
      ],
    }),
  },
  {
    id: "gc-flatmates",
    platformId: "group-chat",
    topic: "group",
    title: "Flatmates shopping list",
    description:
      "Three flatmates split the weekly shop with coloured names and quick receipts — the mundane group thread every household knows.",
    conversation: conv("group-chat", {
      title: "Flat 4B",
      subtitle: "You, Taylor, Priya",
      participants: [
        self(),
        other("p_taylor", "Taylor", "#02a698"),
        other("p_priya", "Priya", "#e542a3"),
      ],
      messages: [
        m("e1", "p_taylor", "Adding to the list: milk, rice, laundry pods", "11:20"),
        m("e2", "p_priya", "We're out of coffee too. The good one.", "11:22"),
        m("e3", "self", "Got it. Doing the shop at 6, anyone home?", "11:25", "read"),
        m("e4", "p_taylor", "I will be — leave the bags, I'll unpack", "11:26"),
      ],
    }),
  },
  // ------------------------------------------------ 2026-09 补齐（每平台 +1，group 分区加厚）
  {
    id: "wa-parcel",
    platformId: "whatsapp",
    topic: "everyday",
    title: "Neighbour parcel handover",
    description:
      "A doorstep co-ordination thread between neighbours — short, polite and full of real timings, with the blue read ticks proving the message was actually seen.",
    conversation: conv("whatsapp", {
      title: "Nadia",
      subtitle: "online",
      participants: [self(), other("p1", "Nadia")],
      messages: [
        m("e1", "p1", "Hi! A parcel for you came to us by mistake — the courier mixed up the numbers.", "17:42"),
        m("e2", "self", "Oh thank you, I was wondering where it went.", "17:48", "read"),
        m("e3", "p1", "No trouble at all. I'm in all evening if you want to grab it.", "17:49"),
        m("e4", "self", "Perfect — I'll come by around 8.", "17:51", "read"),
        m("e5", "p1", "Door's the one with the blue plant pot 👋", "17:52"),
      ],
    }),
  },
  {
    id: "ig-repost",
    platformId: "instagram-dm",
    topic: "creator",
    title: "Repost permission request",
    description:
      "A studio asking a creator to repost their work — the gradient outgoing bubbles and Seen marker make it read exactly like a real Instagram inbox.",
    conversation: conv("instagram-dm", {
      title: "Cove Studio",
      subtitle: "",
      dateSeparator: "Today",
      deliveryText: "Seen",
      participants: [self(), other("p1", "Cove Studio")],
      messages: [
        m("e1", "p1", "Hi! We featured your rooftop set in our story this morning.", "09:12"),
        m("e2", "p1", "Would you be happy for us to repost two of the frames to the grid? Full credit, of course.", "09:13"),
        m("e3", "self", "That's lovely, thank you! Yes, go ahead — just tag my handle 🙌", "09:40"),
        m("e4", "p1", "Tagged and linked. Sending the crops over shortly.", "09:44"),
      ],
    }),
  },
  {
    id: "im-shift",
    platformId: "text-message",
    topic: "team",
    title: "Shift swap on iMessage",
    description:
      "Two colleagues trading a Saturday shift in the iPhone Messages look — green and grey bubbles, no in-bubble timestamps, and the Delivered line closing the thread.",
    conversation: conv("text-message", {
      title: "Owen",
      subtitle: "",
      dateSeparator: "Today 9:41",
      deliveryText: "Delivered",
      participants: [self(), other("p1", "Owen")],
      messages: [
        m("e1", "p1", "Any chance you could take my Saturday close? My sister's flight lands that afternoon.", "08:20"),
        m("e2", "self", "I can, if you take my Tuesday open in return.", "08:26"),
        m("e3", "p1", "Deal. I'll tell the rota manager now.", "08:28"),
        m("e4", "self", "Perfect — handover notes coming your way this evening.", "08:31"),
      ],
    }),
  },
  {
    id: "ms-craft",
    platformId: "messenger",
    topic: "creator",
    title: "Craft fair stall prep",
    description:
      "Two makers sharing a stall at a weekend market — Messenger's capsule bubbles, the Active now subtitle and a Seen marker under the final reply.",
    conversation: conv("messenger", {
      title: "Iris",
      subtitle: "Active now",
      dateSeparator: "Today 9:41",
      deliveryText: "Seen",
      participants: [self(), other("p1", "Iris")],
      messages: [
        m("e1", "p1", "Stall map came through — we're unit 14, right by the entrance.", "13:05"),
        m("e2", "self", "Great spot. I'll bring the tablecloth and the folding stand.", "13:11"),
        m("e3", "p1", "Perfect, I've got the price signs and the banner.", "13:14"),
        m("e4", "self", "Let's meet at 7:30 to set up before the gates open.", "13:16"),
      ],
    }),
  },
  {
    id: "dc-hobby",
    platformId: "discord",
    topic: "everyday",
    title: "Late-night music server",
    description:
      "A hobby Discord server past midnight: coloured usernames, grouped messages with inline timestamps, and the dark surface that is the app's native tone.",
    conversation: conv("discord", {
      title: "producers",
      subtitle: "12 members online",
      dateSeparator: "Today",
      participants: [
        self(),
        other("p1", "alex_wav", "#eb459e"),
        other("p2", "lofi_mara", "#57f287"),
      ],
      messages: [
        m("e1", "p2", "Anyone got a clean 808 kit they'd actually recommend?", "00:14"),
        m("e2", "p1", "The free one from last week's thread is genuinely good.", "00:17"),
        m("e3", "self", "Second that — it sits nicely under vocals.", "00:19"),
        m("e4", "p2", "Grabbing it now. Cheers both 🙏", "00:23"),
      ],
    }),
  },
  {
    id: "tg-language",
    platformId: "telegram",
    topic: "everyday",
    title: "Language exchange plan",
    description:
      "Telegram's doodle wallpaper and double ticks behind a casual study swap — two people trading Spanish and English practice slots over a coffee.",
    conversation: conv("telegram", {
      title: "Carla",
      subtitle: "last seen recently",
      dateSeparator: "Today",
      participants: [self(), other("p1", "Carla")],
      messages: [
        m("e1", "p1", "¿Seguimos con el intercambio el jueves?", "19:02"),
        m("e2", "self", "Thursday works! Same café, 6pm?", "19:05", "read"),
        m("e3", "p1", "Perfecto. Esta vez empiezo yo en español 😄", "19:06"),
        m("e4", "self", "Deal — I'll bring the question list.", "19:08", "read"),
      ],
    }),
  },
  {
    id: "sc-story",
    platformId: "snapchat",
    topic: "creator",
    title: "Story takeover plan",
    description:
      "Snapchat's yellow header, lavender outgoing bubbles and a Delivered line — two creators splitting a joint story takeover into shifts.",
    conversation: conv("snapchat", {
      title: "Kai",
      subtitle: "",
      dateSeparator: "Today",
      deliveryText: "Delivered",
      participants: [self(), other("p1", "Kai")],
      messages: [
        m("e1", "self", "Still on for the story takeover on Friday?", "11:05"),
        m("e2", "p1", "Yes! I'll take the morning, you do the evening stretch", "11:09"),
        m("e3", "self", "Works. Sending you the three clips tonight", "11:11"),
        m("e4", "p1", "Perfect, I'll build the sticker pack 🎨", "11:14"),
      ],
    }),
  },
  {
    id: "as-roster",
    platformId: "android-sms",
    topic: "team",
    title: "Volunteer rota",
    description:
      "Google Messages with the Material blue bubble, a clean Android status bar and a Read marker — a community group locking in the weekend rota.",
    conversation: conv("android-sms", {
      title: "Riverside Volunteers",
      subtitle: "Mobile",
      dateSeparator: "Today",
      deliveryText: "Read",
      participants: [self(), other("p1", "Riverside Volunteers")],
      messages: [
        m("e1", "p1", "Saturday rota: gates at 8, two people on the stall, one on parking.", "10:04"),
        m("e2", "self", "I can do the gates and stay on the stall until noon.", "10:19"),
        m("e3", "p1", "Brilliant — that covers the early rush. Thank you!", "10:22"),
      ],
    }),
  },
  {
    id: "wc-catchup",
    platformId: "whatsapp-call",
    topic: "everyday",
    title: "Catching up with friends",
    description:
      "A WhatsApp call log mixing answered, missed and video entries across two days — the supporting prop that makes a chat scene feel lived-in.",
    conversation: conv("whatsapp-call", {
      title: "Calls",
      subtitle: "",
      participants: [
        self(),
        other("p_leo", "Leo"),
        other("p_nina", "Nina"),
        other("p_omar", "Omar"),
      ],
      messages: [
        m("c1", "p_leo", "18 min", "21:40", undefined, "outgoing", true),
        m("c2", "p_nina", "", "19:05", undefined, "missed"),
        m("c3", "p_omar", "6 min", "19:07", undefined, "incoming"),
        m("c4", "p_leo", "24 min", "Yesterday", undefined, "incoming"),
      ],
    }),
  },
  {
    id: "gc-reunion",
    platformId: "group-chat",
    topic: "group",
    title: "Ten-year reunion thread",
    description:
      "Four friends rebuilding a group chat for a reunion: coloured sender names, overlapping replies and the pause before someone finally volunteers to sort the venue.",
    conversation: conv("group-chat", {
      title: "Class of '16",
      subtitle: "You, Beth, Chris, Dani",
      participants: [
        self(),
        other("p_beth", "Beth", "#e542a3"),
        other("p_chris", "Chris", "#02a698"),
        other("p_dani", "Dani", "#dc691a"),
      ],
      messages: [
        m("e1", "p_beth", "Ten years already?! We're doing this properly.", "20:11"),
        m("e2", "p_chris", "I'm in. Same weekend as the summer one?", "20:14"),
        m("e3", "self", "Works for me. I can look at venues this week.", "20:16", "read"),
        m("e4", "p_dani", "Do it. I'll sort the playlist, obviously 🎶", "20:21"),
        m("e5", "p_beth", "Chris, you're on photos this time.", "20:23"),
      ],
    }),
  },
  {
    id: "gc-neighbours",
    platformId: "group-chat",
    topic: "group",
    title: "Residents' group chat",
    description:
      "The building WhatsApp group in action: four neighbours, coloured names and the small logistics — bins, lifts, deliveries — that make a group mockup believable.",
    conversation: conv("group-chat", {
      title: "Maple Court",
      subtitle: "You, Tom, Ayesha, Greg",
      participants: [
        self(),
        other("p_tom", "Tom", "#e542a3"),
        other("p_ayesha", "Ayesha", "#02a698"),
        other("p_greg", "Greg", "#dc691a"),
      ],
      messages: [
        m("e1", "p_tom", "Bin collection moves to Thursday this week, by the way.", "08:31"),
        m("e2", "p_ayesha", "Thanks for the heads-up — I'd have missed it.", "08:44"),
        m("e3", "self", "Also: the lift is being serviced 10–12 on Friday.", "08:47", "read"),
        m("e4", "p_greg", "Noted. I'll move my delivery slot.", "08:52"),
      ],
    }),
  },
];
