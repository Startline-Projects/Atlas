/**
 * Hero scorecard — 3-column block: score block (left), 4-band
 * quartile bar (center), deltas list (right). Stacks at <980px.
 *
 * Per source CSS `.perf-hero` (3-col grid: auto / 1fr / auto) +
 * `.perf-quartile-bar` (4 segments, active gets lime-deep + tooltip
 * arrow underneath).
 *
 * Server Component.
 */

import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import type {
  PerformanceDelta,
  PerformanceHero as PerformanceHeroData,
} from "@/lib/mock-data/specialist/performance";
import { cn } from "@/lib/utils/cn";

const DELTA_TONE: Record<
  PerformanceDelta["tone"],
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

export function PerformanceHero({ hero }: { hero: PerformanceHeroData }) {
  return (
    <div className="bg-cream border-line-soft grid grid-cols-1 items-center gap-9 border-b px-10 pt-7 pb-6 max-md:px-5 lg:grid-cols-[auto_minmax(0,1fr)_auto] max-lg:gap-[22px]">
      {/* Score block (left) */}
      <div className="flex min-w-[220px] flex-col gap-1">
        <div className="font-mono text-[10px] font-medium tracking-[0.14em] uppercase text-ink-mute">
          Specialist score
        </div>
        <div
          className="font-display flex items-baseline text-[72px] font-normal leading-[0.95] tracking-[-0.04em] text-ink"
          style={{ fontVariationSettings: '"opsz" 144' }}
        >
          {hero.score}
          <span className="ml-1 font-body text-[20px] font-normal text-ink-mute">
            /100
          </span>
        </div>
        <div className="mt-0.5 font-mono text-[11px] font-semibold tracking-[0.1em] text-lime-deep">
          {hero.gradeLabel}
        </div>
      </div>

      {/* Quartile bar (center) */}
      <div className="flex min-w-0 flex-col gap-2.5">
        <div className="font-mono text-[10px] font-medium tracking-[0.12em] uppercase text-ink-mute">
          Quartile · category
        </div>
        <div className="grid h-[38px] grid-cols-4 gap-1 overflow-hidden rounded-md">
          {hero.bands.map((band) => (
            <div
              key={band.label}
              className={cn(
                "relative grid place-items-center rounded font-mono text-[10.5px] font-semibold tracking-[0.06em] uppercase transition-colors",
                band.active
                  ? "bg-lime-deep text-ink"
                  : "bg-cream-deep text-ink-mute",
              )}
            >
              {band.label} · {band.rangeLabel}
              {band.active ? (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-1/2 h-0 w-0 -translate-x-1/2 border-x-[4px] border-x-transparent border-t-[4px] border-t-lime-deep"
                />
              ) : null}
            </div>
          ))}
        </div>
        <div className="mt-0.5 flex justify-between font-mono text-[9.5px] tracking-[0.04em] uppercase text-ink-mute">
          <span>{hero.axisLabels.left}</span>
          <span>{hero.axisLabels.mid}</span>
          <span>{hero.axisLabels.right}</span>
        </div>
      </div>

      {/* Deltas (right) */}
      <div className="flex min-w-[220px] flex-col gap-2">
        {hero.deltas.map((d, i) => {
          const tone = DELTA_TONE[d.tone];
          return (
            <div
              key={i}
              className="flex items-center gap-2.5 text-[12px] text-ink-soft"
            >
              <span
                className={cn(
                  "grid h-5 w-5 flex-shrink-0 place-items-center rounded-full",
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
