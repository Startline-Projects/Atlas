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

// ── Section 3-5 headers (stubs for Pass A) ────────────────

export const sectionStubs = {
  documents: {
    title: 'Candidate tax documents',
    meta: 'per-candidate filing status · 2025 tax year · 487 active filers · click any row for full document history',
  },
  bulk: {
    title: 'Bulk operations',
    meta: 'batch actions for tax form generation, delivery, renewals, and IRS filing',
  },
  calendar: {
    title: 'Filing calendar',
    meta: 'IRS deadlines · W-8BEN renewal windows · amended return cutoffs · 2025 tax year',
  },
};
