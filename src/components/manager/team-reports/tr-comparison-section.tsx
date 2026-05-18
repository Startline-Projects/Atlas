"use client";

/**
 * TrComparisonSection — Section 2: Per-Specialist comparison.
 *
 * 5-tab chart switcher with a SHARED bar chart primitive used 5x
 * (Reviews / Dispute time / Sourcing / Hires / SLA hit rate).
 *
 * All 5 datasets read from canonical `Specialist.kpis` — no Step-10-
 * specific per-spec data. The chart primitive sorts rows by value
 * (descending for "higher is better" metrics, ascending for
 * "lower is better" like Dispute time).
 *
 * Mateo's bar in all 5 charts gets lime tint + "You" tag per Q5.
 *
 * `focusedSpecialistId` from `?spec=` deep-link rings the matching
 * row in whatever chart is active.
 *
 * Ported from prototype lines 31128-31309.
 */

import {
  MANAGER_SPECIALIST_ID,
  type Specialist,
  type SpecialistId,
} from "@/lib/mock-data/manager/team";
import { MgrAvatar } from "@/components/manager/shell/mgr-avatar";
import { cn } from "@/lib/utils/cn";

export type ChartTab = "reviews" | "disp-time" | "sourcing" | "hires" | "sla";

type TabDef = {
  key: ChartTab;
  label: string;
  /** "high" = larger is better; "low" = smaller is better (Dispute time). */
  direction: "high" | "low";
  /** Unit suffix on bar value labels ("" / "h" / "%"). */
  unit: string;
  /** Specialist KPI key used to pull each spec's value. */
  kpiKey: keyof Specialist["kpis"];
};

const TABS: ReadonlyArray<TabDef> = [
  { key: "reviews", label: "Reviews completed", direction: "high", unit: "", kpiKey: "reviewsMonth" },
  { key: "disp-time", label: "Dispute resolution time", direction: "low", unit: "h", kpiKey: "disputeAvgResolutionHours" },
  { key: "sourcing", label: "Sourcing volume", direction: "high", unit: "", kpiKey: "sourcingProspectsMonth" },
  { key: "hires", label: "Hires", direction: "high", unit: "", kpiKey: "hiresPlacedMonth" },
  { key: "sla", label: "SLA hit rate", direction: "high", unit: "%", kpiKey: "reviewsMonthSLAPct" },
];

type TrComparisonSectionProps = {
  specialists: ReadonlyArray<Specialist>;
  activeTab: ChartTab;
  onTabChange: (next: ChartTab) => void;
  focusedSpecialistId: SpecialistId | null;
};

export function TrComparisonSection({
  specialists,
  activeTab,
  onTabChange,
  focusedSpecialistId,
}: TrComparisonSectionProps) {
  const activeTabDef = TABS.find((t) => t.key === activeTab) ?? TABS[0]!;

  return (
    <section className="mb-8">
      <header className="mb-3 flex items-baseline justify-between gap-3">
        <div>
          <div className="text-ink-mute font-mono text-[10px] tracking-[0.14em] uppercase">
            Section 2
          </div>
          <h2
            className="font-display text-ink m-0 mt-0.5 text-[18px] font-medium tracking-[-0.01em]"
            style={{ fontVariationSettings: '"opsz" 36' }}
          >
            Per-Specialist <em className="italic">comparison</em>
          </h2>
        </div>
        <span className="text-ink-mute text-[12px]">
          all {specialists.length} · this month
        </span>
      </header>

      <article className="bg-paper border-line rounded-md border p-5 shadow-sm">
        {/* Tab bar */}
        <div
          role="tablist"
          aria-label="Comparison metric"
          className="border-line-soft mb-4 flex flex-wrap gap-1 border-b pb-3"
        >
          {TABS.map((tab) => {
            const isActive = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onTabChange(tab.key)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-[12px] font-medium transition-colors",
                  isActive
                    ? "bg-ink text-paper"
                    : "text-ink-soft hover:bg-cream-deep hover:text-ink",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Chart — shared TrBarChart primitive */}
        <TrBarChart
          specialists={specialists}
          tab={activeTabDef}
          focusedSpecialistId={focusedSpecialistId}
        />
      </article>
    </section>
  );
}

/* ============================================================
   Shared bar chart primitive — used 5x via the tab switcher
   ============================================================ */

type TrBarChartProps = {
  specialists: ReadonlyArray<Specialist>;
  tab: TabDef;
  focusedSpecialistId: SpecialistId | null;
};

function TrBarChart({ specialists, tab, focusedSpecialistId }: TrBarChartProps) {
  /* Sort rows by metric value: descending for "high" direction,
     ascending for "low" (Dispute time — fastest first). */
  const sorted = [...specialists].sort((a, b) => {
    const va = a.kpis[tab.kpiKey];
    const vb = b.kpis[tab.kpiKey];
    return tab.direction === "high" ? vb - va : va - vb;
  });

  /* Bar fill % is relative to the max in the active dataset. For
     "low" direction we still normalize to max so the slowest bar
     is fullest (visually emphasizing the laggard). */
  const max = Math.max(...sorted.map((s) => s.kpis[tab.kpiKey]));

  return (
    <ul className="flex flex-col gap-1.5">
      {sorted.map((s) => {
        const value = s.kpis[tab.kpiKey];
        const pct = max === 0 ? 0 : Math.round((value / max) * 100);
        const tone = barTone(value, tab, max);
        const isSelf = s.id === MANAGER_SPECIALIST_ID;
        const isFocused = focusedSpecialistId === s.id;

        return (
          <li
            key={s.id}
            className={cn(
              "grid grid-cols-[180px_1fr_auto] items-center gap-3 rounded px-2 py-1.5 transition-all",
              isFocused && "ring-2 ring-lime ring-inset",
            )}
          >
            {/* Name + avatar */}
            <div className="flex min-w-0 items-center gap-2">
              <MgrAvatar
                slot={s.avatarSlot}
                initials={s.initials}
                fullName={s.fullName}
                size="sm"
              />
              <span className="text-ink-soft truncate text-[12.5px] font-medium">
                {isSelf ? s.firstName : s.fullName}
                {isSelf ? (
                  <span className="bg-lime text-ink ml-1 rounded-[3px] px-1.5 py-px font-mono text-[8.5px] font-semibold tracking-[0.08em] uppercase">
                    You
                  </span>
                ) : null}
              </span>
            </div>

            {/* Bar */}
            <div className="bg-cream-deep relative h-2 overflow-hidden rounded-full">
              <div
                className={cn("h-full rounded-full transition-all", BAR_FILL[tone])}
                style={{ width: `${pct}%` }}
              />
            </div>

            {/* Value pill */}
            <span
              className={cn(
                "font-display w-12 text-right text-[13px] font-semibold",
                VALUE_TONE[tone],
              )}
            >
              {value}
              {tab.unit}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/* ============================================================
   Bar tone helpers
   ============================================================ */

type BarTone = "lime" | "success" | "neutral" | "warn" | "danger";

const BAR_FILL: Record<BarTone, string> = {
  lime: "bg-lime",
  success: "bg-success",
  neutral: "bg-ink-soft",
  warn: "bg-amber",
  danger: "bg-danger",
};

const VALUE_TONE: Record<BarTone, string> = {
  lime: "text-ink",
  success: "text-success",
  neutral: "text-ink",
  warn: "text-amber",
  danger: "text-danger",
};

/** Tone logic per metric:
 *   - Reviews / Hires / Sourcing / SLA (higher = better):
 *     top performer = success; bottom 1 if significantly lower = danger
 *   - Dispute time (lower = better):
 *     top performers = success; slowest = danger; others = neutral
 *  Implementation: simple thresholds against the max. */
function barTone(value: number, tab: TabDef, max: number): BarTone {
  if (max === 0) return "neutral";
  const pct = value / max;

  if (tab.direction === "high") {
    /* Higher is better. */
    if (pct >= 0.9) return "success";
    if (pct <= 0.3) return "danger";
    return "neutral";
  }

  /* "low" direction (Dispute time). */
  if (pct <= 0.4) return "success";   // very fast
  if (pct >= 0.85) return "danger";    // very slow
  if (pct >= 0.65) return "warn";
  return "neutral";
}
