"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

type NotesCardProps = {
  label: string;
  placeholder: string;
  /** Visible only-to-spec/admin caption shown in section meta. Decorative. */
};

export function NotesCard({ label, placeholder }: NotesCardProps) {
  const [value, setValue] = useState("");
  const [tags, setTags] = useState<string[]>([]);

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
        {tags.map((t) => (
          <span
            key={t}
            className="bg-cream-deep text-ink-soft border-line-soft rounded-[3px] border px-2 py-0.5 font-mono text-[10px] tracking-[0.06em]"
          >
            {t}
          </span>
        ))}
        <button
          type="button"
          onClick={() => {
            const next = window.prompt("Tag (1–24 chars)")?.trim();
            if (next && next.length <= 24) setTags((prev) => [...prev, next]);
          }}
          className="text-ink-mute hover:bg-cream-deep hover:text-ink inline-flex items-center gap-1 rounded-[3px] border border-dashed border-current px-2 py-0.5 font-mono text-[10px] tracking-[0.06em] transition-colors"
        >
          <Plus className="h-2.5 w-2.5" strokeWidth={2} />
          Add tag
        </button>
      </div>
      <div className="text-ink-mute mt-3 text-[11px]">
        Auto-saves as you type
        {value.length > 0 ? ` · ${value.length} chars` : ""}
      </div>
    </div>
  );
}
