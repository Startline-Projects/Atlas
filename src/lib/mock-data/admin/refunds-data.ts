// Refunds page mock data (Step 21)

export interface StatCell {
  label: string;
  hasPulse?: boolean;
  value: string;
  variant?: 'default' | 'warn' | 'success' | 'danger';
  meta: string;
}

export interface SectionNavItem {
  id: string;
  label: string;
}

export interface PendingRefund {
  id: string;
  ref: string;
  variant: 'urgent' | 'warn' | 'default';
  requesterName: string;
  requesterInitials: string;
  requesterGradient: string;
  reasonChip: 'dispute' | 'quality' | 'cancellation' | 'billing' | 'fraud';
  reasonLabel: string;
  slaPip: 'ok' | 'warn' | 'urgent';
  slaText: string;
  context: string;
  contextLinks?: Array<{ text: string; id: string; type: 'dispute' | 'engagement' | 'candidate' }>;
  reasonDetail: string;
  amount: string;
  amountUnit: string;
  amountType: 'PARTIAL REFUND' | 'FULL REFUND';
  amountMeta: string;
  amountPercent?: string;
  timeText: string;
}

export interface IssuedRefund {
  id: string;
  ref: string;
  date: string;
  dateRel: string;
  recipientName: string;
  recipientInitials: string;
  recipientGradient: string;
  recipientCode: string;
  recipientLocation: string;
  amount: string;
  amountUnit: string;
  reasonChip: 'dispute' | 'quality' | 'cancellation' | 'billing' | 'fraud';
  reasonLabel: string;
  adminName: string;
  adminInitials: string;
  adminGradient: string;
}

export const refundsPageHeader = {
  title: 'Refunds & adjustments',
  meta: '/admin/finance/refunds · 4 pending · 42 issued last 90d · $9.6K refund volume · 0.69% of GMV',
  metaPulses: [
    { text: '2 over SLA · review now', variant: 'danger' as const },
  ],
};

export const refundsSectionNav: SectionNavItem[] = [
  { id: 'pending', label: 'Pending queue' },
  { id: 'issued', label: 'Recently issued' },
  { id: 'manual', label: 'Manual refund' },
  { id: 'analytics', label: 'Analytics' },
];

export const refundsStats: StatCell[] = [
  {
    label: 'Pending review',
    hasPulse: true,
    value: '4',
    variant: 'warn',
    meta: '$5,348 awaiting decision · 2 over 48h SLA',
  },
  {
    label: 'Issued · 30 days',
    value: '14',
    variant: 'default',
    meta: '$4,820 total · 12 dispute · 2 quality',
  },
  {
    label: 'Refund rate · 90d',
    value: '0.69%',
    variant: 'success',
    meta: 'of $1,387K GMV · below 1.2% benchmark',
  },
  {
    label: 'Avg time to resolve',
    value: '18h',
    variant: 'default',
    meta: 'SLA 48h · 89% resolved on time',
  },
  {
    label: 'Escalated · 30d',
    value: '3',
    variant: 'danger',
    meta: '1 to Trust & Safety · 2 to Compliance',
  },
];

export const pendingRefunds: PendingRefund[] = [
  {
    id: 'ref-2026-0084',
    ref: 'REF-2026-0084',
    variant: 'urgent',
    requesterName: 'Tomás Yúdice',
    requesterInitials: 'TY',
    requesterGradient: 'linear-gradient(135deg, #6E4F8B, #3D2B4E)',
    reasonChip: 'dispute',
    reasonLabel: 'Dispute resolution',
    slaPip: 'urgent',
    slaText: '52h pending · over SLA',
    context: 'cand-019 · related to DSP-2026-0144 · engagement ENG-1188 · client Stefan Volkov (cl-318)',
    contextLinks: [
      { text: 'DSP-2026-0144', id: 'dsp-2026-0144', type: 'dispute' },
      { text: 'ENG-1188', id: 'eng-1188', type: 'engagement' },
    ],
    reasonDetail: 'Dispute resolution awarded 30% refund to client per arbitrator decision. Engagement was 70% delivered; client raised quality concerns on remaining 30%. Tomás disputes the decision but agreed to honor it. Routing here for admin issue.',
    amount: '$420',
    amountUnit: 'USD',
    amountType: 'PARTIAL REFUND',
    amountMeta: 'of $1,400 contract',
    amountPercent: '30% to client',
    timeText: 'filed May 4 · 06:12 UTC',
  },
  {
    id: 'ref-2026-0083',
    ref: 'REF-2026-0083',
    variant: 'urgent',
    requesterName: 'Eastline Holdings',
    requesterInitials: 'EH',
    requesterGradient: 'linear-gradient(135deg, #C41E3A, #7E1525)',
    reasonChip: 'fraud',
    reasonLabel: 'Fraud-adjacent',
    slaPip: 'urgent',
    slaText: '54h pending · do NOT issue',
    context: 'cl-201 · linked to Vorona ring · FA-2026-0042 · account banned May 5',
    reasonDetail: 'Refund of contract value for "unsatisfactory delivery". Note: this client was banned 2 days after filing. Fraud-detection flagged the original payment as part of the Vorona ring\'s GMV-inflation pattern. Recommend reject and escalate to Compliance.',
    amount: '$2,800',
    amountUnit: 'USD',
    amountType: 'FULL REFUND',
    amountMeta: 'of $2,800 contract',
    amountPercent: '100%',
    timeText: 'filed May 4 · 04:08 UTC',
  },
  {
    id: 'ref-2026-0082',
    ref: 'REF-2026-0082',
    variant: 'warn',
    requesterName: 'Acme Robotics',
    requesterInitials: 'AR',
    requesterGradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)',
    reasonChip: 'quality',
    reasonLabel: 'Quality issue',
    slaPip: 'warn',
    slaText: '31h pending · 17h to SLA',
    context: 'cl-088 · engagement ENG-1156 · candidate Mira Chowdhury (cand-1156) · Specialist Jana Reinholt',
    contextLinks: [
      { text: 'ENG-1156', id: 'eng-1156', type: 'engagement' },
    ],
    reasonDetail: 'Final deliverable did not meet contract spec — 3 of 7 deliverables missing or incomplete. Specialist Jana confirmed the gap. Requesting 30% refund covering missing deliverables. Mira agreed in good faith.',
    amount: '$1,260',
    amountUnit: 'USD',
    amountType: 'PARTIAL REFUND',
    amountMeta: 'of $4,200 contract',
    amountPercent: '30%',
    timeText: 'filed May 5 · 03:14 UTC',
  },
  {
    id: 'ref-2026-0081',
    ref: 'REF-2026-0081',
    variant: 'default',
    requesterName: 'Pixel & Stone Co',
    requesterInitials: 'PS',
    requesterGradient: 'linear-gradient(135deg, #5C8E5A, #2D4F2C)',
    reasonChip: 'cancellation',
    reasonLabel: 'Cancellation',
    slaPip: 'ok',
    slaText: '14h pending · in SLA',
    context: 'cl-244 · TX-2026-08384 · subscription billed May 4 · cancelled within 7-day window',
    reasonDetail: 'Subscribed to Premium tier on May 4. Realized we don\'t have enough hiring volume to justify $499/mo. Cancelled within the 7-day money-back window. Standard refund flow per policy.',
    amount: '$199',
    amountUnit: 'USD',
    amountType: 'FULL REFUND',
    amountMeta: 'of $199 subscription',
    amountPercent: '100%',
    timeText: 'filed May 5 · 20:00 UTC',
  },
];

// --- Pass B: Section 3 (Manual Refund) ---

export interface AutocompleteResult {
  id: string;
  initials: string;
  gradient: string;
  name: string;
  meta: string;
}

export interface SourceChip {
  id: string;
  label: string;
  active?: boolean;
}

export const manualFormData = {
  title: 'Issue a manual refund',
  meta: 'use when no pending request exists (e.g., good-will adjustment, billing correction, partner credit) · separate flow from the pending queue above',
  sectionTitle: 'Manual refund / adjustment',
  sectionMeta: 'issue an ad-hoc refund or balance adjustment · separate from pending-queue · all entries audit-logged with admin identity',
  recipientValue: 'Studio Berlin GmbH',
  recipientSelected: 'Studio Berlin GmbH',
  recipientSelectedId: 'cl-002',
  recipientHint: 'refunds dispatched to the original payment method',
  autocompleteResults: [
    { id: 'cl-002', initials: 'SB', gradient: 'linear-gradient(135deg, #6B4226, #3F260F)', name: 'Studio Berlin GmbH', meta: 'cl-002 · CLIENT · DE' },
    { id: 'cand-019', initials: 'TY', gradient: 'linear-gradient(135deg, #6E4F8B, #3D2B4E)', name: 'Tomás Yúdice', meta: 'cand-019 · CANDIDATE · AR' },
    { id: 'cl-088', initials: 'AR', gradient: 'linear-gradient(135deg, #8B7355, #5C4D38)', name: 'Acme Robotics Inc', meta: 'cl-088 · CLIENT · US' },
  ] as AutocompleteResult[],
  amountValue: '500.00',
  currencies: ['EUR', 'USD', 'GBP', 'NGN', 'ARS', 'INR'],
  amountHint: '≈ $545 USD at today’s rate · max refundable from this client: €2,840 (4 prior payments)',
  sourceChips: [
    { id: 'atlas-rev', label: 'Atlas revenue', active: true },
    { id: 'atlas-escrow', label: 'Atlas escrow' },
    { id: 'goodwill', label: 'Goodwill budget' },
  ] as SourceChip[],
  sourceHint: 'Atlas revenue · refund is recognized as a negative revenue entry · affects current quarter',
  reasonOptions: [
    '— Choose a reason —',
    'Billing error / over-billing correction',
    'Goodwill adjustment',
    'Good-faith credit (failed engagement)',
    'Partner / referral credit',
    'Currency conversion correction',
    'Other (specify in notes)',
  ],
  reasonSelected: 'Good-faith credit (failed engagement)',
  notesPlaceholder: 'Explain the reason for this manual refund · audit-logged · supports markdown',
  notesValue: 'Good-faith credit issued after the failed Stripe charge on May 6 (TX-2026-08442). Client has a pending suspension appeal (SB-2026-0080) and we want to keep the relationship healthy while the situation resolves. Cleared with Dario on Slack.',
  confirmText: {
    amount: '€500.00 EUR',
    recipient: 'Studio Berlin (cl-002)',
    source: 'Atlas revenue',
    reason: 'Good-faith credit',
    suffix: 'Stripe will refund to the original card. Recipient is notified by email. Audit-logged.',
  },
};

// --- Pass B: Section 4 (Analytics) ---

export const analyticsHeader = {
  title: 'Refund analytics',
  meta: '90-day window · refresh rate 1h · all monetary values normalized to USD at today’s FX',
  dateRanges: ['30d', '90d', 'YTD'] as const,
  activeDateRange: '90d',
};

export const rateGaugeData = {
  title: 'Refund rate vs target',
  meta: '% of GMV refunded · 90 days · benchmark from industry data',
  rate: 0.69,
  arcLength: 157,
  dashOffset: 103,
  context: 'Below the 1.2% industry benchmark and within Atlas’s 1.0% target ceiling. Trending flat vs the prior 90-day window (0.71%).',
  targets: [
    { label: 'Target ceiling', value: '1.0%' },
    { label: 'Industry benchmark', value: '1.2%' },
  ],
};

export interface PeriodBar {
  week: string;
  height: string;
  title: string;
  current?: boolean;
}

export const periodChartData = {
  title: 'Refunds per week',
  meta: '13 weeks · count of refunds issued · this week highlighted',
  bars: [
    { week: 'W1', height: '35%', title: 'W1 · 3 refunds' },
    { week: 'W2', height: '50%', title: 'W2 · 4 refunds' },
    { week: 'W3', height: '40%', title: 'W3 · 3 refunds' },
    { week: 'W4', height: '60%', title: 'W4 · 5 refunds' },
    { week: 'W5', height: '30%', title: 'W5 · 2 refunds' },
    { week: 'W6', height: '55%', title: 'W6 · 4 refunds' },
    { week: 'W7', height: '45%', title: 'W7 · 3 refunds' },
    { week: 'W8', height: '70%', title: 'W8 · 6 refunds' },
    { week: 'W9', height: '50%', title: 'W9 · 4 refunds' },
    { week: 'W10', height: '30%', title: 'W10 · 2 refunds' },
    { week: 'W11', height: '40%', title: 'W11 · 3 refunds' },
    { week: 'W12', height: '35%', title: 'W12 · 2 refunds' },
    { week: 'W13', height: '25%', title: 'W13 (current) · 1 refund', current: true },
  ] as PeriodBar[],
  summary: 'Volume stable at ~3.2 / wk avg · peak W8 (6) coincided with the Vorona ring incident · no anomalies otherwise.',
};

export type ReasonVariant = 'dispute' | 'quality' | 'cancellation' | 'billing' | 'fraud';

export interface ReasonBarRow {
  variant: ReasonVariant;
  label: string;
  percent: number;
  count: string;
}

export const reasonBarsData = {
  title: 'By reason category',
  meta: 'distribution of 42 refunds in last 90 days · % of refund count',
  rows: [
    { variant: 'dispute' as ReasonVariant, label: 'Dispute resolution', percent: 38, count: '16 · $4.2K' },
    { variant: 'quality' as ReasonVariant, label: 'Quality issue', percent: 28, count: '12 · $2.8K' },
    { variant: 'cancellation' as ReasonVariant, label: 'Cancellation', percent: 22, count: '9 · $1.4K' },
    { variant: 'billing' as ReasonVariant, label: 'Billing error', percent: 8, count: '3 · $0.4K' },
    { variant: 'fraud' as ReasonVariant, label: 'Fraud-related', percent: 4, count: '2 · $0.8K' },
  ],
};

export interface TopRefunder {
  rank: string;
  name: string;
  initials: string;
  gradient: string;
  meta: string;
  barWidth: string;
  barColor?: string;
  pct: string;
  pctColor?: string;
  amount: string;
  amountMeta: string;
}

export const topListData = {
  title: 'Top refunded clients',
  meta: 'clients with most refunds · sorted by % of their GMV refunded · last 90d',
  rows: [
    { rank: '01', name: 'Studio Berlin GmbH', initials: 'SB', gradient: 'linear-gradient(135deg, #6B4226, #3F260F)', meta: 'cl-002 · 4 refunds · DE', barWidth: '100%', barColor: 'var(--danger)', pct: '8.4% of GMV', pctColor: 'var(--danger)', amount: '€1,420', amountMeta: 'EUR · 4 tx' },
    { rank: '02', name: 'Acme Robotics Inc', initials: 'AR', gradient: 'linear-gradient(135deg, #8B7355, #5C4D38)', meta: 'cl-088 · 3 refunds · US', barWidth: '42%', barColor: 'var(--amber)', pct: '3.5% of GMV', pctColor: 'var(--amber)', amount: '$1,460', amountMeta: 'USD · 3 tx' },
    { rank: '03', name: 'Vorona Capital', initials: 'VC', gradient: 'linear-gradient(135deg, #C41E3A, #7E1525)', meta: 'cl-167 · 3 refunds · banned', barWidth: '35%', barColor: 'var(--danger)', pct: '2.9% of GMV · ring', pctColor: 'var(--danger)', amount: '$840', amountMeta: 'USD · 3 tx' },
    { rank: '04', name: 'CartoTech Solutions', initials: 'CT', gradient: 'linear-gradient(135deg, #4F8BC9, #2C4F70)', meta: 'cl-156 · 1 refund · CA', barWidth: '22%', pct: '1.8% of GMV', amount: '$5,400', amountMeta: 'USD · 1 tx' },
    { rank: '05', name: 'Sundance Studios', initials: 'SS', gradient: 'linear-gradient(135deg, #5C8E5A, #2D4F2C)', meta: 'cl-301 · 1 refund · US', barWidth: '12%', pct: '1.0% of GMV', amount: '$700', amountMeta: 'USD · 1 tx' },
  ] as TopRefunder[],
};

export const insightsData = {
  title: 'Refund-pattern insights · last 90 days',
  items: [
    { bold: 'Studio Berlin (cl-002)', text: ' is the only client with refund rate over 5% · 4 refunds, all dispute-resolution · same engagement category (design)', linkText: 'review client →', linkId: 'cl-002' },
    { bold: 'Dispute resolution is the dominant reason', text: ' at 38% of refunds and 44% of refund volume · suggests value in pre-engagement clarity (clearer deliverable specs, milestone definitions)' },
    { bold: 'Vorona ring (cl-167 + 4 satellites)', text: ' accounts for 3 of the last 90-day refunds · all flagged at issue · part of the wider FA-2026-0042 case · banned', linkText: 'FA-2026-0042', linkId: 'fa-2026-0042' },
    { bold: 'Engineering category has 2× the refund rate', text: ' of other categories (1.2% vs 0.6% avg) · primarily from quality-issue refunds · investigate Specialist screening' },
  ],
};

export const issuedRefunds: IssuedRefund[] = [
  {
    id: 'ref-2026-0080',
    ref: 'REF-2026-0080',
    date: 'May 5 · 14:22',
    dateRel: '19h ago',
    recipientName: 'Studio Berlin GmbH',
    recipientInitials: 'SB',
    recipientGradient: 'linear-gradient(135deg, #6B4226, #3F260F)',
    recipientCode: 'cl-002',
    recipientLocation: 'DE',
    amount: '€840.00',
    amountUnit: 'EUR',
    reasonChip: 'dispute',
    reasonLabel: 'Dispute · DSP-2026-0144',
    adminName: 'Sarah Reyes',
    adminInitials: 'SR',
    adminGradient: 'linear-gradient(135deg, #A0C9B8, #4F8B6E)',
  },
  {
    id: 'ref-2026-0078',
    ref: 'REF-2026-0078',
    date: 'May 4 · 11:08',
    dateRel: '2d ago',
    recipientName: 'Nordic Labs AB',
    recipientInitials: 'NL',
    recipientGradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)',
    recipientCode: 'cl-118',
    recipientLocation: 'SE',
    amount: '$1,200.00',
    amountUnit: 'USD',
    reasonChip: 'quality',
    reasonLabel: 'Quality issue',
    adminName: 'Dario Fonseca',
    adminInitials: 'DF',
    adminGradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)',
  },
  {
    id: 'ref-2026-0077',
    ref: 'REF-2026-0077',
    date: 'May 3 · 16:45',
    dateRel: '3d ago',
    recipientName: 'Acme Robotics Inc',
    recipientInitials: 'AR',
    recipientGradient: 'linear-gradient(135deg, #8B7355, #5C4D38)',
    recipientCode: 'cl-088',
    recipientLocation: 'US',
    amount: '$200.00',
    amountUnit: 'USD',
    reasonChip: 'billing',
    reasonLabel: 'Billing error',
    adminName: 'Aïsha Okafor',
    adminInitials: 'AO',
    adminGradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)',
  },
  {
    id: 'ref-2026-0076',
    ref: 'REF-2026-0076',
    date: 'May 2 · 09:30',
    dateRel: '4d ago',
    recipientName: 'CartoTech Solutions',
    recipientInitials: 'CT',
    recipientGradient: 'linear-gradient(135deg, #4F8BC9, #2C4F70)',
    recipientCode: 'cl-156',
    recipientLocation: 'CA',
    amount: '$5,400.00',
    amountUnit: 'USD',
    reasonChip: 'dispute',
    reasonLabel: 'Chargeback dispute',
    adminName: 'Dario Fonseca',
    adminInitials: 'DF',
    adminGradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)',
  },
  {
    id: 'ref-2026-0075',
    ref: 'REF-2026-0075',
    date: 'Apr 30 · 13:18',
    dateRel: '6d ago',
    recipientName: 'Sundance Studios',
    recipientInitials: 'SS',
    recipientGradient: 'linear-gradient(135deg, #5C8E5A, #2D4F2C)',
    recipientCode: 'cl-301',
    recipientLocation: 'US',
    amount: '$700.00',
    amountUnit: 'USD',
    reasonChip: 'cancellation',
    reasonLabel: 'Pre-start cancellation',
    adminName: 'Sarah Reyes',
    adminInitials: 'SR',
    adminGradient: 'linear-gradient(135deg, #A0C9B8, #4F8B6E)',
  },
  {
    id: 'ref-2026-0073',
    ref: 'REF-2026-0073',
    date: 'Apr 28 · 10:02',
    dateRel: '8d ago',
    recipientName: 'MetroEats GmbH',
    recipientInitials: 'ME',
    recipientGradient: 'linear-gradient(135deg, #8B4F6E, #4F2D3E)',
    recipientCode: 'cl-422',
    recipientLocation: 'DE',
    amount: '€480.00',
    amountUnit: 'EUR',
    reasonChip: 'quality',
    reasonLabel: 'Quality issue',
    adminName: 'Aïsha Okafor',
    adminInitials: 'AO',
    adminGradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)',
  },
];
