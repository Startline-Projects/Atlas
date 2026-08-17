/**
 * Step 19 — Transactions mock data.
 *
 * 9 list rows matching admin.html view-transactions verbatim
 * + canonical TX-2026-08442 detail matching admin.html view-transaction-detail verbatim
 * + 8 stub profiles for non-canonical IDs.
 */

export type TxType = 'payment' | 'refund' | 'fee' | 'payout' | 'failed-pmt';
export type TxStatus = 'completed' | 'pending' | 'failed' | 'refunded' | 'processing';
export type TxRowVariant = 'failed' | 'refunded' | 'default';
export type TxAmountVariant = 'normal' | 'negative' | 'outgoing' | 'incoming' | 'muted';
export type TxTotalVariant = 'normal' | 'success' | 'warn' | 'danger';
export type TxValueVariant = 'normal' | 'danger' | 'warn';

export interface TxListRow {
  id: string;
  atlasId: string;
  variant: TxRowVariant;
  date: string;
  dateRelative: string;
  type: TxType;
  typeLabel: string;
  refId: string;
  refMeta: string;
  fromName: string;
  fromId: string;
  toName: string;
  toId: string;
  amount: string;
  currency: string;
  amountVariant: TxAmountVariant;
  amountMeta?: string;
  status: TxStatus;
  statusLabel: string;
}

/* ─────────────────────────────────────────
   9 LIST ROWS — verbatim from admin.html
   ───────────────────────────────────────── */
export const TRANSACTIONS_ROWS: TxListRow[] = [
  {
    id: 'tx-2026-08442',
    atlasId: 'TX-2026-08442',
    variant: 'failed',
    date: 'May 6 · 10:14',
    dateRelative: '38m ago',
    type: 'failed-pmt',
    typeLabel: 'Payment · failed',
    refId: 'TX-2026-08442',
    refMeta: 'INV-2026-1142 · Stripe pi_3O…91N',
    fromName: 'Studio Berlin GmbH',
    fromId: 'cl-002',
    toName: 'Atlas escrow',
    toId: 'acct_atlas',
    amount: '€2,840.00',
    currency: 'EUR',
    amountVariant: 'normal',
    amountMeta: '≈ $3,098 USD',
    status: 'failed',
    statusLabel: 'Failed',
  },
  {
    id: 'tx-2026-08441',
    atlasId: 'TX-2026-08441',
    variant: 'default',
    date: 'May 6 · 09:47',
    dateRelative: '1h ago',
    type: 'payment',
    typeLabel: 'Payment',
    refId: 'TX-2026-08441',
    refMeta: 'INV-2026-1141 · Stripe pi_3O…84M',
    fromName: 'Nordic Labs AB',
    fromId: 'cl-118',
    toName: 'Atlas escrow',
    toId: 'acct_atlas',
    amount: '$4,200.00',
    currency: 'USD',
    amountVariant: 'normal',
    status: 'completed',
    statusLabel: 'Completed',
  },
  {
    id: 'tx-2026-08440',
    atlasId: 'TX-2026-08440',
    variant: 'default',
    date: 'May 6 · 09:47',
    dateRelative: '1h ago',
    type: 'fee',
    typeLabel: 'Fee · 10%',
    refId: 'TX-2026-08440',
    refMeta: 'parent: TX-2026-08441',
    fromName: 'Atlas escrow',
    fromId: 'acct_atlas',
    toName: 'Atlas revenue',
    toId: 'acct_revenue',
    amount: '$420.00',
    currency: 'USD',
    amountVariant: 'incoming',
    status: 'completed',
    statusLabel: 'Completed',
  },
  {
    id: 'tx-2026-08439',
    atlasId: 'TX-2026-08439',
    variant: 'default',
    date: 'May 6 · 09:48',
    dateRelative: '1h ago',
    type: 'payout',
    typeLabel: 'Payout · Wise',
    refId: 'TX-2026-08439',
    refMeta: 'Wise wt_8m4Xb · NGN payout',
    fromName: 'Atlas escrow',
    fromId: 'acct_atlas',
    toName: 'Adesuwa Eze',
    toId: 'cand-001',
    amount: '₦5,872,800',
    currency: 'NGN',
    amountVariant: 'outgoing',
    amountMeta: '$3,780 USD · less 10% fee',
    status: 'completed',
    statusLabel: 'Completed',
  },
  {
    id: 'tx-2026-08402',
    atlasId: 'TX-2026-08402',
    variant: 'refunded',
    date: 'May 5 · 14:22',
    dateRelative: '19h ago',
    type: 'refund',
    typeLabel: 'Refund · dispute',
    refId: 'TX-2026-08402',
    refMeta: 'DSP-2026-0144 · Stripe re_3K…22Q',
    fromName: 'Atlas escrow',
    fromId: 'acct_atlas',
    toName: 'Studio Berlin GmbH',
    toId: 'cl-002',
    amount: '€840.00',
    currency: 'EUR',
    amountVariant: 'outgoing',
    amountMeta: '≈ $916 USD',
    status: 'refunded',
    statusLabel: 'Refunded',
  },
  {
    id: 'tx-2026-08398',
    atlasId: 'TX-2026-08398',
    variant: 'default',
    date: 'May 5 · 09:18',
    dateRelative: '25h ago',
    type: 'payment',
    typeLabel: 'Payment',
    refId: 'TX-2026-08398',
    refMeta: 'INV-2026-1098 · Stripe pi_3O…48L',
    fromName: 'Acme Robotics Inc',
    fromId: 'cl-088',
    toName: 'Atlas escrow',
    toId: 'acct_atlas',
    amount: '$8,400.00',
    currency: 'USD',
    amountVariant: 'normal',
    amountMeta: '3DS auth pending',
    status: 'pending',
    statusLabel: 'Pending',
  },
  {
    id: 'tx-2026-08395',
    atlasId: 'TX-2026-08395',
    variant: 'default',
    date: 'May 5 · 08:30',
    dateRelative: '26h ago',
    type: 'payout',
    typeLabel: 'Payout · Wise',
    refId: 'TX-2026-08395',
    refMeta: 'Wise wt_8m3Pq · ARS payout',
    fromName: 'Atlas escrow',
    fromId: 'acct_atlas',
    toName: 'Tomás Yúdice',
    toId: 'cand-019',
    amount: '$3,920,000',
    currency: 'ARS',
    amountVariant: 'outgoing',
    amountMeta: '$2,520 USD · settling',
    status: 'processing',
    statusLabel: 'Processing',
  },
  {
    id: 'tx-2026-08384',
    atlasId: 'TX-2026-08384',
    variant: 'default',
    date: 'May 4 · 12:00',
    dateRelative: '2d ago',
    type: 'fee',
    typeLabel: 'Subscription',
    refId: 'TX-2026-08384',
    refMeta: 'SUB-cl-244 · Stripe sub_1A…77K',
    fromName: 'Pixel & Stone Co',
    fromId: 'cl-244',
    toName: 'Atlas revenue',
    toId: 'acct_revenue',
    amount: '$199.00',
    currency: 'USD',
    amountVariant: 'incoming',
    status: 'completed',
    statusLabel: 'Completed',
  },
  {
    id: 'tx-2026-08362',
    atlasId: 'TX-2026-08362',
    variant: 'failed',
    date: 'May 3 · 22:01',
    dateRelative: '2d ago',
    type: 'failed-pmt',
    typeLabel: 'Payment · failed',
    refId: 'TX-2026-08362',
    refMeta: 'INV-2026-1062 · card expired',
    fromName: 'A2Z Solutions Ltd',
    fromId: 'cl-178 · banned',
    toName: 'Atlas escrow',
    toId: 'acct_atlas',
    amount: '$1,400.00',
    currency: 'USD',
    amountVariant: 'muted',
    status: 'failed',
    statusLabel: 'Failed',
  },
];

export const TRANSACTIONS_PAGE_HEADER = {
  title: 'All transactions',
  meta: '/admin/finance/transactions · 14,284 transactions in last 90d · 47 pending · 3 failed today',
};

export interface TxTotalCard {
  label: string;
  value: string;
  suffix?: string;
  variant?: TxTotalVariant;
  meta: string;
  metaBold?: string;
}

export const TRANSACTIONS_TOTALS: TxTotalCard[] = [
  { label: 'Gross volume · 90d', value: '$1,387K', suffix: 'USD', meta: 'transactions · multi-currency at FX', metaBold: '14,284' },
  { label: 'Atlas fee revenue', value: '$138.7K', suffix: 'USD', variant: 'success', meta: '10% take rate on hires · clean' },
  { label: 'Talent payouts', value: '$1,248K', suffix: 'USD', meta: 'payouts via Wise', metaBold: '11,420' },
  { label: 'Refunds issued', value: '$9.6K', suffix: 'USD', variant: 'warn', meta: 'refunds · 0.69% of GMV', metaBold: '42' },
  { label: 'Failures · 30d', value: '37', variant: 'danger', meta: '· 5 escalated', metaBold: '32 recovered' },
];

/* ─────────────────────────────────────────
   Detail fixture types
   ───────────────────────────────────────── */

export interface TxHeroStat {
  label: string;
  value: string;
  variant?: TxValueVariant;
  meta: string;
}

export interface TxFlowNode {
  variant: 'atlas' | 'client' | 'candidate';
  name: string;
  id: string;
  iconKind: 'atlas' | 'building' | 'person';
}

export interface TxFlowArrow {
  amount: string;
  label: string;
  dashed?: boolean;
  muted?: boolean;
}

export interface TxSettlementRow {
  label: string;
  value: string;
  bold?: boolean;
}

export interface TxProcessor {
  brand: 'stripe' | 'wise' | 'bank';
  logoText: string;
  name: string;
  meta: string;
  actionLabel: string;
  rows: Array<{ label: string; value: string; valueVariant?: 'normal' | 'danger' | 'warn'; code?: string }>;
}

export interface TxAuditEntry {
  variant?: 'default' | 'system' | 'success' | 'warn' | 'danger';
  time: string;
  title: string;
  titleActor?: string;
  delta?: string;
  detail: string;
  detailCode?: string;
}

export interface TxQuickStat {
  label: string;
  value: string;
  valueVariant?: TxValueVariant;
  link?: string;
}

export interface TxMoreMenuItem {
  label: string;
  variant?: 'default' | 'danger' | 'warn';
  iconKind: 'external' | 'copy' | 'reverse' | 'cancel' | 'export';
}

export interface TxDetailProfile {
  id: string;
  atlasId: string;
  status: TxStatus;
  statusLabel: string;
  type: TxType;
  typeLabel: string;
  heroVariant: 'high' | 'medium' | 'danger';
  timestamp: string;
  relativeTime: string;
  title: string;
  breadcrumbCurrent: string;

  /* subtitle */
  refInvoiceId: string;
  refEngagementId: string;
  refClientName: string;
  refClientId: string;
  refSanctionId?: string;
  declineCode?: string;

  /* hero stats */
  heroStats: TxHeroStat[];

  /* more dropdown */
  moreMenu: { sections: Array<{ heading: string; items: TxMoreMenuItem[] }> };

  /* error card */
  error?: {
    title: string;
    detail: string;
    detailCode: string;
    detailExtra: string;
    suggestedActions: string;
    actions: Array<{ label: string; variant?: 'warn' | 'default' }>;
  };

  /* refund drawer */
  refundDrawer?: {
    eyebrow: string;
    title: string;
    meta: string;
    currency: string;
    presets: Array<{ label: string; preset: string; active?: boolean }>;
    amountInput: string;
    amountMetaHTMLText: string;
    reasonOptions: string[];
    reasonSelected: string;
    footSummaryHTML: string;
  };

  /* section 01 — money flow */
  flowSectionMeta: string;
  flowNodes: TxFlowNode[];
  flowArrows: TxFlowArrow[];
  settlementBreakdown: TxSettlementRow[];

  /* section 02 — processors */
  processorSectionMeta: string;
  processors: TxProcessor[];

  /* section 03 — audit */
  auditSectionMeta: string;
  audit: TxAuditEntry[];

  /* rail */
  atAGlance: TxQuickStat[];
  relatedTransactions: TxQuickStat[];
  linkedSanctionLabel?: string;
  linkedSanctionId?: string;
  linkedSanctionMeta?: string;
}

/* ─────────────────────────────────────────
   CANONICAL DETAIL — TX-2026-08442
   verbatim from admin.html view-transaction-detail
   ───────────────────────────────────────── */
export const TRANSACTIONS_PROFILES: Record<string, TxDetailProfile> = {
  'tx-2026-08442': {
    id: 'tx-2026-08442',
    atlasId: 'TX-2026-08442',
    status: 'failed',
    statusLabel: 'Failed',
    type: 'failed-pmt',
    typeLabel: 'Payment · failed',
    heroVariant: 'high',
    timestamp: 'May 6 · 10:14 UTC',
    relativeTime: '38 min ago',
    title: '€2,840.00 EUR · Studio Berlin → Atlas escrow · failed (insufficient funds)',
    breadcrumbCurrent: 'TX-2026-08442 · €2,840 EUR · Studio Berlin',
    refInvoiceId: 'INV-2026-1142',
    refEngagementId: 'ENG-1142',
    refClientName: 'Studio Berlin',
    refClientId: 'cl-002',
    refSanctionId: 'sb-2026-0080',
    declineCode: 'card_declined · insufficient_funds',
    heroStats: [
      { label: 'Amount', value: '€2,840.00', variant: 'danger', meta: 'EUR · ≈ $3,098 USD at 1.0908' },
      { label: 'Failure code', value: 'card_declined', variant: 'warn', meta: 'insufficient_funds' },
      { label: 'Auto-retry', value: 'in 23h 22m', meta: 'May 7 · 10:14 UTC' },
      { label: 'Attempt', value: '1 of 3', meta: '2 retries remaining' },
    ],
    moreMenu: {
      sections: [
        {
          heading: 'Investigate',
          items: [
            { label: 'Open in Stripe dashboard', iconKind: 'external' },
            { label: 'Copy processor reference', iconKind: 'copy' },
          ],
        },
        {
          heading: 'Lifecycle',
          items: [
            { label: 'Reverse failed transaction', iconKind: 'reverse' },
            { label: 'Cancel auto-retry', variant: 'warn', iconKind: 'cancel' },
            { label: 'Export full record', iconKind: 'export' },
          ],
        },
      ],
    },
    error: {
      title: 'Stripe declined: insufficient_funds',
      detail: 'Card ending',
      detailCode: '•••• 4242',
      detailExtra:
        ' · issued by Berliner Sparkasse · Stripe error code card_declined · decline reason insufficient_funds · network response code 51.',
      suggestedActions:
        'wait for auto-retry (24h), or notify client to update payment method, or initiate manual refund of the prior successful payment if the engagement should be cancelled.',
      actions: [{ label: 'Retry now', variant: 'warn' }],
    },
    refundDrawer: {
      eyebrow: 'REFUND INITIATION',
      title: 'Initiate a refund for INV-2026-1142',
      meta: 'refunds against the prior successful payment (TX-2026-08402) on this invoice · €2,840 max',
      currency: 'EUR',
      amountInput: '2,840.00',
      amountMetaHTMLText: 'Full · €2,840.00 · max refundable · ≈ $3,098 USD at today’s rate',
      presets: [
        { label: '100% · €2,840', preset: 'full', active: true },
        { label: '50% · €1,420', preset: 'half' },
        { label: '25% · €710', preset: 'quarter' },
        { label: 'Custom', preset: 'custom' },
      ],
      reasonOptions: [
        '— Choose a reason —',
        'Dispute resolution',
        'Client cancellation',
        'Engagement quality issue',
        'Duplicate / billing mistake',
        'Fraud / chargeback',
        'Other (specify in notes)',
      ],
      reasonSelected: 'Dispute resolution',
      footSummaryHTML:
        'Refund €2,840.00 EUR via Stripe to card •••• 4242 · Atlas fee of €284.00 reversed · Daniel’s payout not affected (already disbursed) · Stripe processing fee not refunded (€85)',
    },
    flowSectionMeta:
      'parties involved · the dashed line represents the failed leg · audit-logged on every state change',
    flowNodes: [
      { variant: 'client', name: 'Studio Berlin GmbH', id: 'cl-002 · DE · Berlin', iconKind: 'building' },
      { variant: 'atlas', name: 'Atlas escrow', id: 'acct_atlas · USD', iconKind: 'atlas' },
      { variant: 'candidate', name: 'Daniel Kovács', id: 'spec-001 · HU · Wise EUR', iconKind: 'person' },
    ],
    flowArrows: [
      { amount: '€2,840 EUR', label: 'Failed', dashed: true },
      { amount: '€2,556 EUR', label: 'Would have settled', muted: true },
    ],
    settlementBreakdown: [
      { label: 'Total invoice', value: '€2,840.00' },
      { label: 'Stripe processing fee (1.4% + €0.25)', value: '€39.00' },
      { label: 'Net to escrow', value: '€2,801.00' },
      { label: 'Atlas fee (10% of net hire)', value: '€284.00' },
      { label: 'Wise FX + payout fee (≈ 0.6%)', value: '€16.80' },
      { label: 'Talent payout (Daniel)', value: '€2,500.20', bold: true },
    ],
    processorSectionMeta: 'links to upstream payment processors · access requires admin SSO + finance role',
    processors: [
      {
        brand: 'stripe',
        logoText: 'S',
        name: 'Stripe · Payment intent',
        meta: 'pi_3O2K8mLkdIwHu3z140qB91N · live mode · DE-EUR account',
        actionLabel: 'Open in Stripe ↗',
        rows: [
          { label: 'Status', value: 'requires_payment_method', valueVariant: 'danger' },
          { label: 'Last decline code', value: 'card_declined · insufficient_funds', valueVariant: 'warn' },
          { label: 'Card', value: ' · Mastercard · Berliner Sparkasse · DE', code: '•••• 4242' },
          { label: 'Setup intent', value: ' · 3DS verified Mar 14', code: 'seti_1A8mB7cD9eF' },
          { label: 'Risk score', value: '12 / 100 · normal' },
          { label: 'Network ref', value: ' · response 51', code: 'ch_3O2K8mLk…fail' },
        ],
      },
      {
        brand: 'wise',
        logoText: 'W',
        name: 'Wise · planned payout (not executed)',
        meta: 'would have created wt_8m4Xb_DK_eur · target Daniel Kovács · HU',
        actionLabel: 'Open in Wise ↗',
        rows: [
          { label: 'Status', value: 'queued · awaiting upstream success' },
          { label: 'Recipient ref', value: '', code: 'rec_dk_eur_8421' },
          { label: 'Quote', value: 'EUR → EUR · same currency · no FX' },
          { label: 'ETA on success', value: '≤ 4 business hours · SEPA Instant' },
        ],
      },
    ],
    auditSectionMeta: 'all state changes · money deltas to Atlas escrow · 12 events',
    audit: [
      {
        variant: 'danger',
        time: 'May 6 · 10:14:08 UTC',
        title: 'Charge declined by network · payment_intent failed',
        delta: '±€0.00',
        detail:
          'Stripe returned card_declined with reason insufficient_funds. Network response code 51. No funds moved. Auto-retry queued for May 7 · 10:14 UTC (24h spacing per retry policy).',
      },
      {
        variant: 'system',
        time: 'May 6 · 10:14:02 UTC',
        title: 'Charge attempt sent to Stripe',
        delta: '—',
        detail:
          'payment_intent pi_3O2K8m…91N confirmed via API. 3DS not required (card previously verified Mar 14). Attempt 1 of 3.',
      },
      {
        variant: 'default',
        time: 'May 6 · 10:14:00 UTC',
        title: 'Auto-charge triggered by invoice schedule',
        delta: '—',
        detail:
          'INV-2026-1142 reached payment-due-date · auto-charge cron picked up the invoice · charge instruction created.',
      },
      {
        variant: 'default',
        time: 'May 5 · 09:00 UTC',
        title: 'generated invoice INV-2026-1142',
        titleActor: 'System',
        delta: '—',
        detail:
          'Engagement ENG-1142 milestone "v2 design system delivered" verified by client (Studio Berlin). Invoice generated · €2,840 EUR · payment due May 6.',
      },
      {
        variant: 'default',
        time: 'Apr 28 · 14:22 UTC',
        title: 'approved engagement contract',
        titleActor: 'Client',
        delta: '—',
        detail:
          'Studio Berlin signed contract for ENG-1142. Auto-charge enabled. Payment method •••• 4242 selected.',
      },
    ],
    atAGlance: [
      { label: 'Tx ID', value: 'TX-2026-08442' },
      { label: 'Type', value: 'Payment' },
      { label: 'Amount', value: '€2,840.00 EUR', valueVariant: 'danger' },
      { label: 'USD equivalent', value: '$3,098 (1.0908)' },
      { label: 'Invoice', value: 'INV-2026-1142 →', link: '#' },
      { label: 'Engagement', value: 'ENG-1142 →', link: '#' },
      { label: 'Client', value: 'cl-002 →', link: '#' },
      { label: 'Talent', value: 'spec-001 (Daniel) →', link: '#' },
      { label: 'Audit log', value: '12 events ↗', link: '#' },
    ],
    relatedTransactions: [
      {
        label: 'Prior on this invoice',
        value: 'TX-2026-08402 →',
        link: '/admin/finance/transactions/tx-2026-08402',
      },
      {
        label: 'Atlas fee (parent)',
        value: 'TX-2026-08440 →',
        link: '/admin/finance/transactions/tx-2026-08440',
      },
      {
        label: 'Talent payout (parent)',
        value: 'TX-2026-08439 →',
        link: '/admin/finance/transactions/tx-2026-08439',
      },
    ],
    linkedSanctionId: 'sb-2026-0080',
    linkedSanctionLabel: 'SB-2026-0080',
    linkedSanctionMeta: 'late-payment pattern.',
  },
};

/* ─────────────────────────────────────────
   STUB profiles — non-canonical IDs
   ───────────────────────────────────────── */
export interface TxStubProfile {
  id: string;
  atlasId: string;
  status: TxStatus;
  statusLabel: string;
  type: TxType;
  typeLabel: string;
  timestamp: string;
  relativeTime: string;
  title: string;
  refClientName: string;
  refClientId: string;
}

export const TRANSACTIONS_STUBS: Record<string, TxStubProfile> = {
  'tx-2026-08441': {
    id: 'tx-2026-08441',
    atlasId: 'TX-2026-08441',
    status: 'completed',
    statusLabel: 'Completed',
    type: 'payment',
    typeLabel: 'Payment',
    timestamp: 'May 6 · 09:47 UTC',
    relativeTime: '1h ago',
    title: '$4,200.00 USD · Nordic Labs AB → Atlas escrow · completed',
    refClientName: 'Nordic Labs AB',
    refClientId: 'cl-118',
  },
  'tx-2026-08440': {
    id: 'tx-2026-08440',
    atlasId: 'TX-2026-08440',
    status: 'completed',
    statusLabel: 'Completed',
    type: 'fee',
    typeLabel: 'Fee · 10%',
    timestamp: 'May 6 · 09:47 UTC',
    relativeTime: '1h ago',
    title: '$420.00 USD · Atlas fee · 10% of TX-2026-08441',
    refClientName: 'Atlas revenue',
    refClientId: 'acct_revenue',
  },
  'tx-2026-08439': {
    id: 'tx-2026-08439',
    atlasId: 'TX-2026-08439',
    status: 'completed',
    statusLabel: 'Completed',
    type: 'payout',
    typeLabel: 'Payout · Wise',
    timestamp: 'May 6 · 09:48 UTC',
    relativeTime: '1h ago',
    title: '₦5,872,800 NGN · Atlas escrow → Adesuwa Eze · payout via Wise',
    refClientName: 'Adesuwa Eze',
    refClientId: 'cand-001',
  },
  'tx-2026-08402': {
    id: 'tx-2026-08402',
    atlasId: 'TX-2026-08402',
    status: 'refunded',
    statusLabel: 'Refunded',
    type: 'refund',
    typeLabel: 'Refund · dispute',
    timestamp: 'May 5 · 14:22 UTC',
    relativeTime: '19h ago',
    title: '€840.00 EUR · Refund to Studio Berlin · DSP-2026-0144',
    refClientName: 'Studio Berlin GmbH',
    refClientId: 'cl-002',
  },
  'tx-2026-08398': {
    id: 'tx-2026-08398',
    atlasId: 'TX-2026-08398',
    status: 'pending',
    statusLabel: 'Pending',
    type: 'payment',
    typeLabel: 'Payment',
    timestamp: 'May 5 · 09:18 UTC',
    relativeTime: '25h ago',
    title: '$8,400.00 USD · Acme Robotics Inc → Atlas escrow · 3DS auth pending',
    refClientName: 'Acme Robotics Inc',
    refClientId: 'cl-088',
  },
  'tx-2026-08395': {
    id: 'tx-2026-08395',
    atlasId: 'TX-2026-08395',
    status: 'processing',
    statusLabel: 'Processing',
    type: 'payout',
    typeLabel: 'Payout · Wise',
    timestamp: 'May 5 · 08:30 UTC',
    relativeTime: '26h ago',
    title: '$3,920,000 ARS · Atlas escrow → Tomás Yúdice · payout via Wise',
    refClientName: 'Tomás Yúdice',
    refClientId: 'cand-019',
  },
  'tx-2026-08384': {
    id: 'tx-2026-08384',
    atlasId: 'TX-2026-08384',
    status: 'completed',
    statusLabel: 'Completed',
    type: 'fee',
    typeLabel: 'Subscription',
    timestamp: 'May 4 · 12:00 UTC',
    relativeTime: '2d ago',
    title: '$199.00 USD · Pixel & Stone subscription · SUB-cl-244',
    refClientName: 'Pixel & Stone Co',
    refClientId: 'cl-244',
  },
  'tx-2026-08362': {
    id: 'tx-2026-08362',
    atlasId: 'TX-2026-08362',
    status: 'failed',
    statusLabel: 'Failed',
    type: 'failed-pmt',
    typeLabel: 'Payment · failed',
    timestamp: 'May 3 · 22:01 UTC',
    relativeTime: '2d ago',
    title: '$1,400.00 USD · A2Z Solutions Ltd → Atlas escrow · failed (card expired)',
    refClientName: 'A2Z Solutions Ltd',
    refClientId: 'cl-178',
  },
};

export const TRANSACTIONS_DETAIL_IDS = [
  'tx-2026-08442',
  'tx-2026-08441',
  'tx-2026-08440',
  'tx-2026-08439',
  'tx-2026-08402',
  'tx-2026-08398',
  'tx-2026-08395',
  'tx-2026-08384',
  'tx-2026-08362',
];
