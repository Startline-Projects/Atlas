/* Step 38 (Scope Step 37) — Notifications Center fixture (Pass A: header + stats + filters + tabs)
   Verbatim from admin.html lines 67081-67159.
   Day-grouped notification feed added in Pass B. */

import type { PrStat } from './privacy-reports-data';

export type NfcHeaderIcon = 'funnel' | 'gear' | 'check';

export interface NfcHeaderAction {
  label: string;
  icon: NfcHeaderIcon;
  isPrimary?: boolean;
}

export interface NfcFilterChip {
  label: string;
  count: string;
  value: string;
  active?: boolean;
}

export type NfcTabKey = 'unread' | 'all' | 'archived';

export interface NfcTab {
  key: NfcTabKey;
  label: string;
  count: string;
}

export interface NfcPageMeta {
  title: string;
  metaText: string;
}

export const nfcPageMeta: NfcPageMeta = {
  title: 'Notifications',
  metaText:
    '/admin/notifications · admin-specific · separate from specialist/manager streams · real-time updates · last refresh 4s ago',
};

export const nfcMetaPulseHtml =
  '3 critical items require attention · FA-2026-0042 · REF-2026-0084 · INC-2026-058';

export const nfcHeaderActions: NfcHeaderAction[] = [
  { label: 'Filter', icon: 'funnel' },
  { label: 'Settings', icon: 'gear' },
  { label: 'Mark all read', icon: 'check', isPrimary: true },
];

export const nfcTopStats: PrStat[] = [
  {
    label: 'Unread',
    value: '14',
    meta: '<strong>3 critical</strong> · 5 high · 6 info',
  },
  {
    label: 'Critical priority',
    value: '3',
    variant: 'danger',
    meta: 'avg time-to-acknowledge 8min',
  },
  {
    label: 'Today',
    value: '11',
    meta: '↑ +47% vs avg · FA-0042 surge',
  },
  {
    label: 'This week',
    value: '62',
    meta: 'stable · within p75 band',
  },
  {
    label: 'Archived',
    value: '8,420',
    meta: 'all time · retention 7y',
  },
];

export const nfcFilterChips: NfcFilterChip[] = [
  { label: 'All', count: '14', value: 'all', active: true },
  { label: 'Critical', count: '3', value: 'critical' },
  { label: 'Fraud', count: '2', value: 'fraud' },
  { label: 'Compliance', count: '3', value: 'compliance' },
  { label: 'Finance', count: '2', value: 'finance' },
  { label: 'Platform', count: '2', value: 'platform' },
  { label: 'Performance', count: '1', value: 'performance' },
  { label: 'Pool', count: '1', value: 'pool' },
];

export const nfcTabs: NfcTab[] = [
  { key: 'unread', label: 'Unread', count: '14' },
  { key: 'all', label: 'All', count: '198' },
  { key: 'archived', label: 'Archived', count: '8,420' },
];

/* ============================================================
   PASS B — Day-grouped notification feed
   admin.html lines 67161-67483
   ============================================================ */

export type NfcRowState =
  | 'default'
  | 'unread'
  | 'critical'
  | 'unread-critical';

export type NfcIconType =
  | 'fraud'
  | 'finance'
  | 'platform'
  | 'compliance'
  | 'pool'
  | 'performance'
  | 'audit'
  | 'subscription';

export type NfcPriorityVariant = 'critical' | 'high' | 'info' | 'resolved';

export interface NfcQuickAction {
  label: string;
  ariaLabel: string;
}

export interface NfcNotificationRow {
  id: string;
  state: NfcRowState;
  iconType: NfcIconType;
  title: string;
  priority: NfcPriorityVariant;
  priorityLabel: string;
  metaHtml: string;
  time: string;
  href: string;
  openAction: NfcQuickAction;
}

export interface NfcDayGroup {
  label: string;
  countMeta: string;
  rows: NfcNotificationRow[];
}

export interface NfcFooterData {
  summaryText: string;
  loadEarlierLabel: string;
}

export const nfcDayGroups: NfcDayGroup[] = [
  {
    label: 'TODAY · MAY 13',
    countMeta: '11 notifications · 3 critical · 8 unread',
    rows: [
      {
        id: 'nt-fa-0042',
        state: 'unread-critical',
        iconType: 'fraud',
        title: 'Coordinated-fraud-ring detected · FA-2026-0042',
        priority: 'critical',
        priorityLabel: 'Critical',
        metaHtml:
          '5 linked accounts · primary <strong>Marek (cand-1142)</strong> + 4 satellites · device+IP+payment overlap · confidence 94% · run the <strong>coordinated-ring SOP</strong>. ETA to enforcement window: 6h.',
        time: '2 min ago',
        href: '/admin/trust-safety/fraud-abuse/fa-2026-0042',
        openAction: { label: 'open-fraud', ariaLabel: 'Open' },
      },
      {
        id: 'nt-ref-0084',
        state: 'unread-critical',
        iconType: 'finance',
        title: 'Refund awaiting approval · REF-2026-0084',
        priority: 'critical',
        priorityLabel: 'Critical',
        metaHtml:
          '$1,250 to <strong>cl-167 (Stefan)</strong> · cited dispute <strong>DSP-2026-0144</strong> · approval window expires in <strong>4h 18m</strong> · pending Super Admin sign-off · Daniel (spec-001) attached evidence package.',
        time: '14 min ago',
        href: '/admin/finance/refunds',
        openAction: { label: 'open-refund', ariaLabel: 'Open' },
      },
      {
        id: 'nt-inc-058',
        state: 'unread-critical',
        iconType: 'platform',
        title: 'Active incident · INC-2026-058 · Datadog flapping',
        priority: 'critical',
        priorityLabel: 'Critical',
        metaHtml:
          'SEV-3 · Datadog agents flapping in us-east-1 · 4 of 14 agents affected · commander <strong>Marek S.</strong> · responder <strong>Aïsha O.</strong> · 28min elapsed · monitoring impact on Step 30 metrics.',
        time: '28 min ago',
        href: '/admin/internal/incidents/inc-2026-058',
        openAction: { label: 'open-incident', ariaLabel: 'Open' },
      },
      {
        id: 'nt-dsr-0089',
        state: 'unread',
        iconType: 'compliance',
        title: 'Data subject request received · DSR-2026-0089',
        priority: 'high',
        priorityLabel: 'High',
        metaHtml:
          'GDPR Art.17 deletion · subject <strong>Marek S. (cand-1142)</strong> · received 1h ago · SLA <strong>30 days</strong> · clock starts now · routed to <strong>Aïsha (DPO)</strong> · cross-links to FA-2026-0042.',
        time: '1h ago',
        href: '/admin/compliance/data-subject-rights/dsr-2026-0089',
        openAction: { label: 'open-dsr', ariaLabel: 'Open' },
      },
      {
        id: 'nt-pool-data',
        state: 'unread',
        iconType: 'pool',
        title: 'Pool crisis · Data & Analytics depth at 38%',
        priority: 'high',
        priorityLabel: 'High',
        metaHtml:
          'Cluster <strong>Data &amp; Analytics</strong> · 892 candidates · 94 open jobs · only Daniel cross-covers · supply gap widening · informs Q3 hiring plan · cross-ref Step 33.',
        time: '2h ago',
        href: '/admin/internal/performance',
        openAction: { label: 'open-performance', ariaLabel: 'Open' },
      },
      {
        id: 'nt-perf-lina',
        state: 'unread',
        iconType: 'performance',
        title: 'Performance flag · Lina Almeida (spec-007)',
        priority: 'info',
        priorityLabel: 'Info',
        metaHtml:
          'SLA 89.2% · below 95% target · response time 4.6h vs 4h target · normal ramp curve at 3mo · <strong>1:1 scheduled this Fri</strong> with Mateo · ramp peers crossed targets at month 4-5.',
        time: '3h ago',
        href: '/admin/users/specialists/spec-007',
        openAction: { label: 'open-performance', ariaLabel: 'Open' },
      },
      {
        id: 'nt-aud-106102',
        state: 'default',
        iconType: 'audit',
        title: 'Audit anomaly · synchronized ban detected',
        priority: 'resolved',
        priorityLabel: 'Resolved',
        metaHtml:
          'Heuristic flagged 5 ban events within 30s window · matched <strong>AUD-2026-106102</strong> · investigated · classified as <strong>authorized coordinated enforcement</strong> · linked to FA-2026-0042 · no action needed.',
        time: '5h ago',
        href: '/admin/compliance/audit-logs/aud-2026-106102',
        openAction: { label: 'open-audit-detail', ariaLabel: 'Open' },
      },
      {
        id: 'nt-tx-08442',
        state: 'unread',
        iconType: 'subscription',
        title: 'Payment failure · TX-2026-08442',
        priority: 'high',
        priorityLabel: 'High',
        metaHtml:
          'Stripe payment_intent.payment_failed · $4,200 · cl-167 · card declined · 3rd retry exhausted · client notified · awaiting card update · 24h grace.',
        time: '6h ago',
        href: '/admin/finance/transactions/tx-2026-08442',
        openAction: { label: 'open-transaction', ariaLabel: 'Open' },
      },
    ],
  },
  {
    label: 'YESTERDAY · MAY 12',
    countMeta: '8 notifications · 5 unread',
    rows: [
      {
        id: 'nt-lr-0023',
        state: 'unread',
        iconType: 'compliance',
        title: 'Legal request received · LR-2026-0023',
        priority: 'high',
        priorityLabel: 'High',
        metaHtml:
          'SDNY subpoena · service of process · 14-day response window · routed to <strong>counsel (external)</strong> + <strong>Aïsha (DPO)</strong> · cross-link to data subject scope.',
        time: '18h ago',
        href: '/admin/compliance/legal-requests/lr-2026-0023',
        openAction: { label: 'open-legal', ariaLabel: 'Open' },
      },
      {
        id: 'nt-rev-834',
        state: 'default',
        iconType: 'fraud',
        title: 'Sock-puppet review cluster · REV-834',
        priority: 'resolved',
        priorityLabel: 'Resolved',
        metaHtml:
          '7 fake reviews from cluster of 4 accounts · removed · accounts quarantined · client (cl-088 Acme Robotics) score restored · ratings recomputed.',
        time: '1d ago',
        href: '/admin/operations/reviews/rev-834',
        openAction: { label: 'open-fraud', ariaLabel: 'Open' },
      },
      {
        id: 'nt-maint',
        state: 'default',
        iconType: 'platform',
        title: 'Scheduled maintenance · Sun May 18 · 02:00-04:00 UTC',
        priority: 'info',
        priorityLabel: 'Info',
        metaHtml:
          'Postgres minor-version upgrade · expected downtime <strong>10–15 minutes</strong> within window · client + candidate banners scheduled · runbook attached.',
        time: '1d ago',
        href: '/admin/dashboard',
        openAction: { label: 'open-maint', ariaLabel: 'Open' },
      },
    ],
  },
];

export const nfcFooter: NfcFooterData = {
  summaryText:
    'Showing 11 of 14 unread · 2 in "earlier this week" · 1 awaiting category tagging',
  loadEarlierLabel: 'Load earlier →',
};

/* ============================================================
   Bell-icon dropdown (compact view in topbar)
   admin.html markup lines 34382-34455, CSS lines 1939-2140
   Uses simpler notif-* class family — distinct from full-page nt-* family
   ============================================================ */

export type NfcDropdownIconVariant = 'urgent' | 'today' | 'week';

export interface NfcDropdownItem {
  categoryTag: string;
  title: string;
  time: string;
  iconVariant: NfcDropdownIconVariant;
  isUnread: boolean;
  href: string;
}

export interface NfcDropdownData {
  headerTitle: string;
  unreadCountText: string;
  markAllLabel: string;
  items: NfcDropdownItem[];
  footerLinkLabel: string;
  footerHref: string;
}

export const nfcDropdownData: NfcDropdownData = {
  headerTitle: 'Notifications',
  unreadCountText: '7 unread',
  markAllLabel: 'Mark all read',
  items: [
    {
      categoryTag: 'TRUST & SAFETY',
      title:
        'Critical fraud alert: 7 accounts flagged with multiple-account patterns',
      time: '3 min ago',
      iconVariant: 'urgent',
      isUnread: true,
      href: '/admin/trust-safety/fraud-abuse',
    },
    {
      categoryTag: 'COMPLIANCE',
      title: 'Legal request received with 48h deadline',
      time: '12 min ago',
      iconVariant: 'urgent',
      isUnread: true,
      href: '/admin/compliance/legal-requests',
    },
    {
      categoryTag: 'OPERATIONS',
      title: '12 disputes have exceeded 72-hour SLA',
      time: '1 hour ago',
      iconVariant: 'today',
      isUnread: true,
      href: '/admin/operations/disputes',
    },
    {
      categoryTag: 'FINANCE',
      title: '8 refunds awaiting your approval — $14,250 total',
      time: '2 hours ago',
      iconVariant: 'today',
      isUnread: true,
      href: '/admin/finance/refunds',
    },
    {
      categoryTag: 'PERFORMANCE',
      title: 'Pool depletion: Senior Engineers below 40%',
      time: '4 hours ago',
      iconVariant: 'week',
      isUnread: false,
      href: '/admin/internal/performance',
    },
    {
      categoryTag: 'TEAM',
      title: 'Performance review overdue: 2 specialists',
      time: '5 hours ago',
      iconVariant: 'today',
      isUnread: false,
      href: '/admin/users/specialists',
    },
    {
      categoryTag: 'FINANCE',
      title: '14 subscription renewals approaching this week',
      time: '6 hours ago',
      iconVariant: 'week',
      isUnread: false,
      href: '/admin/finance/transactions',
    },
  ],
  footerLinkLabel: 'View all notifications →',
  footerHref: '/admin/notifications',
};
