"use client";

/**
 * Reviews-approvals composer — small textarea + send button + audit
 * caption. Built parallel to `chat-shared/Composer` per Session 6.1
 * fork decision: chat composer requires `templates` array and AI-
 * suggest infrastructure that reviews don't need.
 *
 * Behavior matches the chat-shared pattern at the input layer:
 *   - Autosizes via scrollHeight, capped at 200px
 *   - Send disabled when textarea is empty
 *   - Cmd/Ctrl + Enter sends
 *   - Caption: "↵ to send · ⇧↵ for new line · audit-logged"
 *
 * Client Component.
 */

import { useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function ReviewsComposer({
  value,
  onValueChange,
  onSend,
  placeholder = "Add a reply or note before deciding…",
}: {
  value: string;
  onValueChange: (next: string) => void;
  onSend: (body: string) => void;
  placeholder?: string;
}) {
  const taRef = useRef<HTMLTextAreaElement | null>(null);
  const trimmed = value.trim();
  const canSend = trimmed.length > 0;

  useEffect(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    const next = Math.min(ta.scrollHeight, 200);
    ta.style.height = `${next}px`;
  }, [value]);

  function handleSend() {
    if (!canSend) return;
    onSend(trimmed);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="bg-cream border-line border-t px-9 pt-3.5 pb-3 max-md:px-5">
      <div className="bg-paper border-line rounded-[10px] border px-3.5 pt-3 pb-2.5 transition-colors focus-within:border-ink-mute">
        <textarea
          ref={taRef}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={3}
          className="block max-h-[200px] min-h-[56px] w-full resize-none border-none bg-transparent font-body text-[13px] leading-[1.5] text-ink outline-none placeholder:text-ink-mute"
        />
        <div className="mt-1.5 flex items-center justify-between gap-2">
          <span className="font-mono text-[10px] tracking-[0.04em] uppercase text-ink-mute">
            <Kbd>↵</Kbd> to send · <Kbd>⇧↵</Kbd> for new line · audit-logged
          </span>
          <button
            type="button"
            onClick={handleSend}
            disabled={!canSend}
            className={cn(
              "border-line bg-cream-deep text-ink-mute inline-flex flex-shrink-0 items-center gap-1.5 rounded-md border px-3 py-1.5 font-body text-[12px] whitespace-nowrap transition-colors",
              canSend
                ? "border-ink bg-ink text-paper hover:border-ink-soft hover:bg-ink-soft cursor-pointer"
                : "cursor-not-allowed",
            )}
          >
            Send reply
            <Send className="h-3 w-3" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="border-line bg-cream-deep rounded-[3px] border px-1 py-px font-mono text-[9.5px]">
      {children}
    </kbd>
  );
}
