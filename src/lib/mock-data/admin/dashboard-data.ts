/* All canonical dashboard data from admin.html lines 13332–13929 */
/* Verbatim — no paraphrasing */

export const PAGE_HEADER = {
  eyebrow: 'FRI · APR 30, 2026 · 4:42 PM EST',
  title: 'Welcome back, ',
  titleItalic: 'Aïsha.',
  alertSummaryByMode: {
    default: '9 items need your attention this afternoon',
    'all-clear': 'All caught up — nothing pressing right now',
    'critical-only': '2 critical incidents need immediate attention',
  },
  lastCleared: 'Last cleared: 2h ago',
  systemStatusText: 'All systems operational',
  systemStatusChecked: 'Checked 30s ago',
} as const;

export const ALERTS = [
  {
    id: 'ALT-001',
    priority: 'urgent' as const,
    tag: 'URGENT',
    title: 'Critical fraud alert: 7 accounts flagged with multi-account patterns',
    refNum: 'FRA-2026-0218',
    timestamp: 'Detected 3 min ago',
    slaStatus: 'RESPONSE NEEDED',
    actionLabel: 'Investigate',
    actionHref: '#ts-fraud',
  },
  {
    id: 'ALT-002',
    priority: 'urgent' as const,
    tag: 'URGENT',
    title: 'Legal request received: subpoena from N.D. Cal., 48-hour response window',
    refNum: 'LEG-2026-0044',
    timestamp: 'Received 12 min ago',
    slaStatus: '47:48 LEFT',
    actionLabel: 'Open request',
    actionHref: '#comp-legal',
  },
  {
    id: 'ALT-003',
    priority: 'today' as const,
    tag: 'TODAY',
    title: '12 disputes have exceeded the 72-hour SLA window',
    detail: 'Across 4 specialists · Oldest: 96 hours',
    slaStatus: 'SLA AT RISK',
    actionLabel: 'Review disputes',
    actionHref: '#disputes',
  },
  {
    id: 'ALT-004',
    priority: 'today' as const,
    tag: 'TODAY',
    title: '8 refunds awaiting admin approval — $14,250 total',
    detail: 'Oldest pending: 18 hours · 2 over threshold ($1K+)',
    actionLabel: 'Approve queue',
    actionHref: '#fin-refunds',
  },
  {
    id: 'ALT-005',
    priority: 'week' as const,
    tag: 'THIS WEEK',
    title: 'Pool depletion: Senior Engineers, Data Analysts, Designer-Developers',
    detail: '3 categories below 40% available · Hire demand: high',
    actionLabel: 'See pools',
    actionHref: '#int-performance',
  },
] as const;

export const ALERT_COUNTS = {
  all: 9,
  urgent: 2,
  today: 4,
  week: 3,
} as const;

export const HEALTH_STATS = [
  {
    label: 'Total users',
    value: '28,471',
    delta: { direction: 'up' as const, value: '2.4%' },
    breakdown: [
      { key: 'CAND', value: '22,108' },
      { key: 'CLI', value: '6,254' },
      { key: 'SPEC', value: '11' },
    ],
  },
  {
    label: 'Active engagements',
    value: '3,842',
    delta: { direction: 'up' as const, value: '1.8%' },
    hasSparkline: true,
  },
  {
    label: 'Today\'s transactions',
    value: '247',
    valueSuffix: '/ $186K',
    breakdown: [
      { key: 'PAY', value: '198' },
      { key: 'PAYOUT', value: '41' },
      { key: 'REFUND', value: '8' },
    ],
  },
  {
    label: 'New signups today',
    value: '86',
    delta: { direction: 'up' as const, value: '12%' },
    breakdown: [
      { key: 'CAND', value: '64' },
      { key: 'CLI', value: '22' },
    ],
  },
  {
    label: 'SLA hit rate',
    value: '94.2',
    valueSuffix: '%',
    delta: { direction: 'down' as const, value: '0.4%' },
    breakdown: [
      { key: 'Reviews', value: '96.1%' },
      { key: 'Disputes', value: '91.4%' },
    ],
  },
  {
    label: 'System uptime · 30d',
    value: '99.98',
    valueSuffix: '%',
    delta: { direction: 'flat' as const },
    breakdown: [
      { key: 'Errors', value: '0.04%' },
      { key: 'P95', value: '124ms' },
    ],
  },
] as const;

export const FINANCIAL_STATS = [
  {
    label: 'Today\'s GMV',
    value: '186,420',
    prefix: '$',
    delta: { direction: 'up' as const, value: '8.1%' },
    detail: 'vs yesterday',
  },
  {
    label: 'This month\'s GMV',
    value: '4.2',
    prefix: '$',
    suffix: 'M',
    delta: { direction: 'up' as const, value: '14%' },
    detail: 'vs Apr 2025',
  },
  {
    label: 'YTD revenue · 10% fee',
    value: '1.18',
    prefix: '$',
    suffix: 'M',
    detail: 'From $11.8M GMV',
  },
  {
    label: 'Pending payouts',
    value: '312',
    prefix: '$',
    suffix: 'K',
    detail: '87 candidates queued',
  },
  {
    label: 'Refunds · this week',
    value: '4,180',
    prefix: '$',
    delta: { direction: 'down' as const, value: '22%' },
    detail: '14 issued · 8 pending',
  },
  {
    label: 'Open chargebacks',
    value: '850',
    prefix: '$',
    detail: '3 cases · oldest 6 days',
  },
] as const;

export const OPERATIONS_DATA = {
  disputes: {
    icon: 'alert-triangle',
    label: 'Disputes',
    pieces: [
      { value: '47', key: 'OPEN', type: 'urgent' as const },
      { value: '12', key: 'IN-PROGRESS', type: 'normal' as const },
      { value: '23', key: 'RESOLVED · TODAY', type: 'success' as const },
    ],
  },
  reviews: {
    icon: 'star',
    label: 'Reviews completed today',
    pieces: [{ value: '156', key: 'ACROSS TEAM', type: 'normal' as const }],
  },
  sla: {
    icon: 'clock',
    label: 'Avg review SLA',
    slaProgress: { current: 18.4, max: 24, percent: 76.7 },
  },
  poolHealth: {
    label: 'Pool health',
    subLabel: '10 categories tracked',
    bars: [
      { name: 'Data Analysts', percent: 32, status: 'danger' as const },
      { name: 'Sr Engineers', percent: 38, status: 'warn' as const },
      { name: 'Designers', percent: 64, status: 'warn' as const },
      { name: 'VAs', percent: 92, status: 'normal' as const },
    ],
  },
} as const;

export const ACTIVITY_FEED = [
  {
    time: '12:34 PM',
    actor: 'AO',
    actorName: 'Aïsha O.',
    actorType: 'me' as const,
    verb: 'Suspended candidate',
    target: 'Marcus T.',
    targetMeta: '· repeated profile fraud',
    tag: 'SUSPENSION',
    category: 'suspension' as const,
  },
  {
    time: '12:18 PM',
    actor: 'DK',
    actorName: 'Daniel K.',
    actorType: 'other' as const,
    verb: 'Approved refund of',
    target: '$250',
    targetMeta: 'to Carlos R.',
    tag: 'REFUND',
    category: 'refund' as const,
  },
  {
    time: '11:52 AM',
    actor: 'AO',
    actorName: 'Aïsha O.',
    actorType: 'me' as const,
    verb: 'Resolved dispute',
    target: 'DSP-2026-0481',
    targetMeta: '· client favor',
    tag: 'DISPUTE',
    category: 'dispute' as const,
  },
  {
    time: '11:34 AM',
    actor: 'SR',
    actorName: 'Sarah R.',
    actorType: 'other' as const,
    verb: 'Overrode',
    target: 'candidate verification',
    targetMeta: 'for Lin W.',
    tag: 'OVERRIDE',
    category: 'override' as const,
  },
  {
    time: '11:08 AM',
    actor: 'JN',
    actorName: 'Jamal N.',
    actorType: 'other' as const,
    verb: 'Started investigation on',
    target: '3 linked accounts',
    tag: 'T&S',
    category: 'investigation' as const,
  },
  {
    time: '10:45 AM',
    actor: 'MT',
    actorName: 'Maya T.',
    actorType: 'other' as const,
    verb: 'Exported',
    target: 'audit log',
    targetMeta: 'Apr 1–30',
    tag: 'EXPORT',
    category: 'export' as const,
  },
  {
    time: '10:14 AM',
    actor: 'AO',
    actorName: 'Aïsha O.',
    actorType: 'me' as const,
    verb: 'Banned client',
    target: 'Acme Holdings',
    targetMeta: '· payment fraud',
    tag: 'BAN',
    category: 'suspension' as const,
  },
  {
    time: '9:42 AM',
    actor: 'DK',
    actorName: 'Daniel K.',
    actorType: 'other' as const,
    verb: 'Issued refund of',
    target: '$1,200',
    targetMeta: 'to Stripe Inc.',
    tag: 'REFUND',
    category: 'refund' as const,
  },
  {
    time: '9:15 AM',
    actor: 'AO',
    actorName: 'Aïsha O.',
    actorType: 'me' as const,
    verb: 'Signed in from',
    target: '',
    targetMeta: '71.82.45.12 · Detroit',
    tag: 'SIGN-IN',
    category: 'signin' as const,
  },
  {
    time: '8:58 AM',
    actor: 'SR',
    actorName: 'Sarah R.',
    actorType: 'other' as const,
    verb: 'Started investigation on',
    target: '5 candidates',
    targetMeta: '· same IP',
    tag: 'T&S',
    category: 'investigation' as const,
  },
] as const;

export const SPARKLINE_HEIGHTS = [38, 52, 44, 61, 58, 70, 84, 76, 88, 92] as const;
export const SPARKLINE_PEAK_INDEX = 6;

export const QUICK_ACTIONS = [
  {
    id: 'investigate',
    icon: 'search',
    label: 'Investigate user',
    shortcut: 'U',
    audited: true,
    danger: false,
  },
  {
    id: 'refund',
    icon: 'refund',
    label: 'Issue refund',
    shortcut: 'R',
    audited: true,
    danger: false,
  },
  {
    id: 'suspend',
    icon: 'lock',
    label: 'Suspend account',
    shortcut: 'S',
    audited: true,
    danger: true,
  },
  {
    id: 'export',
    icon: 'download',
    label: 'Export report',
    shortcut: 'E',
    audited: true,
    danger: false,
  },
  {
    id: 'announcement',
    icon: 'volume2',
    label: 'Send announcement',
    shortcut: 'A',
    audited: true,
    danger: false,
  },
  {
    id: 'ticket',
    icon: 'file-text',
    label: 'Open ticket',
    shortcut: 'T',
    audited: false,
    danger: false,
  },
] as const;

export const SYSTEM_STATUS_METRICS = [
  { label: 'Uptime · 30d', value: '99.98%', status: 'good' as const },
  { label: 'Error rate', value: '0.04%', status: 'good' as const },
  { label: 'API latency · P95', value: '124ms', status: 'normal' as const },
  { label: 'Stripe', value: '✓ Connected', status: 'good' as const },
  { label: 'Wise', value: '✓ Connected', status: 'good' as const },
  { label: 'SendGrid', value: '✓ Connected', status: 'good' as const },
] as const;

export const GLANCE_STATS = [
  { label: 'New candidates', value: '64', delta: { direction: 'up' as const, value: '12%' } },
  { label: 'New clients', value: '22', delta: { direction: 'up' as const, value: '5%' } },
  { label: 'Hires made', value: '18', delta: { direction: 'up' as const, value: '8%' } },
  { label: 'Disputes resolved', value: '23', delta: { direction: 'up' as const, value: '3%' } },
  {
    label: 'Avg time-to-hire',
    value: '8.2d',
    delta: { direction: 'down' as const, value: '0.6' },
  },
] as const;
