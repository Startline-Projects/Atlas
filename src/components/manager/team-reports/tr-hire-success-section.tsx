/**
 * TrHireSuccessSection — Section 5: Hire success analytics.
 *
 * 2 cards in a side-by-side layout:
 *   1. Hires per role — bar list of all 10 categories, computed at
 *      render from per-Specialist `hiresPlacedMonth` aggregated by
 *      category ownership. Categories with no owner-attributed hires
 *      render at 0 (rare today; matters for new role launches).
 *   2. Speed metrics — Avg time-to-hire (with delta vs last month)
 *      + Fastest / Slowest category cards + Client retention pair.
 *
 * Cross-step consumption:
 *   - Card 1 derives from `Specialist.kpis.hiresPlacedMonth` + the
 *     `primaryOwnerSpecialistId` mapping on each PoolCategory (Step 8)
 *   - Card 2 reads `speedMetrics` from Step 10 data + resolves
 *     category labels via Step 8 + owner names via team.ts
 *
 * Server-renderable.
 *
 * Ported from prototype lines 31473-31538.
 */

import { getSpecialist, specialists } from "@/lib/mock-data/manager/team";
import {
  getCategory,
  getCategoryLabel,
  poolCategories,
} from "@/lib/mock-data/manager/manager-pool-coordination-data";
import { speedMetrics } from "@/lib/mock-data/manager/manager-team-reports-data";
import { cn } from "@/lib/utils/cn";

export function TrHireSuccessSection() {
  const totalHires = specialists.reduce(
    (sum, s) => sum + s.kpis.hiresPlacedMonth,
    0,
  );

  return (
    <section className="mb-2">
      <header className="mb-3 flex items-baseline justify-between gap-3">
        <div>
          <div className="text-ink-mute font-mono text-[10px] tracking-[0.14em] uppercase">
            Section 5
          </div>
          <h2
            className="font-display text-ink m-0 mt-0.5 text-[18px] font-medium tracking-[-0.01em]"
            style={{ fontVariationSettings: '"opsz" 36' }}
          >
            Hire <em className="italic">success</em>
          </h2>
        </div>
        <span className="text-ink-mute text-[12px]">
          {totalHires} hires · this month
        </span>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <HiresPerRoleCard />
        <SpeedMetricsCard />
      </div>
    </section>
  );
}

/* ============================================================
   Card 1 — Hires per role
   ============================================================ */

type CategoryHireRow = {
  categoryId: string;
  label: string;
  count: number;
};

function HiresPerRoleCard() {
  /* Compute hires per category: for each pool category, sum
     `hiresPlacedMonth` for the primary owner specialist. */
  const rows: ReadonlyArray<CategoryHireRow> = poolCategories
    .map((cat) => {
      const owner = getSpecialist(cat.primaryOwnerSpecialistId);
      return {
        categoryId: cat.id,
        label: getCategoryLabel(cat),
        count: owner?.kpis.hiresPlacedMonth ?? 0,
      };
    })
    .sort((a, b) => b.count - a.count);

  const max = Math.max(...rows.map((r) => r.count), 1);

  return (
    <article className="bg-paper border-line flex flex-col rounded-md border p-5 shadow-sm">
      <header>
        <div className="text-ink-mute font-mono text-[9.5px] tracking-[0.14em] uppercase">
          By category
        </div>
        <h3
          className="font-display text-ink m-0 mt-0.5 text-[15px] font-medium tracking-[-0.01em]"
          style={{ fontVariationSettings: '"opsz" 36' }}
        >
          Hires <em className="italic">per role</em>
        </h3>
      </header>

      <ul className="mt-4 flex flex-col gap-2">
        {rows.map((row) => {
          const pct = Math.round((row.count / max) * 100);
          const tone: "success" | "neutral" | "danger" =
            row.count >= max ? "success" : row.count <= 1 ? "danger" : "neutral";
          const fillClass =
            tone === "success" ? "bg-success" : tone === "danger" ? "bg-danger" : "bg-ink-soft";
          const numClass =
            tone === "success" ? "text-success" : tone === "danger" ? "text-danger" : "text-ink";
          return (
            <li key={row.categoryId} className="grid grid-cols-[1fr_2fr_auto] items-center gap-3 text-[12px]">
              <span className="text-ink-soft truncate">{row.label}</span>
              <div className="bg-cream-deep relative h-1.5 overflow-hidden rounded-full">
                <div
                  className={cn("h-full rounded-full transition-all", fillClass)}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span
                className={cn(
                  "font-display w-6 text-right text-[13px] font-semibold tabular-nums",
                  numClass,
                )}
              >
                {row.count}
              </span>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

/* ============================================================
   Card 2 — Speed metrics
   ============================================================ */

function SpeedMetricsCard() {
  const fastestCategory = getCategory(speedMetrics.fastestCategoryId);
  const fastestOwner = getSpecialist(speedMetrics.fastestSpecialistId);
  const slowestCategory = getCategory(speedMetrics.slowestCategoryId);
  const slowestOwner = getSpecialist(speedMetrics.slowestSpecialistId);

  const deltaLabel =
    speedMetrics.avgTimeToHireDelta === 0
      ? "no change vs last month"
      : speedMetrics.avgTimeToHireDelta < 0
        ? `↓ ${Math.abs(speedMetrics.avgTimeToHireDelta)} days vs last month`
        : `↑ ${speedMetrics.avgTimeToHireDelta} days vs last month`;
  const deltaTone =
    speedMetrics.avgTimeToHireDelta < 0
      ? "text-success"
      : speedMetrics.avgTimeToHireDelta > 0
        ? "text-danger"
        : "text-ink-mute";
  const retentionPct = Math.round(
    (speedMetrics.repeatHireCount / speedMetrics.totalHires) * 100,
  );

  return (
    <article className="bg-paper border-line flex flex-col gap-4 rounded-md border p-5 shadow-sm">
      <header>
        <div className="text-ink-mute font-mono text-[9.5px] tracking-[0.14em] uppercase">
          Time-to-hire
        </div>
        <h3
          className="font-display text-ink m-0 mt-0.5 text-[15px] font-medium tracking-[-0.01em]"
          style={{ fontVariationSettings: '"opsz" 36' }}
        >
          Speed <em className="italic">metrics</em>
        </h3>
      </header>

      {/* Avg time-to-hire */}
      <div>
        <div className="text-ink-mute font-mono text-[10px] tracking-[0.1em] uppercase">
          Avg time-to-hire
        </div>
        <div
          className="font-display text-ink mt-1 text-[32px] leading-none font-medium"
          style={{ fontVariationSettings: '"opsz" 36' }}
        >
          {speedMetrics.avgTimeToHireDays}
          <em className="text-ink-mute text-[16px] font-normal not-italic"> days</em>
        </div>
        <div className={cn("mt-1 text-[11.5px]", deltaTone)}>{deltaLabel}</div>
      </div>

      {/* Fastest / Slowest pair */}
      <div className="border-line-soft grid grid-cols-2 gap-3 border-t pt-3">
        <StatTile
          label="Fastest"
          categoryLabel={fastestCategory ? getCategoryLabel(fastestCategory) : "—"}
          subLine={`${speedMetrics.fastestDays} days · ${fastestOwner?.firstName ?? "?"}`}
        />
        <StatTile
          label="Slowest"
          categoryLabel={slowestCategory ? getCategoryLabel(slowestCategory) : "—"}
          subLine={`${speedMetrics.slowestDays} days · ${slowestOwner?.firstName ?? "?"}`}
        />
      </div>

      {/* Client retention */}
      <div className="border-line-soft border-t pt-3">
        <div className="text-ink-mute font-mono text-[10px] tracking-[0.1em] uppercase">
          Client retention
        </div>
        <div
          className="font-display text-ink mt-1 text-[32px] leading-none font-medium"
          style={{ fontVariationSettings: '"opsz" 36' }}
        >
          {speedMetrics.repeatHireCount}
          <em className="text-ink-mute text-[16px] font-normal not-italic">
            {" "}of {speedMetrics.totalHires}
          </em>
        </div>
        <div className="text-ink-mute mt-1 text-[11.5px]">
          repeat hires · {retentionPct}% rate
        </div>
      </div>
    </article>
  );
}

function StatTile({
  label,
  categoryLabel,
  subLine,
}: {
  label: string;
  categoryLabel: string;
  subLine: string;
}) {
  return (
    <div>
      <div className="text-ink-mute font-mono text-[9.5px] tracking-[0.1em] uppercase">
        {label}
      </div>
      <div
        className="font-display text-ink mt-1 text-[16px] font-medium leading-tight"
        style={{ fontVariationSettings: '"opsz" 36' }}
      >
        {categoryLabel}
      </div>
      <div className="text-ink-mute mt-0.5 text-[11.5px]">{subLine}</div>
    </div>
  );
}
