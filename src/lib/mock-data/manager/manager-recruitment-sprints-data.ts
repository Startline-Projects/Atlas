/**
 * Recruitment Sprints — canonical sprint domain.
 *
 * 4 active sprint records + weekly goal + 6 historical entries +
 * channels overlap matrix + geographic overlap data. Each sprint
 * references its owner via `ownerSpecialistId` (canonical pointer
 * to team.ts) and its target pool via `categoryId` (canonical
 * pointer to `manager-pool-coordination-data.ts`).
 *
 * ## Mateo is NOT an active sprint owner
 *
 * Per prototype, none of the 4 active sprints are owned by Mateo
 * Vargas — he appears in the **history** section only (Mar 17–21
 * VAs sprint, Close outcome). The sprint card component therefore
 * has NO self-treatment logic for active sprints. If a future
 * maintainer adds Mateo as an active sprint owner, the "Message
 * Mateo" button needs to be suppressed (same convention as Step 5
 * `sd-hero.tsx` and Step 6 audit row). Sprint history rows render
 * Mateo with the "You" lime tag treatment but are non-clickable
 * per Step 9 Q4 (history-row drill-in deferred).
 *
 * ## ID conventions
 *
 *   - Sprints: `sprint-YYYY-MM-<owner-slug>-<cat-slug>` (Step 1 lock)
 *   - Categories: slug from `manager-pool-coordination-data.ts`
 *   - History entries: `sprint-hist-<seq>` (no semantic id needed)
 *
 * ## Module-load assertions (Q8 + Q9y)
 *
 * Two fail-fast checks run at import time:
 *   1. Every sprint + history entry `categoryId` resolves via
 *      `getCategory()` from pool data.
 *   2. Every `ChannelOverlap.usage` map covers exactly the 4
 *      currently-active sprint owners. Sparse coverage with
 *      explicit `"none"` is fine; missing keys would render
 *      broken cells silently.
 *
 * Verified in Q9y: deliberately rename a categoryId or omit an
 * owner from the channel matrix → build fails on next typecheck.
 */

import { type SpecialistId } from "./team";
import { getCategory } from "./manager-pool-coordination-data";

/* ============================================================
   Types
   ============================================================ */

export type SprintId = `sprint-${string}`;

export type SprintStatus = "behind" | "on-track" | "ahead";

export type SprintPaceTone = "urgent" | "success" | "neutral";

export type Sprint = {
  id: SprintId;
  status: SprintStatus;
  ownerSpecialistId: SpecialistId;
  /** Canonical pool category slug — must resolve via getCategory(). */
  categoryId: string;
  goalCount: number;
  currentCount: number;
  daysElapsed: number;
  hoursLeft: number;
  /** Channels in use for this sprint. Order matters — first channel
   *  renders as "shared" (the cross-sprint overlap) in the prototype;
   *  here we keep it simpler with all chips equal. */
  channels: ReadonlyArray<string>;
  /** Free-form pace label rendered next to its tone-tinted strong. */
  paceLabel: string;
  paceTone: SprintPaceTone;
  /** Budget — kept on the record even though Step 9 trimmed the
   *  budget allocation card (Q5). Future steps can resurface it. */
  budgetTotal: number;
  budgetSpent: number;
};

export type SprintOutcome =
  | "beat-goal"     // achieved > goal
  | "beat-much"     // achieved >> goal (e.g. 2.5×)
  | "goal-met"      // achieved == goal
  | "partial"       // close to goal but missed (e.g. 7/8)
  | "missed";       // significantly short

export type SprintHistoryEntry = {
  id: string;
  /** "Apr 21–25" — preserved as the prototype's rendered date label. */
  dateLabel: string;
  ownerSpecialistId: SpecialistId;
  categoryId: string;
  goalCount: number;
  achievedCount: number;
  durationDays: number;
  channels: ReadonlyArray<string>;
  outcome: SprintOutcome;
  /** Override the auto-derived outcome label (e.g. "★ Beat 2.5×"). */
  outcomeLabelOverride?: string;
};

export type WeeklyGoal = {
  candidateTarget: number;
  candidatesSoFar: number;
  daysRemaining: number;
  /** "5 days remaining · 3 categories on pace". */
  paceSummary: string;
};

export type ChannelOverlapIntensity = "heavy" | "using" | "none";

export type ChannelOverlap = {
  channel: string;
  /** Record keyed by SpecialistId. Q8 lock: must cover EXACTLY the
   *  active sprint owners (see assertion at module bottom). */
  usage: Record<SpecialistId, ChannelOverlapIntensity>;
};

export type GeoOverlap = {
  region: string;
  detail: string;
  tone: "conflict" | "ok";
};

/* ============================================================
   Weekly goal (header banner)
   ============================================================ */

export const weeklyGoal: WeeklyGoal = {
  candidateTarget: 30,
  candidatesSoFar: 21,
  daysRemaining: 5,
  paceSummary: "5 days remaining · 3 categories on pace",
};

/* ============================================================
   4 active sprints
   ============================================================ */

export const activeSprints: ReadonlyArray<Sprint> = [
  /* Sprint 1 — Aisha · Customer Support · BEHIND */
  {
    id: "sprint-2026-04-aisha-cs",
    status: "behind",
    ownerSpecialistId: "spec-aisha-bello",
    categoryId: "customer-support",
    goalCount: 12,
    currentCount: 4,
    daysElapsed: 3,
    hoursLeft: 4 * 24 + 6, // 4d 6h
    channels: ["LinkedIn", "FB groups", "Referrals"],
    paceLabel: "2/day",
    paceTone: "urgent",
    budgetTotal: 750,
    budgetSpent: 690,
  },

  /* Sprint 2 — Yara · Project Management · ON TRACK */
  {
    id: "sprint-2026-04-yara-pm",
    status: "on-track",
    ownerSpecialistId: "spec-yara-khalil",
    categoryId: "project-management",
    goalCount: 8,
    currentCount: 5,
    daysElapsed: 4,
    hoursLeft: 3 * 24 + 12, // 3d 12h
    channels: ["LinkedIn", "Cold email", "Referrals"],
    paceLabel: "1/day · on pace",
    paceTone: "success",
    budgetTotal: 600,
    budgetSpent: 340,
  },

  /* Sprint 3 — Naomi · Designers · AHEAD */
  {
    id: "sprint-2026-04-naomi-design",
    status: "ahead",
    ownerSpecialistId: "spec-naomi-adebayo",
    categoryId: "designers",
    goalCount: 6,
    currentCount: 7,
    daysElapsed: 5,
    hoursLeft: 2 * 24 + 4, // 2d 4h
    channels: ["Behance", "Dribbble", "LinkedIn"],
    paceLabel: "1.5/day · ahead",
    paceTone: "success",
    budgetTotal: 450,
    budgetSpent: 170,
  },

  /* Sprint 4 — Lucas · Marketing Ops · BEHIND */
  {
    id: "sprint-2026-04-lucas-mktops",
    status: "behind",
    ownerSpecialistId: "spec-lucas-andersen",
    categoryId: "marketing-ops",
    goalCount: 10,
    currentCount: 5,
    daysElapsed: 2,
    hoursLeft: 5 * 24 + 8, // 5d 8h
    channels: ["Cold email", "LinkedIn"],
    paceLabel: "1/day",
    paceTone: "urgent",
    budgetTotal: 600,
    budgetSpent: 200,
  },
];

/* ============================================================
   6 historical entries (last 8 weeks)
   ============================================================ */

export const sprintHistory: ReadonlyArray<SprintHistoryEntry> = [
  /* Most recent first per Q4 lock. */
  {
    id: "sprint-hist-1",
    dateLabel: "Apr 21–25",
    ownerSpecialistId: "spec-min-jun-park",
    categoryId: "data-operations",
    goalCount: 8,
    achievedCount: 9,
    durationDays: 5,
    channels: ["LinkedIn", "Referrals"],
    outcome: "beat-goal",
  },
  {
    id: "sprint-hist-2",
    dateLabel: "Apr 14–18",
    ownerSpecialistId: "spec-felipe-santos",
    categoryId: "sales-development",
    goalCount: 10,
    achievedCount: 10,
    durationDays: 5,
    channels: ["LinkedIn", "Cold email"],
    outcome: "goal-met",
  },
  {
    id: "sprint-hist-3",
    dateLabel: "Apr 7–11",
    ownerSpecialistId: "spec-diego-cabrera",
    categoryId: "bookkeeping",
    goalCount: 6,
    achievedCount: 15,
    durationDays: 5,
    channels: ["Referrals", "Cold email"],
    outcome: "beat-much",
    outcomeLabelOverride: "★ Beat 2.5×",
  },
  {
    id: "sprint-hist-4",
    dateLabel: "Mar 31–Apr 4",
    ownerSpecialistId: "spec-priya-mehra",
    categoryId: "tech-support",
    goalCount: 8,
    achievedCount: 5,
    durationDays: 5,
    channels: ["LinkedIn", "FB groups"],
    outcome: "missed",
  },
  {
    id: "sprint-hist-5",
    dateLabel: "Mar 24–28",
    ownerSpecialistId: "spec-kavi-rajan",
    categoryId: "recruiting-coordinators",
    goalCount: 6,
    achievedCount: 6,
    durationDays: 5,
    channels: ["LinkedIn", "Cold email"],
    outcome: "goal-met",
  },
  {
    id: "sprint-hist-6",
    dateLabel: "Mar 17–21",
    ownerSpecialistId: "spec-mateo-vargas",
    categoryId: "virtual-assistants",
    goalCount: 8,
    achievedCount: 7,
    durationDays: 5,
    channels: ["LinkedIn", "Referrals"],
    outcome: "partial",
  },
];

export const sprintHistoryInsight =
  "Referral-heavy sprints (Diego, Min-Jun) outperform. LinkedIn-only sprints (Priya) underperform. Consider mandating mixed-channel approach for next month's sprints.";

/* ============================================================
   Cross-sprint coordination — channels overlap matrix
   ============================================================ */

/** The 4 active sprint owners — used by both the matrix render
 *  AND the module-load assertion below. Derived from `activeSprints`
 *  but extracted to a const so the matrix data can statically
 *  reference the right keys. Update this list in lockstep with
 *  `activeSprints` if a sprint owner changes. */
const ACTIVE_SPRINT_OWNERS: ReadonlyArray<SpecialistId> = [
  "spec-aisha-bello",
  "spec-yara-khalil",
  "spec-naomi-adebayo",
  "spec-lucas-andersen",
];

export const channelOverlapMatrix: ReadonlyArray<ChannelOverlap> = [
  {
    channel: "LinkedIn",
    usage: {
      "spec-aisha-bello": "heavy",
      "spec-yara-khalil": "heavy",
      "spec-naomi-adebayo": "using",
      "spec-lucas-andersen": "heavy",
      /* Specialists not in active sprints — explicit "none" */
      "spec-mateo-vargas": "none",
      "spec-priya-mehra": "none",
      "spec-diego-cabrera": "none",
      "spec-felipe-santos": "none",
      "spec-min-jun-park": "none",
      "spec-olena-kovalenko": "none",
      "spec-kavi-rajan": "none",
    },
  },
  {
    channel: "Cold email",
    usage: {
      "spec-aisha-bello": "none",
      "spec-yara-khalil": "using",
      "spec-naomi-adebayo": "none",
      "spec-lucas-andersen": "using",
      "spec-mateo-vargas": "none",
      "spec-priya-mehra": "none",
      "spec-diego-cabrera": "none",
      "spec-felipe-santos": "none",
      "spec-min-jun-park": "none",
      "spec-olena-kovalenko": "none",
      "spec-kavi-rajan": "none",
    },
  },
  {
    channel: "Referrals",
    usage: {
      "spec-aisha-bello": "using",
      "spec-yara-khalil": "using",
      "spec-naomi-adebayo": "none",
      "spec-lucas-andersen": "none",
      "spec-mateo-vargas": "none",
      "spec-priya-mehra": "none",
      "spec-diego-cabrera": "none",
      "spec-felipe-santos": "none",
      "spec-min-jun-park": "none",
      "spec-olena-kovalenko": "none",
      "spec-kavi-rajan": "none",
    },
  },
  {
    channel: "Behance",
    usage: {
      "spec-aisha-bello": "none",
      "spec-yara-khalil": "none",
      "spec-naomi-adebayo": "using",
      "spec-lucas-andersen": "none",
      "spec-mateo-vargas": "none",
      "spec-priya-mehra": "none",
      "spec-diego-cabrera": "none",
      "spec-felipe-santos": "none",
      "spec-min-jun-park": "none",
      "spec-olena-kovalenko": "none",
      "spec-kavi-rajan": "none",
    },
  },
  {
    channel: "Dribbble",
    usage: {
      "spec-aisha-bello": "none",
      "spec-yara-khalil": "none",
      "spec-naomi-adebayo": "using",
      "spec-lucas-andersen": "none",
      "spec-mateo-vargas": "none",
      "spec-priya-mehra": "none",
      "spec-diego-cabrera": "none",
      "spec-felipe-santos": "none",
      "spec-min-jun-park": "none",
      "spec-olena-kovalenko": "none",
      "spec-kavi-rajan": "none",
    },
  },
  {
    channel: "FB groups",
    usage: {
      "spec-aisha-bello": "using",
      "spec-yara-khalil": "none",
      "spec-naomi-adebayo": "none",
      "spec-lucas-andersen": "none",
      "spec-mateo-vargas": "none",
      "spec-priya-mehra": "none",
      "spec-diego-cabrera": "none",
      "spec-felipe-santos": "none",
      "spec-min-jun-park": "none",
      "spec-olena-kovalenko": "none",
      "spec-kavi-rajan": "none",
    },
  },
];

export const channelOverlapInsight =
  "3 sprints heavy on LinkedIn. Consider staggering message volume to avoid same-prospect saturation.";

/** Active sprint owners — exposed for the matrix render so the
 *  component only iterates the relevant columns. */
export function getActiveSprintOwners(): ReadonlyArray<SpecialistId> {
  return ACTIVE_SPRINT_OWNERS;
}

/* ============================================================
   Cross-sprint coordination — geographic overlap
   ============================================================ */

export const geographicOverlap: ReadonlyArray<GeoOverlap> = [
  {
    region: "LATAM",
    detail:
      "Aisha (Customer Support) & Lucas (Marketing Ops) sourcing in same region",
    tone: "conflict",
  },
  {
    region: "SE Asia",
    detail: "Yara only · no conflict",
    tone: "ok",
  },
  {
    region: "Africa",
    detail: "Naomi (Designers) only",
    tone: "ok",
  },
  {
    region: "EMEA",
    detail: "Lucas only · expanding reach",
    tone: "ok",
  },
];

export const geographicOverlapInsight =
  "Coordinate LATAM messaging between Aisha & Lucas — could double-touch same prospects.";

/* ============================================================
   Lookups + display helpers
   ============================================================ */

const SPRINT_BY_ID: ReadonlyMap<SprintId, Sprint> = new Map(
  activeSprints.map((s) => [s.id, s]),
);

const SPRINT_BY_CATEGORY: ReadonlyMap<string, Sprint> = new Map(
  activeSprints.map((s) => [s.categoryId, s]),
);

export function getSprint(id: SprintId): Sprint | undefined {
  return SPRINT_BY_ID.get(id);
}

/** Used by `?launch=<category-id>` deep-link parsing. Returns the
 *  active sprint for the given category, or undefined if no
 *  active sprint exists (silent no-op per Q3). */
export function findSprintByCategoryId(categoryId: string): Sprint | undefined {
  return SPRINT_BY_CATEGORY.get(categoryId);
}

/** Status label for pill rendering. */
export function sprintStatusLabel(status: SprintStatus): string {
  switch (status) {
    case "behind": return "● Behind";
    case "on-track": return "● On track";
    case "ahead": return "★ Ahead";
  }
}

/** Progress percentage — capped at 999% for paranoia, displayed
 *  as integer. Ahead sprints can exceed 100% (Naomi 117%). */
export function progressPercent(s: Sprint): number {
  return Math.min(999, Math.round((s.currentCount / s.goalCount) * 100));
}

/** Auto-derived outcome label — supports override. */
export function outcomeLabel(entry: SprintHistoryEntry): string {
  if (entry.outcomeLabelOverride) return entry.outcomeLabelOverride;
  switch (entry.outcome) {
    case "beat-goal": return "★ Beat goal";
    case "beat-much": return "★ Beat goal";
    case "goal-met": return "★ Goal met";
    case "partial": return "Close";
    case "missed": return "Missed";
  }
}

export type SprintOutcomeTone = "win" | "partial" | "miss";

export function outcomeTone(outcome: SprintOutcome): SprintOutcomeTone {
  switch (outcome) {
    case "beat-goal":
    case "beat-much":
    case "goal-met":
      return "win";
    case "partial":
      return "partial";
    case "missed":
      return "miss";
  }
}

/* ============================================================
   Module-load assertions (Q8 + Q9y safety net)
   ============================================================ */

function assertSprintCategoriesValid(): void {
  /* Active sprints */
  for (const s of activeSprints) {
    if (!getCategory(s.categoryId)) {
      throw new Error(
        `Sprint ${s.id} references unknown categoryId "${s.categoryId}". ` +
          `Check manager-pool-coordination-data.ts.`,
      );
    }
  }
  /* History entries */
  for (const h of sprintHistory) {
    if (!getCategory(h.categoryId)) {
      throw new Error(
        `SprintHistoryEntry ${h.id} references unknown categoryId "${h.categoryId}". ` +
          `Check manager-pool-coordination-data.ts.`,
      );
    }
  }
}

function assertChannelMatrixComplete(): void {
  for (const overlap of channelOverlapMatrix) {
    for (const owner of ACTIVE_SPRINT_OWNERS) {
      if (!(owner in overlap.usage)) {
        throw new Error(
          `ChannelOverlap for "${overlap.channel}" is missing usage entry for active sprint owner "${owner}". ` +
            `Sparse coverage with explicit "none" is required to avoid silent broken cells.`,
        );
      }
    }
  }
}

assertSprintCategoriesValid();
assertChannelMatrixComplete();
