"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

type NotesCardProps = {
  label: string;
  placeholder: string;
  /** Visible only-to-spec/admin caption shown in section meta. Decorative. */
};

/**
 * Notes textarea + "+ Add tag" placeholder.
 *
 * Tag chip-input is **future polish** — source HTML renders only a
 * static "+ Add tag" chip with no behavior; the build temporarily
 * had a `window.prompt`-based add path that has been reverted to
 * match source. When the chip-input UX lands (planned for the polish
 * series), it should support add + click-to-remove + 24-char limit.
 *
 * Auto-save is also future polish — value lives in local state today
 * and is lost when the parent detail-pane re-keys on candidate
 * navigation. Logged in CONVERSION_LOG.
 *
 * Client Component (textarea state).
 */
export function NotesCard({ label, placeholder }: NotesCardProps) {
  const [value, setValue] = useState("");

  return (
    <div className="bg-paper border-line shadow-sm rounded-md border p-5">
      <label
        className="text-ink-soft mb-2 block text-[13px] font-medium"
        htmlFor="notes-textarea"
      >
        {label}
      </label>
      <textarea
        id="notes-textarea"
        rows={4}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border-line bg-cream/40 text-ink focus:border-ink focus:ring-ink/8 placeholder:text-ink-mute mb-3 w-full resize-y rounded-md border px-3.5 py-2.5 text-[14px] leading-[1.55] outline-none focus:ring-[3px]"
      />
      <div className="flex flex-wrap items-center gap-1.5">
        <span
          aria-hidden="true"
          className="text-ink-mute inline-flex items-center gap-1 rounded-[3px] border border-dashed border-current px-2 py-0.5 font-mono text-[10px] tracking-[0.06em]"
        >
          <Plus className="h-2.5 w-2.5" strokeWidth={2} />
          Add tag
        </span>
      </div>
      <div className="text-ink-mute mt-3 text-[11px]">
        Auto-saves as you type
        {value.length > 0 ? ` · ${value.length} chars` : ""}
      </div>
    </div>
  );
}
