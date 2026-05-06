/**
 * Mock data for `/specialist/disputes` — dispute queue + detail.
 *
 * 7 cases covering all 8 dispute states (the HTML's filter pill set is
 * narrower — All / Open / Resolved — but the type carries the full PDF
 * state vocabulary so future filters can extend cleanly).
 *
 * Cross-session ID strategy:
 *   - Every dispute references real `cand-*` and `client-*` ids from
 *     Sessions 2/3/4. The Sofia / Quill case is the primary HTML
 *     example; the others reuse Marcus, Anand, Mei, Carmen, Aaliyah,
 *     Tomás (candidates) + Vertex, TechFlow, Acme, Northwind, Lumio,
 *     Bridgepoint (clients).
 *   - Session 3 mocks NOT modified — disputes carry the IDs but the
 *     candidate/client data lives in `my-candidates.ts` / `my-clients.ts`.
 *
 * Constants:
 *   - `DISPUTE_SLA_HOURS = 72` — first defined in Session 1's
 *     `current-user.ts`. Re-exported here as the canonical home (this
 *     file is the actual disputes domain). Migration target: same as
 *     `POOL_DEPLETION_THRESHOLD` — `lib/config/constants.ts` when
 *     services land.
 */

import type { AvatarGradientKey } from "./queue-types";

/* ============================================================
   Constants — business rules
   ============================================================ */

/**
 * Hours the specialist has from dispute submission to render a decision
 * before SLA breaches and the case auto-escalates to admin.
 *
 * Source: PDF Part 6 §"SLA management — Each dispute has a 72-hour SLA"
 * + PDF §"Specialist obligations — Handle disputes — 72-hour SLA from
 * both sides".
 *
 * **Migration target:** `lib/config/constants.ts` when the Specialist
 * service slice is built. The countdown UI in this view reads from this
 * constant; service-layer must enforce it (auto-escalation when the
 * 72h clock runs out).
 */
export const DISPUTE_SLA_HOURS = 72;

/* ============================================================
   States, reasons, decision options
   ============================================================ */

/**
 * Full PDF state vocabulary. The HTML filter chips collapse this into
 * "All / Open / Resolved" via `disputeFilterKey` — see below.
 */
export type DisputeState =
  | "open"
  | "in-progress"
  | "under-review"
  | "resolved-favor-claimant"
  | "resolved-favor-respondent"
  | "resolved-partial"
  | "resolved-dismissed"
  | "escalated";

/** PDF Section 1 reason categories. */
export type DisputeReason =
  | "quality-of-work"
  | "hours-billed"
  | "no-show"
  | "communication"
  | "payment"
  | "other";

export const DISPUTE_REASON_LABEL: Record<DisputeReason, string> = {
  "quality-of-work": "Quality of work",
  "hours-billed": "Hours billed",
  "no-show": "No-show",
  communication: "Communication",
  payment: "Payment delay",
  other: "Other",
};

/**
 * PDF Section 4 decision vocabulary. All 8 options are typed even though
 * the decision form is out of scope this session — resolved disputes
 * carry their decision via the `decision.option` field, and the type
 * drives which options would have been available.
 */
export type DisputeDecisionOption =
  | "side-with-client"
  | "side-with-candidate"
  | "partial-split"
  | "refund-full"
  | "refund-partial"
  | "replace-candidate"
  | "dismiss"
  | "escalate-to-admin";

export const DISPUTE_DECISION_LABEL: Record<DisputeDecisionOption, string> = {
  "side-with-client": "Side with client",
  "side-with-candidate": "Side with candidate",
  "partial-split": "Partial split",
  "refund-full": "Refund full",
  "refund-partial": "Refund partial",
  "replace-candidate": "Replace candidate",
  dismiss: "Dismiss",
  "escalate-to-admin": "Escalate to admin",
};

/** HTML filter-chip key set (narrower than `DisputeState`). */
export type DisputeFilterKey = "all" | "open" | "resolved";

/**
 * Maps a full state to the visible filter chip it belongs to. "Escalated"
 * sits under "open" per the HTML — the case is no longer the specialist's
 * to resolve but it's still active.
 */
export const DISPUTE_STATE_TO_FILTER: Record<DisputeState, "open" | "resolved"> = {
  open: "open",
  "in-progress": "open",
  "under-review": "open",
  escalated: "open",
  "resolved-favor-claimant": "resolved",
  "resolved-favor-respondent": "resolved",
  "resolved-partial": "resolved",
  "resolved-dismissed": "resolved",
};

/* ============================================================
   Parties (claimant + respondent)
   ============================================================ */

/**
 * Discriminated union — candidate variant carries gradient + tier;
 * client variant carries logoVariant + industry.
 */
export type DisputeParty =
  | {
      partyType: "candidate";
      /** Cross-session `cand-*` id. */
      id: string;
      name: string;
      initials: string;
      countryFlag?: string;
      avatarGradient: AvatarGradientKey;
      tier: "Standard" | "Vetted" | "Elite";
      tenureLabel: string;
      ratingLabel: string;
    }
  | {
      partyType: "client";
      /** Cross-session `client-*` id. */
      id: string;
      name: string;
      initials: string;
      logoVariant: 1 | 2 | 3 | 4;
      /** Industry (e.g. "Editorial"). */
      industry: string;
      sizeLabel: string;
      city: string;
      contactName?: string;
    };

/* ============================================================
   Per-section content
   ============================================================ */

export type DisputeStatusBannerTone = "default" | "urgent" | "info" | "danger";

export type DisputeStatusBanner = {
  tone: DisputeStatusBannerTone;
  message: string;
  /** SLA chip text ("SLA · 4D LEFT"). */
  slaLabel: string;
  /** SLA chip tone — drives the badge color. */
  slaTone: "default" | "amber" | "danger" | "success";
};

export type DisputeClaimCard = {
  /** "claimant" or "respondent" — determines which side panel renders it. */
  side: "claimant" | "respondent";
  /** Pre-formatted heading ("FROM CLAIMANT — SOFIA REYES"). */
  heading: string;
  /** Multi-paragraph body — supports line-breaks via "\n\n". */
  body: string;
};

export type DisputeFactCellTone = "default" | "success" | "amber" | "danger";

export type DisputeFactCell = {
  label: string;
  value: string;
  tone?: DisputeFactCellTone;
};

export type DisputeAtlasSummary = {
  /** Multi-paragraph italic display-font analysis. */
  analysis: string;
  recommendation: {
    /** "AI recommendation: Partial in favor of claimant". */
    label: string;
    detail?: string;
  };
  /** "Case facts" cells in the right rail of Section 02. */
  facts: ReadonlyArray<DisputeFactCell>;
};

export type DisputeTimelineMarkerTone = "default" | "amber" | "danger" | "system";
export type DisputeTimelineActor = "claimant" | "respondent" | "atlas" | "specialist";

export type DisputeTimelineAttachment = {
  filename: string;
  size: string;
  kind: "pdf" | "doc" | "image" | "spreadsheet";
};

export type DisputeTimelineItem = {
  id: string;
  /** Pre-formatted timestamp ("Apr 30 · 11:42 AM"). */
  when: string;
  /** Pre-formatted relative timestamp ("3d ago"). */
  whenRelative: string;
  marker: DisputeTimelineMarkerTone;
  actor: DisputeTimelineActor;
  /** Display label ("Eleanor Voss · Quill & Co"). */
  actorLabel: string;
  message: string;
  attachment?: DisputeTimelineAttachment;
};

export type DisputeEvidenceSource = "atlas" | "claimant" | "respondent";

export type DisputeEvidenceItem = {
  id: string;
  filename: string;
  /** "PDF · 218 KB · UPLOADED 4D AGO". */
  meta: string;
  source: DisputeEvidenceSource;
  kind: "pdf" | "doc" | "image" | "spreadsheet";
};

/* ============================================================
   Decision + escalation metadata (resolved/escalated cases only)
   ============================================================ */

export type DisputeDecision = {
  option: DisputeDecisionOption;
  /** Specialist who made the call (ALWAYS THE SAME ONE — Miguel Ramos — per Session 1). */
  decidedBy: string;
  decidedAtLabel: string;
  /** PDF Section 4 "Required: Decision rationale (free text)". */
  rationale: string;
};

export type DisputeEscalation = {
  /** Why the specialist escalated. */
  reason: string;
  escalatedAtLabel: string;
  escalatedBy: string;
  /** Admin assigned (or "Pending admin pickup" if unassigned). */
  assignedAdmin?: string;
};

/* ============================================================
   Lite (rail row) + full (detail) shapes
   ============================================================ */

export type DisputeRowLite = {
  id: string;
  /** Pre-formatted case identifier ("DSP-2026-04-12"). */
  caseId: string;
  state: DisputeState;
  filterKey: "open" | "resolved";
  claimantName: string;
  respondentName: string;
  reason: DisputeReason;
  reasonLabel: string;
  /** Pre-formatted "filed N days ago" / "filed today". */
  filedLabel: string;
  /** Days the dispute has been open. */
  daysOpen: number;
  /** Pre-formatted SLA badge text ("4D LEFT" / "BREACHED" / "RESOLVED"). */
  slaLabel: string;
  slaTone: "default" | "amber" | "danger" | "success";
  amountLabel?: string;
  /** Drives the bold name + dot in the row when not yet read. */
  unread?: boolean;
};

export type Dispute = DisputeRowLite & {
  /* Header detail */
  claimant: DisputeParty;
  respondent: DisputeParty;
  filedAtIso: string;
  amountUSD: number;
  /** Pre-formatted "200h · over 8 weeks". */
  hoursWorkedLabel: string;
  contractTermsLabel: string;
  engagementStatusLabel: string;
  engagementStatusTone: "default" | "amber" | "danger" | "success";
  atlasBackstopLabel: string;
  trackRecordLabel: string;

  /* Section content */
  statusBanner: DisputeStatusBanner;
  claims: ReadonlyArray<DisputeClaimCard>;
  atlasSummary: DisputeAtlasSummary;
  timeline: ReadonlyArray<DisputeTimelineItem>;
  /** Total count for the tab badge ("Timeline (12)"). */
  timelineTotalCount: number;
  evidence: ReadonlyArray<DisputeEvidenceItem>;
  evidenceTotalCount: number;
  evidenceReviewedCount: number;
  auditLogTotalCount: number;

  /* Resolution metadata — present when state is `resolved-*` or `escalated` */
  decision?: DisputeDecision;
  escalation?: DisputeEscalation;
};

/* ============================================================
   Filter chip definitions
   ============================================================ */

export type DisputeFilterDef = {
  key: DisputeFilterKey;
  label: string;
};

export const DISPUTE_FILTERS: ReadonlyArray<DisputeFilterDef> = [
  { key: "all", label: "All" },
  { key: "open", label: "Open" },
  { key: "resolved", label: "Resolved" },
];

/* ============================================================
   Helper for SLA tone classification
   ============================================================ */

/**
 * Map hours-remaining to a SLA tone.
 *   ≥48h → default · 12-48h → amber · <12h or breached → danger ·
 *   resolved → success.
 */
export function slaToneForHoursLeft(
  hoursLeft: number,
  isResolved: boolean,
): "default" | "amber" | "danger" | "success" {
  if (isResolved) return "success";
  if (hoursLeft < 12) return "danger";
  if (hoursLeft < 48) return "amber";
  return "default";
}

/* ============================================================
   The 7 disputes
   ============================================================ */

/* ---------- 1. Sofia Reyes vs Quill & Co — OPEN (HTML primary) ---------- */

const sofia_quill: Dispute = {
  id: "DSP-2026-04-12",
  caseId: "DSP-2026-04-12",
  state: "open",
  filterKey: "open",
  claimantName: "Sofia Reyes",
  respondentName: "Quill & Co",
  reason: "payment",
  reasonLabel: DISPUTE_REASON_LABEL.payment,
  filedLabel: "3 days ago · Apr 27",
  daysOpen: 3,
  slaLabel: "4D LEFT",
  slaTone: "amber",
  amountLabel: "$2,840",
  unread: true,
  claimant: {
    partyType: "candidate",
    id: "cand-sofia-reyes",
    name: "Sofia Reyes",
    initials: "S",
    countryFlag: "🇲🇽",
    avatarGradient: "terracotta",
    tier: "Vetted",
    tenureLabel: "16 months",
    ratingLabel: "4.3 rating",
  },
  respondent: {
    partyType: "client",
    id: "client-quill-co",
    name: "Quill & Co",
    initials: "QC",
    logoVariant: 2,
    industry: "Editorial",
    sizeLabel: "12 ppl",
    city: "New York",
    contactName: "Eleanor Voss",
  },
  filedAtIso: "2026-04-27T10:14:00Z",
  amountUSD: 2840,
  hoursWorkedLabel: "200h · over 8 weeks",
  contractTermsLabel: "Net-30 · standard Atlas template",
  engagementStatusLabel: "Paused pending dispute",
  engagementStatusTone: "danger",
  atlasBackstopLabel: "Up to 14 days · expires May 11",
  trackRecordLabel: "Sofia: 0 prior disputes · Quill: 0 prior",

  statusBanner: {
    tone: "urgent",
    message: "Both parties have submitted statements · awaiting Atlas decision",
    slaLabel: "SLA · 4D LEFT",
    slaTone: "amber",
  },
  claims: [
    {
      side: "claimant",
      heading: "FROM CLAIMANT — SOFIA REYES",
      body: "I billed 200 hours of editorial coordination work over 8 weeks against the signed SOW. Item 4 of the SOW explicitly covers prep time at $42/h as a billable line — Eleanor at Quill has paid the coordinated hours but is refusing to pay the prep hours, claiming they were 'implicit overhead.'\n\nThe SOW is clear. I'm asking for the unpaid $2,840 plus a written acknowledgement so this doesn't happen on the next engagement.",
    },
    {
      side: "respondent",
      heading: "FROM RESPONDENT — ELEANOR VOSS, QUILL & CO",
      body: "Sofia did good work on the editorial coordination piece. The dispute is about scope: when we signed the SOW, our understanding was that prep was implicit overhead, not separately billable. The 'editorial coordination' language was meant to be inclusive of all related prep.\n\nIf Atlas reads the SOW differently we'll honor the decision, but we'd want to revise the template language going forward so this doesn't recur.",
    },
  ],
  atlasSummary: {
    analysis:
      "The signed SOW (item 4) explicitly lists prep time at $42/h as a billable line. Sofia's 200-hour total includes 64 hours of prep activity verifiable against her time-tracker logs (attached as evidence). The dispute is procedural — Eleanor signed an SOW whose terms she now reads differently. Atlas's standard SOW template treats prep as billable; the language is unambiguous.\n\nRecommend: Quill pays the unpaid $2,840 in full, plus a goodwill credit toward Quill's next engagement to maintain the relationship. Sofia continues on a future Quill engagement once paid out. Template language is already standard — no revision needed.",
    recommendation: {
      label: "Partial in favor of claimant",
      detail: "Pay the full $2,840 + 5% goodwill credit on next engagement",
    },
    facts: [
      { label: "Total amount in dispute", value: "$2,840.00" },
      { label: "Hours worked", value: "200h · over 8 weeks" },
      { label: "Contract terms", value: "Net-30 · standard Atlas template" },
      {
        label: "Engagement status",
        value: "Paused pending dispute",
        tone: "danger",
      },
      {
        label: "Atlas backstop active",
        value: "Up to 14 days · expires May 11",
      },
      {
        label: "Both parties' track record",
        value: "Sofia: 0 prior · Quill: 0 prior",
      },
    ],
  },
  timeline: [
    {
      id: "tl-sofia-1",
      when: "Apr 27 · 10:14 AM",
      whenRelative: "3d ago",
      marker: "amber",
      actor: "claimant",
      actorLabel: "Sofia Reyes",
      message: "Filed dispute citing unpaid prep hours under signed SOW item 4.",
      attachment: {
        filename: "sofia_quill_sow_signed.pdf",
        size: "287 KB",
        kind: "pdf",
      },
    },
    {
      id: "tl-sofia-2",
      when: "Apr 27 · 11:02 AM",
      whenRelative: "3d ago",
      marker: "system",
      actor: "atlas",
      actorLabel: "Atlas system",
      message:
        "Engagement automatically paused pending dispute resolution. 14-day backstop activated.",
    },
    {
      id: "tl-sofia-3",
      when: "Apr 28 · 4:18 PM",
      whenRelative: "2d ago",
      marker: "default",
      actor: "respondent",
      actorLabel: "Eleanor Voss · Quill & Co",
      message:
        "Submitted response statement contesting prep-hour scope. Provided original SOW with comments.",
      attachment: {
        filename: "quill_response_with_comments.pdf",
        size: "412 KB",
        kind: "pdf",
      },
    },
    {
      id: "tl-sofia-4",
      when: "Apr 30 · 11:42 AM",
      whenRelative: "3h ago",
      marker: "default",
      actor: "specialist",
      actorLabel: "Miguel Ramos · Talent Specialist",
      message:
        "Reviewed both statements + SOW. Drafted preliminary recommendation: partial in favor of Sofia.",
    },
  ],
  timelineTotalCount: 12,
  evidence: [
    {
      id: "ev-sofia-1",
      filename: "sofia_quill_sow_signed.pdf",
      meta: "PDF · 287 KB · UPLOADED 3D AGO",
      source: "claimant",
      kind: "pdf",
    },
    {
      id: "ev-sofia-2",
      filename: "sofia_time_tracker_log.csv",
      meta: "CSV · 14 KB · UPLOADED 3D AGO",
      source: "claimant",
      kind: "spreadsheet",
    },
    {
      id: "ev-sofia-3",
      filename: "quill_response_with_comments.pdf",
      meta: "PDF · 412 KB · UPLOADED 2D AGO",
      source: "respondent",
      kind: "pdf",
    },
    {
      id: "ev-sofia-4",
      filename: "atlas_sow_template_canonical.pdf",
      meta: "PDF · 218 KB · UPLOADED 4D AGO",
      source: "atlas",
      kind: "pdf",
    },
  ],
  evidenceTotalCount: 7,
  evidenceReviewedCount: 4,
  auditLogTotalCount: 23,
};

/* ---------- 2. Marcus Bauer vs Vertex Health — IN-PROGRESS ---------- */

const marcus_vertex: Dispute = {
  id: "DSP-2026-04-08",
  caseId: "DSP-2026-04-08",
  state: "in-progress",
  filterKey: "open",
  claimantName: "Marcus Bauer",
  respondentName: "Vertex Health",
  reason: "quality-of-work",
  reasonLabel: DISPUTE_REASON_LABEL["quality-of-work"],
  filedLabel: "Filed 7 days ago",
  daysOpen: 7,
  slaLabel: "1D LEFT",
  slaTone: "danger",
  amountLabel: "$5,200",
  claimant: {
    partyType: "candidate",
    id: "cand-marcus-bauer",
    name: "Marcus Bauer",
    initials: "M",
    countryFlag: "🇩🇪",
    avatarGradient: "olive",
    tier: "Elite",
    tenureLabel: "26 months",
    ratingLabel: "4.7 rating",
  },
  respondent: {
    partyType: "client",
    id: "client-vertex-health",
    name: "Vertex Health",
    initials: "VH",
    logoVariant: 2,
    industry: "Biotech",
    sizeLabel: "130 ppl",
    city: "Cambridge, MA",
    contactName: "James Liu",
  },
  filedAtIso: "2026-04-23T08:30:00Z",
  amountUSD: 5200,
  hoursWorkedLabel: "180h · over 6 weeks",
  contractTermsLabel: "Hourly · standard Atlas template",
  engagementStatusLabel: "Active · partial pause",
  engagementStatusTone: "amber",
  atlasBackstopLabel: "Up to 14 days · expires May 7",
  trackRecordLabel: "Marcus: 1 prior (resolved 5★) · Vertex: 0 prior",

  statusBanner: {
    tone: "urgent",
    message: "Investigation in progress · evidence gathering ongoing",
    slaLabel: "SLA · 1D LEFT",
    slaTone: "danger",
  },
  claims: [
    {
      side: "claimant",
      heading: "FROM CLAIMANT — MARCUS BAUER",
      body: "Vertex is contesting deliverable quality on the lab-ops process redesign. I delivered the documented scope (process maps + Notion runbook + 3 training sessions) and Vertex's team accepted the work in writing on Apr 16. The dispute is being raised retroactively after a separate team change.",
    },
    {
      side: "respondent",
      heading: "FROM RESPONDENT — JAMES LIU, VERTEX HEALTH",
      body: "After Marcus's deliverables landed, the new ops director reviewed them and flagged the runbook structure as not matching our internal documentation patterns. We're not contesting the work he did; we're raising the question of whether the deliverable should have anticipated the structural fit.",
    },
  ],
  atlasSummary: {
    analysis:
      "This dispute hinges on a scope question raised AFTER acceptance. Vertex's team accepted the deliverables in writing on Apr 16; the structural-fit objection came on Apr 23 from a different stakeholder. Atlas's standard SOW protects against post-acceptance re-litigation unless the deliverables fail an objective test (functional bug, missed scope item, etc.) — which Vertex is not claiming.\n\nRecommend: side with the candidate. Marcus's work was accepted; the structural-fit critique is a Vertex-internal alignment issue.",
    recommendation: {
      label: "Side with candidate",
      detail: "Acceptance was already given · post-hoc objection out of scope",
    },
    facts: [
      { label: "Total amount in dispute", value: "$5,200.00" },
      { label: "Hours worked", value: "180h · over 6 weeks" },
      { label: "Contract terms", value: "Hourly · standard Atlas template" },
      {
        label: "Engagement status",
        value: "Active · partial pause",
        tone: "amber",
      },
      {
        label: "Acceptance memo",
        value: "Signed by Vertex on Apr 16",
        tone: "success",
      },
      {
        label: "Both parties' track record",
        value: "Marcus: 1 prior (5★) · Vertex: 0 prior",
      },
    ],
  },
  timeline: [
    {
      id: "tl-marcus-1",
      when: "Apr 23 · 8:30 AM",
      whenRelative: "7d ago",
      marker: "amber",
      actor: "respondent",
      actorLabel: "James Liu · Vertex Health",
      message: "Filed dispute citing structural fit issue with delivered runbook.",
    },
    {
      id: "tl-marcus-2",
      when: "Apr 23 · 9:14 AM",
      whenRelative: "7d ago",
      marker: "system",
      actor: "atlas",
      actorLabel: "Atlas system",
      message: "Partial pause activated · backstop window opened.",
    },
    {
      id: "tl-marcus-3",
      when: "Apr 25 · 2:42 PM",
      whenRelative: "5d ago",
      marker: "default",
      actor: "claimant",
      actorLabel: "Marcus Bauer",
      message: "Submitted Apr 16 acceptance memo + email thread + Vertex Slack snippet.",
      attachment: {
        filename: "vertex_acceptance_memo_apr16.pdf",
        size: "183 KB",
        kind: "pdf",
      },
    },
  ],
  timelineTotalCount: 8,
  evidence: [
    {
      id: "ev-marcus-1",
      filename: "vertex_acceptance_memo_apr16.pdf",
      meta: "PDF · 183 KB · UPLOADED 5D AGO",
      source: "claimant",
      kind: "pdf",
    },
    {
      id: "ev-marcus-2",
      filename: "vertex_internal_doc_template.pdf",
      meta: "PDF · 421 KB · UPLOADED 4D AGO",
      source: "respondent",
      kind: "pdf",
    },
  ],
  evidenceTotalCount: 5,
  evidenceReviewedCount: 2,
  auditLogTotalCount: 14,
};

/* ---------- 3. Anand Patel vs TechFlow Inc — UNDER-REVIEW ---------- */

const anand_techflow: Dispute = {
  id: "DSP-2026-04-04",
  caseId: "DSP-2026-04-04",
  state: "under-review",
  filterKey: "open",
  claimantName: "Anand Patel",
  respondentName: "TechFlow Inc",
  reason: "hours-billed",
  reasonLabel: DISPUTE_REASON_LABEL["hours-billed"],
  filedLabel: "Filed 11 days ago",
  daysOpen: 11,
  slaLabel: "12H LEFT",
  slaTone: "danger",
  amountLabel: "$1,460",
  claimant: {
    partyType: "candidate",
    id: "cand-anand-patel",
    name: "Anand Patel",
    initials: "A",
    countryFlag: "🇮🇳",
    avatarGradient: "caramel",
    tier: "Elite",
    tenureLabel: "23 months",
    ratingLabel: "5.0 rating",
  },
  respondent: {
    partyType: "client",
    id: "client-techflow-inc",
    name: "TechFlow Inc",
    initials: "TF",
    logoVariant: 2,
    industry: "Developer tools",
    sizeLabel: "80 ppl",
    city: "Austin, TX",
    contactName: "David Park",
  },
  filedAtIso: "2026-04-19T16:48:00Z",
  amountUSD: 1460,
  hoursWorkedLabel: "32h · contested vs 28h logged",
  contractTermsLabel: "Hourly · standard Atlas template",
  engagementStatusLabel: "Active · continues",
  engagementStatusTone: "default",
  atlasBackstopLabel: "Up to 14 days · expires May 3",
  trackRecordLabel: "Anand: 0 prior · TechFlow: 0 prior",

  statusBanner: {
    tone: "urgent",
    message:
      "Under specialist review — both parties have submitted · time-tracker reconciliation in progress",
    slaLabel: "SLA · 12H LEFT",
    slaTone: "danger",
  },
  claims: [
    {
      side: "respondent",
      heading: "FROM RESPONDENT — DAVID PARK, TECHFLOW INC",
      body: "Anand billed 32 hours for the week of Apr 6-12, but our time-tracker shows 28 hours logged on the dashboard. We're not disputing his work — just the 4-hour delta. We'd like to reconcile.",
    },
    {
      side: "claimant",
      heading: "FROM CLAIMANT — ANAND PATEL",
      body: "The 4-hour delta is async work I did off-platform on Apr 9: a deep-dive analysis David asked for over Slack at 11pm IST. The work is in the deliverables but I logged it after the fact (next morning) so the time-tracker shows 28h on-dash. The 4 extra hours are real and were requested — happy to provide the Slack thread.",
    },
  ],
  atlasSummary: {
    analysis:
      "Time-tracker reconciliation case. Anand's 4-hour delta is async work performed off-platform — the log entry timing is the friction, not the work itself. Slack evidence (attached) shows David explicitly requested the deep-dive at 11pm IST on Apr 9. The 4 hours are billable; the on-dashboard time-tracker just doesn't reflect them.\n\nRecommend: side with candidate, with a process note. Anand should log async work within 24h going forward; TechFlow should accept the 4-hour delta.",
    recommendation: {
      label: "Side with candidate",
      detail: "Slack evidence supports off-dash hours · process note for next week",
    },
    facts: [
      { label: "Total amount in dispute", value: "$1,460.00" },
      { label: "Hours contested", value: "4h (32h vs 28h logged)" },
      { label: "Engagement status", value: "Active · continues", tone: "default" },
      {
        label: "Slack evidence",
        value: "Both parties confirm",
        tone: "success",
      },
      { label: "Both parties' track record", value: "Both 0 prior disputes" },
    ],
  },
  timeline: [
    {
      id: "tl-anand-1",
      when: "Apr 19 · 4:48 PM",
      whenRelative: "11d ago",
      marker: "amber",
      actor: "respondent",
      actorLabel: "David Park · TechFlow Inc",
      message: "Filed billing reconciliation dispute · 4-hour delta.",
    },
    {
      id: "tl-anand-2",
      when: "Apr 19 · 7:30 PM",
      whenRelative: "11d ago",
      marker: "default",
      actor: "claimant",
      actorLabel: "Anand Patel",
      message:
        "Submitted Slack thread + Notion deep-dive doc covering the 4-hour async work.",
      attachment: {
        filename: "techflow_slack_apr9.pdf",
        size: "94 KB",
        kind: "pdf",
      },
    },
    {
      id: "tl-anand-3",
      when: "Apr 28 · 9:12 AM",
      whenRelative: "2d ago",
      marker: "default",
      actor: "specialist",
      actorLabel: "Miguel Ramos · Talent Specialist",
      message:
        "Reviewed Slack thread + Notion doc. Confirms async work was requested + delivered.",
    },
  ],
  timelineTotalCount: 9,
  evidence: [
    {
      id: "ev-anand-1",
      filename: "techflow_slack_apr9.pdf",
      meta: "PDF · 94 KB · UPLOADED 11D AGO",
      source: "claimant",
      kind: "pdf",
    },
    {
      id: "ev-anand-2",
      filename: "techflow_time_tracker_export.csv",
      meta: "CSV · 22 KB · UPLOADED 11D AGO",
      source: "respondent",
      kind: "spreadsheet",
    },
    {
      id: "ev-anand-3",
      filename: "anand_notion_deep_dive.pdf",
      meta: "PDF · 312 KB · UPLOADED 11D AGO",
      source: "claimant",
      kind: "pdf",
    },
  ],
  evidenceTotalCount: 3,
  evidenceReviewedCount: 3,
  auditLogTotalCount: 18,
};

/* ---------- 4. Carmen Lopez vs Acme Co — RESOLVED-FAVOR-RESPONDENT ---------- */

const carmen_acme: Dispute = {
  id: "DSP-2026-03-25",
  caseId: "DSP-2026-03-25",
  state: "resolved-favor-respondent",
  filterKey: "resolved",
  claimantName: "Carmen Lopez",
  respondentName: "Acme Co",
  reason: "communication",
  reasonLabel: DISPUTE_REASON_LABEL.communication,
  filedLabel: "Resolved 12 days ago",
  daysOpen: 18,
  slaLabel: "RESOLVED",
  slaTone: "success",
  amountLabel: "$0",
  claimant: {
    partyType: "candidate",
    id: "cand-carmen-lopez",
    name: "Carmen Lopez",
    initials: "C",
    countryFlag: "🇨🇴",
    avatarGradient: "warm",
    tier: "Vetted",
    tenureLabel: "9 months",
    ratingLabel: "4.6 rating",
  },
  respondent: {
    partyType: "client",
    id: "client-acme-co",
    name: "Acme Co",
    initials: "AC",
    logoVariant: 1,
    industry: "B2B SaaS",
    sizeLabel: "200 ppl",
    city: "San Francisco",
    contactName: "Sarah Lin",
  },
  filedAtIso: "2026-03-25T14:22:00Z",
  amountUSD: 0,
  hoursWorkedLabel: "—",
  contractTermsLabel: "Per-project · standard Atlas template",
  engagementStatusLabel: "Continued · resolved",
  engagementStatusTone: "success",
  atlasBackstopLabel: "Not invoked · no monetary dispute",
  trackRecordLabel: "Carmen: 0 prior · Acme: 0 prior",

  statusBanner: {
    tone: "info",
    message: "Resolved · sided with Acme Co · communication-pattern feedback delivered",
    slaLabel: "DECIDED 12D AGO",
    slaTone: "success",
  },
  claims: [
    {
      side: "claimant",
      heading: "FROM CLAIMANT — CARMEN LOPEZ",
      body: "Sarah at Acme expects async responses within 2 hours of every Slack message. I'm in a different timezone and have set work hours that don't always overlap. The 2-hour expectation isn't in our SOW and is creating a stressful working environment.",
    },
    {
      side: "respondent",
      heading: "FROM RESPONDENT — SARAH LIN, ACME CO",
      body: "We never set a 2-hour SLA. We do operate fast and need responses during overlap hours, but Carmen reads urgency into messages we don't intend. We'd love to keep working together — this is a calibration issue, not a fit issue.",
    },
  ],
  atlasSummary: {
    analysis:
      "Both sides are right and there is no contractual breach. Acme didn't set a 2-hour SLA; Carmen read one into the message tempo. The right answer is a calibration conversation, not a money decision.",
    recommendation: {
      label: "Side with respondent (no monetary outcome)",
      detail: "Communication-pattern feedback delivered to claimant",
    },
    facts: [
      { label: "Monetary dispute", value: "None" },
      { label: "Engagement", value: "Continues", tone: "success" },
      { label: "Outcome", value: "Calibration conversation logged" },
    ],
  },
  timeline: [
    {
      id: "tl-carmen-1",
      when: "Mar 25 · 2:22 PM",
      whenRelative: "5w ago",
      marker: "amber",
      actor: "claimant",
      actorLabel: "Carmen Lopez",
      message: "Filed communication-pattern dispute · no monetary claim.",
    },
    {
      id: "tl-carmen-2",
      when: "Apr 12 · 11:00 AM",
      whenRelative: "12d ago",
      marker: "default",
      actor: "specialist",
      actorLabel: "Miguel Ramos · Talent Specialist",
      message:
        "Resolution: sided with Acme. Delivered calibration feedback to Carmen + suggested overlap-hour cadence for Acme.",
    },
  ],
  timelineTotalCount: 6,
  evidence: [
    {
      id: "ev-carmen-1",
      filename: "carmen_acme_slack_thread_excerpts.pdf",
      meta: "PDF · 156 KB · UPLOADED 5W AGO",
      source: "claimant",
      kind: "pdf",
    },
  ],
  evidenceTotalCount: 1,
  evidenceReviewedCount: 1,
  auditLogTotalCount: 9,
  decision: {
    option: "side-with-client",
    decidedBy: "Miguel Ramos",
    decidedAtLabel: "Apr 12 · 11:00 AM (12d ago)",
    rationale:
      "No SOW breach · communication-pattern misread by claimant. Calibration conversation delivered to Carmen with explicit overlap-hours clarification. Engagement continues; no monetary outcome.",
  },
};

/* ---------- 5. Mei Chen vs Northwind Solutions — RESOLVED-FAVOR-CLAIMANT ---------- */

const mei_northwind: Dispute = {
  id: "DSP-2026-03-18",
  caseId: "DSP-2026-03-18",
  state: "resolved-favor-claimant",
  filterKey: "resolved",
  claimantName: "Mei Chen",
  respondentName: "Northwind Solutions",
  reason: "payment",
  reasonLabel: DISPUTE_REASON_LABEL.payment,
  filedLabel: "Resolved 18 days ago",
  daysOpen: 9,
  slaLabel: "RESOLVED",
  slaTone: "success",
  amountLabel: "$3,150",
  claimant: {
    partyType: "candidate",
    id: "cand-mei-chen",
    name: "Mei Chen",
    initials: "M",
    countryFlag: "🇨🇳",
    avatarGradient: "ice",
    tier: "Vetted",
    tenureLabel: "11 months",
    ratingLabel: "4.5 rating",
  },
  respondent: {
    partyType: "client",
    id: "client-northwind",
    name: "Northwind Solutions",
    initials: "NS",
    logoVariant: 3,
    industry: "Consulting",
    sizeLabel: "95 ppl",
    city: "Chicago, IL",
    contactName: "Robert Hayes",
  },
  filedAtIso: "2026-03-18T09:00:00Z",
  amountUSD: 3150,
  hoursWorkedLabel: "60h · CRM cleanup project",
  contractTermsLabel: "Per-project · Net-30",
  engagementStatusLabel: "Completed · paid",
  engagementStatusTone: "success",
  atlasBackstopLabel: "Activated · Atlas paid out + recovered",
  trackRecordLabel: "Mei: 0 prior · Northwind: 1 prior (resolved 3y ago)",

  statusBanner: {
    tone: "info",
    message: "Resolved · partial refund + Atlas backstop activated",
    slaLabel: "DECIDED 18D AGO",
    slaTone: "success",
  },
  claims: [
    {
      side: "claimant",
      heading: "FROM CLAIMANT — MEI CHEN",
      body: "I delivered the CRM cleanup work on Feb 22 and submitted the invoice. Northwind's 30-day window closed Mar 24 with no payment. Robert was responsive at first, then went silent.",
    },
    {
      side: "respondent",
      heading: "FROM RESPONDENT — ROBERT HAYES, NORTHWIND SOLUTIONS",
      body: "Cash crunch on our side · Q1 ended weak. We acknowledge the work was delivered. We'd asked Mei for a 30-day payment extension; she declined. We can pay $1,575 now and the rest over 60 days.",
    },
  ],
  atlasSummary: {
    analysis:
      "Acknowledged debt + cash-flow excuse from respondent. Atlas SOW does not allow client unilateral payment extension; the contractual obligation is full payment within Net-30. Mei is correct on the contract; Northwind has a real cash-flow problem unrelated to the work.\n\nResolved: Atlas backstop covers $1,575 immediately to Mei; Northwind pays remaining $1,575 to Atlas over 60 days. Mei made whole; Northwind on a payment plan.",
    recommendation: {
      label: "Refund partial + Atlas backstop",
      detail: "Atlas pays Mei in full; recovers from Northwind on 60-day plan",
    },
    facts: [
      { label: "Total amount in dispute", value: "$3,150.00" },
      { label: "Atlas backstop", value: "Activated · Mei paid out", tone: "success" },
      {
        label: "Recovery from respondent",
        value: "$1,575 over 60 days",
        tone: "amber",
      },
      { label: "Engagement", value: "Completed · paid", tone: "success" },
    ],
  },
  timeline: [
    {
      id: "tl-mei-1",
      when: "Mar 18 · 9:00 AM",
      whenRelative: "6w ago",
      marker: "amber",
      actor: "claimant",
      actorLabel: "Mei Chen",
      message: "Filed payment-delay dispute · invoice unpaid past Net-30.",
    },
    {
      id: "tl-mei-2",
      when: "Mar 27 · 1:14 PM",
      whenRelative: "5w ago",
      marker: "default",
      actor: "specialist",
      actorLabel: "Miguel Ramos · Talent Specialist",
      message:
        "Resolution: Atlas backstop covers $1,575 to Mei now. Northwind on 60-day recovery plan for the rest. Mei made whole.",
    },
  ],
  timelineTotalCount: 11,
  evidence: [
    {
      id: "ev-mei-1",
      filename: "mei_invoice_feb22.pdf",
      meta: "PDF · 88 KB · UPLOADED 6W AGO",
      source: "claimant",
      kind: "pdf",
    },
    {
      id: "ev-mei-2",
      filename: "northwind_payment_history.csv",
      meta: "CSV · 18 KB · UPLOADED 5W AGO",
      source: "atlas",
      kind: "spreadsheet",
    },
  ],
  evidenceTotalCount: 4,
  evidenceReviewedCount: 4,
  auditLogTotalCount: 16,
  decision: {
    option: "refund-partial",
    decidedBy: "Miguel Ramos",
    decidedAtLabel: "Mar 27 · 1:14 PM (5w ago)",
    rationale:
      "Northwind acknowledged debt, claimed Q1 cash crunch. Activated Atlas backstop to make Mei whole immediately ($1,575 paid out same day). Recovery from Northwind on 60-day plan ($1,575 owed back to Atlas). Northwind moved to At-Risk cohort + flagged for next-engagement payment-up-front.",
  },
};

/* ---------- 6. Aaliyah Koné vs Lumio Health — RESOLVED-PARTIAL ---------- */

const aaliyah_lumio: Dispute = {
  id: "DSP-2026-03-12",
  caseId: "DSP-2026-03-12",
  state: "resolved-partial",
  filterKey: "resolved",
  claimantName: "Aaliyah Koné",
  respondentName: "Lumio Health",
  reason: "hours-billed",
  reasonLabel: DISPUTE_REASON_LABEL["hours-billed"],
  filedLabel: "Resolved 31 days ago",
  daysOpen: 14,
  slaLabel: "RESOLVED",
  slaTone: "success",
  amountLabel: "$1,820",
  claimant: {
    partyType: "client",
    id: "client-lumio-health",
    name: "Lumio Health",
    initials: "LH",
    logoVariant: 3,
    industry: "Telehealth",
    sizeLabel: "240 ppl",
    city: "Toronto",
    contactName: "Margaret Liu",
  },
  respondent: {
    partyType: "candidate",
    id: "cand-aaliyah-kone",
    name: "Aaliyah Koné",
    initials: "A",
    countryFlag: "🇨🇮",
    avatarGradient: "warm",
    tier: "Vetted",
    tenureLabel: "14 months",
    ratingLabel: "4.5 rating",
  },
  filedAtIso: "2026-03-12T11:30:00Z",
  amountUSD: 1820,
  hoursWorkedLabel: "65h · contested vs 40h scoped",
  contractTermsLabel: "Hourly cap · per-month",
  engagementStatusLabel: "Continued · revised cap",
  engagementStatusTone: "amber",
  atlasBackstopLabel: "Not invoked · partial split agreed",
  trackRecordLabel: "Aaliyah: 0 prior · Lumio: 0 prior",

  statusBanner: {
    tone: "info",
    message: "Resolved · partial split · monthly cap revised",
    slaLabel: "DECIDED 1MO AGO",
    slaTone: "success",
  },
  claims: [
    {
      side: "claimant",
      heading: "FROM CLAIMANT — MARGARET LIU, LUMIO HEALTH",
      body: "We scoped Aaliyah at 40h/month for patient-comms work. Her March logs show 65h. The work is good but we didn't approve the overrun.",
    },
    {
      side: "respondent",
      heading: "FROM RESPONDENT — AALIYAH KONÉ",
      body: "March was a launch month — Margaret's team brought new comms volume that 40h couldn't cover. I escalated at 50h and was told to keep going. The 25h overrun is real work, real value.",
    },
  ],
  atlasSummary: {
    analysis:
      "Cap-overrun dispute with mixed accountability. Aaliyah did escalate at 50h (Slack thread evidence) and was told to keep going by Lumio's lead, who didn't loop Margaret in. The work is real; the cap-conversation broke down internally on Lumio's side.\n\nResolved: partial split. Lumio pays for the 50h Aaliyah explicitly worked (40h cap + 10h authorized escalation = 50h × $42 = $2,100). The remaining 15h ($630) split 50/50: Lumio pays $315 of it as goodwill; Aaliyah eats $315 as a process-discipline note. Cap revised to 50h going forward.",
    recommendation: {
      label: "Partial split",
      detail: "Lumio pays 50h + 50% of overrun · cap revised to 50h",
    },
    facts: [
      { label: "Total amount in dispute", value: "$1,820.00" },
      { label: "Lumio pays", value: "$2,100 + $315 = $2,415" },
      { label: "Aaliyah accepts", value: "$315 reduction", tone: "amber" },
      { label: "New monthly cap", value: "50h (was 40h)", tone: "default" },
      { label: "Engagement", value: "Continues · revised cap", tone: "success" },
    ],
  },
  timeline: [
    {
      id: "tl-aaliyah-1",
      when: "Mar 12 · 11:30 AM",
      whenRelative: "1mo ago",
      marker: "amber",
      actor: "claimant",
      actorLabel: "Margaret Liu · Lumio Health",
      message: "Filed cap-overrun dispute · 25h above scoped 40h.",
    },
    {
      id: "tl-aaliyah-2",
      when: "Mar 26 · 4:08 PM",
      whenRelative: "1mo ago",
      marker: "default",
      actor: "specialist",
      actorLabel: "Miguel Ramos · Talent Specialist",
      message:
        "Resolution: partial split. Lumio pays 50h + half of overrun. Cap revised to 50h. Process note delivered to both parties.",
    },
  ],
  timelineTotalCount: 7,
  evidence: [
    {
      id: "ev-aaliyah-1",
      filename: "lumio_aaliyah_scope_doc.pdf",
      meta: "PDF · 142 KB · UPLOADED 1MO AGO",
      source: "claimant",
      kind: "pdf",
    },
    {
      id: "ev-aaliyah-2",
      filename: "lumio_slack_50h_authorization.pdf",
      meta: "PDF · 67 KB · UPLOADED 1MO AGO",
      source: "respondent",
      kind: "pdf",
    },
  ],
  evidenceTotalCount: 3,
  evidenceReviewedCount: 3,
  auditLogTotalCount: 12,
  decision: {
    option: "partial-split",
    decidedBy: "Miguel Ramos",
    decidedAtLabel: "Mar 26 · 4:08 PM (1mo ago)",
    rationale:
      "Cap-overrun with documented internal escalation on Lumio's side. Partial split: Lumio pays 50h fully + 50% of overrun ($315), Aaliyah accepts 50% reduction on the unauthorized 15h. Cap revised to 50h going forward; Lumio process discipline note delivered.",
  },
};

/* ---------- 7. Tomás Silva-Mendes vs Bridgepoint LLC — ESCALATED ---------- */

const tomas_bridgepoint: Dispute = {
  id: "DSP-2026-04-15",
  caseId: "DSP-2026-04-15",
  state: "escalated",
  filterKey: "open",
  claimantName: "Tomás Silva-Mendes",
  respondentName: "Bridgepoint LLC",
  reason: "no-show",
  reasonLabel: DISPUTE_REASON_LABEL["no-show"],
  filedLabel: "Filed 15 days ago · escalated 6 days ago",
  daysOpen: 15,
  slaLabel: "ADMIN",
  slaTone: "default",
  amountLabel: "$8,400",
  claimant: {
    partyType: "client",
    id: "client-bridgepoint-llc",
    name: "Bridgepoint LLC",
    initials: "BL",
    logoVariant: 4,
    industry: "M&A advisory",
    sizeLabel: "18 ppl",
    city: "New York",
    contactName: "Vincent Korver",
  },
  respondent: {
    partyType: "candidate",
    id: "cand-tomas-silva",
    name: "Tomás Silva-Mendes",
    initials: "T",
    countryFlag: "🇧🇷",
    avatarGradient: "purple",
    tier: "Standard",
    tenureLabel: "8 months · OFF-BOARDED",
    ratingLabel: "3.8 rating",
  },
  filedAtIso: "2026-04-15T13:42:00Z",
  amountUSD: 8400,
  hoursWorkedLabel: "120h · disputed in full",
  contractTermsLabel: "Per-project + retainer",
  engagementStatusLabel: "Terminated · candidate off-boarded",
  engagementStatusTone: "danger",
  atlasBackstopLabel: "Activated · admin reviewing recovery",
  trackRecordLabel: "Tomás: 1 prior (resolved against him) · Bridgepoint: 0 prior",

  statusBanner: {
    tone: "danger",
    message: "Escalated to admin · specialist authority insufficient · admin reviewing",
    slaLabel: "ADMIN HANDLING",
    slaTone: "default",
  },
  claims: [
    {
      side: "claimant",
      heading: "FROM CLAIMANT — VINCENT KORVER, BRIDGEPOINT LLC",
      body: "Tomás disappeared mid-engagement on Apr 8 · stopped responding to messages · missed two scheduled syncs · the M&A close is now at risk. We've paid $8,400 against deliverables we don't have. Demanding full refund + damages.",
    },
    {
      side: "respondent",
      heading: "FROM RESPONDENT — TOMÁS SILVA-MENDES",
      body: "Personal medical emergency Apr 8-12 · I notified Vincent on Apr 9 via Atlas message and provided documentation. The 'disappeared' claim is false. The 'damages' claim is out of scope for the platform — that's a legal-system question, not an Atlas dispute.",
    },
  ],
  atlasSummary: {
    analysis:
      "Specialist-level resolution attempted but ran into two issues: (a) the medical-emergency notification was sent through Atlas messaging but Vincent claims he didn't see it (no read receipt — Atlas can confirm delivery, not read), and (b) the 'damages' claim from Bridgepoint is asking for compensation beyond the deliverables — explicitly out of Atlas's specialist authority.\n\nEscalated to admin Apr 24. Admin will rule on the deliverables question; the damages question is being routed to legal-team review.\n\nNote: Tomás was off-boarded May 2 on a separate review (third strike on responsiveness). His off-boarding is final regardless of this dispute outcome.",
    recommendation: {
      label: "Escalate to admin",
      detail: "Damages claim out of specialist scope · admin + legal review",
    },
    facts: [
      { label: "Total amount in dispute", value: "$8,400.00" },
      { label: "Damages claim", value: "Beyond specialist authority", tone: "danger" },
      {
        label: "Engagement",
        value: "Terminated · candidate off-boarded",
        tone: "danger",
      },
      { label: "Atlas backstop", value: "Activated · admin recovering" },
      { label: "Both parties' track record", value: "Tomás: 1 prior · Bridgepoint: 0 prior" },
    ],
  },
  timeline: [
    {
      id: "tl-tomas-1",
      when: "Apr 15 · 1:42 PM",
      whenRelative: "15d ago",
      marker: "danger",
      actor: "claimant",
      actorLabel: "Vincent Korver · Bridgepoint LLC",
      message: "Filed no-show dispute + damages claim · M&A close at risk.",
    },
    {
      id: "tl-tomas-2",
      when: "Apr 18 · 10:00 AM",
      whenRelative: "12d ago",
      marker: "default",
      actor: "respondent",
      actorLabel: "Tomás Silva-Mendes",
      message: "Submitted medical-emergency documentation + Atlas message timestamp logs.",
      attachment: {
        filename: "tomas_medical_emergency_doc.pdf",
        size: "234 KB",
        kind: "pdf",
      },
    },
    {
      id: "tl-tomas-3",
      when: "Apr 24 · 11:00 AM",
      whenRelative: "6d ago",
      marker: "danger",
      actor: "specialist",
      actorLabel: "Miguel Ramos · Talent Specialist",
      message:
        "Escalated to admin: damages claim is out of specialist scope. Admin + legal-team review pending.",
    },
  ],
  timelineTotalCount: 14,
  evidence: [
    {
      id: "ev-tomas-1",
      filename: "tomas_medical_emergency_doc.pdf",
      meta: "PDF · 234 KB · UPLOADED 12D AGO",
      source: "respondent",
      kind: "pdf",
    },
    {
      id: "ev-tomas-2",
      filename: "atlas_msg_delivery_logs_apr8_12.pdf",
      meta: "PDF · 88 KB · UPLOADED 12D AGO",
      source: "atlas",
      kind: "pdf",
    },
    {
      id: "ev-tomas-3",
      filename: "bridgepoint_engagement_invoice.pdf",
      meta: "PDF · 142 KB · UPLOADED 15D AGO",
      source: "claimant",
      kind: "pdf",
    },
  ],
  evidenceTotalCount: 6,
  evidenceReviewedCount: 4,
  auditLogTotalCount: 22,
  escalation: {
    reason:
      "Bridgepoint's damages claim asks for compensation beyond delivered scope — outside specialist authority. Routing to admin + legal review for the damages question; specialist recommendation on the deliverables question is on file.",
    escalatedAtLabel: "Apr 24 · 11:00 AM (6d ago)",
    escalatedBy: "Miguel Ramos",
    assignedAdmin: "Pending admin pickup",
  },
};

/* ============================================================
   Roster export
   ============================================================ */

export const disputes: ReadonlyArray<Dispute> = [
  sofia_quill,
  marcus_vertex,
  anand_techflow,
  tomas_bridgepoint,
  carmen_acme,
  mei_northwind,
  aaliyah_lumio,
];

export const DISPUTE_DEFAULT_ID = sofia_quill.id;

/** Header subtitle ("Disputes · 7 cases · 4 open · 3 resolved"). */
export const DISPUTES_HEADER_SUBTITLE = (() => {
  const open = disputes.filter((d) => d.filterKey === "open").length;
  const resolved = disputes.filter((d) => d.filterKey === "resolved").length;
  return `${disputes.length} cases · ${open} open · ${resolved} resolved`;
})();

/**
 * Lookup helper used by the disputes page when resolving the active row.
 * Returns `undefined` for unknown ids — the page falls back to the rail's
 * primary case (Sofia / Quill).
 */
export function getDispute(id: string): Dispute | undefined {
  return disputes.find((d) => d.id === id);
}
