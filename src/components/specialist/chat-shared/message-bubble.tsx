/**
 * Single message bubble — handles all four `MessageKind`s with
 * different visual variants.
 *
 *   incoming      → left-aligned · paper bg · ink text · bottom-left tail
 *   outgoing      → right-aligned · ink bg · paper text · bottom-right tail
 *   system        → centered · cream-deep pill · mono small
 *   internal-note → centered, full-width-ish · amber-tinted bg · 🔒 icon ·
 *                   "Internal — only you and ops can see this" caption.
 *                   Per directive 7: visually impossible to mistake for
 *                   an outgoing message.
 *
 * Read-receipt + timestamp render below the bubble for incoming and
 * outgoing kinds (mono small line). System and internal-note carry
 * their timestamp in the bubble area itself.
 *
 * Server Component.
 */

import { Lock } from "lucide-react";
import type {
  ChatMessage,
  ReadReceipt,
} from "@/lib/mock-data/specialist/chat-types";
import { cn } from "@/lib/utils/cn";
import { AttachmentCard } from "./attachment-card";

const READ_LABEL: Record<ReadReceipt, string> = {
  sent: "SENT",
  delivered: "DELIVERED",
  read: "READ",
};

export function MessageBubble({ msg }: { msg: ChatMessage }) {
  if (msg.kind === "system") return <SystemPill msg={msg} />;
  if (msg.kind === "internal-note") return <InternalNote msg={msg} />;
  return <ChatBubble msg={msg} />;
}

/* ===== incoming + outgoing ===== */

function ChatBubble({ msg }: { msg: ChatMessage }) {
  const mine = msg.kind === "outgoing";
  return (
    <div
      className={cn(
        "flex max-w-[70%] flex-col gap-1",
        mine ? "self-end items-end" : "self-start items-start",
      )}
    >
      {msg.attachment ? (
        <AttachmentCard attachment={msg.attachment} mine={mine} />
      ) : null}
      {msg.body ? (
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-[14px] leading-[1.5] break-words whitespace-pre-wrap",
            mine
              ? "bg-ink text-paper rounded-br-[5px]"
              : "bg-paper border border-line text-ink rounded-bl-[5px]",
          )}
        >
          {msg.body}
        </div>
      ) : null}
      <div className="px-1 font-mono text-[9.5px] tracking-[0.08em] uppercase text-ink-mute">
        {mine && msg.readReceipt ? (
          <span
            className={cn(msg.readReceipt === "read" && "text-success")}
          >
            {READ_LABEL[msg.readReceipt]} ·{" "}
          </span>
        ) : null}
        <span>{msg.timestamp}</span>
      </div>
    </div>
  );
}

/* ===== system pill (centered, cream-deep) ===== */

function SystemPill({ msg }: { msg: ChatMessage }) {
  return (
    <div className="my-1 self-center max-w-[80%] rounded-full bg-cream-deep px-3.5 py-1.5 text-center font-mono text-[10.5px] tracking-[0.08em] text-ink-mute">
      {msg.body}
      <span className="ml-2 opacity-60">· {msg.timestamp}</span>
    </div>
  );
}

/* ===== internal-note (specialist-only, amber-tinted, locked) ===== */

function InternalNote({ msg }: { msg: ChatMessage }) {
  return (
    <div className="my-1 flex max-w-[85%] flex-col gap-1.5 self-center">
      <div
        className={cn(
          "rounded-xl border px-4 py-3 text-[13.5px] leading-[1.5] whitespace-pre-wrap",
          // Amber-tinted, uses existing tokens via /opacity:
          "bg-amber/10 border-amber/30 text-ink-soft",
        )}
      >
        <div className="mb-1.5 flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.12em] uppercase text-amber font-semibold">
          <Lock className="h-3 w-3" strokeWidth={2} />
          Internal note · only you and ops can see this
        </div>
        <div>{msg.body}</div>
      </div>
      <div className="self-end px-1 font-mono text-[9.5px] tracking-[0.08em] uppercase text-ink-mute">
        {msg.timestamp}
      </div>
    </div>
  );
}
