/**
 * Manager dashboard — "Team performance · This week · vs last" tiles.
 *
 * 6 metrics ported from `reference/manager.html` lines 19857-19914.
 * Canonical numbers; Step 10 (Team Reports) consumes the same source.
 */

export type TrendDirection = "up" | "down" | "flat";

export type ManagerTeamPerfMetric = {
  id: string;
  label: string;
  /** Primary value rendered as the big number. Optional unit suffix
   *  (% / /10 etc.) rendered in muted style. */
  value: { number: number; unit?: string };
  /** Trend caption — number is "+9%" / "-3%" / "0%" / "1" depending. */
  trend: {
    direction: TrendDirection;
    /** Pre-formatted delta string ("9%", "-1", etc.). */
    delta: string;
  };
};

export const managerTeamPerfMetrics: ReadonlyArray<ManagerTeamPerfMetric> = [
  {
    id: "perf-reviews",
    label: "Reviews · team",
    value: { number: 214 },
    trend: { direction: "up", delta: "9%" },
  },
  {
    id: "perf-disputes-resolved",
    label: "Disputes resolved",
    value: { number: 28 },
    trend: { direction: "up", delta: "12%" },
  },
  {
    id: "perf-sla",
    label: "Team SLA hit rate",
    value: { number: 91, unit: "%" },
    trend: { direction: "down", delta: "3%" },
  },
  {
    id: "perf-hires",
    label: "Hires this month",
    value: { number: 19 },
    trend: { direction: "up", delta: "15%" },
  },
  {
    id: "perf-daily",
    label: "Daily activity rate",
    value: { number: 94, unit: "%" },
    trend: { direction: "flat", delta: "0%" },
  },
  {
    id: "perf-pool",
    label: "Pool stability",
    value: { number: 9, unit: "/10" },
    trend: { direction: "down", delta: "1" },
  },
];
