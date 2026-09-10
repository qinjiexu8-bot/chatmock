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
  call?: Message["call"]
): Message {
  return { id, senderId, text, timestamp, ...(receipt ? { receipt } : {}), ...(call ? { call } : {}) };
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
      "Google Messages with the Material-blue outgoing bubble, carrier status bar and a Read marker — the everyday utility scene.",
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
];
