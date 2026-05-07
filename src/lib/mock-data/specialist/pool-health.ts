/**
 * Mock data for `/specialist/pool-health` — strategic dashboard.
 *
 * Full snapshot for the specialist's category (Virtual Assistants per
 * `current-user.ts`). The HTML's hero scorecard reports 47 live talents,
 * 82/100 score, top quartile. The 12-col grid covers capacity, utilization,
 * quality, tier composition, geography, churn risk, skill×tier matrix,
 * and a recommended-actions list.
 *
 * Cross-session ID strategy:
 *   - 3 of the 5 churn-risk entries are existing `cand-*` ids from
 *     Session 3 (Sofia, Mei, Aaliyah).
 *   - 2 are pool-only references (Kofi Mensah, Vikram Mehta) — the
 *     specialist manages 47 talents but Session 3 only modeled 13;
 *     the others appear in pool-health without back-references.
 *     `PoolCandidateRef.isCrossRef` flags which side a row sits on.
 *   - Skill×tier matrix is purely numeric — no candidate references.
 *
 * Constants migration:
 *   - `POOL_DEPLETION_THRESHOLD = 15` — first defined in Session 1's
 *     `current-user.ts` migration note. Re-exported here as the canonical
 *     home (this file is the actual pool-health domain). When services
 *     land, this constant moves to `lib/config/constants.ts` per the
 *     standing migration pattern.
 */

import type { AvatarGradientKey } from "./queue-types";

/* ============================================================
   Constants — business rules
   ============================================================ */

/**
 * Pool size below which the recruitment-sprint mode auto-activates.
 * Source: PDF Step 9 §"Recruitment sprint mode (when pool depletion
 * alert fires)" + PDF Step 10 §"Active Candidates: [X] (threshold 15)".
 *
 * **Migration target:** `lib/config/constants.ts` when the Specialist
 * service slice is built (same pattern as `DISPUTE_SLA_HOURS` and
 * `REVIEW_SLA_HOURS`). The recruitment-sprint UI is not built this
 * session — the constant gates a future view.
 */
export const POOL_DEPLETION_THRESHOLD = 15;

/* ============================================================
   Score / grade
   ============================================================ */

/** Pool health grade — drives the hero pill color + recommendation tone. */
export type PoolHealthGrade =
  | "thriving"
  | "healthy"
  | "stable"
  | "at-risk"
  | "depleted";

/** Per-segment tone in the 10-segment score bar. */
export type ScoreSegmentTone = "filled" | "amber" | "danger" | "empty";

/** Single delta row under the scorecard ("+4 points vs last month"). */
export type PoolHealthDelta = {
  label: string;
  /** "+4 points" / "+12 points" / "you're +4". */
  value: string;
  tone: "up" | "down" | "flat";
};

/* ============================================================
   Capacity / utilization / quality tiles
   ============================================================ */

/**
 * Sparkline series — points are 0-100 normalized values for the SVG path.
 * The component computes the path string at render time.
 */
export type Sparkline = {
  /** Big-number label (e.g. "47 talents", "4.7"). */
  bignum: string;
  /** Optional italic suffix ("/5", "%"). */
  bignumEm?: string;
  /** Sub-caption under the bignum. */
  caption: string;
  /** 12 normalized values (0-100). */
  points: ReadonlyArray<number>;
  /** Stroke tone — drives the fill+line color. */
  tone: "success" | "lime" | "amber" | "danger";
};

/** Donut segment for the utilization tile. */
export type UtilizationLegendRow = {
  label: string;
  value: string;
  tone: "active" | "partial" | "available";
};

export type Utilization = {
  /** Center-of-donut percentage (0-100). */
  centerPct: number;
  centerCaption: string;
  legend: ReadonlyArray<UtilizationLegendRow>;
};

/* ============================================================
   Tier composition (3-segment stacked bar + list)
   ============================================================ */

export type TierKey = "elite" | "vetted" | "standard";

export type TierComposition = {
  tier: TierKey;
  label: string;
  count: number;
  /** Pre-computed percentage for the bar segment width (0-100). */
  pct: number;
  /** Pre-formatted label string ("13%"). */
  pctLabel: string;
};

/* ============================================================
   Geographic distribution (barlist with --w)
   ============================================================ */

export type GeographicRow = {
  countryFlag: string;
  countryName: string;
  count: number;
  /** Bar width 0-100 (relative to the largest row). */
  widthPct: number;
};

/* ============================================================
   Churn risk (5-row list with avatar + name + reason + score chip)
   ============================================================ */

export type PoolCandidateRef = {
  /** Either a `cand-*` id (cross-session) or a `pool-*` synthetic id. */
  id: string;
  name: string;
  initials: string;
  countryFlag?: string;
  avatarGradient: AvatarGradientKey;
  /** True when `id` is a `cand-*` id resolved via Session 3 mocks. */
  isCrossRef: boolean;
};

export type ChurnRiskTone = "high" | "med" | "low";

export type ChurnRiskItem = {
  candidate: PoolCandidateRef;
  reason: string;
  /** 0-100 risk score. */
  scorePct: number;
  tone: ChurnRiskTone;
};

/* ============================================================
   Skill × tier matrix (heatmap density)
   ============================================================ */

/** 5-step density (h0..h4) plus an `amber` accent for under-supplied cells. */
export type HeatDensity = 0 | 1 | 2 | 3 | 4;

export type MatrixCell = {
  density: HeatDensity;
  /** Optional amber wash — used when this cell is under capacity. */
  amber?: boolean;
  /** Cell count for tooltip / accessible label. */
  count: number;
};

export type SkillRow = {
  key: string;
  label: string;
};

export type SkillTierMatrix = {
  /** Column labels, left-to-right. Standard / Vetted / Elite. */
  columns: ReadonlyArray<{ key: TierKey; label: string }>;
  /** Row definitions. */
  rows: ReadonlyArray<SkillRow>;
  /** [row][col] — cell density + count. */
  cells: ReadonlyArray<ReadonlyArray<MatrixCell>>;
};

/* ============================================================
   Recommended actions (Atlas insights span-12 card)
   ============================================================ */

export type RecommendedActionPriority = "high" | "med" | "low";

export type RecommendedAction = {
  priority: RecommendedActionPriority;
  /** Short imperative title. */
  title: string;
  /** One-line context paragraph. */
  detail: string;
  /** CTA label rendered as a link. */
  ctaLabel: string;
  /** Where the CTA goes. */
  ctaHref: string;
};

/* ============================================================
   Period toggle
   ============================================================ */

export type PoolHealthPeriod = "7d" | "30d" | "90d" | "all";

export type PoolHealthPeriodDef = {
  key: PoolHealthPeriod;
  label: string;
};

export const POOL_HEALTH_PERIODS: ReadonlyArray<PoolHealthPeriodDef> = [
  { key: "7d", label: "7d" },
  { key: "30d", label: "30d" },
  { key: "90d", label: "90d" },
  { key: "all", label: "All" },
];

/* ============================================================
   The full snapshot
   ============================================================ */

export type PoolHealthSnapshot = {
  /** Specialist's category — "Virtual Assistants" per current-user. */
  category: string;
  /** Live count rendered on the header subtitle. */
  liveCount: number;
  /** "last refresh 4 min ago" timestamp. */
  lastRefreshLabel: string;
  /** Currently-active period key. */
  activePeriod: PoolHealthPeriod;

  /* Hero scorecard */
  score: number;
  /** Pre-formatted grade label ("★ THRIVING · TOP QUARTILE"). */
  gradeLabel: string;
  grade: PoolHealthGrade;
  /** 10 segments (left-to-right) describing the score bar. */
  scoreSegments: ReadonlyArray<ScoreSegmentTone>;
  /** Bar axis labels ("At risk · 0", "Healthy · 70", "Thriving · 100"). */
  axisLabels: { atRisk: string; healthy: string; thriving: string };
  /** 3 delta rows under the score. */
  deltas: ReadonlyArray<PoolHealthDelta>;

  /* Tile content */
  capacity: Sparkline & { targetRange: string };
  utilization: Utilization;
  quality: Sparkline;

  tierComposition: ReadonlyArray<TierComposition>;
  geographic: ReadonlyArray<GeographicRow>;
  /** "14 others 21" — the long tail of countries collapsed into one row. */
  geographicOthers: { count: number; widthPct: number; label: string };

  churnRisk: ReadonlyArray<ChurnRiskItem>;
  skillTierMatrix: SkillTierMatrix;
  recommendedActions: ReadonlyArray<RecommendedAction>;
};

/* ============================================================
   Snapshot — Virtual Assistants pool
   ============================================================ */

export const poolHealthSnapshot: PoolHealthSnapshot = {
  category: "Virtual Assistants",
  liveCount: 47,
  lastRefreshLabel: "4 min ago",
  activePeriod: "30d",

  score: 82,
  gradeLabel: "★ THRIVING · TOP QUARTILE",
  grade: "thriving",
  // 10 segments: 7 success + 1 amber + 2 empty (matches HTML's filled/amber/empty pattern)
  scoreSegments: [
    "filled",
    "filled",
    "filled",
    "filled",
    "filled",
    "filled",
    "filled",
    "amber",
    "empty",
    "empty",
  ],
  axisLabels: {
    atRisk: "At risk · 0",
    healthy: "Healthy · 70",
    thriving: "Thriving · 100",
  },
  deltas: [
    { label: "vs last month", value: "+4 points", tone: "up" },
    { label: "vs 90 days ago", value: "+12 points", tone: "up" },
    { label: "Category benchmark 78 · you're", value: "+4", tone: "flat" },
  ],

  capacity: {
    bignum: "47",
    bignumEm: " talents",
    caption: "Target range 40–55",
    targetRange: "40–55",
    points: [38, 40, 41, 42, 43, 43, 44, 45, 45, 46, 46, 47],
    tone: "success",
  },
  utilization: {
    centerPct: 68,
    centerCaption: "Utilization",
    legend: [
      { label: "Active", value: "32 / 47", tone: "active" },
      { label: "Partial / paused", value: "3 / 47", tone: "partial" },
      { label: "Available", value: "12 / 47", tone: "available" },
    ],
  },
  quality: {
    bignum: "4.7",
    bignumEm: "/5",
    caption: "7 elite · 24 vetted",
    points: [4.4, 4.5, 4.5, 4.5, 4.6, 4.6, 4.6, 4.7, 4.7, 4.7, 4.7, 4.7].map(
      (v) => Math.round(((v - 3.5) / 1.5) * 100),
    ),
    tone: "lime",
  },

  tierComposition: [
    { tier: "elite", label: "Elite", count: 6, pct: 13, pctLabel: "13%" },
    { tier: "vetted", label: "Vetted", count: 24, pct: 51, pctLabel: "51%" },
    { tier: "standard", label: "Standard", count: 17, pct: 36, pctLabel: "36%" },
  ],
  geographic: [
    { countryFlag: "🇮🇳", countryName: "India", count: 8, widthPct: 100 },
    { countryFlag: "🇵🇭", countryName: "Philippines", count: 5, widthPct: 63 },
    { countryFlag: "🇵🇰", countryName: "Pakistan", count: 4, widthPct: 50 },
    { countryFlag: "🇳🇬", countryName: "Nigeria", count: 3, widthPct: 38 },
    { countryFlag: "🇻🇳", countryName: "Vietnam", count: 3, widthPct: 38 },
    { countryFlag: "🇲🇽", countryName: "Mexico", count: 3, widthPct: 38 },
  ],
  geographicOthers: { count: 21, widthPct: 100, label: "14 others" },

  churnRisk: [
    {
      candidate: {
        id: "cand-sofia-reyes",
        name: "Sofia Reyes",
        initials: "S",
        countryFlag: "🇲🇽",
        avatarGradient: "terracotta",
        isCrossRef: true,
      },
      reason: "Active dispute · payment delay claim",
      scorePct: 82,
      tone: "high",
    },
    {
      candidate: {
        id: "cand-mei-chen",
        name: "Mei Chen",
        initials: "M",
        countryFlag: "🇨🇳",
        avatarGradient: "ice",
        isCrossRef: true,
      },
      reason: "Paused · performance review · 14d idle",
      scorePct: 76,
      tone: "high",
    },
    {
      candidate: {
        // Pool-only reference — Kofi is in the 47-talent pool but not in the
        // 13-candidate Session 3 roster. `cand-*` prefix omitted on purpose:
        // `pool-*` makes the not-cross-ref nature explicit at the type level.
        id: "pool-kofi-mensah",
        name: "Kofi Mensah",
        initials: "K",
        countryFlag: "🇬🇭",
        avatarGradient: "olive",
        isCrossRef: false,
      },
      reason: "No engagement · 21 days · low responsiveness",
      scorePct: 71,
      tone: "high",
    },
    {
      candidate: {
        id: "cand-aaliyah-kone",
        name: "Aaliyah Koné",
        initials: "A",
        countryFlag: "🇨🇮",
        avatarGradient: "warm",
        isCrossRef: true,
      },
      reason: "Pending re-cert · slipping toward grace period",
      scorePct: 48,
      tone: "med",
    },
    {
      candidate: {
        id: "pool-vikram-mehta",
        name: "Vikram Mehta",
        initials: "V",
        countryFlag: "🇮🇳",
        avatarGradient: "navy",
        isCrossRef: false,
      },
      reason: "Rate friction · two clients flagged him as expensive",
      scorePct: 42,
      tone: "med",
    },
  ],

  skillTierMatrix: {
    columns: [
      { key: "standard", label: "Standard" },
      { key: "vetted", label: "Vetted" },
      { key: "elite", label: "Elite" },
    ],
    rows: [
      { key: "engineering-saas", label: "Eng / SaaS ops" },
      { key: "healthcare", label: "Healthcare ops" },
      { key: "finance", label: "Finance / M&A" },
      { key: "editorial", label: "Editorial / writing" },
      { key: "legal", label: "Legal / compliance" },
      { key: "customer-support", label: "CS / support" },
    ],
    /**
     * Cells: [row][col]. Density 0..4. `amber` flags under-supplied cells
     * (legal & editorial Elite tier — drives a recommended action below).
     */
    cells: [
      // Eng / SaaS ops
      [
        { density: 2, count: 4 },
        { density: 4, count: 9 },
        { density: 3, count: 3 },
      ],
      // Healthcare ops
      [
        { density: 1, count: 2 },
        { density: 3, count: 5 },
        { density: 2, count: 2 },
      ],
      // Finance / M&A
      [
        { density: 1, count: 1 },
        { density: 2, count: 3 },
        { density: 1, count: 1 },
      ],
      // Editorial / writing
      [
        { density: 2, count: 3 },
        { density: 2, count: 3 },
        { density: 1, count: 0, amber: true },
      ],
      // Legal / compliance
      [
        { density: 1, count: 1 },
        { density: 1, count: 1 },
        { density: 0, count: 0, amber: true },
      ],
      // CS / support
      [
        { density: 3, count: 6 },
        { density: 4, count: 8 },
        { density: 1, count: 0 },
      ],
    ],
  },

  recommendedActions: [
    {
      priority: "high",
      title: "Resolve 3 high-risk churn cases",
      detail:
        "Sofia, Mei, and Kofi are flagged ≥70% churn risk. Reach out this week — earlier intervention has the highest retention rate.",
      ctaLabel: "Open review queue →",
      ctaHref: "/specialist/review-queue",
    },
    {
      priority: "med",
      title: "Source Legal & Editorial Elite talent",
      detail:
        "0 Elite-tier coverage on Legal/compliance and Editorial/writing rows. Two elite-tier client briefs are queued for these specialties.",
      ctaLabel: "Open sourcing →",
      ctaHref: "/specialist/sourcing",
    },
    {
      priority: "low",
      title: "Promote 2 Vetted → Elite candidates",
      detail:
        "Anand Patel and Kanya Suksawat both clear the Elite gate (≥18mo + 4.8★ + ≥3 client reviews). Consider promoting.",
      ctaLabel: "View talents →",
      ctaHref: "/specialist/my-candidates",
    },
  ],
};
