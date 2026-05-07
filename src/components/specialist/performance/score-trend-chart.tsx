/**
 * Score trend chart — sparkline + dashed benchmark line + start/end
 * axis labels. Reuses operations-shared/SparklineSVG with the new
 * `ink` tone (added in 6.1 promotion).
 *
 * Source CSS `.perf-trend-svg` renders a static path; we compute it
 * from the points series. The benchmark line is rendered as an
 * additional `<line>` element overlayed.
 *
 * Server Component.
 */

import { MetricCard } from "@/components/specialist/operations-shared";
import { SparklineSVG } from "@/components/specialist/operations-shared";
import type { ScoreTrend } from "@/lib/mock-data/specialist/performance";

export function ScoreTrendChart({ trend }: { trend: ScoreTrend }) {
  // Compute the bench-line y position relative to the points range.
  const min = Math.min(...trend.points, trend.benchPoint);
  const max = Math.max(...trend.points, trend.benchPoint);
  const range = Math.max(1, max - min);
  const benchY = 64 - 6 - ((trend.benchPoint - min) / range) * (64 - 12);

  return (
    <MetricCard label="Trend" title="Score trend · 13 months" span={6}>
      <div className="relative">
        {/* Benchmark line: dashed horizontal at benchPoint */}
        <svg
          aria-hidden="true"
          viewBox="0 0 320 64"
          preserveAspectRatio="none"
          className="absolute inset-0 block h-16 w-full pointer-events-none"
        >
          <line
            x1="0"
            x2="320"
            y1={benchY}
            y2={benchY}
            stroke="var(--color-ink-mute)"
            strokeWidth={1}
            strokeDasharray="4 3"
            opacity={0.5}
          />
        </svg>
        <SparklineSVG points={trend.points} tone="ink" />
      </div>
      <div className="mt-1.5 flex justify-between font-mono text-[9.5px] tracking-[0.04em] uppercase text-ink-mute">
        <span>{trend.startLabel}</span>
        <span className="text-ink-mute">{trend.benchLabel}</span>
        <span className="text-ink font-medium">{trend.endLabel}</span>
      </div>
    </MetricCard>
  );
}
