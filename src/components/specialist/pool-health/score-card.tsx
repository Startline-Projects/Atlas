/**
 * Hero scorecard — bignum + grade pill + 10-segment bar + 3 delta rows.
 * 3-column grid: score block / score-bar / deltas. Stacks at <=980px.
 *
 * Server Component.
 */

import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import type {
  PoolHealthDelta,
  PoolHealthSnapshot,
  ScoreSegmentTone,
} from "@/lib/mock-data/specialist/pool-health";
import { cn } from "@/lib/utils/cn";

const SEGMENT_CLASS: Record<ScoreSegmentTone, string> = {
  filled: "bg-success",
  amber: "bg-amber",
  danger: "bg-danger",
  empty: "bg-cream-deep",
};

const DELTA_TONE: Record<
  PoolHealthDelta["tone"],
  { wrap: string; icon: React.ReactNode }
> = {
  up: {
    wrap: "bg-success-bg text-success",
    icon: <ArrowUpRight className="h-3 w-3" strokeWidth={2} aria-hidden="true" />,
  },
  down: {
    wrap: "bg-danger-bg text-danger",
    icon: (
      <ArrowDownRight className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
    ),
  },
  flat: {
    wrap: "bg-cream-deep text-ink-mute",
    icon: <Minus className="h-3 w-3" strokeWidth={2} aria-hidden="true" />,
  },
};

export function ScoreCard({
  snapshot,
}: {
  snapshot: PoolHealthSnapshot;
}) {
  return (
    <div className="bg-cream border-line-soft grid grid-cols-1 items-center gap-9 border-b px-9 pt-6 pb-[22px] max-md:px-5 lg:grid-cols-[auto_minmax(0,1fr)_auto] max-lg:gap-[22px]">
      {/* Score block */}
      <div className="flex min-w-[200px] flex-col gap-1">
        <div className="font-mono text-[10px] font-medium tracking-[0.14em] uppercase text-ink-mute">
          Health score
        </div>
        <div
          className="font-display text-[72px] font-normal leading-[0.95] tracking-[-0.04em] text-ink"
          style={{ fontVariationSettings: '"opsz" 144' }}
        >
          {snapshot.score}
          <em className="ml-0.5 font-body text-[20px] not-italic font-normal text-ink-mute">
            /100
          </em>
        </div>
        <div
          className={cn(
            "mt-0.5 font-mono text-[11px] font-semibold tracking-[0.1em]",
            snapshot.grade === "thriving" || snapshot.grade === "healthy"
              ? "text-lime-deep"
              : snapshot.grade === "stable"
                ? "text-success"
                : snapshot.grade === "at-risk"
                  ? "text-amber"
                  : "text-danger",
          )}
        >
          {snapshot.gradeLabel}
        </div>
      </div>

      {/* Score bar — 10 segments + axis labels */}
      <div className="flex min-w-0 flex-col gap-2">
        <div className="grid h-2 grid-cols-10 gap-[3px]">
          {snapshot.scoreSegments.map((tone, i) => (
            <div
              key={i}
              className={cn("rounded-[2px]", SEGMENT_CLASS[tone])}
              aria-hidden="true"
            />
          ))}
        </div>
        <div className="flex justify-between font-mono text-[9px] tracking-[0.06em] uppercase text-ink-mute">
          <span>{snapshot.axisLabels.atRisk}</span>
          <span>{snapshot.axisLabels.healthy}</span>
          <span>{snapshot.axisLabels.thriving}</span>
        </div>
      </div>

      {/* Deltas */}
      <div className="flex min-w-[200px] flex-col gap-1.5">
        {snapshot.deltas.map((d, i) => {
          const tone = DELTA_TONE[d.tone];
          return (
            <div
              key={i}
              className="flex items-center gap-2 text-[12px] text-ink-soft"
            >
              <span
                className={cn(
                  "grid h-[18px] w-[18px] flex-shrink-0 place-items-center rounded-full",
                  tone.wrap,
                )}
              >
                {tone.icon}
              </span>
              <span>
                <strong className="font-medium text-ink">{d.value}</strong>
                {" "}
                {d.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
