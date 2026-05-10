/**
 * Mock data for `/specialist/recert-queue`.
 *
 * URL note: the spec PDF lists `/specialist/re-cert-queue` (with hyphen
 * separator). We use `/specialist/recert-queue` to match the source HTML
 * and the route already established in Session 1's `nav-items.ts`. Per
 * the existing "HTML wins" rule (CONVERSION_LOG · Session 1).
 *
 * Recert is lighter than full review (PDF Step 4): the candidate is
 * already approved; the specialist verifies AI scoring of a re-attempt,
 * confirms anti-cheat, and decides re-certify / pause / off-board.
 *
 * Roster (5 candidates) covers every required failure mode:
 *   1. Anand Patel — bulk-approvable + rating climbed (HTML featured)
 *   2. Aaliyah Koné — due in <7 days · action needed
 *   3. Linh Nguyen — bulk-approvable, clean record
 *   4. Marcus Bauer — multiple active engagements (off-board grace visible)
 *   5. Priya Joshi — profile changes flagged for review
 *
 * Anand carries the richest detail data (matches HTML); the other four
 * are tighter but every section is populated.
 */

import {
  type AntiCheatBlock,
  type AvatarGradientKey,
  type DecisionBarConfig,
  type IvCardData,
  type Reference,
  type TabDef,
} from "./queue-types";

/* ============================================================
   Constants — business rules
   ============================================================ */

/** Default re-certification cycle in months (PDF Step 4). */
export const RECERT_CYCLE_MONTHS = 12;

/** Off-board grace-period options shown in the off-board modal. */
export const RECERT_OFFBOARD_GRACE_DAYS = [0, 14, 30] as const;
export type OffboardGraceDays = (typeof RECERT_OFFBOARD_GRACE_DAYS)[number];

/**
 * UX threshold (not from the spec): the bulk-approve action surfaces in
 * the queue rail when at least this many of the queued candidates are
 * `bulkApprovable`. Adjustable as the specialist team gathers usage
 * data — this is a UX decision, not a business rule.
 */
export const RECERT_BULK_APPROVE_MIN = 2;

/** "Re-certify" modal tier-action options. */
export const RECERT_TIER_ACTIONS = [
  { key: "downgrade", label: "Downgrade" },
  { key: "keep", label: "Keep Vetted" },
  { key: "upgrade", label: "Upgrade → Elite ★" },
] as const;

/** Off-board reason chips. */
export const OFFBOARD_REASONS = [
  { key: "performance", label: "Performance decline" },
  { key: "rating", label: "Rating below threshold" },
  { key: "disputes", label: "Repeated disputes" },
  { key: "conduct", label: "Conduct issue" },
  { key: "inactive", label: "Prolonged inactivity" },
  { key: "other", label: "Other" },
] as const;

/** Pause checklist items — matches the HTML pause modal. */
export const RECERT_PAUSE_ITEMS = [
  {
    key: "bio",
    title: "Refresh bio with engineering ops focus",
    detail: "Current bio underweights the strongest specialty.",
  },
  {
    key: "references",
    title: "Add a third reference",
    detail: "Currently only 2 verified. Atlas standard is 3.",
  },
  {
    key: "rate",
    title: "Confirm rate hike with active clients",
    detail:
      "Rate change shouldn't surprise existing clients mid-engagement.",
  },
  {
    key: "domain",
    title: "Optional: domain widening",
    detail:
      "Encourage one engagement outside SaaS / engineering this cycle.",
  },
] as const;

/* ============================================================
   Types
   ============================================================ */

export type CertBand = "fresh" | "warn" | "urgent";
export type RecertTier = "Standard" | "Vetted" | "Elite";
export type RecertRecommendation =
  | "RE-CERTIFY"
  | "RE-CERTIFY+UPGRADE"
  | "PAUSE"
  | "OFF-BOARD";

/** Filter chips on the queue rail. */
export const RECERT_FILTERS = [
  { key: "all", label: "All" },
  { key: "expiring", label: "Expiring" },
  { key: "action", label: "Action" },
] as const;
export type RecertFilterKey = (typeof RECERT_FILTERS)[number]["key"];

/** Tab keys must stay stable — they double as section anchors. */
export const RECERT_TABS: ReadonlyArray<TabDef> = [
  { key: "overview", label: "Overview" },
  { key: "engagement", label: "Engagement" },
  { key: "feedback", label: "Client feedback" },
  { key: "changes", label: "Profile changes" },
  { key: "interview", label: "Re-cert interview" },
  { key: "references", label: "References" },
  { key: "anti-cheat", label: "Anti-cheat" },
  { key: "assessment", label: "AI assessment" },
  { key: "notes", label: "Notes" },
];

export type Engagement = {
  id: string;
  clientName: string;
  clientInitials: string;
  clientGradient: 1 | 2 | 3 | 4;
  role: string;
  status: "active" | "completed";
  hours: number;
  rating: number;
};

export type ClientQuote = {
  id: string;
  text: string;
  author: string;
  date: string;
  /** 1–5. */
  rating: number;
  /** Set when the quote is critical / requires specialist eyes. */
  warn?: boolean;
};

export type ClientFeedback = {
  averageRating: number;
  totalReviews: number;
  /** Distribution by star count. Sums to totalReviews. */
  distribution: { 5: number; 4: number; 3: number; 2: number; 1: number };
  /** "Top 5%", "Top 10%" — matches HTML rc-rating-tier. */
  percentileLabel: string;
  quotes: ReadonlyArray<ClientQuote>;
};

export type ProfileDiff = {
  id: string;
  kind: "changed" | "added";
  field: string;
  body: string;
  /** Only set for `kind: "changed"`. */
  oldValue?: string;
  newValue?: string;
  /**
   * When true, the row renders a "View diff" link after the body text
   * that opens `<PreviewUnavailableModal kind="document">` — honest
   * treatment for the source-HTML "View diff" affordance backed by no
   * actual diff content yet. See `recert-queue/sections.tsx`
   * `ChangesSection`. Currently only set on bio-refresh rows.
   */
  viewDiff?: boolean;
};

export type RecertOverviewStripe = {
  monthsInPool: number;
  poolJoinedDate: string;
  /** Tier text, e.g. "Vetted" or "Vetted → Elite" when an upgrade is recommended. */
  currentTierLabel: string;
  /** Plain text below the tier — "Recommended upgrade based on rating". */
  tierDetail: string;
  nextCertDate: string;
  cycleNote: string;
};

export type RecertKpi = {
  label: string;
  /** Numeric value rendered as a big number. */
  value: number;
  /** Optional unit shown after the number ("h", "/5"). */
  suffix?: string;
  /** Trend label ("↑ 2 vs first cert"). */
  trendLabel: string;
  trendTone: "success" | "neutral";
};

export type RecertInterviewBlock = {
  durationLabel: string;
  recordedLabel: string;
  passed: boolean;
  card: IvCardData;
};

export type RecertCandidate = {
  /* identity & queue rail row */
  id: string;
  firstName: string;
  fullName: string;
  age: number;
  countryFlag: string;
  countryName: string;
  city: string;
  category: string;
  initials: string;
  avatarGradient?: AvatarGradientKey;

  /* queue rail */
  certExpiresInDays: number;
  totalHoursWorked: number;
  certBand: CertBand;
  filterTags: ReadonlyArray<RecertFilterKey>;
  bulkApprovable: boolean;

  /* identity row */
  monthsInPool: number;
  currentTier: RecertTier;
  recommendedTier: RecertTier;
  averageRating: number;

  /* tabs (badges differ per candidate) */
  tabs: ReadonlyArray<TabDef>;

  /* sections */
  overviewStripe: RecertOverviewStripe;
  overviewKpis: ReadonlyArray<RecertKpi>;
  overviewSummary: { label: string; body: string };
  engagements: ReadonlyArray<Engagement>;
  feedback: ClientFeedback;
  profileChanges: ReadonlyArray<ProfileDiff>;
  recertInterview: RecertInterviewBlock;
  references: ReadonlyArray<Reference>;
  antiCheat: AntiCheatBlock;
  assessment: { card: IvCardData; nextPlacementLabel?: string; nextPlacementBody?: string };

  /* decision bar */
  decisionBar: DecisionBarConfig;

  aiRecommendation: RecertRecommendation;
};

/* ============================================================
   Reusable blocks
   ============================================================ */

const ANTI_CHEAT_CLEAN_RECERT: AntiCheatBlock = {
  flagsRaised: false,
  summary:
    "12 months in pool, zero flags. Integrity record is among the cleanest in the category.",
  checks: [
    {
      title: "Re-cert interview integrity",
      detail:
        "Live proctoring clean · no flags · biometric re-match 99.6% against original ID.",
      passed: true,
    },
    {
      title: "Active session monitoring (12 mo)",
      detail:
        "No anomalies across all client-side hours. No login from unverified geographies.",
      passed: true,
    },
    {
      title: "Profile authenticity",
      detail:
        "Self-reported additions cross-verified with active client engagements. 0% match on plagiarism check of bio refresh.",
      passed: true,
    },
    {
      title: "Reference cross-validation",
      detail:
        "Both references confirmed identity match. New reference verified via corporate email + LinkedIn.",
      passed: true,
    },
  ],
};

/* ============================================================
   1. Anand Patel — bulk-approvable, rating climbed, tier upgrade
   ============================================================ */

const anand: RecertCandidate = {
  id: "rc-anand-patel",
  firstName: "Anand",
  fullName: "Anand Patel",
  age: 30,
  countryFlag: "🇮🇳",
  countryName: "India",
  city: "Mumbai",
  category: "Virtual Assistant",
  initials: "A",
  avatarGradient: "caramel",
  certExpiresInDays: 14,
  totalHoursWorked: 1420,
  certBand: "warn",
  filterTags: ["all"],
  bulkApprovable: true,
  monthsInPool: 12,
  currentTier: "Vetted",
  recommendedTier: "Elite",
  averageRating: 4.8,
  tabs: [
    RECERT_TABS[0]!,
    { key: "engagement", label: "Engagement", badge: { kind: "number", value: 8 } },
    { key: "feedback", label: "Client feedback", badge: { kind: "number", value: "★4.8" } },
    { key: "changes", label: "Profile changes", badge: { kind: "number", value: 5 } },
    { key: "interview", label: "Re-cert interview", badge: { kind: "number", value: 82 } },
    RECERT_TABS[5]!,
    RECERT_TABS[6]!,
    RECERT_TABS[7]!,
    RECERT_TABS[8]!,
  ],
  overviewStripe: {
    monthsInPool: 12,
    poolJoinedDate: "Joined Apr 28, 2025 · first cert",
    currentTierLabel: "Vetted → Elite",
    tierDetail: "Recommended upgrade based on rating",
    nextCertDate: "Apr 2027",
    cycleNote: "12-month cycle (or sooner if disputes)",
  },
  overviewKpis: [
    { label: "Engagements", value: 8, trendLabel: "↑ 2 vs first cert", trendTone: "success" },
    { label: "Hours worked", value: 1420, suffix: "h", trendLabel: "↗ steady cadence", trendTone: "neutral" },
    { label: "Avg rating", value: 4.8, suffix: "/5", trendLabel: "↑ from 4.6", trendTone: "success" },
    { label: "Disputes", value: 0, trendLabel: "clean record", trendTone: "success" },
  ],
  overviewSummary: {
    label: "AI summary",
    body: "Anand has performed exceptionally well over his first 12 months in the Virtual Assistants pool. Eight engagements completed (2 still active), 1,420 hours billed, and a 4.8 average rating that puts him in the top 5% of the category. Zero disputes. Re-cert interview score (82) is consistent with his original 84. Recommend re-certify with tier upgrade from Vetted to Elite.",
  },
  engagements: [
    { id: "eng-anand-1", clientName: "Acme Co", clientInitials: "AC", clientGradient: 1, role: "Lead engineer ops · long-term", status: "active", hours: 320, rating: 5.0 },
    { id: "eng-anand-2", clientName: "TechFlow Inc", clientInitials: "TF", clientGradient: 2, role: "Product team support · ongoing", status: "active", hours: 410, rating: 5.0 },
    { id: "eng-anand-3", clientName: "Lumio Health", clientInitials: "LH", clientGradient: 3, role: "Patient comms support", status: "completed", hours: 240, rating: 5.0 },
    { id: "eng-anand-4", clientName: "Quill & Co", clientInitials: "QC", clientGradient: 4, role: "Editorial coordination", status: "completed", hours: 180, rating: 4.5 },
    { id: "eng-anand-5", clientName: "Mercer Capital", clientInitials: "MC", clientGradient: 1, role: "Investment ops admin", status: "completed", hours: 95, rating: 5.0 },
    { id: "eng-anand-6", clientName: "Bridgepoint LLC", clientInitials: "BL", clientGradient: 2, role: "M&A research support", status: "completed", hours: 75, rating: 4.0 },
    { id: "eng-anand-7", clientName: "Northwind Solutions", clientInitials: "NS", clientGradient: 3, role: "CRM cleanup project", status: "completed", hours: 60, rating: 5.0 },
    { id: "eng-anand-8", clientName: "Vertex Health", clientInitials: "VH", clientGradient: 4, role: "Onboarding admin", status: "completed", hours: 40, rating: 4.5 },
  ],
  feedback: {
    averageRating: 4.8,
    totalReviews: 17,
    distribution: { 5: 13, 4: 3, 3: 1, 2: 0, 1: 0 },
    percentileLabel: "★ Top 5% in Virtual Assistants",
    quotes: [
      {
        id: "q-anand-1",
        text: "Anand has been one of the best hires I've made through any platform. He runs my eng leadership calendar tighter than I do, surfaces things I didn't know I needed surfaced, and never once dropped a ball.",
        author: "Sarah Lin, CEO Acme Co",
        date: "Apr 12, 2026",
        rating: 5,
      },
      {
        id: "q-anand-2",
        text: "Quietly competent. We've worked with three Atlas VAs and Anand is the one we asked to extend twice. The ops documentation he leaves behind is genuinely better than what we had before he started.",
        author: "David Park, CTO TechFlow Inc",
        date: "Mar 28, 2026",
        rating: 5,
      },
      {
        id: "q-anand-3",
        text: "Sharp and proactive. Caught two scheduling conflicts before they happened during our Q4 close. Would hire again.",
        author: "Priya Mehta, Ops Lead Mercer Capital",
        date: "Feb 14, 2026",
        rating: 5,
      },
      {
        id: "q-anand-4",
        warn: true,
        text: "Solid work overall. Pacing was a bit slow on the M&A research piece — I think the domain was new for him. Final output was good. Would consider for non-research engagements.",
        author: "Tomás Silva, Partner Bridgepoint LLC",
        date: "Jan 8, 2026",
        rating: 4,
      },
    ],
  },
  profileChanges: [
    {
      id: "diff-anand-1",
      kind: "changed",
      field: "Hourly rate",
      body: "raised Mar 12, 2026 after 4.8 rating milestone",
      oldValue: "$14/hr",
      newValue: "$16/hr",
    },
    {
      id: "diff-anand-2",
      kind: "added",
      field: "New skill: Asana",
      body: "Self-reported · used in 2 active engagements (TechFlow, Acme Co)",
    },
    {
      id: "diff-anand-3",
      kind: "added",
      field: "New skill: Linear",
      body: "Self-reported · used in TechFlow Inc engagement",
    },
    {
      id: "diff-anand-4",
      kind: "added",
      field: "New skill: Intercom",
      body: "Self-reported · used in Lumio Health customer support",
    },
    {
      id: "diff-anand-5",
      kind: "changed",
      field: "Bio refresh",
      body:
        "Lightly rewritten Mar 2 — added \"engineering operations\" focus, removed older Word/Excel emphasis.",
      viewDiff: true,
    },
  ],
  recertInterview: {
    durationLabel: "18 min · Apr 26, 2:14 PM IST",
    recordedLabel: "Apr 26, 2:14 PM IST",
    passed: true,
    card: {
      overall: 82,
      tierLabel: "Consistent",
      overallBand: "mid",
      subs: [
        { label: "Communication", score: 88, band: "high" },
        { label: "Domain knowledge", score: 86, band: "high" },
        { label: "Tool proficiency", score: 82, band: "mid" },
        { label: "Professional judgment", score: 80, band: "mid" },
      ],
      highlights: {
        positiveLabel: "What's grown",
        positives: [
          "Stronger frameworks for handling ambiguous priorities",
          "More confident on tool fluency (Asana, Linear self-taught well)",
          "Better at proactive communication — flags issues 1-2 days earlier than at first cert",
        ],
        negativeLabel: "Stable / unchanged",
        negatives: ["Domain breadth still narrower (best in tech / SaaS contexts)"],
      },
      commentary: {
        label: "AI commentary",
        body: "Re-cert interview shows steady-to-improving performance. The 82 is 2 points lower than his first Interview 2 (84) but the subscore mix has shifted upward in communication and judgment, which matters more for senior engagements. Recommend pass.",
      },
    },
  },
  references: [
    {
      id: "ref-anand-1",
      initials: "AS",
      name: "Adya Sharma",
      relation: "VP Operations · former Bansal Group · 4 years (2021–2025)",
      quote:
        "Still the same Anand. Reached out for a quick chat — he's exactly where I'd expect him to be at this stage. Vouches still hold.",
      status: "confirmed",
      statusLabel: "Verified · Strong",
      contactMeta: "Apr 25 · 8 min call",
      badge: { label: "RE-CONFIRMED", tone: "neutral" },
    },
    {
      id: "ref-anand-2",
      initials: "DP",
      avatarGradient: "navy",
      name: "David Park",
      relation: "CTO · TechFlow Inc · 6 months ongoing engagement",
      quote:
        "Happy to back this. Anand has lifted my whole eng leadership ops over six months. If you're going to upgrade his tier, do it.",
      status: "confirmed",
      statusLabel: "Verified · Strong",
      contactMeta: "Apr 24 · email + 12 min",
      badge: { label: "NEW · ACTIVE CLIENT", tone: "success" },
    },
  ],
  antiCheat: ANTI_CHEAT_CLEAN_RECERT,
  assessment: {
    card: {
      overall: 88,
      tierLabel: "★ Elite tier candidate",
      overallBand: "high",
      subs: [
        { label: "Confidence", score: 89, display: "89%", band: "high" },
        { label: "Performance trend", score: 92, band: "high" },
        { label: "Pool match score", score: 90, band: "high" },
      ],
      highlights: {
        positiveLabel: "Why upgrade",
        positives: [
          "Rating climbed from 4.6 → 4.8 over 12 months",
          "Two active clients explicitly asked to extend",
          "One reference (David Park) directly recommended tier upgrade",
          "Zero disputes, zero anti-cheat flags across 1,420 hours",
          "Self-driven skill expansion (Asana / Linear / Intercom) all verified in active work",
        ],
        negativeLabel: "Worth noting",
        negatives: [
          "Domain breadth still narrower (best in SaaS / engineering ops than research / finance)",
          "The Bridgepoint 4.0 rating from M&A engagement is the only sub-5★ score",
        ],
      },
    },
    nextPlacementLabel: "Recommended next placement",
    nextPlacementBody:
      "Match priority: senior engineering / product ops roles, ongoing engagements over one-off projects. Avoid: short-term M&A or finance research projects unless explicitly requested.",
  },
  decisionBar: {
    aiRecommendation: "AI recommends RE-CERTIFY + UPGRADE",
    aiConfidence: "89% confidence",
    averageMinutes: "14m",
    sectionsReviewed: 1,
    sectionsTotal: 9,
    destructive: { label: "Off-board", longLabel: "Off-board" },
    neutral: { label: "Pause", longLabel: "Pause for action" },
    primary: { label: "Re-certify & advance →" },
  },
  aiRecommendation: "RE-CERTIFY+UPGRADE",
};

/* ============================================================
   Tighter candidates 2–5
   ============================================================ */

function tightRecertCard(args: {
  overall: number;
  band: "high" | "mid" | "low";
  tierLabel: string;
  positives: ReadonlyArray<string>;
  negatives: ReadonlyArray<string>;
  positiveLabel?: string;
  negativeLabel?: string;
  commentary?: string;
}): IvCardData {
  return {
    overall: args.overall,
    tierLabel: args.tierLabel,
    overallBand: args.band,
    subs: [
      { label: "Communication", score: args.overall, band: args.band },
      { label: "Domain knowledge", score: args.overall, band: args.band },
      { label: "Tool proficiency", score: args.overall, band: args.band },
      { label: "Professional judgment", score: args.overall, band: args.band },
    ],
    highlights: {
      positiveLabel: args.positiveLabel ?? "What's grown",
      positives: args.positives,
      negativeLabel: args.negativeLabel ?? "Stable / unchanged",
      negatives: args.negatives,
    },
    ...(args.commentary
      ? { commentary: { label: "AI commentary", body: args.commentary } }
      : {}),
  };
}

/* ---------- 2. Aaliyah Koné — due in 5 days, action needed ---------- */

const aaliyah: RecertCandidate = {
  id: "rc-aaliyah-kone",
  firstName: "Aaliyah",
  fullName: "Aaliyah Koné",
  age: 33,
  countryFlag: "🇨🇮",
  countryName: "Côte d'Ivoire",
  city: "Abidjan",
  category: "Virtual Assistant",
  initials: "A",
  avatarGradient: "olive",
  certExpiresInDays: 5,
  totalHoursWorked: 980,
  certBand: "urgent",
  filterTags: ["all", "expiring", "action"],
  bulkApprovable: false,
  monthsInPool: 14,
  currentTier: "Vetted",
  recommendedTier: "Vetted",
  averageRating: 4.1,
  tabs: RECERT_TABS,
  overviewStripe: {
    monthsInPool: 14,
    poolJoinedDate: "Joined Mar 2, 2025 · first cert",
    currentTierLabel: "Vetted",
    tierDetail: "Hold tier; address performance dip first",
    nextCertDate: "Re-cert decision needed within 5 days",
    cycleNote: "12-month cycle · earlier review triggered by rating drop",
  },
  overviewKpis: [
    { label: "Engagements", value: 6, trendLabel: "→ flat", trendTone: "neutral" },
    { label: "Hours worked", value: 980, suffix: "h", trendLabel: "↓ from 1,200 last cycle", trendTone: "neutral" },
    { label: "Avg rating", value: 4.1, suffix: "/5", trendLabel: "↓ from 4.5", trendTone: "neutral" },
    { label: "Disputes", value: 1, trendLabel: "1 unresolved", trendTone: "neutral" },
  ],
  overviewSummary: {
    label: "AI summary",
    body: "Aaliyah's metrics have softened over the last six months. Rating dropped 4.5 → 4.1 across the most recent engagements, and one open dispute is unresolved. Re-cert interview scored 75 (down from 81 at first cert). Recommend Pause for action with a 14-day window to address the dispute and refresh her engagement profile, rather than off-boarding outright.",
  },
  engagements: [
    { id: "eng-aaliyah-1", clientName: "Sahara Logistics", clientInitials: "SL", clientGradient: 2, role: "Operations support", status: "active", hours: 280, rating: 4.5 },
    { id: "eng-aaliyah-2", clientName: "Ferry Logistics", clientInitials: "FL", clientGradient: 1, role: "Customer ops", status: "completed", hours: 220, rating: 4.0 },
    { id: "eng-aaliyah-3", clientName: "Akwaba Co", clientInitials: "AK", clientGradient: 3, role: "Bilingual customer support", status: "completed", hours: 180, rating: 3.5 },
    { id: "eng-aaliyah-4", clientName: "Pan-Africa SaaS", clientInitials: "PA", clientGradient: 4, role: "Vendor coordination", status: "completed", hours: 140, rating: 4.0 },
    { id: "eng-aaliyah-5", clientName: "Lumio Health", clientInitials: "LH", clientGradient: 3, role: "Patient comms support", status: "completed", hours: 90, rating: 5.0 },
    { id: "eng-aaliyah-6", clientName: "TechFlow Inc", clientInitials: "TF", clientGradient: 2, role: "Internal admin", status: "completed", hours: 70, rating: 4.5 },
  ],
  feedback: {
    averageRating: 4.1,
    totalReviews: 9,
    distribution: { 5: 2, 4: 5, 3: 2, 2: 0, 1: 0 },
    percentileLabel: "Mid-pool",
    quotes: [
      {
        id: "q-aaliyah-1",
        text: "Aaliyah is a careful operator and bilingual support is rare. The Sahara engagement has been the strongest fit.",
        author: "Adama Touré, COO Sahara Logistics",
        date: "Apr 8, 2026",
        rating: 5,
      },
      {
        id: "q-aaliyah-2",
        warn: true,
        text: "Quality dipped over the last quarter. Some response delays and a missed handover. We're working through a hours-billed dispute.",
        author: "Marie Bastien, Founder Ferry Logistics",
        date: "Mar 22, 2026",
        rating: 3,
      },
    ],
  },
  profileChanges: [
    { id: "diff-aaliyah-1", kind: "changed", field: "Bio", body: "Lightly edited last week", oldValue: "(omitted)", newValue: "(omitted)" },
  ],
  recertInterview: {
    durationLabel: "16 min · Apr 27, 9:00 AM GMT",
    recordedLabel: "Apr 27, 9:00 AM GMT",
    passed: true,
    card: tightRecertCard({
      overall: 75,
      band: "mid",
      tierLabel: "Slight regression",
      positives: ["Bilingual fluency stable"],
      negatives: ["Tone less proactive than first-cert recording", "Tool-fluency narrower than profile claims"],
      negativeLabel: "Watch",
      commentary:
        "Recert score 75 vs original 81 — small regression. Pause + action items more useful than off-board.",
    }),
  },
  references: [
    {
      id: "ref-aaliyah-1",
      initials: "AT",
      avatarGradient: "warm",
      name: "Adama Touré",
      relation: "COO Sahara Logistics · 14 months ongoing",
      quote: "Want her to stay. The dispute is resolvable.",
      status: "confirmed",
      statusLabel: "Verified · Supportive",
      contactMeta: "Apr 27 · 10 min phone",
      badge: { label: "NEW · ACTIVE CLIENT", tone: "success" },
    },
  ],
  antiCheat: ANTI_CHEAT_CLEAN_RECERT,
  assessment: {
    card: tightRecertCard({
      overall: 70,
      band: "mid",
      tierLabel: "PAUSE FOR ACTION",
      positives: ["Active client supports retention", "Anti-cheat clean"],
      negatives: [
        "Open dispute must close before re-cert",
        "Rating trajectory needs to stabilize",
      ],
      positiveLabel: "Why not off-board yet",
      negativeLabel: "Why pause",
    }),
    nextPlacementLabel: "Recommended next placement",
    nextPlacementBody: "Bilingual support / Francophone client engagements only · short-term until dispute closes.",
  },
  decisionBar: {
    aiRecommendation: "AI recommends PAUSE",
    aiConfidence: "72% confidence",
    averageMinutes: "14m",
    sectionsReviewed: 0,
    sectionsTotal: 9,
    destructive: { label: "Off-board", longLabel: "Off-board" },
    neutral: { label: "Pause", longLabel: "Pause for action" },
    primary: { label: "Re-certify & advance →" },
  },
  aiRecommendation: "PAUSE",
};

/* ---------- 3. Linh Nguyen — bulk-approvable, clean record ---------- */

const linhRecert: RecertCandidate = {
  id: "rc-linh-nguyen",
  firstName: "Linh",
  fullName: "Linh Nguyen",
  age: 31,
  countryFlag: "🇻🇳",
  countryName: "Vietnam",
  city: "Hanoi",
  category: "Virtual Assistant",
  initials: "L",
  avatarGradient: "navy",
  certExpiresInDays: 22,
  totalHoursWorked: 2180,
  certBand: "fresh",
  filterTags: ["all"],
  bulkApprovable: true,
  monthsInPool: 18,
  currentTier: "Standard",
  recommendedTier: "Vetted",
  averageRating: 4.5,
  tabs: RECERT_TABS,
  overviewStripe: {
    monthsInPool: 18,
    poolJoinedDate: "Joined Oct 2024 · second cycle",
    currentTierLabel: "Standard → Vetted",
    tierDetail: "Recommended upgrade · steady performer",
    nextCertDate: "Apr 2027",
    cycleNote: "12-month cycle",
  },
  overviewKpis: [
    { label: "Engagements", value: 11, trendLabel: "↑ 4 vs last cycle", trendTone: "success" },
    { label: "Hours worked", value: 2180, suffix: "h", trendLabel: "↗ steady cadence", trendTone: "neutral" },
    { label: "Avg rating", value: 4.5, suffix: "/5", trendLabel: "→ flat", trendTone: "neutral" },
    { label: "Disputes", value: 0, trendLabel: "clean record", trendTone: "success" },
  ],
  overviewSummary: {
    label: "AI summary",
    body: "Linh is the kind of candidate the bulk-approve flow exists for. Steady-to-improving performance, clean record, recert interview consistent with first cert, two references re-confirmed. Auto-approvable.",
  },
  engagements: [
    { id: "eng-linh-1", clientName: "Hanoi Coffee Co", clientInitials: "HC", clientGradient: 1, role: "Remote ops", status: "active", hours: 480, rating: 5.0 },
    { id: "eng-linh-2", clientName: "Saunders SaaS", clientInitials: "SS", clientGradient: 2, role: "Customer ops", status: "completed", hours: 360, rating: 4.5 },
    { id: "eng-linh-3", clientName: "Northwind", clientInitials: "NW", clientGradient: 3, role: "Internal admin", status: "completed", hours: 280, rating: 4.5 },
  ],
  feedback: {
    averageRating: 4.5,
    totalReviews: 11,
    distribution: { 5: 5, 4: 5, 3: 1, 2: 0, 1: 0 },
    percentileLabel: "Top 25%",
    quotes: [
      {
        id: "q-linh-1",
        text: "Linh has been our remote ops anchor across two cycles. Steady, dependable, low-drama.",
        author: "Anh Tran, Founder Hanoi Coffee Co",
        date: "Apr 14, 2026",
        rating: 5,
      },
    ],
  },
  profileChanges: [],
  recertInterview: {
    durationLabel: "15 min · Apr 26, 8:30 AM ICT",
    recordedLabel: "Apr 26, 8:30 AM ICT",
    passed: true,
    card: tightRecertCard({
      overall: 81,
      band: "mid",
      tierLabel: "Consistent",
      positives: ["Steady operator"],
      negatives: ["No notable changes"],
    }),
  },
  references: [
    {
      id: "ref-linh-1",
      initials: "AT",
      avatarGradient: "warm",
      name: "Anh Tran",
      relation: "Founder Hanoi Coffee Co · 2.5 years",
      quote: "Lock her in. Not losing this one.",
      status: "confirmed",
      statusLabel: "Verified · Strong",
      contactMeta: "Apr 26 · phone",
      badge: { label: "RE-CONFIRMED", tone: "neutral" },
    },
  ],
  antiCheat: ANTI_CHEAT_CLEAN_RECERT,
  assessment: {
    card: tightRecertCard({
      overall: 84,
      band: "high",
      tierLabel: "★ RE-CERTIFY · BULK OK",
      positives: ["Steady-to-improving across the board", "Strong references re-confirmed"],
      negatives: [],
      positiveLabel: "Why bulk-approve",
    }),
    nextPlacementLabel: "Recommended next placement",
    nextPlacementBody: "Remote SaaS ops · long-term engagements.",
  },
  decisionBar: {
    aiRecommendation: "AI recommends RE-CERTIFY (bulk-eligible)",
    aiConfidence: "92% confidence",
    averageMinutes: "14m",
    sectionsReviewed: 0,
    sectionsTotal: 9,
    destructive: { label: "Off-board", longLabel: "Off-board" },
    neutral: { label: "Pause", longLabel: "Pause for action" },
    primary: { label: "Re-certify & advance →" },
  },
  aiRecommendation: "RE-CERTIFY",
};

/* ---------- 4. Marcus Bauer — multiple active engagements (off-board grace visible) ---------- */

const marcus: RecertCandidate = {
  id: "rc-marcus-bauer",
  firstName: "Marcus",
  fullName: "Marcus Bauer",
  age: 38,
  countryFlag: "🇩🇪",
  countryName: "Germany",
  city: "Berlin",
  category: "Virtual Assistant",
  initials: "M",
  avatarGradient: "purple",
  certExpiresInDays: 28,
  totalHoursWorked: 1860,
  certBand: "fresh",
  filterTags: ["all"],
  bulkApprovable: false,
  monthsInPool: 22,
  currentTier: "Elite",
  recommendedTier: "Elite",
  averageRating: 4.7,
  tabs: RECERT_TABS,
  overviewStripe: {
    monthsInPool: 22,
    poolJoinedDate: "Joined Jul 2024 · second cycle",
    currentTierLabel: "Elite",
    tierDetail: "Three active client engagements · grace period applies if off-boarded",
    nextCertDate: "Apr 2027",
    cycleNote: "12-month cycle · 14-day grace default",
  },
  overviewKpis: [
    { label: "Engagements", value: 9, trendLabel: "↑ 1 vs last cycle", trendTone: "success" },
    { label: "Hours worked", value: 1860, suffix: "h", trendLabel: "↗ healthy", trendTone: "neutral" },
    { label: "Avg rating", value: 4.7, suffix: "/5", trendLabel: "→ flat", trendTone: "neutral" },
    { label: "Disputes", value: 0, trendLabel: "clean record", trendTone: "success" },
  ],
  overviewSummary: {
    label: "AI summary",
    body: "Marcus has three currently-active engagements with confirmed extension intent from each client. If specialist decides off-board (no current signal supports that), the grace-period selector applies — default 14 days lets active engagements wind down.",
  },
  engagements: [
    { id: "eng-marcus-1", clientName: "Berlin SaaS", clientInitials: "BS", clientGradient: 1, role: "Engineering ops · ongoing", status: "active", hours: 580, rating: 5.0 },
    { id: "eng-marcus-2", clientName: "Munich Health", clientInitials: "MH", clientGradient: 2, role: "Patient comms", status: "active", hours: 420, rating: 4.5 },
    { id: "eng-marcus-3", clientName: "Helsinki Group", clientInitials: "HG", clientGradient: 3, role: "Cross-EU ops", status: "active", hours: 360, rating: 5.0 },
  ],
  feedback: {
    averageRating: 4.7,
    totalReviews: 9,
    distribution: { 5: 6, 4: 3, 3: 0, 2: 0, 1: 0 },
    percentileLabel: "Top 10%",
    quotes: [
      {
        id: "q-marcus-1",
        text: "Methodical, German-precise, English-fluent. We've extended Marcus three times.",
        author: "Hannah Weber, Head of Ops Berlin SaaS",
        date: "Apr 6, 2026",
        rating: 5,
      },
    ],
  },
  profileChanges: [],
  recertInterview: {
    durationLabel: "17 min · Apr 26, 11:00 AM CET",
    recordedLabel: "Apr 26, 11:00 AM CET",
    passed: true,
    card: tightRecertCard({
      overall: 86,
      band: "high",
      tierLabel: "Strong",
      positives: ["Methodical, well-prepared", "Tooling broadened"],
      negatives: ["No notable concerns"],
    }),
  },
  references: [
    {
      id: "ref-marcus-1",
      initials: "HW",
      avatarGradient: "warm",
      name: "Hannah Weber",
      relation: "Head of Ops Berlin SaaS · 18 months",
      quote: "Re-certify him. We're not the only client extending.",
      status: "confirmed",
      statusLabel: "Verified · Strong",
      contactMeta: "Apr 25 · phone",
      badge: { label: "RE-CONFIRMED", tone: "neutral" },
    },
  ],
  antiCheat: ANTI_CHEAT_CLEAN_RECERT,
  assessment: {
    card: tightRecertCard({
      overall: 87,
      band: "high",
      tierLabel: "RE-CERTIFY",
      positives: [
        "Three active engagements · all extending",
        "Top-of-pool consistency",
      ],
      negatives: ["Off-board grace would matter — three active clients to honor"],
      positiveLabel: "Why re-certify",
      negativeLabel: "Why not off-board",
    }),
    nextPlacementLabel: "Active placement",
    nextPlacementBody: "Continue current EU-tech engagements; new placements only after current ones wind down.",
  },
  decisionBar: {
    aiRecommendation: "AI recommends RE-CERTIFY",
    aiConfidence: "88% confidence",
    averageMinutes: "14m",
    sectionsReviewed: 0,
    sectionsTotal: 9,
    destructive: { label: "Off-board", longLabel: "Off-board" },
    neutral: { label: "Pause", longLabel: "Pause for action" },
    primary: { label: "Re-certify & advance →" },
  },
  aiRecommendation: "RE-CERTIFY",
};

/* ---------- 5. Priya Joshi — profile changes flagged ---------- */

const priya: RecertCandidate = {
  id: "rc-priya-joshi",
  firstName: "Priya",
  fullName: "Priya Joshi",
  age: 29,
  countryFlag: "🇮🇳",
  countryName: "India",
  city: "Bengaluru",
  category: "Virtual Assistant",
  initials: "P",
  avatarGradient: "lime",
  certExpiresInDays: 18,
  totalHoursWorked: 1240,
  certBand: "warn",
  filterTags: ["all", "action"],
  bulkApprovable: false,
  monthsInPool: 14,
  currentTier: "Vetted",
  recommendedTier: "Vetted",
  averageRating: 4.6,
  tabs: [
    RECERT_TABS[0]!,
    RECERT_TABS[1]!,
    RECERT_TABS[2]!,
    { key: "changes", label: "Profile changes", badge: { kind: "dot", tone: "danger" } },
    RECERT_TABS[4]!,
    RECERT_TABS[5]!,
    RECERT_TABS[6]!,
    RECERT_TABS[7]!,
    RECERT_TABS[8]!,
  ],
  overviewStripe: {
    monthsInPool: 14,
    poolJoinedDate: "Joined Mar 2025 · first cert",
    currentTierLabel: "Vetted",
    tierDetail: "Hold tier; verify profile changes",
    nextCertDate: "Apr 2027 · pending",
    cycleNote: "12-month cycle",
  },
  overviewKpis: [
    { label: "Engagements", value: 7, trendLabel: "↑ first cycle", trendTone: "success" },
    { label: "Hours worked", value: 1240, suffix: "h", trendLabel: "↗ healthy", trendTone: "neutral" },
    { label: "Avg rating", value: 4.6, suffix: "/5", trendLabel: "→ flat", trendTone: "neutral" },
    { label: "Disputes", value: 0, trendLabel: "clean record", trendTone: "success" },
  ],
  overviewSummary: {
    label: "AI summary",
    body: "Priya's metrics are healthy but six profile claims added in the last 30 days exceed the bulk-approve threshold for self-reported skills. Specialist should verify the additions against active client work before re-certifying.",
  },
  engagements: [
    { id: "eng-priya-1", clientName: "Bengaluru Bio", clientInitials: "BB", clientGradient: 1, role: "Research admin", status: "active", hours: 320, rating: 5.0 },
    { id: "eng-priya-2", clientName: "Quill & Co", clientInitials: "QC", clientGradient: 2, role: "Editorial coord", status: "completed", hours: 240, rating: 4.5 },
  ],
  feedback: {
    averageRating: 4.6,
    totalReviews: 7,
    distribution: { 5: 4, 4: 3, 3: 0, 2: 0, 1: 0 },
    percentileLabel: "Top 20%",
    quotes: [
      {
        id: "q-priya-1",
        text: "Priya is exceptional at research admin. Her synthesis is consistently better than what I get from senior analysts.",
        author: "Vikram Iyer, CSO Bengaluru Bio",
        date: "Apr 4, 2026",
        rating: 5,
      },
    ],
  },
  profileChanges: [
    { id: "diff-priya-1", kind: "added", field: "New skill: Salesforce Admin", body: "Self-reported · verification needed" },
    { id: "diff-priya-2", kind: "added", field: "New skill: Tableau", body: "Self-reported · no engagement evidence yet" },
    { id: "diff-priya-3", kind: "added", field: "New skill: SQL (intermediate)", body: "Self-reported · verification needed" },
    { id: "diff-priya-4", kind: "added", field: "New skill: Looker", body: "Self-reported · no engagement evidence yet" },
    { id: "diff-priya-5", kind: "added", field: "New skill: HubSpot Ops", body: "Self-reported · verification needed" },
    { id: "diff-priya-6", kind: "changed", field: "Hourly rate", body: "raised in same week as skill additions", oldValue: "$15/hr", newValue: "$22/hr" },
  ],
  recertInterview: {
    durationLabel: "16 min · Apr 27, 10:00 AM IST",
    recordedLabel: "Apr 27, 10:00 AM IST",
    passed: true,
    card: tightRecertCard({
      overall: 80,
      band: "mid",
      tierLabel: "Consistent",
      positives: ["Research synthesis still strong"],
      negatives: ["Tool-fluency claims under-demonstrated in re-cert interview"],
      negativeLabel: "Watch",
    }),
  },
  references: [
    {
      id: "ref-priya-1",
      initials: "VI",
      avatarGradient: "warm",
      name: "Vikram Iyer",
      relation: "CSO Bengaluru Bio · 12 months",
      quote: "Excellent. Want her to stay.",
      status: "confirmed",
      statusLabel: "Verified · Strong",
      contactMeta: "Apr 26 · phone",
      badge: { label: "RE-CONFIRMED", tone: "neutral" },
    },
  ],
  antiCheat: ANTI_CHEAT_CLEAN_RECERT,
  assessment: {
    card: tightRecertCard({
      overall: 78,
      band: "mid",
      tierLabel: "PAUSE FOR ACTION",
      positives: ["Strong active client", "Anti-cheat clean"],
      negatives: [
        "Six self-reported skill additions need verification",
        "Rate hike landed in the same week — looks like profile inflation",
      ],
      positiveLabel: "What works",
      negativeLabel: "Why pause",
    }),
    nextPlacementLabel: "Recommended next placement",
    nextPlacementBody: "Research-heavy roles · pause new placements until profile verified.",
  },
  decisionBar: {
    aiRecommendation: "AI recommends PAUSE (verify profile)",
    aiConfidence: "70% confidence",
    averageMinutes: "14m",
    sectionsReviewed: 0,
    sectionsTotal: 9,
    destructive: { label: "Off-board", longLabel: "Off-board" },
    neutral: { label: "Pause", longLabel: "Pause for action" },
    primary: { label: "Re-certify & advance →" },
  },
  aiRecommendation: "PAUSE",
};

/* ============================================================
   Roster export
   ============================================================ */

export const recertCandidates: ReadonlyArray<RecertCandidate> = [
  anand,
  aaliyah,
  linhRecert,
  marcus,
  priya,
];

export const RECERT_DEFAULT_CANDIDATE_ID = anand.id;

/** Count of bulk-approvable candidates for the rail's "approve all clean" CTA. */
export const recertBulkApprovableCount = recertCandidates.filter(
  (c) => c.bulkApprovable,
).length;
