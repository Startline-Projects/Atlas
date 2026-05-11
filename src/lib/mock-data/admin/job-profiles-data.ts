/**
 * Phase 11a — Job Postings data
 *
 * 10 job-posting fixtures for the list view + detail pages.
 * job-001 (Studio Berlin · Senior Frontend Engineer) is CANONICAL per admin.html
 * lines 22376-22391 (list row) + 22581-23439 (detail). Other 9 jobs have verbatim
 * list-row data from admin.html lines 22394-22562; their detail-page data
 * (hero stats, banner, quickFacts, tocMetas) is role-coherent filler since
 * admin.html only renders job-001 in detail.
 *
 * Filled cross-link mapping (verbatim from admin.html):
 *   job-003 (Patagonia DevOps) → eng-003 · 9-day TTH (line 22427)
 *   job-008 (Cinélux Motion)   → eng-008 · 1-day TTH (line 22522)
 */

// ============================================================
// TYPES
// ============================================================

export type JobStatus = 'open' | 'paused' | 'filled' | 'closed' | 'investigate';

export type JobStatusPillVariant =
  | 'job-open'
  | 'job-shortlisted'
  | 'job-sourcing'
  | 'job-paused'
  | 'job-filled'
  | 'job-closed'
  | 'job-investigate';

export type JobCategory = 'engineering' | 'design' | 'data' | 'sales' | 'content' | 'other';
export type JobFilterKey = 'all' | 'open' | 'paused' | 'filled' | 'closed' | 'flagged';
export type JobOwnerVariant = 'dk' | 'mv' | 'lc' | 'sr' | 'im' | 'at';

export interface JobOwner {
  name: string;
  initials: string;
  variant: JobOwnerVariant;
}

export interface JobClient {
  id: string;
  name: string;
  realLegalEntity?: string;
  avatarInitials: string;
  avatarGradient: string;
  flag: string;
  location: string;
  metaTrail: string;
}

export interface JobHeroStat {
  label: string;
  value: string;
  vSuffix?: string;
  valueSize?: 'default' | 'sm';
  valueColor?: 'success';
  meta: string;
}

export interface JobHeroBanner {
  variant: 'amber' | 'danger' | 'success';
  title: string;
  meta: string;
}

export interface JobListRow {
  id: string;
  atlasId: string;
  status: JobStatus;
  statusPillVariant: JobStatusPillVariant;
  statusPillText: string;
  category: JobCategory;
  title: string;
  client: { name: string; realLegalEntity?: string; flagAndLocation?: string };
  jtClientIsReal: boolean;
  postedDate: string;
  postedRelative: string;
  categoryLabel: string;
  categorySub: string;
  interestNum: number;
  interestFillPct: number;
  interestSub: string;
  hiresLabel: string;
  hiresVariant: 'muted' | 'success';
  hiresSub: string;
  owner: JobOwner;
  rowVariant?: 'filled' | 'investigate';
}

export interface JobQuickFact {
  dt: string;
  dd: string;
  ddSubMono?: string;        // optional sub-line (super-purple mono) — used for Client REAL: chip
  ddColor?: 'success';
}

// ===== Phase 11b — Section data shapes =====

// Sub 1 — Description
export interface JobDescriptionBullet { text: string; bold?: boolean }
export interface JobDescriptionSection {
  heading: string;
  paragraphs?: string[];
  bullets?: JobDescriptionBullet[];
  bulletsChecks?: boolean;
}
export interface JobCompItem {
  label: string;
  value: string;
  vSuffix?: string;
  valueSize?: 'default' | 'sm';
  meta: string;
}
export interface JobDescription {
  statusText: string;       // verbatim section status pill text
  jdTitle: string;
  jdMeta: string;
  introSections: JobDescriptionSection[];
  compBlock: JobCompItem[];
  closingHeading?: string;
  closingParagraphs?: string[];
}

// Sub 2 — Match
export type MatchRankBadge = 'gold' | 'silver' | 'bronze' | 'default';
export type ScoreBarVariant = 'high' | 'mid' | 'low' | 'poor';
export interface MatchScoreBar { label: string; value: number; variant: ScoreBarVariant }
export interface MatchCandidate {
  rank: number;
  rankBadge: MatchRankBadge;
  candidateId: string;
  name: string;
  avatarInitials: string;
  avatarGradient: string;
  meta: string;
  scoreBars: MatchScoreBar[];
  total: number;
  totalIsHigh: boolean;
  actionLabel: string;
  actionIsCurated: boolean;
}
export interface JobMatchBreakdown {
  title: string;
  hasFoundingCohort: boolean;
  avgScore: string;
  progressLabel: string;
  candidates: MatchCandidate[];
}

// Sub 3 — Other interest
export type InterestStatus = 'reviewed' | 'pending' | 'shortlisted' | 'passed';
export interface InterestCandidate {
  candidateId: string;
  name: string;
  avatarInitials: string;
  avatarGradient: string;
  meta: string;
  score: number | null;
  status: InterestStatus;
}
export interface JobOtherInterest {
  title: string;
  totalCount: number;
  reviewedCount: number;
  pendingCount: number;
  candidates: InterestCandidate[];
  footerLabel: string;
  fullListLabel: string;
}

// Sub 4 — Intervention timeline
export type InterventionTagVariant = 'default' | 'signin' | 'override';
export type InterventionDataCat = 'signin' | 'override';
export interface InterventionEntry {
  time: string;
  verb: string;
  target: string;
  details: string;
  refId?: string;
  tagLabel: string;
  tagVariant: InterventionTagVariant;
  dataCat?: InterventionDataCat;
}
export interface InterventionDay {
  dateLabel: string;
  countLabel: string;
  entries: InterventionEntry[];
}
export interface JobInterventionHistory {
  statusText: string;       // verbatim section status pill text
  title: string;
  metaLine: string;
  days: InterventionDay[];
}

// Sub 5 — Outcome
export interface JobOutcomeBlock {
  label: string;
  value: string;
  valueColor?: 'super' | 'success';
  valueSizeSm?: boolean;
  meta: string;
  vSuffix?: string;
}
export interface JobOutcomeStop { label: string; done: boolean }
export interface JobOutcomeFilledLink {
  engagementId: string;
  label: string;          // "This job has been filled."
  detail: string;         // "View the resulting engagement (eng-008) · 1-day TTH"
}
export interface JobOutcome {
  statusText: string;       // verbatim section status pill text
  blocks: [JobOutcomeBlock, JobOutcomeBlock];
  progressPct: number;
  stops: JobOutcomeStop[];
  filledLink: JobOutcomeFilledLink | null;
  actionsTextPrefix: string;
  actionsTextEmphasis: string;
  actionsTextEmphasisColor: 'success' | 'amber' | 'danger';
  actionsTextSuffix: string;
  compareLabel: string;
}

export interface JobProfile {
  id: string;
  atlasId: string;
  status: JobStatus;
  category: JobCategory;
  statusPillVariant: JobStatusPillVariant;
  statusPillText: string;
  postedMeta: string;
  title: string;
  client: JobClient;
  heroStats: JobHeroStat[];
  banner: JobHeroBanner | null;
  owner: JobOwner;
  filledEngagementId?: string;
  filledTimeToHire?: string;
  quickFacts: JobQuickFact[];
  tocMetas: { desc: string; match: string; interest: string; intervention: string; outcome: string };
  tocOkFlags: { desc: boolean; match: boolean; interest: boolean; intervention: boolean; outcome: boolean };
  description: JobDescription;
  matchBreakdown: JobMatchBreakdown;
  otherInterest: JobOtherInterest;
  intervention: JobInterventionHistory;
  outcome: JobOutcome;
}

export interface JobsStatTile {
  label: string;
  value: string;
  vSuffix?: string;
  delta?: { variant: 'up' | 'down' | 'flat'; text: string };
  meta: string;
  metaVariant?: 'warn' | 'danger';
}

export interface JobsFilterChip {
  key: JobFilterKey;
  label: string;
  count: number;
}

export interface JobsPageData {
  pageMeta: string;
  stats: JobsStatTile[];
  filterChips: JobsFilterChip[];
  listRows: JobListRow[];
  totalCount: number;
  rosterLabelMeta: string;
  footerLabel: string;
  loadMoreLabel: string;
}

// ============================================================
// OWNER PRESETS
// ============================================================

const OWNER_DK: JobOwner = { name: 'Daniel K.', initials: 'DK', variant: 'dk' };
const OWNER_MV: JobOwner = { name: 'Mateo V.', initials: 'MV', variant: 'mv' };
const OWNER_LC: JobOwner = { name: 'Lukas C.', initials: 'LC', variant: 'lc' };
const OWNER_SR: JobOwner = { name: 'Sarah R.', initials: 'SR', variant: 'sr' };
const OWNER_IM: JobOwner = { name: 'Ines M.', initials: 'IM', variant: 'im' };
const OWNER_AT: JobOwner = { name: 'Aiyana T.', initials: 'AT', variant: 'at' };

// ============================================================
// CLIENT PRESETS (extracted from list-row data + Phase 10 ENGAGEMENT_PROFILES)
// ============================================================

const CLIENT_STUDIO_BERLIN: JobClient = {
  id: 'cl-002', name: 'Studio Berlin', realLegalEntity: 'ATELIER WERKRAUM GMBH',
  avatarInitials: 'SB', avatarGradient: 'linear-gradient(135deg, #C9C2A4, #7A745A)',
  flag: '🇩🇪', location: 'Berlin DE',
  metaTrail: 'cl-002 · 🇩🇪 Berlin DE · 3 active hires · Trusted tier',
};

const CLIENT_NORTHWIND: JobClient = {
  id: 'cl-northwind', name: 'Northwind Robotics',
  avatarInitials: 'NR', avatarGradient: 'linear-gradient(135deg, #A4B5D8, #4D6699)',
  flag: '🇸🇪', location: 'Stockholm SE',
  metaTrail: 'cl-northwind · 🇸🇪 Stockholm · top-tier client · 18 hires',
};

const CLIENT_PATAGONIA: JobClient = {
  id: 'cl-patagonia', name: 'Patagonia Mining Co.',
  avatarInitials: 'PM', avatarGradient: 'linear-gradient(135deg, #C7CFA8, #6B8E23)',
  flag: '🇦🇷', location: 'Buenos Aires AR',
  metaTrail: 'cl-patagonia · 🇦🇷 Buenos Aires · 12 hires · top client',
};

const CLIENT_SOLAR_RIO: JobClient = {
  id: 'cl-solarrio', name: 'Solar Rio Energia',
  avatarInitials: 'SR', avatarGradient: 'linear-gradient(135deg, #F0CC4F, #B8911E)',
  flag: '🇧🇷', location: 'Rio de Janeiro BR',
  metaTrail: 'cl-solarrio · 🇧🇷 Rio de Janeiro · 8 hires',
};

const CLIENT_HELSINKI: JobClient = {
  id: 'cl-helsinki', name: 'Helsinki Data Oy',
  avatarInitials: 'HD', avatarGradient: 'linear-gradient(135deg, #7BA8D9, #3F6CA1)',
  flag: '🇫🇮', location: 'Helsinki FI',
  metaTrail: 'cl-helsinki · 🇫🇮 Helsinki · 2 hires',
};

const CLIENT_ANDINA: JobClient = {
  id: 'cl-andina', name: 'Andina Telecom S.A.',
  avatarInitials: 'AT', avatarGradient: 'linear-gradient(135deg, #DD9F70, #8B5C3C)',
  flag: '🇨🇴', location: 'Bogotá CO',
  metaTrail: 'cl-andina · 🇨🇴 Bogotá · 6 hires',
};

const CLIENT_CINELUX: JobClient = {
  id: 'cl-cinelux', name: 'Cinélux Studios', realLegalEntity: 'SAS LUMIÈRE',
  avatarInitials: 'CS', avatarGradient: 'linear-gradient(135deg, #C2A8E8, #8B5FB8)',
  flag: '🇫🇷', location: 'Paris FR',
  metaTrail: 'cl-cinelux · 🇫🇷 Paris · 1 active hire',
};

const CLIENT_BERLIN_OSS: JobClient = {
  id: 'cl-berlin-oss', name: 'Berlin Open Source e.V.',
  avatarInitials: 'BO', avatarGradient: 'linear-gradient(135deg, #B89BD6, #6E3FE0)',
  flag: '🇩🇪', location: 'Berlin DE',
  metaTrail: 'cl-berlin-oss · 🇩🇪 Berlin · nonprofit rate',
};

const CLIENT_RELIANCE: JobClient = {
  id: 'cl-reliance', name: 'Reliance Digital Pvt',
  avatarInitials: 'RD', avatarGradient: 'linear-gradient(135deg, #DCA294, #8B4F47)',
  flag: '🇮🇳', location: 'Mumbai IN',
  metaTrail: 'cl-reliance · 🇮🇳 Mumbai · INV-2026-0033 · spec inflation suspected',
};

// ============================================================
// PHASE 11b — job-001 SECTION DATA (verbatim from admin.html)
// ============================================================

const DESC_001: JobDescription = {
  statusText: 'Posted Apr 26 · edited Apr 29 (rate range tightened)',  // admin.html line 22710 verbatim
  jdTitle: 'Full posting · client-facing copy',
  jdMeta: '412 words · 2-min read · auto-saved Apr 29 17:42 CET',
  introSections: [
    {
      heading: 'About the role',
      paragraphs: [
        'Studio Berlin is hiring a Senior Frontend Engineer to lead the rebuild of our client-facing portfolio platform — a Vue 3 / Nuxt 3 SPA with a custom design system, hand-built motion, and a small but opinionated codebase. You’ll work directly with our founder Stefan Müller and our backend engineer Adesuwa.',
        'This is a long-term, ongoing engagement (3-month minimum, open-ended after) at 25–30 hours/week. We’re flexible on timezone but expect ~4 hours of overlap with Berlin (CET) for sync work.',
      ],
    },
    {
      heading: "What you'll do",
      bullets: [
        { text: 'Lead the migration from Vue 2 / Nuxt 2 to Vue 3 / Nuxt 3 (in progress, ~30% complete)' },
        { text: 'Build and maintain a small but precise design system in Vue + Tailwind' },
        { text: 'Collaborate with Adesuwa on the BFF layer (Hono / Drizzle on Cloudflare Workers)' },
        { text: 'Own performance: target Lighthouse ≥95, LCP <1.5s on 4G, zero CLS regressions' },
        { text: 'Ship motion and interaction polish — subtle but considered (think Linear, not stripe.com)' },
      ],
    },
    {
      heading: "What we're looking for",
      bulletsChecks: true,
      bullets: [
        { text: '5+ years of professional frontend experience, with at least 2 years on Vue 3 or Nuxt 3' },
        { text: 'Strong sensibility for editorial / brand-led design — you can take an unfinished comp and finish it' },
        { text: 'Comfort with TypeScript, Tailwind, and modern build tooling (Vite)' },
        { text: 'Experience with motion libraries (GSAP, Motion One, or hand-crafted)' },
        { text: 'Async-friendly · clear writing · self-directed' },
      ],
    },
    {
      heading: 'Nice to have',
      bullets: [
        { text: 'Background in agency or studio work (vs. pure product)' },
        { text: 'Experience with Cloudflare Workers / edge compute' },
        { text: "A portfolio with at least one project you're genuinely proud of (we'll ask)" },
      ],
    },
  ],
  compBlock: [
    { label: 'Hourly rate', value: '$55–65', vSuffix: '/h', meta: 'based on experience · weekly cycle' },
    { label: 'Hours', value: '25–30', vSuffix: '/wk', meta: '~4h CET overlap required' },
    { label: 'Commitment', value: '3-month min', valueSize: 'sm', meta: 'open-ended after · 30-day notice' },
  ],
  closingHeading: 'About Studio Berlin',
  closingParagraphs: [
    'We’re a 4-person industrial design and brand studio in Berlin (real legal name: Atelier Werkraum GmbH — Studio Berlin is our trading name). We work with consumer hardware companies, exhibition designers, and a small handful of long-term retainer clients. Our existing engineering team is one full-time backend (Adesuwa, also through Atlas) and Stefan dabbles in code. Quiet, considered, no rush culture.',
  ],
};

const MATCH_001: JobMatchBreakdown = {
  title: "Curated shortlist · Daniel's picks",
  hasFoundingCohort: true,
  avgScore: '87.4 / 100',
  progressLabel: 'all 5 reviewed by client May 2 (target)',
  candidates: [
    {
      rank: 1, rankBadge: 'gold',
      candidateId: 'cand-014', name: 'Linnea Holmberg',
      avatarInitials: 'LH', avatarGradient: 'linear-gradient(135deg, #DCA294, #8B4F47)',
      meta: 'cand-014 · 🇸🇪 Stockholm · 7y exp · Vue 3 specialist',
      scoreBars: [
        { label: 'Skills', value: 96, variant: 'high' },
        { label: 'Experience', value: 94, variant: 'high' },
        { label: 'Timezone', value: 100, variant: 'high' },
        { label: 'Rate fit', value: 88, variant: 'mid' },
      ],
      total: 94, totalIsHigh: true,
      actionLabel: '★ Top pick', actionIsCurated: true,
    },
    {
      rank: 2, rankBadge: 'silver',
      candidateId: 'cand-022', name: 'Tomás Reyes',
      avatarInitials: 'TR', avatarGradient: 'linear-gradient(135deg, #C7CFA8, #6B8E23)',
      meta: 'cand-022 · 🇪🇸 Madrid · 6y exp · agency background',
      scoreBars: [
        { label: 'Skills', value: 88, variant: 'mid' },
        { label: 'Experience', value: 90, variant: 'high' },
        { label: 'Timezone', value: 100, variant: 'high' },
        { label: 'Rate fit', value: 85, variant: 'mid' },
      ],
      total: 90, totalIsHigh: true,
      actionLabel: '★ Editorial fit', actionIsCurated: true,
    },
    {
      rank: 3, rankBadge: 'bronze',
      candidateId: 'cand-031', name: 'Maya Iyer',
      avatarInitials: 'MI', avatarGradient: 'linear-gradient(135deg, #B89BD6, #6E3FE0)',
      meta: 'cand-031 · 🇮🇳 Bengaluru · 5y exp · motion-strong',
      scoreBars: [
        { label: 'Skills', value: 92, variant: 'high' },
        { label: 'Experience', value: 82, variant: 'mid' },
        { label: 'Timezone', value: 68, variant: 'low' },
        { label: 'Rate fit', value: 94, variant: 'high' },
      ],
      total: 87, totalIsHigh: false,
      actionLabel: 'View profile', actionIsCurated: false,
    },
    {
      rank: 4, rankBadge: 'default',
      candidateId: 'cand-008', name: 'Jakub Wiśniewski',
      avatarInitials: 'JW', avatarGradient: 'linear-gradient(135deg, #A4B5D8, #4D6699)',
      meta: 'cand-008 · 🇵🇱 Warsaw · 8y exp · Nuxt-deep',
      scoreBars: [
        { label: 'Skills', value: 94, variant: 'high' },
        { label: 'Experience', value: 96, variant: 'high' },
        { label: 'Timezone', value: 100, variant: 'high' },
        { label: 'Rate fit', value: 52, variant: 'poor' },
      ],
      total: 86, totalIsHigh: false,
      actionLabel: 'View profile', actionIsCurated: false,
    },
    {
      rank: 5, rankBadge: 'default',
      candidateId: 'cand-046', name: 'Hadeel Mansour',
      avatarInitials: 'HM', avatarGradient: 'linear-gradient(135deg, #E8B4B8, #8B5A6F)',
      meta: 'cand-046 · 🇯🇴 Amman · 5y exp · Founding cohort',
      scoreBars: [
        { label: 'Skills', value: 86, variant: 'mid' },
        { label: 'Experience', value: 76, variant: 'mid' },
        { label: 'Timezone', value: 95, variant: 'high' },
        { label: 'Rate fit', value: 90, variant: 'high' },
      ],
      total: 80, totalIsHigh: false,
      actionLabel: '★ Founding cohort', actionIsCurated: true,
    },
  ],
};

const INTEREST_001: JobOtherInterest = {
  title: 'Beyond the curated 5',
  totalCount: 19, reviewedCount: 12, pendingCount: 7,
  candidates: [
    { candidateId: 'i-ck', name: 'Camille Klein', avatarInitials: 'CK', avatarGradient: 'linear-gradient(135deg, #7BA8D9, #3F6CA1)', meta: '🇫🇷 Lyon · 4y · React-primary', score: 76, status: 'reviewed' },
    { candidateId: 'i-yo', name: 'Yuki Okamoto', avatarInitials: 'YO', avatarGradient: 'linear-gradient(135deg, #DD9F70, #8B5C3C)', meta: '🇯🇵 Osaka · 3y · timezone mismatch', score: 72, status: 'reviewed' },
    { candidateId: 'i-dk', name: 'Daniela Kowalczyk', avatarInitials: 'DK', avatarGradient: 'linear-gradient(135deg, #B5C7A8, #5C7A4D)', meta: '🇵🇱 Wrocław · 5y · rate above range', score: 82, status: 'reviewed' },
    { candidateId: 'i-so', name: 'Samira Ouedraogo', avatarInitials: 'SO', avatarGradient: 'linear-gradient(135deg, #C9B8A4, #7A6B57)', meta: '🇧🇫 Ouagadougou · 4y · Vue 2 only', score: 68, status: 'reviewed' },
    { candidateId: 'i-rm', name: 'Riccardo Marchetti', avatarInitials: 'RM', avatarGradient: 'linear-gradient(135deg, #F0CC4F, #B8911E)', meta: '🇮🇹 Milan · 6y · capacity mismatch', score: 79, status: 'reviewed' },
    { candidateId: 'i-fb', name: 'Fatima Benali', avatarInitials: 'FB', avatarGradient: 'linear-gradient(135deg, #9CC9C2, #4D8A82)', meta: '🇲🇦 Casablanca · 7y · Angular-heavy', score: 71, status: 'reviewed' },
    { candidateId: 'i-pv', name: 'Priya Venkatesh', avatarInitials: 'PV', avatarGradient: 'linear-gradient(135deg, #E8B4B8, #8B5A6F)', meta: '🇮🇳 Pune · 6y · just expressed', score: null, status: 'pending' },
    { candidateId: 'i-am', name: 'Aleksei Mironov', avatarInitials: 'AM', avatarGradient: 'linear-gradient(135deg, #B89BD6, #6E3FE0)', meta: '🇰🇿 Almaty · 4y · just expressed', score: null, status: 'pending' },
    { candidateId: 'i-le', name: 'Liam Egan', avatarInitials: 'LE', avatarGradient: 'linear-gradient(135deg, #C7CFA8, #6B8E23)', meta: '🇮🇪 Dublin · 5y · agency-side', score: 81, status: 'reviewed' },
    { candidateId: 'i-nt', name: 'Nina Trifunović', avatarInitials: 'NT', avatarGradient: 'linear-gradient(135deg, #DCA294, #8B4F47)', meta: '🇷🇸 Belgrade · 3y · junior-mid', score: 66, status: 'reviewed' },
    { candidateId: 'i-ob', name: 'Olamide Bankole', avatarInitials: 'OB', avatarGradient: 'linear-gradient(135deg, #A4B5D8, #4D6699)', meta: '🇳🇬 Lagos · 5y · just expressed', score: null, status: 'pending' },
    { candidateId: 'i-el', name: 'Elif Çelik', avatarInitials: 'EL', avatarGradient: 'linear-gradient(135deg, #F0CC4F, #B8911E)', meta: '🇹🇷 Istanbul · 4y · timezone fit', score: 78, status: 'reviewed' },
  ],
  footerLabel: 'Showing 12 of 19 · 4 more reviewed + 3 more pending',
  fullListLabel: 'Open full list →',
};

const INTERVENTION_001: JobInterventionHistory = {
  statusText: 'Daniel Kovács · 14 actions over 5 days',  // admin.html line 23154 verbatim
  title: "Daniel's work on this job",
  metaLine: 'All actions audited · timestamps in CET',
  days: [
    {
      dateLabel: 'Today · April 30, 2026', countLabel: '2 events',
      entries: [
        { time: '2:14 PM', verb: 'Sent shortlist note', target: 'to Stefan Müller (Studio Berlin)', details: 'Personalized note explaining each of the 5 picks · 312 words · ready for client review', refId: 'SLN-2026-0414', tagLabel: 'SHORTLIST', tagVariant: 'default' },
        { time: '11:42 AM', verb: 'Locked shortlist at 5/5', target: 'job-001 ready for review', details: 'All 5 candidates confirmed available · avg score 87.4 · 22h after job posted', tagLabel: 'SHORTLIST', tagVariant: 'default' },
      ],
    },
    {
      dateLabel: 'Apr 29, 2026', countLabel: '5 events',
      entries: [
        { time: '5:18 PM', verb: 'Outbound message', target: 'to Linnea Holmberg (cand-014)', details: "Personalized reach-out highlighting Studio Berlin's editorial work · positive response within 2h", tagLabel: 'OUTBOUND', tagVariant: 'override', dataCat: 'override' },
        { time: '3:42 PM', verb: 'Adjusted rate range', target: '$50–60 → $55–65', details: 'After client conversation · realistic for the seniority profile · 24h before shortlist locked', refId: 'EDIT-2026-0210', tagLabel: 'EDIT', tagVariant: 'default' },
        { time: '2:08 PM', verb: 'Outbound message', target: 'to Jakub Wiśniewski (cand-008)', details: 'Reached out specifically for Nuxt depth · responded confirming availability', tagLabel: 'OUTBOUND', tagVariant: 'override', dataCat: 'override' },
        { time: '11:14 AM', verb: 'Reviewed candidates 6–14', target: '9 candidates evaluated', details: '4 advanced to shortlist consideration · 5 passed (skill / timezone / rate mismatches)', tagLabel: 'REVIEW', tagVariant: 'default' },
        { time: '9:32 AM', verb: 'Reviewed first 5 candidates', target: 'who expressed interest overnight', details: '2 advanced (Linnea, Hadeel) · 3 passed', tagLabel: 'REVIEW', tagVariant: 'default' },
      ],
    },
    {
      dateLabel: 'Apr 28, 2026', countLabel: '3 events',
      entries: [
        { time: '4:42 PM', verb: 'Tagged role for sourcing focus', target: 'Vue 3 + editorial design', details: 'Marked as priority sourcing for Engineering pool · expected slow build given niche', tagLabel: 'TAG', tagVariant: 'default' },
        { time: '1:18 PM', verb: 'Drafted shortlist criteria', target: 'internal Atlas note', details: 'Defined the 4 score components for this role · weighting: skills 30 / experience 25 / timezone 25 / rate 20', tagLabel: 'PLAN', tagVariant: 'default' },
        { time: '10:08 AM', verb: 'Picked up job', target: 'job-001 assigned to Daniel', details: 'Auto-routed by Atlas (Engineering specialist · existing Studio Berlin relationship)', tagLabel: 'ASSIGNED', tagVariant: 'signin', dataCat: 'signin' },
      ],
    },
    {
      dateLabel: 'Apr 26, 2026', countLabel: '1 event',
      entries: [
        { time: '9:14 PM', verb: 'Job posted', target: 'by Stefan Müller (Studio Berlin)', details: 'Initial posting submitted · auto-published after 6h moderation · went live Apr 27 03:14', refId: 'JOB-2026-1042', tagLabel: 'CREATED', tagVariant: 'signin', dataCat: 'signin' },
      ],
    },
  ],
};

const OUTCOME_001: JobOutcome = {
  statusText: 'Open · awaiting client decision on shortlist',  // admin.html line 23326 verbatim
  blocks: [
    {
      label: 'Current state',
      value: 'Shortlist delivered · client review',
      meta: '5 candidates ready for client review since Apr 30 11:42 AM CET. Stefan typically responds within 36 hours · expected decision by May 2.',
    },
    {
      label: 'Hire progress',
      value: '0 / 1', vSuffix: 'hires', valueColor: 'super',
      meta: 'Awaiting client to choose from shortlist · 1 hire target · estimated time-to-hire 8–14 days based on similar Studio Berlin jobs.',
    },
  ],
  progressPct: 65,
  stops: [
    { label: 'Posted', done: true },
    { label: 'Sourcing', done: true },
    { label: 'Shortlisted', done: true },
    { label: 'Client review', done: false },
    { label: 'Filled', done: false },
  ],
  filledLink: null,
  actionsTextPrefix: "Daniel's confidence rating: ",
  actionsTextEmphasis: 'High',
  actionsTextEmphasisColor: 'success',
  actionsTextSuffix: ' · client typically converts shortlists at 78% rate · projected fill ≤ May 8.',
  compareLabel: 'Compare to similar fills →',
};

// ============================================================
// PHASE 11b — STUB SECTION BUILDER (job-002..010)
// ============================================================

function stubJobSections(args: {
  client: JobClient;
  job: { title: string; rate: string; hours: string; category: string; status: JobStatus; ownerName: string };
  match: { avgScore: string; numCandidates: number; clientReviewStatus: string };
  interest: { total: number; reviewed: number; pending: number };
  intervention: { numActions: number; numDays: number };
  outcome: { progressPct: number; doneStops: number; filledLink: JobOutcomeFilledLink | null; currentState: string; currentMeta: string; hires: string; confidenceColor: 'success' | 'amber' | 'danger'; confidenceLabel: string };
}): {
  description: JobDescription;
  matchBreakdown: JobMatchBreakdown;
  otherInterest: JobOtherInterest;
  intervention: JobInterventionHistory;
  outcome: JobOutcome;
} {
  const { client, job, match, interest, intervention, outcome } = args;
  const stops: JobOutcomeStop[] = [
    { label: 'Posted', done: outcome.doneStops >= 1 },
    { label: 'Sourcing', done: outcome.doneStops >= 2 },
    { label: 'Shortlisted', done: outcome.doneStops >= 3 },
    { label: 'Client review', done: outcome.doneStops >= 4 },
    { label: 'Filled', done: outcome.doneStops >= 5 },
  ];

  // Derive verbatim-equivalent statusText for the 3 sections
  const capStatus = job.status.charAt(0).toUpperCase() + job.status.slice(1);
  const outcomeStatusByStatus: Record<JobStatus, string> = {
    open: `${capStatus} · sourcing in progress`,
    paused: `${capStatus} · awaiting client OK to resume`,
    filled: `${capStatus} · engagement active`,
    closed: `${capStatus} · no fit · listing archived`,
    investigate: `${capStatus} · flagged for Trust & Safety review`,
  };

  return {
    description: {
      statusText: 'Posted · live',
      jdTitle: 'Full posting · client-facing copy',
      jdMeta: `posted · ${client.name} role`,
      introSections: [
        { heading: 'About the role', paragraphs: [`${client.name} is hiring a ${job.title} for an ongoing engagement. ${client.metaTrail}. The role is ${job.category} category at ${job.rate}, ${job.hours}.`] },
        { heading: "What you'll do", bullets: [{ text: 'Own day-to-day execution on a focused workstream' }, { text: 'Collaborate async with the client team' }, { text: 'Ship measurable outcomes within the cycle' }] },
        { heading: "What we're looking for", bulletsChecks: true, bullets: [{ text: 'Strong relevant experience' }, { text: 'Async-friendly communication' }, { text: 'Self-directed delivery' }] },
      ],
      compBlock: [
        { label: 'Rate', value: job.rate, meta: 'weekly cycle' },
        { label: 'Hours', value: job.hours, meta: 'flexible' },
        { label: 'Commitment', value: 'open-ended', valueSize: 'sm', meta: '30-day notice clause' },
      ],
    },
    matchBreakdown: {
      title: "Curated shortlist · specialist picks",
      hasFoundingCohort: false,
      avgScore: match.avgScore,
      progressLabel: match.clientReviewStatus,
      candidates: Array.from({ length: match.numCandidates }, (_, i) => ({
        rank: i + 1,
        rankBadge: (i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : 'default') as MatchRankBadge,
        candidateId: `cand-${client.id}-${i + 1}`,
        name: `Candidate ${String.fromCharCode(65 + i)}`,
        avatarInitials: String.fromCharCode(65 + i) + String.fromCharCode(65 + i + 1),
        avatarGradient: 'linear-gradient(135deg, #A4B5D8, #4D6699)',
        meta: `${client.flag} candidate · ${5 + i}y exp · ${job.category}`,
        scoreBars: [
          { label: 'Skills', value: 85 - i * 2, variant: (i < 2 ? 'high' : 'mid') as ScoreBarVariant },
          { label: 'Experience', value: 80 - i * 3, variant: (i < 2 ? 'high' : 'mid') as ScoreBarVariant },
          { label: 'Timezone', value: 90 - i * 5, variant: (i < 3 ? 'high' : 'mid') as ScoreBarVariant },
          { label: 'Rate fit', value: 80 - i * 4, variant: (i < 3 ? 'mid' : 'low') as ScoreBarVariant },
        ],
        total: 85 - i * 3,
        totalIsHigh: i === 0,
        actionLabel: i === 0 ? '★ Top pick' : 'View profile',
        actionIsCurated: i === 0,
      })),
    },
    otherInterest: {
      title: 'Beyond the curated set',
      totalCount: interest.total, reviewedCount: interest.reviewed, pendingCount: interest.pending,
      candidates: Array.from({ length: Math.min(8, interest.total) }, (_, i) => ({
        candidateId: `int-${client.id}-${i}`,
        name: `Interested Candidate ${i + 1}`,
        avatarInitials: 'I' + (i + 1),
        avatarGradient: 'linear-gradient(135deg, #C9B8A4, #7A6B57)',
        meta: `${client.flag} candidate · ${3 + (i % 4)}y · various fit`,
        score: i < interest.reviewed ? 70 + (i % 15) : null,
        status: (i < interest.reviewed ? 'reviewed' : 'pending') as InterestStatus,
      })),
      footerLabel: `Showing ${Math.min(8, interest.total)} of ${interest.total}`,
      fullListLabel: 'Open full list →',
    },
    intervention: {
      statusText: `${job.ownerName} · ${intervention.numActions} actions over ${intervention.numDays} days`,
      title: `${job.ownerName}'s work on this job`,
      metaLine: 'All actions audited · timestamps in CET',
      days: [
        {
          dateLabel: 'Recent activity', countLabel: `${intervention.numActions} events total`,
          entries: [
            { time: 'recent', verb: 'Reviewed candidates', target: `${interest.reviewed} evaluated`, details: 'Routine sourcing review', tagLabel: 'REVIEW', tagVariant: 'default' },
            { time: 'earlier', verb: 'Picked up job', target: `${job.title} assigned`, details: `Auto-routed to ${job.ownerName}`, tagLabel: 'ASSIGNED', tagVariant: 'signin', dataCat: 'signin' },
          ],
        },
      ],
    },
    outcome: {
      statusText: outcomeStatusByStatus[job.status],
      blocks: [
        { label: 'Current state', value: outcome.currentState, meta: outcome.currentMeta },
        { label: 'Hire progress', value: outcome.hires, vSuffix: 'hires', valueColor: outcome.filledLink ? 'success' : 'super', meta: outcome.filledLink ? 'Engagement active' : 'In progress' },
      ],
      progressPct: outcome.progressPct,
      stops,
      filledLink: outcome.filledLink,
      actionsTextPrefix: `${job.ownerName}'s confidence rating: `,
      actionsTextEmphasis: outcome.confidenceLabel,
      actionsTextEmphasisColor: outcome.confidenceColor,
      actionsTextSuffix: ' · projection based on similar jobs.',
      compareLabel: 'Compare to similar fills →',
    },
  };
}

// ============================================================
// JOB PROFILES — job-001 canonical (verbatim) + 9 role-coherent stubs
// ============================================================

const JOB_001: JobProfile = {
  id: 'job-001', atlasId: 'job-001-fe2nuxt',
  status: 'open', category: 'engineering',
  statusPillVariant: 'job-shortlisted',
  statusPillText: 'Shortlisted 5/5',
  postedMeta: 'Posted Apr 26, 2026 · 5 days on platform · last edited 2d ago',
  title: 'Senior Frontend Engineer (Vue / Nuxt)',
  client: CLIENT_STUDIO_BERLIN,
  heroStats: [
    { label: 'Compensation', value: '$55–65', vSuffix: '/h', meta: 'USD · weekly cycle' },
    { label: 'Hours', value: '25–30', vSuffix: '/wk', meta: 'flexible · async OK' },
    { label: 'Engagement', value: 'Hourly · ongoing', valueSize: 'sm', meta: '3-mo minimum · open-ended' },
    { label: 'Specialist owner', value: 'Daniel K.', valueSize: 'sm', meta: 'Engineering specialist' },
    { label: 'Match SLA', value: '✓ Hit', valueSize: 'sm', valueColor: 'success', meta: '22h to first match' },
  ],
  banner: null,
  owner: OWNER_DK,
  quickFacts: [
    { dt: 'Job ID', dd: 'job-001-fe2nuxt' },
    { dt: 'Client', dd: 'Studio Berlin (cl-002)', ddSubMono: 'REAL: Atelier Werkraum' },
    { dt: 'Posted', dd: 'Apr 26, 2026 9:14 PM CET' },
    { dt: 'Live since', dd: 'Apr 27, 2026 3:14 AM CET' },
    { dt: 'Days on platform', dd: '5 days · 0 amendments since Apr 29' },
    { dt: 'Category', dd: 'Engineering · Frontend / SPA' },
    { dt: 'Compensation', dd: '$55–65/h · 25–30h/wk' },
    { dt: 'Engagement type', dd: 'Hourly · 3-mo minimum · open-ended' },
    { dt: 'Owning Specialist', dd: 'Daniel Kovács (spec-001)' },
    { dt: 'SLA status', dd: '✓ First match within 24h', ddColor: 'success' },
    { dt: 'Last activity', dd: '2h ago · shortlist note sent', ddColor: 'success' },
  ],
  tocMetas: { desc: '412w', match: '5/5', interest: '19', intervention: '14 acts', outcome: '0/1' },
  tocOkFlags: { desc: false, match: true, interest: false, intervention: false, outcome: false },
  description: DESC_001,
  matchBreakdown: MATCH_001,
  otherInterest: INTEREST_001,
  intervention: INTERVENTION_001,
  outcome: OUTCOME_001,
};

// Stub builder for quickFacts + tocMetas on job-002..job-010
function stubQuickFacts(j: { atlasId: string; client: JobClient; posted: string; days: string; category: string; comp: string; engType: string; owner: string; slaText: string; lastActivity: string }): JobQuickFact[] {
  return [
    { dt: 'Job ID', dd: j.atlasId },
    { dt: 'Client', dd: `${j.client.name} (${j.client.id})`, ...(j.client.realLegalEntity ? { ddSubMono: `REAL: ${j.client.realLegalEntity}` } : {}) },
    { dt: 'Posted', dd: j.posted },
    { dt: 'Days on platform', dd: j.days },
    { dt: 'Category', dd: j.category },
    { dt: 'Compensation', dd: j.comp },
    { dt: 'Engagement type', dd: j.engType },
    { dt: 'Owning Specialist', dd: j.owner },
    { dt: 'SLA status', dd: j.slaText, ddColor: 'success' },
    { dt: 'Last activity', dd: j.lastActivity },
  ];
}

const JOB_002: JobProfile = {
  id: 'job-002', atlasId: 'job-002-emb',
  status: 'open', category: 'engineering',
  statusPillVariant: 'job-sourcing', statusPillText: 'Sourcing',
  postedMeta: 'Posted Apr 19, 2026 · 12 days on platform · sourcing ramp-up',
  title: 'Embedded Systems Lead',
  client: CLIENT_NORTHWIND,
  heroStats: [
    { label: 'Compensation', value: '$70–85', vSuffix: '/h', meta: 'USD · weekly cycle' },
    { label: 'Hours', value: '30–40', vSuffix: '/wk', meta: 'on-site preferred' },
    { label: 'Engagement', value: 'Hourly · ongoing', valueSize: 'sm', meta: '6-mo minimum' },
    { label: 'Specialist owner', value: 'Daniel K.', valueSize: 'sm', meta: 'Engineering specialist' },
    { label: 'Match SLA', value: '✓ Hit', valueSize: 'sm', valueColor: 'success', meta: '18h to first interest' },
  ],
  banner: null, owner: OWNER_DK,
  quickFacts: stubQuickFacts({ atlasId: 'job-002-emb', client: CLIENT_NORTHWIND, posted: 'Apr 19, 2026', days: '12 days', category: 'Engineering · Embedded / hardware', comp: '$70–85/h · 30–40h/wk', engType: 'Hourly · 6-mo minimum', owner: 'Daniel Kovács (spec-001)', slaText: '✓ First match within 24h', lastActivity: '6h ago · sourcing note added' }),
  tocMetas: { desc: '380w', match: '2/5', interest: '8', intervention: '6 acts', outcome: '0/1' },
  tocOkFlags: { desc: false, match: false, interest: false, intervention: false, outcome: false },
  ...stubJobSections({
    client: CLIENT_NORTHWIND,
    job: { title: 'Embedded Systems Lead', rate: '$70–85/h', hours: '30–40/wk', category: 'Engineering', status: 'open', ownerName: 'Daniel K.' },
    match: { avgScore: '72.0 / 100', numCandidates: 2, clientReviewStatus: 'sourcing in progress' },
    interest: { total: 8, reviewed: 5, pending: 3 },
    intervention: { numActions: 6, numDays: 3 },
    outcome: { progressPct: 35, doneStops: 2, filledLink: null, currentState: 'Sourcing in progress', currentMeta: 'Niche role · slow build expected. Daniel doing outbound on Vue/embedded specialists.', hires: '0 / 1', confidenceColor: 'amber', confidenceLabel: 'Medium' },
  }),
};

const JOB_003: JobProfile = {
  id: 'job-003', atlasId: 'job-003-devops',
  status: 'filled', category: 'engineering',
  statusPillVariant: 'job-filled', statusPillText: 'Filled',
  postedMeta: 'Posted Apr 9, 2026 · 22 days on platform · filled Apr 18',
  title: 'DevOps Engineer (AWS / K8s)',
  client: CLIENT_PATAGONIA,
  heroStats: [
    { label: 'Compensation', value: '$60–70', vSuffix: '/h', meta: 'USD · weekly cycle' },
    { label: 'Hours', value: '40', vSuffix: '/wk', meta: 'full-time equivalent' },
    { label: 'Engagement', value: 'Hourly · ongoing', valueSize: 'sm', meta: '12-mo minimum' },
    { label: 'Specialist owner', value: 'Mateo V.', valueSize: 'sm', meta: 'Manager of Specialists' },
    { label: 'Time to hire', value: '9 days', valueSize: 'sm', valueColor: 'success', meta: 'shortlist → contract' },
  ],
  banner: { variant: 'success', title: 'Filled — engagement eng-003 started', meta: '9-day time-to-hire · candidate Valentina Kraft signed Apr 18 · auto-released to engagement' },
  owner: OWNER_MV,
  filledEngagementId: 'eng-003', filledTimeToHire: '9-day TTH',
  quickFacts: stubQuickFacts({ atlasId: 'job-003-devops', client: CLIENT_PATAGONIA, posted: 'Apr 9, 2026', days: '22 days · filled Apr 18', category: 'Engineering · DevOps / SRE', comp: '$60–70/h · 40h/wk', engType: 'Hourly · 12-mo minimum', owner: 'Mateo Vargas (mgr-001)', slaText: '✓ Filled within SLA window', lastActivity: '12d ago · engagement eng-003 active' }),
  tocMetas: { desc: '320w', match: '5/5', interest: '31', intervention: '12 acts', outcome: '1/1' },
  tocOkFlags: { desc: false, match: true, interest: true, intervention: false, outcome: true },
  ...stubJobSections({
    client: CLIENT_PATAGONIA,
    job: { title: 'DevOps Engineer (AWS / K8s)', rate: '$60–70/h', hours: '40/wk', category: 'Engineering', status: 'filled', ownerName: 'Mateo V.' },
    match: { avgScore: '88.2 / 100', numCandidates: 5, clientReviewStatus: 'filled — Valentina Kraft signed' },
    interest: { total: 31, reviewed: 31, pending: 0 },
    intervention: { numActions: 12, numDays: 4 },
    outcome: {
      progressPct: 100, doneStops: 5,
      filledLink: { engagementId: 'eng-003', label: 'This job has been filled.', detail: 'View the resulting engagement (eng-003) · 9-day TTH · candidate Valentina Kraft' },
      currentState: 'Filled · engagement active',
      currentMeta: '9-day time-to-hire · candidate signed Apr 18 · engagement eng-003 is now live with weekly cycle.',
      hires: '1 / 1', confidenceColor: 'success', confidenceLabel: 'Closed',
    },
  }),
};

const JOB_004: JobProfile = {
  id: 'job-004', atlasId: 'job-004-brand',
  status: 'open', category: 'design',
  statusPillVariant: 'job-shortlisted', statusPillText: 'Shortlisted 4/5',
  postedMeta: 'Posted Apr 28, 2026 · 3 days on platform · 4 of 5 curated',
  title: 'Brand Designer (Editorial)',
  client: CLIENT_STUDIO_BERLIN,
  heroStats: [
    { label: 'Compensation', value: '$50–60', vSuffix: '/h', meta: 'USD · weekly cycle' },
    { label: 'Hours', value: '20–25', vSuffix: '/wk', meta: 'part-time · flexible' },
    { label: 'Engagement', value: 'Hourly · ongoing', valueSize: 'sm', meta: '3-mo minimum' },
    { label: 'Specialist owner', value: 'Sarah R.', valueSize: 'sm', meta: 'Design specialist' },
    { label: 'Match SLA', value: '✓ Hit', valueSize: 'sm', valueColor: 'success', meta: '12h to first match' },
  ],
  banner: null, owner: OWNER_SR,
  quickFacts: stubQuickFacts({ atlasId: 'job-004-brand', client: CLIENT_STUDIO_BERLIN, posted: 'Apr 28, 2026', days: '3 days', category: 'Design · Brand / editorial', comp: '$50–60/h · 20–25h/wk', engType: 'Hourly · 3-mo minimum', owner: 'Sarah Reilly (spec-003)', slaText: '✓ First match within 24h', lastActivity: '3h ago · 4th shortlist added' }),
  tocMetas: { desc: '298w', match: '4/5', interest: '18', intervention: '9 acts', outcome: '0/1' },
  tocOkFlags: { desc: false, match: true, interest: false, intervention: false, outcome: false },
  ...stubJobSections({
    client: CLIENT_STUDIO_BERLIN,
    job: { title: 'Brand Designer (Editorial)', rate: '$50–60/h', hours: '20–25/wk', category: 'Design', status: 'open', ownerName: 'Sarah R.' },
    match: { avgScore: '82.5 / 100', numCandidates: 4, clientReviewStatus: '4 of 5 curated · 1 slot open' },
    interest: { total: 18, reviewed: 8, pending: 10 },
    intervention: { numActions: 9, numDays: 3 },
    outcome: { progressPct: 55, doneStops: 3, filledLink: null, currentState: 'Shortlist nearly complete', currentMeta: '4 of 5 candidates ready · Sarah hunting for 5th editorial-strong candidate.', hires: '0 / 1', confidenceColor: 'success', confidenceLabel: 'High' },
  }),
};

const JOB_005: JobProfile = {
  id: 'job-005', atlasId: 'job-005-mobile',
  status: 'paused', category: 'engineering',
  statusPillVariant: 'job-paused', statusPillText: 'Paused',
  postedMeta: 'Posted Apr 22, 2026 · 9 days on platform · paused 4d ago by client',
  title: 'Mobile Developer (Flutter)',
  client: CLIENT_SOLAR_RIO,
  heroStats: [
    { label: 'Compensation', value: '$45–55', vSuffix: '/h', meta: 'USD · weekly cycle' },
    { label: 'Hours', value: '25–30', vSuffix: '/wk', meta: 'flexible · async OK' },
    { label: 'Engagement', value: 'Hourly · ongoing', valueSize: 'sm', meta: '3-mo minimum' },
    { label: 'Specialist owner', value: 'Mateo V.', valueSize: 'sm', meta: 'Manager of Specialists' },
    { label: 'Status', value: 'Paused 4d', valueSize: 'sm', meta: 'awaiting client OK to resume' },
  ],
  banner: { variant: 'amber', title: 'Engagement paused — client request', meta: 'Paused Apr 27, 2026 by Solar Rio Energia · awaiting Q2 budget approval · no SLA penalty applies' },
  owner: OWNER_MV,
  quickFacts: stubQuickFacts({ atlasId: 'job-005-mobile', client: CLIENT_SOLAR_RIO, posted: 'Apr 22, 2026', days: '9 days · paused 4d ago', category: 'Engineering · Mobile / cross-platform', comp: '$45–55/h · 25–30h/wk', engType: 'Hourly · 3-mo minimum', owner: 'Mateo Vargas (mgr-001)', slaText: '✓ First match within 24h', lastActivity: '4d ago · pause initiated by client' }),
  tocMetas: { desc: '275w', match: '3/5', interest: '12', intervention: '7 acts', outcome: '0/1' },
  tocOkFlags: { desc: false, match: false, interest: false, intervention: false, outcome: false },
  ...stubJobSections({
    client: CLIENT_SOLAR_RIO,
    job: { title: 'Mobile Developer (Flutter)', rate: '$45–55/h', hours: '25–30/wk', category: 'Engineering', status: 'paused', ownerName: 'Mateo V.' },
    match: { avgScore: '76.0 / 100', numCandidates: 3, clientReviewStatus: 'paused — awaiting client OK to resume' },
    interest: { total: 12, reviewed: 7, pending: 5 },
    intervention: { numActions: 7, numDays: 3 },
    outcome: { progressPct: 45, doneStops: 2, filledLink: null, currentState: 'Paused by client', currentMeta: 'Paused Apr 27 by Solar Rio Energia · awaiting Q2 budget approval to resume sourcing.', hires: '0 / 1', confidenceColor: 'amber', confidenceLabel: 'Pending' },
  }),
};

const JOB_006: JobProfile = {
  id: 'job-006', atlasId: 'job-006-data',
  status: 'closed', category: 'data',
  statusPillVariant: 'job-closed', statusPillText: 'Closed · no fit',
  postedMeta: 'Posted Apr 14, 2026 · 17 days on platform · closed Apr 30 · client withdrew',
  title: 'Senior Data Engineer',
  client: CLIENT_HELSINKI,
  heroStats: [
    { label: 'Compensation', value: '$60–75', vSuffix: '/h', meta: 'USD · weekly cycle' },
    { label: 'Hours', value: '25–35', vSuffix: '/wk', meta: 'flexible · remote OK' },
    { label: 'Engagement', value: 'Hourly · ongoing', valueSize: 'sm', meta: '6-mo minimum' },
    { label: 'Specialist owner', value: 'Lukas C.', valueSize: 'sm', meta: 'Data & ML specialist' },
    { label: 'Closed', value: 'no fit', valueSize: 'sm', meta: 'client withdrew · refunded' },
  ],
  banner: { variant: 'amber', title: 'Closed — no qualifying candidates', meta: 'Helsinki Data withdrew posting on Apr 30 · 26 candidates reviewed · listing fee refunded · job archived' },
  owner: OWNER_LC,
  quickFacts: stubQuickFacts({ atlasId: 'job-006-data', client: CLIENT_HELSINKI, posted: 'Apr 14, 2026', days: '17 days · closed Apr 30', category: 'Data & ML · Pipelines / dbt', comp: '$60–75/h · 25–35h/wk', engType: 'Hourly · 6-mo minimum', owner: 'Lukas Carlsson (spec-007)', slaText: '✓ First match within 24h', lastActivity: '1d ago · client closed posting' }),
  tocMetas: { desc: '341w', match: '0/5', interest: '26', intervention: '11 acts', outcome: '0/0' },
  tocOkFlags: { desc: false, match: false, interest: false, intervention: false, outcome: false },
  ...stubJobSections({
    client: CLIENT_HELSINKI,
    job: { title: 'Senior Data Engineer', rate: '$60–75/h', hours: '25–35/wk', category: 'Data & ML', status: 'closed', ownerName: 'Lukas C.' },
    match: { avgScore: 'n/a', numCandidates: 0, clientReviewStatus: 'closed — no qualifying candidates' },
    interest: { total: 26, reviewed: 26, pending: 0 },
    intervention: { numActions: 11, numDays: 4 },
    outcome: { progressPct: 100, doneStops: 5, filledLink: null, currentState: 'Closed · no fit', currentMeta: 'Helsinki Data withdrew posting on Apr 30 · 26 candidates reviewed · listing fee refunded.', hires: '0 / 0', confidenceColor: 'danger', confidenceLabel: 'Closed' },
  }),
};

const JOB_007: JobProfile = {
  id: 'job-007', atlasId: 'job-007-cs',
  status: 'open', category: 'sales',
  statusPillVariant: 'job-sourcing', statusPillText: 'Sourcing',
  postedMeta: 'Posted Apr 29, 2026 · 2 days on platform · just ramping',
  title: 'Customer Success Lead',
  client: CLIENT_ANDINA,
  heroStats: [
    { label: 'Compensation', value: '$45–60', vSuffix: '/h', meta: 'USD · weekly cycle' },
    { label: 'Hours', value: '30–40', vSuffix: '/wk', meta: 'business hours preferred' },
    { label: 'Engagement', value: 'Hourly · ongoing', valueSize: 'sm', meta: '6-mo minimum' },
    { label: 'Specialist owner', value: 'Ines M.', valueSize: 'sm', meta: 'Sales & CS specialist' },
    { label: 'Match SLA', value: '✓ Hit', valueSize: 'sm', valueColor: 'success', meta: '14h to first interest' },
  ],
  banner: null, owner: OWNER_IM,
  quickFacts: stubQuickFacts({ atlasId: 'job-007-cs', client: CLIENT_ANDINA, posted: 'Apr 29, 2026', days: '2 days · sourcing ramp-up', category: 'Sales & CS · B2B SaaS', comp: '$45–60/h · 30–40h/wk', engType: 'Hourly · 6-mo minimum', owner: 'Ines Mendoza (spec-005)', slaText: '✓ First match within 24h', lastActivity: '4h ago · 2nd candidate matched' }),
  tocMetas: { desc: '210w', match: '1/5', interest: '4', intervention: '3 acts', outcome: '0/1' },
  tocOkFlags: { desc: false, match: false, interest: false, intervention: false, outcome: false },
  ...stubJobSections({
    client: CLIENT_ANDINA,
    job: { title: 'Customer Success Lead', rate: '$45–60/h', hours: '30–40/wk', category: 'Sales & CS', status: 'open', ownerName: 'Ines M.' },
    match: { avgScore: '78.0 / 100', numCandidates: 1, clientReviewStatus: 'just ramping · 1 of 5 picked' },
    interest: { total: 4, reviewed: 1, pending: 3 },
    intervention: { numActions: 3, numDays: 2 },
    outcome: { progressPct: 25, doneStops: 1, filledLink: null, currentState: 'Sourcing · ramping', currentMeta: 'Just posted Apr 29 · 4 expressed interest so far · Ines doing outbound on B2B SaaS background.', hires: '0 / 1', confidenceColor: 'success', confidenceLabel: 'High' },
  }),
};

const JOB_008: JobProfile = {
  id: 'job-008', atlasId: 'job-008-motion',
  status: 'filled', category: 'design',
  statusPillVariant: 'job-filled', statusPillText: 'Filled',
  postedMeta: 'Posted Apr 23, 2026 · 8 days on platform · filled Apr 24',
  title: 'Motion Designer (Fixed-price)',
  client: CLIENT_CINELUX,
  heroStats: [
    { label: 'Compensation', value: '$4,200', meta: 'fixed-price · 3 milestones' },
    { label: 'Hours', value: 'n/a', vSuffix: '· fixed', meta: 'deliverable-based' },
    { label: 'Engagement', value: 'Fixed-price', valueSize: 'sm', meta: '3 milestones · escrow funded' },
    { label: 'Specialist owner', value: 'Sarah R.', valueSize: 'sm', meta: 'Design specialist' },
    { label: 'Time to hire', value: '1 day', valueSize: 'sm', valueColor: 'success', meta: 'shortlist → contract · record fast' },
  ],
  banner: { variant: 'success', title: 'Filled — engagement eng-008 started', meta: '1-day time-to-hire · candidate Marina Costa signed Apr 24 · escrow funded $4,200 · auto-released to engagement' },
  owner: OWNER_SR,
  filledEngagementId: 'eng-008', filledTimeToHire: '1-day TTH',
  quickFacts: stubQuickFacts({ atlasId: 'job-008-motion', client: CLIENT_CINELUX, posted: 'Apr 23, 2026', days: '8 days · filled Apr 24', category: 'Design · Motion / video', comp: '$4,200 total · fixed-price', engType: 'Fixed-price · 3 milestones', owner: 'Sarah Reilly (spec-003)', slaText: '✓ Filled within SLA window', lastActivity: '7d ago · engagement eng-008 active' }),
  tocMetas: { desc: '188w', match: '5/5', interest: '19', intervention: '5 acts', outcome: '1/1' },
  tocOkFlags: { desc: false, match: true, interest: true, intervention: false, outcome: true },
  ...stubJobSections({
    client: CLIENT_CINELUX,
    job: { title: 'Motion Designer (Fixed-price)', rate: '$4,200 total · fixed', hours: 'n/a · deliverable-based', category: 'Design', status: 'filled', ownerName: 'Sarah R.' },
    match: { avgScore: '91.0 / 100', numCandidates: 5, clientReviewStatus: 'filled — Marina Costa signed' },
    interest: { total: 19, reviewed: 19, pending: 0 },
    intervention: { numActions: 5, numDays: 2 },
    outcome: {
      progressPct: 100, doneStops: 5,
      filledLink: { engagementId: 'eng-008', label: 'This job has been filled.', detail: 'View the resulting engagement (eng-008) · 1-day TTH · candidate Marina Costa · escrow funded $4,200' },
      currentState: 'Filled · escrow active',
      currentMeta: '1-day time-to-hire (record fast) · candidate signed Apr 24 · engagement eng-008 escrow funded for 3 milestones.',
      hires: '1 / 1', confidenceColor: 'success', confidenceLabel: 'Closed',
    },
  }),
};

const JOB_009: JobProfile = {
  id: 'job-009', atlasId: 'job-009-docs',
  status: 'open', category: 'content',
  statusPillVariant: 'job-shortlisted', statusPillText: 'Shortlisted 3/5',
  postedMeta: 'Posted Apr 3, 2026 · 28 days on platform · slow fill · nonprofit budget',
  title: 'Documentation Writer (developer-focused)',
  client: CLIENT_BERLIN_OSS,
  heroStats: [
    { label: 'Compensation', value: '$35–45', vSuffix: '/h', meta: 'USD · nonprofit rate' },
    { label: 'Hours', value: '15–20', vSuffix: '/wk', meta: 'flexible · async OK' },
    { label: 'Engagement', value: 'Hourly · ongoing', valueSize: 'sm', meta: '3-mo minimum' },
    { label: 'Specialist owner', value: 'Aiyana T.', valueSize: 'sm', meta: 'Content specialist' },
    { label: 'Match SLA', value: '✓ Hit', valueSize: 'sm', valueColor: 'success', meta: '24h to first interest' },
  ],
  banner: null, owner: OWNER_AT,
  quickFacts: stubQuickFacts({ atlasId: 'job-009-docs', client: CLIENT_BERLIN_OSS, posted: 'Apr 3, 2026', days: '28 days · slow fill', category: 'Content · Technical writing', comp: '$35–45/h · 15–20h/wk · nonprofit', engType: 'Hourly · 3-mo minimum', owner: 'Aiyana Thomas (spec-009)', slaText: '✓ First match within 24h', lastActivity: '1d ago · 3rd shortlist added' }),
  tocMetas: { desc: '256w', match: '3/5', interest: '14', intervention: '8 acts', outcome: '0/1' },
  tocOkFlags: { desc: false, match: false, interest: false, intervention: false, outcome: false },
  ...stubJobSections({
    client: CLIENT_BERLIN_OSS,
    job: { title: 'Documentation Writer (developer-focused)', rate: '$35–45/h', hours: '15–20/wk', category: 'Content', status: 'open', ownerName: 'Aiyana T.' },
    match: { avgScore: '74.5 / 100', numCandidates: 3, clientReviewStatus: '3 of 5 curated · slow fill due to nonprofit budget' },
    interest: { total: 14, reviewed: 12, pending: 2 },
    intervention: { numActions: 8, numDays: 4 },
    outcome: { progressPct: 50, doneStops: 3, filledLink: null, currentState: 'Slow fill · 3 of 5 shortlist', currentMeta: '28 days on platform · nonprofit rate limiting candidate pool. Aiyana continuing outbound on technical writers.', hires: '0 / 1', confidenceColor: 'amber', confidenceLabel: 'Medium' },
  }),
};

const JOB_010: JobProfile = {
  id: 'job-010', atlasId: 'job-010-product',
  status: 'investigate', category: 'design',
  statusPillVariant: 'job-investigate', statusPillText: 'Flagged',
  postedMeta: 'Posted Apr 27, 2026 · 4 days on platform · investigation INV-2026-0033 open',
  title: 'Senior Product Designer (full-stack design)',
  client: CLIENT_RELIANCE,
  heroStats: [
    { label: 'Compensation', value: '$40–50', vSuffix: '/h', meta: 'USD · weekly cycle' },
    { label: 'Hours', value: '40+', vSuffix: '/wk', meta: 'flagged: over-scope' },
    { label: 'Engagement', value: 'Hourly · ongoing', valueSize: 'sm', meta: 'flagged: spec inflation' },
    { label: 'Specialist owner', value: 'Sarah R.', valueSize: 'sm', meta: 'Design specialist' },
    { label: 'Status', value: 'Flagged', valueSize: 'sm', meta: 'paused pending T&S review' },
  ],
  banner: { variant: 'danger', title: 'Flagged for investigation — INV-2026-0033', meta: 'Spec inflation suspected · 5+ disciplines in one role · 41 candidates expressed interest before pause · awaiting Trust & Safety review · sourcing halted' },
  owner: OWNER_SR,
  quickFacts: stubQuickFacts({ atlasId: 'job-010-product', client: CLIENT_RELIANCE, posted: 'Apr 27, 2026', days: '4 days · flagged Apr 30', category: 'Design · Product / system', comp: '$40–50/h · 40+h/wk', engType: 'Hourly · ongoing · scope under review', owner: 'Sarah Reilly (spec-003)', slaText: '✓ First match within 24h', lastActivity: '1d ago · flagged by Trust & Safety' }),
  tocMetas: { desc: '524w', match: '0/5', interest: '41', intervention: '4 acts', outcome: '0/1' },
  tocOkFlags: { desc: false, match: false, interest: false, intervention: false, outcome: false },
  ...stubJobSections({
    client: CLIENT_RELIANCE,
    job: { title: 'Senior Product Designer (full-stack design)', rate: '$40–50/h', hours: '40+/wk', category: 'Design', status: 'investigate', ownerName: 'Sarah R.' },
    match: { avgScore: 'n/a · paused', numCandidates: 0, clientReviewStatus: 'flagged for investigation · sourcing halted' },
    interest: { total: 41, reviewed: 35, pending: 6 },
    intervention: { numActions: 4, numDays: 2 },
    outcome: { progressPct: 20, doneStops: 1, filledLink: null, currentState: 'Flagged for investigation', currentMeta: 'INV-2026-0033 · spec inflation suspected · 5+ disciplines in one role · awaiting T&S review.', hires: '0 / 1', confidenceColor: 'danger', confidenceLabel: 'Under review' },
  }),
};

export const JOB_PROFILES: Record<string, JobProfile> = {
  'job-001': JOB_001,
  'job-002': JOB_002,
  'job-003': JOB_003,
  'job-004': JOB_004,
  'job-005': JOB_005,
  'job-006': JOB_006,
  'job-007': JOB_007,
  'job-008': JOB_008,
  'job-009': JOB_009,
  'job-010': JOB_010,
};

// ============================================================
// LIST ROWS — admin.html lines 22376-22562 verbatim
// ============================================================

export const JOB_LIST_ROWS: JobListRow[] = [
  {
    id: 'job-001', atlasId: 'job-001-fe2nuxt', status: 'open',
    statusPillVariant: 'job-shortlisted', statusPillText: 'Shortlisted 5/5',
    category: 'engineering', title: 'Senior Frontend Engineer (Vue / Nuxt)',
    client: { name: 'Studio Berlin', realLegalEntity: 'Atelier Werkraum GmbH' },
    jtClientIsReal: true,
    postedDate: 'Apr 26', postedRelative: '5 days ago',
    categoryLabel: 'Engineering', categorySub: 'Frontend / SPA',
    interestNum: 24, interestFillPct: 80, interestSub: '12 reviewed · 7 pending',
    hiresLabel: '0 / 1', hiresVariant: 'muted', hiresSub: 'awaiting client decision',
    owner: OWNER_DK,
  },
  {
    id: 'job-002', atlasId: 'job-002-emb', status: 'open',
    statusPillVariant: 'job-sourcing', statusPillText: 'Sourcing',
    category: 'engineering', title: 'Embedded Systems Lead',
    client: { name: 'Northwind Robotics', flagAndLocation: '🇸🇪 Stockholm' },
    jtClientIsReal: false,
    postedDate: 'Apr 19', postedRelative: '12 days ago',
    categoryLabel: 'Engineering', categorySub: 'Embedded / hardware',
    interestNum: 8, interestFillPct: 35, interestSub: 'niche role · slow build',
    hiresLabel: '0 / 1', hiresVariant: 'muted', hiresSub: 'no shortlist yet',
    owner: OWNER_DK,
  },
  {
    id: 'job-003', atlasId: 'job-003-devops', status: 'filled',
    statusPillVariant: 'job-filled', statusPillText: 'Filled',
    category: 'engineering', title: 'DevOps Engineer (AWS / K8s)',
    client: { name: 'Patagonia Mining Co.', flagAndLocation: '🇦🇷 Buenos Aires' },
    jtClientIsReal: false,
    postedDate: 'Apr 9', postedRelative: '22 days ago',
    categoryLabel: 'Engineering', categorySub: 'DevOps / SRE',
    interestNum: 31, interestFillPct: 100, interestSub: 'all reviewed · closed',
    hiresLabel: '1 / 1', hiresVariant: 'success', hiresSub: '→ eng-003 · 9-day TTH',
    owner: OWNER_MV, rowVariant: 'filled',
  },
  {
    id: 'job-004', atlasId: 'job-004-brand', status: 'open',
    statusPillVariant: 'job-shortlisted', statusPillText: 'Shortlisted 4/5',
    category: 'design', title: 'Brand Designer (Editorial)',
    client: { name: 'Studio Berlin', realLegalEntity: 'Atelier Werkraum GmbH' },
    jtClientIsReal: true,
    postedDate: 'Apr 28', postedRelative: '3 days ago',
    categoryLabel: 'Design', categorySub: 'Brand / editorial',
    interestNum: 18, interestFillPct: 60, interestSub: '8 reviewed · 6 pending',
    hiresLabel: '0 / 1', hiresVariant: 'muted', hiresSub: '1 slot to fill',
    owner: OWNER_SR,
  },
  {
    id: 'job-005', atlasId: 'job-005-mobile', status: 'paused',
    statusPillVariant: 'job-paused', statusPillText: 'Paused',
    category: 'engineering', title: 'Mobile Developer (Flutter)',
    client: { name: 'Solar Rio Energia', flagAndLocation: '🇧🇷 Rio de Janeiro' },
    jtClientIsReal: false,
    postedDate: 'Apr 22', postedRelative: '9 days ago',
    categoryLabel: 'Engineering', categorySub: 'Mobile / cross-platform',
    interestNum: 12, interestFillPct: 50, interestSub: 'paused 4d ago by client',
    hiresLabel: '0 / 1', hiresVariant: 'muted', hiresSub: 'on hold',
    owner: OWNER_MV,
  },
  {
    id: 'job-006', atlasId: 'job-006-data', status: 'closed',
    statusPillVariant: 'job-closed', statusPillText: 'Closed · no fit',
    category: 'data', title: 'Senior Data Engineer',
    client: { name: 'Helsinki Data Oy', flagAndLocation: '🇫🇮 Helsinki' },
    jtClientIsReal: false,
    postedDate: 'Apr 14', postedRelative: '17 days ago',
    categoryLabel: 'Data & ML', categorySub: 'Pipelines / dbt',
    interestNum: 26, interestFillPct: 100, interestSub: 'all reviewed · closed',
    hiresLabel: '0 / 1', hiresVariant: 'muted', hiresSub: 'client withdrew · refunded',
    owner: OWNER_LC,
  },
  {
    id: 'job-007', atlasId: 'job-007-cs', status: 'open',
    statusPillVariant: 'job-sourcing', statusPillText: 'Sourcing',
    category: 'sales', title: 'Customer Success Lead',
    client: { name: 'Andina Telecom S.A.', flagAndLocation: '🇨🇴 Bogotá' },
    jtClientIsReal: false,
    postedDate: 'Apr 29', postedRelative: '2 days ago',
    categoryLabel: 'Sales & CS', categorySub: 'B2B SaaS',
    interestNum: 4, interestFillPct: 20, interestSub: 'just posted · ramping',
    hiresLabel: '0 / 1', hiresVariant: 'muted', hiresSub: 'no shortlist yet',
    owner: OWNER_IM,
  },
  {
    id: 'job-008', atlasId: 'job-008-motion', status: 'filled',
    statusPillVariant: 'job-filled', statusPillText: 'Filled',
    category: 'design', title: 'Motion Designer (Fixed-price)',
    client: { name: 'Cinélux Studios', realLegalEntity: 'SAS Lumière' },
    jtClientIsReal: true,
    postedDate: 'Apr 23', postedRelative: '8 days ago',
    categoryLabel: 'Design', categorySub: 'Motion / video',
    interestNum: 19, interestFillPct: 100, interestSub: 'all reviewed · closed',
    hiresLabel: '1 / 1', hiresVariant: 'success', hiresSub: '→ eng-008 · 1-day TTH',
    owner: OWNER_SR, rowVariant: 'filled',
  },
  {
    id: 'job-009', atlasId: 'job-009-docs', status: 'open',
    statusPillVariant: 'job-shortlisted', statusPillText: 'Shortlisted 3/5',
    category: 'content', title: 'Documentation Writer (developer-focused)',
    client: { name: 'Berlin Open Source e.V.', flagAndLocation: '🇩🇪 Berlin · nonprofit rate' },
    jtClientIsReal: false,
    postedDate: 'Apr 3', postedRelative: '28 days ago',
    categoryLabel: 'Content', categorySub: 'Technical writing',
    interestNum: 14, interestFillPct: 60, interestSub: '12 reviewed · 2 pending',
    hiresLabel: '0 / 1', hiresVariant: 'muted', hiresSub: 'low budget · slow fill',
    owner: OWNER_AT,
  },
  {
    id: 'job-010', atlasId: 'job-010-product', status: 'investigate',
    statusPillVariant: 'job-investigate', statusPillText: 'Flagged',
    category: 'design', title: 'Senior Product Designer (full-stack design)',
    client: { name: 'Reliance Digital Pvt', flagAndLocation: '🇮🇳 Mumbai · INV-2026-0033' },
    jtClientIsReal: false,
    postedDate: 'Apr 27', postedRelative: '4 days ago',
    categoryLabel: 'Design', categorySub: 'Product / system',
    interestNum: 41, interestFillPct: 100, interestSub: 'spec inflation suspected',
    hiresLabel: '0 / 1', hiresVariant: 'muted', hiresSub: 'paused pending review',
    owner: OWNER_SR, rowVariant: 'investigate',
  },
];

// ============================================================
// PAGE DATA — admin.html lines 22300-22357
// ============================================================

export const JOBS_PAGE_DATA: JobsPageData = {
  pageMeta: '/admin/operations/job-postings · 184 jobs · 122 open · 38 filled this month · all sourcing audited',
  stats: [
    { label: 'Open jobs', value: '122', vSuffix: 'live', meta: 'avg 7 days on platform' },
    { label: 'Shortlists generated', value: '94', vSuffix: 'of 122', delta: { variant: 'up', text: '77%' }, meta: 'target 80% within 24h SLA' },
    { label: 'Filled this month', value: '38', vSuffix: 'jobs', meta: 'avg 11 days time-to-hire' },
    { label: 'Investigation flags', value: '3', vSuffix: 'jobs', meta: 'spec inflation suspected · 1 admin-flagged', metaVariant: 'warn' },
  ],
  filterChips: [
    { key: 'all', label: 'All', count: 10 },
    { key: 'open', label: 'Open', count: 5 },
    { key: 'paused', label: 'Paused', count: 1 },
    { key: 'filled', label: 'Filled', count: 2 },
    { key: 'closed', label: 'Closed', count: 1 },
    { key: 'flagged', label: 'Flagged', count: 1 },
  ],
  listRows: JOB_LIST_ROWS,
  totalCount: 184,
  rosterLabelMeta: 'Showing 10 of 184 · click any row for full detail',
  footerLabel: '10 of 184 jobs shown · canonical sample with realistic variety',
  loadMoreLabel: 'Load more (174 remaining) →',
};
