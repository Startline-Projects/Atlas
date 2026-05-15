"use client";

/**
 * ActivityFilterChips — daily-activity filter strip.
 *
 * Visual chrome mirrors `RosterCohorts` (sticky positioning at
 * `top-[calc(36px+57px)] z-[7]`, paper-pill chips with rounded-full
 * borders, bordered active state) so the filter strip on
 * `/specialist/daily-activity` reads identically to the filter strips
 * on `/specialist/my-candidates` and `/specialist/my-clients`.
 *
 * Forked from `RosterCohorts` (not consuming it directly) due to 3
 * shape divergences:
 *   1. Leading colored dot per filter category (6 semantic tones —
 *      review / message / recert / dispute / match / system)
 *   2. Right-aligned "N visible" meta affordance shown at the end of
 *      the row
 *   3. Typed union narrowing (`ActivityFilterKey` vs RosterCohorts'
 *      generic `string`)
 *
 * Future audits: do NOT merge with `RosterCohorts` unless a 2nd
 * consumer with the same dot + meta + typed-union shape lands.
 * Per the 2-consumer-promote rule, API extensions on RosterCohorts
 * should serve at least 2 consumers before being extracted.
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
    <div className="border-line-soft bg-cream sticky top-[calc(36px+57px)] z-[7] flex flex-wrap items-center gap-3 border-b px-6 py-3.5 sm:px-10">
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
                "inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-line bg-paper px-3.5 py-1.5 text-[12.5px] font-medium whitespace-nowrap transition-colors",
                isActive
                  ? "bg-ink text-paper border-ink"
                  : "text-ink-soft hover:bg-cream-deep hover:border-ink-mute",
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
                    "rounded-full px-[7px] py-px font-mono text-[10px] font-medium tracking-[0.04em]",
                    isActive
                      ? "bg-paper/14 text-paper"
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
