/**
 * TrOverviewSection — Section 1: 6 team-wide overview metric cards.
 *
 * Per Step 10 trim (a): NO sparklines. Cards show label + big num +
 * trend pill + foot caption only. Section 2's per-Specialist
 * comparison charts already show trend.
 *
 * Server-renderable.
 *
 * Ported from prototype lines 31035-31126 (sparklines dropped).
 */

import { type MetricTrend, type OverviewMetric, overviewMetrics } from "@/lib/mock-data/manager/manager-team-reports-data";
import { cn } from "@/lib/utils/cn";

const TREND_TONE: Record<MetricTrend, string> = {
  up: "bg-success-bg/40 text-success border-success/30",
  down: "bg-danger-bg/40 text-danger border-danger/30",
  flat: "bg-cream-deep text-ink-mute border-line",
};

export function TrOverviewSection() {
  return (
    <section className="mb-8">
      <header className="mb-3 flex items-baseline justify-between gap-3">
        <div>
          <div className="text-ink-mute font-mono text-[10px] tracking-[0.14em] uppercase">
            Section 1
          </div>
          <h2
            className="font-display text-ink m-0 mt-0.5 text-[18px] font-medium tracking-[-0.01em]"
            style={{ fontVariationSettings: '"opsz" 36' }}
          >
            Team performance <em className="italic">overview</em>
          </h2>
        </div>
        <span className="text-ink-mute text-[12px]">
          aggregated · vs last month
        </span>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {overviewMetrics.map((m) => (
          <MetricCard key={m.id} metric={m} />
        ))}
      </div>
    </section>
  );
}

function MetricCard({ metric }: { metric: OverviewMetric }) {
  return (
    <article className="bg-paper border-line flex flex-col gap-2 rounded-md border p-4 shadow-sm">
      <div className="text-ink-mute font-mono text-[9.5px] tracking-[0.14em] uppercase">
        {metric.label}
      </div>
      <div className="flex items-baseline justify-between gap-2">
        <div
          className="font-display text-ink text-[32px] leading-none font-medium tracking-[-0.015em]"
          style={{ fontVariationSettings: '"opsz" 36' }}
        >
          {metric.value}
          {metric.valueUnit ? (
            <em className="text-ink-mute text-[18px] font-normal not-italic">
              {metric.valueUnit}
            </em>
          ) : null}
        </div>
        <TrendPill trend={metric.trend} trendPct={metric.trendPct} />
      </div>
      <div className="text-ink-mute border-line-soft mt-2 border-t pt-2.5 text-[11.5px] leading-snug">
        {metric.footParts.map((part, i) =>
          part.kind === "strong" ? (
            <strong key={i} className="text-ink-soft font-semibold">
              {part.value}
            </strong>
          ) : (
            <span key={i}>{part.value}</span>
          ),
        )}
      </div>
    </article>
  );
}

function TrendPill({ trend, trendPct }: { trend: MetricTrend; trendPct: number }) {
  const sign = trend === "up" ? "+" : trend === "down" ? "" : "";
  const label = trend === "flat" ? "0%" : `${sign}${trendPct}%`;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10.5px] font-semibold",
        TREND_TONE[trend],
      )}
    >
      <TrendArrow trend={trend} />
      {label}
    </span>
  );
}

function TrendArrow({ trend }: { trend: MetricTrend }) {
  if (trend === "up") {
    return (
      <svg width="9" height="9" viewBox="0 0 11 11" fill="none" aria-hidden="true">
        <path
          d="m3 7 2.5-2.5L8 7"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (trend === "down") {
    return (
      <svg width="9" height="9" viewBox="0 0 11 11" fill="none" aria-hidden="true">
        <path
          d="m3 4 2.5 2.5L8 4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg width="9" height="9" viewBox="0 0 11 11" fill="none" aria-hidden="true">
      <path d="M3 5.5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
