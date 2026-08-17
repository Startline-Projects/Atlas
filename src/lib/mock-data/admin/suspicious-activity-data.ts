/**
 * Phase 17 — Suspicious Activity mock data.
 *
 * Types + 9 list rows + canonical detail fixture for sa-2026-1042
 * + 8 stub detail profiles (basic info only).
 */

export type SuspiciousFreshness = 'new' | 'recent' | 'older' | 'escalated';
export type SuspiciousActivityType = 'geo' | 'velocity' | 'session' | 'payment' | 'pattern';
export type SuspiciousSignalStrength = 1 | 2 | 3 | 4 | 5;
export type SuspiciousRoleType = 'candidate' | 'client';
export type SuspiciousRowVariant = 'fresh' | 'escalated' | 'default';

export interface SuspiciousActivityRow {
  id: string;
  variant: SuspiciousRowVariant;
  freshness: SuspiciousFreshness;
  freshnessTime: string;
  candidateInitials: string;
  candidateAvatar: string;
  candidateName: string;
  description: string;
  candidateRole: SuspiciousRoleType;
  candidateId: string;
  descriptionMeta: string;
  activityType: SuspiciousActivityType;
  activityLabel: string;
  strength: SuspiciousSignalStrength;
  strengthLabel: string;
  timestamp: string;
  relativeTime: string;
  escalatedToFraudId?: string;
}

export const SUSPICIOUS_ACTIVITY_ROWS: SuspiciousActivityRow[] = [
  {
    id: 'sa-2026-1042',
    variant: 'fresh',
    freshness: 'new',
    freshnessTime: '14s',
    candidateInitials: 'RK',
    candidateAvatar: 'linear-gradient(135deg, #4F8BC9, #2C4F70)',
    candidateName: 'Rohan Kapoor',
    description: '4 logins from 3 countries / 18 min',
    candidateRole: 'candidate',
    candidateId: 'cand-1289',
    descriptionMeta: 'IN → DE → FR',
    activityType: 'geo',
    activityLabel: 'Geo anomaly',
    strength: 4,
    strengthLabel: '4 / 5',
    timestamp: '10:24:46',
    relativeTime: '14s ago',
  },
  {
    id: 'sa-2026-1041',
    variant: 'fresh',
    freshness: 'new',
    freshnessTime: '47s',
    candidateInitials: 'PA',
    candidateAvatar: 'linear-gradient(135deg, #C9A87A, #6E4F2F)',
    candidateName: 'Prashant Agarwal',
    description: '18 applications in 6 minutes',
    candidateRole: 'candidate',
    candidateId: 'cand-2841',
    descriptionMeta: '14× normal rate',
    activityType: 'velocity',
    activityLabel: 'Velocity',
    strength: 3,
    strengthLabel: '3 / 5',
    timestamp: '10:24:13',
    relativeTime: '47s ago',
  },
  {
    id: 'sa-2026-1038',
    variant: 'default',
    freshness: 'recent',
    freshnessTime: '3 min',
    candidateInitials: 'DM',
    candidateAvatar: 'linear-gradient(135deg, #8B7355, #5C4D38)',
    candidateName: 'Dirk Müller',
    description: 'session active 14h continuously',
    candidateRole: 'client',
    candidateId: 'cl-410',
    descriptionMeta: 'no idle gaps · possible bot',
    activityType: 'session',
    activityLabel: 'Session',
    strength: 2,
    strengthLabel: '2 / 5',
    timestamp: '10:21:48',
    relativeTime: '3 min ago',
  },
  {
    id: 'sa-2026-1031',
    variant: 'escalated',
    freshness: 'escalated',
    freshnessTime: 'Escalated',
    candidateInitials: 'VC',
    candidateAvatar: 'linear-gradient(135deg, #C41E3A, #7E1525)',
    candidateName: 'Vorona Capital',
    description: 'payment timing pattern detected',
    candidateRole: 'client',
    candidateId: 'cl-167',
    descriptionMeta: 'day 28-29 invoice payments',
    activityType: 'payment',
    activityLabel: 'Payment',
    strength: 5,
    strengthLabel: '5 / 5',
    timestamp: 'May 5 · 09:22',
    relativeTime: 'Escalated',
    escalatedToFraudId: 'fa-2026-0042',
  },
  {
    id: 'sa-2026-1029',
    variant: 'default',
    freshness: 'recent',
    freshnessTime: '12 min',
    candidateInitials: 'AS',
    candidateAvatar: 'linear-gradient(135deg, #6E4F8B, #3D2B4E)',
    candidateName: 'Aria Solanki',
    description: 'KYC re-submitted 4× in 2 days',
    candidateRole: 'candidate',
    candidateId: 'cand-1844',
    descriptionMeta: 'same doc with minor edits',
    activityType: 'pattern',
    activityLabel: 'Pattern',
    strength: 3,
    strengthLabel: '3 / 5',
    timestamp: '10:13:00',
    relativeTime: '12 min ago',
  },
  {
    id: 'sa-2026-1024',
    variant: 'default',
    freshness: 'recent',
    freshnessTime: '28 min',
    candidateInitials: 'NL',
    candidateAvatar: 'linear-gradient(135deg, #6B4226, #3F260F)',
    candidateName: 'Nordic Labs AB',
    description: '$24K outlier engagement',
    candidateRole: 'client',
    candidateId: 'cl-118',
    descriptionMeta: '6× their 90-day median',
    activityType: 'payment',
    activityLabel: 'Payment',
    strength: 2,
    strengthLabel: '2 / 5',
    timestamp: '09:57:14',
    relativeTime: '28 min ago',
  },
  {
    id: 'sa-2026-1011',
    variant: 'default',
    freshness: 'older',
    freshnessTime: '2h ago',
    candidateInitials: 'JT',
    candidateAvatar: 'linear-gradient(135deg, #5C8E5A, #2D4F2C)',
    candidateName: 'Jamal Toure',
    description: 'profile edited 22× in 1h',
    candidateRole: 'candidate',
    candidateId: 'cand-2104',
    descriptionMeta: 'skill section · headline · bio',
    activityType: 'pattern',
    activityLabel: 'Pattern',
    strength: 2,
    strengthLabel: '2 / 5',
    timestamp: '08:25:00',
    relativeTime: '2h ago',
  },
  {
    id: 'sa-2026-0998',
    variant: 'default',
    freshness: 'older',
    freshnessTime: '5h ago',
    candidateInitials: 'EA',
    candidateAvatar: 'linear-gradient(135deg, #8B4F6E, #4F2D3E)',
    candidateName: 'Elena Apostol',
    description: '8 referrals in 2 days · same IP cluster',
    candidateRole: 'candidate',
    candidateId: 'cand-678',
    descriptionMeta: 'referral-bonus farming?',
    activityType: 'pattern',
    activityLabel: 'Pattern',
    strength: 3,
    strengthLabel: '3 / 5',
    timestamp: '05:38:00',
    relativeTime: '5h ago',
  },
  {
    id: 'sa-2026-0982',
    variant: 'default',
    freshness: 'older',
    freshnessTime: '8h ago',
    candidateInitials: 'TF',
    candidateAvatar: 'linear-gradient(135deg, #707070, #404040)',
    candidateName: 'Tomek Filipowski',
    description: 'failed login 4× then OK',
    candidateRole: 'candidate',
    candidateId: 'cand-991',
    descriptionMeta: 'auto-dismissed · normal user pattern',
    activityType: 'session',
    activityLabel: 'Session',
    strength: 1,
    strengthLabel: '1 / 5',
    timestamp: '02:42:00',
    relativeTime: '8h ago',
  },
];

export const SUSPICIOUS_ACTIVITY_PAGE_HEADER = {
  title: 'Suspicious activity',
  meta: '/admin/trust-safety/suspicious-activity · 142 events in last 24h · 3 escalated to fraud · 67 dismissed',
  newIndicator: '12 new in last 5 min',
  liveIndicator: 'Live · streaming',
};

export interface SuspiciousSeverityCard {
  id: 'high' | 'medium' | 'low' | 'critical';
  label: string;
  count: string;
  meta: string;
}

export const SUSPICIOUS_ACTIVITY_SEVERITY_CARDS: SuspiciousSeverityCard[] = [
  { id: 'high', label: 'High strength', count: '9', meta: '3 unreviewed · last 24h · auto-pages on s5' },
  { id: 'medium', label: 'Medium strength', count: '42', meta: 'last 24h · 28 reviewed · 14 pending' },
  { id: 'low', label: 'Low strength', count: '91', meta: 'last 24h · most auto-dismissed' },
  { id: 'critical', label: 'Escalated to fraud', count: '3', meta: 'last 7d · all became confirmed fraud alerts' },
];

export interface SuspiciousFilterChip {
  id: string;
  label: string;
  count: string;
}

export const SUSPICIOUS_ACTIVITY_FILTER_CHIPS: SuspiciousFilterChip[] = [
  { id: 'all', label: 'All', count: '142' },
  { id: 'new', label: 'New', count: '24' },
  { id: 'reviewing', label: 'Reviewing', count: '8' },
  { id: 'legit', label: 'Marked legit', count: '38' },
  { id: 'watchlisted', label: 'Watchlisted', count: '14' },
  { id: 'escalated', label: 'Escalated', count: '3' },
];

export const SUSPICIOUS_ACTIVITY_STREAM_BAR = {
  lastEvent: '14s ago',
  avgRate: '6 events / min',
  autoActions: {
    dismissed: 47,
    watchlisted: 8,
  },
};

export const SUSPICIOUS_ACTIVITY_LIST_FOOTER =
  '9 of 142 events shown · canonical sample · live feed paginated by hour · auto-refresh 5s';

/* ─────────────────────────────────────────
   Detail fixture types
   ───────────────────────────────────────── */

export interface SuspiciousEventRow {
  label: string;
  value: string;
  variant?: 'normal' | 'warn' | 'danger';
  code?: string;
  suffix?: string;
}

export interface SuspiciousMapLocation {
  cx: number;
  cy: number;
  variant: 'normal' | 'danger' | 'amber';
  pulse?: boolean;
  label: string;
  time: string;
}

export interface SuspiciousFeature {
  level: 'high' | 'med' | 'low';
  name: string;
  detail: string;
  barPercent: number;
  weight: string;
  weightPositive: boolean;
}

export interface SuspiciousRelatedEvent {
  id: string;
  title: string;
  detail: string;
  strength: SuspiciousSignalStrength;
  strengthLabel: string;
  time: string;
}

export interface SuspiciousQuickStatRow {
  label: string;
  value: string;
  variant?: 'normal' | 'warn' | 'danger';
  link?: string;
  active?: boolean; // for rubric "(here)" highlight
}

export interface SuspiciousActivityProfile {
  id: string;
  atlasId: string;
  freshness: SuspiciousFreshness;
  freshnessTime: string;
  type: SuspiciousActivityType;
  typeLabel: string;
  heroVariant: 'medium' | 'high' | 'danger';
  timestamp: string;
  relativeTime: string;
  detectionMethod: string;
  title: string;
  subtitle: string;
  candidateName: string;
  candidateId: string;
  candidateRole: SuspiciousRoleType;
  strength: SuspiciousSignalStrength;
  strengthLabel: string;
  aiConfidence: number;

  /* hero stats */
  heroStats: Array<{ label: string; value: string; variant?: 'normal' | 'warn' | 'danger'; meta: string }>;

  /* pattern card */
  pattern?: {
    variant?: 'lime' | 'danger';
    clusterId: string;
    title: string;
    stats: Array<{ label: string; value: string; meta: string }>;
    narrative: string;
    linkedFraudId?: string;
    linkedFraudLabel?: string;
  };

  /* §01 event details */
  eventDetails: SuspiciousEventRow[];
  mapTrail?: {
    locations: SuspiciousMapLocation[];
  };

  /* §02 AI confidence */
  features: SuspiciousFeature[];

  /* §03 related events */
  related: SuspiciousRelatedEvent[];

  /* rail */
  atAGlance: SuspiciousQuickStatRow[];
  decisionRubric: SuspiciousQuickStatRow[];
}

export const SUSPICIOUS_ACTIVITY_PROFILES: Record<string, SuspiciousActivityProfile> = {
  'sa-2026-1042': {
    id: 'sa-2026-1042',
    atlasId: 'SA-2026-1042',
    freshness: 'new',
    freshnessTime: '14s ago',
    type: 'geo',
    typeLabel: 'Geo anomaly',
    heroVariant: 'medium',
    timestamp: '10:24:46 UTC',
    relativeTime: '14s ago',
    detectionMethod: 'auto-flagged · unreviewed',
    title: '4 logins from 3 countries in 18 minutes — possible session hijacking',
    subtitle:
      'logged in from 4 distinct IPs across India → Germany → France → Germany within 18 minutes. Each transition exceeds plausible physical travel time. AI confidence: 71% suspicious. Could be: (a) credential compromise, (b) coordinated VPN test, or (c) a legitimate user with multiple devices on different networks. Account flagged for review · no auto-action taken.',
    candidateName: 'Rohan Kapoor',
    candidateId: 'cand-1289',
    candidateRole: 'candidate',
    strength: 4,
    strengthLabel: '4 / 5',
    aiConfidence: 71,
    heroStats: [
      { label: 'Signal strength', value: '4 / 5', variant: 'warn', meta: 'High · auto-pages on 5' },
      { label: 'AI confidence', value: '71%', variant: 'warn', meta: 'suspicious vs benign' },
      { label: 'Transitions', value: '3 countries', meta: 'in 18 min · ~4500km traversal' },
      { label: 'Pattern siblings', value: '6 events', meta: 'from 6 accounts · same hour' },
    ],
    pattern: {
      variant: 'lime',
      clusterId: 'CLUSTER 2026-04-A',
      title: 'Possibly part of a wider "rapid geo-traversal" cluster',
      stats: [
        { label: 'Sibling events', value: '6', meta: 'from 6 different accounts in last 60 min' },
        { label: 'Common IP block', value: '/16', meta: '3 of 6 share the Frankfurt DC range' },
        { label: 'Cluster confidence', value: '84%', meta: 'if confirmed, escalates to FA-2026-XXXX' },
      ],
      narrative:
        'Six accounts — all candidates — have shown rapid geo-traversal patterns within the last hour. Three (50%) share a common IP block in Frankfurt that overlaps with the Vorona Capital ring. This may be coincidence (datacenter VPN, common ISP) or coordination. Recommended: watchlist all 6 for 48h and re-cluster after the next round of events. Auto-watchlist already applied to siblings; this event is the most recent.',
      linkedFraudId: 'fa-2026-0042',
      linkedFraudLabel: 'Open FA-2026-0042',
    },
    eventDetails: [
      { label: 'Event ID', value: '', code: 'SA-2026-1042' },
      { label: 'Triggered rule', value: 'geo-traversal-impossible-v3', variant: 'warn' },
      { label: 'Subject account', value: ' · Rohan Kapoor', code: 'cand-1289' },
      { label: 'Account age', value: '142 days' },
      { label: 'Login 1', value: '10:06:18 UTC · IN · Mumbai · 49.36.x.x' },
      { label: 'Login 2', value: '10:09:41 UTC · DE · Frankfurt · 217.182.x.x · (~6,400 km)', variant: 'warn' },
      { label: 'Login 3', value: '10:18:02 UTC · FR · Paris · 51.158.x.x · (~480 km)', variant: 'warn' },
      { label: 'Login 4', value: '10:24:46 UTC · DE · Frankfurt · 217.182.x.x · (~480 km)', variant: 'danger' },
      { label: 'Devices', value: '3 distinct user-agent strings' },
      { label: 'Auth method', value: 'password + 2FA TOTP (all 4 logins)' },
      { label: 'Account status', value: 'active · in good standing' },
      { label: 'Auto-action', value: 'flagged for review · no block', variant: 'warn' },
    ],
    mapTrail: {
      locations: [
        { cx: 480, cy: 110, variant: 'normal', label: 'Mumbai 10:06', time: '10:06' },
        { cx: 265, cy: 80, variant: 'danger', pulse: true, label: 'Frankfurt 10:09 / 10:24', time: '10:09 / 10:24' },
        { cx: 225, cy: 92, variant: 'amber', label: 'Paris 10:18', time: '10:18' },
      ],
    },
    features: [
      {
        level: 'high',
        name: 'Travel-time impossibility',
        detail: '3 transitions in 18 min · 6,400km in 3.5 min',
        barPercent: 92,
        weight: '+0.42',
        weightPositive: true,
      },
      {
        level: 'med',
        name: 'Datacenter IP origin',
        detail: '2 of 4 logins from cloud DCs (residential expected)',
        barPercent: 68,
        weight: '+0.18',
        weightPositive: true,
      },
      {
        level: 'med',
        name: 'Cluster correlation',
        detail: '5 sibling events in same /16 within 60 min',
        barPercent: 56,
        weight: '+0.14',
        weightPositive: true,
      },
      {
        level: 'low',
        name: '2FA succeeded each time',
        detail: 'Reduces hijack likelihood (legit token-holder)',
        barPercent: 38,
        weight: '−0.21',
        weightPositive: false,
      },
      {
        level: 'low',
        name: 'Account in good standing',
        detail: '142d age · no prior flags · 4.7★ rating',
        barPercent: 28,
        weight: '−0.18',
        weightPositive: false,
      },
    ],
    related: [
      {
        id: 'sa-2026-1041',
        title: 'Prashant Agarwal · 18 applications in 6 minutes',
        detail: 'cand-2841 · velocity flag · same /16 IP block',
        strength: 3,
        strengthLabel: '3 / 5',
        time: '47s ago',
      },
      {
        id: 'sa-2026-1037',
        title: 'Mira Chowdhury · login from new device + DE IP',
        detail: 'cand-1156 · session flag · cluster sibling',
        strength: 3,
        strengthLabel: '3 / 5',
        time: '8 min ago',
      },
      {
        id: 'sa-2026-1033',
        title: 'Same account · earlier login from FR datacenter',
        detail: 'cand-1289 · same flagged subject · 22 min ago · auto-correlated',
        strength: 2,
        strengthLabel: '2 / 5',
        time: '22 min ago',
      },
      {
        id: 'sa-2026-1027',
        title: 'Tariq Al-Sayed · IP block /16 match',
        detail: 'cand-1402 · session flag · cluster sibling',
        strength: 2,
        strengthLabel: '2 / 5',
        time: '35 min ago',
      },
      {
        id: 'sa-2026-1019',
        title: 'Kavya Subramaniam · 3-country login pattern',
        detail: 'cand-1844 · geo flag · same hour',
        strength: 4,
        strengthLabel: '4 / 5',
        time: '52 min ago',
      },
    ],
    atAGlance: [
      { label: 'Account', value: 'cand-1289 →', link: '/admin/users/candidates/cand-1289' },
      { label: 'Account age', value: '142 days' },
      { label: 'Prior flags', value: 'None' },
      { label: 'Current rating', value: '4.7 ★ · 6 engagements' },
      { label: 'Subject score', value: '−14 · last 30d', variant: 'warn' },
      { label: 'Cluster', value: '2026-04-A →', variant: 'warn' },
      { label: 'Cluster siblings', value: '6 events · 6 accounts' },
      { label: 'Auto-action', value: 'Flagged · review' },
      { label: 'Audit log', value: '12 events →' },
    ],
    decisionRubric: [
      { label: 'If < 25%', value: 'Auto-dismissed' },
      { label: 'If 25-65%', value: 'Watchlist · monitor' },
      { label: 'If 65-85%', value: 'Manual review (here)', variant: 'warn', active: true },
      { label: 'If > 85%', value: 'Auto-escalate to fraud', variant: 'danger' },
    ],
  },

  /* ───────── Event 2: Prashant Agarwal — VELOCITY ───────── */
  'sa-2026-1041': {
    id: 'sa-2026-1041',
    atlasId: 'SA-2026-1041',
    freshness: 'new',
    freshnessTime: '47s',
    type: 'velocity',
    typeLabel: 'Velocity',
    heroVariant: 'medium',
    timestamp: '10:24:13 UTC',
    relativeTime: '47s ago',
    detectionMethod: 'auto-flagged · unreviewed',
    title: '18 job applications in 6 minutes — possible automation',
    subtitle:
      'submitted 18 applications across the platform in a 6-minute window — 14× their baseline rate. Identical cover letter detected on 14 of 18 submissions. Could be: (a) bot-driven scraping, (b) browser automation extension, or (c) panic-applying after a layoff. Account flagged for manual review.',
    candidateName: 'Prashant Agarwal',
    candidateId: 'cand-2841',
    candidateRole: 'candidate',
    strength: 3,
    strengthLabel: '3 / 5',
    aiConfidence: 62,
    heroStats: [
      { label: 'Signal strength', value: '3 / 5', variant: 'warn', meta: 'Medium · queue for review' },
      { label: 'AI confidence', value: '62%', variant: 'warn', meta: 'suspicious vs benign' },
      { label: 'Application rate', value: '14×', meta: 'baseline 1.3 / hour' },
      { label: 'Pattern siblings', value: '4 events', meta: 'in cluster 2026-04-V' },
    ],
    pattern: {
      variant: 'lime',
      clusterId: 'CLUSTER 2026-04-V',
      title: 'Possibly part of automated-application spike pattern',
      stats: [
        { label: 'Sibling events', value: '4', meta: 'velocity flags in last 90 min' },
        { label: 'Avg rate', value: '12×', meta: 'baseline across cluster accounts' },
        { label: 'Cluster confidence', value: '62%', meta: 'monitor · not yet auto-escalating' },
      ],
      narrative:
        'Four candidates have triggered application-velocity flags within the last 90 minutes — each exceeding 10× their personal baseline. Three of the four share a common /24 IP range from a residential ISP in Mumbai. The pattern is consistent with a coordinated post-layoff burst OR with a single actor running a browser-automation script. Recommended: watchlist all 4 for 48h and re-cluster after the next round of velocity events.',
    },
    eventDetails: [
      { label: 'Event ID', value: '', code: 'SA-2026-1041' },
      { label: 'Triggered rule', value: 'velocity-application-spike-v2', variant: 'warn' },
      { label: 'Subject account', value: ' · Prashant Agarwal', code: 'cand-2841' },
      { label: 'Account age', value: '87 days' },
      { label: 'Application 1', value: '10:18:22 UTC · job-4128 · Senior FE Engineer · Acme' },
      { label: 'Application 2', value: '10:18:51 UTC · job-3982 · Lead Eng · Northwind' },
      { label: 'Application 3', value: '10:19:14 UTC · job-4201 · Staff Eng · Initech' },
      { label: 'Burst window', value: '18 apps in 6 min — peak 5 apps in 38s', variant: 'warn' },
      { label: 'Cover letter overlap', value: '14 of 18 share 96% text similarity', variant: 'warn' },
      { label: 'Devices', value: '1 user-agent (Chrome 132 / macOS)' },
      { label: 'Auth method', value: 'password + 2FA TOTP' },
      { label: 'Auto-action', value: 'flagged for review · no block', variant: 'warn' },
    ],
    features: [
      { level: 'high', name: 'Application velocity anomaly', detail: '14× baseline rate · 18 apps in 6 min', barPercent: 88, weight: '+0.38', weightPositive: true },
      { level: 'med', name: 'Cover-letter template reuse', detail: 'Identical text on 14 of 18 submissions', barPercent: 72, weight: '+0.21', weightPositive: true },
      { level: 'med', name: 'No prior application history', detail: 'First applications on the platform in 60+ days', barPercent: 58, weight: '+0.16', weightPositive: true },
      { level: 'low', name: '2FA succeeded', detail: 'Token-holder confirmation — not pure bot', barPercent: 38, weight: '−0.18', weightPositive: false },
      { level: 'low', name: 'Profile completeness 100%', detail: 'Real candidate profile · not throwaway', barPercent: 32, weight: '−0.15', weightPositive: false },
    ],
    related: [
      { id: 'sa-2026-1042', title: 'Rohan Kapoor · 4 logins from 3 countries / 18 min', detail: 'cand-1289 · geo flag · same /16 IP block as cluster siblings', strength: 4, strengthLabel: '4 / 5', time: '14s ago' },
      { id: 'sa-2026-1037', title: 'Sachin Verma · 11 applications in 4 minutes', detail: 'cand-2204 · velocity flag · cluster sibling · auto-correlated', strength: 3, strengthLabel: '3 / 5', time: '12 min ago' },
      { id: 'sa-2026-1029', title: 'Aria Solanki · KYC re-submitted 4× in 2 days', detail: 'cand-1844 · pattern flag · same hour', strength: 3, strengthLabel: '3 / 5', time: '12 min ago' },
    ],
    atAGlance: [
      { label: 'Account', value: 'cand-2841 →', link: '/admin/users/candidates/cand-2841' },
      { label: 'Account age', value: '87 days' },
      { label: 'Prior flags', value: 'None' },
      { label: 'Current rating', value: 'Unrated · 0 engagements' },
      { label: 'Subject score', value: '−6 · last 30d', variant: 'warn' },
      { label: 'Cluster', value: '2026-04-V →', variant: 'warn' },
      { label: 'Cluster siblings', value: '4 events · 4 accounts' },
      { label: 'Auto-action', value: 'Flagged · review' },
      { label: 'Audit log', value: '7 events →' },
    ],
    decisionRubric: [
      { label: 'If < 25%', value: 'Auto-dismissed' },
      { label: 'If 25-65%', value: 'Watchlist · monitor (here)', variant: 'warn', active: true },
      { label: 'If 65-85%', value: 'Manual review' },
      { label: 'If > 85%', value: 'Auto-escalate to fraud', variant: 'danger' },
    ],
  },

  /* ───────── Event 3: Dirk Müller — SESSION ───────── */
  'sa-2026-1038': {
    id: 'sa-2026-1038',
    atlasId: 'SA-2026-1038',
    freshness: 'recent',
    freshnessTime: '3 min',
    type: 'session',
    typeLabel: 'Session',
    heroVariant: 'medium',
    timestamp: '10:21:48 UTC',
    relativeTime: '3 min ago',
    detectionMethod: 'auto-flagged · unreviewed',
    title: 'Session active 14 hours continuously with no idle gaps',
    subtitle:
      'has held an authenticated session continuously for 14 hours with zero mouse-idle events and identical request cadence (every 28-32s). Could be: (a) legitimate automation tool polling dashboards, (b) abandoned tab kept alive by a heartbeat, or (c) automated scraping. No bot user-agent in headers.',
    candidateName: 'Dirk Müller',
    candidateId: 'cl-410',
    candidateRole: 'client',
    strength: 2,
    strengthLabel: '2 / 5',
    aiConfidence: 41,
    heroStats: [
      { label: 'Signal strength', value: '2 / 5', meta: 'Low · review when capacity allows' },
      { label: 'AI confidence', value: '41%', variant: 'warn', meta: 'suspicious vs benign' },
      { label: 'Session duration', value: '14h 03m', meta: 'no idle gaps · still active' },
      { label: 'Action cadence', value: '~30s', meta: 'request every 28-32s · σ=1.4s' },
    ],
    pattern: {
      variant: 'lime',
      clusterId: 'CLUSTER 2026-04-S',
      title: 'Continuous session with no human idle signals',
      stats: [
        { label: 'Sibling events', value: '2', meta: 'long-session flags in last 24h' },
        { label: 'Median duration', value: '11.4h', meta: 'across cluster accounts' },
        { label: 'Cluster confidence', value: '38%', meta: 'low · most are legit polling' },
      ],
      narrative:
        'Three clients have shown 10h+ continuous sessions in the last 24 hours. Two of the three are known integration partners polling our reporting API. Account cl-410 has no recorded integration agreement, which is why this one was flagged. Recommended: contact the account to confirm whether an internal tool is keeping the session alive, or expire the session and observe re-auth behavior.',
    },
    eventDetails: [
      { label: 'Event ID', value: '', code: 'SA-2026-1038' },
      { label: 'Triggered rule', value: 'session-no-idle-14h-v1', variant: 'warn' },
      { label: 'Subject account', value: ' · Dirk Müller (Müller Logistik GmbH)', code: 'cl-410' },
      { label: 'Account age', value: '618 days' },
      { label: 'Session start', value: '2026-05-11 20:18:47 UTC · DE · Hamburg · 95.91.x.x' },
      { label: 'Session duration', value: '14h 03m and counting' },
      { label: 'Idle gaps > 60s', value: '0 detected', variant: 'warn' },
      { label: 'Action cadence', value: 'Every 28-32s (σ=1.4s)' },
      { label: 'Top action', value: 'GET /engagements/list (92% of requests)' },
      { label: 'Devices', value: '1 user-agent (Chrome 132 / Windows)' },
      { label: 'Auth method', value: 'password + 2FA TOTP (single login)' },
      { label: 'Auto-action', value: 'flagged for review · no expiration', variant: 'warn' },
    ],
    features: [
      { level: 'med', name: 'Zero idle gaps', detail: 'No mouse/keyboard idle events > 60s in 14h', barPercent: 72, weight: '+0.22', weightPositive: true },
      { level: 'med', name: 'Identical request cadence', detail: 'σ=1.4s across thousands of requests', barPercent: 64, weight: '+0.18', weightPositive: true },
      { level: 'low', name: 'No bot UA in headers', detail: 'Standard Chrome user-agent · not a known scraper', barPercent: 42, weight: '−0.08', weightPositive: false },
      { level: 'low', name: 'Account in good standing', detail: '618d age · paid · 17 engagements', barPercent: 36, weight: '−0.14', weightPositive: false },
      { level: 'low', name: 'Same IP throughout', detail: 'No session-token theft pattern', barPercent: 28, weight: '−0.12', weightPositive: false },
    ],
    related: [
      { id: 'sa-2026-0982', title: 'Tomek Filipowski · failed login 4× then OK', detail: 'cand-991 · session flag · auto-dismissed · benign', strength: 1, strengthLabel: '1 / 5', time: '8h ago' },
      { id: 'sa-2026-0941', title: 'Vega Industrial · 11h continuous session', detail: 'cl-228 · session flag · confirmed integration partner', strength: 1, strengthLabel: '1 / 5', time: '22h ago' },
      { id: 'sa-2026-0924', title: 'Northstar AG · 10h session · idle-gap missing', detail: 'cl-371 · session flag · pending review', strength: 2, strengthLabel: '2 / 5', time: '1d ago' },
    ],
    atAGlance: [
      { label: 'Account', value: 'cl-410 →', link: '/admin/users/clients/cl-410' },
      { label: 'Account age', value: '618 days' },
      { label: 'Prior flags', value: 'None' },
      { label: 'Current rating', value: '4.9 ★ · 17 engagements' },
      { label: 'Subject score', value: '−3 · last 30d', variant: 'warn' },
      { label: 'Cluster', value: '2026-04-S →' },
      { label: 'Cluster siblings', value: '2 events · 2 accounts' },
      { label: 'Auto-action', value: 'Flagged · review' },
      { label: 'Audit log', value: '4 events →' },
    ],
    decisionRubric: [
      { label: 'If < 25%', value: 'Auto-dismissed' },
      { label: 'If 25-65%', value: 'Watchlist · monitor (here)', variant: 'warn', active: true },
      { label: 'If 65-85%', value: 'Manual review' },
      { label: 'If > 85%', value: 'Auto-escalate to fraud', variant: 'danger' },
    ],
  },

  /* ───────── Event 4: Vorona Capital — PAYMENT — ESCALATED ───────── */
  'sa-2026-1031': {
    id: 'sa-2026-1031',
    atlasId: 'SA-2026-1031',
    freshness: 'escalated',
    freshnessTime: 'Escalated',
    type: 'payment',
    typeLabel: 'Payment',
    heroVariant: 'danger',
    timestamp: 'May 5 · 09:22 UTC',
    relativeTime: 'Escalated',
    detectionMethod: 'auto-escalated to FA-2026-0042',
    title: 'Payment timing pattern matched Vorona ring — escalated to fraud',
    subtitle:
      'paid 14 invoices on day 28-29 of the billing cycle over the last 90 days — a timing pattern consistent with deliberate late-payment fraud strategies. Pattern matched against the Vorona Capital ring on May 5 at 09:22 UTC by the anomaly classifier (94% confidence) and auto-escalated to fraud case FA-2026-0042.',
    candidateName: 'Vorona Capital',
    candidateId: 'cl-167',
    candidateRole: 'client',
    strength: 5,
    strengthLabel: '5 / 5',
    aiConfidence: 94,
    heroStats: [
      { label: 'Signal strength', value: '5 / 5', variant: 'danger', meta: 'Critical · auto-paged' },
      { label: 'AI confidence', value: '94%', variant: 'danger', meta: 'above auto-escalate threshold' },
      { label: 'Invoices flagged', value: '14 / 14', meta: '100% on day 28-29 · 0% earlier' },
      { label: 'Ring confidence', value: '97%', variant: 'danger', meta: 'Vorona ring · FA-2026-0042' },
    ],
    pattern: {
      variant: 'danger',
      clusterId: 'CLUSTER VORONA-RING',
      title: 'Confirmed match to the Vorona Capital fraud ring',
      stats: [
        { label: 'Ring siblings', value: '7', meta: 'all confirmed fraud · FA-2026-0042 et al' },
        { label: 'Payment pattern', value: 'D28-D29', meta: '14 of 14 invoices · 100% match' },
        { label: 'Ring confidence', value: '97%', meta: 'auto-escalated · case opened' },
      ],
      narrative:
        'Account cl-167 (Vorona Capital) matches the Vorona Capital ring fraud pattern with 97% confidence. The ring exploits the platform billing cycle by paying every invoice on the last possible day (D28-D29), maximizing float and intentionally triggering reminder fees that they then dispute. Seven satellite accounts have been confirmed in the ring. This event was auto-escalated and the fraud case is now active.',
      linkedFraudId: 'fa-2026-0042',
      linkedFraudLabel: 'Open FA-2026-0042',
    },
    eventDetails: [
      { label: 'Event ID', value: '', code: 'SA-2026-1031' },
      { label: 'Triggered rule', value: 'payment-late-cycle-ring-match-v3', variant: 'danger' },
      { label: 'Subject account', value: ' · Vorona Capital', code: 'cl-167' },
      { label: 'Account age', value: '224 days' },
      { label: 'Pattern window', value: 'Mar 1 → May 5 · 14 invoices · 14 D28-D29 payments', variant: 'danger' },
      { label: 'Largest delayed invoice', value: '$48,200 · paid D29 · triggered $1,205 reminder fee', variant: 'warn' },
      { label: 'Disputes opened', value: '11 of 14 reminder fees disputed by Vorona', variant: 'warn' },
      { label: 'Linked accounts', value: '7 ring satellites — all auto-correlated', variant: 'danger' },
      { label: 'Devices', value: '3 user-agents (1 shared with sibling rings)' },
      { label: 'Auth method', value: 'password + 2FA TOTP · no anomalies' },
      { label: 'Account status', value: 'active · in good standing on the surface' },
      { label: 'Auto-action', value: 'auto-escalated to FA-2026-0042 · payments paused', variant: 'danger' },
    ],
    features: [
      { level: 'high', name: 'Ring pattern match', detail: 'Vorona D28-D29 payment-then-dispute pattern', barPercent: 97, weight: '+0.51', weightPositive: true },
      { level: 'high', name: 'Dispute rate anomaly', detail: '79% of reminder fees disputed (baseline 4%)', barPercent: 88, weight: '+0.32', weightPositive: true },
      { level: 'med', name: 'Shared device fingerprint', detail: '1 UA matches sibling ring account', barPercent: 64, weight: '+0.18', weightPositive: true },
      { level: 'med', name: 'Invoice timing variance', detail: 'σ < 4h across 14 payments (baseline σ=72h)', barPercent: 56, weight: '+0.14', weightPositive: true },
      { level: 'low', name: '2FA succeeded', detail: 'Token-holder confirmed · not account takeover', barPercent: 34, weight: '−0.12', weightPositive: false },
    ],
    related: [
      { id: 'sa-2026-1024', title: 'Nordic Labs AB · $24K outlier engagement', detail: 'cl-118 · payment flag · adjacent ring candidate', strength: 2, strengthLabel: '2 / 5', time: '28 min ago' },
      { id: 'sa-2026-0998', title: 'Elena Apostol · 8 referrals in 2 days', detail: 'cand-678 · pattern flag · IP overlap with Vorona ring', strength: 3, strengthLabel: '3 / 5', time: '5h ago' },
      { id: 'sa-2026-1042', title: 'Rohan Kapoor · geo traversal', detail: 'cand-1289 · geo flag · Frankfurt DC overlap with ring IPs', strength: 4, strengthLabel: '4 / 5', time: '14s ago' },
    ],
    atAGlance: [
      { label: 'Account', value: 'cl-167 →', link: '/admin/users/clients/cl-167' },
      { label: 'Account age', value: '224 days' },
      { label: 'Prior flags', value: '3', variant: 'danger' },
      { label: 'Current rating', value: '4.2 ★ · 11 engagements' },
      { label: 'Subject score', value: '−42 · last 30d', variant: 'danger' },
      { label: 'Cluster', value: 'Vorona ring →', variant: 'danger', link: '/admin/trust-safety/fraud-abuse/fa-2026-0042' },
      { label: 'Cluster siblings', value: '7 events · 7 accounts' },
      { label: 'Auto-action', value: 'Escalated · case open', variant: 'danger' },
      { label: 'Audit log', value: '38 events →' },
    ],
    decisionRubric: [
      { label: 'If < 25%', value: 'Auto-dismissed' },
      { label: 'If 25-65%', value: 'Watchlist · monitor' },
      { label: 'If 65-85%', value: 'Manual review' },
      { label: 'If > 85%', value: 'Auto-escalate to fraud (here)', variant: 'danger', active: true },
    ],
  },

  /* ───────── Event 5: Aria Solanki — PATTERN (KYC) ───────── */
  'sa-2026-1029': {
    id: 'sa-2026-1029',
    atlasId: 'SA-2026-1029',
    freshness: 'recent',
    freshnessTime: '12 min',
    type: 'pattern',
    typeLabel: 'Pattern',
    heroVariant: 'medium',
    timestamp: '10:13:00 UTC',
    relativeTime: '12 min ago',
    detectionMethod: 'auto-flagged · unreviewed',
    title: 'KYC document re-submitted 4 times in 2 days with minor edits',
    subtitle:
      'submitted the same identity document four times in 48 hours, each version differing by 1-3 pixel-level changes on the signature line and the address block. Could be: (a) legitimate quality fixes after rejection, (b) identity verification farming, or (c) document forgery iteration to find a version the OCR accepts.',
    candidateName: 'Aria Solanki',
    candidateId: 'cand-1844',
    candidateRole: 'candidate',
    strength: 3,
    strengthLabel: '3 / 5',
    aiConfidence: 58,
    heroStats: [
      { label: 'Signal strength', value: '3 / 5', variant: 'warn', meta: 'Medium · queue for review' },
      { label: 'AI confidence', value: '58%', variant: 'warn', meta: 'suspicious vs benign' },
      { label: 'Submissions', value: '4 in 48h', meta: 'baseline 1 per onboarding' },
      { label: 'Doc similarity', value: '99.2%', meta: 'pixel-diff across versions' },
    ],
    pattern: {
      variant: 'lime',
      clusterId: 'CLUSTER 2026-04-K',
      title: 'KYC iteration pattern across multiple accounts',
      stats: [
        { label: 'Sibling events', value: '3', meta: 'KYC iteration flags in last 7d' },
        { label: 'Avg edits', value: '3.7×', meta: 'submissions per account' },
        { label: 'Cluster confidence', value: '54%', meta: 'monitor · not yet escalating' },
      ],
      narrative:
        'Three candidates have submitted the same identity document 3+ times within 48 hours, each version with minor pixel-level edits. The pattern is most often seen when a forger is iterating to find a version that passes OCR — but it also appears when a legitimate candidate is struggling with a low-quality phone scan. Recommended: cross-check the candidate location with their submitted ID, and watchlist for 14d.',
    },
    eventDetails: [
      { label: 'Event ID', value: '', code: 'SA-2026-1029' },
      { label: 'Triggered rule', value: 'kyc-iterative-resubmit-v2', variant: 'warn' },
      { label: 'Subject account', value: ' · Aria Solanki', code: 'cand-1844' },
      { label: 'Account age', value: '4 days' },
      { label: 'Submission 1', value: 'May 11 · 14:02 UTC · Indian passport · rejected (signature unclear)' },
      { label: 'Submission 2', value: 'May 11 · 22:18 UTC · same document · signature edited · rejected (address)', variant: 'warn' },
      { label: 'Submission 3', value: 'May 12 · 07:44 UTC · address block edited · rejected (font mismatch)', variant: 'warn' },
      { label: 'Submission 4', value: 'May 12 · 10:13 UTC · font corrected · pending review', variant: 'warn' },
      { label: 'Pixel diff between v1 and v4', value: '99.2% identical · differences localized to 2 regions' },
      { label: 'Devices', value: '1 user-agent (Safari / iPhone)' },
      { label: 'Auth method', value: 'password + email magic link' },
      { label: 'Auto-action', value: 'flagged for review · KYC pipeline paused', variant: 'warn' },
    ],
    features: [
      { level: 'med', name: 'Iterative edit pattern', detail: '4 submissions · pixel diffs localized to rejection-trigger regions', barPercent: 76, weight: '+0.24', weightPositive: true },
      { level: 'med', name: 'New account', detail: '4 days old · onboarding incomplete', barPercent: 62, weight: '+0.16', weightPositive: true },
      { level: 'med', name: 'OCR confidence trending up', detail: 'each version scores higher · suggests fitting to OCR', barPercent: 58, weight: '+0.14', weightPositive: true },
      { level: 'low', name: 'Consistent device + IP', detail: 'Same iPhone · same residential network · no impersonation', barPercent: 38, weight: '−0.12', weightPositive: false },
      { level: 'low', name: 'No prior fraud flags', detail: 'Clean signup history · no linked flagged accounts', barPercent: 28, weight: '−0.10', weightPositive: false },
    ],
    related: [
      { id: 'sa-2026-1011', title: 'Jamal Toure · profile edited 22× in 1h', detail: 'cand-2104 · pattern flag · same iteration behavior on profile', strength: 2, strengthLabel: '2 / 5', time: '2h ago' },
      { id: 'sa-2026-0998', title: 'Elena Apostol · 8 referrals in 2 days', detail: 'cand-678 · pattern flag · adjacent cluster', strength: 3, strengthLabel: '3 / 5', time: '5h ago' },
      { id: 'sa-2026-1042', title: 'Rohan Kapoor · geo traversal', detail: 'cand-1289 · geo flag · same hour', strength: 4, strengthLabel: '4 / 5', time: '14s ago' },
    ],
    atAGlance: [
      { label: 'Account', value: 'cand-1844 →', link: '/admin/users/candidates/cand-1844' },
      { label: 'Account age', value: '4 days' },
      { label: 'Prior flags', value: 'None' },
      { label: 'Current rating', value: 'Unrated · 0 engagements' },
      { label: 'Subject score', value: '−8 · last 30d', variant: 'warn' },
      { label: 'Cluster', value: '2026-04-K →', variant: 'warn' },
      { label: 'Cluster siblings', value: '3 events · 3 accounts' },
      { label: 'Auto-action', value: 'Flagged · review' },
      { label: 'Audit log', value: '12 events →' },
    ],
    decisionRubric: [
      { label: 'If < 25%', value: 'Auto-dismissed' },
      { label: 'If 25-65%', value: 'Watchlist · monitor (here)', variant: 'warn', active: true },
      { label: 'If 65-85%', value: 'Manual review' },
      { label: 'If > 85%', value: 'Auto-escalate to fraud', variant: 'danger' },
    ],
  },

  /* ───────── Event 6: Nordic Labs AB — PAYMENT (outlier) ───────── */
  'sa-2026-1024': {
    id: 'sa-2026-1024',
    atlasId: 'SA-2026-1024',
    freshness: 'recent',
    freshnessTime: '28 min',
    type: 'payment',
    typeLabel: 'Payment',
    heroVariant: 'medium',
    timestamp: '09:57:14 UTC',
    relativeTime: '28 min ago',
    detectionMethod: 'auto-flagged · unreviewed',
    title: '$24,000 engagement payment — 6× their 90-day median',
    subtitle:
      'paid a single engagement invoice of $24,000 — six times their 90-day median of $4,100. Could be: (a) a legitimate new high-value project, (b) account compromise, or (c) money-flow anomaly via the platform. Payment cleared from their usual SEPA processor and went to a beneficiary they have used before.',
    candidateName: 'Nordic Labs AB',
    candidateId: 'cl-118',
    candidateRole: 'client',
    strength: 2,
    strengthLabel: '2 / 5',
    aiConfidence: 34,
    heroStats: [
      { label: 'Signal strength', value: '2 / 5', meta: 'Low · routine review' },
      { label: 'AI confidence', value: '34%', meta: 'suspicious vs benign' },
      { label: 'Outlier ratio', value: '6.0×', meta: 'vs 90-day median' },
      { label: 'Same beneficiary', value: 'Yes · 3 prior', meta: 'cand-3010 · same Talent Specialist' },
    ],
    pattern: {
      variant: 'lime',
      clusterId: 'CLUSTER 2026-04-P',
      title: 'High-value engagement outlier — single occurrence',
      stats: [
        { label: 'Sibling events', value: '0', meta: 'no other accounts match in last 30d' },
        { label: 'Account history', value: '11 engagements', meta: 'all from same Specialist · all paid' },
        { label: 'Cluster confidence', value: '14%', meta: 'isolated event · low' },
      ],
      narrative:
        'This is an isolated high-value payment that exceeds the account 90-day median by 6×, but the beneficiary (a senior consultant) has been engaged 3 times before. The simplest explanation is a legitimate large project signoff. Recommended action: ask the Talent Specialist to confirm scope, and watch the engagement to ensure deliverables match the value.',
    },
    eventDetails: [
      { label: 'Event ID', value: '', code: 'SA-2026-1024' },
      { label: 'Triggered rule', value: 'payment-amount-outlier-v1', variant: 'warn' },
      { label: 'Subject account', value: ' · Nordic Labs AB', code: 'cl-118' },
      { label: 'Account age', value: '432 days' },
      { label: 'Payment amount', value: '$24,000.00 USD' },
      { label: '90-day median', value: '$4,100.00 USD · σ=$1,840' },
      { label: 'Outlier ratio', value: '6.0× the median · 8.1σ', variant: 'warn' },
      { label: 'Processor', value: 'SEPA · account ending 4192 · used 11/11 prior payments' },
      { label: 'Beneficiary', value: 'cand-3010 · used 3× prior (avg $5,800)' },
      { label: 'Engagement scope', value: 'eng-3142 · "Q2 platform migration" · 6-week project' },
      { label: 'Authorizing user', value: 'cl-118-admin (Sven Larsson · 2FA confirmed)' },
      { label: 'Auto-action', value: 'flagged for review · payment cleared', variant: 'warn' },
    ],
    features: [
      { level: 'med', name: 'Amount outlier', detail: '6× the 90-day median · 8.1σ above baseline', barPercent: 68, weight: '+0.18', weightPositive: true },
      { level: 'low', name: 'New engagement scope size', detail: '6 weeks · double the typical 3-week project', barPercent: 44, weight: '+0.08', weightPositive: true },
      { level: 'low', name: 'Known beneficiary', detail: 'cand-3010 paid 3× before · trusted relationship', barPercent: 36, weight: '−0.10', weightPositive: false },
      { level: 'low', name: 'Same processor + account', detail: 'No new payment method · no account-takeover signal', barPercent: 32, weight: '−0.12', weightPositive: false },
      { level: 'low', name: 'Authorizing user 2FA confirmed', detail: 'Sven Larsson · same device · no anomaly', barPercent: 28, weight: '−0.14', weightPositive: false },
    ],
    related: [
      { id: 'sa-2026-1031', title: 'Vorona Capital · payment timing ring match', detail: 'cl-167 · payment flag · auto-escalated · FA-2026-0042', strength: 5, strengthLabel: '5 / 5', time: 'Escalated' },
      { id: 'sa-2026-0998', title: 'Elena Apostol · referral cluster', detail: 'cand-678 · pattern flag · adjacent', strength: 3, strengthLabel: '3 / 5', time: '5h ago' },
    ],
    atAGlance: [
      { label: 'Account', value: 'cl-118 →', link: '/admin/users/clients/cl-118' },
      { label: 'Account age', value: '432 days' },
      { label: 'Prior flags', value: 'None' },
      { label: 'Current rating', value: '4.8 ★ · 11 engagements' },
      { label: 'Subject score', value: '+2 · last 30d' },
      { label: 'Cluster', value: '2026-04-P' },
      { label: 'Cluster siblings', value: '0 events · isolated' },
      { label: 'Auto-action', value: 'Flagged · review' },
      { label: 'Audit log', value: '3 events →' },
    ],
    decisionRubric: [
      { label: 'If < 25%', value: 'Auto-dismissed' },
      { label: 'If 25-65%', value: 'Watchlist · monitor (here)', variant: 'warn', active: true },
      { label: 'If 65-85%', value: 'Manual review' },
      { label: 'If > 85%', value: 'Auto-escalate to fraud', variant: 'danger' },
    ],
  },

  /* ───────── Event 7: Jamal Toure — PATTERN (profile churn) ───────── */
  'sa-2026-1011': {
    id: 'sa-2026-1011',
    atlasId: 'SA-2026-1011',
    freshness: 'older',
    freshnessTime: '2h ago',
    type: 'pattern',
    typeLabel: 'Pattern',
    heroVariant: 'medium',
    timestamp: '08:25:00 UTC',
    relativeTime: '2h ago',
    detectionMethod: 'auto-flagged · unreviewed',
    title: 'Profile edited 22 times in 1 hour — section churn',
    subtitle:
      'edited their candidate profile 22 times in a single 60-minute window — touching the skills section, headline, and bio repeatedly. Could be: (a) A/B testing against the search algorithm to surface in more queries, (b) iteratively crafting an identity to look more senior, or (c) a long-overdue cleanup session.',
    candidateName: 'Jamal Toure',
    candidateId: 'cand-2104',
    candidateRole: 'candidate',
    strength: 2,
    strengthLabel: '2 / 5',
    aiConfidence: 28,
    heroStats: [
      { label: 'Signal strength', value: '2 / 5', meta: 'Low · routine review' },
      { label: 'AI confidence', value: '28%', meta: 'suspicious vs benign' },
      { label: 'Edits / hour', value: '22', meta: 'baseline 0.4 / day' },
      { label: 'Sections', value: '3', meta: 'skills · headline · bio' },
    ],
    pattern: {
      variant: 'lime',
      clusterId: 'CLUSTER 2026-04-X',
      title: 'Profile-churn pattern · search-rank optimization',
      stats: [
        { label: 'Sibling events', value: '5', meta: 'profile-churn flags in last 30d' },
        { label: 'Median edits', value: '18', meta: 'across cluster accounts' },
        { label: 'Cluster confidence', value: '32%', meta: 'low · most are benign optimization' },
      ],
      narrative:
        'Six candidates have shown high-frequency profile editing in the last month, with edits concentrated in skills/headline/bio — the three fields that influence search ranking. The pattern is consistent with someone reverse-engineering the search algorithm. None of the six have prior fraud flags. Recommended: no action beyond a soft watchlist · re-check in 14 days.',
    },
    eventDetails: [
      { label: 'Event ID', value: '', code: 'SA-2026-1011' },
      { label: 'Triggered rule', value: 'profile-churn-rate-v1' },
      { label: 'Subject account', value: ' · Jamal Toure', code: 'cand-2104' },
      { label: 'Account age', value: '218 days' },
      { label: 'Edit window', value: '07:25 → 08:25 UTC · 22 edits' },
      { label: 'Sections affected', value: 'skills (11 edits) · headline (7) · bio (4)' },
      { label: 'Edit type', value: 'reorder + reword · no new entries · no removals' },
      { label: 'Specialist tag added', value: 'No · search-relevant only · suggests SEO play' },
      { label: 'Devices', value: '1 user-agent (Chrome 132 / macOS)' },
      { label: 'Auth method', value: 'password + 2FA TOTP' },
      { label: 'Account status', value: 'active · in good standing · 4 prior engagements' },
      { label: 'Auto-action', value: 'flagged for review · no profile lock' },
    ],
    features: [
      { level: 'low', name: 'Edit frequency anomaly', detail: '22 edits/hour vs 0.4/day baseline', barPercent: 56, weight: '+0.14', weightPositive: true },
      { level: 'low', name: 'Search-relevant sections only', detail: 'No tax/identity edits · pure search optimization', barPercent: 42, weight: '+0.10', weightPositive: true },
      { level: 'low', name: 'No skill embellishment', detail: 'Reorder + reword only · no new skills added', barPercent: 32, weight: '−0.12', weightPositive: false },
      { level: 'low', name: 'No engagement claim changes', detail: 'Prior engagement entries untouched', barPercent: 28, weight: '−0.16', weightPositive: false },
      { level: 'low', name: 'Account in good standing', detail: '218d · no prior flags · 4 paid engagements', barPercent: 22, weight: '−0.18', weightPositive: false },
    ],
    related: [
      { id: 'sa-2026-1029', title: 'Aria Solanki · KYC re-submitted 4× in 2 days', detail: 'cand-1844 · pattern flag · same iteration behavior', strength: 3, strengthLabel: '3 / 5', time: '12 min ago' },
      { id: 'sa-2026-0998', title: 'Elena Apostol · 8 referrals in 2 days', detail: 'cand-678 · pattern flag · adjacent cluster', strength: 3, strengthLabel: '3 / 5', time: '5h ago' },
      { id: 'sa-2026-1041', title: 'Prashant Agarwal · 18 applications / 6 min', detail: 'cand-2841 · velocity flag · cluster adjacent', strength: 3, strengthLabel: '3 / 5', time: '47s ago' },
    ],
    atAGlance: [
      { label: 'Account', value: 'cand-2104 →', link: '/admin/users/candidates/cand-2104' },
      { label: 'Account age', value: '218 days' },
      { label: 'Prior flags', value: 'None' },
      { label: 'Current rating', value: '4.5 ★ · 4 engagements' },
      { label: 'Subject score', value: '−1 · last 30d' },
      { label: 'Cluster', value: '2026-04-X' },
      { label: 'Cluster siblings', value: '5 events · 5 accounts' },
      { label: 'Auto-action', value: 'Flagged · review' },
      { label: 'Audit log', value: '8 events →' },
    ],
    decisionRubric: [
      { label: 'If < 25%', value: 'Auto-dismissed' },
      { label: 'If 25-65%', value: 'Watchlist · monitor (here)', variant: 'warn', active: true },
      { label: 'If 65-85%', value: 'Manual review' },
      { label: 'If > 85%', value: 'Auto-escalate to fraud', variant: 'danger' },
    ],
  },

  /* ───────── Event 8: Elena Apostol — PATTERN (referral cluster) ───────── */
  'sa-2026-0998': {
    id: 'sa-2026-0998',
    atlasId: 'SA-2026-0998',
    freshness: 'older',
    freshnessTime: '5h ago',
    type: 'pattern',
    typeLabel: 'Pattern',
    heroVariant: 'medium',
    timestamp: '05:38:00 UTC',
    relativeTime: '5h ago',
    detectionMethod: 'auto-flagged · unreviewed',
    title: '8 referrals in 2 days — all referees share the same /24 IP block',
    subtitle:
      'submitted 8 referrals to the platform over 48 hours. All 8 referred candidates created accounts from IPs in the same /24 block (Bucharest residential ISP). Could be: (a) office colleagues or family, (b) coordinated referral-bonus farming, or (c) a single actor controlling all 8 accounts.',
    candidateName: 'Elena Apostol',
    candidateId: 'cand-678',
    candidateRole: 'candidate',
    strength: 3,
    strengthLabel: '3 / 5',
    aiConfidence: 47,
    heroStats: [
      { label: 'Signal strength', value: '3 / 5', variant: 'warn', meta: 'Medium · queue for review' },
      { label: 'AI confidence', value: '47%', meta: 'suspicious vs benign' },
      { label: 'Referrals', value: '8 in 48h', meta: 'baseline 0.1 / week' },
      { label: 'Same /24 IP', value: '8 of 8', variant: 'warn', meta: '203.0.113.x · Bucharest ISP' },
    ],
    pattern: {
      variant: 'lime',
      clusterId: 'CLUSTER 2026-04-R',
      title: 'Referral-farming cluster · same-IP referees',
      stats: [
        { label: 'Sibling events', value: '2', meta: 'referral-cluster flags in last 14d' },
        { label: 'Median referrals', value: '6', meta: 'across cluster · all SHARE IP blocks' },
        { label: 'Cluster confidence', value: '49%', meta: 'monitor · pause referral bonus' },
      ],
      narrative:
        'Three accounts have generated 6+ referrals in short windows where all referees share an IP block. The simplest legitimate explanation is an office where colleagues sign up together — but the bonus payout per referral makes this an attractive abuse vector. Recommended: pause the referral bonus for this account until at least 3 of the 8 referees pass a 30-day engagement check.',
    },
    eventDetails: [
      { label: 'Event ID', value: '', code: 'SA-2026-0998' },
      { label: 'Triggered rule', value: 'referral-ip-cluster-v1', variant: 'warn' },
      { label: 'Subject account', value: ' · Elena Apostol', code: 'cand-678' },
      { label: 'Account age', value: '94 days' },
      { label: 'Referral window', value: 'May 10 10:00 → May 12 05:38 UTC · 8 referrals' },
      { label: 'Referees', value: 'cand-3401 → cand-3408 · all created within 4 days' },
      { label: 'Referee IP block', value: '203.0.113.0/24 · Bucharest residential', variant: 'warn' },
      { label: 'Referee engagement', value: '0 of 8 have completed onboarding · all KYC pending', variant: 'warn' },
      { label: 'Subject IP', value: '92.84.x.x · Bucharest · same city (different ISP)' },
      { label: 'Devices', value: '1 user-agent on subject · 8 distinct UAs across referees' },
      { label: 'Auth method', value: 'password + email magic link' },
      { label: 'Auto-action', value: 'flagged for review · referral bonus held', variant: 'warn' },
    ],
    features: [
      { level: 'med', name: 'IP block clustering', detail: '8 of 8 referees share /24 · p < 0.001 random', barPercent: 78, weight: '+0.22', weightPositive: true },
      { level: 'med', name: 'Referral velocity', detail: '8 in 48h vs 0.1/week baseline', barPercent: 64, weight: '+0.16', weightPositive: true },
      { level: 'low', name: 'No referee engagement yet', detail: '0 of 8 have completed KYC or first engagement', barPercent: 48, weight: '+0.10', weightPositive: true },
      { level: 'low', name: 'Subject account legitimate', detail: '94d age · 2 engagements · 4.6 ★', barPercent: 36, weight: '−0.10', weightPositive: false },
      { level: 'low', name: 'Distinct referee UAs', detail: '8 different browsers/devices · not single-actor', barPercent: 28, weight: '−0.12', weightPositive: false },
    ],
    related: [
      { id: 'sa-2026-1029', title: 'Aria Solanki · KYC re-submitted 4× in 2 days', detail: 'cand-1844 · pattern flag · similar account-creation behavior', strength: 3, strengthLabel: '3 / 5', time: '12 min ago' },
      { id: 'sa-2026-1011', title: 'Jamal Toure · profile edited 22× in 1h', detail: 'cand-2104 · pattern flag · cluster adjacent', strength: 2, strengthLabel: '2 / 5', time: '2h ago' },
      { id: 'sa-2026-1031', title: 'Vorona Capital · payment timing ring match', detail: 'cl-167 · payment flag · IP block overlap', strength: 5, strengthLabel: '5 / 5', time: 'Escalated' },
    ],
    atAGlance: [
      { label: 'Account', value: 'cand-678 →', link: '/admin/users/candidates/cand-678' },
      { label: 'Account age', value: '94 days' },
      { label: 'Prior flags', value: 'None' },
      { label: 'Current rating', value: '4.6 ★ · 2 engagements' },
      { label: 'Subject score', value: '−9 · last 30d', variant: 'warn' },
      { label: 'Cluster', value: '2026-04-R →', variant: 'warn' },
      { label: 'Cluster siblings', value: '2 events · 2 accounts' },
      { label: 'Auto-action', value: 'Bonus held · review' },
      { label: 'Audit log', value: '14 events →' },
    ],
    decisionRubric: [
      { label: 'If < 25%', value: 'Auto-dismissed' },
      { label: 'If 25-65%', value: 'Watchlist · monitor (here)', variant: 'warn', active: true },
      { label: 'If 65-85%', value: 'Manual review' },
      { label: 'If > 85%', value: 'Auto-escalate to fraud', variant: 'danger' },
    ],
  },

  /* ───────── Event 9: Tomek Filipowski — SESSION (auto-dismissed) ───────── */
  'sa-2026-0982': {
    id: 'sa-2026-0982',
    atlasId: 'SA-2026-0982',
    freshness: 'older',
    freshnessTime: '8h ago',
    type: 'session',
    typeLabel: 'Session',
    heroVariant: 'medium',
    timestamp: '02:42:00 UTC',
    relativeTime: '8h ago',
    detectionMethod: 'auto-dismissed · benign pattern',
    title: '4 failed login attempts then successful auth — auto-dismissed',
    subtitle:
      'failed 4 password attempts in a row, then completed a successful login via the password-reset email flow. Time gaps between failed attempts (5-15 minutes) and the successful reset suggest a normal "forgot password" recovery, not credential stuffing. Auto-classifier confidence: 88% benign. No action required.',
    candidateName: 'Tomek Filipowski',
    candidateId: 'cand-991',
    candidateRole: 'candidate',
    strength: 1,
    strengthLabel: '1 / 5',
    aiConfidence: 12,
    heroStats: [
      { label: 'Signal strength', value: '1 / 5', meta: 'Negligible · auto-dismissed' },
      { label: 'AI confidence', value: '12%', meta: 'suspicious vs benign (88% benign)' },
      { label: 'Recovery method', value: 'Email link', meta: 'used legitimate reset flow' },
      { label: 'Same device', value: 'Yes', meta: 'across all 5 attempts' },
    ],
    pattern: {
      variant: 'lime',
      clusterId: 'CLUSTER 2026-04-N',
      title: 'Normal forgot-password pattern (no cluster)',
      stats: [
        { label: 'Sibling events', value: '0', meta: 'no cluster — isolated benign event' },
        { label: 'Time gaps', value: '5-15 min', meta: 'between failed attempts · human-paced' },
        { label: 'Cluster confidence', value: '4%', meta: 'auto-dismissed' },
      ],
      narrative:
        'This event matches the standard "forgot password and then used email reset" pattern. Time gaps between failed attempts (5-15 minutes) are consistent with a real user trying remembered variants, not a credential-stuffing bot (which typically tries 100s/second). The reset link was used from the same device and IP. The classifier auto-dismissed this event and no action was taken.',
    },
    eventDetails: [
      { label: 'Event ID', value: '', code: 'SA-2026-0982' },
      { label: 'Triggered rule', value: 'session-failed-then-recovery-v1' },
      { label: 'Subject account', value: ' · Tomek Filipowski', code: 'cand-991' },
      { label: 'Account age', value: '371 days' },
      { label: 'Failed attempt 1', value: '02:21 UTC · password incorrect · PL · Warsaw · 89.74.x.x' },
      { label: 'Failed attempt 2', value: '02:28 UTC · same password · 7 min later · same IP' },
      { label: 'Failed attempt 3', value: '02:33 UTC · variant password · 5 min later · same IP' },
      { label: 'Failed attempt 4', value: '02:39 UTC · variant password · 6 min later · same IP' },
      { label: 'Password reset request', value: '02:40 UTC · email link clicked at 02:41 UTC' },
      { label: 'Successful auth', value: '02:42 UTC · same device · same IP · new password set' },
      { label: 'Devices', value: '1 user-agent throughout (Firefox 130 / Windows)' },
      { label: 'Auto-action', value: 'auto-dismissed · no flag retained' },
    ],
    features: [
      { level: 'low', name: 'Human-paced attempt interval', detail: '5-15 min between attempts — too slow for bot', barPercent: 18, weight: '−0.18', weightPositive: false },
      { level: 'low', name: 'Same device throughout', detail: 'Firefox 130/Windows · no device-switching anomaly', barPercent: 16, weight: '−0.16', weightPositive: false },
      { level: 'low', name: 'Recovery via email link', detail: 'Used legitimate reset flow · proves email control', barPercent: 14, weight: '−0.21', weightPositive: false },
      { level: 'low', name: 'Same IP throughout', detail: 'Single Polish residential IP · no proxy/Tor signal', barPercent: 12, weight: '−0.14', weightPositive: false },
      { level: 'low', name: 'Account in good standing', detail: '371d age · 8 engagements · 4.8 ★', barPercent: 10, weight: '−0.12', weightPositive: false },
    ],
    related: [
      { id: 'sa-2026-1038', title: 'Dirk Müller · 14h continuous session', detail: 'cl-410 · session flag · open · same category', strength: 2, strengthLabel: '2 / 5', time: '3 min ago' },
    ],
    atAGlance: [
      { label: 'Account', value: 'cand-991 →', link: '/admin/users/candidates/cand-991' },
      { label: 'Account age', value: '371 days' },
      { label: 'Prior flags', value: 'None' },
      { label: 'Current rating', value: '4.8 ★ · 8 engagements' },
      { label: 'Subject score', value: '+4 · last 30d' },
      { label: 'Cluster', value: '— · isolated' },
      { label: 'Cluster siblings', value: '0 events' },
      { label: 'Auto-action', value: 'Dismissed' },
      { label: 'Audit log', value: '2 events →' },
    ],
    decisionRubric: [
      { label: 'If < 25%', value: 'Auto-dismissed (here)', active: true },
      { label: 'If 25-65%', value: 'Watchlist · monitor' },
      { label: 'If 65-85%', value: 'Manual review' },
      { label: 'If > 85%', value: 'Auto-escalate to fraud', variant: 'danger' },
    ],
  },
};

/**
 * Stub detail profiles for non-canonical IDs — minimal hero data only.
 */
export interface SuspiciousActivityStubProfile {
  id: string;
  atlasId: string;
  freshness: SuspiciousFreshness;
  freshnessTime: string;
  type: SuspiciousActivityType;
  typeLabel: string;
  timestamp: string;
  relativeTime: string;
  title: string;
  candidateName: string;
  candidateId: string;
  candidateRole: SuspiciousRoleType;
  strength: SuspiciousSignalStrength;
  strengthLabel: string;
}

export const SUSPICIOUS_ACTIVITY_STUBS: Record<string, SuspiciousActivityStubProfile> = {
  'sa-2026-1041': {
    id: 'sa-2026-1041',
    atlasId: 'SA-2026-1041',
    freshness: 'new',
    freshnessTime: '47s ago',
    type: 'velocity',
    typeLabel: 'Velocity',
    timestamp: '10:24:13 UTC',
    relativeTime: '47s ago',
    title: '18 applications in 6 minutes — velocity flag',
    candidateName: 'Prashant Agarwal',
    candidateId: 'cand-2841',
    candidateRole: 'candidate',
    strength: 3,
    strengthLabel: '3 / 5',
  },
  'sa-2026-1038': {
    id: 'sa-2026-1038',
    atlasId: 'SA-2026-1038',
    freshness: 'recent',
    freshnessTime: '3 min ago',
    type: 'session',
    typeLabel: 'Session',
    timestamp: '10:21:48 UTC',
    relativeTime: '3 min ago',
    title: 'Session active 14h continuously — possible bot',
    candidateName: 'Dirk Müller',
    candidateId: 'cl-410',
    candidateRole: 'client',
    strength: 2,
    strengthLabel: '2 / 5',
  },
  'sa-2026-1031': {
    id: 'sa-2026-1031',
    atlasId: 'SA-2026-1031',
    freshness: 'escalated',
    freshnessTime: 'Escalated',
    type: 'payment',
    typeLabel: 'Payment',
    timestamp: 'May 5 · 09:22 UTC',
    relativeTime: 'Escalated',
    title: 'Payment timing pattern detected — day 28-29 invoice payments',
    candidateName: 'Vorona Capital',
    candidateId: 'cl-167',
    candidateRole: 'client',
    strength: 5,
    strengthLabel: '5 / 5',
  },
  'sa-2026-1029': {
    id: 'sa-2026-1029',
    atlasId: 'SA-2026-1029',
    freshness: 'recent',
    freshnessTime: '12 min ago',
    type: 'pattern',
    typeLabel: 'Pattern',
    timestamp: '10:13:00 UTC',
    relativeTime: '12 min ago',
    title: 'KYC re-submitted 4× in 2 days — same doc with minor edits',
    candidateName: 'Aria Solanki',
    candidateId: 'cand-1844',
    candidateRole: 'candidate',
    strength: 3,
    strengthLabel: '3 / 5',
  },
  'sa-2026-1024': {
    id: 'sa-2026-1024',
    atlasId: 'SA-2026-1024',
    freshness: 'recent',
    freshnessTime: '28 min ago',
    type: 'payment',
    typeLabel: 'Payment',
    timestamp: '09:57:14 UTC',
    relativeTime: '28 min ago',
    title: '$24K outlier engagement — 6× their 90-day median',
    candidateName: 'Nordic Labs AB',
    candidateId: 'cl-118',
    candidateRole: 'client',
    strength: 2,
    strengthLabel: '2 / 5',
  },
  'sa-2026-1011': {
    id: 'sa-2026-1011',
    atlasId: 'SA-2026-1011',
    freshness: 'older',
    freshnessTime: '2h ago',
    type: 'pattern',
    typeLabel: 'Pattern',
    timestamp: '08:25:00 UTC',
    relativeTime: '2h ago',
    title: 'Profile edited 22× in 1h — skill section · headline · bio',
    candidateName: 'Jamal Toure',
    candidateId: 'cand-2104',
    candidateRole: 'candidate',
    strength: 2,
    strengthLabel: '2 / 5',
  },
  'sa-2026-0998': {
    id: 'sa-2026-0998',
    atlasId: 'SA-2026-0998',
    freshness: 'older',
    freshnessTime: '5h ago',
    type: 'pattern',
    typeLabel: 'Pattern',
    timestamp: '05:38:00 UTC',
    relativeTime: '5h ago',
    title: '8 referrals in 2 days · same IP cluster — referral-bonus farming?',
    candidateName: 'Elena Apostol',
    candidateId: 'cand-678',
    candidateRole: 'candidate',
    strength: 3,
    strengthLabel: '3 / 5',
  },
  'sa-2026-0982': {
    id: 'sa-2026-0982',
    atlasId: 'SA-2026-0982',
    freshness: 'older',
    freshnessTime: '8h ago',
    type: 'session',
    typeLabel: 'Session',
    timestamp: '02:42:00 UTC',
    relativeTime: '8h ago',
    title: 'Failed login 4× then OK — auto-dismissed as normal user pattern',
    candidateName: 'Tomek Filipowski',
    candidateId: 'cand-991',
    candidateRole: 'candidate',
    strength: 1,
    strengthLabel: '1 / 5',
  },
};

export const SUSPICIOUS_ACTIVITY_DETAIL_IDS = [
  'sa-2026-1042',
  'sa-2026-1041',
  'sa-2026-1038',
  'sa-2026-1031',
  'sa-2026-1029',
  'sa-2026-1024',
  'sa-2026-1011',
  'sa-2026-0998',
  'sa-2026-0982',
];
