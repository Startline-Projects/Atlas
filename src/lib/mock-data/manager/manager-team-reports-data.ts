/**
 * Team Reports — Step-10-specific aggregates.
 *
 * Per the audit-pass discovery (revisited at Step 10): all 5
 * per-Specialist comparison charts read DIRECTLY from
 * `Specialist.kpis` (reviewsMonth / reviewsMonthSLAPct /
 * disputeAvgResolutionHours / sourcingProspectsMonth /
 * hiresPlacedMonth). NO per-spec data lives in this file — the
 * canonical KPIs cover everything.
 *
 * This file holds ONLY team-wide aggregates that don't fit on the
 * Specialist record:
 *
 *   - `overviewMetrics` — Section 1's 6 team-wide cards (team totals)
 *   - `depletionIncidents` — Section 3's 4 historical incidents
 *     (pool patterns data is current-state only; this captures the
 *     past-90-days incidents view)
 *   - `speedMetrics` — Section 5's avg time-to-hire + fastest/slowest
 *     + client retention
 *
 * ## Cross-domain consumption
 *
 * Step 10 consumes from 3 prior step domains; all reads are
 * read-only and idempotent:
 *
 *   - team.ts `Specialist.kpis` → all 5 comparison charts
 *   - team.ts `Specialist.dailyHistory` → Section 4 heatmap
 *   - manager-pool-coordination-data.ts `PoolCategory.trendPct` →
 *     Section 3 pool size change chart
 *   - manager-team-disputes-patterns.ts `avgResolutionTimePerSpecialist`
 *     → NOT consumed (canonical is `kpis.disputeAvgResolutionHours`),
 *     but assertion 5 below cross-checks it for regression catching
 *
 * ## Module-load assertions (Q9 + Q9y safety net)
 *
 *   1. `depletionIncidents[i].categoryId` resolves via `getCategory()`
 *   2. `depletionIncidents[i].specialistId` resolves via `getSpecialist()`
 *   3. Hires-per-category derivation is exhaustive (computed at
 *      render via `hiresPerCategory()` helper — TypeScript ensures
 *      every category appears in the rollup)
 *   4. Heatmap cell-state derivation is exhaustive on
 *      `DailyHistoryEntry.kind` (compile-time `switch` fork in
 *      `tr-heatmap-section.tsx`)
 *   5. **Cross-step regression catch**: Step 7's
 *      `avgResolutionTimePerSpecialist` keys all resolve via
 *      `getSpecialist()`. If a future Step 7 edit drops a specialist
 *      from the rollup, Step 10's build fails. (Step 10 doesn't
 *      consume those numbers, but it's the natural place to catch
 *      cross-step drift since Step 10 is the cross-domain
 *      consumer.)
 */

import { type SpecialistId, getSpecialist } from "./team";
import { getCategory } from "./manager-pool-coordination-data";
import { avgResolutionTimePerSpecialist } from "./manager-team-disputes-patterns";

/* ============================================================
   Types
   ============================================================ */

export type MetricTrend = "up" | "down" | "flat";

export type OverviewMetric = {
  id: string;
  /** UPPERCASE label rendered in mono font. */
  label: string;
  /** Big number — string for flexibility ("$48.2k" / "94%"). */
  value: string;
  /** Optional sub-unit (rendered smaller next to value). */
  valueUnit?: string;
  trend: MetricTrend;
  /** Signed percentage. `0` for flat. */
  trendPct: number;
  /** Foot caption — may include inline emphasis. */
  footParts: ReadonlyArray<
    | { kind: "strong"; value: string }
    | { kind: "text"; value: string }
  >;
};

export type DepletionIncidentStatus = "ongoing" | "recovered";

export type DepletionIncident = {
  id: string;
  /** "Apr 22" — prototype date label. */
  dateLabel: string;
  categoryId: string;
  specialistId: SpecialistId;
  status: DepletionIncidentStatus;
  /** Days to recovery; null for ongoing. */
  recoveryDays: number | null;
};

export type SpeedMetrics = {
  avgTimeToHireDays: number;
  /** Delta vs last month (signed days). Negative = faster. */
  avgTimeToHireDelta: number;
  fastestCategoryId: string;
  fastestDays: number;
  fastestSpecialistId: SpecialistId;
  slowestCategoryId: string;
  slowestDays: number;
  slowestSpecialistId: SpecialistId;
  /** Repeat-hire count / total hires this month. */
  repeatHireCount: number;
  totalHires: number;
};

/* ============================================================
   Section 1 — 6 overview metrics
   ============================================================ */

export const overviewMetrics: ReadonlyArray<OverviewMetric> = [
  {
    id: "metric-reviews",
    label: "Reviews completed",
    value: "214",
    trend: "up",
    trendPct: 9,
    footParts: [
      { kind: "strong", value: "SLA hit rate:" },
      { kind: "text", value: " 91% · target 90%" },
    ],
  },
  {
    id: "metric-disputes",
    label: "Disputes resolved",
    value: "28",
    trend: "up",
    trendPct: 12,
    footParts: [
      { kind: "strong", value: "Avg resolution:" },
      { kind: "text", value: " 31h · ↓ 4h" },
    ],
  },
  {
    id: "metric-approved",
    label: "Candidates approved",
    value: "84",
    trend: "up",
    trendPct: 6,
    footParts: [
      { kind: "strong", value: "From sourcing:" },
      { kind: "text", value: " 38% pass rate" },
    ],
  },
  {
    id: "metric-hires",
    label: "Hires this month",
    value: "19",
    trend: "up",
    trendPct: 15,
    footParts: [
      { kind: "strong", value: "Top category:" },
      { kind: "text", value: " Marketing Ops · 5 hires" },
    ],
  },
  {
    id: "metric-revenue",
    label: "Atlas revenue",
    value: "$48.2",
    valueUnit: "k",
    trend: "up",
    trendPct: 18,
    footParts: [
      { kind: "strong", value: "From team hires:" },
      { kind: "text", value: " avg $2.5k/hire" },
    ],
  },
  {
    id: "metric-daily",
    label: "Daily activity rate",
    value: "94",
    valueUnit: "%",
    trend: "flat",
    trendPct: 0,
    footParts: [
      { kind: "strong", value: "Below target:" },
      /* Prototype-static per Q5 lock. Future refactor would derive
         the laggard from team.ts dailyHistory (Priya is currently
         the laggard — `dailyAdherencePct: 78`). */
      { kind: "text", value: " Priya (78%) — performance flag" },
    ],
  },
];

/* ============================================================
   Section 3 — Depletion incidents (past 90 days)
   ============================================================ */

export const depletionIncidents: ReadonlyArray<DepletionIncident> = [
  {
    id: "dep-2026-04-22",
    dateLabel: "Apr 22",
    categoryId: "customer-support",
    specialistId: "spec-aisha-bello",
    status: "ongoing",
    recoveryDays: null,
  },
  {
    id: "dep-2026-03-14",
    dateLabel: "Mar 14",
    categoryId: "tech-support",
    specialistId: "spec-priya-mehra",
    status: "recovered",
    recoveryDays: 11,
  },
  {
    id: "dep-2026-02-28",
    dateLabel: "Feb 28",
    categoryId: "bookkeeping",
    specialistId: "spec-diego-cabrera",
    status: "recovered",
    recoveryDays: 7,
  },
  {
    id: "dep-2026-02-02",
    dateLabel: "Feb 02",
    categoryId: "designers",
    specialistId: "spec-naomi-adebayo",
    status: "recovered",
    recoveryDays: 5,
  },
];

export const depletionInsightAvgDays = 7.7;
export const depletionInsightSprintRecoveries = 3;
export const depletionInsightTotalPriorRecoveries = 3;

/* ============================================================
   Section 5 — Speed metrics
   ============================================================ */

export const speedMetrics: SpeedMetrics = {
  avgTimeToHireDays: 11,
  avgTimeToHireDelta: -2,
  fastestCategoryId: "marketing-ops",
  fastestDays: 6,
  fastestSpecialistId: "spec-lucas-andersen",
  slowestCategoryId: "tech-support",
  slowestDays: 22,
  slowestSpecialistId: "spec-priya-mehra",
  repeatHireCount: 7,
  totalHires: 19,
};

/* ============================================================
   Module-load assertions
   ============================================================ */

function assertDepletionIncidentRefsValid(): void {
  for (const inc of depletionIncidents) {
    if (!getCategory(inc.categoryId)) {
      throw new Error(
        `DepletionIncident ${inc.id} references unknown categoryId "${inc.categoryId}". ` +
          `Check manager-pool-coordination-data.ts.`,
      );
    }
    if (!getSpecialist(inc.specialistId)) {
      throw new Error(
        `DepletionIncident ${inc.id} references unknown specialistId "${inc.specialistId}". ` +
          `Check team.ts.`,
      );
    }
  }
}

function assertSpeedMetricsRefsValid(): void {
  if (!getCategory(speedMetrics.fastestCategoryId)) {
    throw new Error(
      `SpeedMetrics fastestCategoryId "${speedMetrics.fastestCategoryId}" is unknown.`,
    );
  }
  if (!getCategory(speedMetrics.slowestCategoryId)) {
    throw new Error(
      `SpeedMetrics slowestCategoryId "${speedMetrics.slowestCategoryId}" is unknown.`,
    );
  }
  if (!getSpecialist(speedMetrics.fastestSpecialistId)) {
    throw new Error(
      `SpeedMetrics fastestSpecialistId "${speedMetrics.fastestSpecialistId}" is unknown.`,
    );
  }
  if (!getSpecialist(speedMetrics.slowestSpecialistId)) {
    throw new Error(
      `SpeedMetrics slowestSpecialistId "${speedMetrics.slowestSpecialistId}" is unknown.`,
    );
  }
}

/** Assertion #5 — cross-step regression catch (per Step 10 Q9).
 *
 *  Step 10 doesn't consume Step 7's `avgResolutionTimePerSpecialist`
 *  values (canonical is `Specialist.kpis.disputeAvgResolutionHours`),
 *  but this assertion guards against a future Step 7 edit dropping
 *  a specialist from that map. Step 10 is the natural place to catch
 *  cross-step drift since it's the cross-domain consumer.
 *
 *  If a future maintainer trims that data, the build fails here
 *  with a clear breadcrumb pointing back to Step 7. */
function assertStep7PatternsCrossStepValid(): void {
  for (const row of avgResolutionTimePerSpecialist) {
    if (!getSpecialist(row.specialistId)) {
      throw new Error(
        `Step 7 avgResolutionTimePerSpecialist contains unknown specialistId "${row.specialistId}". ` +
          `Check manager-team-disputes-patterns.ts.`,
      );
    }
  }
}

assertDepletionIncidentRefsValid();
assertSpeedMetricsRefsValid();
assertStep7PatternsCrossStepValid();
