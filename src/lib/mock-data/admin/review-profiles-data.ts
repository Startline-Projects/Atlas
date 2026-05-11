/**
 * Phase 13a — Reviews data
 *
 * 10 review fixtures sourced VERBATIM from admin.html lines 36981-37189 (list rows)
 * + lines 37229-37992 (detail view for rev-834 canonical).
 *
 * Canonical detail: rev-834 (Marina V. / A2Z Solutions Ltd × Adesuwa Babatunde,
 * sock-puppet pattern, 4th of 4 in cluster, 87% AI confidence).
 *
 * Cross-link map (verified):
 *   Real targets: cand-001, cand-007, spec-001, cl-002-7e1b3f, eng-001, eng-002
 *   404 graceful: cand-014/018/019/022/025/031, cl-019/031/068/091/167/178,
 *                 eng-122-lun, eng-156-pat, eng-198-cnx, eng-198-stb,
 *                 eng-201-and, eng-219-vor, eng-243-a2z, eng-247-a2z
 */

import type { AdminStatTile } from './admin-profiles-data';

// ============================================================
// TYPES
// ============================================================

export type ReviewStatus = 'live' | 'flagged' | 'pattern' | 'removed' | 'appealed';

export type ReviewStatusPillVariant =
  | 'rv-live'
  | 'rv-flagged'
  | 'rv-pattern'
  | 'rv-removed'
  | 'rv-appealed';

export type ReviewDirection = 'cs' | 'cl';
export type ReviewDirectionChip = 'cs' | 'cl';
export type ReviewRowVariant = 'pattern' | 'flagged' | 'removed';

export type ReviewFilterKey = 'all' | 'live' | 'flagged' | 'pattern' | 'removed' | 'appealed';
export type ReviewDirectionFilterKey = 'all' | 'cs' | 'cl';

export interface ReviewPartyRef {
  id: string;
  name: string;
  directionChip?: ReviewDirectionChip;
  metaText: string;
  metaIsReal: boolean;
  avatarInitials: string;
  avatarGradient: string;
}

export interface ReviewListRow {
  id: string;
  atlasId: string;
  status: ReviewStatus;
  statusPillVariant: ReviewStatusPillVariant;
  statusPillText: string;
  statusSub: string;
  direction: ReviewDirection;
  reviewer: ReviewPartyRef;
  reviewee: ReviewPartyRef;
  revieweeEngContext: string;
  snippet: string;
  rating: number;
  postedDate: string;
  postedRelative: string;
  rowVariant?: ReviewRowVariant;
  linkedEngagementId?: string;
}

export interface ReviewHeroStat {
  label: string;
  value: string;
  valueColor?: 'danger' | 'warn' | 'success';
  meta: string;
}

export interface ReviewHeroBanner {
  variant: 'amber' | 'danger' | 'success' | 'neutral';
  title: string;
  meta: string;
}

export interface ReviewHeroParty {
  initials: string;
  gradient: string;
  name: string;
  realChip?: string;
  atlasChip?: string;
}

export type ReviewQuickFactColor = 'super' | 'amber' | 'success' | 'danger' | 'mute-strike';

export interface ReviewQuickFact {
  dt: string;
  dd: string;
  ddColor?: ReviewQuickFactColor;
  ddBold?: boolean;
}

export interface ReviewerSnapshotStat {
  label: string;
  value: string;
  valueColor?: 'danger' | 'warn' | 'success';
}

export interface ReviewerSnapshotPanel {
  initials: string;
  gradient: string;
  name: string;
  realLabel?: string;
  metaLine: string;
  stats: ReviewerSnapshotStat[];
  actionLabel: string;
  actionHref: string;
}

export type ReviewTocMetaVariant = 'success' | 'warn' | 'danger' | 'default';
export type ReviewSectionStatusVariant = 'warn' | 'danger' | 'default' | 'neutral';

export interface ReviewSectionStatus {
  statusText: string;
  statusVariant: ReviewSectionStatusVariant;
}

export interface ReviewProfile {
  id: string;
  atlasId: string;
  status: ReviewStatus;
  statusPillVariant: ReviewStatusPillVariant;
  statusPillText: string;
  direction: ReviewDirection;
  directionChipLabel: string;
  postedMetaLine: string;
  title: { prefix: string; italic: string; suffix: string };
  reviewerHero: ReviewHeroParty;
  revieweeHero: ReviewHeroParty;
  engagementContextLine: string;
  rating: number;
  ratingNum: string;
  heroStats: ReviewHeroStat[];
  banner: ReviewHeroBanner;
  sections: {
    content: ReviewSectionStatus;
    context: ReviewSectionStatus;
    pattern: ReviewSectionStatus;
    flags: ReviewSectionStatus;
    moderation: ReviewSectionStatus;
    audit: ReviewSectionStatus;
  };
  tocMetas: { content: string; context: string; pattern: string; flags: string; moderation: string; audit: string };
  tocMetaVariants: Partial<
    Record<'content' | 'context' | 'pattern' | 'flags' | 'moderation' | 'audit', ReviewTocMetaVariant>
  >;
  reviewerSnapshot: ReviewerSnapshotPanel;
  quickFacts: ReviewQuickFact[];
  linkedEngagementId?: string;
  linkedClientId?: string;
  linkedCandidateId?: string;
  linkedSpecialistId?: string;
}

export interface ReviewsFilterChip {
  key: ReviewFilterKey;
  label: string;
  count: number;
}

export interface ReviewsDirectionTab {
  key: ReviewDirectionFilterKey;
  label: string;
  count: number;
}

export interface ReviewsPageData {
  pageMeta: string;
  stats: AdminStatTile[];
  directionTabs: ReviewsDirectionTab[];
  filterChips: ReviewsFilterChip[];
  listRows: ReviewListRow[];
  totalCount: number;
  sectionLabel: string;
  sectionLabelMeta: string;
  footerLabel: string;
  loadMoreLabel: string;
}

// ============================================================
// AVATAR GRADIENT PRESETS
// ============================================================

const GR_MARINA = 'linear-gradient(135deg, #B8A0C9, #6E4F8B)';
const GR_ADESUWA = 'linear-gradient(135deg, #C9A87A, #6E4F2F)';
const GR_MARCUS = 'linear-gradient(135deg, #DCA294, #8B4F47)';
const GR_TOMAS = 'linear-gradient(135deg, #B5C7A8, #5C7A4D)';
const GR_VORONA = 'linear-gradient(135deg, #9CC9C2, #4D8A82)';
const GR_STEFAN = 'linear-gradient(135deg, #C9C2A4, #7A745A)';
const GR_CARLOS = 'linear-gradient(135deg, #D9A77F, #8B5A3C)';
const GR_DANIEL = 'linear-gradient(135deg, #7BA8D9, #3F6CA1)';
const GR_LUNA = 'linear-gradient(135deg, #C2A8E8, #8B5FB8)';
const GR_LUKAS = 'linear-gradient(135deg, #F0CC4F, #E8911E)';
const GR_NORTHWIND = 'linear-gradient(135deg, #B8C8DC, #5C7494)';
const GR_ANDREI = 'linear-gradient(135deg, #C9783F, #6E3818)';
const GR_VALENTINA = 'linear-gradient(135deg, #E0B89D, #9C6645)';
const GR_EMILIE = 'linear-gradient(135deg, #DCBFA8, #8B6F50)';
const GR_THEO = 'linear-gradient(135deg, #A8C9B5, #4D7A5C)';

// ============================================================
// 10 LIST-ROW FIXTURES (verbatim per admin.html L36981-37189)
// ============================================================

const ROW_834: ReviewListRow = {
  id: 'rev-834',
  atlasId: 'REV-2026-0834',
  status: 'pattern',
  statusPillVariant: 'rv-pattern',
  statusPillText: 'Pattern · sock-puppet',
  statusSub: '4th of 4 in cluster · 89% sim',
  direction: 'cs',
  reviewer: {
    id: 'cl-178', name: 'Marina V.', directionChip: 'cl',
    metaText: 'Real: A2Z Solutions Ltd · cl-178', metaIsReal: true,
    avatarInitials: 'MV', avatarGradient: GR_MARINA,
  },
  reviewee: {
    id: 'cand-001', name: 'Adesuwa Babatunde',
    metaText: 'cand-001 · Senior Full-Stack · eng-247-a2z', metaIsReal: false,
    avatarInitials: 'AB', avatarGradient: GR_ADESUWA,
  },
  revieweeEngContext: 'cand-001 · Senior Full-Stack · eng-247-a2z',
  snippet: 'Their lack of professionalism made this engagement extremely difficult — communication issues, missed details, would not recommend to other serious clients.',
  rating: 1.0,
  postedDate: 'Apr 30, 16:42',
  postedRelative: '5 days ago · ⚑ today',
  rowVariant: 'pattern',
  linkedEngagementId: 'eng-247-a2z',
};

const ROW_815: ReviewListRow = {
  id: 'rev-815',
  atlasId: 'REV-2026-0815',
  status: 'pattern',
  statusPillVariant: 'rv-pattern',
  statusPillText: 'Pattern · sock-puppet',
  statusSub: '3rd of 4 in cluster · 84% sim',
  direction: 'cs',
  reviewer: {
    id: 'cl-178', name: 'Marina V.', directionChip: 'cl',
    metaText: 'Real: A2Z Solutions Ltd · cl-178', metaIsReal: true,
    avatarInitials: 'MV', avatarGradient: GR_MARINA,
  },
  reviewee: {
    id: 'cand-018', name: 'Marcus Reyes',
    metaText: 'cand-018 · DevOps Engineer · eng-243-a2z', metaIsReal: false,
    avatarInitials: 'MR', avatarGradient: GR_MARCUS,
  },
  revieweeEngContext: 'cand-018 · DevOps Engineer · eng-243-a2z',
  snippet: 'A clear lack of professionalism throughout the project — disappointing communication, would not work with again.',
  rating: 1.0,
  postedDate: 'Apr 29, 11:18',
  postedRelative: '6 days ago',
  rowVariant: 'pattern',
  linkedEngagementId: 'eng-243-a2z',
};

const ROW_840: ReviewListRow = {
  id: 'rev-840',
  atlasId: 'REV-2026-0840',
  status: 'flagged',
  statusPillVariant: 'rv-flagged',
  statusPillText: 'Flagged',
  statusSub: 'user-reported · retaliatory?',
  direction: 'cl',
  reviewer: {
    id: 'cand-019', name: 'Tomás Oliveira', directionChip: 'cs',
    metaText: 'cand-019 · DevOps Engineer', metaIsReal: false,
    avatarInitials: 'TO', avatarGradient: GR_TOMAS,
  },
  reviewee: {
    id: 'cl-167', name: 'Vorona Capital',
    metaText: 'cl-167 · client-side review · eng-219-vor', metaIsReal: false,
    avatarInitials: 'VC', avatarGradient: GR_VORONA,
  },
  revieweeEngContext: 'cl-167 · client-side review · eng-219-vor',
  snippet: 'Communication broke down completely after the first week. Payments were delayed twice without notice. Would not recommend.',
  rating: 1.0,
  postedDate: 'Apr 30, 09:14',
  postedRelative: '5 days ago',
  rowVariant: 'flagged',
  linkedEngagementId: 'eng-219-vor',
};

const ROW_838: ReviewListRow = {
  id: 'rev-838',
  atlasId: 'REV-2026-0838',
  status: 'appealed',
  statusPillVariant: 'rv-appealed',
  statusPillText: 'Appealed',
  statusSub: 'candidate disputes mod. removal',
  direction: 'cs',
  reviewer: {
    id: 'cl-002', name: 'Stefan Müller', directionChip: 'cl',
    metaText: 'Real: Atelier Werkraum · cl-002', metaIsReal: true,
    avatarInitials: 'SM', avatarGradient: GR_STEFAN,
  },
  reviewee: {
    id: 'cand-031', name: 'Carlos Beltrán',
    metaText: 'cand-031 · Backend · eng-201-and', metaIsReal: false,
    avatarInitials: 'CB', avatarGradient: GR_CARLOS,
  },
  revieweeEngContext: 'cand-031 · Backend · eng-201-and',
  snippet: 'Carlos was excellent throughout — strong technical work, clear communication, would absolutely hire again for backend projects.',
  rating: 5.0,
  postedDate: 'Apr 30, 14:02',
  postedRelative: '5 days ago · ↩ appeal Apr 30',
  linkedEngagementId: 'eng-201-and',
};

const ROW_822: ReviewListRow = {
  id: 'rev-822',
  atlasId: 'REV-2026-0822',
  status: 'live',
  statusPillVariant: 'rv-live',
  statusPillText: 'Live',
  statusSub: '3 helpful · 0 flags',
  direction: 'cs',
  reviewer: {
    id: 'cl-002', name: 'Stefan Müller', directionChip: 'cl',
    metaText: 'Real: Atelier Werkraum · cl-002', metaIsReal: true,
    avatarInitials: 'SM', avatarGradient: GR_STEFAN,
  },
  reviewee: {
    id: 'cand-007', name: 'Daniel Kovács',
    metaText: 'cand-007 · Backend Architect · eng-198-stb', metaIsReal: false,
    avatarInitials: 'DK', avatarGradient: GR_DANIEL,
  },
  revieweeEngContext: 'cand-007 · Backend Architect · eng-198-stb',
  snippet: 'Daniel delivered the API rebuild ahead of schedule with comprehensive docs. Top-tier engineering judgment, would re-hire instantly.',
  rating: 5.0,
  postedDate: 'Apr 28, 17:30',
  postedRelative: '7 days ago',
  linkedEngagementId: 'eng-198-stb',
};

const ROW_816: ReviewListRow = {
  id: 'rev-816',
  atlasId: 'REV-2026-0816',
  status: 'removed',
  statusPillVariant: 'rv-removed',
  statusPillText: 'Removed',
  statusSub: 'by Sarah R. · abuse',
  direction: 'cl',
  reviewer: {
    id: 'cand-018', name: 'Anonymous Client', directionChip: 'cs',
    metaText: 'Real: cl-091 (suspended Mar 5) · cand-018 reviewing client-side', metaIsReal: true,
    avatarInitials: 'AC', avatarGradient: GR_MARCUS,
  },
  reviewee: {
    id: 'cl-091', name: 'Luna Logistics LLC',
    metaText: 'cl-091 · client-side review · eng-122-lun', metaIsReal: false,
    avatarInitials: 'LL', avatarGradient: GR_LUNA,
  },
  revieweeEngContext: 'cl-091 · client-side review · eng-122-lun',
  snippet: '[content removed by admin · contained slur targeting protected category]',
  rating: 1.0,
  postedDate: 'Apr 29, 08:45',
  postedRelative: '6 days ago · removed +2h',
  rowVariant: 'removed',
  linkedEngagementId: 'eng-122-lun',
};

const ROW_807: ReviewListRow = {
  id: 'rev-807',
  atlasId: 'REV-2026-0807',
  status: 'live',
  statusPillVariant: 'rv-live',
  statusPillText: 'Live',
  statusSub: '8 helpful · 0 flags',
  direction: 'cl',
  reviewer: {
    id: 'cand-022', name: 'Lukas Heinrich', directionChip: 'cs',
    metaText: 'cand-022 · ML Engineer', metaIsReal: false,
    avatarInitials: 'LH', avatarGradient: GR_LUKAS,
  },
  reviewee: {
    id: 'cl-019', name: 'Northwind Robotics',
    metaText: 'cl-019 · client-side review · eng-002-nor', metaIsReal: false,
    avatarInitials: 'NR', avatarGradient: GR_NORTHWIND,
  },
  revieweeEngContext: 'cl-019 · client-side review · eng-002-nor',
  snippet: 'Solid client — clear briefs, prompt feedback, paid on time. Project scope shifted twice but they were upfront about budget impacts.',
  rating: 5.0,
  postedDate: 'Apr 27, 12:08',
  postedRelative: '8 days ago',
  linkedEngagementId: 'eng-002',
};

const ROW_795: ReviewListRow = {
  id: 'rev-795',
  atlasId: 'REV-2026-0795',
  status: 'flagged',
  statusPillVariant: 'rv-flagged',
  statusPillText: 'Flagged',
  statusSub: 'low-quality · 14 chars · 2 reports',
  direction: 'cs',
  reviewer: {
    id: 'cl-031', name: 'Andrei P.', directionChip: 'cl',
    metaText: 'Real: Patagonia Mining S.A. · cl-031', metaIsReal: true,
    avatarInitials: 'AP', avatarGradient: GR_ANDREI,
  },
  reviewee: {
    id: 'cand-025', name: 'Valentina Kraft',
    metaText: 'cand-025 · Data Engineer · eng-156-pat', metaIsReal: false,
    avatarInitials: 'VK', avatarGradient: GR_VALENTINA,
  },
  revieweeEngContext: 'cand-025 · Data Engineer · eng-156-pat',
  snippet: "Bad. Don't hire.",
  rating: 1.0,
  postedDate: 'Apr 26, 19:55',
  postedRelative: '9 days ago',
  rowVariant: 'flagged',
  linkedEngagementId: 'eng-156-pat',
};

const ROW_782: ReviewListRow = {
  id: 'rev-782',
  atlasId: 'REV-2026-0782',
  status: 'live',
  statusPillVariant: 'rv-live',
  statusPillText: 'Live',
  statusSub: '5 helpful · 0 flags',
  direction: 'cs',
  reviewer: {
    id: 'cl-068', name: 'Émilie Baudry', directionChip: 'cl',
    metaText: 'Real: SAS Lumière · cl-068', metaIsReal: true,
    avatarInitials: 'EB', avatarGradient: GR_EMILIE,
  },
  reviewee: {
    id: 'cand-014', name: 'Théo Lemaire',
    metaText: 'cand-014 · Frontend · eng-198-cnx', metaIsReal: false,
    avatarInitials: 'TL', avatarGradient: GR_THEO,
  },
  revieweeEngContext: 'cand-014 · Frontend · eng-198-cnx',
  snippet: 'Théo handled the rebrand work with care — every component matched the spec, only minor revisions needed. Pleasure to work with.',
  rating: 5.0,
  postedDate: 'Apr 25, 10:22',
  postedRelative: '10 days ago',
  linkedEngagementId: 'eng-198-cnx',
};

const ROW_770: ReviewListRow = {
  id: 'rev-770',
  atlasId: 'REV-2026-0770',
  status: 'live',
  statusPillVariant: 'rv-live',
  statusPillText: 'Live',
  statusSub: '12 helpful · 0 flags',
  direction: 'cl',
  reviewer: {
    id: 'cand-001', name: 'Adesuwa Babatunde', directionChip: 'cs',
    metaText: 'cand-001 · Senior Full-Stack', metaIsReal: false,
    avatarInitials: 'AB', avatarGradient: GR_ADESUWA,
  },
  reviewee: {
    id: 'cl-002-7e1b3f', name: 'Studio Berlin',
    metaText: 'cl-002 · client-side review · eng-001-stb', metaIsReal: false,
    avatarInitials: 'SB', avatarGradient: GR_STEFAN,
  },
  revieweeEngContext: 'cl-002 · client-side review · eng-001-stb',
  snippet: 'Studio Berlin was a thoughtful, well-organized client — the brief was crisp, deadlines realistic, and Stefan made decisions promptly when blockers came up.',
  rating: 5.0,
  postedDate: 'Apr 23, 16:40',
  postedRelative: '12 days ago',
  linkedEngagementId: 'eng-001',
};

const LIST_ROWS: ReviewListRow[] = [
  ROW_834, ROW_815, ROW_840, ROW_838, ROW_822,
  ROW_816, ROW_807, ROW_795, ROW_782, ROW_770,
];

// ============================================================
// CANONICAL DETAIL: rev-834 (verbatim per admin.html L37229-37992)
// ============================================================

const REV_834: ReviewProfile = {
  id: 'rev-834',
  atlasId: 'REV-2026-0834',
  status: 'pattern',
  statusPillVariant: 'rv-pattern',
  statusPillText: 'Pattern · sock-puppet',
  direction: 'cs',
  directionChipLabel: 'Candidate-side review',
  postedMetaLine: 'posted Apr 30, 2026 16:42 UTC · 4 days 22 hours ago',
  title: {
    prefix: 'A 1-star review filed on a ',
    italic: 'Tier-1 candidate',
    suffix: ' by a client account that has filed three other near-identical 1-star reviews in seven days.',
  },
  reviewerHero: {
    initials: 'MV',
    gradient: GR_MARINA,
    name: 'Marina V.',
    realChip: 'REAL: A2Z SOLUTIONS LTD · CL-178',
  },
  revieweeHero: {
    initials: 'AB',
    gradient: GR_ADESUWA,
    name: 'Adesuwa Babatunde',
    atlasChip: 'CAND-001',
  },
  engagementContextLine: '· eng-247-a2z · $4,800 fixed-price · marked complete Apr 28',
  rating: 1.0,
  ratingNum: '1.0 / 5',
  heroStats: [
    { label: 'Rating', value: '1.0', valueColor: 'danger', meta: 'vs reviewee avg 4.92' },
    { label: 'Helpful votes', value: '0', meta: 'no engagement yet' },
    { label: 'Reports filed', value: '3', valueColor: 'warn', meta: '2 user · 1 system' },
    { label: "Reviewer's reviews · 7d", value: '4', valueColor: 'danger', meta: 'all 1-star · all Tier-1' },
    { label: 'Cluster size', value: '4', valueColor: 'danger', meta: 'avg sim 89%' },
  ],
  banner: {
    variant: 'danger',
    title: 'Sock-puppet pattern detected — 4-review cluster from a single client account.',
    meta: 'REV-2026-0834 is the 4th 1-star review filed by A2Z Solutions Ltd (cl-178) in 7 days, all targeting Atlas-vetted Tier-1 candidates · AI similarity scoring 89% across the cluster · IP block 17.149.x.x previously linked to suspended account cl-091 (Mar 5) · recommended action: REMOVE all 4 reviews + suspend cl-178 pending T&S review.',
  },
  sections: {
    content: { statusText: 'Hidden from public · pending decision', statusVariant: 'warn' },
    context: { statusText: 'Closed Apr 28 · marked complete by client', statusVariant: 'default' },
    pattern: { statusText: 'Sock-puppet cluster · 87% AI confidence', statusVariant: 'danger' },
    flags: { statusText: '3 active flags · 0 resolved', statusVariant: 'danger' },
    moderation: { statusText: '8 events · spans 5 days', statusVariant: 'default' },
    audit: { statusText: '12 events · immutable · per-action attribution', statusVariant: 'neutral' },
  },
  tocMetas: {
    content: '1.0 ★',
    context: '3 links',
    pattern: '87%',
    flags: '3',
    moderation: '8 acts',
    audit: '12 acts',
  },
  tocMetaVariants: { content: 'danger', pattern: 'danger', flags: 'warn' },
  reviewerSnapshot: {
    initials: 'MV',
    gradient: GR_MARINA,
    name: 'Marina V.',
    realLabel: 'REAL: A2Z Solutions Ltd',
    metaLine: 'cl-178 · joined Feb 14, 2026 (80d) · New trust tier · 6 hires · last login 12 min ago · IP 17.149.x.x',
    stats: [
      { label: 'Reviews · 7d', value: '4', valueColor: 'danger' },
      { label: 'Avg rating', value: '1.0', valueColor: 'danger' },
      { label: 'Sock-puppet score', value: '87%', valueColor: 'danger' },
      { label: 'Disputes opened', value: '0' },
    ],
    actionLabel: 'Open client detail →',
    actionHref: '/admin/users/clients/cl-178',
  },
  quickFacts: [
    { dt: 'Review ID', dd: 'REV-2026-0834' },
    { dt: 'Posted', dd: 'Apr 30, 2026 16:42 UTC' },
    { dt: 'Direction', dd: 'Candidate-side · client → candidate' },
    { dt: 'Rating', dd: '1.0 / 5.0 ★', ddColor: 'danger', ddBold: true },
    { dt: 'Status', dd: 'Pattern · auto-hidden', ddColor: 'danger', ddBold: true },
    { dt: 'Cluster', dd: '4th of 4 · 89% avg sim' },
    { dt: 'AI confidence', dd: '87% sock-puppet', ddColor: 'danger', ddBold: true },
    { dt: 'Engagement', dd: 'eng-247-a2z · closed Apr 28' },
    { dt: 'Investigation', dd: 'INV-2026-0193 · Sarah R.' },
    { dt: 'T&S status', dd: 'Confirmed by Wei Z. · today', ddColor: 'super', ddBold: true },
    { dt: 'Public visibility', dd: 'Hidden 5d ago', ddColor: 'mute-strike' },
    { dt: 'Reviewee notified?', dd: 'Yes · Apr 30 16:46' },
  ],
  linkedEngagementId: 'eng-247-a2z',
  linkedClientId: 'cl-178',
  linkedCandidateId: 'cand-001',
  linkedSpecialistId: 'spec-001',
};

// ============================================================
// STUB HELPER for 9 non-canonical fixtures
// ============================================================

function stubReviewProfile(row: ReviewListRow): ReviewProfile {
  const bannerVariant: ReviewHeroBanner['variant'] =
    row.status === 'pattern' ? 'danger'
    : row.status === 'flagged' ? 'amber'
    : row.status === 'removed' ? 'neutral'
    : row.status === 'appealed' ? 'amber'
    : 'success';

  const sectionStatus = (text: string, v: ReviewSectionStatusVariant): ReviewSectionStatus => ({
    statusText: text,
    statusVariant: v,
  });

  const directionLabel = row.direction === 'cs' ? 'Candidate-side review' : 'Client-side review';

  const profile: ReviewProfile = {
    id: row.id,
    atlasId: row.atlasId,
    status: row.status,
    statusPillVariant: row.statusPillVariant,
    statusPillText: row.statusPillText,
    direction: row.direction,
    directionChipLabel: directionLabel,
    postedMetaLine: `posted ${row.postedDate} UTC · ${row.postedRelative}`,
    title: {
      prefix: `A ${row.rating}-star review by `,
      italic: row.reviewer.name,
      suffix: ` on ${row.reviewee.name}.`,
    },
    reviewerHero: {
      initials: row.reviewer.avatarInitials,
      gradient: row.reviewer.avatarGradient,
      name: row.reviewer.name,
      ...(row.reviewer.metaIsReal ? { realChip: row.reviewer.metaText.toUpperCase() } : {}),
    },
    revieweeHero: {
      initials: row.reviewee.avatarInitials,
      gradient: row.reviewee.avatarGradient,
      name: row.reviewee.name,
      atlasChip: row.reviewee.id.toUpperCase(),
    },
    engagementContextLine: `· ${row.revieweeEngContext}`,
    rating: row.rating,
    ratingNum: `${row.rating.toFixed(1)} / 5`,
    heroStats: [
      { label: 'Rating', value: row.rating.toFixed(1), ...(row.rating <= 2 ? { valueColor: 'danger' as const } : row.rating >= 4 ? { valueColor: 'success' as const } : {}), meta: 'stub data' },
      { label: 'Helpful votes', value: '—', meta: 'stub' },
      { label: 'Reports filed', value: '—', meta: 'stub' },
      { label: 'Status', value: row.statusPillText, meta: row.statusSub },
      { label: 'Posted', value: row.postedDate, meta: row.postedRelative },
    ],
    banner: {
      variant: bannerVariant,
      title: `${row.statusPillText}.`,
      meta: `${row.statusSub} · stub data — canonical detail only for rev-834.`,
    },
    sections: {
      content: sectionStatus('Stub · canonical detail only for rev-834', 'default'),
      context: sectionStatus(row.revieweeEngContext, 'default'),
      pattern: sectionStatus(row.status === 'pattern' ? row.statusSub : 'No pattern detected', row.status === 'pattern' ? 'danger' : 'default'),
      flags: sectionStatus(row.status === 'flagged' ? row.statusSub : 'No active flags', row.status === 'flagged' ? 'danger' : 'default'),
      moderation: sectionStatus('Stub · canonical only for rev-834', 'default'),
      audit: sectionStatus('Stub · immutable log', 'neutral'),
    },
    tocMetas: {
      content: `${row.rating.toFixed(1)} ★`,
      context: '—',
      pattern: row.status === 'pattern' ? row.statusSub.split(' · ')[1] ?? '—' : '—',
      flags: row.status === 'flagged' ? '1' : '0',
      moderation: '—',
      audit: '—',
    },
    tocMetaVariants: {
      ...(row.rating <= 2 ? { content: 'danger' as const } : {}),
      ...(row.status === 'pattern' ? { pattern: 'danger' as const } : {}),
      ...(row.status === 'flagged' ? { flags: 'warn' as const } : {}),
    },
    reviewerSnapshot: {
      initials: row.reviewer.avatarInitials,
      gradient: row.reviewer.avatarGradient,
      name: row.reviewer.name,
      ...(row.reviewer.metaIsReal ? { realLabel: row.reviewer.metaText } : {}),
      metaLine: `${row.reviewer.id} · stub reviewer snapshot · canonical only for rev-834`,
      stats: [
        { label: 'Reviews · 7d', value: '—' },
        { label: 'Avg rating', value: row.rating.toFixed(1) },
        { label: 'Sock-puppet score', value: row.status === 'pattern' ? '—' : 'n/a' },
        { label: 'Disputes opened', value: '—' },
      ],
      actionLabel: 'Open reviewer detail →',
      actionHref: `/admin/users/${row.reviewer.id.startsWith('cl-') ? 'clients' : 'candidates'}/${row.reviewer.id}`,
    },
    quickFacts: [
      { dt: 'Review ID', dd: row.atlasId },
      { dt: 'Posted', dd: row.postedDate },
      { dt: 'Direction', dd: directionLabel },
      { dt: 'Rating', dd: `${row.rating.toFixed(1)} / 5.0 ★`, ...(row.rating <= 2 ? { ddColor: 'danger' as const, ddBold: true } : {}) },
      { dt: 'Status', dd: row.statusPillText, ...(row.status === 'pattern' || row.status === 'flagged' ? { ddColor: 'danger' as const, ddBold: true } : {}) },
      { dt: 'Engagement', dd: row.revieweeEngContext.split(' · ').pop() ?? '—' },
    ],
  };

  if (row.linkedEngagementId) profile.linkedEngagementId = row.linkedEngagementId;
  if (row.reviewer.id) profile.linkedClientId = row.reviewer.id;
  if (row.reviewee.id) profile.linkedCandidateId = row.reviewee.id;

  return profile;
}

// ============================================================
// PROFILES MAP
// ============================================================

export const REVIEW_PROFILES: Record<string, ReviewProfile> = {
  'rev-834': REV_834,
  'rev-815': stubReviewProfile(ROW_815),
  'rev-840': stubReviewProfile(ROW_840),
  'rev-838': stubReviewProfile(ROW_838),
  'rev-822': stubReviewProfile(ROW_822),
  'rev-816': stubReviewProfile(ROW_816),
  'rev-807': stubReviewProfile(ROW_807),
  'rev-795': stubReviewProfile(ROW_795),
  'rev-782': stubReviewProfile(ROW_782),
  'rev-770': stubReviewProfile(ROW_770),
};

// ============================================================
// PAGE DATA (verbatim per admin.html L36895-37197)
// ============================================================

export const REVIEWS_PAGE_DATA: ReviewsPageData = {
  pageMeta: '/admin/operations/reviews · 2,847 live · 18 flagged · 4 pattern clusters · 1 active sock-puppet cluster (URGENT)',
  stats: [
    { label: 'Live reviews', value: '2,847', vSuffix: 'total', meta: 'avg rating 4.61 · 76% candidate-side · 24% client-side' },
    { label: 'Flagged for review', value: '18', vSuffix: 'on your queue', meta: '11 user-reported · 7 system-detected · 5 over 24h', metaVariant: 'warn' },
    { label: 'Pattern clusters', value: '4', vSuffix: 'active', delta: { variant: 'up', text: '↑1' }, meta: '1 sock-puppet (URGENT) · 2 review-bombing · 1 retaliatory' },
    { label: 'Removed this month', value: '14', vSuffix: 'reviews', meta: '9 abuse · 3 fraud · 2 mistakes · 0 successful appeals' },
  ],
  directionTabs: [
    { key: 'all', label: 'All directions', count: 10 },
    { key: 'cs', label: 'Candidate-side', count: 7 },
    { key: 'cl', label: 'Client-side', count: 3 },
  ],
  filterChips: [
    { key: 'all', label: 'All', count: 10 },
    { key: 'live', label: 'Live', count: 5 },
    { key: 'flagged', label: 'Flagged', count: 2 },
    { key: 'pattern', label: 'Pattern detected', count: 2 },
    { key: 'removed', label: 'Removed', count: 1 },
    { key: 'appealed', label: 'Appealed', count: 1 },
  ],
  listRows: LIST_ROWS,
  totalCount: 2883,
  sectionLabel: 'Review feed · sorted newest-first · pattern-flagged rows highlighted',
  sectionLabelMeta: 'Showing 10 of 2,883 · click any row to investigate',
  footerLabel: '10 of 2,883 reviews shown · pattern-flagged rows pinned to top regardless of date · sorted by post date',
  loadMoreLabel: 'Load more (2,873 remaining) →',
};
