export interface PrPeriodOption {
  label: string;
  value: string;
}

export interface PrStat {
  label: string;
  value: string;
  suffix?: string;
  variant?: 'success' | 'warn' | 'danger';
  trend?: { direction: 'up' | 'down' | 'flat'; label: string };
  statusDot?: 'success' | 'warn' | 'danger';
  meta?: string;
}

export interface PrGeoRow {
  label: string;
  value: number;
  flagBg: string;
  flagBorder?: boolean;
}

export interface PrDsrRow {
  label: string;
  barLabel: string;
  barWidth: number;
  valuePctText: string;
  variant: 'access' | 'deletion' | 'portability' | 'correction' | 'objection' | 'restriction';
}

export interface PrConsentOverallData {
  bigValue: string;
  bigPct: string;
  eyebrow: string;
  title: string;
  detailHtml: string;
  trendValue: string;
  trendMeta: string;
}

export interface PrBannerVersion {
  name: string;
  meta: string;
  rate: string;
  rateSuffix: string;
  current?: boolean;
}

export interface PrSecondaryMetric {
  label: string;
  value: string;
  meta: string;
}

export interface PrRetentionRow {
  category: string;
  categoryMeta: string;
  retention: string;
  records: string;
  verified: string;
  status: 'compliant' | 'review-due' | 'non-compliant' | 'exempt';
  statusLabel: string;
}

export interface PrSubprocessorRow {
  initials: string;
  name: string;
  purpose: string;
  logoGradient: string;
  location: string;
  dpa: string;
  reviewDate: string;
  reviewWarn?: boolean;
  status: 'compliant' | 'review-due' | 'non-compliant' | 'exempt';
  statusLabel: string;
}

export interface PrPolicyVersion {
  version: string;
  date: string;
  dateRel: string;
  summaryHtml: string;
  approverHtml: string;
  ackRate: string;
  isCurrent?: boolean;
}

export interface PrNextReview {
  eyebrow: string;
  title: string;
  meta: string;
  buttonLabel: string;
}

export interface PrPageMeta {
  title: string;
  meta: string;
  pulseLabel: string;
  pulseDate?: string;
}

export interface PrPageData {
  meta: PrPageMeta;
  periodOptions: PrPeriodOption[];
  selectedPeriod: string;
  headerActions: { label: string; isPrimary: boolean }[];
  topStats: PrStat[];
  cookieConsent: {
    consentOverall: PrConsentOverallData;
    geoBars: PrGeoRow[];
    bannerVersions: PrBannerVersion[];
  };
  dsrVolume: {
    rows: PrDsrRow[];
    totalLabel: string;
    totalValue: string;
  };
  secondaryMetrics: PrSecondaryMetric[];
  retention: PrRetentionRow[];
  subprocessors: PrSubprocessorRow[];
  policyVersions: PrPolicyVersion[];
  nextReview: PrNextReview;
}

export const prPageMeta: PrPageMeta = {
  title: 'Privacy reports',
  meta: 'Comprehensive privacy and compliance reporting dashboard',
  pulseLabel: 'Next privacy review · Jun 1, 2026',
};

export const prPeriodOptions: PrPeriodOption[] = [
  { label: 'Q1', value: 'q1' },
  { label: 'Q2', value: 'q2' },
  { label: 'YTD', value: 'ytd' },
  { label: '12mo', value: '12mo' },
];

export const prHeaderActions = [
  { label: 'Export report', isPrimary: false },
  { label: 'Schedule review', isPrimary: true },
];

export const prTopStats: PrStat[] = [
  {
    label: 'Cookie consent rate',
    value: '67.4',
    suffix: '%',
    trend: { direction: 'up', label: '+2.1pt vs Q1' },
    meta: '<strong>banner v2.1</strong> · deployed Apr 1',
  },
  {
    label: 'DSR fulfillment',
    value: '14',
    suffix: 'days',
    trend: { direction: 'up', label: '-3d vs Q1' },
    meta: '<strong>well within</strong> 30d SLA · 100% on-time',
  },
  {
    label: 'Subprocessors',
    value: '10',
    meta: '<strong>9 compliant</strong> · 1 review-due',
  },
  {
    label: 'Policy version',
    value: 'v3.2',
    meta: '<strong>41d old</strong> · next review Jul 1',
  },
  {
    label: 'Compliance posture',
    value: 'A',
    variant: 'success',
    statusDot: 'success',
    meta: 'composite score · 1 review-due item',
  },
];

export const prConsentOverall: PrConsentOverallData = {
  bigValue: '67.4',
  bigPct: '%',
  eyebrow: 'OVERALL OPT-IN RATE · Q2',
  title: 'Above industry average of 58.2% for talent marketplaces',
  detailHtml:
    '<strong>4.2M banner impressions</strong> · 2.83M opt-ins · 1.37M declines · 12k partial-consent. Strict-essential bucket auto-counted at 100% per GDPR Recital 30.',
  trendValue: '+2.1pt',
  trendMeta: 'vs Q1 2026',
};

export const prGeoBars: PrGeoRow[] = [
  {
    label: 'EU (GDPR)',
    value: 54.2,
    flagBg: 'linear-gradient(to bottom, #003399 50%, #FFCC00 50%)',
  },
  {
    label: 'UK (PECR)',
    value: 58.1,
    flagBg: '#012169',
  },
  {
    label: 'CA (CCPA)',
    value: 71.5,
    flagBg: 'linear-gradient(to bottom, #b22234, #ffffff 60%, #b22234)',
    flagBorder: true,
  },
  {
    label: 'US (other states)',
    value: 76.3,
    flagBg: 'linear-gradient(to bottom, #b22234 33%, #ffffff 33% 66%, #002868 66%)',
  },
  {
    label: 'Rest of world',
    value: 81.2,
    flagBg: 'linear-gradient(45deg, var(--ink-mute), var(--ink-soft))',
  },
];

export const prBannerVersions: PrBannerVersion[] = [
  {
    name: 'Banner v2.1',
    meta: 'deployed Apr 1, 2026 · TCF v2.2 · clearer purpose categories · "reject all" prominent',
    rate: '67.4',
    rateSuffix: '% opt-in',
    current: true,
  },
  {
    name: 'Banner v2.0',
    meta: 'deployed Jan 15 - Mar 31 · TCF v2.1 · superseded',
    rate: '63.8',
    rateSuffix: '% opt-in',
  },
];

export const prDsrVolume: PrDsrRow[] = [
  {
    label: 'Access',
    barLabel: 'Art. 15',
    barWidth: 73,
    valuePctText: '71 · 72.4%',
    variant: 'access',
  },
  {
    label: 'Deletion',
    barLabel: 'Art. 17',
    barWidth: 11.5,
    valuePctText: '11 · 11.2%',
    variant: 'deletion',
  },
  {
    label: 'Portability',
    barLabel: 'Art. 20',
    barWidth: 8.5,
    valuePctText: '8 · 8.2%',
    variant: 'portability',
  },
  {
    label: 'Correction',
    barLabel: 'Art. 16',
    barWidth: 5.5,
    valuePctText: '5 · 5.1%',
    variant: 'correction',
  },
  {
    label: 'Objection',
    barLabel: 'Art. 21',
    barWidth: 2.5,
    valuePctText: '2 · 2.0%',
    variant: 'objection',
  },
  {
    label: 'Restriction',
    barLabel: 'Art. 18',
    barWidth: 1.2,
    valuePctText: '1 · 1.0%',
    variant: 'restriction',
  },
];

export const prSecondaryMetrics: PrSecondaryMetric[] = [
  { label: 'Avg completion time', value: '4.2 days', meta: 'Target: 5 days' },
  { label: 'Erasure requests', value: '12', meta: 'In current period' },
  { label: 'Data transfers', value: '8', meta: 'Portable format' },
];

export const prRetentionTable: PrRetentionRow[] = [
  {
    category: 'Profile data · active users',
    categoryMeta: 'name · photo · bio · skills · prefs',
    retention: '7y from last login',
    records: '847,200',
    verified: 'Apr 15',
    status: 'compliant',
    statusLabel: 'Compliant',
  },
  {
    category: 'Profile data · closed accounts',
    categoryMeta: 'scheduled deletion · grace 30d',
    retention: '30 days then purge',
    records: '2,841',
    verified: 'May 9 · auto',
    status: 'compliant',
    statusLabel: 'Compliant',
  },
  {
    category: 'Financial records',
    categoryMeta: 'payments · payouts · 1042-S',
    retention: '7y from year-end (IRS §6501)',
    records: '14,200',
    verified: 'Apr 15',
    status: 'compliant',
    statusLabel: 'Compliant',
  },
  {
    category: 'Fraud markers',
    categoryMeta: 'network graph nodes · device hashes',
    retention: '3y from investigation close',
    records: '142',
    verified: 'Apr 15',
    status: 'compliant',
    statusLabel: 'Compliant',
  },
  {
    category: 'Audit logs',
    categoryMeta: 'immutable · admin + system actions · Step 25',
    retention: '7y minimum · immutable',
    records: '2,400,000',
    verified: 'Continuous',
    status: 'compliant',
    statusLabel: 'Compliant',
  },
  {
    category: 'Breach scope identifiers',
    categoryMeta: 'SI-2026-0014 · 312 affected · Step 16',
    retention: 'Lifecycle + 3y',
    records: '312',
    verified: 'Apr 22',
    status: 'compliant',
    statusLabel: 'Compliant',
  },
  {
    category: 'Communications',
    categoryMeta: 'in-app messages · support tickets',
    retention: '2y rolling delete',
    records: '4,800,000',
    verified: 'May 1 · auto',
    status: 'compliant',
    statusLabel: 'Compliant',
  },
  {
    category: 'Marketing consent',
    categoryMeta: 'revocation-driven · Customer.io sync',
    retention: 'Until withdrawn',
    records: '238,400',
    verified: 'May 1 · auto',
    status: 'compliant',
    statusLabel: 'Compliant',
  },
  {
    category: 'KYC documents',
    categoryMeta: 'government IDs · business filings',
    retention: 'Lifecycle + 7y from closure',
    records: '3,820',
    verified: 'Mar 30 · stale',
    status: 'review-due',
    statusLabel: 'Review Due',
  },
];

export const prSubprocessorsTable: PrSubprocessorRow[] = [
  {
    initials: 'S',
    name: 'Stripe',
    purpose: 'Payment processing · card network rails',
    logoGradient: 'linear-gradient(135deg, #635BFF, #4239A8)',
    location: 'US / IE',
    dpa: 'Signed Aug 2024',
    reviewDate: 'Jan 12, 2026',
    status: 'compliant',
    statusLabel: 'Compliant',
  },
  {
    initials: 'W',
    name: 'Wise',
    purpose: 'Cross-border payouts · 80+ currencies',
    logoGradient: 'linear-gradient(135deg, #9FE870, #4F8231)',
    location: 'UK / AU / SG',
    dpa: 'Signed Sep 2024',
    reviewDate: 'Feb 8, 2026',
    status: 'compliant',
    statusLabel: 'Compliant',
  },
  {
    initials: 'A',
    name: 'AWS',
    purpose: 'Cloud infrastructure · compute · storage · CDN',
    logoGradient: 'linear-gradient(135deg, #FF9900, #C46F00)',
    location: 'US · DE · SG',
    dpa: 'Signed Jan 2024',
    reviewDate: 'Mar 4, 2026',
    status: 'compliant',
    statusLabel: 'Compliant',
  },
  {
    initials: 'C',
    name: 'Customer.io',
    purpose: 'Marketing automation · email · push',
    logoGradient: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
    location: 'US',
    dpa: 'Signed Nov 2024',
    reviewDate: 'Mar 22, 2026',
    status: 'compliant',
    statusLabel: 'Compliant',
  },
  {
    initials: 'A',
    name: 'Amplitude',
    purpose: 'Product analytics · session replay',
    logoGradient: 'linear-gradient(135deg, #1D4ED8, #1E3A8A)',
    location: 'US',
    dpa: 'Signed Aug 2024',
    reviewDate: 'Mar 12, 2026',
    status: 'compliant',
    statusLabel: 'Compliant',
  },
  {
    initials: 'D',
    name: 'Datadog',
    purpose: 'Infrastructure monitoring · APM · logs',
    logoGradient: 'linear-gradient(135deg, #632CA6, #3A1A66)',
    location: 'US · IE',
    dpa: 'Signed Sep 2024',
    reviewDate: 'Apr 2, 2026',
    status: 'compliant',
    statusLabel: 'Compliant',
  },
  {
    initials: 'T',
    name: 'Twilio',
    purpose: 'SMS · OTP delivery · voice',
    logoGradient: 'linear-gradient(135deg, #F22F46, #A6172A)',
    location: 'US · IE',
    dpa: 'Signed Jan 2025',
    reviewDate: 'Apr 8, 2026',
    status: 'compliant',
    statusLabel: 'Compliant',
  },
  {
    initials: 'S',
    name: 'SendGrid',
    purpose: 'Transactional email · receipts · alerts',
    logoGradient: 'linear-gradient(135deg, #1A82E2, #0E5099)',
    location: 'US',
    dpa: 'Signed Jun 2024',
    reviewDate: 'Mar 5, 2026',
    status: 'compliant',
    statusLabel: 'Compliant',
  },
  {
    initials: 'D',
    name: 'DocuSign',
    purpose: 'e-Signature · contract execution · ICAs',
    logoGradient: 'linear-gradient(135deg, #FFCC22, #B8881A)',
    location: 'US',
    dpa: 'Signed Oct 2024',
    reviewDate: 'Apr 12, 2026 · expired',
    reviewWarn: true,
    status: 'review-due',
    statusLabel: 'Review Due',
  },
  {
    initials: 'N',
    name: 'Notion',
    purpose: 'Internal documentation · runbooks · wiki',
    logoGradient: 'linear-gradient(135deg, #2F2F2F, #000000)',
    location: 'US · CA',
    dpa: 'Signed Dec 2024',
    reviewDate: 'Feb 14, 2026',
    status: 'compliant',
    statusLabel: 'Compliant',
  },
];

export const prPolicyVersions: PrPolicyVersion[] = [
  {
    version: 'v3.2',
    date: 'Apr 1, 2026',
    dateRel: '41 days ago',
    summaryHtml:
      '<strong>AI &amp; algorithmic processing disclosures</strong> · added clause covering automated decision-making in match scoring · explicit subprocessor list expansion (added Amplitude analytics) · clarified retention periods for fraud markers per Atlas\'s own internal audit.',
    approverHtml:
      'Approved by <strong>Dario Fonseca</strong> · DPO review by <strong>Aïsha Okafor</strong> · external counsel sign-off (Cooley LLP)',
    ackRate: '89%',
    isCurrent: true,
  },
  {
    version: 'v3.1',
    date: 'Jan 15, 2026',
    dateRel: '3.5 months ago',
    summaryHtml:
      'Clarified subprocessor list · explicit naming of all 10 active subprocessors with purposes · clarified DSR procedure with 30-day SLA references · minor language tightening throughout.',
    approverHtml: 'Approved by <strong>Dario Fonseca</strong> · DPO review by <strong>Aïsha Okafor</strong>',
    ackRate: '94%',
  },
  {
    version: 'v3.0',
    date: 'Oct 1, 2025',
    dateRel: '7 months ago',
    summaryHtml:
      '<strong>Major rewrite for CCPA/CPRA compliance</strong> · California-specific disclosures · "Do Not Sell" mechanism · sensitive personal information categories · 12-month look-back period for access requests · contractor classification language.',
    approverHtml:
      'Approved by <strong>Dario Fonseca</strong> · DPO review by <strong>Aïsha Okafor</strong> · external counsel sign-off (Cooley LLP)',
    ackRate: '96%',
  },
  {
    version: 'v2.4',
    date: 'Jul 1, 2025',
    dateRel: '10 months ago',
    summaryHtml:
      'Added Wise as subprocessor for cross-border payouts · UK ICO contact updated · minor language alignment with EDPB Guidelines 5/2020 on consent.',
    approverHtml: 'Approved by <strong>Dario Fonseca</strong>',
    ackRate: '91%',
  },
  {
    version: 'v2.3',
    date: 'Apr 1, 2025',
    dateRel: '13 months ago',
    summaryHtml:
      'Minor language updates · cookie banner v1.0 deployed · CMP-IAB v2.1 integration · Stripe Connect references aligned with new product flow.',
    approverHtml: 'Approved by <strong>Dario Fonseca</strong>',
    ackRate: '87%',
  },
];

export const prNextReview: PrNextReview = {
  eyebrow: 'NEXT SCHEDULED REVIEW',
  title: 'Quarterly privacy policy review · Jul 1, 2026',
  meta: '51 days · scope: Q2 changes assessment, EDPB guideline updates review, subprocessor additions check · DPO + Super Admin + external counsel',
  buttonLabel: 'Open review calendar',
};

export const getPrivacyReportData = (): PrPageData => ({
  meta: prPageMeta,
  periodOptions: prPeriodOptions,
  selectedPeriod: 'ytd',
  headerActions: prHeaderActions,
  topStats: prTopStats,
  cookieConsent: {
    consentOverall: prConsentOverall,
    geoBars: prGeoBars,
    bannerVersions: prBannerVersions,
  },
  dsrVolume: {
    rows: prDsrVolume,
    totalLabel: 'DSR VOLUME BY TYPE · YTD',
    totalValue: '98 total',
  },
  secondaryMetrics: prSecondaryMetrics,
  retention: prRetentionTable,
  subprocessors: prSubprocessorsTable,
  policyVersions: prPolicyVersions,
  nextReview: prNextReview,
});
