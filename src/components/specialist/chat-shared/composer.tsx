"use client";

/**
 * Bottom composer — textarea + tool buttons (attach / templates / AI)
 * + send. Also carries the small caption line beneath ("↵ to send · ⇧↵
 * for new line · {statusCaption}") — `statusCaption` is the migration
 * note that comes from the parent: candidate side renders "Encrypted
 * in transit", client side renders "Logged to client record ·
 * audit-tracked" (verbatim per CONVERSION_LOG).
 *
 * Behavior (per directive 4):
 *   - Autosizes by syncing `textarea.style.height` to `scrollHeight`
 *     on each input event; capped at 200px (then internal scroll).
 *   - Send button disabled when textarea is empty.
 *   - Cmd/Ctrl + Enter sends (visual). Plain Enter inserts a newline.
 *     (The source HTML hint says "↵ to send · ⇧↵ for new line" — but
 *     the user-issued spec for this session is Cmd/Ctrl+Enter to
 *     match macOS-typical chat ergonomics. The hint copy stays as-is
 *     to match the source.)
 *   - On send: parent's onSend is called with the trimmed body;
 *     parent appends the message + clears via the controlled `value`
 *     prop falling back to "".
 *
 * The composer holds:
 *   - The textarea value (controlled via `value` / `onValueChange`)
 *   - The "templates open" toggle (local only)
 * It does NOT own the templates list itself — that lives in
 * `<TemplatesPopover>` which it renders alongside.
 */

import { useEffect, useRef, useState } from "react";
import { Paperclip, FileText, Sparkles, Send } from "lucide-react";

import type { ChatTemplate } from "@/lib/mock-data/specialist/chat-types";
import { cn } from "@/lib/utils/cn";
import { TemplatesPopover } from "./templates-popover";

export function Composer({
  placeholder,
  value,
  onValueChange,
  onSend,
  onAiTrigger,
  templates,
  statusCaption,
}: {
  placeholder: string;
  value: string;
  onValueChange: (next: string) => void;
  onSend: (body: string) => void;
  /** Re-opens the AI suggest panel for this thread. */
  onAiTrigger?: (() => void) | undefined;
  templates: ReadonlyArray<ChatTemplate>;
  /** Caption to render under the composer ("Encrypted in transit", etc.). */
  statusCaption: string;
}) {
  const taRef = useRef<HTMLTextAreaElement | null>(null);
  const [templatesOpen, setTemplatesOpen] = useState(false);

  const trimmed = value.trim();
  const canSend = trimmed.length > 0;

  /* Autosize on every value change. */
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
    <div className="bg-paper border-line relative flex-shrink-0 border-t px-6 pt-3 pb-4">
      <TemplatesPopover
        templates={templates}
        isOpen={templatesOpen}
        onClose={() => setTemplatesOpen(false)}
        onSelect={(body) => {
          onValueChange(body);
          // Refocus the textarea so the specialist can edit immediately.
          requestAnimationFrame(() => taRef.current?.focus());
        }}
      />

      <div className="border-line bg-paper flex items-end gap-1 rounded-2xl border py-1.5 pr-1.5 pl-1 transition-colors focus-within:border-ink-mute">
        {/* Tool buttons (left) */}
        <div className="flex gap-0 px-0.5 py-1">
          <ToolButton title="Attach file" aria-label="Attach file">
            <Paperclip className="h-3.5 w-3.5" strokeWidth={1.5} />
          </ToolButton>
          <ToolButton
            title="Templates"
            aria-label="Templates"
            onClick={() => setTemplatesOpen((v) => !v)}
            data-templates-trigger=""
            className={cn(templatesOpen && "text-lime-deep")}
          >
            <FileText className="h-3.5 w-3.5" strokeWidth={1.5} />
          </ToolButton>
          {onAiTrigger ? (
            <ToolButton
              title="Atlas suggest"
              aria-label="Atlas suggest"
              onClick={onAiTrigger}
            >
              <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />
            </ToolButton>
          ) : null}
        </div>

        {/* Textarea */}
        <textarea
          ref={taRef}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          className="block max-h-[200px] min-h-[40px] flex-1 resize-none self-stretch border-none bg-transparent px-2 py-2 font-body text-[14px] leading-[1.45] text-ink outline-none placeholder:text-ink-mute"
        />

        {/* Send */}
        <button
          type="button"
          onClick={handleSend}
          disabled={!canSend}
          className={cn(
            "border-line bg-cream-deep text-ink-mute inline-flex flex-shrink-0 items-center gap-1.5 rounded-lg border px-3.5 py-2 font-body text-[12.5px] whitespace-nowrap transition-colors",
            canSend
              ? "border-ink bg-ink text-paper hover:border-ink-soft hover:bg-ink-soft cursor-pointer"
              : "cursor-not-allowed",
          )}
        >
          Send
          <Send className="h-3 w-3" strokeWidth={2} />
        </button>
      </div>

      {/* Hint line */}
      <div className="mt-1.5 flex justify-between px-1 font-mono text-[9.5px] tracking-wider text-ink-mute">
        <span>
          <Kbd>↵</Kbd> to send · <Kbd>⇧↵</Kbd> for new line
        </span>
        <span>{statusCaption}</span>
      </div>
    </div>
  );
}

/* ===== local helpers ===== */

function ToolButton({
  children,
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...rest}
      className={cn(
        "grid h-8 w-8 place-items-center rounded-md bg-transparent text-ink-mute transition-colors hover:bg-cream hover:text-ink-soft",
        className,
      )}
    >
      {children}
    </button>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="border-line bg-cream-deep rounded-[3px] border px-1 py-px font-mono text-[9.5px]">
      {children}
    </kbd>
  );
}
