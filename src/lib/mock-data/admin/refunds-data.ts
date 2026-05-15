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
  title: 'Refunds',
  meta: 'Active refund queue + issued log · 4 pending · 2 over SLA',
  metaPulses: [
    { text: '2 over SLA', variant: 'danger' as const },
    { text: '4 pending', variant: 'warn' as const },
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
