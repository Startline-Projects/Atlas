/**
 * Single rail row in the reviews-approvals queue. Renders inside
 * `queue-shared/QueueRail`'s `renderRow` slot.
 *
 *   - Top: case ID + SLA chip
 *   - Subject (display 13.5px, bold when unread)
 *   - Foot: filed-relative · kind-pill · urgent-priority chip
 *
 * Per source CSS `.rev-list-item-*`. The QueueRail wraps the row and
 * applies the active-row left bar + cream-deep background; the row
 * itself draws an extra red border-left when the case is urgent.
 *
 * Server Component.
 */

import type {
  ReviewItem,
  ReviewItemKind,
  ReviewRecommendation,
  ReviewSlaTone,
} from "@/lib/mock-data/specialist/reviews-approvals";
import { cn } from "@/lib/utils/cn";

const KIND_LABEL: Record<ReviewItemKind, string> = {
  "off-board": "Off-board",
  "tier-promotion": "Tier promotion",
  "rate-change": "Rate change",
  "policy-exception": "Policy exception",
  "dispute-cosign": "Dispute co-sign",
};

const KIND_TONE: Record<ReviewItemKind, string> = {
  "off-board": "bg-danger-bg text-danger",
  "tier-promotion": "bg-success-bg text-success",
  "rate-change": "bg-amber/15 text-amber",
  "policy-exception": "bg-cream-deep text-ink-soft",
  "dispute-cosign": "bg-navy/10 text-navy",
};

const SLA_TONE: Record<ReviewSlaTone, string> = {
  default: "text-ink-mute",
  amber: "text-amber font-semibold",
  danger: "text-danger font-semibold",
  success: "text-success",
};

const RECOMMENDATION_PILL: Record<
  ReviewRecommendation,
  { label: string; tone: string }
> = {
  approve: { label: "AI: APPROVE", tone: "bg-success-bg text-success" },
  reject: { label: "AI: REJECT", tone: "bg-danger-bg text-danger" },
  escalate: { label: "AI: ESCALATE", tone: "bg-amber/15 text-amber" },
  "needs-judgment": {
    label: "AI: NEEDS JUDGMENT",
    tone: "bg-cream-deep text-ink-soft",
  },
};

export function ReviewRow({ item }: { item: ReviewItem }) {
  const isUrgent = item.slaTone === "danger" || item.filterKey === "urgent";
  const ai = RECOMMENDATION_PILL[item.recommendation];
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5",
        isUrgent && "border-l-[3px] border-l-danger -ml-3 pl-3",
      )}
    >
      {/* Top: case ID + SLA chip */}
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[10.5px] font-medium tracking-[0.06em] text-ink-mute">
          {item.caseId}
        </span>
        <span
          className={cn(
            "font-mono text-[10px] font-semibold tracking-[0.08em] whitespace-nowrap uppercase",
            SLA_TONE[item.slaTone],
          )}
        >
          {item.slaLabel}
        </span>
      </div>

      {/* Subject */}
      <div
        className={cn(
          "text-[13.5px] leading-tight text-ink",
          item.unread ? "font-semibold" : "font-normal",
        )}
      >
        {item.subject}
      </div>

      {/* Foot: kind-pill + filed-relative + AI recommendation pill */}
      <div className="flex items-center gap-1.5">
        <span
          className={cn(
            "rounded-full px-1.5 py-0.5 font-mono text-[9.5px] font-semibold tracking-[0.08em] whitespace-nowrap uppercase",
            KIND_TONE[item.kind],
          )}
        >
          {KIND_LABEL[item.kind]}
        </span>
        <span className="font-mono text-[10px] tracking-[0.04em] uppercase text-ink-mute">
          {item.filedRelative}
        </span>
        <span
          className={cn(
            "ml-auto rounded px-1.5 py-px font-mono text-[9px] font-semibold tracking-[0.08em] whitespace-nowrap uppercase",
            ai.tone,
          )}
        >
          {ai.label}
        </span>
      </div>
    </div>
  );
}
