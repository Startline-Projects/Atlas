/**
 * Single conversation row — avatar + name + preview + time + unread badge.
 *
 * Server Component. Renders as a `<button>` because the rail handles
 * selection in JS (URL `?id=` swap). The button stays accessible —
 * Enter / Space activate it as expected.
 *
 * Active state is driven by the rail; passed in as a flag.
 * Unread / flagged / status-dot styling is read off the thread itself.
 */

import { Flag } from "lucide-react";
import type {
  CandidateChatThread,
  ClientChatThread,
} from "@/lib/mock-data/specialist/chat-types";
import { cn } from "@/lib/utils/cn";
import { ChatAvatar } from "./chat-avatar";

type Thread = CandidateChatThread | ClientChatThread;

export function ConvRow({
  thread,
  isActive,
  onSelect,
}: {
  thread: Thread;
  isActive: boolean;
  /** Click handler — receives the thread id. Wired by the (Client) rail. */
  onSelect: (id: string) => void;
}) {
  const isUnread = thread.unread > 0;
  return (
    <button
      type="button"
      onClick={() => onSelect(thread.id)}
      aria-current={isActive ? "true" : undefined}
      className={cn(
        "grid w-full grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-2.5 border-b border-line-soft border-l-[3px] border-l-transparent px-3 py-3 text-left transition-colors hover:bg-cream",
        isActive && "bg-cream border-l-ink",
      )}
    >
      {/* Avatar (with status dot — ring color depends on row bg) */}
      <ChatAvatar
        thread={thread}
        size="sm"
        showStatusDot
        dotRing={isActive ? "cream" : "paper"}
      />

      {/* Body: name + preview */}
      <div className="min-w-0">
        <div
          className={cn(
            "mb-0.5 flex items-center gap-1 truncate text-[13.5px] leading-tight",
            isUnread
              ? "font-semibold text-ink"
              : "font-normal text-ink-soft",
          )}
        >
          <span className="truncate">{thread.title}</span>
          {thread.countryFlag ? (
            <span className="flex-shrink-0 text-[12px]" aria-hidden="true">
              {thread.countryFlag}
            </span>
          ) : null}
          {thread.flagged ? (
            <Flag
              className="ml-auto h-2.5 w-2.5 flex-shrink-0 text-amber"
              strokeWidth={2}
              aria-label="Flagged"
            />
          ) : null}
        </div>
        <div
          className={cn(
            "truncate text-[12px] leading-snug",
            isUnread ? "text-ink-soft" : "text-ink-mute",
          )}
        >
          {thread.preview}
        </div>
      </div>

      {/* Right meta: time + unread badge */}
      <div className="flex flex-col items-end gap-1.5">
        <div className="font-mono text-[10px] tracking-wider text-ink-mute">
          {thread.timestamp}
        </div>
        {isUnread ? (
          <div className="grid h-[18px] min-w-[18px] place-items-center rounded-full bg-ink px-1.5 font-mono text-[9.5px] font-semibold text-paper">
            {thread.unread}
          </div>
        ) : null}
      </div>
    </button>
  );
}
