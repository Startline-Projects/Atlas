/**
 * Mock data for `/specialist/sourcing` — outbound sourcing kanban.
 *
 * Source-of-truth deviations from the PDF (HTML wins):
 *   - PDF describes (a) Active Sourcing Requests panel — client-originated
 *     brief requests for shortlists; (b) Affiliate link + QR code generator;
 *     (c) Recruitment sprint mode (auto-activates when pool drops below
 *     `POOL_DEPLETION_THRESHOLD = 15`); (d) Outbound activity tracker.
 *     **None of these appear in the HTML's `view-sourcing` block.** The
 *     HTML shows ONLY the kanban (4 stages) with cards, filters, slide-over
 *     detail, and add-prospect modal. We build the HTML's shape this
 *     session and capture the PDF's other panels as future-session work.
 *   - `POOL_DEPLETION_THRESHOLD = 15` lives in `pool-health.ts` (see
 *     migration note there) and is the trigger for the recruitment sprint
 *     mode — but sprint-mode UI is out of scope this session.
 *
 * Cross-session ID strategy:
 *   - Prospects are pre-pool — they have new `prospect-*` IDs.
 *   - One prospect in the "Applied" stage carries a `convertedTo: cand-*`
 *     back-reference (Tomás Reyes converts to Marie Okonkwo's slot;
 *     Marie was the "just-approved welcome" candidate from S3 — the
 *     most recent pool entrant, so she's the natural conversion target).
 *   - All other prospects have NO back-references (they're in
 *     pre-pool stages or freshly applied without yet appearing in the
 *     review queue).
 */

import type { AvatarGradientKey } from "./queue-types";

/* ============================================================
   Stages, sources, and tones
   ============================================================ */

/** The 4 kanban stages, in left-to-right order. */
export type SourcingStage = "sourced" | "contacted" | "engaged" | "applied";

/** Source channels matching the HTML's filter chips. */
export type SourcingSource = "linkedin" | "referral" | "search" | "scout";

/** Match score chip tone. Mirrors the source CSS:
 *    .top  → lime (≥90)
 *    .high → success (≥80)
 *    .mid  → amber (≥70)
 */
export type SourcingMatchTone = "top" | "high" | "mid";

/** Stage-time chip tone — drives the "12d in stage" warn/danger color. */
export type SourcingStageTimeTone = "default" | "warn" | "danger";

/* ============================================================
   Sub-shapes for the slide-over detail
   ============================================================ */

export type ProspectSignal = {
  /** Short label, sentence-case. */
  label: string;
  /** Default = neutral. success / warn highlight positive / risky signals. */
  tone?: "default" | "success" | "warn";
};

export type ProspectOutreachKind =
  | "linkedin"
  | "email"
  | "referral"
  | "atlas"
  | "note"
  | "system";

export type ProspectOutreachEvent = {
  id: string;
  /** Pre-formatted relative timestamp ("3d ago"). */
  when: string;
  kind: ProspectOutreachKind;
  /** One-line description. */
  summary: string;
};

export type ProspectStageTime = {
  /** Pre-formatted ("3d in stage", "12d in stage"). */
  label: string;
  tone: SourcingStageTimeTone;
};

/* ============================================================
   The Prospect shape
   ============================================================ */

export type SourcingProspect = {
  /** Stable id; `prospect-<slug>`. Pre-pool — NOT a candidate id. */
  id: string;
  name: string;
  initials: string;
  countryFlag?: string;
  location: string;
  /** Optional age (some sources don't have it). */
  age?: number;
  /** Optional current role label. */
  currentRole?: string;
  avatarGradient: AvatarGradientKey;

  stage: SourcingStage;
  source: SourcingSource;
  /** 0-100 — drives the chip number AND determines `matchTone`. */
  matchScore: number;
  matchTone: SourcingMatchTone;
  /** One-line "why this prospect" rendered on the card. */
  reason: string;
  /** Optional skill tags rendered on the card. */
  tags?: ReadonlyArray<string>;
  stageTime: ProspectStageTime;

  /* Slide-over detail content */
  /** Multi-line rich bio for the detail sheet; supports leading `<em>` clause. */
  bio?: string;
  signals?: ReadonlyArray<ProspectSignal>;
  skills?: ReadonlyArray<string>;
  outreachHistory?: ReadonlyArray<ProspectOutreachEvent>;

  /* Applied stage only — back-reference to the canonical candidate id */
  /** When the prospect has converted into the candidate pool. Only the
   *  "applied" stage uses this; other stages leave it undefined. */
  convertedTo?: string;
};

/* ============================================================
   Stage definitions (header + meta + avg stage-time)
   ============================================================ */

export type SourcingStageDef = {
  key: SourcingStage;
  title: string;
  /** Sub-line under the stage title — describes what this stage means. */
  meta: string;
  /** Average time prospects spend in this stage (e.g. "Avg 3d"). */
  avg: string;
};

export const SOURCING_STAGES: ReadonlyArray<SourcingStageDef> = [
  {
    key: "sourced",
    title: "Sourced",
    meta: "Identified · not contacted",
    avg: "Avg 3d",
  },
  {
    key: "contacted",
    title: "Contacted",
    meta: "Initial outreach sent",
    avg: "Avg 5d",
  },
  {
    key: "engaged",
    title: "Engaged",
    meta: "Replied · in conversation",
    avg: "Avg 4d",
  },
  {
    key: "applied",
    title: "Applied",
    meta: "Converted → Review queue",
    avg: "This month",
  },
];

/* ============================================================
   Source filter chips (shown above the board)
   ============================================================ */

export type SourcingSourceFilter = {
  key: "all" | SourcingSource;
  label: string;
};

export const SOURCING_SOURCE_FILTERS: ReadonlyArray<SourcingSourceFilter> = [
  { key: "all", label: "All sources" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "referral", label: "Referral" },
  { key: "search", label: "Talent search" },
  { key: "scout", label: "AI scout" },
];

/* ============================================================
   Stat strip (header KPIs)
   ============================================================ */

export type SourcingStatTrendTone = "success" | "amber" | "default";

export type SourcingStatCard = {
  label: string;
  /** Bignum body — string so we can carry "/8" or "%" appendices via `numEm`. */
  num: string;
  /** Italic sub-portion of the bignum ("%" / "/8" / "d") — rendered as `<em>`. */
  numEm?: string;
  /** Trend caption + tone (success/amber/default). */
  trend?: { tone: SourcingStatTrendTone; text: string };
  /** Optional conversion-bar fill 0-100 (the second card has this). */
  conversionPct?: number;
};

export const sourcingStats: ReadonlyArray<SourcingStatCard> = [
  {
    label: "In pipeline",
    num: "26",
    trend: { tone: "success", text: "↑ 4 this week" },
  },
  {
    label: "Conversion · sourced → applied",
    num: "28",
    numEm: "%",
    conversionPct: 28,
  },
  {
    label: "Applied this month",
    num: "5",
    numEm: "/8",
    trend: { tone: "amber", text: "63% to target · 8 days left" },
  },
  {
    label: "Avg time to apply",
    num: "11",
    numEm: "d",
    trend: { tone: "success", text: "↓ 3d vs last month" },
  },
];

/* ============================================================
   The 9 prospects — covers all 4 stages, all 4 sources
   ============================================================ */

const diya: SourcingProspect = {
  id: "prospect-diya-mehta",
  name: "Diya Mehta",
  initials: "DM",
  countryFlag: "🇮🇳",
  location: "Pune, India",
  age: 28,
  currentRole: "Ops lead at fintech",
  avatarGradient: "navy",
  stage: "sourced",
  source: "linkedin",
  matchScore: 87,
  matchTone: "high",
  reason: "5y ops at Series B fintech, recently freelance — strong VA-adjacent profile",
  tags: ["operations", "english/hindi/marathi"],
  stageTime: { label: "2d in stage", tone: "default" },
  bio:
    "<em>Strong VA-adjacent profile</em> · 5 years running ops at a Series B fintech, recently transitioned to freelance. Speaks English/Hindi/Marathi. Active LinkedIn presence with steady engagement on operations content.",
  signals: [
    { label: "Active LinkedIn engagement (3 posts/wk)", tone: "success" },
    { label: "Mentioned looking for remote VA work", tone: "success" },
    { label: "No replies to first outreach yet", tone: "default" },
  ],
  skills: ["Operations", "Notion", "Slack", "Excel", "Process design"],
  outreachHistory: [
    {
      id: "out-diya-1",
      when: "2d ago",
      kind: "linkedin",
      summary: "Sent personalized connection note + intro to Atlas",
    },
    {
      id: "out-diya-2",
      when: "2d ago",
      kind: "system",
      summary: "Connection accepted — no message reply yet",
    },
  ],
};

const aarav: SourcingProspect = {
  id: "prospect-aarav-singh",
  name: "Aarav Singh",
  initials: "AS",
  countryFlag: "🇮🇳",
  location: "Bengaluru, India",
  age: 31,
  currentRole: "Independent VA · 3y",
  avatarGradient: "olive",
  stage: "sourced",
  source: "referral",
  matchScore: 92,
  matchTone: "top",
  reason: "Referred by Anand Patel — overlaps Anand's tech-ops profile, English/Hindi/Kannada",
  tags: ["tech ops", "referral"],
  stageTime: { label: "1d in stage", tone: "default" },
  bio:
    "<em>Highly recommended</em> by Anand Patel (active hire). Aarav has been Anand's freelance partner on side projects for two years — same ops discipline, similar tooling, slightly different timezone.",
  signals: [
    { label: "Referral from active hire (Anand Patel)", tone: "success" },
    { label: "3y independent VA — no platform history", tone: "default" },
  ],
  skills: ["Project ops", "QuickBooks", "Asana", "Excel", "Slack"],
  outreachHistory: [
    {
      id: "out-aarav-1",
      when: "1d ago",
      kind: "referral",
      summary: "Referred by Anand Patel · introduction email queued",
    },
  ],
};

const anikaPatel: SourcingProspect = {
  id: "prospect-anika-patel",
  name: "Anika Patel",
  initials: "AP",
  countryFlag: "🇮🇳",
  location: "Mumbai, India",
  age: 26,
  currentRole: "Freelance research VA",
  avatarGradient: "warm",
  stage: "sourced",
  source: "search",
  matchScore: 78,
  matchTone: "mid",
  reason: "Found via Atlas talent search — research-VA niche, mid-experience",
  tags: ["research", "writing"],
  stageTime: { label: "5d in stage", tone: "warn" },
  bio:
    "Found via Atlas talent search — niche profile (research VA + light editorial work) for clients who need both. 26, two years freelance, no current platform.",
  signals: [
    { label: "Specialty match — research-heavy clients", tone: "success" },
    { label: "Below experience floor for Elite tier", tone: "warn" },
  ],
  skills: ["Research", "Notion", "Long-form writing"],
  outreachHistory: [
    {
      id: "out-anika-1",
      when: "5d ago",
      kind: "atlas",
      summary: "Match surfaced by talent search · waiting on first outreach",
    },
  ],
};

const hannah: SourcingProspect = {
  id: "prospect-hannah-cole",
  name: "Hannah Cole",
  initials: "HC",
  countryFlag: "🇿🇦",
  location: "Cape Town, South Africa",
  age: 29,
  currentRole: "Senior VA at boutique agency",
  avatarGradient: "teal",
  stage: "contacted",
  source: "linkedin",
  matchScore: 84,
  matchTone: "high",
  reason: "5y VA experience, currently at a boutique agency, looking to go independent",
  tags: ["agency exit", "client ops"],
  stageTime: { label: "4d in stage", tone: "default" },
  bio:
    "Senior VA at a Cape Town boutique agency for 5y. LinkedIn post 2 weeks ago mentioned planning to go independent in Q2. Strong client-ops profile, native English speaker.",
  signals: [
    { label: "Public 'going independent' signal", tone: "success" },
    { label: "Replied to first DM — scheduling intro call", tone: "success" },
  ],
  skills: ["Client ops", "Calendar mgmt", "CRM", "Asana", "Slack"],
  outreachHistory: [
    {
      id: "out-hannah-1",
      when: "4d ago",
      kind: "linkedin",
      summary: "Sent DM referencing her 'going independent' post",
    },
    {
      id: "out-hannah-2",
      when: "3d ago",
      kind: "linkedin",
      summary: "Replied — agreed to a 20-min intro this week",
    },
  ],
};

const marcusLee: SourcingProspect = {
  id: "prospect-marcus-lee",
  name: "Marcus Lee",
  initials: "ML",
  countryFlag: "🇸🇬",
  location: "Singapore",
  age: 33,
  currentRole: "Ex-McKinsey, freelance ops consultant",
  avatarGradient: "purple",
  stage: "contacted",
  source: "scout",
  matchScore: 91,
  matchTone: "top",
  reason: "AI scout flagged — ex-MBB, premium-tier ops profile, expensive but high-leverage",
  tags: ["premium", "consulting", "elite-track"],
  stageTime: { label: "6d in stage", tone: "warn" },
  bio:
    "<em>AI scout flagged</em> · 8y consulting (3y McKinsey), now freelance ops/strategy. High-rate-band profile — would be Elite tier from day one. Currently working with two US clients direct.",
  signals: [
    { label: "AI scout match score 91 (top decile)", tone: "success" },
    { label: "High rate band — niche Elite-tier clients only", tone: "warn" },
    { label: "First email sent · no reply 6d", tone: "warn" },
  ],
  skills: ["Strategy", "Ops design", "Excel modeling", "Stakeholder mgmt"],
  outreachHistory: [
    {
      id: "out-marcus-1",
      when: "6d ago",
      kind: "email",
      summary: "Sent introductory email — emphasized Elite-tier client roster",
    },
    {
      id: "out-marcus-2",
      when: "3d ago",
      kind: "email",
      summary: "Sent gentle follow-up · still no reply",
    },
  ],
};

const wei: SourcingProspect = {
  id: "prospect-wei-tan",
  name: "Wei Tan",
  initials: "WT",
  countryFlag: "🇲🇾",
  location: "Kuala Lumpur, Malaysia",
  age: 27,
  currentRole: "Customer ops at Series A SaaS",
  avatarGradient: "ice",
  stage: "engaged",
  source: "linkedin",
  matchScore: 86,
  matchTone: "high",
  reason: "In active conversation — strong customer-ops fit, APAC overlap with Saunders",
  tags: ["customer ops", "apac"],
  stageTime: { label: "3d in stage", tone: "default" },
  bio:
    "Customer ops lead at a Series A SaaS — KL-based with strong APAC overlap. Active conversation on LinkedIn; she's open to the Atlas pool but wants to know rate-band specifics before applying.",
  signals: [
    { label: "Active conversation · 3 messages exchanged", tone: "success" },
    { label: "Asked about rate band — answered with Vetted-tier ranges", tone: "default" },
    { label: "Likely converts in 1-2 weeks", tone: "success" },
  ],
  skills: ["Customer ops", "Intercom", "Notion", "SQL basics"],
  outreachHistory: [
    {
      id: "out-wei-1",
      when: "10d ago",
      kind: "linkedin",
      summary: "Sent intro DM",
    },
    {
      id: "out-wei-2",
      when: "9d ago",
      kind: "linkedin",
      summary: "Replied — opened conversation",
    },
    {
      id: "out-wei-3",
      when: "5d ago",
      kind: "linkedin",
      summary: "Asked about rate-band for APAC VAs",
    },
    {
      id: "out-wei-4",
      when: "3d ago",
      kind: "linkedin",
      summary: "Answered with Vetted-tier ranges + sent application link",
    },
  ],
};

const priyaReddy: SourcingProspect = {
  id: "prospect-priya-reddy",
  name: "Priya Reddy",
  initials: "PR",
  countryFlag: "🇮🇳",
  location: "Hyderabad, India",
  age: 30,
  currentRole: "Healthcare ops VA · 4y",
  avatarGradient: "lime",
  stage: "engaged",
  source: "referral",
  matchScore: 89,
  matchTone: "high",
  reason: "Referred by Kanya Suksawat — healthcare-ops specialty, strong references",
  tags: ["healthcare", "referral"],
  stageTime: { label: "5d in stage", tone: "default" },
  bio:
    "Referred by Kanya Suksawat (active hire at Lumio Health). Priya runs healthcare-ops VA work for two US telehealth clients direct — 4y experience, deep HIPAA workflow knowledge.",
  signals: [
    { label: "Referral from Kanya · Lumio overlap potential", tone: "success" },
    { label: "Healthcare specialty — niche client demand", tone: "success" },
    { label: "References scheduled for next week", tone: "default" },
  ],
  skills: ["Healthcare ops", "HIPAA workflows", "Patient comms", "Athenahealth"],
  outreachHistory: [
    {
      id: "out-priya-1",
      when: "8d ago",
      kind: "referral",
      summary: "Referred by Kanya Suksawat · email intro",
    },
    {
      id: "out-priya-2",
      when: "7d ago",
      kind: "email",
      summary: "Replied · scheduled intro call",
    },
    {
      id: "out-priya-3",
      when: "5d ago",
      kind: "atlas",
      summary: "Intro call done · sent application + reference template",
    },
  ],
};

const tomasReyes: SourcingProspect = {
  id: "prospect-tomas-reyes",
  name: "Tomás Reyes",
  initials: "TR",
  countryFlag: "🇲🇽",
  location: "Mexico City, Mexico",
  age: 32,
  currentRole: "Bilingual VA · 6y",
  avatarGradient: "terracotta",
  stage: "applied",
  source: "referral",
  matchScore: 88,
  matchTone: "high",
  reason: "Application submitted — bilingual VA, ready for review queue",
  tags: ["bilingual", "applied"],
  stageTime: { label: "1d in stage", tone: "default" },
  bio:
    "<em>Application complete</em> · 6y bilingual VA experience, EST overlap, strong ops background. References submitted, in review queue this week. Same conversion path as Marie Okonkwo.",
  signals: [
    { label: "Application complete · references submitted", tone: "success" },
    { label: "Routed to review queue · sits as a fresh candidate", tone: "success" },
  ],
  skills: ["Bilingual ops", "Notion", "Slack", "QuickBooks"],
  outreachHistory: [
    {
      id: "out-tomas-1",
      when: "12d ago",
      kind: "referral",
      summary: "Referred by Carmen Lopez (active hire) · email intro",
    },
    {
      id: "out-tomas-2",
      when: "11d ago",
      kind: "email",
      summary: "Replied · scheduled intro call",
    },
    {
      id: "out-tomas-3",
      when: "5d ago",
      kind: "atlas",
      summary: "Intro done · sent application link",
    },
    {
      id: "out-tomas-4",
      when: "1d ago",
      kind: "system",
      summary: "Application submitted · routed to review queue",
    },
  ],
  // Cross-session conversion link — Tomás's application landed on the
  // same cohort that Marie Okonkwo entered the pool through.
  convertedTo: "cand-marie-okonkwo",
};

const liam: SourcingProspect = {
  id: "prospect-liam-smith",
  name: "Liam Smith",
  initials: "LS",
  countryFlag: "🇮🇪",
  location: "Dublin, Ireland",
  age: 28,
  currentRole: "Ex-startup ops · just left",
  avatarGradient: "navy",
  stage: "applied",
  source: "linkedin",
  matchScore: 81,
  matchTone: "high",
  reason: "Application submitted — ex-startup ops, EST overlap, awaiting review",
  tags: ["startup-ops", "applied"],
  stageTime: { label: "3d in stage", tone: "default" },
  bio:
    "Just-left ex-startup ops lead (4y at a Y Combinator co). Strong systems background, looking to freelance for 6-12 months before next role. EST/CET overlap.",
  signals: [
    { label: "Application complete · awaiting review queue routing", tone: "default" },
    { label: "Strong systems-thinking signals", tone: "success" },
  ],
  skills: ["Systems design", "Linear", "Notion", "SQL", "Process docs"],
  outreachHistory: [
    {
      id: "out-liam-1",
      when: "9d ago",
      kind: "linkedin",
      summary: "Sent DM after his 'just left' announcement",
    },
    {
      id: "out-liam-2",
      when: "8d ago",
      kind: "linkedin",
      summary: "Replied · agreed to learn more",
    },
    {
      id: "out-liam-3",
      when: "3d ago",
      kind: "atlas",
      summary: "Application submitted · awaiting review",
    },
  ],
  // No `convertedTo` — Liam is in review queue but hasn't been approved
  // and assigned a canonical cand-* id yet.
};

/* ============================================================
   Roster export
   ============================================================ */

export const sourcingProspects: ReadonlyArray<SourcingProspect> = [
  diya,
  aarav,
  anikaPatel,
  hannah,
  marcusLee,
  wei,
  priyaReddy,
  tomasReyes,
  liam,
];

/** Header subtitle ("26 prospects across 4 stages · monthly target: 8 new applicants"). */
export const SOURCING_HEADER_SUBTITLE =
  "26 prospects across 4 stages · monthly target: 8 new applicants";

/**
 * Lookup helper used by the slide-over detail. Returns `undefined` for
 * unknown ids — the sheet falls back to closed state.
 */
export function getSourcingProspect(
  id: string,
): SourcingProspect | undefined {
  return sourcingProspects.find((p) => p.id === id);
}
