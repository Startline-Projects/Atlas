"use client";

/**
 * 4-button decision bar for reviews-approvals. Built parallel to
 * `queue-shared/DecisionBar` (3-slot) and `disputes/DisputeDecisionBar`
 * (2-button) per the standing "fits awkwardly → fork" rule.
 *
 *   Save draft (neutral grey) · Reject (danger red) · Escalate (amber)
 *   · Approve & co-sign (primary ink)
 *
 * Visually matches the sticky-bottom shell pattern: paper bg + blur +
 * border-top. The summary on the left shows the decision-summary copy
 * from the active review item ("Pause for action (60 days) · awaiting
 * admin co-sign").
 *
 * Disabled in the closed-direction (decision already recorded). Closed
 * cases don't render this bar at all — the parent skips it.
 *
 * Client Component (the buttons fire callbacks owned by the parent).
 */

import { Save, X, ShieldAlert, Check } from "lucide-react";

export function ReviewsDecisionBar({
  summary,
  onSaveDraft,
  onReject,
  onEscalate,
  onApprove,
}: {
  summary: string;
  onSaveDraft: () => void;
  onReject: () => void;
  onEscalate: () => void;
  onApprove: () => void;
}) {
  return (
    <div className="bg-paper/95 border-line sticky bottom-0 z-[10] border-t backdrop-blur-md">
      <div className="container-page mx-auto flex max-w-none flex-wrap items-center justify-between gap-4 px-9 py-3 max-md:px-5">
        <div className="flex min-w-0 flex-col gap-0.5">
          <div className="text-[13px] text-ink">
            <strong className="font-semibold">Your decision:</strong>{" "}
            <span className="font-normal text-ink-mute">{summary}</span>
          </div>
          <div className="text-[11.5px] text-ink-mute">
            Decisions on this case are audit-logged and visible to admin.
          </div>
        </div>

        <div className="flex flex-shrink-0 flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onSaveDraft}
            className="border-line bg-paper text-ink-soft hover:bg-cream-deep hover:text-ink inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[12.5px] font-medium transition-colors"
          >
            <Save className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
            Save draft
          </button>
          <button
            type="button"
            onClick={onReject}
            className="border-danger text-danger hover:bg-danger hover:text-paper inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[12.5px] font-medium transition-colors"
          >
            <X className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
            Reject recommendation
          </button>
          <button
            type="button"
            onClick={onEscalate}
            className="border-amber text-amber hover:bg-amber hover:text-paper inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[12.5px] font-medium transition-colors"
          >
            <ShieldAlert
              className="h-3.5 w-3.5"
              strokeWidth={1.7}
              aria-hidden="true"
            />
            Escalate further
          </button>
          <button
            type="button"
            onClick={onApprove}
            className="bg-ink text-paper hover:bg-ink-soft inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[12.5px] font-medium transition-colors"
          >
            <Check className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />
            Approve &amp; co-sign
          </button>
        </div>
      </div>
    </div>
  );
}
