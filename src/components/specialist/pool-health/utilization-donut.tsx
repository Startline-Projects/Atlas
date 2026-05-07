/**
 * Utilization / Active engagements tile — SVG donut (two <circle>s
 * with stroke-dasharray) + center percentage + 3-row legend.
 *
 * Donut math: circumference = 2π × r. Filled arc = circumference ×
 * (centerPct / 100). The fg circle uses `stroke-dasharray=
 * "filled remaining"` to draw only the filled portion.
 *
 * Per source CSS `.ph-donut-bg` (cream-deep stroke 14) and
 * `.ph-donut-fg.success` (success stroke 14).
 *
 * Server Component.
 */

import { MetricCard } from "@/components/specialist/operations-shared";
import type {
  PoolHealthSnapshot,
  UtilizationLegendRow,
} from "@/lib/mock-data/specialist/pool-health";
import { cn } from "@/lib/utils/cn";

const RADIUS = 50;
const CIRCUM = 2 * Math.PI * RADIUS;

const LEGEND_DOT: Record<UtilizationLegendRow["tone"], string> = {
  active: "bg-success",
  partial: "bg-amber",
  available: "bg-cream-deep border border-line",
};

export function UtilizationDonut({
  utilization,
}: {
  utilization: PoolHealthSnapshot["utilization"];
}) {
  const filled = (utilization.centerPct / 100) * CIRCUM;
  const remaining = CIRCUM - filled;

  return (
    <MetricCard label="Utilization" title="Active engagements" span={4}>
      <div className="flex flex-wrap items-center gap-[18px]">
        <div className="relative h-[120px] w-[120px] flex-shrink-0">
          <svg
            viewBox="0 0 120 120"
            className="block h-full w-full -rotate-90"
            aria-hidden="true"
          >
            <circle
              cx="60"
              cy="60"
              r={RADIUS}
              fill="none"
              stroke="var(--color-cream-deep)"
              strokeWidth={14}
            />
            <circle
              cx="60"
              cy="60"
              r={RADIUS}
              fill="none"
              stroke="var(--color-success)"
              strokeWidth={14}
              strokeDasharray={`${filled.toFixed(2)} ${remaining.toFixed(2)}`}
              strokeLinecap="butt"
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center text-center">
            <div className="flex flex-col items-center">
              <div
                className="font-display text-[28px] font-normal leading-none tracking-[-0.02em] text-ink"
                style={{ fontVariationSettings: '"opsz" 96' }}
              >
                {utilization.centerPct}
                <em className="font-body text-[12px] not-italic font-normal text-ink-mute">
                  %
                </em>
              </div>
              <div className="mt-0.5 font-mono text-[9px] tracking-[0.1em] uppercase text-ink-mute">
                {utilization.centerCaption}
              </div>
            </div>
          </div>
        </div>
        <div className="flex min-w-[130px] flex-1 flex-col gap-[7px]">
          {utilization.legend.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[10px_minmax(0,1fr)_auto] items-center gap-2 text-[12px]"
            >
              <span
                aria-hidden="true"
                className={cn("h-2 w-2 rounded-[2px]", LEGEND_DOT[row.tone])}
              />
              <span className="text-ink-soft">{row.label}</span>
              <span className="font-mono text-[11px] font-medium text-ink tabular-nums">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </MetricCard>
  );
}
