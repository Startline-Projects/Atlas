"use client";

/**
 * Filter-chip row above the conversation list. Identical visual
 * design to the queue-rail filter chips, but the filter set differs
 * (driven by `*_CHAT_FILTERS` from the mock-data files).
 *
 * Client Component — owned by the rail, receives the active key as
 * a controlled prop.
 */

import type { ConversationFilter } from "@/lib/mock-data/specialist/chat-types";
import { cn } from "@/lib/utils/cn";
import type { FilterDef } from "./conv-rail";

export function ConvFilters({
  filters,
  counts,
  active,
  onChange,
}: {
  filters: ReadonlyArray<FilterDef>;
  counts: Partial<Record<ConversationFilter, number>>;
  active: ConversationFilter;
  onChange: (key: ConversationFilter) => void;
}) {
  return (
    <div className="border-line-soft flex gap-1 border-b px-4 pb-3">
      {filters.map((f) => {
        const isActive = active === f.key;
        const count = counts[f.key];
        return (
          <button
            key={f.key}
            type="button"
            onClick={() => onChange(f.key)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border border-transparent px-2.5 py-1 font-body text-[11.5px] transition-colors",
              isActive
                ? "bg-ink text-paper"
                : "text-ink-mute hover:bg-cream hover:text-ink-soft",
            )}
          >
            {f.label}
            {typeof count === "number" && count > 0 ? (
              <span
                className={cn(
                  "rounded-full px-1.5 py-px font-mono text-[10px] font-medium",
                  isActive
                    ? "bg-paper/15 text-paper"
                    : "bg-cream-deep text-ink-mute",
                )}
              >
                {count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
