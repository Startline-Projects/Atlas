/**
 * Atlas system AI-recommendation callout — large display-font label
 * + body rationale paragraph. Tone-keyed left border.
 *
 * Per source CSS `.rev-decision-card.recommend-{approve,reject,
 * escalate,needs-judgment}` and `.rev-decision-rec` (display 16px
 * opsz 36).
 *
 * Server Component.
 */

import { Sparkles } from "lucide-react";
import type { ReviewRecommendation } from "@/lib/mock-data/specialist/reviews-approvals";
import { cn } from "@/lib/utils/cn";

const RECOMMENDATION_TONE: Record<
  ReviewRecommendation,
  { wrap: string; iconBg: string; iconText: string; emphasisLabel: string }
> = {
  approve: {
    wrap: "bg-success-bg/40 border-l-success",
    iconBg: "bg-success-bg",
    iconText: "text-success",
    emphasisLabel: "RECOMMEND APPROVE",
  },
  reject: {
    wrap: "bg-danger-bg/30 border-l-danger",
    iconBg: "bg-danger-bg",
    iconText: "text-danger",
    emphasisLabel: "RECOMMEND REJECT",
  },
  escalate: {
    wrap: "bg-amber/10 border-l-amber",
    iconBg: "bg-amber/15",
    iconText: "text-amber",
    emphasisLabel: "RECOMMEND ESCALATE",
  },
  "needs-judgment": {
    wrap: "bg-cream-deep border-l-ink-mute",
    iconBg: "bg-paper",
    iconText: "text-ink-soft",
    emphasisLabel: "NEEDS SPECIALIST JUDGMENT",
  },
};

export function ReviewRecommendationCard({
  recommendation,
  recommendationLabel,
  recommendationRationale,
}: {
  recommendation: ReviewRecommendation;
  recommendationLabel: string;
  recommendationRationale: string;
}) {
  const tone = RECOMMENDATION_TONE[recommendation];
  return (
    <div
      className={cn(
        "border-line-soft flex items-start gap-3.5 rounded-lg border border-l-[3px] px-4 py-4",
        tone.wrap,
      )}
    >
      <div
        className={cn(
          "grid h-8 w-8 flex-shrink-0 place-items-center rounded-md",
          tone.iconBg,
          tone.iconText,
        )}
        aria-hidden="true"
      >
        <Sparkles className="h-4 w-4" strokeWidth={1.6} />
      </div>
      <div className="min-w-0 flex-1">
        <div
          className={cn(
            "mb-1 font-mono text-[9.5px] font-semibold tracking-[0.14em] uppercase",
            tone.iconText,
          )}
        >
          {tone.emphasisLabel}
        </div>
        <div
          className="font-display mb-1.5 text-[16px] font-medium leading-tight text-ink"
          style={{ fontVariationSettings: '"opsz" 36' }}
        >
          {recommendationLabel}
        </div>
        <p className="m-0 text-[13px] leading-[1.55] text-ink-soft">
          {recommendationRationale}
        </p>
      </div>
    </div>
  );
}
