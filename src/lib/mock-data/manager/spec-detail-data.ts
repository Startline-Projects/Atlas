/**
 * Specialist Detail page — per-tab content data (Step 5).
 *
 * Two layers:
 *
 *   1. **Per-Specialist stats** (`SpecStats`) — `getSpecStats(id)`
 *      returns numbers for the hero stats strip, workload capacity
 *      bars, and Overview tiles. Locked here pending the "Step 5
 *      follow-up — Specialist shape audit pass" (CONVERSION_LOG)
 *      which may relocate some of these onto the `Specialist` record
 *      directly.
 *
 *   2. **Shared placeholder content** — most tab bodies (timeline,
 *      sparklines, coaching notes, communication threads, 1:1
 *      sessions, workload assignments) are SAME across specialists.
 *      This mirrors the prototype's pattern of one HTML block + JS
 *      data swap of hero/stats only. Per Step 5 Q3 lock: shared
 *      content is faithful; per-specialist content goes through
 *      `getSpecStats` + the Specialist record fields.
 *
 * Name interpolation: tab components inject the specialist's name
 * into shared strings at render time (e.g. "You" vs "{name}" in
 * Communication thread). Mateo's case: both sides render "You"
 * (self-referential) per Q3 reminder.
 */

import type { SpecialistId } from "./team";

/* ============================================================
   Per-Specialist stats (locked at Step 5)
   ============================================================ */

export type SpecStats = {
  /* hero stats strip (5 stats) */
  reviewsMonth: number;
  reviewsMonthSLAPct: number;
  disputesResolvedMonth: number;
  dailyAdherencePct: number;
  /* workload capacity bars (denominators; numerator comes from
     Specialist.workload) */
  contractsCapacity: number;
  reviewsPendingNow: number;
  reviewsPendingCapacity: number;
  /* overview tiles */
  candidatesApprovedMonth: number;
  sourcingProspectsMonth: number;
  hiresPlacedMonth: number;
};

const SPEC_STATS: Record<SpecialistId, SpecStats> = {
  "spec-mateo-vargas": {
    reviewsMonth: 22,
    reviewsMonthSLAPct: 94,
    disputesResolvedMonth: 3,
    dailyAdherencePct: 100,
    contractsCapacity: 12,
    reviewsPendingNow: 3,
    reviewsPendingCapacity: 10,
    candidatesApprovedMonth: 11,
    sourcingProspectsMonth: 48,
    hiresPlacedMonth: 4,
  },
  "spec-priya-mehra": {
    reviewsMonth: 14,
    reviewsMonthSLAPct: 76,
    disputesResolvedMonth: 1,
    dailyAdherencePct: 65,
    contractsCapacity: 8,
    reviewsPendingNow: 6,
    reviewsPendingCapacity: 10,
    candidatesApprovedMonth: 6,
    sourcingProspectsMonth: 38,
    hiresPlacedMonth: 2,
  },
  "spec-diego-cabrera": {
    reviewsMonth: 18,
    reviewsMonthSLAPct: 85,
    disputesResolvedMonth: 4,
    dailyAdherencePct: 95,
    contractsCapacity: 9,
    reviewsPendingNow: 4,
    reviewsPendingCapacity: 10,
    candidatesApprovedMonth: 9,
    sourcingProspectsMonth: 42,
    hiresPlacedMonth: 3,
  },
  "spec-aisha-bello": {
    reviewsMonth: 20,
    reviewsMonthSLAPct: 88,
    disputesResolvedMonth: 2,
    dailyAdherencePct: 80,
    contractsCapacity: 10,
    reviewsPendingNow: 5,
    reviewsPendingCapacity: 10,
    candidatesApprovedMonth: 10,
    sourcingProspectsMonth: 45,
    hiresPlacedMonth: 4,
  },
  "spec-lucas-andersen": {
    reviewsMonth: 28,
    reviewsMonthSLAPct: 90,
    disputesResolvedMonth: 5,
    dailyAdherencePct: 95,
    contractsCapacity: 15,
    reviewsPendingNow: 6,
    reviewsPendingCapacity: 12,
    candidatesApprovedMonth: 14,
    sourcingProspectsMonth: 55,
    hiresPlacedMonth: 5,
  },
  "spec-felipe-santos": {
    reviewsMonth: 16,
    reviewsMonthSLAPct: 92,
    disputesResolvedMonth: 2,
    dailyAdherencePct: 100,
    contractsCapacity: 7,
    reviewsPendingNow: 2,
    reviewsPendingCapacity: 8,
    candidatesApprovedMonth: 8,
    sourcingProspectsMonth: 40,
    hiresPlacedMonth: 3,
  },
  "spec-yara-khalil": {
    reviewsMonth: 24,
    reviewsMonthSLAPct: 95,
    disputesResolvedMonth: 4,
    dailyAdherencePct: 100,
    contractsCapacity: 9,
    reviewsPendingNow: 2,
    reviewsPendingCapacity: 10,
    candidatesApprovedMonth: 12,
    sourcingProspectsMonth: 50,
    hiresPlacedMonth: 5,
  },
  "spec-min-jun-park": {
    reviewsMonth: 19,
    reviewsMonthSLAPct: 91,
    disputesResolvedMonth: 3,
    dailyAdherencePct: 100,
    contractsCapacity: 8,
    reviewsPendingNow: 3,
    reviewsPendingCapacity: 10,
    candidatesApprovedMonth: 9,
    sourcingProspectsMonth: 44,
    hiresPlacedMonth: 4,
  },
  "spec-olena-kovalenko": {
    reviewsMonth: 12,
    reviewsMonthSLAPct: 87,
    disputesResolvedMonth: 1,
    dailyAdherencePct: 100,
    contractsCapacity: 6,
    reviewsPendingNow: 0,
    reviewsPendingCapacity: 8,
    candidatesApprovedMonth: 5,
    sourcingProspectsMonth: 22,
    hiresPlacedMonth: 2,
  },
  "spec-kavi-rajan": {
    reviewsMonth: 17,
    reviewsMonthSLAPct: 89,
    disputesResolvedMonth: 2,
    dailyAdherencePct: 95,
    contractsCapacity: 7,
    reviewsPendingNow: 2,
    reviewsPendingCapacity: 8,
    candidatesApprovedMonth: 8,
    sourcingProspectsMonth: 41,
    hiresPlacedMonth: 3,
  },
  "spec-naomi-adebayo": {
    reviewsMonth: 18,
    reviewsMonthSLAPct: 93,
    disputesResolvedMonth: 2,
    dailyAdherencePct: 100,
    contractsCapacity: 6,
    reviewsPendingNow: 1,
    reviewsPendingCapacity: 8,
    candidatesApprovedMonth: 9,
    sourcingProspectsMonth: 38,
    hiresPlacedMonth: 4,
  },
};

export function getSpecStats(id: SpecialistId): SpecStats {
  return SPEC_STATS[id];
}

/* ============================================================
   Shared content — Overview tab
   ============================================================ */

export type OverviewTimelineEntry = {
  id: string;
  tone: "success" | "attn" | "neutral";
  /** Body may contain a `{name}` placeholder for the specialist's
   *  first name (interpolated at render time). */
  body: string;
  time: string;
};

export const overviewTimelineEntries: ReadonlyArray<OverviewTimelineEntry> = [
  { id: "ovt-1", tone: "success", body: "Approved <strong>Aaliyah Koné</strong> to go live with Lumio Health.", time: "2H AGO" },
  { id: "ovt-2", tone: "neutral", body: "Submitted daily activity report on time.", time: "THIS MORNING" },
  { id: "ovt-3", tone: "attn", body: "Flagged <strong>Mei Chen</strong> for performance review — rating slipping.", time: "YESTERDAY" },
  { id: "ovt-4", tone: "neutral", body: "Resolved dispute filed by Sofia Reyes against Quill &amp; Co.", time: "2D AGO" },
  { id: "ovt-5", tone: "success", body: "Completed re-cert review for 3 candidates.", time: "3D AGO" },
  { id: "ovt-6", tone: "neutral", body: "Started recruitment sprint for category coverage.", time: "5D AGO" },
];

/* ============================================================
   Shared content — Performance tab (4 cards × 4 tiles each)
   ============================================================ */

export type PerfTile = { label: string; value: string; tone?: "success" };
export type PerfCard = {
  id: "reviews" | "disputes" | "sourcing" | "pool";
  eyebrow: string;
  /** "Review **performance**" — em in title. */
  titleLead: string;
  titleEm: string;
  tiles: ReadonlyArray<PerfTile>;
  /** Sparkline heights as percentages (0-100). 7 bars. */
  sparkHeights: ReadonlyArray<number>;
  sparkDir: "up" | "flat";
};

/** Per Step 5 Q3 reminder: sparkline shape shared; tile numbers
 *  per-specialist where derivable. For Step 5 the shape stays static
 *  across specialists (matches prototype's data-swap pattern); the
 *  shape's `tiles[0].value` etc. should ideally vary — left as
 *  placeholder content for now. Future audit may parameterize. */
export const performanceCards: ReadonlyArray<PerfCard> = [
  {
    id: "reviews",
    eyebrow: "Reviews",
    titleLead: "Review",
    titleEm: "performance",
    tiles: [
      { label: "Completed · mo", value: "22" },
      { label: "Avg time", value: "21m" },
      { label: "Approval rate", value: "68%" },
      { label: "SLA hit rate", value: "94%", tone: "success" },
    ],
    sparkHeights: [40, 55, 45, 60, 70, 65, 85],
    sparkDir: "up",
  },
  {
    id: "disputes",
    eyebrow: "Disputes",
    titleLead: "Dispute",
    titleEm: "resolution",
    tiles: [
      { label: "Resolved · mo", value: "3" },
      { label: "Avg time", value: "28h" },
      { label: "SLA hit rate", value: "100%", tone: "success" },
      { label: "In favor of", value: "2C · 1T" },
    ],
    sparkHeights: [60, 75, 50, 80, 65, 90, 70],
    sparkDir: "flat",
  },
  {
    id: "sourcing",
    eyebrow: "Sourcing",
    titleLead: "Sourcing",
    titleEm: "performance",
    tiles: [
      { label: "Prospects · mo", value: "48" },
      { label: "Pass rate", value: "38%" },
      { label: "Hire rate", value: "8%" },
      { label: "Top channel", value: "LinkedIn" },
    ],
    sparkHeights: [30, 45, 55, 50, 70, 60, 80],
    sparkDir: "up",
  },
  {
    id: "pool",
    eyebrow: "Pool",
    titleLead: "Pool",
    titleEm: "management",
    tiles: [
      { label: "Pool size", value: "18" },
      { label: "Threshold", value: "15" },
      { label: "Depletion · 90d", value: "0" },
      { label: "Stability", value: "Stable", tone: "success" },
    ],
    sparkHeights: [50, 55, 60, 62, 58, 65, 60],
    sparkDir: "flat",
  },
];

/* ============================================================
   Shared content — Workload tab
   ============================================================ */

export type WorkloadItem = {
  id: string;
  tone: "neutral" | "urgent" | "attn";
  /** `{name}` and `{first}` placeholders supported. */
  body: string;
  time: string;
};

export const workloadRecentAssignments: ReadonlyArray<WorkloadItem> = [
  { id: "wa-1", tone: "neutral", body: "Took on <strong>4 new candidates</strong> from VA sprint sourcing.", time: "2D AGO" },
  { id: "wa-2", tone: "neutral", body: "Assigned shortlist for <strong>Mercer Capital</strong> bilingual VA role.", time: "4D AGO" },
  { id: "wa-3", tone: "neutral", body: "Received <strong>2 re-cert assignments</strong> from auto-renewal queue.", time: "6D AGO" },
  { id: "wa-4", tone: "neutral", body: "Owns <strong>Sofia Reyes × Quill &amp; Co</strong> dispute (active).", time: "9D AGO" },
];

export const workloadNeedsAttention: ReadonlyArray<WorkloadItem> = [
  { id: "wn-1", tone: "urgent", body: "<strong>3 reviews</strong> waiting · oldest 22h (SLA risk).", time: "NOW" },
  { id: "wn-2", tone: "attn", body: "<strong>1 dispute</strong> active · 14h on 72h SLA.", time: "NOW" },
  { id: "wn-3", tone: "attn", body: "<strong>5 re-certs</strong> in queue.", time: "NOW" },
  { id: "wn-4", tone: "neutral", body: "<strong>1 shortlist</strong> request from Mercer Capital.", time: "NOW" },
];

/* ============================================================
   Shared content — Daily Activity tab (no calendar, per trim b)
   ============================================================ */

export type RecentSubmission = {
  id: string;
  dateLabel: string;
  timeLabel: string;
  stats: ReadonlyArray<{ count: number; label: string }>;
  /** "weekend" excused submissions show grey stats. */
  isExcused?: boolean;
};

export const recentSubmissions: ReadonlyArray<RecentSubmission> = [
  {
    id: "sub-1",
    dateLabel: "Tue Apr 29",
    timeLabel: "Submitted 9:14 AM",
    stats: [
      { count: 14, label: "outreach" },
      { count: 3, label: "check-ins" },
      { count: 2, label: "interviews" },
      { count: 1, label: "signup" },
    ],
  },
  {
    id: "sub-2",
    dateLabel: "Mon Apr 28",
    timeLabel: "Submitted 6:42 PM",
    stats: [
      { count: 21, label: "outreach" },
      { count: 5, label: "check-ins" },
      { count: 4, label: "interviews" },
      { count: 2, label: "signups" },
    ],
  },
  {
    id: "sub-3",
    dateLabel: "Sun Apr 27",
    timeLabel: "Excused — weekend",
    stats: [],
    isExcused: true,
  },
];

/** Today's submission body — interpolation target for "Logged X
 *  outreach, Y check-ins, Z interviews" line. */
export const dailyTodayDetailTemplate =
  "Logged <strong>14 outreach messages</strong>, <strong>3 client check-ins</strong>, and <strong>2 candidate interviews</strong>.";

/* ============================================================
   Shared content — Coaching Notes tab
   ============================================================ */

export type CoachingNote = {
  id: string;
  dateLabel: string;
  age: string;
  tag: "Coaching" | "Quarterly review" | "1:1 follow-up";
  body: string;
};

export const coachingPastNotes: ReadonlyArray<CoachingNote> = [
  {
    id: "cn-1",
    dateLabel: "Apr 20",
    age: "2 weeks ago",
    tag: "Coaching",
    body: "Strong week. Review SLA up to 94%. Talked through dispute pattern with Acme Co — practiced de-escalation script. Watch for similar friction with Mercer Capital next sprint.",
  },
  {
    id: "cn-2",
    dateLabel: "Apr 2",
    age: "last month",
    tag: "Quarterly review",
    body: "Q1 ratings: Reviews 92%, Disputes 88%, Sourcing 80%. Solid overall. Encouraged to take on bilingual sprint as a stretch project. Action: rebalance pool by mid-April.",
  },
  {
    id: "cn-3",
    dateLabel: "Mar 14",
    age: "2 months ago",
    tag: "1:1 follow-up",
    body: "Discussed time management — reviewer load creeping up. Action plan: triage queue first thing daily, batch dispute work in afternoon block. Revisit in 2 weeks.",
  },
];

/* ============================================================
   Shared content — Communication tab
   ============================================================ */

export type ChatMessage = {
  id: string;
  /** "manager" = the logged-in Manager (renders avatar "M" + name
   *  "You"). "specialist" = the specialist whose detail page we're
   *  viewing (renders their avatar + name). For Mateo's self-page,
   *  both sides render as "You". */
  speaker: "manager" | "specialist";
  age: string;
  body: string;
};

export const communicationThread: ReadonlyArray<ChatMessage> = [
  {
    id: "msg-1",
    speaker: "manager",
    age: "3 days ago",
    body: "Hey, quick check-in. Saw your SLA hit rate dipped this week — anything blocking you? Happy to clear queue items together if useful.",
  },
  {
    id: "msg-2",
    speaker: "specialist",
    age: "3 days ago",
    body: "Thanks, appreciated. Had one dispute take the full 60h and back-logged me. Resolved now. Should be back to normal pace tomorrow.",
  },
  {
    id: "msg-3",
    speaker: "manager",
    age: "3 days ago",
    body: "Sounds good. Let me know if you want me to take any of those off your plate. Sprint coordination on Friday?",
  },
];

export type Meeting = {
  id: string;
  dateLabel: string; // "Apr 22 · 30 min"
  topicLead: string; // bold "Sprint coordination"
  topicBody: string;
};

export const past1on1Sessions: ReadonlyArray<Meeting> = [
  {
    id: "mtg-1",
    dateLabel: "Apr 22 · 30 min",
    topicLead: "Sprint coordination",
    topicBody: "VA sprint kickoff. Reviewed channel strategy, set 30-prospect goal for the week. Action: align on geographic targeting.",
  },
  {
    id: "mtg-2",
    dateLabel: "Apr 8 · 45 min",
    topicLead: "Performance review",
    topicBody: "Q1 review. Discussed strengths in sourcing, growth area in dispute handling. Set Q2 goals: maintain 90%+ SLA, take on bilingual sprint.",
  },
  {
    id: "mtg-3",
    dateLabel: "Mar 25 · 30 min",
    topicLead: "Routine sync",
    topicBody: "Workload check, pool health review. Pool stable, no immediate concerns.",
  },
];

/* ============================================================
   Shared content — Their Work tab
   ============================================================ */

export type WorkPortfolioCardDef = {
  id: "candidates" | "clients" | "disputes" | "shortlists" | "full-view";
  title: string;
  /** Resolved from Specialist record at render time when null.
   *  Otherwise hardcoded (shortlist requests, etc.). */
  count: number | null;
  meta: string;
  isFeature?: boolean;
};

/** Counts for `shortlists` + `disputes` are placeholders (not derived
 *  from Specialist — those are dispute records owned per
 *  `manager-active-items.ts`, a Step 7 concern). `candidates` and
 *  `clients` ARE per-specialist (computed at render). */
export const workPortfolioCardDefs: ReadonlyArray<WorkPortfolioCardDef> = [
  { id: "candidates", title: "Their candidates", count: null, meta: "in their pool" },
  { id: "clients", title: "Their clients", count: 12, meta: "in their category" },
  { id: "disputes", title: "Open disputes", count: 1, meta: "they own" },
  { id: "shortlists", title: "Shortlist requests", count: 2, meta: "incomplete" },
  { id: "full-view", title: "Open their full view", count: null, meta: "Read-only · see exactly what they see", isFeature: true },
];
