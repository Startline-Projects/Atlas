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
