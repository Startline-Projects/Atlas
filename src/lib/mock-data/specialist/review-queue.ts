/**
 * Mock data for `/specialist/review-queue`.
 *
 * Spec rules (PDF Step 3):
 *   - SLA window: 24 hours from submission.
 *   - Time-since-submission color bands: <24h fresh / 24–48h warn / >48h urgent.
 *   - Reference statuses: Pending · Confirmed · Conflicting · Unreachable.
 *   - Reject is permanent; candidate is locked out of reapply for the
 *     `REJECT_REAPPLY_LOCKOUT_MONTHS` window. **POLICY UNDER REVIEW**
 *     pending legal sign-off — do not enforce in production code yet.
 *
 * Roster (9 candidates) covers every failure mode listed by the spec:
 *   1. Marie Okonkwo — clear-pass, 1 reference still pending (HTML featured)
 *   2. Carmen López — clear-pass, all references confirmed strong
 *   3. Hana Reza — borderline AI band
 *   4. Wei Chen — unreachable reference
 *   5. Tomás Riveros — conflicting reference (employer disputed claim)
 *   6. Linh P. Tran — anti-cheat flag raised (proctoring)
 *   7. Rajan Mehta — clear-fail AI band
 *   8. Sofia Castillo — fresh in queue (just submitted)
 *   9. David Kim — SLA breach (>48h)
 *
 * Marie / Carmen / Hana carry the richest detail data because they're the
 * three rows the HTML mockup actually fleshes out. The other six are
 * authored tighter — same shape, fewer entries — so every candidate row
 * still produces a populated detail pane on click.
 */

import type {
  AntiCheatBlock,
  AvatarGradientKey,
  DecisionBarConfig,
  IvCardData,
  Reference,
  TabDef,
} from "./queue-types";

/* ============================================================
   Constants — business rules the spec PDF defines
   ============================================================ */

/** 24-hour SLA from candidate submission to specialist decision. */
export const REVIEW_SLA_HOURS = 24;
/** Elapsed-since-submission threshold for the "warn" amber band. */
export const REVIEW_WARN_THRESHOLD_HOURS = 24;
/** Elapsed-since-submission threshold for the "urgent" red band. */
export const REVIEW_URGENT_THRESHOLD_HOURS = 48;

/**
 * Months a rejected candidate is locked out of reapplying.
 *
 * **POLICY UNDER REVIEW** — kept as 6 for now to match the HTML modal
 * copy ("won't be able to reapply for 6 months"). Will be revisited
 * with legal/policy review before the rule actually enforces in
 * production. Final value lives in `lib/config/constants.ts` once the
 * Specialist service slice is built.
 */
export const REJECT_REAPPLY_LOCKOUT_MONTHS = 6;

/** Approve modal tier picker options. */
export const APPROVE_TIERS = ["Standard", "Vetted", "Elite"] as const;
export type ApproveTier = (typeof APPROVE_TIERS)[number];

/** Reject modal reason chips. */
export const REJECT_REASONS = [
  { key: "quality", label: "Quality bar not met" },
  { key: "anti-cheat", label: "Anti-cheat flag" },
  { key: "references", label: "Reference issue" },
  { key: "duplicate", label: "Duplicate account" },
  { key: "category", label: "Wrong category" },
  { key: "other", label: "Other" },
] as const;

/** Revisions modal checklist — pre-canned items the specialist can tick. */
export const REVISION_ITEMS = [
  {
    key: "profile",
    title: "Profile bio",
    detail: "Tighten to 2-3 lines · lead with years of experience.",
  },
  {
    key: "video",
    title: "Intro video re-record",
    detail: "Currently 92 seconds — needs to be under 90.",
  },
  {
    key: "samples",
    title: "Replace work sample #2",
    detail:
      "Board pre-read still has client logo visible — please anonymize.",
  },
  {
    key: "interview-2",
    title: "Re-take Interview 2",
    detail:
      "Optional — would unlock Vetted tier with a stronger domain score.",
  },
] as const;

/* ============================================================
   Types — review-queue specific
   ============================================================ */

export type SlaBand = "fresh" | "warn" | "urgent";
export type CompositeBand = "clear-pass" | "borderline" | "clear-fail";
export type AiRecommendation = "APPROVE" | "REVISIONS" | "REJECT";

/** Tab keys must stay stable — they double as section anchors. */
export const REVIEW_TABS: ReadonlyArray<TabDef> = [
  { key: "overview", label: "Overview" },
  {
    key: "interview-1",
    label: "AI Interview 1",
    badge: { kind: "number", value: 89 },
  },
  {
    key: "interview-2",
    label: "AI Interview 2",
    badge: { kind: "number", value: 84 },
  },
  { key: "profile", label: "Profile" },
  { key: "video", label: "Intro video" },
  {
    key: "references",
    label: "References",
    badge: { kind: "number", value: "2/3" },
  },
  {
    key: "samples",
    label: "Work samples",
    badge: { kind: "number", value: 4 },
  },
  { key: "anti-cheat", label: "Anti-cheat" },
  { key: "assessment", label: "AI assessment" },
  { key: "notes", label: "Notes" },
];

/** Filter chips on the queue rail. */
export const REVIEW_FILTERS = [
  { key: "all", label: "All" },
  { key: "sla", label: "SLA risk" },
  { key: "auto-ok", label: "Auto-OK" },
] as const;
export type ReviewFilterKey = (typeof REVIEW_FILTERS)[number]["key"];

/* ============================================================
   Sub-shapes used inside ReviewQueueCandidate
   ============================================================ */

export type Snippet = {
  tag: string;
  warn?: boolean;
  question: string;
  answer: string;
};

export type InterviewBlock = {
  /** "AI Interview 1" / "AI Interview 2" — for completeness. */
  title: string;
  durationLabel: string;
  recordedLabel: string;
  passed: boolean;
  card: IvCardData;
};

export type IntroVideo = {
  durationSeconds: number;
  recordedLabel: string;
  /** First-line transcript snippet shown below the player. */
  transcriptOpener: string;
  /** AI score / status label rendered in the section header ("AI: 85 / Strong"). */
  scoreLabel: string;
};

export type ProfileSkills = ReadonlyArray<string>;

export type ProfileCert = {
  /** Either a star icon or a check icon — matches HTML's two icons. */
  icon: "trust" | "cert";
  name: string;
  meta: string;
};

export type ProfileBlock = {
  bio: string;
  yearsExperience: number;
  languages: string;
  hourlyRate: string;
  availability: string;
  skills: ProfileSkills;
  certs: ReadonlyArray<ProfileCert>;
  lastEditedLabel: string;
};

export type WorkSample = {
  title: string;
  type: string;
  /** Index into the four gradient classes (1–4) defined in globals. */
  gradient: 1 | 2 | 3 | 4;
  /** Stable icon key — component owns the SVG. */
  iconKey: "spreadsheet" | "doc" | "shield" | "graph";
};

export type AssessmentBlock = {
  card: IvCardData;
  /** "Predicted client fit" caption ("Boutique law firms · finance & consulting…"). */
  predictedFitLabel?: string;
  predictedFitBody?: string;
};

/* ============================================================
   The candidate shape
   ============================================================ */

export type ReviewQueueCandidate = {
  /* identity & queue rail row */
  id: string;
  firstName: string;
  fullName: string;
  age: number;
  countryFlag: string;
  countryName: string;
  city: string;
  /** Role category as a short label ("Virtual Assistant"). */
  category: string;
  initials: string;
  avatarGradient?: AvatarGradientKey;

  /* queue rail timing */
  hoursSinceSubmission: number;
  slaHoursRemaining: number;
  slaBand: SlaBand;
  /** Filter buckets the row belongs to — drives the chip filters. */
  filterTags: ReadonlyArray<ReviewFilterKey>;

  /* identity-row tags */
  hourlyRate: string;
  languagesLong: string;
  languagesShort: string;

  /* composite */
  composite: number;
  compositeBand: CompositeBand;
  /** Tier label shown next to composite ("★ Strong fit"). */
  compositeTierLabel: string;

  /* tabs config — derived per candidate (badges differ) */
  tabs: ReadonlyArray<TabDef>;

  /* sections */
  overview: IvCardData;
  interview1: InterviewBlock;
  interview2: InterviewBlock;
  profile: ProfileBlock;
  introVideo: IntroVideo;
  references: ReadonlyArray<Reference>;
  workSamples: ReadonlyArray<WorkSample>;
  antiCheat: AntiCheatBlock;
  assessment: AssessmentBlock;

  /* decision bar */
  decisionBar: DecisionBarConfig;

  /* AI signal exposed for the queue rail row */
  aiRecommendation: AiRecommendation;
};

/* ============================================================
   The 9 candidates
   ============================================================ */

const ANTI_CHEAT_CLEAN: AntiCheatBlock = {
  flagsRaised: false,
  summary:
    "All anti-cheat checks passed cleanly. Session integrity is high. No anomalies in proctoring data, identity verification, plagiarism scans, or browser activity logs.",
  checks: [
    {
      title: "Identity verification",
      detail:
        "Government ID matched · biometric match 99.2% · liveness check passed.",
      passed: true,
    },
    {
      title: "Proctoring",
      detail:
        "Eye tracking clean across both interviews · audio environment quiet · 0 flags.",
      passed: true,
    },
    {
      title: "Plagiarism check",
      detail:
        "0% match across all written responses (essay + Interview 2 written portion).",
      passed: true,
    },
    {
      title: "Browser activity",
      detail:
        "No tab switching during interviews · no copy/paste from external sources · session integrity intact.",
      passed: true,
    },
  ],
};

/* ---------- 1. Marie Okonkwo (HTML featured · clear-pass · 1 ref pending) ---------- */

const marie: ReviewQueueCandidate = {
  id: "rq-marie-okonkwo",
  firstName: "Marie",
  fullName: "Marie Okonkwo",
  age: 28,
  countryFlag: "🇳🇬",
  countryName: "Nigeria",
  city: "Lagos",
  category: "Virtual Assistant",
  initials: "M",
  hoursSinceSubmission: 22,
  slaHoursRemaining: 2,
  slaBand: "urgent",
  filterTags: ["all", "sla"],
  hourlyRate: "$14/hr",
  languagesLong: "English (native), Yoruba (native), French (intermediate B2)",
  languagesShort: "English · Yoruba · French",
  composite: 87,
  compositeBand: "clear-pass",
  compositeTierLabel: "★ Strong fit",
  tabs: [
    REVIEW_TABS[0]!,
    { key: "interview-1", label: "AI Interview 1", badge: { kind: "number", value: 89 } },
    { key: "interview-2", label: "AI Interview 2", badge: { kind: "number", value: 84 } },
    REVIEW_TABS[3]!,
    REVIEW_TABS[4]!,
    { key: "references", label: "References", badge: { kind: "number", value: "2/3" } },
    { key: "samples", label: "Work samples", badge: { kind: "number", value: 4 } },
    REVIEW_TABS[7]!,
    REVIEW_TABS[8]!,
    REVIEW_TABS[9]!,
  ],
  overview: {
    overall: 87,
    tierLabel: "★ Strong fit",
    overallBand: "high",
    subs: [
      { label: "AI Interview 1", score: 89, band: "high" },
      { label: "AI Interview 2", score: 84, band: "mid" },
      { label: "Intro video", score: 85, band: "high" },
      { label: "References", score: null, display: "2/3", band: "high", barPct: 92 },
      { label: "Anti-cheat", score: 100, band: "high" },
    ],
    commentary: {
      label: "AI summary",
      body: "Marie presents as a strong, well-rounded Virtual Assistant candidate with six years of executive support experience at finance and legal firms in Lagos. Communication scores are high across both interviews; references back her up. Two soft notes worth reading: slightly thinner advanced QuickBooks knowledge, and one reference still pending response. Recommend approval.",
    },
  },
  interview1: {
    title: "AI Interview 1",
    durationLabel: "22 min · Apr 28, 9:14 AM WAT",
    recordedLabel: "Apr 28, 9:14 AM WAT",
    passed: true,
    card: {
      overall: 89,
      tierLabel: "★ Top tier",
      overallBand: "high",
      subs: [
        { label: "Communication", score: 92, band: "high" },
        { label: "English fluency", score: 88, band: "high" },
        { label: "Vocabulary range", score: 85, band: "mid" },
        { label: "Response coherence", score: 90, band: "high" },
        { label: "Cultural fit", score: 88, band: "high" },
      ],
      highlights: {
        positiveLabel: "Strengths",
        positives: [
          "Articulate, professional tone throughout",
          "Clear specific examples with measurable outcomes",
          "Active listening — asked clarifying questions twice",
        ],
        negativeLabel: "Watch",
        negatives: [
          "One filler-heavy pause around the 14-min mark (recovered well)",
        ],
      },
      snippets: [
        {
          tag: "Q1 · 02:14",
          question:
            "Tell me about a time you coordinated travel for an executive across multiple time zones.",
          answer:
            "Last year my CEO needed to be in Singapore for a board meeting on Monday morning, then in London by Wednesday for an investor pitch. I built a buffer day in Dubai because long-haul flights with him meant he'd land sharp but jet-lagged — and the investor read on him mattered more than the schedule…",
        },
        {
          tag: "Q4 · 11:38",
          question:
            "How do you handle conflicting priorities from two senior stakeholders?",
          answer:
            "I never assume one outranks the other in the moment. I get the deadlines from both, surface the conflict directly to the one with more flexibility, and propose two options. Most people just want to be asked, not surprised.",
        },
      ],
      commentary: {
        label: "AI commentary",
        body: "Strong performance. Marie demonstrated composure, structure, and ownership in her answers. The travel coordination story showed real judgment about human factors, not just logistics. No red flags. Recommend pass.",
      },
    },
  },
  interview2: {
    title: "AI Interview 2",
    durationLabel: "35 min · Apr 28, 11:02 AM WAT",
    recordedLabel: "Apr 28, 11:02 AM WAT",
    passed: true,
    card: {
      overall: 84,
      tierLabel: "High tier",
      overallBand: "mid",
      subs: [
        { label: "Problem-solving", score: 87, band: "high" },
        { label: "Domain knowledge", score: 78, band: "low" },
        { label: "Time management", score: 86, band: "high" },
        { label: "Tool proficiency", score: 83, band: "mid" },
        { label: "Professional judgment", score: 84, band: "mid" },
      ],
      highlights: {
        positiveLabel: "Strengths",
        positives: [
          "Excellent calendar & logistics reasoning under pressure",
          "Strong communication frameworks (3-options pattern)",
          "Deep familiarity with Notion, Slack, Gmail workflows",
        ],
        negativeLabel: "Concerns",
        negatives: [
          "Advanced QuickBooks features (reconciliation, A/R aging) — mid-level confidence",
          "Less hands-on with Salesforce vs. HubSpot",
        ],
      },
      snippets: [
        {
          tag: "Q7 · 18:42 — domain probe",
          warn: true,
          question:
            "Walk me through how you'd reconcile a month-end QuickBooks discrepancy with the bank statement.",
          answer:
            "I'd start with the bank rec report and look at outstanding deposits and uncleared checks first… honestly, for the deeper accruals work I'd loop in the bookkeeper. I can flag the gap and structure the question, but I wouldn't claim to close it alone.",
        },
      ],
      commentary: {
        label: "AI commentary",
        body: "Solid round. Where Marie hedged on QuickBooks she did so honestly — naming the limit rather than bluffing — which we score positively for self-awareness. Recommend match her with executive support / EA roles rather than full bookkeeping engagements.",
      },
    },
  },
  profile: {
    bio: "Six years supporting C-suite executives at Lagos-based finance and legal firms. Specialises in complex calendar management, international travel coordination, and discreet board-level admin. Trilingual in English (native), Yoruba (native), and French (intermediate B2). Currently available 30 hrs/week, time zone WAT (UTC+1).",
    yearsExperience: 6,
    languages: "English (native), Yoruba (native), French (intermediate B2)",
    hourlyRate: "$14/hr · open to negotiation for long-term roles",
    availability: "30 hrs/week · WAT (UTC+1) · flexible to overlap with EU/US East",
    skills: [
      "Executive support",
      "Calendar management",
      "Travel coordination",
      "Email triage",
      "Board prep",
      "Spreadsheet ops",
      "CRM (HubSpot)",
      "Notion · Slack · Google Workspace",
    ],
    certs: [
      {
        icon: "trust",
        name: "Atlas Trust Score: 4.8 / 5",
        meta:
          "Based on 12 prior engagement reviews from previous platforms (verified)",
      },
      {
        icon: "cert",
        name: "HubSpot CRM (Foundations)",
        meta: "Issued Mar 2024 · verified by HubSpot Academy",
      },
    ],
    lastEditedLabel: "Apr 28, 8:41 AM",
  },
  introVideo: {
    durationSeconds: 90,
    recordedLabel: "Recorded Apr 28",
    transcriptOpener:
      "“Hi, I'm Marie. I've spent the last six years quietly making other people's calendars work…”",
    scoreLabel: "AI: 85 / Strong",
  },
  references: [
    {
      id: "ref-marie-1",
      initials: "AN",
      name: "Adaeze Nwosu",
      relation:
        "Executive Director · Lagos Women in Finance Initiative · 3 years working together",
      quote:
        "Marie is the most quietly competent EA I've ever worked with. She runs my calendar like an air-traffic controller and never once dropped a ball — even during board season.",
      status: "confirmed",
      statusLabel: "Verified · Strong",
      contactMeta: "Apr 27 · phone (12 min)",
    },
    {
      id: "ref-marie-2",
      initials: "DA",
      avatarGradient: "navy",
      name: "Daniel Ade",
      relation: "CFO · Sterling Capital Lagos · 2 years working together",
      quote:
        "She managed my exec calendar across three time zones for two years. I'd hire her again in a heartbeat. Discreet, sharp, and genuinely cares about getting it right.",
      status: "confirmed",
      statusLabel: "Verified · Strong",
      contactMeta: "Apr 26 · email + 8 min call",
    },
    {
      id: "ref-marie-3",
      initials: "YB",
      avatarGradient: "olive",
      name: "Yemisi Bakare",
      relation: "Partner · Bakare Law · 1 year working together",
      quote:
        "Awaiting first response. Outreach sent Apr 27 + reminder Apr 29.",
      status: "pending",
      statusLabel: "Awaiting",
      contactMeta: "Last contact: Apr 29",
    },
  ],
  workSamples: [
    {
      title: "Executive calendar coordination",
      type: "Google Sheets · 18 columns",
      gradient: 1,
      iconKey: "spreadsheet",
    },
    {
      title: "Board pre-read briefing",
      type: "Word document · 4 pages",
      gradient: 2,
      iconKey: "doc",
    },
    {
      title: "Travel itinerary template",
      type: "PDF · multi-leg trip",
      gradient: 3,
      iconKey: "shield",
    },
    {
      title: "Email triage workflow",
      type: "Process diagram · 14 nodes",
      gradient: 4,
      iconKey: "graph",
    },
  ],
  antiCheat: ANTI_CHEAT_CLEAN,
  assessment: {
    card: {
      overall: 87,
      tierLabel: "★ APPROVE",
      overallBand: "high",
      subs: [
        { label: "Confidence", score: 91, display: "91%", band: "high" },
        { label: "Predicted client fit", score: 88, band: "high" },
        { label: "Pool match score", score: 90, band: "high" },
      ],
      highlights: {
        positiveLabel: "Why approve",
        positives: [
          "Top-tier communication across both AI interviews",
          "Two strong verified references with concrete behavioral evidence",
          "Clean anti-cheat across all four checks — high session integrity",
          "Honest self-assessment of QuickBooks limit (positive trait)",
          "Trilingual — opens up French-speaking client pool in EU/Africa",
        ],
        negativeLabel: "Caveats",
        negatives: [
          "Match her with EA / executive support roles — not full bookkeeping engagements",
          "Third reference still pending — not a blocker but worth following up post-approval",
        ],
      },
    },
    predictedFitLabel: "Predicted client fit (top 3)",
    predictedFitBody:
      "Boutique law firms · finance & consulting · NGO leadership offices. Avoid: heavy-bookkeeping startups, US-only sync schedules.",
  },
  decisionBar: {
    aiRecommendation: "AI recommends APPROVE",
    aiConfidence: "91% confidence",
    averageMinutes: "22m",
    sectionsReviewed: 3,
    sectionsTotal: 10,
    destructive: { label: "Reject", longLabel: "Reject" },
    neutral: { label: "Revisions", longLabel: "Request revisions" },
    primary: { label: "Approve & advance →" },
  },
  aiRecommendation: "APPROVE",
};

/* ---------- 2. Carmen López — clear-pass, all references confirmed strong ---------- */

const carmen: ReviewQueueCandidate = {
  id: "rq-carmen-lopez",
  firstName: "Carmen",
  fullName: "Carmen López",
  age: 31,
  countryFlag: "🇦🇷",
  countryName: "Argentina",
  city: "Buenos Aires",
  category: "Virtual Assistant",
  initials: "C",
  avatarGradient: "navy",
  hoursSinceSubmission: 14,
  slaHoursRemaining: 10,
  slaBand: "fresh",
  filterTags: ["all", "auto-ok"],
  hourlyRate: "$18/hr",
  languagesLong: "Spanish (native), English (C2), Portuguese (B2)",
  languagesShort: "Spanish · English · Portuguese",
  composite: 92,
  compositeBand: "clear-pass",
  compositeTierLabel: "★ Top tier",
  tabs: [
    REVIEW_TABS[0]!,
    { key: "interview-1", label: "AI Interview 1", badge: { kind: "number", value: 94 } },
    { key: "interview-2", label: "AI Interview 2", badge: { kind: "number", value: 91 } },
    REVIEW_TABS[3]!,
    REVIEW_TABS[4]!,
    { key: "references", label: "References", badge: { kind: "number", value: "3/3" } },
    { key: "samples", label: "Work samples", badge: { kind: "number", value: 4 } },
    REVIEW_TABS[7]!,
    REVIEW_TABS[8]!,
    REVIEW_TABS[9]!,
  ],
  overview: {
    overall: 92,
    tierLabel: "★ Top tier",
    overallBand: "high",
    subs: [
      { label: "AI Interview 1", score: 94, band: "high" },
      { label: "AI Interview 2", score: 91, band: "high" },
      { label: "Intro video", score: 92, band: "high" },
      { label: "References", score: null, display: "3/3", band: "high", barPct: 100 },
      { label: "Anti-cheat", score: 100, band: "high" },
    ],
    commentary: {
      label: "AI summary",
      body: "Carmen is one of the cleanest reviews of the quarter. All three references confirmed strong, both AI interviews scored above 90, anti-cheat clean across the board. Eight years supporting LATAM startup founders — direct experience with Notion, Asana, HubSpot, and bilingual exec comms. Recommend approve at Vetted tier on day one.",
    },
  },
  interview1: {
    title: "AI Interview 1",
    durationLabel: "24 min · Apr 29, 4:18 PM ART",
    recordedLabel: "Apr 29, 4:18 PM ART",
    passed: true,
    card: {
      overall: 94,
      tierLabel: "★ Top tier",
      overallBand: "high",
      subs: [
        { label: "Communication", score: 95, band: "high" },
        { label: "English fluency", score: 92, band: "high" },
        { label: "Vocabulary range", score: 94, band: "high" },
        { label: "Response coherence", score: 96, band: "high" },
        { label: "Cultural fit", score: 92, band: "high" },
      ],
      highlights: {
        positiveLabel: "Strengths",
        positives: [
          "Bilingual fluency demonstrated under pressure",
          "Concrete metrics in every behavioral story (numbers, dates, deltas)",
          "Comfortable disagreeing with the interviewer when warranted",
        ],
        negativeLabel: "Watch",
        negatives: ["Nothing notable. Clean interview."],
      },
      commentary: {
        label: "AI commentary",
        body: "Top-of-band performance. Recommend pass without reservation.",
      },
    },
  },
  interview2: {
    title: "AI Interview 2",
    durationLabel: "32 min · Apr 29, 5:10 PM ART",
    recordedLabel: "Apr 29, 5:10 PM ART",
    passed: true,
    card: {
      overall: 91,
      tierLabel: "★ Top tier",
      overallBand: "high",
      subs: [
        { label: "Problem-solving", score: 92, band: "high" },
        { label: "Domain knowledge", score: 90, band: "high" },
        { label: "Time management", score: 93, band: "high" },
        { label: "Tool proficiency", score: 90, band: "high" },
        { label: "Professional judgment", score: 90, band: "high" },
      ],
      highlights: {
        positiveLabel: "Strengths",
        positives: [
          "Eight years of LATAM startup ops — knows the playbook cold",
          "Active operator across Notion, Asana, HubSpot, Pipedrive",
          "Strong financial-ops fundamentals (Xero + QBO confident)",
        ],
        negativeLabel: "Concerns",
        negatives: ["None."],
      },
      commentary: {
        label: "AI commentary",
        body: "Auto-OK. Carmen handles the domain probes with the same composure she brought to Interview 1. Recommend pass.",
      },
    },
  },
  profile: {
    bio: "Eight years operations & exec support across Buenos Aires-based and remote SaaS startups. Bilingual (Spanish/English) with intermediate Portuguese. Specialises in cross-functional ops, vendor management, and bilingual customer comms.",
    yearsExperience: 8,
    languages: "Spanish (native), English (C2), Portuguese (B2)",
    hourlyRate: "$18/hr · longer engagements preferred",
    availability: "35 hrs/week · ART (UTC-3) · flexible US East / UK overlap",
    skills: [
      "Operations leadership",
      "Vendor management",
      "Bilingual customer ops",
      "Notion · Asana · HubSpot",
      "Xero · QuickBooks Online",
      "Financial reporting",
    ],
    certs: [
      {
        icon: "trust",
        name: "Atlas Trust Score: 4.9 / 5",
        meta: "8 prior engagement reviews · all 5★",
      },
      {
        icon: "cert",
        name: "HubSpot Operations Hub Certified",
        meta: "Issued Jan 2025 · verified",
      },
    ],
    lastEditedLabel: "Apr 29, 3:41 PM",
  },
  introVideo: {
    durationSeconds: 78,
    recordedLabel: "Recorded Apr 29",
    transcriptOpener:
      "“Hola, I'm Carmen. I've spent eight years building the back office for early-stage founders…”",
    scoreLabel: "AI: 92 / Top",
  },
  references: [
    {
      id: "ref-carmen-1",
      initials: "MR",
      avatarGradient: "warm",
      name: "Mateo Romero",
      relation:
        "Founder · Polara (Y Combinator W22) · 4 years working together",
      quote:
        "Carmen built our entire ops backbone from zero. She's the operator I'd want for any LATAM-based founder.",
      status: "confirmed",
      statusLabel: "Verified · Strong",
      contactMeta: "Apr 28 · phone (15 min)",
    },
    {
      id: "ref-carmen-2",
      initials: "DG",
      avatarGradient: "navy",
      name: "Diana García",
      relation: "Head of People · Lumio Health · 2 years working together",
      quote:
        "Hired Carmen for fractional ops in 2023; ended up extending her three times. She's better than most full-time hires we've made.",
      status: "confirmed",
      statusLabel: "Verified · Strong",
      contactMeta: "Apr 27 · email + 12 min call",
    },
    {
      id: "ref-carmen-3",
      initials: "JS",
      avatarGradient: "teal",
      name: "Javier Sosa",
      relation: "CFO · Northbeam · 1.5 years working together",
      quote:
        "She's the rare ops person who actually understands financials. Loop her into any LATAM-heavy engagement.",
      status: "confirmed",
      statusLabel: "Verified · Strong",
      contactMeta: "Apr 27 · phone (10 min)",
    },
  ],
  workSamples: [
    {
      title: "Bilingual onboarding deck",
      type: "Google Slides · 24 slides",
      gradient: 1,
      iconKey: "doc",
    },
    {
      title: "Vendor evaluation matrix",
      type: "Notion database · 12 vendors",
      gradient: 2,
      iconKey: "spreadsheet",
    },
    {
      title: "Q4 ops playbook",
      type: "PDF · 9 pages",
      gradient: 3,
      iconKey: "shield",
    },
    {
      title: "Customer health workflow",
      type: "HubSpot automation · 8 stages",
      gradient: 4,
      iconKey: "graph",
    },
  ],
  antiCheat: ANTI_CHEAT_CLEAN,
  assessment: {
    card: {
      overall: 92,
      tierLabel: "★ APPROVE · VETTED ON DAY 1",
      overallBand: "high",
      subs: [
        { label: "Confidence", score: 95, display: "95%", band: "high" },
        { label: "Predicted client fit", score: 93, band: "high" },
        { label: "Pool match score", score: 94, band: "high" },
      ],
      highlights: {
        positiveLabel: "Why approve",
        positives: [
          "Three strong verified references — all 5★ historical hires",
          "Top-tier scores on both AI interviews (94 / 91)",
          "Direct LATAM founder experience — high client demand for this profile",
          "Bilingual at C2 level opens up cross-border client pool",
        ],
        negativeLabel: "Caveats",
        negatives: [
          "ART time zone limits late-PT real-time meetings",
        ],
      },
    },
    predictedFitLabel: "Predicted client fit (top 3)",
    predictedFitBody:
      "LATAM-headquartered SaaS · cross-border ops · founder-led startups in early growth.",
  },
  decisionBar: {
    aiRecommendation: "AI recommends APPROVE",
    aiConfidence: "95% confidence",
    averageMinutes: "22m",
    sectionsReviewed: 1,
    sectionsTotal: 10,
    destructive: { label: "Reject", longLabel: "Reject" },
    neutral: { label: "Revisions", longLabel: "Request revisions" },
    primary: { label: "Approve & advance →" },
  },
  aiRecommendation: "APPROVE",
};

/* ---------- 3. Hana Reza — borderline AI band ---------- */

const hana: ReviewQueueCandidate = {
  id: "rq-hana-reza",
  firstName: "Hana",
  fullName: "Hana Reza",
  age: 26,
  countryFlag: "🇮🇷",
  countryName: "Iran",
  city: "Tehran",
  category: "Virtual Assistant",
  initials: "H",
  avatarGradient: "terracotta",
  hoursSinceSubmission: 4,
  slaHoursRemaining: 20,
  slaBand: "fresh",
  filterTags: ["all"],
  hourlyRate: "$11/hr",
  languagesLong: "Persian (native), English (B2), Arabic (B1)",
  languagesShort: "Persian · English · Arabic",
  composite: 71,
  compositeBand: "borderline",
  compositeTierLabel: "Borderline",
  tabs: [
    REVIEW_TABS[0]!,
    { key: "interview-1", label: "AI Interview 1", badge: { kind: "number", value: 73 } },
    { key: "interview-2", label: "AI Interview 2", badge: { kind: "number", value: 70 } },
    REVIEW_TABS[3]!,
    REVIEW_TABS[4]!,
    { key: "references", label: "References", badge: { kind: "number", value: "1/2" } },
    { key: "samples", label: "Work samples", badge: { kind: "number", value: 2 } },
    REVIEW_TABS[7]!,
    REVIEW_TABS[8]!,
    REVIEW_TABS[9]!,
  ],
  overview: {
    overall: 71,
    tierLabel: "Borderline",
    overallBand: "mid",
    subs: [
      { label: "AI Interview 1", score: 73, band: "mid" },
      { label: "AI Interview 2", score: 70, band: "mid" },
      { label: "Intro video", score: 74, band: "mid" },
      { label: "References", score: null, display: "1/2", band: "mid", barPct: 50 },
      { label: "Anti-cheat", score: 100, band: "high" },
    ],
    commentary: {
      label: "AI summary",
      body: "Hana lands in the borderline band. English fluency is the main constraint — comprehension is solid but expression occasionally falters. Strong intent and clear professional values; if she had a stronger reference base she'd likely move into clear-pass. Recommend Request Revisions: re-record intro video and add a third reference.",
    },
  },
  interview1: {
    title: "AI Interview 1",
    durationLabel: "26 min · Apr 30, 11:18 AM IRST",
    recordedLabel: "Apr 30, 11:18 AM IRST",
    passed: true,
    card: {
      overall: 73,
      tierLabel: "Borderline",
      overallBand: "mid",
      subs: [
        { label: "Communication", score: 75, band: "mid" },
        { label: "English fluency", score: 68, band: "low" },
        { label: "Vocabulary range", score: 70, band: "mid" },
        { label: "Response coherence", score: 78, band: "mid" },
        { label: "Cultural fit", score: 75, band: "mid" },
      ],
      highlights: {
        positiveLabel: "Strengths",
        positives: [
          "Thoughtful, non-defensive responses",
          "Good comprehension of nuanced questions",
        ],
        negativeLabel: "Concerns",
        negatives: [
          "English expression occasionally falters under pressure",
          "Limited vocabulary for advanced business contexts",
        ],
      },
      commentary: {
        label: "AI commentary",
        body: "Borderline. Hana is hireable but at lower-rate engagements only. A re-take with more prep time might lift her into clear-pass.",
      },
    },
  },
  interview2: {
    title: "AI Interview 2",
    durationLabel: "30 min · Apr 30, 1:02 PM IRST",
    recordedLabel: "Apr 30, 1:02 PM IRST",
    passed: true,
    card: {
      overall: 70,
      tierLabel: "Borderline",
      overallBand: "mid",
      subs: [
        { label: "Problem-solving", score: 72, band: "mid" },
        { label: "Domain knowledge", score: 65, band: "low" },
        { label: "Time management", score: 78, band: "mid" },
        { label: "Tool proficiency", score: 68, band: "low" },
        { label: "Professional judgment", score: 70, band: "mid" },
      ],
      highlights: {
        positiveLabel: "Strengths",
        positives: ["Strong work ethic and clear priorities"],
        negativeLabel: "Concerns",
        negatives: [
          "Tool proficiency limited to basic Google Workspace",
          "Light on financial-ops vocabulary",
        ],
      },
      commentary: {
        label: "AI commentary",
        body: "Pass with caveats. Recommend pairing with a senior client who can mentor on tooling.",
      },
    },
  },
  profile: {
    bio: "Three years remote admin support for European clients. Strong fundamentals; growing into the senior-VA role. Quiet operator, reliable.",
    yearsExperience: 3,
    languages: "Persian (native), English (B2), Arabic (B1)",
    hourlyRate: "$11/hr · open to longer engagements",
    availability: "25 hrs/week · IRST (UTC+3:30) · flexible to overlap with EU",
    skills: [
      "Calendar management",
      "Email triage",
      "Google Workspace",
      "Translation",
      "Customer support",
    ],
    certs: [
      {
        icon: "trust",
        name: "Atlas Trust Score: 4.4 / 5",
        meta: "3 prior engagements verified",
      },
    ],
    lastEditedLabel: "Apr 30, 9:18 AM",
  },
  introVideo: {
    durationSeconds: 95,
    recordedLabel: "Recorded Apr 30",
    transcriptOpener:
      "“Hello, my name is Hana. I have been working remotely for three years…”",
    scoreLabel: "AI: 74 / Borderline",
  },
  references: [
    {
      id: "ref-hana-1",
      initials: "FK",
      avatarGradient: "warm",
      name: "Fatima Karimi",
      relation: "Founder · Persa Studio · 2 years working together",
      quote:
        "Hana was reliable and easy to work with. I'd hire her again for our next admin role.",
      status: "confirmed",
      statusLabel: "Verified",
      contactMeta: "Apr 29 · email exchange",
    },
    {
      id: "ref-hana-2",
      initials: "OS",
      avatarGradient: "olive",
      name: "Omid Saberi",
      relation: "Manager · Saberi Trading · 1 year working together",
      quote:
        "Outreach pending. No response after 2 attempts.",
      status: "pending",
      statusLabel: "Awaiting",
      contactMeta: "Last contact: Apr 30",
    },
  ],
  workSamples: [
    {
      title: "Customer onboarding email",
      type: "Google Doc · 1 page",
      gradient: 1,
      iconKey: "doc",
    },
    {
      title: "Team availability tracker",
      type: "Google Sheet · 8 columns",
      gradient: 2,
      iconKey: "spreadsheet",
    },
  ],
  antiCheat: ANTI_CHEAT_CLEAN,
  assessment: {
    card: {
      overall: 71,
      tierLabel: "REVISIONS",
      overallBand: "mid",
      subs: [
        { label: "Confidence", score: 64, display: "64%", band: "low" },
        { label: "Predicted client fit", score: 70, band: "mid" },
        { label: "Pool match score", score: 72, band: "mid" },
      ],
      highlights: {
        positiveLabel: "What works",
        positives: [
          "Reliable temperament with verified references",
          "Comfortable with EU-overlap time zone",
        ],
        negativeLabel: "Why revisions",
        negatives: [
          "Re-record intro video — pacing currently dilutes the message",
          "Add one more verified reference (Atlas standard is 2 confirmed)",
          "Update Profile to lead with European-client experience",
        ],
      },
    },
    predictedFitLabel: "Predicted client fit (top 3)",
    predictedFitBody:
      "EU-based small businesses · administrative-heavy roles · long-term part-time engagements.",
  },
  decisionBar: {
    aiRecommendation: "AI recommends REVISIONS",
    aiConfidence: "64% confidence",
    averageMinutes: "22m",
    sectionsReviewed: 0,
    sectionsTotal: 10,
    destructive: { label: "Reject", longLabel: "Reject" },
    neutral: { label: "Revisions", longLabel: "Request revisions" },
    primary: { label: "Approve & advance →" },
  },
  aiRecommendation: "REVISIONS",
};

/* ============================================================
   Tighter mock candidates 4–9 — same shape, less content
   ============================================================ */

/** Empty placeholder anti-cheat block with one flag, used by candidate 6. */
const ANTI_CHEAT_FLAGGED: AntiCheatBlock = {
  flagsRaised: true,
  summary:
    "One proctoring flag raised: gaze tracking detected three sustained off-screen glances during Interview 2 minutes 14–18. Identity, plagiarism, and browser activity all clean. Specialist judgment required.",
  checks: [
    {
      title: "Identity verification",
      detail:
        "Government ID matched · biometric match 98.6% · liveness check passed.",
      passed: true,
    },
    {
      title: "Proctoring",
      detail:
        "Gaze tracking flagged 3 sustained off-screen glances (Interview 2, min 14–18). Audio environment clean.",
      passed: false,
    },
    {
      title: "Plagiarism check",
      detail:
        "0% match across all written responses.",
      passed: true,
    },
    {
      title: "Browser activity",
      detail:
        "No tab switching during interviews · no copy/paste from external sources.",
      passed: true,
    },
  ],
};

/** Helper to build a tight IV card with default 5 sub-scores. */
function tightIvCard(args: {
  overall: number;
  band: "high" | "mid" | "low";
  tierLabel: string;
  positives: ReadonlyArray<string>;
  negatives: ReadonlyArray<string>;
  positiveLabel?: string;
  negativeLabel?: string;
  commentary?: string;
  subs?: ReadonlyArray<{
    label: string;
    score: number;
    band: "high" | "mid" | "low";
    display?: string;
  }>;
}): IvCardData {
  return {
    overall: args.overall,
    tierLabel: args.tierLabel,
    overallBand: args.band,
    subs:
      args.subs?.map((s) =>
        s.display !== undefined
          ? { label: s.label, score: s.score, band: s.band, display: s.display }
          : { label: s.label, score: s.score, band: s.band },
      ) ?? [
        { label: "Communication", score: args.overall, band: args.band },
        { label: "Domain knowledge", score: args.overall, band: args.band },
        { label: "Tool proficiency", score: args.overall, band: args.band },
        { label: "Professional judgment", score: args.overall, band: args.band },
        { label: "Cultural fit", score: args.overall, band: args.band },
      ],
    highlights: {
      positiveLabel: args.positiveLabel ?? "Strengths",
      positives: args.positives,
      negativeLabel: args.negativeLabel ?? "Concerns",
      negatives: args.negatives,
    },
    ...(args.commentary
      ? { commentary: { label: "AI commentary", body: args.commentary } }
      : {}),
  };
}

/* ---------- 4. Wei Chen — unreachable reference ---------- */

const wei: ReviewQueueCandidate = {
  id: "rq-wei-chen",
  firstName: "Wei",
  fullName: "Wei Chen",
  age: 33,
  countryFlag: "🇨🇳",
  countryName: "China",
  city: "Shanghai",
  category: "Virtual Assistant",
  initials: "W",
  avatarGradient: "olive",
  hoursSinceSubmission: 18,
  slaHoursRemaining: 6,
  slaBand: "warn",
  filterTags: ["all"],
  hourlyRate: "$15/hr",
  languagesLong: "Mandarin (native), English (C1)",
  languagesShort: "Mandarin · English",
  composite: 81,
  compositeBand: "clear-pass",
  compositeTierLabel: "Strong",
  tabs: REVIEW_TABS,
  overview: tightIvCard({
    overall: 81,
    band: "mid",
    tierLabel: "Strong",
    positives: [
      "Seven years supporting Western firms with Asia-Pacific operations",
      "Detail-obsessed; multiple references mention 'never misses a typo'",
    ],
    negatives: [
      "One reference unreachable after three contact attempts",
      "Profile leans heavy on translation — under-sells operations strength",
    ],
    commentary:
      "Solid candidate gated by reference verification. Recommend approve once the third reference responds, or request revisions to add an alternate.",
    subs: [
      { label: "AI Interview 1", score: 84, band: "mid" },
      { label: "AI Interview 2", score: 79, band: "mid" },
      { label: "Intro video", score: 80, band: "mid" },
      { label: "References", score: 67, band: "mid" },
      { label: "Anti-cheat", score: 100, band: "high" },
    ],
  }),
  interview1: {
    title: "AI Interview 1",
    durationLabel: "21 min · Apr 30, 8:14 AM CST",
    recordedLabel: "Apr 30, 8:14 AM CST",
    passed: true,
    card: tightIvCard({
      overall: 84,
      band: "mid",
      tierLabel: "High tier",
      positives: ["Crystal-clear English at C1", "Methodical answers"],
      negatives: ["Slightly formal register"],
    }),
  },
  interview2: {
    title: "AI Interview 2",
    durationLabel: "32 min · Apr 30, 9:30 AM CST",
    recordedLabel: "Apr 30, 9:30 AM CST",
    passed: true,
    card: tightIvCard({
      overall: 79,
      band: "mid",
      tierLabel: "Borderline-high",
      positives: ["Strong APAC ops fundamentals"],
      negatives: ["Light on financial-ops detail"],
    }),
  },
  profile: {
    bio: "Seven years admin and ops support for Western firms running Asia-Pacific operations. Bilingual (Mandarin/English).",
    yearsExperience: 7,
    languages: "Mandarin (native), English (C1)",
    hourlyRate: "$15/hr",
    availability: "30 hrs/week · CST (UTC+8) · flexible to overlap with US West",
    skills: [
      "APAC operations",
      "Translation",
      "Calendar management",
      "Vendor liaison",
      "Notion · Slack",
    ],
    certs: [
      {
        icon: "trust",
        name: "Atlas Trust Score: 4.5 / 5",
        meta: "5 prior engagements verified",
      },
    ],
    lastEditedLabel: "Apr 30, 7:48 AM",
  },
  introVideo: {
    durationSeconds: 82,
    recordedLabel: "Recorded Apr 30",
    transcriptOpener:
      "“Hello, I'm Wei. I help Western teams run their Asia-Pacific operations…”",
    scoreLabel: "AI: 80 / Strong",
  },
  references: [
    {
      id: "ref-wei-1",
      initials: "JL",
      avatarGradient: "navy",
      name: "James Lin",
      relation: "Director · Pacifica Ventures Hong Kong · 4 years",
      quote: "Wei is the rare bilingual operator who treats both sides like the primary stakeholder.",
      status: "confirmed",
      statusLabel: "Verified · Strong",
      contactMeta: "Apr 28 · phone (10 min)",
    },
    {
      id: "ref-wei-2",
      initials: "SH",
      avatarGradient: "warm",
      name: "Sarah Holloway",
      relation: "VP Ops · Lumio Health Asia · 1.5 years",
      quote: "Quietly competent. Filled gaps before I noticed them.",
      status: "confirmed",
      statusLabel: "Verified · Strong",
      contactMeta: "Apr 28 · email exchange",
    },
    {
      id: "ref-wei-3",
      initials: "TZ",
      avatarGradient: "purple",
      name: "Tao Zhang",
      relation: "Former CEO · Zhang Trading · 2 years",
      quote:
        "Three contact attempts, no response. Email bounced; LinkedIn DM unread.",
      status: "unreachable",
      statusLabel: "Unreachable",
      contactMeta: "3 attempts · Apr 26–30",
    },
  ],
  workSamples: [
    { title: "APAC vendor onboarding kit", type: "Notion doc", gradient: 1, iconKey: "doc" },
    { title: "China-side travel log", type: "Spreadsheet", gradient: 2, iconKey: "spreadsheet" },
  ],
  antiCheat: ANTI_CHEAT_CLEAN,
  assessment: {
    card: tightIvCard({
      overall: 81,
      band: "mid",
      tierLabel: "REVISIONS",
      positives: [
        "Strong AI scores both interviews",
        "Two verified-strong references",
      ],
      negatives: [
        "Third reference unreachable — Atlas standard is 2 confirmed minimum",
        "Encourage adding an alternate reference before re-review",
      ],
      positiveLabel: "What works",
      negativeLabel: "Why revisions",
      subs: [
        { label: "Confidence", score: 73, band: "mid" },
        { label: "Predicted client fit", score: 80, band: "mid" },
        { label: "Pool match score", score: 81, band: "mid" },
      ],
    }),
    predictedFitLabel: "Predicted fit",
    predictedFitBody: "APAC-Western bridge ops · long-term engagements.",
  },
  decisionBar: {
    aiRecommendation: "AI recommends REVISIONS",
    aiConfidence: "73% confidence",
    averageMinutes: "22m",
    sectionsReviewed: 0,
    sectionsTotal: 10,
    destructive: { label: "Reject", longLabel: "Reject" },
    neutral: { label: "Revisions", longLabel: "Request revisions" },
    primary: { label: "Approve & advance →" },
  },
  aiRecommendation: "REVISIONS",
};

/* ---------- 5. Tomás Riveros — conflicting reference ---------- */

const tomas: ReviewQueueCandidate = {
  id: "rq-tomas-riveros",
  firstName: "Tomás",
  fullName: "Tomás Riveros",
  age: 29,
  countryFlag: "🇧🇷",
  countryName: "Brazil",
  city: "São Paulo",
  category: "Virtual Assistant",
  initials: "T",
  avatarGradient: "purple",
  hoursSinceSubmission: 28,
  slaHoursRemaining: 0,
  slaBand: "warn",
  filterTags: ["all", "sla"],
  hourlyRate: "$13/hr",
  languagesLong: "Portuguese (native), Spanish (C1), English (B2)",
  languagesShort: "Portuguese · Spanish · English",
  composite: 74,
  compositeBand: "borderline",
  compositeTierLabel: "Borderline",
  tabs: REVIEW_TABS,
  overview: tightIvCard({
    overall: 74,
    band: "mid",
    tierLabel: "Borderline · reference issue",
    positives: [
      "Strong communication on both AI interviews (78 / 75)",
      "Clean anti-cheat",
    ],
    negatives: [
      "One reference disputed claimed years of tenure (3 vs claimed 4)",
      "Specialist judgment required on whether to clear or reject",
    ],
    commentary:
      "Tomás interviewed well but one reference came back disputed — a former employer says he worked 3 years instead of the 4 listed on his profile. The discrepancy is small but the spec treats reference conflicts as a specialist-decision threshold.",
  }),
  interview1: {
    title: "AI Interview 1",
    durationLabel: "23 min · Apr 29, 10:18 AM BRT",
    recordedLabel: "Apr 29, 10:18 AM BRT",
    passed: true,
    card: tightIvCard({
      overall: 78,
      band: "mid",
      tierLabel: "Solid",
      positives: ["Trilingual; very natural in all three"],
      negatives: ["Some pauses on technical vocabulary"],
    }),
  },
  interview2: {
    title: "AI Interview 2",
    durationLabel: "30 min · Apr 29, 11:30 AM BRT",
    recordedLabel: "Apr 29, 11:30 AM BRT",
    passed: true,
    card: tightIvCard({
      overall: 75,
      band: "mid",
      tierLabel: "Borderline",
      positives: ["Good operator instincts"],
      negatives: ["Tool proficiency narrower than résumé suggests"],
    }),
  },
  profile: {
    bio: "Four years operations support across Brazilian and Argentine startups. Trilingual operator.",
    yearsExperience: 4,
    languages: "Portuguese (native), Spanish (C1), English (B2)",
    hourlyRate: "$13/hr",
    availability: "30 hrs/week · BRT (UTC-3)",
    skills: ["Operations support", "Trilingual customer ops", "Notion", "Asana"],
    certs: [
      { icon: "trust", name: "Atlas Trust Score: 4.1 / 5", meta: "4 prior engagements verified" },
    ],
    lastEditedLabel: "Apr 29, 9:14 AM",
  },
  introVideo: {
    durationSeconds: 88,
    recordedLabel: "Recorded Apr 29",
    transcriptOpener: "“Oi, I'm Tomás. I support Latin American startups with operations and admin…”",
    scoreLabel: "AI: 76 / Solid",
  },
  references: [
    {
      id: "ref-tomas-1",
      initials: "ID",
      avatarGradient: "warm",
      name: "Inés Domínguez",
      relation: "Founder · Aviva (Buenos Aires) · 2 years working together",
      quote:
        "Tomás is solid. Reliable on the basics. He'd be excellent for ops at a Spanish/Portuguese-heavy team.",
      status: "confirmed",
      statusLabel: "Verified · Strong",
      contactMeta: "Apr 27 · phone (8 min)",
    },
    {
      id: "ref-tomas-2",
      initials: "RC",
      avatarGradient: "navy",
      name: "Ricardo Costa",
      relation: "Former Head of Ops · Costa & Co · 4 years claimed (3 confirmed)",
      quote:
        "Tomás worked here, but only for 3 years — not 4 as listed. Otherwise his work was good. Discrepancy may be honest miscount on overlapping contracts.",
      status: "conflicting",
      statusLabel: "Conflicting · tenure",
      contactMeta: "Apr 28 · phone (15 min)",
    },
  ],
  workSamples: [
    { title: "Customer ops handbook", type: "Notion doc", gradient: 1, iconKey: "doc" },
    { title: "Trilingual support templates", type: "Google Docs set", gradient: 2, iconKey: "doc" },
  ],
  antiCheat: ANTI_CHEAT_CLEAN,
  assessment: {
    card: tightIvCard({
      overall: 74,
      band: "mid",
      tierLabel: "SPECIALIST DECISION",
      positives: [
        "AI signal supports approval",
        "One strong reference confirmed",
      ],
      negatives: [
        "Conflicting reference on tenure (3 vs 4 years)",
        "Reject defensible if the discrepancy reads as misrepresentation",
        "Approve defensible if treated as honest overlap miscount",
      ],
      positiveLabel: "What works",
      negativeLabel: "Why escalate to specialist",
      subs: [
        { label: "Confidence", score: 62, band: "low" },
        { label: "Predicted client fit", score: 75, band: "mid" },
        { label: "Pool match score", score: 73, band: "mid" },
      ],
    }),
  },
  decisionBar: {
    aiRecommendation: "AI defers to specialist",
    aiConfidence: "62% confidence",
    averageMinutes: "22m",
    sectionsReviewed: 0,
    sectionsTotal: 10,
    destructive: { label: "Reject", longLabel: "Reject" },
    neutral: { label: "Revisions", longLabel: "Request revisions" },
    primary: { label: "Approve & advance →" },
  },
  aiRecommendation: "REVISIONS",
};

/* ---------- 6. Linh P. Tran — anti-cheat flag raised ---------- */

const linh: ReviewQueueCandidate = {
  id: "rq-linh-tran",
  firstName: "Linh",
  fullName: "Linh P. Tran",
  age: 27,
  countryFlag: "🇻🇳",
  countryName: "Vietnam",
  city: "Ho Chi Minh City",
  category: "Virtual Assistant",
  initials: "L",
  avatarGradient: "teal",
  hoursSinceSubmission: 8,
  slaHoursRemaining: 16,
  slaBand: "fresh",
  filterTags: ["all"],
  hourlyRate: "$12/hr",
  languagesLong: "Vietnamese (native), English (C1)",
  languagesShort: "Vietnamese · English",
  composite: 83,
  compositeBand: "clear-pass",
  compositeTierLabel: "Strong (anti-cheat flag)",
  tabs: [
    REVIEW_TABS[0]!,
    { key: "interview-1", label: "AI Interview 1", badge: { kind: "number", value: 86 } },
    { key: "interview-2", label: "AI Interview 2", badge: { kind: "number", value: 80 } },
    REVIEW_TABS[3]!,
    REVIEW_TABS[4]!,
    { key: "references", label: "References", badge: { kind: "number", value: "2/2" } },
    { key: "samples", label: "Work samples", badge: { kind: "number", value: 3 } },
    { key: "anti-cheat", label: "Anti-cheat", badge: { kind: "dot", tone: "danger" } },
    REVIEW_TABS[8]!,
    REVIEW_TABS[9]!,
  ],
  overview: tightIvCard({
    overall: 83,
    band: "mid",
    tierLabel: "Strong (anti-cheat flag)",
    positives: [
      "Both AI interviews above 80",
      "Two references confirmed strong",
    ],
    negatives: [
      "Proctoring flagged 3 sustained off-screen glances during Interview 2",
      "Specialist judgment required",
    ],
    commentary:
      "Linh's content scores would normally land approve, but the proctoring flag is the kind that the spec explicitly leaves to specialist judgment. Three sustained off-screen glances may be benign (note-taking) or material (off-camera coaching).",
  }),
  interview1: {
    title: "AI Interview 1",
    durationLabel: "22 min · Apr 30, 4:14 PM ICT",
    recordedLabel: "Apr 30, 4:14 PM ICT",
    passed: true,
    card: tightIvCard({
      overall: 86,
      band: "high",
      tierLabel: "High tier",
      positives: ["Excellent English", "Confident professional register"],
      negatives: [],
    }),
  },
  interview2: {
    title: "AI Interview 2",
    durationLabel: "29 min · Apr 30, 5:30 PM ICT",
    recordedLabel: "Apr 30, 5:30 PM ICT",
    passed: false,
    card: tightIvCard({
      overall: 80,
      band: "mid",
      tierLabel: "Solid · proctoring flag",
      positives: ["Strong content under questioning"],
      negatives: [
        "Proctoring flagged 3 off-screen glances (min 14–18)",
        "Audio environment otherwise clean",
      ],
    }),
  },
  profile: {
    bio: "Five years remote VA support for SaaS founders, primarily US East and EU clients.",
    yearsExperience: 5,
    languages: "Vietnamese (native), English (C1)",
    hourlyRate: "$12/hr",
    availability: "32 hrs/week · ICT (UTC+7)",
    skills: ["Customer support", "Email triage", "Asana", "Notion", "Google Workspace"],
    certs: [{ icon: "trust", name: "Atlas Trust Score: 4.6 / 5", meta: "5 engagements verified" }],
    lastEditedLabel: "Apr 30, 2:14 PM",
  },
  introVideo: {
    durationSeconds: 84,
    recordedLabel: "Recorded Apr 30",
    transcriptOpener: "“Xin chào, I'm Linh. I support remote SaaS teams with operations…”",
    scoreLabel: "AI: 82 / Solid",
  },
  references: [
    {
      id: "ref-linh-1",
      initials: "AT",
      avatarGradient: "warm",
      name: "Anh Tran",
      relation: "Founder · Hanoi Coffee Co · 3 years",
      quote: "Linh has been our remote ops anchor. Don't lose her.",
      status: "confirmed",
      statusLabel: "Verified · Strong",
      contactMeta: "Apr 29 · phone (12 min)",
    },
    {
      id: "ref-linh-2",
      initials: "JS",
      avatarGradient: "navy",
      name: "Jess Saunders",
      relation: "VP Ops · Saunders SaaS · 2 years",
      quote: "Solid hire. Reliable, trustworthy, hits her marks.",
      status: "confirmed",
      statusLabel: "Verified · Strong",
      contactMeta: "Apr 29 · email exchange",
    },
  ],
  workSamples: [
    { title: "Customer ticket macros", type: "Zendesk export", gradient: 1, iconKey: "graph" },
    { title: "Onboarding sequence", type: "Asana template", gradient: 2, iconKey: "doc" },
    { title: "Weekly ops report", type: "Notion doc", gradient: 3, iconKey: "spreadsheet" },
  ],
  antiCheat: ANTI_CHEAT_FLAGGED,
  assessment: {
    card: tightIvCard({
      overall: 78,
      band: "mid",
      tierLabel: "SPECIALIST DECISION",
      positives: [
        "Content signal supports approval",
        "References both confirmed strong",
      ],
      negatives: [
        "Proctoring flag is specialist-judgment territory",
        "Re-take of Interview 2 is the safest path forward",
      ],
      positiveLabel: "What works",
      negativeLabel: "Why escalate",
      subs: [
        { label: "Confidence", score: 60, band: "low" },
        { label: "Predicted client fit", score: 80, band: "mid" },
        { label: "Pool match score", score: 78, band: "mid" },
      ],
    }),
  },
  decisionBar: {
    aiRecommendation: "AI defers to specialist",
    aiConfidence: "60% confidence",
    averageMinutes: "22m",
    sectionsReviewed: 0,
    sectionsTotal: 10,
    destructive: { label: "Reject", longLabel: "Reject" },
    neutral: { label: "Revisions", longLabel: "Request revisions" },
    primary: { label: "Approve & advance →" },
  },
  aiRecommendation: "REVISIONS",
};

/* ---------- 7. Rajan Mehta — clear-fail ---------- */

const rajan: ReviewQueueCandidate = {
  id: "rq-rajan-mehta",
  firstName: "Rajan",
  fullName: "Rajan Mehta",
  age: 24,
  countryFlag: "🇮🇳",
  countryName: "India",
  city: "Pune",
  category: "Virtual Assistant",
  initials: "R",
  avatarGradient: "ice",
  hoursSinceSubmission: 12,
  slaHoursRemaining: 12,
  slaBand: "fresh",
  filterTags: ["all"],
  hourlyRate: "$8/hr",
  languagesLong: "Hindi (native), English (B1)",
  languagesShort: "Hindi · English",
  composite: 58,
  compositeBand: "clear-fail",
  compositeTierLabel: "Clear-fail",
  tabs: REVIEW_TABS,
  overview: tightIvCard({
    overall: 58,
    band: "low",
    tierLabel: "REJECT",
    positives: [
      "Earnest, professional approach",
    ],
    negatives: [
      "English fluency below CEFR B2 threshold",
      "Both interviews scored low across all dimensions",
      "Profile inconsistent with claimed experience level",
    ],
    commentary:
      "Rajan is below the Atlas approval threshold. Recommend reject with the 'Quality bar not met' reason and a respectful note pointing to language and experience gaps. Six-month cool-off applies (per current policy under review).",
  }),
  interview1: {
    title: "AI Interview 1",
    durationLabel: "20 min · Apr 30, 11:14 AM IST",
    recordedLabel: "Apr 30, 11:14 AM IST",
    passed: false,
    card: tightIvCard({
      overall: 60,
      band: "low",
      tierLabel: "Below band",
      positives: ["Honest temperament"],
      negatives: [
        "English at B1 — limits client-facing roles",
        "Difficulty staying on topic in longer answers",
      ],
    }),
  },
  interview2: {
    title: "AI Interview 2",
    durationLabel: "28 min · Apr 30, 12:30 PM IST",
    recordedLabel: "Apr 30, 12:30 PM IST",
    passed: false,
    card: tightIvCard({
      overall: 56,
      band: "low",
      tierLabel: "Below band",
      positives: [],
      negatives: [
        "Limited tool proficiency (Excel basics only)",
        "Domain knowledge below entry threshold",
      ],
    }),
  },
  profile: {
    bio: "Two years admin experience for local Indian businesses. Looking to break into international remote work.",
    yearsExperience: 2,
    languages: "Hindi (native), English (B1)",
    hourlyRate: "$8/hr",
    availability: "40 hrs/week · IST (UTC+5:30)",
    skills: ["Email management", "Excel basics", "Calendar entry"],
    certs: [],
    lastEditedLabel: "Apr 30, 10:00 AM",
  },
  introVideo: {
    durationSeconds: 110,
    recordedLabel: "Recorded Apr 30",
    transcriptOpener: "“Hello, I am Rajan. I want to work as a virtual assistant…”",
    scoreLabel: "AI: 55 / Below band",
  },
  references: [
    {
      id: "ref-rajan-1",
      initials: "VK",
      avatarGradient: "warm",
      name: "Vinod Kumar",
      relation: "Owner · Kumar Trading · 2 years",
      quote: "Rajan was helpful with day-to-day office admin.",
      status: "confirmed",
      statusLabel: "Verified · Brief",
      contactMeta: "Apr 29 · email",
    },
  ],
  workSamples: [
    { title: "Inventory tracker", type: "Excel · 5 columns", gradient: 1, iconKey: "spreadsheet" },
  ],
  antiCheat: ANTI_CHEAT_CLEAN,
  assessment: {
    card: tightIvCard({
      overall: 58,
      band: "low",
      tierLabel: "REJECT",
      positives: ["Honest, low-ego presentation"],
      negatives: [
        "English fluency below B2 threshold",
        "Interview content below clear-pass threshold",
        "Profile and experience indicate early-career — not Atlas pool fit",
      ],
      positiveLabel: "What's positive",
      negativeLabel: "Why reject",
      subs: [
        { label: "Confidence", score: 88, display: "88%", band: "high" },
        { label: "Predicted client fit", score: 35, band: "low" },
        { label: "Pool match score", score: 30, band: "low" },
      ],
    }),
  },
  decisionBar: {
    aiRecommendation: "AI recommends REJECT",
    aiConfidence: "88% confidence",
    averageMinutes: "22m",
    sectionsReviewed: 0,
    sectionsTotal: 10,
    destructive: { label: "Reject", longLabel: "Reject" },
    neutral: { label: "Revisions", longLabel: "Request revisions" },
    primary: { label: "Approve & advance →" },
  },
  aiRecommendation: "REJECT",
};

/* ---------- 8. Sofia Castillo — fresh in queue ---------- */

const sofia: ReviewQueueCandidate = {
  id: "rq-sofia-castillo",
  firstName: "Sofia",
  fullName: "Sofia Castillo",
  age: 30,
  countryFlag: "🇲🇽",
  countryName: "Mexico",
  city: "Mexico City",
  category: "Virtual Assistant",
  initials: "S",
  avatarGradient: "lime",
  hoursSinceSubmission: 1,
  slaHoursRemaining: 23,
  slaBand: "fresh",
  filterTags: ["all", "auto-ok"],
  hourlyRate: "$16/hr",
  languagesLong: "Spanish (native), English (C2)",
  languagesShort: "Spanish · English",
  composite: 90,
  compositeBand: "clear-pass",
  compositeTierLabel: "★ Top tier",
  tabs: REVIEW_TABS,
  overview: tightIvCard({
    overall: 90,
    band: "high",
    tierLabel: "★ Top tier",
    positives: [
      "Bilingual at C2 native-equivalent",
      "Six years exec ops at LATAM-based fintechs",
      "Three references all confirmed strong",
    ],
    negatives: ["Just submitted — bias-check by waiting at least 4 hours before approve recommended (specialist optional)."],
    commentary:
      "Auto-OK candidate. AI confidence is high; references in. Specialist can approve immediately or hold per the 'four-hour soak' guideline some specialists use to avoid first-impression bias.",
  }),
  interview1: {
    title: "AI Interview 1",
    durationLabel: "22 min · Apr 30, 1:14 PM CDT",
    recordedLabel: "Apr 30, 1:14 PM CDT",
    passed: true,
    card: tightIvCard({
      overall: 92,
      band: "high",
      tierLabel: "★ Top tier",
      positives: ["Top-tier English", "Polished professional register"],
      negatives: [],
    }),
  },
  interview2: {
    title: "AI Interview 2",
    durationLabel: "31 min · Apr 30, 2:30 PM CDT",
    recordedLabel: "Apr 30, 2:30 PM CDT",
    passed: true,
    card: tightIvCard({
      overall: 88,
      band: "high",
      tierLabel: "Strong",
      positives: ["Deep fintech ops vocabulary", "Stripe + QuickBooks fluent"],
      negatives: ["Slightly junior on people-management vocabulary"],
    }),
  },
  profile: {
    bio: "Six years exec ops support at LATAM-based fintechs. Currently between full-time roles and exploring fractional.",
    yearsExperience: 6,
    languages: "Spanish (native), English (C2)",
    hourlyRate: "$16/hr",
    availability: "30 hrs/week · CDT (UTC-6) · flexible",
    skills: ["Fintech ops", "Stripe", "QuickBooks Online", "Notion", "Slack", "Asana"],
    certs: [{ icon: "trust", name: "Atlas Trust Score: 4.7 / 5", meta: "6 engagements verified" }],
    lastEditedLabel: "Apr 30, 12:48 PM",
  },
  introVideo: {
    durationSeconds: 80,
    recordedLabel: "Recorded Apr 30",
    transcriptOpener: "“Hi, I'm Sofia. I've spent the last six years running ops for LATAM fintechs…”",
    scoreLabel: "AI: 90 / Top",
  },
  references: [
    { id: "ref-sofia-1", initials: "ER", avatarGradient: "warm", name: "Elena Ramos", relation: "CFO · Klar (CDMX) · 3 years", quote: "Sofia is one of the sharpest operators I've worked with. Don't hesitate.", status: "confirmed", statusLabel: "Verified · Strong", contactMeta: "Apr 30 · phone" },
    { id: "ref-sofia-2", initials: "DM", avatarGradient: "navy", name: "Diego Morales", relation: "COO · Albo · 2 years", quote: "Reliable, sharp, low ego. Hire her.", status: "confirmed", statusLabel: "Verified · Strong", contactMeta: "Apr 30 · email" },
    { id: "ref-sofia-3", initials: "VC", avatarGradient: "olive", name: "Valentina Cruz", relation: "Founder · Cruz Studio · 1 year", quote: "Excellent. Would re-hire.", status: "confirmed", statusLabel: "Verified · Strong", contactMeta: "Apr 30 · phone" },
  ],
  workSamples: [
    { title: "Stripe reconciliation playbook", type: "Notion doc", gradient: 1, iconKey: "doc" },
    { title: "Vendor onboarding template", type: "Google Sheet", gradient: 2, iconKey: "spreadsheet" },
  ],
  antiCheat: ANTI_CHEAT_CLEAN,
  assessment: {
    card: tightIvCard({
      overall: 90,
      band: "high",
      tierLabel: "★ APPROVE",
      positives: [
        "All three references in within 90 minutes",
        "Both AI interviews above 88",
        "Auto-OK candidate by every signal",
      ],
      negatives: [
        "Just submitted — wait for 4-hour soak per some specialists' bias check",
      ],
      positiveLabel: "Why approve",
      subs: [
        { label: "Confidence", score: 94, display: "94%", band: "high" },
        { label: "Predicted client fit", score: 91, band: "high" },
        { label: "Pool match score", score: 92, band: "high" },
      ],
    }),
  },
  decisionBar: {
    aiRecommendation: "AI recommends APPROVE",
    aiConfidence: "94% confidence",
    averageMinutes: "22m",
    sectionsReviewed: 0,
    sectionsTotal: 10,
    destructive: { label: "Reject", longLabel: "Reject" },
    neutral: { label: "Revisions", longLabel: "Request revisions" },
    primary: { label: "Approve & advance →" },
  },
  aiRecommendation: "APPROVE",
};

/* ---------- 9. David Kim — SLA breach (>48h) ---------- */

const david: ReviewQueueCandidate = {
  id: "rq-david-kim",
  firstName: "David",
  fullName: "David Kim",
  age: 35,
  countryFlag: "🇰🇷",
  countryName: "South Korea",
  city: "Seoul",
  category: "Virtual Assistant",
  initials: "D",
  avatarGradient: "navy",
  hoursSinceSubmission: 52,
  slaHoursRemaining: 0,
  slaBand: "urgent",
  filterTags: ["all", "sla"],
  hourlyRate: "$17/hr",
  languagesLong: "Korean (native), English (C1), Japanese (B2)",
  languagesShort: "Korean · English · Japanese",
  composite: 86,
  compositeBand: "clear-pass",
  compositeTierLabel: "★ Strong",
  tabs: REVIEW_TABS,
  overview: tightIvCard({
    overall: 86,
    band: "high",
    tierLabel: "★ Strong (SLA breach)",
    positives: [
      "Strong AI signals across both interviews",
      "Two references confirmed strong",
    ],
    negatives: [
      "Submission breached the 48h SLA threshold (52h since submission)",
      "Specialist should expedite the decision",
    ],
    commentary:
      "David's signals support approval but the queue lapsed past the >48h SLA red threshold. Expedite and approve unless something specific gives pause. Note the SLA breach for the daily activity log.",
  }),
  interview1: {
    title: "AI Interview 1",
    durationLabel: "21 min · Apr 28, 9:14 AM KST",
    recordedLabel: "Apr 28, 9:14 AM KST",
    passed: true,
    card: tightIvCard({ overall: 88, band: "high", tierLabel: "Strong", positives: ["Trilingual confidence"], negatives: [] }),
  },
  interview2: {
    title: "AI Interview 2",
    durationLabel: "32 min · Apr 28, 10:30 AM KST",
    recordedLabel: "Apr 28, 10:30 AM KST",
    passed: true,
    card: tightIvCard({ overall: 84, band: "mid", tierLabel: "Solid", positives: ["Strong APAC ops"], negatives: ["Light on financial-ops"] }),
  },
  profile: {
    bio: "Eight years remote ops support across APAC SaaS firms.",
    yearsExperience: 8,
    languages: "Korean (native), English (C1), Japanese (B2)",
    hourlyRate: "$17/hr",
    availability: "30 hrs/week · KST (UTC+9)",
    skills: ["APAC ops", "Translation", "Notion", "Slack"],
    certs: [{ icon: "trust", name: "Atlas Trust Score: 4.7 / 5", meta: "8 engagements verified" }],
    lastEditedLabel: "Apr 28, 8:48 AM",
  },
  introVideo: {
    durationSeconds: 86,
    recordedLabel: "Recorded Apr 28",
    transcriptOpener: "“Annyeong, I'm David. I help remote SaaS teams run APAC operations…”",
    scoreLabel: "AI: 85 / Strong",
  },
  references: [
    { id: "ref-david-1", initials: "JK", avatarGradient: "warm", name: "Jin-Soo Kang", relation: "VP Ops · Kakao Ventures · 4 years", quote: "Excellent operator.", status: "confirmed", statusLabel: "Verified · Strong", contactMeta: "Apr 28 · phone" },
    { id: "ref-david-2", initials: "AT", avatarGradient: "navy", name: "Aoi Tanaka", relation: "Director · Tokyo Lab · 2 years", quote: "Reliable, multilingual, sharp.", status: "confirmed", statusLabel: "Verified · Strong", contactMeta: "Apr 28 · email" },
  ],
  workSamples: [
    { title: "APAC client onboarding", type: "Notion doc", gradient: 1, iconKey: "doc" },
    { title: "Trilingual support FAQs", type: "Google Doc", gradient: 2, iconKey: "doc" },
  ],
  antiCheat: ANTI_CHEAT_CLEAN,
  assessment: {
    card: tightIvCard({
      overall: 86,
      band: "high",
      tierLabel: "★ APPROVE — EXPEDITE",
      positives: ["Strong signals", "Clean references"],
      negatives: ["SLA breached at 52h — log the breach"],
      subs: [
        { label: "Confidence", score: 89, display: "89%", band: "high" },
        { label: "Predicted client fit", score: 87, band: "high" },
        { label: "Pool match score", score: 88, band: "high" },
      ],
    }),
  },
  decisionBar: {
    aiRecommendation: "AI recommends APPROVE — EXPEDITE",
    aiConfidence: "89% confidence",
    averageMinutes: "22m",
    sectionsReviewed: 0,
    sectionsTotal: 10,
    destructive: { label: "Reject", longLabel: "Reject" },
    neutral: { label: "Revisions", longLabel: "Request revisions" },
    primary: { label: "Approve & advance →" },
  },
  aiRecommendation: "APPROVE",
};

/* ============================================================
   Roster export
   ============================================================ */

export const reviewQueueCandidates: ReadonlyArray<ReviewQueueCandidate> = [
  marie,
  carmen,
  hana,
  wei,
  tomas,
  linh,
  rajan,
  sofia,
  david,
];

/** Default selected candidate id (first in list — preserves SLA ordering). */
export const REVIEW_DEFAULT_CANDIDATE_ID = marie.id;
