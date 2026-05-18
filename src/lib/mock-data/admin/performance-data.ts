/* admin.html lines 64005-64059 — Performance Dashboards Pass A fixtures (verbatim) */

import type { PrStat } from './privacy-reports-data';

// ============================================================
// TYPES
// ============================================================

export type PfPeriodValue = 'q1' | 'q2' | 'ytd' | '12mo';

export interface PfPeriodTab {
  value: PfPeriodValue;
  label: string;
  active?: boolean;
}

export interface PfHeaderAction {
  label: string;
  icon: 'calendar' | 'download';
  isPrimary?: boolean;
}

export interface PfPageMeta {
  title: string;
  metaText: string;
}

// ============================================================
// PAGE-LEVEL FIXTURES (admin.html 64005-64030)
// ============================================================

export const pfPageMeta: PfPageMeta = {
  title: 'Performance dashboards',
  metaText:
    '/admin/internal/performance · 12 team members · Mateo (Manager) + 11 Specialists · Q2 2026 in progress · last refresh 4 min ago',
};

export const pfMetaPulseHtml =
  'Lina (spec-007) flagged for support · 1:1 scheduled this week';

export const pfPeriodTabs: PfPeriodTab[] = [
  { value: 'q1', label: 'Q1' },
  { value: 'q2', label: 'Q2', active: true },
  { value: 'ytd', label: 'YTD' },
  { value: '12mo', label: '12mo' },
];

export const pfHeaderActions: PfHeaderAction[] = [
  { label: 'Schedule 1:1s', icon: 'calendar' },
  { label: 'Export PDF', icon: 'download', isPrimary: true },
];

// ============================================================
// STATS STRIP (admin.html 64033-64059)
// ============================================================

export const pfTopStats: PrStat[] = [
  {
    label: 'Team size',
    value: '12',
    meta: '<strong>1 Manager</strong> · 11 Specialists · 0 vacancies',
  },
  {
    label: 'Active engagements',
    value: '1,847',
    meta: '<strong>↑ +14%</strong> Q2 vs Q1',
  },
  {
    label: 'Avg SLA compliance',
    value: '96.8',
    suffix: '%',
    variant: 'success',
    meta: 'target 95% · above target 7 wks',
  },
  {
    label: 'Avg CSAT',
    value: '4.6',
    suffix: '/5',
    meta: '3,840 ratings YTD · top quartile',
  },
  {
    label: 'Team composite',
    value: 'A',
    variant: 'success',
    meta: '1 specialist needs support',
  },
];

// ============================================================
// SECTION 01 + 02 TYPES (Pass B)
// ============================================================

export type PfGrade = 'A' | 'A-' | 'B' | 'B-' | 'C';
export type PfTrendDirection = 'up' | 'flat' | 'down';
export type PfBarVariant = 'high' | 'medium' | 'low';
export type PfMetricValueVariant = 'success' | 'warn' | 'danger';

export interface PfSectionHeadAction {
  label: string;
  icon?: 'user' | 'sort' | 'download' | 'audit';
  isPrimary?: boolean;
}

export interface PfSectionHead {
  num: string;
  title: string;
  meta: string;
  actions?: PfSectionHeadAction[];
}

export interface PfManagerMetric {
  label: string;
  value: string;
  suffix?: string;
  valueVariant?: PfMetricValueVariant;
  metaHtml: string;
  trend?: { direction: PfTrendDirection; label: string };
}

export interface PfManagerData {
  sectionHead: PfSectionHead;
  avatarInitials: string;
  eyebrow: string;
  name: string;
  metaHtml: string;
  ratingValue: string;
  ratingLabel: string;
  metrics: PfManagerMetric[];
  notesHtml: string;
}

export interface PfTableColumn {
  key: string;
  label: string;
  isNumeric?: boolean;
  isCentered?: boolean;
  widthPct?: string; // e.g. "22%" or "40px"
  sortedDesc?: boolean;
  sortedAsc?: boolean;
}

export interface PfSpecialistAvatar {
  initials: string;
  gradient: string; // verbatim linear-gradient(...)
}

export interface PfMetricCellSimple {
  label: string;
  variant?: PfBarVariant;
  sub?: string;
}

export interface PfMetricCellWithBar {
  percent: number;
  label: string;
  variant: PfBarVariant;
  sub?: string;
}

export interface PfSpecialistRow {
  id: string;
  rank: number;
  isTopRank?: boolean;
  rowVariant?: 'featured' | 'needs-support';
  avatar: PfSpecialistAvatar;
  name: string;
  metaHtml: string;
  engagements: PfMetricCellSimple; // value + trend in sub
  sla: PfMetricCellWithBar; // SLA · 30d
  csat: PfMetricCellWithBar; // CSAT score (label e.g. "4.8/5")
  disputeRate: PfMetricCellSimple; // e.g. "0.8%" + sub "2 of 247"
  responseP50: PfMetricCellSimple; // e.g. "1.2h" + optional sub
  grade: PfGrade;
}

export interface PfSpecialistTableData {
  sectionHead: PfSectionHead;
  columns: PfTableColumn[];
  rows: PfSpecialistRow[];
  footerMeta: string;
  footerButtonLabel: string;
}

// ============================================================
// SECTION 01 — Manager fixture (admin.html 64064-64132)
// ============================================================

export const pfManager: PfManagerData = {
  sectionHead: {
    num: '01',
    title: 'Manager performance',
    meta: 'Manager-level metrics · escalation handling · team satisfaction · decision velocity · self-managed in Step 8 page',
    actions: [{ label: "Open Mateo's profile", icon: 'user' }],
  },
  avatarInitials: 'MK',
  eyebrow: 'MANAGER · 11 DIRECT REPORTS',
  name: 'Mateo Kowalski',
  metaHtml:
    'mgr-001 · joined <strong>Aug 2024</strong> · 21mo tenure · last 1:1s cycle <strong>Apr 25–May 2</strong> · 11/11 completed',
  ratingValue: 'A',
  ratingLabel: 'COMPOSITE · Q2',
  metrics: [
    {
      label: 'Escalations handled',
      value: '47',
      metaHtml: 'Q2 · <strong>92%</strong> resolved in SLA',
      trend: { direction: 'up', label: '↑ +12% vs Q1' },
    },
    {
      label: 'Decisions made',
      value: '218',
      metaHtml: 'approvals · escalation rulings · cross-ref <strong>Step 25 audit</strong>',
      trend: { direction: 'up', label: '↑ +8% Q2' },
    },
    {
      label: 'Direct-report CSAT',
      value: '4.7',
      suffix: '/5',
      valueVariant: 'success',
      metaHtml: '11 anonymized responses · skip-level survey',
      trend: { direction: 'up', label: '↑ from 4.5' },
    },
    {
      label: 'Avg time to escalate',
      value: '2.4',
      suffix: 'hr',
      metaHtml: 'from specialist flag to manager pickup · target &lt; 4h',
      trend: { direction: 'up', label: '↑ -38min Q2' },
    },
    {
      label: 'Coverage',
      value: '11',
      suffix: '/11',
      metaHtml: 'specialists covered · <strong>0 gaps</strong> · backup designated',
      trend: { direction: 'flat', label: 'stable' },
    },
  ],
  notesHtml:
    '<strong>Notes from peer reviews:</strong> "Mateo is consistently calm under escalation pressure and balances specialist autonomy with timely intervention." Strengths called out: dispute mediation (DSP-2026-0144 was singled out as exemplary), cross-time-zone scheduling, calibration of vetting standards. Development area: more proactive 1:1 cadence on lower-volume specialists (Lina, Aaron). <strong>Next review:</strong> end of Q2 by Dario (Super Admin).',
};

// ============================================================
// SECTION 02 — Specialist comparison table (admin.html 64137-64513)
// ============================================================

export const pfSpecialistTable: PfSpecialistTableData = {
  sectionHead: {
    num: '02',
    title: 'Specialist comparison · 11 specialists',
    meta: 'ranked by composite score · click column headers to re-sort · admin view shows all names (anonymized in specialists\' own view)',
    actions: [
      { label: 'Reset sort' },
      { label: 'Export CSV' },
    ],
  },
  columns: [
    { key: 'rank', label: '#', widthPct: '40px' },
    { key: 'specialist', label: 'Specialist', widthPct: '22%' },
    { key: 'engagements', label: 'Engagements', isNumeric: true, widthPct: '11%' },
    { key: 'sla', label: 'SLA · 30d', widthPct: '13%' },
    { key: 'csat', label: 'CSAT', widthPct: '13%' },
    { key: 'disputeRate', label: 'Dispute rate', isNumeric: true, widthPct: '11%' },
    { key: 'responseP50', label: 'Response · p50', isNumeric: true, widthPct: '12%' },
    { key: 'grade', label: 'Grade', isCentered: true, widthPct: '8%', sortedDesc: true },
  ],
  rows: [
    {
      id: 'spec-001',
      rank: 1,
      isTopRank: true,
      rowVariant: 'featured',
      avatar: { initials: 'DP', gradient: 'linear-gradient(135deg, #4F6BED, #2540A8)' },
      name: 'Daniel Park',
      metaHtml: 'spec-001 · <strong>SWE / Data / PM</strong> · 18mo',
      engagements: { label: '247', sub: '↑ +14%' },
      sla: { percent: 98.4, label: '98.4%', variant: 'high' },
      csat: { percent: 96, label: '4.8/5', variant: 'high', sub: '487 ratings' },
      disputeRate: { label: '0.8%', variant: 'high', sub: '2 of 247' },
      responseP50: { label: '1.2h', sub: 'target < 4h' },
      grade: 'A',
    },
    {
      id: 'spec-002',
      rank: 2,
      avatar: { initials: 'PI', gradient: 'linear-gradient(135deg, #B85A8F, #7E3D62)' },
      name: 'Priya Iyer',
      metaHtml: 'spec-002 · <strong>Sales / CS</strong> · 16mo',
      engagements: { label: '214', sub: '↑ +9%' },
      sla: { percent: 97.8, label: '97.8%', variant: 'high' },
      csat: { percent: 94, label: '4.7/5', variant: 'high', sub: '412 ratings' },
      disputeRate: { label: '1.4%', variant: 'high', sub: '3 of 214' },
      responseP50: { label: '1.8h' },
      grade: 'A',
    },
    {
      id: 'spec-003',
      rank: 3,
      avatar: { initials: 'TW', gradient: 'linear-gradient(135deg, #E876BA, #A8408A)' },
      name: 'Tomasz Wójcik',
      metaHtml: 'spec-003 · <strong>Design</strong> · 14mo',
      engagements: { label: '189', sub: '↑ +6%' },
      sla: { percent: 97.1, label: '97.1%', variant: 'high' },
      csat: { percent: 94, label: '4.7/5', variant: 'high', sub: '364 ratings' },
      disputeRate: { label: '1.6%', variant: 'high' },
      responseP50: { label: '1.5h' },
      grade: 'A',
    },
    {
      id: 'spec-004',
      rank: 4,
      avatar: { initials: 'CW', gradient: 'linear-gradient(135deg, #6E4F8B, #3D2B4E)' },
      name: 'Chen Wei',
      metaHtml: 'spec-004 · <strong>Marketing / Growth</strong> · 12mo',
      engagements: { label: '178', sub: '↑ +4%' },
      sla: { percent: 96.4, label: '96.4%', variant: 'high' },
      csat: { percent: 92, label: '4.6/5', variant: 'high' },
      disputeRate: { label: '1.7%', variant: 'high' },
      responseP50: { label: '2.1h' },
      grade: 'A-',
    },
    {
      id: 'spec-005',
      rank: 5,
      avatar: { initials: 'CM', gradient: 'linear-gradient(135deg, #4A7C3F, #2D5028)' },
      name: 'Carolina Méndez',
      metaHtml: 'spec-005 · <strong>People / Recruiting</strong> · 11mo',
      engagements: { label: '162', sub: '↑ +11%' },
      sla: { percent: 96.2, label: '96.2%', variant: 'high' },
      csat: { percent: 92, label: '4.6/5', variant: 'high' },
      disputeRate: { label: '2.1%', variant: 'high' },
      responseP50: { label: '1.9h' },
      grade: 'A-',
    },
    {
      id: 'spec-006',
      rank: 6,
      avatar: { initials: 'FR', gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)' },
      name: 'Faisal Rahman',
      metaHtml: 'spec-006 · <strong>SWE (overflow)</strong> · 10mo',
      engagements: { label: '148', sub: '↑ +18%' },
      sla: { percent: 95.7, label: '95.7%', variant: 'high' },
      csat: { percent: 90, label: '4.5/5', variant: 'high' },
      disputeRate: { label: '2.0%', variant: 'high' },
      responseP50: { label: '2.4h' },
      grade: 'A-',
    },
    {
      id: 'spec-008',
      rank: 7,
      avatar: { initials: 'JS', gradient: 'linear-gradient(135deg, #2D3E50, #1A232C)' },
      name: 'Jia-Lin Su',
      metaHtml: 'spec-008 · <strong>Product Mgmt</strong> · 9mo',
      engagements: { label: '142', sub: 'stable' },
      sla: { percent: 95.3, label: '95.3%', variant: 'high' },
      csat: { percent: 90, label: '4.5/5', variant: 'high' },
      disputeRate: { label: '2.3%', variant: 'high' },
      responseP50: { label: '2.6h' },
      grade: 'A-',
    },
    {
      id: 'spec-009',
      rank: 8,
      avatar: { initials: 'OA', gradient: 'linear-gradient(135deg, #E8763A, #A35A2C)' },
      name: 'Olamide Adebayo',
      metaHtml: 'spec-009 · <strong>Content / Editorial</strong> · 8mo',
      engagements: { label: '128', sub: '↓ -4%' },
      sla: { percent: 94.8, label: '94.8%', variant: 'high' },
      csat: { percent: 88, label: '4.4/5', variant: 'high' },
      disputeRate: { label: '2.4%', variant: 'high' },
      responseP50: { label: '2.8h' },
      grade: 'B',
    },
    {
      id: 'spec-010',
      rank: 9,
      avatar: { initials: 'MK', gradient: 'linear-gradient(135deg, #4A6741, #2C3E2A)' },
      name: 'Mira Karpov',
      metaHtml: 'spec-010 · <strong>Finance / Ops</strong> · 7mo',
      engagements: { label: '118', sub: '↑ +22%' },
      sla: { percent: 94.1, label: '94.1%', variant: 'high' },
      csat: { percent: 88, label: '4.4/5', variant: 'high' },
      disputeRate: { label: '2.5%', variant: 'high' },
      responseP50: { label: '3.1h' },
      grade: 'B',
    },
    {
      id: 'spec-011',
      rank: 10,
      avatar: { initials: 'AC', gradient: 'linear-gradient(135deg, #6E4F8B, #3D2B4E)' },
      name: 'Aaron Chen',
      metaHtml: 'spec-011 · <strong>Legal / Compliance</strong> · 6mo',
      engagements: { label: '94', sub: 'stable · specialty' },
      sla: { percent: 93.6, label: '93.6%', variant: 'high' },
      csat: { percent: 86, label: '4.3/5', variant: 'medium' },
      disputeRate: { label: '2.8%', variant: 'high' },
      responseP50: { label: '3.4h' },
      grade: 'B',
    },
    {
      id: 'spec-007',
      rank: 11,
      rowVariant: 'needs-support',
      avatar: { initials: 'LA', gradient: 'linear-gradient(135deg, #8B6F47, #5C4A2E)' },
      name: 'Lina Almeida',
      metaHtml: 'spec-007 · <strong>SWE (new)</strong> · 3mo · ramping',
      engagements: { label: '62', sub: '↑ +34%' },
      sla: { percent: 89.2, label: '89.2%', variant: 'medium', sub: 'below 95% target' },
      csat: { percent: 84, label: '4.2/5', variant: 'medium', sub: '87 ratings' },
      disputeRate: { label: '3.2%', variant: 'medium' },
      responseP50: { label: '4.6h', variant: 'medium', sub: 'target < 4h' },
      grade: 'B-',
    },
  ],
  footerMeta:
    '11 of 11 specialists shown · sorted by composite grade desc · admin view (names visible) · in specialist\'s own view their peers are anonymized',
  footerButtonLabel: 'View calibration methodology →',
};

// ============================================================
// SECTION 03 — Cross-team metrics cluster grid (admin.html 64516-64720)
// ============================================================

export interface PfClusterMetricRow {
  label: string;
  percent: number;
  variant: PfBarVariant;
  value: string;
}

export interface PfClusterCard {
  id: string;
  title: string;
  metaHtml: string;
  grade: PfGrade;
  rows: PfClusterMetricRow[];
}

export interface PfClusterGridData {
  sectionHead: PfSectionHead;
  clusters: PfClusterCard[];
}

export const pfClusterGrid: PfClusterGridData = {
  sectionHead: {
    num: '03',
    title: 'Cross-team metrics · by role-family cluster',
    meta: 'specialists grouped by primary role-family · highlights where talent depth differs · informs hiring + load balancing',
    actions: [{ label: 'View Step 29 categories →' }],
  },
  clusters: [
    {
      id: 'cluster-swe',
      title: 'Software Engineering',
      metaHtml: '<strong>3 specialists</strong> · Daniel (lead) · Faisal · Lina · 2,471 candidates · 147 open jobs',
      grade: 'A',
      rows: [
        { label: 'Engagements', percent: 92, variant: 'high', value: '457' },
        { label: 'SLA avg', percent: 94.4, variant: 'high', value: '94.4%' },
        { label: 'CSAT avg', percent: 90, variant: 'high', value: '4.5/5' },
        { label: 'Load balance', percent: 68, variant: 'medium', value: '68%' },
      ],
    },
    {
      id: 'cluster-design',
      title: 'Design',
      metaHtml: '<strong>1 specialist</strong> · Tomasz · 1,184 candidates · 68 open jobs · solo coverage',
      grade: 'A',
      rows: [
        { label: 'Engagements', percent: 76, variant: 'high', value: '189' },
        { label: 'SLA avg', percent: 97.1, variant: 'high', value: '97.1%' },
        { label: 'CSAT avg', percent: 94, variant: 'high', value: '4.7/5' },
        { label: 'Load balance', percent: 30, variant: 'low', value: 'N/A solo' },
      ],
    },
    {
      id: 'cluster-sales',
      title: 'Sales & Customer Success',
      metaHtml: '<strong>1 specialist</strong> · Priya · 986 candidates · 58 open jobs',
      grade: 'A',
      rows: [
        { label: 'Engagements', percent: 86, variant: 'high', value: '214' },
        { label: 'SLA avg', percent: 97.8, variant: 'high', value: '97.8%' },
        { label: 'CSAT avg', percent: 94, variant: 'high', value: '4.7/5' },
        { label: 'Load balance', percent: 30, variant: 'low', value: 'N/A solo' },
      ],
    },
    {
      id: 'cluster-data',
      title: 'Data & Analytics',
      metaHtml: '<strong>Daniel (cross-cover)</strong> · 892 candidates · 94 open jobs · pool depth gap',
      grade: 'B',
      rows: [
        { label: 'Engagements', percent: 56, variant: 'medium', value: '94' },
        { label: 'SLA avg', percent: 96, variant: 'high', value: '96.0%' },
        { label: 'CSAT avg', percent: 90, variant: 'high', value: '4.5/5' },
        { label: 'Pool depth', percent: 38, variant: 'low', value: '38%' },
      ],
    },
    {
      id: 'cluster-marketing',
      title: 'Marketing & Growth',
      metaHtml: '<strong>1 specialist</strong> · Chen Wei · 1,547 candidates · 82 open jobs',
      grade: 'A-',
      rows: [
        { label: 'Engagements', percent: 71, variant: 'high', value: '178' },
        { label: 'SLA avg', percent: 96.4, variant: 'high', value: '96.4%' },
        { label: 'CSAT avg', percent: 92, variant: 'high', value: '4.6/5' },
        { label: 'Load balance', percent: 30, variant: 'low', value: 'N/A solo' },
      ],
    },
    {
      id: 'cluster-specialty',
      title: 'Specialty roles · combined',
      metaHtml: '<strong>5 specialists</strong> · PM · Content · People · Finance · Legal · 2,309 candidates · 175 open jobs',
      grade: 'A-',
      rows: [
        { label: 'Engagements', percent: 73, variant: 'high', value: '644' },
        { label: 'SLA avg', percent: 95.2, variant: 'high', value: '95.2%' },
        { label: 'CSAT avg', percent: 88, variant: 'high', value: '4.4/5' },
        { label: 'Load balance', percent: 82, variant: 'high', value: '82%' },
      ],
    },
  ],
};

// ============================================================
// SECTION 04 — Specialist deep-dive cards (admin.html 64724-64844)
// ============================================================

export interface PfDeepDiveStatRow {
  label: string;
  percent: number;
  variant: PfBarVariant;
  value: string;
}

export type PfDeepDiveVariant = 'top' | 'improving';

export interface PfDeepDiveCard {
  id: string;
  variant: PfDeepDiveVariant;
  avatarInitials: string;
  avatarGradient: string;
  eyebrow: string;
  name: string;
  metaText: string;
  scoreValue: string;
  scoreLabel: string;
  stats: PfDeepDiveStatRow[];
  footHtml: string;
}

export interface PfDeepDiveGridData {
  sectionHead: PfSectionHead;
  cards: PfDeepDiveCard[];
}

export const pfDeepDiveGrid: PfDeepDiveGridData = {
  sectionHead: {
    num: '04',
    title: 'Specialist deep-dive',
    meta: 'top performer · improving specialist on plan · informs 1:1 priorities + recognition',
    actions: [{ label: 'Step 25 audit', icon: 'audit' }],
  },
  cards: [
    {
      id: 'deep-dive-daniel',
      variant: 'top',
      avatarInitials: 'DP',
      avatarGradient: 'linear-gradient(135deg, #4F6BED, #2540A8)',
      eyebrow: 'TOP PERFORMER · Q2',
      name: 'Daniel Park · spec-001',
      metaText: 'Software Engineering / Data / PM · 18 months tenure',
      scoreValue: '98',
      scoreLabel: 'SCORE / 100',
      stats: [
        { label: 'SLA · 30d', percent: 98.4, variant: 'high', value: '98.4%' },
        { label: 'CSAT', percent: 96, variant: 'high', value: '4.8 / 5' },
        { label: 'Response p50', percent: 95, variant: 'high', value: '1.2 h' },
        { label: 'Dispute rate', percent: 96, variant: 'high', value: '0.8%' },
        { label: 'Engagements', percent: 94, variant: 'high', value: '247' },
        { label: 'Escalations sent', percent: 88, variant: 'high', value: '3 only' },
      ],
      footHtml:
        "<strong>Trend Q1 → Q2:</strong> engagements +14% · CSAT +0.2 · response time -22min · zero disputes escalated past Daniel's resolution. Owns canonical client relationships including <strong>Studio Berlin (cl-002)</strong> and <strong>Acme Robotics (cl-088)</strong>. Notable: led the <strong>DSP-2026-0144 (Stefan / Tomás)</strong> evidence assembly that informed the Tomás refund (REF-2026-0084).",
    },
    {
      id: 'deep-dive-lina',
      variant: 'improving',
      avatarInitials: 'LA',
      avatarGradient: 'linear-gradient(135deg, #8B6F47, #5C4A2E)',
      eyebrow: 'IMPROVING · 1:1 SCHEDULED THIS WK',
      name: 'Lina Almeida · spec-007',
      metaText: 'Software Engineering (newer) · 3 months tenure · ramp window 6mo',
      scoreValue: '76',
      scoreLabel: 'SCORE / 100 · UP +14',
      stats: [
        { label: 'SLA · 30d', percent: 89.2, variant: 'medium', value: '89.2%' },
        { label: 'CSAT', percent: 84, variant: 'medium', value: '4.2 / 5' },
        { label: 'Response p50', percent: 60, variant: 'medium', value: '4.6 h' },
        { label: 'Dispute rate', percent: 72, variant: 'medium', value: '3.2%' },
        { label: 'Engagements', percent: 48, variant: 'medium', value: '62' },
        { label: 'Escalations sent', percent: 78, variant: 'high', value: '14' },
      ],
      footHtml:
        '<strong>Trend Q1 → Q2:</strong> engagements +34% as ramp progresses · CSAT +0.3 · escalations dropping as judgment improves. <strong>1:1 this Friday with Mateo</strong> · focus areas: response time (4.6h vs 4h target) and dispute rate. Lina is on a normal 6-month ramp curve — flagged for support, not for performance management. Ramp peers (Faisal at 6mo, Mira at 7mo) crossed all targets between months 4-5.',
    },
  ],
};

// (Removed: PfSpecialistProfile types + findPfSpecialistById / buildPfProfileFromRow helpers — duplicate
//  of canonical /admin/users/specialists/[id] route. Specialist row clicks now navigate to that existing
//  route via row.id, which matches the SPECIALIST_PROFILES dict keys spec-001 through spec-011.)

type _PfRemovedPlaceholder = never;

