/**
 * Phase 10a — Active Engagements data
 *
 * 8 engagement fixtures for the list view + detail pages.
 * eng-001 (Studio Berlin × Adesuwa Babatunde) is CANONICAL per admin.html
 * lines 21457-21471 (list row) + 21609-22281 (detail). Other 7 engagements
 * have verbatim list-row data from admin.html lines 21474-21591; their
 * detail-page data (heroStats, banner, quickFacts, tocMetas) is
 * role-coherent filler since admin.html only renders eng-001 in detail.
 */

// ============================================================
// TYPES
// ============================================================

export type EngagementStatus = 'active' | 'dispute' | 'paused' | 'cancelled' | 'completed';
export type EngagementType = 'hourly' | 'fixed-price';
export type EngagementCategory = 'engineering' | 'design' | 'data' | 'ml' | 'other';
export type EngagementFilterKey = 'all' | 'active' | 'dispute' | 'paused' | 'fixed' | 'hourly';
export type EngagementOwnerVariant = 'dk' | 'mv' | 'lc' | 'sr';

export interface EngagementParty {
  id: string;
  name: string;
  realLegalEntity?: string;
  avatarInitials: string;
  avatarGradient: string;
  flag: string;
  location: string;
  metaTrail: string;
}

export interface EngagementOwner {
  name: string;
  initials: string;
  variant: EngagementOwnerVariant;
}

export interface EngagementHeroStat {
  label: string;
  value: string;
  vSuffix?: string;
  valuePill?: { variant: EngagementStatus; text: string };
  valueColor?: 'success';
  meta: string;
}

export interface EngagementHeroBanner {
  variant: 'amber' | 'danger';
  title: string;
  meta: string;
}

export interface EngagementListRow {
  id: string;
  atlasId: string;
  status: EngagementStatus;
  type: EngagementType;
  category: EngagementCategory;
  client: { displayName: string; realLegalEntity?: string; flag: string };
  candidate: { name: string; flag: string };
  pairSecondaryNote?: string;
  pairSecondaryReal?: boolean;
  role: string;
  roleSub: string;
  startedDate: string;
  startedRelative: string;
  rateValue: string;
  rateSuffix: string;
  hoursLabel: string;
  paidValue: string;
  paidSuccess?: boolean;
  paidSub: string;
  owner: EngagementOwner;
}

export interface EngagementQuickFact {
  dt: string;
  dd: string;
  ddColor?: 'success';
}

export interface EngagementTocMeta {
  contract: string;
  tracker: string;
  payments: string;
  comm: string;
  disputes: string;
  parties: string;
}

export interface EngagementTocOk {
  contract: boolean;
  tracker: boolean;
  payments: boolean;
  comm: boolean;
  disputes: boolean;
  parties: boolean;
}

// ===== Phase 10b — Section data shapes =====

// Sub 1 — Contract terms
export interface EngagementContractTerm { dt: string; dd: string; strongText?: string }
export interface EngagementSignature { label: string; name: string; meta: string }
export interface EngagementAmendment { num: string; text: string; date: string }
export interface EngagementContract {
  title: string;            // "Hourly engagement agreement" / "Fixed-price engagement agreement"
  contractId: string;       // duplicates atlasId
  terms: EngagementContractTerm[];
  signatures: [EngagementSignature, EngagementSignature];
  amendments: EngagementAmendment[];
}

// Sub 2 — Time tracker
export type TrackerDayState = 'logged' | 'locked' | 'weekend' | 'empty';
export interface TrackerDay {
  label: string;            // "Mon · 4/27"
  hours: string;            // "5h 12m" or "—"
  shotCount?: number;
  shotCountLabel?: string;  // "weekend" override
  state: TrackerDayState;
}
export interface EngagementTrackerSummary {
  thisWeek: string;         // "24h"
  thisWeekMax: string;      // "/ 25 max"
  screenshots: number;
  adjustments: number;
}
export interface EngagementTracker {
  weekTitle: string;        // "Week of Apr 27 – May 3, 2026"
  summary: EngagementTrackerSummary;
  days: TrackerDay[];       // 7 entries
  noteText: string;         // 🔒 explanation
  fullHistoryLabel: string;
}

// Sub 3 — Payments
export type PayIconVariant = 'released' | 'pending' | 'held';
export type PayTagVariant = 'released' | 'pending' | 'held' | 'scheduled';
export interface PaymentRow {
  iconVariant: PayIconVariant;
  iconIsCheck: boolean;     // true = checkmark, false = clock SVG
  periodLabel: string;
  periodMeta: string;
  detailLine: string;
  detailMeta: string;
  amount: string;
  amountReleased: boolean;
  tagLabel: string;
  tagVariant: PayTagVariant;
}
export interface EngagementPayments {
  title: string;
  summaryPrefix: string;    // "Total released:"
  totalReleased: string;    // "$4,640"
  summarySuffix: string;    // "· service fee collected: $464 · pending this week: $580"
  rows: PaymentRow[];
}

// Sub 4 — Communication
export interface CommMessage {
  fromName: string;
  avatarInitials: string;
  avatarGradient: string;
  time: string;
  text: string;
}
export interface EngagementCommunication {
  title: string;
  metaLine: string;
  messages: CommMessage[];
  footerLabel: string;
  fullThreadLabel: string;
}

// Sub 5 — Active disputes
export type DisputeStatus = 'clean' | 'active' | 'historical';
export interface ActiveDispute {
  refId: string;       // "DSP-2026-0162"
  text: string;        // "Quality dispute · Stefan Müller flagged Week 9 deliverables"
  meta: string;        // "Filed 8h ago · DSP-2026-0162 · client requesting partial refund of $290 · Daniel investigating"
  time: string;        // "8h ago"
  variant: 'warn' | 'danger';
}
export interface EngagementDisputes {
  status: DisputeStatus;
  statusLine: string;        // section status pill text
  cleanTitle?: string;
  cleanMeta?: string;
  active?: ActiveDispute[];
}

// Sub 6 — Both parties
export interface EngagementPartiesParty {
  role: string;            // "Client" / "Candidate"
  shortId: string;         // "cl-002" / "cand-001"
  name: string;
  realLegalEntity?: string;
  avatarInitials: string;
  avatarGradient: string;
  meta: string;
  hrefPath: string;
}
export interface EngagementPartiesSection {
  client: EngagementPartiesParty;
  candidate: EngagementPartiesParty;
}

export interface EngagementProfile {
  id: string;
  atlasId: string;
  status: EngagementStatus;
  type: EngagementType;
  category: EngagementCategory;
  client: EngagementParty;
  candidate: EngagementParty;
  engagedDate: string;
  heroStats: EngagementHeroStat[];
  banner: EngagementHeroBanner | null;
  owner: EngagementOwner;
  quickFacts: EngagementQuickFact[];
  tocMetas: EngagementTocMeta;
  tocOkFlags: EngagementTocOk;
  contract: EngagementContract;
  tracker: EngagementTracker;
  payments: EngagementPayments;
  communication: EngagementCommunication;
  disputes: EngagementDisputes;
  parties: EngagementPartiesSection;
}

export interface EngagementsStatTile {
  label: string;
  value: string;
  vSuffix?: string;
  delta?: { variant: 'up' | 'down' | 'flat'; text: string };
  meta: string;
  metaVariant?: 'warn' | 'danger';
}

export interface EngagementsFilterChip {
  key: EngagementFilterKey;
  label: string;
  count: number;
}

export interface EngagementsPageData {
  pageMeta: string;
  stats: EngagementsStatTile[];
  filterChips: EngagementsFilterChip[];
  listRows: EngagementListRow[];
  totalCount: number;
  rosterLabelMeta: string;
  footerLabel: string;
  loadMoreLabel: string;
}

// ============================================================
// OWNER PRESETS (4 specialists own engagements)
// ============================================================

const OWNER_DK: EngagementOwner = { name: 'Daniel K.', initials: 'DK', variant: 'dk' };
const OWNER_MV: EngagementOwner = { name: 'Mateo V.', initials: 'MV', variant: 'mv' };
const OWNER_LC: EngagementOwner = { name: 'Lukas C.', initials: 'LC', variant: 'lc' };
const OWNER_SR: EngagementOwner = { name: 'Sarah R.', initials: 'SR', variant: 'sr' };

// ============================================================
// PHASE 10b — eng-001 SECTION DATA (verbatim from admin.html)
// ============================================================

const CONTRACT_001: EngagementContract = {
  title: 'Hourly engagement agreement',
  contractId: 'eng-001-7c4f8a',
  terms: [
    { dt: 'Engagement type',    dd: '· weekly auto-payment cycle',                                  strongText: 'Hourly' },
    { dt: 'Role title',         dd: '· Engineering category',                                       strongText: 'Senior Backend Engineer' },
    { dt: 'Hourly rate',        dd: '· USD · gross to candidate',                                   strongText: '$58.00 / hour' },
    { dt: 'Hours per week',     dd: 'max · 5 hrs/day Mon–Fri preferred',                            strongText: '25 hours' },
    { dt: 'Start date',         dd: '· 7 weeks 1 day running',                                      strongText: 'Mar 12, 2026' },
    { dt: 'End date',           dd: 'Open-ended · 30-day notice clause from either side' },
    { dt: 'Time tracker',       dd: 'Required · screenshots every ~10 min · 7-day adjustment window' },
    { dt: 'Payment cycle',      dd: 'Weekly · Mondays · auto-release after 7-day adjustment lock' },
    { dt: 'Atlas service fee',  dd: '10% on candidate side · 5% on client side · $5.80/h net deduction' },
    { dt: 'Payout method',      dd: 'Wise · NGN bank · candidate-elected · ~$1.10 per transfer' },
    { dt: 'Confidentiality',    dd: 'NDA in effect · 24 months post-engagement · Atlas standard template v3.2' },
    { dt: 'IP assignment',      dd: 'Client owns work product · candidate retains pre-existing IP' },
  ],
  signatures: [
    { label: 'CLIENT SIGNATURE',    name: 'Stefan Müller',      meta: 'Founder, Atelier Werkraum GmbH · signed Mar 11, 2026 18:42 CET · IP 87.122.41.18' },
    { label: 'CANDIDATE SIGNATURE', name: 'Adesuwa Babatunde',  meta: 'signed Mar 12, 2026 09:08 WAT · IP 102.89.41.8 · Lagos · biometric verified' },
  ],
  amendments: [
    { num: 'AM-01', text: 'Hours/week increased 20 → 25 · co-signed by both parties · effective Apr 8', date: 'Apr 7, 2026' },
  ],
};

const TRACKER_001: EngagementTracker = {
  weekTitle: 'Week of Apr 27 – May 3, 2026',
  summary: { thisWeek: '24h', thisWeekMax: '/ 25 max', screenshots: 142, adjustments: 2 },
  days: [
    { label: 'Mon · 4/27', hours: '5h 12m', shotCount: 31, state: 'locked' },
    { label: 'Tue · 4/28', hours: '5h 03m', shotCount: 30, state: 'locked' },
    { label: 'Wed · 4/29', hours: '4h 48m', shotCount: 29, state: 'locked' },
    { label: 'Thu · 4/30', hours: '4h 32m', shotCount: 27, state: 'logged' },
    { label: 'Fri · 5/1',  hours: '4h 24m', shotCount: 25, state: 'logged' },
    { label: 'Sat · 5/2',  hours: '—', shotCountLabel: 'weekend', state: 'weekend' },
    { label: 'Sun · 5/3',  hours: '—', shotCountLabel: 'weekend', state: 'weekend' },
  ],
  noteText: '🔒 Locked = past 7-day adjustment window · ✓ Open = adjustments still possible',
  fullHistoryLabel: 'Full tracker history (8 weeks) →',
};

const PAYMENTS_001: EngagementPayments = {
  title: 'Weekly cycle · auto-release on Mondays',
  summaryPrefix: 'Total released:',
  totalReleased: '$4,640',
  summarySuffix: ' · service fee collected: $464 · pending this week: $580',
  rows: [
    {
      iconVariant: 'pending', iconIsCheck: false,
      periodLabel: 'Week 9 (current)', periodMeta: 'Apr 27 – May 3 · pays Mon May 4',
      detailLine: '24h logged so far · 1 day still open', detailMeta: '$580.00 gross · $522.00 to candidate after $58 fee',
      amount: '$580', amountReleased: false, tagLabel: 'Scheduled', tagVariant: 'pending',
    },
    {
      iconVariant: 'released', iconIsCheck: true,
      periodLabel: 'Week 8', periodMeta: 'Apr 20 – Apr 26 · paid Mon Apr 27',
      detailLine: '25h logged · 142 screenshots · 0 adjustments', detailMeta: 'Wise transfer NGN · ref WTR-2026-04887',
      amount: '$580', amountReleased: true, tagLabel: 'Released', tagVariant: 'released',
    },
    {
      iconVariant: 'released', iconIsCheck: true,
      periodLabel: 'Week 7', periodMeta: 'Apr 13 – Apr 19 · paid Mon Apr 20',
      detailLine: '25h logged · 138 screenshots · 1 adjustment approved by client', detailMeta: 'Wise transfer NGN · ref WTR-2026-04781',
      amount: '$580', amountReleased: true, tagLabel: 'Released', tagVariant: 'released',
    },
    {
      iconVariant: 'released', iconIsCheck: true,
      periodLabel: 'Week 6', periodMeta: 'Apr 6 – Apr 12 · paid Mon Apr 13 · post-amendment',
      detailLine: '24h logged · pro-rata for hours bump (20→25 mid-week)', detailMeta: 'Wise transfer NGN · ref WTR-2026-04674',
      amount: '$580', amountReleased: true, tagLabel: 'Released', tagVariant: 'released',
    },
    {
      iconVariant: 'released', iconIsCheck: true,
      periodLabel: 'Weeks 1–5', periodMeta: 'Mar 12 – Apr 5 · 5 cycles at 20h/wk pre-amendment',
      detailLine: '100h total · all on time · all auto-released', detailMeta: 'Wise transfers NGN · refs WTR-2026-04102 through 04559',
      amount: '$2,320', amountReleased: true, tagLabel: '5 × $464', tagVariant: 'released',
    },
  ],
};

const DISPUTES_001: EngagementDisputes = {
  status: 'clean',
  statusLine: 'No active disputes · clean history',
  cleanTitle: 'No active disputes on this engagement',
  cleanMeta: '8 weeks running · 0 escalations · communication thread shows healthy back-and-forth · payment cycles all auto-released without contest. Healthy engagement.',
};

const PARTIES_001: EngagementPartiesSection = {
  client: {
    role: 'Client',
    shortId: 'cl-002',
    name: 'Studio Berlin',
    realLegalEntity: 'ATELIER WERKRAUM',
    avatarInitials: 'SB',
    avatarGradient: 'linear-gradient(135deg, #C9C2A4, #7A745A)',
    meta: 'Berlin DE · Industrial design studio · 3 active hires · KYB verified · Trusted tier',
    hrefPath: '/admin/users/clients/cl-002-7e1b3f',
  },
  candidate: {
    role: 'Candidate',
    shortId: 'cand-001',
    name: 'Adesuwa Babatunde',
    avatarInitials: 'AB',
    avatarGradient: 'linear-gradient(135deg, #D9A77F, #8B5A3C)',
    meta: 'Lagos NG · Senior Backend Engineer · 6 lifetime hires · Founding cohort',
    hrefPath: '/admin/users/candidates/cand-001',
  },
};

const COMM_001: EngagementCommunication = {
  title: 'Recent thread (last 5 of 142)',
  metaLine: 'All messages auto-archived · accessible by admin only · cand + client cannot see admin viewing',
  messages: [
    {
      fromName: 'Stefan Müller (Studio Berlin)', avatarInitials: 'SM',
      avatarGradient: 'linear-gradient(135deg, #C9C2A4, #7A745A)',
      time: '2h ago · today 1:42 PM CET',
      text: 'Adesuwa, the auth refactor PR is in great shape — merging now. For next week, can you also pick up the rate-limiter? I’ll add the spec to Linear tonight.',
    },
    {
      fromName: 'Adesuwa Babatunde', avatarInitials: 'AB',
      avatarGradient: 'linear-gradient(135deg, #D9A77F, #8B5A3C)',
      time: '3h ago · today 12:38 PM CET',
      text: 'Rate-limiter sounds good — happy to take it. I’ll review the auth refactor diff one more time before pushing latest.',
    },
    {
      fromName: 'Stefan Müller (Studio Berlin)', avatarInitials: 'SM',
      avatarGradient: 'linear-gradient(135deg, #C9C2A4, #7A745A)',
      time: 'yesterday · 5:18 PM CET',
      text: 'Fast turnaround on the database migrations — well done. Adjustment for Tuesday: 5h 12m → 5h 03m approved.',
    },
    {
      fromName: 'Adesuwa Babatunde', avatarInitials: 'AB',
      avatarGradient: 'linear-gradient(135deg, #D9A77F, #8B5A3C)',
      time: 'yesterday · 4:42 PM CET',
      text: 'Submitted Tuesday’s hours · had to log 9 minutes for a context-switch I didn’t end up using. Adjustment requested.',
    },
    {
      fromName: 'Stefan Müller (Studio Berlin)', avatarInitials: 'SM',
      avatarGradient: 'linear-gradient(135deg, #C9C2A4, #7A745A)',
      time: 'Apr 28 · 10:08 AM CET',
      text: 'Welcome to week 7 — pushing the rate-limiter spec by Friday so you can pick it up next week.',
    },
  ],
  footerLabel: 'Showing 5 of 142 messages · all archived for 7 years per Atlas policy',
  fullThreadLabel: 'Open full thread →',
};

// ============================================================
// PHASE 10b — STUB SECTION BUILDER (eng-002..008)
// Generates minimal valid section data so detail pages render
// without undefined access. Not visually polished like eng-001
// but typed and structurally correct.
// ============================================================

interface StubParty { name: string; initials: string; gradient: string }
interface StubOpts {
  type: EngagementType;
  role: string;
  rate: string;
  hoursWeek: string;
  startedDate: string;
  running: string;
  totalReleased: string;
  summary: string;          // post-summary suffix (after totalReleased)
  weeklyHours: string;
  weeklyMax: string;
  amount: string;           // single representative amount used in stub payment rows
  commCount: number;
  amendments?: EngagementAmendment[];
  banner?: EngagementHeroBanner | null;
  // Phase 10c additions
  clientShortId?: string;
  clientHrefPath?: string;
  clientRealEntity?: string;
  clientFlag?: string;
  clientLocation?: string;   // "Berlin DE"
  candidateShortId?: string;
  candidateHrefPath?: string;
  candidateFlag?: string;
  candidateLocation?: string;
  disputeStatus?: DisputeStatus;
  disputeStatusLine?: string;
  activeDispute?: ActiveDispute;
}

function stubSections(
  client: StubParty,
  candidate: StubParty,
  opts: StubOpts
): {
  contract: EngagementContract;
  tracker: EngagementTracker;
  payments: EngagementPayments;
  communication: EngagementCommunication;
  disputes: EngagementDisputes;
  parties: EngagementPartiesSection;
} {
  const isHourly = opts.type === 'hourly';

  const days: TrackerDay[] = isHourly
    ? [
        { label: 'Mon · 4/27', hours: '5h 30m', shotCount: 32, state: 'logged' },
        { label: 'Tue · 4/28', hours: '5h 45m', shotCount: 34, state: 'logged' },
        { label: 'Wed · 4/29', hours: '5h 12m', shotCount: 30, state: 'logged' },
        { label: 'Thu · 4/30', hours: '4h 48m', shotCount: 28, state: 'logged' },
        { label: 'Fri · 5/1',  hours: '4h 24m', shotCount: 24, state: 'logged' },
        { label: 'Sat · 5/2', hours: '—', shotCountLabel: 'weekend', state: 'weekend' },
        { label: 'Sun · 5/3', hours: '—', shotCountLabel: 'weekend', state: 'weekend' },
      ]
    : [
        { label: 'Mon · 4/27', hours: '—', shotCountLabel: 'fixed-price', state: 'empty' },
        { label: 'Tue · 4/28', hours: '—', shotCountLabel: 'fixed-price', state: 'empty' },
        { label: 'Wed · 4/29', hours: '—', shotCountLabel: 'fixed-price', state: 'empty' },
        { label: 'Thu · 4/30', hours: '—', shotCountLabel: 'fixed-price', state: 'empty' },
        { label: 'Fri · 5/1',  hours: '—', shotCountLabel: 'fixed-price', state: 'empty' },
        { label: 'Sat · 5/2',  hours: '—', shotCountLabel: 'weekend', state: 'weekend' },
        { label: 'Sun · 5/3',  hours: '—', shotCountLabel: 'weekend', state: 'weekend' },
      ];

  const paymentRows: PaymentRow[] = isHourly
    ? [
        {
          iconVariant: 'pending', iconIsCheck: false,
          periodLabel: 'Current cycle', periodMeta: 'Apr 27 – May 3 · pays Mon May 4',
          detailLine: 'In progress · auto-release on Monday',
          detailMeta: 'Wise transfer · scheduled',
          amount: opts.amount, amountReleased: false, tagLabel: 'Scheduled', tagVariant: 'pending',
        },
        {
          iconVariant: 'released', iconIsCheck: true,
          periodLabel: 'Previous cycle', periodMeta: 'Apr 20 – Apr 26 · paid Mon Apr 27',
          detailLine: 'Full hours logged · 0 adjustments',
          detailMeta: 'Wise transfer · settled',
          amount: opts.amount, amountReleased: true, tagLabel: 'Released', tagVariant: 'released',
        },
      ]
    : [
        {
          iconVariant: 'released', iconIsCheck: true,
          periodLabel: 'Milestone 1', periodMeta: 'paid · 50% advance on signing',
          detailLine: 'Auto-released on contract signing',
          detailMeta: 'Wise transfer · settled',
          amount: opts.amount, amountReleased: true, tagLabel: 'Released', tagVariant: 'released',
        },
        {
          iconVariant: 'pending', iconIsCheck: false,
          periodLabel: 'Milestone 2', periodMeta: 'pending · escrow funded',
          detailLine: 'Awaiting milestone delivery',
          detailMeta: 'Will release on candidate submission + 7-day acceptance window',
          amount: opts.amount, amountReleased: false, tagLabel: 'Pending', tagVariant: 'pending',
        },
      ];

  return {
    contract: {
      title: isHourly ? 'Hourly engagement agreement' : 'Fixed-price engagement agreement',
      contractId: 'stub-' + client.name.slice(0, 6).toLowerCase().replace(/\s/g, ''),
      terms: [
        { dt: 'Engagement type', dd: isHourly ? '· weekly auto-payment cycle' : '· milestone-based escrow', strongText: isHourly ? 'Hourly' : 'Fixed-price' },
        { dt: 'Role title', dd: '· Atlas-vetted category', strongText: opts.role },
        { dt: 'Rate', dd: '· USD · gross to candidate', strongText: opts.rate },
        { dt: isHourly ? 'Hours per week' : 'Total contract', dd: isHourly ? 'max · Mon–Fri preferred' : '· paid on milestone completion', strongText: opts.hoursWeek },
        { dt: 'Start date', dd: '· ' + opts.running + ' running', strongText: opts.startedDate },
        { dt: 'End date', dd: 'Open-ended · 30-day notice clause from either side' },
        { dt: 'Payment cycle', dd: isHourly ? 'Weekly · Mondays · auto-release after 7-day adjustment lock' : 'Milestone-based · 7-day acceptance window per milestone' },
        { dt: 'Atlas service fee', dd: '10% candidate · 5% client · net deducted at payout' },
        { dt: 'Confidentiality', dd: 'NDA in effect · Atlas standard template v3.2' },
        { dt: 'IP assignment', dd: 'Client owns work product · candidate retains pre-existing IP' },
      ],
      signatures: [
        { label: 'CLIENT SIGNATURE', name: client.name, meta: 'signed ' + opts.startedDate + ' · biometric verified' },
        { label: 'CANDIDATE SIGNATURE', name: candidate.name, meta: 'signed ' + opts.startedDate + ' · biometric verified' },
      ],
      amendments: opts.amendments ?? [],
    },
    tracker: {
      weekTitle: 'Week of Apr 27 – May 3, 2026',
      summary: { thisWeek: opts.weeklyHours, thisWeekMax: opts.weeklyMax, screenshots: isHourly ? 148 : 0, adjustments: 0 },
      days,
      noteText: '🔒 Locked = past 7-day adjustment window · ✓ Open = adjustments still possible',
      fullHistoryLabel: 'Full tracker history →',
    },
    payments: {
      title: isHourly ? 'Weekly cycle · auto-release on Mondays' : 'Milestone-based · escrow funded',
      summaryPrefix: 'Total released:',
      totalReleased: opts.totalReleased,
      summarySuffix: ' · ' + opts.summary,
      rows: paymentRows,
    },
    communication: {
      title: 'Recent thread (last 2 of ' + opts.commCount + ')',
      metaLine: 'All messages auto-archived · accessible by admin only · parties cannot see admin viewing',
      messages: [
        { fromName: client.name, avatarInitials: client.initials, avatarGradient: client.gradient,
          time: 'yesterday · 4:18 PM CET',
          text: 'Checking in on this week’s progress — let me know if anything is blocking.' },
        { fromName: candidate.name, avatarInitials: candidate.initials, avatarGradient: candidate.gradient,
          time: 'yesterday · 3:42 PM CET',
          text: 'All on track. Pushing the latest batch tonight — will share the PR link.' },
      ],
      footerLabel: 'Showing 2 of ' + opts.commCount + ' messages · all archived for 7 years per Atlas policy',
      fullThreadLabel: 'Open full thread →',
    },
    disputes: opts.disputeStatus === 'active' && opts.activeDispute
      ? {
          status: 'active',
          statusLine: opts.disputeStatusLine ?? '1 active dispute · escalated',
          active: [opts.activeDispute],
        }
      : {
          status: 'clean',
          statusLine: opts.disputeStatusLine ?? 'No active disputes · clean history',
          cleanTitle: 'No active disputes on this engagement',
          cleanMeta: `${opts.running} running · 0 escalations · healthy back-and-forth · payment cycles releasing on schedule.`,
        },
    parties: {
      client: {
        role: 'Client',
        shortId: opts.clientShortId ?? 'cl-stub',
        name: client.name,
        ...(opts.clientRealEntity ? { realLegalEntity: opts.clientRealEntity } : {}),
        avatarInitials: client.initials,
        avatarGradient: client.gradient,
        meta: `${opts.clientLocation ?? '—'} · KYB verified`,
        hrefPath: opts.clientHrefPath ?? '/admin/users/clients',
      },
      candidate: {
        role: 'Candidate',
        shortId: opts.candidateShortId ?? 'cand-stub',
        name: candidate.name,
        avatarInitials: candidate.initials,
        avatarGradient: candidate.gradient,
        meta: `${opts.candidateLocation ?? '—'} · ${opts.role}`,
        hrefPath: opts.candidateHrefPath ?? '/admin/users/candidates',
      },
    },
  };
}

// ============================================================
// 8 ENGAGEMENT PROFILES
// ============================================================

const ENG_001: EngagementProfile = {
  id: 'eng-001',
  atlasId: 'eng-001-7c4f8a',
  status: 'active',
  type: 'hourly',
  category: 'engineering',
  client: {
    id: 'cl-002',
    name: 'Studio Berlin',
    realLegalEntity: 'ATELIER WERKRAUM GMBH',
    avatarInitials: 'SB',
    avatarGradient: 'linear-gradient(135deg, #C9C2A4, #7A745A)',
    flag: '🇩🇪',
    location: 'Berlin, DE',
    metaTrail: 'cl-002 · 3 active hires · KYB verified',
  },
  candidate: {
    id: 'cand-001',
    name: 'Adesuwa Babatunde',
    avatarInitials: 'AB',
    avatarGradient: 'linear-gradient(135deg, #D9A77F, #8B5A3C)',
    flag: '🇳🇬',
    location: 'Lagos, NG',
    metaTrail: 'cand-001 · Founding cohort · 6 lifetime hires',
  },
  engagedDate: 'Mar 12, 2026',
  heroStats: [
    { label: 'Status', value: '', valuePill: { variant: 'active', text: 'Active' }, meta: '7w 1d running' },
    { label: 'Rate', value: '$58', vSuffix: '/h', meta: '25 hours/week' },
    { label: 'Paid to date', value: '$4,640', valueColor: 'success', meta: '8 weekly cycles' },
    { label: 'Next payment', value: 'Mon May 4', meta: '$580 · auto-release' },
    { label: 'Owner', value: 'Daniel K.', meta: 'Engineering specialist' },
  ],
  banner: null,
  owner: OWNER_DK,
  quickFacts: [
    { dt: 'Engagement ID', dd: 'eng-001-7c4f8a' },
    { dt: 'Type', dd: 'Hourly · weekly cycle' },
    { dt: 'Started', dd: 'Mar 12, 2026' },
    { dt: 'Running', dd: '7 weeks 1 day' },
    { dt: 'Rate', dd: '$58.00/hr · 25h/wk' },
    { dt: 'Total billed', dd: '$4,640.00 · 8 cycles' },
    { dt: 'Atlas fees', dd: '$696 ($464 cand · $232 cli)' },
    { dt: 'Owning Specialist', dd: 'Daniel Kovács (spec-001)' },
    { dt: 'Last activity', dd: '2h ago · message', ddColor: 'success' },
  ],
  tocMetas: { contract: 'signed', tracker: '24h/25', payments: '$4,640', comm: '142', disputes: 'none', parties: '2' },
  tocOkFlags: { contract: true, tracker: false, payments: true, comm: false, disputes: true, parties: false },
  contract: CONTRACT_001,
  tracker: TRACKER_001,
  payments: PAYMENTS_001,
  communication: COMM_001,
  disputes: DISPUTES_001,
  parties: PARTIES_001,
};

const ENG_002: EngagementProfile = {
  id: 'eng-002',
  atlasId: 'eng-002-b3e9d1',
  status: 'active',
  type: 'hourly',
  category: 'engineering',
  client: {
    id: 'cl-northwind',
    name: 'Northwind Robotics',
    avatarInitials: 'NR',
    avatarGradient: 'linear-gradient(135deg, #A4B5D8, #4D6699)',
    flag: '🇸🇪',
    location: 'Stockholm, SE',
    metaTrail: 'cl-northwind · top-tier client · 18 hires',
  },
  candidate: {
    id: 'cand-lukas',
    name: 'Lukas Heinrich',
    avatarInitials: 'LH',
    avatarGradient: 'linear-gradient(135deg, #B89BD6, #6E3FE0)',
    flag: '🇩🇪',
    location: 'Munich, DE',
    metaTrail: 'cand-lukas · 4 lifetime hires',
  },
  engagedDate: 'Feb 1, 2026',
  heroStats: [
    { label: 'Status', value: '', valuePill: { variant: 'active', text: 'Active' }, meta: '13w running' },
    { label: 'Rate', value: '$72', vSuffix: '/h', meta: '30 hours/week' },
    { label: 'Paid to date', value: '$11,520', valueColor: 'success', meta: '13 weekly cycles' },
    { label: 'Next payment', value: 'Mon May 4', meta: '$2,160 · auto-release' },
    { label: 'Owner', value: 'Daniel K.', meta: 'Engineering specialist' },
  ],
  banner: null,
  owner: OWNER_DK,
  quickFacts: [
    { dt: 'Engagement ID', dd: 'eng-002-b3e9d1' },
    { dt: 'Type', dd: 'Hourly · weekly cycle' },
    { dt: 'Started', dd: 'Feb 1, 2026' },
    { dt: 'Running', dd: '13 weeks' },
    { dt: 'Rate', dd: '$72.00/hr · 30h/wk' },
    { dt: 'Total billed', dd: '$11,520.00 · 13 cycles' },
    { dt: 'Atlas fees', dd: '$1,728 ($1,152 cand · $576 cli)' },
    { dt: 'Owning Specialist', dd: 'Daniel Kovács (spec-001)' },
    { dt: 'Last activity', dd: '4h ago · time logged', ddColor: 'success' },
  ],
  tocMetas: { contract: 'signed', tracker: '28h/30', payments: '$11,520', comm: '218', disputes: 'none', parties: '2' },
  tocOkFlags: { contract: true, tracker: false, payments: true, comm: false, disputes: true, parties: false },
  ...stubSections(/*client*/{ name: 'Northwind Robotics', initials: 'NR', gradient: 'linear-gradient(135deg, #A4B5D8, #4D6699)' },
                   /*candidate*/{ name: 'Lukas Heinrich', initials: 'LH', gradient: 'linear-gradient(135deg, #B89BD6, #6E3FE0)' },
                   { type: 'hourly', role: 'Embedded Engineer', rate: '$72.00 / hour', hoursWeek: '30 hours',
                     startedDate: 'Feb 1, 2026', running: '13 weeks',
                     totalReleased: '$11,520', summary: '13 cycles released · service fee $1,152',
                     weeklyHours: '28h', weeklyMax: '/ 30 max',
                     amount: '$1,440', commCount: 218 }),
};

const ENG_003: EngagementProfile = {
  id: 'eng-003',
  atlasId: 'eng-003-9d2f6c',
  status: 'active',
  type: 'hourly',
  category: 'engineering',
  client: {
    id: 'cl-patagonia',
    name: 'Patagonia Mining Co.',
    avatarInitials: 'PM',
    avatarGradient: 'linear-gradient(135deg, #C7CFA8, #6B8E23)',
    flag: '🇦🇷',
    location: 'Buenos Aires, AR',
    metaTrail: 'cl-patagonia · 12 hires · top client',
  },
  candidate: {
    id: 'cand-valentina',
    name: 'Valentina Kraft',
    avatarInitials: 'VK',
    avatarGradient: 'linear-gradient(135deg, #E8B4B8, #8B5A6F)',
    flag: '🇦🇷',
    location: 'Mendoza, AR',
    metaTrail: 'cand-valentina · 8 lifetime hires',
  },
  engagedDate: 'Jan 15, 2026',
  heroStats: [
    { label: 'Status', value: '', valuePill: { variant: 'active', text: 'Active' }, meta: '15w running' },
    { label: 'Rate', value: '$61', vSuffix: '/h', meta: '40 hours/week' },
    { label: 'Paid to date', value: '$24,400', valueColor: 'success', meta: '15 weekly cycles' },
    { label: 'Next payment', value: 'Mon May 4', meta: '$2,440 · auto-release' },
    { label: 'Owner', value: 'Mateo V.', meta: 'Manager of Specialists' },
  ],
  banner: null,
  owner: OWNER_MV,
  quickFacts: [
    { dt: 'Engagement ID', dd: 'eng-003-9d2f6c' },
    { dt: 'Type', dd: 'Hourly · weekly cycle' },
    { dt: 'Started', dd: 'Jan 15, 2026' },
    { dt: 'Running', dd: '15 weeks' },
    { dt: 'Rate', dd: '$61.00/hr · 40h/wk' },
    { dt: 'Total billed', dd: '$24,400.00 · 15 cycles' },
    { dt: 'Atlas fees', dd: '$3,660 ($2,440 cand · $1,220 cli)' },
    { dt: 'Owning Specialist', dd: 'Mateo Vargas (mgr-001)' },
    { dt: 'Last activity', dd: '6h ago · time logged', ddColor: 'success' },
  ],
  tocMetas: { contract: 'signed', tracker: '38h/40', payments: '$24,400', comm: '341', disputes: 'none', parties: '2' },
  tocOkFlags: { contract: true, tracker: false, payments: true, comm: false, disputes: true, parties: false },
  ...stubSections(
    { name: 'Patagonia Mining Co.', initials: 'PM', gradient: 'linear-gradient(135deg, #C7CFA8, #6B8E23)' },
    { name: 'Valentina Kraft', initials: 'VK', gradient: 'linear-gradient(135deg, #E8B4B8, #8B5A6F)' },
    { type: 'hourly', role: 'Senior Engineer', rate: '$61.00 / hour', hoursWeek: '40 hours',
      startedDate: 'Jan 15, 2026', running: '15 weeks',
      totalReleased: '$24,400', summary: '15 cycles released · service fee $2,440',
      weeklyHours: '38h', weeklyMax: '/ 40 max', amount: '$2,440', commCount: 341 }
  ),
};

const ENG_004: EngagementProfile = {
  id: 'eng-004',
  atlasId: 'eng-004-d8a2f7',
  status: 'dispute',
  type: 'fixed-price',
  category: 'engineering',
  client: {
    id: 'cl-002',
    name: 'Studio Berlin',
    realLegalEntity: 'ATELIER WERKRAUM GMBH',
    avatarInitials: 'SB',
    avatarGradient: 'linear-gradient(135deg, #C9C2A4, #7A745A)',
    flag: '🇩🇪',
    location: 'Berlin, DE',
    metaTrail: 'cl-002 · 3 active hires · KYB verified',
  },
  candidate: {
    id: 'cand-tomas',
    name: 'Tomás Oliveira',
    avatarInitials: 'TO',
    avatarGradient: 'linear-gradient(135deg, #DCA294, #8B4F47)',
    flag: '🇵🇹',
    location: 'Lisbon, PT',
    metaTrail: 'cand-tomas · 5 lifetime hires',
  },
  engagedDate: 'Apr 1, 2026',
  heroStats: [
    { label: 'Status', value: '', valuePill: { variant: 'dispute', text: 'In dispute' }, meta: '4w running · escalated' },
    { label: 'Contract value', value: '$8,500', meta: 'fixed-price · DevOps' },
    { label: 'Released', value: '$4,250', meta: '50% milestone' },
    { label: 'Escrow held', value: '$4,250', meta: 'pending mediation' },
    { label: 'Owner', value: 'Daniel K.', meta: 'Engineering specialist' },
  ],
  banner: {
    variant: 'danger',
    title: 'Active dispute — DSP-2026-0144',
    meta: 'Milestone 2 deliverable disputed by client · mediation scheduled for May 6, 2026',
  },
  owner: OWNER_DK,
  quickFacts: [
    { dt: 'Engagement ID', dd: 'eng-004-d8a2f7' },
    { dt: 'Type', dd: 'Fixed-price · 2 milestones' },
    { dt: 'Started', dd: 'Apr 1, 2026' },
    { dt: 'Running', dd: '4 weeks' },
    { dt: 'Contract', dd: '$8,500.00 total' },
    { dt: 'Released', dd: '$4,250.00 (50%)' },
    { dt: 'Atlas fees', dd: '$1,275 (held pending resolution)' },
    { dt: 'Owning Specialist', dd: 'Daniel Kovács (spec-001)' },
    { dt: 'Last activity', dd: '1d ago · dispute filed' },
  ],
  tocMetas: { contract: '1 amendment', tracker: 'n/a · fixed', payments: '$4,250 held', comm: '67', disputes: '1 active', parties: '2' },
  tocOkFlags: { contract: true, tracker: false, payments: false, comm: false, disputes: false, parties: false },
  ...stubSections(
    { name: 'Studio Berlin', initials: 'SB', gradient: 'linear-gradient(135deg, #C9C2A4, #7A745A)' },
    { name: 'Tomás Oliveira', initials: 'TO', gradient: 'linear-gradient(135deg, #DCA294, #8B4F47)' },
    { type: 'fixed-price', role: 'DevOps Engineer', rate: '$8,500 total · fixed', hoursWeek: '$8,500',
      startedDate: 'Apr 1, 2026', running: '4 weeks',
      totalReleased: '$4,250', summary: 'milestone 1 released · $4,250 escrow held pending dispute',
      weeklyHours: 'n/a', weeklyMax: 'fixed-price', amount: '$4,250', commCount: 67,
      amendments: [{ num: 'AM-01', text: 'Scope clarification on milestone 2 deliverable · disputed by client', date: 'Apr 22, 2026' }],
      clientShortId: 'cl-002', clientHrefPath: '/admin/users/clients/cl-002-7e1b3f', clientRealEntity: 'ATELIER WERKRAUM', clientLocation: 'Berlin DE',
      candidateShortId: 'cand-tomas', candidateHrefPath: '/admin/users/candidates/cand-tomas', candidateLocation: 'Lisbon PT',
      disputeStatus: 'active',
      disputeStatusLine: '1 active dispute · DSP-2026-0144 · escalated to admin',
      activeDispute: {
        refId: 'DSP-2026-0144',
        text: 'Milestone 2 deliverable disputed · client requesting partial refund',
        meta: 'Filed Apr 22, 2026 · DSP-2026-0144 · client requesting $4,250 refund · mediation scheduled May 6',
        time: '8d ago',
        variant: 'danger',
      },
    }
  ),
};

const ENG_005: EngagementProfile = {
  id: 'eng-005',
  atlasId: 'eng-005-a6b4e9',
  status: 'active',
  type: 'hourly',
  category: 'engineering',
  client: {
    id: 'cl-solarrio',
    name: 'Solar Rio Energia',
    avatarInitials: 'SR',
    avatarGradient: 'linear-gradient(135deg, #F0CC4F, #B8911E)',
    flag: '🇧🇷',
    location: 'Rio de Janeiro, BR',
    metaTrail: 'cl-solarrio · 8 hires',
  },
  candidate: {
    id: 'cand-ricardo',
    name: 'Ricardo Almeida',
    avatarInitials: 'RA',
    avatarGradient: 'linear-gradient(135deg, #9CC9C2, #4D8A82)',
    flag: '🇧🇷',
    location: 'São Paulo, BR',
    metaTrail: 'cand-ricardo · 3 lifetime hires',
  },
  engagedDate: 'Mar 20, 2026',
  heroStats: [
    { label: 'Status', value: '', valuePill: { variant: 'active', text: 'Active' }, meta: '6w running' },
    { label: 'Rate', value: '$48', vSuffix: '/h', meta: '20 hours/week' },
    { label: 'Paid to date', value: '$3,840', valueColor: 'success', meta: '6 weekly cycles' },
    { label: 'Next payment', value: 'Mon May 4', meta: '$960 · auto-release' },
    { label: 'Owner', value: 'Mateo V.', meta: 'Manager of Specialists' },
  ],
  banner: null,
  owner: OWNER_MV,
  quickFacts: [
    { dt: 'Engagement ID', dd: 'eng-005-a6b4e9' },
    { dt: 'Type', dd: 'Hourly · weekly cycle' },
    { dt: 'Started', dd: 'Mar 20, 2026' },
    { dt: 'Running', dd: '6 weeks' },
    { dt: 'Rate', dd: '$48.00/hr · 20h/wk' },
    { dt: 'Total billed', dd: '$3,840.00 · 6 cycles' },
    { dt: 'Atlas fees', dd: '$576 ($384 cand · $192 cli)' },
    { dt: 'Owning Specialist', dd: 'Mateo Vargas (mgr-001)' },
    { dt: 'Last activity', dd: '8h ago · time logged', ddColor: 'success' },
  ],
  tocMetas: { contract: 'signed', tracker: '19h/20', payments: '$3,840', comm: '88', disputes: 'none', parties: '2' },
  tocOkFlags: { contract: true, tracker: false, payments: true, comm: false, disputes: true, parties: false },
  ...stubSections(
    { name: 'Solar Rio Energia', initials: 'SR', gradient: 'linear-gradient(135deg, #F0CC4F, #B8911E)' },
    { name: 'Ricardo Almeida', initials: 'RA', gradient: 'linear-gradient(135deg, #9CC9C2, #4D8A82)' },
    { type: 'hourly', role: 'Frontend Engineer', rate: '$48.00 / hour', hoursWeek: '20 hours',
      startedDate: 'Mar 20, 2026', running: '6 weeks',
      totalReleased: '$3,840', summary: '6 cycles released · service fee $384',
      weeklyHours: '19h', weeklyMax: '/ 20 max', amount: '$960', commCount: 88 }
  ),
};

const ENG_006: EngagementProfile = {
  id: 'eng-006',
  atlasId: 'eng-006-e2c5f1',
  status: 'paused',
  type: 'hourly',
  category: 'data',
  client: {
    id: 'cl-helsinki',
    name: 'Helsinki Data Oy',
    avatarInitials: 'HD',
    avatarGradient: 'linear-gradient(135deg, #7BA8D9, #3F6CA1)',
    flag: '🇫🇮',
    location: 'Helsinki, FI',
    metaTrail: 'cl-helsinki · 2 hires',
  },
  candidate: {
    id: 'cand-anna',
    name: 'Anna Kallio',
    avatarInitials: 'AK',
    avatarGradient: 'linear-gradient(135deg, #B5C7A8, #5C7A4D)',
    flag: '🇫🇮',
    location: 'Helsinki, FI',
    metaTrail: 'cand-anna · 2 lifetime hires',
  },
  engagedDate: 'Apr 8, 2026',
  heroStats: [
    { label: 'Status', value: '', valuePill: { variant: 'paused', text: 'Paused' }, meta: 'paused 4d ago' },
    { label: 'Rate', value: '$65', vSuffix: '/h', meta: '15 hours/week' },
    { label: 'Paid to date', value: '$1,950', meta: '2 weekly cycles' },
    { label: 'Resume date', value: 'TBD', meta: 'awaiting client OK' },
    { label: 'Owner', value: 'Lukas C.', meta: 'Data & ML specialist' },
  ],
  banner: {
    variant: 'amber',
    title: 'Engagement paused — client request',
    meta: 'Paused Apr 27, 2026 by Helsinki Data Oy · awaiting Q2 budget approval · no SLA penalty applies',
  },
  owner: OWNER_LC,
  quickFacts: [
    { dt: 'Engagement ID', dd: 'eng-006-e2c5f1' },
    { dt: 'Type', dd: 'Hourly · weekly cycle' },
    { dt: 'Started', dd: 'Apr 8, 2026' },
    { dt: 'Paused', dd: 'Apr 27, 2026 (4d)' },
    { dt: 'Rate', dd: '$65.00/hr · 15h/wk' },
    { dt: 'Total billed', dd: '$1,950.00 · 2 cycles' },
    { dt: 'Atlas fees', dd: '$293 ($195 cand · $98 cli)' },
    { dt: 'Owning Specialist', dd: 'Lukas Carlsson (spec-007)' },
    { dt: 'Last activity', dd: '4d ago · pause initiated' },
  ],
  tocMetas: { contract: 'signed', tracker: 'paused', payments: '$1,950', comm: '34', disputes: 'none', parties: '2' },
  tocOkFlags: { contract: true, tracker: false, payments: true, comm: false, disputes: true, parties: false },
  ...stubSections(
    { name: 'Helsinki Data Oy', initials: 'HD', gradient: 'linear-gradient(135deg, #7BA8D9, #3F6CA1)' },
    { name: 'Anna Kallio', initials: 'AK', gradient: 'linear-gradient(135deg, #B5C7A8, #5C7A4D)' },
    { type: 'hourly', role: 'Data Engineer', rate: '$65.00 / hour', hoursWeek: '15 hours',
      startedDate: 'Apr 8, 2026', running: '3 weeks (paused 4d ago)',
      totalReleased: '$1,950', summary: '2 cycles released before pause · service fee $195',
      weeklyHours: 'paused', weeklyMax: 'awaiting client OK', amount: '$975', commCount: 34 }
  ),
};

const ENG_007: EngagementProfile = {
  id: 'eng-007',
  atlasId: 'eng-007-c8e1b4',
  status: 'active',
  type: 'hourly',
  category: 'engineering',
  client: {
    id: 'cl-andina',
    name: 'Andina Telecom S.A.',
    avatarInitials: 'AT',
    avatarGradient: 'linear-gradient(135deg, #DD9F70, #8B5C3C)',
    flag: '🇨🇴',
    location: 'Bogotá, CO',
    metaTrail: 'cl-andina · 6 hires',
  },
  candidate: {
    id: 'cand-felipe',
    name: 'Felipe Núñez',
    avatarInitials: 'FN',
    avatarGradient: 'linear-gradient(135deg, #C9B8A4, #7A6B57)',
    flag: '🇨🇱',
    location: 'Santiago, CL',
    metaTrail: 'cand-felipe · 4 lifetime hires',
  },
  engagedDate: 'Feb 18, 2026',
  heroStats: [
    { label: 'Status', value: '', valuePill: { variant: 'active', text: 'Active' }, meta: '11w running' },
    { label: 'Rate', value: '$42', vSuffix: '/h', meta: '35 hours/week' },
    { label: 'Paid to date', value: '$10,290', valueColor: 'success', meta: '11 weekly cycles' },
    { label: 'Next payment', value: 'Mon May 4', meta: '$1,470 · auto-release' },
    { label: 'Owner', value: 'Mateo V.', meta: 'Manager of Specialists' },
  ],
  banner: null,
  owner: OWNER_MV,
  quickFacts: [
    { dt: 'Engagement ID', dd: 'eng-007-c8e1b4' },
    { dt: 'Type', dd: 'Hourly · weekly cycle' },
    { dt: 'Started', dd: 'Feb 18, 2026' },
    { dt: 'Running', dd: '11 weeks' },
    { dt: 'Rate', dd: '$42.00/hr · 35h/wk' },
    { dt: 'Total billed', dd: '$10,290.00 · 11 cycles' },
    { dt: 'Atlas fees', dd: '$1,544 ($1,029 cand · $515 cli)' },
    { dt: 'Owning Specialist', dd: 'Mateo Vargas (mgr-001)' },
    { dt: 'Last activity', dd: '1d ago · time logged' },
  ],
  tocMetas: { contract: 'signed', tracker: '33h/35', payments: '$10,290', comm: '187', disputes: 'none', parties: '2' },
  tocOkFlags: { contract: true, tracker: false, payments: true, comm: false, disputes: true, parties: false },
  ...stubSections(
    { name: 'Andina Telecom S.A.', initials: 'AT', gradient: 'linear-gradient(135deg, #DD9F70, #8B5C3C)' },
    { name: 'Felipe Núñez', initials: 'FN', gradient: 'linear-gradient(135deg, #C9B8A4, #7A6B57)' },
    { type: 'hourly', role: 'Backend Engineer', rate: '$42.00 / hour', hoursWeek: '35 hours',
      startedDate: 'Feb 18, 2026', running: '11 weeks',
      totalReleased: '$10,290', summary: '11 cycles released · service fee $1,029',
      weeklyHours: '33h', weeklyMax: '/ 35 max', amount: '$1,470', commCount: 187 }
  ),
};

const ENG_008: EngagementProfile = {
  id: 'eng-008',
  atlasId: 'eng-008-f4d7a2',
  status: 'active',
  type: 'fixed-price',
  category: 'design',
  client: {
    id: 'cl-cinelux',
    name: 'Cinélux Studios',
    realLegalEntity: 'SAS LUMIÈRE',
    avatarInitials: 'CS',
    avatarGradient: 'linear-gradient(135deg, #C2A8E8, #8B5FB8)',
    flag: '🇫🇷',
    location: 'Paris, FR',
    metaTrail: 'cl-cinelux · 1 active hire',
  },
  candidate: {
    id: 'cand-marina',
    name: 'Marina Costa',
    avatarInitials: 'MC',
    avatarGradient: 'linear-gradient(135deg, #F0CC4F, #B8911E)',
    flag: '🇧🇷',
    location: 'São Paulo, BR',
    metaTrail: 'cand-marina · 2 lifetime hires',
  },
  engagedDate: 'Apr 22, 2026',
  heroStats: [
    { label: 'Status', value: '', valuePill: { variant: 'active', text: 'Active' }, meta: '9d running' },
    { label: 'Contract value', value: '$4,200', meta: 'fixed-price · motion design' },
    { label: 'Released', value: '$0', meta: 'awaiting M1' },
    { label: 'Escrow funded', value: '$4,200', valueColor: 'success', meta: 'fully escrowed' },
    { label: 'Owner', value: 'Sarah R.', meta: 'Design specialist' },
  ],
  banner: null,
  owner: OWNER_SR,
  quickFacts: [
    { dt: 'Engagement ID', dd: 'eng-008-f4d7a2' },
    { dt: 'Type', dd: 'Fixed-price · 3 milestones' },
    { dt: 'Started', dd: 'Apr 22, 2026' },
    { dt: 'Running', dd: '9 days' },
    { dt: 'Contract', dd: '$4,200.00 total' },
    { dt: 'Released', dd: '$0.00 (escrow funded)' },
    { dt: 'Atlas fees', dd: '$630 (held in escrow)' },
    { dt: 'Owning Specialist', dd: 'Sarah Reilly (spec-003)' },
    { dt: 'Last activity', dd: '2d ago · kickoff call', ddColor: 'success' },
  ],
  tocMetas: { contract: 'signed', tracker: 'n/a · fixed', payments: 'escrow funded', comm: '24', disputes: 'none', parties: '2' },
  tocOkFlags: { contract: true, tracker: false, payments: true, comm: false, disputes: true, parties: false },
  ...stubSections(
    { name: 'Cinélux Studios', initials: 'CS', gradient: 'linear-gradient(135deg, #C2A8E8, #8B5FB8)' },
    { name: 'Marina Costa', initials: 'MC', gradient: 'linear-gradient(135deg, #F0CC4F, #B8911E)' },
    { type: 'fixed-price', role: 'Motion Designer', rate: '$4,200 total · fixed', hoursWeek: '$4,200',
      startedDate: 'Apr 22, 2026', running: '9 days',
      totalReleased: '$0', summary: 'escrow funded · awaiting first milestone',
      weeklyHours: 'n/a', weeklyMax: 'fixed-price', amount: '$1,400', commCount: 24 }
  ),
};

export const ENGAGEMENT_PROFILES: Record<string, EngagementProfile> = {
  'eng-001': ENG_001,
  'eng-002': ENG_002,
  'eng-003': ENG_003,
  'eng-004': ENG_004,
  'eng-005': ENG_005,
  'eng-006': ENG_006,
  'eng-007': ENG_007,
  'eng-008': ENG_008,
};

// ============================================================
// LIST ROWS — admin.html lines 21458-21591 verbatim
// ============================================================

export const ENGAGEMENT_LIST_ROWS: EngagementListRow[] = [
  {
    id: 'eng-001', atlasId: 'eng-001-7c4f8a', status: 'active', type: 'hourly', category: 'engineering',
    client: { displayName: 'Studio Berlin', realLegalEntity: 'Atelier Werkraum GmbH', flag: '🇩🇪' },
    candidate: { name: 'Adesuwa Babatunde', flag: '🇳🇬' },
    pairSecondaryNote: 'Real: Atelier Werkraum GmbH · 🇩🇪 ↔ 🇳🇬',
    pairSecondaryReal: true,
    role: 'Senior Backend Engineer', roleSub: 'Engineering',
    startedDate: 'Mar 12, 2026', startedRelative: '7 weeks ago',
    rateValue: '$58', rateSuffix: 'per hour', hoursLabel: '25 h/wk',
    paidValue: '$4,640', paidSuccess: true, paidSub: 'across 8 weeks',
    owner: OWNER_DK,
  },
  {
    id: 'eng-002', atlasId: 'eng-002-b3e9d1', status: 'active', type: 'hourly', category: 'engineering',
    client: { displayName: 'Northwind Robotics', flag: '🇸🇪' },
    candidate: { name: 'Lukas Heinrich', flag: '🇩🇪' },
    pairSecondaryNote: '🇸🇪 ↔ 🇩🇪 · top-tier client',
    role: 'Embedded Engineer', roleSub: 'Engineering',
    startedDate: 'Feb 1, 2026', startedRelative: '13 weeks ago',
    rateValue: '$72', rateSuffix: 'per hour', hoursLabel: '30 h/wk',
    paidValue: '$11,520', paidSuccess: true, paidSub: 'across 13 weeks',
    owner: OWNER_DK,
  },
  {
    id: 'eng-003', atlasId: 'eng-003-9d2f6c', status: 'active', type: 'hourly', category: 'engineering',
    client: { displayName: 'Patagonia Mining Co.', flag: '🇦🇷' },
    candidate: { name: 'Valentina Kraft', flag: '🇦🇷' },
    pairSecondaryNote: '🇦🇷 · 12 hires · top client',
    role: 'Senior Engineer', roleSub: 'Engineering',
    startedDate: 'Jan 15, 2026', startedRelative: '15 weeks ago',
    rateValue: '$61', rateSuffix: 'per hour', hoursLabel: '40 h/wk',
    paidValue: '$24,400', paidSuccess: true, paidSub: 'across 15 weeks',
    owner: OWNER_MV,
  },
  {
    id: 'eng-004', atlasId: 'eng-004-d8a2f7', status: 'dispute', type: 'fixed-price', category: 'engineering',
    client: { displayName: 'Studio Berlin', realLegalEntity: 'Atelier Werkraum', flag: '🇩🇪' },
    candidate: { name: 'Tomás Oliveira', flag: '🇵🇹' },
    pairSecondaryNote: 'Real: Atelier Werkraum · DSP-2026-0144',
    pairSecondaryReal: true,
    role: 'DevOps Engineer', roleSub: 'Engineering · fixed-price',
    startedDate: 'Apr 1, 2026', startedRelative: '4 weeks ago',
    rateValue: '$8,500', rateSuffix: 'total · fixed', hoursLabel: '—',
    paidValue: '$4,250', paidSub: '50% milestone · escrow held',
    owner: OWNER_DK,
  },
  {
    id: 'eng-005', atlasId: 'eng-005-a6b4e9', status: 'active', type: 'hourly', category: 'engineering',
    client: { displayName: 'Solar Rio Energia', flag: '🇧🇷' },
    candidate: { name: 'Ricardo Almeida', flag: '🇧🇷' },
    pairSecondaryNote: '🇧🇷 ↔ 🇧🇷 · 8 hires',
    role: 'Frontend Engineer', roleSub: 'Engineering',
    startedDate: 'Mar 20, 2026', startedRelative: '6 weeks ago',
    rateValue: '$48', rateSuffix: 'per hour', hoursLabel: '20 h/wk',
    paidValue: '$3,840', paidSuccess: true, paidSub: 'across 6 weeks',
    owner: OWNER_MV,
  },
  {
    id: 'eng-006', atlasId: 'eng-006-e2c5f1', status: 'paused', type: 'hourly', category: 'data',
    client: { displayName: 'Helsinki Data Oy', flag: '🇫🇮' },
    candidate: { name: 'Anna Kallio', flag: '🇫🇮' },
    pairSecondaryNote: '🇫🇮 ↔ 🇫🇮 · paused 4d ago by client',
    role: 'Data Engineer', roleSub: 'Data & ML',
    startedDate: 'Apr 8, 2026', startedRelative: '3 weeks ago',
    rateValue: '$65', rateSuffix: 'per hour', hoursLabel: '15 h/wk',
    paidValue: '$1,950', paidSub: 'across 2 weeks',
    owner: OWNER_LC,
  },
  {
    id: 'eng-007', atlasId: 'eng-007-c8e1b4', status: 'active', type: 'hourly', category: 'engineering',
    client: { displayName: 'Andina Telecom S.A.', flag: '🇨🇴' },
    candidate: { name: 'Felipe Núñez', flag: '🇨🇱' },
    pairSecondaryNote: '🇨🇴 ↔ 🇨🇱 · 6 hires',
    role: 'Backend Engineer', roleSub: 'Engineering',
    startedDate: 'Feb 18, 2026', startedRelative: '11 weeks ago',
    rateValue: '$42', rateSuffix: 'per hour', hoursLabel: '35 h/wk',
    paidValue: '$10,290', paidSuccess: true, paidSub: 'across 11 weeks',
    owner: OWNER_MV,
  },
  {
    id: 'eng-008', atlasId: 'eng-008-f4d7a2', status: 'active', type: 'fixed-price', category: 'design',
    client: { displayName: 'Cinélux Studios', realLegalEntity: 'SAS Lumière', flag: '🇫🇷' },
    candidate: { name: 'Marina Costa', flag: '🇧🇷' },
    pairSecondaryNote: 'Real: SAS Lumière · 🇫🇷 ↔ 🇧🇷',
    pairSecondaryReal: true,
    role: 'Motion Designer', roleSub: 'Design · fixed-price',
    startedDate: 'Apr 22, 2026', startedRelative: '9 days ago',
    rateValue: '$4,200', rateSuffix: 'total · fixed', hoursLabel: '—',
    paidValue: '$0', paidSub: 'escrow funded · awaiting milestone',
    owner: OWNER_SR,
  },
];

// ============================================================
// PAGE DATA — admin.html lines 21378-21438
// ============================================================

export const ENGAGEMENTS_PAGE_DATA: EngagementsPageData = {
  pageMeta: '/admin/operations/active-engagements · 248 live contracts · $487K monthly GMV · all parties audited',
  stats: [
    { label: 'Active engagements', value: '248', vSuffix: 'live', meta: '↑12 vs last month' },
    { label: 'Active monthly GMV', value: '$487', vSuffix: 'K', delta: { variant: 'up', text: '↑8%' }, meta: 'vs last 30 days' },
    { label: 'In dispute', value: '12', vSuffix: 'contracts', meta: '4 escalated to admin', metaVariant: 'warn' },
    { label: 'Paused / on hold', value: '8', vSuffix: 'contracts', meta: 'avg 12-day pause' },
  ],
  filterChips: [
    { key: 'all', label: 'All', count: 8 },
    { key: 'active', label: 'Active', count: 5 },
    { key: 'dispute', label: 'In dispute', count: 1 },
    { key: 'paused', label: 'Paused', count: 1 },
    { key: 'fixed', label: 'Fixed-price', count: 2 },
    { key: 'hourly', label: 'Hourly', count: 6 },
  ],
  listRows: ENGAGEMENT_LIST_ROWS,
  totalCount: 248,
  rosterLabelMeta: 'Showing 8 of 248 · click any row for full detail',
  footerLabel: '8 of 248 engagements shown · canonical sample with realistic variety',
  loadMoreLabel: 'Load more (240 remaining) →',
};
