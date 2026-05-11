"use client";

/**
 * 3-button outer tab strip — Awaiting your review · Submitted by you ·
 * Closed. Built parallel to `queue-shared/ReviewTabs` (text + active-
 * underline shape) per the fork rule: this strip uses a count badge +
 * an arrow icon for direction (down for incoming, up for outgoing,
 * check for closed). Shape divergence is real.
 *
 * Sits above the filter chip row, sticky to the bottom of the topbar
 * (`top-[calc(36px+57px)]`). Step 11 polish brought this band to
 * sibling parity (review-queue / recert-queue / disputes all use the
 * same sticky chrome `bg-cream/95 backdrop-blur-md backdrop-saturate-150`).
 * The filter-chip row below is sticky too, offset down by this nav's
 * height (~44px) so the two bands stack without overlap.
 *
 * Z-index z-[5] matches the queue-shared/ReviewTabs convention so the
 * rail's sticky header (z-default) sits below this strip when their
 * y-positions overlap in the left column.
 *
 * Client Component (controlled by parent's direction state).
 */

import { ArrowDown, ArrowUp, Check } from "lucide-react";
import {
  REVIEW_DIRECTIONS,
  type ReviewDirection,
} from "@/lib/mock-data/specialist/reviews-approvals";
import { cn } from "@/lib/utils/cn";

const DIRECTION_ICON: Record<ReviewDirection, React.ReactNode> = {
  incoming: <ArrowDown className="h-3 w-3" strokeWidth={2} aria-hidden="true" />,
  outgoing: <ArrowUp className="h-3 w-3" strokeWidth={2} aria-hidden="true" />,
  closed: <Check className="h-3 w-3" strokeWidth={2} aria-hidden="true" />,
};

const COUNT_TONE: Record<"danger" | "default", string> = {
  danger: "bg-danger text-paper",
  default: "bg-cream-deep text-ink-soft",
};

export function ReviewsDirectionTabs({
  active,
  counts,
  onChange,
}: {
  active: ReviewDirection;
  counts: Record<ReviewDirection, number>;
  onChange: (next: ReviewDirection) => void;
}) {
  return (
    <nav
      role="tablist"
      aria-label="Review direction"
      className="border-line-soft bg-cream/95 sticky top-[calc(36px+57px)] z-[5] flex gap-0 overflow-x-auto border-b px-9 backdrop-blur-md backdrop-saturate-150 max-md:px-5 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
    >
      {REVIEW_DIRECTIONS.map((dir) => {
        const isActive = active === dir.key;
        const count = counts[dir.key] ?? 0;
        return (
          <button
            key={dir.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(dir.key)}
            className={cn(
              "relative inline-flex items-center gap-2 border-none bg-transparent px-4 py-3 font-body text-[12.5px] whitespace-nowrap transition-colors",
              isActive
                ? "text-ink font-medium"
                : "text-ink-mute hover:text-ink-soft",
            )}
          >
            <span aria-hidden="true">{DIRECTION_ICON[dir.key]}</span>
            <span>{dir.label}</span>
            {count > 0 ? (
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 font-mono text-[9.5px] font-semibold tracking-[0.04em]",
                  COUNT_TONE[dir.badgeTone],
                )}
              >
                {count}
              </span>
            ) : null}
            {isActive ? (
              <span
                aria-hidden="true"
                className="bg-ink absolute right-4 -bottom-px left-4 h-[2px] rounded-[1px]"
              />
            ) : null}
          </button>
        );
      })}
    </nav>
  );
}
