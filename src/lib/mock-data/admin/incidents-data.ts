/**
 * Phase 16a — Security Incidents mock data.
 *
 * admin.html markup: L40322-41348
 * admin.html CSS: L16670-17352
 *
 * Canonical detail: SI-2026-0014 (Mongo backup S3 exposure · GDPR clock active).
 * 9 alert fixtures for list view, 9 detail profiles for generateStaticParams.
 *
 * Reuses Phase 15 fraud primitives: FraudSeverityCard, FraudInvestigationStep.
 */

import type { FraudSeverityCard, FraudInvestigationStep } from './fraud-alerts-data';

/* ------------------------------------------------------------------ */
/*  Type unions                                                        */
/* ------------------------------------------------------------------ */

export type IncidentSeverity = 'critical' | 'high' | 'medium' | 'low';
export type IncidentStatusKey = 'new' | 'investigating' | 'mitigated' | 'closed';
export type IncidentFilterKey = 'all' | IncidentStatusKey;
export type IncidentTypeKey = 'breach' | 'unauthorized' | 'malware' | 'login' | 'phishing' | 'ddos' | 'vendor';
export type IncidentTypeIconKey = IncidentTypeKey | 'people';
export type IncidentAffectedTone = 'high' | 'med' | 'default';
export type IncidentValueColor = 'danger' | 'amber' | 'success';
export type IncidentActionVariant = 'default' | 'warn' | 'danger' | 'primary';

/* ------------------------------------------------------------------ */
/*  List view                                                          */
/* ------------------------------------------------------------------ */

export interface IncidentFilterChip {
  key: IncidentFilterKey;
  label: string;
  count: number;
}

export interface IncidentListRow {
  id: string;
  atlasId: string;
  severity: IncidentSeverity;
  isUrgent: boolean;
  summaryTitle: string;
  summaryMeta: string;
  typeKey: IncidentTypeKey;
  typeIconKey?: IncidentTypeIconKey;
  typeLabel: string;
  detectedDate: string;
  detectedRel: string;
  affectedCount: string;
  affectedTone: IncidentAffectedTone;
  affectedMeta: string;
  status: IncidentStatusKey;
  statusLabel: string;
}

/* ------------------------------------------------------------------ */
/*  Detail view                                                        */
/* ------------------------------------------------------------------ */

export interface IncidentHeroStat {
  label: string;
  value: string;
  valueColor?: IncidentValueColor;
  meta: string;
}

export type IncidentHeroIconKey = 'refresh' | 'envelope' | 'shield' | 'plus' | 'download';

export interface IncidentHeroAction {
  key: string;
  label: string;
  variant: IncidentActionVariant;
  iconKey: IncidentHeroIconKey;
}

export type IncidentMoreSection = 'coordination' | 'lifecycle';
export type IncidentMoreIconKey = 'clock' | 'chat-people' | 'file' | 'check' | 'circle-x';

export interface IncidentMoreItem {
  key: string;
  label: string;
  section: IncidentMoreSection;
  iconKey: IncidentMoreIconKey;
}

export interface IncidentQuickStatRow {
  label: string;
  value: string;
  valueColor?: IncidentValueColor;
  href?: string;
  hasArrow?: boolean;
}

export type IncidentSectionId = 'notification' | 'description' | 'actions' | 'timeline' | 'postmortem';

export interface IncidentDetailSection {
  id: IncidentSectionId;
  title: string;
  meta: string;
  placeholderMessage: string;
}

export type IncidentSubtitleSegment =
  | { kind: 'text'; text: string }
  | { kind: 'strong'; text: string }
  | { kind: 'link'; text: string; href: string };

export interface IncidentProfile {
  id: string;
  atlasId: string;
  severity: IncidentSeverity;
  status: IncidentStatusKey;
  statusLabel: string;
  typeKey: IncidentTypeKey;
  typeIconKey?: IncidentTypeIconKey;
  typeLabel: string;
  detected: string;
  detectedRel: string;
  detectedFullUtc: string;
  breadcrumbCurrent: string;
  title: string;
  subtitleSegments: IncidentSubtitleSegment[];
  heroStats: IncidentHeroStat[];
  actions: IncidentHeroAction[];
  moreItems: IncidentMoreItem[];
  trackerSteps: FraudInvestigationStep[];
  trackerProgress: { done: number; total: number };
  quickStats: IncidentQuickStatRow[];
  sections: IncidentDetailSection[];
  linkedFraudId?: string;
}

export type IncidentProfilesMap = Record<string, IncidentProfile>;

/* ------------------------------------------------------------------ */
/*  Page data                                                          */
/* ------------------------------------------------------------------ */

export interface IncidentsPageData {
  pageTitle: string;
  pageMeta: string;
  metaPulseText: string;
  severityCards: FraudSeverityCard[];
  filterChips: IncidentFilterChip[];
  listRows: IncidentListRow[];
  footerLabel: string;
  loadMoreLabel: string;
  dateRangeLabel: string;
}

/* ------------------------------------------------------------------ */
/*  Severity cards (4)                                                 */
/* ------------------------------------------------------------------ */

const SEVERITY_CARDS: FraudSeverityCard[] = [
  { key: 'critical', label: 'Critical', count: 5, meta: '1 active · GDPR window · 8.4K affected' },
  { key: 'high', label: 'High', count: 8, meta: '1 active · 2 mitigated · oldest 6d' },
  { key: 'medium', label: 'Medium', count: 14, meta: '3 mitigated · 2 closed · last 30d' },
  { key: 'low', label: 'Low', count: 20, meta: 'all auto-mitigated · last 90d' },
];
/* NOTE: severity counts on incident page are different (1/3/5/5). Override below. */
const INCIDENT_SEVERITY_CARDS: FraudSeverityCard[] = [
  { key: 'critical', label: 'Critical', count: 1, meta: '1 active · GDPR window · 8.4K affected' },
  { key: 'high', label: 'High', count: 3, meta: '1 active · 2 mitigated · oldest 6d' },
  { key: 'medium', label: 'Medium', count: 5, meta: '3 mitigated · 2 closed · last 30d' },
  { key: 'low', label: 'Low', count: 5, meta: 'all auto-mitigated · last 90d' },
];
void SEVERITY_CARDS;

/* ------------------------------------------------------------------ */
/*  Filter chips (5)                                                   */
/* ------------------------------------------------------------------ */

const FILTER_CHIPS: IncidentFilterChip[] = [
  { key: 'all', label: 'All', count: 14 },
  { key: 'new', label: 'New', count: 1 },
  { key: 'investigating', label: 'Investigating', count: 2 },
  { key: 'mitigated', label: 'Mitigated', count: 5 },
  { key: 'closed', label: 'Closed', count: 6 },
];

/* ------------------------------------------------------------------ */
/*  9 list row fixtures                                                */
/* ------------------------------------------------------------------ */

const LIST_ROWS: IncidentListRow[] = [
  {
    id: 'si-2026-0014', atlasId: 'SI-2026-0014',
    severity: 'critical', isUrgent: true,
    summaryTitle: 'Mongo backup snapshot exposed via misconfigured S3 bucket',
    summaryMeta: 'candidates table · 8,432 records · names + emails + phone numbers · no passwords / payment data',
    typeKey: 'breach', typeLabel: 'Data breach',
    detectedDate: 'May 4 · 14:18', detectedRel: '1d 18h ago',
    affectedCount: '8,432', affectedTone: 'high', affectedMeta: 'candidates · partial notif',
    status: 'investigating', statusLabel: 'Investigating',
  },
  {
    id: 'si-2026-0013', atlasId: 'SI-2026-0013',
    severity: 'high', isUrgent: false,
    summaryTitle: 'Credential-stuffing attack from rotating residential IPs',
    summaryMeta: '2.4M attempts in 90 min · 21 candidate accounts compromised · forced password rotations issued',
    typeKey: 'login', typeLabel: 'Login anomaly',
    detectedDate: 'May 3 · 02:41', detectedRel: '3d 6h ago',
    affectedCount: '21', affectedTone: 'med', affectedMeta: 'candidates · all notified',
    status: 'investigating', statusLabel: 'Investigating',
  },
  {
    id: 'si-2026-0012', atlasId: 'SI-2026-0012',
    severity: 'high', isUrgent: false,
    summaryTitle: 'Former contractor retained API token after offboarding',
    summaryMeta: 'read-only token used 4× · accessed analytics dashboard · no PII or write actions · token revoked',
    typeKey: 'unauthorized', typeLabel: 'Unauthorized access',
    detectedDate: 'Apr 30 · 09:08', detectedRel: '5d 23h ago',
    affectedCount: '0', affectedTone: 'default', affectedMeta: 'no PII exposed',
    status: 'mitigated', statusLabel: 'Mitigated',
  },
  {
    id: 'si-2026-0011', atlasId: 'SI-2026-0011',
    severity: 'medium', isUrgent: false,
    summaryTitle: 'Compromised npm dependency detected in CI pipeline',
    summaryMeta: 'colors-pkg-spoof@1.4.4 · pulled into staging build · never reached production · pinned + advisories filed',
    typeKey: 'malware', typeLabel: 'Malware',
    detectedDate: 'Apr 26 · 16:52', detectedRel: '9d 16h ago',
    affectedCount: '0', affectedTone: 'default', affectedMeta: 'contained pre-prod',
    status: 'mitigated', statusLabel: 'Mitigated',
  },
  {
    id: 'si-2026-0010', atlasId: 'SI-2026-0010',
    severity: 'medium', isUrgent: false,
    summaryTitle: 'Phishing campaign targeting Atlas employees · "HR onboarding" lure',
    summaryMeta: '7 employees received · 0 clicks · 0 credentials submitted · domain blocked + advisory issued',
    typeKey: 'phishing', typeLabel: 'Phishing report',
    detectedDate: 'Apr 24 · 11:30', detectedRel: '11d ago',
    affectedCount: '7', affectedTone: 'default', affectedMeta: 'employees · advised',
    status: 'investigating', statusLabel: 'Investigating',
  },
  {
    id: 'si-2026-0009', atlasId: 'SI-2026-0009',
    severity: 'low', isUrgent: false,
    summaryTitle: 'Brute-force login attempts on cl-167 (Vorona) admin proxy',
    summaryMeta: '82 attempts · auto-blocked by rate limiter · IP added to deny-list · cross-ref FA-2026-0042',
    typeKey: 'login', typeLabel: 'Login anomaly',
    detectedDate: 'Apr 22 · 03:12', detectedRel: '14d ago',
    affectedCount: '0', affectedTone: 'default', affectedMeta: 'auto-mitigated',
    status: 'mitigated', statusLabel: 'Mitigated',
  },
  {
    id: 'si-2026-0008', atlasId: 'SI-2026-0008',
    severity: 'low', isUrgent: false,
    summaryTitle: 'Volumetric DDoS attempt against API edge · Cloudflare-handled',
    summaryMeta: 'peaked at 18.2 Gbps · zero impact on origin · L3/L4 anycast · standard challenge mode',
    typeKey: 'ddos', typeLabel: 'DDoS / volumetric',
    detectedDate: 'Apr 18 · 22:47', detectedRel: '17d ago',
    affectedCount: '0', affectedTone: 'default', affectedMeta: 'no user impact',
    status: 'closed', statusLabel: 'Closed',
  },
  {
    id: 'si-2026-0007', atlasId: 'SI-2026-0007',
    severity: 'medium', isUrgent: false,
    summaryTitle: 'Upstream vendor breach (Auth0) · advisory CVE-2026-0142',
    summaryMeta: 'no Atlas tenant impact confirmed · users notified as precaution · forced session refresh · post-mortem published',
    typeKey: 'vendor', typeLabel: 'Vendor advisory',
    detectedDate: 'Apr 12 · 06:05', detectedRel: '23d ago',
    affectedCount: '28K', affectedTone: 'default', affectedMeta: 'all users · notified',
    status: 'closed', statusLabel: 'Closed',
  },
  {
    id: 'si-2026-0006', atlasId: 'SI-2026-0006',
    severity: 'low', isUrgent: false,
    summaryTitle: 'Spam-bot signup wave · disposable-email pattern',
    summaryMeta: '3,142 signups in 4 hours · all blocked by Turnstile heuristics + email-domain filter · accounts purged',
    typeKey: 'login', typeIconKey: 'people', typeLabel: 'Suspicious activity',
    detectedDate: 'Apr 4 · 14:00', detectedRel: '31d ago',
    affectedCount: '0', affectedTone: 'default', affectedMeta: 'all blocked',
    status: 'closed', statusLabel: 'Closed',
  },
];

/* ------------------------------------------------------------------ */
/*  Page data singleton                                                */
/* ------------------------------------------------------------------ */

export const INCIDENTS_PAGE_DATA: IncidentsPageData = {
  pageTitle: 'Security incidents',
  pageMeta: '/admin/trust-safety/security-incidents · 14 incidents total · 2 active · 1 in regulatory window',
  metaPulseText: 'SI-2026-0014 · GDPR clock active',
  severityCards: INCIDENT_SEVERITY_CARDS,
  filterChips: FILTER_CHIPS,
  listRows: LIST_ROWS,
  footerLabel: '9 of 14 incidents shown · sorted by detection date desc · canonical sample with realistic severity + status mix',
  loadMoreLabel: 'Load 5 more →',
  dateRangeLabel: 'Last 90 days',
};

/* ------------------------------------------------------------------ */
/*  Canonical detail profile: SI-2026-0014                             */
/* ------------------------------------------------------------------ */

const CANONICAL_SI_2026_0014: IncidentProfile = {
  id: 'si-2026-0014',
  atlasId: 'SI-2026-0014',
  severity: 'critical',
  status: 'investigating',
  statusLabel: 'In investigation',
  typeKey: 'breach',
  typeLabel: 'Data breach',
  detected: 'May 4 · 14:18 UTC',
  detectedRel: '1d 18h ago',
  detectedFullUtc: 'Detected May 4 · 14:18 UTC · 1d 18h ago',
  breadcrumbCurrent: 'SI-2026-0014 · Mongo backup S3 exposure',
  title: 'Mongo backup snapshot exposed via misconfigured S3 bucket',
  subtitleSegments: [
    { kind: 'text', text: 'A Mongo backup snapshot containing the candidates table was found accessible via an S3 bucket misconfigured with public-list permissions. Exposed: ' },
    { kind: 'strong', text: '8,432 records' },
    { kind: 'text', text: ' (names, emails, phone, country, signup-date). Excluded: passwords, payment data, ID documents, session tokens. Bucket secured at 14:34 UTC; 3-hour exposure window. ' },
    { kind: 'link', text: 'Cross-reference fraud alert FA-2026-0042', href: '/admin/trust-safety/fraud-abuse/fa-2026-0042' },
    { kind: 'text', text: ' not triggered (different vector).' },
  ],
  heroStats: [
    { label: 'Affected users', value: '8,432', valueColor: 'danger', meta: 'candidates · partial PII' },
    { label: 'Exposure window', value: '3h 16m', valueColor: 'amber', meta: '11:18 → 14:34 UTC May 4' },
    { label: 'Detection method', value: 'External', meta: 'researcher disclosure to security@' },
    { label: 'GDPR Art. 33 deadline', value: '53h 22m', valueColor: 'amber', meta: '36% of 72h budget remaining' },
  ],
  actions: [
    { key: 'update-status', label: 'Update status', variant: 'warn', iconKey: 'refresh' },
    { key: 'notify-users', label: 'Notify users', variant: 'default', iconKey: 'envelope' },
    { key: 'notify-regulators', label: 'Notify regulators', variant: 'danger', iconKey: 'shield' },
  ],
  moreItems: [
    { key: 'page-security', label: 'Page on-call security', section: 'coordination', iconKey: 'clock' },
    { key: 'open-warroom', label: 'Open war-room channel', section: 'coordination', iconKey: 'chat-people' },
    { key: 'document-compliance', label: 'Document for compliance', section: 'coordination', iconKey: 'file' },
    { key: 'mark-mitigated', label: 'Mark as mitigated', section: 'lifecycle', iconKey: 'check' },
    { key: 'close-incident', label: 'Close incident', section: 'lifecycle', iconKey: 'circle-x' },
  ],
  trackerSteps: [
    { label: 'Detection', meta: 'May 4 · 14:18 · external researcher disclosure', done: true, current: false },
    { label: 'Triage & severity', meta: 'May 4 · 14:31 · CRITICAL · Aïsha + Dario paged', done: true, current: false },
    { label: 'Containment', meta: 'May 4 · 14:34 · bucket secured · 3h 16m exposure', done: true, current: false },
    { label: 'Notification (in flight)', meta: '5,398 / 8,432 users · regulators pending · ETA 18:00 UTC', done: false, current: true },
    { label: 'Eradication', meta: 'root-cause fix · IAM policy hardening · pending', done: false, current: false },
    { label: 'Recovery & monitoring', meta: '7-day enhanced monitoring · pending', done: false, current: false },
    { label: 'Post-mortem & closure', meta: 'due May 18 · 14d after detection', done: false, current: false },
  ],
  trackerProgress: { done: 3, total: 7 },
  quickStats: [
    { label: 'Incident lead', value: 'Aïsha Okafor (you)' },
    { label: 'Compliance owner', value: 'Dario Fonseca' },
    { label: 'Severity', value: 'Critical · P1', valueColor: 'danger' },
    { label: 'Affected users', value: '8,432 candidates', valueColor: 'danger' },
    { label: 'Data classes', value: 'Names, emails, phone', valueColor: 'amber' },
    { label: 'Excluded data', value: 'Passwords, payment' },
    { label: 'External report', value: 'Bug-bounty #B-2104 →', href: '#', hasArrow: true },
    { label: 'War-room', value: '#sec-si-0014 →', href: '#', hasArrow: true },
    { label: 'Audit log', value: '86 events →', href: '#', hasArrow: true },
  ],
  sections: [
    { id: 'notification', title: 'Notification status', meta: 'affected users · regulatory authorities · all notifications audit-logged', placeholderMessage: 'Notification status will be populated in Phase 16b.' },
    { id: 'description', title: 'Incident description', meta: 'root-cause analysis in progress · technical narrative below', placeholderMessage: 'Incident description will be populated in Phase 16c.' },
    { id: 'actions', title: 'Actions taken', meta: '7 actions logged · 3 completed · 1 in progress · 3 pending · all audit-stamped', placeholderMessage: 'Actions log will be populated in Phase 16b.' },
    { id: 'timeline', title: 'Timeline of events', meta: 'all UTC · 86 audit-log entries · 24h+ since detection', placeholderMessage: 'Timeline will be populated in Phase 16b.' },
    { id: 'postmortem', title: 'Post-mortem', meta: 'due May 18 · 14d after detection · published when complete', placeholderMessage: 'Post-mortem will be populated in Phase 16c.' },
  ],
  linkedFraudId: 'fa-2026-0042',
};

/* ------------------------------------------------------------------ */
/*  Stub profile generator (8 non-canonical incidents)                 */
/* ------------------------------------------------------------------ */

function stubProfile(row: IncidentListRow): IncidentProfile {
  return {
    id: row.id,
    atlasId: row.atlasId,
    severity: row.severity,
    status: row.status,
    statusLabel: row.statusLabel,
    typeKey: row.typeKey,
    ...(row.typeIconKey ? { typeIconKey: row.typeIconKey } : {}),
    typeLabel: row.typeLabel,
    detected: `${row.detectedDate} UTC`,
    detectedRel: row.detectedRel,
    detectedFullUtc: `Detected ${row.detectedDate} UTC · ${row.detectedRel}`,
    breadcrumbCurrent: `${row.atlasId} · ${row.summaryTitle.split(' · ')[0]}`,
    title: row.summaryTitle,
    subtitleSegments: [{ kind: 'text', text: row.summaryMeta }],
    heroStats: [
      { label: 'Affected', value: row.affectedCount, ...(row.affectedTone === 'high' ? { valueColor: 'danger' as const } : row.affectedTone === 'med' ? { valueColor: 'amber' as const } : {}), meta: row.affectedMeta },
      { label: 'Type', value: row.typeLabel, meta: `Severity · ${row.severity}` },
      { label: 'Detected', value: row.detectedDate, meta: row.detectedRel },
      { label: 'Status', value: row.statusLabel, meta: `Since ${row.detectedDate}` },
    ],
    actions: [
      { key: 'update-status', label: 'Update status', variant: 'warn', iconKey: 'refresh' },
      { key: 'view-runbook', label: 'View runbook', variant: 'default', iconKey: 'shield' },
    ],
    moreItems: [
      { key: 'page-security', label: 'Page on-call security', section: 'coordination', iconKey: 'clock' },
      { key: 'document-compliance', label: 'Document for compliance', section: 'coordination', iconKey: 'file' },
      { key: 'mark-mitigated', label: 'Mark as mitigated', section: 'lifecycle', iconKey: 'check' },
      { key: 'close-incident', label: 'Close incident', section: 'lifecycle', iconKey: 'circle-x' },
    ],
    trackerSteps: [
      { label: 'Detection', meta: `${row.detectedDate} · auto-detected`, done: true, current: false },
      { label: 'Triage & severity', meta: row.status === 'new' ? 'pending' : `${row.severity.toUpperCase()} · triaged`, done: row.status !== 'new', current: row.status === 'new' },
      { label: 'Containment', meta: row.status === 'mitigated' || row.status === 'closed' ? 'contained' : 'pending', done: row.status === 'mitigated' || row.status === 'closed', current: row.status === 'investigating' },
      { label: 'Notification', meta: row.affectedCount === '0' ? 'not required' : 'completed', done: row.status === 'mitigated' || row.status === 'closed', current: false },
      { label: 'Eradication', meta: row.status === 'closed' ? 'completed' : 'pending', done: row.status === 'closed', current: false },
      { label: 'Recovery & monitoring', meta: row.status === 'closed' ? 'completed' : 'pending', done: row.status === 'closed', current: false },
      { label: 'Post-mortem & closure', meta: row.status === 'closed' ? 'closed' : 'pending', done: row.status === 'closed', current: false },
    ],
    trackerProgress: {
      done: row.status === 'closed' ? 7 : row.status === 'mitigated' ? 4 : row.status === 'investigating' ? 2 : 1,
      total: 7,
    },
    quickStats: [
      { label: 'Incident lead', value: 'Unassigned' },
      { label: 'Severity', value: `${row.severity.charAt(0).toUpperCase() + row.severity.slice(1)}`, ...(row.severity === 'critical' || row.severity === 'high' ? { valueColor: 'danger' as const } : row.severity === 'medium' ? { valueColor: 'amber' as const } : {}) },
      { label: 'Type', value: row.typeLabel },
      { label: 'Affected', value: row.affectedCount, ...(row.affectedTone === 'high' ? { valueColor: 'danger' as const } : row.affectedTone === 'med' ? { valueColor: 'amber' as const } : {}) },
      { label: 'Status', value: row.statusLabel },
      { label: 'Detected', value: row.detectedDate },
      { label: 'Audit log', value: '—' },
    ],
    sections: [
      { id: 'notification', title: 'Notification status', meta: 'placeholder', placeholderMessage: 'No notification data for this incident.' },
      { id: 'description', title: 'Incident description', meta: 'placeholder', placeholderMessage: 'No description recorded.' },
      { id: 'actions', title: 'Actions taken', meta: 'placeholder', placeholderMessage: 'No actions logged.' },
      { id: 'timeline', title: 'Timeline of events', meta: 'placeholder', placeholderMessage: 'No timeline events recorded.' },
      { id: 'postmortem', title: 'Post-mortem', meta: 'placeholder', placeholderMessage: 'No post-mortem available.' },
    ],
  };
}

/* ------------------------------------------------------------------ */
/*  9 detail profiles (canonical + 8 stubs)                            */
/* ------------------------------------------------------------------ */

const PROFILES: IncidentProfilesMap = {};
for (const row of LIST_ROWS) {
  PROFILES[row.id] = row.id === 'si-2026-0014' ? CANONICAL_SI_2026_0014 : stubProfile(row);
}

export const INCIDENT_PROFILES: IncidentProfilesMap = PROFILES;
