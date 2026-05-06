"use client";

/**
 * Filter chips for the activity feed. Chips have colored leading dots
 * per category (`.act-filter-dot.<key>` in source CSS). Active chip
 * gets ink bg + paper text.
 *
 * Counts come from the snapshot's `filterCounts` map; the parent
 * passes them down. Visible-count meta on the right reflects the
 * post-filter feed length.
 *
 * Client Component — controlled by parent via `active` + `onChange`.
 */

import {
  ACTIVITY_FILTERS,
  type ActivityFilterKey,
} from "@/lib/mock-data/specialist/daily-activity";
import { cn } from "@/lib/utils/cn";

const DOT_TONE: Record<Exclude<ActivityFilterKey, "all">, string> = {
  review: "bg-success",
  message: "bg-lime-deep",
  recert: "bg-[#5C4A6E]",
  dispute: "bg-danger",
  match: "bg-navy",
  system: "bg-ink-mute",
};

export function ActivityFilterChips({
  active,
  counts,
  visibleCount,
  onChange,
}: {
  active: ActivityFilterKey;
  counts: Record<ActivityFilterKey, number>;
  visibleCount: number;
  onChange: (next: ActivityFilterKey) => void;
}) {
  return (
    <div className="border-line-soft flex flex-wrap items-center gap-3 border-y bg-paper px-10 py-3 max-md:px-5">
      <div className="flex flex-wrap gap-1.5">
        {ACTIVITY_FILTERS.map((f) => {
          const isActive = active === f.key;
          const count = counts[f.key] ?? 0;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => onChange(f.key)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md border border-transparent px-2.5 py-1.5 font-body text-[12px] transition-colors",
                isActive
                  ? "bg-ink text-paper"
                  : "text-ink-mute hover:bg-cream-deep hover:text-ink",
              )}
            >
              {f.key !== "all" ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    DOT_TONE[f.key],
                  )}
                />
              ) : null}
              {f.label}
              {count > 0 ? (
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
      <span className="ml-auto font-mono text-[10.5px] tracking-[0.04em] uppercase text-ink-mute">
        {visibleCount} visible
      </span>
    </div>
  );
}
