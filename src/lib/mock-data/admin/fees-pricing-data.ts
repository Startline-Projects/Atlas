/**
 * Step 20 — Fees & Pricing mock data.
 *
 * Single flat configuration page, 7 internal sections.
 * Pass A: Sections 1-3 fully populated.
 * Pass B (later): Sections 4-7.
 */

export const FEES_PRICING_PAGE_HEADER = {
  title: 'Fees & pricing',
  meta: '/admin/finance/fees-pricing · last fee change Apr 18 · 4 active promo codes · audit log 23 events',
};

export interface FpNavItem {
  id: string;
  label: string;
  anchor: string;
}

export const FEES_PRICING_NAV_ITEMS: FpNavItem[] = [
  { id: 'current', label: 'Current fees', anchor: '#fp-section-current' },
  { id: 'recert', label: 'Re-certification', anchor: '#fp-section-recert' },
  { id: 'passthrough', label: 'Pass-through', anchor: '#fp-section-passthrough' },
  { id: 'modify', label: 'Modify', anchor: '#fp-section-modify' },
  { id: 'promo', label: 'Promo codes', anchor: '#fp-section-promo' },
  { id: 'tiers', label: 'Pricing tiers', anchor: '#fp-section-tiers' },
  { id: 'audit', label: 'Audit log', anchor: '#fp-section-audit' },
];

/* Section 1 — Current fees (admin.html lines 44106-44133) */
export interface FpFeeCard {
  id: string;
  eyebrow: string;
  editLabel: string;
  label: string;
  value: string;
  unit: string;
  variant?: 'headline' | 'default' | 'disabled';
  metaHtml: string; // simple template — bold parts handled inline in component
  sinceHtml: string;
}

export const FP_CURRENT_FEES: FpFeeCard[] = [
  {
    id: 'client-hire',
    eyebrow: 'PRIMARY · CLIENT',
    editLabel: 'Modify',
    label: 'Client fee on hire',
    value: '10',
    unit: '% of contract value',
    variant: 'headline',
    metaHtml:
      "Applied at the moment a client confirms a hire and the engagement contract is signed. **Net of Stripe processing**, before Wise FX. This is Atlas's primary revenue line — **$138.7K of $138.7K fee revenue in last 90d**.",
    sinceHtml: 'In effect since **Apr 18 2026** · prior rate was 8% (founder pricing) · [view change history →]',
  },
  {
    id: 'candidate-hire',
    eyebrow: 'PRIMARY · CANDIDATE',
    editLabel: 'Modify',
    label: 'Candidate fee on hire',
    value: '0',
    unit: '% · free for talent',
    variant: 'default',
    metaHtml:
      "Talent keeps the full negotiated rate, minus Wise FX (pass-through). This is an intentional positioning choice — Atlas is free for talent, paid by employers. Reviewed at every quarterly board meeting.",
    sinceHtml: 'Stable since launch · [view change history →]',
  },
];

/* Section 2 — Re-certification (admin.html lines 44148-44216) */
export interface FpRecertRow {
  id: string;
  iconKind: 'book' | 'video' | 'video-eye';
  name: string;
  desc: string;
  price: string;
  unit: string;
  volume: string;
  volumeMeta: string;
}

export const FP_RECERT_ROWS: FpRecertRow[] = [
  {
    id: 'recert-english',
    iconKind: 'book',
    name: 'English assessment · re-take',
    desc: 'written + listening · auto-graded · 60 min',
    price: '$20',
    unit: 'USD',
    volume: '142',
    volumeMeta: '$2,840 revenue · 30d',
  },
  {
    id: 'recert-i1',
    iconKind: 'video',
    name: 'Interview 1 · re-take',
    desc: 'generalist · 30 min with Specialist',
    price: '$30',
    unit: 'USD',
    volume: '68',
    volumeMeta: '$2,040 revenue · 30d',
  },
  {
    id: 'recert-i2',
    iconKind: 'video-eye',
    name: 'Interview 2 · per category · re-take',
    desc: 'category specialist · 45 min · technical assessment',
    price: '$50',
    unit: 'USD',
    volume: '42',
    volumeMeta: '$2,100 revenue · 30d',
  },
];

/* Section 3 — Pass-through (admin.html lines 44230-44245) */
export interface FpPassthroughCard {
  id: string;
  brand: 'stripe' | 'wise';
  logoText: string;
  gradient: string;
  name: string;
  metaHtml: string;
}

export const FP_PASSTHROUGH_CARDS: FpPassthroughCard[] = [
  {
    id: 'stripe',
    brand: 'stripe',
    logoText: 'S',
    gradient: 'linear-gradient(135deg, #635bff, #4a40d4)',
    name: 'Stripe payment processing',
    metaHtml:
      "Standard EU rates apply · **1.4% + €0.25** for EU cards · **2.9% + $0.30** for international · paid by the client",
  },
  {
    id: 'wise',
    brand: 'wise',
    logoText: 'W',
    gradient: 'linear-gradient(135deg, #2bc25e, #1d8a40)',
    name: 'Wise currency conversion + payout',
    metaHtml:
      "Mid-market FX rate + Wise's standard fee (**≈ 0.6%**) · paid by the talent (deducted from payout)",
  },
];

export const FP_GATE_TEXT_HTML =
  'All fee modifications require **Super Admin** role + password re-entry on confirm. You (**Aïsha Okafor**) have Operations Admin — view-only access. **Dario Fonseca** can make changes. Promo-code management is delegated and available to Operations.';

/* ─────────────────────────────────────────
   Section 4 — Modify drawer
   ───────────────────────────────────────── */
export interface FpImpactCell {
  label: string;
  value: string;
  meta: string;
}

export const FP_MODIFY = {
  eyebrow: 'MODIFYING · CLIENT FEE ON HIRE',
  title: 'Adjust client fee from 10% to a new value',
  meta: 'primary platform fee · last changed Apr 18 · prior value was 8% (founder pricing)',
  beforeValue: '10',
  beforeUnit: '%',
  beforeMetaHtml: 'in effect since **Apr 18 2026**',
  afterValue: '12',
  afterUnit: '%',
  afterInput: '12',
  afterMetaHtml: '**+2pt** · estimated **+$27.7K / quarter** revenue impact',
  configEffectiveDate: '2026-05-13',
  configEffectiveHint: '7-day notice to existing engagements · changes apply to new engagements only',
  configReason:
    "Standard 10% → 12% adjustment per Q2 board guidance. Founders' 8% pricing ended Apr 18 at 10%. Q2 plan targets 12% as part of revenue normalization.",
  impactCells: [
    { label: 'Atlas fee revenue · / quarter', value: '$166.4K', meta: 'up from $138.7K · +$27.7K' },
    { label: 'Per-hire fee · avg', value: '$485', meta: 'up from $404 · same hire mix' },
    { label: 'Affected engagements', value: '+24 / wk', meta: 'applies to new hires only' },
  ] as FpImpactCell[],
  confirmHtml:
    'Saving requires **Super Admin password re-entry**. Notice email auto-sent to all active clients 7 days before effective date. Reverting takes the same flow.',
};

/* ─────────────────────────────────────────
   Section 5 — Promotional codes
   ───────────────────────────────────────── */
export type FpPromoStatus = 'completed' | 'expired';

export interface FpPromoRow {
  code: string;
  name: string;
  meta: string;
  discount: string;
  expires: string;
  uses: string;
  usesMeta: string;
  status: FpPromoStatus;
  statusLabel: string;
}

export const FP_PROMO_ROWS: FpPromoRow[] = [
  {
    code: 'FOUNDER25',
    name: 'Founding clients · 25% off first quarter',
    meta: 'first 100 clients · cohort-locked · auto-applies on signup',
    discount: '25% off · 3 mo',
    expires: 'No expiry',
    uses: '84',
    usesMeta: '/ 100 · $42K saved',
    status: 'completed',
    statusLabel: 'Active',
  },
  {
    code: 'SPRING2026',
    name: 'Spring campaign · 10% off first hire',
    meta: 'marketing-driven · entered manually at checkout · single-use per account',
    discount: '10% · 1 hire',
    expires: 'Jun 30 2026',
    uses: '142',
    usesMeta: '/ unlimited · $14.2K saved',
    status: 'completed',
    statusLabel: 'Active',
  },
  {
    code: 'PARTNER-A16Z',
    name: 'A16Z portfolio · 50% off first 3 hires',
    meta: 'partner referral · whitelist of 84 portfolio companies · invoiced separately',
    discount: '50% · 3 hires',
    expires: 'Dec 31 2026',
    uses: '22',
    usesMeta: '/ 84 portcos · $18.6K saved',
    status: 'completed',
    statusLabel: 'Active',
  },
  {
    code: 'REFER10',
    name: 'Client → client referral · 10% off next hire',
    meta: 'earned automatically when client refers another client who hires successfully',
    discount: '10% · 1 hire',
    expires: 'No expiry',
    uses: '38',
    usesMeta: '/ unlimited · $3.8K saved',
    status: 'completed',
    statusLabel: 'Active',
  },
  {
    code: 'LAUNCH50',
    name: 'Platform launch · 50% off first hire',
    meta: 'expired · launch-week campaign · January 2026',
    discount: '50% · 1 hire',
    expires: 'Jan 31 2026',
    uses: '204',
    usesMeta: '/ unlimited · $61.2K saved',
    status: 'expired',
    statusLabel: 'Expired',
  },
];

/* ─────────────────────────────────────────
   Section 6 — Pricing tiers
   ───────────────────────────────────────── */
export type FpTierVariant = 'current' | 'preview';

export interface FpTierCard {
  id: string;
  variant: FpTierVariant;
  name: string;
  price: string;
  unit: string;
  features: string[];
  actions: Array<{ label: string; primary?: boolean }>;
}

export const FP_TIER_CARDS: FpTierCard[] = [
  {
    id: 'standard',
    variant: 'current',
    name: 'Standard',
    price: '10',
    unit: '% per hire',
    features: [
      'Unlimited hires',
      'All 22 talent categories',
      'Specialist support · 48h SLA',
      'Standard payment terms · Net 30',
    ],
    actions: [{ label: 'Configure' }],
  },
  {
    id: 'premium',
    variant: 'preview',
    name: 'Premium',
    price: '$499',
    unit: '/ mo + 8% per hire',
    features: [
      'Everything in Standard',
      'Lower per-hire fee (8%)',
      'Priority Specialist support · 12h SLA',
      'Custom payment terms · Net 60',
      'Talent shortlist within 24h',
    ],
    actions: [{ label: 'Configure' }, { label: 'Launch', primary: true }],
  },
  {
    id: 'enterprise',
    variant: 'preview',
    name: 'Enterprise',
    price: 'Custom',
    unit: '· contact sales',
    features: [
      'Everything in Premium',
      'Negotiated per-hire fee',
      'Dedicated Account Manager',
      'SSO + SCIM + custom reporting',
      'SLA-backed contract',
    ],
    actions: [{ label: 'Configure' }, { label: 'Launch', primary: true }],
  },
];

/* ─────────────────────────────────────────
   Section 7 — Audit log
   ───────────────────────────────────────── */
export interface FpAuditChange {
  before?: string;
  after: string;
}

export interface FpAuditEvent {
  id: string;
  variant?: 'super' | 'system';
  time: string;
  refId: string;
  refMeta?: string;
  titleLeading: string;
  actor: string;
  titleTrailing?: string;
  promoCode?: string;
  change?: FpAuditChange;
  reason: string;
}

export const FP_AUDIT_EVENTS: FpAuditEvent[] = [
  {
    id: 'fc-2026-023',
    variant: 'super',
    time: 'Apr 18 2026 · 14:22 UTC',
    refId: 'FC-2026-023',
    refMeta: 'current',
    titleLeading: 'Client fee on hire raised · by',
    actor: 'Dario Fonseca',
    titleTrailing: '(Super Admin)',
    change: { before: '8.0%', after: '10.0%' },
    reason:
      '"Founder pricing window ended Mar 31. Q2 plan called for normalization to 10%. 7-day notice sent to all 412 active clients. 3 clients cancelled subscriptions in response (within expected churn band)."',
  },
  {
    id: 'fc-2026-022',
    variant: 'super',
    time: 'Mar 4 2026 · 11:08 UTC',
    refId: 'FC-2026-022',
    titleLeading: 'Interview 2 re-cert fee raised · by',
    actor: 'Dario Fonseca',
    titleTrailing: '(Super Admin)',
    change: { before: '$40', after: '$50' },
    reason:
      '"Reflects actual Specialist time cost for technical interviews · 45 min average · brings re-cert revenue closer to break-even on Specialist comp."',
  },
  {
    id: 'fc-2026-021',
    variant: 'super',
    time: 'Feb 12 2026 · 09:45 UTC',
    refId: 'FC-2026-021',
    titleLeading: 'New promo code',
    actor: 'Aïsha Okafor',
    titleTrailing: '(you · Ops Admin)',
    promoCode: 'PARTNER-A16Z',
    reason:
      '"Partner referral campaign · 50% off first 3 hires for A16Z portfolio companies · whitelist of 84 portcos · cleared with Dario via Slack."',
  },
  {
    id: 'fc-2026-018',
    variant: 'super',
    time: 'Jan 31 2026 · 23:59 UTC',
    refId: 'FC-2026-018',
    titleLeading: 'Launch promo',
    actor: 'System',
    titleTrailing: '(scheduled)',
    promoCode: 'LAUNCH50',
    reason:
      '"Scheduled expiry per original promo setup. 204 uses · $61.2K total discount granted during launch month. Successor code SPRING2026 created same day."',
  },
  {
    id: 'fc-2026-015',
    variant: 'super',
    time: 'Jan 14 2026 · 16:30 UTC',
    refId: 'FC-2026-015',
    titleLeading: 'Initial fee structure set · by',
    actor: 'Dario Fonseca',
    titleTrailing: '(Super Admin · founder)',
    change: { after: 'Client fee: 8% · Candidate fee: 0% · Re-cert: $20 / $30 / $40' },
    reason:
      '"Platform launch pricing. 8% founder rate, intentionally lower than the 10% target rate, for first 90 days. Re-certification fees set per cost analysis of Specialist time."',
  },
];
