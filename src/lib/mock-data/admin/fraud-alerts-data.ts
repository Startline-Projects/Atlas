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

/* ------------------------------------------------------------------ */
/*  Phase 15b — §01 System signals                                     */
/* ------------------------------------------------------------------ */

export type FraudSignalState = 'fired' | 'not-fired';

export interface FraudSignal {
  index: number;
  name: string;
  /** Detail line. If detailCodeChip is set, render the chip placeholder `{code}` inside this string. */
  detail: string;
  /** Optional inline code-chip token (e.g. "pm_4Xb…91N") replaces `{code}` in detail. */
  detailCodeChip?: string;
  /** 0 for not-fired (renders as em-dash). */
  confidencePercent: number;
  state: FraudSignalState;
}

export interface FraudSignalsData {
  totalSignals: number;
  firedCount: number;
  lastEvaluated: string;
  signals: FraudSignal[];
}

/* ------------------------------------------------------------------ */
/*  Phase 15b — §02 Related accounts (network + table)                 */
/* ------------------------------------------------------------------ */

export type FraudNodeVariant = 'center' | 'flagged';

export interface FraudGraphNode {
  id: string;
  initials: string;
  cx: number;
  cy: number;
  r: number;
  variant: FraudNodeVariant;
  labelLine1: string;
  labelLine1Y: number;
  labelLine2: string;
  labelLine2Y: number;
}

export type FraudEdgeStrength = 'shared' | 'weak';

export interface FraudGraphEdge {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  strength: FraudEdgeStrength;
}

export interface FraudGraphEdgeLabel {
  x: number;
  y: number;
  text: string;
}

export interface FraudNetworkGraph {
  viewBox: string;
  nodes: FraudGraphNode[];
  edges: FraudGraphEdge[];
  edgeLabels: FraudGraphEdgeLabel[];
}

export interface FraudSharedAccountRow {
  nameStrong: string;
  meta: string;
  signalsFired: number;
  signalsTotal: number;
  status: string;
}

export interface FraudSharedSignalsTable {
  rows: FraudSharedAccountRow[];
}

export interface FraudRelatedData {
  /** Section head sh-meta — varies per alert (e.g. "Related payment instruments and chargeback history"). */
  sectionMeta: string;
  /** Optional — when absent, only matrix table renders (no graph + no legend). */
  graph?: FraudNetworkGraph;
  table: FraudSharedSignalsTable;
}

/* ------------------------------------------------------------------ */
/*  Phase 15b — §03 Behavioral anomalies                               */
/* ------------------------------------------------------------------ */

export type FraudAnomalyVariant = 'danger' | 'default';
export type FraudAnomalyIconKey = 'clock' | 'activity' | 'bolt' | 'dollar' | 'star';

export interface FraudAnomaly {
  iconKey: FraudAnomalyIconKey;
  variant: FraudAnomalyVariant;
  name: string;
  detail: string;
  sigmaValue: string;
}

export interface FraudAnomaliesData {
  anomalies: FraudAnomaly[];
}

/* ------------------------------------------------------------------ */
/*  Phase 15c — §04 Documents                                          */
/* ------------------------------------------------------------------ */

export type FraudDocIconKey = 'file' | 'image' | 'dollar' | 'globe' | 'star';
export type FraudDocVariant = 'default' | 'flagged';

export interface FraudDocument {
  id: string;
  iconKey: FraudDocIconKey;
  variant: FraudDocVariant;
  name: string;
  meta: string;
  actionKey: string;
}

export interface FraudDocumentsData {
  totalDocs: number;
  flaggedHeader: string;
  docs: FraudDocument[];
  ctaLabel: string;
  ctaActionKey: string;
  exportActionLabel: string;
  exportActionKey: string;
}

/* ------------------------------------------------------------------ */
/*  Phase 15c — §05 Timeline                                           */
/* ------------------------------------------------------------------ */

export type FraudEventVariant = 'danger' | 'warn' | 'system' | 'danger-system' | 'default';

export interface FraudTimelineEvent {
  time: string;
  actor?: string;
  actorIsSystem?: boolean;
  title: string;
  detail: string;
  variant: FraudEventVariant;
}

export interface FraudTimelineData {
  totalEvents: number;
  events: FraudTimelineEvent[];
}

/* ------------------------------------------------------------------ */
/*  Phase 15c — §06 Notes                                              */
/* ------------------------------------------------------------------ */

export interface FraudNote {
  author: string;
  initials: string;
  gradient: string;
  role: string;
  timestamp: string;
  body: string;
}

export interface FraudNoteComposerData {
  authorAvatarGradient: string;
  authorInitials: string;
  authorLabel: string;
  roleLabel: string;
  placeholder: string;
  footerLeftText: string;
  saveButtonLabel: string;
}

export interface FraudNotesData {
  totalNotes: number;
  notes: FraudNote[];
  composer: FraudNoteComposerData;
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
  /* Phase 15b — populated only for fa-2026-0042; undefined elsewhere */
  signalsData?: FraudSignalsData;
  relatedData?: FraudRelatedData;
  anomaliesData?: FraudAnomaliesData;
  /* Phase 15c — populated only for fa-2026-0042; undefined elsewhere */
  documentsData?: FraudDocumentsData;
  timelineData?: FraudTimelineData;
  notesData?: FraudNotesData;
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
  /* ===== Phase 15b — §01 System signals ===== */
  signalsData: {
    totalSignals: 9,
    firedCount: 8,
    lastEvaluated: 'last evaluated 3 min ago',
    signals: [
      {
        index: 1,
        name: 'Shared device fingerprint',
        detail: 'All 5 accounts log in from the same browser fingerprint hash (Canvas + WebGL + UA + fonts) · cross-account match within 3-day window',
        confidencePercent: 98,
        state: 'fired',
      },
      {
        index: 2,
        name: 'Shared IP block',
        detail: 'All 5 accounts originate from /24 IP block 217.182.143.0 (DigitalOcean datacenter, Frankfurt) · no residential / mobile diversification',
        confidencePercent: 96,
        state: 'fired',
      },
      {
        index: 3,
        name: 'Shared payment instrument',
        detail: 'Stripe payment method {code} appears as default payment for 4 of 5 accounts',
        detailCodeChip: 'pm_4Xb…91N',
        confidencePercent: 99,
        state: 'fired',
      },
      {
        index: 4,
        name: 'Behavioral pattern · session timing',
        detail: 'All accounts active in same 4-hour window daily (06:00–10:00 UTC) · synchronized job-posting rhythm',
        confidencePercent: 88,
        state: 'fired',
      },
      {
        index: 5,
        name: 'Dispute clustering',
        detail: '42% dispute rate on Vorona Capital + 28-37% on satellite accounts · all hours-tracking + payment-delay disputes',
        confidencePercent: 94,
        state: 'fired',
      },
      {
        index: 6,
        name: 'KYB document anomaly',
        detail: '2 of 5 accounts submitted KYB documents with same company-registration scan (different filed names) · OCR similarity 94%',
        confidencePercent: 91,
        state: 'fired',
      },
      {
        index: 7,
        name: 'Coordinated review activity',
        detail: 'Cross-references Step 13 cluster — 11 reviews from 5 reviewer accounts · all 5-star · all within 9 days · same writing fingerprint',
        confidencePercent: 87,
        state: 'fired',
      },
      {
        index: 8,
        name: 'Geo / declared-location mismatch',
        detail: 'Declared client locations (Berlin, Madrid, Lisbon, Vienna, Bratislava) inconsistent with actual login geo (all Frankfurt DC)',
        confidencePercent: 82,
        state: 'fired',
      },
      {
        index: 9,
        name: 'VPN / proxy / Tor detection',
        detail: 'No VPN, proxy, or Tor traffic detected · accounts use direct datacenter routing · this is unusual but not in itself a fraud indicator',
        confidencePercent: 0,
        state: 'not-fired',
      },
    ],
  },
  /* ===== Phase 15b — §02 Related accounts ===== */
  relatedData: {
    sectionMeta: '5 linked accounts · network graph · shared signals matrix',
    graph: {
      viewBox: '0 0 700 300',
      nodes: [
        { id: 'cl-167', initials: 'VC', cx: 350, cy: 150, r: 34, variant: 'center', labelLine1: 'Vorona Capital · cl-167', labelLine1Y: 200, labelLine2: 'LEAD · 42% disputes', labelLine2Y: 213 },
        { id: 'cl-201', initials: 'EH', cx: 160, cy: 80, r: 26, variant: 'flagged', labelLine1: 'Eastline Holdings · cl-201', labelLine1Y: 124, labelLine2: '28% disputes', labelLine2Y: 137 },
        { id: 'cl-219', initials: 'PS', cx: 540, cy: 80, r: 26, variant: 'flagged', labelLine1: 'Pintar Studios · cl-219', labelLine1Y: 124, labelLine2: '31% disputes', labelLine2Y: 137 },
        { id: 'cl-228', initials: 'AL', cx: 160, cy: 220, r: 26, variant: 'flagged', labelLine1: 'Avant Logistics · cl-228', labelLine1Y: 264, labelLine2: '35% disputes', labelLine2Y: 277 },
        { id: 'cl-235', initials: 'BT', cx: 540, cy: 220, r: 26, variant: 'flagged', labelLine1: 'Branka Trading · cl-235', labelLine1Y: 264, labelLine2: '37% disputes', labelLine2Y: 277 },
      ],
      edges: [
        { x1: 350, y1: 150, x2: 160, y2: 80, strength: 'shared' },
        { x1: 350, y1: 150, x2: 540, y2: 80, strength: 'shared' },
        { x1: 350, y1: 150, x2: 160, y2: 220, strength: 'shared' },
        { x1: 350, y1: 150, x2: 540, y2: 220, strength: 'shared' },
        { x1: 160, y1: 80, x2: 540, y2: 80, strength: 'weak' },
        { x1: 160, y1: 220, x2: 540, y2: 220, strength: 'weak' },
        { x1: 160, y1: 80, x2: 160, y2: 220, strength: 'weak' },
        { x1: 540, y1: 80, x2: 540, y2: 220, strength: 'weak' },
      ],
      edgeLabels: [
        { x: 240, y: 111, text: 'device + IP + pay' },
        { x: 450, y: 111, text: 'device + IP' },
        { x: 240, y: 195, text: 'device + IP + pay' },
        { x: 450, y: 195, text: 'device + IP' },
      ],
    },
    table: {
      rows: [
        { nameStrong: 'Vorona Capital', meta: '· cl-167 · LEAD · 12 hires · $84K GMV', signalsFired: 8, signalsTotal: 9, status: 'Investigating' },
        { nameStrong: 'Eastline Holdings', meta: '· cl-201 · 6 hires · $42K', signalsFired: 7, signalsTotal: 9, status: 'Open · linked' },
        { nameStrong: 'Pintar Studios', meta: '· cl-219 · 4 hires · $28K', signalsFired: 7, signalsTotal: 9, status: 'Open · linked' },
        { nameStrong: 'Avant Logistics', meta: '· cl-228 · 8 hires · $38K', signalsFired: 8, signalsTotal: 9, status: 'Open · linked' },
        { nameStrong: 'Branka Trading', meta: '· cl-235 · 5 hires · $24K', signalsFired: 7, signalsTotal: 9, status: 'Open · linked' },
      ],
    },
  },
  /* ===== Phase 15b — §03 Behavioral anomalies ===== */
  anomaliesData: {
    anomalies: [
      { iconKey: 'clock', variant: 'danger', name: 'Synchronized session timing', detail: 'All 5 accounts active 06:00–10:00 UTC daily · normal clients diversify across timezones · σ = 0.4h vs platform avg 4.2h', sigmaValue: '+10.5σ' },
      { iconKey: 'activity', variant: 'danger', name: 'Job-posting velocity', detail: '5.2 jobs/account/week · platform median is 0.4 · all jobs in same 6 categories (engineering, design, content)', sigmaValue: '+13σ' },
      { iconKey: 'bolt', variant: 'default', name: 'Hire decision speed', detail: 'Avg 2.1 hours from posting to hire · platform avg is 8.2 days · suggests pre-arranged talent', sigmaValue: '+5.8σ' },
      { iconKey: 'dollar', variant: 'default', name: 'Payment timing', detail: 'All 5 accounts pay invoices on day 28-29 of payment terms · creates 3-4d delay disputes pattern', sigmaValue: '+3.2σ' },
      { iconKey: 'star', variant: 'danger', name: 'Review-leaving cadence', detail: 'All 5 accounts leave reviews within 18-26h of engagement close · 100% are 5-star · normal distribution is 2.4d-7d', sigmaValue: '+8.4σ' },
    ],
  },
  /* ===== Phase 15c — §04 Documents ===== */
  documentsData: {
    totalDocs: 23,
    flaggedHeader: '23 documents · 4 flagged for OCR similarity / metadata anomaly',
    docs: [
      { id: 'doc-001', iconKey: 'file', variant: 'flagged', name: 'Vorona-KYB-incorporation.pdf', meta: '2.4 MB · uploaded Jan 18 · OCR match 94% with cl-201 KYB · ⚠ flagged', actionKey: 'open-doc-001' },
      { id: 'doc-002', iconKey: 'file', variant: 'flagged', name: 'Eastline-KYB-incorporation.pdf', meta: '2.3 MB · uploaded Jan 22 · OCR match with Vorona doc · ⚠ flagged', actionKey: 'open-doc-002' },
      { id: 'doc-003', iconKey: 'image', variant: 'flagged', name: 'authorized-signatory-passport-VC.jpg', meta: '1.8 MB · uploaded Jan 18 · EXIF metadata stripped · ⚠ unusual', actionKey: 'open-doc-003' },
      { id: 'doc-004', iconKey: 'dollar', variant: 'flagged', name: 'stripe-pm_4Xb91N-history.csv', meta: '42 KB · system-generated May 2 · same payment method on 4 of 5 accounts · ⚠ ring evidence', actionKey: 'open-doc-004' },
      { id: 'doc-005', iconKey: 'globe', variant: 'default', name: 'ip-fingerprint-network-trace.json', meta: '218 KB · 14-day session log · all 5 accounts from 217.182.143.0/24', actionKey: 'open-doc-005' },
      { id: 'doc-006', iconKey: 'star', variant: 'default', name: 'REV-834-cluster-evidence.zip', meta: '4.2 MB · cross-references Step 13 sock-puppet detection · 11 reviews with similarity matrix', actionKey: 'open-doc-006' },
    ],
    ctaLabel: '+ 17 more documents in evidence pack →',
    ctaActionKey: 'load-more-docs',
    exportActionLabel: 'Export evidence pack',
    exportActionKey: 'export-evidence',
  },
  /* ===== Phase 15c — §05 Timeline ===== */
  timelineData: {
    totalEvents: 142,
    events: [
      { time: 'Today · 10:18 UTC · 38 min ago', actor: 'Aïsha Okafor', title: 'opened decision review', detail: 'Reviewing all signals + cross-references before final action. Considering: Ban all 5 accounts + refund affected talent.', variant: 'danger' },
      { time: 'Today · 09:42 UTC', actor: 'Sarah Reyes', title: 'added admin note', detail: '"Talent payouts of $11.4K already disbursed across 14 affected candidates — those are protected. New refund needs to come from Atlas reserves, not clawback."', variant: 'default' },
      { time: 'May 5 · 08:45 UTC', actor: 'System', actorIsSystem: true, title: 'linked dispute + review evidence', detail: 'Cross-referenced DSP-2026-0144 (Stefan/Tomás dispute) and REV-834 (sock-puppet review cluster) to this fraud alert. All three cases now reference each other.', variant: 'default' },
      { time: 'May 4 · 11:08 UTC', actor: 'Dario Fonseca', title: 'compiled evidence pack', detail: '23 documents · 14-day log range · cross-account fingerprint correlation matrix. Ready for legal review if escalation needed.', variant: 'default' },
      { time: 'May 3 · 09:22 UTC', actor: 'System', actorIsSystem: true, title: 'identified linked accounts', detail: '4 satellite accounts flagged: cl-201 (Eastline), cl-219 (Pintar), cl-228 (Avant), cl-235 (Branka). All 4 added to active watchlist with auto-suspend trigger if any takes a high-value action.', variant: 'warn' },
      { time: 'May 2 · 19:14 UTC', actor: 'Aïsha Okafor', title: 'began initial triage', detail: 'Confirmed alert is not a false positive. Signal accuracy verified manually for top 5 signals. Investigation opened formally.', variant: 'default' },
      { time: 'May 2 · 18:42 UTC', actor: 'System', actorIsSystem: true, title: 'raised CRITICAL alert', detail: '8 of 9 fraud signals fired simultaneously on cl-167 (Vorona Capital). Alert FA-2026-0042 created. Notification sent to fraud-alerts Slack channel + paged Aïsha (lead admin).', variant: 'danger-system' },
      { time: 'Apr 30 · 11:42 UTC', title: 'Earlier flag — sock-puppet reviews (medium)', detail: 'FA-2026-0038 raised on A2Z Solutions (cl-178) for review cluster. Same review-writing fingerprint detected — investigation revealed Vorona ring as upstream source.', variant: 'default' },
      { time: 'Mar 14 · earlier', title: 'Vorona dispute pattern noted', detail: "Vorona's 5th dispute in 90d triggered \"high dispute rate\" client flag (Step 12 patterns). At the time, no fraud ring detected — only billing pattern.", variant: 'default' },
      { time: 'Jan 18 · earlier', title: 'Vorona Capital account created', detail: 'cl-167 onboarded · KYB passed · authorized signatory verified · trust tier "Standard" assigned.', variant: 'default' },
    ],
  },
  /* ===== Phase 15c — §06 Notes ===== */
  notesData: {
    totalNotes: 8,
    notes: [
      {
        author: 'Dario Fonseca',
        initials: 'DF',
        gradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)',
        role: 'Super Admin',
        timestamp: 'May 4 · 11:14 UTC',
        body: 'Evidence pack done. The KYB document OCR similarity is the strongest piece — same scan reused across 2 different submissions with different filed names. That alone is enough for ban + legal-report. Aïsha, you have my pre-authorization for the ban action when you\'re ready.',
      },
      {
        author: 'Sarah Reyes',
        initials: 'SR',
        gradient: 'linear-gradient(135deg, #A0C9B8, #4F8B6E)',
        role: 'Specialist',
        timestamp: 'May 4 · 09:30 UTC',
        body: 'All 14 affected talents have been paid out per their contracts (verified by Finance). Their payouts are honored regardless of what we do to Vorona — talent is not at risk financially. Affected list attached as doc-007.',
      },
      {
        author: 'Aïsha Okafor (you)',
        initials: 'AO',
        gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)',
        role: 'Operations',
        timestamp: 'May 3 · 14:22 UTC',
        body: 'Pinged @dario for super-authorization on hard ban. Reasoning: 8/9 signals fired, KYB document fraud is criminal-grade, dispute pattern + sock-puppet reviews show this is sustained abuse of platform. Recommend ban + 30-day hold on funds + regulatory notification to BaFin (Frankfurt jurisdiction).',
      },
    ],
    composer: {
      authorAvatarGradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)',
      authorInitials: 'AO',
      authorLabel: 'Add note as Aïsha',
      roleLabel: 'You',
      placeholder: 'Add an investigation note · admins only · audit logged · supports markdown',
      footerLeftText: 'Internal · visible to all admins · audit logged on save',
      saveButtonLabel: 'Save note',
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Phase 15d — 8 additional canonical profiles                        */
/* ------------------------------------------------------------------ */

/* FA-2026-0041 — Marek Kowalczyk (Critical, Fake ID, Open) */
const CANONICAL_FA_2026_0041: FraudAlertProfile = {
  id: 'fa-2026-0041',
  atlasId: 'FA-2026-0041',
  severity: 'critical',
  status: 'open',
  statusLabel: 'Open',
  detected: 'May 4 · 09:15 UTC',
  detectedAgo: '1d 23h ago',
  title: 'Document liveness mismatch · Marek Kowalczyk (cand-1142)',
  subtitle: 'Government-issued ID submitted during onboarding failed multiple liveness checks. Face comparison between document photo and live selfie shows significant geometric deviation (28% match vs required 75%). Four resubmissions in 24h period with identical tampering signatures suggest deliberate evasion attempt.',
  heroStats: [
    { label: 'Confidence', value: '91%', sub: '6 of 7 signals fired' },
    { label: 'Submissions', value: '4', sub: 'in 24h window · baseline 1' },
    { label: 'Face match score', value: '28%', sub: 'threshold 75% · severe miss' },
    { label: 'Investigation age', value: '1d 23h', sub: 'SLA: 7 days for critical' },
  ],
  actions: [
    { key: 'reject', label: 'Reject application', variant: 'danger' },
    { key: 'request-reverify', label: 'Request re-verification', variant: 'primary' },
    { key: 'override', label: 'Approve override', variant: 'secondary' },
  ],
  moreActions: ['Reassign investigator', 'Escalate to Super Admin', 'File legal report', 'Add device to denylist', 'Dismiss as false positive'],
  investigationSteps: [
    { label: 'Alert generated', meta: 'May 4 · 09:15 · auto-detected by liveness signals', done: true, current: false },
    { label: 'Initial triage', meta: 'in progress · Sarah Reyes manual face-geometry review', done: false, current: true },
    { label: 'Document forensics', meta: 'pending · pixel-level analysis on submissions', done: false, current: false },
    { label: 'Decision review', meta: 'pending · reject or request re-verification', done: false, current: false },
    { label: 'Action executed', meta: 'pending · audit + candidate notification', done: false, current: false },
    { label: 'Case closed', meta: 'pending · resolution log', done: false, current: false },
  ],
  investigationProgress: { done: 1, total: 6 },
  quickStats: [
    { label: 'Lead investigator', value: 'Sarah Reyes' },
    { label: 'Candidate', value: 'cand-1142', href: '#' },
    { label: 'Document submissions', value: '4' },
    { label: 'Face match score', value: '28%' },
    { label: 'IP geolocation', value: 'Warsaw datacenter' },
    { label: 'SLA remaining', value: '5d 1h' },
    { label: 'Audit log', value: '42 events', href: '#' },
  ],
  sections: [
    { id: 'signals', title: 'System signals', meta: '7 signals evaluated · 6 fired · last evaluated 8 min ago' },
    { id: 'related-accounts', title: 'Related accounts', meta: 'Single-account alert · no linked accounts detected' },
    { id: 'anomalies', title: 'Behavioral anomalies', meta: '3 anomalies detected · deviation range +2.8σ to +6.2σ' },
    { id: 'documents', title: 'Documents involved', meta: '4 documents · all flagged for tampering or mismatch' },
    { id: 'timeline', title: 'Timeline of events', meta: '42 events · 6 shown' },
    { id: 'notes', title: 'Admin notes', meta: '1 note + composer' },
  ],
  signalsData: {
    totalSignals: 7, firedCount: 6, lastEvaluated: 'last evaluated 8 min ago',
    signals: [
      { index: 1, name: 'Document liveness check failed', detail: 'Face image static across 4 submissions · no liveness motion detected · automated check failed all 4 times', confidencePercent: 99, state: 'fired' },
      { index: 2, name: 'Face geometry match below threshold', detail: 'Match score 28% between ID document photo and live selfie · platform threshold is 75% · severe deviation', confidencePercent: 96, state: 'fired' },
      { index: 3, name: 'Document tampering detected', detail: 'Pixel-level inconsistencies in name field on submissions 2-4 · digital alteration signature detected', confidencePercent: 94, state: 'fired' },
      { index: 4, name: 'Inconsistent metadata across submissions', detail: '4 submissions with different EXIF timestamps within 24h · same underlying tampering signature suggests single source', confidencePercent: 88, state: 'fired' },
      { index: 5, name: 'Velocity anomaly · resubmission pattern', detail: '4 application attempts in 24h period · normal baseline is 1 attempt per applicant', confidencePercent: 82, state: 'fired' },
      { index: 6, name: 'IP geolocation mismatch', detail: 'Declared location Krakow · actual login IP 185.220.x.x (Warsaw datacenter) · no residential connection', confidencePercent: 78, state: 'fired' },
      { index: 7, name: 'Network reputation score', detail: 'IP block has clean reputation · no commercial VPN or known proxy service detected · unusual for fraud pattern', confidencePercent: 0, state: 'not-fired' },
    ],
  },
  relatedData: {
    sectionMeta: 'Related historical signals and patterns for this account',
    table: {
      rows: [
        { nameStrong: 'ID submission velocity', meta: ' · 4 attempts in 24h · same account · all same tampering signature', signalsFired: 3, signalsTotal: 3, status: 'Confirmed fraud pattern' },
        { nameStrong: 'Device fingerprint', meta: ' · single device · Warsaw datacenter IP · matches known tor exit pattern', signalsFired: 2, signalsTotal: 3, status: 'Confirmed' },
        { nameStrong: 'Submission location', meta: ' · 3 different declared countries · all from same IP block', signalsFired: 3, signalsTotal: 3, status: 'Confirmed mismatch' },
      ],
    },
  },
  anomaliesData: {
    anomalies: [
      { iconKey: 'activity', variant: 'danger', name: 'Document submission velocity', detail: '4 resubmissions within 24h window · platform baseline is 0.4 submissions per applicant per day', sigmaValue: '+6.2σ' },
      { iconKey: 'star', variant: 'danger', name: 'Face geometry deviation', detail: '28% match score vs platform average 87% for legitimate users · 71% deviation from norm', sigmaValue: '+4.1σ' },
      { iconKey: 'clock', variant: 'default', name: 'Submission timing pattern', detail: 'All 4 submissions occurred in 22:00-04:00 UTC window · automated retry pattern suspected', sigmaValue: '+2.8σ' },
    ],
  },
  documentsData: {
    totalDocs: 4, flaggedHeader: '4 documents · all flagged for tampering or mismatch signature',
    docs: [
      { id: 'doc-101', iconKey: 'image', variant: 'flagged', name: 'cand-1142-passport-attempt1.jpg', meta: '2.1 MB · uploaded May 4 09:15 · failed liveness · ⚠ tampered metadata', actionKey: 'open-doc-101' },
      { id: 'doc-102', iconKey: 'image', variant: 'flagged', name: 'cand-1142-passport-attempt2.jpg', meta: '2.0 MB · uploaded May 4 16:05 · same tampering signature · ⚠ flagged', actionKey: 'open-doc-102' },
      { id: 'doc-103', iconKey: 'file', variant: 'flagged', name: 'cand-1142-selfie-video.mp4', meta: '8.4 MB · 12s duration · face geometry mismatch · ⚠ flagged', actionKey: 'open-doc-103' },
      { id: 'doc-104', iconKey: 'globe', variant: 'default', name: 'cand-1142-face-match-analysis.json', meta: '18 KB · automated comparison report · 28% match score · system-generated', actionKey: 'open-doc-104' },
    ],
    ctaLabel: 'View full forensics report →', ctaActionKey: 'view-forensics',
    exportActionLabel: 'Export evidence pack', exportActionKey: 'export-evidence',
  },
  timelineData: {
    totalEvents: 42,
    events: [
      { time: 'Today · 03:12 UTC', actor: 'Sarah Reyes', title: 'started document forensics review', detail: 'Picked up alert for manual face-geometry review. Running extended pixel-level forensics on submissions 1-4.', variant: 'default' },
      { time: 'Today · 02:14 UTC', actor: 'System', actorIsSystem: true, title: 'raised CRITICAL alert', detail: 'Document liveness check failed on 4th submission attempt. Face geometry match 28% vs required 75%. Alert FA-2026-0041 escalated to critical severity.', variant: 'danger' },
      { time: 'Today · 00:48 UTC', actor: 'System', actorIsSystem: true, title: '4th submission attempt detected', detail: 'Candidate re-submitted government ID for the 4th time in 24h. Each submission has different EXIF timestamp but same underlying tampering signature.', variant: 'warn' },
      { time: 'Yesterday · 18:22 UTC', actor: 'Sarah Reyes', title: 'assigned to case', detail: 'Picked up alert for manual review. Initial scan suggests tampering pattern.', variant: 'default' },
      { time: 'Yesterday · 16:05 UTC', actor: 'System', actorIsSystem: true, title: '3rd submission attempt detected', detail: '3rd document submission in 7 hours. Pattern flagged for escalation.', variant: 'default' },
      { time: 'May 4 · 09:15 UTC', title: 'Candidate cand-1142 onboarded', detail: 'Account created, 1st document submission attempted. Liveness check inconclusive · auto-escalated to manual review queue.', variant: 'default' },
    ],
  },
  notesData: {
    totalNotes: 1,
    notes: [
      { author: 'Sarah Reyes', initials: 'SR', gradient: 'linear-gradient(135deg, #A0C9B8, #4F8B6E)', role: 'Specialist', timestamp: 'Today · 03:12 UTC',
        body: 'Reviewing document forensics now. The pixel-level analysis is conclusive — name field has clearly been digitally altered across submissions 2-4 (same alteration signature, just different EXIF noise). Recommend reject + permaban + add device fingerprint to denylist. Will have full forensics report by EOD.' },
    ],
    composer: {
      authorAvatarGradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', authorInitials: 'AO',
      authorLabel: 'Add note as Aïsha', roleLabel: 'You',
      placeholder: 'Add an investigation note · admins only · audit logged · supports markdown',
      footerLeftText: 'Internal · visible to all admins · audit logged on save',
      saveButtonLabel: 'Save note',
    },
  },
};

/* FA-2026-0039 — Stellar Partners LLC (Critical, Payment Fraud, Investigating) */
const CANONICAL_FA_2026_0039: FraudAlertProfile = {
  id: 'fa-2026-0039',
  atlasId: 'FA-2026-0039',
  severity: 'critical',
  status: 'investigating',
  statusLabel: 'Investigating',
  detected: 'May 1 · 23:18 UTC',
  detectedAgo: '4d 9h ago',
  title: 'Payment fraud · Stellar Partners LLC (cl-204) — 7 chargebacks in 14d',
  subtitle: 'Client has triggered 7 chargebacks within 14 days, all for digital service deliverables that were marked as "product not received" (reason code 4855) despite Atlas-verified delivery confirmations. Total disputed value $18.6K. Pattern matches known chargeback-fraud signatures across 3 payment methods.',
  heroStats: [
    { label: 'Confidence', value: '88%', sub: '7 of 8 signals fired' },
    { label: 'Chargebacks', value: '7', sub: 'in 14 days · baseline 0.3/month' },
    { label: 'Disputed value', value: '$18.6K', sub: 'across 7 engagements' },
    { label: 'Investigation age', value: '4d 9h', sub: 'SLA: 7 days for critical' },
  ],
  actions: [
    { key: 'freeze-account', label: 'Freeze account', variant: 'danger' },
    { key: 'dispute-chargebacks', label: 'Dispute chargebacks', variant: 'primary' },
    { key: 'request-stripe-review', label: 'Request Stripe review', variant: 'secondary' },
  ],
  moreActions: ['Add note', 'Export evidence pack', 'Notify legal', 'Link dispute cases', 'Escalate to Super Admin', 'Dismiss alert'],
  investigationSteps: [
    { label: 'Alert generated', meta: 'May 1 · 23:18 · auto-detected on 5th chargeback', done: true, current: false },
    { label: 'Initial triage', meta: 'May 2 · 09:42 · Daniel — confirmed pattern', done: true, current: false },
    { label: 'Evidence collected', meta: 'May 3 · 14:08 · 6 docs · delivery confirmations', done: true, current: false },
    { label: 'Stripe coordination', meta: 'in progress · Daniel — risk team escalation', done: false, current: true },
    { label: 'Decision review', meta: 'pending · freeze + dispute', done: false, current: false },
    { label: 'Action executed', meta: 'pending', done: false, current: false },
    { label: 'Case closed', meta: 'pending · post-mortem + Stripe report', done: false, current: false },
  ],
  investigationProgress: { done: 3, total: 7 },
  quickStats: [
    { label: 'Lead investigator', value: 'Daniel Kovács', href: '#' },
    { label: 'Co-investigators', value: 'Aïsha · Sarah R.' },
    { label: 'Client', value: 'cl-204', href: '#' },
    { label: 'Chargebacks', value: '7 cases' },
    { label: 'Disputed value', value: '$18.6K' },
    { label: 'Payment methods', value: '3 cards' },
    { label: 'SLA remaining', value: '2d 15h' },
    { label: 'Audit log', value: '96 events', href: '#' },
  ],
  sections: [
    { id: 'signals', title: 'System signals', meta: '8 signals evaluated · 7 fired · last evaluated 14 min ago' },
    { id: 'related-accounts', title: 'Related accounts', meta: 'Single-account alert · payment-only — no linked accounts' },
    { id: 'anomalies', title: 'Behavioral anomalies', meta: '4 anomalies · deviation range +3.6σ to +12σ' },
    { id: 'documents', title: 'Documents involved', meta: '6 documents · 4 flagged for chargeback fraud signature' },
    { id: 'timeline', title: 'Timeline of events', meta: '96 events · 9 shown' },
    { id: 'notes', title: 'Admin notes', meta: '2 notes + composer' },
  ],
  signalsData: {
    totalSignals: 8, firedCount: 7, lastEvaluated: 'last evaluated 14 min ago',
    signals: [
      { index: 1, name: 'Chargeback velocity', detail: '7 chargebacks in 14 days · baseline for active clients is under 0.5 per month', confidencePercent: 98, state: 'fired' },
      { index: 2, name: 'All chargebacks same reason code', detail: 'All 7 disputes filed under reason code 4855 "product/service not received" despite Atlas delivery confirmations', confidencePercent: 95, state: 'fired' },
      { index: 3, name: 'Delivery confirmations contradicted', detail: 'All 7 disputed engagements had Atlas-verified delivery (GPS + timestamp + recipient signature) — cardholder claims directly contradict logged evidence', confidencePercent: 92, state: 'fired' },
      { index: 4, name: 'Payment card velocity', detail: '3 different payment cards used in 30-day window · baseline is 1.2 cards per year for stable clients', confidencePercent: 89, state: 'fired' },
      { index: 5, name: '3DS bypass attempts', detail: '4 of 7 disputed transactions bypassed 3DS authentication via low-value exemption · suspicious deliberate pattern', confidencePercent: 84, state: 'fired' },
      { index: 6, name: 'Billing address vs IP mismatch', detail: 'Payment cards billed to UK addresses but transactions originated from US IP addresses · indicates card testing/fraud', confidencePercent: 78, state: 'fired' },
      { index: 7, name: 'New account fast-spend pattern', detail: '$18.6K spent in 14 days on a 30-day-old account · typical fraud signature for "bust-out" pattern', confidencePercent: 72, state: 'fired' },
      { index: 8, name: 'Stripe risk score elevation', detail: 'Stripe still classifies account as medium-risk despite chargeback pattern · external risk model has not caught up', confidencePercent: 0, state: 'not-fired' },
    ],
  },
  relatedData: {
    sectionMeta: 'Related payment instruments and chargeback history',
    table: {
      rows: [
        { nameStrong: 'Payment method · card_pm_88X92', meta: ' · BIN 4147 · added Apr 18 · 4 chargebacks · UK issuer', signalsFired: 4, signalsTotal: 4, status: 'Confirmed fraud' },
        { nameStrong: 'Payment method · card_pm_92Y11', meta: ' · BIN 5301 · added Apr 22 · 2 chargebacks · US issuer', signalsFired: 2, signalsTotal: 4, status: 'Investigating' },
        { nameStrong: '3DS bypass attempts', meta: ' · 12 attempts in 30d · 8 successful via low-value exemption · 4 blocked', signalsFired: 3, signalsTotal: 4, status: 'Confirmed pattern' },
      ],
    },
  },
  anomaliesData: {
    anomalies: [
      { iconKey: 'activity', variant: 'danger', name: 'Chargeback rate', detail: '7 chargebacks in 14 days vs platform baseline of 0.3 chargebacks per active client per month', sigmaValue: '+12σ' },
      { iconKey: 'dollar', variant: 'danger', name: 'Transaction velocity', detail: '$18.6K transacted in 14 days vs baseline $2K per month for similar client tier', sigmaValue: '+5.4σ' },
      { iconKey: 'bolt', variant: 'danger', name: 'Card-rotation pattern', detail: '3 different cards used in 30 days · baseline is 1.2 cards per year for stable clients', sigmaValue: '+4.8σ' },
      { iconKey: 'clock', variant: 'default', name: '3DS bypass rate', detail: '57% of transactions bypassed 3DS via low-value exemption vs platform average of 4%', sigmaValue: '+3.6σ' },
    ],
  },
  documentsData: {
    totalDocs: 6, flaggedHeader: '6 documents · 4 flagged for chargeback fraud signature',
    docs: [
      { id: 'doc-201', iconKey: 'file', variant: 'flagged', name: 'cl-204-chargebacks-summary.csv', meta: '24 KB · system-generated May 1 · 7 chargebacks · all reason code 4855 · ⚠ flagged', actionKey: 'open-doc-201' },
      { id: 'doc-202', iconKey: 'file', variant: 'flagged', name: 'cl-204-delivery-confirmations.zip', meta: '8.4 MB · 7 verified deliveries with GPS + signature timestamps · ⚠ contradicts disputes', actionKey: 'open-doc-202' },
      { id: 'doc-203', iconKey: 'dollar', variant: 'flagged', name: 'cl-204-stripe-chargeback-records.pdf', meta: '1.2 MB · Stripe export · 7 dispute filings with cardholder statements · ⚠ flagged', actionKey: 'open-doc-203' },
      { id: 'doc-204', iconKey: 'dollar', variant: 'flagged', name: 'cl-204-3ds-bypass-log.csv', meta: '42 KB · 4 of 7 transactions bypassed 3DS · ⚠ ring evidence', actionKey: 'open-doc-204' },
      { id: 'doc-205', iconKey: 'file', variant: 'default', name: 'cl-204-payment-methods.json', meta: '12 KB · 3 cards · 2 BIN ranges · UK + US issuers · 30-day history', actionKey: 'open-doc-205' },
      { id: 'doc-206', iconKey: 'globe', variant: 'default', name: 'cl-204-ip-billing-mismatch.json', meta: '84 KB · billing address UK · IP geolocation US (NY datacenter)', actionKey: 'open-doc-206' },
    ],
    ctaLabel: '+ 4 more documents (Stripe correspondence) →', ctaActionKey: 'load-more-docs',
    exportActionLabel: 'Export evidence pack', exportActionKey: 'export-evidence',
  },
  timelineData: {
    totalEvents: 96,
    events: [
      { time: 'Today · 11:30 UTC', actor: 'Daniel Kovács', title: 'compiled financial timeline', detail: 'All 7 chargebacks traced back to engagements with Atlas-verified delivery. Total clawback liability $18.6K. Stripe dispute deadlines all within 21 days — need decision this week.', variant: 'default' },
      { time: 'Today · 09:18 UTC', actor: 'Sarah Reyes', title: 'added admin note', detail: 'Stripe still classifying account as medium-risk. Pushing them for elevated risk classification given the pattern.', variant: 'default' },
      { time: 'May 4 · 14:22 UTC', actor: 'Aïsha Okafor', title: 'opened decision review', detail: 'Considering: Freeze account + dispute all 7 chargebacks via merchant evidence + report to Stripe risk team.', variant: 'default' },
      { time: 'May 3 · 11:45 UTC', actor: 'System', actorIsSystem: true, title: 'linked 7th chargeback', detail: 'Chargeback #7 confirmed: cardholder dispute filed despite Atlas delivery confirmation. Pattern now incontrovertible.', variant: 'default' },
      { time: 'May 2 · 16:08 UTC', actor: 'System', actorIsSystem: true, title: 'chargeback velocity threshold exceeded', detail: '5 chargebacks in 12 days triggered escalation threshold. Alert auto-escalated to critical severity.', variant: 'warn' },
      { time: 'May 1 · 23:18 UTC', actor: 'System', actorIsSystem: true, title: 'raised CRITICAL alert', detail: '5th chargeback filed within 14 days. Reason code 4855 "product not received" on all 5. Atlas delivery confirmations directly contradict cardholder claims.', variant: 'danger' },
      { time: 'Apr 28 · earlier', title: 'First chargeback filed', detail: 'Initial chargeback on engagement DSP-2026-0098. Atlas delivery confirmation in place. Flagged for review but no escalation yet.', variant: 'default' },
      { time: 'Apr 14 · earlier', title: 'First engagement with Stellar Partners', detail: 'cl-204 first $2.4K engagement with cand-892. Standard onboarding complete.', variant: 'default' },
      { time: 'Apr 5 · earlier', title: 'Stellar Partners LLC account created', detail: 'cl-204 onboarded · KYB passed · payment instruments verified · trust tier "Standard" assigned.', variant: 'default' },
    ],
  },
  notesData: {
    totalNotes: 2,
    notes: [
      { author: 'Daniel Kovács', initials: 'DK', gradient: 'linear-gradient(135deg, #8FA8C9, #4F6E8B)', role: 'Specialist', timestamp: 'Today · 11:42 UTC',
        body: 'Reached out to Stripe risk team. They\'ve agreed to elevate cl-204 to high-risk after I shared the delivery confirmation evidence. They\'ll freeze further chargeback eligibility pending review. Recommend we move on the freeze action by EOD before more chargebacks land.' },
      { author: 'Aïsha Okafor (you)', initials: 'AO', gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', role: 'Operations', timestamp: 'May 4 · 14:30 UTC',
        body: 'Strong case for full account suspension + chargeback dispute. The delivery evidence is bulletproof — Atlas timestamps + GPS + recipient signature on all 7. Recommend escalating to Dario for super-admin sign-off on legal action against the cardholder party.' },
    ],
    composer: {
      authorAvatarGradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', authorInitials: 'AO',
      authorLabel: 'Add note as Aïsha', roleLabel: 'You',
      placeholder: 'Add an investigation note · admins only · audit logged · supports markdown',
      footerLeftText: 'Internal · visible to all admins · audit logged on save',
      saveButtonLabel: 'Save note',
    },
  },
};

/* FA-2026-0038 — A2Z Solutions Ltd (High, Sock-puppet reviews, Open) */
const CANONICAL_FA_2026_0038: FraudAlertProfile = {
  id: 'fa-2026-0038',
  atlasId: 'FA-2026-0038',
  severity: 'high',
  status: 'open',
  statusLabel: 'Open',
  detected: 'Apr 30 · 11:42 UTC',
  detectedAgo: '5d 21h ago',
  title: 'Sock-puppet review cluster · A2Z Solutions Ltd (cl-178)',
  subtitle: 'Coordinated 5-star review activity from 4 reviewer accounts targeting A2Z Solutions engagements. Writing-fingerprint analysis shows 87% n-gram similarity across reviewers · IP overlap on /24 block · identical posting cadence (18-26h post-engagement). Cross-references one reviewer to the Vorona Capital ring (FA-2026-0042).',
  heroStats: [
    { label: 'Confidence', value: '82%', sub: '5 of 6 signals fired' },
    { label: 'Suspicious reviews', value: '11', sub: 'all 5-star · 4 reviewer accounts' },
    { label: 'Linked reviewers', value: '4', sub: '3 share /24 IP block' },
    { label: 'Investigation age', value: '5d 21h', sub: 'SLA: 14 days for high' },
  ],
  actions: [
    { key: 'flag-reviews', label: 'Flag 11 reviews', variant: 'danger' },
    { key: 'suspend-reviewers', label: 'Suspend reviewer accounts', variant: 'primary' },
    { key: 'investigate-further', label: 'Request deeper analysis', variant: 'secondary' },
  ],
  moreActions: ['Reassign investigator', 'Cross-reference to Vorona ring', 'File legal report', 'Dismiss alert'],
  investigationSteps: [
    { label: 'Alert generated', meta: 'Apr 30 · 11:42 · auto-detected by writing-fingerprint', done: true, current: false },
    { label: 'Initial triage', meta: 'May 1 · 14:22 · Daniel — pattern confirmed', done: true, current: false },
    { label: 'Reviewer accounts mapped', meta: 'May 2 · 09:48 · 4 satellites identified', done: true, current: false },
    { label: 'Cross-reference complete', meta: 'May 4 · 16:30 · linked to Vorona ring', done: false, current: true },
    { label: 'Decision review', meta: 'pending · flag + suspend', done: false, current: false },
    { label: 'Action executed', meta: 'pending', done: false, current: false },
    { label: 'Case closed', meta: 'pending', done: false, current: false },
  ],
  investigationProgress: { done: 3, total: 7 },
  quickStats: [
    { label: 'Lead investigator', value: 'Daniel Kovács', href: '#' },
    { label: 'Client target', value: 'cl-178', href: '#' },
    { label: 'Suspicious reviews', value: '11' },
    { label: 'Linked reviewers', value: '4 accounts' },
    { label: 'Cross-ref to ring', value: 'FA-2026-0042', href: '/admin/trust-safety/fraud-abuse/fa-2026-0042' },
    { label: 'Writing similarity', value: '87% n-gram' },
    { label: 'SLA remaining', value: '8d 3h' },
    { label: 'Audit log', value: '38 events', href: '#' },
  ],
  sections: [
    { id: 'signals', title: 'System signals', meta: '6 signals evaluated · 5 fired · last evaluated 22 min ago' },
    { id: 'related-accounts', title: 'Related accounts', meta: '3 sock-puppet reviewer accounts · simplified cluster view' },
    { id: 'anomalies', title: 'Behavioral anomalies', meta: '3 anomalies · deviation range +3.4σ to +7.2σ' },
    { id: 'documents', title: 'Documents involved', meta: '4 documents · 2 flagged for similarity evidence' },
    { id: 'timeline', title: 'Timeline of events', meta: '38 events · 6 shown' },
    { id: 'notes', title: 'Admin notes', meta: '2 notes + composer' },
  ],
  signalsData: {
    totalSignals: 6, firedCount: 5, lastEvaluated: 'last evaluated 22 min ago',
    signals: [
      { index: 1, name: 'Writing-fingerprint similarity', detail: 'N-gram analysis shows 87% writing similarity across the 4 reviewer accounts · normal cross-account similarity is below 35%', confidencePercent: 92, state: 'fired' },
      { index: 2, name: 'Posting cadence pattern', detail: 'All 11 reviews posted within 18-26h of engagement close · normal distribution is 2.4d-7d', confidencePercent: 88, state: 'fired' },
      { index: 3, name: 'IP block overlap', detail: '3 of 4 reviewer accounts share /24 IP block 217.182.143.0 (same datacenter as Vorona ring)', confidencePercent: 84, state: 'fired' },
      { index: 4, name: 'Account age vs posting velocity', detail: 'All 4 reviewer accounts are <30 days old · 11 reviews in aggregate · 100% targeted at cl-178', confidencePercent: 78, state: 'fired' },
      { index: 5, name: 'Cross-reference to Vorona ring', detail: '1 of 4 reviewer accounts also appears in FA-2026-0042 evidence pack as a fake reviewer persona', confidencePercent: 75, state: 'fired' },
      { index: 6, name: 'Rating distribution skew', detail: 'All 11 reviews are 5-star · platform baseline average rating is 4.2', confidencePercent: 0, state: 'not-fired' },
    ],
  },
  relatedData: {
    sectionMeta: '3 sock-puppet reviewer accounts · mini cluster · shared writing fingerprint',
    graph: {
      viewBox: '0 0 700 300',
      nodes: [
        { id: 'cl-178', initials: 'A2', cx: 350, cy: 150, r: 34, variant: 'center', labelLine1: 'A2Z Solutions · cl-178', labelLine1Y: 200, labelLine2: 'TARGET CLIENT', labelLine2Y: 213 },
        { id: 'rvw-acct-001', initials: 'R1', cx: 180, cy: 110, r: 26, variant: 'flagged', labelLine1: 'Reviewer · rvw-001', labelLine1Y: 154, labelLine2: '4 reviews · 8 days old', labelLine2Y: 167 },
        { id: 'rvw-acct-002', initials: 'R2', cx: 520, cy: 110, r: 26, variant: 'flagged', labelLine1: 'Reviewer · rvw-002', labelLine1Y: 154, labelLine2: '4 reviews · 12 days old', labelLine2Y: 167 },
        { id: 'rvw-acct-003', initials: 'R3', cx: 350, cy: 250, r: 26, variant: 'flagged', labelLine1: 'Reviewer · rvw-003', labelLine1Y: 294, labelLine2: '3 reviews · cross-ref Vorona', labelLine2Y: 307 },
      ],
      edges: [
        { x1: 350, y1: 150, x2: 180, y2: 110, strength: 'shared' },
        { x1: 350, y1: 150, x2: 520, y2: 110, strength: 'shared' },
        { x1: 350, y1: 150, x2: 350, y2: 250, strength: 'shared' },
        { x1: 180, y1: 110, x2: 520, y2: 110, strength: 'weak' },
      ],
      edgeLabels: [
        { x: 250, y: 130, text: 'writing + IP' },
        { x: 450, y: 130, text: 'writing + IP' },
        { x: 380, y: 205, text: 'writing + cross-ref' },
      ],
    },
    table: {
      rows: [
        { nameStrong: 'rvw-acct-001', meta: '· 8 days old · 4 reviews · all 5-star · IP 217.182.143.x', signalsFired: 5, signalsTotal: 6, status: 'Linked' },
        { nameStrong: 'rvw-acct-002', meta: '· 12 days old · 4 reviews · all 5-star · IP 217.182.143.x', signalsFired: 5, signalsTotal: 6, status: 'Linked' },
        { nameStrong: 'rvw-acct-003', meta: '· 21 days old · 3 reviews · all 5-star · cross-ref FA-2026-0042', signalsFired: 6, signalsTotal: 6, status: 'Linked + ring' },
      ],
    },
  },
  anomaliesData: {
    anomalies: [
      { iconKey: 'star', variant: 'danger', name: 'Review posting cadence', detail: 'All 11 reviews posted within 18-26h of engagement close · normal distribution is 2.4d-7d', sigmaValue: '+7.2σ' },
      { iconKey: 'activity', variant: 'danger', name: 'Writing similarity score', detail: '87% n-gram similarity across 4 reviewers · normal cross-account similarity is below 35%', sigmaValue: '+5.8σ' },
      { iconKey: 'clock', variant: 'default', name: 'Account age skew', detail: 'All 4 reviewer accounts <30 days old · normal reviewer account age is 8+ months', sigmaValue: '+3.4σ' },
    ],
  },
  documentsData: {
    totalDocs: 4, flaggedHeader: '4 documents · 2 flagged for similarity evidence',
    docs: [
      { id: 'doc-301', iconKey: 'star', variant: 'flagged', name: 'cl-178-review-cluster-evidence.zip', meta: '2.8 MB · 11 reviews + similarity matrix + reviewer account snapshots · ⚠ flagged', actionKey: 'open-doc-301' },
      { id: 'doc-302', iconKey: 'file', variant: 'flagged', name: 'ngram-similarity-matrix.csv', meta: '34 KB · 4 reviewers × 11 reviews · 87% similarity score · ⚠ flagged', actionKey: 'open-doc-302' },
      { id: 'doc-303', iconKey: 'globe', variant: 'default', name: 'ip-block-correlation.json', meta: '128 KB · 14-day IP log · 3 of 4 accounts on same /24', actionKey: 'open-doc-303' },
      { id: 'doc-304', iconKey: 'file', variant: 'default', name: 'reviewer-account-timeline.csv', meta: '18 KB · 4 account creations + 11 review posts · timeline visualization', actionKey: 'open-doc-304' },
    ],
    ctaLabel: 'View full cross-reference report →', ctaActionKey: 'view-cross-ref',
    exportActionLabel: 'Export evidence pack', exportActionKey: 'export-evidence',
  },
  timelineData: {
    totalEvents: 38,
    events: [
      { time: 'May 4 · 16:30 UTC', actor: 'Daniel Kovács', title: 'completed cross-reference analysis', detail: 'Confirmed: 1 of 4 reviewer accounts (cand-3214) also appears in Vorona Capital ring evidence (FA-2026-0042). Same writing fingerprint, same IP block. This is the upstream operator.', variant: 'warn' },
      { time: 'May 2 · 09:48 UTC', actor: 'Daniel Kovács', title: 'mapped reviewer accounts', detail: 'Identified all 4 reviewer accounts behind the cluster. Account creation dates span 14 days. All targeting cl-178 exclusively.', variant: 'default' },
      { time: 'May 1 · 14:22 UTC', actor: 'Daniel Kovács', title: 'began initial triage', detail: 'Confirmed writing-fingerprint pattern matches sock-puppet signature. Same operator behind all 11 reviews highly likely.', variant: 'default' },
      { time: 'Apr 30 · 11:42 UTC', actor: 'System', actorIsSystem: true, title: 'raised HIGH alert', detail: 'Writing-fingerprint analysis triggered alert. 87% n-gram similarity across 4 reviewer accounts targeting cl-178. Alert FA-2026-0038 created.', variant: 'danger' },
      { time: 'Apr 28 · earlier', title: '11th review posted', detail: '4th reviewer account posted 3rd review on cl-178 engagement. Threshold for cluster detection reached.', variant: 'default' },
      { time: 'Apr 14 · earlier', title: 'First suspicious review detected', detail: 'Background sweep flagged first 5-star review from <7-day-old account targeting cl-178. Below escalation threshold at the time.', variant: 'default' },
    ],
  },
  notesData: {
    totalNotes: 2,
    notes: [
      { author: 'Daniel Kovács', initials: 'DK', gradient: 'linear-gradient(135deg, #8FA8C9, #4F6E8B)', role: 'Specialist', timestamp: 'May 4 · 16:42 UTC',
        body: 'Cross-reference to Vorona ring is the smoking gun here. Reviewer account cand-3214 appears in both FA-2026-0038 (this case) and FA-2026-0042 (Vorona). Same writing fingerprint, same IP, same posting cadence. We\'re looking at the same operator running both schemes. Recommend handling both cases together.' },
      { author: 'Aïsha Okafor (you)', initials: 'AO', gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', role: 'Operations', timestamp: 'May 2 · 10:15 UTC',
        body: 'Pattern is clear but lower-confidence than Vorona case. Recommend we flag the 11 reviews + suspend the 4 reviewer accounts, then coordinate with the Vorona action when that case closes. Don\'t want to tip off the operator before both cases are ready.' },
    ],
    composer: {
      authorAvatarGradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', authorInitials: 'AO',
      authorLabel: 'Add note as Aïsha', roleLabel: 'You',
      placeholder: 'Add an investigation note · admins only · audit logged · supports markdown',
      footerLeftText: 'Internal · visible to all admins · audit logged on save',
      saveButtonLabel: 'Save note',
    },
  },
};

/* FA-2026-0037 — Fátima Mendoza (High, Identity Mismatch, Investigating) */
const CANONICAL_FA_2026_0037: FraudAlertProfile = {
  id: 'fa-2026-0037',
  atlasId: 'FA-2026-0037',
  severity: 'high',
  status: 'investigating',
  statusLabel: 'Investigating',
  detected: 'Apr 29 · 14:30 UTC',
  detectedAgo: '7d ago',
  title: 'Identity discrepancy · Fátima Mendoza (cand-892) — name mismatch',
  subtitle: 'Government-issued ID submitted shows name "María Carmen Fátima Mendoza Ruiz" while Atlas profile displays "Fátima Mendoza". Profile photo also shows partial face match (74%) to ID photo — borderline below 85% threshold. Either legitimate name shortening + photo aging or identity proxy.',
  heroStats: [
    { label: 'Confidence', value: '76%', sub: '4 of 5 signals fired' },
    { label: 'Name match', value: '12%', sub: '2 of 6 name components match' },
    { label: 'Face match', value: '74%', sub: 'borderline · threshold 85%' },
    { label: 'Investigation age', value: '7d', sub: 'SLA: 14 days for high' },
  ],
  actions: [
    { key: 'request-clarification', label: 'Request clarification', variant: 'primary' },
    { key: 'approve', label: 'Approve as legitimate', variant: 'secondary' },
    { key: 'reject', label: 'Reject application', variant: 'danger' },
  ],
  moreActions: ['Add note', 'Reassign investigator', 'Request third-party verification', 'Dismiss alert'],
  investigationSteps: [
    { label: 'Alert generated', meta: 'Apr 29 · 14:30 · auto-detected by name mismatch', done: true, current: false },
    { label: 'Initial triage', meta: 'Apr 30 · 09:18 · Sarah — borderline case', done: true, current: false },
    { label: 'Documentation review', meta: 'May 2 · 11:08 · 4 docs collected', done: true, current: false },
    { label: 'Candidate outreach', meta: 'in progress · awaiting reply to clarification request', done: false, current: true },
    { label: 'Decision review', meta: 'pending', done: false, current: false },
    { label: 'Action executed', meta: 'pending', done: false, current: false },
    { label: 'Case closed', meta: 'pending', done: false, current: false },
  ],
  investigationProgress: { done: 3, total: 7 },
  quickStats: [
    { label: 'Lead investigator', value: 'Sarah Reyes', href: '#' },
    { label: 'Candidate', value: 'cand-892', href: '#' },
    { label: 'Name components match', value: '2 of 6' },
    { label: 'Face match score', value: '74%' },
    { label: 'Profile photo changes', value: '3 in 30d' },
    { label: 'SLA remaining', value: '7d' },
    { label: 'Audit log', value: '24 events', href: '#' },
  ],
  sections: [
    { id: 'signals', title: 'System signals', meta: '5 signals evaluated · 4 fired · last evaluated 1h ago' },
    { id: 'related-accounts', title: 'Related accounts', meta: 'Single-account alert · no linked accounts' },
    { id: 'anomalies', title: 'Behavioral anomalies', meta: '3 anomalies · deviation range +1.9σ to +4.2σ' },
    { id: 'documents', title: 'Documents involved', meta: '4 documents · 2 flagged for verification' },
    { id: 'timeline', title: 'Timeline of events', meta: '24 events · 6 shown' },
    { id: 'notes', title: 'Admin notes', meta: '1 note + composer' },
  ],
  signalsData: {
    totalSignals: 5, firedCount: 4, lastEvaluated: 'last evaluated 1h ago',
    signals: [
      { index: 1, name: 'ID name vs profile name mismatch', detail: 'Legal name has 6 name components (María Carmen Fátima Mendoza Ruiz) · Atlas profile uses only 2 (Fátima Mendoza) · 12% string match', confidencePercent: 95, state: 'fired' },
      { index: 2, name: 'Face geometry partial match', detail: '74% match between ID document photo and current profile photo · platform threshold 85% · borderline result', confidencePercent: 78, state: 'fired' },
      { index: 3, name: 'Profile photo change velocity', detail: '3 profile photo changes in 30 days · baseline is 0.4 changes per year', confidencePercent: 65, state: 'fired' },
      { index: 4, name: 'Work-history inconsistency', detail: 'CV mentions roles in 3 countries (Mexico, Spain, USA) · government ID issued in 4th country (Argentina)', confidencePercent: 58, state: 'fired' },
      { index: 5, name: 'Tax-document name format', detail: 'W-9 tax form matches profile name (2 components) · does NOT match government ID format (6 components) · supports legitimate shortening', confidencePercent: 0, state: 'not-fired' },
    ],
  },
  relatedData: {
    sectionMeta: 'Related identity submissions and profile changes',
    table: {
      rows: [
        { nameStrong: 'ID document submission', meta: ' · Apr 12 · Argentine DNI · liveness passed · originally accepted', signalsFired: 0, signalsTotal: 3, status: 'Originally accepted' },
        { nameStrong: 'Profile photo update', meta: ' · May 3 · new photo · partial face mismatch · 74% match score', signalsFired: 3, signalsTotal: 3, status: 'Flagged' },
        { nameStrong: 'Work portfolio sample', meta: ' · style fingerprint deviation · 76% similarity from original samples', signalsFired: 2, signalsTotal: 3, status: 'Under review' },
      ],
    },
  },
  anomaliesData: {
    anomalies: [
      { iconKey: 'activity', variant: 'danger', name: 'Profile-photo change velocity', detail: '3 profile photo changes in 30 days · baseline is 0.4 changes per year', sigmaValue: '+4.2σ' },
      { iconKey: 'star', variant: 'default', name: 'Name-field complexity', detail: 'Legal name has 6 name components · platform baseline 2-3 components for stable candidates', sigmaValue: '+2.8σ' },
      { iconKey: 'clock', variant: 'default', name: 'CV cross-country pattern', detail: 'Work history spans 3 countries while government ID issued in 4th · uncommon but legitimate for senior consultants', sigmaValue: '+1.9σ' },
    ],
  },
  documentsData: {
    totalDocs: 4, flaggedHeader: '4 documents · 2 flagged for verification',
    docs: [
      { id: 'doc-401', iconKey: 'file', variant: 'flagged', name: 'cand-892-gov-id.pdf', meta: '1.6 MB · Argentine DNI · name "María Carmen Fátima Mendoza Ruiz" · ⚠ name mismatch', actionKey: 'open-doc-401' },
      { id: 'doc-402', iconKey: 'image', variant: 'flagged', name: 'cand-892-profile-photo-history.zip', meta: '6.2 MB · 3 photos in 30d · ⚠ change velocity flagged', actionKey: 'open-doc-402' },
      { id: 'doc-403', iconKey: 'image', variant: 'default', name: 'cand-892-profile-photo-current.jpg', meta: '1.4 MB · current Atlas profile photo · 74% face match to ID', actionKey: 'open-doc-403' },
      { id: 'doc-404', iconKey: 'dollar', variant: 'default', name: 'cand-892-tax-doc-w9.pdf', meta: '218 KB · US W-9 · name "Fátima Mendoza" · matches Atlas profile', actionKey: 'open-doc-404' },
    ],
    ctaLabel: 'View documentation review →', ctaActionKey: 'view-docs-review',
    exportActionLabel: 'Export evidence pack', exportActionKey: 'export-evidence',
  },
  timelineData: {
    totalEvents: 24,
    events: [
      { time: 'May 3 · 14:18 UTC', actor: 'Sarah Reyes', title: 'sent clarification request', detail: 'Sent candidate a clarification request via email: "Can you confirm the relationship between your legal name on the ID and your professional name on Atlas?" Awaiting reply.', variant: 'default' },
      { time: 'May 2 · 11:08 UTC', actor: 'Sarah Reyes', title: 'completed documentation review', detail: 'All 4 docs collected and analyzed. Tax W-9 matches Atlas profile but government ID has full legal name. Likely legitimate but needs candidate confirmation.', variant: 'default' },
      { time: 'May 1 · 16:45 UTC', actor: 'System', actorIsSystem: true, title: 'face match analysis complete', detail: 'Face match 74% — borderline. Below 85% threshold but above 60% rejection floor. Manual review required.', variant: 'warn' },
      { time: 'Apr 30 · 09:18 UTC', actor: 'Sarah Reyes', title: 'began initial triage', detail: 'Reviewed name mismatch. This is likely legitimate (legal name shortening is common) but face match at 74% adds caution. Will collect docs.', variant: 'default' },
      { time: 'Apr 29 · 14:30 UTC', actor: 'System', actorIsSystem: true, title: 'raised HIGH alert', detail: 'Name mismatch detected during automated cross-check of government ID vs Atlas profile. 12% string match, 4 components missing. Alert FA-2026-0037 created.', variant: 'danger' },
      { time: 'Mar 18 · earlier', title: 'Candidate cand-892 onboarded', detail: 'cand-892 onboarded · ID submitted · standard verification queue entry.', variant: 'default' },
    ],
  },
  notesData: {
    totalNotes: 1,
    notes: [
      { author: 'Sarah Reyes', initials: 'SR', gradient: 'linear-gradient(135deg, #A0C9B8, #4F8B6E)', role: 'Specialist', timestamp: 'May 2 · 11:14 UTC',
        body: 'This is most likely legitimate name shortening — María Carmen Fátima Mendoza Ruiz is a common Hispanic legal name format, and "Fátima Mendoza" is a reasonable professional shortening. The face match at 74% is borderline but explainable by 2-year photo aging. Waiting for candidate reply to confirm. If she explains, I\'ll approve. If no reply in 7 days, escalate.' },
    ],
    composer: {
      authorAvatarGradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', authorInitials: 'AO',
      authorLabel: 'Add note as Aïsha', roleLabel: 'You',
      placeholder: 'Add an investigation note · admins only · audit logged · supports markdown',
      footerLeftText: 'Internal · visible to all admins · audit logged on save',
      saveButtonLabel: 'Save note',
    },
  },
};

/* FA-2026-0036 — Jana Reinholt (High, Abuse Pattern, Open) */
const CANONICAL_FA_2026_0036: FraudAlertProfile = {
  id: 'fa-2026-0036',
  atlasId: 'FA-2026-0036',
  severity: 'high',
  status: 'open',
  statusLabel: 'Open',
  detected: 'Apr 28 · 22:11 UTC',
  detectedAgo: '7d 12h ago',
  title: 'Specialist abuse pattern · Jana Reinholt (spec-007) — admin-action surge',
  subtitle: 'Specialist account performed 47 admin actions in 24h period (baseline 3-5/day), including 23 candidate suspensions and 14 review deletions without linked case files. Pattern could indicate compromised account, internal abuse, or panic-response to external pressure.',
  heroStats: [
    { label: 'Confidence', value: '71%', sub: '4 of 5 signals fired' },
    { label: 'Actions in 24h', value: '47', sub: 'baseline 4/day · 10x spike' },
    { label: 'Suspensions w/o case', value: '23 of 23', sub: 'critical procedural violation' },
    { label: 'Investigation age', value: '7d 12h', sub: 'SLA: 14 days for high' },
  ],
  actions: [
    { key: 'freeze-specialist', label: 'Freeze specialist account', variant: 'danger' },
    { key: 'audit-actions', label: 'Audit all 218 actions', variant: 'primary' },
    { key: 'request-explanation', label: 'Request explanation', variant: 'secondary' },
  ],
  moreActions: ['Reassign investigator', 'Notify HR', 'Escalate to Super Admin', 'Review device fingerprint', 'Dismiss alert'],
  investigationSteps: [
    { label: 'Alert generated', meta: 'Apr 28 · 22:11 · auto-detected by action velocity', done: true, current: false },
    { label: 'Initial triage', meta: 'Apr 30 · 11:48 · Aïsha — confirmed pattern', done: true, current: false },
    { label: 'Activity log audit', meta: 'in progress · auditing all 218 actions in 7d', done: false, current: true },
    { label: 'Specialist outreach', meta: 'pending · explanation request', done: false, current: false },
    { label: 'Decision review', meta: 'pending', done: false, current: false },
    { label: 'Action executed', meta: 'pending', done: false, current: false },
    { label: 'Case closed', meta: 'pending', done: false, current: false },
  ],
  investigationProgress: { done: 2, total: 7 },
  quickStats: [
    { label: 'Lead investigator', value: 'Aïsha Okafor (you)' },
    { label: 'Specialist', value: 'spec-007', href: '#' },
    { label: 'Actions in 24h', value: '47' },
    { label: 'Actions in 7d', value: '218' },
    { label: 'Suspensions issued', value: '23 in 24h' },
    { label: 'Cases linked', value: '4 of 23' },
    { label: 'SLA remaining', value: '6d 12h' },
    { label: 'Audit log', value: '218 events', href: '#' },
  ],
  sections: [
    { id: 'signals', title: 'System signals', meta: '5 signals evaluated · 4 fired · last evaluated 18 min ago' },
    { id: 'related-accounts', title: 'Related accounts', meta: 'Single-account alert · 23 candidates affected · no co-conspirators detected' },
    { id: 'anomalies', title: 'Behavioral anomalies', meta: '4 anomalies · deviation range +2.4σ to +9.4σ' },
    { id: 'documents', title: 'Documents involved', meta: '3 documents · 2 flagged for procedural violation' },
    { id: 'timeline', title: 'Timeline of events', meta: '218 events · 5 shown' },
    { id: 'notes', title: 'Admin notes', meta: '1 note + composer' },
  ],
  signalsData: {
    totalSignals: 5, firedCount: 4, lastEvaluated: 'last evaluated 18 min ago',
    signals: [
      { index: 1, name: 'Admin-action velocity', detail: '47 admin actions in 24h window · platform baseline for specialists is 4-5 actions per day · 10x spike', confidencePercent: 95, state: 'fired' },
      { index: 2, name: 'Suspension pattern without case files', detail: '23 candidate suspensions executed but only 4 have linked case files · procedural violation requirement is 1 case file per suspension', confidencePercent: 88, state: 'fired' },
      { index: 3, name: 'Login geolocation drift', detail: 'Logins from 3 countries in 48h (Germany, Czech Republic, Austria) · normal pattern is single country', confidencePercent: 76, state: 'fired' },
      { index: 4, name: 'After-hours activity surge', detail: '78% of actions occurred between 22:00-04:00 UTC · normal specialist activity is 09:00-18:00 UTC', confidencePercent: 68, state: 'fired' },
      { index: 5, name: 'Device fingerprint change', detail: 'Same device fingerprint across all sessions · no indication of compromised credentials · suggests authentic specialist action', confidencePercent: 0, state: 'not-fired' },
    ],
  },
  relatedData: {
    sectionMeta: 'Related client interactions and abuse incidents',
    table: {
      rows: [
        { nameStrong: 'Client contact pattern', meta: ' · 28 messages/day avg · platform median 4 · spans 47 clients · 7-day surge', signalsFired: 3, signalsTotal: 3, status: 'Confirmed pattern' },
        { nameStrong: 'Off-platform contact attempts', meta: ' · 12 attempts in 30d · email + phone + LinkedIn · policy violation', signalsFired: 3, signalsTotal: 3, status: 'Policy violation' },
        { nameStrong: 'Suspension decisions without case file', meta: ' · 19 of 23 suspensions in 24h · procedural violation', signalsFired: 2, signalsTotal: 3, status: 'Under review' },
      ],
    },
  },
  anomaliesData: {
    anomalies: [
      { iconKey: 'activity', variant: 'danger', name: 'Admin-action velocity', detail: '47 actions in 24h vs baseline 4/day · 10x spike · sustained pattern across 7 days', sigmaValue: '+9.4σ' },
      { iconKey: 'clock', variant: 'danger', name: 'After-hours activity rate', detail: '78% of actions in 22:00-04:00 UTC window vs platform baseline 8%', sigmaValue: '+5.6σ' },
      { iconKey: 'star', variant: 'default', name: 'Suspension-without-case rate', detail: '19 of 23 suspensions lack linked case files · platform baseline is below 1% missing case files', sigmaValue: '+3.2σ' },
      { iconKey: 'bolt', variant: 'default', name: 'Login-geo variance', detail: '3 countries in 48h · all neighbouring · could be legitimate travel but unusual for active investigation', sigmaValue: '+2.4σ' },
    ],
  },
  documentsData: {
    totalDocs: 3, flaggedHeader: '3 documents · 2 flagged for procedural violation',
    docs: [
      { id: 'doc-501', iconKey: 'file', variant: 'flagged', name: 'spec-007-admin-action-log-7day.csv', meta: '128 KB · 218 actions vs baseline 28 · ⚠ velocity flagged', actionKey: 'open-doc-501' },
      { id: 'doc-502', iconKey: 'file', variant: 'flagged', name: 'spec-007-suspension-decisions.csv', meta: '42 KB · 23 suspensions in 24h · only 4 with linked cases · ⚠ procedural', actionKey: 'open-doc-502' },
      { id: 'doc-503', iconKey: 'globe', variant: 'default', name: 'spec-007-login-history.json', meta: '256 KB · 7-day login log · 3 countries · same device fingerprint', actionKey: 'open-doc-503' },
    ],
    ctaLabel: 'View full activity audit →', ctaActionKey: 'view-audit',
    exportActionLabel: 'Export evidence pack', exportActionKey: 'export-evidence',
  },
  timelineData: {
    totalEvents: 218,
    events: [
      { time: 'Today · 14:48 UTC', actor: 'Aïsha Okafor', title: 'started full activity audit', detail: 'Auditing all 218 admin actions in past 7 days. Cross-referencing each suspension against case files. Will have full audit report within 48h.', variant: 'default' },
      { time: 'Apr 30 · 11:48 UTC', actor: 'Aïsha Okafor', title: 'completed initial triage', detail: 'Confirmed velocity pattern is real. 23 suspensions w/o case files is the strongest signal — that\'s a critical procedural violation regardless of intent.', variant: 'default' },
      { time: 'Apr 29 · 09:18 UTC', actor: 'System', actorIsSystem: true, title: 'after-hours pattern detected', detail: 'Activity continued through second night (22:00-04:00 UTC) at sustained pace. Pattern is not a one-off.', variant: 'warn' },
      { time: 'Apr 28 · 22:11 UTC', actor: 'System', actorIsSystem: true, title: 'raised HIGH alert', detail: 'Specialist spec-007 executed 47 admin actions in past 24h vs baseline 4/day. Alert FA-2026-0036 auto-generated.', variant: 'danger' },
      { time: 'Mar 15 · earlier', title: 'Specialist Jana Reinholt onboarded', detail: 'spec-007 onboarded · standard specialist training complete · trust tier "Specialist" assigned.', variant: 'default' },
    ],
  },
  notesData: {
    totalNotes: 1,
    notes: [
      { author: 'Aïsha Okafor (you)', initials: 'AO', gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', role: 'Operations', timestamp: 'Apr 30 · 12:08 UTC',
        body: 'Two competing hypotheses: (1) Specialist gone rogue / acting under external pressure, or (2) Specialist responding to a real surge of bad-actor candidates I don\'t see yet. Need the audit to tell us which. If it\'s (2), we may need to thank her and apologize. If it\'s (1), this is termination + investigation territory. Either way, the procedural violation (suspensions w/o case files) stands — that\'s not negotiable.' },
    ],
    composer: {
      authorAvatarGradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', authorInitials: 'AO',
      authorLabel: 'Add note as Aïsha', roleLabel: 'You',
      placeholder: 'Add an investigation note · admins only · audit logged · supports markdown',
      footerLeftText: 'Internal · visible to all admins · audit logged on save',
      saveButtonLabel: 'Save note',
    },
  },
};

/* FA-2026-0034 — Rohan Kapoor (Medium, Suspicious Activity, Open) */
const CANONICAL_FA_2026_0034: FraudAlertProfile = {
  id: 'fa-2026-0034',
  atlasId: 'FA-2026-0034',
  severity: 'medium',
  status: 'open',
  statusLabel: 'Open',
  detected: 'Apr 26 · 06:52 UTC',
  detectedAgo: '9d 16h ago',
  title: 'Suspicious login activity · Rohan Kapoor (cand-1289)',
  subtitle: 'Candidate account logged in from 4 distinct countries (USA, UK, Singapore, Brazil) within 24-hour window. Pattern could indicate legitimate VPN testing, account sharing among collaborators, or active credential theft attempt. No commercial VPN detected on any IP.',
  heroStats: [
    { label: 'Confidence', value: '58%', sub: '3 of 4 signals fired' },
    { label: 'Login countries', value: '4', sub: 'in 24h · baseline 1' },
    { label: 'Total logins 24h', value: '12', sub: 'baseline 3/day' },
    { label: 'Investigation age', value: '9d 16h', sub: 'SLA: 30 days for medium' },
  ],
  actions: [
    { key: 'force-mfa', label: 'Force MFA reset', variant: 'primary' },
    { key: 'monitor', label: 'Add to watchlist', variant: 'secondary' },
    { key: 'request-verification', label: 'Request verification', variant: 'secondary' },
  ],
  moreActions: ['Reassign investigator', 'Review device fingerprints', 'Dismiss as false positive'],
  investigationSteps: [
    { label: 'Alert generated', meta: 'Apr 26 · 06:52 · auto-detected by login geo-spread', done: true, current: false },
    { label: 'Initial triage', meta: 'in progress · Sarah — reviewing login patterns', done: false, current: true },
    { label: 'Verification request', meta: 'pending', done: false, current: false },
    { label: 'Decision review', meta: 'pending', done: false, current: false },
    { label: 'Action executed', meta: 'pending', done: false, current: false },
    { label: 'Case closed', meta: 'pending', done: false, current: false },
  ],
  investigationProgress: { done: 1, total: 6 },
  quickStats: [
    { label: 'Lead investigator', value: 'Sarah Reyes', href: '#' },
    { label: 'Candidate', value: 'cand-1289', href: '#' },
    { label: 'Login countries', value: '4 in 24h' },
    { label: 'Device fingerprints', value: '3 distinct' },
    { label: 'VPN detected', value: 'No' },
    { label: 'SLA remaining', value: '20d 8h' },
    { label: 'Audit log', value: '18 events', href: '#' },
  ],
  sections: [
    { id: 'signals', title: 'System signals', meta: '4 signals evaluated · 3 fired · last evaluated 2h ago' },
    { id: 'related-accounts', title: 'Related accounts', meta: 'Single-account alert · no linked accounts' },
    { id: 'anomalies', title: 'Behavioral anomalies', meta: '3 anomalies · deviation range +1.8σ to +4.8σ' },
    { id: 'documents', title: 'Documents involved', meta: '3 documents · login + device records' },
    { id: 'timeline', title: 'Timeline of events', meta: '18 events · 4 shown' },
    { id: 'notes', title: 'Admin notes', meta: '1 note + composer' },
  ],
  signalsData: {
    totalSignals: 4, firedCount: 3, lastEvaluated: 'last evaluated 2h ago',
    signals: [
      { index: 1, name: 'Login geo-spread', detail: '4 distinct countries (USA, UK, Singapore, Brazil) in 24h window · platform baseline is 1 country per 24h', confidencePercent: 78, state: 'fired' },
      { index: 2, name: 'Login velocity', detail: '12 successful logins in 24h period · platform baseline is 3 logins per day for active candidates', confidencePercent: 72, state: 'fired' },
      { index: 3, name: 'Device fingerprint changes', detail: '3 distinct browser fingerprints in 24h · could indicate account sharing or device cycling', confidencePercent: 64, state: 'fired' },
      { index: 4, name: 'VPN/proxy detection', detail: 'No commercial VPN or known proxy service detected on any of the 12 source IPs · unusual for fraud pattern', confidencePercent: 0, state: 'not-fired' },
    ],
  },
  relatedData: {
    sectionMeta: 'Related account activity patterns and timing shifts',
    table: {
      rows: [
        { nameStrong: 'Login pattern', meta: ' · shifted from 14:00 UTC to 02:00 UTC · last 14 days · sustained drift', signalsFired: 2, signalsTotal: 3, status: 'Monitoring' },
        { nameStrong: 'Profile updates', meta: ' · 8 changes in 7 days · location + skills + rates · all elevated', signalsFired: 2, signalsTotal: 3, status: 'Monitoring' },
        { nameStrong: 'Engagement bid pattern', meta: ' · bidding below market on 12 of 18 recent jobs · unusual aggressiveness', signalsFired: 1, signalsTotal: 3, status: 'Monitoring' },
      ],
    },
  },
  anomaliesData: {
    anomalies: [
      { iconKey: 'clock', variant: 'default', name: 'Login geographic spread', detail: '4 countries in 24h vs baseline 1 country · large geographic deviation', sigmaValue: '+4.8σ' },
      { iconKey: 'activity', variant: 'default', name: 'Login frequency', detail: '12 logins in 24h vs baseline 3/day · 4x spike', sigmaValue: '+2.4σ' },
      { iconKey: 'bolt', variant: 'default', name: 'Device variety', detail: '3 distinct browser fingerprints in 24h vs baseline 1 device', sigmaValue: '+1.8σ' },
    ],
  },
  documentsData: {
    totalDocs: 3, flaggedHeader: '3 documents · login + device records',
    docs: [
      { id: 'doc-601', iconKey: 'globe', variant: 'default', name: 'cand-1289-login-history-24h.json', meta: '64 KB · 12 logins · 4 countries · 3 devices', actionKey: 'open-doc-601' },
      { id: 'doc-602', iconKey: 'file', variant: 'default', name: 'cand-1289-device-fingerprints.csv', meta: '8 KB · 3 distinct fingerprints · cross-account correlation', actionKey: 'open-doc-602' },
      { id: 'doc-603', iconKey: 'globe', variant: 'default', name: 'cand-1289-ip-reputation-check.json', meta: '32 KB · 12 IPs · no VPN/proxy detected · clean reputation', actionKey: 'open-doc-603' },
    ],
    ctaLabel: 'View full login history →', ctaActionKey: 'view-logins',
    exportActionLabel: 'Export records', exportActionKey: 'export-records',
  },
  timelineData: {
    totalEvents: 18,
    events: [
      { time: 'Today · 11:08 UTC', actor: 'Sarah Reyes', title: 'began initial triage', detail: 'Reviewing login patterns. No VPN detected is unusual — most fraud patterns show commercial VPN. Could be legitimate frequent traveller or account sharing.', variant: 'default' },
      { time: 'Apr 26 · 06:52 UTC', actor: 'System', actorIsSystem: true, title: 'raised MEDIUM alert', detail: 'Login geo-spread threshold exceeded (4 countries in 24h). 12 logins in same window. Alert FA-2026-0034 auto-generated.', variant: 'warn' },
      { time: 'Apr 25 · 23:48 UTC', actor: 'System', actorIsSystem: true, title: '4th country login detected', detail: 'Login from Brazil IP. 4th distinct country in 24h window. Threshold breached.', variant: 'default' },
      { time: 'Feb 04 · earlier', title: 'Candidate cand-1289 onboarded', detail: 'cand-1289 onboarded · standard candidate verification · trust tier "Standard" assigned.', variant: 'default' },
    ],
  },
  notesData: {
    totalNotes: 1,
    notes: [
      { author: 'Sarah Reyes', initials: 'SR', gradient: 'linear-gradient(135deg, #A0C9B8, #4F8B6E)', role: 'Specialist', timestamp: 'Today · 11:24 UTC',
        body: 'No VPN flag is the interesting part here. Either this candidate genuinely is travelling rapidly (consulting, conference circuit?) or someone\'s account-sharing across multiple devices/countries. Sending verification request asking for clarification. Not blocking access yet — confidence too low.' },
    ],
    composer: {
      authorAvatarGradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', authorInitials: 'AO',
      authorLabel: 'Add note as Aïsha', roleLabel: 'You',
      placeholder: 'Add an investigation note · admins only · audit logged · supports markdown',
      footerLeftText: 'Internal · visible to all admins · audit logged on save',
      saveButtonLabel: 'Save note',
    },
  },
};

/* FA-2026-0029 — Carla Liang (Medium, Geo Anomaly, RESOLVED) */
const CANONICAL_FA_2026_0029: FraudAlertProfile = {
  id: 'fa-2026-0029',
  atlasId: 'FA-2026-0029',
  severity: 'medium',
  status: 'resolved',
  statusLabel: 'Resolved',
  detected: 'Apr 22 · 16:08 UTC',
  detectedAgo: '13d ago',
  title: 'Geo anomaly · Carla Liang (cand-678) — resolved as legitimate travel',
  subtitle: 'Candidate account flagged for IP-based geo anomaly when login pattern showed rapid country switching (USA → Singapore → Australia in 5 days). Investigation confirmed legitimate business travel via boarding pass records and conference registration. Case closed as RESOLVED (false positive).',
  heroStats: [
    { label: 'Confidence', value: '42%', sub: '3 of 4 signals fired' },
    { label: 'Countries flagged', value: '3', sub: 'in 7d · all verified' },
    { label: 'Investigation duration', value: '11d', sub: 'from alert to resolution' },
    { label: 'Resolution', value: 'False positive', sub: 'legitimate business travel' },
  ],
  actions: [
    { key: 'view-resolution', label: 'View resolution', variant: 'secondary' },
    { key: 'restore-access', label: 'Access restored', variant: 'secondary' },
  ],
  moreActions: ['Export resolution report', 'Add to travel-preview list', 'Reopen case'],
  investigationSteps: [
    { label: 'Alert generated', meta: 'Apr 22 · 16:08 · auto-detected by geo spread', done: true, current: false },
    { label: 'Initial triage', meta: 'Apr 22 · 20:18 · Aïsha — temporary restriction', done: true, current: false },
    { label: 'Travel documents requested', meta: 'Apr 23 · 11:30 · candidate response sought', done: true, current: false },
    { label: 'Documents received', meta: 'Apr 25 · 11:30 · boarding passes + conf reg', done: true, current: false },
    { label: 'Verification complete', meta: 'Apr 28 · 14:08 · Sarah confirmed authentic', done: true, current: false },
    { label: 'Resolution', meta: 'May 1 · 09:12 · closed as false positive', done: true, current: false },
    { label: 'Access restored', meta: 'May 1 · 09:18 · full access + travel preview added', done: true, current: false },
  ],
  investigationProgress: { done: 7, total: 7 },
  quickStats: [
    { label: 'Lead investigator', value: 'Aïsha Okafor (you)' },
    { label: 'Co-investigator', value: 'Sarah Reyes', href: '#' },
    { label: 'Candidate', value: 'cand-678', href: '#' },
    { label: 'Resolution', value: 'False positive' },
    { label: 'Travel verified', value: 'Boarding + visa' },
    { label: 'Conference', value: 'SaaSConf 2026' },
    { label: 'Account restored', value: 'May 1' },
    { label: 'Audit log', value: '32 events', href: '#' },
  ],
  sections: [
    { id: 'signals', title: 'System signals', meta: '4 signals evaluated · 3 fired · reconciled at resolution' },
    { id: 'related-accounts', title: 'Related accounts', meta: 'Single-account alert · no linked accounts' },
    { id: 'anomalies', title: 'Behavioral anomalies', meta: '2 anomalies · all explained by legitimate travel' },
    { id: 'documents', title: 'Documents involved', meta: '2 documents · travel records' },
    { id: 'timeline', title: 'Timeline of events', meta: '32 events · 7 shown · includes resolution' },
    { id: 'notes', title: 'Admin notes', meta: '2 notes · includes resolution explanation' },
  ],
  signalsData: {
    totalSignals: 4, firedCount: 3, lastEvaluated: 'last evaluated May 1 · 09:12 (at resolution)',
    signals: [
      { index: 1, name: 'Login geo-spread', detail: '3 distinct countries (USA, Singapore, Australia) in 7-day window · explained by legitimate business travel + conference', confidencePercent: 75, state: 'fired' },
      { index: 2, name: 'Travel velocity', detail: 'US → Singapore → Australia route in 5 days · all logins correlate exactly to flight arrival times', confidencePercent: 68, state: 'fired' },
      { index: 3, name: 'Device consistency', detail: 'Same device fingerprint across all logins · strong indicator of legitimate travel, not account compromise', confidencePercent: 55, state: 'fired' },
      { index: 4, name: 'Conference correlation', detail: 'Login pattern correlates with SaaSConf 2026 in Singapore (Apr 22-24) · registration verified · supports legitimate travel hypothesis', confidencePercent: 0, state: 'not-fired' },
    ],
  },
  relatedData: {
    sectionMeta: 'Related travel records and login patterns (resolved as legitimate)',
    table: {
      rows: [
        { nameStrong: 'Multi-country logins', meta: ' · USA → Singapore → Australia · Apr 22 - May 1 · matched flight arrival times', signalsFired: 0, signalsTotal: 3, status: 'Verified legitimate' },
        { nameStrong: 'IP geolocation variance', meta: ' · 4 cities · all matched declared SaaSConf 2026 + Bali itinerary', signalsFired: 0, signalsTotal: 3, status: 'Verified legitimate' },
        { nameStrong: 'Device consistency', meta: ' · same MacBook fingerprint across all sessions · supports legitimate travel', signalsFired: 0, signalsTotal: 3, status: 'Verified consistent' },
      ],
    },
  },
  anomaliesData: {
    anomalies: [
      { iconKey: 'clock', variant: 'default', name: 'Geographic switch velocity', detail: '3 countries in 7 days · explained by business travel + personal stopover · within normal range for senior consultants', sigmaValue: '+3.2σ' },
      { iconKey: 'activity', variant: 'default', name: 'Login frequency vs baseline', detail: 'Login frequency slightly elevated during travel period · within normal range for active travelers', sigmaValue: '+1.4σ' },
    ],
  },
  documentsData: {
    totalDocs: 2, flaggedHeader: '2 documents · travel records (verified authentic)',
    docs: [
      { id: 'doc-701', iconKey: 'file', variant: 'default', name: 'cand-678-travel-records.pdf', meta: '4.2 MB · boarding passes (AA-282, SQ-31, SQ-218) + visa stamps + SaaSConf registration', actionKey: 'open-doc-701' },
      { id: 'doc-702', iconKey: 'globe', variant: 'default', name: 'cand-678-login-history-30d.json', meta: '128 KB · 30-day login log · all logins correlate to verified flight arrival times', actionKey: 'open-doc-702' },
    ],
    ctaLabel: 'View resolution report →', ctaActionKey: 'view-resolution',
    exportActionLabel: 'Export resolution', exportActionKey: 'export-resolution',
  },
  timelineData: {
    totalEvents: 32,
    events: [
      { time: 'May 1 · 09:12 UTC', actor: 'Aïsha Okafor', title: 'closed case as RESOLVED', detail: 'False positive confirmed. Boarding passes + visa records show legitimate business travel + personal stopover. Restored full account access. Added travel preview to candidate profile to reduce future false positives.', variant: 'default' },
      { time: 'Apr 28 · 14:08 UTC', actor: 'Sarah Reyes', title: 'reviewed travel records', detail: 'Boarding passes match login pattern exactly. SaaSConf 2026 in Singapore Apr 22-24 (verified attendee list). Bali stop Apr 25-27 is personal travel. All authentic.', variant: 'default' },
      { time: 'Apr 25 · 11:30 UTC', title: 'Candidate provided travel documents', detail: 'Boarding passes for AA-282, SQ-31, SQ-218 + Singapore visa stamps + SaaSConf 2026 conference registration confirmation provided via support ticket.', variant: 'default' },
      { time: 'Apr 23 · 16:45 UTC', actor: 'System', actorIsSystem: true, title: 'additional country flag', detail: 'Login from Bali IP now 3rd distinct country in 7d. Threshold breached. Account temporarily restricted pending verification.', variant: 'warn' },
      { time: 'Apr 22 · 20:18 UTC', actor: 'Aïsha Okafor', title: 'opened investigation', detail: 'Account temporarily restricted pending travel verification. Sent verification request to candidate.', variant: 'default' },
      { time: 'Apr 22 · 16:08 UTC', actor: 'System', actorIsSystem: true, title: 'raised MEDIUM alert', detail: 'Login from Singapore IP detected · 2nd distinct country within 5d window. Velocity threshold approached. Alert FA-2026-0029 auto-generated.', variant: 'warn' },
      { time: 'Apr 17 · earlier', title: 'Account active baseline', detail: 'cand-678 last 30d: 8 logins from 1 country (USA). Standard baseline pattern. No prior anomalies.', variant: 'default' },
    ],
  },
  notesData: {
    totalNotes: 2,
    notes: [
      { author: 'Aïsha Okafor (you)', initials: 'AO', gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', role: 'Operations', timestamp: 'May 1 · 09:15 UTC',
        body: 'Resolved as false positive. Travel records verified — candidate attended SaaSConf 2026 in Singapore (Apr 22-24) followed by personal travel to Bali (Apr 25-27). All logins correlate exactly to flight arrival times. Restored full access + added "travel preview" toggle to her account so future business travel will pre-clear automatically. No further action needed.' },
      { author: 'Sarah Reyes', initials: 'SR', gradient: 'linear-gradient(135deg, #A0C9B8, #4F8B6E)', role: 'Specialist', timestamp: 'Apr 28 · 14:30 UTC',
        body: 'Boarding passes are authentic (verified watermarks + ticket-stub serials with Amadeus PNR lookup). Conference registration is real (cross-checked SaaSConf 2026 attendee list — she\'s on the speaker roster). Recommending close as false positive — no further action needed. We should probably tighten the threshold on this alert type because frequent travellers will keep triggering it.' },
    ],
    composer: {
      authorAvatarGradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', authorInitials: 'AO',
      authorLabel: 'Add note as Aïsha', roleLabel: 'You',
      placeholder: 'Add an investigation note · admins only · audit logged · supports markdown',
      footerLeftText: 'Internal · visible to all admins · audit logged on save',
      saveButtonLabel: 'Save note',
    },
  },
};

/* FA-2026-0024 — Tomás Yúdice (Low, Auth Anomaly, DISMISSED) */
const CANONICAL_FA_2026_0024: FraudAlertProfile = {
  id: 'fa-2026-0024',
  atlasId: 'FA-2026-0024',
  severity: 'low',
  status: 'dismissed',
  statusLabel: 'Dismissed',
  detected: 'Apr 18 · 10:05 UTC',
  detectedAgo: '17d ago',
  title: 'Failed authentication attempts · Tomás Yúdice (cand-432) — dismissed',
  subtitle: 'Candidate triggered 3 consecutive failed login attempts within 4-minute window. Initial alert escalated automatically per low-confidence threshold. Investigation immediately confirmed legitimate password-recovery flow (user used "forgot password" within 6 minutes). Closed as DISMISSED.',
  heroStats: [
    { label: 'Confidence', value: '22%', sub: '1 of 2 signals fired' },
    { label: 'Failed attempts', value: '3', sub: 'in 4-min window' },
    { label: 'Investigation duration', value: '30 min', sub: 'rapid resolution' },
    { label: 'Resolution', value: 'False positive', sub: 'legitimate password recovery' },
  ],
  actions: [
    { key: 'view-resolution', label: 'View dismissal', variant: 'secondary' },
  ],
  moreActions: ['View auth log', 'Reopen case', 'Suggest threshold adjustment'],
  investigationSteps: [
    { label: 'Alert generated', meta: 'Apr 18 · 10:05 · auto-detected by failure burst', done: true, current: false },
    { label: 'Initial triage', meta: 'Apr 18 · 10:25 · Aïsha — auth log review', done: true, current: false },
    { label: 'Pattern confirmed normal', meta: 'Apr 18 · 10:30 · password-recovery flow verified', done: true, current: false },
    { label: 'Dismissal', meta: 'Apr 18 · 10:35 · closed as false positive', done: true, current: false },
    { label: 'Threshold review suggested', meta: 'Apr 18 · 10:37 · feedback noted', done: true, current: false },
  ],
  investigationProgress: { done: 5, total: 5 },
  quickStats: [
    { label: 'Lead investigator', value: 'Aïsha Okafor (you)' },
    { label: 'Candidate', value: 'cand-432', href: '#' },
    { label: 'Failed attempts', value: '3 in 4min' },
    { label: 'Resolution', value: 'False positive' },
    { label: 'Resolution time', value: '30 min' },
    { label: 'Audit log', value: '12 events', href: '#' },
  ],
  sections: [
    { id: 'signals', title: 'System signals', meta: '2 signals evaluated · 1 fired · all reconciled' },
    { id: 'related-accounts', title: 'Related accounts', meta: 'Single-account alert · no linked accounts' },
    { id: 'anomalies', title: 'Behavioral anomalies', meta: '1 anomaly · within normal user workflow' },
    { id: 'documents', title: 'Documents involved', meta: '1 document · auth log' },
    { id: 'timeline', title: 'Timeline of events', meta: '12 events · 5 shown · includes dismissal' },
    { id: 'notes', title: 'Admin notes', meta: '1 note · explains dismissal' },
  ],
  signalsData: {
    totalSignals: 2, firedCount: 1, lastEvaluated: 'last evaluated Apr 18 · 10:30 (at dismissal)',
    signals: [
      { index: 1, name: 'Failed login velocity', detail: '3 failed login attempts in 4-minute window · below platform alert threshold of 5 attempts · auto-escalated under low-confidence rule', confidencePercent: 48, state: 'fired' },
      { index: 2, name: 'Account age vs failure pattern', detail: 'Account is 1y+ old with clean auth history · normal user pattern · failure burst followed immediately by successful password-recovery flow', confidencePercent: 0, state: 'not-fired' },
    ],
  },
  relatedData: {
    sectionMeta: 'Related authentication events and devices (dismissed as legitimate)',
    table: {
      rows: [
        { nameStrong: 'Failed login attempts', meta: ' · 3 attempts in 4 min · followed by successful password-recovery flow', signalsFired: 1, signalsTotal: 3, status: 'User verified' },
        { nameStrong: 'Password recovery flow', meta: ' · completed at 10:14 UTC · subsequent login successful · no further failures', signalsFired: 0, signalsTotal: 3, status: 'User confirmed' },
        { nameStrong: 'Account access history', meta: ' · 1y+ clean auth history · no unauthorized actions detected · no compromise indicators', signalsFired: 0, signalsTotal: 3, status: 'All clear' },
      ],
    },
  },
  anomaliesData: {
    anomalies: [
      { iconKey: 'clock', variant: 'default', name: 'Login-failure burst', detail: '3 failures in 4 min · slightly elevated from baseline 0.1 failures per session · within normal user-recovery workflow', sigmaValue: '+1.8σ' },
    ],
  },
  documentsData: {
    totalDocs: 1, flaggedHeader: '1 document · auth log',
    docs: [
      { id: 'doc-801', iconKey: 'file', variant: 'default', name: 'cand-432-auth-log.json', meta: '12 KB · 30-day auth history · single failed-login burst followed by recovery', actionKey: 'open-doc-801' },
    ],
    ctaLabel: 'View dismissal record →', ctaActionKey: 'view-dismissal',
    exportActionLabel: 'Export dismissal', exportActionKey: 'export-dismissal',
  },
  timelineData: {
    totalEvents: 12,
    events: [
      { time: 'Apr 18 · 10:37 UTC', actor: 'Aïsha Okafor', title: 'suggested threshold adjustment', detail: 'Feedback noted: 3 failed attempts in 4 minutes is a real user-recovery workflow, not fraud. Recommend tightening the low-confidence alert threshold to reduce false-positive noise.', variant: 'default' },
      { time: 'Apr 18 · 10:35 UTC', actor: 'Aïsha Okafor', title: 'closed as DISMISSED', detail: 'False positive. Candidate used legitimate password-recovery flow immediately after the 3 failed attempts. Auth log shows successful 4th login at 10:18 UTC with no further failures.', variant: 'default' },
      { time: 'Apr 18 · 10:25 UTC', actor: 'Aïsha Okafor', title: 'reviewed auth log', detail: 'Confirmed: 3 failed login attempts followed by successful "forgot password" flow within 6 minutes. Standard user-recovery pattern. No fraud indicator.', variant: 'default' },
      { time: 'Apr 18 · 10:18 UTC', actor: 'System', actorIsSystem: true, title: 'successful login after recovery', detail: 'User completed password-reset flow at 10:14 UTC. Subsequent login at 10:18 UTC successful with new password. No further failures.', variant: 'default' },
      { time: 'Apr 18 · 10:05 UTC', actor: 'System', actorIsSystem: true, title: 'raised LOW alert', detail: '3 failed login attempts in 4-minute window. Automatic alert per low-confidence threshold (5+ would trigger high). Alert FA-2026-0024 created.', variant: 'default' },
    ],
  },
  notesData: {
    totalNotes: 1,
    notes: [
      { author: 'Aïsha Okafor (you)', initials: 'AO', gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', role: 'Operations', timestamp: 'Apr 18 · 10:37 UTC',
        body: 'Closed as dismissed. The 3 failed attempts were obviously the user trying to remember their password, then using forgot-password. Normal user behavior, not fraud. Recommend tightening the low-confidence threshold to 5+ attempts — 3 fails in 4min is a real workflow, generating these alerts is just noise. Logging this as feedback for the alert-threshold review next quarter.' },
    ],
    composer: {
      authorAvatarGradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', authorInitials: 'AO',
      authorLabel: 'Add note as Aïsha', roleLabel: 'You',
      placeholder: 'Add an investigation note · admins only · audit logged · supports markdown',
      footerLeftText: 'Internal · visible to all admins · audit logged on save',
      saveButtonLabel: 'Save note',
    },
  },
};

/* ------------------------------------------------------------------ */
/*  All 9 detail profiles (canonical overrides for all)                */
/* ------------------------------------------------------------------ */

const CANONICAL_OVERRIDES: Record<string, FraudAlertProfile> = {
  'fa-2026-0042': CANONICAL_FA_2026_0042,
  'fa-2026-0041': CANONICAL_FA_2026_0041,
  'fa-2026-0039': CANONICAL_FA_2026_0039,
  'fa-2026-0038': CANONICAL_FA_2026_0038,
  'fa-2026-0037': CANONICAL_FA_2026_0037,
  'fa-2026-0036': CANONICAL_FA_2026_0036,
  'fa-2026-0034': CANONICAL_FA_2026_0034,
  'fa-2026-0029': CANONICAL_FA_2026_0029,
  'fa-2026-0024': CANONICAL_FA_2026_0024,
};

// Build from list rows — canonical overrides take precedence
const STUB_PROFILES: Record<string, FraudAlertProfile> = {};
for (const row of LIST_ROWS) {
  STUB_PROFILES[row.id] = CANONICAL_OVERRIDES[row.id] ?? stubFraudProfile(row);
}

export const FRAUD_ALERT_PROFILES: Record<string, FraudAlertProfile> = STUB_PROFILES;
