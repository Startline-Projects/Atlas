/**
 * Pool Coordination — canonical pool domain.
 *
 * 10 role-category records ported from `reference/manager.html`
 * lines 30009-30289. Each category references its primary owner
 * via `primaryOwnerSpecialistId` (canonical pointer to team.ts).
 *
 * ## Single-owner rule (Step 8 Q4 lock)
 *
 * Pool category ownership is **single-owner**. Multi-specialist
 * roles (e.g. Bookkeeping has both Diego Cabrera and Olena
 * Kovalenko) attribute the category to the **primary owner** per
 * prototype. Other specialists with the same role are
 * backups/coverage and are surfaced elsewhere (Daily Activity
 * Audit for Olena's excused vacation; Specialist Detail for
 * Diego's caseload).
 *
 * Mapping today:
 *   - Bookkeeping → Diego Cabrera (Olena is coverage)
 *   - all other 9 categories → 1:1 with their lone specialist
 *
 * ## Label convention (Step 8 Q7 lock)
 *
 * Category labels derive from `getSpecialist().role` (the canonical
 * `SpecialistRole` union value in team.ts). The prototype uses
 * "Marketing Operations" on some surfaces; we always render
 * "Marketing Ops" — the canonical short form. Steps 7's patterns
 * data carries a freeform `"Data Ops"` label that mismatches the
 * canonical `"Data Operations"`; that's a pre-existing minor
 * inconsistency, NOT retroactively fixed here.
 *
 * ## Status semantics
 *
 *   - `depleted`    — liveCount < threshold (Customer Support 8/15)
 *   - `overflowing` — liveCount > target (Bookkeeping 45/25)
 *   - `strong`      — comfortably above threshold (5 cards today)
 *   - `stable`      — at/just-above threshold; flat trend
 *   - `steady`      — just above threshold; small positive trend
 *
 * `stable` and `steady` are visually similar but semantically
 * distinct in the prototype — keep both.
 *
 * ## Sprint priorities reference category IDs
 *
 * Each `SprintPriority.categoryId` MUST resolve to a real
 * `PoolCategory.id`. Step 8 Q9w verification check: orchestrator
 * renders sprint rows via `getCategory()` lookup; missing ID
 * silently drops the row (logged at render). Compile-time check
 * via `assertSprintPriorityCategoriesValid()` (called once at
 * module bottom to fail fast if a future edit drifts).
 */

import {
  type SpecialistId,
  MANAGER_SPECIALIST_ID,
  getSpecialist,
} from "./team";

/* ============================================================
   Types
   ============================================================ */

export type PoolCategoryStatus =
  | "depleted"
  | "stable"
  | "steady"
  | "strong"
  | "overflowing";

export type PoolTrend = "up" | "down" | "flat";

export type PoolCategory = {
  /** URL-safe slug — used by `?focus=` deep-link from dashboard
   *  urgent CTAs (Step 8 Q1). */
  id: string;
  /** Display label. Derived at render via `getCategoryLabel()` so
   *  the canonical SpecialistRole drives the label, not this
   *  field directly. Kept as a fallback when the owner specialist
   *  can't be resolved. */
  fallbackLabel: string;
  status: PoolCategoryStatus;
  liveCount: number;
  /** Whether `thresholdValue` is a floor ("threshold" — count
   *  should be above) or a ceiling ("target" — count should be
   *  below). Overflowing pools have `kind: "target"`. */
  thresholdKind: "threshold" | "target";
  thresholdValue: number;
  /** Single-owner per category (see file header). */
  primaryOwnerSpecialistId: SpecialistId;
  trend: PoolTrend;
  /** Signed percentage. `0` when `trend === "flat"`. */
  trendPct: number;
  activeJobs: number;
  openShortlists: number;
  /** Signed. Negative = below threshold (depleted); positive =
   *  above threshold; for overflowing, positive = over target. */
  deltaToThreshold: number;
};

export type CoordinationOpportunityTone = "urgent" | "warn" | "info";

export type CoordinationOpportunityActionTone =
  | "danger"
  | "primary"
  | "lime"
  | "neutral";

export type CoordinationOpportunity = {
  id: string;
  tone: CoordinationOpportunityTone;
  eyebrow: string;
  /** Title fragments — `emphasized: true` renders italic. */
  titleParts: ReadonlyArray<{ text: string; emphasized: boolean }>;
  /** Body parts — `kind: "strong"` renders inline bold. */
  bodyParts: ReadonlyArray<
    | { kind: "text"; value: string }
    | { kind: "strong"; value: string }
  >;
  primaryAction: { label: string; tone: CoordinationOpportunityActionTone };
  secondaryAction: { label: string };
};

export type SprintPriority = {
  rank: 1 | 2 | 3;
  categoryId: string;
  detail: string;
};

/* ============================================================
   Records — 10 categories
   ============================================================ */

export const poolCategories: ReadonlyArray<PoolCategory> = [
  /* 1 — DEPLETED · Customer Support (Aisha) */
  {
    id: "customer-support",
    fallbackLabel: "Customer Support",
    status: "depleted",
    liveCount: 8,
    thresholdKind: "threshold",
    thresholdValue: 15,
    primaryOwnerSpecialistId: "spec-aisha-bello",
    trend: "down",
    trendPct: -40,
    activeJobs: 6,
    openShortlists: 4,
    deltaToThreshold: -7,
  },

  /* 2 — OVERFLOWING · Bookkeeping (Diego — single-owner per Q4) */
  {
    id: "bookkeeping",
    fallbackLabel: "Bookkeeping",
    status: "overflowing",
    liveCount: 45,
    thresholdKind: "target",
    thresholdValue: 25,
    primaryOwnerSpecialistId: "spec-diego-cabrera",
    trend: "up",
    trendPct: 80,
    activeJobs: 1,
    openShortlists: 0,
    deltaToThreshold: 20,
  },

  /* 3 — STRONG · Marketing Ops (Lucas) */
  {
    id: "marketing-ops",
    fallbackLabel: "Marketing Ops",
    status: "strong",
    liveCount: 22,
    thresholdKind: "threshold",
    thresholdValue: 18,
    primaryOwnerSpecialistId: "spec-lucas-andersen",
    trend: "up",
    trendPct: 10,
    activeJobs: 8,
    openShortlists: 4,
    deltaToThreshold: 4,
  },

  /* 4 — STRONG · Project Management (Yara) */
  {
    id: "project-management",
    fallbackLabel: "Project Management",
    status: "strong",
    liveCount: 19,
    thresholdKind: "threshold",
    thresholdValue: 15,
    primaryOwnerSpecialistId: "spec-yara-khalil",
    trend: "up",
    trendPct: 18,
    activeJobs: 5,
    openShortlists: 2,
    deltaToThreshold: 4,
  },

  /* 5 — STABLE · Virtual Assistants (Mateo · self-card per prototype) */
  {
    id: "virtual-assistants",
    fallbackLabel: "Virtual Assistants",
    status: "stable",
    liveCount: 18,
    thresholdKind: "threshold",
    thresholdValue: 15,
    primaryOwnerSpecialistId: MANAGER_SPECIALIST_ID,
    trend: "flat",
    trendPct: 2,
    activeJobs: 7,
    openShortlists: 3,
    deltaToThreshold: 3,
  },

  /* 6 — STRONG · Data Operations (Min-Jun) */
  {
    id: "data-operations",
    fallbackLabel: "Data Operations",
    status: "strong",
    liveCount: 17,
    thresholdKind: "threshold",
    thresholdValue: 14,
    primaryOwnerSpecialistId: "spec-min-jun-park",
    trend: "up",
    trendPct: 12,
    activeJobs: 2,
    openShortlists: 0,
    deltaToThreshold: 3,
  },

  /* 7 — STRONG · Sales Development (Felipe) */
  {
    id: "sales-development",
    fallbackLabel: "Sales Development",
    status: "strong",
    liveCount: 16,
    thresholdKind: "threshold",
    thresholdValue: 12,
    primaryOwnerSpecialistId: "spec-felipe-santos",
    trend: "up",
    trendPct: 15,
    activeJobs: 3,
    openShortlists: 1,
    deltaToThreshold: 4,
  },

  /* 8 — STRONG · Designers (Naomi) */
  {
    id: "designers",
    fallbackLabel: "Designers",
    status: "strong",
    liveCount: 15,
    thresholdKind: "threshold",
    thresholdValue: 12,
    primaryOwnerSpecialistId: "spec-naomi-adebayo",
    trend: "up",
    trendPct: 25,
    activeJobs: 4,
    openShortlists: 2,
    deltaToThreshold: 3,
  },

  /* 9 — STEADY · Tech Support (Priya) */
  {
    id: "tech-support",
    fallbackLabel: "Tech Support",
    status: "steady",
    liveCount: 14,
    thresholdKind: "threshold",
    thresholdValue: 12,
    primaryOwnerSpecialistId: "spec-priya-mehra",
    trend: "flat",
    trendPct: 0,
    activeJobs: 3,
    openShortlists: 1,
    deltaToThreshold: 2,
  },

  /* 10 — STEADY · Recruiting Coordinators (Kavi) */
  {
    id: "recruiting-coordinators",
    fallbackLabel: "Recruiting Coordinators",
    status: "steady",
    liveCount: 13,
    thresholdKind: "threshold",
    thresholdValue: 10,
    primaryOwnerSpecialistId: "spec-kavi-rajan",
    trend: "up",
    trendPct: 8,
    activeJobs: 2,
    openShortlists: 1,
    deltaToThreshold: 3,
  },
];

/* ============================================================
   Coordination opportunities (3 records — auto-detected smart
   suggestions per prototype lines 29936-29996)
   ============================================================ */

export const coordinationOpportunities: ReadonlyArray<CoordinationOpportunity> = [
  /* Opp 1 — URGENT — Redirect sprint */
  {
    id: "opp-redirect-sprint",
    tone: "urgent",
    eyebrow: "⚡ Redirect sprint",
    titleParts: [
      { text: "Move next sprint from ", emphasized: false },
      { text: "Bookkeeping", emphasized: true },
      { text: " to ", emphasized: false },
      { text: "Customer Support", emphasized: true },
    ],
    bodyParts: [
      { kind: "strong", value: "Bookkeeping" },
      { kind: "text", value: " is overflowing at " },
      { kind: "strong", value: "45 candidates" },
      { kind: "text", value: " (target 25). " },
      { kind: "strong", value: "Customer Support" },
      { kind: "text", value: " is critically depleted at " },
      { kind: "strong", value: "8" },
      { kind: "text", value: " (threshold 15). Diego has surplus capacity; Aisha is at capacity. Redirect the planned Bookkeeping sprint to fill Customer Support." },
    ],
    primaryAction: { label: "⚡ Redirect sprint", tone: "danger" },
    secondaryAction: { label: "Coordinate with team" },
  },

  /* Opp 2 — WARN — Cross-training */
  {
    id: "opp-cross-train",
    tone: "warn",
    eyebrow: "↔ Cross-training opportunity",
    titleParts: [
      { text: "Cross-train ", emphasized: false },
      { text: "VAs", emphasized: true },
      { text: " and ", emphasized: false },
      { text: "Customer Support", emphasized: true },
      { text: " Specialists", emphasized: false },
    ],
    bodyParts: [
      { kind: "strong", value: "Mateo" },
      { kind: "text", value: " (VAs, 18 candidates) and " },
      { kind: "strong", value: "Aisha" },
      { kind: "text", value: " (Customer Support, 8) have adjacent skill profiles. 9 of Mateo's candidates fit Customer Support criteria. Consider reassigning coverage or cross-training to balance the load." },
    ],
    primaryAction: { label: "Reassign coverage", tone: "primary" },
    secondaryAction: { label: "View overlap" },
  },

  /* Opp 3 — INFO — Skill demand emerging */
  {
    id: "opp-ai-demand",
    tone: "info",
    eyebrow: "↗ Skill demand emerging",
    titleParts: [
      { text: "Clients asking for ", emphasized: false },
      { text: "AI/automation specialists", emphasized: true },
      { text: " — no clear owner", emphasized: false },
    ],
    bodyParts: [
      { kind: "strong", value: "5 clients" },
      { kind: "text", value: " requested AI/automation skills in shortlist requests this month. Currently spread across Data Operations (Min-Jun), Tech Support (Priya), and Marketing Ops (Lucas). Consider promoting one Specialist to own this emerging skill." },
    ],
    primaryAction: { label: "View demand", tone: "neutral" },
    secondaryAction: { label: "Promote a Specialist" },
  },
];

/* ============================================================
   Sprint priorities (3 records)
   ============================================================ */

export const sprintPriorities: ReadonlyArray<SprintPriority> = [
  {
    rank: 1,
    categoryId: "customer-support",
    detail: "Critical depletion · need 7+ candidates · suggested 5-day sprint",
  },
  {
    rank: 2,
    categoryId: "project-management",
    detail: "Projected depletion in 3 weeks at current burn rate · proactive sprint",
  },
  {
    rank: 3,
    categoryId: "designers",
    detail: "Behance channel performing well · capitalize on momentum · 3-day sprint",
  },
];

/* ============================================================
   Lookups + display helpers
   ============================================================ */

const BY_ID: ReadonlyMap<string, PoolCategory> = new Map(
  poolCategories.map((c) => [c.id, c]),
);

/** Look up a pool category by slug. Returns undefined for unknown
 *  slugs — used by `?focus=` deep-link parsing. */
export function getCategory(id: string): PoolCategory | undefined {
  return BY_ID.get(id);
}

/** Filter helper for the totals strip. */
export function getCategoriesByStatus(
  status: PoolCategoryStatus,
): ReadonlyArray<PoolCategory> {
  return poolCategories.filter((c) => c.status === status);
}

/** Resolve the canonical display label for a category — derives
 *  from `getSpecialist().role` (per Q7 lock). Falls back to
 *  `fallbackLabel` only if owner can't be resolved. */
export function getCategoryLabel(c: PoolCategory): string {
  const owner = getSpecialist(c.primaryOwnerSpecialistId);
  return owner?.role ?? c.fallbackLabel;
}

/** Status pill copy. */
export function statusPillLabel(status: PoolCategoryStatus): string {
  switch (status) {
    case "depleted": return "● Depleted";
    case "stable": return "● Stable";
    case "steady": return "● Steady";
    case "strong": return "★ Strong";
    case "overflowing": return "▲ Overflowing";
  }
}

/** Trend arrow + sign. `flat` returns "→". */
export function trendArrow(trend: PoolTrend): string {
  switch (trend) {
    case "up": return "▲";
    case "down": return "▼";
    case "flat": return "→";
  }
}

/** Trend percentage formatter. Positive trends prefix with `+`;
 *  negative trends already carry a `-`. */
export function trendLabel(c: PoolCategory): string {
  const sign = c.trendPct > 0 ? "+" : "";
  return `${trendArrow(c.trend)} ${sign}${c.trendPct}%`;
}

/** Threshold label: "threshold 15" or "target 25". */
export function thresholdLabel(c: PoolCategory): string {
  return `${c.thresholdKind} ${c.thresholdValue}`;
}

/** Whether this category is owned by the current Manager. Single
 *  source-of-truth for the "self" card variant. */
export function isCategoryOwnedByManager(c: PoolCategory): boolean {
  return c.primaryOwnerSpecialistId === MANAGER_SPECIALIST_ID;
}

/* ============================================================
   Module-load assertion — Q9w verification check
   ============================================================ */

/** Fail-fast: every `SprintPriority.categoryId` must resolve to a
 *  real `PoolCategory.id`. Called once at module load. */
function assertSprintPriorityCategoriesValid(): void {
  for (const sp of sprintPriorities) {
    if (!BY_ID.has(sp.categoryId)) {
      throw new Error(
        `SprintPriority #${sp.rank} references unknown categoryId "${sp.categoryId}". ` +
          `Valid ids: ${[...BY_ID.keys()].join(", ")}.`,
      );
    }
  }
}

assertSprintPriorityCategoriesValid();
