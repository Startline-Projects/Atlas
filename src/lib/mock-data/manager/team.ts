/**
 * Specialist roster — full 11-Specialist canonical lock (Step 4).
 *
 * This is the single source of truth for Specialist identity, role,
 * status, workload, performance, and the mt-avatar slot mapping for
 * the entire Manager surface (Steps 4-11). Every Manager view that
 * references a Specialist by name pulls from this file via
 * `getSpecialist(id)`. No Specialist data should be hardcoded
 * elsewhere — refactor anything that drifts.
 *
 * ## Mateo Vargas — dual identity
 *
 * The Manager (canonical id `mgr-001-v8b2c4` in `manager-identity.ts`)
 * is ALSO a Talent Specialist with their own caseload. We model this
 * as a Specialist record at `spec-mateo-vargas` with:
 *
 *   - `isManager: true` — drives the `is-you` card treatment + the
 *     special "View dashboard / Performance" button pair (Step 4)
 *   - `managerId: "mgr-001-v8b2c4"` — cross-link back to
 *     `currentManager` for shared identity reads (greetings, signin
 *     dropdowns, etc. — Steps 5+)
 *   - `avatarSlot: "you"` — the prototype's `av-you` slot (ink
 *     background, lime-deep border, lime text) — visually distinct
 *     from the 10 numbered slots so "self" stays findable across
 *     team views
 *
 * Display initials are "MV" (not the prototype's single "M") to align
 * with the canonical identity lock. Minor visual departure from
 * prototype — single letter looked decent for "Miguel"; two
 * matches the namespace and stays readable in the avatar circle.
 *
 * ## SpecialistRole — prototype-faithful 10 categories
 *
 * The union expanded from Step 1's stub (which guessed at the
 * category list) to match the prototype literally. Six of ten
 * entries changed:
 *
 *   - Step 1 "Marketing"           → "Marketing Ops"
 *   - Step 1 "Engineering"         → REMOVED (no specialist owns it)
 *   - Step 1 "Content & Writing"   → REMOVED
 *   - Step 1 "Operations"          → REMOVED (became "Marketing Ops")
 *   - Step 1 "Design"              → "Designers"
 *   - Step 1 "Data & Analytics"    → "Data Operations"
 *   - Step 1 (Tech Support)         → NEW
 *   - Step 1 (Project Management)   → NEW
 *   - Step 1 (Recruiting Coords)    → NEW
 *
 * Source: prototype lines 27338-27631 (`view-my-team` card data).
 *
 * ## Performance score banding
 *
 * The 0-100 `performanceScore` field is rendered with a 3-band visual
 * (locked Step 4 Q3). Documented HERE so Steps 5 (Specialist Detail),
 * 10 (Team Reports), 11 (Manager Daily Activity) use the SAME logic:
 *
 *   - `high` (≥85)  → bg-success bar
 *   - `mid`  (75-84) → bg-amber bar
 *   - `low`  (<75)   → bg-danger bar
 *
 * Value text tone (separate concern):
 *   - `success` text when score ≥95 (only Yara meets this in Step 4)
 *   - `attn` text (amber) when score is mid-band (Diego at 85)
 *   - Neutral text otherwise
 *
 * ## Cohort inference
 *
 * The prototype's filter chips (Active, Vacation, Performance flagged,
 * At capacity) all map to `status`, NOT `cohort`. The `cohort` field
 * exists for downstream Steps 5/10 (1:1 cadence, performance review
 * frequency). Values are INFERRED from tenure + performance + role
 * complexity — not directly sourced from the prototype:
 *
 *   - senior (7): Mateo, Diego, Felipe, Yara, Min-Jun, Olena, Naomi
 *   - mid    (4): Priya, Aisha, Lucas, Kavi
 *   - junior (0), on-trial (0): no specialists assigned at Step 4
 *
 * Revisit cohort assignments at Step 10 (Team Reports) if the
 * comparison heatmap surfaces a different signal.
 */

import { currentManager } from "./manager-identity";

/* ============================================================
   Types
   ============================================================ */

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

/** Daily activity submission state for "today". */
export type DailyActivityState =
  | { kind: "submitted"; timeLabel: string }
  | { kind: "pending"; dueLabel: string }
  | { kind: "missed"; daysCount: number }
  | { kind: "excused"; untilLabel: string };

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
   *  Specialist persona. Drives `is-you` treatment in team grid +
   *  the special button pair (View dashboard / Performance). */
  isManager?: boolean;
  /** Cross-link to `currentManager.id` (`mgr-001-v8b2c4`) for the
   *  Mateo Vargas record. Lets shared components read either side
   *  of the dual identity. */
  managerId?: string;

  /* ============================================================
     Step 5 additions — Specialist Detail page fields. The "Step 5
     follow-up — Specialist shape audit pass" (flagged in
     CONVERSION_LOG) will re-read the prototype exhaustively before
     Step 6 to identify any remaining per-specialist fields and lock
     all additions in one go. Until then, these 6 are the only
     additions beyond Step 4.
     ============================================================ */

  /** "ATLAS-TS-NNN" — sequential id rendered in the detail hero
   *  eyebrow ("TALENT SPECIALIST · ATLAS-TS-001"). */
  atlasTsId: string;
  /** Origin city — rendered in detail hero meta strip. */
  city: string;
  /** "Joined" date — short label ("May 2024"). */
  joinDate: string;
  /** IANA-ish timezone caption ("GMT-6") for the slim meta bar. */
  timeZone: string;
  /** Languages — rendered as `Spanish · English`. */
  languages: ReadonlyArray<string>;
  /** Caseload candidate-capacity (the workload bar denominator).
   *  Lucas at 40 with workload 41 → renders over-capacity (103%).
   *  Default story per Step 5 Q6: capacity 40 is the dramatic
   *  visual; Lucas's "high-volume senior" prototype narrative
   *  reads better as over-capacity than at-capacity. */
  caseloadCapacity: number;
};

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
  },

  /* 2. Priya Mehra — performance flag, missed daily activity. */
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
    dailyActivity: { kind: "missed", daysCount: 2 },
    workload: { candidatesCount: 22, contractsCount: 6 },
    performanceScore: 76,
    lastActiveLabel: "4h ago",
    atlasTsId: "ATLAS-TS-002",
    city: "Mumbai",
    joinDate: "Jan 2024",
    timeZone: "GMT+5:30",
    languages: ["Hindi", "English"],
    caseloadCapacity: 30,
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
    dailyActivity: { kind: "pending", dueLabel: "due EOD" },
    workload: { candidatesCount: 31, contractsCount: 8 },
    performanceScore: 88,
    lastActiveLabel: "1h ago",
    atlasTsId: "ATLAS-TS-004",
    city: "Lagos",
    joinDate: "Feb 2024",
    timeZone: "GMT+1",
    languages: ["English", "Yoruba"],
    caseloadCapacity: 35,
  },

  /* 5. Lucas Andersen — at capacity. Step 1 stub; Sweden corrected
       in Step 3 per prototype dashboard 🇸🇪 flag (line 19747).
       Step 5: caseloadCapacity = 40 → over-capacity at 41/40
       (103%) per the "dramatic visual" lock — Lucas is the
       high-volume senior; "At capacity" badge in the My Team
       grid reads truer with workload exceeding capacity. */
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
    caseloadCapacity: 40,
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
  },

  /* 7. Yara Khalil — active, top performer. */
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
  },

  /* 8. Min-Jun Park — active. ID differs from prototype's
       data-mt-id="minjun-park" — kebab convention requires
       "min-jun-park". */
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
    dailyActivity: { kind: "excused", untilLabel: "Apr 28" },
    workload: { candidatesCount: 18, contractsCount: 4 },
    performanceScore: 87,
    coverageSpecialistId: "spec-diego-cabrera",
    atlasTsId: "ATLAS-TS-009",
    city: "Kyiv",
    joinDate: "Nov 2022",
    timeZone: "GMT+2",
    languages: ["Ukrainian", "Russian", "English"],
    caseloadCapacity: 25,
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

/** Reverse lookup by display name. Used during the Step 3 refactor
 *  where active-items dashboard data carried denormalized names. */
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
    /* "Active today" = anyone NOT on vacation (per prototype's
       cohort chip count: 10 of 11 = excludes Olena only). */
    if (s.status !== "vacation") active += 1;
    if (s.status === "vacation") vacation += 1;
    if (s.status === "flag") flag += 1;
    if (s.status === "capacity") capacity += 1;
  }
  return { all: specialists.length, active, vacation, flag, capacity };
}

/** Static list of valid Specialist ids. Step 5 will pull from this
 *  for `generateStaticParams()` on `/specialist/team/[id]`. */
export const ALL_SPECIALIST_IDS: ReadonlyArray<SpecialistId> = specialists.map(
  (s) => s.id,
);
