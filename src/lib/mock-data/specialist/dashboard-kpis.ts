/**
 * Specialist dashboard KPIs.
 *
 * Two-layer model:
 *   1. `quickStats` — the three pills next to the greeting (HTML
 *      <div class="dash-quick-stats">, line 14161+).
 *   2. `snapshot` — the broader "Today's snapshot" panel from spec PDF
 *      §"Today's snapshot panel". The HTML doesn't render every snapshot
 *      field as its own tile; we keep all fields here so the snapshot
 *      component can pick what it needs.
 *
 * Pool depletion threshold (15) and dispute SLA (72h) both come from the
 * spec; encoded as named constants so future code uses one source.
 */

import type { PoolStatus } from "./current-user";

export const POOL_DEPLETION_THRESHOLD = 15;
export const DISPUTE_SLA_HOURS = 72;

export type DailySubmissionStatus = "Submitted" | "Pending";

export type SystemStatus = {
  level: "ok" | "issue";
  label: string;
};

/** Three pills on the right side of the dashboard greeting row. */
export type QuickStat = {
  key: "in-queue" | "disputes" | "week-reviews";
  label: string;
  value: number;
  /** Colors the value text — `attn` = amber, `urgent` = red, undefined = ink. */
  tone?: "attn" | "urgent";
};

export const quickStats: ReadonlyArray<QuickStat> = [
  { key: "in-queue", label: "In queue", value: 3, tone: "attn" },
  { key: "disputes", label: "Disputes", value: 1, tone: "urgent" },
  { key: "week-reviews", label: "Reviews · wk", value: 17 },
];

/** Atlas system status indicator next to the date. */
export const systemStatus: SystemStatus = {
  level: "ok",
  label: "All systems normal",
};

/** Today's snapshot panel (spec). Exhaustive — UI picks what to surface. */
export type DashboardSnapshot = {
  reviewQueue: { count: number; avgWaitHours: number };
  disputes: { open: number; oldestWaitingHours: number };
  myCandidates: { live: number; pendingAction: number; onCallNow: number };
  sourcingRequests: number;
  poolHealth: PoolStatus;
  poolLiveCount: number;
  dailySubmission: DailySubmissionStatus;
};

export const snapshot: DashboardSnapshot = {
  reviewQueue: { count: 3, avgWaitHours: 14 },
  disputes: { open: 1, oldestWaitingHours: 58 },
  myCandidates: { live: 47, pendingAction: 8, onCallNow: 2 },
  sourcingRequests: 2,
  poolHealth: "Stable",
  poolLiveCount: 18,
  dailySubmission: "Pending",
};

/** Performance snapshot card (spec §"Performance snapshot"). */
export type PerformanceMetrics = {
  reviewsToday: number;
  reviewsWeek: number;
  disputesResolvedToday: number;
  disputesResolvedWeek: number;
  /** Average review duration in minutes. */
  avgReviewMinutes: number;
  /** Percent of disputes resolved within 72h SLA. 0–100. */
  disputeSlaHitRate: number;
  candidatesApprovedMonth: number;
  /** % of candidates this specialist approved who are still active in pool. */
  sourcingActivePercent: number;
};

export const performance: PerformanceMetrics = {
  reviewsToday: 4,
  reviewsWeek: 17,
  disputesResolvedToday: 1,
  disputesResolvedWeek: 3,
  avgReviewMinutes: 38,
  disputeSlaHitRate: 96,
  candidatesApprovedMonth: 22,
  sourcingActivePercent: 81,
};
