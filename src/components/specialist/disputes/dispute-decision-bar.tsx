/**
 * Sticky bottom decision bar for the disputes view.
 *
 * Visually matches `queue-shared/DecisionBar` (sticky bottom · paper bg
 * · backdrop-blur · border-top) but the metric block and button set
 * differ:
 *
 *   - Metric: "Atlas decision pending · 4 days SLA remaining ·
 *              evidence reviewed: 4 of 7"
 *   - Buttons: Save as draft (neutral) + Open decision form (primary)
 *
 * The queue-shared/DecisionBar has 3 buttons with destructive/neutral/
 * primary tones tied to the review/recert decision flow. The disputes
 * decision bar has 2 buttons + a different metric, so reusing
 * queue-shared/DecisionBar fit awkwardly. Per the standing
 * "fits awkwardly, build parallel" rule, this is a small parallel
 * component within disputes/.
 *
 * The "Escalate to admin" button lives in the dispute-header (matches
 * source HTML), not this bar.
 *
 * Server Component (the buttons fire callbacks owned by the parent).
 */

"use client";

import { Save, ArrowRight } from "lucide-react";

export function DisputeDecisionBar({
  slaLabel,
  evidenceReviewedCount,
  evidenceTotalCount,
  onSaveDraft,
  onOpenDecisionForm,
  isResolved,
}: {
  slaLabel: string;
  evidenceReviewedCount: number;
  evidenceTotalCount: number;
  onSaveDraft: () => void;
  onOpenDecisionForm: () => void;
  /** When the dispute is already resolved, the bar shows a different
   *  message and the primary button label changes. */
  isResolved: boolean;
}) {
  return (
    <div className="bg-paper/95 border-line sticky bottom-0 z-[10] border-t backdrop-blur-md">
      <div className="container-page mx-auto flex max-w-none flex-wrap items-center justify-between gap-4 px-9 py-3 max-md:px-5">
        <div className="flex min-w-0 flex-col gap-0.5">
          <div className="text-[13px] text-ink">
            <strong className="font-semibold">
              {isResolved
                ? "Decision recorded"
                : "Atlas decision pending"}
            </strong>
            <span className="font-normal text-ink-mute">
              {" · "}
              {isResolved ? "case closed" : `${slaLabel} SLA remaining`}
            </span>
          </div>
          <div className="text-[11.5px] text-ink-mute">
            Evidence reviewed · {evidenceReviewedCount} of{" "}
            {evidenceTotalCount}
          </div>
          <div className="bg-line-soft mt-1 h-1 w-[180px] overflow-hidden rounded-full">
            <div
              className="bg-ink h-full rounded-full"
              style={{
                width: `${Math.min(
                  100,
                  Math.round(
                    (evidenceReviewedCount / Math.max(1, evidenceTotalCount)) *
                      100,
                  ),
                )}%`,
              }}
            />
          </div>
        </div>

        <div className="flex flex-shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onSaveDraft}
            disabled={isResolved}
            className="border-line bg-paper text-ink-soft hover:bg-cream-deep hover:text-ink disabled:opacity-50 inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[12.5px] font-medium transition-colors disabled:cursor-not-allowed"
          >
            <Save className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
            Save as draft
          </button>
          <button
            type="button"
            onClick={onOpenDecisionForm}
            className="bg-ink text-paper hover:bg-ink-soft inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[12.5px] font-medium transition-colors"
          >
            {isResolved ? "View decision details" : "Open decision form"}
            <ArrowRight
              className="h-3.5 w-3.5"
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
