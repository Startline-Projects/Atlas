"use client";

/**
 * Inner filter chip row — All / Urgent / Tier promotion / Off-board /
 * Rate change. Sits below the direction tabs and above the rail list.
 *
 * Counts derived from the visible-direction items (e.g., for
 * "Awaiting your review", the count for "Urgent" is the count of
 * incoming items whose filterKey === "urgent" OR whose slaTone is
 * "danger").
 *
 * Client Component.
 */

import {
  REVIEWS_FILTERS,
  type ReviewsFilterKey,
} from "@/lib/mock-data/specialist/reviews-approvals";
import { cn } from "@/lib/utils/cn";

export function ReviewsFilterChips({
  active,
  counts,
  onChange,
}: {
  active: ReviewsFilterKey;
  counts: Record<ReviewsFilterKey, number>;
  onChange: (next: ReviewsFilterKey) => void;
}) {
  return (
    <div className="border-line-soft flex flex-wrap items-center gap-2 border-b bg-paper px-9 py-2.5 max-md:px-5">
      <div className="flex flex-wrap gap-1.5">
        {REVIEWS_FILTERS.map((f) => {
          const isActive = active === f.key;
          const count = counts[f.key] ?? 0;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => onChange(f.key)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border border-transparent px-2.5 py-1 font-body text-[11.5px] transition-colors",
                isActive
                  ? "bg-ink text-paper"
                  : "text-ink-mute hover:bg-cream-deep hover:text-ink-soft",
              )}
            >
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
        Sort: <span className="text-ink-soft font-medium">Oldest first</span>
      </span>
    </div>
  );
}
