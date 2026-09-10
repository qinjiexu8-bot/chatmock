"use client";

import { useRef } from "react";
import { newId, type Conversation, type Message, type ReceiptState } from "@/lib/types";
import type { PlatformTheme } from "@/lib/types";

interface Props {
  conversation: Conversation;
  setConversation: (c: Conversation) => void;
  theme: PlatformTheme;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-black/8 pb-4 mb-4 last:border-0">
      <h3 className="text-[13px] font-medium text-black/80 mb-3">{title}</h3>
      {children}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex items-center gap-3 mb-2.5">
      <span className="w-[70px] shrink-0 text-[12.5px] text-black/55">{label}</span>
      <span className="flex-1">{children}</span>
    </label>
  );
}

export default function EditorPanel({ conversation, setConversation, theme }: Props) {
  const avatarRef = useRef<HTMLInputElement>(null);
  const imageRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const patch = (p: Partial<Conversation>) => setConversation({ ...conversation, ...p });

  const readImage = (file: File | undefined, cb: (dataUrl: string) => void) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => cb(String(reader.result));
    reader.readAsDataURL(file);
  };

  const selfId = conversation.participants.find((p) => p.isSelf)?.id ?? "self";
  const otherId = conversation.participants.find((p) => !p.isSelf)?.id ?? "other";

  /** WhatsApp 群聊真机发送者名色板 */
  const NAME_PALETTE = ["#e542a3", "#02a698", "#dc691a", "#7f66ff", "#53bdeb"];

  const setMessage = (id: string, p: Partial<Message>) =>
    patch({
      messages: conversation.messages.map((m) => (m.id === id ? { ...m, ...p } : m)),
    });

  const updateParticipant = (id: string, name: string) =>
    patch({
      participants: conversation.participants.map((p) =>
        p.id === id ? { ...p, name } : p
      ),
    });

  const addParticipant = () => {
    const used = conversation.participants.length;
    patch({
      participants: [
        ...conversation.participants,
        {
          id: newId("p"),
          name: `Member ${used}`,
          avatar: null,
          isSelf: false,
          color: NAME_PALETTE[used % NAME_PALETTE.length],
        },
      ],
    });
  };

  const removeParticipant = (id: string) => {
    if (id === selfId) return;
    patch({
      participants: conversation.participants.filter((p) => p.id !== id),
    });
  };

  const addMessage = (senderId: string) =>
    patch({
      messages: [
        {
          id: newId("m"),
          senderId,
          text: theme.features.callLog ? "5 min" : "New message",
          timestamp: "9:41",
          receipt: "read",
        },
      ],
    });

  const removeMessage = (id: string) =>
    patch({ messages: conversation.messages.filter((m) => m.id !== id) });

  const moveMessage = (index: number, dir: -1 | 1) => {
    const next = [...conversation.messages];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    patch({ messages: next });
  };

  return (
    <div className="text-[13px]">
      <Section title="Appearance">
        <div className="flex gap-2 mb-3">
          {(["light", "dark"] as const).map((m) => (
            <button
              key={m}
              onClick={() => patch({ mode: m })}
              disabled={!theme.supportedModes.includes(m)}
              className={`flex-1 px-3 py-2 rounded-lg border text-[12.5px] capitalize transition ${
                conversation.mode === m
                  ? "border-black/70 bg-black/5 font-medium"
                  : "border-black/15 text-black/60 hover:border-black/30"
              } disabled:opacity-35 disabled:cursor-not-allowed`}
            >
              {m}
            </button>
          ))}
        </div>
        <Row label="Date">
          <input
            value={conversation.dateSeparator}
            onChange={(e) => patch({ dateSeparator: e.target.value })}
            className="w-full px-2.5 py-1.5 rounded-lg border border-black/15 outline-none focus:border-black/40"
          />
        </Row>
        <Row label="Status bar">
          <input
            type="checkbox"
            checked={conversation.showStatusBar}
            onChange={(e) => patch({ showStatusBar: e.target.checked })}
            className="w-4 h-4"
          />
        </Row>
      </Section>

      <Section title="Contact">
        <Row label="Name">
          <input
            value={conversation.title}
            onChange={(e) => patch({ title: e.target.value })}
            className="w-full px-2.5 py-1.5 rounded-lg border border-black/15 outline-none focus:border-black/40"
          />
        </Row>
        <Row label="Status">
          <input
            value={conversation.subtitle}
            onChange={(e) => patch({ subtitle: e.target.value })}
            placeholder="online / last seen today at 20:14"
            className="w-full px-2.5 py-1.5 rounded-lg border border-black/15 outline-none focus:border-black/40"
          />
        </Row>
        {theme.features.deliveryLine ? (
          <Row label="Delivery">
            <input
              value={conversation.deliveryText ?? ""}
              onChange={(e) => patch({ deliveryText: e.target.value })}
              placeholder="Delivered / Read / Sending"
              className="w-full px-2.5 py-1.5 rounded-lg border border-black/15 outline-none focus:border-black/40"
            />
          </Row>
        ) : null}
        <Row label="Avatar">
          <span className="flex items-center gap-2">
            <button
              onClick={() => avatarRef.current?.click()}
              className="px-3 py-1.5 rounded-lg border border-black/15 hover:border-black/30"
            >
              Upload
            </button>
            {conversation.avatar ? (
              <button
                onClick={() => patch({ avatar: null })}
                className="px-3 py-1.5 rounded-lg border border-black/15 hover:border-black/30"
              >
                Clear
              </button>
            ) : null}
            <input
              ref={avatarRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => readImage(e.target.files?.[0], (d) => patch({ avatar: d }))}
            />
          </span>
        </Row>
      </Section>

      {theme.features.senderNames ? (
        <Section title={`Participants (${conversation.participants.length})`}>
          <div className="space-y-2">
            {conversation.participants.map((p) => (
              <div key={p.id} className="flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded-full shrink-0"
                  style={{ background: p.isSelf ? "#008069" : (p.color ?? "#53bdeb") }}
                  title={p.isSelf ? "You" : "Sender colour"}
                />
                <input
                  value={p.isSelf ? "You" : p.name}
                  disabled={p.isSelf}
                  onChange={(e) => updateParticipant(p.id, e.target.value)}
                  className={`flex-1 px-2.5 py-1.5 rounded-lg border border-black/15 outline-none focus:border-black/40 ${
                    p.isSelf ? "bg-black/5 text-black/45" : ""
                  }`}
                />
                {!p.isSelf ? (
                  <button
                    onClick={() => removeParticipant(p.id)}
                    className="px-1.5 py-0.5 rounded border border-black/12 text-black/50 hover:border-red-300 hover:text-red-600 shrink-0"
                  >
                    ✕
                  </button>
                ) : null}
              </div>
            ))}
          </div>
          <button
            onClick={addParticipant}
            className="mt-2.5 w-full px-3 py-2 rounded-lg border border-dashed border-black/20 text-black/60 hover:border-black/40"
          >
            + Add participant
          </button>
        </Section>
      ) : null}

      <Section title="Status bar detail">
        <Row label="Time">
          <input
            value={conversation.statusBar.time}
            onChange={(e) =>
              patch({ statusBar: { ...conversation.statusBar, time: e.target.value } })
            }
            className="w-full px-2.5 py-1.5 rounded-lg border border-black/15 outline-none focus:border-black/40"
          />
        </Row>
        <Row label="Carrier">
          <input
            value={conversation.statusBar.carrier}
            onChange={(e) =>
              patch({ statusBar: { ...conversation.statusBar, carrier: e.target.value } })
            }
            className="w-full px-2.5 py-1.5 rounded-lg border border-black/15 outline-none focus:border-black/40"
          />
        </Row>
        <Row label="Battery">
          <span className="flex items-center gap-2">
            <input
              type="range"
              min={0}
              max={100}
              value={conversation.statusBar.battery}
              onChange={(e) =>
                patch({
                  statusBar: { ...conversation.statusBar, battery: Number(e.target.value) },
                })
              }
              className="flex-1"
            />
            <span className="w-9 text-right text-black/55">{conversation.statusBar.battery}%</span>
          </span>
        </Row>
        <Row label="Signal">
          <span className="flex gap-1">
            {[1, 2, 3, 4].map((n) => (
              <button
                key={n}
                onClick={() =>
                  patch({ statusBar: { ...conversation.statusBar, signal: n } })
                }
                className={`px-2.5 py-1 rounded-lg border ${
                  conversation.statusBar.signal === n
                    ? "border-black/70 bg-black/5"
                    : "border-black/15"
                }`}
              >
                {n}
              </button>
            ))}
          </span>
        </Row>
      </Section>

      <Section title={`Messages (${conversation.messages.length})`}>
        <div className="space-y-2.5">
          {conversation.messages.map((m, i) => {
            const isSelf = m.senderId === selfId;
            return (
              <div
                key={m.id}
                className="p-2.5 rounded-xl border border-black/12 bg-black/[0.015]"
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <select
                    value={m.senderId}
                    onChange={(e) => setMessage(m.id, { senderId: e.target.value })}
                    className="px-1.5 py-1 rounded-md border border-black/15 text-[11.5px] bg-white max-w-[120px]"
                  >
                    {conversation.participants.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.isSelf
                          ? "Me"
                          : theme.features.senderNames
                            ? p.name
                            : conversation.title || "Them"}
                      </option>
                    ))}
                  </select>
                  {theme.features.callLog ? (
                    <>
                      <select
                        value={m.call ?? "incoming"}
                        onChange={(e) =>
                          setMessage(m.id, {
                            call: e.target.value as Message["call"],
                          })
                        }
                        className="px-1.5 py-1 rounded-md border border-black/15 text-[11.5px] bg-white"
                      >
                        <option value="outgoing">Outgoing</option>
                        <option value="incoming">Incoming</option>
                        <option value="missed">Missed</option>
                      </select>
                      <label className="flex items-center gap-1 text-[11.5px] text-black/60 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={m.video ?? false}
                          onChange={(e) => setMessage(m.id, { video: e.target.checked || undefined })}
                          className="w-3 h-3"
                        />
                        Video
                      </label>
                    </>
                  ) : null}
                  {theme.features.perMessageTimestamp || theme.features.callLog ? (
                    <input
                      value={m.timestamp}
                      onChange={(e) => setMessage(m.id, { timestamp: e.target.value })}
                      className="w-16 px-1.5 py-1 rounded-md border border-black/15 text-[11.5px] text-center"
                    />
                  ) : null}
                  <span className="flex-1" />
                  <button
                    onClick={() => moveMessage(i, -1)}
                    disabled={i === 0}
                    className="px-1.5 py-0.5 rounded border border-black/12 text-black/50 disabled:opacity-30"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveMessage(i, 1)}
                    disabled={i === conversation.messages.length - 1}
                    className="px-1.5 py-0.5 rounded border border-black/12 text-black/50 disabled:opacity-30"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => removeMessage(m.id)}
                    className="px-1.5 py-0.5 rounded border border-black/12 text-black/50 hover:border-red-300 hover:text-red-600"
                  >
                    ✕
                  </button>
                </div>

                <textarea
                  value={m.text}
                  onChange={(e) => setMessage(m.id, { text: e.target.value })}
                  rows={2}
                  placeholder={theme.features.callLog ? "Duration note (optional)" : undefined}
                  className="w-full px-2 py-1.5 rounded-lg border border-black/15 outline-none focus:border-black/40 resize-y"
                />

                <div className="flex items-center gap-2 mt-2">
                  {theme.features.receipt && isSelf ? (
                    <select
                      value={m.receipt ?? "read"}
                      onChange={(e) =>
                        setMessage(m.id, { receipt: e.target.value as ReceiptState })
                      }
                      className="px-1.5 py-1 rounded-md border border-black/15 text-[11.5px] bg-white"
                    >
                      <option value="sent">Sent</option>
                      <option value="delivered">Delivered</option>
                      <option value="read">Read</option>
                    </select>
                  ) : null}

                  {theme.features.imageMessage ? (
                    <span className="flex items-center gap-1.5">
                      <button
                        onClick={() => imageRefs.current[m.id]?.click()}
                        className="px-2 py-1 rounded-md border border-black/15 text-[11.5px]"
                      >
                        {m.image ? "Change img" : "Add img"}
                      </button>
                      {m.image ? (
                        <button
                          onClick={() => setMessage(m.id, { image: null })}
                          className="px-2 py-1 rounded-md border border-black/15 text-[11.5px]"
                        >
                          Remove
                        </button>
                      ) : null}
                      <input
                        ref={(el) => {
                          imageRefs.current[m.id] = el;
                        }}
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) =>
                          readImage(e.target.files?.[0], (d) =>
                            setMessage(m.id, { image: d })
                          )
                        }
                      />
                    </span>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-2 mt-3">
          <button
            onClick={() => addMessage(otherId)}
            className="flex-1 px-3 py-2 rounded-lg border border-black/15 hover:border-black/30"
          >
            + {conversation.title || "Them"}
          </button>
          <button
            onClick={() => addMessage(selfId)}
            className="flex-1 px-3 py-2 rounded-lg border border-black/15 hover:border-black/30"
          >
            + Me
          </button>
        </div>
      </Section>
    </div>
  );
}
