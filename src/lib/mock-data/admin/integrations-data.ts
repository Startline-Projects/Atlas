/* admin.html lines 61476-61948 — Integrations LIST view fixtures (verbatim) */

import type { PrStat } from './privacy-reports-data';

// ============================================================
// TYPES
// ============================================================

export type IntegrationStatus = 'connected' | 'error' | 'warn' | 'disconnected';
export type IntegrationMetricVariant = 'default' | 'success' | 'warn' | 'danger';
export type IntegrationActionVariant = 'default' | 'primary' | 'warn';

export interface IntegrationMetric {
  label: string;
  value: string;
  valueVariant?: IntegrationMetricVariant;
  valueSuffix?: string;
  meta: string;
}

export interface IntegrationFootAction {
  label: string;
  variant?: IntegrationActionVariant;
}

export interface IntegrationCard {
  id: string;
  initials: string;
  logoGradient: string;
  name: string;
  purpose: string;
  status: IntegrationStatus;
  statusLabel: string;
  metrics: IntegrationMetric[];
  footMetaHtml: string;
  footAction: IntegrationFootAction;
}

export interface IntegrationCategoryFilter {
  value: string;
  label: string;
  count: string;
  active?: boolean;
}

export interface IntegrationAddCard {
  title: string;
  meta: string;
}

export interface IntegrationHeaderAction {
  label: string;
  icon: 'audit' | 'plus';
  isPrimary?: boolean;
}

export interface IntegrationPageMeta {
  title: string;
  metaText: string;
  restrictionLabel: string;
}

// ============================================================
// PAGE-LEVEL FIXTURES (admin.html 61480-61505)
// ============================================================

export const intPageMeta: IntegrationPageMeta = {
  title: 'Integrations',
  metaText:
    '/admin/platform/integrations · 10 active · 1 error · 1 warn · 47,820 events / 24h · $8,470 / mo total',
  restrictionLabel: 'Super Admin · add / configure',
};

export const intSearchPlaceholder = 'Search integrations…';

export const intHeaderActions: IntegrationHeaderAction[] = [
  { label: 'Audit', icon: 'audit' },
  { label: 'Add integration', icon: 'plus', isPrimary: true },
];

// ============================================================
// STATS STRIP (admin.html 61508-61534) — reuses PrStat shape
// ============================================================

export const intTopStats: PrStat[] = [
  {
    label: 'Active integrations',
    value: '10',
    meta: '<strong>6 categories</strong> · 8 healthy · 1 warn · 1 error',
  },
  {
    label: 'Errors · 24h',
    value: '1',
    variant: 'danger',
    meta: '<strong>DocuSign · DPA expired</strong>',
  },
  {
    label: 'Events · 24h',
    value: '47,820',
    meta: '99.94% success rate',
  },
  {
    label: 'Avg latency',
    value: '182',
    suffix: 'ms',
    variant: 'success',
    meta: 'p95 · across all webhooks',
  },
  {
    label: 'Monthly spend',
    value: '$8,470',
    meta: 'across all vendors · billed monthly',
  },
];

// ============================================================
// CATEGORY FILTERS (admin.html 61537-61549)
// ============================================================

export const intCategoryFilters: IntegrationCategoryFilter[] = [
  { value: 'all', label: 'All', count: '10', active: true },
  { value: 'payments', label: 'Payments', count: '2' },
  { value: 'communication', label: 'Communication', count: '3' },
  { value: 'infrastructure', label: 'Infrastructure', count: '2' },
  { value: 'analytics', label: 'Analytics', count: '1' },
  { value: 'signing', label: 'Signing', count: '1' },
  { value: 'ai', label: 'AI', count: '1' },
];

// ============================================================
// 10 INTEGRATION CARDS (admin.html 61555-61932) — verbatim
// ============================================================

export const intCards: IntegrationCard[] = [
  // 1. Stripe (61555-61590)
  {
    id: 'in-stripe',
    initials: 'S',
    logoGradient: 'linear-gradient(135deg, #635BFF, #4239A8)',
    name: 'Stripe',
    purpose: 'Payment processing · card rails',
    status: 'connected',
    statusLabel: 'Connected',
    metrics: [
      { label: 'Events · 24h', value: '18,420', meta: '99.97% success' },
      { label: 'Latency p95', value: '142', valueSuffix: 'ms', valueVariant: 'success', meta: 'healthy · stable 7d' },
      { label: 'Monthly spend', value: '$2,940', meta: '2.9% + $0.30 / tx' },
      { label: 'Last event', value: '12', valueSuffix: 's ago', meta: 'payment_intent.succeeded' },
    ],
    footMetaHtml: 'connected <strong>Aug 2024</strong> · last config 6mo ago',
    footAction: { label: 'Test' },
  },
  // 2. Wise (61593-61628)
  {
    id: 'in-wise',
    initials: 'W',
    logoGradient: 'linear-gradient(135deg, #9FE870, #4F8231)',
    name: 'Wise',
    purpose: 'Cross-border payouts · 80+ currencies',
    status: 'connected',
    statusLabel: 'Connected',
    metrics: [
      { label: 'Events · 24h', value: '3,142', meta: '99.92% success' },
      { label: 'Latency p95', value: '218', valueSuffix: 'ms', valueVariant: 'success', meta: 'healthy' },
      { label: 'Monthly spend', value: '$1,840', meta: 'avg 0.45% / payout' },
      { label: 'Last event', value: '2', valueSuffix: 'm ago', meta: 'transfer.completed' },
    ],
    footMetaHtml: 'connected <strong>Sep 2024</strong>',
    footAction: { label: 'Test' },
  },
  // 3. Twilio (61631-61666)
  {
    id: 'in-twilio',
    initials: 'T',
    logoGradient: 'linear-gradient(135deg, #F22F46, #A6172A)',
    name: 'Twilio',
    purpose: 'SMS · OTP · Video (vetting calls)',
    status: 'connected',
    statusLabel: 'Connected',
    metrics: [
      { label: 'Events · 24h', value: '8,247', meta: 'SMS + 218 video calls' },
      { label: 'Latency p95', value: '94', valueSuffix: 'ms', valueVariant: 'success', meta: 'healthy' },
      { label: 'Monthly spend', value: '$1,210', meta: 'SMS + video minutes' },
      { label: 'Last event', value: '38', valueSuffix: 's ago', meta: 'SMS · OTP sent' },
    ],
    footMetaHtml: 'connected <strong>Jan 2025</strong>',
    footAction: { label: 'Test' },
  },
  // 4. SendGrid (61669-61704)
  {
    id: 'in-sendgrid',
    initials: 'S',
    logoGradient: 'linear-gradient(135deg, #1A82E2, #0E5099)',
    name: 'SendGrid',
    purpose: 'Transactional email',
    status: 'connected',
    statusLabel: 'Connected',
    metrics: [
      { label: 'Events · 24h', value: '14,820', meta: '99.98% delivery' },
      { label: 'Latency p95', value: '112', valueSuffix: 'ms', valueVariant: 'success', meta: 'healthy' },
      { label: 'Monthly spend', value: '$420', meta: '~440k emails / mo' },
      { label: 'Last event', value: '4', valueSuffix: 's ago', meta: 'email · delivered' },
    ],
    footMetaHtml: 'connected <strong>Jun 2024</strong>',
    footAction: { label: 'Test' },
  },
  // 5. AWS (61707-61742)
  {
    id: 'in-aws',
    initials: 'A',
    logoGradient: 'linear-gradient(135deg, #FF9900, #C46F00)',
    name: 'Amazon Web Services',
    purpose: 'Compute · storage · CDN',
    status: 'connected',
    statusLabel: 'Connected',
    metrics: [
      { label: 'Health', value: 'All green', valueVariant: 'success', meta: 'us-east-1 · us-west-2 · eu-west-1' },
      { label: 'CPU p95', value: '38', valueSuffix: '%', meta: 'healthy' },
      { label: 'Monthly spend', value: '$1,420', meta: 'EC2 + S3 + CloudFront' },
      { label: 'Last event', value: 'live', meta: 'continuous' },
    ],
    footMetaHtml: 'connected <strong>Jan 2024</strong>',
    footAction: { label: 'Test' },
  },
  // 6. Datadog (61745-61780)
  {
    id: 'in-datadog',
    initials: 'D',
    logoGradient: 'linear-gradient(135deg, #632CA6, #3A1A66)',
    name: 'Datadog',
    purpose: 'Monitoring · APM · logs',
    status: 'connected',
    statusLabel: 'Connected',
    metrics: [
      { label: 'Agents', value: '14', meta: 'all reporting' },
      { label: 'Alerts · 24h', value: '2', meta: 'low priority · auto-resolved' },
      { label: 'Monthly spend', value: '$640', meta: '14 hosts · logs' },
      { label: 'Last event', value: 'live', meta: 'continuous' },
    ],
    footMetaHtml: 'connected <strong>Sep 2024</strong>',
    footAction: { label: 'Test' },
  },
  // 7. Amplitude (61783-61818)
  {
    id: 'in-amplitude',
    initials: 'A',
    logoGradient: 'linear-gradient(135deg, #1D4ED8, #1E3A8A)',
    name: 'Amplitude',
    purpose: 'Product analytics · session replay',
    status: 'connected',
    statusLabel: 'Connected',
    metrics: [
      { label: 'Events · 24h', value: '2,184k', meta: 'user behavior + replay' },
      { label: 'Latency p95', value: '68', valueSuffix: 'ms', valueVariant: 'success', meta: 'healthy' },
      { label: 'Monthly spend', value: '$890', meta: 'scale + replay tier' },
      { label: 'Last event', value: 'live', meta: 'continuous' },
    ],
    footMetaHtml: 'connected <strong>Aug 2024</strong>',
    footAction: { label: 'Test' },
  },
  // 8. DocuSign (61821-61856) — ERROR
  {
    id: 'in-docusign',
    initials: 'D',
    logoGradient: 'linear-gradient(135deg, #FFCC22, #B8881A)',
    name: 'DocuSign',
    purpose: 'e-Signature · contract execution',
    status: 'error',
    statusLabel: 'Action required',
    metrics: [
      { label: 'Status', value: 'DPA expired', valueVariant: 'danger', meta: 'expired Apr 12 · 29d ago' },
      { label: 'Events · 24h', value: '147', meta: 'grace period · degraded' },
      { label: 'Monthly spend', value: '$680', meta: 'avg 412 envelopes / mo' },
      { label: 'Resolution', value: '14', valueSuffix: 'd', valueVariant: 'warn', meta: 'grace ends May 26 · auto-suspend' },
    ],
    footMetaHtml: 'renewal in progress · Aïsha · 4d ago',
    footAction: { label: 'Resolve', variant: 'warn' },
  },
  // 9. OpenAI (61859-61894) — WARN
  {
    id: 'in-openai',
    initials: 'O',
    logoGradient: 'linear-gradient(135deg, #10A37F, #0A6E55)',
    name: 'OpenAI',
    purpose: 'LLM · match scoring · summarization',
    status: 'warn',
    statusLabel: 'Quota at 78%',
    metrics: [
      { label: 'Events · 24h', value: '812', meta: 'API calls · gpt-4o' },
      { label: 'Latency p95', value: '1,840', valueSuffix: 'ms', valueVariant: 'warn', meta: 'slow but expected' },
      { label: 'Monthly spend', value: '$430', valueSuffix: '/ 550', valueVariant: 'warn', meta: '78% of soft limit' },
      { label: 'Quota', value: '78', valueSuffix: '%', meta: '12d to monthly reset' },
    ],
    footMetaHtml: 'connected <strong>Mar 2025</strong>',
    footAction: { label: 'Test' },
  },
  // 10. Slack (61897-61932) — DISCONNECTED
  {
    id: 'in-slack',
    initials: 'S',
    logoGradient: 'linear-gradient(135deg, #4A154B, #2D0D2E)',
    name: 'Slack',
    purpose: 'Admin alerts · escalation routing',
    status: 'disconnected',
    statusLabel: 'Disconnected',
    metrics: [
      { label: 'Status', value: 'Inactive', meta: 'never connected' },
      { label: 'Events · 24h', value: '—', meta: 'no traffic' },
      { label: 'Monthly spend', value: '$0', meta: 'free tier · webhooks only' },
      { label: 'Setup', value: '5', valueSuffix: 'min', meta: 'OAuth · channel pick' },
    ],
    footMetaHtml: 'recommended for ops · not connected',
    footAction: { label: 'Connect', variant: 'primary' },
  },
];

// ============================================================
// ADD-NEW CARD (admin.html 61935-61943)
// ============================================================

export const intAddCard: IntegrationAddCard = {
  title: 'Add integration',
  meta: 'browse marketplace · Super Admin · adds subprocessor · privacy policy update required',
};

// ============================================================
// DETAIL VIEW TYPES + FIXTURE (admin.html 61953-62380)
// ============================================================

export interface IntBreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

export interface IntEnvOption {
  value: string;
  label: string;
  active?: boolean;
}

export interface IntDetailHeroAction {
  label: string;
  icon: 'play' | 'external';
  isPrimary?: boolean;
}

export interface IntDetailHero {
  initials: string;
  logoGradient: string;
  status: IntegrationStatus;
  statusLabel: string;
  envMetaText: string;
  title: string;
  subtitleHtml: string;
  envToggle: IntEnvOption[];
  actions: IntDetailHeroAction[];
}

export interface IntDetailStat {
  label: string;
  value: string;
  valueVariant?: 'success' | 'warn' | 'danger';
  valueSuffix?: string;
  meta: string;
  trendDirection?: 'up' | 'down';
  trendLabel?: string;
}

export interface IntConfigRowAction {
  label: string;
  variant?: 'default' | 'warn';
}

export interface IntConfigRow {
  label: string;
  labelMeta?: string;
  valueHtml: string;
  metaHtml?: string;
  action?: IntConfigRowAction;
}

export type IntEventVariant = 'success' | 'error' | 'warn';

export interface IntEvent {
  time: string;
  variant: IntEventVariant;
  textHtml: string;
  resultLabel: string;
}

export interface IntTestCell {
  label: string;
  title: string;
  description: string;
  buttonLabel: string;
}

export interface IntLinkedFeature {
  iconSvg: string; // inner SVG markup (paths/circles/etc.)
  name: string;
  stepLabel: string;
  metaHtml: string;
}

export interface IntSectionHeadData {
  num: string;
  title: string;
  meta: string;
  action?: { label: string; icon: 'audit' | 'download' };
}

export interface IntDetailData {
  id: string;
  breadcrumb: IntBreadcrumbItem[];
  hero: IntDetailHero;
  detailStats: IntDetailStat[];
  configHead: IntSectionHeadData;
  configRows: IntConfigRow[];
  testHead: IntSectionHeadData;
  testCells: IntTestCell[];
  eventsHead: IntSectionHeadData;
  eventLogHeadTitle: string;
  eventLogHeadMeta: string;
  events: IntEvent[];
  linkedHead: IntSectionHeadData;
  linkedFeatures: IntLinkedFeature[];
  rail: IntDetailRail;
}

// ============================================================
// fr-rail SIDEBAR TYPES + FIXTURE (admin.html 62327-62375)
// ============================================================

export type IntDsmValueVariant = 'default' | 'success' | 'warn' | 'danger';

export interface IntAccountMetaRow {
  label: string;
  value: string;
  variant?: IntDsmValueVariant;
}

export interface IntAccountCardData {
  title: string;
  avatarGradient: string;
  avatarInitial: string;
  name: string;
  subId: string;
  metaRows: IntAccountMetaRow[];
  actionLabel: string;
}

export interface IntQuickstatsRow {
  label: string;
  valueHtml: string; // may contain inline <a>
  valueVariant?: IntDsmValueVariant;
}

export interface IntQuickstatsCardData {
  title: string;
  rows: IntQuickstatsRow[];
  footerHtml?: string; // optional dashed-top-border disclaimer footer
}

export interface IntDetailRail {
  account: IntAccountCardData;
  billing: IntQuickstatsCardData;
  support: IntQuickstatsCardData;
}

export const intStripeDetail: IntDetailData = {
  id: 'in-stripe',
  breadcrumb: [
    { label: 'Integrations', href: '/admin/platform/integrations' },
    { label: 'Payments' },
    { label: 'Stripe · production', isCurrent: true },
  ],
  hero: {
    initials: 'S',
    logoGradient: 'linear-gradient(135deg, #635BFF, #4239A8)',
    status: 'connected',
    statusLabel: 'Connected · healthy',
    envMetaText: 'Connected Aug 14, 2024 · 9mo · environment: production',
    title: 'Payment processing · card rails · primary processor',
    subtitleHtml:
      '<strong>Stripe Connect</strong> handles all platform card payments, refunds, and US tax reporting. Webhook traffic flows to <strong>api.atlas.staffva/webhooks/stripe</strong> with HMAC-SHA256 signature verification. The integration is the rails for <a>REF-2026-0084 refund processing</a> (Step 21) and the <a>1042-S tax-form pipeline</a> (Step 22). Currently in <strong>production mode</strong>; test mode available for dry-run flows.',
    envToggle: [
      { value: 'test', label: 'Test' },
      { value: 'production', label: 'Production', active: true },
    ],
    actions: [
      { label: 'Run test', icon: 'play' },
      { label: 'Stripe dashboard', icon: 'external', isPrimary: true },
    ],
  },
  detailStats: [
    {
      label: 'Uptime · 30d',
      value: '99.97',
      valueSuffix: '%',
      valueVariant: 'success',
      meta: '<span class="trend-up">↑ stable</span> · 1 partial outage Apr 18 · 12min',
      trendDirection: 'up',
      trendLabel: '↑ stable',
    },
    {
      label: 'Error rate · 24h',
      value: '0.03',
      valueSuffix: '%',
      meta: '5 errors / 18,420 events · within target',
    },
    {
      label: 'Monthly spend · MTD',
      value: '$2,940',
      meta: '2.9% + $0.30 / tx · est full month $3,820',
    },
    {
      label: 'Events · 24h',
      value: '18,420',
      meta: '<span class="trend-up">↑ +12%</span> vs prior 24h · payment-driven',
      trendDirection: 'up',
      trendLabel: '↑ +12%',
    },
  ],
  configHead: {
    num: '01',
    title: 'Configuration',
    meta: 'API keys · webhook endpoints · environment · all changes audit-logged + 2-admin sign-off for production secrets',
    action: { label: 'History', icon: 'audit' },
  },
  configRows: [
    {
      label: 'Publishable key',
      labelMeta: 'client-side · safe to expose',
      valueHtml:
        'pk_live_51N8aZkE3D2x6B4mC<span data-mask>••••••••••••••••••</span><span data-pill="success">Active</span>',
      metaHtml: 'last rotated <strong>Aug 2024</strong> · next rotation due <strong>Aug 2026</strong>',
      action: { label: 'Copy' },
    },
    {
      label: 'Secret key',
      labelMeta: 'server-side · never exposed',
      valueHtml:
        'sk_live_••••••••••••••••••••••••••••••••<span data-pill="danger">Encrypted</span>',
      metaHtml:
        'stored in <strong>AWS KMS</strong> · accessed at request time · rotation alert <strong>180d</strong> from last rotate',
      action: { label: 'Rotate', variant: 'warn' },
    },
    {
      label: 'Webhook endpoint',
      labelMeta: 'Stripe → Atlas events',
      valueHtml:
        'https://api.atlas.staffva/webhooks/stripe<span data-pill="success">Receiving</span>',
      metaHtml:
        '<strong>HMAC-SHA256</strong> signature verified · listening to <strong>27 event types</strong> · last delivery 12s ago',
      action: { label: 'Copy' },
    },
    {
      label: 'Webhook signing secret',
      labelMeta: 'HMAC key',
      valueHtml:
        'whsec_••••••••••••••••••••••••••••••••<span data-pill="danger">Encrypted</span>',
      metaHtml: 'stored in <strong>AWS KMS</strong> · re-rotate on compromise',
      action: { label: 'Rotate', variant: 'warn' },
    },
    {
      label: 'Stripe account ID',
      labelMeta: "Atlas's Stripe Connect account",
      valueHtml: 'acct_1N8aZkE3D2x6B4mC',
      metaHtml:
        'Staffva LLC (Michigan, USA) · standard Connect account · <a>view in Stripe →</a>',
      action: { label: 'Copy' },
    },
    {
      label: 'Subscribed events',
      labelMeta: 'webhook event types',
      valueHtml: '27 event types',
      metaHtml:
        'payment_intent.* · charge.* · refund.* · payout.* · customer.* · tax_id.* · <a>view all →</a>',
      action: { label: 'Manage' },
    },
  ],
  testHead: {
    num: '02',
    title: 'Test integration',
    meta: 'verify configuration · simulate flows · all test results audit-logged',
  },
  testCells: [
    {
      label: 'CONNECTIVITY',
      title: 'Ping API',
      description:
        'Pings api.stripe.com/v1/balance with the stored secret key. Returns connection latency + key validity.',
      buttonLabel: 'Run ping',
    },
    {
      label: 'END-TO-END',
      title: 'Test payment',
      description:
        'Creates a $1.00 payment intent in test mode using test card 4242 4242 4242 4242. Walks the full webhook round-trip.',
      buttonLabel: 'Run payment test',
    },
    {
      label: 'WEBHOOK',
      title: 'Test webhook delivery',
      description:
        'Triggers Stripe to redeliver the most recent payment_intent.succeeded event to verify endpoint health.',
      buttonLabel: 'Send test event',
    },
  ],
  eventsHead: {
    num: '03',
    title: 'Recent events',
    meta: 'webhook deliveries + API errors · last 24h · 18,420 events · 5 errors · live',
    action: { label: 'Export', icon: 'download' },
  },
  eventLogHeadTitle: 'Events · last 24h',
  eventLogHeadMeta: '8 most recent · click any for full payload + delivery attempts',
  events: [
    {
      time: '15:42:18',
      variant: 'success',
      textHtml: 'payment_intent.succeeded <span data-meta>pi_3N8bC9 · $1,250.00 · cl-002 Studio Berlin</span>',
      resultLabel: 'Delivered · 142ms',
    },
    {
      time: '15:38:04',
      variant: 'success',
      textHtml: 'refund.created <span data-meta>re_4M2aZk · $1,250.00 · REF-2026-0084 (Step 21)</span>',
      resultLabel: 'Delivered · 98ms',
    },
    {
      time: '15:31:55',
      variant: 'success',
      textHtml: 'payout.paid <span data-meta>po_8K2bC9 · $24,114.20 · 1042-S settlement (Step 22)</span>',
      resultLabel: 'Delivered · 187ms',
    },
    {
      time: '14:18:42',
      variant: 'error',
      textHtml:
        'payment_intent.payment_failed <span data-meta>pi_2K9aB7 · card declined · cl-167 (related <a>TX-2026-08442</a>)</span>',
      resultLabel: 'Logged · 4xx',
    },
    {
      time: '12:08:14',
      variant: 'success',
      textHtml: 'customer.tax_id.created <span data-meta>cus_8nF2vC · EU VAT registration</span>',
      resultLabel: 'Delivered · 124ms',
    },
    {
      time: '10:42:31',
      variant: 'success',
      textHtml: 'payment_intent.succeeded <span data-meta>pi_7K8bC9 · $4,200.00 · cl-088 Acme Robotics</span>',
      resultLabel: 'Delivered · 156ms',
    },
    {
      time: '09:14:22',
      variant: 'success',
      textHtml: 'payout.paid <span data-meta>po_6K2bC9 · $2,840.00 · weekly contractor batch</span>',
      resultLabel: 'Delivered · 203ms',
    },
    {
      time: '08:02:08',
      variant: 'success',
      textHtml: 'balance.available <span data-meta>net new balance · $18,420.50 USD available for payout</span>',
      resultLabel: 'Delivered · 78ms',
    },
  ],
  linkedHead: {
    num: '04',
    title: 'Linked features',
    meta: 'where Stripe powers Atlas · disconnecting would degrade these flows',
  },
  linkedFeatures: [
    {
      iconSvg:
        '<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>',
      name: 'Client invoicing & card payments',
      stepLabel: 'Step 19',
      metaHtml: 'all platform invoices charged via Stripe · 412 clients · 18,420 events / 24h',
    },
    {
      iconSvg:
        '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/>',
      name: 'Refunds processing',
      stepLabel: 'Step 21',
      metaHtml: 'REF-2026-0084 ($1,250 Tomás dispute) · 23 refunds YTD · avg 14h processing time',
    },
    {
      iconSvg:
        '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
      name: 'US tax reporting · 1099-K + 1042-S',
      stepLabel: 'Step 22',
      metaHtml: 'Stripe Tax aggregates · 2025 1099-K filing acknowledged · 478 1042-S forms',
    },
    {
      iconSvg:
        '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
      name: 'Fee structure routing',
      stepLabel: 'Step 20',
      metaHtml:
        "Atlas's v3 fee tiers configured as Stripe application fees · primary processor per <a>platform settings</a>",
    },
    {
      iconSvg:
        '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
      name: 'Reports · revenue dashboard',
      stepLabel: 'Step 14',
      metaHtml: 'all GMV + take-rate metrics sourced from Stripe Balance Transactions',
    },
  ],
  rail: {
    account: {
      title: 'Stripe account',
      avatarGradient: 'linear-gradient(135deg, #635BFF, #4239A8)',
      avatarInitial: 'S',
      name: 'Staffva LLC',
      subId: 'acct_1N8aZkE3D2x6B4mC',
      metaRows: [
        { label: 'Type', value: 'Standard Connect' },
        { label: 'Country', value: 'United States' },
        { label: 'Charges', value: 'Enabled', variant: 'success' },
        { label: 'Payouts', value: 'Enabled', variant: 'success' },
        { label: 'Connected since', value: 'Aug 14, 2024' },
      ],
      actionLabel: 'Open in Stripe',
    },
    billing: {
      title: 'Billing',
      rows: [
        { label: 'Plan', valueHtml: 'Standard · 2.9% + $0.30 / tx' },
        { label: 'MTD spend', valueHtml: '$2,940' },
        { label: 'Est. full month', valueHtml: '$3,820' },
        { label: 'YTD spend', valueHtml: '$18,420' },
        { label: 'Bill cycle', valueHtml: 'Monthly · 1st' },
        { label: 'Payment method', valueHtml: 'Atlas corporate · auto-debit' },
      ],
    },
    support: {
      title: 'Support',
      rows: [
        { label: 'Account manager', valueHtml: 'M. Reyes (Stripe)' },
        { label: 'SLA', valueHtml: 'P1 · 1h · P2 · 4h' },
        { label: 'Open tickets', valueHtml: '0' },
        { label: 'Status page', valueHtml: '<a>status.stripe.com →</a>' },
      ],
      footerHtml:
        'Stripe is listed as an active subprocessor in <a>privacy reports</a>. DPA signed Aug 2024.',
    },
  },
};

// Filter category mapping (id → categoryValue) for client-side filtering
export const intCardCategoryMap: Record<string, string> = {
  'in-stripe': 'payments',
  'in-wise': 'payments',
  'in-twilio': 'communication',
  'in-sendgrid': 'communication',
  'in-slack': 'communication',
  'in-aws': 'infrastructure',
  'in-datadog': 'infrastructure',
  'in-amplitude': 'analytics',
  'in-docusign': 'signing',
  'in-openai': 'ai',
};
