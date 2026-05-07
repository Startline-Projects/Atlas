/**
 * Mock data for `/specialist/help` — long-form help & resources page.
 *
 * Single column scroll: hero search → quick-help banner → 5 sections
 * (Browse-by-topic / Popular articles / Training modules / Contact /
 * Changelog).
 *
 * Static content only — no cross-session refs. Article copy is plausible
 * specialist-internal documentation; all article ids prefixed `art-*`.
 *
 * PDF deviation: PDF Step 16 categorizes help by Onboarding / Workflows
 * / Templates / Policies / Training / Quick reference. HTML organizes
 * by product surface (Getting started / Reviews / Re-cert / Disputes /
 * Sourcing / Clients) which is broader and more navigation-friendly.
 * Per HTML wins → ship the broader scope. PDF's category set captured
 * as `LegacyPDFCategory` for migration if a future polish session
 * wants to re-organize.
 */

/* ============================================================
   Hero search suggestions
   ============================================================ */

export type SearchSuggestion = {
  /** "How disputes work" / "Re-cert checklist" — chip label. */
  label: string;
  /** Article id this suggestion routes to (visual link only this session). */
  articleId: string;
};

export const SEARCH_SUGGESTIONS: ReadonlyArray<SearchSuggestion> = [
  { label: "How disputes work", articleId: "art-disputes-overview" },
  { label: "Re-cert checklist", articleId: "art-recert-checklist" },
  { label: "Promoting to Elite tier", articleId: "art-tier-elite" },
  { label: "Writing a client brief", articleId: "art-client-brief" },
  { label: "Off-boarding policy", articleId: "art-offboarding" },
];

/* ============================================================
   Quick-help banner (continue-watching pattern)
   ============================================================ */

export type QuickHelpBanner = {
  title: string;
  /** "Module 3 of 5 · 12 minutes left · suggested for you based on your dispute caseload" */
  detail: string;
  ctaLabel: string;
  trainingId: string;
};

export const quickHelpBanner: QuickHelpBanner = {
  title: "Continue: Advanced mediation training",
  detail:
    "Module 3 of 5 · 12 minutes left · suggested for you based on your dispute caseload",
  ctaLabel: "Resume",
  trainingId: "training-mediation",
};

/* ============================================================
   Topic grid — 6 cards
   ============================================================ */

export type TopicTone = "ink" | "success" | "lime" | "danger" | "navy" | "amber";

export type TopicCard = {
  key: string;
  /** "Getting started" / "Reviews & decisions" etc. */
  title: string;
  /** Short description shown under the title. */
  description: string;
  /** Article count badge. */
  articleCount: number;
  /** Color modifier for the icon background. */
  tone: TopicTone;
  /** Lucide icon key — page resolves to a real component. */
  iconKey:
    | "compass"
    | "check"
    | "refresh"
    | "shield"
    | "users"
    | "briefcase";
};

export const topicCards: ReadonlyArray<TopicCard> = [
  {
    key: "getting-started",
    title: "Getting started",
    description:
      "Atlas onboarding for new specialists. The first 30 days, who to know, what to read.",
    articleCount: 14,
    tone: "ink",
    iconKey: "compass",
  },
  {
    key: "reviews",
    title: "Reviews & decisions",
    description:
      "How review queue + recert + co-sign workflows actually work end-to-end.",
    articleCount: 22,
    tone: "success",
    iconKey: "check",
  },
  {
    key: "recert",
    title: "Re-certification",
    description:
      "12-month cycle, criteria, edge cases (paused / vacation / off-board).",
    articleCount: 18,
    tone: "lime",
    iconKey: "refresh",
  },
  {
    key: "disputes",
    title: "Disputes & escalations",
    description:
      "72h SLA, decision options, when to escalate, how the backstop activates.",
    articleCount: 11,
    tone: "danger",
    iconKey: "shield",
  },
  {
    key: "sourcing",
    title: "Sourcing & outreach",
    description:
      "Outreach scripts, the kanban, recruitment-sprint mode, affiliate links (when wired).",
    articleCount: 15,
    tone: "navy",
    iconKey: "users",
  },
  {
    key: "clients",
    title: "Working with clients",
    description:
      "Trust tiers, expectations management, dispute prevention, expansion plays.",
    articleCount: 19,
    tone: "amber",
    iconKey: "briefcase",
  },
];

/* ============================================================
   Popular articles — 6 numbered rows
   ============================================================ */

export type ArticleSummary = {
  id: string;
  title: string;
  /** "5 MIN READ · UPDATED 2W AGO". */
  metaLabel: string;
};

export const popularArticles: ReadonlyArray<ArticleSummary> = [
  {
    id: "art-escalate-recert",
    title: "When should I escalate a re-cert decision to admin?",
    metaLabel: "5 min read · updated 2w ago",
  },
  {
    id: "art-ai-composite",
    title: "Reading the AI assessment composite score",
    metaLabel: "3 min read · updated 1mo ago",
  },
  {
    id: "art-atlas-backstop",
    title: "Atlas backstop: when it activates & what it covers",
    metaLabel: "7 min read · updated 1w ago",
  },
  {
    id: "art-tier-elite",
    title: "Tier promotion criteria for Vetted → Elite",
    metaLabel: "4 min read · updated 3w ago",
  },
  {
    id: "art-pause-checklist",
    title: "Writing pause-for-action checklists that work",
    metaLabel: "6 min read · updated 5d ago",
  },
  {
    id: "art-specialist-score",
    title: "How specialist scores are calculated",
    metaLabel: "8 min read · updated 2mo ago",
  },
];

/* ============================================================
   Training modules — 6 cards w/ thumb backgrounds
   ============================================================ */

export type TrainingTagKind = "required" | "complete" | "neutral";

export type TrainingCard = {
  id: string;
  title: string;
  /** "42 MIN", "VIDEO", "PODCAST", "QUICK START" — short label chip. */
  durationLabel: string;
  /** "REQUIRED · IN PROGRESS" / "COMPLETE · ✓" / "NEW" / null. */
  tag: { label: string; kind: TrainingTagKind } | null;
  /** Optional progress 0-100. */
  progressPct?: number;
  /** Thumb background variant 1-6 — the page maps to a CSS gradient. */
  thumb: 1 | 2 | 3 | 4 | 5 | 6;
};

export const trainingCards: ReadonlyArray<TrainingCard> = [
  {
    id: "training-mediation",
    title: "Advanced mediation for disputes",
    durationLabel: "42 MIN",
    tag: { label: "Required · in progress", kind: "required" },
    progressPct: 60,
    thumb: 1,
  },
  {
    id: "training-briefs",
    title: "Reading client briefs like an expert",
    durationLabel: "28 MIN · video",
    tag: { label: "New", kind: "neutral" },
    thumb: 2,
  },
  {
    id: "training-decision-framework",
    title: "The Atlas decision framework",
    durationLabel: "36 MIN",
    tag: { label: "Complete · ✓", kind: "complete" },
    progressPct: 100,
    thumb: 3,
  },
  {
    id: "training-senior-paths",
    title: "Senior specialists: how they grew",
    durationLabel: "22 MIN · podcast",
    tag: null,
    thumb: 4,
  },
  {
    id: "training-pool-health",
    title: "Pool health interpretation",
    durationLabel: "48 MIN · video",
    tag: { label: "In progress", kind: "neutral" },
    progressPct: 25,
    thumb: 5,
  },
  {
    id: "training-keyboard",
    title: "Atlas keyboard shortcuts cheat sheet",
    durationLabel: "15 MIN · quick start",
    tag: null,
    thumb: 6,
  },
];

/* ============================================================
   Contact — 3 cards
   ============================================================ */

export type ContactCardKind = "chat" | "email" | "office-hours";

export type ContactCard = {
  key: ContactCardKind;
  title: string;
  /** Uppercase mono caption — e.g. "PRIORITY LANE · ATLAS STAFF ONLY". */
  caption: string;
  ctaLabel: string;
  /** Status row text shown at the bottom ("All systems operational · 4 staff online"). */
  statusLabel: string;
  /** True for the highlighted card. */
  featured?: boolean;
};

export const contactCards: ReadonlyArray<ContactCard> = [
  {
    key: "chat",
    title: "Specialist support chat",
    caption: "Priority lane · Atlas staff only",
    ctaLabel: "Start chat",
    statusLabel: "All systems operational · 4 staff online",
    featured: true,
  },
  {
    key: "email",
    title: "Email support",
    caption: "specialists@atlasworld.co",
    ctaLabel: "Compose email",
    statusLabel: "Avg response · 6 hours",
  },
  {
    key: "office-hours",
    title: "Office hours",
    caption: "Every Wed · 11 AM PT · 60 min",
    ctaLabel: "Add to calendar",
    statusLabel: "Next session · in 4 days",
  },
];

/* ============================================================
   Changelog — 5 dated entries
   ============================================================ */

export type ChangelogTagKind = "new" | "improved" | "fixed";

export type ChangelogEntry = {
  id: string;
  /** "APR 28" — pre-formatted date. */
  dateLabel: string;
  tag: { label: string; kind: ChangelogTagKind };
  text: string;
};

export const changelog: ReadonlyArray<ChangelogEntry> = [
  {
    id: "cl-1",
    dateLabel: "APR 28",
    tag: { label: "New", kind: "new" },
    text: "Atlas AI suggestions now appear inline in chat composers (candidate-chat, client-chat).",
  },
  {
    id: "cl-2",
    dateLabel: "APR 24",
    tag: { label: "Improved", kind: "improved" },
    text:
      "Re-cert dossier now includes a 12-month timeline showing rate / rating / hours over the cycle.",
  },
  {
    id: "cl-3",
    dateLabel: "APR 18",
    tag: { label: "New", kind: "new" },
    text:
      "Sourcing pipeline kanban is now in beta. Drag-and-drop comes in the next polish release.",
  },
  {
    id: "cl-4",
    dateLabel: "APR 11",
    tag: { label: "Fixed", kind: "fixed" },
    text:
      "Notification overflow no longer pushes the topbar count badge off the icon. (Hat tip to Aisha at Atlas-WAS.)",
  },
  {
    id: "cl-5",
    dateLabel: "APR 04",
    tag: { label: "Improved", kind: "improved" },
    text:
      "Performance scorecard quartile gauge is more legible at small widths.",
  },
];

/* ============================================================
   PDF legacy categories — typed for migration only
   ============================================================ */

/**
 * PDF Step 16 §"Navigation" — captured for migration. HTML organizes
 * articles by product surface (the topicCards above); PDF organizes
 * by content type. If a future polish session wants to re-organize,
 * each topicCard can carry a `legacyPDFCategory` field that maps
 * articles into both navigation models.
 */
export type LegacyPDFCategory =
  | "onboarding"
  | "workflows"
  | "templates"
  | "policies"
  | "training"
  | "quick-reference";

/* ============================================================
   Snapshot
   ============================================================ */

export const helpSnapshot = {
  topics: topicCards,
  popular: popularArticles,
  training: trainingCards,
  contact: contactCards,
  changelog,
  searchSuggestions: SEARCH_SUGGESTIONS,
  quickHelpBanner,
};
