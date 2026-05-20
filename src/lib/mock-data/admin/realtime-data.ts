/* Step 41 (Scope 40) — Real-time updates fixtures.
   Pass A: topbar connection-pill defaults. Connection labels + latency text verbatim from
   admin.html JS setRtConnectionState (lines 81512-81528): live "Live"/"14ms", reconnect
   "Reconnect"/"— ms", offline "Offline"/"".
   Pass B: live-event ticker (10 events).
   Pass C: #realtime page — header + 5 stats + 6 channel cards + 6 subscribers + §03 surfaces.
   All Pass C content VERBATIM from admin.html lines 68317-68752. Step cross-links resolve to
   existing LIST routes (rtStepRoutes map, admin.html JS 81458-81467). */

import type { PrStat } from './privacy-reports-data';

export type RtConnectionState = 'live' | 'reconnect' | 'offline';

export const rtTopbarDefaults = {
  label: 'Live',
  latencyMs: 14,
};

export const rtConnectionLabels: Record<RtConnectionState, string> = {
  live: 'Live',
  reconnect: 'Reconnect',
  offline: 'Offline',
};

/* ---------- Pass B · live-event ticker ---------- */

export type RtEventIconType =
  | 'payment'
  | 'candidate'
  | 'dispute'
  | 'audit'
  | 'fraud'
  | 'review'
  | 'metric';

export interface RtEventRow {
  id: string;
  iconType: RtEventIconType;
  title: string;
  meta: string;
  time: string;
  dataRoute: string;
  href: string;
  isFresh?: boolean;
}

export interface RtTickerData {
  headTitle: string;
  headMeta: string;
  events: RtEventRow[];
  footStats: string;
  footLinkLabel: string;
  footLinkHref: string;
}

/* 10 events VERBATIM from admin.html lines 68196-68304.
   href resolved to EXISTING detail routes (audited against generateStaticParams) — no 404s:
   - audit AUD-2026-106102 → audit-logs/aud-2026-106102 (exact)
   - dispute DSP-2026-0162 → disputes/dsp-162 (exact)
   - fraud FA-2026-0042 → fraud-abuse/fa-2026-0042 (exact)
   - transactions (Stripe pi / Wise — no real tx id) → canonical tx-2026-08442 / tx-2026-08441
   - review → canonical rev-834
   - users (cand-3247 / cand-2841 not in SSG) → candidates LIST
   - performance → performance page; generic admin login → audit-logs LIST */
export const rtTickerData: RtTickerData = {
  headTitle: 'Live activity',
  headMeta: '12 events / min',
  events: [
    {
      id: 'rt-evt-1',
      iconType: 'audit',
      title: 'Audit entry · synchronized-ban event',
      meta: 'AUD-2026-106102 · Aïsha signed off · hash chain verified',
      time: '2s',
      dataRoute: 'audit-logs',
      href: '/admin/compliance/audit-logs/aud-2026-106102',
      isFresh: true,
    },
    {
      id: 'rt-evt-2',
      iconType: 'payment',
      title: 'Payment succeeded · $1,250.00',
      meta: 'cl-002 Studio Berlin · Stripe pi_3N8bC9',
      time: '14s',
      dataRoute: 'transactions',
      href: '/admin/finance/transactions/tx-2026-08442',
    },
    {
      id: 'rt-evt-3',
      iconType: 'candidate',
      title: 'New candidate signed up',
      meta: 'cand-3247 · SWE · IN · application queued',
      time: '32s',
      dataRoute: 'users',
      href: '/admin/users/candidates',
    },
    {
      id: 'rt-evt-4',
      iconType: 'metric',
      title: 'Active engagements · 1,847 → 1,848',
      meta: 'Daniel · spec-001 · new engagement started',
      time: '48s',
      dataRoute: 'performance',
      href: '/admin/internal/performance',
    },
    {
      id: 'rt-evt-5',
      iconType: 'review',
      title: '5-star review posted',
      meta: 'cl-088 Acme Robotics · post-engagement · sentiment +',
      time: '1m',
      dataRoute: 'reviews',
      href: '/admin/operations/reviews/rev-834',
    },
    {
      id: 'rt-evt-6',
      iconType: 'dispute',
      title: 'Dispute opened · DSP-2026-0162',
      meta: 'Mateo assigned · 7-day SLA clock started',
      time: '2m',
      dataRoute: 'disputes',
      href: '/admin/operations/disputes/dsp-162',
    },
    {
      id: 'rt-evt-7',
      iconType: 'payment',
      title: 'Wise payout completed · €4,820',
      meta: 'cand-019 Tomás · transfer.completed',
      time: '2m',
      dataRoute: 'transactions',
      href: '/admin/finance/transactions/tx-2026-08441',
    },
    {
      id: 'rt-evt-8',
      iconType: 'fraud',
      title: 'FA-2026-0042 · evidence updated',
      meta: 'Daniel attached link graph · 18 events on case',
      time: '3m',
      dataRoute: 'fraud',
      href: '/admin/trust-safety/fraud-abuse/fa-2026-0042',
    },
    {
      id: 'rt-evt-9',
      iconType: 'candidate',
      title: 'Vetting call completed · cand-2841',
      meta: 'passed · Carolina · pool eligible · India · People',
      time: '4m',
      dataRoute: 'users',
      href: '/admin/users/candidates',
    },
    {
      id: 'rt-evt-10',
      iconType: 'audit',
      title: 'Admin login · Dario · MFA verified',
      meta: 'Super Admin · session_id sess_8nF2 · audit-logged',
      time: '6m',
      dataRoute: 'audit-logs',
      href: '/admin/compliance/audit-logs',
    },
  ],
  footStats: '10 of 47 events · since 13:00 UTC',
  footLinkLabel: 'Manage subscriptions →',
  footLinkHref: '/admin/realtime',
};

/* ---------- Pass C · #realtime subscription-management page ---------- */

export interface RtPageMeta {
  title: string;
  meta: string;
  pulseLabel: string;
}

export interface RtPageAction {
  id: 'open-ticker' | 'reconnect' | 'add-subscription';
  label: string;
  isPrimary: boolean;
}

export type RtChannelIconKey =
  | 'payments'
  | 'audit'
  | 'users'
  | 'safety'
  | 'performance'
  | 'incidents';

export interface RtChannelMetric {
  label: string;
  value: string;
  suffix?: string;
  tone?: 'success' | 'warn';
}

export interface RtChannelCard {
  id: string;
  iconKey: RtChannelIconKey;
  title: string;
  channelCode: string;
  metrics: RtChannelMetric[];
  footNoteHtml: string;
  stepLabel: string;
  stepHref: string;
}

export interface RtSubscriber {
  id: string;
  initials: string;
  avatarGradient: string;
  name: string;
  channels: string;
  rate: string;
  rateMeta?: string;
  status: 'online' | 'idle';
}

export interface RtSurfaceCell {
  linkLabel: string;
  stepSuffix: string;
  href: string;
  descPrefix: string;
  livePulse?: boolean;
  descSuffix?: string;
}

export const rtPageMeta: RtPageMeta = {
  title: 'Real-time updates',
  meta: '/admin/realtime · WebSocket subscription management · live system · audit-logged',
  pulseLabel:
    'Connection healthy · 14ms latency · 12 channels subscribed · 47 events / min',
};

export const rtPageActions: RtPageAction[] = [
  { id: 'open-ticker', label: 'Open ticker', isPrimary: false },
  { id: 'reconnect', label: 'Force reconnect', isPrimary: false },
  { id: 'add-subscription', label: 'Subscribe to channel', isPrimary: true },
];

export const rtPageStats: PrStat[] = [
  {
    label: 'Connection',
    value: 'Live',
    variant: 'success',
    meta: '14ms p50 · 38ms p95 · uptime 99.98% / 30d',
  },
  {
    label: 'Channels',
    value: '12',
    suffix: '/ 14',
    meta: '2 paused · 0 errored',
  },
  {
    label: 'Events · min',
    value: '47',
    meta: '↑ +12% vs avg · steady',
  },
  {
    label: 'Active subscribers',
    value: '9',
    meta: 'across admin team · incl. Aïsha + Mateo + Daniel',
  },
  {
    label: 'Today · events',
    value: '38,420',
    meta: 'since 00:00 UTC · within p75 band',
  },
];

export const rtChannelsSectionMeta =
  'each channel maps to a domain event stream · subscriptions are role-scoped · all changes audit-logged via ';

export const rtChannels: RtChannelCard[] = [
  {
    id: 'rt-ch-payments',
    iconKey: 'payments',
    title: 'Payments & payouts',
    channelCode: 'events.payments.*',
    metrics: [
      { label: 'Events / min', value: '14' },
      { label: 'Latency', value: '12', suffix: 'ms', tone: 'success' },
      { label: 'Errors · 24h', value: '0' },
    ],
    footNoteHtml: 'subscribed by <strong>9 admins</strong> · cross-ref ',
    stepLabel: 'Step 19',
    stepHref: '/admin/finance/transactions',
  },
  {
    id: 'rt-ch-audit',
    iconKey: 'audit',
    title: 'Audit chain',
    channelCode: 'events.audit.*',
    metrics: [
      { label: 'Events / min', value: '22' },
      { label: 'Latency', value: '8', suffix: 'ms', tone: 'success' },
      { label: 'Hash integrity', value: 'OK', tone: 'success' },
    ],
    footNoteHtml: 'highest throughput · hash chain verified per event · ',
    stepLabel: 'Step 25',
    stepHref: '/admin/compliance/audit-logs',
  },
  {
    id: 'rt-ch-users',
    iconKey: 'users',
    title: 'Users · candidates & clients',
    channelCode: 'events.users.*',
    metrics: [
      { label: 'Events / min', value: '6' },
      { label: 'Latency', value: '11', suffix: 'ms', tone: 'success' },
      { label: 'Errors · 24h', value: '0' },
    ],
    footNoteHtml: 'signups · profile updates · status changes · ',
    stepLabel: 'Step 3',
    stepHref: '/admin/users/candidates',
  },
  {
    id: 'rt-ch-safety',
    iconKey: 'safety',
    title: 'Trust & Safety alerts',
    channelCode: 'events.safety.*',
    metrics: [
      { label: 'Events / min', value: '2' },
      { label: 'Latency', value: '14', suffix: 'ms', tone: 'success' },
      { label: 'Critical · 24h', value: '3', tone: 'warn' },
    ],
    footNoteHtml: 'FA-* fraud · SB-* suspensions · FA-2026-0042 live · ',
    stepLabel: 'Step 15',
    stepHref: '/admin/trust-safety/fraud-abuse',
  },
  {
    id: 'rt-ch-performance',
    iconKey: 'performance',
    title: 'Team performance',
    channelCode: 'events.performance.*',
    metrics: [
      { label: 'Events / min', value: '1' },
      { label: 'Latency', value: '9', suffix: 'ms', tone: 'success' },
      { label: 'Tier', value: 'Mgmt' },
    ],
    footNoteHtml: 'engagement counts · SLA breaches · CSAT · ',
    stepLabel: 'Step 33',
    stepHref: '/admin/internal/performance',
  },
  {
    id: 'rt-ch-incidents',
    iconKey: 'incidents',
    title: 'Incident telemetry',
    channelCode: 'events.incidents.*',
    metrics: [
      { label: 'Events / min', value: '2' },
      { label: 'Latency', value: '17', suffix: 'ms', tone: 'success' },
      { label: 'Active', value: 'INC-058', tone: 'warn' },
    ],
    footNoteHtml: 'Datadog telemetry · INC-2026-058 active · ',
    stepLabel: 'Step 34',
    stepHref: '/admin/internal/incidents',
  },
];

export const rtChannelsFootnote =
  'Showing 6 of 12 subscribed channels · 6 lower-volume channels collapsed (engagements · jobs · reviews · disputes · DSR · regulatory) · ';

export const rtSubscribers: RtSubscriber[] = [
  {
    id: 'rt-sub-ao',
    initials: 'AO',
    avatarGradient: 'linear-gradient(135deg, #6E3FE0, #3D2B5A)',
    name: 'Aïsha Omar (DPO · Compliance)',
    channels:
      '8 channels · audit · users · safety · DSR · legal · payments · incidents · performance',
    rate: '22 / min',
    rateMeta: 'peak today',
    status: 'online',
  },
  {
    id: 'rt-sub-dc',
    initials: 'DC',
    avatarGradient: 'linear-gradient(135deg, #C2412B, #8A2C1E)',
    name: 'Dario Cisneros (Super Admin)',
    channels: '14 channels · all (Super Admin scope)',
    rate: '47 / min',
    rateMeta: 'all channels',
    status: 'online',
  },
  {
    id: 'rt-sub-mk',
    initials: 'MK',
    avatarGradient: 'linear-gradient(135deg, #2E7D54, #1F5239)',
    name: 'Mateo Kowalski (Manager)',
    channels:
      '6 channels · disputes · escalations · performance · users · audit · incidents',
    rate: '18 / min',
    status: 'online',
  },
  {
    id: 'rt-sub-dp',
    initials: 'DP',
    avatarGradient: 'linear-gradient(135deg, #4F6BED, #2540A8)',
    name: 'Daniel Park (Specialist · spec-001)',
    channels: '4 channels · users · safety · audit · engagements (own queue)',
    rate: '11 / min',
    status: 'online',
  },
  {
    id: 'rt-sub-pi',
    initials: 'PI',
    avatarGradient: 'linear-gradient(135deg, #B85A8F, #7E3D62)',
    name: 'Priya Iyer (Specialist · spec-002)',
    channels: '3 channels · users · audit · engagements',
    rate: '8 / min',
    status: 'online',
  },
  {
    id: 'rt-sub-la',
    initials: 'LA',
    avatarGradient: 'linear-gradient(135deg, #8B6F47, #5C4A2E)',
    name: 'Lina Almeida (Specialist · spec-007)',
    channels: '3 channels · engagements · users · audit (ramping role)',
    rate: '4 / min',
    rateMeta: 'idle 12min',
    status: 'idle',
  },
];

export const rtSubscribersFootnote =
  'Showing 6 of 9 online · 3 specialists not shown · sorted by event rate desc · ';

export const rtSurfaceIntroHtml =
  "Real-time is not a separate page or feature — it's a <strong>substrate layer</strong> running underneath every operational page in Atlas. Specific surfaces become live when their underlying channel is subscribed:";

export const rtSurfaceCells: RtSurfaceCell[] = [
  {
    linkLabel: 'Dashboard',
    stepSuffix: ' · Step 2',
    href: '/admin/dashboard',
    descPrefix:
      'Alert cards · queue counts · live engagement count · all subscribed to relevant channels · ',
    livePulse: true,
    descSuffix: ' pulse next to each.',
  },
  {
    linkLabel: 'Audit logs',
    stepSuffix: ' · Step 25',
    href: '/admin/compliance/audit-logs',
    descPrefix:
      'Highest-volume channel · 22 events/min · auto-append at top · hash chain verified per insertion.',
  },
  {
    linkLabel: 'Performance',
    stepSuffix: ' · Step 33',
    href: '/admin/internal/performance',
    descPrefix:
      'Specialist engagement counts tick · SLA % updates live · composite grades recompute every 5min.',
  },
  {
    linkLabel: 'Notifications',
    stepSuffix: ' · Step 37',
    href: '/admin/notifications',
    descPrefix:
      'Bell badge updates · ticker pings · new notifications animate-in via the same WebSocket connection.',
  },
  {
    linkLabel: 'Incident reports',
    stepSuffix: ' · Step 34',
    href: '/admin/internal/incidents',
    descPrefix:
      'Active incidents (INC-2026-058) update in real time · timer ticks · responder status changes.',
  },
  {
    linkLabel: 'Fraud detection',
    stepSuffix: ' · Step 15',
    href: '/admin/trust-safety/fraud-abuse',
    descPrefix:
      'FA-* case timelines · new evidence attachments appear · ring topology graph recomputes.',
  },
];

export const rtSurfaceImplNoteHtml =
  '<strong>Implementation note:</strong> All channels run over a single multiplexed WebSocket connection at <code>wss://api.atlas.staffva/realtime</code>. Subscriptions are role-scoped — Specialists can only subscribe to channels for users in their queue. Disconnections auto-reconnect with exponential backoff. The connection state is visible at all times via the topbar pill.';
