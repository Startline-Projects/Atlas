/**
 * Team Disputes — patterns & insights (team-wide aggregates).
 *
 * Per Step 7 lock: these are 30-day historical rollups, NOT
 * derived from the 12 currently-open disputes in
 * `manager-team-disputes-data.ts`. Match the prototype's
 * "last 30 days" framing (lines 29622-29781).
 *
 * 3 sections:
 *   1. `disputeVolumePerSpecialist` — bar list (8 rows)
 *   2. `disputesByRoleCategory` — count list (8 rows)
 *   3. `avgResolutionTimePerSpecialist` — time list (7 rows)
 *
 * Specialists referenced via canonical `SpecialistId` — display
 * fields (name, country) derived at render via `getSpecialist()`.
 */

import { type SpecialistId } from "./team";

/* ============================================================
   1. Dispute volume per Specialist
   ============================================================ */

export type DisputeVolumeRow = {
  specialistId: SpecialistId;
  count: number;
  /** Bar accent: `"urgent"` for the row the insight calls out. */
  tone?: "urgent";
};

/** Ordered desc by `count`. Insight cite renders below the chart. */
export const disputeVolumePerSpecialist: ReadonlyArray<DisputeVolumeRow> = [
  { specialistId: "spec-lucas-andersen", count: 6 },
  { specialistId: "spec-yara-khalil", count: 5 },
  { specialistId: "spec-aisha-bello", count: 5 },
  { specialistId: "spec-diego-cabrera", count: 4, tone: "urgent" },
  { specialistId: "spec-mateo-vargas", count: 3 },
  { specialistId: "spec-min-jun-park", count: 2 },
  { specialistId: "spec-felipe-santos", count: 1 },
  { specialistId: "spec-naomi-adebayo", count: 1 },
];

export const disputeVolumeInsight =
  "Marketing Ops has highest volume — review Lucas's caseload allocation.";

/* ============================================================
   2. Disputes by role category
   ============================================================ */

export type RoleCategoryRow = {
  /** Display label (rendered as-is). Category names don't have a
   *  canonical id space — they're free-form across the codebase. */
  category: string;
  count: number;
};

export const disputesByRoleCategory: ReadonlyArray<RoleCategoryRow> = [
  { category: "Marketing Ops", count: 6 },
  { category: "Customer Support", count: 5 },
  { category: "Project Management", count: 5 },
  { category: "Bookkeeping", count: 4 },
  { category: "Virtual Assistants", count: 3 },
  { category: "Data Ops", count: 2 },
  { category: "Sales Development", count: 1 },
  { category: "Designers", count: 1 },
];

/* ============================================================
   3. Avg resolution time per Specialist
   ============================================================ */

export type ResolutionTimeTone = "success" | "warn" | "urgent" | "neutral";

export type AvgResolutionTimeRow = {
  specialistId: SpecialistId;
  /** Avg hours to resolve (display "22h"). */
  hours: number;
  /** "3 resolved · 100% SLA" — the muted caption. */
  caption: string;
  tone: ResolutionTimeTone;
};

export const avgResolutionTimePerSpecialist: ReadonlyArray<AvgResolutionTimeRow> = [
  { specialistId: "spec-yara-khalil", hours: 22, caption: "3 resolved · 100% SLA", tone: "success" },
  { specialistId: "spec-felipe-santos", hours: 18, caption: "1 resolved · 100% SLA", tone: "success" },
  { specialistId: "spec-mateo-vargas", hours: 28, caption: "3 resolved · 100% SLA", tone: "success" },
  { specialistId: "spec-min-jun-park", hours: 30, caption: "2 resolved · 100% SLA", tone: "success" },
  { specialistId: "spec-lucas-andersen", hours: 38, caption: "2 resolved · 100% SLA", tone: "neutral" },
  { specialistId: "spec-diego-cabrera", hours: 52, caption: "4 resolved · 75% SLA", tone: "warn" },
  { specialistId: "spec-priya-mehra", hours: 70, caption: "2 resolved · 50% SLA", tone: "urgent" },
];

export const avgResolutionInsight =
  "Priya's resolution time is 3× the team avg. Coaching opportunity.";
