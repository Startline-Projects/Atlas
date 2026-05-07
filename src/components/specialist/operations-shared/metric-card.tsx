/**
 * Card chrome shared by dashboard-style metric tiles. Used by
 * pool-health (capacity / utilization / quality / tier composition /
 * geographic / churn risk / skill matrix / recommended actions) and
 * performance (KPI cards / you-vs-bench / score trend / strengths /
 * growth / peer ranking / goals / feedback).
 *
 * Per source CSS (`.ph-card` and `.perf-card`): paper bg + line border +
 * 12px radius + 14px gap between head and body. Each card has a
 * label/title pair on the left and an optional trend caption on the
 * right.
 *
 * Originally extracted from pool-health/ph-card.tsx in Session 5 with a
 * "promote when 2nd consumer appears" note. Performance is the 2nd
 * consumer; promoted to operations-shared/ at the start of Session 6.1.
 * Rename: PhCard → MetricCard. The "ph" prefix was a view-id artifact.
 *
 * Server Component.
 */

import { cn } from "@/lib/utils/cn";

export type MetricCardTrendTone = "default" | "success" | "amber" | "danger";

const TREND_TONE: Record<MetricCardTrendTone, string> = {
  default: "text-ink-mute",
  success: "text-success",
  amber: "text-amber",
  danger: "text-danger",
};

export function MetricCard({
  label,
  title,
  trend,
  span,
  children,
}: {
  /** Mono uppercase label above the title. */
  label: string;
  /** Display-font 16px title (with optional emphasized fragment). */
  title: string;
  /** Optional trend caption (top-right). */
  trend?: { tone: MetricCardTrendTone; text: string };
  /** Grid column span for the card. */
  span: 3 | 4 | 6 | 8 | 12;
  children: React.ReactNode;
}) {
  return (
    <article
      className={cn(
        "bg-paper border-line flex min-w-0 flex-col gap-3.5 rounded-xl border p-4",
        // 12-col grid spans, with sensible collapses below lg/md
        span === 3 && "lg:col-span-3 max-lg:col-span-6 max-md:col-span-12",
        span === 4 && "lg:col-span-4 max-lg:col-span-6 max-md:col-span-12",
        span === 6 && "lg:col-span-6 max-md:col-span-12",
        span === 8 && "lg:col-span-8 max-md:col-span-12",
        span === 12 && "col-span-12",
      )}
    >
      <header className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="mb-0.5 font-mono text-[9.5px] font-medium tracking-[0.14em] uppercase text-ink-mute">
            {label}
          </div>
          <div
            className="font-display text-[16px] font-medium tracking-[-0.01em] text-ink"
            style={{ fontVariationSettings: '"opsz" 36' }}
          >
            {title}
          </div>
        </div>
        {trend ? (
          <span
            className={cn(
              "font-mono text-[10.5px] tracking-[0.04em] whitespace-nowrap",
              TREND_TONE[trend.tone],
            )}
          >
            {trend.text}
          </span>
        ) : null}
      </header>
      {children}
    </article>
  );
}
