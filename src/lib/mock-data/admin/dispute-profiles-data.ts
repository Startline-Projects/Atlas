/**
 * Phase 12a — Disputes data
 *
 * 10 dispute fixtures sourced VERBATIM from admin.html lines 23447-23696 (list rows)
 * + lines 23708-24622 (detail view for dsp-144 canonical).
 *
 * Canonical detail: dsp-144 (Studio Berlin × Tomás Oliveira, Work Quality, fixed-price)
 *   Hero / stage tracker / quick facts all per admin.html.
 * Other 9 disputes carry verbatim list-row data; their detail pages stub
 * role-coherent data via stubDisputeSections() — Phase 12b will replace.
 *
 * Cross-link mapping:
 *   dsp-144 ↔ eng-004 (bidirectional)
 *   dsp-148 → eng-219-vor (404 fallback)
 */

import type { AdminStatTile } from './admin-profiles-data';

// ============================================================
// TYPES
// ============================================================

export type DisputeStatus = 'open' | 'progress' | 'mediation' | 'escalated' | 'urgent' | 'resolved';

export type DisputeStatusPillVariant =
  | 'disp-open'
  | 'disp-progress'
  | 'disp-mediation'
  | 'disp-escalated'
  | 'disp-urgent'
  | 'disp-resolved'
  | 'disp-closed';

export type DisputeReasonCategory =
  | 'quality'
  | 'conduct'
  | 'hours'
  | 'refund'
  | 'ip'
  | 'noshow'
  | 'payment'
  | 'commun';

// admin.html line 11461-11475 — sla variants
export type DisputeSlaVariant = 'ok' | 'warn' | 'danger' | 'done' | 'expired';

export type DisputeFilterKey =
  | 'all'
  | 'open'
  | 'progress'
  | 'escalated'
  | 'urgent'
  | 'resolved'
  | 'sla-risk';

export type DisputeStageState = 'done' | 'current' | 'pending' | 'skipped';

export type DisputeOwnerVariant = 'dk' | 'mv' | 'lc' | 'sr' | 'im' | 'at' | 'ad';

export interface DisputeOwner {
  name: string;
  initials: string;
  variant: DisputeOwnerVariant;
  isAdmin?: boolean; // styles label in danger + sets ow-dot.ad
}

export interface DisputeParty {
  id: string;
  name: string;
  realLegalEntity?: string;
  avatarInitials: string;
  avatarGradient: string;
  metaTrail: string;
}

export interface DisputeHeroStat {
  label: string;
  value: string;
  vSuffix?: string;
  valueSize?: 'default' | 'sm';
  valueColor?: 'success' | 'amber' | 'danger' | 'super';
  meta: string;
}

export interface DisputeHeroBanner {
  variant: 'amber' | 'danger' | 'success';
  title: string;
  meta: string;
}

export interface DisputeStage {
  num: string;
  state: DisputeStageState;
  label: string;
  meta: string;
}

export interface DisputeStageTracker {
  headLabel: string;
  metaPrefix: string;
  metaEmphasis: string;
  metaSuffix: string;
  stages: DisputeStage[];
}

export interface DisputeSlaBadge {
  variant: DisputeSlaVariant;
  text: string;
}

// admin.html lines 23530-23688 — row structure
export interface DisputeListRow {
  id: string;
  atlasId: string;
  status: DisputeStatus;
  statusPillVariant: DisputeStatusPillVariant;
  statusPillText: string;
  statusSub: string;
  reasonCategory: DisputeReasonCategory;
  reasonTagLabel: string;
  // td-disp-pair
  partyA: string;
  partyB: string;
  pairSecondary: string;
  pairSecondaryIsReal: boolean;
  // td-cell.mono (elapsed)
  elapsedLabel: string;
  elapsedSub: string;
  // td-cell (SLA)
  sla: DisputeSlaBadge;
  slaSub?: string;
  // td-cell (owner)
  owner: DisputeOwner;
  // Row variant for tint
  rowVariant?: 'urgent' | 'escalated';
  // Cross-link
  linkedEngagementId?: string;
}

export interface DisputeQuickFact {
  dt: string;
  dd: string;
  ddColor?: 'super' | 'amber' | 'success';
}

// ============================================================
// Phase 12b — Section data shapes
// ============================================================

export type EvidenceIconKind = 'pdf' | 'image' | 'csv' | 'code';

export interface EvidenceItem {
  kind: EvidenceIconKind;
  name: string;
  meta: string;
  reviewed: boolean;
}

export interface PartyByline {
  initials: string;
  gradient: string;
  name: string;
  role: string;
}

export interface DisputeQuote { text: string; cite: string }
export interface DisputeAmount { label: string; value: string; suffix: string }

// Inline-rich paragraph (renders <strong> and <em> via segments)
export type RichSegment =
  | { kind: 'text'; text: string }
  | { kind: 'strong'; text: string }
  | { kind: 'em'; text: string };
export type RichParagraph = RichSegment[];

export interface DisputeClaim {
  statusText: string;
  tagText: string;           // "CLAIMANT" or "RESPONDENT"
  tagVariant: 'claimant' | 'respondent';
  headVariant: 'claim' | 'response';
  title: string;
  filedMeta: string;
  byline: PartyByline;
  reasonCategoryLabel?: string;
  reasonCategoryMeta?: string;
  bodyParagraphs: RichParagraph[];
  bullets?: string[];
  quote: DisputeQuote;
  amount: DisputeAmount;
  evidenceHead: string;
  evidence: EvidenceItem[];
}

export interface DisputeResponse {
  statusText: string;
  tagText: string;
  tagVariant: 'respondent';
  headVariant: 'response';
  title: string;
  filedMeta: string;
  byline: PartyByline;
  bodyParagraphs: RichParagraph[];
  quote: DisputeQuote;
  amount: DisputeAmount;
  evidenceHead: string;
  evidence: EvidenceItem[];
}

export interface ReviewItem { text: string; by: string; checked: boolean }

export interface ConvoMsg {
  initials: string;
  gradient: string;
  from: string;
  time: string;
  tagLabel: string;
  tagFlagged: boolean;
  text: string;
}

export interface DisputeInvestigation {
  statusText: string;
  headTitle: string;
  headMeta: string;
  notesLabel: string;
  notesText: string;       // preserve-whitespace; component renders with whitespace-pre-wrap + parses **strong** / *em*
  reviewLabel: string;
  reviewItems: ReviewItem[];
  convoLabel: string;
  convoText: RichParagraph;
  convoCardHeadTitle: string;
  convoCardHeadMeta: string;
  convoMsgs: ConvoMsg[];
}

export interface DisputeDecisionSide {
  tagLabel: string;
  tagVariant: 'client' | 'candidate';
  name: string;
  amount: string;
  amountSign: 'neg' | 'pos';
  meta: string;
}

export interface DisputeDecision {
  statusText: string;
  headTitle: string;
  signatureState: 'draft' | 'locked';
  signatureBadgeText: string;
  allocations: { client: DisputeDecisionSide; candidate: DisputeDecisionSide };
  rationaleLabel: string;
  rationaleParagraphs: RichParagraph[];
  footText: RichParagraph;
  forceLockLabel: string;
}

export type AuditTagVariant = 'default' | 'signin' | 'override';

export interface AuditEntry {
  time: string;
  verb: string;
  target: string;
  details: string;
  refId?: string;
  tagLabel: string;
  tagVariant: AuditTagVariant;
  dataCat?: 'signin' | 'override';
}

export interface AuditDay {
  dateLabel: string;
  countLabel: string;
  entries: AuditEntry[];
}

export interface DisputeAuditLog {
  statusText: string;
  adminOnly: true;
  adminOnlyLabel: string;
  headTitle: string;
  headMeta: string;
  days: AuditDay[];
  escalationBanner: {
    variant: 'amber' | 'danger' | 'success';
    label: string;
    paragraphs: RichParagraph[];
  };
}

export interface LinkedCard {
  role: string;
  avatarKind: 'icon' | 'initials';
  avatarGradient: string;
  initials?: string;
  iconKind?: 'file';
  name: string;
  realChip?: string;
  meta: string;
  href: string;
  actionKey: string;
}

export interface DisputeLinkedContext {
  statusText: string;
  cards: LinkedCard[];
}

export interface DisputeProfile {
  id: string;
  atlasId: string;
  status: DisputeStatus;
  statusPillVariant: DisputeStatusPillVariant;
  statusPillText: string;
  slaBadge: DisputeSlaBadge;
  openedMeta: string;
  titlePrefix: string;
  titleItalic: string;
  titleSuffix: string;
  claimant: DisputeParty;
  respondent: DisputeParty;
  contextMeta: string;
  linkedEngagementId?: string;
  heroStats: DisputeHeroStat[];
  banner: DisputeHeroBanner;
  stageTracker: DisputeStageTracker;
  quickFacts: DisputeQuickFact[];
  tocMetas: { claim: string; response: string; investigation: string; decision: string; audit: string; linked: string };
  tocOkFlags: { claim: boolean; response: boolean; investigation: boolean; decision: boolean; audit: boolean; linked: boolean };
  tocMetaVariants: { claim?: 'warn'; response?: 'warn'; investigation?: 'warn'; decision?: 'warn'; audit?: 'warn'; linked?: 'warn' };
  // Phase 12b section data
  claim: DisputeClaim;
  response: DisputeResponse;
  investigation: DisputeInvestigation;
  decision: DisputeDecision;
  auditLog: DisputeAuditLog;
  linkedContext: DisputeLinkedContext;
}

export interface DisputesFilterChip {
  key: DisputeFilterKey;
  label: string;
  count: number;
}

export interface DisputesPageData {
  pageMeta: string;
  stats: AdminStatTile[];
  filterChips: DisputesFilterChip[];
  listRows: DisputeListRow[];
  totalCount: number;
  sectionLabel: string;
  sectionLabelMeta: string;
  footerLabel: string;
  loadMoreLabel: string;
}

// ============================================================
// PARTY PRESETS (for detail-page dsp-144)
// ============================================================

const STUDIO_BERLIN: DisputeParty = {
  id: 'cl-002',
  name: 'Studio Berlin',
  realLegalEntity: 'ATELIER WERKRAUM',
  avatarInitials: 'SB',
  avatarGradient: 'linear-gradient(135deg, #C9C2A4, #7A745A)',
  metaTrail: 'cl-002 · 🇩🇪 Berlin DE',
};

const TOMAS_OLIVEIRA: DisputeParty = {
  id: 'cand-019',
  name: 'Tomás Oliveira',
  avatarInitials: 'TO',
  avatarGradient: 'linear-gradient(135deg, #B5C7A8, #5C7A4D)',
  metaTrail: 'cand-019 · 🇵🇹 Lisbon',
};

// ============================================================
// OWNERS
// ============================================================

const OWNER_DK: DisputeOwner = { name: 'Daniel K.', initials: 'DK', variant: 'dk' };
const OWNER_MV: DisputeOwner = { name: 'Mateo V.', initials: 'MV', variant: 'mv' };
const OWNER_LC: DisputeOwner = { name: 'Lukas C.', initials: 'LC', variant: 'lc' };
const OWNER_SR: DisputeOwner = { name: 'Sarah R.', initials: 'SR', variant: 'sr' };
const OWNER_AISHA: DisputeOwner = { name: 'Aïsha (you)', initials: 'AO', variant: 'ad', isAdmin: true };

// ============================================================
// CANONICAL: dsp-144 detail page (verbatim per admin.html)
// ============================================================

const DSP_144: DisputeProfile = {
  id: 'dsp-144',
  atlasId: 'DSP-2026-0144',
  status: 'progress',
  statusPillVariant: 'disp-progress',
  statusPillText: 'Specialist deciding',
  slaBadge: { variant: 'warn', text: 'Stage 3 · 1 day to SLA' },
  openedMeta: 'opened Apr 24, 2026 · 6d 14h elapsed',
  titlePrefix: 'Work quality dispute on a fixed-price ',
  titleItalic: 'DevOps',
  titleSuffix: ' engagement',
  claimant: STUDIO_BERLIN,
  respondent: TOMAS_OLIVEIRA,
  contextMeta: '· eng-004 · $8,500 fixed-price · $4,250 escrow held',
  linkedEngagementId: 'eng-004',
  heroStats: [
    { label: 'Claimant', value: 'Stefan Müller', valueSize: 'sm', meta: 'Studio Berlin · founder' },
    { label: 'Respondent', value: 'Tomás Oliveira', valueSize: 'sm', meta: 'cand-019 · 🇵🇹 Lisbon' },
    { label: 'Disputed amount', value: '$2,550', valueColor: 'danger', meta: 'of $8,500 contract' },
    { label: 'Escrow held', value: '$4,250', valueColor: 'amber', meta: 'pending decision' },
    { label: 'Owner', value: 'Daniel K.', valueSize: 'sm', meta: 'Specialist · 6d 14h' },
  ],
  banner: {
    variant: 'amber',
    title: 'Stage-3 SLA approaching breach.',
    meta: 'Daniel K. has 1 business day to submit the proposed decision before this auto-escalates to Manager review.',
  },
  stageTracker: {
    headLabel: 'DISPUTE LIFECYCLE · 5 STAGES',
    metaPrefix: 'Currently at stage ',
    metaEmphasis: '3 of 5 · Specialist deciding',
    metaSuffix: '',
    stages: [
      { num: '1', state: 'done', label: 'Claim filed', meta: 'Apr 24' },
      { num: '2', state: 'done', label: 'Response received', meta: 'Apr 27' },
      { num: '3', state: 'current', label: 'Specialist deciding', meta: 'now · 1d to SLA' },
      { num: '4', state: 'pending', label: 'Decision delivered', meta: '—' },
      { num: '5', state: 'pending', label: 'Resolved', meta: '—' },
    ],
  },
  quickFacts: [
    { dt: 'Dispute ID', dd: 'DSP-2026-0144' },
    { dt: 'Filed', dd: 'Apr 24, 2026 · 09:14 UTC' },
    { dt: 'Type', dd: 'Work quality · fixed-price' },
    { dt: 'Stage', dd: '3 of 5 · Specialist deciding', ddColor: 'super' },
    { dt: 'SLA status', dd: '1 day remaining', ddColor: 'amber' },
    { dt: 'Engagement', dd: 'eng-004' },
    { dt: 'Escrow held', dd: '$4,250 USD' },
    { dt: 'Disputed amount', dd: '$2,550 USD' },
    { dt: 'Proposed decision', dd: 'Partial release — $1,700 claimant / $2,550 respondent' },
    { dt: 'Owning Specialist', dd: 'Daniel K.' },
    { dt: 'Mediator', dd: 'None assigned' },
    { dt: 'Likely to escalate?', dd: 'No · evidence strong', ddColor: 'success' },
  ],
  tocMetas: {
    claim: '$2,550',
    response: '$850',
    investigation: '14 acts',
    decision: 'Draft',
    audit: '14 acts',
    linked: '4',
  },
  tocOkFlags: { claim: true, response: true, investigation: true, decision: false, audit: true, linked: true },
  tocMetaVariants: { decision: 'warn' },
  // ===== Phase 12b: 6 sections =====
  claim: {
    statusText: 'Filed by claimant · 6 days 14 hours ago',
    tagText: 'CLAIMANT',
    tagVariant: 'claimant',
    headVariant: 'claim',
    title: "Stefan Müller's claim",
    filedMeta: 'Filed Apr 24, 2026 14:08 CET · via in-thread Dispute control',
    byline: {
      initials: 'SM',
      gradient: 'linear-gradient(135deg, #C9C2A4, #7A745A)',
      name: 'Stefan Müller',
      role: 'Founder, Studio Berlin (Atelier Werkraum GmbH) · cl-002',
    },
    reasonCategoryLabel: 'Work Quality',
    reasonCategoryMeta: 'most common after Hours Tracking',
    bodyParagraphs: [
      [
        { kind: 'text', text: 'The DevOps deliverable for Milestone 2 does not meet the specification we agreed in the contract. Tomás was contracted to set up a Kubernetes cluster on AWS with proper IAM scoping, monitoring (Prometheus + Grafana), and CI/CD pipelines for our 4 services. What we received is a working cluster, but:' },
      ],
      [
        { kind: 'text', text: 'Per the milestone agreement, milestone 2 acceptance criteria explicitly includes "service-scoped IAM" and "service-specific dashboards." I am requesting ' },
        { kind: 'strong', text: '60% refund of milestone 2 ($2,550)' },
        { kind: 'text', text: " for the gap between agreed scope and delivered work. I'm willing to pay the remaining 40% ($1,700) for the work that was completed correctly." },
      ],
    ],
    bullets: [
      'IAM uses a single broad role for all services rather than per-service scoping (security concern)',
      'Grafana dashboards are generic Prometheus templates · no service-specific metrics',
      'CI/CD only covers 2 of 4 services · Tomás said the remaining 2 were "out of scope" (they were not)',
    ],
    quote: {
      text: '"Atlas time-tracking data shows Tomás logged 47 hours on this milestone. The CI/CD half-build alone explains maybe 15-20 of those hours. The remaining IAM and dashboard gaps are not partial-credit issues — they\'re scope items he chose not to do."',
      cite: '— Stefan Müller, dispute submission, Apr 24 14:08 CET',
    },
    amount: { label: 'REQUESTED REFUND', value: '$2,550', suffix: '· 60% of milestone 2 escrow' },
    evidenceHead: 'EVIDENCE SUBMITTED · 5 FILES',
    evidence: [
      { kind: 'pdf', name: 'Milestone-2-spec.pdf', meta: 'PDF · 142 KB · signed Apr 1', reviewed: true },
      { kind: 'image', name: 'aws-iam-screenshot.png', meta: 'PNG · 1.2 MB · captured Apr 23', reviewed: true },
      { kind: 'image', name: 'grafana-dashboards.png', meta: 'PNG · 890 KB · captured Apr 23', reviewed: true },
      { kind: 'pdf', name: 'slack-thread-export.pdf', meta: 'PDF · 312 KB · 38 messages', reviewed: true },
      { kind: 'pdf', name: 'github-pr-comments.pdf', meta: 'PDF · 78 KB · 14 comments', reviewed: true },
    ],
  },
  response: {
    statusText: 'Filed Apr 25, 2026 · 22h after claim',
    tagText: 'RESPONDENT',
    tagVariant: 'respondent',
    headVariant: 'response',
    title: "Tomás Oliveira's response",
    filedMeta: 'Filed Apr 25, 2026 11:42 WET · within Atlas-recommended 24h window',
    byline: {
      initials: 'TO',
      gradient: 'linear-gradient(135deg, #B5C7A8, #5C7A4D)',
      name: 'Tomás Oliveira',
      role: 'DevOps Engineer · cand-019 · Lisbon, Portugal',
    },
    bodyParagraphs: [
      [{ kind: 'text', text: "I disagree with Stefan's interpretation of the milestone scope, and the requested 60% refund is excessive. I believe the work delivered substantially meets the agreed milestone, with one legitimate gap that I'm willing to address." }],
      [
        { kind: 'strong', text: 'On IAM scoping:' },
        { kind: 'text', text: ' The original spec said "appropriate IAM for the cluster," not "per-service IAM." Per-service IAM scoping is a security best practice but requires significant additional work (estimated 12–15h) that wasn\'t budgeted. I raised this in our Slack on Apr 12 and Stefan agreed to defer it. I have screenshots of that conversation.' },
      ],
      [
        { kind: 'strong', text: 'On Grafana dashboards:' },
        { kind: 'text', text: ' I delivered the four standard Prometheus dashboards (Node, Pods, Deployments, Ingress). The spec said "Grafana setup with monitoring" — service-specific dashboards were never explicitly listed as deliverables. I\'m happy to build them but they were not in scope.' },
      ],
      [
        { kind: 'strong', text: 'On CI/CD coverage:' },
        { kind: 'text', text: ' This is the legitimate gap. I covered 2 of 4 services. The spec says "CI/CD for the platform services" without listing all four. I read it as the two main services. ' },
        { kind: 'em', text: "I'm willing to credit back $850 (50% of pro-rated time on those 2 services)." },
      ],
    ],
    quote: {
      text: '"I want to resolve this fairly. I\'m not contesting that the CI/CD coverage is incomplete by Stefan\'s reading. But the IAM and dashboard items were not in the agreed scope, and 60% is asking me to give back work that was actually done correctly. A $850 credit covers the ambiguous portion."',
      cite: '— Tomás Oliveira, response, Apr 25 11:42 WET',
    },
    amount: { label: 'COUNTER-OFFER', value: '$850', suffix: '· 20% of milestone 2 (CI/CD pro-rata)' },
    evidenceHead: 'RESPONDENT EVIDENCE · 4 FILES',
    evidence: [
      { kind: 'image', name: 'slack-iam-defer-Apr12.png', meta: 'PNG · 642 KB · 4 messages', reviewed: true },
      { kind: 'pdf', name: 'milestone-2-spec-annotated.pdf', meta: 'PDF · 168 KB · my reading', reviewed: true },
      { kind: 'csv', name: 'time-log-export.csv', meta: 'CSV · 22 KB · 47h logged', reviewed: true },
      { kind: 'code', name: 'git-history-summary.pdf', meta: 'PDF · 94 KB · 38 commits', reviewed: true },
    ],
  },
  investigation: {
    statusText: 'Daniel Kovács · 6 days investigating · 14 actions logged',
    headTitle: "Daniel's investigation workspace",
    headMeta: 'Editable until decision locked · admin can read · candidate + client cannot see',
    notesLabel: "DANIEL'S NOTES ON THE CASE",
    notesText: `**Apr 30, 2026 · 16:18 CET — Updated.** Both parties reviewed at length. After re-reading the milestone-2 spec four times, the truth is genuinely in the middle:

**On IAM:** The spec says "appropriate IAM for the cluster" which is ambiguous. Tomás *did* raise the per-service-vs-shared distinction in Slack Apr 12, and Stefan *did* say "let's defer that" — but the deferral was specifically for "per-service IAM with rotation policies" not the broader scoping. I think Tomás reasonably interpreted that as deferring all per-service work, and Stefan reasonably remembers it as deferring only the rotation piece. **Genuinely ambiguous.**

**On Grafana dashboards:** The spec says "Grafana setup with monitoring." That's ambiguous as written. Industry standard for "monitoring" on a 4-service platform would include service-specific dashboards. But it's not unreasonable to read "monitoring" as just "the four core Prometheus dashboards." **Tomás's reading is defensible but on the thin side.**

**On CI/CD:** This one is clearer. The spec is genuinely silent on coverage scope. Tomás picking 2 of 4 was a unilateral decision, even if the spec didn't explicitly require all 4. **Tomás owes more than $850 here.**

**Recommendation:** Split the difference. $1,700 refund to Stefan (40% of milestone 2). $2,550 released to Tomás. This treats CI/CD as Tomás's gap (worth ~$1,200), and the IAM + dashboard ambiguity as a 50/50 split (worth ~$500 to client side).`,
    reviewLabel: 'EVIDENCE REVIEWED · 9 ITEMS',
    reviewItems: [
      { text: 'Milestone-2 spec PDF · re-read 3×', by: 'Apr 25 18:14', checked: true },
      { text: 'AWS IAM screenshots vs. industry baseline', by: 'Apr 26 10:42', checked: true },
      { text: 'Grafana dashboards — quality assessed', by: 'Apr 26 14:18', checked: true },
      { text: 'Slack Apr 12 IAM-defer thread · key', by: 'Apr 27 09:08', checked: true },
      { text: 'Time-tracker logs · 47h breakdown', by: 'Apr 27 14:42', checked: true },
      { text: 'Git history · 38 commits · file scope', by: 'Apr 28 11:14', checked: true },
      { text: 'GitHub PR comments · stakeholder review', by: 'Apr 28 16:48', checked: true },
      { text: 'Slack thread export · 38-msg history', by: 'Apr 29 10:08', checked: true },
      { text: 'External AWS DevOps consultant 2nd opinion', by: 'declined · cost', checked: false },
    ],
    convoLabel: 'CONVERSATIONS WITH PARTIES',
    convoText: [
      { kind: 'text', text: 'Daniel held ' },
      { kind: 'strong', text: '3 calls with each party' },
      { kind: 'text', text: ' over the last 6 days · 1× joint mediation call (Apr 28) · 14 messages exchanged in admin-only thread · all calls recorded with consent and stored under DSP-2026-0144 audit trail.' },
    ],
    convoCardHeadTitle: 'Key conversation excerpts',
    convoCardHeadMeta: '3 of 142 messages · selected by Daniel as decisional',
    convoMsgs: [
      {
        initials: 'SM', gradient: 'linear-gradient(135deg, #C9C2A4, #7A745A)',
        from: 'Stefan Müller', time: 'Apr 12, 2026 · 14:42 CET',
        tagLabel: 'FLAGGED · KEY', tagFlagged: true,
        text: "\"Yeah let's defer the per-service IAM with rotation for now — that's a lot of work and we can come back to it. Get the cluster running first.\"",
      },
      {
        initials: 'TO', gradient: 'linear-gradient(135deg, #B5C7A8, #5C7A4D)',
        from: 'Tomás Oliveira', time: 'Apr 12, 2026 · 14:48 CET',
        tagLabel: 'FLAGGED · KEY', tagFlagged: true,
        text: '"OK 👍 will use a single IAM role for the cluster for now. Let me know when you want to revisit per-service."',
      },
      {
        initials: 'SM', gradient: 'linear-gradient(135deg, #C9C2A4, #7A745A)',
        from: 'Stefan Müller', time: 'Apr 18, 2026 · 09:14 CET',
        tagLabel: 'CI/CD', tagFlagged: false,
        text: '"Where are the pipelines for the other two services? I assumed all four. Can you also do those before we mark m2 complete?"',
      },
    ],
  },
  decision: {
    statusText: 'Drafted Apr 30 · awaiting both-party acknowledgement',
    headTitle: 'Proposed split: 40% client / 60% candidate',
    signatureState: 'draft',
    signatureBadgeText: 'DRAFT · NOT LOCKED',
    allocations: {
      client: {
        tagLabel: 'CLIENT REFUND', tagVariant: 'client',
        name: 'Stefan Müller (Studio Berlin)',
        amount: '−$1,700', amountSign: 'neg',
        meta: '40% of milestone 2 escrow refunded · less than the $2,550 requested',
      },
      candidate: {
        tagLabel: 'CANDIDATE PAYOUT', tagVariant: 'candidate',
        name: 'Tomás Oliveira',
        amount: '+$2,550', amountSign: 'pos',
        meta: '60% of milestone 2 escrow released · more than the $850 counter-offer',
      },
    },
    rationaleLabel: "DANIEL'S RATIONALE",
    rationaleParagraphs: [
      [
        { kind: 'strong', text: 'CI/CD coverage is the one clear gap.' },
        { kind: 'text', text: ' Tomás chose to cover 2 of 4 services unilaterally, and the spec is silent on scope. That gap is worth approximately $1,200 of the disputed amount.' },
      ],
      [
        { kind: 'strong', text: 'IAM scoping and Grafana dashboards are genuinely ambiguous.' },
        { kind: 'text', text: ' The Apr 12 Slack exchange shows Stefan deferring "per-service IAM with rotation" — a narrower deferral than Tomás interpreted, but a real one. Splitting the remaining $1,000 of disputed amount 50/50 reflects that ambiguity fairly.' },
      ],
      [
        { kind: 'text', text: 'Net result: ' },
        { kind: 'strong', text: '$1,700 refund to Stefan ($1,200 + $500), $2,550 released to Tomás.' },
        { kind: 'text', text: ' Both parties get a result they can live with — neither got what they asked for, but neither lost decisively. Decision ' },
        { kind: 'em', text: 'does not' },
        { kind: 'text', text: ' require either party to redo work.' },
      ],
    ],
    footText: [
      { kind: 'strong', text: 'Status:' },
      { kind: 'text', text: ' Stefan acknowledged Apr 30 17:42 CET. ' },
      { kind: 'strong', text: "Tomás's ack pending" },
      { kind: 'text', text: ' — last seen 4h ago. Auto-locks at SLA breach (May 1, 14:08 CET) if not contested.' },
    ],
    forceLockLabel: 'Force-lock decision now →',
  },
  auditLog: {
    statusText: 'Visible only to admin · neither party can see',
    adminOnly: true,
    adminOnlyLabel: 'ADMIN-ONLY',
    headTitle: 'Investigation activity · who did what',
    headMeta: '14 actions over 6 days · all timestamps in CET',
    days: [
      {
        dateLabel: 'Today · April 30, 2026', countLabel: '3 events',
        entries: [
          { time: '5:42 PM', verb: 'Decision drafted', target: '40/60 split proposed', details: '$1,700 refund to client · $2,550 released to candidate', refId: 'DSP-DEC-2026-0144-D1', tagLabel: 'DECISION', tagVariant: 'default' },
          { time: '5:38 PM', verb: 'Notes updated', target: 'Daniel Kovács (spec-001)', details: 'Final analysis added · 412 words · CI/CD as clear gap, rest as ambiguity', tagLabel: 'NOTES', tagVariant: 'default' },
          { time: '10:14 AM', verb: 'SLA warning fired', target: 'Stage-3 ≤ 24h to breach', details: 'Auto-notification sent to Daniel · CC: Aïsha (admin) · escalation timer started', tagLabel: 'SLA', tagVariant: 'default' },
        ],
      },
      {
        dateLabel: 'April 29, 2026', countLabel: '3 events',
        entries: [
          { time: '4:18 PM', verb: 'Joint mediation call held', target: 'all 3 parties + Daniel', details: '52 minutes · recording in evidence · both parties present · no resolution but constructive', refId: 'CALL-2026-0144-J1', tagLabel: 'CALL', tagVariant: 'default' },
          { time: '11:48 AM', verb: '1-on-1 call · Tomás', target: '28 min · scope discussion', details: 'Tomás stuck on $850 figure but acknowledges CI/CD gap · open to higher number with rationale', tagLabel: 'CALL', tagVariant: 'default' },
          { time: '9:08 AM', verb: 'Slack thread reviewed', target: 'Apr 12 IAM-defer key exchange', details: 'Daniel flagged the Apr 12 14:42 + 14:48 messages as decisional · "per-service IAM with rotation" specifically', tagLabel: 'REVIEW', tagVariant: 'default' },
        ],
      },
      {
        dateLabel: 'Apr 27–28, 2026', countLabel: '5 events',
        entries: [
          { time: 'Apr 28', verb: '1-on-1 call · Stefan', target: '34 min · scope walkthrough', details: "Stefan willing to come down from 60% if Daniel's rationale is sound · open to 40% if CI/CD is treated as Tomás's gap", tagLabel: 'CALL', tagVariant: 'default' },
          { time: 'Apr 28', verb: 'Stage 2 mediation closed', target: '5-bday SLA elapsed without resolution', details: 'Auto-escalated to Stage 3 (Specialist decision) · Daniel assumes decision-maker role', tagLabel: 'STAGE', tagVariant: 'default' },
          { time: 'Apr 27', verb: 'All 9 evidence items reviewed', target: '8 from parties + 1 system', details: 'Time-tracker logs · Git history · Slack export · all 4 PDFs · 3 screenshots · external consultant declined', tagLabel: 'REVIEW', tagVariant: 'default' },
          { time: 'Apr 28', verb: 'Mediator (Stage 2)', target: 'Lukas C. (T&S team)', details: 'Held 2-hour facilitated discussion · neither party budged · constructive but not resolutive', refId: 'MED-2026-0144', tagLabel: 'MEDIATION', tagVariant: 'signin', dataCat: 'signin' },
          { time: 'Apr 27', verb: 'Stage 1 closed', target: '48h direct-resolution elapsed', details: 'Parties did not reach agreement in-thread · auto-escalated to Stage 2 (Mediation)', tagLabel: 'STAGE', tagVariant: 'default' },
        ],
      },
      {
        dateLabel: 'Apr 24–25, 2026', countLabel: '3 events',
        entries: [
          { time: 'Apr 25', verb: 'Respondent filed', target: 'Tomás Oliveira', details: '$850 counter-offer · 4 evidence files attached · within 24h response window', tagLabel: 'FILED', tagVariant: 'default' },
          { time: 'Apr 24', verb: 'Specialist auto-assigned', target: 'Daniel Kovács (existing eng-004 owner)', details: 'Routing rule: dispute owner = engagement specialist · no manual reassignment', tagLabel: 'ROUTING', tagVariant: 'default' },
          { time: 'Apr 24', verb: 'Dispute opened', target: 'Stefan Müller (claimant)', details: 'Filed via in-thread Dispute control · 5 evidence files · escrow milestone-2 auto-paused at $4,250', refId: 'DSP-2026-0144 created', tagLabel: 'CREATED', tagVariant: 'override', dataCat: 'override' },
        ],
      },
    ],
    escalationBanner: {
      variant: 'amber',
      label: 'REASONS FOR PENDING ESCALATION',
      paragraphs: [
        [
          { kind: 'strong', text: 'If Tomás contests the proposed decision' },
          { kind: 'text', text: " (he has 36h to do so), the case auto-escalates to Stage 4 (Admin decision) — which lands on your desk. Tomás's $850 counter is significantly below Daniel's $2,550 candidate-side proposal, but Daniel's split arguably gives Tomás more than he asked for ($2,550 vs his $1,700 = $850 counter-implied). " },
          { kind: 'strong', text: 'Likelihood of escalation:' },
          { kind: 'text', text: ' low (≤25%). Stefan has already acknowledged.' },
        ],
      ],
    },
  },
  linkedContext: {
    statusText: 'Engagement, parties, and history',
    cards: [
      {
        role: 'ENGAGEMENT',
        avatarKind: 'icon',
        avatarGradient: 'linear-gradient(135deg, #DCA294, #8B4F47)',
        iconKind: 'file',
        name: 'eng-004 · DevOps fixed-price',
        meta: '$8,500 total · $4,250 escrow held · paused since dispute',
        href: '/admin/operations/engagements/eng-004',
        actionKey: 'open-engagement',
      },
      {
        role: 'CLIENT (CLAIMANT)',
        avatarKind: 'initials',
        avatarGradient: 'linear-gradient(135deg, #C9C2A4, #7A745A)',
        initials: 'SB',
        name: 'Studio Berlin',
        realChip: 'REAL: ATELIER WERKRAUM',
        meta: 'cl-002 · Berlin DE · 1 prior dispute (resolved) · KYB verified',
        href: '/admin/users/clients/cl-002-7e1b3f',
        actionKey: 'open-client',
      },
      {
        role: 'CANDIDATE (RESPONDENT)',
        avatarKind: 'initials',
        avatarGradient: 'linear-gradient(135deg, #B5C7A8, #5C7A4D)',
        initials: 'TO',
        name: 'Tomás Oliveira',
        meta: 'cand-019 · Lisbon PT · 4 lifetime hires · 0 prior disputes',
        href: '/admin/users/candidates/cand-019',
        actionKey: 'open-candidate',
      },
      {
        role: 'OWNING SPECIALIST',
        avatarKind: 'initials',
        avatarGradient: 'linear-gradient(135deg, #7BA8D9, #3F6CA1)',
        initials: 'DK',
        name: 'Daniel Kovács',
        meta: 'spec-001 · Engineering specialist · 4.6/5 audit rating · 12 disputes/yr avg',
        href: '/admin/users/specialists/spec-001',
        actionKey: 'open-specialist',
      },
    ],
  },
};

// ============================================================
// Stub detail data for the 9 non-canonical fixtures (placeholders for Phase 12b)
// ============================================================

function stubProfile(row: DisputeListRow): DisputeProfile {
  const stageNum = row.status === 'open' ? 1
    : row.status === 'mediation' ? 2
      : row.status === 'progress' ? 3
        : row.status === 'escalated' ? 4
          : row.status === 'resolved' ? 5
            : 3; // urgent
  const stagesBase = ['Claim filed', 'Response received', 'Specialist deciding', 'Decision delivered', 'Resolved'];
  const stages: DisputeStage[] = stagesBase.map((label, idx) => {
    const n = idx + 1;
    let state: DisputeStageState;
    if (n < stageNum) state = 'done';
    else if (n === stageNum) state = 'current';
    else state = 'pending';
    return { num: String(n), state, label, meta: state === 'done' ? '✓' : state === 'current' ? 'now' : '—' };
  });

  const bannerVariant: DisputeHeroBanner['variant'] =
    row.status === 'urgent' ? 'danger' : row.status === 'resolved' ? 'success' : 'amber';

  // Build a minimal party preset from row data
  const claimantParty: DisputeParty = {
    id: 'cl-stub', name: row.partyA,
    avatarInitials: row.partyA.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase(),
    avatarGradient: 'linear-gradient(135deg, #C9C2A4, #7A745A)',
    metaTrail: row.pairSecondary,
  };
  const respondentParty: DisputeParty = {
    id: 'cand-stub', name: row.partyB,
    avatarInitials: row.partyB.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase(),
    avatarGradient: 'linear-gradient(135deg, #B5C7A8, #5C7A4D)',
    metaTrail: row.pairSecondary,
  };

  const profile: DisputeProfile = {
    id: row.id,
    atlasId: row.atlasId,
    status: row.status,
    statusPillVariant: row.statusPillVariant,
    statusPillText: row.statusPillText,
    slaBadge: row.sla,
    openedMeta: `${row.elapsedSub} · ${row.elapsedLabel} elapsed`,
    titlePrefix: `${row.reasonTagLabel} dispute · `,
    titleItalic: row.partyA,
    titleSuffix: ` ↔ ${row.partyB}`,
    claimant: claimantParty,
    respondent: respondentParty,
    contextMeta: `· ${row.pairSecondary}`,
    heroStats: [
      { label: 'Claimant', value: row.partyA, valueSize: 'sm', meta: row.pairSecondary },
      { label: 'Respondent', value: row.partyB, valueSize: 'sm', meta: row.pairSecondary },
      { label: 'Reason', value: row.reasonTagLabel, valueSize: 'sm', meta: row.reasonCategory },
      { label: 'Elapsed', value: row.elapsedLabel, valueSize: 'sm', meta: row.elapsedSub },
      { label: 'Owner', value: row.owner.name, valueSize: 'sm', meta: row.statusPillText },
    ],
    banner: {
      variant: bannerVariant,
      title: `${row.statusPillText}.`,
      meta: row.statusSub,
    },
    stageTracker: {
      headLabel: 'DISPUTE LIFECYCLE · 5 STAGES',
      metaPrefix: 'Currently at stage ',
      metaEmphasis: `${stageNum} of 5`,
      metaSuffix: '',
      stages,
    },
    quickFacts: [
      { dt: 'Dispute ID', dd: row.atlasId },
      { dt: 'Stage', dd: `${stageNum} of 5`, ddColor: 'super' },
      { dt: 'Reason', dd: row.reasonTagLabel },
      { dt: 'Owner', dd: row.owner.name },
      { dt: 'Elapsed', dd: row.elapsedLabel },
    ],
    tocMetas: {
      claim: '—', response: '—', investigation: '—',
      decision: stageNum >= 4 ? 'Done' : 'Pending',
      audit: '—', linked: '—',
    },
    tocOkFlags: {
      claim: true,
      response: stageNum >= 2,
      investigation: stageNum >= 3,
      decision: stageNum >= 4,
      audit: true,
      linked: !!row.linkedEngagementId,
    },
    tocMetaVariants: {},
    // Phase 12b stub sections
    claim: {
      statusText: `Filed by claimant · ${row.elapsedSub.replace(/^opened /, '')}`,
      tagText: 'CLAIMANT',
      tagVariant: 'claimant',
      headVariant: 'claim',
      title: `${row.partyA}'s claim`,
      filedMeta: row.elapsedSub,
      byline: {
        initials: row.partyA.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase(),
        gradient: 'linear-gradient(135deg, #C9C2A4, #7A745A)',
        name: row.partyA,
        role: row.pairSecondary,
      },
      reasonCategoryLabel: row.reasonTagLabel,
      reasonCategoryMeta: 'per Atlas dispute category',
      bodyParagraphs: [
        [{ kind: 'text', text: `Claim filed regarding ${row.reasonTagLabel.toLowerCase()} on ${row.pairSecondary}.` }],
      ],
      quote: { text: '"(stub claim — Phase 12b detail data only canonical for dsp-144)"', cite: `— ${row.partyA}` },
      amount: { label: 'CLAIMED AMOUNT', value: '—', suffix: '' },
      evidenceHead: 'EVIDENCE SUBMITTED · STUB',
      evidence: [],
    },
    response: {
      statusText: stageNum >= 2 ? 'Filed · stub data' : 'Not yet filed',
      tagText: 'RESPONDENT',
      tagVariant: 'respondent',
      headVariant: 'response',
      title: `${row.partyB}'s response`,
      filedMeta: 'Stub data — canonical only for dsp-144',
      byline: {
        initials: row.partyB.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase(),
        gradient: 'linear-gradient(135deg, #B5C7A8, #5C7A4D)',
        name: row.partyB,
        role: row.pairSecondary,
      },
      bodyParagraphs: [[{ kind: 'text', text: '(Stub response — Phase 12b detail data only canonical for dsp-144.)' }]],
      quote: { text: '"(stub)"', cite: `— ${row.partyB}` },
      amount: { label: 'COUNTER-OFFER', value: '—', suffix: '' },
      evidenceHead: 'RESPONDENT EVIDENCE · STUB',
      evidence: [],
    },
    investigation: {
      statusText: `${row.owner.name} · ${row.elapsedLabel} · stub`,
      headTitle: `${row.owner.name}'s investigation workspace`,
      headMeta: 'Editable until decision locked',
      notesLabel: "SPECIALIST'S NOTES",
      notesText: '(Stub notes — canonical only for dsp-144.)',
      reviewLabel: 'EVIDENCE REVIEWED · STUB',
      reviewItems: [],
      convoLabel: 'CONVERSATIONS',
      convoText: [{ kind: 'text', text: 'Stub data.' }],
      convoCardHeadTitle: 'Key conversation excerpts',
      convoCardHeadMeta: 'stub · 0 messages',
      convoMsgs: [],
    },
    decision: {
      statusText: stageNum >= 4 ? 'Drafted · stub data' : 'No decision yet',
      headTitle: 'Proposed split (stub)',
      signatureState: stageNum >= 4 ? 'draft' : 'draft',
      signatureBadgeText: stageNum >= 4 ? 'DRAFT · NOT LOCKED' : 'PENDING',
      allocations: {
        client: { tagLabel: 'CLIENT REFUND', tagVariant: 'client', name: row.partyA, amount: '—', amountSign: 'neg', meta: 'Stub — no decision data' },
        candidate: { tagLabel: 'CANDIDATE PAYOUT', tagVariant: 'candidate', name: row.partyB, amount: '—', amountSign: 'pos', meta: 'Stub — no decision data' },
      },
      rationaleLabel: 'RATIONALE',
      rationaleParagraphs: [[{ kind: 'text', text: '(Stub rationale — canonical only for dsp-144.)' }]],
      footText: [{ kind: 'text', text: 'Stub foot text.' }],
      forceLockLabel: 'Force-lock decision now →',
    },
    auditLog: {
      statusText: 'Visible only to admin · neither party can see',
      adminOnly: true,
      adminOnlyLabel: 'ADMIN-ONLY',
      headTitle: 'Investigation activity (stub)',
      headMeta: 'Stub audit · canonical only for dsp-144',
      days: [
        {
          dateLabel: row.elapsedSub,
          countLabel: '1 event',
          entries: [
            { time: 'now', verb: 'Dispute opened', target: row.partyA, details: row.pairSecondary, tagLabel: 'CREATED', tagVariant: 'override', dataCat: 'override' },
          ],
        },
      ],
      escalationBanner: {
        variant: 'amber',
        label: 'STUB BANNER',
        paragraphs: [[{ kind: 'text', text: '(Canonical audit detail only for dsp-144.)' }]],
      },
    },
    linkedContext: {
      statusText: 'Engagement, parties, and history',
      cards: [
        ...(row.linkedEngagementId ? [{
          role: 'ENGAGEMENT',
          avatarKind: 'icon' as const,
          avatarGradient: 'linear-gradient(135deg, #DCA294, #8B4F47)',
          iconKind: 'file' as const,
          name: row.linkedEngagementId,
          meta: row.pairSecondary,
          href: `/admin/operations/engagements/${row.linkedEngagementId}`,
          actionKey: 'open-engagement',
        }] : []),
        {
          role: row.status === 'urgent' ? 'CLIENT (CLAIMANT)' : 'CLAIMANT',
          avatarKind: 'initials' as const,
          avatarGradient: 'linear-gradient(135deg, #C9C2A4, #7A745A)',
          initials: row.partyA.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase(),
          name: row.partyA,
          meta: row.pairSecondary,
          href: '#',
          actionKey: 'open-claimant',
        },
        {
          role: 'RESPONDENT',
          avatarKind: 'initials' as const,
          avatarGradient: 'linear-gradient(135deg, #B5C7A8, #5C7A4D)',
          initials: row.partyB.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase(),
          name: row.partyB,
          meta: row.pairSecondary,
          href: '#',
          actionKey: 'open-respondent',
        },
        {
          role: 'OWNING ' + (row.owner.isAdmin ? 'ADMIN' : 'SPECIALIST'),
          avatarKind: 'initials' as const,
          avatarGradient: row.owner.variant === 'ad' ? 'var(--ink)' : 'linear-gradient(135deg, #7BA8D9, #3F6CA1)',
          initials: row.owner.initials,
          name: row.owner.name,
          meta: `${row.statusPillText} · stub`,
          href: '#',
          actionKey: 'open-owner',
        },
      ],
    },
  };
  if (row.linkedEngagementId) {
    profile.linkedEngagementId = row.linkedEngagementId;
  }
  return profile;
}

// ============================================================
// LIST ROWS — verbatim per admin.html lines 23530-23688
// ============================================================

// admin.html line 23531
const ROW_148: DisputeListRow = {
  id: 'dsp-148',
  atlasId: 'DSP-2026-0148',
  status: 'urgent',
  statusPillVariant: 'disp-urgent',
  statusPillText: 'Urgent',
  statusSub: 'T&S flagged · escalation auto',
  reasonCategory: 'conduct',
  reasonTagLabel: 'Conduct & Safety',
  partyA: 'Vorona Capital',
  partyB: 'Marcus Reyes',
  pairSecondary: 'eng-219-vor · harassment claim',
  pairSecondaryIsReal: false,
  elapsedLabel: '1d 4h',
  elapsedSub: 'opened yesterday 3:42 AM',
  sla: { variant: 'danger', text: '4h left' },
  slaSub: 'priority track',
  owner: OWNER_AISHA,
  rowVariant: 'urgent',
  linkedEngagementId: 'eng-219-vor',
};

// admin.html line 23547
const ROW_144: DisputeListRow = {
  id: 'dsp-144',
  atlasId: 'DSP-2026-0144',
  status: 'progress',
  statusPillVariant: 'disp-progress',
  statusPillText: 'Specialist deciding',
  statusSub: 'decision drafted · awaiting ack',
  reasonCategory: 'quality',
  reasonTagLabel: 'Work Quality',
  partyA: 'Studio Berlin',
  partyB: 'Tomás Oliveira',
  pairSecondary: 'Real: Atelier Werkraum · eng-004 · $4,250 escrow held',
  pairSecondaryIsReal: true,
  elapsedLabel: '6d 14h',
  elapsedSub: 'opened Apr 24 · stage 3',
  sla: { variant: 'warn', text: '1d left' },
  slaSub: 'stage-3 SLA: 7 bdays',
  owner: OWNER_DK,
  linkedEngagementId: 'eng-004',
};

// admin.html line 23563
const ROW_135: DisputeListRow = {
  id: 'dsp-135',
  atlasId: 'DSP-2026-0135',
  status: 'escalated',
  statusPillVariant: 'disp-escalated',
  statusPillText: 'Escalated to admin',
  statusSub: 'spec → admin Apr 27',
  reasonCategory: 'ip',
  reasonTagLabel: 'IP Ownership',
  partyA: 'Bauhaus Robotics GmbH',
  partyB: 'Yuki Tanaka',
  pairSecondary: 'eng-178-bhr · IP carve-out dispute',
  pairSecondaryIsReal: false,
  elapsedLabel: '11d 2h',
  elapsedSub: 'opened Apr 19 · stage 4',
  sla: { variant: 'warn', text: '2d left' },
  slaSub: 'stage-4 SLA: 5 bdays',
  owner: OWNER_AISHA,
  rowVariant: 'escalated',
};

// admin.html line 23579
const ROW_157: DisputeListRow = {
  id: 'dsp-157',
  atlasId: 'DSP-2026-0157',
  status: 'mediation',
  statusPillVariant: 'disp-mediation',
  statusPillText: 'In mediation',
  statusSub: 'stage 2 · facilitator joined',
  reasonCategory: 'commun',
  reasonTagLabel: 'Communication',
  partyA: 'Helsinki Data Oy',
  partyB: 'Anna Kallio',
  pairSecondary: 'eng-006 · paused engagement · expectations gap',
  pairSecondaryIsReal: false,
  elapsedLabel: '2d 8h',
  elapsedSub: 'opened Apr 28 · stage 2',
  sla: { variant: 'ok', text: '3d left' },
  slaSub: 'stage-2 SLA: 5 bdays',
  owner: OWNER_LC,
};

// admin.html line 23595
const ROW_151: DisputeListRow = {
  id: 'dsp-151',
  atlasId: 'DSP-2026-0151',
  status: 'progress',
  statusPillVariant: 'disp-progress',
  statusPillText: 'Specialist deciding',
  statusSub: 'decision in 24h',
  reasonCategory: 'refund',
  reasonTagLabel: 'Refund Request',
  partyA: 'Solar Rio Energia',
  partyB: 'Ricardo Almeida',
  pairSecondary: 'eng-005 · partial refund req · $720',
  pairSecondaryIsReal: false,
  elapsedLabel: '3d 6h',
  elapsedSub: 'opened Apr 27 · stage 3',
  sla: { variant: 'ok', text: '4d left' },
  slaSub: 'stage-3 SLA: 7 bdays',
  owner: OWNER_MV,
};

// admin.html line 23611
const ROW_119: DisputeListRow = {
  id: 'dsp-119',
  atlasId: 'DSP-2026-0119',
  status: 'escalated',
  statusPillVariant: 'disp-escalated',
  statusPillText: 'Escalated to admin',
  statusSub: "specialist couldn't reach candidate",
  reasonCategory: 'noshow',
  reasonTagLabel: 'No-show',
  partyA: 'Andina Telecom S.A.',
  partyB: 'Carlos Beltrán',
  pairSecondary: 'eng-201-and · candidate no-show · 5 missed deadlines',
  pairSecondaryIsReal: false,
  elapsedLabel: '8d 11h',
  elapsedSub: 'opened Apr 22 · stage 4',
  sla: { variant: 'ok', text: '3d left' },
  slaSub: 'stage-4 SLA: 5 bdays',
  owner: OWNER_AISHA,
  rowVariant: 'escalated',
};

// admin.html line 23627
const ROW_162: DisputeListRow = {
  id: 'dsp-162',
  atlasId: 'DSP-2026-0162',
  status: 'open',
  statusPillVariant: 'disp-open',
  statusPillText: 'Direct resolution',
  statusSub: 'stage 1 · parties self-resolving',
  reasonCategory: 'quality',
  reasonTagLabel: 'Work Quality',
  partyA: 'Studio Berlin',
  partyB: 'Adesuwa Babatunde',
  pairSecondary: 'Real: Atelier Werkraum · eng-001 · $290 partial refund req',
  pairSecondaryIsReal: true,
  elapsedLabel: '12h',
  elapsedSub: 'opened today 8:14 AM',
  sla: { variant: 'ok', text: '36h left' },
  slaSub: 'stage-1 SLA: 48h',
  owner: OWNER_DK,
};

// admin.html line 23643
const ROW_167: DisputeListRow = {
  id: 'dsp-167',
  atlasId: 'DSP-2026-0167',
  status: 'open',
  statusPillVariant: 'disp-open',
  statusPillText: 'Direct resolution',
  statusSub: 'stage 1 · within 7-day lock',
  reasonCategory: 'hours',
  reasonTagLabel: 'Hours Tracking',
  partyA: 'Northwind Robotics',
  partyB: 'Lukas Heinrich',
  pairSecondary: 'eng-002 · 4h adjustment contested · $288',
  pairSecondaryIsReal: false,
  elapsedLabel: '6h',
  elapsedSub: 'opened today 2:18 PM',
  sla: { variant: 'ok', text: '42h left' },
  slaSub: 'stage-1 SLA: 48h',
  owner: OWNER_DK,
};

// admin.html line 23659
const ROW_089: DisputeListRow = {
  id: 'dsp-089',
  atlasId: 'DSP-2026-0089',
  status: 'resolved',
  statusPillVariant: 'disp-resolved',
  statusPillText: 'Resolved',
  statusSub: 'closed Apr 27 · 100% to candidate',
  reasonCategory: 'payment',
  reasonTagLabel: 'Payment',
  partyA: 'Patagonia Mining',
  partyB: 'Valentina Kraft',
  pairSecondary: "eng-003 · payout delay · resolved candidate's favor",
  pairSecondaryIsReal: false,
  elapsedLabel: '22d (closed)',
  elapsedSub: 'opened Apr 8 · 5d to resolve',
  sla: { variant: 'done', text: 'Within SLA' },
  owner: OWNER_MV,
};

// admin.html line 23675
const ROW_103: DisputeListRow = {
  id: 'dsp-103',
  atlasId: 'DSP-2026-0103',
  status: 'resolved',
  statusPillVariant: 'disp-resolved',
  statusPillText: 'Resolved',
  statusSub: '$840 refund to client · $560 to candidate',
  reasonCategory: 'hours',
  reasonTagLabel: 'Hours Tracking',
  partyA: 'Cinélux Studios',
  partyB: 'Théo Lemaire',
  pairSecondary: 'Real: SAS Lumière · eng-198-cnx · 60/40 split refund',
  pairSecondaryIsReal: true,
  elapsedLabel: '14d (closed)',
  elapsedSub: 'opened Apr 12 · 8d to resolve',
  sla: { variant: 'done', text: 'Within SLA' },
  owner: OWNER_SR,
};

const LIST_ROWS: DisputeListRow[] = [
  ROW_148, ROW_144, ROW_135, ROW_157, ROW_151,
  ROW_119, ROW_162, ROW_167, ROW_089, ROW_103,
];

// ============================================================
// PROFILES MAP
// ============================================================

export const DISPUTE_PROFILES: Record<string, DisputeProfile> = {
  'dsp-144': DSP_144,
  'dsp-148': stubProfile(ROW_148),
  'dsp-135': stubProfile(ROW_135),
  'dsp-157': stubProfile(ROW_157),
  'dsp-151': stubProfile(ROW_151),
  'dsp-119': stubProfile(ROW_119),
  'dsp-162': stubProfile(ROW_162),
  'dsp-167': stubProfile(ROW_167),
  'dsp-089': stubProfile(ROW_089),
  'dsp-103': stubProfile(ROW_103),
};

// ============================================================
// PAGE DATA — verbatim per admin.html lines 23454-23507
// ============================================================

export const DISPUTES_PAGE_DATA: DisputesPageData = {
  pageMeta: '/admin/operations/disputes · 47 total · 12 escalated to admin · 3 SLA at risk · 1 urgent (T&S)',
  stats: [
    { label: 'Open disputes', value: '47', vSuffix: 'total', meta: '12 in mediation · 19 specialist · 12 admin · 4 just opened' },
    { label: 'SLA at risk', value: '3', vSuffix: 'disputes', meta: '≤ 1 day until breach · prioritize', metaVariant: 'warn' },
    { label: 'Escalated to admin', value: '12', vSuffix: 'on your desk', meta: 'avg 9 days in admin queue · 4 awaiting your decision' },
    { label: 'Resolved this month', value: '38', vSuffix: 'disputes', delta: { variant: 'up', text: '↑6%' }, meta: 'avg resolution: 6.4 days · 78% within SLA' },
  ],
  filterChips: [
    { key: 'all', label: 'All', count: 10 },
    { key: 'open', label: 'Open', count: 2 },
    { key: 'progress', label: 'In progress', count: 3 },
    { key: 'escalated', label: 'Escalated to admin', count: 2 },
    { key: 'urgent', label: 'Urgent', count: 1 },
    { key: 'resolved', label: 'Resolved', count: 2 },
    { key: 'sla-risk', label: 'SLA at risk', count: 2 },
  ],
  listRows: LIST_ROWS,
  totalCount: 47,
  sectionLabel: 'Dispute roster · sorted oldest first (preserves SLA)',
  sectionLabelMeta: 'Showing 10 of 47 · click any row for full investigation',
  footerLabel: '10 of 47 disputes shown · canonical sample with realistic variety · sorted oldest-first',
  loadMoreLabel: 'Load more (37 remaining) →',
};
