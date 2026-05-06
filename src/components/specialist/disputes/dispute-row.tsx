/**
 * Single dispute row in the QueueRail. Renders:
 *   - top: case ID + status pill
 *   - middle: claimant name · "vs" · respondent name
 *   - claim line: reason label
 *   - foot: filed-label / amount / SLA chip
 *
 * Per source CSS (.dsp-list-item-*). The QueueRail (queue-shared) wraps
 * the row and applies the active-row left bar + cream-deep background.
 *
 * Server Component.
 */

import type {
  DisputeRowLite,
  DisputeState,
} from "@/lib/mock-data/specialist/disputes";
import { cn } from "@/lib/utils/cn";

const STATUS_PILL: Record<
  DisputeState,
  { label: string; className: string }
> = {
  open: { label: "OPEN", className: "bg-danger-bg text-danger" },
  "in-progress": {
    label: "IN PROGRESS",
    className: "bg-amber/15 text-amber",
  },
  "under-review": {
    label: "UNDER REVIEW",
    className: "bg-amber/15 text-amber",
  },
  "resolved-favor-claimant": {
    label: "RESOLVED",
    className: "bg-success-bg text-success",
  },
  "resolved-favor-respondent": {
    label: "RESOLVED",
    className: "bg-success-bg text-success",
  },
  "resolved-partial": {
    label: "RESOLVED",
    className: "bg-success-bg text-success",
  },
  "resolved-dismissed": {
    label: "DISMISSED",
    className: "bg-cream-deep text-ink-soft",
  },
  escalated: {
    label: "ESCALATED",
    className: "bg-navy/10 text-navy",
  },
};

const SLA_TONE: Record<
  DisputeRowLite["slaTone"],
  string
> = {
  default: "text-ink-mute",
  amber: "text-amber",
  danger: "text-danger",
  success: "text-success",
};

export function DisputeRow({ row }: { row: DisputeRowLite }) {
  const pill = STATUS_PILL[row.state];
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[11px] font-medium tracking-[0.06em] text-ink-soft">
          {row.caseId}
        </span>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 font-mono text-[9.5px] font-semibold tracking-[0.08em] whitespace-nowrap uppercase",
            pill.className,
          )}
        >
          {pill.label}
        </span>
      </div>
      <div className="flex items-center gap-1.5 text-[13px] text-ink">
        <span className="truncate">{row.claimantName}</span>
        <span
          className="font-display text-[11px] italic text-ink-mute"
          style={{ fontVariationSettings: '"opsz" 36' }}
        >
          vs.
        </span>
        <span className="truncate">{row.respondentName}</span>
      </div>
      <div className="truncate text-[12px] text-ink-mute">
        {row.reasonLabel}
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[10px] tracking-[0.04em] uppercase text-ink-mute">
          {row.filedLabel}
        </span>
        <div className="flex items-center gap-2">
          {row.amountLabel ? (
            <span className="font-mono text-[10px] font-medium tracking-[0.04em] text-ink-soft">
              {row.amountLabel}
            </span>
          ) : null}
          <span
            className={cn(
              "font-mono text-[10px] font-semibold tracking-[0.08em] uppercase",
              SLA_TONE[row.slaTone],
            )}
          >
            {row.slaLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
