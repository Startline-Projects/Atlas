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

// §01 — Review content card types (Phase 13b-1)
export type ReviewContentSegment =
  | { kind: 'text'; text: string }
  | { kind: 'hl-template'; text: string; title: string };

export interface ReviewContentParagraph {
  segments: ReviewContentSegment[];
}

export interface ReviewContentFootStat {
  label: string;
  value: string;
  bold?: boolean;
}

export interface ReviewContentDangerStat {
  text: string;
}

export interface ReviewContentByline {
  avatarInitials: string;
  avatarGradient: string;
  name: string;
  realChip?: string;
  role: string;
}

export interface ReviewContentData {
  byline: ReviewContentByline;
  rating: number;
  ratingNum: string;
  headline: string;
  paragraphs: ReviewContentParagraph[];
  footerMeta: string;
  footStats: ReviewContentFootStat[];
  dangerStat?: ReviewContentDangerStat;
}

// §02 — Engagement context linked cards types (Phase 13b-1)
export interface ReviewContextDetailLine {
  strongLabel: string;
  text: string;
}

export interface ReviewContextCard {
  tag: string;
  title: string;
  titleChip?: { text: string; color: 'super' | 'mute' };
  meta: string;
  details: ReviewContextDetailLine[];
  actionKey: string;
  href: string;
}

export interface ReviewContextData {
  cards: ReviewContextCard[];
}

// §03 — Pattern detection types (Phase 13b-2)
export interface ReviewClusterItem {
  index: number;
  atlasId: string;
  reviewId?: string;
  target: string;
  meta: string;
  rating: number;
  variant: 'warn' | 'danger';
  current: boolean;
}

export type SimilarityCellVariant = 'head' | 'row-label' | 'diag' | 'heat-low' | 'heat-mid' | 'heat-high' | 'heat-xhigh';

export interface SimilarityCell {
  variant: SimilarityCellVariant;
  value: string;
}

export interface SimilarityCaptionSegment {
  text: string;
  color?: 'success' | 'amber' | 'danger';
  bold?: boolean;
}

export type PatternSignalIcon = 'default' | 'warn' | 'neutral';

export interface PatternSignal {
  iconVariant: PatternSignalIcon;
  iconChar: string;
  label: string;
  detail: string;
}

export type ReviewPatternSummarySegment =
  | { kind: 'text'; text: string }
  | { kind: 'strong'; text: string }
  | { kind: 'mono'; text: string };

export interface PatternRecommendation {
  strongParts: string[];
  plainParts: string[];
  emPart: string;
  deferLabel: string;
  deferActionKey: string;
  applyLabel: string;
  applyActionKey: string;
}

export type PatternSeverity = 'high' | 'medium' | 'low';

export interface ReviewPatternData {
  severity: PatternSeverity;
  headTitle: string;
  confidence: number;
  summarySegments: ReviewPatternSummarySegment[];
  clusterLabel: string;
  clusterItems: ReviewClusterItem[];
  similarityLabel: string;
  similarityHeaders: string[];
  similarityRows: { label: string; cells: SimilarityCell[] }[];
  captionSegments: SimilarityCaptionSegment[];
  signalsLabel: string;
  signals: PatternSignal[];
  recommendation: PatternRecommendation;
}

// §04 — Reports & flags types (Phase 13b-2)
export type FlagKind = 'system' | 'user' | 'resolved';

export interface ReviewFlagItem {
  kind: FlagKind;
  iconSvg: 'target' | 'user';
  source: string;
  tag: string;
  time: string;
  reason: string;
  status: string;
}

export interface ReviewFlagsData {
  items: ReviewFlagItem[];
}

// §05 — Moderation history types (Phase 13b-2)
export type ModEventVariant = 'default' | 'system' | 'admin' | 'danger';

export type ModActionSegment =
  | { kind: 'text'; text: string }
  | { kind: 'strong'; text: string };

export interface ReviewModEvent {
  variant: ModEventVariant;
  actor: string;
  actionSegments: ModActionSegment[];
  time: string;
  detail: string;
}

export interface ReviewModerationData {
  events: ReviewModEvent[];
}

// §06 — Admin audit log types (Phase 13b-3)
export type AuditActorVariant = 'admin' | 'system' | 'spec' | 'user';
export type AuditActionVariant = 'default' | 'danger';

export interface ReviewAuditEntry {
  timestamp: string;
  actor: string;
  actorVariant: AuditActorVariant;
  action: string;
  actionVariant: AuditActionVariant;
  ipDev: string;
}

export interface ReviewAuditData {
  entries: ReviewAuditEntry[];
  footerText: string;
  footerActionKey: string;
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
  contentData?: ReviewContentData;
  contextData?: ReviewContextData;
  patternData?: ReviewPatternData;
  flagsData?: ReviewFlagsData;
  moderationData?: ReviewModerationData;
  auditData?: ReviewAuditData;
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
  // §01 — Review content (Phase 13b-1, verbatim per admin.html L37363-37395)
  contentData: {
    byline: {
      avatarInitials: 'MV',
      avatarGradient: GR_MARINA,
      name: 'Marina V.',
      realChip: 'REAL: A2Z SOLUTIONS LTD',
      role: 'Verified client · cl-178 · joined Atlas Feb 14, 2026',
    },
    rating: 1,
    ratingNum: '1.0',
    headline: '“Disappointed by the engagement experience”',
    paragraphs: [
      {
        segments: [
          { kind: 'text', text: 'Their ' },
          { kind: 'hl-template', text: 'lack of professionalism', title: 'Phrase appears verbatim in 3 other reviews from this account' },
          { kind: 'text', text: ' made this engagement extremely difficult. ' },
          { kind: 'hl-template', text: 'Communication issues', title: 'Phrase appears verbatim in 4 other reviews from this account' },
          { kind: 'text', text: ' throughout — slow responses, missed details on the spec, and ultimately the deliverable did not match what we expected.' },
        ],
      },
      {
        segments: [
          { kind: 'text', text: 'I would ' },
          { kind: 'hl-template', text: 'not recommend to other serious clients', title: 'Phrase appears verbatim in 4 other reviews from this account' },
          { kind: 'text', text: ' looking for someone reliable. The work was technically functional but the experience around it was not what Atlas advertises.' },
        ],
      },
    ],
    footerMeta: '— Posted Apr 30, 2026 16:42 UTC · 248 characters · 3 phrases highlighted as template-language by AI similarity model',
    footStats: [
      { label: 'helpful', value: '0', bold: true },
      { label: 'not helpful', value: '0', bold: true },
      { label: 'reports', value: '3', bold: true },
      { label: 'public reactions', value: '0', bold: true },
    ],
    dangerStat: {
      text: 'PUBLIC: hidden since Apr 30 19:14 (system auto-hide on flag threshold)',
    },
  },

  // §02 — Engagement context (Phase 13b-1, verbatim per admin.html L37410-37456)
  contextData: {
    cards: [
      {
        tag: 'ENGAGEMENT',
        title: 'eng-247-a2z · React/Node platform rebuild',
        meta: '$4,800 fixed-price · 1 milestone · Apr 8 → Apr 28 (20 days)',
        details: [
          { strongLabel: 'Status:', text: 'Closed · marked complete by client Apr 28' },
          { strongLabel: 'Final payment:', text: '$4,800 released Apr 28 · no disputes opened' },
          { strongLabel: 'Hours logged:', text: '64h (within 60-70h estimate)' },
          { strongLabel: 'Client satisfaction at close:', text: '“Acceptable” (private, pre-review)' },
        ],
        actionKey: 'open-engagement',
        href: '/admin/operations/engagements/eng-247-a2z',
      },
      {
        tag: 'REVIEWER',
        title: 'A2Z Solutions Ltd',
        titleChip: { text: 'REAL · cl-178', color: 'super' },
        meta: 'Display name: “Marina V.” · joined Feb 14, 2026 (80 days ago)',
        details: [
          { strongLabel: 'Trust tier:', text: 'New client (under 90 days, < 5 hires)' },
          { strongLabel: 'Hires made:', text: '6 total · 4 in last 7 days (sharp uptick)' },
          { strongLabel: 'Reviews filed:', text: '4 · all 1-star · all on Tier-1 candidates' },
          { strongLabel: 'Confidential client:', text: 'No · no NDA on file' },
        ],
        actionKey: 'open-client',
        href: '/admin/users/clients/cl-178',
      },
      {
        tag: 'REVIEWEE',
        title: 'Adesuwa Babatunde',
        titleChip: { text: 'CAND-001 · TIER-1', color: 'mute' },
        meta: 'Senior Full-Stack Engineer · Lagos, Nigeria · live since Sep 2025',
        details: [
          { strongLabel: 'Avg rating:', text: '4.92 / 5.0 (32 reviews · this is the 1st 1-star)' },
          { strongLabel: 'Atlas vetting:', text: 'Tier-1 · interview score 94 · founding cohort' },
          { strongLabel: 'Engagements:', text: '14 completed · 0 disputes ever filed' },
          { strongLabel: 'Repeat hires:', text: '8 of 14 clients re-hired' },
        ],
        actionKey: 'open-candidate',
        href: '/admin/users/candidates/cand-001',
      },
    ],
  },

  // §03 — Pattern detection (Phase 13b-2, verbatim per admin.html L37472-37652)
  patternData: {
    severity: 'high',
    headTitle: 'Sock-puppet cluster · 4 reviews from one source',
    confidence: 87,
    summarySegments: [
      { kind: 'text', text: 'This review is the ' },
      { kind: 'strong', text: '4th of 4' },
      { kind: 'text', text: ' reviews filed by client account ' },
      { kind: 'mono', text: 'cl-178 (A2Z Solutions Ltd)' },
      { kind: 'text', text: ' in the last 7 days. All four reviews share an unusually similar structure, vocabulary, and rating. The shared signals collectively cross the platform’s sock-puppet threshold (≥ 80% confidence) and trigger an automatic recommendation to remove the cluster pending Trust & Safety review.' },
    ],
    clusterLabel: 'Reviews in cluster — chronological',
    clusterItems: [
      { index: 1, atlasId: 'REV-2026-0742', reviewId: 'rev-742', target: 'Théo Lemaire', meta: 'Apr 24 · 11d ago', rating: 1, variant: 'warn', current: false },
      { index: 2, atlasId: 'REV-2026-0758', reviewId: 'rev-758', target: 'Valentina Kraft', meta: 'Apr 27 · 8d ago', rating: 1, variant: 'warn', current: false },
      { index: 3, atlasId: 'REV-2026-0815', reviewId: 'rev-815', target: 'Marcus Reyes', meta: 'Apr 29 · 6d ago', rating: 1, variant: 'warn', current: false },
      { index: 4, atlasId: 'REV-2026-0834', target: 'Adesuwa Babatunde', meta: 'Apr 30 · 5d ago · current', rating: 1, variant: 'danger', current: true },
    ],
    similarityLabel: 'Pairwise content similarity — AI text-similarity model',
    similarityHeaders: ['REV-742', 'REV-758', 'REV-815', 'REV-834'],
    similarityRows: [
      {
        label: 'REV-742',
        cells: [
          { variant: 'diag', value: '—' },
          { variant: 'heat-high', value: '88%' },
          { variant: 'heat-high', value: '86%' },
          { variant: 'heat-xhigh', value: '92%' },
        ],
      },
      {
        label: 'REV-758',
        cells: [
          { variant: 'heat-high', value: '88%' },
          { variant: 'diag', value: '—' },
          { variant: 'heat-high', value: '87%' },
          { variant: 'heat-high', value: '89%' },
        ],
      },
      {
        label: 'REV-815',
        cells: [
          { variant: 'heat-high', value: '86%' },
          { variant: 'heat-high', value: '87%' },
          { variant: 'diag', value: '—' },
          { variant: 'heat-high', value: '90%' },
        ],
      },
      {
        label: 'REV-834',
        cells: [
          { variant: 'heat-xhigh', value: '92%' },
          { variant: 'heat-high', value: '89%' },
          { variant: 'heat-high', value: '90%' },
          { variant: 'diag', value: '—' },
        ],
      },
    ],
    captionSegments: [
      { text: 'Threshold: ' },
      { text: '<60% normal', color: 'success' },
      { text: ' · ' },
      { text: '60–80% suspicious', color: 'amber' },
      { text: ' · ' },
      { text: '80–90% high', color: 'danger' },
      { text: ' · ' },
      { text: '≥90% near-template', color: 'danger', bold: true },
      { text: ' · cluster average 89%.' },
    ],
    signalsLabel: 'Detection signals — what AI flagged',
    signals: [
      { iconVariant: 'default', iconChar: '!', label: 'Same client account across all 4 reviews', detail: 'cl-178 / A2Z Solutions Ltd · joined Feb 14, 2026 · trust tier “New”' },
      { iconVariant: 'default', iconChar: '!', label: 'Same IP block as suspended account', detail: '17.149.x.x → also linked to cl-091 (suspended Mar 5 for fraud) · 60-day separation' },
      { iconVariant: 'default', iconChar: '!', label: 'Identical device fingerprint', detail: 'Browser+OS+Canvas hash matches 100% across all 4 review submissions' },
      { iconVariant: 'warn', iconChar: '!', label: 'All targets are Tier-1 Atlas-vetted', detail: 'Adesuwa, Valentina, Marcus, Théo · 4 of cl-178’s last 6 hires · sharp selection bias' },
      { iconVariant: 'warn', iconChar: '!', label: 'All ratings exactly 1 star', detail: 'No variance · reviewee averages range 4.61 → 4.92 · 0 prior 1-stars on any of the 4' },
      { iconVariant: 'default', iconChar: '!', label: 'Compressed timeline · 7 days', detail: 'All 4 reviews posted Apr 24 → Apr 30 · no other 1-star reviews from this account in 80-day history' },
      { iconVariant: 'default', iconChar: '!', label: 'Shared phrase library', detail: '“lack of professionalism” (4×) · “communication issues” (4×) · “would not recommend” (4×) · “serious clients” (3×)' },
      { iconVariant: 'neutral', iconChar: '·', label: 'No reviews from any other source', detail: 'Each candidate has 0 reviews from the IP block · 0 from device fingerprint · 0 cross-corroboration' },
    ],
    recommendation: {
      strongParts: ['Remove all 4 reviews', 'suspend cl-178 pending T&S review'],
      plainParts: [' in cluster + ', '.'],
      emPart: 'Notify each of the 4 reviewees with the reason. Do not notify cl-178 of suspension cause until T&S review concludes.',
      deferLabel: 'Defer to T&S only',
      deferActionKey: 'recommend-defer',
      applyLabel: 'Apply recommendation →',
      applyActionKey: 'recommend-apply',
    },
  },

  // §04 — Reports & flags (Phase 13b-2, verbatim per admin.html L37667-37712)
  flagsData: {
    items: [
      {
        kind: 'system',
        iconSvg: 'target',
        source: 'Atlas pattern-detection system',
        tag: 'SYSTEM',
        time: 'Apr 30, 2026 · 16:44 UTC (2 min after post)',
        reason: 'Sock-puppet cluster threshold exceeded · 4 reviews from same source (cl-178), 89% avg pairwise similarity, all 1-star, all Tier-1 targets, compressed 7-day timeline, IP block previously linked to suspended cl-091. Confidence 87%. Auto-hide triggered.',
        status: 'flag-active',
      },
      {
        kind: 'user',
        iconSvg: 'user',
        source: 'Adesuwa Babatunde (reviewee)',
        tag: 'USER',
        time: 'Apr 30, 2026 · 18:08 UTC',
        reason: '“This review does not reflect our engagement. The client marked the work complete and released full payment three days ago without raising any concerns. The wording also matches reviews I’ve seen flagged on other Atlas candidates I know personally — this looks like a coordinated campaign.”',
        status: 'flag-active',
      },
      {
        kind: 'user',
        iconSvg: 'user',
        source: 'Daniel Kovács (Specialist · spec-001)',
        tag: 'USER',
        time: 'May 1, 2026 · 09:22 UTC',
        reason: '“Owning Specialist for Adesuwa. The engagement (eng-247-a2z) closed cleanly — client marked complete, paid full amount, no flags during work. This 1-star arrived 36h after closure with no prior signal of dissatisfaction. Recommend full investigation of cl-178 across their other recent hires.”',
        status: 'flag-active',
      },
    ],
  },

  // §05 — Moderation history (Phase 13b-2, verbatim per admin.html L37729-37801)
  moderationData: {
    events: [
      {
        variant: 'system',
        actor: 'System',
        actionSegments: [{ kind: 'text', text: 'posted publicly · default state on submission' }],
        time: 'Apr 30 · 16:42 UTC',
        detail: 'REV-2026-0834 created · author cl-178 · target cand-001 · rating 1.0 · auto-published per default policy.',
      },
      {
        variant: 'danger',
        actor: 'System (pattern-detection)',
        actionSegments: [
          { kind: 'text', text: 'flagged as ' },
          { kind: 'strong', text: 'sock-puppet pattern' },
          { kind: 'text', text: ' · auto-hidden from public' },
        ],
        time: 'Apr 30 · 16:44 UTC',
        detail: 'Confidence 87% · cluster size 4 · auto-hide triggered (≥85% threshold) · review removed from candidate’s public profile within 2 minutes of post.',
      },
      {
        variant: 'default',
        actor: 'System',
        actionSegments: [{ kind: 'text', text: 'notified Adesuwa Babatunde · review hidden pending review' }],
        time: 'Apr 30 · 16:46 UTC',
        detail: 'Reviewee notification sent · email + in-app · “A flagged review on your profile is being reviewed by Atlas moderation. It is not visible publicly while we investigate.”',
      },
      {
        variant: 'default',
        actor: 'Adesuwa Babatunde',
        actionSegments: [{ kind: 'text', text: 'filed report on the review' }],
        time: 'Apr 30 · 18:08 UTC',
        detail: 'Report reason: “does not reflect engagement” · severity: high · attached: comparison with similar review on cand-014 (Théo Lemaire).',
      },
      {
        variant: 'default',
        actor: 'Daniel Kovács · Talent Specialist',
        actionSegments: [{ kind: 'text', text: 'filed corroborating report' }],
        time: 'May 1 · 09:22 UTC',
        detail: 'Specialist report: clean engagement closure · no prior dissatisfaction signal · recommended full cl-178 investigation across recent hires.',
      },
      {
        variant: 'admin',
        actor: 'Sarah R. · Operations Admin',
        actionSegments: [{ kind: 'text', text: 'opened investigation · assigned to self' }],
        time: 'May 1 · 11:04 UTC',
        detail: 'Investigation INV-2026-0193 created · scope: all 4 reviews in cluster + cl-178 account history · target: T&S decision within 5 business days.',
      },
      {
        variant: 'admin',
        actor: 'Sarah R. · Operations Admin',
        actionSegments: [{ kind: 'text', text: 'added internal note · pending T&S' }],
        time: 'May 2 · 14:38 UTC',
        detail: '“Cluster signals strong. Awaiting T&S confirm on IP-block link to cl-091 before recommending cluster removal + cl-178 suspension. Holding all 4 reviews hidden.”',
      },
      {
        variant: 'default',
        actor: 'Wei Zhang · Trust & Safety Admin',
        actionSegments: [{ kind: 'text', text: 'confirmed IP block link to cl-091 · recommended cluster removal' }],
        time: 'May 5 · 10:12 UTC (today)',
        detail: 'T&S confirms 17.149.x.x device fingerprint match between cl-178 and cl-091 (suspended Mar 5 for fraud). Recommends remove all 4 reviews + suspend cl-178 + flag for legal review on potential terms-of-service violations.',
      },
    ],
  },

  // §06 — Admin audit log (Phase 13b-3, verbatim per admin.html L37818-37892)
  auditData: {
    entries: [
      { timestamp: 'May 5 · 10:14', actor: 'Aïsha (you)', actorVariant: 'admin', action: 'opened review detail · viewed pattern-detection panel', actionVariant: 'default', ipDev: '192.x · MBP' },
      { timestamp: 'May 5 · 10:12', actor: 'Wei Zhang', actorVariant: 'admin', action: 'confirmed IP-block link · recommended cluster removal · added T&S note INV-2026-0193', actionVariant: 'default', ipDev: '10.x · admin' },
      { timestamp: 'May 2 · 14:38', actor: 'Sarah R.', actorVariant: 'admin', action: 'added internal note: pending T&S confirm on IP-block link', actionVariant: 'default', ipDev: '10.x · admin' },
      { timestamp: 'May 1 · 11:04', actor: 'Sarah R.', actorVariant: 'admin', action: 'opened INV-2026-0193 · self-assigned · target: 5 bdays', actionVariant: 'default', ipDev: '10.x · admin' },
      { timestamp: 'May 1 · 09:22', actor: 'Daniel K.', actorVariant: 'spec', action: 'specialist report filed (corroborating)', actionVariant: 'default', ipDev: '10.x · spec' },
      { timestamp: 'Apr 30 · 18:08', actor: 'Adesuwa B.', actorVariant: 'user', action: 'reviewee report filed', actionVariant: 'default', ipDev: 'user · cand' },
      { timestamp: 'Apr 30 · 16:46', actor: 'SYSTEM', actorVariant: 'system', action: 'reviewee notification dispatched (email + in-app)', actionVariant: 'default', ipDev: 'internal' },
      { timestamp: 'Apr 30 · 16:44', actor: 'SYSTEM', actorVariant: 'system', action: 'PATTERN FLAG · auto-hidden · cluster confidence 87%', actionVariant: 'danger', ipDev: 'internal' },
      { timestamp: 'Apr 30 · 16:42', actor: 'cl-178', actorVariant: 'user', action: 'REV-2026-0834 submitted · rating 1.0 · 248 chars', actionVariant: 'default', ipDev: '17.149.x' },
    ],
    footerText: '· 2 earlier system events (cluster initialization on REV-742) — ',
    footerActionKey: 'audit-expand',
  },

  linkedEngagementId: 'eng-247-a2z',
  linkedClientId: 'cl-178',
  linkedCandidateId: 'cand-001',
  linkedSpecialistId: 'spec-001',
};

// ============================================================
// STUB SECTION DATA HELPERS (Phase 13c — derived role-coherent
// section content for the 9 non-canonical fixtures; rev-834
// retains its canonical verbatim data and is NOT overwritten)
// ============================================================

function deriveHeadline(status: ReviewStatus, rating: number): string {
  if (status === 'removed') return '“[Content removed by admin]”';
  if (status === 'appealed') return '“Disputed review pending resolution”';
  if (status === 'pattern') return '“Disappointing engagement experience”';
  if (status === 'flagged') return '“Concerning engagement experience”';
  if (rating >= 4) return '“Excellent engagement — strong recommendation”';
  return '“Mixed engagement experience”';
}

function deriveSecondParagraph(row: ReviewListRow): string {
  if (row.status === 'pattern') {
    return `This review has been auto-hidden by the AI pattern-detection system (${row.statusSub}). See §03 below for full pattern analysis and recommended action. The review is part of a wider cluster being investigated by Trust & Safety.`;
  }
  if (row.status === 'removed') {
    return `Original content has been removed from public view by Atlas Operations admin action (${row.statusSub}). The reviewee&rsquo;s public profile no longer displays this review; full audit trail is preserved in §06 below.`;
  }
  if (row.status === 'appealed') {
    return `${row.reviewer.name} has appealed the removal of this review. The appeal is pending Trust & Safety review; content remains hidden from public view pending resolution. See §05 for moderation timeline.`;
  }
  if (row.status === 'flagged') {
    return `This review has been flagged for moderation review (${row.statusSub}). Atlas Operations is evaluating the report; the review remains publicly visible while under review per platform policy.`;
  }
  // live
  if (row.rating >= 4) {
    return `${row.reviewer.name} has authored ${row.direction === 'cs' ? 'a client-side' : 'a candidate-side'} review based on the engagement referenced in §02 below. The review remains publicly visible and has been indexed for platform search. ${row.statusSub}.`;
  }
  return `Review posted publicly per default policy. No moderation actions taken to date · ${row.statusSub}. Engagement context detailed in §02 below.`;
}

function partyHrefFromId(id: string): string {
  return id.startsWith('cl-') ? `/admin/users/clients/${id}` : `/admin/users/candidates/${id}`;
}

function stubContentData(row: ReviewListRow): ReviewContentData {
  const reportsValue =
    row.status === 'flagged' ? '2' :
    row.status === 'pattern' ? '3' :
    row.status === 'removed' ? '4' :
    row.status === 'appealed' ? '1' : '0';

  const dangerText =
    row.status === 'removed' ? `PUBLIC: content removed by admin · ${row.statusSub}` :
    row.status === 'pattern' ? 'PUBLIC: hidden pending T&S review (system auto-hide on flag threshold)' :
    null;

  return {
    byline: {
      avatarInitials: row.reviewer.avatarInitials,
      avatarGradient: row.reviewer.avatarGradient,
      name: row.reviewer.name,
      ...(row.reviewer.metaIsReal
        ? { realChip: row.reviewer.metaText.toUpperCase() }
        : {}),
      role: row.reviewer.metaText,
    },
    rating: Math.round(row.rating),
    ratingNum: row.rating.toFixed(1),
    headline: deriveHeadline(row.status, row.rating),
    paragraphs: [
      { segments: [{ kind: 'text', text: row.snippet }] },
      { segments: [{ kind: 'text', text: deriveSecondParagraph(row) }] },
    ],
    footerMeta: `— Posted ${row.postedDate} UTC · ${row.snippet.length} characters · authored by ${row.reviewer.name} · ${row.direction === 'cs' ? 'candidate-side' : 'client-side'} review`,
    footStats: [
      { label: 'helpful', value: '0', bold: true },
      { label: 'not helpful', value: '0', bold: true },
      { label: 'reports', value: reportsValue, bold: true },
      { label: 'public reactions', value: '0', bold: true },
    ],
    ...(dangerText ? { dangerStat: { text: dangerText } } : {}),
  };
}

function stubContextData(row: ReviewListRow): ReviewContextData {
  const engId = row.linkedEngagementId ?? (row.revieweeEngContext.split(' · ').pop() ?? '—');
  const engHref = `/admin/operations/engagements/${engId}`;
  const reviewerHref = partyHrefFromId(row.reviewer.id);
  const revieweeHref = partyHrefFromId(row.reviewee.id);

  const reviewerTitleChip: { text: string; color: 'super' | 'mute' } = row.reviewer.metaIsReal
    ? { text: `REAL · ${row.reviewer.id}`, color: 'super' }
    : { text: row.reviewer.id.toUpperCase(), color: 'mute' };

  return {
    cards: [
      {
        tag: 'ENGAGEMENT',
        title: `${engId} · linked engagement`,
        meta: row.revieweeEngContext,
        details: [
          { strongLabel: 'Linkage:', text: 'Review references this engagement' },
          { strongLabel: 'Direction:', text: row.direction === 'cs' ? 'Client → Candidate' : 'Candidate → Client' },
          { strongLabel: 'Posted:', text: `${row.postedDate} · ${row.postedRelative}` },
          { strongLabel: 'Closure:', text: row.rating >= 4 ? 'Clean · marked complete by both parties' : row.status === 'pattern' || row.status === 'flagged' ? 'Closed · review under investigation' : 'Closed · standard timeline' },
        ],
        actionKey: 'open-engagement',
        href: engHref,
      },
      {
        tag: 'REVIEWER',
        title: row.reviewer.name,
        titleChip: reviewerTitleChip,
        meta: row.reviewer.metaText,
        details: [
          { strongLabel: 'Account:', text: row.reviewer.id },
          { strongLabel: 'Side:', text: row.reviewer.directionChip === 'cl' ? 'Client account' : 'Candidate account' },
          { strongLabel: 'Verification:', text: row.reviewer.metaIsReal ? 'Real legal entity on file' : 'Display name only' },
          { strongLabel: 'Trust tier:', text: row.reviewer.metaIsReal ? 'Verified · standard tier' : 'Standard tier · display name only' },
        ],
        actionKey: 'open-reviewer',
        href: reviewerHref,
      },
      {
        tag: 'REVIEWEE',
        title: row.reviewee.name,
        titleChip: { text: row.reviewee.id.toUpperCase(), color: 'mute' },
        meta: row.reviewee.metaText,
        details: [
          { strongLabel: 'Account:', text: row.reviewee.id },
          { strongLabel: 'Engagement:', text: row.revieweeEngContext },
          { strongLabel: 'Rating received:', text: `${row.rating.toFixed(1)} / 5.0 ★` },
          { strongLabel: 'Tier:', text: row.reviewee.id.startsWith('cl-') ? 'Active client account' : 'Atlas-vetted candidate' },
        ],
        actionKey: 'open-reviewee',
        href: revieweeHref,
      },
    ],
  };
}

function stubPatternData(row: ReviewListRow): ReviewPatternData | undefined {
  if (row.rowVariant !== 'pattern') return undefined;
  // rev-815 specifically — simpler derived stub (rev-834 has canonical full data)
  const confidence = parseInt(row.statusSub.match(/(\d+)%/)?.[1] ?? '80', 10);
  const shortId = row.atlasId.replace('REV-2026-0', 'REV-');

  return {
    severity: 'high',
    headTitle: 'Sock-puppet cluster · part of 4-review pattern',
    confidence,
    summarySegments: [
      { kind: 'text', text: 'This review is part of a ' },
      { kind: 'strong', text: 'sock-puppet cluster' },
      { kind: 'text', text: ' filed by client account ' },
      { kind: 'mono', text: row.reviewer.id },
      { kind: 'text', text: `. ${row.statusSub}. See REV-2026-0834 for full pattern analysis.` },
    ],
    clusterLabel: 'Reviews in cluster — chronological',
    clusterItems: [
      { index: 1, atlasId: 'REV-2026-0742', reviewId: 'rev-742', target: 'Théo Lemaire', meta: 'Apr 24', rating: 1, variant: 'warn', current: false },
      { index: 2, atlasId: 'REV-2026-0758', reviewId: 'rev-758', target: 'Valentina Kraft', meta: 'Apr 27', rating: 1, variant: 'warn', current: false },
      { index: 3, atlasId: row.atlasId, target: row.reviewee.name, meta: `${row.postedDate.split(',')[0]} · current`, rating: 1, variant: 'danger', current: true },
      { index: 4, atlasId: 'REV-2026-0834', reviewId: 'rev-834', target: 'Adesuwa Babatunde', meta: 'Apr 30', rating: 1, variant: 'warn', current: false },
    ],
    similarityLabel: 'Pairwise content similarity — see canonical REV-834 for full matrix',
    similarityHeaders: ['REV-742', 'REV-758', shortId, 'REV-834'],
    similarityRows: [
      { label: 'REV-742', cells: [{ variant: 'diag', value: '—' }, { variant: 'heat-high', value: '88%' }, { variant: 'heat-high', value: '86%' }, { variant: 'heat-xhigh', value: '92%' }] },
      { label: 'REV-758', cells: [{ variant: 'heat-high', value: '88%' }, { variant: 'diag', value: '—' }, { variant: 'heat-high', value: '87%' }, { variant: 'heat-high', value: '89%' }] },
      { label: shortId, cells: [{ variant: 'heat-high', value: '86%' }, { variant: 'heat-high', value: '87%' }, { variant: 'diag', value: '—' }, { variant: 'heat-high', value: '90%' }] },
      { label: 'REV-834', cells: [{ variant: 'heat-xhigh', value: '92%' }, { variant: 'heat-high', value: '89%' }, { variant: 'heat-high', value: '90%' }, { variant: 'diag', value: '—' }] },
    ],
    captionSegments: [
      { text: 'Cluster average ' },
      { text: '89%', color: 'danger', bold: true },
      { text: ' · derived stub — see REV-834 canonical for full analysis.' },
    ],
    signalsLabel: 'Detection signals — abbreviated',
    signals: [
      { iconVariant: 'default', iconChar: '!', label: 'Same client account across all 4 reviews', detail: `${row.reviewer.id} · ${row.reviewer.metaText}` },
      { iconVariant: 'default', iconChar: '!', label: 'All ratings exactly 1 star', detail: '0 prior 1-stars on any cluster targets' },
      { iconVariant: 'warn', iconChar: '!', label: 'Compressed 7-day timeline', detail: 'All 4 reviews posted Apr 24 → Apr 30' },
      { iconVariant: 'neutral', iconChar: '·', label: 'Canonical analysis on REV-834', detail: 'Open REV-834 for full pattern detection breakdown' },
    ],
    recommendation: {
      strongParts: ['Remove all 4 reviews', 'suspend reviewer account'],
      plainParts: [' in cluster + ', '.'],
      emPart: 'See REV-2026-0834 canonical recommendation for full action plan.',
      deferLabel: 'Defer to T&S only',
      deferActionKey: 'recommend-defer',
      applyLabel: 'Apply recommendation →',
      applyActionKey: 'recommend-apply',
    },
  };
}

function stubFlagsData(row: ReviewListRow): ReviewFlagsData {
  const items: ReviewFlagItem[] = [];

  if (row.status === 'pattern') {
    items.push({
      kind: 'system',
      iconSvg: 'target',
      source: 'Atlas pattern-detection system',
      tag: 'SYSTEM',
      time: `${row.postedDate} (auto-flag on post)`,
      reason: `Sock-puppet cluster threshold exceeded · ${row.statusSub} · auto-hide triggered.`,
      status: 'flag-active',
    });
    items.push({
      kind: 'user',
      iconSvg: 'user',
      source: `${row.reviewee.name} (reviewee)`,
      tag: 'USER',
      time: `${row.postedDate} +2h`,
      reason: '“This review does not reflect our engagement. Pattern matches similar reviews on other Atlas candidates.”',
      status: 'flag-active',
    });
  } else if (row.status === 'flagged') {
    items.push({
      kind: 'user',
      iconSvg: 'user',
      source: `${row.reviewee.name} (reviewee)`,
      tag: 'USER',
      time: row.postedDate,
      reason: `Flagged for review · ${row.statusSub}.`,
      status: 'flag-active',
    });
  } else if (row.status === 'removed') {
    items.push({
      kind: 'resolved',
      iconSvg: 'user',
      source: 'Atlas Operations Admin',
      tag: 'RESOLVED',
      time: `${row.postedDate} (removal)`,
      reason: `Removal reason: ${row.statusSub}. Content scrubbed from public view.`,
      status: 'resolved',
    });
  } else if (row.status === 'appealed') {
    items.push({
      kind: 'user',
      iconSvg: 'user',
      source: `${row.reviewer.name} (reviewer · appealing)`,
      tag: 'USER',
      time: row.postedDate,
      reason: `Appeal filed against removal · ${row.statusSub}.`,
      status: 'flag-active',
    });
  }
  // live: empty items array

  return { items };
}

function stubModerationData(row: ReviewListRow): ReviewModerationData {
  // Base events — universal for all 10 reviews (3 system events on submission)
  const events: ReviewModEvent[] = [
    {
      variant: 'system',
      actor: 'System',
      actionSegments: [{ kind: 'text', text: 'posted publicly · default state on submission' }],
      time: `${row.postedDate} UTC`,
      detail: `${row.atlasId} created · author ${row.reviewer.id} · target ${row.reviewee.id} · rating ${row.rating.toFixed(1)} · auto-published per default policy.`,
    },
    {
      variant: 'system',
      actor: 'System',
      actionSegments: [{ kind: 'text', text: 'indexed for public search · added to reviewee profile' }],
      time: `${row.postedDate} +1m`,
      detail: `Review surfaced on ${row.reviewee.id}'s public profile and indexed in Atlas search · 0 reports at this time.`,
    },
    {
      variant: 'system',
      actor: 'System',
      actionSegments: [{ kind: 'text', text: `notified ${row.reviewee.name} of new review` }],
      time: `${row.postedDate} +2m`,
      detail: 'Reviewee notification dispatched · email + in-app · standard new-review template.',
    },
  ];

  if (row.status === 'pattern') {
    events.push({
      variant: 'danger',
      actor: 'System (pattern-detection)',
      actionSegments: [
        { kind: 'text', text: 'flagged as ' },
        { kind: 'strong', text: 'sock-puppet pattern' },
        { kind: 'text', text: ' · auto-hidden from public' },
      ],
      time: `${row.postedDate} +5m`,
      detail: `Pattern threshold exceeded · ${row.statusSub} · review removed from public profile pending T&S review.`,
    });
    events.push({
      variant: 'admin',
      actor: 'Sarah R. · Operations Admin',
      actionSegments: [{ kind: 'text', text: 'opened cluster investigation · assigned to self' }],
      time: `${row.postedDate} +1d`,
      detail: 'Investigation opened · scope: full cluster + reviewer account history · pending T&S confirmation within 5 business days.',
    });
  } else if (row.status === 'flagged') {
    events.push({
      variant: 'default',
      actor: row.reviewee.name,
      actionSegments: [{ kind: 'text', text: 'filed report on the review' }],
      time: `${row.postedDate} +1d`,
      detail: `Report reason: ${row.statusSub} · reviewee requested moderation review.`,
    });
    events.push({
      variant: 'admin',
      actor: 'Sarah R. · Operations Admin',
      actionSegments: [{ kind: 'text', text: 'review held pending investigation' }],
      time: `${row.postedDate} +1d 2h`,
      detail: 'Manual review queued · standard 48h SLA · reviewer and reviewee notified of investigation.',
    });
  } else if (row.status === 'removed') {
    events.push({
      variant: 'admin',
      actor: 'Sarah R. · Operations Admin',
      actionSegments: [
        { kind: 'text', text: 'removed review · reason: ' },
        { kind: 'strong', text: row.statusSub },
      ],
      time: `${row.postedDate} +2h`,
      detail: 'Content scrubbed from public view · reviewee notified of removal action.',
    });
    events.push({
      variant: 'system',
      actor: 'System',
      actionSegments: [{ kind: 'text', text: 'removal reason logged · archived for audit' }],
      time: `${row.postedDate} +2h 1m`,
      detail: `Full content snapshot archived · ${row.atlasId} marked 'removed' across all surfaces · public profile updated.`,
    });
  } else if (row.status === 'appealed') {
    events.push({
      variant: 'admin',
      actor: 'Sarah R. · Operations Admin',
      actionSegments: [{ kind: 'text', text: 'removed review · awaiting appeal review' }],
      time: `${row.postedDate} +5h`,
      detail: `Initial removal action · ${row.statusSub} · standard appeal window opened (72h).`,
    });
    events.push({
      variant: 'default',
      actor: row.reviewer.name,
      actionSegments: [{ kind: 'text', text: 'submitted appeal · review under T&S review' }],
      time: `${row.postedDate} +6h`,
      detail: 'Appeal documentation filed by reviewer · scheduled Trust & Safety review within 5 business days.',
    });
  } else {
    // live
    events.push({
      variant: 'default',
      actor: 'System',
      actionSegments: [{ kind: 'text', text: 'review remains live · no moderation actions' }],
      time: `${row.postedDate} +1d`,
      detail: `Review continues to be publicly visible · ${row.statusSub} · no concerns raised.`,
    });
  }

  return { events };
}

function stubAuditData(row: ReviewListRow): ReviewAuditData {
  // Entries rendered newest-first (chronological reverse, matching admin.html convention)
  const entries: ReviewAuditEntry[] = [];

  // Most recent: current admin view
  entries.push({
    timestamp: 'May 5 · 10:14',
    actor: 'Aïsha (you)',
    actorVariant: 'admin',
    action: 'opened review detail · viewed all 6 sections',
    actionVariant: 'default',
    ipDev: '192.x · MBP',
  });

  // Status-derived entries (between admin view and submission pipeline)
  if (row.status === 'pattern') {
    entries.push({
      timestamp: `${row.postedDate} +1d`,
      actor: 'Sarah R.',
      actorVariant: 'admin',
      action: 'opened cluster investigation · assigned to self',
      actionVariant: 'default',
      ipDev: '10.x · admin',
    });
    entries.push({
      timestamp: `${row.postedDate} +5m`,
      actor: 'SYSTEM',
      actorVariant: 'system',
      action: `PATTERN FLAG · auto-hidden · ${row.statusSub}`,
      actionVariant: 'danger',
      ipDev: 'internal',
    });
  } else if (row.status === 'flagged') {
    entries.push({
      timestamp: `${row.postedDate} +1d 2h`,
      actor: 'Sarah R.',
      actorVariant: 'admin',
      action: 'review held pending investigation',
      actionVariant: 'default',
      ipDev: '10.x · admin',
    });
    entries.push({
      timestamp: `${row.postedDate} +1d`,
      actor: row.reviewee.id,
      actorVariant: 'user',
      action: `report filed by reviewee · ${row.statusSub}`,
      actionVariant: 'default',
      ipDev: 'user · ip',
    });
  } else if (row.status === 'removed') {
    entries.push({
      timestamp: `${row.postedDate} +2h`,
      actor: 'Sarah R.',
      actorVariant: 'admin',
      action: `removed review · reason: ${row.statusSub}`,
      actionVariant: 'danger',
      ipDev: '10.x · admin',
    });
    entries.push({
      timestamp: `${row.postedDate} +2h 1m`,
      actor: 'SYSTEM',
      actorVariant: 'system',
      action: 'removal reason logged · content archived',
      actionVariant: 'default',
      ipDev: 'internal',
    });
  } else if (row.status === 'appealed') {
    entries.push({
      timestamp: `${row.postedDate} +6h`,
      actor: row.reviewer.id,
      actorVariant: 'user',
      action: `appeal filed against removal · ${row.statusSub}`,
      actionVariant: 'default',
      ipDev: 'user · ip',
    });
    entries.push({
      timestamp: `${row.postedDate} +5h`,
      actor: 'Sarah R.',
      actorVariant: 'admin',
      action: 'removed review · awaiting appeal review',
      actionVariant: 'default',
      ipDev: '10.x · admin',
    });
  }

  // Universal system pipeline entries (always present, newest-first)
  entries.push({
    timestamp: `${row.postedDate} +2m`,
    actor: 'SYSTEM',
    actorVariant: 'system',
    action: 'reviewee notification dispatched (email + in-app)',
    actionVariant: 'default',
    ipDev: 'internal',
  });
  entries.push({
    timestamp: `${row.postedDate} +1m`,
    actor: 'SYSTEM',
    actorVariant: 'system',
    action: 'AI pattern scan completed · indexed for public search',
    actionVariant: 'default',
    ipDev: 'internal',
  });
  entries.push({
    timestamp: `${row.postedDate} +30s`,
    actor: 'SYSTEM',
    actorVariant: 'system',
    action: 'content policy check passed · auto-publish authorized',
    actionVariant: 'default',
    ipDev: 'internal',
  });

  // Oldest: submission entry
  entries.push({
    timestamp: row.postedDate,
    actor: row.reviewer.id,
    actorVariant: 'user',
    action: `${row.atlasId} submitted · rating ${row.rating.toFixed(1)} · ${row.snippet.length} chars`,
    actionVariant: 'default',
    ipDev: 'user · ip',
  });

  return {
    entries,
    footerText: '· derived stub · see REV-2026-0834 for canonical full audit log · ',
    footerActionKey: 'audit-expand',
  };
}

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
      content: sectionStatus(
        row.status === 'removed' ? 'Removed from public · admin action' :
        row.status === 'pattern' ? 'Hidden from public · pattern detected' :
        row.status === 'flagged' ? 'Visible · under moderation review' :
        row.status === 'appealed' ? 'Hidden · appeal in progress' :
        'Live · publicly visible',
        row.status === 'pattern' || row.status === 'removed' ? 'warn' :
        row.status === 'flagged' || row.status === 'appealed' ? 'warn' : 'default'
      ),
      context: sectionStatus(row.revieweeEngContext, 'default'),
      pattern: sectionStatus(
        row.status === 'pattern' ? row.statusSub : 'No pattern detected · review is clean',
        row.status === 'pattern' ? 'danger' : 'neutral'
      ),
      flags: sectionStatus(
        row.status === 'flagged' ? '1 active flag · under review' :
        row.status === 'pattern' ? '2 active flags' :
        row.status === 'removed' ? '1 flag · resolved' :
        row.status === 'appealed' ? '1 flag · disputed' :
        '0 active flags · review clean',
        row.status === 'flagged' || row.status === 'pattern' ? 'danger' :
        row.status === 'appealed' ? 'warn' : 'neutral'
      ),
      moderation: sectionStatus(
        row.status === 'live' ? '4 events · derived stub' : '5 events · derived stub',
        'default'
      ),
      audit: sectionStatus(
        row.status === 'live' ? '5 entries · derived stub' :
        row.status === 'appealed' ? '7 entries · derived stub' :
        '6 entries · derived stub',
        'neutral'
      ),
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

  // Phase 13c — derived section data stubs (rev-834 canonical NOT overwritten;
  // pattern data is undefined for non-pattern reviews → placeholder fallback in shell)
  profile.contentData = stubContentData(row);
  profile.contextData = stubContextData(row);
  const patternStub = stubPatternData(row);
  if (patternStub) profile.patternData = patternStub;
  profile.flagsData = stubFlagsData(row);
  profile.moderationData = stubModerationData(row);
  profile.auditData = stubAuditData(row);

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
