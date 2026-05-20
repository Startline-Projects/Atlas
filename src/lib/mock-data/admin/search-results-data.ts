/* Step 39 (Scope Step 38) — Global Admin Search fixture (Pass A: header + query-pill + stats + sidebar)
   Verbatim from admin.html lines 67493-67624.
   Result groups + empty state + recent searches added in Pass B. */

import type { PrStat } from './privacy-reports-data';

export type GsCategoryKey =
  | 'all'
  | 'users'
  | 'fraud'
  | 'suspensions'
  | 'audit'
  | 'compliance'
  | 'transactions'
  | 'disputes'
  | 'jobs'
  | 'engagements'
  | 'help'
  | 'internal'
  | 'notifications';

export type GsCatIconKey =
  | 'square'
  | 'users'
  | 'triangle-alert'
  | 'ban-circle'
  | 'bar-chart'
  | 'lock'
  | 'card'
  | 'info'
  | 'briefcase'
  | 'box'
  | 'help-circle'
  | 'book'
  | 'bell';

export interface GsSidebarCategory {
  key: GsCategoryKey;
  label: string;
  count: string;
  iconKey: GsCatIconKey;
  active?: boolean;
}

export type GsHeaderIcon = 'funnel' | 'bookmark' | 'download';

export interface GsHeaderAction {
  label: string;
  icon: GsHeaderIcon;
  isPrimary?: boolean;
}

export interface GsPageMeta {
  title: string;
  metaHtml: string;
}

export const gsPageMeta: GsPageMeta = {
  title: 'Search results',
  metaHtml:
    '/admin/search · <strong>18 results across 7 categories</strong> · search time 84ms · last index update 4min ago',
};

export const gsMetaPulseHtml =
  'Top match: <strong>FA-2026-0042</strong> · the Vorona ring · canonical reference across Atlas';

export const gsQuery = 'vorona';

export const gsHeaderActions: GsHeaderAction[] = [
  { label: 'Advanced filters', icon: 'funnel' },
  { label: 'Save search', icon: 'bookmark' },
  { label: 'Export results', icon: 'download', isPrimary: true },
];

export const gsTopStats: PrStat[] = [
  {
    label: 'Total results',
    value: '18',
    meta: 'across <strong>7 of 9 categories</strong>',
  },
  {
    label: 'Top category',
    value: 'Users',
    meta: '5 hits · 1 primary + 4 satellites',
  },
  {
    label: 'Time range',
    value: 'Any',
    meta: 'earliest hit Apr 12 · latest 2min ago',
  },
  {
    label: 'Search latency',
    value: '84',
    suffix: 'ms',
    variant: 'success',
    meta: 'fast · indexed · target &lt; 200ms',
  },
];

export const gsSidebarHeadLabel = 'CATEGORIES · 9';

/* ============================================================
   PASS B — 7 result groups + 18 results + empty + recent searches
   admin.html lines 67630-68030
   ============================================================ */

export type GsGroupIconType =
  | 'users'
  | 'fraud'
  | 'suspensions'
  | 'audit'
  | 'compliance'
  | 'internal'
  | 'notifications'
  | 'transactions';

export type GsResultStatus =
  | 'banned'
  | 'active'
  | 'resolved'
  | 'investigating';

export type GsAvatarKind = 'initials' | 'icon';
export type GsAvatarIconKey =
  | 'triangle'
  | 'ban'
  | 'bar-chart'
  | 'lock'
  | 'clipboard'
  | 'speech'
  | 'bell';

export interface GsResultAvatar {
  kind: GsAvatarKind;
  initials?: string;
  gradient?: string; // inline style background for colored initials avatars
  iconKey?: GsAvatarIconKey;
}

export interface GsResult {
  id: string;
  isCanonical?: boolean;
  href: string;
  avatar: GsResultAvatar;
  title: string;
  idLabel?: string;
  metaHtml: string;
  crumb: string[];
  relevance: string;
  status: GsResultStatus;
  statusLabel: string;
}

export interface GsResultGroup {
  iconType: GsGroupIconType;
  title: string;
  count: string;
  viewAllLink: string;
  viewAllHref: string;
  results: GsResult[];
}

export interface GsEmptyGroup {
  iconType: GsGroupIconType;
  title: string;
  count: string;
  emptyHtml: string;
}

export interface GsRecentRow {
  query: string;
  meta: string;
  href: string;
}

const GRAD_PRIMARY = 'linear-gradient(135deg, #C2412B, #8A2C1E)';
const GRAD_SATELLITE = 'linear-gradient(135deg, #8A2C1E, #5C1D14)';

export const gsResultGroups: GsResultGroup[] = [
  {
    iconType: 'users',
    title: 'Users',
    count: '5 hits',
    viewAllLink: 'View all 5 in Users →',
    viewAllHref: '/admin/users/candidates',
    results: [
      {
        id: 'cand-1142',
        isCanonical: true,
        href: '/admin/users/candidates/cand-001',
        avatar: { kind: 'initials', initials: 'MS', gradient: GRAD_PRIMARY },
        title: 'Marek Söderberg',
        idLabel: 'cand-1142',
        metaHtml:
          'Primary actor in the <mark>Vorona</mark> ring (FA-2026-0042) · Software Engineering · banned via SB-2026-0085 · DSR Art.17 deletion request pending DSR-2026-0089 · last verified registration <strong>Sep 14, 2025</strong>.',
        crumb: ['USERS', 'CANDIDATES', 'cand-1142'],
        relevance: '94 · top',
        status: 'banned',
        statusLabel: 'Banned',
      },
      {
        id: 'cand-1156',
        href: '/admin/users/candidates/cand-002',
        avatar: { kind: 'initials', initials: 'VK', gradient: GRAD_SATELLITE },
        title: 'Vasyl Kovalenko',
        idLabel: 'cand-1156',
        metaHtml:
          'Satellite 1 of 4 in the <mark>Vorona</mark> ring · shared device fingerprint with cand-1142 · same payment instrument · banned via SB-2026-0084.',
        crumb: ['USERS', 'CANDIDATES', 'cand-1156'],
        relevance: '82',
        status: 'banned',
        statusLabel: 'Banned',
      },
      {
        id: 'cand-1158',
        href: '/admin/users/candidates/cand-003',
        avatar: { kind: 'initials', initials: 'OB', gradient: GRAD_SATELLITE },
        title: 'Oleksiy Bondarenko',
        idLabel: 'cand-1158',
        metaHtml:
          'Satellite 2 of 4 in the <mark>Vorona</mark> ring · same IP cluster · referral edge to cand-1142 · banned via SB-2026-0084.',
        crumb: ['USERS', 'CANDIDATES', 'cand-1158'],
        relevance: '79',
        status: 'banned',
        statusLabel: 'Banned',
      },
      {
        id: 'cand-1162',
        href: '/admin/users/candidates/cand-004',
        avatar: { kind: 'initials', initials: 'YH', gradient: GRAD_SATELLITE },
        title: 'Yulia Hryhorenko',
        idLabel: 'cand-1162',
        metaHtml:
          'Satellite 3 of 4 in the <mark>Vorona</mark> ring · device + IP overlap · banned via SB-2026-0084.',
        crumb: ['USERS', 'CANDIDATES', 'cand-1162'],
        relevance: '76',
        status: 'banned',
        statusLabel: 'Banned',
      },
      {
        id: 'cand-1164',
        href: '/admin/users/candidates/cand-005',
        avatar: { kind: 'initials', initials: 'DK', gradient: GRAD_SATELLITE },
        title: 'Dmytro Kostenko',
        idLabel: 'cand-1164',
        metaHtml:
          'Satellite 4 of 4 in the <mark>Vorona</mark> ring · payment instrument reuse · banned via SB-2026-0084.',
        crumb: ['USERS', 'CANDIDATES', 'cand-1164'],
        relevance: '76',
        status: 'banned',
        statusLabel: 'Banned',
      },
    ],
  },
  {
    iconType: 'fraud',
    title: 'Fraud cases',
    count: '2 hits',
    viewAllLink: 'View all 2 in Fraud →',
    viewAllHref: '/admin/trust-safety/fraud-abuse',
    results: [
      {
        id: 'fa-2026-0042',
        isCanonical: true,
        href: '/admin/trust-safety/fraud-abuse/fa-2026-0042',
        avatar: { kind: 'icon', iconKey: 'triangle' },
        title: 'Coordinated-fraud-ring · <mark>Vorona</mark> primary cluster',
        idLabel: 'FA-2026-0042',
        metaHtml:
          '5-account ring · primary cand-1142 + 4 satellites · device+IP+payment overlap · confidence 94% · <strong>drove the v6 rewrite of the coordinated-ring SOP</strong>. Active alert · 6h to enforcement window.',
        crumb: ['TRUST & SAFETY', 'FRAUD & ABUSE', 'FA-2026-0042'],
        relevance: '98 · top',
        status: 'investigating',
        statusLabel: 'Active',
      },
      {
        id: 'fa-2026-0041',
        href: '/admin/trust-safety/fraud-abuse/fa-2026-0041',
        avatar: { kind: 'icon', iconKey: 'triangle' },
        title: 'Fake-ID case · cand-1142 individual review',
        idLabel: 'FA-2026-0041',
        metaHtml:
          'Pre-ring fake-ID detection on <mark>Marek</mark> alone · escalated to ring investigation when 4 linked accounts surfaced · resolved at the ring level (FA-0042).',
        crumb: ['TRUST & SAFETY', 'FRAUD & ABUSE', 'FA-2026-0041'],
        relevance: '72',
        status: 'resolved',
        statusLabel: 'Resolved',
      },
    ],
  },
  {
    iconType: 'suspensions',
    title: 'Suspensions',
    count: '2 hits',
    viewAllLink: 'View all 2 in Suspensions →',
    viewAllHref: '/admin/trust-safety/suspensions-bans',
    results: [
      {
        id: 'sb-2026-0084',
        isCanonical: true,
        href: '/admin/trust-safety/suspensions-bans/sb-2026-0084',
        avatar: { kind: 'icon', iconKey: 'ban' },
        title: '<mark>Vorona</mark> satellite ban · synchronized batch',
        idLabel: 'SB-2026-0084',
        metaHtml:
          '4 satellite accounts banned in ≤30s window · primary <mark>Vorona</mark> ring · uses the synchronized-ban endpoint from the v6 SOP · audit chain preserved AUD-2026-106102.',
        crumb: ['TRUST & SAFETY', 'SUSPENSIONS', 'SB-2026-0084'],
        relevance: '91 · top',
        status: 'active',
        statusLabel: 'Active',
      },
      {
        id: 'sb-2026-0085',
        href: '/admin/trust-safety/suspensions-bans/sb-2026-0084',
        avatar: { kind: 'icon', iconKey: 'ban' },
        title: 'Primary actor ban · Marek',
        idLabel: 'SB-2026-0085',
        metaHtml:
          'Ban of cand-1142 (primary in the <mark>Vorona</mark> ring) · executed alongside SB-0084 in the same synchronized batch · evidence chain attached.',
        crumb: ['TRUST & SAFETY', 'SUSPENSIONS', 'SB-2026-0085'],
        relevance: '89',
        status: 'active',
        statusLabel: 'Active',
      },
    ],
  },
  {
    iconType: 'audit',
    title: 'Audit logs',
    count: '3 hits',
    viewAllLink: 'View all 3 in Audit →',
    viewAllHref: '/admin/compliance/audit-logs',
    results: [
      {
        id: 'aud-2026-106102',
        isCanonical: true,
        href: '/admin/compliance/audit-logs/aud-2026-106102',
        avatar: { kind: 'icon', iconKey: 'bar-chart' },
        title: 'Synchronized ban · <mark>Vorona</mark> ring · hash chain entry',
        idLabel: 'AUD-2026-106102',
        metaHtml:
          '5 ban events within 30s window · sha256 hash chain integrity verified · linked to FA-2026-0042 · authorized by Aïsha (DPO) · executed by Mateo + Daniel.',
        crumb: ['COMPLIANCE', 'AUDIT LOGS', 'AUD-2026-106102'],
        relevance: '93 · top',
        status: 'active',
        statusLabel: 'Verified',
      },
      {
        id: 'aud-2026-105874',
        href: '/admin/compliance/audit-logs/aud-2026-106102',
        avatar: { kind: 'icon', iconKey: 'bar-chart' },
        title: 'Evidence-package access · <mark>Vorona</mark> case folder',
        idLabel: 'AUD-2026-105874',
        metaHtml:
          'Read access to /evidence/FA-2026-0042/* · 18 events · Aïsha + Daniel + counsel · all within authorized roles.',
        crumb: ['COMPLIANCE', 'AUDIT LOGS', 'AUD-2026-105874'],
        relevance: '81',
        status: 'active',
        statusLabel: 'Verified',
      },
      {
        id: 'aud-2026-107412',
        href: '/admin/compliance/audit-logs/aud-2026-106102',
        avatar: { kind: 'icon', iconKey: 'bar-chart' },
        title: 'DSR receipt · <mark>Marek</mark> Art.17 deletion',
        idLabel: 'AUD-2026-107412',
        metaHtml:
          'DSR-2026-0089 received · clock started · routed to Aïsha (DPO) · 30-day SLA · system-generated audit entry.',
        crumb: ['COMPLIANCE', 'AUDIT LOGS', 'AUD-2026-107412'],
        relevance: '74',
        status: 'active',
        statusLabel: 'Verified',
      },
    ],
  },
  {
    iconType: 'compliance',
    title: 'Compliance · data subject rights',
    count: '1 hit',
    viewAllLink: 'View all 1 in Compliance →',
    viewAllHref: '/admin/compliance/data-subject-rights',
    results: [
      {
        id: 'dsr-2026-0089',
        href: '/admin/compliance/data-subject-rights/DSR-2026-0089',
        avatar: { kind: 'icon', iconKey: 'lock' },
        title: '<mark>Marek</mark> Söderberg · GDPR Art.17 deletion request',
        idLabel: 'DSR-2026-0089',
        metaHtml:
          'Filed by primary subject in the <mark>Vorona</mark> ring · DSR clock at 30 days · DPO Aïsha assigned · cross-links to FA-2026-0042 (legitimate interest exemption under Art.17(3)(e) likely applies).',
        crumb: ['COMPLIANCE', 'DATA SUBJECT RIGHTS', 'DSR-2026-0089'],
        relevance: '88',
        status: 'investigating',
        statusLabel: 'Pending',
      },
    ],
  },
  {
    iconType: 'internal',
    title: 'Internal knowledge base',
    count: '3 hits',
    viewAllLink: 'View all 3 in Internal →',
    viewAllHref: '/admin/internal/knowledge-base',
    results: [
      {
        id: 'kb-vorona-ring',
        isCanonical: true,
        href: '/admin/internal/knowledge-base/kb-vorona-ring-sop',
        avatar: { kind: 'icon', iconKey: 'clipboard' },
        title: 'Coordinated-fraud-ring response · SOP v6',
        idLabel: 'kb.fraud.coordinated_ring_response',
        metaHtml:
          'Rewritten in April after the <mark>Vorona</mark> ring (FA-0042) · 4 phases · 27 steps · SME Aïsha · last verified Apr 18 · fresh. References cand-1142 + 4 satellites · AUD-106102 · SB-0084/0085.',
        crumb: ['INTERNAL OPS', 'KNOWLEDGE BASE', 'FRAUD PLAYBOOKS'],
        relevance: '95 · top',
        status: 'active',
        statusLabel: 'Live · v6',
      },
      {
        id: 'kb-single-account',
        href: '/admin/internal/knowledge-base/kb-single-fraud',
        avatar: { kind: 'icon', iconKey: 'clipboard' },
        title: 'Single-account fraud · escalation flow SOP',
        idLabel: 'kb.fraud.single_account_flow',
        metaHtml:
          'Mentions <mark>Vorona</mark> in the "when to escalate to coordinated-ring SOP" decision diamond · stale · 150d since last SME verify.',
        crumb: ['INTERNAL OPS', 'KNOWLEDGE BASE', 'FRAUD PLAYBOOKS'],
        relevance: '66',
        status: 'investigating',
        statusLabel: 'Stale',
      },
      {
        id: 'internal-comms-vorona',
        href: '/admin/internal/communications',
        avatar: { kind: 'icon', iconKey: 'speech' },
        title: 'Internal comms · post-mortem thread on <mark>Vorona</mark> response',
        metaHtml:
          "Mateo's announcement to the team summarizing the FA-0042 response · 18 replies · pinned in #sec-incident · referenced in the Q2 review.",
        crumb: ['INTERNAL OPS', 'COMMUNICATIONS', 'THREADS'],
        relevance: '61',
        status: 'active',
        statusLabel: 'Active',
      },
    ],
  },
  {
    iconType: 'notifications',
    title: 'Notifications',
    count: '2 hits',
    viewAllLink: 'View all 2 in Notifications →',
    viewAllHref: '/admin/notifications',
    results: [
      {
        id: 'nt-search-vorona',
        href: '/admin/notifications',
        avatar: { kind: 'icon', iconKey: 'bell' },
        title: 'Coordinated-fraud-ring detected · <mark>Vorona</mark>',
        metaHtml:
          'Active critical notification · 2 min ago · "5 linked accounts · primary Marek (cand-1142) + 4 satellites · confidence 94%" · acknowledged by Aïsha.',
        crumb: ['NOTIFICATIONS', 'TODAY', 'CRITICAL'],
        relevance: '87',
        status: 'investigating',
        statusLabel: 'Critical',
      },
      {
        id: 'nt-search-audit',
        href: '/admin/notifications',
        avatar: { kind: 'icon', iconKey: 'bell' },
        title: 'Audit anomaly · synchronized ban on <mark>Vorona</mark> ring',
        metaHtml:
          'Resolved · 5h ago · "Heuristic flagged 5 ban events within 30s window · matched AUD-2026-106102 · classified as authorized · no action needed".',
        crumb: ['NOTIFICATIONS', 'TODAY', 'AUDIT'],
        relevance: '71',
        status: 'resolved',
        statusLabel: 'Resolved',
      },
    ],
  },
];

export const gsEmptyGroup: GsEmptyGroup = {
  iconType: 'transactions',
  title: 'Transactions · Disputes · Jobs · Engagements · Help Center',
  count: '0 hits',
  emptyHtml:
    'No matches in <strong>5 categories</strong> · the <mark>Vorona</mark> entity is internally identifiable (users, fraud, audit, suspensions, DSR, internal docs, notifications) but does not appear in transactional, dispute, or job-posting data · this is expected for a fraud ring.',
};

export const gsRecentRows: GsRecentRow[] = [
  {
    query: 'DSP-2026-0144',
    meta: '3 results · yesterday · Stefan/Tomás dispute',
    href: '/admin/operations/disputes/dsp-144',
  },
  {
    query: 'cl-167',
    meta: '7 results · 3 days ago · Stefan (failing-payment client)',
    href: '/admin/users/clients/cl-001-acme',
  },
  {
    query: 'vetting cooldown',
    meta: '4 results · last week · stale SOP investigation',
    href: '/admin/internal/knowledge-base/kb-vetting-cooldown',
  },
];

export const gsRecentCardTitle = 'RECENT SEARCHES · YOUR HISTORY';

export const gsSidebarCategories: GsSidebarCategory[] = [
  { key: 'all', label: 'All results', count: '18', iconKey: 'square', active: true },
  { key: 'users', label: 'Users', count: '5', iconKey: 'users' },
  { key: 'fraud', label: 'Fraud', count: '2', iconKey: 'triangle-alert' },
  { key: 'suspensions', label: 'Suspensions', count: '2', iconKey: 'ban-circle' },
  { key: 'audit', label: 'Audit logs', count: '3', iconKey: 'bar-chart' },
  { key: 'compliance', label: 'Compliance', count: '1', iconKey: 'lock' },
  { key: 'transactions', label: 'Transactions', count: '0', iconKey: 'card' },
  { key: 'disputes', label: 'Disputes', count: '0', iconKey: 'info' },
  { key: 'jobs', label: 'Job postings', count: '0', iconKey: 'briefcase' },
  { key: 'engagements', label: 'Engagements', count: '0', iconKey: 'box' },
  { key: 'help', label: 'Help Center', count: '0', iconKey: 'help-circle' },
  { key: 'internal', label: 'Internal docs', count: '3', iconKey: 'book' },
  { key: 'notifications', label: 'Notifications', count: '2', iconKey: 'bell' },
];
