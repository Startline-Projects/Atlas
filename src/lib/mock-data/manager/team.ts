/**
 * Specialist roster — full 11-Specialist canonical lock.
 *
 * This is the single source of truth for Specialist identity, role,
 * status, workload, performance, daily activity history, monthly
 * KPIs, and the mt-avatar slot mapping for the entire Manager
 * surface (Steps 4-11). Every Manager view that references a
 * Specialist by name pulls from this file via `getSpecialist(id)`.
 *
 * ## Mateo Vargas — dual identity
 *
 * The Manager (canonical id `mgr-001-v8b2c4` in `manager-identity.ts`)
 * is ALSO a Talent Specialist with their own caseload. We model this
 * as a Specialist record at `spec-mateo-vargas` with:
 *
 *   - `isManager: true` — drives the `is-you` card treatment + the
 *     special "View dashboard / Performance" button pair
 *   - `managerId: "mgr-001-v8b2c4"` — cross-link back to
 *     `currentManager` for shared identity reads
 *   - `avatarSlot: "you"` — the prototype's `av-you` slot
 *
 * Display initials are "MV" (not the prototype's single "M") to align
 * with the canonical identity lock.
 *
 * ## SpecialistRole — prototype-faithful 10 categories
 *
 * Source: prototype lines 27338-27631 (`view-my-team` card data).
 *
 * ## Performance score banding
 *
 * The 0-100 `performanceScore` field is rendered with a 3-band visual:
 *
 *   - `high` (≥85)  → bg-success bar
 *   - `mid`  (75-84) → bg-amber bar
 *   - `low`  (<75)   → bg-danger bar
 *
 * Value text tone (separate concern):
 *   - `success` text when score ≥95 (only Yara meets this)
 *   - `attn` text (amber) when score is mid-band (Diego at 85)
 *   - Neutral text otherwise
 *
 * ## Cohort inference
 *
 * The prototype's filter chips (Active, Vacation, Performance flagged,
 * At capacity) all map to `status`, NOT `cohort`. The `cohort` field
 * exists for downstream Steps 5/10 (1:1 cadence, performance review
 * frequency). Values are INFERRED.
 *
 * ## Specialist shape audit pass (this commit)
 *
 * 5 changes ship together to lock per-Specialist data ahead of
 * Steps 6-11:
 *
 *   1. `kpis: SpecialistKpis` — 8 monthly stats (Step 5 + Step 10)
 *   2. `DailyActivityState` extended with per-status context fields
 *      (Step 6 audit-row copy)
 *   3. `todayActivity: TodayActivityCounts` — 4-count breakdown
 *      (Step 5 Daily tab + Step 6 audit-row expanded notes)
 *   4. `dailyHistory: ReadonlyArray<DailyHistoryDay>` — 14 weekdays
 *      of intensity scores (Step 10 heatmap + Step 11 calendar)
 *   5. 3 flat workload-capacity fields (Step 5 Workload tab),
 *      previously in `spec-detail-data.ts`'s `SPEC_STATS` map
 *
 * Step 10 prototype values are canonical for any KPI that appears
 * in both Step 5 and Step 10 (charts override prior Step 5 numbers).
 * Reconciled values documented in CONVERSION_LOG.
 *
 * Future-maintainer note (post-Clerk): KPI access is currently
 * direct field reads (`s.kpis.reviewsMonth`). When KPIs become
 * async-fetched, an adapter layer at the page or orchestrator level
 * should resolve KPIs and pass them down. The 5 consuming
 * components (sd-stats-strip, sd-tab-overview, sd-tab-workload,
 * sd-tab-daily, and Step 10 components when they land) stay
 * unchanged.
 */

import { currentManager } from "./manager-identity";

/* ============================================================
   Types
   ============================================================ */

/** **Canonical** id for the current Manager (Mateo Vargas). Use this
 *  constant for every "is this the Manager?" check across the
 *  codebase. Never hard-code the string literal in consumers.
 *  Step 7 introduced this — prior step un-disable passes used
 *  inline strings, now centralized. */
export const MANAGER_SPECIALIST_ID = "spec-mateo-vargas" as const;

/** Canonical Specialist IDs. Strict union — getSpecialist() takes
 *  only these. Adds compile-time safety against typos. */
export type SpecialistId =
  | "spec-mateo-vargas"
  | "spec-priya-mehra"
  | "spec-diego-cabrera"
  | "spec-aisha-bello"
  | "spec-lucas-andersen"
  | "spec-felipe-santos"
  | "spec-yara-khalil"
  | "spec-min-jun-park"
  | "spec-olena-kovalenko"
  | "spec-kavi-rajan"
  | "spec-naomi-adebayo";

/** Role categories — 10 entries, prototype-faithful. */
export type SpecialistRole =
  | "Virtual Assistants"
  | "Tech Support"
  | "Bookkeeping"
  | "Customer Support"
  | "Marketing Ops"
  | "Sales Development"
  | "Project Management"
  | "Data Operations"
  | "Recruiting Coordinators"
  | "Designers";

/** Status drives the cohort filter chips on My Team. */
export type SpecialistStatus = "active" | "vacation" | "capacity" | "flag";

/** Cohort is inferred (see file header). Not surfaced in Step 4 UI. */
export type SpecialistCohort = "senior" | "mid" | "junior" | "on-trial";

/** mt-avatar slot 1-10, or "you" for the Manager's Specialist card. */
export type AvatarSlot = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | "you";

/** Daily activity submission state for "today".
 *
 *  Per-status context fields added in the Step 5 audit pass:
 *    - PENDING gets `lastActivityLabel` (Step 6 audit-row meta)
 *    - MISSED gets `lastSubmittedDate` + `lastSubmittedTime`
 *    - EXCUSED gets `resumesDate`
 *  SUBMITTED needs no extension — `timeLabel` already carries
 *  everything the UI shows. */
export type DailyActivityState =
  | { kind: "submitted"; timeLabel: string }
  | { kind: "pending"; dueLabel: string; lastActivityLabel: string }
  | {
      kind: "missed";
      daysCount: number;
      lastSubmittedDate: string;
      lastSubmittedTime: string;
    }
  | { kind: "excused"; untilLabel: string; resumesDate: string };

/** Per-Specialist monthly KPIs. Drives Step 5 (Specialist Detail
 *  stats strip + Overview tile) AND Step 10 (Team Reports per-spec
 *  comparison charts). Step 10 prototype values are canonical
 *  wherever the two surfaces overlap. */
export type SpecialistKpis = {
  reviewsMonth: number;
  reviewsMonthSLAPct: number;
  disputesResolvedMonth: number;
  /** Avg dispute resolution time in hours. Step 10 chart consumes. */
  disputeAvgResolutionHours: number;
  dailyAdherencePct: number;
  sourcingProspectsMonth: number;
  hiresPlacedMonth: number;
  candidatesApprovedMonth: number;
};

/** Today's daily activity breakdown — feeds Step 5 Daily tab + Step 6
 *  audit row expanded notes. Counts MAY be partial (specialist hasn't
 *  submitted yet) — the consumer's copy says "logged so far". */
export type TodayActivityCounts = {
  outreach: number;
  checkIns: number;
  interviews: number;
  signups: number;
};

/** Intensity score for one cell of the 14-weekday daily-activity
 *  heatmap. `s0` is excused/vacation; `s1`=missed, `s2`=late,
 *  `s3`=mostly on time, `s4`=on time. Prototype CSS classes literally. */
export type DailyHistoryIntensity = "s0" | "s1" | "s2" | "s3" | "s4";

/** One day in the 14-weekday history. */
export type DailyHistoryDay = {
  /** Header letter in heatmap row (prototype renders M/T/W/T/F repeating). */
  weekdayLetter: "M" | "T" | "W" | "F";
  intensity: DailyHistoryIntensity;
};

export type Specialist = {
  id: SpecialistId;
  fullName: string;
  firstName: string;
  lastName: string;
  initials: string;
  role: SpecialistRole;
  status: SpecialistStatus;
  cohort: SpecialistCohort;
  /** ISO 3166-1 alpha-2. Drives `countryFlag()` helper. */
  countryCode: string;
  countryName: string;
  avatarSlot: AvatarSlot;
  dailyActivity: DailyActivityState;
  workload: { candidatesCount: number; contractsCount: number };
  /** 0-100. See file header for the 3-band rendering rule. */
  performanceScore: number;
  /** "Just now", "12 min ago", etc. Omitted for vacation. */
  lastActiveLabel?: string;
  /** Vacation coverage — only set when status="vacation". */
  coverageSpecialistId?: SpecialistId;
  /** When true, this Specialist record is the logged-in Manager's
   *  Specialist persona. */
  isManager?: boolean;
  /** Cross-link to `currentManager.id` for the Mateo Vargas record. */
  managerId?: string;

  /* ============================================================
     Step 4 additions — Specialist Detail page fields
     ============================================================ */

  /** "ATLAS-TS-NNN" — sequential id rendered in the detail hero. */
  atlasTsId: string;
  /** Origin city — rendered in detail hero meta strip. */
  city: string;
  /** "Joined" date — short label ("May 2024"). */
  joinDate: string;
  /** IANA-ish timezone caption ("GMT-6") for the slim meta bar. */
  timeZone: string;
  /** Languages — rendered as `Spanish · English`. */
  languages: ReadonlyArray<string>;
  /** Caseload candidate-capacity (the workload-tab candidate bar
   *  denominator). Naming inconsistency vs. the audit-pass additions
   *  `contractsCapacity` + `reviewsPendingCapacity` below — by
   *  symmetry this would be `candidatesCapacity`. Not renamed to
   *  avoid churning Steps 4-5; document for any future rename pass. */
  caseloadCapacity: number;

  /* ============================================================
     Specialist shape audit pass — Steps 6-11 additions
     ============================================================ */

  /** Monthly KPIs. Single source of truth for Step 5 stats strip +
   *  Step 10 comparison charts. */
  kpis: SpecialistKpis;
  /** Today's activity breakdown (4 counts). */
  todayActivity: TodayActivityCounts;
  /** 14-weekday intensity history for the Step 10 heatmap +
   *  Step 11 calendar. Always exactly 14 entries. */
  dailyHistory: ReadonlyArray<DailyHistoryDay>;
  /** Contracts capacity (workload bar denominator for "Contracts"). */
  contractsCapacity: number;
  /** Reviews-pending right now (workload bar numerator for
   *  "Reviews pending"). */
  reviewsPendingNow: number;
  /** Reviews-pending capacity (workload bar denominator). */
  reviewsPendingCapacity: number;
};

/* ============================================================
   14-weekday history pattern — shared header sequence
   ============================================================
   Heatmap header row: M T W T F | M T W T F | M T W T (14 cells = 3
   work weeks of M-F minus the last weekday). Each Specialist's
   `dailyHistory` array reads in this exact order. */
const HEATMAP_WEEKDAYS: ReadonlyArray<DailyHistoryDay["weekdayLetter"]> = [
  "M", "T", "W", "T", "F", "M", "T", "W", "T", "F", "M", "T", "W", "T",
];

function makeHistory(intensities: ReadonlyArray<DailyHistoryIntensity>): ReadonlyArray<DailyHistoryDay> {
  if (intensities.length !== 14) {
    throw new Error(`dailyHistory must have 14 entries, got ${intensities.length}`);
  }
  return intensities.map((intensity, i) => {
    const weekdayLetter = HEATMAP_WEEKDAYS[i];
    if (!weekdayLetter) {
      throw new Error(`weekdayLetter undefined at index ${i}`);
    }
    return { weekdayLetter, intensity };
  });
}

/* ============================================================
   Roster — 11 canonical records
   ============================================================ */

export const specialists: ReadonlyArray<Specialist> = [
  /* 1. Mateo Vargas — Manager + Specialist (av-you, is-you card). */
  {
    id: "spec-mateo-vargas",
    fullName: "Mateo Vargas",
    firstName: "Mateo",
    lastName: "Vargas",
    initials: "MV",
    role: "Virtual Assistants",
    status: "active",
    cohort: "senior",
    countryCode: "MX",
    countryName: "Mexico",
    avatarSlot: "you",
    dailyActivity: { kind: "submitted", timeLabel: "9:14 AM" },
    workload: { candidatesCount: 35, contractsCount: 9 },
    performanceScore: 94,
    lastActiveLabel: "Just now",
    isManager: true,
    managerId: currentManager.id,
    atlasTsId: "ATLAS-TS-001",
    city: "Mexico City",
    joinDate: "May 2024",
    timeZone: "GMT-6",
    languages: ["Spanish", "English"],
    caseloadCapacity: 40,
    kpis: {
      reviewsMonth: 22,
      reviewsMonthSLAPct: 94,
      disputesResolvedMonth: 3,
      disputeAvgResolutionHours: 28,
      dailyAdherencePct: 100,
      sourcingProspectsMonth: 48,
      hiresPlacedMonth: 4,
      candidatesApprovedMonth: 11,
    },
    todayActivity: { outreach: 14, checkIns: 3, interviews: 2, signups: 1 },
    dailyHistory: makeHistory([
      "s4", "s4", "s4", "s4", "s3",
      "s4", "s4", "s4", "s4", "s4",
      "s4", "s4", "s4", "s4",
    ]),
    contractsCapacity: 12,
    reviewsPendingNow: 3,
    reviewsPendingCapacity: 10,
  },

  /* 2. Priya Mehra — performance flag, missed daily activity 2 days. */
  {
    id: "spec-priya-mehra",
    fullName: "Priya Mehra",
    firstName: "Priya",
    lastName: "Mehra",
    initials: "PM",
    role: "Tech Support",
    status: "flag",
    cohort: "mid",
    countryCode: "IN",
    countryName: "India",
    avatarSlot: 3,
    dailyActivity: {
      kind: "missed",
      daysCount: 2,
      lastSubmittedDate: "Mon Apr 28",
      lastSubmittedTime: "7:14 PM",
    },
    workload: { candidatesCount: 22, contractsCount: 6 },
    performanceScore: 76,
    lastActiveLabel: "4h ago",
    atlasTsId: "ATLAS-TS-002",
    city: "Mumbai",
    joinDate: "Jan 2024",
    timeZone: "GMT+5:30",
    languages: ["Hindi", "English"],
    caseloadCapacity: 30,
    /* Step 10 canonical values (chart row). reviewsMonth + SLA come
       from the Step 10 charts; Step 5's earlier 76% SLA was a stale
       guess — reconciled to 78% per Step 10 "Below target: Priya". */
    kpis: {
      reviewsMonth: 14,
      reviewsMonthSLAPct: 78,
      disputesResolvedMonth: 1,
      disputeAvgResolutionHours: 52,
      dailyAdherencePct: 78,
      sourcingProspectsMonth: 18,
      hiresPlacedMonth: 1,
      candidatesApprovedMonth: 6,
    },
    /* Missed 2 days → no today activity. Zeros are honest. */
    todayActivity: { outreach: 0, checkIns: 0, interviews: 0, signups: 0 },
    dailyHistory: makeHistory([
      "s4", "s3", "s4", "s2", "s4",
      "s4", "s4", "s3", "s2", "s4",
      "s3", "s1", "s1", "s1",
    ]),
    contractsCapacity: 8,
    reviewsPendingNow: 6,
    reviewsPendingCapacity: 10,
  },

  /* 3. Diego Cabrera — performance flag, review SLA dropped. */
  {
    id: "spec-diego-cabrera",
    fullName: "Diego Cabrera",
    firstName: "Diego",
    lastName: "Cabrera",
    initials: "DC",
    role: "Bookkeeping",
    status: "flag",
    cohort: "senior",
    countryCode: "MX",
    countryName: "Mexico",
    avatarSlot: 1,
    dailyActivity: { kind: "submitted", timeLabel: "10:42 AM" },
    workload: { candidatesCount: 28, contractsCount: 7 },
    performanceScore: 85,
    lastActiveLabel: "32 min ago",
    atlasTsId: "ATLAS-TS-003",
    city: "Guadalajara",
    joinDate: "Aug 2023",
    timeZone: "GMT-6",
    languages: ["Spanish", "English"],
    caseloadCapacity: 35,
    kpis: {
      reviewsMonth: 19,
      reviewsMonthSLAPct: 85,
      disputesResolvedMonth: 4,
      disputeAvgResolutionHours: 40,
      dailyAdherencePct: 95,
      sourcingProspectsMonth: 32,
      hiresPlacedMonth: 2,
      candidatesApprovedMonth: 9,
    },
    todayActivity: { outreach: 12, checkIns: 4, interviews: 1, signups: 0 },
    dailyHistory: makeHistory([
      "s4", "s4", "s4", "s4", "s3",
      "s4", "s3", "s4", "s4", "s2",
      "s4", "s4", "s3", "s3",
    ]),
    contractsCapacity: 9,
    reviewsPendingNow: 4,
    reviewsPendingCapacity: 10,
  },

  /* 4. Aisha Bello — at capacity, Customer Support pool depleted. */
  {
    id: "spec-aisha-bello",
    fullName: "Aisha Bello",
    firstName: "Aisha",
    lastName: "Bello",
    initials: "AB",
    role: "Customer Support",
    status: "capacity",
    cohort: "mid",
    countryCode: "NG",
    countryName: "Nigeria",
    avatarSlot: 4,
    dailyActivity: {
      kind: "pending",
      dueLabel: "due EOD",
      lastActivityLabel: "1h ago",
    },
    workload: { candidatesCount: 31, contractsCount: 8 },
    performanceScore: 88,
    lastActiveLabel: "1h ago",
    atlasTsId: "ATLAS-TS-004",
    city: "Lagos",
    joinDate: "Feb 2024",
    timeZone: "GMT+1",
    languages: ["English", "Yoruba"],
    caseloadCapacity: 35,
    kpis: {
      reviewsMonth: 26,
      reviewsMonthSLAPct: 90,
      disputesResolvedMonth: 2,
      disputeAvgResolutionHours: 34,
      dailyAdherencePct: 80,
      sourcingProspectsMonth: 41,
      hiresPlacedMonth: 3,
      candidatesApprovedMonth: 10,
    },
    /* Pending (not yet submitted) — partial counts of what's been
       logged so far today. */
    todayActivity: { outreach: 8, checkIns: 2, interviews: 1, signups: 0 },
    dailyHistory: makeHistory([
      "s4", "s3", "s4", "s4", "s4",
      "s3", "s4", "s4", "s2", "s4",
      "s4", "s3", "s4", "s2",
    ]),
    contractsCapacity: 10,
    reviewsPendingNow: 5,
    reviewsPendingCapacity: 10,
  },

  /* 5. Lucas Andersen — at capacity, high-volume marketing ops. */
  {
    id: "spec-lucas-andersen",
    fullName: "Lucas Andersen",
    firstName: "Lucas",
    lastName: "Andersen",
    initials: "LA",
    role: "Marketing Ops",
    status: "capacity",
    cohort: "mid",
    countryCode: "SE",
    countryName: "Sweden",
    avatarSlot: 5,
    dailyActivity: { kind: "submitted", timeLabel: "8:50 AM" },
    workload: { candidatesCount: 41, contractsCount: 12 },
    performanceScore: 90,
    lastActiveLabel: "12 min ago",
    atlasTsId: "ATLAS-TS-005",
    city: "Stockholm",
    joinDate: "Sep 2023",
    timeZone: "GMT+1",
    languages: ["Swedish", "English"],
    /* 40 = workload 41 → over-capacity (103%); dramatic visual per
       Step 4 Q6 lock. */
    caseloadCapacity: 40,
    /* Step 10 canonical: Lucas tops most charts (reviewsMonth 31). */
    kpis: {
      reviewsMonth: 31,
      reviewsMonthSLAPct: 95,
      disputesResolvedMonth: 5,
      disputeAvgResolutionHours: 24,
      dailyAdherencePct: 95,
      sourcingProspectsMonth: 56,
      hiresPlacedMonth: 5,
      candidatesApprovedMonth: 14,
    },
    todayActivity: { outreach: 22, checkIns: 4, interviews: 3, signups: 1 },
    dailyHistory: makeHistory([
      "s4", "s4", "s4", "s4", "s4",
      "s4", "s4", "s4", "s4", "s4",
      "s4", "s4", "s3", "s4",
    ]),
    contractsCapacity: 15,
    reviewsPendingNow: 6,
    reviewsPendingCapacity: 12,
  },

  /* 6. Felipe Santos — active. */
  {
    id: "spec-felipe-santos",
    fullName: "Felipe Santos",
    firstName: "Felipe",
    lastName: "Santos",
    initials: "FS",
    role: "Sales Development",
    status: "active",
    cohort: "senior",
    countryCode: "BR",
    countryName: "Brazil",
    avatarSlot: 6,
    dailyActivity: { kind: "submitted", timeLabel: "11:23 AM" },
    workload: { candidatesCount: 19, contractsCount: 5 },
    performanceScore: 92,
    lastActiveLabel: "18 min ago",
    atlasTsId: "ATLAS-TS-006",
    city: "São Paulo",
    joinDate: "Jun 2023",
    timeZone: "GMT-3",
    languages: ["Portuguese", "Spanish", "English"],
    caseloadCapacity: 30,
    kpis: {
      reviewsMonth: 18,
      reviewsMonthSLAPct: 96,
      disputesResolvedMonth: 2,
      disputeAvgResolutionHours: 18,
      dailyAdherencePct: 100,
      sourcingProspectsMonth: 38,
      hiresPlacedMonth: 4,
      candidatesApprovedMonth: 8,
    },
    todayActivity: { outreach: 18, checkIns: 6, interviews: 2, signups: 2 },
    dailyHistory: makeHistory([
      "s4", "s4", "s4", "s4", "s4",
      "s4", "s4", "s4", "s4", "s4",
      "s4", "s4", "s4", "s4",
    ]),
    contractsCapacity: 7,
    reviewsPendingNow: 2,
    reviewsPendingCapacity: 8,
  },

  /* 7. Yara Khalil — active, top performer (Yara 98% SLA). */
  {
    id: "spec-yara-khalil",
    fullName: "Yara Khalil",
    firstName: "Yara",
    lastName: "Khalil",
    initials: "YK",
    role: "Project Management",
    status: "active",
    cohort: "senior",
    countryCode: "EG",
    countryName: "Egypt",
    avatarSlot: 7,
    dailyActivity: { kind: "submitted", timeLabel: "7:30 AM" },
    workload: { candidatesCount: 24, contractsCount: 7 },
    performanceScore: 95,
    lastActiveLabel: "45 min ago",
    atlasTsId: "ATLAS-TS-007",
    city: "Cairo",
    joinDate: "Mar 2023",
    timeZone: "GMT+2",
    languages: ["Arabic", "English", "French"],
    caseloadCapacity: 30,
    kpis: {
      reviewsMonth: 28,
      reviewsMonthSLAPct: 98,
      disputesResolvedMonth: 4,
      disputeAvgResolutionHours: 22,
      dailyAdherencePct: 100,
      sourcingProspectsMonth: 44,
      hiresPlacedMonth: 5,
      candidatesApprovedMonth: 12,
    },
    todayActivity: { outreach: 11, checkIns: 3, interviews: 2, signups: 1 },
    dailyHistory: makeHistory([
      "s4", "s4", "s4", "s4", "s4",
      "s4", "s4", "s4", "s4", "s4",
      "s4", "s4", "s4", "s4",
    ]),
    contractsCapacity: 9,
    reviewsPendingNow: 2,
    reviewsPendingCapacity: 10,
  },

  /* 8. Min-Jun Park — active. ID is "min-jun-park" (kebab),
       NOT prototype's "minjun-park". */
  {
    id: "spec-min-jun-park",
    fullName: "Min-Jun Park",
    firstName: "Min-Jun",
    lastName: "Park",
    initials: "MP",
    role: "Data Operations",
    status: "active",
    cohort: "senior",
    countryCode: "KR",
    countryName: "South Korea",
    avatarSlot: 8,
    dailyActivity: { kind: "submitted", timeLabel: "6:15 AM" },
    workload: { candidatesCount: 26, contractsCount: 6 },
    performanceScore: 91,
    lastActiveLabel: "2h ago",
    atlasTsId: "ATLAS-TS-008",
    city: "Seoul",
    joinDate: "Apr 2023",
    timeZone: "GMT+9",
    languages: ["Korean", "English"],
    caseloadCapacity: 35,
    kpis: {
      reviewsMonth: 24,
      reviewsMonthSLAPct: 92,
      disputesResolvedMonth: 3,
      disputeAvgResolutionHours: 30,
      dailyAdherencePct: 100,
      sourcingProspectsMonth: 36,
      hiresPlacedMonth: 3,
      candidatesApprovedMonth: 9,
    },
    todayActivity: { outreach: 9, checkIns: 2, interviews: 1, signups: 0 },
    dailyHistory: makeHistory([
      "s4", "s4", "s4", "s4", "s4",
      "s4", "s3", "s4", "s4", "s4",
      "s4", "s4", "s4", "s4",
    ]),
    contractsCapacity: 8,
    reviewsPendingNow: 3,
    reviewsPendingCapacity: 10,
  },

  /* 9. Olena Kovalenko — on vacation. Coverage by Diego. */
  {
    id: "spec-olena-kovalenko",
    fullName: "Olena Kovalenko",
    firstName: "Olena",
    lastName: "Kovalenko",
    initials: "OK",
    role: "Bookkeeping",
    status: "vacation",
    cohort: "senior",
    countryCode: "UA",
    countryName: "Ukraine",
    avatarSlot: 9,
    dailyActivity: {
      kind: "excused",
      untilLabel: "Apr 28",
      resumesDate: "Mon Apr 28",
    },
    workload: { candidatesCount: 18, contractsCount: 4 },
    performanceScore: 87,
    coverageSpecialistId: "spec-diego-cabrera",
    atlasTsId: "ATLAS-TS-009",
    city: "Kyiv",
    joinDate: "Nov 2022",
    timeZone: "GMT+2",
    languages: ["Ukrainian", "Russian", "English"],
    caseloadCapacity: 25,
    kpis: {
      reviewsMonth: 12,
      reviewsMonthSLAPct: 88,
      disputesResolvedMonth: 1,
      disputeAvgResolutionHours: 32,
      dailyAdherencePct: 100,
      sourcingProspectsMonth: 22,
      hiresPlacedMonth: 2,
      candidatesApprovedMonth: 5,
    },
    /* On vacation today → zeros. */
    todayActivity: { outreach: 0, checkIns: 0, interviews: 0, signups: 0 },
    /* Vacation kicks in at the end of the 14-day window — last 4
       days render as s0 (excused). */
    dailyHistory: makeHistory([
      "s4", "s4", "s4", "s4", "s4",
      "s4", "s4", "s3", "s4", "s4",
      "s0", "s0", "s0", "s0",
    ]),
    contractsCapacity: 6,
    reviewsPendingNow: 0,
    reviewsPendingCapacity: 8,
  },

  /* 10. Kavi Rajan — active. */
  {
    id: "spec-kavi-rajan",
    fullName: "Kavi Rajan",
    firstName: "Kavi",
    lastName: "Rajan",
    initials: "KR",
    role: "Recruiting Coordinators",
    status: "active",
    cohort: "mid",
    countryCode: "IN",
    countryName: "India",
    avatarSlot: 10,
    dailyActivity: { kind: "submitted", timeLabel: "9:48 AM" },
    workload: { candidatesCount: 23, contractsCount: 5 },
    performanceScore: 89,
    lastActiveLabel: "3h ago",
    atlasTsId: "ATLAS-TS-010",
    city: "Bengaluru",
    joinDate: "Oct 2023",
    timeZone: "GMT+5:30",
    languages: ["Tamil", "English"],
    caseloadCapacity: 30,
    kpis: {
      reviewsMonth: 17,
      reviewsMonthSLAPct: 89,
      disputesResolvedMonth: 2,
      disputeAvgResolutionHours: 26,
      dailyAdherencePct: 95,
      sourcingProspectsMonth: 28,
      hiresPlacedMonth: 2,
      candidatesApprovedMonth: 8,
    },
    todayActivity: { outreach: 16, checkIns: 5, interviews: 3, signups: 1 },
    dailyHistory: makeHistory([
      "s4", "s3", "s4", "s4", "s4",
      "s4", "s4", "s4", "s3", "s4",
      "s4", "s4", "s3", "s4",
    ]),
    contractsCapacity: 7,
    reviewsPendingNow: 2,
    reviewsPendingCapacity: 8,
  },

  /* 11. Naomi Adebayo — active. */
  {
    id: "spec-naomi-adebayo",
    fullName: "Naomi Adebayo",
    firstName: "Naomi",
    lastName: "Adebayo",
    initials: "NA",
    role: "Designers",
    status: "active",
    cohort: "senior",
    countryCode: "NG",
    countryName: "Nigeria",
    avatarSlot: 2,
    dailyActivity: { kind: "submitted", timeLabel: "10:05 AM" },
    workload: { candidatesCount: 20, contractsCount: 4 },
    performanceScore: 93,
    lastActiveLabel: "55 min ago",
    atlasTsId: "ATLAS-TS-011",
    city: "Lagos",
    joinDate: "Jul 2023",
    timeZone: "GMT+1",
    languages: ["English", "Yoruba"],
    caseloadCapacity: 25,
    kpis: {
      reviewsMonth: 20,
      reviewsMonthSLAPct: 95,
      disputesResolvedMonth: 2,
      disputeAvgResolutionHours: 32,
      dailyAdherencePct: 100,
      sourcingProspectsMonth: 31,
      hiresPlacedMonth: 3,
      candidatesApprovedMonth: 9,
    },
    todayActivity: { outreach: 10, checkIns: 4, interviews: 1, signups: 0 },
    dailyHistory: makeHistory([
      "s4", "s4", "s4", "s4", "s4",
      "s4", "s4", "s4", "s4", "s4",
      "s4", "s3", "s4", "s4",
    ]),
    contractsCapacity: 6,
    reviewsPendingNow: 1,
    reviewsPendingCapacity: 8,
  },
];

/* ============================================================
   Helpers
   ============================================================ */

/** Strict lookup. Returns `undefined` only if a future Specialist
 *  ID gets removed; with the literal union, typos fail at compile. */
export function getSpecialist(id: SpecialistId): Specialist | undefined {
  return specialists.find((s) => s.id === id);
}

/** Display "First L." — used by snapshot detail copy
 *  ("on vacation · Olena K."). */
export function formatFirstAndInitial(id: SpecialistId): string {
  const s = getSpecialist(id);
  if (!s) return "Unknown";
  return `${s.firstName} ${s.lastName.charAt(0)}.`;
}

/** Reverse lookup by display name. */
export function getSpecialistByName(fullName: string): Specialist | undefined {
  return specialists.find((s) => s.fullName === fullName);
}

/** Cohort filter chip counts (drives the My Team header chips). */
export function countSpecialistsByCohort(): {
  all: number;
  active: number;
  vacation: number;
  flag: number;
  capacity: number;
} {
  let active = 0;
  let vacation = 0;
  let flag = 0;
  let capacity = 0;
  for (const s of specialists) {
    if (s.status !== "vacation") active += 1;
    if (s.status === "vacation") vacation += 1;
    if (s.status === "flag") flag += 1;
    if (s.status === "capacity") capacity += 1;
  }
  return { all: specialists.length, active, vacation, flag, capacity };
}

/** Static list of valid Specialist ids — drives `generateStaticParams`. */
export const ALL_SPECIALIST_IDS: ReadonlyArray<SpecialistId> = specialists.map(
  (s) => s.id,
);
