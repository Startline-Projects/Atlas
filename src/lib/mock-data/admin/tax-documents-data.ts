/* ──────────────────────────────────────────────────────────
   Tax Documents & Filing — mock data
   Step 23 · /admin/finance/tax-documents
   ────────────────────────────────────────────────────────── */

// ── Shared types ──────────────────────────────────────────

export interface SectionNavItem {
  id: string;
  label: string;
  anchor: string;
}

export interface StatCell {
  label: string;
  value: string;
  suffix?: string;
  variant?: 'success' | 'warn' | 'danger';
  meta: string;
}

export interface YearTab {
  year: number;
  status: string;
  isUpcoming?: boolean;
}

// ── Section 1 types ───────────────────────────────────────

export interface PipelineStage {
  num: number;
  name: string;
  desc: string;
  fillPct: number;
  countDone: number;
  countTotal: number;
  pct: string;
  deadlineText: string;
  variant: 'complete' | 'active';
}

export interface DeadlineRow {
  date: string;
  relDay: string;
  name: string;
  meta: string;
  actionLabel: string;
  variant?: 'urgent' | 'due';
}

// ── Section 2 types ───────────────────────────────────────

export interface JurisRow {
  flag: string;
  flagBg?: string;
  flagColor?: string;
  flagBorder?: string;
  country: string;
  count: number;
  status: string;
  statusVariant: 'complete' | 'partial' | 'blocked';
}

export interface JurisdictionCard {
  title: string;
  meta: string;
  count: number;
  formType: string;
  rows: JurisRow[];
}

// ── Page header ───────────────────────────────────────────

export const taxDocumentsPageHeader = {
  title: 'Tax documents & filings',
  meta: '/admin/finance/tax-documents · tax year 2025 · 502 active filers · 4 jurisdictions · last IRS sync 4h ago',
  metaPulses: [
    { text: '28 W-8BEN renewals due Jun 30 · prepare notice', variant: 'warn' as const },
  ] as { text: string; variant: 'danger' | 'warn' | 'success' }[],
};

// ── Year tabs ─────────────────────────────────────────────

export const yearTabs: YearTab[] = [
  { year: 2023, status: 'filed' },
  { year: 2024, status: 'filed' },
  { year: 2025, status: 'substantially complete' },
  { year: 2026, status: 'collecting', isUpcoming: true },
];

// ── Section nav ───────────────────────────────────────────

export const taxDocsSectionNav: SectionNavItem[] = [
  { id: 'pipeline', label: 'Filing pipeline', anchor: '#td-section-pipeline' },
  { id: 'jurisdiction', label: 'By jurisdiction', anchor: '#td-section-jurisdiction' },
  { id: 'documents', label: 'Candidate documents', anchor: '#td-section-documents' },
  { id: 'bulk', label: 'Bulk operations', anchor: '#td-section-bulk' },
  { id: 'calendar', label: 'Filing calendar', anchor: '#td-section-calendar' },
];

// ── Stats strip ───────────────────────────────────────────

export const taxDocsStats: StatCell[] = [
  {
    label: 'Active filers · 2025',
    value: '487',
    meta: 'earned $600+ threshold · 84 US · 403 foreign',
  },
  {
    label: 'E-filed with IRS',
    value: '481',
    suffix: '/ 487',
    variant: 'success',
    meta: '99% complete · 1099-NEC + 1042-S',
  },
  {
    label: 'Recipient copies sent',
    value: '478',
    suffix: '/ 481',
    variant: 'success',
    meta: '3 returned · need address update',
  },
  {
    label: 'Action needed',
    value: '6',
    variant: 'danger',
    meta: '4 missing identity · 2 amended return',
  },
  {
    label: 'W-8BEN renewals · Jun 30',
    value: '28',
    variant: 'warn',
    meta: '3-year expiry · auto-reminder Jun 1',
  },
];

// ── Section 1 — Filing pipeline ───────────────────────────

export const pipelineHeader = {
  title: 'Tax year 2025 · substantially complete',
  meta: 'primary deadlines met · 6 stragglers being worked · normal closing operations',
  updatedAt: 'last updated 4h ago · refresh every hour',
};

export const pipelineSectionHead = {
  title: '2025 filing pipeline',
  meta: '4-stage annual filing process · current state for tax year 2025 · started Jan 15, ongoing',
};

export const pipelineStages: PipelineStage[] = [
  {
    num: 1,
    name: 'Identity collected',
    desc: 'W-9 (US) and W-8BEN/E (foreign) on file · 3-year validity',
    fillPct: 99,
    countDone: 498,
    countTotal: 502,
    pct: '99%',
    deadlineText: 'Ongoing · 4 missing',
    variant: 'complete',
  },
  {
    num: 2,
    name: 'Annual forms generated',
    desc: '1099-NEC for US persons · 1042-S for foreign persons · auto-generated from payment data',
    fillPct: 99,
    countDone: 481,
    countTotal: 487,
    pct: '99%',
    deadlineText: 'Generated Jan 15',
    variant: 'complete',
  },
  {
    num: 3,
    name: 'E-filed with IRS',
    desc: 'Submitted via IRS FIRE system · electronic acknowledgement received',
    fillPct: 99,
    countDone: 481,
    countTotal: 487,
    pct: '99%',
    deadlineText: 'Jan 31 + Mar 15',
    variant: 'complete',
  },
  {
    num: 4,
    name: 'Recipient copies sent',
    desc: 'Email + mail dispatch · 3 returned by post · address-update flow open',
    fillPct: 99,
    countDone: 478,
    countTotal: 481,
    pct: '99%',
    deadlineText: '3 returned · re-dispatch',
    variant: 'active',
  },
];

export const deadlineRows: DeadlineRow[] = [
  {
    date: 'May 11',
    relDay: 'Today',
    name: '2 amended 1042-S returns pending',
    meta: 'corrections from candidate withholding-rate disputes · need filing by Sep 15',
    actionLabel: 'Review →',
    variant: 'urgent',
  },
  {
    date: 'Jun 30',
    relDay: '50 days',
    name: 'W-8BEN renewals · 28 candidates',
    meta: '3-year expiry from Jun 2023 · auto-reminder sends Jun 1 · failure to renew blocks payouts',
    actionLabel: 'View list →',
    variant: 'due',
  },
  {
    date: 'Sep 15',
    relDay: '127 days',
    name: '1042-S amended return window closes',
    meta: 'deadline for corrections to filed 1042-S returns · then locked until next year',
    actionLabel: 'Calendar →',
  },
];

// ── Section 2 — Jurisdiction cards ────────────────────────

export const jurisdictionCards: JurisdictionCard[] = [
  {
    title: 'United States',
    meta: 'W-9 + 1099-NEC · paid to recipients · 84 candidates · primary jurisdiction',
    count: 84,
    formType: '1099-NEC',
    rows: [
      { flag: 'US', flagBg: 'linear-gradient(to bottom, #b22234 50%, #ffffff 50%)', flagColor: 'var(--ink)', flagBorder: '1px solid var(--ink)', country: 'All 50 states (no state withholding)', count: 84, status: 'Filed', statusVariant: 'complete' },
      { flag: 'CA', flagBg: 'var(--lime-deep)', country: 'California · top state · 18 candidates', count: 18, status: 'Filed', statusVariant: 'complete' },
      { flag: 'NY', flagBg: 'var(--lime-deep)', country: 'New York · 12 candidates', count: 12, status: 'Filed', statusVariant: 'complete' },
      { flag: 'TX', flagBg: 'var(--lime-deep)', country: 'Texas · 9 candidates', count: 9, status: 'Filed', statusVariant: 'complete' },
      { flag: '+47', flagBg: 'var(--ink-mute)', country: 'Remaining 47 states', count: 45, status: 'Filed', statusVariant: 'complete' },
    ],
  },
  {
    title: 'Foreign jurisdictions',
    meta: 'W-8BEN + 1042-S · withholding per tax-treaty rate · 403 candidates · 47 countries',
    count: 403,
    formType: '1042-S',
    rows: [
      { flag: 'NG', flagBg: 'linear-gradient(to bottom, #00853e 50%, #ffffff 50%)', flagColor: 'var(--ink)', flagBorder: '1px solid var(--ink)', country: 'Nigeria · top country · 42 candidates', count: 42, status: 'Filed', statusVariant: 'complete' },
      { flag: 'IN', flagBg: '#ff9933', country: 'India · 38 candidates · 1 missing W-8BEN', count: 38, status: '1 missing', statusVariant: 'partial' },
      { flag: 'AR', flagBg: '#6cace4', flagColor: 'var(--ink)', flagBorder: '1px solid var(--ink)', country: 'Argentina · 24 candidates', count: 24, status: 'Filed', statusVariant: 'complete' },
      { flag: 'GB', flagBg: '#002395', flagColor: 'var(--paper)', country: 'United Kingdom · 31 candidates', count: 31, status: 'Filed', statusVariant: 'complete' },
      { flag: '+43', flagBg: 'var(--ink-mute)', country: 'Remaining 43 countries · 2 missing W-8BEN', count: 268, status: '3 missing', statusVariant: 'partial' },
    ],
  },
];

// ── Section 3 types ──────────────────────────────────────

export interface CandidateDocRow {
  id: string;
  initials: string;
  candidate: string;
  flagBg?: string;
  flagColor?: string;
  flagBorder?: string;
  country: string;
  formChips: Array<'f1099-nec' | 'f1042-s' | 'w9' | 'w8ben' | 'w8ben-e' | 'missing'>;
  status: 'generated' | 'efiled' | 'sent' | 'needs-action' | 'renewal' | 'suspended';
  statusText: string;
  earned: string;
  earnedValue: number;
  deadline: string;
  deadlineRel: string;
  deadlineVariant?: 'met' | 'warn' | 'danger';
  rowVariant?: 'default' | 'blocked' | 'warn';
}

export interface BulkOpCard {
  id: string;
  iconSvg: string;
  title: string;
  desc: string;
  stat1Label: string;
  stat1Value: string;
  stat1Meta: string;
  stat2Label: string;
  stat2Value: string;
  stat2Meta: string;
  lastRun: string;
  actionLabel: string;
  actionPrimary?: boolean;
  variant: 'complete' | 'urgent';
}

export interface CalendarMarker {
  date: string;
  label: string;
  variant: 'done' | 'upcoming' | 'future' | 'urgent' | 'due';
  position: number;
}

// ── Section 3 — Candidate documents ──────────────────────

export const candidateDocumentsHeader = {
  title: 'Candidate tax documents',
  meta: 'per-candidate filing status · 2025 tax year · 487 active filers · click any row for full document history',
};

export const candidateFilterChips = [
  { id: 'all', label: 'All', count: 487, active: true },
  { id: 'us', label: 'US · 1099-NEC', count: 84 },
  { id: 'foreign', label: 'Foreign · 1042-S', count: 403 },
  { id: 'action', label: 'Action needed', count: 6 },
  { id: 'renewal', label: 'W-8BEN renewals', count: 28 },
  { id: 'returned', label: 'Copies returned', count: 3 },
];

export const candidateDocRows: CandidateDocRow[] = [
  {
    id: 'cand-1844',
    initials: 'AS',
    candidate: 'Aria Solanki',
    flagBg: '#ff9933',
    country: 'India',
    formChips: ['missing'],
    status: 'needs-action',
    statusText: 'Action needed',
    earned: '$2,840',
    earnedValue: 2840,
    deadline: 'URGENT',
    deadlineRel: 'blocking 2025 1042-S',
    deadlineVariant: 'danger',
    rowVariant: 'blocked',
  },
  {
    id: 'cand-1142',
    initials: 'MK',
    candidate: 'Marek Kowalczyk',
    flagBg: '#dc143c',
    country: 'Poland',
    formChips: ['w8ben'],
    status: 'suspended',
    statusText: 'Suspended',
    earned: '$4,420',
    earnedValue: 4420,
    deadline: 'Hold',
    deadlineRel: 'await suspension outcome',
    deadlineVariant: 'warn',
    rowVariant: 'warn',
  },
  {
    id: 'cand-2841',
    initials: 'PA',
    candidate: 'Prashant Agarwal',
    flagBg: '#ff9933',
    country: 'India',
    formChips: ['w8ben'],
    status: 'renewal',
    statusText: 'Renewal',
    earned: '$1,840',
    earnedValue: 1840,
    deadline: 'Jun 30',
    deadlineRel: '50 days',
    deadlineVariant: 'warn',
    rowVariant: 'warn',
  },
  {
    id: 'cand-001',
    initials: 'AE',
    candidate: 'Adesuwa Eze',
    flagBg: 'linear-gradient(to bottom, #00853e 50%, #ffffff 50%)',
    flagColor: 'var(--ink)',
    flagBorder: '1px solid var(--ink)',
    country: 'Nigeria',
    formChips: ['f1042-s', 'w8ben'],
    status: 'sent',
    statusText: 'Sent',
    earned: '$14,280',
    earnedValue: 14280,
    deadline: 'Mar 15',
    deadlineRel: 'filed Mar 14',
    deadlineVariant: 'met',
  },
  {
    id: 'cand-019',
    initials: 'TY',
    candidate: 'Tomás Yúdice',
    flagBg: '#6cace4',
    flagColor: 'var(--ink)',
    flagBorder: '1px solid var(--ink)',
    country: 'Argentina',
    formChips: ['f1042-s', 'w8ben'],
    status: 'sent',
    statusText: 'Sent',
    earned: '$8,640',
    earnedValue: 8640,
    deadline: 'Mar 15',
    deadlineRel: 'filed Mar 14',
    deadlineVariant: 'met',
  },
  {
    id: 'spec-001',
    initials: 'DK',
    candidate: 'Daniel Kovács',
    flagBg: '#ce2939',
    country: 'Hungary',
    formChips: ['f1042-s', 'w8ben'],
    status: 'sent',
    statusText: 'Sent',
    earned: '$28,440',
    earnedValue: 28440,
    deadline: 'Mar 15',
    deadlineRel: 'filed Mar 14',
    deadlineVariant: 'met',
  },
  {
    id: 'cand-1156',
    initials: 'MC',
    candidate: 'Mira Chowdhury',
    flagBg: '#002395',
    flagColor: 'var(--paper)',
    country: 'United Kingdom',
    formChips: ['f1042-s', 'w8ben'],
    status: 'sent',
    statusText: 'Sent',
    earned: '$6,120',
    earnedValue: 6120,
    deadline: 'Mar 15',
    deadlineRel: 'filed Mar 14',
    deadlineVariant: 'met',
  },
  {
    id: 'cand-201',
    initials: 'JP',
    candidate: 'Jennifer Park',
    flagBg: 'linear-gradient(to bottom, #b22234 50%, #ffffff 50%)',
    flagColor: 'var(--ink)',
    flagBorder: '1px solid var(--ink)',
    country: 'United States',
    formChips: ['f1099-nec', 'w9'],
    status: 'sent',
    statusText: 'Sent',
    earned: '$22,400',
    earnedValue: 22400,
    deadline: 'Jan 31',
    deadlineRel: 'filed Jan 28',
    deadlineVariant: 'met',
  },
  {
    id: 'cand-356',
    initials: 'MW',
    candidate: 'Marcus Williams',
    flagBg: 'linear-gradient(to bottom, #b22234 50%, #ffffff 50%)',
    flagColor: 'var(--ink)',
    flagBorder: '1px solid var(--ink)',
    country: 'United States',
    formChips: ['f1099-nec', 'w9'],
    status: 'sent',
    statusText: 'Sent',
    earned: '$16,800',
    earnedValue: 16800,
    deadline: 'Jan 31',
    deadlineRel: 'filed Jan 28',
    deadlineVariant: 'met',
  },
  {
    id: 'cand-489',
    initials: 'AC',
    candidate: 'Ashley Chen',
    flagBg: 'linear-gradient(to bottom, #b22234 50%, #ffffff 50%)',
    flagColor: 'var(--ink)',
    flagBorder: '1px solid var(--ink)',
    country: 'United States',
    formChips: ['f1099-nec', 'w9'],
    status: 'needs-action',
    statusText: 'Returned',
    earned: '$3,200',
    earnedValue: 3200,
    deadline: 'Re-send',
    deadlineRel: 'address update needed',
    deadlineVariant: 'warn',
    rowVariant: 'warn',
  },
];

// ── Section 4 — Bulk operations ──────────────────────────

export const bulkOperationsHeader = {
  title: 'Bulk operations',
  meta: 'automated batch processes · scheduled at year-end · manual trigger requires Super Admin · all runs audit-logged',
};

export const bulkOpCards: BulkOpCard[] = [
  {
    id: 'bulk-gen',
    iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    title: 'Generate year-end forms',
    desc: 'Auto-generates 1099-NEC (US) and 1042-S (foreign) from 2025 payment data · creates draft PDFs + IRS submission file',
    stat1Label: 'Forms generated',
    stat1Value: '481',
    stat1Meta: 'of 487 eligible',
    stat2Label: 'Pending generation',
    stat2Value: '6',
    stat2Meta: 'awaiting identity forms',
    lastRun: 'last run **Jan 15 · 06:00 UTC** · next scheduled **Jan 15 2027**',
    actionLabel: 'Regenerate missing →',
    variant: 'complete',
  },
  {
    id: 'bulk-send',
    iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    title: 'Send recipient copies',
    desc: 'Dispatches signed PDFs to candidates · email + mail (USPS Certified for US, registered post for foreign) · tracks delivery',
    stat1Label: 'Sent',
    stat1Value: '478',
    stat1Meta: 'email + mail · delivered',
    stat2Label: 'Returned by post',
    stat2Value: '3',
    stat2Meta: 'address update needed',
    lastRun: 'last run **Jan 28 · 09:00 UTC** · 3 returns auto-flagged for re-send',
    actionLabel: 'Re-send returns →',
    variant: 'complete',
  },
  {
    id: 'bulk-renew',
    iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>',
    title: 'W-8BEN renewal reminders',
    desc: '28 candidates\' W-8BEN forms expire **Jun 30 2026** (3-year mark from Jun 2023) · failure to renew blocks future payouts',
    stat1Label: 'Expiring Jun 30',
    stat1Value: '28',
    stat1Meta: 'candidates affected',
    stat2Label: 'Reminder dispatch',
    stat2Value: 'Jun 1',
    stat2Meta: '30-day pre-notice · auto',
    lastRun: 'next auto-run **Jun 1 · 09:00 UTC** · trigger manually below',
    actionLabel: 'Send reminders now →',
    actionPrimary: true,
    variant: 'urgent',
  },
  {
    id: 'bulk-fire',
    iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    title: 'E-file with IRS FIRE',
    desc: 'Submits filing packages to IRS FIRE (Filing Information Returns Electronically) · receives acknowledgement codes · handles 1099, 1042 series',
    stat1Label: 'FIRE status',
    stat1Value: 'Connected',
    stat1Meta: 'cert valid through 2027',
    stat2Label: 'Amended window',
    stat2Value: 'Sep 15',
    stat2Meta: 'corrections deadline',
    lastRun: '1099-NEC submitted **Jan 31** · 1042-S submitted **Mar 14** · all acknowledged',
    actionLabel: 'File amendments →',
    variant: 'complete',
  },
];

// ── Section 5 — Filing calendar ──────────────────────────

export const filingCalendarHeader = {
  title: 'Filing calendar · 2025 tax year',
  meta: 'key IRS deadlines · today is May 11 · primary filing deadlines passed · amended window open through Sep 15',
};

export const calendarMarkers: CalendarMarker[] = [
  { date: 'Jan 31', label: '1099-NEC due\nrecipient + IRS\n**84 filed**', variant: 'done', position: 8 },
  { date: 'Mar 15', label: '1042-S due\nrecipient + IRS\n**397 filed**', variant: 'done', position: 22 },
  { date: 'Jun 30', label: 'W-8BEN renewals\n3-year expiry\n**28 candidates**', variant: 'due', position: 50 },
  { date: 'Jul 15', label: 'Q2 deposit\n1042 monthly\n**if applicable**', variant: 'upcoming', position: 62 },
  { date: 'Sep 15', label: 'Amended 1042-S\nwindow closes\n**2 pending**', variant: 'upcoming', position: 77 },
  { date: 'Jan 31 \'27', label: '2026 1099-NEC\nnext cycle starts\n**auto-generate**', variant: 'future', position: 93 },
];

export const calendarTodayMarker = {
  date: 'May 11',
  label: 'TODAY\n2 amended pending',
  variant: 'urgent' as const,
  position: 35,
};

export const calendarLegend = [
  { variant: 'done' as const, label: 'Completed' },
  { variant: 'due' as const, label: 'Due soon · prepare' },
  { variant: 'urgent' as const, label: 'Urgent · action needed' },
  { variant: 'upcoming' as const, label: 'Upcoming · planned' },
  { variant: 'future' as const, label: 'Future cycle' },
];

// ── Section 3-5 headers ──────────────────────────────────

export const sectionHeaders = {
  documents: candidateDocumentsHeader,
  bulk: bulkOperationsHeader,
  calendar: filingCalendarHeader,
};
