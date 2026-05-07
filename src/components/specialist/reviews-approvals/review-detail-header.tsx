/**
 * Detail-pane header — case ID line + subject + meta strip.
 *
 * Per source CSS `.rev-detail-header` (16px×32px padding, paper bg,
 * border-bottom). Meta strip is 4 inline cells (Submitted by · Type ·
 * Filed · SLA) wrapping at narrow widths.
 *
 * Server Component.
 */

import type { ReviewItem } from "@/lib/mock-data/specialist/reviews-approvals";

export function ReviewDetailHeader({ item }: { item: ReviewItem }) {
  return (
    <header className="bg-paper border-line border-b px-9 pt-5 pb-4 max-md:px-5">
      <div className="mb-1.5 font-mono text-[10px] tracking-[0.1em] uppercase text-ink-mute">
        {item.caseId} ·{" "}
        <span className="text-ink-soft font-medium">
          {item.direction === "incoming"
            ? "Incoming"
            : item.direction === "outgoing"
              ? "Submitted by you"
              : "Closed"}
        </span>
      </div>
      <h2
        className="font-display m-0 text-[24px] font-normal leading-[1.15] tracking-[-0.02em] text-ink"
        style={{ fontVariationSettings: '"opsz" 96' }}
      >
        {item.subject}
      </h2>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-[11px] tracking-[0.04em] text-ink-mute">
        {item.metaStrip.map((cell, i) => (
          <span key={i}>
            <strong className="font-medium text-ink-soft">
              {cell.label}:
            </strong>{" "}
            {cell.value}
          </span>
        ))}
      </div>
    </header>
  );
}
