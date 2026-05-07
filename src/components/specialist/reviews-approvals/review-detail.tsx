"use client";

/**
 * Reviews-approvals detail pane. Composes:
 *
 *   ReviewDetailHeader (case ID + subject + meta strip)
 *   ReviewRecommendationCard (AI rec callout)
 *   SectionFrame "01 Subject context" → ReviewContextGrid
 *   SectionFrame "02 Discussion thread" → ReviewThread + ReviewsComposer
 *   ReviewsDecisionBar (sticky bottom; only when direction !== "closed")
 *
 * Composer state owned here — append-on-send appends a new
 * specialist-Miguel reply to local thread state. Page reload resets,
 * matching candidate-chat / disputes patterns.
 *
 * Closed-direction renders a closed-outcome banner instead of the
 * decision bar and the composer.
 *
 * Client Component (composer + decision-bar callbacks).
 */

import { useCallback, useMemo, useState } from "react";
import { Check, FileText } from "lucide-react";

import { currentUser } from "@/lib/mock-data/specialist/current-user";
import type {
  ReviewItem,
  ReviewThreadMessage,
} from "@/lib/mock-data/specialist/reviews-approvals";
import { SectionFrame } from "@/components/specialist/queue-shared/section-frame";

import { ReviewDetailHeader } from "./review-detail-header";
import { ReviewRecommendationCard } from "./review-recommendation-card";
import { ReviewContextGrid } from "./review-context-grid";
import { ReviewThread } from "./review-thread";
import { ReviewsComposer } from "./reviews-composer";
import { ReviewsDecisionBar } from "./reviews-decision-bar";

type Props = {
  item: ReviewItem;
  /** Triggered for any of the 4 decision-bar buttons (Save/Reject/
   *  Escalate/Approve). The parent opens the corresponding modal. */
  onDecision: (
    action: "save-draft" | "reject" | "escalate" | "approve-cosign",
  ) => void;
};

export function ReviewDetail({ item, onDecision }: Props) {
  const [composerValue, setComposerValue] = useState("");
  const [localAppends, setLocalAppends] = useState<
    ReadonlyArray<ReviewThreadMessage>
  >([]);

  const handleSend = useCallback(
    (body: string) => {
      const newMsg: ReviewThreadMessage = {
        id: `local-${item.id}-${Date.now()}`,
        actor: {
          id: "you",
          name: currentUser.fullName,
          role: "Specialist",
          initials: currentUser.initials,
          avatarGradient: "warm",
        },
        whenLabel: "Just now",
        body,
        isYou: true,
      };
      setLocalAppends((prev) => [...prev, newMsg]);
      setComposerValue("");
    },
    [item.id],
  );

  const fullThread = useMemo<ReadonlyArray<ReviewThreadMessage>>(
    () => [...item.thread, ...localAppends],
    [item.thread, localAppends],
  );

  const isClosed = item.direction === "closed";

  return (
    <div className="bg-cream flex min-w-0 flex-1 flex-col">
      <ReviewDetailHeader item={item} />

      <div className="flex flex-col gap-5 px-9 pt-5 pb-15 max-md:px-5">
        <ReviewRecommendationCard
          recommendation={item.recommendation}
          recommendationLabel={item.recommendationLabel}
          recommendationRationale={item.recommendationRationale}
        />

        <SectionFrame
          num="01"
          title="Subject context"
          meta={
            <span className="font-mono text-[10.5px] tracking-[0.04em] uppercase">
              {item.context.length} facts
            </span>
          }
        >
          <ReviewContextGrid cells={item.context} />
        </SectionFrame>

        <SectionFrame
          num="02"
          title="Discussion thread"
          meta={
            <span className="font-mono text-[10.5px] tracking-[0.04em] uppercase">
              {fullThread.length} of {item.threadTotalCount} messages
            </span>
          }
        >
          <ReviewThread messages={fullThread} />
        </SectionFrame>

        {isClosed && item.closedOutcome ? (
          <ClosedOutcomeBanner item={item} />
        ) : null}
      </div>

      {!isClosed ? (
        <>
          <ReviewsComposer
            value={composerValue}
            onValueChange={setComposerValue}
            onSend={handleSend}
          />
          <ReviewsDecisionBar
            summary={item.decisionSummary}
            onSaveDraft={() => onDecision("save-draft")}
            onReject={() => onDecision("reject")}
            onEscalate={() => onDecision("escalate")}
            onApprove={() => onDecision("approve-cosign")}
          />
        </>
      ) : null}
    </div>
  );
}

/* ============================================================
   Closed-outcome banner
   ============================================================ */

function ClosedOutcomeBanner({ item }: { item: ReviewItem }) {
  const outcome = item.closedOutcome!;
  return (
    <div className="bg-success-bg/40 border-line-soft flex items-start gap-3.5 rounded-lg border border-l-[3px] border-l-success px-4 py-4">
      <div
        className="bg-success-bg text-success grid h-8 w-8 flex-shrink-0 place-items-center rounded-md"
        aria-hidden="true"
      >
        <Check className="h-4 w-4" strokeWidth={1.8} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 font-mono text-[9.5px] font-semibold tracking-[0.14em] uppercase text-success">
          DECISION RECORDED
        </div>
        <div className="font-display mb-1.5 text-[16px] font-medium text-ink">
          {outcome.decisionLabel}
        </div>
        <div className="text-[13px] text-ink-soft">{outcome.closedBy}</div>
        {outcome.disputeId ? (
          <div className="mt-2 inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.04em] uppercase text-ink-mute">
            <FileText className="h-3 w-3" strokeWidth={1.5} />
            Dispute ref · {outcome.disputeId}
          </div>
        ) : null}
      </div>
    </div>
  );
}
