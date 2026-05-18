/**
 * TrPoolAnalyticsSection — Section 3: Pool health analytics.
 *
 * 2 cards in a side-by-side layout:
 *   1. Pool size change · 30 days — bar list of 10 categories,
 *      sorted descending by trendPct (positive trends first, then
 *      flat, then negative). Bar tone: success for positive,
 *      neutral for flat, warn for overflowing (Bookkeeping +80%
 *      is amber not green per prototype — overflowing isn't a
 *      "win"), danger for negative.
 *   2. Depletion incidents · past 90 days — 4 historical rows +
 *      insight footer ("Avg recovery 7.7 days · Sprint effectiveness:
 *      3 of 3 prior recoveries via sprint").
 *
 * Cross-step consumption:
 *   - Card 1 reads `poolCategories[i].trendPct` from Step 8 data
 *   - Card 2 reads `depletionIncidents` from Step 10 data, with
 *     category labels derived via `getCategoryLabel()` from Step 8
 *
 * Server-renderable.
 *
 * Ported from prototype lines 31408-31471.
 */

import { getSpecialist } from "@/lib/mock-data/manager/team";
import {
  getCategory,
  getCategoryLabel,
  poolCategories,
  type PoolCategory,
} from "@/lib/mock-data/manager/manager-pool-coordination-data";
import {
  depletionIncidents,
  depletionInsightAvgDays,
  depletionInsightSprintRecoveries,
  depletionInsightTotalPriorRecoveries,
  type DepletionIncident,
} from "@/lib/mock-data/manager/manager-team-reports-data";
import { cn } from "@/lib/utils/cn";

export function TrPoolAnalyticsSection() {
  return (
    <section className="mb-8">
      <header className="mb-3 flex items-baseline justify-between gap-3">
        <div>
          <div className="text-ink-mute font-mono text-[10px] tracking-[0.14em] uppercase">
            Section 3
          </div>
          <h2
            className="font-display text-ink m-0 mt-0.5 text-[18px] font-medium tracking-[-0.01em]"
            style={{ fontVariationSettings: '"opsz" 36' }}
          >
            Pool health <em className="italic">analytics</em>
          </h2>
        </div>
        <span className="text-ink-mute text-[12px]">trends · last 90 days</span>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PoolSizeChangeCard />
        <DepletionIncidentsCard />
      </div>
    </section>
  );
}

/* ============================================================
   Card 1 — Pool size change (30 days)
   ============================================================ */

type PoolBarTone = "success" | "warn" | "neutral" | "danger";

const POOL_BAR_FILL: Record<PoolBarTone, string> = {
  success: "bg-success",
  warn: "bg-amber",
  neutral: "bg-ink-soft",
  danger: "bg-danger",
};

const POOL_PCT_TONE: Record<PoolBarTone, string> = {
  success: "text-success",
  warn: "text-amber",
  neutral: "text-ink",
  danger: "text-danger",
};

function PoolSizeChangeCard() {
  /* Sort by signed trendPct descending (highest gains first, then
     negative trends at the bottom). Overflowing pools (positive but
     bad) get amber tone via tonePct() — visual signals trend, not value. */
  const sorted = [...poolCategories].sort((a, b) => b.trendPct - a.trendPct);
  const maxMag = Math.max(...sorted.map((c) => Math.abs(c.trendPct)), 1);

  return (
    <article className="bg-paper border-line flex flex-col rounded-md border p-5 shadow-sm">
      <div className="text-ink mb-3 text-[13px] font-semibold">
        Pool size change · 30 days
      </div>
      <ul className="flex flex-col gap-2">
        {sorted.map((c) => {
          const tone = poolBarToneFor(c);
          const pct = Math.round((Math.abs(c.trendPct) / maxMag) * 100);
          const sign = c.trendPct > 0 ? "+" : c.trendPct < 0 ? "−" : "";
          return (
            <li key={c.id} className="grid grid-cols-[1fr_2fr_auto] items-center gap-3 text-[12px]">
              <span className="text-ink-soft truncate">{getCategoryLabel(c)}</span>
              <div className="bg-cream-deep relative h-1.5 overflow-hidden rounded-full">
                <div
                  className={cn("h-full rounded-full transition-all", POOL_BAR_FILL[tone])}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span
                className={cn(
                  "font-display w-14 text-right text-[12.5px] font-semibold tabular-nums",
                  POOL_PCT_TONE[tone],
                )}
              >
                {sign}
                {Math.abs(c.trendPct)}%
              </span>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

/** Pool bar tone per status:
 *   - overflowing → warn (amber): positive trend but bad direction
 *   - depleted → danger (red): regardless of trend sign
 *   - strong w/ positive trend → success (green)
 *   - stable / steady / strong-but-flat → neutral
 *   - any negative trend (other than overflowing) → danger */
function poolBarToneFor(c: PoolCategory): PoolBarTone {
  if (c.status === "overflowing") return "warn";
  if (c.status === "depleted") return "danger";
  if (c.trendPct < 0) return "danger";
  if (c.status === "strong" && c.trendPct > 0) return "success";
  return "neutral";
}

/* ============================================================
   Card 2 — Depletion incidents (past 90 days)
   ============================================================ */

function DepletionIncidentsCard() {
  return (
    <article className="bg-paper border-line flex flex-col rounded-md border p-5 shadow-sm">
      <header>
        <div className="text-ink-mute font-mono text-[9.5px] tracking-[0.14em] uppercase">
          Depletion incidents
        </div>
        <h3
          className="font-display text-ink m-0 mt-0.5 text-[15px] font-medium tracking-[-0.01em]"
          style={{ fontVariationSettings: '"opsz" 36' }}
        >
          Past <em className="italic">90 days</em>
        </h3>
      </header>

      <ul className="mt-4 flex flex-col gap-2">
        {depletionIncidents.map((inc) => (
          <IncidentRow key={inc.id} incident={inc} />
        ))}
      </ul>

      <p className="text-ink-mute border-line-soft m-0 mt-4 border-t pt-3 text-[11.5px] leading-snug">
        💡 <strong className="text-ink-soft">Avg recovery:</strong>{" "}
        {depletionInsightAvgDays} days ·{" "}
        <strong className="text-ink-soft">Sprint effectiveness:</strong>{" "}
        {depletionInsightSprintRecoveries} of{" "}
        {depletionInsightTotalPriorRecoveries} prior recoveries via sprint
      </p>
    </article>
  );
}

function IncidentRow({ incident: inc }: { incident: DepletionIncident }) {
  const category = getCategory(inc.categoryId);
  const owner = getSpecialist(inc.specialistId);
  const categoryLabel = category ? getCategoryLabel(category) : inc.categoryId;
  const ownerName = owner?.firstName ?? "?";

  return (
    <li className="grid grid-cols-[auto_1fr_auto] items-center gap-3 text-[12px]">
      <span className="text-ink-mute font-mono text-[10.5px] whitespace-nowrap">
        {inc.dateLabel}
      </span>
      <span className="text-ink-soft truncate">
        <strong className="text-ink font-semibold">{categoryLabel}</strong> ·{" "}
        {ownerName} ·{" "}
        <span className={cn(inc.status === "ongoing" && "text-danger font-medium")}>
          {inc.status}
        </span>
      </span>
      <span
        className={cn(
          "font-display w-12 text-right text-[12.5px] font-semibold tabular-nums",
          inc.status === "ongoing" ? "text-danger" : "text-ink-soft",
        )}
      >
        {inc.recoveryDays !== null ? `${inc.recoveryDays}d` : "—"}
      </span>
    </li>
  );
}
