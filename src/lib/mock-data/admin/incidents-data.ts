/**
 * Phase 16a — Security Incidents mock data.
 * Phase 16b — GDPR clock, notification panel, actions log, timeline data.
 *
 * admin.html markup: L40322-41348
 * admin.html CSS: L16670-17352
 *
 * Canonical detail: SI-2026-0014 (Mongo backup S3 exposure · GDPR clock active).
 * 9 alert fixtures for list view, 9 detail profiles for generateStaticParams.
 *
 * Reuses Phase 15 fraud primitives: FraudSeverityCard, FraudInvestigationStep, FraudTimelineData.
 */

import type { FraudSeverityCard, FraudInvestigationStep, FraudTimelineData } from './fraud-alerts-data';

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
/*  Phase 16b — GDPR clock                                             */
/* ------------------------------------------------------------------ */

export interface GDPRClockCell {
  value: string;
  label: string;
  isUrgent?: boolean;
}

export interface GDPRClockMeta {
  elapsed: string;
  remaining: string;
  windowLabel: string;
}

export interface IncidentGDPRClockData {
  eyebrow: string;
  title: string;
  statusLabel: string;
  cells: GDPRClockCell[];
  barPercent: number;
  meta: GDPRClockMeta;
  ctaLabel: string;
}

/* ------------------------------------------------------------------ */
/*  Phase 16b — Notification panel                                     */
/* ------------------------------------------------------------------ */

export type NotifCardVariant = 'default' | 'urgent' | 'complete';
export type NotifPillVariant = 'partial' | 'required' | 'complete' | 'pending';
export type NotifActionVariant = 'default' | 'warn';

export interface NotifStatCell {
  label: string;
  value: string;
  isWarn?: boolean;
}

export interface NotifFootHighlight {
  text: string;
  color: 'amber' | 'danger';
}

export interface NotifCardData {
  variant: NotifCardVariant;
  iconKey: 'users' | 'shield';
  title: string;
  subtitle: string;
  pillLabel: string;
  pillVariant: NotifPillVariant;
  progressPercent: number;
  stats: NotifStatCell[];
  footText: string;
  footHighlight?: NotifFootHighlight;
  actionLabel: string;
  actionVariant: NotifActionVariant;
  actionKey: string;
}

export interface IncidentNotificationData {
  cards: [NotifCardData, NotifCardData];
}

/* ------------------------------------------------------------------ */
/*  Phase 16b — Actions log                                            */
/* ------------------------------------------------------------------ */

export type ActionRowStatus = 'completed' | 'in-progress' | 'pending';

export type ActionTextSegment =
  | { kind: 'text'; text: string }
  | { kind: 'code'; text: string };

export type ActionActorSegment =
  | { kind: 'text'; text: string }
  | { kind: 'strong'; text: string };

export interface ActionRowActor {
  initials: string;
  gradient: string;
  segments: ActionActorSegment[];
}

export interface ActionRowData {
  num: number;
  status: ActionRowStatus;
  time: string;
  titleSegments: ActionTextSegment[];
  detailSegments: ActionTextSegment[];
  actor: ActionRowActor;
}

export interface IncidentActionsData {
  actions: ActionRowData[];
}

/* ------------------------------------------------------------------ */
/*  Phase 16c — §02 Incident description                               */
/* ------------------------------------------------------------------ */

export type DescriptionSegment =
  | { kind: 'text'; text: string }
  | { kind: 'strong'; text: string }
  | { kind: 'strong-amber'; text: string }
  | { kind: 'strong-success'; text: string }
  | { kind: 'code'; text: string }
  | { kind: 'link'; text: string; actionKey: string };

export interface DescriptionParagraph {
  segments: DescriptionSegment[];
}

export interface IncidentDescriptionData {
  paragraphs: DescriptionParagraph[];
}

/* ------------------------------------------------------------------ */
/*  Phase 16c — §05 Post-mortem                                        */
/* ------------------------------------------------------------------ */

export type PostMortemStatus = 'pending' | 'published';

export type PostMortemTextSegment =
  | { kind: 'text'; text: string }
  | { kind: 'strong'; text: string };

export interface PostMortemPendingData {
  status: 'pending';
  pillLabel: string;
  pendingLines: string[];
  ownerSegments: PostMortemTextSegment[];
  buttonLabel: string;
}

export interface PostMortemBlock {
  label: string;
  segments: PostMortemTextSegment[];
}

export interface PostMortemPublishedData {
  status: 'published';
  pillLabel: string;
  title: string;
  blocks: PostMortemBlock[];
}

export interface PostMortemReferenceData {
  summaryLabel: string;
  data: PostMortemPublishedData;
}

export interface IncidentPostMortemData {
  primary: PostMortemPendingData | PostMortemPublishedData;
  reference?: PostMortemReferenceData;
}

/* ------------------------------------------------------------------ */
/*  Phase 16c — Security team card                                     */
/* ------------------------------------------------------------------ */

export type TeamMemberStatus = 'online' | 'away' | 'offline';

export interface TeamMemberData {
  initials: string;
  gradient: string;
  name: string;
  role: string;
  statusLabel: string;
  statusKey: TeamMemberStatus;
}

export interface IncidentSecurityTeamData {
  members: TeamMemberData[];
  footerText: string;
  footerHighlight: string;
}

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
  gdprClock?: IncidentGDPRClockData;
  notificationData?: IncidentNotificationData;
  actionsData?: IncidentActionsData;
  timelineData?: FraudTimelineData;
  descriptionData?: IncidentDescriptionData;
  postMortemData?: IncidentPostMortemData;
  securityTeamData?: IncidentSecurityTeamData;
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

  /* Phase 16b — GDPR clock */
  gdprClock: {
    eyebrow: 'GDPR ARTICLE 33 · BREACH NOTIFICATION CLOCK',
    title: 'Time to notify supervisory authority',
    statusLabel: 'Clock active',
    cells: [
      { value: '02', label: 'Days left' },
      { value: '05', label: 'Hours', isUrgent: true },
      { value: '22', label: 'Minutes' },
      { value: '14', label: 'Seconds' },
    ],
    barPercent: 36,
    meta: { elapsed: '26h 22m', remaining: '53h 22m', windowLabel: '72h GDPR window' },
    ctaLabel: 'Draft notification draft →',
  },

  /* Phase 16b — Notification status (§01) */
  notificationData: {
    cards: [
      {
        variant: 'urgent',
        iconKey: 'users',
        title: 'Affected users',
        subtitle: 'Partial · in-flight',
        pillLabel: 'Partial',
        pillVariant: 'partial',
        progressPercent: 64,
        stats: [
          { label: 'Notified', value: '5,398 / 8,432' },
          { label: 'In-progress', value: '3,034', isWarn: true },
          { label: 'Channels', value: 'Email + WA' },
          { label: 'Bounces', value: '142 · retry' },
        ],
        footText: 'ETA complete · today 18:00 UTC',
        actionLabel: 'View & resume →',
        actionVariant: 'warn',
        actionKey: 'resume-notify-users',
      },
      {
        variant: 'default',
        iconKey: 'shield',
        title: 'Regulatory authorities',
        subtitle: 'GDPR Art. 33 + CCPA',
        pillLabel: 'Required',
        pillVariant: 'required',
        progressPercent: 25,
        stats: [
          { label: 'GDPR · supervisory', value: 'Drafted · not filed' },
          { label: 'CCPA · CPPA', value: 'Pending review' },
          { label: 'LGPD (BR)', value: 'Not triggered' },
          { label: 'Owner', value: 'Dario · Compliance' },
        ],
        footText: 'Deadline: ',
        footHighlight: { text: '53h 22m', color: 'amber' },
        actionLabel: 'Open form →',
        actionVariant: 'default',
        actionKey: 'open-regulator-form',
      },
    ],
  },

  /* Phase 16b — Actions taken (§03) */
  actionsData: {
    actions: [
      {
        num: 1,
        status: 'completed',
        time: 'May 4 · 14:34',
        titleSegments: [
          { kind: 'text', text: 'Revoked public-list ACL on ' },
          { kind: 'code', text: 'atlas-prod-backups-archive' },
        ],
        detailSegments: [
          { kind: 'text', text: 'Reverted Terraform diff. Applied bucket-policy deny statement. Verified inaccessibility from anonymous client. Containment confirmed at 14:34:08 UTC.' },
        ],
        actor: {
          initials: 'RJ',
          gradient: 'linear-gradient(135deg, #5C8E5A, #2D4F2C)',
          segments: [{ kind: 'text', text: 'by ' }, { kind: 'strong', text: 'Rohan Joshi (SRE on-call)' }],
        },
      },
      {
        num: 2,
        status: 'completed',
        time: 'May 4 · 15:02',
        titleSegments: [
          { kind: 'text', text: 'Forensic snapshot captured · CloudTrail + bucket-access logs preserved' },
        ],
        detailSegments: [
          { kind: 'text', text: '14-day window of CloudTrail events archived to forensic store · MD5 hashed · chain-of-custody log started. 2 anonymous list operations confirmed from researcher IP only.' },
        ],
        actor: {
          initials: 'LC',
          gradient: 'linear-gradient(135deg, #7A8AA4, #44516A)',
          segments: [{ kind: 'text', text: 'by ' }, { kind: 'strong', text: 'Lin Chen (AppSec lead)' }],
        },
      },
      {
        num: 3,
        status: 'completed',
        time: 'May 4 · 16:48',
        titleSegments: [
          { kind: 'text', text: 'Affected-user list compiled · 8,432 records · cohort analysis' },
        ],
        detailSegments: [
          { kind: 'text', text: 'Generated reproducible affected-user query from snapshot diff. By region: 4,184 EU · 1,927 US · 2,321 ROW. Notification template approved by Erin (Legal) and queued for staged send.' },
        ],
        actor: {
          initials: 'AO',
          gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)',
          segments: [{ kind: 'text', text: 'by ' }, { kind: 'strong', text: 'Aïsha Okafor (you)' }],
        },
      },
      {
        num: 4,
        status: 'in-progress',
        time: 'May 5 · 09:14',
        titleSegments: [
          { kind: 'text', text: 'Affected-user notification rollout · staged send' },
        ],
        detailSegments: [
          { kind: 'text', text: 'Email + WhatsApp (where opted-in) · 1,000 recipients per 30-min batch to avoid bounce / abuse heuristics. 5,398 of 8,432 sent. ETA complete: today 18:00 UTC.' },
        ],
        actor: {
          initials: 'SY',
          gradient: 'linear-gradient(135deg, #6E3FE0, #3D2B6F)',
          segments: [
            { kind: 'text', text: 'by ' },
            { kind: 'strong', text: 'System' },
            { kind: 'text', text: ' · ' },
            { kind: 'strong', text: 'Aïsha' },
            { kind: 'text', text: ' oversight' },
          ],
        },
      },
      {
        num: 5,
        status: 'pending',
        time: 'Pending · 17:00',
        titleSegments: [
          { kind: 'text', text: 'File GDPR Article 33 supervisory-authority notice' },
        ],
        detailSegments: [
          { kind: 'text', text: 'Draft prepared by Dario · awaiting Legal sign-off (Erin) · target submission via supervisory portal before 17:40 UTC today. Includes affected-user count, data classes, mitigation, intended remediation.' },
        ],
        actor: {
          initials: 'DF',
          gradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)',
          segments: [{ kind: 'text', text: 'assigned to ' }, { kind: 'strong', text: 'Dario Fonseca' }],
        },
      },
      {
        num: 6,
        status: 'pending',
        time: 'Pending · May 6',
        titleSegments: [
          { kind: 'text', text: 'Eradication · IAM-policy hardening + Terraform CI guard' },
        ],
        detailSegments: [
          { kind: 'text', text: 'Add tflint rule blocking ' },
          { kind: 'code', text: 'block_public_acls = false' },
          { kind: 'text', text: ' on backup buckets. Enforce SCP at org-level. Quarterly review cadence.' },
        ],
        actor: {
          initials: 'LC',
          gradient: 'linear-gradient(135deg, #7A8AA4, #44516A)',
          segments: [{ kind: 'text', text: 'assigned to ' }, { kind: 'strong', text: 'Lin Chen' }],
        },
      },
      {
        num: 7,
        status: 'pending',
        time: 'Pending · May 18',
        titleSegments: [
          { kind: 'text', text: 'Post-mortem published · cross-team review' },
        ],
        detailSegments: [
          { kind: 'text', text: '14-day post-incident post-mortem with timeline, contributing factors, lessons, action-items. Distributed to all-hands. Section pending until incident closes.' },
        ],
        actor: {
          initials: 'AO',
          gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)',
          segments: [{ kind: 'text', text: 'assigned to ' }, { kind: 'strong', text: 'Aïsha Okafor' }],
        },
      },
    ],
  },

  /* Phase 16b — Timeline of events (§04) — reuses FraudTimelineData */
  timelineData: {
    totalEvents: 86,
    events: [
      { time: 'Today · 09:14 UTC · 1h 12m ago', actor: 'Aïsha Okafor', title: 'began notification rollout', detail: 'Staged batch send started. 5,398 of 8,432 affected users notified by email + WhatsApp where opted in. Bounce-rate normal (1.7%) · 142 retries queued.', variant: 'danger' },
      { time: 'Today · 08:30 UTC', actor: 'Dario Fonseca', title: 'drafted GDPR Article 33 notice', detail: 'Initial draft prepared per supervisory authority template. Forwarded to Erin (Legal) for sign-off. Target file: today 17:40 UTC.', variant: 'default' },
      { time: 'May 4 · 16:48 UTC', actor: 'Aïsha Okafor', title: 'compiled affected-user cohort', detail: '8,432 records identified via snapshot diff against current Mongo. Notification email + WA template drafted, approved by Legal, queued for staged send.', variant: 'success' },
      { time: 'May 4 · 15:02 UTC', actor: 'Lin Chen', title: 'captured forensic snapshot', detail: 'CloudTrail + S3 access logs archived. Anonymous list events traced — only 2 events, both from researcher\'s reported IP. No GetObject / DownloadFile events. Chain-of-custody log started.', variant: 'success' },
      { time: 'May 4 · 14:34 UTC', actor: 'Rohan Joshi', title: 'contained bucket exposure', detail: 'Reverted Terraform diff + applied explicit bucket-policy deny. Containment verified by anonymous-client probe. Exposure window closed at 3h 16m.', variant: 'success' },
      { time: 'May 4 · 14:31 UTC', actor: 'System', actorIsSystem: true, title: 'auto-escalated to CRITICAL · paged on-call', detail: 'Affected-user count exceeded 1,000 threshold. Severity bumped CRITICAL. PagerDuty paged Aïsha (incident lead), Dario (compliance), Rohan (SRE on-call). War-room created: #sec-si-0014.', variant: 'warn' },
      { time: 'May 4 · 14:21 UTC', actor: 'Aïsha Okafor', title: 'opened incident SI-2026-0014', detail: 'Triaged researcher report, confirmed plausibility within 3 minutes via direct probe of bucket. Severity initial: HIGH. Status: NEW.', variant: 'warn' },
      { time: 'May 4 · 14:18 UTC', actor: 'External', actorIsSystem: true, title: 'bug-bounty disclosure received', detail: 'Researcher submission to security@atlas.com · attached bucket URL + 5 sample object listings. Auto-routed to security alias inbox. Acknowledgement sent within 4 minutes.', variant: 'danger' },
      { time: 'May 4 · 11:18 UTC', title: 'Backup snapshot written to S3 (event horizon)', detail: 'Automated nightly backup job executed at 11:18 UTC. Snapshot inherited bucket ACL. Bucket made publicly listable by Terraform change merged at 09:42 UTC same day.', variant: 'default' },
      { time: 'May 4 · 09:42 UTC', title: 'Root cause introduced — Terraform PR #2418 merged', detail: 'PR set block_public_acls = false on archive bucket as part of an unrelated cross-account-replication change. Reviewers missed the line. Lint-rule for this is the Section 05 remediation.', variant: 'default' },
    ],
  },

  /* Phase 16c — §02 Incident description */
  descriptionData: {
    paragraphs: [
      {
        segments: [
          { kind: 'text', text: 'At ' },
          { kind: 'strong', text: 'May 4 · 11:18 UTC' },
          { kind: 'text', text: ', an automated database backup process wrote a Mongo snapshot of the ' },
          { kind: 'code', text: 'candidates' },
          { kind: 'text', text: ' collection to S3 bucket ' },
          { kind: 'code', text: 'atlas-prod-backups-archive' },
          { kind: 'text', text: '. A Terraform change merged earlier the same day inadvertently set ' },
          { kind: 'code', text: 'block_public_acls = false' },
          { kind: 'text', text: ' on this bucket, allowing the snapshot’s default ACL to expose it to anonymous list operations.' },
        ],
      },
      {
        segments: [
          { kind: 'text', text: 'At ' },
          { kind: 'strong', text: '14:18 UTC' },
          { kind: 'text', text: ', an external security researcher (' },
          { kind: 'link', text: 'bug-bounty submission B-2104', actionKey: 'open-disclosure' },
          { kind: 'text', text: ') reported the bucket via security@atlas.com. Containment by IAM-policy revert + bucket-policy-deny was completed at ' },
          { kind: 'strong', text: '14:34 UTC' },
          { kind: 'text', text: ', closing a ' },
          { kind: 'strong-amber', text: '3 hour 16 minute' },
          { kind: 'text', text: ' exposure window.' },
        ],
      },
      {
        segments: [
          { kind: 'text', text: 'Exposed records: ' },
          { kind: 'strong', text: '8,432 candidate accounts' },
          { kind: 'text', text: ' · fields: name, email, phone, country, signup-date, profile-headline. ' },
          { kind: 'strong-success', text: 'Excluded' },
          { kind: 'text', text: ': passwords (separately stored), payment instruments (Stripe-tokenized only), uploaded ID documents (separate encrypted store), session tokens.' },
        ],
      },
      {
        segments: [
          { kind: 'text', text: 'CloudTrail logs confirm ' },
          { kind: 'strong', text: '2 anonymous list operations' },
          { kind: 'text', text: ' against the bucket during the window — both from the researcher’s IP. No download / GetObject events recorded. Exposure is limited to record enumeration; the researcher confirmed no record contents were accessed beyond verifying breach feasibility. We are treating it as a confirmed Article 33-eligible event regardless, given the discoverability window.' },
        ],
      },
    ],
  },

  /* Phase 16c — §05 Post-mortem */
  postMortemData: {
    primary: {
      status: 'pending',
      pillLabel: 'Pending · due May 18',
      pendingLines: [
        'Post-mortem will be drafted after the incident closes.',
        'Expected sections include: timeline, root cause, contributing factors, mitigation, lessons learned, follow-up action items, regulatory outcomes, and a public summary.',
      ],
      ownerSegments: [
        { kind: 'text', text: 'Owner: ' },
        { kind: 'strong', text: 'Aïsha Okafor' },
        { kind: 'text', text: ' · review by Dario + Lin · all-hands distribution.' },
      ],
      buttonLabel: 'Open post-mortem template',
    },
    reference: {
      summaryLabel: 'Reference · how the SI-2026-0007 (Auth0) post-mortem looked',
      data: {
        status: 'published',
        pillLabel: 'Published · Apr 26',
        title: 'SI-2026-0007 · Auth0 vendor advisory · post-mortem',
        blocks: [
          {
            label: 'Root cause',
            segments: [
              { kind: 'text', text: 'Upstream vendor security advisory (CVE-2026-0142). ' },
              { kind: 'strong', text: 'No Atlas tenant impact confirmed' },
              { kind: 'text', text: '. Forced session refresh issued as a precaution.' },
            ],
          },
          {
            label: 'Mitigation',
            segments: [
              { kind: 'text', text: 'Forced re-authentication for 28K users · session-token rotation · monitoring enhanced for 14 days post-event.' },
            ],
          },
          {
            label: 'Lessons learned',
            segments: [
              { kind: 'text', text: 'Vendor-advisory triage process now formalized into runbook. ' },
              { kind: 'strong', text: 'Time-to-precautionary-action' },
              { kind: 'text', text: ': 4h 12m (target ≤ 6h).' },
            ],
          },
          {
            label: 'Action items',
            segments: [
              { kind: 'text', text: '3 / 3 completed · vendor-advisory dashboard · session-rotation playbook · quarterly tabletop exercise scheduled.' },
            ],
          },
        ],
      },
    },
  },

  /* Phase 16c — Security team card */
  securityTeamData: {
    members: [
      { initials: 'AO', gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', name: 'Aïsha Okafor', role: 'Incident lead · ops', statusLabel: 'Online', statusKey: 'online' },
      { initials: 'DF', gradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)', name: 'Dario Fonseca', role: 'Compliance owner', statusLabel: 'Online', statusKey: 'online' },
      { initials: 'RJ', gradient: 'linear-gradient(135deg, #5C8E5A, #2D4F2C)', name: 'Rohan Joshi', role: 'SRE on-call', statusLabel: 'On-call', statusKey: 'online' },
      { initials: 'LC', gradient: 'linear-gradient(135deg, #7A8AA4, #44516A)', name: 'Lin Chen', role: 'AppSec lead', statusLabel: 'Online', statusKey: 'online' },
      { initials: 'EK', gradient: 'linear-gradient(135deg, #B8860B, #8B5A00)', name: 'Erin Kowalski', role: 'Legal counsel', statusLabel: 'Away', statusKey: 'away' },
    ],
    footerText: 'War-room channel: ',
    footerHighlight: '#sec-si-0014',
  },
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

/* ================================================================== */
/*  Phase 16d — Populate detail data for all 8 non-canonical incidents */
/*                                                                      */
/*  Content depth scales by severity + status:                          */
/*    Critical/High → rich · Medium → moderate · Low → lighter          */
/*    New → early-stage · Investigating → mid · Mitigated → remediated  */
/*    Closed → full + published post-mortem                             */
/* ================================================================== */

/* ---- SI-2026-0013 — High · Investigating · Credential stuffing ---- */
{
  const p = PROFILES['si-2026-0013']!;
  p.subtitleSegments = [
    { kind: 'text', text: 'A credential-stuffing attack sourced from rotating residential proxy IPs targeted candidate login endpoints. ' },
    { kind: 'strong', text: '2.4 million attempts in 90 minutes' },
    { kind: 'text', text: ', resulting in ' },
    { kind: 'strong', text: '21 compromised candidate accounts' },
    { kind: 'text', text: '. Forced password rotations issued; no downstream PII exfiltration confirmed.' },
  ];
  p.heroStats = [
    { label: 'Compromised accounts', value: '21', valueColor: 'amber', meta: 'candidates · pwd rotated' },
    { label: 'Attack volume', value: '2.4M', meta: '90 min window' },
    { label: 'Detection method', value: 'Automated', meta: 'rate-limiter anomaly' },
    { label: 'Status', value: 'Investigating', valueColor: 'amber', meta: 'forensics in progress' },
  ];
  p.sections = [
    { id: 'notification', title: 'Notification status', meta: '21 affected users · all notified · password rotation enforced', placeholderMessage: '' },
    { id: 'description', title: 'Incident description', meta: 'credential-stuffing attack analysis · residential proxy attribution', placeholderMessage: '' },
    { id: 'actions', title: 'Actions taken', meta: '5 actions logged · 3 completed · 1 in progress · 1 pending', placeholderMessage: '' },
    { id: 'timeline', title: 'Timeline of events', meta: 'all UTC · 34 audit-log entries · active investigation', placeholderMessage: '' },
    { id: 'postmortem', title: 'Post-mortem', meta: 'due May 17 · pending investigation conclusion', placeholderMessage: '' },
  ];
  p.trackerSteps = [
    { label: 'Detection', meta: 'May 3 · 02:41 · automated rate-limiter alert', done: true, current: false },
    { label: 'Triage & severity', meta: 'May 3 · 02:58 · HIGH · Lin Chen paged', done: true, current: false },
    { label: 'Containment', meta: 'IP block + forced password rotation · in progress', done: false, current: true },
    { label: 'Notification', meta: '21 users notified · pending follow-up', done: false, current: false },
    { label: 'Eradication', meta: 'credential-source analysis · pending', done: false, current: false },
    { label: 'Recovery & monitoring', meta: '14-day enhanced monitoring · pending', done: false, current: false },
    { label: 'Post-mortem & closure', meta: 'due May 17', done: false, current: false },
  ];
  p.trackerProgress = { done: 2, total: 7 };
  p.quickStats = [
    { label: 'Incident lead', value: 'Lin Chen' },
    { label: 'Severity', value: 'High · P2', valueColor: 'danger' },
    { label: 'Compromised', value: '21 candidates', valueColor: 'amber' },
    { label: 'Attack source', value: 'Residential proxies' },
    { label: 'Attempt count', value: '2.4M in 90 min', valueColor: 'danger' },
    { label: 'Detection', value: 'Automated · rate-limiter' },
    { label: 'Audit log', value: '34 events →', href: '#', hasArrow: true },
  ];
  p.notificationData = {
    cards: [
      {
        variant: 'complete', iconKey: 'users',
        title: 'Affected users', subtitle: '21 candidates · pwd rotated',
        pillLabel: 'Complete', pillVariant: 'complete', progressPercent: 100,
        stats: [
          { label: 'Notified', value: '21 / 21' },
          { label: 'Method', value: 'Email + in-app' },
          { label: 'Pwd rotated', value: '21 / 21' },
          { label: 'Re-verified', value: '18 / 21' },
        ],
        footText: 'All affected users notified and passwords rotated',
        actionLabel: 'View details →', actionVariant: 'default', actionKey: 'view-user-notif',
      },
      {
        variant: 'default', iconKey: 'shield',
        title: 'Regulatory authorities', subtitle: 'Assessment pending',
        pillLabel: 'Pending', pillVariant: 'pending', progressPercent: 0,
        stats: [
          { label: 'GDPR', value: 'Not triggered' },
          { label: 'CCPA', value: 'Not triggered' },
          { label: 'Breach type', value: 'Credential stuffing' },
          { label: 'Data exposed', value: 'Passwords only (hashed)' },
        ],
        footText: 'Regulatory notification not required · no PII exfiltration',
        actionLabel: 'Review assessment →', actionVariant: 'default', actionKey: 'review-reg-assessment',
      },
    ],
  };
  p.descriptionData = {
    paragraphs: [
      { segments: [
        { kind: 'text', text: 'At ' },
        { kind: 'strong', text: 'May 3 · 02:41 UTC' },
        { kind: 'text', text: ', the automated rate-limiter detected anomalous login activity on the ' },
        { kind: 'code', text: '/api/v2/auth/candidate-login' },
        { kind: 'text', text: ' endpoint. Over a 90-minute window, ' },
        { kind: 'strong', text: '2.4 million authentication attempts' },
        { kind: 'text', text: ' were recorded from approximately 12,000 rotating residential proxy IPs attributed to a credential-stuffing botnet.' },
      ] },
      { segments: [
        { kind: 'text', text: 'Of the 2.4M attempts, ' },
        { kind: 'strong-amber', text: '21 candidate accounts were successfully compromised' },
        { kind: 'text', text: ' using credential pairs from a known third-party breach dump. No session tokens were issued — the attack was intercepted at the authentication layer before dashboard access. Forced password rotations were triggered for all 21 accounts within 18 minutes of detection.' },
      ] },
      { segments: [
        { kind: 'text', text: 'Forensic analysis confirms ' },
        { kind: 'strong-success', text: 'no downstream PII exfiltration' },
        { kind: 'text', text: '. The compromised credentials matched the candidate email + password pattern from the 2025 BreachDB-7 dump. Enhanced bot-detection (Turnstile challenge escalation) deployed at 03:15 UTC. Extended monitoring active for 14 days.' },
      ] },
    ],
  };
  p.actionsData = {
    actions: [
      {
        num: 1, status: 'completed', time: 'May 3 · 02:58',
        titleSegments: [{ kind: 'text', text: 'Rate-limiter escalation + IP block deployed' }],
        detailSegments: [{ kind: 'text', text: 'Escalated rate-limiter from 100/min to 10/min per IP. Blocked top 500 source IPs via Cloudflare edge rule. Attack volume dropped 94% within 4 minutes.' }],
        actor: { initials: 'SY', gradient: 'linear-gradient(135deg, #6E3FE0, #3D2B6F)', segments: [{ kind: 'text', text: 'by ' }, { kind: 'strong', text: 'System (auto-response)' }] },
      },
      {
        num: 2, status: 'completed', time: 'May 3 · 03:15',
        titleSegments: [{ kind: 'text', text: 'Forced password rotation for 21 compromised accounts' }],
        detailSegments: [{ kind: 'text', text: 'Identified compromised accounts via successful auth from flagged IPs. Invalidated sessions, forced password reset, sent notification email. All 21 users notified within 34 minutes.' }],
        actor: { initials: 'LC', gradient: 'linear-gradient(135deg, #7A8AA4, #44516A)', segments: [{ kind: 'text', text: 'by ' }, { kind: 'strong', text: 'Lin Chen (AppSec lead)' }] },
      },
      {
        num: 3, status: 'completed', time: 'May 3 · 04:02',
        titleSegments: [{ kind: 'text', text: 'Turnstile challenge escalation deployed' }],
        detailSegments: [{ kind: 'text', text: 'Upgraded Cloudflare Turnstile from managed to interactive challenge for all login endpoints. Reduced successful bot attempts to near-zero.' }],
        actor: { initials: 'RJ', gradient: 'linear-gradient(135deg, #5C8E5A, #2D4F2C)', segments: [{ kind: 'text', text: 'by ' }, { kind: 'strong', text: 'Rohan Joshi (SRE)' }] },
      },
      {
        num: 4, status: 'in-progress', time: 'May 4 · 10:00',
        titleSegments: [{ kind: 'text', text: 'Credential-source attribution + breach-dump cross-reference' }],
        detailSegments: [{ kind: 'text', text: 'Matching compromised credential pairs against known breach databases. Preliminary match: BreachDB-7 (2025). Full attribution report ETA May 6.' }],
        actor: { initials: 'LC', gradient: 'linear-gradient(135deg, #7A8AA4, #44516A)', segments: [{ kind: 'text', text: 'by ' }, { kind: 'strong', text: 'Lin Chen' }] },
      },
      {
        num: 5, status: 'pending', time: 'Pending · May 7',
        titleSegments: [{ kind: 'text', text: 'Enhanced monitoring review + Turnstile policy decision' }],
        detailSegments: [{ kind: 'text', text: 'Review 14-day monitoring window results. Decide whether to keep interactive Turnstile challenge permanently or revert to managed mode.' }],
        actor: { initials: 'AO', gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', segments: [{ kind: 'text', text: 'assigned to ' }, { kind: 'strong', text: 'Aïsha Okafor' }] },
      },
    ],
  };
  p.timelineData = {
    totalEvents: 34,
    events: [
      { time: 'May 4 · 10:00 UTC', actor: 'Lin Chen', title: 'began credential-source attribution', detail: 'Cross-referencing compromised pairs against BreachDB-7 and HaveIBeenPwned enterprise API. Preliminary match rate: 19/21 from single dump.', variant: 'default' },
      { time: 'May 3 · 04:02 UTC', actor: 'Rohan Joshi', title: 'deployed Turnstile challenge escalation', detail: 'Interactive challenge mode activated for /api/v2/auth/*. Bot success rate dropped to 0.01%.', variant: 'success' },
      { time: 'May 3 · 03:15 UTC', actor: 'Lin Chen', title: 'forced password rotation for 21 accounts', detail: 'All compromised sessions invalidated. Password reset links sent via email. 18 of 21 users completed re-verification within 6 hours.', variant: 'success' },
      { time: 'May 3 · 02:58 UTC', actor: 'Lin Chen', title: 'began triage · severity set HIGH', detail: 'Confirmed credential-stuffing pattern. 21 successful auths from flagged IPs. No session activity beyond auth — intercepted before dashboard access.', variant: 'warn' },
      { time: 'May 3 · 02:45 UTC', actor: 'System', actorIsSystem: true, title: 'auto-blocked top 500 source IPs', detail: 'Cloudflare edge rule deployed via automated response. Attack volume reduced 94%.', variant: 'success' },
      { time: 'May 3 · 02:41 UTC', actor: 'System', actorIsSystem: true, title: 'rate-limiter anomaly detected · alert fired', detail: '2.4M login attempts from 12K+ rotating residential IPs. Pattern consistent with credential-stuffing botnet. PagerDuty alert fired to AppSec on-call.', variant: 'danger' },
    ],
  };
  p.postMortemData = {
    primary: {
      status: 'pending', pillLabel: 'Pending · due May 17',
      pendingLines: ['Post-mortem will be drafted after investigation concludes.', 'Expected to cover: attack vector analysis, credential-source attribution, bot-detection effectiveness, and enhanced monitoring recommendations.'],
      ownerSegments: [{ kind: 'text', text: 'Owner: ' }, { kind: 'strong', text: 'Lin Chen' }, { kind: 'text', text: ' · review by Aïsha + Rohan.' }],
      buttonLabel: 'Open post-mortem template',
    },
  };
  p.securityTeamData = {
    members: [
      { initials: 'LC', gradient: 'linear-gradient(135deg, #7A8AA4, #44516A)', name: 'Lin Chen', role: 'Incident lead · AppSec', statusLabel: 'Online', statusKey: 'online' },
      { initials: 'AO', gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', name: 'Aïsha Okafor', role: 'Ops oversight', statusLabel: 'Online', statusKey: 'online' },
      { initials: 'RJ', gradient: 'linear-gradient(135deg, #5C8E5A, #2D4F2C)', name: 'Rohan Joshi', role: 'SRE on-call', statusLabel: 'On-call', statusKey: 'online' },
      { initials: 'DK', gradient: 'linear-gradient(135deg, #6EB5D0, #3A7A99)', name: 'Daniel Kovács', role: 'Bot-detection eng', statusLabel: 'Away', statusKey: 'away' },
    ],
    footerText: 'Channel: ',
    footerHighlight: '#sec-si-0013',
  };
}

/* ---- SI-2026-0012 — High · Mitigated · Unauthorized access -------- */
{
  const p = PROFILES['si-2026-0012']!;
  p.subtitleSegments = [
    { kind: 'text', text: 'A former contractor\'s read-only API token was found active 12 days after offboarding. Token accessed the analytics dashboard ' },
    { kind: 'strong', text: '4 times' },
    { kind: 'text', text: ' — no PII or write operations performed. Token revoked; offboarding checklist updated to include API-token sweep.' },
  ];
  p.heroStats = [
    { label: 'Data exposed', value: '0 records', meta: 'analytics only · no PII' },
    { label: 'Token accesses', value: '4', meta: 'read-only · dashboard views' },
    { label: 'Detection method', value: 'Audit review', meta: 'quarterly token audit' },
    { label: 'Status', value: 'Mitigated', valueColor: 'success', meta: 'token revoked · SOP updated' },
  ];
  p.sections = [
    { id: 'notification', title: 'Notification status', meta: 'no user impact · internal notification only', placeholderMessage: '' },
    { id: 'description', title: 'Incident description', meta: 'unauthorized token usage · offboarding gap analysis', placeholderMessage: '' },
    { id: 'actions', title: 'Actions taken', meta: '4 actions logged · 4 completed · all audit-stamped', placeholderMessage: '' },
    { id: 'timeline', title: 'Timeline of events', meta: 'all UTC · 12 audit-log entries · mitigated', placeholderMessage: '' },
    { id: 'postmortem', title: 'Post-mortem', meta: 'due May 14 · pending', placeholderMessage: '' },
  ];
  p.trackerSteps = [
    { label: 'Detection', meta: 'Apr 30 · 09:08 · quarterly audit-log review', done: true, current: false },
    { label: 'Triage & severity', meta: 'Apr 30 · 09:22 · HIGH · Aïsha reviewed', done: true, current: false },
    { label: 'Containment', meta: 'Apr 30 · 09:31 · token revoked', done: true, current: false },
    { label: 'Notification', meta: 'internal only · contractor HR notified', done: true, current: false },
    { label: 'Eradication', meta: 'offboarding checklist updated · pending verification', done: false, current: true },
    { label: 'Recovery & monitoring', meta: '30-day token audit sweep · pending', done: false, current: false },
    { label: 'Post-mortem & closure', meta: 'due May 14', done: false, current: false },
  ];
  p.trackerProgress = { done: 4, total: 7 };
  p.quickStats = [
    { label: 'Incident lead', value: 'Aïsha Okafor' },
    { label: 'Severity', value: 'High · P2', valueColor: 'danger' },
    { label: 'Data exposed', value: 'None (analytics only)' },
    { label: 'Token type', value: 'Read-only API' },
    { label: 'Access count', value: '4 requests' },
    { label: 'Detection', value: 'Manual audit · quarterly' },
    { label: 'Audit log', value: '12 events →', href: '#', hasArrow: true },
  ];
  p.notificationData = {
    cards: [
      {
        variant: 'complete', iconKey: 'users',
        title: 'Affected users', subtitle: 'Not applicable',
        pillLabel: 'Complete', pillVariant: 'complete', progressPercent: 100,
        stats: [
          { label: 'Users impacted', value: '0' },
          { label: 'PII accessed', value: 'None' },
          { label: 'Data class', value: 'Analytics only' },
          { label: 'Action required', value: 'None' },
        ],
        footText: 'No user notification required · no PII exposure',
        actionLabel: 'View assessment →', actionVariant: 'default', actionKey: 'view-user-assessment',
      },
      {
        variant: 'complete', iconKey: 'shield',
        title: 'Regulatory authorities', subtitle: 'Not triggered',
        pillLabel: 'Complete', pillVariant: 'complete', progressPercent: 100,
        stats: [
          { label: 'GDPR', value: 'Not triggered' },
          { label: 'CCPA', value: 'Not triggered' },
          { label: 'Breach type', value: 'Unauthorized access' },
          { label: 'Risk level', value: 'Low · no PII' },
        ],
        footText: 'No regulatory notification required',
        actionLabel: 'View assessment →', actionVariant: 'default', actionKey: 'review-reg-status',
      },
    ],
  };
  p.descriptionData = {
    paragraphs: [
      { segments: [
        { kind: 'text', text: 'During a quarterly API token audit on ' },
        { kind: 'strong', text: 'Apr 30 · 09:08 UTC' },
        { kind: 'text', text: ', a read-only bearer token assigned to former contractor ' },
        { kind: 'strong', text: 'Marcus Webb' },
        { kind: 'text', text: ' (offboarded Apr 18) was found with 4 successful requests post-departure. The token accessed the ' },
        { kind: 'code', text: '/api/v1/analytics/dashboard' },
        { kind: 'text', text: ' endpoint — no PII, no write operations.' },
      ] },
      { segments: [
        { kind: 'text', text: 'Root cause: the offboarding checklist did not include API-token revocation as a discrete step. HR deactivated SSO and email, but the bearer token (issued via developer portal) was independently valid. ' },
        { kind: 'strong-amber', text: 'Gap identified in offboarding SOP' },
        { kind: 'text', text: '.' },
      ] },
      { segments: [
        { kind: 'text', text: 'Token revoked at ' },
        { kind: 'strong', text: '09:31 UTC' },
        { kind: 'text', text: ' (23 minutes after detection). Offboarding checklist updated. ' },
        { kind: 'strong-success', text: 'No data exfiltration · no user impact' },
        { kind: 'text', text: '. 30-day audit of all contractor tokens initiated.' },
      ] },
    ],
  };
  p.actionsData = {
    actions: [
      {
        num: 1, status: 'completed', time: 'Apr 30 · 09:31',
        titleSegments: [{ kind: 'text', text: 'Revoked contractor API token' }],
        detailSegments: [{ kind: 'text', text: 'Bearer token invalidated via developer portal. Confirmed no active sessions. All 4 historical requests were read-only analytics dashboard views.' }],
        actor: { initials: 'AO', gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', segments: [{ kind: 'text', text: 'by ' }, { kind: 'strong', text: 'Aïsha Okafor' }] },
      },
      {
        num: 2, status: 'completed', time: 'Apr 30 · 11:00',
        titleSegments: [{ kind: 'text', text: 'Forensic review of token usage history' }],
        detailSegments: [{ kind: 'text', text: '4 GET requests to /analytics/dashboard between Apr 19-28. No attempts to access PII endpoints, no POST/PUT/DELETE. Clean forensic record.' }],
        actor: { initials: 'LC', gradient: 'linear-gradient(135deg, #7A8AA4, #44516A)', segments: [{ kind: 'text', text: 'by ' }, { kind: 'strong', text: 'Lin Chen' }] },
      },
      {
        num: 3, status: 'completed', time: 'May 1 · 09:00',
        titleSegments: [{ kind: 'text', text: 'Updated offboarding checklist with API-token sweep' }],
        detailSegments: [{ kind: 'text', text: 'Added "Revoke API tokens (developer portal)" as mandatory step in contractor and employee offboarding runbook. HR and IT acknowledged update.' }],
        actor: { initials: 'AO', gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', segments: [{ kind: 'text', text: 'by ' }, { kind: 'strong', text: 'Aïsha Okafor' }] },
      },
      {
        num: 4, status: 'completed', time: 'May 1 · 14:00',
        titleSegments: [{ kind: 'text', text: 'Initiated 30-day contractor token audit sweep' }],
        detailSegments: [{ kind: 'text', text: 'Scanning all active API tokens against HR offboarding records. 3 additional stale tokens found and revoked (all inactive). Sweep continues for 30 days.' }],
        actor: { initials: 'LC', gradient: 'linear-gradient(135deg, #7A8AA4, #44516A)', segments: [{ kind: 'text', text: 'by ' }, { kind: 'strong', text: 'Lin Chen' }] },
      },
    ],
  };
  p.timelineData = {
    totalEvents: 12,
    events: [
      { time: 'May 1 · 14:00 UTC', actor: 'Lin Chen', title: '30-day token audit sweep initiated', detail: 'Scanning all active tokens against HR records. 3 additional stale tokens found and revoked (all inactive, no suspicious access).', variant: 'success' },
      { time: 'May 1 · 09:00 UTC', actor: 'Aïsha Okafor', title: 'offboarding checklist updated', detail: 'Added API-token revocation as mandatory offboarding step. HR and IT acknowledged. Effective immediately.', variant: 'success' },
      { time: 'Apr 30 · 11:00 UTC', actor: 'Lin Chen', title: 'forensic review complete', detail: '4 GET requests to analytics dashboard. No PII access. No write operations. Token usage consistent with dashboard curiosity, not malicious intent.', variant: 'success' },
      { time: 'Apr 30 · 09:31 UTC', actor: 'Aïsha Okafor', title: 'contractor API token revoked', detail: 'Token invalidated. Confirmed no active sessions. Contractor offboarded Apr 18 — token survived due to SOP gap.', variant: 'success' },
      { time: 'Apr 30 · 09:22 UTC', actor: 'Aïsha Okafor', title: 'triage complete · severity HIGH', detail: 'Unauthorized access confirmed. No PII exposure but token-type vulnerability elevated to HIGH due to systemic policy gap.', variant: 'warn' },
      { time: 'Apr 30 · 09:08 UTC', actor: 'Aïsha Okafor', title: 'stale token discovered in quarterly audit', detail: 'Quarterly API token review flagged active token for offboarded contractor. Last used Apr 28. Token issued Feb 12 via developer portal.', variant: 'warn' },
    ],
  };
  p.postMortemData = {
    primary: {
      status: 'pending', pillLabel: 'Pending · due May 14',
      pendingLines: ['Post-mortem will cover the offboarding SOP gap.', 'Focus: token lifecycle management, automated offboarding hooks, and contractor access review cadence.'],
      ownerSegments: [{ kind: 'text', text: 'Owner: ' }, { kind: 'strong', text: 'Aïsha Okafor' }, { kind: 'text', text: ' · review by Lin Chen + HR.' }],
      buttonLabel: 'Open post-mortem template',
    },
  };
  p.securityTeamData = {
    members: [
      { initials: 'AO', gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', name: 'Aïsha Okafor', role: 'Incident lead · ops', statusLabel: 'Online', statusKey: 'online' },
      { initials: 'LC', gradient: 'linear-gradient(135deg, #7A8AA4, #44516A)', name: 'Lin Chen', role: 'AppSec lead', statusLabel: 'Online', statusKey: 'online' },
      { initials: 'RJ', gradient: 'linear-gradient(135deg, #5C8E5A, #2D4F2C)', name: 'Rohan Joshi', role: 'SRE on-call', statusLabel: 'Away', statusKey: 'away' },
    ],
    footerText: 'Channel: ',
    footerHighlight: '#sec-si-0012',
  };
}

/* ---- SI-2026-0011 — Medium · Mitigated · Malware (npm) ------------ */
{
  const p = PROFILES['si-2026-0011']!;
  p.subtitleSegments = [
    { kind: 'text', text: 'A compromised npm package ' },
    { kind: 'strong', text: 'colors-pkg-spoof@1.4.4' },
    { kind: 'text', text: ' was pulled into the staging CI pipeline via a transitive dependency update. The package contained an obfuscated post-install script. ' },
    { kind: 'strong', text: 'Never reached production' },
    { kind: 'text', text: ' — caught in staging build. Dependency pinned and advisory filed.' },
  ];
  p.heroStats = [
    { label: 'Production impact', value: 'None', meta: 'contained pre-prod' },
    { label: 'Affected pipeline', value: 'Staging CI', meta: 'build #4817' },
    { label: 'Detection method', value: 'Snyk scan', meta: 'automated · pre-deploy' },
    { label: 'Status', value: 'Mitigated', valueColor: 'success', meta: 'dep pinned · advisory filed' },
  ];
  p.sections = [
    { id: 'notification', title: 'Notification status', meta: 'no user impact · internal engineering notification only', placeholderMessage: '' },
    { id: 'description', title: 'Incident description', meta: 'supply-chain compromise · npm dependency analysis', placeholderMessage: '' },
    { id: 'actions', title: 'Actions taken', meta: '5 actions logged · 5 completed · all audit-stamped', placeholderMessage: '' },
    { id: 'timeline', title: 'Timeline of events', meta: 'all UTC · 18 audit-log entries · mitigated', placeholderMessage: '' },
    { id: 'postmortem', title: 'Post-mortem', meta: 'due May 10 · pending', placeholderMessage: '' },
  ];
  p.trackerSteps = [
    { label: 'Detection', meta: 'Apr 26 · 16:52 · Snyk pre-deploy scan', done: true, current: false },
    { label: 'Triage & severity', meta: 'Apr 26 · 17:10 · MEDIUM · Lin Chen reviewed', done: true, current: false },
    { label: 'Containment', meta: 'Apr 26 · 17:22 · staging build rolled back', done: true, current: false },
    { label: 'Notification', meta: 'internal eng team · Slack advisory posted', done: true, current: false },
    { label: 'Eradication', meta: 'dependency pinned + lockfile audited', done: true, current: true },
    { label: 'Recovery & monitoring', meta: '7-day Snyk enhanced scanning · active', done: false, current: false },
    { label: 'Post-mortem & closure', meta: 'due May 10', done: false, current: false },
  ];
  p.trackerProgress = { done: 5, total: 7 };
  p.quickStats = [
    { label: 'Incident lead', value: 'Lin Chen' },
    { label: 'Severity', value: 'Medium · P3', valueColor: 'amber' },
    { label: 'Production impact', value: 'None' },
    { label: 'Malicious package', value: 'colors-pkg-spoof@1.4.4' },
    { label: 'Detection', value: 'Snyk · pre-deploy' },
    { label: 'Audit log', value: '18 events →', href: '#', hasArrow: true },
  ];
  p.notificationData = {
    cards: [
      {
        variant: 'complete', iconKey: 'users',
        title: 'Affected users', subtitle: 'Not applicable',
        pillLabel: 'Complete', pillVariant: 'complete', progressPercent: 100,
        stats: [
          { label: 'Users impacted', value: '0' },
          { label: 'Production', value: 'Not reached' },
          { label: 'Environment', value: 'Staging only' },
          { label: 'Data exposure', value: 'None' },
        ],
        footText: 'No user notification required · contained pre-production',
        actionLabel: 'View assessment →', actionVariant: 'default', actionKey: 'view-assessment',
      },
      {
        variant: 'complete', iconKey: 'shield',
        title: 'Internal engineering', subtitle: 'Team notified',
        pillLabel: 'Complete', pillVariant: 'complete', progressPercent: 100,
        stats: [
          { label: 'Eng team', value: 'Notified via Slack' },
          { label: 'Advisory', value: 'npm-SA-2026-041' },
          { label: 'Lockfile', value: 'Audited + pinned' },
          { label: 'Snyk rule', value: 'Block rule added' },
        ],
        footText: 'Engineering advisory distributed · dependency pinned',
        actionLabel: 'View advisory →', actionVariant: 'default', actionKey: 'view-advisory',
      },
    ],
  };
  p.descriptionData = {
    paragraphs: [
      { segments: [
        { kind: 'text', text: 'At ' },
        { kind: 'strong', text: 'Apr 26 · 16:52 UTC' },
        { kind: 'text', text: ', a Snyk pre-deploy scan on staging build #4817 flagged the transitive dependency ' },
        { kind: 'code', text: 'colors-pkg-spoof@1.4.4' },
        { kind: 'text', text: ' as containing a malicious post-install script. The package was pulled in via ' },
        { kind: 'code', text: 'ui-toolkit → color-utils → colors-pkg-spoof' },
        { kind: 'text', text: ' (typosquat of the legitimate ' },
        { kind: 'code', text: 'colors' },
        { kind: 'text', text: ' package).' },
      ] },
      { segments: [
        { kind: 'text', text: 'The obfuscated script attempted to exfiltrate ' },
        { kind: 'code', text: 'process.env' },
        { kind: 'text', text: ' to an external endpoint. ' },
        { kind: 'strong-success', text: 'Staging environment has no production secrets' },
        { kind: 'text', text: ' — CI uses isolated credential stores. The build was halted before deploy and the dependency tree reverted within 30 minutes.' },
      ] },
      { segments: [
        { kind: 'text', text: 'Remediation: ' },
        { kind: 'code', text: 'color-utils' },
        { kind: 'text', text: ' pinned to a safe version, ' },
        { kind: 'code', text: 'package-lock.json' },
        { kind: 'text', text: ' fully audited, and Snyk block rule created for the malicious package. Advisory filed with npm security team. No production impact.' },
      ] },
    ],
  };
  p.actionsData = {
    actions: [
      {
        num: 1, status: 'completed', time: 'Apr 26 · 17:22',
        titleSegments: [{ kind: 'text', text: 'Staging build rolled back · pipeline halted' }],
        detailSegments: [{ kind: 'text', text: 'Build #4817 terminated. Staging deployment reverted to previous green build #4816. CI pipeline gated pending dependency review.' }],
        actor: { initials: 'SY', gradient: 'linear-gradient(135deg, #6E3FE0, #3D2B6F)', segments: [{ kind: 'text', text: 'by ' }, { kind: 'strong', text: 'System (Snyk auto-block)' }] },
      },
      {
        num: 2, status: 'completed', time: 'Apr 26 · 17:45',
        titleSegments: [{ kind: 'text', text: 'Dependency tree analyzed · malicious package identified' }],
        detailSegments: [{ kind: 'text', text: 'Traced transitive path: ui-toolkit → color-utils@2.1.0 → colors-pkg-spoof@1.4.4. Post-install script decoded: env exfiltration to external C2 endpoint (now reported).' }],
        actor: { initials: 'LC', gradient: 'linear-gradient(135deg, #7A8AA4, #44516A)', segments: [{ kind: 'text', text: 'by ' }, { kind: 'strong', text: 'Lin Chen' }] },
      },
      {
        num: 3, status: 'completed', time: 'Apr 26 · 18:30',
        titleSegments: [{ kind: 'text', text: 'Dependency pinned + lockfile audited' }],
        detailSegments: [{ kind: 'text', text: 'color-utils pinned to 2.0.9 (pre-malicious). Full lockfile audit: no other typosquat dependencies found. Snyk block rule created for colors-pkg-spoof.' }],
        actor: { initials: 'LC', gradient: 'linear-gradient(135deg, #7A8AA4, #44516A)', segments: [{ kind: 'text', text: 'by ' }, { kind: 'strong', text: 'Lin Chen' }] },
      },
      {
        num: 4, status: 'completed', time: 'Apr 27 · 09:00',
        titleSegments: [{ kind: 'text', text: 'Advisory filed with npm security team' }],
        detailSegments: [{ kind: 'text', text: 'Reported colors-pkg-spoof to npm via abuse form. Package unpublished within 4 hours. Advisory SA-2026-041 assigned.' }],
        actor: { initials: 'LC', gradient: 'linear-gradient(135deg, #7A8AA4, #44516A)', segments: [{ kind: 'text', text: 'by ' }, { kind: 'strong', text: 'Lin Chen' }] },
      },
      {
        num: 5, status: 'completed', time: 'Apr 27 · 10:00',
        titleSegments: [{ kind: 'text', text: 'Engineering advisory distributed · Snyk enhanced scanning enabled' }],
        detailSegments: [{ kind: 'text', text: 'Posted supply-chain advisory to #eng-security Slack channel. Enabled 7-day enhanced Snyk scanning with typosquat detection for all CI pipelines.' }],
        actor: { initials: 'AO', gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', segments: [{ kind: 'text', text: 'by ' }, { kind: 'strong', text: 'Aïsha Okafor' }] },
      },
    ],
  };
  p.timelineData = {
    totalEvents: 18,
    events: [
      { time: 'Apr 27 · 10:00 UTC', actor: 'Aïsha Okafor', title: 'engineering advisory distributed', detail: 'Posted to #eng-security. Snyk enhanced scanning enabled for all CI pipelines with typosquat detection.', variant: 'success' },
      { time: 'Apr 27 · 09:00 UTC', actor: 'Lin Chen', title: 'advisory filed with npm security', detail: 'Package colors-pkg-spoof reported. Unpublished within 4 hours. Advisory SA-2026-041 assigned.', variant: 'success' },
      { time: 'Apr 26 · 18:30 UTC', actor: 'Lin Chen', title: 'dependency pinned + lockfile audited', detail: 'color-utils pinned to safe version. Full lockfile audit clean. Snyk block rule created.', variant: 'success' },
      { time: 'Apr 26 · 17:45 UTC', actor: 'Lin Chen', title: 'malicious package identified · dependency tree traced', detail: 'Transitive path: ui-toolkit → color-utils@2.1.0 → colors-pkg-spoof@1.4.4. Post-install script: env exfiltration attempt.', variant: 'warn' },
      { time: 'Apr 26 · 16:52 UTC', actor: 'System', actorIsSystem: true, title: 'Snyk pre-deploy scan flagged malicious dependency', detail: 'Build #4817 halted. colors-pkg-spoof@1.4.4 identified as typosquat with obfuscated post-install script. Auto-blocked.', variant: 'danger' },
    ],
  };
  p.postMortemData = {
    primary: {
      status: 'pending', pillLabel: 'Pending · due May 10',
      pendingLines: ['Post-mortem will cover supply-chain security controls.', 'Focus: dependency pinning policy, Snyk configuration, and CI isolation architecture review.'],
      ownerSegments: [{ kind: 'text', text: 'Owner: ' }, { kind: 'strong', text: 'Lin Chen' }, { kind: 'text', text: ' · review by Aïsha + DevOps lead.' }],
      buttonLabel: 'Open post-mortem template',
    },
  };
  p.securityTeamData = {
    members: [
      { initials: 'LC', gradient: 'linear-gradient(135deg, #7A8AA4, #44516A)', name: 'Lin Chen', role: 'Incident lead · AppSec', statusLabel: 'Online', statusKey: 'online' },
      { initials: 'AO', gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', name: 'Aïsha Okafor', role: 'Ops oversight', statusLabel: 'Away', statusKey: 'away' },
      { initials: 'RJ', gradient: 'linear-gradient(135deg, #5C8E5A, #2D4F2C)', name: 'Rohan Joshi', role: 'SRE · CI pipeline', statusLabel: 'Away', statusKey: 'away' },
    ],
    footerText: 'Channel: ',
    footerHighlight: '#sec-si-0011',
  };
}

/* ---- SI-2026-0010 — Medium · Investigating · Phishing ------------- */
{
  const p = PROFILES['si-2026-0010']!;
  p.subtitleSegments = [
    { kind: 'text', text: 'A phishing campaign targeting Atlas employees used an "HR onboarding" lure with a cloned login page. ' },
    { kind: 'strong', text: '7 employees received the email' },
    { kind: 'text', text: ' — 0 clicked, 0 credentials submitted. Phishing domain blocked; employee advisory issued.' },
  ];
  p.heroStats = [
    { label: 'Employees targeted', value: '7', meta: 'engineering + ops teams' },
    { label: 'Clicks / submits', value: '0 / 0', meta: 'no credentials exposed' },
    { label: 'Detection method', value: 'Employee report', meta: 'manual · suspicious-email flow' },
    { label: 'Status', value: 'Investigating', valueColor: 'amber', meta: 'domain attribution pending' },
  ];
  p.sections = [
    { id: 'notification', title: 'Notification status', meta: 'all 7 employees notified · company-wide advisory issued', placeholderMessage: '' },
    { id: 'description', title: 'Incident description', meta: 'phishing campaign analysis · HR onboarding lure', placeholderMessage: '' },
    { id: 'actions', title: 'Actions taken', meta: '4 actions logged · 2 completed · 1 in progress · 1 pending', placeholderMessage: '' },
    { id: 'timeline', title: 'Timeline of events', meta: 'all UTC · 14 audit-log entries · investigation active', placeholderMessage: '' },
    { id: 'postmortem', title: 'Post-mortem', meta: 'due May 8 · pending investigation', placeholderMessage: '' },
  ];
  p.trackerSteps = [
    { label: 'Detection', meta: 'Apr 24 · 11:30 · employee reported suspicious email', done: true, current: false },
    { label: 'Triage & severity', meta: 'Apr 24 · 11:52 · MEDIUM · Sarah Reyes reviewed', done: true, current: false },
    { label: 'Containment', meta: 'phishing domain blocked · email filter rules deployed', done: false, current: true },
    { label: 'Notification', meta: '7 employees + company-wide advisory', done: false, current: false },
    { label: 'Eradication', meta: 'domain takedown request · pending', done: false, current: false },
    { label: 'Recovery & monitoring', meta: 'email filter enhancement · pending', done: false, current: false },
    { label: 'Post-mortem & closure', meta: 'due May 8', done: false, current: false },
  ];
  p.trackerProgress = { done: 2, total: 7 };
  p.quickStats = [
    { label: 'Incident lead', value: 'Sarah Reyes' },
    { label: 'Severity', value: 'Medium · P3', valueColor: 'amber' },
    { label: 'Employees targeted', value: '7' },
    { label: 'Credentials exposed', value: 'None' },
    { label: 'Phishing domain', value: 'atlas-hr-onboard[.]com' },
    { label: 'Detection', value: 'Employee report' },
    { label: 'Audit log', value: '14 events →', href: '#', hasArrow: true },
  ];
  p.notificationData = {
    cards: [
      {
        variant: 'complete', iconKey: 'users',
        title: 'Targeted employees', subtitle: '7 recipients · all advised',
        pillLabel: 'Complete', pillVariant: 'complete', progressPercent: 100,
        stats: [
          { label: 'Notified', value: '7 / 7' },
          { label: 'Clicked link', value: '0' },
          { label: 'Submitted creds', value: '0' },
          { label: 'Training reminder', value: 'Sent' },
        ],
        footText: 'All targeted employees individually notified · no credentials exposed',
        actionLabel: 'View details →', actionVariant: 'default', actionKey: 'view-employee-notif',
      },
      {
        variant: 'complete', iconKey: 'shield',
        title: 'Company-wide advisory', subtitle: 'All-hands phishing alert',
        pillLabel: 'Complete', pillVariant: 'complete', progressPercent: 100,
        stats: [
          { label: 'Advisory', value: 'Posted to #general' },
          { label: 'Training', value: 'Reminder issued' },
          { label: 'Domain', value: 'Blocked + reported' },
          { label: 'Regulatory', value: 'Not triggered' },
        ],
        footText: 'Company-wide phishing advisory distributed',
        actionLabel: 'View advisory →', actionVariant: 'default', actionKey: 'view-phishing-advisory',
      },
    ],
  };
  p.descriptionData = {
    paragraphs: [
      { segments: [
        { kind: 'text', text: 'On ' },
        { kind: 'strong', text: 'Apr 24 · 11:30 UTC' },
        { kind: 'text', text: ', an Atlas engineer reported a suspicious email with subject line "Action Required: Complete Your HR Onboarding." The email contained a link to ' },
        { kind: 'code', text: 'atlas-hr-onboard[.]com' },
        { kind: 'text', text: ' — a cloned Atlas login page hosted on a newly registered domain. ' },
        { kind: 'strong', text: '7 employees across engineering and ops teams' },
        { kind: 'text', text: ' received the same email.' },
      ] },
      { segments: [
        { kind: 'strong-success', text: 'Zero employees clicked the link and zero credentials were submitted' },
        { kind: 'text', text: '. The phishing domain was registered 2 hours before the campaign and used a Let\'s Encrypt certificate. Email headers indicate the campaign originated from a compromised SMTP relay. Domain blocked in email gateway + DNS-level filter within 22 minutes of report.' },
      ] },
      { segments: [
        { kind: 'text', text: 'Domain takedown request submitted to registrar. Employee training reminder issued company-wide. Email filter rules updated to catch similar "HR onboarding" lure patterns. Investigation continues to attribute the campaign source.' },
      ] },
    ],
  };
  p.actionsData = {
    actions: [
      {
        num: 1, status: 'completed', time: 'Apr 24 · 11:52',
        titleSegments: [{ kind: 'text', text: 'Phishing domain blocked + email filter rule deployed' }],
        detailSegments: [{ kind: 'text', text: 'atlas-hr-onboard[.]com added to email gateway block list and DNS deny-list. Inbound filter rule created for similar "HR onboarding" subject patterns.' }],
        actor: { initials: 'SR', gradient: 'linear-gradient(135deg, #E08A6E, #A0523C)', segments: [{ kind: 'text', text: 'by ' }, { kind: 'strong', text: 'Sarah Reyes' }] },
      },
      {
        num: 2, status: 'completed', time: 'Apr 24 · 13:00',
        titleSegments: [{ kind: 'text', text: 'Employee notifications sent + company-wide advisory posted' }],
        detailSegments: [{ kind: 'text', text: 'All 7 targeted employees individually notified with incident details. Company-wide phishing advisory posted to #general Slack with screenshots and indicators of compromise.' }],
        actor: { initials: 'AO', gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', segments: [{ kind: 'text', text: 'by ' }, { kind: 'strong', text: 'Aïsha Okafor' }] },
      },
      {
        num: 3, status: 'in-progress', time: 'Apr 25 · 09:00',
        titleSegments: [{ kind: 'text', text: 'Domain takedown request + SMTP relay attribution' }],
        detailSegments: [{ kind: 'text', text: 'Takedown request submitted to domain registrar. Analyzing email headers to identify compromised SMTP relay. Coordinating with abuse team at relay provider.' }],
        actor: { initials: 'SR', gradient: 'linear-gradient(135deg, #E08A6E, #A0523C)', segments: [{ kind: 'text', text: 'by ' }, { kind: 'strong', text: 'Sarah Reyes' }] },
      },
      {
        num: 4, status: 'pending', time: 'Pending · May 1',
        titleSegments: [{ kind: 'text', text: 'Phishing simulation follow-up + training metrics review' }],
        detailSegments: [{ kind: 'text', text: 'Schedule follow-up phishing simulation to test employee awareness. Review training completion metrics and update anti-phishing runbook.' }],
        actor: { initials: 'AO', gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', segments: [{ kind: 'text', text: 'assigned to ' }, { kind: 'strong', text: 'Aïsha Okafor' }] },
      },
    ],
  };
  p.timelineData = {
    totalEvents: 14,
    events: [
      { time: 'Apr 25 · 09:00 UTC', actor: 'Sarah Reyes', title: 'domain takedown request submitted', detail: 'Takedown filed with registrar. SMTP relay abuse report sent. Attribution analysis ongoing.', variant: 'default' },
      { time: 'Apr 24 · 13:00 UTC', actor: 'Aïsha Okafor', title: 'company-wide phishing advisory posted', detail: 'Advisory posted to #general with IoCs: domain, sender address, subject pattern. Training reminder included.', variant: 'success' },
      { time: 'Apr 24 · 11:52 UTC', actor: 'Sarah Reyes', title: 'phishing domain blocked · severity MEDIUM', detail: 'Domain added to email gateway + DNS deny-list. Filter rules deployed. Severity set MEDIUM (no credentials exposed).', variant: 'success' },
      { time: 'Apr 24 · 11:40 UTC', actor: 'Sarah Reyes', title: 'confirmed phishing campaign · 7 recipients identified', detail: 'Email log search found 7 recipients. Cloned login page confirmed at atlas-hr-onboard[.]com. Domain registered 2h before campaign.', variant: 'warn' },
      { time: 'Apr 24 · 11:30 UTC', actor: 'Employee', title: 'suspicious email reported via #security-reports', detail: 'Engineer flagged email with subject "Action Required: Complete Your HR Onboarding." Link pointed to atlas-hr-onboard[.]com.', variant: 'warn' },
    ],
  };
  p.postMortemData = {
    primary: {
      status: 'pending', pillLabel: 'Pending · due May 8',
      pendingLines: ['Post-mortem will cover phishing campaign analysis.', 'Focus: employee detection effectiveness, email filter gaps, and training program enhancements.'],
      ownerSegments: [{ kind: 'text', text: 'Owner: ' }, { kind: 'strong', text: 'Sarah Reyes' }, { kind: 'text', text: ' · review by Aïsha + HR.' }],
      buttonLabel: 'Open post-mortem template',
    },
  };
  p.securityTeamData = {
    members: [
      { initials: 'SR', gradient: 'linear-gradient(135deg, #E08A6E, #A0523C)', name: 'Sarah Reyes', role: 'Incident lead', statusLabel: 'Online', statusKey: 'online' },
      { initials: 'AO', gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', name: 'Aïsha Okafor', role: 'Ops oversight', statusLabel: 'Online', statusKey: 'online' },
      { initials: 'DK', gradient: 'linear-gradient(135deg, #6EB5D0, #3A7A99)', name: 'Daniel Kovács', role: 'Email security', statusLabel: 'Away', statusKey: 'away' },
    ],
    footerText: 'Channel: ',
    footerHighlight: '#sec-si-0010',
  };
}

/* ---- SI-2026-0009 — Low · Mitigated · Brute-force login ----------- */
{
  const p = PROFILES['si-2026-0009']!;
  p.subtitleSegments = [
    { kind: 'text', text: 'Brute-force login attempts detected on client ' },
    { kind: 'strong', text: 'cl-167 (Vorona)' },
    { kind: 'text', text: ' admin proxy. 82 attempts auto-blocked by rate limiter. IP added to deny-list. Cross-references ' },
    { kind: 'link', text: 'fraud alert FA-2026-0042', href: '/admin/trust-safety/fraud-abuse/fa-2026-0042' },
    { kind: 'text', text: '.' },
  ];
  p.heroStats = [
    { label: 'Login attempts', value: '82', meta: 'all blocked · rate limiter' },
    { label: 'Accounts compromised', value: '0', meta: 'auto-mitigated' },
    { label: 'Detection method', value: 'Automated', meta: 'rate-limiter · threshold' },
    { label: 'Status', value: 'Mitigated', valueColor: 'success', meta: 'IP denied · monitoring' },
  ];
  p.sections = [
    { id: 'notification', title: 'Notification status', meta: 'no user impact · internal notification only', placeholderMessage: '' },
    { id: 'description', title: 'Incident description', meta: 'brute-force attempt · auto-mitigated', placeholderMessage: '' },
    { id: 'actions', title: 'Actions taken', meta: '3 actions logged · 3 completed · all auto-stamped', placeholderMessage: '' },
    { id: 'timeline', title: 'Timeline of events', meta: 'all UTC · 8 audit-log entries · mitigated', placeholderMessage: '' },
    { id: 'postmortem', title: 'Post-mortem', meta: 'due May 6 · pending', placeholderMessage: '' },
  ];
  p.trackerSteps = [
    { label: 'Detection', meta: 'Apr 22 · 03:12 · automated rate-limiter alert', done: true, current: false },
    { label: 'Triage & severity', meta: 'Apr 22 · 03:18 · LOW · auto-classified', done: true, current: false },
    { label: 'Containment', meta: 'Apr 22 · 03:12 · auto-blocked · IP denied', done: true, current: false },
    { label: 'Notification', meta: 'internal only · no user impact', done: true, current: false },
    { label: 'Eradication', meta: 'IP permanently deny-listed', done: true, current: true },
    { label: 'Recovery & monitoring', meta: '7-day monitoring · active', done: false, current: false },
    { label: 'Post-mortem & closure', meta: 'due May 6', done: false, current: false },
  ];
  p.trackerProgress = { done: 5, total: 7 };
  p.quickStats = [
    { label: 'Incident lead', value: 'Rohan Joshi' },
    { label: 'Severity', value: 'Low · P4' },
    { label: 'Attempts', value: '82 · all blocked' },
    { label: 'Source IP', value: '103.41.xx.xx' },
    { label: 'Cross-ref', value: 'FA-2026-0042 →', href: '#', hasArrow: true },
    { label: 'Audit log', value: '8 events →', href: '#', hasArrow: true },
  ];
  p.notificationData = {
    cards: [
      {
        variant: 'complete', iconKey: 'users',
        title: 'Affected users', subtitle: 'Not applicable',
        pillLabel: 'Complete', pillVariant: 'complete', progressPercent: 100,
        stats: [
          { label: 'Users impacted', value: '0' },
          { label: 'Accounts locked', value: '0' },
          { label: 'All attempts', value: 'Blocked' },
          { label: 'Action required', value: 'None' },
        ],
        footText: 'No user notification required · all attempts auto-blocked',
        actionLabel: 'View log →', actionVariant: 'default', actionKey: 'view-block-log',
      },
      {
        variant: 'complete', iconKey: 'shield',
        title: 'Internal team', subtitle: 'SRE notified',
        pillLabel: 'Complete', pillVariant: 'complete', progressPercent: 100,
        stats: [
          { label: 'SRE team', value: 'Notified' },
          { label: 'Client', value: 'Not notified (no impact)' },
          { label: 'Regulatory', value: 'Not triggered' },
          { label: 'Cross-ref', value: 'FA-2026-0042' },
        ],
        footText: 'Auto-mitigated · SRE reviewed · no escalation needed',
        actionLabel: 'View details →', actionVariant: 'default', actionKey: 'view-internal-notif',
      },
    ],
  };
  p.descriptionData = {
    paragraphs: [
      { segments: [
        { kind: 'text', text: 'At ' },
        { kind: 'strong', text: 'Apr 22 · 03:12 UTC' },
        { kind: 'text', text: ', the rate-limiter detected 82 failed login attempts against the admin proxy for client ' },
        { kind: 'strong', text: 'cl-167 (Vorona)' },
        { kind: 'text', text: ' from a single IP address (' },
        { kind: 'code', text: '103.41.xx.xx' },
        { kind: 'text', text: '). All attempts were auto-blocked — no successful authentication occurred.' },
      ] },
      { segments: [
        { kind: 'text', text: 'The source IP was added to the permanent deny-list. ' },
        { kind: 'strong-success', text: 'Zero accounts compromised · zero user impact' },
        { kind: 'text', text: '. The IP has been cross-referenced with fraud alert FA-2026-0042 for pattern analysis. Standard 7-day enhanced monitoring activated.' },
      ] },
    ],
  };
  p.actionsData = {
    actions: [
      {
        num: 1, status: 'completed', time: 'Apr 22 · 03:12',
        titleSegments: [{ kind: 'text', text: 'Auto-blocked 82 login attempts · rate-limiter triggered' }],
        detailSegments: [{ kind: 'text', text: 'Rate-limiter threshold exceeded (>20 failed attempts per 5 min). All subsequent attempts from source IP rejected with 429 status.' }],
        actor: { initials: 'SY', gradient: 'linear-gradient(135deg, #6E3FE0, #3D2B6F)', segments: [{ kind: 'text', text: 'by ' }, { kind: 'strong', text: 'System (auto-response)' }] },
      },
      {
        num: 2, status: 'completed', time: 'Apr 22 · 03:18',
        titleSegments: [{ kind: 'text', text: 'Source IP added to permanent deny-list' }],
        detailSegments: [{ kind: 'text', text: 'IP 103.41.xx.xx added to Cloudflare deny-list. Geolocation: residential ISP in SEA region. Cross-referenced with FA-2026-0042 pattern database.' }],
        actor: { initials: 'RJ', gradient: 'linear-gradient(135deg, #5C8E5A, #2D4F2C)', segments: [{ kind: 'text', text: 'by ' }, { kind: 'strong', text: 'Rohan Joshi (SRE)' }] },
      },
      {
        num: 3, status: 'completed', time: 'Apr 22 · 08:00',
        titleSegments: [{ kind: 'text', text: 'SRE review complete · 7-day enhanced monitoring activated' }],
        detailSegments: [{ kind: 'text', text: 'Reviewed all login patterns for cl-167 proxy. No anomalies beyond the blocked attempts. Enhanced monitoring enabled for client tenant.' }],
        actor: { initials: 'RJ', gradient: 'linear-gradient(135deg, #5C8E5A, #2D4F2C)', segments: [{ kind: 'text', text: 'by ' }, { kind: 'strong', text: 'Rohan Joshi' }] },
      },
    ],
  };
  p.timelineData = {
    totalEvents: 8,
    events: [
      { time: 'Apr 22 · 08:00 UTC', actor: 'Rohan Joshi', title: 'SRE review complete · monitoring enhanced', detail: 'No anomalies beyond blocked attempts. 7-day enhanced monitoring enabled for cl-167 tenant.', variant: 'success' },
      { time: 'Apr 22 · 03:18 UTC', actor: 'Rohan Joshi', title: 'source IP permanently deny-listed', detail: 'IP added to Cloudflare deny-list. Cross-referenced with FA-2026-0042.', variant: 'success' },
      { time: 'Apr 22 · 03:14 UTC', actor: 'System', actorIsSystem: true, title: 'auto-classified LOW · no escalation', detail: '0 successful auths. All attempts blocked. Auto-classified LOW severity.', variant: 'default' },
      { time: 'Apr 22 · 03:12 UTC', actor: 'System', actorIsSystem: true, title: 'rate-limiter triggered · 82 attempts blocked', detail: 'Brute-force pattern detected against cl-167 admin proxy. All attempts auto-blocked.', variant: 'warn' },
    ],
  };
  p.postMortemData = {
    primary: {
      status: 'pending', pillLabel: 'Pending · due May 6',
      pendingLines: ['Brief post-mortem on brute-force mitigation effectiveness.', 'Focus: rate-limiter tuning and cross-referencing with fraud detection pipeline.'],
      ownerSegments: [{ kind: 'text', text: 'Owner: ' }, { kind: 'strong', text: 'Rohan Joshi' }, { kind: 'text', text: ' · review by Lin Chen.' }],
      buttonLabel: 'Open post-mortem template',
    },
  };
  p.securityTeamData = {
    members: [
      { initials: 'RJ', gradient: 'linear-gradient(135deg, #5C8E5A, #2D4F2C)', name: 'Rohan Joshi', role: 'Incident lead · SRE', statusLabel: 'Online', statusKey: 'online' },
      { initials: 'LC', gradient: 'linear-gradient(135deg, #7A8AA4, #44516A)', name: 'Lin Chen', role: 'AppSec review', statusLabel: 'Away', statusKey: 'away' },
      { initials: 'AO', gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', name: 'Aïsha Okafor', role: 'Ops oversight', statusLabel: 'Away', statusKey: 'away' },
    ],
    footerText: 'Channel: ',
    footerHighlight: '#sec-si-0009',
  };
}

/* ---- SI-2026-0008 — Low · Closed · DDoS (Cloudflare-handled) ------ */
{
  const p = PROFILES['si-2026-0008']!;
  p.subtitleSegments = [
    { kind: 'text', text: 'A volumetric L3/L4 DDoS attack peaked at ' },
    { kind: 'strong', text: '18.2 Gbps' },
    { kind: 'text', text: ' against the API edge. Cloudflare anycast absorbed 100% of traffic with zero impact on origin. Standard challenge mode remained active. Incident auto-closed after 48h clean window.' },
  ];
  p.heroStats = [
    { label: 'Peak volume', value: '18.2 Gbps', meta: 'L3/L4 volumetric' },
    { label: 'Origin impact', value: 'Zero', meta: 'Cloudflare absorbed' },
    { label: 'Detection method', value: 'Cloudflare', meta: 'automated · edge alert' },
    { label: 'Status', value: 'Closed', valueColor: 'success', meta: 'auto-closed · Apr 20' },
  ];
  p.sections = [
    { id: 'notification', title: 'Notification status', meta: 'no user impact · internal SRE notification only', placeholderMessage: '' },
    { id: 'description', title: 'Incident description', meta: 'volumetric DDoS · Cloudflare-mitigated', placeholderMessage: '' },
    { id: 'actions', title: 'Actions taken', meta: '3 actions logged · 3 completed · all audit-stamped', placeholderMessage: '' },
    { id: 'timeline', title: 'Timeline of events', meta: 'all UTC · 6 audit-log entries · closed', placeholderMessage: '' },
    { id: 'postmortem', title: 'Post-mortem', meta: 'published Apr 22 · archived', placeholderMessage: '' },
  ];
  p.trackerSteps = [
    { label: 'Detection', meta: 'Apr 18 · 22:47 · Cloudflare edge alert', done: true, current: false },
    { label: 'Triage & severity', meta: 'Apr 18 · 22:50 · LOW · auto-classified', done: true, current: false },
    { label: 'Containment', meta: 'Apr 18 · 22:47 · Cloudflare auto-mitigated', done: true, current: false },
    { label: 'Notification', meta: 'SRE team notified · no user impact', done: true, current: false },
    { label: 'Eradication', meta: 'attack subsided · no origin impact', done: true, current: false },
    { label: 'Recovery & monitoring', meta: '48h clean window confirmed', done: true, current: false },
    { label: 'Post-mortem & closure', meta: 'published Apr 22 · closed', done: true, current: false },
  ];
  p.trackerProgress = { done: 7, total: 7 };
  p.quickStats = [
    { label: 'Incident lead', value: 'Rohan Joshi' },
    { label: 'Severity', value: 'Low · P4' },
    { label: 'Peak volume', value: '18.2 Gbps' },
    { label: 'Origin impact', value: 'None', valueColor: 'success' },
    { label: 'Duration', value: '~45 minutes' },
    { label: 'Audit log', value: '6 events →', href: '#', hasArrow: true },
  ];
  p.notificationData = {
    cards: [
      {
        variant: 'complete', iconKey: 'users',
        title: 'Affected users', subtitle: 'None · no impact',
        pillLabel: 'Complete', pillVariant: 'complete', progressPercent: 100,
        stats: [
          { label: 'Users impacted', value: '0' },
          { label: 'Downtime', value: '0s' },
          { label: 'Latency increase', value: '<2ms' },
          { label: 'Action required', value: 'None' },
        ],
        footText: 'Zero user impact · Cloudflare absorbed all attack traffic',
        actionLabel: 'View metrics →', actionVariant: 'default', actionKey: 'view-cf-metrics',
      },
      {
        variant: 'complete', iconKey: 'shield',
        title: 'Internal SRE', subtitle: 'Notified · no escalation',
        pillLabel: 'Complete', pillVariant: 'complete', progressPercent: 100,
        stats: [
          { label: 'SRE team', value: 'Auto-notified' },
          { label: 'Escalation', value: 'Not required' },
          { label: 'Regulatory', value: 'Not triggered' },
          { label: 'CF report', value: 'Archived' },
        ],
        footText: 'Closed · no further action required',
        actionLabel: 'View report →', actionVariant: 'default', actionKey: 'view-ddos-report',
      },
    ],
  };
  p.descriptionData = {
    paragraphs: [
      { segments: [
        { kind: 'text', text: 'At ' },
        { kind: 'strong', text: 'Apr 18 · 22:47 UTC' },
        { kind: 'text', text: ', Cloudflare detected a volumetric L3/L4 DDoS attack against the Atlas API edge, peaking at ' },
        { kind: 'strong', text: '18.2 Gbps' },
        { kind: 'text', text: '. The attack lasted approximately 45 minutes and was fully absorbed by Cloudflare anycast with zero packets reaching origin infrastructure.' },
      ] },
      { segments: [
        { kind: 'strong-success', text: 'Zero user impact' },
        { kind: 'text', text: ': no downtime, no latency increase above 2ms, no error rate elevation. Cloudflare standard challenge mode handled the traffic without escalation. Attack traffic analysis suggests UDP amplification from ~4,000 source IPs. Incident auto-closed after 48h clean monitoring window.' },
      ] },
    ],
  };
  p.actionsData = {
    actions: [
      {
        num: 1, status: 'completed', time: 'Apr 18 · 22:47',
        titleSegments: [{ kind: 'text', text: 'Cloudflare auto-mitigation activated' }],
        detailSegments: [{ kind: 'text', text: 'L3/L4 DDoS protection triggered. All attack traffic absorbed at edge. Origin servers received zero malicious packets. Standard challenge mode sufficient.' }],
        actor: { initials: 'SY', gradient: 'linear-gradient(135deg, #6E3FE0, #3D2B6F)', segments: [{ kind: 'text', text: 'by ' }, { kind: 'strong', text: 'Cloudflare (auto-mitigation)' }] },
      },
      {
        num: 2, status: 'completed', time: 'Apr 19 · 08:00',
        titleSegments: [{ kind: 'text', text: 'SRE post-attack review completed' }],
        detailSegments: [{ kind: 'text', text: 'Reviewed Cloudflare analytics. Attack subsided at ~23:32 UTC. Origin health metrics normal throughout. No configuration changes required.' }],
        actor: { initials: 'RJ', gradient: 'linear-gradient(135deg, #5C8E5A, #2D4F2C)', segments: [{ kind: 'text', text: 'by ' }, { kind: 'strong', text: 'Rohan Joshi' }] },
      },
      {
        num: 3, status: 'completed', time: 'Apr 20 · 22:47',
        titleSegments: [{ kind: 'text', text: '48h clean window confirmed · incident auto-closed' }],
        detailSegments: [{ kind: 'text', text: 'No recurrence within 48h monitoring window. Incident auto-closed per SRE runbook. Post-mortem drafted and published.' }],
        actor: { initials: 'SY', gradient: 'linear-gradient(135deg, #6E3FE0, #3D2B6F)', segments: [{ kind: 'text', text: 'by ' }, { kind: 'strong', text: 'System (auto-close)' }] },
      },
    ],
  };
  p.timelineData = {
    totalEvents: 6,
    events: [
      { time: 'Apr 22 · 09:00 UTC', actor: 'Rohan Joshi', title: 'post-mortem published · incident archived', detail: 'Brief post-mortem published. DDoS mitigation effectiveness confirmed. No remediation needed.', variant: 'success' },
      { time: 'Apr 20 · 22:47 UTC', actor: 'System', actorIsSystem: true, title: '48h clean window · incident auto-closed', detail: 'No recurrence. Auto-closed per runbook.', variant: 'success' },
      { time: 'Apr 19 · 08:00 UTC', actor: 'Rohan Joshi', title: 'SRE post-attack review', detail: 'Cloudflare analytics reviewed. Origin health normal throughout attack. No changes required.', variant: 'default' },
      { time: 'Apr 18 · 22:47 UTC', actor: 'System', actorIsSystem: true, title: 'DDoS detected · Cloudflare auto-mitigated', detail: 'Volumetric L3/L4 attack at 18.2 Gbps. Fully absorbed by Cloudflare anycast. PagerDuty alert sent to SRE.', variant: 'warn' },
    ],
  };
  p.postMortemData = {
    primary: {
      status: 'published', pillLabel: 'Published · Apr 22',
      title: 'SI-2026-0008 · DDoS attempt · post-mortem',
      blocks: [
        { label: 'Root cause', segments: [
          { kind: 'text', text: 'UDP amplification attack from ~4,000 source IPs. ' },
          { kind: 'strong', text: 'No Atlas infrastructure vulnerability' },
          { kind: 'text', text: ' — standard volumetric DDoS targeting API edge.' },
        ] },
        { label: 'Mitigation', segments: [
          { kind: 'text', text: 'Cloudflare anycast absorbed 100% of attack traffic. Zero origin impact. Standard challenge mode sufficient without escalation.' },
        ] },
        { label: 'Lessons learned', segments: [
          { kind: 'text', text: 'Cloudflare DDoS protection performs as expected at this scale. ' },
          { kind: 'strong', text: 'No configuration changes needed' },
          { kind: 'text', text: '. Added DDoS volume to monthly capacity report.' },
        ] },
        { label: 'Action items', segments: [
          { kind: 'text', text: '1 / 1 completed · added DDoS baseline metrics to SRE dashboard for trend monitoring.' },
        ] },
      ],
    },
  };
  p.securityTeamData = {
    members: [
      { initials: 'RJ', gradient: 'linear-gradient(135deg, #5C8E5A, #2D4F2C)', name: 'Rohan Joshi', role: 'Incident lead · SRE', statusLabel: 'Offline', statusKey: 'offline' },
      { initials: 'LC', gradient: 'linear-gradient(135deg, #7A8AA4, #44516A)', name: 'Lin Chen', role: 'AppSec review', statusLabel: 'Offline', statusKey: 'offline' },
      { initials: 'AO', gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', name: 'Aïsha Okafor', role: 'Ops oversight', statusLabel: 'Offline', statusKey: 'offline' },
    ],
    footerText: 'Archived · ',
    footerHighlight: 'Apr 22',
  };
}

/* ---- SI-2026-0007 — Medium · Closed · Vendor advisory (Auth0) ----- */
{
  const p = PROFILES['si-2026-0007']!;
  p.subtitleSegments = [
    { kind: 'text', text: 'Upstream vendor security advisory ' },
    { kind: 'strong', text: 'CVE-2026-0142' },
    { kind: 'text', text: ' from Auth0. No Atlas tenant compromise confirmed. Precautionary forced session refresh issued for all ' },
    { kind: 'strong', text: '28,000 users' },
    { kind: 'text', text: '. Vendor-advisory triage process formalized into runbook. Post-mortem published.' },
  ];
  p.heroStats = [
    { label: 'Users refreshed', value: '28K', meta: 'precautionary · all tenants' },
    { label: 'Atlas impact', value: 'None confirmed', meta: 'vendor-side only' },
    { label: 'Detection method', value: 'Vendor advisory', meta: 'CVE-2026-0142' },
    { label: 'Status', value: 'Closed', valueColor: 'success', meta: 'post-mortem published' },
  ];
  p.sections = [
    { id: 'notification', title: 'Notification status', meta: '28K users force-refreshed · precautionary advisory sent', placeholderMessage: '' },
    { id: 'description', title: 'Incident description', meta: 'Auth0 vendor advisory · precautionary response', placeholderMessage: '' },
    { id: 'actions', title: 'Actions taken', meta: '4 actions logged · 4 completed · all audit-stamped', placeholderMessage: '' },
    { id: 'timeline', title: 'Timeline of events', meta: 'all UTC · 22 audit-log entries · closed', placeholderMessage: '' },
    { id: 'postmortem', title: 'Post-mortem', meta: 'published Apr 26 · archived', placeholderMessage: '' },
  ];
  p.trackerSteps = [
    { label: 'Detection', meta: 'Apr 12 · 06:05 · vendor advisory received', done: true, current: false },
    { label: 'Triage & severity', meta: 'Apr 12 · 06:30 · MEDIUM · precautionary', done: true, current: false },
    { label: 'Containment', meta: 'Apr 12 · 10:17 · forced session refresh', done: true, current: false },
    { label: 'Notification', meta: '28K users notified · precautionary advisory', done: true, current: false },
    { label: 'Eradication', meta: 'vendor patch confirmed · no Atlas action', done: true, current: false },
    { label: 'Recovery & monitoring', meta: '14-day enhanced monitoring · clean', done: true, current: false },
    { label: 'Post-mortem & closure', meta: 'published Apr 26 · closed', done: true, current: false },
  ];
  p.trackerProgress = { done: 7, total: 7 };
  p.quickStats = [
    { label: 'Incident lead', value: 'Aïsha Okafor' },
    { label: 'Severity', value: 'Medium · P3', valueColor: 'amber' },
    { label: 'Users refreshed', value: '28,000' },
    { label: 'Atlas compromise', value: 'None confirmed', valueColor: 'success' },
    { label: 'CVE', value: 'CVE-2026-0142' },
    { label: 'Vendor', value: 'Auth0' },
    { label: 'Audit log', value: '22 events →', href: '#', hasArrow: true },
  ];
  p.notificationData = {
    cards: [
      {
        variant: 'complete', iconKey: 'users',
        title: 'Affected users', subtitle: '28K force-refreshed',
        pillLabel: 'Complete', pillVariant: 'complete', progressPercent: 100,
        stats: [
          { label: 'Force-refreshed', value: '28,000' },
          { label: 'Method', value: 'Session invalidation' },
          { label: 'Re-authenticated', value: '27,842' },
          { label: 'Advisory email', value: 'Sent to all' },
        ],
        footText: 'All users force-refreshed as precaution · no breach confirmed',
        actionLabel: 'View details →', actionVariant: 'default', actionKey: 'view-user-refresh',
      },
      {
        variant: 'complete', iconKey: 'shield',
        title: 'Regulatory authorities', subtitle: 'Not triggered',
        pillLabel: 'Complete', pillVariant: 'complete', progressPercent: 100,
        stats: [
          { label: 'GDPR', value: 'Not triggered' },
          { label: 'CCPA', value: 'Not triggered' },
          { label: 'Breach confirmed', value: 'No' },
          { label: 'Vendor status', value: 'Patched' },
        ],
        footText: 'No regulatory notification required · precautionary action only',
        actionLabel: 'View assessment →', actionVariant: 'default', actionKey: 'review-reg-status',
      },
    ],
  };
  p.descriptionData = {
    paragraphs: [
      { segments: [
        { kind: 'text', text: 'On ' },
        { kind: 'strong', text: 'Apr 12 · 06:05 UTC' },
        { kind: 'text', text: ', Auth0 issued a security advisory for ' },
        { kind: 'code', text: 'CVE-2026-0142' },
        { kind: 'text', text: ', a session-handling vulnerability in their authentication SDK. The advisory recommended forced session refresh for all integrated applications as a precautionary measure.' },
      ] },
      { segments: [
        { kind: 'text', text: 'Atlas security team assessed the advisory and determined ' },
        { kind: 'strong-success', text: 'no Atlas tenant compromise confirmed' },
        { kind: 'text', text: '. However, as a precaution, we initiated a forced session refresh for all ' },
        { kind: 'strong', text: '28,000 users' },
        { kind: 'text', text: ' at 10:17 UTC — 4h 12m after advisory receipt.' },
      ] },
      { segments: [
        { kind: 'text', text: 'Auth0 deployed their vendor-side patch within 48 hours. Post-refresh monitoring (14 days) showed no anomalous session activity. The vendor-advisory triage process was formalized into a dedicated runbook to ensure consistent response times for future advisories.' },
      ] },
    ],
  };
  p.actionsData = {
    actions: [
      {
        num: 1, status: 'completed', time: 'Apr 12 · 10:17',
        titleSegments: [{ kind: 'text', text: 'Forced session refresh for 28,000 users' }],
        detailSegments: [{ kind: 'text', text: 'All active sessions invalidated across all tenants. Users required to re-authenticate. Session-token rotation completed. 27,842 of 28,000 re-authenticated within 24 hours.' }],
        actor: { initials: 'RJ', gradient: 'linear-gradient(135deg, #5C8E5A, #2D4F2C)', segments: [{ kind: 'text', text: 'by ' }, { kind: 'strong', text: 'Rohan Joshi (SRE)' }] },
      },
      {
        num: 2, status: 'completed', time: 'Apr 12 · 14:00',
        titleSegments: [{ kind: 'text', text: 'Precautionary user advisory email sent' }],
        detailSegments: [{ kind: 'text', text: 'Email to all users explaining the forced re-authentication. No sensitive details of the vulnerability disclosed — advisory framed as "security maintenance refresh."' }],
        actor: { initials: 'AO', gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', segments: [{ kind: 'text', text: 'by ' }, { kind: 'strong', text: 'Aïsha Okafor' }] },
      },
      {
        num: 3, status: 'completed', time: 'Apr 14 · 09:00',
        titleSegments: [{ kind: 'text', text: 'Auth0 vendor patch confirmed · monitoring enhanced' }],
        detailSegments: [{ kind: 'text', text: 'Auth0 deployed vendor-side fix. Confirmed no Atlas tenant impact. 14-day enhanced session monitoring activated. No anomalies detected throughout window.' }],
        actor: { initials: 'LC', gradient: 'linear-gradient(135deg, #7A8AA4, #44516A)', segments: [{ kind: 'text', text: 'by ' }, { kind: 'strong', text: 'Lin Chen' }] },
      },
      {
        num: 4, status: 'completed', time: 'Apr 26 · 09:00',
        titleSegments: [{ kind: 'text', text: 'Vendor-advisory triage runbook formalized' }],
        detailSegments: [{ kind: 'text', text: 'Created dedicated runbook for vendor advisory response. Includes: severity assessment matrix, precautionary-action thresholds, notification templates, and post-event monitoring checklist.' }],
        actor: { initials: 'AO', gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', segments: [{ kind: 'text', text: 'by ' }, { kind: 'strong', text: 'Aïsha Okafor' }] },
      },
    ],
  };
  p.timelineData = {
    totalEvents: 22,
    events: [
      { time: 'Apr 26 · 09:00 UTC', actor: 'Aïsha Okafor', title: 'post-mortem published · incident closed', detail: 'Post-mortem reviewed by full security team. Vendor-advisory runbook formalized. Incident archived.', variant: 'success' },
      { time: 'Apr 26 · 06:05 UTC', actor: 'System', actorIsSystem: true, title: '14-day monitoring window clean · closure confirmed', detail: 'No anomalous session activity detected during enhanced monitoring period. Ready for post-mortem and closure.', variant: 'success' },
      { time: 'Apr 14 · 09:00 UTC', actor: 'Lin Chen', title: 'Auth0 vendor patch confirmed', detail: 'Auth0 deployed server-side fix. Verified no Atlas tenant impact. Enhanced monitoring continues for remaining 12 days.', variant: 'success' },
      { time: 'Apr 12 · 14:00 UTC', actor: 'Aïsha Okafor', title: 'precautionary user advisory sent', detail: '28,000 users emailed about forced re-authentication. Framed as security maintenance. No CVE details disclosed publicly.', variant: 'success' },
      { time: 'Apr 12 · 10:17 UTC', actor: 'Rohan Joshi', title: 'forced session refresh executed', detail: 'All sessions invalidated. Token rotation complete. 27,842 users re-authenticated within 24h.', variant: 'success' },
      { time: 'Apr 12 · 06:05 UTC', actor: 'System', actorIsSystem: true, title: 'Auth0 vendor advisory received · CVE-2026-0142', detail: 'Security advisory received via Auth0 notification channel. Session-handling vulnerability. Recommended precautionary forced refresh.', variant: 'warn' },
    ],
  };
  p.postMortemData = {
    primary: {
      status: 'published', pillLabel: 'Published · Apr 26',
      title: 'SI-2026-0007 · Auth0 vendor advisory · post-mortem',
      blocks: [
        { label: 'Root cause', segments: [
          { kind: 'text', text: 'Upstream vendor security advisory (CVE-2026-0142). ' },
          { kind: 'strong', text: 'No Atlas tenant impact confirmed' },
          { kind: 'text', text: '. Forced session refresh issued as a precaution.' },
        ] },
        { label: 'Mitigation', segments: [
          { kind: 'text', text: 'Forced re-authentication for 28K users · session-token rotation · monitoring enhanced for 14 days post-event.' },
        ] },
        { label: 'Lessons learned', segments: [
          { kind: 'text', text: 'Vendor-advisory triage process now formalized into runbook. ' },
          { kind: 'strong', text: 'Time-to-precautionary-action' },
          { kind: 'text', text: ': 4h 12m (target ≤ 6h).' },
        ] },
        { label: 'Action items', segments: [
          { kind: 'text', text: '3 / 3 completed · vendor-advisory dashboard · session-rotation playbook · quarterly tabletop exercise scheduled.' },
        ] },
      ],
    },
  };
  p.securityTeamData = {
    members: [
      { initials: 'AO', gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', name: 'Aïsha Okafor', role: 'Incident lead · ops', statusLabel: 'Offline', statusKey: 'offline' },
      { initials: 'RJ', gradient: 'linear-gradient(135deg, #5C8E5A, #2D4F2C)', name: 'Rohan Joshi', role: 'SRE on-call', statusLabel: 'Offline', statusKey: 'offline' },
      { initials: 'LC', gradient: 'linear-gradient(135deg, #7A8AA4, #44516A)', name: 'Lin Chen', role: 'AppSec lead', statusLabel: 'Offline', statusKey: 'offline' },
      { initials: 'DF', gradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)', name: 'Dario Fonseca', role: 'Compliance review', statusLabel: 'Offline', statusKey: 'offline' },
    ],
    footerText: 'Archived · ',
    footerHighlight: 'Apr 26',
  };
}

/* ---- SI-2026-0006 — Low · Closed · Spam-bot signup wave ----------- */
{
  const p = PROFILES['si-2026-0006']!;
  p.subtitleSegments = [
    { kind: 'text', text: 'A spam-bot signup wave generated ' },
    { kind: 'strong', text: '3,142 fake signups in 4 hours' },
    { kind: 'text', text: ' using disposable email domains. All blocked by Turnstile heuristics + email-domain filter. Accounts purged. No impact to legitimate users.' },
  ];
  p.heroStats = [
    { label: 'Fake signups', value: '3,142', meta: 'all blocked + purged' },
    { label: 'Legitimate impact', value: 'None', meta: 'filters scoped to bots' },
    { label: 'Detection method', value: 'Automated', meta: 'Turnstile + email filter' },
    { label: 'Status', value: 'Closed', valueColor: 'success', meta: 'auto-closed · Apr 8' },
  ];
  p.sections = [
    { id: 'notification', title: 'Notification status', meta: 'no user impact · internal team notification only', placeholderMessage: '' },
    { id: 'description', title: 'Incident description', meta: 'spam-bot wave · auto-mitigated', placeholderMessage: '' },
    { id: 'actions', title: 'Actions taken', meta: '3 actions logged · 3 completed · all audit-stamped', placeholderMessage: '' },
    { id: 'timeline', title: 'Timeline of events', meta: 'all UTC · 6 audit-log entries · closed', placeholderMessage: '' },
    { id: 'postmortem', title: 'Post-mortem', meta: 'published Apr 8 · archived', placeholderMessage: '' },
  ];
  p.trackerSteps = [
    { label: 'Detection', meta: 'Apr 4 · 14:00 · Turnstile anomaly alert', done: true, current: false },
    { label: 'Triage & severity', meta: 'Apr 4 · 14:08 · LOW · auto-classified', done: true, current: false },
    { label: 'Containment', meta: 'Apr 4 · 14:00 · auto-blocked by heuristics', done: true, current: false },
    { label: 'Notification', meta: 'internal team only · no user impact', done: true, current: false },
    { label: 'Eradication', meta: '3,142 fake accounts purged', done: true, current: false },
    { label: 'Recovery & monitoring', meta: '7-day monitoring · clean', done: true, current: false },
    { label: 'Post-mortem & closure', meta: 'published Apr 8 · closed', done: true, current: false },
  ];
  p.trackerProgress = { done: 7, total: 7 };
  p.quickStats = [
    { label: 'Incident lead', value: 'Daniel Kovács' },
    { label: 'Severity', value: 'Low · P4' },
    { label: 'Fake signups', value: '3,142 · purged' },
    { label: 'Legitimate impact', value: 'None', valueColor: 'success' },
    { label: 'Detection', value: 'Turnstile + email filter' },
    { label: 'Audit log', value: '6 events →', href: '#', hasArrow: true },
  ];
  p.notificationData = {
    cards: [
      {
        variant: 'complete', iconKey: 'users',
        title: 'Affected users', subtitle: 'None · bots only',
        pillLabel: 'Complete', pillVariant: 'complete', progressPercent: 100,
        stats: [
          { label: 'Legitimate users', value: '0 impacted' },
          { label: 'Bot accounts', value: '3,142 purged' },
          { label: 'Signup flow', value: 'Uninterrupted' },
          { label: 'Action required', value: 'None' },
        ],
        footText: 'No user notification required · bot traffic only',
        actionLabel: 'View purge log →', actionVariant: 'default', actionKey: 'view-purge-log',
      },
      {
        variant: 'complete', iconKey: 'shield',
        title: 'Internal team', subtitle: 'Platform eng notified',
        pillLabel: 'Complete', pillVariant: 'complete', progressPercent: 100,
        stats: [
          { label: 'Platform eng', value: 'Notified' },
          { label: 'Email domains', value: '14 added to block list' },
          { label: 'Regulatory', value: 'Not triggered' },
          { label: 'Turnstile', value: 'Tuned + confirmed' },
        ],
        footText: 'Closed · disposable-email filter enhanced',
        actionLabel: 'View details →', actionVariant: 'default', actionKey: 'view-bot-details',
      },
    ],
  };
  p.descriptionData = {
    paragraphs: [
      { segments: [
        { kind: 'text', text: 'At ' },
        { kind: 'strong', text: 'Apr 4 · 14:00 UTC' },
        { kind: 'text', text: ', the signup rate anomaly detector triggered when ' },
        { kind: 'strong', text: '3,142 new account registrations' },
        { kind: 'text', text: ' were attempted in a 4-hour window — approximately 15× the normal rate. All registrations used disposable email domains (' },
        { kind: 'code', text: 'tempmail.io' },
        { kind: 'text', text: ', ' },
        { kind: 'code', text: 'fakebox.net' },
        { kind: 'text', text: ', and 12 others).' },
      ] },
      { segments: [
        { kind: 'text', text: 'Cloudflare Turnstile heuristics blocked 100% of bot signups at the challenge layer. ' },
        { kind: 'strong-success', text: 'Zero legitimate users affected' },
        { kind: 'text', text: '. All 3,142 fake accounts were purged from the database. 14 disposable-email domains added to the permanent block list. Incident auto-closed after 7-day clean monitoring window.' },
      ] },
    ],
  };
  p.actionsData = {
    actions: [
      {
        num: 1, status: 'completed', time: 'Apr 4 · 14:00',
        titleSegments: [{ kind: 'text', text: 'Turnstile heuristics auto-blocked bot signups' }],
        detailSegments: [{ kind: 'text', text: '3,142 signup attempts blocked at Turnstile challenge layer. Zero passed to account creation. Disposable email domain pattern detected automatically.' }],
        actor: { initials: 'SY', gradient: 'linear-gradient(135deg, #6E3FE0, #3D2B6F)', segments: [{ kind: 'text', text: 'by ' }, { kind: 'strong', text: 'System (Turnstile)' }] },
      },
      {
        num: 2, status: 'completed', time: 'Apr 4 · 16:00',
        titleSegments: [{ kind: 'text', text: '3,142 fake accounts purged + 14 email domains blocked' }],
        detailSegments: [{ kind: 'text', text: 'Database cleanup completed. 14 disposable-email domains added to permanent block list. Turnstile confidence threshold adjusted from 0.5 to 0.7 for signup flow.' }],
        actor: { initials: 'DK', gradient: 'linear-gradient(135deg, #6EB5D0, #3A7A99)', segments: [{ kind: 'text', text: 'by ' }, { kind: 'strong', text: 'Daniel Kovács' }] },
      },
      {
        num: 3, status: 'completed', time: 'Apr 8 · 14:00',
        titleSegments: [{ kind: 'text', text: '7-day monitoring clean · incident closed' }],
        detailSegments: [{ kind: 'text', text: 'No recurrence within monitoring window. Signup rates normal. Disposable-email filter performing as expected. Post-mortem published.' }],
        actor: { initials: 'DK', gradient: 'linear-gradient(135deg, #6EB5D0, #3A7A99)', segments: [{ kind: 'text', text: 'by ' }, { kind: 'strong', text: 'Daniel Kovács' }] },
      },
    ],
  };
  p.timelineData = {
    totalEvents: 6,
    events: [
      { time: 'Apr 8 · 14:00 UTC', actor: 'Daniel Kovács', title: 'post-mortem published · incident closed', detail: '7-day monitoring clean. Post-mortem published. Incident archived.', variant: 'success' },
      { time: 'Apr 4 · 16:00 UTC', actor: 'Daniel Kovács', title: '3,142 accounts purged · email domains blocked', detail: 'Database cleanup. 14 domains added to block list. Turnstile threshold adjusted.', variant: 'success' },
      { time: 'Apr 4 · 14:08 UTC', actor: 'System', actorIsSystem: true, title: 'auto-classified LOW · no escalation', detail: 'Bot traffic only. Zero legitimate user impact. Auto-classified LOW.', variant: 'default' },
      { time: 'Apr 4 · 14:00 UTC', actor: 'System', actorIsSystem: true, title: 'signup rate anomaly · Turnstile auto-blocked', detail: '3,142 bot signups in 4h. All blocked at Turnstile challenge layer. Disposable email pattern detected.', variant: 'warn' },
    ],
  };
  p.postMortemData = {
    primary: {
      status: 'published', pillLabel: 'Published · Apr 8',
      title: 'SI-2026-0006 · Spam-bot signup wave · post-mortem',
      blocks: [
        { label: 'Root cause', segments: [
          { kind: 'text', text: 'Automated bot network targeting signup endpoint with disposable email domains. ' },
          { kind: 'strong', text: 'No platform vulnerability' },
          { kind: 'text', text: ' — standard spam pattern.' },
        ] },
        { label: 'Mitigation', segments: [
          { kind: 'text', text: 'Turnstile heuristics blocked 100% of bot signups. 3,142 fake accounts purged. 14 email domains permanently blocked.' },
        ] },
        { label: 'Lessons learned', segments: [
          { kind: 'text', text: 'Turnstile confidence threshold tuned from 0.5 → 0.7 for signup flow. ' },
          { kind: 'strong', text: 'Disposable-email detection' },
          { kind: 'text', text: ' effective but domain list requires quarterly refresh.' },
        ] },
        { label: 'Action items', segments: [
          { kind: 'text', text: '2 / 2 completed · quarterly disposable-domain list refresh scheduled · Turnstile threshold documented in ops runbook.' },
        ] },
      ],
    },
  };
  p.securityTeamData = {
    members: [
      { initials: 'DK', gradient: 'linear-gradient(135deg, #6EB5D0, #3A7A99)', name: 'Daniel Kovács', role: 'Incident lead · platform', statusLabel: 'Offline', statusKey: 'offline' },
      { initials: 'AO', gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', name: 'Aïsha Okafor', role: 'Ops oversight', statusLabel: 'Offline', statusKey: 'offline' },
      { initials: 'RJ', gradient: 'linear-gradient(135deg, #5C8E5A, #2D4F2C)', name: 'Rohan Joshi', role: 'SRE review', statusLabel: 'Offline', statusKey: 'offline' },
    ],
    footerText: 'Archived · ',
    footerHighlight: 'Apr 8',
  };
}

export const INCIDENT_PROFILES: IncidentProfilesMap = PROFILES;
