/* Step 35 — Internal incident reports fixture
   Verbatim from admin.html lines 64857-65123 (LIST view).
   Detail-view fixtures will be added in Pass B.
   Distinct from Step 16 (external security incidents · SI-*). */

import type { PrStat } from './privacy-reports-data';

export type IcSevVariant = 'sev-0' | 'sev-1' | 'sev-2' | 'sev-3';
export type IcStatusVariant = 'open' | 'mitigated' | 'monitoring' | 'resolved';
export type IcPmStatusVariant = 'complete' | 'pending' | 'not-required';

export type IcHeaderIcon = 'chart-line' | 'book' | 'triangle-alert';

export interface IcHeaderAction {
  label: string;
  icon: IcHeaderIcon;
  isPrimary?: boolean;
}

export interface IcFilterChip {
  label: string;
  count: string;
  value: string;
  active?: boolean;
}

export interface IcActiveStat {
  label: string;
  value: string;
  valueSuffix?: string;
  valueIsDanger?: boolean;
  meta: string;
}

export interface IcCalloutAction {
  label: string;
  isPrimary?: boolean;
  href?: string;
}

export interface IcActiveCallout {
  id: string;
  sev: IcSevVariant;
  status: IcStatusVariant;
  statusLabel: string;
  ageText: string;
  title: string;
  summaryHtml: string;
  stats: IcActiveStat[];
  footMetaHtml: string;
  footActions: IcCalloutAction[];
}

export interface IcIncidentRow {
  id: string;
  displayId: string;
  sev: IcSevVariant;
  title: string;
  metaHtml: string;
  duration: string;
  resolvedDate: string;
  resolvedRel: string;
  pmStatus: IcPmStatusVariant;
  pmText: string;
  isCanonical?: boolean;
}

export interface IcPageMeta {
  title: string;
  metaText: string;
}

export const icPageMeta: IcPageMeta = {
  title: 'Internal incidents',
  metaText:
    '/admin/internal/incidents · engineering & ops incidents · 14 YTD · MTTR 47min · 1 active',
};

export const icMetaPulseHtml =
  'INC-2026-058 · active SEV-3 · Datadog alerting flapping · investigating';

export const icSearchPlaceholder = 'Search INC-* by id, title…';

export const icHeaderActions: IcHeaderAction[] = [
  { label: 'Audit', icon: 'chart-line' },
  { label: 'Runbooks', icon: 'book' },
  { label: 'Declare incident', icon: 'triangle-alert', isPrimary: true },
];

export const icTopStats: PrStat[] = [
  {
    label: 'YTD incidents',
    value: '14',
    meta: '0 SEV-0 · 1 SEV-1 · 6 SEV-2 · 7 SEV-3',
  },
  {
    label: 'MTTR · 30d',
    value: '47',
    suffix: 'min',
    variant: 'success',
    meta: 'below 60min target',
  },
  {
    label: 'Active',
    value: '1',
    variant: 'warn',
    meta: 'SEV-3 · INC-2026-058',
  },
  {
    label: 'Post-mortems pending',
    value: '2',
    variant: 'warn',
    meta: 'due within 7d',
  },
  {
    label: 'SLO compliance',
    value: '99.94',
    suffix: '%',
    variant: 'success',
    meta: 'target 99.9% · 30d',
  },
];

export const icFilterChips: IcFilterChip[] = [
  { label: 'All', count: '14', value: 'all', active: true },
  { label: 'SEV-0', count: '0', value: 'sev-0' },
  { label: 'SEV-1', count: '1', value: 'sev-1' },
  { label: 'SEV-2', count: '6', value: 'sev-2' },
  { label: 'SEV-3', count: '7', value: 'sev-3' },
  { label: 'Active', count: '1', value: 'active' },
  { label: 'PM pending', count: '2', value: 'pm-pending' },
];

export const icActiveCallout: IcActiveCallout = {
  id: 'INC-2026-058',
  sev: 'sev-3',
  status: 'open',
  statusLabel: 'Investigating',
  ageText: 'declared 22 min ago',
  title:
    'Datadog alerting flapping · false positives in webhook latency monitors',
  summaryHtml:
    'Datadog has been firing intermittent SEV-3 alerts on Stripe webhook latency for the past 20 minutes despite p95 latency from <strong>Datadog APM</strong> and <strong>Stripe events log</strong> showing nominal values. Likely cause: <strong>Datadog agent v7.62 upgrade</strong> rolled out 35 min ago. Customer impact: <strong>none</strong>. On-call investigating; agent rollback considered.',
  stats: [
    {
      label: 'Detected',
      value: '22',
      valueSuffix: 'min ago',
      meta: 'PagerDuty · auto',
    },
    {
      label: 'Severity',
      value: 'SEV-3',
      meta: 'no customer impact',
    },
    {
      label: 'Affected',
      value: '0',
      meta: 'monitoring-only · alert noise',
    },
    {
      label: 'Responder',
      value: 'on-call',
      meta: 'infra rotation',
    },
  ],
  footMetaHtml:
    '<strong>Incident commander:</strong> on-call infra (Datadog channel #inc-058) · <strong>Comms lead:</strong> none assigned (no customer impact) · <strong>Updates:</strong> every 15 min in #inc-058',
  footActions: [
    { label: 'Join #inc-058' },
    {
      label: 'Open report →',
      isPrimary: true,
      href: '/admin/internal/incidents/inc-2026-058',
    },
  ],
};

export const icResolvedRows: IcIncidentRow[] = [
  {
    id: 'inc-2026-042',
    displayId: 'INC-2026-042',
    sev: 'sev-2',
    title: 'Stripe webhook delivery delays · 12min partial outage',
    metaHtml:
      'payment.* events delayed 5-12 min · 1 customer payment auto-retried · cross-ref Step 30 + TX-2026-08442',
    duration: '12 min',
    resolvedDate: 'Apr 18, 14:54',
    resolvedRel: '23 days ago',
    pmStatus: 'complete',
    pmText: '✓ Published',
    isCanonical: true,
  },
  {
    id: 'inc-2026-055',
    displayId: 'INC-2026-055',
    sev: 'sev-3',
    title: 'SendGrid delivery latency spike',
    metaHtml:
      'transactional email p95 1.2s → 4.8s for 18min · self-resolved · upstream',
    duration: '18 min',
    resolvedDate: 'May 4, 09:31',
    resolvedRel: '7 days ago',
    pmStatus: 'pending',
    pmText: '⏳ Pending · due May 11',
  },
  {
    id: 'inc-2026-053',
    displayId: 'INC-2026-053',
    sev: 'sev-2',
    title: 'Match algo regression · score threshold bug',
    metaHtml:
      'match threshold incorrectly applied to closed engagements · 42 phantom matches surfaced briefly',
    duration: '38 min',
    resolvedDate: 'May 1, 16:42',
    resolvedRel: '10 days ago',
    pmStatus: 'pending',
    pmText: '⏳ Pending · due May 8 (overdue)',
  },
  {
    id: 'inc-2026-049',
    displayId: 'INC-2026-049',
    sev: 'sev-3',
    title: 'Help Center CDN cache stale after v3.2 article publish',
    metaHtml:
      "Aïsha's policy update visible internally but not on help.atlas.staffva for 28 min · purged via CDN console",
    duration: '28 min',
    resolvedDate: 'Apr 22, 11:18',
    resolvedRel: '19 days ago',
    pmStatus: 'complete',
    pmText: '✓ Published',
  },
  {
    id: 'inc-2026-038',
    displayId: 'INC-2026-038',
    sev: 'sev-1',
    title: 'Postgres replica lag · read queries returning stale data',
    metaHtml:
      'replica lag 8s → 47s · vacuum job collision · 1,847 stale reads · automated failover engaged',
    duration: '52 min',
    resolvedDate: 'Apr 11, 03:22',
    resolvedRel: '30 days ago · overnight',
    pmStatus: 'complete',
    pmText: '✓ Published',
  },
  {
    id: 'inc-2026-031',
    displayId: 'INC-2026-031',
    sev: 'sev-3',
    title: 'Wise API rate limit hit during quarterly payout batch',
    metaHtml:
      '412 contractor payouts queued · throttled to 5/sec · all delivered within 9min',
    duration: '9 min',
    resolvedDate: 'Mar 31, 17:04',
    resolvedRel: '41 days ago',
    pmStatus: 'complete',
    pmText: '✓ Published',
  },
  {
    id: 'inc-2026-025',
    displayId: 'INC-2026-025',
    sev: 'sev-2',
    title: 'Vetting call video provider · Twilio dropouts',
    metaHtml:
      '8 scheduled vetting calls disconnected mid-session · all rescheduled · candidates notified',
    duration: '73 min',
    resolvedDate: 'Mar 18, 13:11',
    resolvedRel: '54 days ago',
    pmStatus: 'complete',
    pmText: '✓ Published',
  },
  {
    id: 'inc-2026-017',
    displayId: 'INC-2026-017',
    sev: 'sev-3',
    title: 'OpenAI quota soft-limit reached · matching degraded',
    metaHtml:
      'match scoring fell back to cached predictions for 41min · no user-facing impact',
    duration: '41 min',
    resolvedDate: 'Feb 28, 10:48',
    resolvedRel: '72 days ago',
    pmStatus: 'complete',
    pmText: '✓ Published',
  },
];

export const icFooterSummaryHtml =
  '8 of 13 resolved incidents shown · sorted by recency · post-mortem rate <strong>92%</strong> on time';

export const icArchiveButtonLabel = 'Archive · 2024 + earlier →';

export const icResolvedSectionEyebrow = 'RECENTLY RESOLVED · 13 INCIDENTS YTD';
export const icResolvedSectionTitle = 'Resolved incidents';
export const icResolvedSectionHint = 'click any row for full report + post-mortem';

/* ============================================================
   DETAIL VIEW (Pass B slice — breadcrumb + hero + stats)
   admin.html lines 65129-65195
   ============================================================ */

export interface IcBreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

export type IcDetailHeroIcon = 'copy' | 'download' | 'external';

export interface IcDetailHeroAction {
  label: string;
  icon?: IcDetailHeroIcon;
  isPrimary?: boolean;
}

export interface IcDetailHero {
  id: string;
  sev: IcSevVariant;
  status: IcStatusVariant;
  statusLabel: string;
  metaText: string;
  title: string;
  subtitleHtml: string;
  actions: IcDetailHeroAction[];
}

export interface IcDetailStat {
  label: string;
  value: string;
  valueSuffix?: string;
  valueVariant?: 'success' | 'warn';
  meta: string;
}

export interface IcSectionHead {
  num: string;
  title: string;
  meta: string;
}

export type IcTimelinePhase =
  | 'detect'
  | 'escalate'
  | 'investigate'
  | 'mitigate'
  | 'resolve'
  | 'review';

export interface IcTimelineEvent {
  time: string;
  elapsed: string;
  phase: IcTimelinePhase;
  action: string;
  detailHtml: string;
  actor: string;
}

export interface IcTimelineData {
  sectionHead: IcSectionHead;
  headerTitle: string;
  headerMeta: string;
  events: IcTimelineEvent[];
}

export type IcPmSectionVariant = 'default' | 'blameless';

export interface IcPmSection {
  variant: IcPmSectionVariant;
  eyebrow: string;
  title: string;
  bodyHtml: string;
}

export interface IcPostmortemData {
  sectionHead: IcSectionHead;
  sections: IcPmSection[];
}

export type IcActionItemStatus = 'complete' | 'in-progress' | 'todo';

export interface IcActionItem {
  num: string;
  title: string;
  metaHtml: string;
  owner: string;
  status: IcActionItemStatus;
  statusLabel: string;
}

export interface IcActionItemsData {
  sectionHead: IcSectionHead;
  items: IcActionItem[];
}

export interface IcCommanderSubject {
  avatarInitials: string;
  avatarGradient: string;
  name: string;
  idText: string;
}

export interface IcDsmRow {
  label: string;
  value: string;
  valueVariant?: 'success' | 'warn';
}

export interface IcCommanderData {
  title: string;
  subject: IcCommanderSubject;
  rows: IcDsmRow[];
}

export interface IcResponder {
  avatarInitials: string;
  avatarGradient: string;
  role: string;
  name: string;
}

export interface IcRespondersData {
  title: string;
  responders: IcResponder[];
}

export interface IcQuickstatRow {
  label: string;
  value: string;
  valueVariant?: 'success' | 'warn';
}

export interface IcQuickstatsCardData {
  title: string;
  rows: IcQuickstatRow[];
}

export interface IcDetailData {
  breadcrumb: IcBreadcrumbItem[];
  hero: IcDetailHero;
  detailStats: IcDetailStat[];
  timeline: IcTimelineData;
  postmortem: IcPostmortemData;
  actionItems: IcActionItemsData;
  commander: IcCommanderData;
  responders: IcRespondersData;
  relatedLinks: IcQuickstatsCardData;
  sloSnapshot: IcQuickstatsCardData;
}

export const icCanonicalDetail: IcDetailData = {
  breadcrumb: [
    { label: 'Internal incidents', href: '/admin/internal/incidents' },
    { label: 'SEV-2' },
    {
      label: 'INC-2026-042 · Stripe webhook delivery delays',
      isCurrent: true,
    },
  ],
  hero: {
    id: 'INC-2026-042',
    sev: 'sev-2',
    status: 'resolved',
    statusLabel: 'Resolved · PM published',
    metaText: 'Apr 18, 14:42–14:54 UTC · 12 min duration · 23 days ago',
    title: 'Stripe webhook delivery delays · 12min partial outage',
    subtitleHtml:
      'Stripe webhook events (payment_intent.* and refund.* event types) were delayed 5–12 minutes during this window. Atlas\'s webhook endpoint at <code>api.atlas.staffva/webhooks/stripe</code> remained healthy throughout; the delays were upstream within Stripe\'s webhook delivery infrastructure (per their status page). Customer impact was limited to <strong>1 client payment</strong> (cl-167 · <a>TX-2026-08442</a>) whose card decline was retried by Stripe and ultimately failed for unrelated reasons. The incident contributed to Stripe\'s <strong>99.97% uptime</strong> visible in <a>Step 30</a>.',
    actions: [
      { label: 'Copy report link', icon: 'copy' },
      { label: 'Export PDF', icon: 'download' },
      { label: '#inc-042 (archive)', icon: 'external' },
    ],
  },
  detailStats: [
    {
      label: 'Time to detect',
      value: '3',
      valueSuffix: 'min',
      meta: 'Datadog auto-alert · 14:45',
    },
    {
      label: 'Time to resolve',
      value: '12',
      valueSuffix: 'min',
      valueVariant: 'success',
      meta: 'below 60min SEV-2 target',
    },
    {
      label: 'Customers affected',
      value: '1',
      meta: 'payment retried automatically',
    },
    {
      label: 'SLO budget burn',
      value: '2.4',
      valueSuffix: '%',
      valueVariant: 'warn',
      meta: 'monthly budget · within tolerance',
    },
  ],
  timeline: {
    sectionHead: {
      num: '01',
      title: 'Incident timeline',
      meta: 'minute-by-minute log · auto-captured from PagerDuty + #inc-042 + Datadog · 8 events',
    },
    headerTitle: 'Apr 18, 2026 · 14:42–14:54 UTC',
    headerMeta: 'all times UTC · auto-captured',
    events: [
      {
        time: '14:42:11',
        elapsed: 'T+0',
        phase: 'detect',
        action: 'First delayed webhook detected',
        detailHtml:
          '<strong>payment_intent.succeeded</strong> for pi_3N7aZk (cl-002 · Studio Berlin) delivered <strong>327s</strong> after creation (normal &lt; 5s). Detected by Datadog APM trace on <code>stripe-webhook-receiver</code>.',
        actor: 'DATADOG · APM',
      },
      {
        time: '14:45:08',
        elapsed: 'T+3 min',
        phase: 'detect',
        action: 'PagerDuty alert · webhook-latency-high · auto-page on-call',
        detailHtml:
          'Latency p95 crossed 60s threshold after 3 consecutive samples. PagerDuty paged <strong>infra-rotation-eu</strong>. Severity initially classified <strong>SEV-3</strong> · escalated within 2 min.',
        actor: 'PAGERDUTY',
      },
      {
        time: '14:46:32',
        elapsed: 'T+4 min',
        phase: 'investigate',
        action:
          'Incident declared · severity raised to SEV-2 · #inc-042 channel created',
        detailHtml:
          "On-call engineer (Marek S.) opened #inc-042 in Atlas's incident slack, declared <strong>SEV-2</strong> (customer payments potentially affected), engaged incident commander rotation. Atlas's webhook receiver itself was confirmed healthy (no 5xx responses).",
        actor: 'ENGINEER · ON-CALL',
      },
      {
        time: '14:48:14',
        elapsed: 'T+6 min',
        phase: 'investigate',
        action:
          'Upstream confirmation · Stripe status page shows webhook delivery degradation',
        detailHtml:
          'Status page (<strong>status.stripe.com</strong>) posted "Investigating: webhook delivery delays in EU and US regions" at 14:47 UTC. Confirmed upstream root cause — not an Atlas-side issue. Comms lead briefed; no customer notification needed pending impact assessment.',
        actor: 'COMMS LEAD',
      },
      {
        time: '14:50:42',
        elapsed: 'T+8 min',
        phase: 'investigate',
        action: 'Customer impact assessment · 1 affected payment identified',
        detailHtml:
          "Reconciliation between Atlas's pending payments and Stripe's events log surfaced <strong>1 affected payment</strong>: pi_2K9aB7 for <a>cl-167</a> (later linked to <a>TX-2026-08442</a>). The card was already declining for unrelated reasons — Stripe's webhook delay was secondary. No other customers impacted.",
        actor: 'ENGINEER + COMMS',
      },
      {
        time: '14:51:08',
        elapsed: 'T+9 min',
        phase: 'mitigate',
        action: 'Mitigation · no action available (upstream issue)',
        detailHtml:
          "Decision: wait for Stripe to resolve upstream. Atlas's reconciliation job at <strong>15:00 UTC</strong> would catch any orphaned events regardless. Documented in #inc-042 with status update.",
        actor: 'INC. COMMANDER',
      },
      {
        time: '14:53:18',
        elapsed: 'T+11 min',
        phase: 'resolve',
        action: 'Upstream resolution · Stripe posts "Resolved"',
        detailHtml:
          "Stripe status page posted \"Resolved: webhook delivery normal\" at 14:53. Atlas's webhook latency returned to <strong>p95 142ms</strong> within 90 seconds. Backlog of delayed events delivered over next 2 minutes.",
        actor: 'STRIPE · STATUS',
      },
      {
        time: '14:54:42',
        elapsed: 'T+12 min',
        phase: 'resolve',
        action: 'Incident closed · monitoring confirmed normal',
        detailHtml:
          "All 47 backlogged webhooks confirmed delivered within Stripe's 5s SLA. Atlas reconciliation confirmed no orphaned events. Incident closed <strong>SEV-2 · 12 min duration</strong>. Post-mortem scheduled for Apr 21.",
        actor: 'INC. COMMANDER',
      },
    ],
  },
  postmortem: {
    sectionHead: {
      num: '02',
      title: 'Post-mortem · blameless',
      meta: 'published Apr 21, 2026 · 3d after incident · authored by Marek S. + reviewed by Dario (Super Admin)',
    },
    sections: [
      {
        variant: 'default',
        eyebrow: 'WHAT BROKE · WHO WAS AFFECTED',
        title: 'Impact',
        bodyHtml:
          '<p><strong>Direct impact:</strong> 47 Stripe webhook events delayed 5–12 minutes during a 12-minute window on Apr 18. Event types affected: <code>payment_intent.succeeded</code>, <code>payment_intent.payment_failed</code>, <code>refund.created</code>, <code>charge.refunded</code>.</p>' +
          '<p><strong>Customer-visible impact:</strong> 1 client (cl-167) experienced a card payment failure where the failure event was delayed by 8 minutes. The card was declining for unrelated reasons (insufficient funds on file — flagged in TX-2026-08442). Client received the failure email 8 minutes later than expected; no other downstream effect.</p>' +
          "<p><strong>Internal impact:</strong> Atlas's revenue dashboard (<a>Step 14</a>) lagged by ~12 min during the window. Engagement workflow gates that depend on <code>payment_intent.succeeded</code> webhook (e.g., contract activation) were delayed for 3 active engagements; all caught up automatically.</p>" +
          '<p><strong>SLO budget:</strong> burned 2.4% of monthly error budget for webhook delivery (target: &lt;5% per incident). Well within tolerance.</p>',
      },
      {
        variant: 'default',
        eyebrow: 'TECHNICAL ANALYSIS',
        title: 'Root cause',
        bodyHtml:
          "<p><strong>Upstream cause</strong> (per Stripe's incident report): Stripe's webhook delivery service in EU-WEST-1 experienced elevated latency due to a database connection pool exhaustion in their event-fanout layer. The pool was sized for normal load but failed to handle a 3x spike from an unrelated upstream event surge. Recovery was automatic once pool refilled.</p>" +
          "<p><strong>Why Atlas was affected:</strong> Atlas relies on Stripe's webhook delivery for real-time payment state. We do not poll the Stripe events API as a fallback — by design, since polling introduces its own latency and rate-limit pressure. The reconciliation job at <code>:00</code> minute every hour catches any orphans, providing eventual consistency.</p>" +
          '<p><strong>Detection lag:</strong> Datadog detected the latency 3 minutes after first occurrence. The alerting threshold (3 consecutive samples above 60s) is intentionally lagged to suppress noise from natural variance.</p>',
      },
      {
        variant: 'blameless',
        eyebrow: 'BLAMELESS · SYSTEM & PROCESS',
        title: "Contributing factors · what we'd do differently",
        bodyHtml:
          "<p><strong>Notification SLA gap:</strong> Atlas's internal escalation took 3 minutes (alert) + 1 minute (declaration) before stakeholders were informed. For SEV-2 with potential customer payment impact, the team agreed a 2-min target is more appropriate.</p>" +
          '<p><strong>Customer notification absence:</strong> While only 1 customer was affected, we should have proactively notified them rather than relying on the existing failure email. The client (cl-167) was not informed that there was a broader webhook delay event affecting their payment notification — they simply saw a delayed failure email.</p>' +
          "<p><strong>Status-page coupling:</strong> We monitor Stripe's status page but currently do not subscribe to programmatic alerts. Adding subscription would have shaved 1–2 minutes off our detection lag.</p>" +
          '<p><strong>What went well:</strong> Datadog detection fired correctly. Incident declaration was clean. The decision not to take action (acknowledging it was upstream) was correct and saved unnecessary code changes. Reconciliation logic worked as designed.</p>',
      },
    ],
  },
  actionItems: {
    sectionHead: {
      num: '03',
      title: 'Action items · 4 total',
      meta: 'tracked in #inc-042-followup · 2 complete · 1 in-progress · 1 todo',
    },
    items: [
      {
        num: '1',
        title: 'Subscribe to Stripe status-page programmatic webhooks',
        metaHtml:
          'enables automated detection of upstream degradation · removes 1-2min lag',
        owner: 'Marek S.',
        status: 'complete',
        statusLabel: 'Complete · Apr 26',
      },
      {
        num: '2',
        title:
          'Add customer-impact notification template for webhook-delay incidents',
        metaHtml:
          'new <strong>email.compliance.incident_notification</strong> template · cross-ref Step 31',
        owner: 'Aïsha O.',
        status: 'complete',
        statusLabel: 'Complete · May 2',
      },
      {
        num: '3',
        title:
          'Update Stripe-webhook runbook with status-page subscription instructions',
        metaHtml:
          'cross-ref <a><strong>Step 36 knowledge base</strong></a> · runbook v3 in draft',
        owner: 'Marek S.',
        status: 'in-progress',
        statusLabel: 'In progress · ETA May 14',
      },
      {
        num: '4',
        title:
          'Evaluate Stripe events API polling as last-resort fallback',
        metaHtml:
          'design doc only · trade-off analysis with rate-limit pressure · low priority',
        owner: 'infra-team',
        status: 'todo',
        statusLabel: 'Todo · Q3 plan',
      },
    ],
  },
  commander: {
    title: 'Incident commander',
    subject: {
      avatarInitials: 'MS',
      avatarGradient: 'linear-gradient(135deg, #4F6BED, #2540A8)',
      name: 'Marek Söderberg',
      idText: 'on-call infra · EU rotation',
    },
    rows: [
      { label: 'Role', value: 'Incident commander' },
      { label: 'Severity called', value: 'SEV-2' },
      { label: 'Resolution', value: '12 min', valueVariant: 'success' },
      { label: 'PM author', value: 'Marek' },
      { label: 'Reviewer', value: 'Dario · Super Admin' },
    ],
  },
  responders: {
    title: 'Responders',
    responders: [
      {
        avatarInitials: 'MS',
        avatarGradient: 'linear-gradient(135deg, #4F6BED, #2540A8)',
        role: 'INCIDENT COMMANDER',
        name: 'Marek Söderberg',
      },
      {
        avatarInitials: 'AO',
        avatarGradient: 'linear-gradient(135deg, #E876BA, #A8408A)',
        role: 'COMMS LEAD',
        name: 'Aïsha Okafor',
      },
      {
        avatarInitials: 'DF',
        avatarGradient: 'linear-gradient(135deg, #6E4F8B, #3D2B4E)',
        role: 'SUPER ADMIN · NOTIFIED',
        name: 'Dario Fonseca',
      },
    ],
  },
  relatedLinks: {
    title: 'Related links',
    rows: [
      { label: 'Integration', value: 'Stripe · Step 30' },
      { label: 'Affected payment', value: 'TX-2026-08442' },
      { label: 'Audit log', value: 'Step 25' },
      { label: 'Runbooks', value: 'Step 36' },
      { label: 'Slack archive', value: '#inc-042' },
      { label: 'Status page', value: 'stripe status' },
    ],
  },
  sloSnapshot: {
    title: 'SLO snapshot',
    rows: [
      { label: 'Service', value: 'webhook-delivery' },
      { label: 'Target', value: '99.9% / 30d' },
      { label: 'This incident', value: '12min downtime' },
      { label: 'Budget burn', value: '2.4% of monthly', valueVariant: 'warn' },
      {
        label: 'Budget remaining',
        value: '94% of monthly',
        valueVariant: 'success',
      },
    ],
  },
};
