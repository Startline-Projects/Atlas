/**
 * Phase 15a — Fraud & Abuse mock data.
 *
 * admin.html markup: L39164+ (Fraud & Abuse list + detail views)
 *
 * Canonical detail: FA-2026-0042 (multi-account fraud ring · Vorona Capital)
 * 10 alert fixtures for list view, 10 detail profiles for generateStaticParams.
 */

/* ------------------------------------------------------------------ */
/*  Primitives                                                         */
/* ------------------------------------------------------------------ */

export type FraudSeverityKey = 'critical' | 'high' | 'medium' | 'low';
export type FraudStatusKey = 'open' | 'investigating' | 'resolved' | 'dismissed';
export type FraudFilterKey = 'all' | FraudStatusKey;

export interface FraudSeverityCard {
  key: FraudSeverityKey;
  label: string;
  count: number;
  meta: string;
}

export interface FraudFilterChip {
  key: FraudFilterKey;
  label: string;
  count: number;
}

export interface FraudAlertListRow {
  id: string;
  atlasId: string;
  severity: FraudSeverityKey;
  accountName: string;
  accountInitials: string;
  accountMeta: string; // e.g. "CLIENT · cl-167 · multi-account ring"
  alertType: string;
  detected: string;
  detectedAgo: string;
  status: FraudStatusKey;
  confidence: number;
}

/* ------------------------------------------------------------------ */
/*  Detail-view types                                                  */
/* ------------------------------------------------------------------ */

export interface FraudInvestigationStep {
  label: string;
  meta: string;
  done: boolean;
  current: boolean;
}

export interface FraudQuickStatRow {
  label: string;
  value: string;
  href?: string;
}

export interface FraudHeroStat {
  label: string;
  value: string;
  sub: string;
}

export interface FraudHeroAction {
  key: string;
  label: string;
  variant: 'primary' | 'secondary' | 'danger';
}

export interface FraudDetailSection {
  id: string;
  title: string;
  meta: string;
}

export interface FraudAlertProfile {
  id: string;
  atlasId: string;
  severity: FraudSeverityKey;
  status: FraudStatusKey;
  statusLabel: string;
  detected: string;
  detectedAgo: string;
  title: string;
  subtitle: string;
  heroStats: FraudHeroStat[];
  actions: FraudHeroAction[];
  moreActions: string[];
  investigationSteps: FraudInvestigationStep[];
  investigationProgress: { done: number; total: number };
  quickStats: FraudQuickStatRow[];
  sections: FraudDetailSection[];
}

/* ------------------------------------------------------------------ */
/*  Page-level aggregate                                               */
/* ------------------------------------------------------------------ */

export interface FraudAlertsPageData {
  pageTitle: string;
  pageMeta: string;
  activeIndicator: string;
  severityCards: FraudSeverityCard[];
  filterChips: FraudFilterChip[];
  listRows: FraudAlertListRow[];
  footerLabel: string;
  loadMoreLabel: string;
}

/* ------------------------------------------------------------------ */
/*  Severity card fixtures                                             */
/* ------------------------------------------------------------------ */

const SEVERITY_CARDS: FraudSeverityCard[] = [
  { key: 'critical', label: 'Critical', count: 5, meta: '3 open · 2 in investigation · oldest 4d 6h' },
  { key: 'high', label: 'High', count: 8, meta: '5 open · 3 in investigation · oldest 6d' },
  { key: 'medium', label: 'Medium', count: 14, meta: '9 open · 5 in investigation · oldest 11d' },
  { key: 'low', label: 'Low', count: 20, meta: '11 open · 9 dismissed in last 30d' },
];

/* ------------------------------------------------------------------ */
/*  Filter chips                                                       */
/* ------------------------------------------------------------------ */

const FILTER_CHIPS: FraudFilterChip[] = [
  { key: 'all', label: 'All', count: 47 },
  { key: 'open', label: 'Open', count: 28 },
  { key: 'investigating', label: 'In investigation', count: 10 },
  { key: 'resolved', label: 'Resolved', count: 7 },
  { key: 'dismissed', label: 'Dismissed', count: 2 },
];

/* ------------------------------------------------------------------ */
/*  10 list-row fixtures                                               */
/* ------------------------------------------------------------------ */

const LIST_ROWS: FraudAlertListRow[] = [
  {
    id: 'fa-2026-0042',
    atlasId: 'FA-2026-0042',
    severity: 'critical',
    accountName: 'Vorona Capital + 4 linked accounts',
    accountInitials: 'VG',
    accountMeta: 'CLIENT · cl-167 · multi-account ring',
    alertType: 'Multiple accounts',
    detected: 'May 2 · 18:42',
    detectedAgo: '3d 14h ago',
    status: 'investigating',
    confidence: 94,
  },
  {
    id: 'fa-2026-0041',
    atlasId: 'FA-2026-0041',
    severity: 'critical',
    accountName: 'Marek Kowalczyk',
    accountInitials: 'MK',
    accountMeta: 'CANDIDATE · cand-1142 · ID liveness mismatch',
    alertType: 'Fake ID / liveness',
    detected: 'May 4 · 09:15',
    detectedAgo: '1d 23h ago',
    status: 'open',
    confidence: 91,
  },
  {
    id: 'fa-2026-0039',
    atlasId: 'FA-2026-0039',
    severity: 'critical',
    accountName: 'Stellar Partners LLC',
    accountInitials: 'SP',
    accountMeta: 'CLIENT · cl-204 · 7 chargebacks in 14d',
    alertType: 'Payment fraud',
    detected: 'May 1 · 23:18',
    detectedAgo: '4d 9h ago',
    status: 'investigating',
    confidence: 88,
  },
  {
    id: 'fa-2026-0038',
    atlasId: 'FA-2026-0038',
    severity: 'high',
    accountName: 'A2Z Solutions Ltd',
    accountInitials: 'A2',
    accountMeta: 'CLIENT · cl-178 · sock-puppet review cluster',
    alertType: 'Sock-puppet reviews',
    detected: 'Apr 30 · 11:42',
    detectedAgo: '5d 21h ago',
    status: 'open',
    confidence: 82,
  },
  {
    id: 'fa-2026-0037',
    atlasId: 'FA-2026-0037',
    severity: 'high',
    accountName: 'Fátima Mendoza',
    accountInitials: 'FM',
    accountMeta: 'CANDIDATE · cand-892 · gov-ID name ≠ profile name',
    alertType: 'Identity mismatch',
    detected: 'Apr 29 · 14:30',
    detectedAgo: '7d ago',
    status: 'investigating',
    confidence: 76,
  },
  {
    id: 'fa-2026-0036',
    atlasId: 'FA-2026-0036',
    severity: 'high',
    accountName: 'Jana Reinholt',
    accountInitials: 'JR',
    accountMeta: 'SPECIALIST · spec-007 · admin-action surge pattern',
    alertType: 'Abuse pattern',
    detected: 'Apr 28 · 22:11',
    detectedAgo: '7d 12h ago',
    status: 'open',
    confidence: 71,
  },
  {
    id: 'fa-2026-0034',
    atlasId: 'FA-2026-0034',
    severity: 'medium',
    accountName: 'Rohan Kapoor',
    accountInitials: 'RK',
    accountMeta: 'CANDIDATE · cand-1289 · 12 logins from 4 countries / 24h',
    alertType: 'Suspicious activity',
    detected: 'Apr 26 · 06:52',
    detectedAgo: '9d 16h ago',
    status: 'open',
    confidence: 58,
  },
  {
    id: 'fa-2026-0029',
    atlasId: 'FA-2026-0029',
    severity: 'medium',
    accountName: 'Carla Liang',
    accountInitials: 'CL',
    accountMeta: 'CANDIDATE · cand-678 · IP-based geo flag',
    alertType: 'Geo anomaly',
    detected: 'Apr 22 · 16:08',
    detectedAgo: '13d ago',
    status: 'resolved',
    confidence: 42,
  },
  {
    id: 'fa-2026-0024',
    atlasId: 'FA-2026-0024',
    severity: 'low',
    accountName: 'Tomás Yúdice',
    accountInitials: 'TY',
    accountMeta: 'CANDIDATE · cand-432 · 3 failed login attempts (false-positive)',
    alertType: 'Auth anomaly',
    detected: 'Apr 18 · 10:05',
    detectedAgo: '17d ago',
    status: 'dismissed',
    confidence: 22,
  },
];

/* ------------------------------------------------------------------ */
/*  Page data singleton                                                */
/* ------------------------------------------------------------------ */

export const FRAUD_ALERTS_PAGE_DATA: FraudAlertsPageData = {
  pageTitle: 'Fraud & abuse',
  pageMeta: '47 alerts total · 5 critical / 8 high open',
  activeIndicator: '2 active investigations',
  severityCards: SEVERITY_CARDS,
  filterChips: FILTER_CHIPS,
  listRows: LIST_ROWS,
  footerLabel: '9 of 47 alerts shown · canonical sample with realistic severity mix · sorted by severity then recency',
  loadMoreLabel: 'Load more alerts',
};

/* ------------------------------------------------------------------ */
/*  Detail profile helpers                                             */
/* ------------------------------------------------------------------ */

function stubFraudProfile(row: FraudAlertListRow): FraudAlertProfile {
  return {
    id: row.id,
    atlasId: row.atlasId,
    severity: row.severity,
    status: row.status,
    statusLabel: row.status === 'investigating' ? 'Investigating' : row.status === 'open' ? 'Open' : row.status === 'resolved' ? 'Resolved' : 'Dismissed',
    detected: row.detected,
    detectedAgo: row.detectedAgo,
    title: `${row.alertType} · ${row.accountName}`,
    subtitle: `Alert ${row.atlasId} raised on ${row.accountName} (${row.accountMeta.split(' · ')[1] || 'unknown'}). Confidence ${row.confidence}%. ${row.alertType} pattern detected. Investigation ${row.status === 'investigating' ? 'in progress' : row.status === 'open' ? 'pending triage' : row.status === 'resolved' ? 'completed' : 'closed as false positive'}.`,
    heroStats: [
      { label: 'Confidence', value: `${row.confidence}%`, sub: `${Math.ceil(row.confidence / 12)} of 9 signals fired` },
      { label: 'Account type', value: row.accountMeta.split(' · ')[0] ?? '', sub: row.accountMeta.split(' · ')[1] ?? '' },
      { label: 'Alert type', value: row.alertType, sub: `Detected ${row.detectedAgo}` },
      { label: 'Status', value: row.status === 'investigating' ? 'Investigating' : row.status === 'open' ? 'Open' : row.status === 'resolved' ? 'Resolved' : 'Dismissed', sub: `Since ${row.detected}` },
    ],
    actions: [
      { key: 'suspend', label: 'Suspend account', variant: 'primary' },
      { key: 'escalate', label: 'Escalate', variant: 'secondary' },
    ],
    moreActions: ['Add note', 'Export evidence', 'Link to dispute', 'Dismiss alert'],
    investigationSteps: [
      { label: 'Alert generated', meta: `${row.detected} · auto-detected`, done: true, current: false },
      { label: 'Initial triage', meta: 'Pending assignment', done: row.status === 'investigating' || row.status === 'resolved', current: row.status === 'open' },
      { label: 'Evidence collected', meta: 'Pending', done: row.status === 'resolved', current: row.status === 'investigating' },
      { label: 'Decision review', meta: 'Pending', done: row.status === 'resolved', current: false },
      { label: 'Action executed', meta: 'Pending', done: row.status === 'resolved', current: false },
      { label: 'Case closed', meta: 'Pending', done: row.status === 'resolved' || row.status === 'dismissed', current: false },
    ],
    investigationProgress: {
      done: row.status === 'resolved' || row.status === 'dismissed' ? 6 : row.status === 'investigating' ? 2 : 1,
      total: 6,
    },
    quickStats: [
      { label: 'Lead investigator', value: 'Unassigned' },
      { label: 'Account', value: row.accountMeta.split(' · ')[1] || row.id, href: '#' },
      { label: 'Alert type', value: row.alertType },
      { label: 'Confidence', value: `${row.confidence}%` },
      { label: 'Detected', value: row.detected },
      { label: 'SLA remaining', value: row.severity === 'critical' ? '7d' : row.severity === 'high' ? '14d' : '30d' },
      { label: 'Evidence docs', value: '0' },
      { label: 'Audit log', value: '—' },
    ],
    sections: [
      { id: 'signals', title: 'System signals', meta: 'Placeholder — Phase 15b' },
      { id: 'related-accounts', title: 'Related accounts', meta: 'Placeholder — Phase 15b' },
      { id: 'anomalies', title: 'Behavioral anomalies', meta: 'Placeholder — Phase 15b' },
      { id: 'documents', title: 'Documents involved', meta: 'Placeholder — Phase 15c' },
      { id: 'timeline', title: 'Timeline of events', meta: 'Placeholder — Phase 15c' },
      { id: 'notes', title: 'Admin notes', meta: 'Placeholder — Phase 15c' },
    ],
  };
}

/* ------------------------------------------------------------------ */
/*  Canonical profile: FA-2026-0042                                    */
/* ------------------------------------------------------------------ */

const CANONICAL_FA_2026_0042: FraudAlertProfile = {
  id: 'fa-2026-0042',
  atlasId: 'FA-2026-0042',
  severity: 'critical',
  status: 'investigating',
  statusLabel: 'Investigating',
  detected: 'May 2 · 18:42 UTC',
  detectedAgo: '3d 14h ago',
  title: 'Multi-account fraud ring · Vorona Capital + 4 linked accounts',
  subtitle: 'Lead account Vorona Capital (cl-167) shares device fingerprint, IP block, payment instrument, and behavioral patterns with 4 other client accounts. Cross-references prior signals from Disputes (5 disputes · 42% rate) and Reviews (suspected coordinated review activity).',
  heroStats: [
    { label: 'Confidence', value: '94%', sub: '8 of 9 signals fired' },
    { label: 'Linked accounts', value: '5', sub: '1 lead · 4 satellite' },
    { label: 'Financial impact', value: '$28.4K', sub: 'across 12 disputed engagements' },
    { label: 'Investigation age', value: '3d 14h', sub: 'SLA: 7 days for critical' },
  ],
  actions: [
    { key: 'suspend-all', label: 'Suspend all (5)', variant: 'primary' },
    { key: 'ban-all', label: 'Ban all', variant: 'danger' },
    { key: 'refund', label: 'Refund affected', variant: 'secondary' },
  ],
  moreActions: ['Add note', 'Export evidence pack', 'Notify legal', 'Link dispute', 'Link review cluster', 'Dismiss alert'],
  investigationSteps: [
    { label: 'Alert generated', meta: 'May 2 · 18:42 · auto-detected by signals 1-8', done: true, current: false },
    { label: 'Initial triage', meta: 'May 2 · 19:14 · Aïsha — confirmed signal accuracy', done: true, current: false },
    { label: 'Linked accounts identified', meta: 'May 3 · 09:22 · 4 satellite accounts found', done: true, current: false },
    { label: 'Evidence collected', meta: 'May 4 · 11:08 · 23 documents · 14d log range', done: true, current: false },
    { label: 'Cross-reference disputes + reviews', meta: 'May 5 · 08:45 · linked DSP-2026-0144 + REV-834 cluster', done: true, current: false },
    { label: 'Decision review (you)', meta: 'in progress · suggested: Ban all 5 + refund affected', done: false, current: true },
    { label: 'Action executed', meta: 'pending decision · audit + party notifications', done: false, current: false },
    { label: 'Case closed', meta: 'resolution + post-mortem + regulatory doc', done: false, current: false },
  ],
  investigationProgress: { done: 5, total: 8 },
  quickStats: [
    { label: 'Lead investigator', value: 'Aïsha Okafor (you)' },
    { label: 'Co-investigators', value: 'Dario · Sarah R.' },
    { label: 'Lead account', value: 'cl-167', href: '#' },
    { label: 'Linked disputes', value: '5 cases', href: '#' },
    { label: 'Linked review cluster', value: 'REV-834', href: '#' },
    { label: 'Affected talent', value: '14 candidates' },
    { label: 'SLA remaining', value: '3d 10h' },
    { label: 'Audit log', value: '142 events', href: '#' },
  ],
  sections: [
    { id: 'signals', title: 'System signals', meta: '9 signals evaluated · 8 fired · last evaluated 3 min ago' },
    { id: 'related-accounts', title: 'Related accounts', meta: '5 accounts in ring · shared-signals matrix' },
    { id: 'anomalies', title: 'Behavioral anomalies', meta: '5 anomalies detected · deviation range +3.2σ to +13σ' },
    { id: 'documents', title: 'Documents involved', meta: '23 documents total · 4 flagged' },
    { id: 'timeline', title: 'Timeline of events', meta: '142 events · 11 shown' },
    { id: 'notes', title: 'Admin notes', meta: '3 notes + composer' },
  ],
};

/* ------------------------------------------------------------------ */
/*  All 10 detail profiles (canonical + 8 stubs + dismissed)           */
/* ------------------------------------------------------------------ */

// Build from list rows — canonical overrides fa-2026-0042
const STUB_PROFILES: Record<string, FraudAlertProfile> = {};
for (const row of LIST_ROWS) {
  STUB_PROFILES[row.id] = row.id === 'fa-2026-0042' ? CANONICAL_FA_2026_0042 : stubFraudProfile(row);
}

export const FRAUD_ALERT_PROFILES: Record<string, FraudAlertProfile> = STUB_PROFILES;
