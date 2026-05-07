// ============================================================
// USERS DATA — All 5 tabs
// Data extracted verbatim from reference/admin.html lines 14896–15914
// ============================================================

// Candidate Status enum (from status-pill classes in HTML)
export type CandidateStatus = 'live' | 'pipeline' | 'suspended' | 'banned';

// Client Status enum
export type ClientStatus = 'verified' | 'unverified' | 'banned';

// Specialist Status enum (daily status pills)
export type SpecialistStatus = 'on-track' | 'caseload-high' | 'on-break';

// Admin Role enum
export type AdminRole = 'operations' | 'super-admin' | 'trust-safety' | 'finance' | 'compliance';

// ============================================================
// TAB NAME TYPE
// ============================================================
export type TabName = 'candidates' | 'clients' | 'specialists' | 'manager' | 'admins';

// ============================================================
// TABLE CONFIGURATION TYPES
// ============================================================
export interface TableColumn {
  id: string;
  label: string;
  sortable?: boolean;
}

export interface PaginationButton {
  label: string;
  action: string;
  disabled?: boolean;
}

export interface PaginationConfig {
  text: string;
  buttons: PaginationButton[];
}

export interface BulkAction {
  label: string;
  action: string;
  variant?: 'danger';
}

export interface TabConfig {
  columns: TableColumn[];
  gridCols: string;
  pagination: PaginationConfig;
  searchPlaceholder: string;
  bulkActions?: BulkAction[];
  exportLabel?: string;
  primaryCta?: { label: string; action: string; variant?: 'primary' };
}

// ============================================================
// STATS CELL TYPE (for stats strip)
// ============================================================
export interface StatCell {
  label: string;
  value: string;
  delta?: { direction: 'up' | 'down' | 'flat'; percent: string };
  suffix?: string;
  meta: string;
  metaType?: 'default' | 'warn' | 'danger';
  valuePrefix?: string;
}

// ============================================================
// FILTER CHIP TYPE (for toolbar)
// ============================================================
export interface FilterChip {
  id: string;
  trigger?: 'status' | 'country' | 'category' | 'joined' | 'role';
  label: string;
  activeValue?: string;
  options?: string[];
}

// ============================================================
// CANDIDATE USER TYPE
// ============================================================
export interface CandidateUser {
  id: string;
  name: string;
  email: string;
  country: string;
  flag: string;
  title: string;
  status: CandidateStatus;
  joinedMonth: string;
  lastActive: string;
  lastActiveType: 'fresh' | 'regular' | 'never'; // Controls .fresh class styling
  hiresCount: number | string; // '—' for in review
  hiresAmount: string;
  hiresStatus: 'completed' | 'in-review' | 'zero'; // Controls .empty class styling
}

// ============================================================
// CLIENT USER TYPE
// ============================================================
export interface ClientUser {
  id: string;
  name: string;
  email: string;
  country: string;
  flag: string;
  industry: string;
  status: ClientStatus;
  joinedMonth: string;
  lastActive: string;
  lastActiveType: 'fresh' | 'regular' | 'never';
  spendCount: number | string; // Number or "0" for empty
  spendAmount: string; // "$184,300" or "in onboarding"
  spendStatus: 'completed' | 'empty'; // Controls .empty class styling
}

// ============================================================
// SPECIALIST USER TYPE
// ============================================================
export interface SpecialistUser {
  id: string;
  name: string;
  email: string;
  region: string;
  caseload: number;
  status: SpecialistStatus;
  slaPercent: number;
  reviewsCount: number;
  disputesCount: number;
}

// ============================================================
// ADMIN USER TYPE
// ============================================================
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  lastLogin: string;
  twoFa: 'enabled' | 'disabled';
  ipCount: number;
  actionsToday: number;
  actionsTodayType: 'count' | 'idle';
  isYou?: boolean;
}

// ============================================================
// MANAGER ACTIVITY ITEM TYPE
// ============================================================
export interface ManagerActivityItem {
  time: string;
  verb: string;
  target: string;
  description: string;
}

// ============================================================
// MANAGER DATA TYPE (SINGLETON)
// ============================================================
export interface ManagerData {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  region: string;
  location: string;
  title: string;
  joined: string;
  specialistsManagedCount: number;
  regionsCount: number;
  teamSlaSevenDays: number;
  escalationResolutionHours: number;
  actionsToday: number;
  activityFeed: ManagerActivityItem[];
}

// ============================================================
// CANDIDATES TAB DATA
// ============================================================
const CANDIDATES_ROWS: CandidateUser[] = [
  {
    id: 'cand-001',
    name: 'Adesuwa Babatunde',
    email: 'adesuwa@example.com',
    country: 'Nigeria',
    flag: '🇳🇬',
    title: 'Senior Engineer',
    status: 'live',
    joinedMonth: 'Mar 2024',
    lastActive: '2h ago',
    lastActiveType: 'fresh',
    hiresCount: 12,
    hiresAmount: '$48,200',
    hiresStatus: 'completed',
  },
  {
    id: 'cand-002',
    name: 'Carlos Restrepo',
    email: 'carlos.r@example.com',
    country: 'Colombia',
    flag: '🇨🇴',
    title: 'Data Analyst',
    status: 'live',
    joinedMonth: 'Sep 2023',
    lastActive: '5h ago',
    lastActiveType: 'regular',
    hiresCount: 18,
    hiresAmount: '$72,400',
    hiresStatus: 'completed',
  },
  {
    id: 'cand-003',
    name: 'Lin Wei',
    email: 'lin.wei@example.com',
    country: 'Taiwan',
    flag: '🇹🇼',
    title: 'Designer-Developer',
    status: 'pipeline',
    joinedMonth: 'Apr 2026',
    lastActive: '12h ago',
    lastActiveType: 'fresh',
    hiresCount: '—',
    hiresAmount: 'in review',
    hiresStatus: 'in-review',
  },
  {
    id: 'cand-004',
    name: 'Marcus Thompson',
    email: 'marcus.t@example.com',
    country: 'United States',
    flag: '🇺🇸',
    title: 'Senior Engineer',
    status: 'suspended',
    joinedMonth: 'Jul 2024',
    lastActive: '3d ago',
    lastActiveType: 'regular',
    hiresCount: 4,
    hiresAmount: '$16,000',
    hiresStatus: 'completed',
  },
  {
    id: 'cand-005',
    name: 'Aigerim Bekova',
    email: 'aigerim.b@example.com',
    country: 'Kazakhstan',
    flag: '🇰🇿',
    title: 'Virtual Assistant',
    status: 'live',
    joinedMonth: 'Jan 2024',
    lastActive: '30m ago',
    lastActiveType: 'fresh',
    hiresCount: 24,
    hiresAmount: '$36,000',
    hiresStatus: 'completed',
  },
  {
    id: 'cand-006',
    name: 'Deniz Kaya',
    email: 'deniz.k@example.com',
    country: 'Türkiye',
    flag: '🇹🇷',
    title: 'Designer',
    status: 'banned',
    joinedMonth: 'Feb 2024',
    lastActive: 'never',
    lastActiveType: 'never',
    hiresCount: 0,
    hiresAmount: '$0',
    hiresStatus: 'zero',
  },
  {
    id: 'cand-007',
    name: 'Priya Sharma',
    email: 'priya.s@example.com',
    country: 'India',
    flag: '🇮🇳',
    title: 'Data Engineer',
    status: 'live',
    joinedMonth: 'May 2024',
    lastActive: '1h ago',
    lastActiveType: 'fresh',
    hiresCount: 9,
    hiresAmount: '$54,000',
    hiresStatus: 'completed',
  },
  {
    id: 'cand-008',
    name: 'James O\'Brien',
    email: 'james.obrien@example.com',
    country: 'Ireland',
    flag: '🇮🇪',
    title: 'Senior Engineer',
    status: 'pipeline',
    joinedMonth: 'Apr 2026',
    lastActive: '4h ago',
    lastActiveType: 'regular',
    hiresCount: '—',
    hiresAmount: 'in review',
    hiresStatus: 'in-review',
  },
];

// ============================================================
// CLIENTS TAB DATA
// ============================================================
const CLIENTS_ROWS: ClientUser[] = [
  {
    id: 'cl-001-acme',
    name: 'Acme Holdings, Inc.',
    email: 'finance@acme-holdings.test',
    country: 'USA',
    flag: '🇺🇸',
    industry: 'Tech',
    status: 'banned',
    joinedMonth: 'Sep 2023',
    lastActive: '8h ago',
    lastActiveType: 'regular',
    spendCount: 12,
    spendAmount: '$84,000',
    spendStatus: 'completed',
  },
  {
    id: 'cl-002-7e1b3f',
    name: 'Studio Berlin GmbH',
    email: 'hires@studio-berlin.test',
    country: 'Germany',
    flag: '🇩🇪',
    industry: 'Design',
    status: 'verified',
    joinedMonth: 'Jan 2024',
    lastActive: '2h ago',
    lastActiveType: 'fresh',
    spendCount: 23,
    spendAmount: '$184,300',
    spendStatus: 'completed',
  },
  {
    id: 'cl-003-quantum',
    name: 'Quantum Robotics Pte. Ltd.',
    email: 'talent@quantumrobotics.test',
    country: 'Singapore',
    flag: '🇸🇬',
    industry: 'Robotics',
    status: 'verified',
    joinedMonth: 'Nov 2023',
    lastActive: '1h ago',
    lastActiveType: 'fresh',
    spendCount: 8,
    spendAmount: '$220,500',
    spendStatus: 'completed',
  },
  {
    id: 'cl-004-medco',
    name: 'Lighthouse Med Co.',
    email: 'people@lighthouse-med.test',
    country: 'Canada',
    flag: '🇨🇦',
    industry: 'Healthcare',
    status: 'verified',
    joinedMonth: 'Mar 2024',
    lastActive: '3h ago',
    lastActiveType: 'regular',
    spendCount: 5,
    spendAmount: '$72,800',
    spendStatus: 'completed',
  },
  {
    id: 'cl-005-tundra',
    name: 'Open Tundra Ltd.',
    email: 'hiring@opentundra.test',
    country: 'Iceland',
    flag: '🇮🇸',
    industry: 'Sustainability',
    status: 'unverified',
    joinedMonth: 'Apr 2026',
    lastActive: '12m ago',
    lastActiveType: 'fresh',
    spendCount: '0',
    spendAmount: 'in onboarding',
    spendStatus: 'empty',
  },
  {
    id: 'cl-006-lagos',
    name: 'The Lagos Loom',
    email: 'hr@lagosloom.test',
    country: 'Nigeria',
    flag: '🇳🇬',
    industry: 'Manufacturing',
    status: 'verified',
    joinedMonth: 'Jun 2024',
    lastActive: '2d ago',
    lastActiveType: 'regular',
    spendCount: 14,
    spendAmount: '$98,400',
    spendStatus: 'completed',
  },
];

// ============================================================
// SPECIALISTS TAB DATA
// ============================================================
const SPECIALISTS_ROWS: SpecialistUser[] = [
  {
    id: 'spec-001',
    name: 'Daniel Kovács',
    email: 'daniel.k@atlas.example',
    region: 'EU · Berlin',
    caseload: 47,
    status: 'on-track',
    slaPercent: 96.4,
    reviewsCount: 156,
    disputesCount: 23,
  },
  {
    id: 'spec-002',
    name: 'Sarah Reyes',
    email: 'sarah.r@atlas.example',
    region: 'Americas · Mexico City',
    caseload: 52,
    status: 'caseload-high',
    slaPercent: 92.1,
    reviewsCount: 142,
    disputesCount: 31,
  },
  {
    id: 'spec-003',
    name: 'Jamal Nasir',
    email: 'jamal.n@atlas.example',
    region: 'MENA · Dubai',
    caseload: 38,
    status: 'on-track',
    slaPercent: 98.2,
    reviewsCount: 134,
    disputesCount: 18,
  },
  {
    id: 'spec-004',
    name: 'Maya Tanaka',
    email: 'maya.t@atlas.example',
    region: 'APAC · Tokyo',
    caseload: 41,
    status: 'on-track',
    slaPercent: 97.8,
    reviewsCount: 145,
    disputesCount: 22,
  },
  {
    id: 'spec-005',
    name: 'Lukas Chen',
    email: 'lukas.c@atlas.example',
    region: 'APAC · Singapore',
    caseload: 39,
    status: 'on-break',
    slaPercent: 94.5,
    reviewsCount: 138,
    disputesCount: 19,
  },
  {
    id: 'spec-006',
    name: 'Ana Silva',
    email: 'ana.s@atlas.example',
    region: 'LATAM · São Paulo',
    caseload: 44,
    status: 'on-track',
    slaPercent: 95.7,
    reviewsCount: 148,
    disputesCount: 26,
  },
  {
    id: 'spec-007',
    name: 'Yuki Tanaka',
    email: 'yuki.t@atlas.example',
    region: 'APAC · Osaka',
    caseload: 42,
    status: 'on-track',
    slaPercent: 96.9,
    reviewsCount: 152,
    disputesCount: 24,
  },
  {
    id: 'spec-008',
    name: 'Kofi Asante',
    email: 'kofi.a@atlas.example',
    region: 'Africa · Accra',
    caseload: 36,
    status: 'on-track',
    slaPercent: 99.1,
    reviewsCount: 128,
    disputesCount: 14,
  },
  {
    id: 'spec-009',
    name: 'Elena Volkov',
    email: 'elena.v@atlas.example',
    region: 'EU · Tbilisi',
    caseload: 40,
    status: 'on-track',
    slaPercent: 95.2,
    reviewsCount: 141,
    disputesCount: 21,
  },
  {
    id: 'spec-010',
    name: 'Hassan Al-Rashid',
    email: 'hassan.a@atlas.example',
    region: 'MENA · Riyadh',
    caseload: 35,
    status: 'on-track',
    slaPercent: 97.5,
    reviewsCount: 119,
    disputesCount: 16,
  },
  {
    id: 'spec-011',
    name: 'Olivia Park',
    email: 'olivia.p@atlas.example',
    region: 'Americas · Vancouver',
    caseload: 43,
    status: 'on-break',
    slaPercent: 96.0,
    reviewsCount: 144,
    disputesCount: 25,
  },
];

// ============================================================
// MANAGER DATA (SINGLETON)
// ============================================================
const MANAGER_DATA: ManagerData = {
  id: 'mgr-001',
  name: 'Mateo Vargas',
  email: 'mateo.vargas@atlas.example',
  phone: '+54 11 5555-0162',
  country: 'Argentina',
  region: 'LATAM',
  location: 'Buenos Aires',
  title: 'Manager of Talent Specialists',
  joined: 'Aug 2023',
  specialistsManagedCount: 11,
  regionsCount: 6,
  teamSlaSevenDays: 96.5,
  escalationResolutionHours: 4.2,
  actionsToday: 12,
  activityFeed: [
    {
      time: '11:42 AM',
      verb: 'Resolved escalation from',
      target: 'Sarah R.',
      description: '— caseload rebalanced, 3 cases reassigned to Lukas C.',
    },
    {
      time: '10:08 AM',
      verb: 'Approved 1:1 cadence change for',
      target: 'Maya Tanaka',
      description: '— biweekly → weekly',
    },
    {
      time: '9:33 AM',
      verb: 'Kicked off Q2 sprint',
      target: 'SPR-2026-014',
      description: '— 11 specialists, 2-week goal: dispute SLA <18h',
    },
    {
      time: '9:08 AM',
      verb: 'Signed in from',
      target: 'Buenos Aires',
      description: '— 200.42.118.7 · Chrome · 2FA verified',
    },
  ],
};

// ============================================================
// ADMINS TAB DATA
// ============================================================
const ADMINS_ROWS: AdminUser[] = [
  {
    id: 'admin-001',
    name: 'Aïsha Okafor',
    email: 'aisha@atlas.example',
    role: 'operations',
    lastLogin: 'Today, 9:15 AM',
    twoFa: 'enabled',
    ipCount: 3,
    actionsToday: 7,
    actionsTodayType: 'count',
    isYou: true,
  },
  {
    id: 'admin-002',
    name: 'Dario Mensah',
    email: 'dario@atlas.example',
    role: 'super-admin',
    lastLogin: 'Today, 11:42 AM',
    twoFa: 'enabled',
    ipCount: 2,
    actionsToday: 12,
    actionsTodayType: 'count',
  },
  {
    id: 'admin-003',
    name: 'Wei Zhang',
    email: 'wei.z@atlas.example',
    role: 'trust-safety',
    lastLogin: 'Today, 2:08 PM',
    twoFa: 'enabled',
    ipCount: 4,
    actionsToday: 18,
    actionsTodayType: 'count',
  },
  {
    id: 'admin-004',
    name: 'Henrietta Lopez',
    email: 'henrietta.l@atlas.example',
    role: 'finance',
    lastLogin: 'Yesterday, 6:34 PM',
    twoFa: 'enabled',
    ipCount: 2,
    actionsToday: 0,
    actionsTodayType: 'idle',
  },
  {
    id: 'admin-005',
    name: 'Hiroshi Tanaka',
    email: 'hiroshi.t@atlas.example',
    role: 'compliance',
    lastLogin: 'Apr 28, 4:22 PM',
    twoFa: 'enabled',
    ipCount: 3,
    actionsToday: 0,
    actionsTodayType: 'idle',
  },
];

// ============================================================
// ADMINS TAB — STATS DATA
// ============================================================
const ADMINS_STATS: StatCell[] = [
  {
    label: 'Total admins',
    value: '5',
    suffix: 'accounts',
    meta: '1 super · 4 specialized',
  },
  {
    label: '2FA coverage',
    value: '5',
    suffix: 'of 5',
    delta: { direction: 'up', percent: '✓' },
    meta: '100% enrolled',
  },
  {
    label: 'Active today',
    value: '3',
    suffix: 'of 5',
    meta: 'last 24 hours',
  },
  {
    label: 'Pending requests',
    value: '1',
    suffix: 'request',
    meta: 'permission change · Aïsha',
    metaType: 'warn',
  },
];

// ============================================================
// ADMINS TAB — FILTERS DATA
// ============================================================
const ADMINS_FILTERS: FilterChip[] = [
  {
    id: 'role',
    label: 'Role',
    options: ['Operations', 'Super Admin', 'Trust & Safety', 'Finance', 'Compliance'],
  },
];

// ============================================================
// CANDIDATES TAB — STATS DATA
// ============================================================
const CANDIDATES_STATS: StatCell[] = [
  {
    label: 'Currently live',
    value: '18,450',
    delta: { direction: 'up', percent: '3.2%' },
    meta: 'vs last 30 days',
  },
  {
    label: 'In pre-approval pipeline',
    value: '3,200',
    delta: { direction: 'up', percent: '8%' },
    meta: 'avg review time 38h',
  },
  {
    label: 'Suspended / banned',
    value: '458',
    delta: { direction: 'down', percent: '1.1%' },
    meta: '12 new this week',
  },
  {
    label: 'Top role category',
    value: 'Senior Engineers',
    meta: 'demand > pool · 38% available',
    metaType: 'warn',
  },
];

// ============================================================
// CLIENTS TAB — STATS DATA
// ============================================================
const CLIENTS_STATS: StatCell[] = [
  {
    label: 'Verified',
    value: '5,847',
    delta: { direction: 'up', percent: '1.4%' },
    meta: '93.5% of all clients',
  },
  {
    label: 'Unverified',
    value: '407',
    delta: { direction: 'down', percent: '3%' },
    meta: 'avg 4 days to verify',
  },
  {
    label: 'Suspended',
    value: '23',
    delta: { direction: 'flat', percent: '↔' },
    meta: '3 new this week',
    metaType: 'danger',
  },
  {
    label: 'Avg lifetime value',
    value: '14,820',
    valuePrefix: '$',
    meta: 'across active clients',
  },
];

// ============================================================
// CANDIDATES TAB — FILTER CHIPS DATA
// ============================================================
const CANDIDATES_FILTERS: FilterChip[] = [
  { id: 'status', trigger: 'status', label: 'Status:', activeValue: 'All' },
  { id: 'country', trigger: 'country', label: 'Country' },
  { id: 'category', trigger: 'category', label: 'Category' },
  { id: 'joined', trigger: 'joined', label: 'Joined' },
];

// ============================================================
// CLIENTS TAB — FILTER CHIPS DATA
// ============================================================
const CLIENTS_FILTERS: FilterChip[] = [
  { id: 'status', trigger: 'status', label: 'Status:', activeValue: 'All' },
  { id: 'industry', trigger: 'country', label: 'Industry' },
  { id: 'spend', trigger: 'category', label: 'Spend tier' },
];

// ============================================================
// SPECIALISTS TAB — STATS DATA
// ============================================================
const SPECIALISTS_STATS: StatCell[] = [
  {
    label: 'On duty now',
    value: '9',
    suffix: 'of 11',
    meta: '2 currently on break',
  },
  {
    label: 'Avg caseload',
    value: '41',
    suffix: 'active',
    meta: 'range 35–52',
  },
  {
    label: 'Team SLA hit rate',
    value: '96.5',
    suffix: '%',
    delta: { direction: 'up', percent: '0.6%' },
    meta: 'last 7 days',
  },
  {
    label: 'Caseload alerts',
    value: '1',
    suffix: 'specialist',
    meta: 'Sarah R. above 50',
    metaType: 'warn',
  },
];

// ============================================================
// SPECIALISTS TAB — FILTER CHIPS DATA
// ============================================================
const SPECIALISTS_FILTERS: FilterChip[] = [
  { id: 'region', trigger: 'status', label: 'Region' },
  { id: 'status', trigger: 'status', label: 'Status' },
];

// ============================================================
// UNIFIED STATUS PILL CONFIG (all status types)
// ============================================================
export const STATUS_PILL_CONFIG = {
  live: {
    label: 'Live',
    bg: 'bg-[var(--color-success-bg)]',
    text: 'text-[var(--color-success)]',
  },
  pipeline: {
    label: 'In pipeline',
    bg: 'bg-[var(--color-amber-bg)]',
    text: 'text-[var(--color-amber)]',
  },
  suspended: {
    label: 'Suspended',
    bg: 'bg-[var(--color-danger-bg)]',
    text: 'text-[var(--color-danger)]',
  },
  banned: {
    label: 'Banned',
    bg: 'bg-[var(--color-danger)]',
    text: 'text-white',
  },
  verified: {
    label: 'Verified',
    bg: 'bg-[var(--color-success-bg)]',
    text: 'text-[var(--color-success)]',
  },
  unverified: {
    label: 'Unverified',
    bg: 'bg-[var(--color-amber-bg)]',
    text: 'text-[var(--color-amber)]',
  },
  'on-track': {
    label: 'On track',
    bg: 'bg-[var(--color-success-bg)]',
    text: 'text-[var(--color-success)]',
  },
  'caseload-high': {
    label: 'Caseload high',
    bg: 'bg-[var(--color-amber-bg)]',
    text: 'text-[var(--color-amber)]',
  },
  'on-break': {
    label: 'On break',
    bg: 'bg-[var(--color-danger-bg)]',
    text: 'text-[var(--color-danger)]',
  },
} as const;

// ============================================================
// USERS TABS CONFIGURATION
// ============================================================
export interface UserTabConfig {
  id: TabName;
  label: string;
  countKey: keyof typeof USERS_DATA.header;
  warning?: boolean;
}

export const USERS_TABS: UserTabConfig[] = [
  { id: 'candidates', label: 'Candidates', countKey: 'candidatesCount' },
  { id: 'clients', label: 'Clients', countKey: 'clientsCount' },
  { id: 'specialists', label: 'Talent Specialists', countKey: 'specialistsCount' },
  { id: 'manager', label: 'Manager', countKey: 'managersCount' },
  { id: 'admins', label: 'Admins', countKey: 'adminsCount', warning: true },
];

// ============================================================
// MAIN EXPORT
// ============================================================
export const USERS_DATA = {
  header: {
    totalAccounts: 28479,
    candidatesCount: 22108,
    clientsCount: 6254,
    specialistsCount: 11,
    managersCount: 1,
    adminsCount: 5,
  },
  candidates: {
    stats: CANDIDATES_STATS,
    filters: CANDIDATES_FILTERS,
    rows: CANDIDATES_ROWS,
    tableConfig: {
      columns: [
        { id: 'name', label: 'Name', sortable: true },
        { id: 'country', label: 'Country' },
        { id: 'category', label: 'Category' },
        { id: 'status', label: 'Status' },
        { id: 'joined', label: 'Joined', sortable: true },
        { id: 'lastActive', label: 'Last active', sortable: true },
        { id: 'hires', label: 'Hires', sortable: true },
      ],
      gridCols: '24px 2.4fr 1fr 1.2fr 0.9fr 0.9fr 0.9fr 1fr 28px',
      pagination: {
        text: 'Showing 8 of 22,108 candidates',
        buttons: [
          { label: '← Previous', action: 'previous-page', disabled: true },
          { label: 'Next page →', action: 'next-page' },
        ],
      },
      searchPlaceholder: 'Search candidates by name, email, or ID…',
      exportLabel: 'Export CSV',
      bulkActions: [
        { label: 'Email', action: 'bulk-email' },
        { label: 'Tag', action: 'bulk-tag' },
        { label: 'Export', action: 'bulk-export' },
        { label: 'Suspend', action: 'bulk-suspend', variant: 'danger' },
      ],
    } as TabConfig,
  },
  clients: {
    stats: CLIENTS_STATS,
    filters: CLIENTS_FILTERS,
    rows: CLIENTS_ROWS,
    tableConfig: {
      columns: [
        { id: 'name', label: 'Name', sortable: true },
        { id: 'country', label: 'Country' },
        { id: 'industry', label: 'Industry' },
        { id: 'status', label: 'Status' },
        { id: 'joined', label: 'Joined', sortable: true },
        { id: 'lastActive', label: 'Last active', sortable: true },
        { id: 'spend', label: 'Spend', sortable: true },
      ],
      gridCols: '24px 2.4fr 1fr 1.2fr 1fr 0.9fr 0.9fr 1fr 28px',
      pagination: {
        text: 'Showing 6 of 6,254 clients',
        buttons: [
          { label: '← Previous', action: 'previous-page', disabled: true },
          { label: 'Next page →', action: 'next-page' },
        ],
      },
      searchPlaceholder: 'Search clients by company or email…',
      exportLabel: 'Export CSV',
      bulkActions: [
        { label: 'Email', action: 'bulk-email' },
        { label: 'Tag', action: 'bulk-tag' },
        { label: 'Export', action: 'bulk-export' },
        { label: 'Suspend', action: 'bulk-suspend', variant: 'danger' },
      ],
    } as TabConfig,
  },
  specialists: {
    stats: SPECIALISTS_STATS,
    filters: SPECIALISTS_FILTERS,
    rows: SPECIALISTS_ROWS,
    tableConfig: {
      columns: [
        { id: 'name', label: 'Specialist', sortable: true },
        { id: 'region', label: 'Region' },
        { id: 'caseload', label: 'Caseload', sortable: true },
        { id: 'status', label: 'Daily status' },
        { id: 'sla', label: 'SLA', sortable: true },
        { id: 'reviewsDisputes', label: 'Reviews / Disputes' },
      ],
      gridCols: '24px 2.2fr 1.2fr 0.8fr 1.2fr 1.3fr 1.5fr 28px',
      pagination: {
        text: 'Showing all 11 specialists · audited daily',
        buttons: [
          { label: 'Full team report →', action: 'open-team-report' },
        ],
      },
      searchPlaceholder: 'Search specialists by name or region…',
      exportLabel: 'Export team report',
      bulkActions: [
        { label: 'Message', action: 'bulk-message' },
        { label: 'Export', action: 'bulk-export' },
      ],
    } as TabConfig,
  },
  manager: MANAGER_DATA,
  admins: {
    stats: ADMINS_STATS,
    filters: ADMINS_FILTERS,
    rows: ADMINS_ROWS,
    tableConfig: {
      columns: [
        { id: 'name', label: 'Name', sortable: true },
        { id: 'role', label: 'Role' },
        { id: 'lastLogin', label: 'Last login', sortable: true },
        { id: '2fa', label: '2FA' },
        { id: 'ips', label: 'IPs' },
        { id: 'actionsToday', label: 'Actions today' },
      ],
      gridCols: '24px 2.4fr 1.4fr 1.2fr 0.7fr 0.7fr 0.9fr 28px',
      searchPlaceholder: 'Search admins by name or role…',
      pagination: {
        text: 'Showing all 5 admin accounts · changes audited',
        buttons: [
          { label: 'Audit history →', action: 'audit-admins' },
        ],
      },
      primaryCta: {
        label: 'Create new admin',
        action: 'create-admin',
        variant: 'primary' as const,
      },
    },
  },
};
