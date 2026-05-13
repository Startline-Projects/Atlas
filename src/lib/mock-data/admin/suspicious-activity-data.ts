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
    clusterId: string;
    title: string;
    stats: Array<{ label: string; value: string; meta: string }>;
    narrative: string;
    linkedFraudId?: string;
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
      clusterId: 'CLUSTER 2026-04-A',
      title: 'Possibly part of a wider "rapid geo-traversal" cluster',
      stats: [
        { label: 'Sibling events', value: '6', meta: 'from 6 different accounts in last 60 min' },
        { label: 'Common IP block', value: '/16', meta: '3 of 6 share the Frankfurt DC range' },
        { label: 'Cluster confidence', value: '84%', meta: 'if confirmed, escalates to FA-2026-XXXX' },
      ],
      narrative:
        'Six accounts — all candidates — have shown rapid geo-traversal patterns within the last hour. Three (50%) share a common IP block in Frankfurt that overlaps with the Vorona Capital ring (FA-2026-0042). This may be coincidence (datacenter VPN, common ISP) or coordination. Recommended: watchlist all 6 for 48h and re-cluster after the next round of events. Auto-watchlist already applied to siblings; this event is the most recent.',
      linkedFraudId: 'fa-2026-0042',
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
