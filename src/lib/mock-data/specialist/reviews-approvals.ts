/**
 * Mock data for `/specialist/reviews` (folder: `reviews-approvals/`).
 *
 * **HTML / PDF DEVIATION — building the HTML's active workflow.**
 *
 * The HTML's `view-reviews-approvals` is a 3-direction queue (Awaiting
 * your review · Submitted by you · Closed) of co-sign requests requiring
 * specialist judgment — an active workflow.
 *
 * The PDF's Step 14 describes a **personal decision history** (a list
 * of past Approvals / Rejections / Revisions / Disputes the specialist
 * has made). That's a different surface.
 *
 * Per the standing **HTML wins** rule, Session 6 builds the active
 * co-sign workflow. The PDF's decision-history shape is captured on
 * the type layer via `ReviewDecisionHistoryItem` (below) but NOT
 * rendered.
 *
 * Migration target (specific, not vague):
 *
 *   Reviews-approvals in production needs both surfaces — the active
 *   co-sign workflow (this session's UI) AND a personal decision-history
 *   list (PDF Step 14). Recommended path: a separate route
 *   `/specialist/reviews/history` OR a 4th direction tab "My history".
 *   When services land, this becomes a real migration item.
 *
 * Cross-session ID strategy:
 *   - Every review item references a real `cand-*` (and sometimes
 *     `client-*`) id from prior sessions.
 *   - The HTML's primary case is "Off-board recommendation: Mei Chen"
 *     → `cand-mei-chen`. Other items reference Marcus / Anand / Aaliyah
 *     / Carmen / Sofia.
 *   - Closed items optionally tie back to S5 disputes (`DSP-*`).
 */

import type { AvatarGradientKey } from "./queue-types";

/* ============================================================
   Direction tabs + filter chips
   ============================================================ */

/** Outer-tab key controlling which direction of the workflow is shown. */
export type ReviewDirection = "incoming" | "outgoing" | "closed";

export type ReviewDirectionDef = {
  key: ReviewDirection;
  /** "Awaiting your review" / "Submitted by you" / "Closed". */
  label: string;
  /** Count badge tone — drives "danger" vs default. */
  badgeTone: "danger" | "default";
};

export const REVIEW_DIRECTIONS: ReadonlyArray<ReviewDirectionDef> = [
  { key: "incoming", label: "Awaiting your review", badgeTone: "danger" },
  { key: "outgoing", label: "Submitted by you", badgeTone: "default" },
  { key: "closed", label: "Closed", badgeTone: "default" },
];

/** Inner-filter key for the chip row above the rail. */
export type ReviewsFilterKey =
  | "all"
  | "urgent"
  | "tier-promotion"
  | "off-board"
  | "rate-change";

export type ReviewsFilterDef = {
  key: ReviewsFilterKey;
  label: string;
};

export const REVIEWS_FILTERS: ReadonlyArray<ReviewsFilterDef> = [
  { key: "all", label: "All" },
  { key: "urgent", label: "Urgent" },
  { key: "tier-promotion", label: "Tier promotion" },
  { key: "off-board", label: "Off-board" },
  { key: "rate-change", label: "Rate change" },
];

/* ============================================================
   Review item type / state vocabulary
   ============================================================ */

export type ReviewItemKind =
  | "off-board"
  | "tier-promotion"
  | "rate-change"
  | "policy-exception"
  | "dispute-cosign";

export const REVIEW_ITEM_KIND_LABEL: Record<ReviewItemKind, string> = {
  "off-board": "Off-board",
  "tier-promotion": "Tier promotion",
  "rate-change": "Rate change",
  "policy-exception": "Policy exception",
  "dispute-cosign": "Dispute co-sign",
};

/** Atlas-system AI recommendation for the case. */
export type ReviewRecommendation =
  | "approve"
  | "reject"
  | "escalate"
  | "needs-judgment";

export type ReviewSlaTone = "default" | "amber" | "danger" | "success";

/** Decision options on the bottom decision-bar — 4-button shape per HTML. */
export type ReviewDecisionAction =
  | "save-draft"
  | "reject"
  | "escalate"
  | "approve-cosign";

/* ============================================================
   Discussion thread (the audit-logged reply chain)
   ============================================================ */

export type ReviewThreadActor = {
  id: string;
  name: string;
  /** "Specialist" / "Atlas system" / "Manager" / "Admin" / "Talent" / "Client". */
  role: string;
  /** Used for the small initials avatar in the thread. */
  initials: string;
  /**
   * Either an `AvatarGradientKey` (consistent with queue-types) OR a
   * literal `{from, to}` pair. Reviews-approvals uses one ad-hoc admin
   * gradient (`#5C4A6E → #3A2D49` for "Jamie") that doesn't map to
   * AVATAR_GRADIENTS — encoded inline as a literal pair. Documented in
   * CONVERSION_LOG Session 6 conventions.
   */
  avatarGradient: AvatarGradientKey | { from: string; to: string };
  /** True for system-generated rows (renders an icon avatar instead). */
  isSystem?: boolean;
};

export type ReviewThreadMessage = {
  id: string;
  actor: ReviewThreadActor;
  /** Pre-formatted timestamp ("Apr 28 · 9:14 AM" / "12 min ago"). */
  whenLabel: string;
  /** Plain-text body. May contain inline `<strong>` markers (parser
   *  pattern from Session 5 — never `dangerouslySetInnerHTML`). */
  body: string;
  /** Renders the right-aligned "you" variant when actor.id === current
   *  specialist. Set explicitly so mock data doesn't depend on auth. */
  isYou?: boolean;
};

/* ============================================================
   Subject context grid (6 cells in detail header)
   ============================================================ */

export type ContextCellTone = "default" | "success" | "amber" | "danger";

export type ReviewContextCell = {
  label: string;
  value: string;
  tone?: ContextCellTone;
};

/* ============================================================
   The full review item — both the rail-row shape and the detail
   ============================================================ */

export type ReviewRowLite = {
  id: string;
  /** Pre-formatted case identifier ("REV-2026-04-29-007"). */
  caseId: string;
  direction: ReviewDirection;
  filterKey: ReviewsFilterKey;
  kind: ReviewItemKind;
  /** "Off-board recommendation: Mei Chen". */
  subject: string;
  /** "Submitted by Jamie · 2 days ago". */
  submittedBy: string;
  /** Pre-formatted relative ("2 days ago"). */
  filedRelative: string;
  /** "SLA · 1D LEFT" / "BREACHED" / "RESOLVED". */
  slaLabel: string;
  slaTone: ReviewSlaTone;
  /** Renders the bold + dot indicator on the row. */
  unread?: boolean;
  /** Optional cross-session candidate the review is about. */
  candidateId?: string;
  /** Optional cross-session client the review is about. */
  clientId?: string;
};

export type ReviewItem = ReviewRowLite & {
  /* Detail-header fields */
  /** "Submitted by Jamie · 2 days ago" — shown verbatim. */
  metaStrip: ReadonlyArray<{ label: string; value: string }>;

  /** Atlas system recommendation card. */
  recommendation: ReviewRecommendation;
  recommendationLabel: string;
  recommendationRationale: string;

  /** 6-cell subject-context grid. */
  context: ReadonlyArray<ReviewContextCell>;

  /** Discussion-thread messages (audit-logged). */
  thread: ReadonlyArray<ReviewThreadMessage>;
  /** Total thread count for the section heading "Discussion thread · 4 messages". */
  threadTotalCount: number;

  /** Decision-bar summary copy ("Your decision: Pause for action…"). */
  decisionSummary: string;

  /* Closed-direction fields */
  /** Set when direction === "closed". */
  closedOutcome?: {
    decision: ReviewDecisionAction;
    decisionLabel: string;
    /** "Co-signed by L. Diaz on May 3" — rendered as caption. */
    closedBy: string;
    /** Optional cross-session dispute id when the closure ties to a dispute. */
    disputeId?: string;
  };
};

/* ============================================================
   PDF-shape decision history — captured but NOT rendered
   ============================================================ */

/**
 * PDF Step 14 §"List view · Per item" — the personal decision-history
 * shape. Typed for migration (separate route or 4th direction tab in a
 * future session); not surfaced this session. Reviews-approvals snapshot
 * does not consume this field, but the type lives here so the future
 * migration is one import + one new view component.
 */
export type ReviewDecisionHistoryItem = {
  id: string;
  /** "approval" / "rejection" / "revision" / "dispute". */
  itemKind: "approval" | "rejection" | "revision" | "dispute";
  /** ISO date the decision was made. */
  decidedAtIso: string;
  /** Cross-session candidate or client display name. */
  subject: string;
  candidateId?: string;
  clientId?: string;
  /** "Approved · Vetted tier", "Rejected · skill gap" etc. */
  decisionLabel: string;
  /** Free-text rationale the specialist captured at decision time. */
  rationale: string;
  /** PDF "Outcome (linked to live engagement)" — Optional follow-up status. */
  outcomeLabel?: string;
  /** PDF "Reflection space" — lessons-learned the specialist may add later. */
  reflection?: string;
};

/* ============================================================
   Snapshot — the rail content
   ============================================================ */

export type ReviewsSnapshot = {
  /** Total counts shown in the header subtitle. */
  awaitingCount: number;
  submittedCount: number;
  closedCount: number;

  items: ReadonlyArray<ReviewItem>;

  /** PDF history shape — populated for migration; not rendered. */
  history: ReadonlyArray<ReviewDecisionHistoryItem>;
};

/* ============================================================
   The 7 review items
   ============================================================ */

const adminJamie: ReviewThreadActor = {
  id: "jamie-admin",
  name: "Jamie Chen",
  role: "Admin",
  initials: "JC",
  // Ad-hoc admin gradient — not in AVATAR_GRADIENTS. See type docblock.
  avatarGradient: { from: "#5C4A6E", to: "#3A2D49" },
};
const managerDiaz: ReviewThreadActor = {
  id: "manager-diaz",
  name: "L. Diaz",
  role: "Manager",
  initials: "LD",
  avatarGradient: "navy",
};
const specialistMiguel: ReviewThreadActor = {
  id: "you",
  name: "Miguel Aguilar",
  role: "Specialist",
  initials: "MA",
  avatarGradient: "warm",
};
const atlasSystem: ReviewThreadActor = {
  id: "atlas",
  name: "Atlas system",
  role: "System",
  initials: "AS",
  avatarGradient: "olive",
  isSystem: true,
};

/* ----- INCOMING #1 — Mei Chen off-board (HTML primary) ----- */

const meiOffboard: ReviewItem = {
  id: "REV-2026-04-29-007",
  caseId: "REV-2026-04-29-007",
  direction: "incoming",
  filterKey: "off-board",
  kind: "off-board",
  subject: "Off-board recommendation: Mei Chen",
  submittedBy: "Submitted by Jamie · 2 days ago",
  filedRelative: "2 days ago",
  slaLabel: "1D LEFT",
  slaTone: "danger",
  unread: true,
  candidateId: "cand-mei-chen",
  metaStrip: [
    { label: "Submitted by", value: "Jamie · Admin" },
    { label: "Type", value: "Off-board recommendation" },
    { label: "Filed", value: "Apr 27 · 4:18 PM" },
    { label: "SLA", value: "1 day left" },
  ],
  recommendation: "escalate",
  recommendationLabel: "Escalate · requires specialist judgment",
  recommendationRationale:
    "Mei has been on performance pause for 14 days following the Quill engagement. Performance signal mixed: 4.5★ avg but 2 client-flagged comms-pace concerns in the last 90 days. Off-board would be terminal; recommend specialist co-sign before action.",
  context: [
    { label: "Talent", value: "Mei Chen · 🇨🇳 China" },
    { label: "Tier · tenure", value: "Vetted · 11 months" },
    { label: "Current rating", value: "4.5 / 5", tone: "amber" },
    { label: "Lifetime hours", value: "560h" },
    { label: "Disputes", value: "1 resolved · payment delay", tone: "amber" },
    {
      label: "Status",
      value: "Paused · 14 days",
      tone: "danger",
    },
  ],
  thread: [
    {
      id: "rev-mei-1",
      actor: atlasSystem,
      whenLabel: "Apr 27 · 4:18 PM",
      body:
        "Off-board recommendation auto-generated. Trigger: 14-day performance-pause threshold reached. Source review: Apr 13 client-comms-pace flag from Northwind Solutions; resolved Apr 16 (refund-partial). Pause initiated Apr 13. Threshold: 14 days. Today: day 14.",
    },
    {
      id: "rev-mei-2",
      actor: adminJamie,
      whenLabel: "Apr 27 · 4:42 PM",
      body:
        "Reviewed the auto-flag. Mei's underlying work quality is fine; the comms-pace issue was a Northwind expectation mismatch (Sarah at Northwind expected 2h responses; Mei was on her published 6h cadence). Off-boarding feels like the system over-rotating on a single client signal. Submitting to Miguel for specialist co-sign — recommend pause-for-action (60 days) instead of off-board.",
    },
    {
      id: "rev-mei-3",
      actor: managerDiaz,
      whenLabel: "Apr 28 · 10:14 AM",
      body:
        "Adding context: I had a 1-on-1 with Mei last week and she's actively working on response-cadence calibration. She wants to stay; she's invested. <strong>Strongly support pause-for-action over off-board.</strong>",
    },
    {
      id: "rev-mei-4",
      actor: specialistMiguel,
      whenLabel: "12 min ago",
      body:
        "Reviewed everything. Agree this is a calibration issue, not a fitness issue. Drafting decision: Pause for action (60 days), with explicit calibration milestones. Will co-sign once I've drafted the specifics.",
      isYou: true,
    },
  ],
  threadTotalCount: 4,
  decisionSummary: "Pause for action (60 days) · awaiting admin co-sign",
};

/* ----- INCOMING #2 — Anand tier promotion ----- */

const anandPromotion: ReviewItem = {
  id: "REV-2026-04-30-003",
  caseId: "REV-2026-04-30-003",
  direction: "incoming",
  filterKey: "tier-promotion",
  kind: "tier-promotion",
  subject: "Tier promotion: Anand Patel · Vetted → Elite",
  submittedBy: "Submitted by Atlas system · 1 day ago",
  filedRelative: "1 day ago",
  slaLabel: "3D LEFT",
  slaTone: "amber",
  unread: true,
  candidateId: "cand-anand-patel",
  metaStrip: [
    { label: "Submitted by", value: "Atlas system · auto-flag" },
    { label: "Type", value: "Tier promotion request" },
    { label: "Filed", value: "Apr 30 · 11:08 AM" },
    { label: "SLA", value: "3 days left" },
  ],
  recommendation: "approve",
  recommendationLabel: "Approve",
  recommendationRationale:
    "Anand clears the Elite gate cleanly: 23 months tenure (≥18 month minimum), 5.0★ avg across 4 active client reviews, zero disputes ever, two client-renewal locks at his current rate. Atlas auto-flag: confidence 96%.",
  context: [
    { label: "Talent", value: "Anand Patel · 🇮🇳 India" },
    { label: "Current tier · tenure", value: "Vetted · 23 months" },
    { label: "Avg client rating", value: "5.0 / 5", tone: "success" },
    { label: "Active engagements", value: "2 (Acme Co · TechFlow)" },
    { label: "Lifetime disputes", value: "0", tone: "success" },
    { label: "Lifetime hours", value: "1,840h" },
  ],
  thread: [
    {
      id: "rev-anand-1",
      actor: atlasSystem,
      whenLabel: "Apr 30 · 11:08 AM",
      body:
        "Tier promotion request auto-generated. Anand Patel meets all 5 Elite-tier criteria: tenure ≥18mo, avg rating ≥4.8★, zero disputes, ≥3 distinct client reviews, no profile-action flags in the last 6 months.",
    },
  ],
  threadTotalCount: 1,
  decisionSummary: "Approve tier promotion · single-step co-sign required",
};

/* ----- INCOMING #3 — Aaliyah rate change ----- */

const aaliyahRate: ReviewItem = {
  id: "REV-2026-04-26-014",
  caseId: "REV-2026-04-26-014",
  direction: "incoming",
  filterKey: "rate-change",
  kind: "rate-change",
  subject: "Rate adjustment: Aaliyah Koné · $42 → $46/h",
  submittedBy: "Submitted by Aaliyah · 5 days ago",
  filedRelative: "5 days ago",
  slaLabel: "BREACHED · 1D OVER",
  slaTone: "danger",
  candidateId: "cand-aaliyah-kone",
  metaStrip: [
    { label: "Submitted by", value: "Aaliyah Koné · talent-initiated" },
    { label: "Type", value: "Rate change request (+9.5%)" },
    { label: "Filed", value: "Apr 26 · 2:42 PM" },
    { label: "SLA", value: "Breached · 1 day over" },
  ],
  recommendation: "needs-judgment",
  recommendationLabel: "Needs judgment · marginal case",
  recommendationRationale:
    "Aaliyah's rate proposal is +9.5% over current ($42→$46). Atlas reads: tenure 14mo + 4.5★ avg supports a small bump, but 9.5% is above the typical 5-7% range for Vetted-tier renewals. Current client (Sahara Logistics) has not signaled flexibility on rate. Specialist judgment required.",
  context: [
    { label: "Talent", value: "Aaliyah Koné · 🇨🇮 Côte d'Ivoire" },
    { label: "Tier · tenure", value: "Vetted · 14 months" },
    { label: "Current rating", value: "4.5 / 5" },
    { label: "Active client", value: "Sahara Logistics" },
    {
      label: "Proposed bump",
      value: "+9.5% (above typical 5-7%)",
      tone: "amber",
    },
    { label: "Cap stance", value: "Sahara: not yet signaled", tone: "amber" },
  ],
  thread: [
    {
      id: "rev-aaliyah-1",
      actor: {
        id: "aaliyah",
        name: "Aaliyah Koné",
        role: "Talent",
        initials: "A",
        avatarGradient: "warm",
      },
      whenLabel: "Apr 26 · 2:42 PM",
      body:
        "Submitting a rate adjustment from $42 to $46/h. Rationale: I've been at Sahara for 11 months, expanded my responsibilities into supplier coordination (originally just operations support), and Adama gave me a 4.5★ supportive review last month. Local-market rates for similar work in Abidjan have moved up too. Happy to discuss if Sahara wants to phase the increase.",
    },
    {
      id: "rev-aaliyah-2",
      actor: atlasSystem,
      whenLabel: "Apr 26 · 3:01 PM",
      body:
        "Routed to Miguel (specialist for VAs category) for review. SLA: 4 days. Note: 9.5% bump is above typical Vetted-tier renewal range — flagged as needs-judgment.",
    },
    {
      id: "rev-aaliyah-3",
      actor: atlasSystem,
      whenLabel: "May 1 · 12:00 AM",
      body:
        "<strong>SLA breached.</strong> No specialist response in 4-day window. Auto-pinged Miguel. Sahara not yet notified. Recommend specialist take action today.",
    },
  ],
  threadTotalCount: 3,
  decisionSummary:
    "SLA breached · likely outcome: counter-propose +6% (within typical band), surface to Sahara for sign-off",
};

/* ----- OUTGOING #1 — Marcus tier-promotion submitted by you ----- */

const marcusOutgoing: ReviewItem = {
  id: "REV-2026-04-22-009",
  caseId: "REV-2026-04-22-009",
  direction: "outgoing",
  filterKey: "tier-promotion",
  kind: "tier-promotion",
  subject: "Tier promotion: Marcus Bauer · Vetted → Elite",
  submittedBy: "Submitted to admin · 9 days ago",
  filedRelative: "9 days ago",
  slaLabel: "WAITING ADMIN",
  slaTone: "default",
  candidateId: "cand-marcus-bauer",
  metaStrip: [
    { label: "Submitted to", value: "Admin · Jamie" },
    { label: "Type", value: "Tier promotion request" },
    { label: "Filed", value: "Apr 22 · 10:02 AM" },
    { label: "SLA", value: "Awaiting admin co-sign" },
  ],
  recommendation: "approve",
  recommendationLabel: "Approve · meets all Elite criteria",
  recommendationRationale:
    "Marcus has 26 months tenure, 4.7★ avg, one prior dispute (resolved 5★ for him), and currently runs 2 active enterprise engagements. Recommend Elite tier; submitted to admin for co-sign.",
  context: [
    { label: "Talent", value: "Marcus Bauer · 🇩🇪 Germany" },
    { label: "Current tier · tenure", value: "Vetted · 26 months" },
    { label: "Avg rating", value: "4.7 / 5", tone: "success" },
    { label: "Active engagements", value: "2 (Vertex Health · TechFlow)" },
    { label: "Disputes", value: "1 (resolved 5★)", tone: "success" },
    { label: "Status", value: "Active · multiple contracts" },
  ],
  thread: [
    {
      id: "rev-marcus-1",
      actor: specialistMiguel,
      whenLabel: "Apr 22 · 10:02 AM",
      body:
        "Submitting Marcus Bauer for Elite tier promotion. He clears all 5 Elite-tier gates and the Vertex Health engagement is performing at the upper end of Elite expectations. Recommend co-sign.",
      isYou: true,
    },
    {
      id: "rev-marcus-2",
      actor: adminJamie,
      whenLabel: "Apr 24 · 9:30 AM",
      body:
        "Reviewing — clean profile. One question: the Vertex dispute was filed against Marcus's deliverables; even though it resolved 5★ for him, is there friction underneath? Will look at the dispute audit log and reply by Apr 26.",
    },
  ],
  threadTotalCount: 2,
  decisionSummary: "Awaiting admin co-sign · response expected by Apr 26",
};

/* ----- OUTGOING #2 — Sofia escalation submitted by you ----- */

const sofiaOutgoing: ReviewItem = {
  id: "REV-2026-04-30-002",
  caseId: "REV-2026-04-30-002",
  direction: "outgoing",
  filterKey: "off-board",
  kind: "policy-exception",
  subject: "Policy exception: Sofia Reyes — keep on Quill engagement post-dispute",
  submittedBy: "Submitted to manager · 1 day ago",
  filedRelative: "1 day ago",
  slaLabel: "AWAITING MGR",
  slaTone: "default",
  candidateId: "cand-sofia-reyes",
  clientId: "client-quill-co",
  metaStrip: [
    { label: "Submitted to", value: "Manager · L. Diaz" },
    { label: "Type", value: "Policy exception request" },
    { label: "Filed", value: "Apr 30 · 11:42 AM" },
    { label: "SLA", value: "Awaiting manager review" },
  ],
  recommendation: "approve",
  recommendationLabel: "Approve · standard policy exception",
  recommendationRationale:
    "Atlas default policy auto-pauses both parties from re-engaging post-dispute resolution for 60 days. Sofia and Quill resolved DSP-2026-04-12 cleanly with both parties signaling they want to continue working together. Recommend waiving the 60-day cool-off and allowing Sofia to return to her paused Quill engagement immediately.",
  context: [
    { label: "Talent", value: "Sofia Reyes · 🇲🇽 Mexico" },
    { label: "Tier · tenure", value: "Vetted · 16 months" },
    { label: "Client", value: "Quill & Co · Editorial · NYC" },
    { label: "Recent dispute", value: "DSP-2026-04-12 · resolved partial" },
    { label: "Both parties signal", value: "Want to continue", tone: "success" },
    { label: "Standard policy", value: "60-day cool-off" },
  ],
  thread: [
    {
      id: "rev-sofia-1",
      actor: specialistMiguel,
      whenLabel: "Apr 30 · 11:42 AM",
      body:
        "Submitting policy-exception for L. Diaz. Sofia and Quill have explicitly asked to resume their engagement post-dispute. The 60-day cool-off would force them to break a working relationship that both parties now want — that's the opposite of what the policy is designed to protect against. Recommend approve.",
      isYou: true,
    },
  ],
  threadTotalCount: 1,
  decisionSummary: "Awaiting manager L. Diaz response · standard SLA 5 days",
};

/* ----- CLOSED #1 — Anand prior promotion (closed last month) ----- */

const anandPriorClosed: ReviewItem = {
  id: "REV-2025-09-14-001",
  caseId: "REV-2025-09-14-001",
  direction: "closed",
  filterKey: "tier-promotion",
  kind: "tier-promotion",
  subject: "Tier promotion: Anand Patel · Standard → Vetted",
  submittedBy: "Closed Sep 18 · 7 months ago",
  filedRelative: "7 months ago",
  slaLabel: "RESOLVED",
  slaTone: "success",
  candidateId: "cand-anand-patel",
  metaStrip: [
    { label: "Decision", value: "Approve · co-signed by L. Diaz" },
    { label: "Type", value: "Tier promotion (Standard → Vetted)" },
    { label: "Closed", value: "Sep 18, 2025" },
    { label: "SLA", value: "Resolved · 4 days" },
  ],
  recommendation: "approve",
  recommendationLabel: "Approved · Vetted tier",
  recommendationRationale:
    "Strong promotion case at 11 months tenure. The recent Acme Q2 engagement showcased the discipline that defines Vetted tier.",
  context: [
    { label: "Talent", value: "Anand Patel · 🇮🇳 India" },
    { label: "Promoted to", value: "Vetted", tone: "success" },
    { label: "Tenure at promotion", value: "11 months" },
    { label: "Avg rating at time", value: "4.9 / 5", tone: "success" },
    { label: "Subsequent disputes", value: "0", tone: "success" },
    { label: "Currently", value: "→ Elite review (REV-2026-04-30-003)" },
  ],
  thread: [
    {
      id: "rev-anand-prior-1",
      actor: specialistMiguel,
      whenLabel: "Sep 14, 2025 · 11:30 AM",
      body:
        "Submitting Anand for Vetted tier. He's the strongest Standard-tier specialist I have, by a mile. Acme has explicitly asked us to bump him.",
      isYou: true,
    },
    {
      id: "rev-anand-prior-2",
      actor: managerDiaz,
      whenLabel: "Sep 18, 2025 · 4:20 PM",
      body: "Co-signed. Approved · Vetted tier effective today.",
    },
  ],
  threadTotalCount: 2,
  decisionSummary: "Closed · Approved (co-signed L. Diaz, Sep 18)",
  closedOutcome: {
    decision: "approve-cosign",
    decisionLabel: "Approve · co-signed",
    closedBy: "Co-signed by L. Diaz on Sep 18, 2025",
  },
};

/* ----- CLOSED #2 — Sofia/Quill dispute co-sign close ----- */

const sofiaQuillClosed: ReviewItem = {
  id: "REV-2026-04-30-001",
  caseId: "REV-2026-04-30-001",
  direction: "closed",
  filterKey: "off-board",
  kind: "dispute-cosign",
  subject: "Dispute decision co-sign: DSP-2026-04-12 · Sofia Reyes vs Quill & Co",
  submittedBy: "Closed yesterday",
  filedRelative: "1 day ago",
  slaLabel: "RESOLVED",
  slaTone: "success",
  candidateId: "cand-sofia-reyes",
  clientId: "client-quill-co",
  metaStrip: [
    { label: "Decision", value: "Partial in favor of claimant · co-signed" },
    { label: "Type", value: "Dispute co-sign" },
    { label: "Closed", value: "Apr 30 · 5:45 PM" },
    { label: "SLA", value: "Resolved · 1 day" },
  ],
  recommendation: "approve",
  recommendationLabel: "Approved · partial in favor of claimant",
  recommendationRationale:
    "Reviewed the SOW and the dispute team's recommendation. Partial in favor of Sofia is the right call. Quill pays the unpaid $2,840 + 5% goodwill credit. Engagement continues post-policy-exception.",
  context: [
    { label: "Dispute", value: "DSP-2026-04-12" },
    { label: "Decision", value: "Partial in favor of claimant" },
    { label: "Amount paid out", value: "$2,840 + 5% goodwill" },
    { label: "Engagement", value: "Continues (post policy exception)", tone: "success" },
    { label: "Both parties signal", value: "Satisfied with outcome", tone: "success" },
    { label: "Closed", value: "Apr 30 · 5:45 PM" },
  ],
  thread: [
    {
      id: "rev-sofia-closed-1",
      actor: atlasSystem,
      whenLabel: "Apr 30 · 11:45 AM",
      body:
        "Dispute team has finalized recommendation: Partial in favor of claimant ($2,840 + 5% goodwill). Routed to specialist Miguel for co-sign.",
    },
    {
      id: "rev-sofia-closed-2",
      actor: specialistMiguel,
      whenLabel: "Apr 30 · 5:45 PM",
      body:
        "Reviewed. Co-signed. Decision is correct on the SOW; the goodwill credit is the right gesture given the relationship value to Quill. Will follow up on the engagement-resumption policy exception (REV-2026-04-30-002).",
      isYou: true,
    },
  ],
  threadTotalCount: 2,
  decisionSummary: "Closed · Co-signed Apr 30",
  closedOutcome: {
    decision: "approve-cosign",
    decisionLabel: "Co-signed · partial in favor of claimant",
    closedBy: "Co-signed by Miguel on Apr 30",
    disputeId: "DSP-2026-04-12",
  },
};

/* ============================================================
   Snapshot export
   ============================================================ */

export const reviewsSnapshot: ReviewsSnapshot = {
  awaitingCount: 3,
  submittedCount: 2,
  closedCount: 11,
  items: [
    meiOffboard,
    anandPromotion,
    aaliyahRate,
    marcusOutgoing,
    sofiaOutgoing,
    anandPriorClosed,
    sofiaQuillClosed,
  ],
  // PDF history shape — sample of 4 entries for migration validation only.
  history: [
    {
      id: "hist-1",
      itemKind: "approval",
      decidedAtIso: "2025-09-18T16:20:00Z",
      subject: "Anand Patel",
      candidateId: "cand-anand-patel",
      decisionLabel: "Approved · Vetted tier",
      rationale:
        "Strong Standard-tier specialist with 4.9★ avg. Acme explicitly requested promotion.",
      outcomeLabel: "Active · 23 months later, on Elite-tier review",
      reflection:
        "First clean tier-promotion case I authored end-to-end. Lesson: include the client-request quote upfront — accelerated co-sign by 2 days.",
    },
    {
      id: "hist-2",
      itemKind: "rejection",
      decidedAtIso: "2026-02-10T11:00:00Z",
      subject: "Wei Tan",
      candidateId: "cand-wei-tan",
      decisionLabel: "Rejected · skill gap (async-only role mismatch)",
      rationale:
        "Wei's profile is strong but the async-only constraint doesn't fit a real-time-overlap pool need.",
      outcomeLabel: "Re-applied 6 months later · still under review",
    },
    {
      id: "hist-3",
      itemKind: "revision",
      decidedAtIso: "2026-04-12T13:42:00Z",
      subject: "Hana Reza",
      candidateId: "cand-hana-reza",
      decisionLabel: "Revisions requested · re-verify references",
      rationale:
        "References were unreachable 2 of 3. Asked for re-verification before approval.",
    },
    {
      id: "hist-4",
      itemKind: "dispute",
      decidedAtIso: "2026-04-30T17:45:00Z",
      subject: "Sofia Reyes vs Quill & Co",
      candidateId: "cand-sofia-reyes",
      clientId: "client-quill-co",
      decisionLabel: "Dispute co-sign · partial in favor of claimant",
      rationale:
        "SOW item 4 explicitly billable. Co-signed dispute team's recommendation.",
      outcomeLabel: "$2,840 paid out · engagement resumed",
    },
  ],
};

/* ============================================================
   Helpers
   ============================================================ */

export const REVIEWS_DEFAULT_ID = meiOffboard.id;

export const REVIEWS_HEADER_SUBTITLE = (() => {
  const s = reviewsSnapshot;
  return `${s.awaitingCount} awaiting your review · ${s.submittedCount} submitted by you · ${s.closedCount} closed this quarter`;
})();

/**
 * Lookup helper used by the reviews-approvals page to resolve `?id=`.
 * Returns `undefined` for unknown ids — page falls back to the default.
 */
export function getReviewItem(id: string): ReviewItem | undefined {
  return reviewsSnapshot.items.find((i) => i.id === id);
}
