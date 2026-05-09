/**
 * Phase 7a — Talent Specialist Detail Page Data
 *
 * SpecialistProfile interface (hero fields only — section data added in 7b–7k)
 * 11 fixtures (spec-001 through spec-011) matching users-data.ts SPECIALISTS_ROWS
 * source of truth (names, regions, statuses).
 *
 * Status mapping (users-data.ts → SpecialistProfile):
 *   'on-track'      → 'on-track'
 *   'caseload-high' → 'at-risk'   (workload overload)
 *   'on-break'      → 'inactive'  (paused state)
 *
 * The 'off-track' and 'pending' statuses are retained on the SpecialistProfile
 * union for future use (no current users-data.ts row uses them).
 */

// ============================================================
// TYPES
// ============================================================

export interface SpecialistProfile {
  // Basic identity
  id: string;
  atlasId: string;
  name: string;
  initials: string;

  // Hero status
  status: 'on-track' | 'at-risk' | 'off-track' | 'inactive' | 'pending';
  statusLabel: string;

  // Hero meta
  roleTag: string;
  region: string;
  flag: string;
  timezone: string;
  languages: string;
  tenure: string;
  category: string;
  manager: string;

  // Optional status banner (shown for at-risk / on-leave / probation / off-track)
  statusBanner?: {
    title: string;
    detail: string;
  };

  // Section 01 — Performance summary (Phase 7c)
  performance?: PerformanceSummary;

  // Section 02 — Workload & caseload (Phase 7d)
  workload?: WorkloadSection;

  // Section 03 — Daily activity audit (Phase 7e)
  activity?: ActivitySection;

  // Section 04 — Candidates & clients assigned (Phase 7f)
  assignments?: AssignmentsSection;

  // Section 05 — Notes (Phase 7g)
  notes?: NotesSection;

  // Section 06 — Performance review history (Phase 7h)
  reviews?: ReviewsSection;

  // Section 07 — HR record (Phase 7i)
  hr?: HrSection;

  // Section data fields will be added in Phases 7j–7k:
  // auditLog?, quickFacts?
}

// ============================================================
// PERFORMANCE SECTION TYPES (Phase 7c)
// ============================================================

interface StatTile {
  label: string;
  value: string;
  delta?: { label: string; variant: 'up' | 'down' | 'flat' };
  vSuffix?: string;
  meta: string;
  metaVariant?: 'default' | 'warn' | 'danger';
  valueOverrideStyle?: { color?: string; fontSize?: string };
}

interface TrendBar {
  value: string;
  heightPct: number;
  label: string;
  variant?: 'default' | 'muted' | 'warn';
}

interface TrendChart {
  title: string;
  metaTotal: string;
  metaDelta?: { label: string; variant: 'up' | 'down' };
  bars: TrendBar[];
}

interface BreakdownRow {
  label: string;
  value: string;
  percent: string;
}

interface ChannelRow {
  name: string;
  detail: string;
  barPct: number;
  pct: string;
  meta: string;
}

interface ReviewsTab {
  tabCount: number;
  stats: StatTile[];
  trend: TrendChart;
  breakdown: BreakdownRow[];
}

interface DisputesTab {
  tabCount: number;
  stats: StatTile[];
  trend: TrendChart;
  breakdown: BreakdownRow[];
}

interface SourcingTab {
  tabCount: number;
  stats: StatTile[];
  trend: TrendChart;
  channels: ChannelRow[];
}

interface PoolTab {
  tabCount: number;
  stats: StatTile[];
  trend: TrendChart;
  breakdown: BreakdownRow[];
}

interface PerformanceSummary {
  sectionStatus: { label: string; variant: 'success' | 'warn' | 'danger' | 'neutral' };
  reviews: ReviewsTab;
  disputes: DisputesTab;
  sourcing: SourcingTab;
  pool: PoolTab;
}

// ============================================================
// SECTION 02 — Workload & Caseload (Phase 7d) types
// ============================================================

interface WorkloadTile {
  label: string;
  meta: string;
  metaColor?: string;
  value: string;
  valueColor?: string;
  detail: string;
}

interface CapacityBar {
  pct: string;
  pctVariant: 'default' | 'warn' | 'danger';
  fillWidthPct: number;
  fillVariant: 'default' | 'warn' | 'danger';
  targetLeftPct: number;
  meta: string;
}

interface AttentionRow {
  iconType: 'info' | 'clock';
  variant: 'default' | 'danger';
  text: string;
  meta: string;
  time: string;
  action: 'open-dispute' | 'open-review';
}

interface AttentionList {
  title: string;
  countLabel: string;
  countColor?: string;
  rows: AttentionRow[];
}

interface WorkloadSection {
  sectionStatus: { label: string; variant: 'success' | 'warn' | 'danger' | 'neutral' };
  tiles: WorkloadTile[];
  capacity: CapacityBar;
  attention?: AttentionList;
  emptyAttention?: { title: string; detail: string };
}

// ============================================================
// SECTION 03 — Daily Activity Audit (Phase 7e) types
// ============================================================

interface ActivityDay {
  status: 'submitted' | 'late' | 'missed' | 'excused' | 'future';
  title: string;
}

interface ActivityLegendItem {
  status: 'submitted' | 'late' | 'missed' | 'excused';
  label: string;
}

type TodayBodySegment =
  | { type: 'highlight'; text: string }
  | { type: 'plain'; text: string };

interface TodaySubmission {
  dateLabel: string;
  metaLabel: string;
  body: TodayBodySegment[];
}

interface ActivitySection {
  sectionStatus: { label: string; variant: 'success' | 'warn' | 'danger' | 'neutral' };
  cardTitle: string;
  adherencePct: string;
  adherenceLabel: string;
  adherenceColor?: string; // override for at-risk specialists (amber)
  days: ActivityDay[];
  legend: ActivityLegendItem[];
  todaySubmission?: TodaySubmission;
  emptyState?: { title: string; detail: string };
}

// ============================================================
// ASSIGNMENTS SECTION TYPES (Phase 7f) — Section 04
// ============================================================

// admin.html lines 4688-4699: 12 avatar gradient variants
type AvatarVariant = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

// admin.html lines 7699-7712: status pill — default = success, warn = amber, neutral = cream
interface AssignmentRow {
  id?: string;        // optional cand-id / cl-id (for data-attribute per Perfection Directive)
  initials: string;
  avatar: AvatarVariant;
  name: string;
  meta: string;       // e.g. "🇳🇬 NG · Senior Engineer · 12 hires · $48K"
  statusLabel: string; // "Live" / "Pipeline" / "Active" / "New"
  statusVariant?: 'default' | 'warn' | 'neutral'; // default = success-bg
  action: string;     // data-sp-action="open-candidate" | "open-client"
}

interface AssignmentList {
  title: string;        // "Top 5 active candidates"
  viewAllLabel: string; // "View all 47 →"
  viewAllAction: string; // data-sp-action
  rows: AssignmentRow[];
}

interface AssignmentsSection {
  sectionStatus: { label: string; variant: 'success' | 'warn' | 'danger' | 'neutral' };
  candidates?: AssignmentList;
  clients?: AssignmentList;
  emptyState?: { title: string; detail: string };
}

// ============================================================
// NOTES SECTION TYPES (Phase 7g) — Section 05
// ============================================================

type NoteBlock =
  | { type: 'paragraph'; emphasis?: boolean; text: string }
  | { type: 'list'; items: string[] };

interface NotesBlockEntry {
  kind: 'manager' | 'admin';
  headTitle: string;     // "Manager's notes" / "Admin's notes"
  author: string;        // "Mateo Vargas" / "Aïsha Okafor (you)"
  visibility: string;    // "Manager + Admin" / "Admin-only"
  visibilityVariant?: 'default' | 'admin-only';
  body: NoteBlock[];
  lastEdited: string;    // "Last edited Apr 28, 2026 11:42 AM by Mateo Vargas"
  editAction: string;    // data-sp-action="edit-manager-note"
}

interface NotesSection {
  sectionStatus: { label: string; variant: 'success' | 'warn' | 'danger' | 'neutral' };
  notes: NotesBlockEntry[];
}

// ============================================================
// REVIEWS SECTION TYPES (Phase 7h) — Section 06
// ============================================================

interface ReviewComment {
  authorRole: 'Manager' | 'Admin';
  authorName: string;
  text: string;
}

interface ReviewCycle {
  quarter: string;        // "Q1 2026 review"
  isLatest?: boolean;
  meta: string;           // "Final · delivered Apr 8, 2026 · cycle annual"
  ratingLabel: string;    // "Overall rating" (latest) | "Overall" (compact)
  ratingValue: string;    // "Exceeds expectations" | "Meets expectations" | "Needs work"
  ratingHigh?: boolean;   // applies success color when true
  starsFilled: number;    // 0-5
  comments?: ReviewComment[];
}

interface ReviewsSection {
  sectionStatus: { label: string; variant: 'success' | 'warn' | 'danger' | 'neutral' };
  cycles: ReviewCycle[];
  initiateLabel?: string; // "Initiate Q2 2026 review" — null hides the button
  emptyState?: { title: string; detail: string };
}

// ============================================================
// HR SECTION TYPES (Phase 7i) — Section 07
// ============================================================

interface HrDdValue {
  text: string;
  emphasisColor?: 'success' | 'warn' | 'danger'; // for "Active" green / "On leave" amber etc.
}

interface HrDlEntry {
  dt: string;
  dd: HrDdValue;
}

interface HrCard {
  title: string;
  entries: HrDlEntry[];
}

interface ComplianceRow {
  name: string;
  meta: string;
  due: string;
  statusLabel: string;
  variant: 'current' | 'due' | 'overdue';
}

interface DisciplinaryClean {
  flagged?: false;
  title: string;
  detail: string;
}

interface HrSection {
  sectionStatus: { label: string; variant: 'success' | 'warn' | 'danger' | 'neutral' };
  hrCards: HrCard[];
  compliance: {
    summaryLabel: string;
    summaryVariant: 'success' | 'warn';
    rows: ComplianceRow[];
  };
  disciplinary: DisciplinaryClean;
  emptyState?: { title: string; detail: string };
}

// ============================================================
// PERFORMANCE BUILDER (Phase 7c) — generates section data per specialist
// from source-of-truth values in users-data.ts (SLA%, reviews, disputes, caseload).
// ============================================================

type PerfStatus = 'healthy' | 'at-risk' | 'inactive';

interface PerfBuilderInput {
  status: PerfStatus;
  slaPercent: number;        // e.g. 96.4
  reviewsCount: number;      // 156
  disputesCount: number;     // 23
  category: string;          // "Engineering"
  sourcingCount: number;     // estimated from reviews
  poolSize: number;          // category-specific pool size
  channels: ChannelRow[];    // 3 channels matching region/category
  // Optional override for at-risk/inactive specialists
  reviewsBars?: TrendBar[];
  disputesBars?: TrendBar[];
  sourcingBars?: TrendBar[];
  poolBars?: TrendBar[];
}

function buildPerformance(input: PerfBuilderInput): PerformanceSummary {
  const isHealthy = input.status === 'healthy';
  const isAtRisk = input.status === 'at-risk';
  const isInactive = input.status === 'inactive';

  // Section status pill
  const sectionStatus = isHealthy
    ? { label: 'Last 30 days · all SLAs hit', variant: 'success' as const }
    : isAtRisk
      ? { label: 'SLA dipped · caseload elevated', variant: 'warn' as const }
      : { label: 'On leave · pre-leave snapshot', variant: 'neutral' as const };

  // Default delta direction
  const upDelta = (label: string) => ({ label, variant: 'up' as const });
  const downDelta = (label: string) => ({ label, variant: 'down' as const });
  const flatDelta = { label: '—', variant: 'flat' as const };

  // Choose delta helper based on status
  const reviewsDelta = isInactive ? flatDelta : isAtRisk ? downDelta('↓4%') : upDelta('↑12%');
  const disputesDelta = isInactive ? flatDelta : isAtRisk ? upDelta('↑8') : upDelta('↑3');
  const sourcingDelta = isInactive ? flatDelta : isAtRisk ? downDelta('↓3') : upDelta('↑6');

  // Default bars (fallback if not overridden) — declining for inactive, dipping for at-risk
  const defaultReviewsBars: TrendBar[] = input.reviewsBars ?? (isInactive
    ? [
        { value: String(Math.round(input.reviewsCount * 0.30)), heightPct: 95, label: 'W14' },
        { value: String(Math.round(input.reviewsCount * 0.28)), heightPct: 88, label: 'W15' },
        { value: String(Math.round(input.reviewsCount * 0.25)), heightPct: 80, label: 'W16' },
        { value: String(Math.round(input.reviewsCount * 0.17)), heightPct: 55, label: 'W17', variant: 'muted' },
      ]
    : isAtRisk
      ? [
          { value: String(Math.round(input.reviewsCount * 0.27)), heightPct: 88, label: 'W14' },
          { value: String(Math.round(input.reviewsCount * 0.24)), heightPct: 78, label: 'W15', variant: 'warn' },
          { value: String(Math.round(input.reviewsCount * 0.26)), heightPct: 84, label: 'W16' },
          { value: String(Math.round(input.reviewsCount * 0.23)), heightPct: 75, label: 'W17', variant: 'warn' },
        ]
      : [
          { value: String(Math.round(input.reviewsCount * 0.21)), heightPct: 64, label: 'W14' },
          { value: String(Math.round(input.reviewsCount * 0.24)), heightPct: 76, label: 'W15' },
          { value: String(Math.round(input.reviewsCount * 0.27)), heightPct: 84, label: 'W16' },
          { value: String(Math.round(input.reviewsCount * 0.28)), heightPct: 100, label: 'W17' },
        ]);

  const defaultDisputesBars: TrendBar[] = input.disputesBars ?? (isInactive
    ? [
        { value: String(Math.round(input.disputesCount * 0.32)), heightPct: 92, label: 'W14' },
        { value: String(Math.round(input.disputesCount * 0.28)), heightPct: 80, label: 'W15' },
        { value: String(Math.round(input.disputesCount * 0.22)), heightPct: 64, label: 'W16' },
        { value: String(Math.round(input.disputesCount * 0.18)), heightPct: 50, label: 'W17', variant: 'muted' },
      ]
    : [
        { value: String(Math.max(1, Math.round(input.disputesCount * 0.21))), heightPct: 56, label: 'W14' },
        { value: String(Math.max(1, Math.round(input.disputesCount * 0.26))), heightPct: 67, label: 'W15' },
        { value: String(Math.max(1, Math.round(input.disputesCount * 0.22))), heightPct: 56, label: 'W16' },
        { value: String(Math.max(1, Math.round(input.disputesCount * 0.31))), heightPct: 100, label: 'W17', variant: isAtRisk ? 'warn' : 'default' },
      ]);

  const defaultSourcingBars: TrendBar[] = input.sourcingBars ?? (isInactive
    ? [
        { value: String(Math.round(input.sourcingCount * 0.30)), heightPct: 92, label: 'W14' },
        { value: String(Math.round(input.sourcingCount * 0.27)), heightPct: 84, label: 'W15' },
        { value: String(Math.round(input.sourcingCount * 0.24)), heightPct: 75, label: 'W16' },
        { value: String(Math.round(input.sourcingCount * 0.19)), heightPct: 60, label: 'W17', variant: 'muted' },
      ]
    : [
        { value: String(Math.round(input.sourcingCount * 0.21)), heightPct: 75, label: 'W14' },
        { value: String(Math.round(input.sourcingCount * 0.25)), heightPct: 88, label: 'W15' },
        { value: String(Math.round(input.sourcingCount * 0.26)), heightPct: 92, label: 'W16' },
        { value: String(Math.round(input.sourcingCount * 0.28)), heightPct: 100, label: 'W17' },
      ]);

  const defaultPoolBars: TrendBar[] = input.poolBars ?? [
    { value: String(input.poolSize - 18), heightPct: 86, label: 'W14' },
    { value: String(input.poolSize - 11), heightPct: 91, label: 'W15' },
    { value: String(input.poolSize - 7), heightPct: 94, label: 'W16' },
    { value: String(input.poolSize), heightPct: 100, label: 'W17' },
  ];

  // Approval rate derived from SLA / status
  const approvalRate = isInactive ? '—' : isAtRisk ? '82' : '89';
  const avgReviewTime = isInactive ? '—' : isAtRisk ? '54' : '38';

  return {
    sectionStatus,
    reviews: {
      tabCount: input.reviewsCount,
      stats: [
        { label: 'Reviews completed', value: String(input.reviewsCount), ...(isInactive ? {} : { delta: reviewsDelta }), meta: isInactive ? 'pre-leave snapshot' : 'vs last 30 days' },
        { label: 'Avg review time', value: avgReviewTime, ...(avgReviewTime !== '—' ? { vSuffix: 'h' } : {}), meta: 'target < 72h SLA', ...(isAtRisk ? { metaVariant: 'warn' as const } : {}) },
        { label: 'Approval rate', value: approvalRate, ...(approvalRate !== '—' ? { vSuffix: '%' } : {}), meta: 'team avg 84%' },
        { label: 'SLA hit rate', value: String(input.slaPercent), vSuffix: '%', ...(isInactive ? {} : { delta: isAtRisk ? downDelta('↓2.4') : upDelta('↑0.4') }), meta: isAtRisk ? 'below 95% target' : '6 breaches in Q1', ...(isAtRisk ? { metaVariant: 'warn' as const } : {}) },
      ],
      trend: {
        title: 'Reviews completed · last 4 weeks',
        metaTotal: `Total ${input.reviewsCount}`,
        ...(isInactive ? {} : { metaDelta: reviewsDelta.variant === 'up' ? { label: '↑12%', variant: 'up' as const } : { label: '↓4%', variant: 'down' as const } }),
        bars: defaultReviewsBars,
      },
      breakdown: [
        { label: 'Approvals', value: String(Math.round(input.reviewsCount * 0.89)), percent: isAtRisk ? '82.0%' : '89.1%' },
        { label: 'Skills issues', value: String(Math.round(input.reviewsCount * 0.058)), percent: '5.8%' },
        { label: 'Integrity issues', value: String(Math.max(1, Math.round(input.reviewsCount * 0.019))), percent: '1.9%' },
        { label: 'Profile issues', value: String(Math.round(input.reviewsCount * 0.032)), percent: '3.2%' },
      ],
    },
    disputes: {
      tabCount: input.disputesCount,
      stats: [
        { label: 'Disputes handled', value: String(input.disputesCount), ...(isInactive ? {} : { delta: disputesDelta }), meta: isInactive ? 'pre-leave snapshot' : 'vs last 30 days' },
        { label: 'Avg resolution', value: isInactive ? '—' : isAtRisk ? '58' : '42', ...(isInactive ? {} : { vSuffix: 'h' }), meta: 'target < 72h SLA', ...(isAtRisk ? { metaVariant: 'warn' as const } : {}) },
        { label: 'SLA hit rate', value: isInactive ? '—' : isAtRisk ? '85' : '92', ...(isInactive ? {} : { vSuffix: '%' }), meta: isAtRisk ? '4 breaches in Q1' : '2 breaches in Q1' },
        { label: 'Escalation rate', value: isInactive ? '—' : isAtRisk ? '12' : '4', ...(isInactive ? {} : { vSuffix: '%' }), meta: isAtRisk ? '3 to Manager · elevated' : '1 to Manager · low', ...(isAtRisk ? { metaVariant: 'warn' as const } : {}) },
      ],
      trend: {
        title: 'Disputes resolved · last 4 weeks',
        metaTotal: `Total ${input.disputesCount}`,
        ...(isInactive ? {} : { metaDelta: { label: isAtRisk ? '↑34%' : '↑15%', variant: 'up' as const } }),
        bars: defaultDisputesBars,
      },
      breakdown: [
        { label: 'Sided with client', value: String(Math.round(input.disputesCount * 0.522)), percent: '52.2%' },
        { label: 'Sided with talent', value: String(Math.round(input.disputesCount * 0.304)), percent: '30.4%' },
        { label: 'Partial / split', value: String(Math.round(input.disputesCount * 0.131)), percent: '13.1%' },
        { label: 'Dismissed', value: String(Math.max(1, Math.round(input.disputesCount * 0.043))), percent: '4.3%' },
      ],
    },
    sourcing: {
      tabCount: input.sourcingCount,
      stats: [
        { label: 'Candidates sourced', value: String(input.sourcingCount), ...(isInactive ? {} : { delta: sourcingDelta }), meta: isInactive ? 'pre-leave snapshot' : 'vs last 30 days' },
        { label: 'Pass rate', value: isInactive ? '—' : isAtRisk ? '34' : '41', ...(isInactive ? {} : { vSuffix: '%' }), meta: 'sourced → approved' },
        { label: 'Hire rate', value: isInactive ? '—' : isAtRisk ? '21' : '26', ...(isInactive ? {} : { vSuffix: '%' }), meta: 'sourced → hired', ...(isAtRisk ? { metaVariant: 'warn' as const } : {}) },
        { label: 'Daily activity', value: isInactive ? '—' : isAtRisk ? '24' : '28', ...(isInactive ? {} : { vSuffix: '/30' }), meta: isAtRisk ? '80% adherence' : '93.3% adherence', ...(isAtRisk ? { metaVariant: 'warn' as const } : {}) },
      ],
      trend: {
        title: 'Candidates sourced · last 4 weeks',
        metaTotal: `Total ${input.sourcingCount}`,
        ...(isInactive ? {} : { metaDelta: { label: isAtRisk ? '↓6%' : '↑8%', variant: isAtRisk ? 'down' as const : 'up' as const } }),
        bars: defaultSourcingBars,
      },
      channels: input.channels,
    },
    pool: {
      tabCount: input.poolSize,
      stats: [
        { label: `Pool size · ${input.category}`, value: String(input.poolSize), meta: `target ${Math.round(input.poolSize * 0.85)} · ${isAtRisk ? 'at risk' : 'healthy'}`, ...(isAtRisk ? { metaVariant: 'warn' as const } : {}) },
        { label: 'Pool health', value: isInactive ? 'Frozen' : isAtRisk ? 'Strained' : 'Stable', meta: isInactive ? 'pre-leave snapshot' : 'last 30 days', valueOverrideStyle: { color: isInactive ? 'var(--ink-mute)' : isAtRisk ? 'var(--amber)' : 'var(--success)', fontSize: '20px' } },
        { label: 'Net change', value: isInactive ? '0' : isAtRisk ? '+4' : '+18', ...(isInactive ? {} : { delta: { label: '↑', variant: 'up' as const } }), meta: isInactive ? 'no movement during leave' : isAtRisk ? '11 added · 7 deactivated' : '22 added · 4 deactivated' },
        { label: 'Depletion alerts', value: isAtRisk ? '2' : '0', meta: isAtRisk ? 'two segments below target' : 'never below threshold', ...(isAtRisk ? { metaVariant: 'warn' as const } : {}) },
      ],
      trend: {
        title: `${input.category} pool size · last 4 weeks`,
        metaTotal: String(input.poolSize),
        ...(isInactive ? {} : { metaDelta: { label: isAtRisk ? '↑4 net' : '↑18 net', variant: 'up' as const } }),
        bars: defaultPoolBars,
      },
      breakdown: [
        { label: 'Live · available now', value: String(Math.round(input.poolSize * 0.697)), percent: '69.7%' },
        { label: 'Live · currently engaged', value: String(Math.round(input.poolSize * 0.286)), percent: '28.6%' },
        { label: 'In pipeline · being vetted', value: String(Math.max(1, Math.round(input.poolSize * 0.017))), percent: '1.7%' },
        { label: 'Pool depletion alerts', value: isAtRisk ? '2' : '0', percent: isAtRisk ? '0.5%' : '0%' },
      ],
    },
  };
}

// ============================================================
// WORKLOAD BUILDER (Phase 7d)
// ============================================================

interface WorkloadBuilderInput {
  status: 'on-track' | 'at-risk' | 'inactive';
  caseload: number;
  caseloadTarget: number;          // typically 40
  category: string;                // "Engineering" / "Operations" / etc.
  contracts: number;               // active contracts (estimate from caseload * 0.4)
  clientsCount: number;            // unique clients across contracts
  disputes: number;                // open disputes
  attention?: AttentionList;       // optional pre-built attention list
  handoffNames?: string;           // for inactive specialists, e.g. "Yuki Tanaka and Maya Tanaka"
}

function buildWorkload(input: WorkloadBuilderInput): WorkloadSection {
  const isInactive = input.status === 'inactive';
  const isAtRisk = input.status === 'at-risk';

  const utilizationPct = Math.round((input.caseload / input.caseloadTarget) * 100);
  const targetLeftPct = Math.round((input.caseloadTarget / Math.max(input.caseload, input.caseloadTarget * 1.3)) * 100);

  // Capacity variant by utilization
  const fillVariant: 'default' | 'warn' | 'danger' =
    utilizationPct >= 125 ? 'danger' : utilizationPct > 100 ? 'warn' : 'default';
  const pctVariant: 'default' | 'warn' | 'danger' = fillVariant;

  if (isInactive) {
    return {
      sectionStatus: { label: 'On leave · pre-leave snapshot', variant: 'neutral' },
      tiles: [
        { label: 'Active candidates', meta: 'handed off', value: '0', detail: `caseload routed to ${input.handoffNames ?? 'team'}` },
        { label: 'Active contracts', meta: 'closed', value: '0', detail: 'all closed before leave' },
        { label: 'Open disputes', meta: 'clean exit', value: '0', detail: '0 disputes · clean exit' },
      ],
      capacity: {
        pct: `${utilizationPct}%`,
        pctVariant: 'default',
        fillWidthPct: utilizationPct,
        fillVariant: 'default',
        targetLeftPct: 75,
        meta: `pre-leave snapshot · ${input.caseload} active caseload at handoff · target ${input.caseloadTarget}`,
      },
      // attention omitted for inactive specialists
    };
  }

  const sectionStatusLabel = input.attention
    ? `${input.attention.rows.length} ${input.attention.rows.length === 1 ? 'item' : 'items'} need${input.attention.rows.length === 1 ? 's' : ''} attention`
    : 'All clear';
  const sectionStatusVariant: 'success' | 'warn' | 'danger' = isAtRisk
    ? 'danger'
    : input.attention && input.attention.rows.length > 0
      ? 'warn'
      : 'success';

  // Tile 3 (disputes) shows amber color when disputes > 0
  const disputeTile: WorkloadTile = input.disputes === 0
    ? { label: 'Open disputes', meta: 'none open', value: '0', detail: 'no open disputes · all clear' }
    : isAtRisk
      ? { label: 'Open disputes', meta: `${input.disputes} active`, metaColor: 'var(--danger)', value: String(input.disputes), valueColor: 'var(--danger)', detail: '2 past SLA · 3 within' }
      : { label: 'Open disputes', meta: `${input.disputes} active`, metaColor: 'var(--amber)', value: String(input.disputes), valueColor: 'var(--amber)', detail: input.disputes >= 4 ? '1 past SLA · 3 within' : `${input.disputes} within SLA` };

  return {
    sectionStatus: { label: sectionStatusLabel, variant: sectionStatusVariant },
    tiles: [
      { label: 'Active candidates', meta: 'assigned', value: String(input.caseload), detail: `in ${input.category} category` },
      { label: 'Active contracts', meta: 'live', value: String(input.contracts), detail: `across ${input.clientsCount} clients` },
      disputeTile,
    ],
    capacity: {
      pct: `${utilizationPct}%`,
      pctVariant,
      fillWidthPct: utilizationPct,
      fillVariant,
      targetLeftPct,
      meta:
        utilizationPct > 100
          ? `${input.caseload} active caseload · target ${input.caseloadTarget} · ↑${input.caseload - input.caseloadTarget} above target`
          : utilizationPct === 100
            ? `${input.caseload} active caseload · target ${input.caseloadTarget} · at capacity`
            : `${input.caseload} active caseload · target ${input.caseloadTarget} · ${input.caseloadTarget - input.caseload} headroom`,
    },
    ...(input.attention ? { attention: input.attention } : {
      emptyAttention: {
        title: 'All caught up',
        detail: 'No items need attention right now · last review cleared 6 hours ago',
      },
    }),
  };
}

// ============================================================
// ACTIVITY BUILDER (Phase 7e)
// ============================================================

interface ActivityBuilderInput {
  status: 'healthy' | 'at-risk' | 'inactive' | 'new';
  category: string;
  region: string;
  // Pattern overrides
  lateDates?: number[];        // Apr-day numbers (1-30) that were late
  missedDates?: number[];      // Apr-day numbers (1-30) that were missed
  // Body lines for today's submission (highlights + plain text segments)
  todayBody?: TodayBodySegment[];
  // For "new" status — first activeDays Apr days are submitted, rest are future
  activeDays?: number;
  // For inactive
  emptyTitle?: string;
  emptyDetail?: string;
}

function buildActivity(input: ActivityBuilderInput): ActivitySection {
  // Inactive specialists — empty state
  if (input.status === 'inactive') {
    return {
      sectionStatus: { label: 'On leave · paused', variant: 'neutral' },
      cardTitle: 'Last 30 days · submission compliance',
      adherencePct: '—',
      adherenceLabel: 'on leave',
      days: [],
      legend: [],
      emptyState: {
        title: input.emptyTitle ?? 'On leave · activity paused',
        detail: input.emptyDetail ?? 'Activity paused during approved leave',
      },
    };
  }

  // Build 30-day pattern: weekend days (Apr 4,5,11,12,18,19,25,26 — Sat/Sun in Apr 2026) excused, weekdays submitted
  // Apr 1 2026 = Wednesday. So weekends fall on Apr 4-5, 11-12, 18-19, 25-26 (8 days).
  // BUT verbatim spec-001 uses Apr 3,4,10,11,17,18,24,25 as excused (8 days, Fri-Sat pattern). Match that for consistency.
  const weekendDays = new Set([3, 4, 10, 11, 17, 18, 24, 25]);
  const lateSet = new Set(input.lateDates ?? []);
  const missedSet = new Set(input.missedDates ?? []);
  const isNew = input.status === 'new';
  const activeCutoff = input.activeDays ?? 30;

  const days: ActivityDay[] = [];
  for (let day = 1; day <= 30; day++) {
    if (isNew && day > activeCutoff) {
      days.push({ status: 'future', title: `Apr ${day} · upcoming` });
    } else if (lateSet.has(day)) {
      days.push({ status: 'late', title: `Apr ${day} · submitted late (after 5pm deadline)` });
    } else if (missedSet.has(day)) {
      days.push({ status: 'missed', title: `Apr ${day} · NOT submitted` });
    } else if (weekendDays.has(day)) {
      days.push({ status: 'excused', title: `Apr ${day} · weekend` });
    } else {
      const titleSuffix = day === 30 ? '· submitted 11:42 AM' : day === 1 ? '· submitted 11:42 AM' : '';
      days.push({ status: 'submitted', title: `Apr ${day}${titleSuffix ? ' ' + titleSuffix : ''}` });
    }
  }

  // Counts
  const submittedCount = days.filter((d) => d.status === 'submitted').length;
  const lateCount = days.filter((d) => d.status === 'late').length;
  const missedCount = days.filter((d) => d.status === 'missed').length;
  const excusedCount = days.filter((d) => d.status === 'excused').length;

  // Adherence calc — submitted ÷ (submitted + late + missed) (excludes excused weekends + future)
  const evaluable = submittedCount + lateCount + missedCount;
  const adherencePct = evaluable === 0 ? '—' : `${((submittedCount / evaluable) * 100).toFixed(1)}%`;

  // Section status
  const isAtRisk = input.status === 'at-risk';
  let sectionStatusLabel: string;
  let sectionStatusVariant: 'success' | 'warn' | 'danger' | 'neutral';
  if (isAtRisk) {
    sectionStatusLabel = `${submittedCount}/${evaluable} submitted · ${lateCount + missedCount} flagged`;
    sectionStatusVariant = 'warn';
  } else if (isNew) {
    sectionStatusLabel = `${submittedCount}/${evaluable} submitted · ramping up`;
    sectionStatusVariant = 'success';
  } else if (submittedCount === evaluable && evaluable > 0) {
    sectionStatusLabel = `${submittedCount}/${evaluable} perfect adherence`;
    sectionStatusVariant = 'success';
  } else {
    sectionStatusLabel = `${submittedCount}/${evaluable} submitted on time`;
    sectionStatusVariant = 'success';
  }

  return {
    sectionStatus: { label: sectionStatusLabel, variant: sectionStatusVariant },
    cardTitle: 'Last 30 days · submission compliance',
    adherencePct,
    adherenceLabel: 'adherence rate',
    ...(isAtRisk ? { adherenceColor: 'var(--amber)' } : {}),
    days,
    legend: [
      { status: 'submitted', label: `Submitted on time (${submittedCount})` },
      { status: 'late', label: `Late (${lateCount})` },
      { status: 'missed', label: `Missed (${missedCount})` },
      { status: 'excused', label: `Weekend / excused (${excusedCount})` },
    ],
    ...(input.todayBody
      ? {
          todaySubmission: {
            dateLabel: "Today's submission · Apr 30, 2026",
            metaLabel: 'Submitted 11:42 AM',
            body: input.todayBody,
          },
        }
      : {}),
  };
}

// ============================================================
// ASSIGNMENTS BUILDER (Phase 7f)
// ============================================================

interface AssignmentsBuilderInput {
  status: 'on-track' | 'at-risk' | 'inactive' | 'pending';
  candidatesCount: number;   // for "View all N →" + section status
  clientsCount: number;      // for "View all N →"
  candidates?: AssignmentRow[]; // up to 5 rows
  clients?: AssignmentRow[];    // up to 5 rows
  // For inactive (handed-off) state
  handoffNames?: string;
  emptyTitle?: string;
  emptyDetail?: string;
}

function buildAssignments(input: AssignmentsBuilderInput): AssignmentsSection {
  if (input.status === 'inactive') {
    return {
      sectionStatus: { label: 'On leave · caseload handed off', variant: 'neutral' },
      emptyState: {
        title: input.emptyTitle ?? 'No active assignments',
        detail:
          input.emptyDetail ??
          (input.handoffNames
            ? `Caseload temporarily reassigned to ${input.handoffNames}.`
            : 'Caseload paused while specialist is on leave.'),
      },
    };
  }

  if (input.status === 'pending') {
    return {
      sectionStatus: { label: 'Onboarding · ramping caseload', variant: 'neutral' },
      ...(input.candidates && input.candidates.length > 0
        ? {
            candidates: {
              title: `Top ${input.candidates.length} active candidates`,
              viewAllLabel: `View all ${input.candidatesCount} →`,
              viewAllAction: 'view-all-candidates',
              rows: input.candidates,
            },
          }
        : {}),
      ...(input.clients && input.clients.length > 0
        ? {
            clients: {
              title: `Top ${input.clients.length} active clients`,
              viewAllLabel: `View all ${input.clientsCount} →`,
              viewAllAction: 'view-all-clients',
              rows: input.clients,
            },
          }
        : {}),
    };
  }

  return {
    sectionStatus: {
      label: `${input.candidatesCount} candidates · ${input.clientsCount} clients`,
      variant: input.status === 'at-risk' ? 'warn' : 'success',
    },
    ...(input.candidates
      ? {
          candidates: {
            title: `Top ${input.candidates.length} active candidates`,
            viewAllLabel: `View all ${input.candidatesCount} →`,
            viewAllAction: 'view-all-candidates',
            rows: input.candidates,
          },
        }
      : {}),
    ...(input.clients
      ? {
          clients: {
            title: `Top ${input.clients.length} active clients`,
            viewAllLabel: `View all ${input.clientsCount} →`,
            viewAllAction: 'view-all-clients',
            rows: input.clients,
          },
        }
      : {}),
  };
}

// ============================================================
// NOTES BUILDER (Phase 7g)
// ============================================================

interface NotesBuilderInput {
  sectionStatusLabel?: string;
  sectionStatusVariant?: 'success' | 'warn' | 'danger' | 'neutral';
  managerAuthor: string;
  managerBody: NoteBlock[];
  managerLastEdited: string;
  adminAuthor?: string; // default 'Aïsha Okafor (you)'
  adminBody: NoteBlock[];
  adminLastEdited: string;
}

function buildNotes(input: NotesBuilderInput): NotesSection {
  return {
    sectionStatus: {
      label: input.sectionStatusLabel ?? 'Last updated 2d ago',
      variant: input.sectionStatusVariant ?? 'neutral',
    },
    notes: [
      {
        kind: 'manager',
        headTitle: "Manager's notes",
        author: input.managerAuthor,
        visibility: 'Manager + Admin',
        body: input.managerBody,
        lastEdited: input.managerLastEdited,
        editAction: 'edit-manager-note',
      },
      {
        kind: 'admin',
        headTitle: "Admin's notes",
        author: input.adminAuthor ?? 'Aïsha Okafor (you)',
        visibility: 'Admin-only',
        visibilityVariant: 'admin-only',
        body: input.adminBody,
        lastEdited: input.adminLastEdited,
        editAction: 'edit-admin-note',
      },
    ],
  };
}

// ============================================================
// REVIEWS BUILDER (Phase 7h) — generates 1–4 review cycles
// ============================================================

interface ReviewsBuilderInput {
  pattern: 'on-track' | 'at-risk' | 'inactive' | 'perfect' | 'short-tenure' | 'probation';
  managerAuthor: string;       // "Mateo Vargas"
  adminAuthor?: string;        // default "Aïsha Okafor (you)"
  managerComment: string;      // latest cycle manager text
  adminComment: string;        // latest cycle admin text
  q1DeliveredDate: string;     // "Apr 8, 2026"
  q1Cycle?: string;            // "annual" by default
  initiateNextLabel?: string;  // null to hide button
  // For probation pattern (spec-010), force "Active · probation" feel
}

function buildReviews(input: ReviewsBuilderInput): ReviewsSection {
  const adminAuthor = input.adminAuthor ?? 'Aïsha Okafor (you)';
  const cycleSuffix = input.q1Cycle ?? 'annual';

  // Latest Q1 2026 cycle (always present)
  let latestRating: { value: string; high?: boolean; stars: number };
  switch (input.pattern) {
    case 'perfect':
      latestRating = { value: 'Exceeds expectations', high: true, stars: 5 };
      break;
    case 'on-track':
    case 'inactive':
      latestRating = { value: 'Exceeds expectations', high: true, stars: 4 };
      break;
    case 'at-risk':
    case 'probation':
    case 'short-tenure':
      latestRating = { value: 'Meets expectations', stars: 3 };
      break;
  }

  const latestCycle: ReviewCycle = {
    quarter: 'Q1 2026 review',
    isLatest: true,
    meta: `Final · delivered ${input.q1DeliveredDate} · cycle ${cycleSuffix}`,
    ratingLabel: 'Overall rating',
    ratingValue: latestRating.value,
    ...(latestRating.high ? { ratingHigh: true } : {}),
    starsFilled: latestRating.stars,
    comments: [
      { authorRole: 'Manager', authorName: input.managerAuthor, text: input.managerComment },
      { authorRole: 'Admin', authorName: adminAuthor, text: input.adminComment },
    ],
  };

  // Past cycles per pattern
  const pastCycles: ReviewCycle[] = [];
  if (input.pattern === 'probation') {
    // spec-010 has only the Q1 2026 latest (probation midpoint)
  } else if (input.pattern === 'short-tenure') {
    // spec-009 has 2 cycles total (Q1 + Q4)
    pastCycles.push(
      { quarter: 'Q4 2025 review', meta: 'Final · delivered Jan 11, 2026',
        ratingLabel: 'Overall', ratingValue: 'Meets expectations', starsFilled: 3 },
    );
  } else if (input.pattern === 'at-risk') {
    pastCycles.push(
      { quarter: 'Q4 2025 review', meta: 'Final · delivered Jan 11, 2026',
        ratingLabel: 'Overall', ratingValue: 'Meets expectations', starsFilled: 3 },
      { quarter: 'Q3 2025 review', meta: 'Final · delivered Oct 9, 2025',
        ratingLabel: 'Overall', ratingValue: 'Exceeds expectations', ratingHigh: true, starsFilled: 4 },
    );
  } else if (input.pattern === 'on-track') {
    pastCycles.push(
      { quarter: 'Q4 2025 review', meta: 'Final · delivered Jan 11, 2026',
        ratingLabel: 'Overall', ratingValue: 'Exceeds expectations', ratingHigh: true, starsFilled: 4 },
      { quarter: 'Q3 2025 review', meta: 'Final · delivered Oct 9, 2025',
        ratingLabel: 'Overall', ratingValue: 'Meets expectations', starsFilled: 3 },
    );
  } else if (input.pattern === 'inactive') {
    // spec-005 + spec-011 — 4 cycles total (3 past)
    pastCycles.push(
      { quarter: 'Q4 2025 review', meta: 'Final · delivered Jan 11, 2026',
        ratingLabel: 'Overall', ratingValue: 'Exceeds expectations', ratingHigh: true, starsFilled: 4 },
      { quarter: 'Q3 2025 review', meta: 'Final · delivered Oct 9, 2025',
        ratingLabel: 'Overall', ratingValue: 'Exceeds expectations', ratingHigh: true, starsFilled: 4 },
      { quarter: 'Q2 2025 review', meta: 'Final · delivered Jul 12, 2025',
        ratingLabel: 'Overall', ratingValue: 'Meets expectations', starsFilled: 3 },
    );
  } else if (input.pattern === 'perfect') {
    pastCycles.push(
      { quarter: 'Q4 2025 review', meta: 'Final · delivered Jan 11, 2026',
        ratingLabel: 'Overall', ratingValue: 'Exceeds expectations', ratingHigh: true, starsFilled: 5 },
      { quarter: 'Q3 2025 review', meta: 'Final · delivered Oct 9, 2025',
        ratingLabel: 'Overall', ratingValue: 'Exceeds expectations', ratingHigh: true, starsFilled: 5 },
      { quarter: 'Q2 2025 review', meta: 'Final · delivered Jul 12, 2025',
        ratingLabel: 'Overall', ratingValue: 'Exceeds expectations', ratingHigh: true, starsFilled: 5 },
    );
  }

  const cycles = [latestCycle, ...pastCycles];

  return {
    sectionStatus: {
      label: `${cycles.length} review${cycles.length === 1 ? '' : 's'} on file`,
      variant: input.pattern === 'at-risk' ? 'warn' : 'success',
    },
    cycles,
    ...(input.initiateNextLabel === null
      ? {}
      : { initiateLabel: input.initiateNextLabel ?? 'Initiate Q2 2026 review' }),
  };
}

// ============================================================
// HR BUILDER (Phase 7i) — generates 2 hr-cards + compliance + disciplinary
// ============================================================

interface HrBuilderInput {
  hireDate: string;            // "Aug 14, 2022"
  tenure: string;              // "3y 8mo"
  baseAndBonus: string;        // "$78,000 · 15% target performance bonus"
  equity: string;              // "3,200 RSUs · 4-yr vesting (45% vested)"
  employmentStatus: HrDdValue; // typically { text: 'Active', emphasisColor: 'success' }
  category: string;            // "Engineering (primary)"
  baseLocation: string;        // "Berlin · home · co-working"
  // Compliance pattern
  compliance: 'all-current' | 'one-due' | 'two-due';
  pendingProbationCert?: boolean; // for spec-010
  // Disciplinary
  disciplinaryDetail: string;   // "No formal warnings, PIPs, or HR-flagged incidents in 3 years 8 months of tenure."
}

function buildHr(input: HrBuilderInput): HrSection {
  const isWarn = input.employmentStatus.emphasisColor === 'warn';

  // Card 1 — Employment terms
  const employmentCard: HrCard = {
    title: 'Employment terms',
    entries: [
      { dt: 'Hire date', dd: { text: `${input.hireDate} · ${input.tenure}` } },
      { dt: 'Contract type', dd: { text: 'Full-time · permanent' } },
      { dt: 'Base + bonus', dd: { text: input.baseAndBonus } },
      { dt: 'Equity', dd: { text: input.equity } },
      { dt: 'Employment status', dd: input.employmentStatus },
      { dt: 'Termination history', dd: { text: 'None' } },
    ],
  };

  // Card 2 — Admin tool access
  const accessCard: HrCard = {
    title: 'Admin tool access',
    entries: [
      { dt: 'Permission tier', dd: { text: 'Specialist · standard' } },
      { dt: 'Elevated access', dd: { text: 'None (no admin tools)' } },
      { dt: 'Categories owned', dd: { text: input.category } },
      { dt: 'Restricted actions', dd: { text: 'Cannot suspend candidates · cannot issue refunds > $500' } },
      { dt: 'SSO domains', dd: { text: 'atlas.example · 2FA enforced' } },
      { dt: 'IP allowlist', dd: { text: `3 trusted IPs (${input.baseLocation})` } },
    ],
  };

  // Compliance rows — base 4 with last as 'due' if input.compliance != 'all-current'
  const complianceRows: ComplianceRow[] = [
    { name: 'Privacy training (GDPR + CCPA)', meta: 'Annual cycle · cert PRT-2024-2841',
      due: 'renews Apr 5, 2027', statusLabel: 'Current', variant: 'current' },
    { name: 'Security training (Phishing + MFA)', meta: 'Annual cycle · cert SEC-2024-1209',
      due: 'renews Apr 5, 2027', statusLabel: 'Current', variant: 'current' },
    { name: 'Mediation certification', meta: 'Atlas Internal Program · cert MED-2024-0048',
      due: 'renews Sep 20, 2026', statusLabel: 'Current', variant: 'current' },
  ];

  if (input.compliance === 'all-current') {
    complianceRows.push({
      name: 'Anti-fraud training', meta: 'Annual cycle · cert AF-2025-0312',
      due: 'renews Mar 12, 2027', statusLabel: 'Current', variant: 'current',
    });
  } else if (input.pendingProbationCert) {
    // spec-010 — probation cert pending
    complianceRows.push({
      name: 'Probation certification', meta: 'Atlas onboarding cohort Mar 2025',
      due: 'due May 15, 2026', statusLabel: 'Due in 1mo', variant: 'due',
    });
  } else {
    complianceRows.push({
      name: 'Anti-fraud training (refresher)', meta: 'Annual cycle · last completed Jun 2024',
      due: 'due Jun 1, 2026', statusLabel: 'Due in 4mo', variant: 'due',
    });
  }

  const summaryLabel = input.compliance === 'all-current'
    ? 'All current'
    : 'All current · 1 due in 4 months';

  return {
    sectionStatus: isWarn
      ? { label: 'On leave · clean record', variant: 'neutral' }
      : { label: 'All current · clean', variant: 'success' },
    hrCards: [employmentCard, accessCard],
    compliance: {
      summaryLabel,
      summaryVariant: input.compliance === 'all-current' ? 'success' : 'warn',
      rows: complianceRows,
    },
    disciplinary: {
      title: 'Disciplinary record · clean',
      detail: input.disciplinaryDetail,
    },
  };
}

// ============================================================
// 11 SPECIALIST FIXTURES — match users-data.ts SPECIALISTS_ROWS
// ============================================================

export const SPECIALIST_PROFILES: Record<string, SpecialistProfile> = {
  'spec-001': {
    id: 'spec-001',
    atlasId: 'spec-001-d3c9a1',
    name: 'Daniel Kovács',
    initials: 'DK',
    status: 'on-track',
    statusLabel: 'On track',
    roleTag: 'Talent Specialist',
    region: 'EU · Berlin (resident)',
    flag: '🇩🇪',
    timezone: 'Europe/Berlin · CET (UTC+1)',
    languages: 'Hungarian · English (Native) · German (C1)',
    tenure: 'Tenure 3y 8mo · since Aug 14, 2022',
    category: 'Engineering',
    manager: 'Mateo Vargas',
    performance: {
      sectionStatus: { label: 'Last 30 days · all SLAs hit', variant: 'success' },
      reviews: {
        tabCount: 156,
        stats: [
          { label: 'Reviews completed', value: '156', delta: { label: '↑12%', variant: 'up' }, meta: 'vs last 30 days' },
          { label: 'Avg review time', value: '38', vSuffix: 'h', meta: 'target < 72h SLA' },
          { label: 'Approval rate', value: '89', vSuffix: '%', meta: 'team avg 84%' },
          { label: 'SLA hit rate', value: '96.4', vSuffix: '%', delta: { label: '↑0.4', variant: 'up' }, meta: '6 breaches in Q1' },
        ],
        trend: {
          title: 'Reviews completed · last 4 weeks',
          metaTotal: 'Total 156',
          metaDelta: { label: '↑12%', variant: 'up' },
          bars: [
            { value: '32', heightPct: 64, label: 'W14' },
            { value: '38', heightPct: 76, label: 'W15' },
            { value: '42', heightPct: 84, label: 'W16' },
            { value: '44', heightPct: 100, label: 'W17' },
          ],
        },
        breakdown: [
          { label: 'Approvals', value: '139', percent: '89.1%' },
          { label: 'Skills issues', value: '9', percent: '5.8%' },
          { label: 'Integrity issues', value: '3', percent: '1.9%' },
          { label: 'Profile issues', value: '5', percent: '3.2%' },
        ],
      },
      disputes: {
        tabCount: 23,
        stats: [
          { label: 'Disputes handled', value: '23', delta: { label: '↑3', variant: 'up' }, meta: 'vs last 30 days' },
          { label: 'Avg resolution', value: '42', vSuffix: 'h', meta: 'target < 72h SLA' },
          { label: 'SLA hit rate', value: '92', vSuffix: '%', meta: '2 breaches in Q1' },
          { label: 'Escalation rate', value: '4', vSuffix: '%', meta: '1 to Manager · low' },
        ],
        trend: {
          title: 'Disputes resolved · last 4 weeks',
          metaTotal: 'Total 23',
          metaDelta: { label: '↑15%', variant: 'up' },
          bars: [
            { value: '5', heightPct: 56, label: 'W14' },
            { value: '6', heightPct: 67, label: 'W15' },
            { value: '5', heightPct: 56, label: 'W16' },
            { value: '7', heightPct: 100, label: 'W17' },
          ],
        },
        breakdown: [
          { label: 'Sided with client', value: '12', percent: '52.2%' },
          { label: 'Sided with talent', value: '7', percent: '30.4%' },
          { label: 'Partial / split', value: '3', percent: '13.1%' },
          { label: 'Dismissed', value: '1', percent: '4.3%' },
        ],
      },
      sourcing: {
        tabCount: 84,
        stats: [
          { label: 'Candidates sourced', value: '84', delta: { label: '↑6', variant: 'up' }, meta: 'vs last 30 days' },
          { label: 'Pass rate', value: '41', vSuffix: '%', meta: 'sourced → approved' },
          { label: 'Hire rate', value: '26', vSuffix: '%', meta: 'sourced → hired' },
          { label: 'Daily activity', value: '28', vSuffix: '/30', meta: '93.3% adherence' },
        ],
        trend: {
          title: 'Candidates sourced · last 4 weeks',
          metaTotal: 'Total 84',
          metaDelta: { label: '↑8%', variant: 'up' },
          bars: [
            { value: '18', heightPct: 75, label: 'W14' },
            { value: '21', heightPct: 88, label: 'W15' },
            { value: '22', heightPct: 92, label: 'W16' },
            { value: '24', heightPct: 100, label: 'W17' },
          ],
        },
        channels: [
          { name: 'LinkedIn outreach', detail: '44 messages → 18 sourced', barPct: 52, pct: '52%', meta: '41% reply rate' },
          { name: 'Direct referrals', detail: '22 sourced from past placements', barPct: 26, pct: '26%', meta: '68% conversion' },
          { name: 'FB / community groups', detail: '18 sourced from 14 posts', barPct: 22, pct: '22%', meta: '12% conversion' },
        ],
      },
      pool: {
        tabCount: 412,
        stats: [
          { label: 'Pool size · Engineering', value: '412', meta: 'target 350 · healthy' },
          { label: 'Pool health', value: 'Stable', meta: 'last 30 days', valueOverrideStyle: { color: 'var(--success)', fontSize: '20px' } },
          { label: 'Net change', value: '+18', delta: { label: '↑', variant: 'up' }, meta: '22 added · 4 deactivated' },
          { label: 'Depletion alerts', value: '0', meta: 'never below threshold' },
        ],
        trend: {
          title: 'Engineering pool size · last 4 weeks',
          metaTotal: '412',
          metaDelta: { label: '↑18 net', variant: 'up' },
          bars: [
            { value: '394', heightPct: 86, label: 'W14' },
            { value: '401', heightPct: 91, label: 'W15' },
            { value: '405', heightPct: 94, label: 'W16' },
            { value: '412', heightPct: 100, label: 'W17' },
          ],
        },
        breakdown: [
          { label: 'Live · available now', value: '287', percent: '69.7%' },
          { label: 'Live · currently engaged', value: '118', percent: '28.6%' },
          { label: 'In pipeline · being vetted', value: '7', percent: '1.7%' },
          { label: 'Pool depletion alerts', value: '0', percent: '0%' },
        ],
      },
    },
    // Workload — VERBATIM from admin.html lines 18614-18707
    workload: {
      sectionStatus: { label: '3 items need attention', variant: 'warn' },
      tiles: [
        { label: 'Active candidates', meta: 'assigned', value: '47', detail: 'in Engineering category' },
        { label: 'Active contracts', meta: 'live', value: '18', detail: 'across 14 clients' },
        { label: 'Open disputes', meta: '4 active', metaColor: 'var(--amber)', value: '4', valueColor: 'var(--amber)', detail: '1 past SLA · 3 within' },
      ],
      capacity: {
        pct: '117%',
        pctVariant: 'warn',
        fillWidthPct: 117,
        fillVariant: 'warn',
        targetLeftPct: 85,
        meta: '47 active caseload · target 40 · ↑7 above target · Sarah R. has higher (52)',
      },
      attention: {
        title: 'Needs attention right now',
        countLabel: '3 ITEMS',
        countColor: 'var(--amber)',
        rows: [
          { iconType: 'info', variant: 'danger',
            text: 'Dispute past SLA · DSP-2026-0144',
            meta: 'Studio Berlin GmbH ↔ Adesuwa Babatunde · 76h open · 4h over 72h SLA',
            time: '+4h overdue', action: 'open-dispute' },
          { iconType: 'clock', variant: 'default',
            text: 'Review due today · Marcus Thompson (cand-004)',
            meta: 'Final review · 64h since pipeline-step-9 · 8h until SLA',
            time: 'SLA in 8h', action: 'open-review' },
          { iconType: 'clock', variant: 'default',
            text: 'Review due today · Lin Wei (cand-003)',
            meta: 'Final review · 70h since pipeline-step-9 · 2h until SLA',
            time: 'SLA in 2h', action: 'open-review' },
        ],
      },
    },
    // Activity — VERBATIM from admin.html lines 18712-18777
    activity: {
      sectionStatus: { label: '28/30 submitted on time', variant: 'success' },
      cardTitle: 'Last 30 days · submission compliance',
      adherencePct: '93.3%',
      adherenceLabel: 'adherence rate',
      days: [
        { status: 'submitted', title: 'Apr 1 · submitted 11:42 AM' },
        { status: 'submitted', title: 'Apr 2 · submitted 10:15 AM' },
        { status: 'excused',   title: 'Apr 3 · weekend' },
        { status: 'excused',   title: 'Apr 4 · weekend' },
        { status: 'submitted', title: 'Apr 5' },
        { status: 'submitted', title: 'Apr 6' },
        { status: 'submitted', title: 'Apr 7' },
        { status: 'late',      title: 'Apr 8 · submitted 6:48 PM (after 5pm deadline)' },
        { status: 'submitted', title: 'Apr 9' },
        { status: 'excused',   title: 'Apr 10 · weekend' },
        { status: 'excused',   title: 'Apr 11 · weekend' },
        { status: 'submitted', title: 'Apr 12' },
        { status: 'submitted', title: 'Apr 13' },
        { status: 'submitted', title: 'Apr 14' },
        { status: 'submitted', title: 'Apr 15' },
        { status: 'missed',    title: 'Apr 16 · NOT submitted' },
        { status: 'excused',   title: 'Apr 17 · weekend' },
        { status: 'excused',   title: 'Apr 18 · weekend' },
        { status: 'submitted', title: 'Apr 19' },
        { status: 'submitted', title: 'Apr 20' },
        { status: 'submitted', title: 'Apr 21' },
        { status: 'submitted', title: 'Apr 22' },
        { status: 'submitted', title: 'Apr 23' },
        { status: 'excused',   title: 'Apr 24 · weekend' },
        { status: 'excused',   title: 'Apr 25 · weekend' },
        { status: 'submitted', title: 'Apr 26' },
        { status: 'submitted', title: 'Apr 27' },
        { status: 'submitted', title: 'Apr 28' },
        { status: 'submitted', title: 'Apr 29' },
        { status: 'submitted', title: 'Today · submitted 11:42 AM' },
      ],
      legend: [
        { status: 'submitted', label: 'Submitted on time (22)' },
        { status: 'late',      label: 'Late (1)' },
        { status: 'missed',    label: 'Missed (1)' },
        { status: 'excused',   label: 'Weekend / excused (6)' },
      ],
      todaySubmission: {
        dateLabel: "Today's submission · Apr 30, 2026",
        metaLabel: 'Submitted 11:42 AM CET',
        body: [
          { type: 'highlight', text: '12 LinkedIn outreach messages' },
          { type: 'plain', text: ' sent to Senior Backend candidates in EU · ' },
          { type: 'highlight', text: '3 candidate calls' },
          { type: 'plain', text: ' (1 first-round, 2 follow-ups) · ' },
          { type: 'highlight', text: '2 candidate reviews completed' },
          { type: 'plain', text: ' (1 approved Aigerim Bekova, 1 deferred Lin Wei pending IV-2) · ' },
          { type: 'highlight', text: '1 dispute resolution' },
          { type: 'plain', text: ' (DSP-2026-0156 partial refund $440) · ' },
          { type: 'highlight', text: '2 client check-ins' },
          { type: 'plain', text: ' (Studio Berlin re ENG-2026-184 mid-cycle, Quantum Robotics re Q3 backfill) · ' },
          { type: 'highlight', text: '1 internal note' },
          { type: 'plain', text: ' (escalated DSP-2026-0144 timeline concern to Mateo).' },
        ],
      },
    },
    // Assignments — VERBATIM from admin.html lines 18782-18888
    assignments: {
      sectionStatus: { label: '47 candidates · 14 clients', variant: 'success' },
      candidates: {
        title: 'Top 5 active candidates',
        viewAllLabel: 'View all 47 →',
        viewAllAction: 'view-all-candidates',
        rows: [
          { id: 'cand-001', initials: 'AB', avatar: 1, name: 'Adesuwa Babatunde',
            meta: '🇳🇬 NG · Senior Engineer · 12 hires · $48K',
            statusLabel: 'Live', action: 'open-candidate' },
          { id: 'cand-005', initials: 'AB', avatar: 5, name: 'Aigerim Bekova',
            meta: '🇰🇿 KZ · Virtual Assistant · 24 hires · $36K',
            statusLabel: 'Live', action: 'open-candidate' },
          { id: 'cand-007', initials: 'PS', avatar: 7, name: 'Priya Sharma',
            meta: '🇮🇳 IN · Data Engineer · 9 hires · $54K',
            statusLabel: 'Live', action: 'open-candidate' },
          { id: 'cand-003', initials: 'LW', avatar: 3, name: 'Lin Wei',
            meta: '🇹🇼 TW · Designer-Developer · in IV-2',
            statusLabel: 'Pipeline', statusVariant: 'warn', action: 'open-candidate' },
          { id: 'cand-008', initials: 'JO', avatar: 8, name: "James O'Brien",
            meta: '🇮🇪 IE · Senior Engineer · in IV-1',
            statusLabel: 'Pipeline', statusVariant: 'warn', action: 'open-candidate' },
        ],
      },
      clients: {
        title: 'Top 5 active clients',
        viewAllLabel: 'View all 14 →',
        viewAllAction: 'view-all-clients',
        rows: [
          { id: 'cl-002-7e1b3f', initials: 'SB', avatar: 10, name: 'Studio Berlin GmbH',
            meta: '🇩🇪 DE · 23 hires · $184K · Top Client',
            statusLabel: 'Active', action: 'open-client' },
          { id: 'cl-003-quantum', initials: 'QR', avatar: 11, name: 'Quantum Robotics Pte',
            meta: '🇸🇬 SG · 8 hires · $220K · Trusted',
            statusLabel: 'Active', action: 'open-client' },
          { id: 'cl-004-medco', initials: 'LM', avatar: 12, name: 'Lighthouse Med Co.',
            meta: '🇨🇦 CA · 5 hires · $72K · Trusted',
            statusLabel: 'Active', action: 'open-client' },
          { id: 'cl-006-lagos', initials: 'LL', avatar: 1, name: 'The Lagos Loom',
            meta: '🇳🇬 NG · 14 hires · $98K · Trusted',
            statusLabel: 'Active', action: 'open-client' },
          { id: 'cl-005-tundra', initials: 'OT', avatar: 2, name: 'Open Tundra Ltd.',
            meta: '🇮🇸 IS · 0 hires · onboarding',
            statusLabel: 'New', statusVariant: 'neutral', action: 'open-client' },
        ],
      },
    },
    // Notes — VERBATIM from admin.html lines 18893-18946
    notes: {
      sectionStatus: { label: 'Last updated 2d ago', variant: 'neutral' },
      notes: [
        {
          kind: 'manager',
          headTitle: "Manager's notes",
          author: 'Mateo Vargas',
          visibility: 'Manager + Admin',
          body: [
            { type: 'paragraph', emphasis: true,
              text: '"Daniel is the team\'s most consistent operator. Worth coaching toward team-lead-style responsibilities — he\'s already mentoring Lukas C. informally."' },
            { type: 'paragraph', text: 'Q1 highlights from 1:1s:' },
            { type: 'list', items: [
              'Wants more exposure to dispute mediation training (signed up for May course)',
              'Has expressed interest in eventually moving into recruitment-sprint coordination',
              'Caseload above target — discussed with Mateo on Apr 28; rebalancing 5 cases to Lukas C.',
              'Excellent rapport with Studio Berlin and other Berlin-area clients · "use this as a model"',
            ]},
          ],
          lastEdited: 'Last edited Apr 28, 2026 11:42 AM by Mateo Vargas',
          editAction: 'edit-manager-note',
        },
        {
          kind: 'admin',
          headTitle: "Admin's notes",
          author: 'Aïsha Okafor (you)',
          visibility: 'Admin-only',
          visibilityVariant: 'admin-only',
          body: [
            { type: 'paragraph', text: 'HR-side observations from Mar 2026 quarterly check:' },
            { type: 'list', items: [
              'Compliance training fully current (last completed Apr 5)',
              'No HR-flagged behaviors; no peer complaints',
              'Manager flagged "consistently above caseload target" — confirmed acceptable as long as SLA holds (it does)',
              'Eligible for retention review at end of Q2 per the 3-year tenure milestone',
            ]},
          ],
          lastEdited: 'Last edited Mar 12, 2026 by Aïsha Okafor (you)',
          editAction: 'edit-admin-note',
        },
      ],
    },
    // Reviews — VERBATIM from admin.html lines 18951-19026
    reviews: {
      sectionStatus: { label: '4 reviews on file', variant: 'success' },
      initiateLabel: 'Initiate Q2 2026 review',
      cycles: [
        {
          quarter: 'Q1 2026 review',
          isLatest: true,
          meta: 'Final · delivered Apr 8, 2026 · cycle annual',
          ratingLabel: 'Overall rating',
          ratingValue: 'Exceeds expectations',
          ratingHigh: true,
          starsFilled: 4,
          comments: [
            { authorRole: 'Manager', authorName: 'Mateo Vargas',
              text: 'Daniel continues to set the operational baseline for the EU group. Above-target SLA hit, low escalation rate, and visibly stronger client relationships than last quarter. The one note to watch: caseload running 15% above target consistently — we discussed and agreed to rebalance.' },
            { authorRole: 'Admin', authorName: 'Aïsha Okafor (you)',
              text: "Concur with Mateo's read. Compliance posture clean, communication patterns healthy, audit log shows zero red flags this cycle. Recommend approving for tenure milestone review at Q2 end." },
          ],
        },
        { quarter: 'Q4 2025 review', meta: 'Final · delivered Jan 11, 2026',
          ratingLabel: 'Overall', ratingValue: 'Exceeds expectations',
          ratingHigh: true, starsFilled: 4 },
        { quarter: 'Q3 2025 review', meta: 'Final · delivered Oct 9, 2025',
          ratingLabel: 'Overall', ratingValue: 'Meets expectations', starsFilled: 3 },
        { quarter: 'Q2 2025 review', meta: 'Final · delivered Jul 12, 2025',
          ratingLabel: 'Overall', ratingValue: 'Meets expectations', starsFilled: 3 },
      ],
    },
    // HR — VERBATIM from admin.html lines 19031-19140
    hr: {
      sectionStatus: { label: 'All current · clean', variant: 'success' },
      hrCards: [
        { title: 'Employment terms', entries: [
          { dt: 'Hire date',           dd: { text: 'Aug 14, 2022 · 3y 8mo' } },
          { dt: 'Contract type',       dd: { text: 'Full-time · permanent' } },
          { dt: 'Base + bonus',        dd: { text: '$78,000 · 15% target performance bonus' } },
          { dt: 'Equity',              dd: { text: '3,200 RSUs · 4-yr vesting (45% vested)' } },
          { dt: 'Employment status',   dd: { text: 'Active', emphasisColor: 'success' } },
          { dt: 'Termination history', dd: { text: 'None' } },
        ]},
        { title: 'Admin tool access', entries: [
          { dt: 'Permission tier',    dd: { text: 'Specialist · standard' } },
          { dt: 'Elevated access',    dd: { text: 'None (no admin tools)' } },
          { dt: 'Categories owned',   dd: { text: 'Engineering (primary)' } },
          { dt: 'Restricted actions', dd: { text: 'Cannot suspend candidates · cannot issue refunds > $500' } },
          { dt: 'SSO domains',        dd: { text: 'atlas.example · 2FA enforced' } },
          { dt: 'IP allowlist',       dd: { text: '3 trusted IPs (Berlin · home · co-working)' } },
        ]},
      ],
      compliance: {
        summaryLabel: 'All current · 1 due in 4 months',
        summaryVariant: 'warn',
        rows: [
          { name: 'Privacy training (GDPR + CCPA)',     meta: 'Annual cycle · cert PRT-2024-2841',           due: 'renews Apr 5, 2027',  statusLabel: 'Current',     variant: 'current' },
          { name: 'Security training (Phishing + MFA)', meta: 'Annual cycle · cert SEC-2024-1209',           due: 'renews Apr 5, 2027',  statusLabel: 'Current',     variant: 'current' },
          { name: 'Mediation certification',            meta: 'Atlas Internal Program · cert MED-2024-0048', due: 'renews Sep 20, 2026', statusLabel: 'Current',     variant: 'current' },
          { name: 'Anti-fraud training (refresher)',    meta: 'Annual cycle · last completed Jun 2024',     due: 'due Jun 1, 2026',     statusLabel: 'Due in 4mo',  variant: 'due' },
        ],
      },
      disciplinary: {
        title: 'Disciplinary record · clean',
        detail: 'No formal warnings, PIPs, or HR-flagged incidents in 3 years 8 months of tenure.',
      },
    },
  },

  'spec-002': {
    id: 'spec-002',
    atlasId: 'spec-002-a7f4e2',
    name: 'Sarah Reyes',
    initials: 'SR',
    status: 'at-risk',
    statusLabel: 'Caseload high',
    roleTag: 'Talent Specialist',
    region: 'Americas · Mexico City (resident)',
    flag: '🇲🇽',
    timezone: 'America/Mexico_City · CST (UTC-6)',
    languages: 'Spanish (Native) · English (C2) · Portuguese (B2)',
    tenure: 'Tenure 2y 7mo · since Sep 21, 2023',
    category: 'Operations',
    manager: 'Mateo Vargas',
    statusBanner: {
      title: 'Caseload above threshold',
      detail: 'Active caseload at 52 (target 45). SLA 92.1% (target 95%). Coordinator working with Mateo to redistribute 3-5 candidates next sprint. Review checkpoint: May 15, 2026.',
    },
    performance: buildPerformance({
      status: 'at-risk',
      slaPercent: 92.1,
      reviewsCount: 142,
      disputesCount: 31,
      category: 'Operations',
      sourcingCount: 78,
      poolSize: 318,
      channels: [
        { name: 'WhatsApp talent groups', detail: '38 messages → 14 sourced', barPct: 42, pct: '42%', meta: '37% reply rate' },
        { name: 'LinkedIn outreach', detail: '52 messages → 19 sourced', barPct: 36, pct: '36%', meta: '28% reply rate' },
        { name: 'Direct referrals', detail: '12 sourced from past placements', barPct: 22, pct: '22%', meta: '54% conversion' },
      ],
    }),
    workload: buildWorkload({
      status: 'at-risk',
      caseload: 52,
      caseloadTarget: 40,
      category: 'Operations',
      contracts: 22,
      clientsCount: 17,
      disputes: 5,
      attention: {
        title: 'Needs attention right now',
        countLabel: '5 ITEMS',
        countColor: 'var(--danger)',
        rows: [
          { iconType: 'info', variant: 'danger',
            text: 'Dispute past SLA · DSP-2026-0118',
            meta: 'Acme Holdings ↔ Carlos Restrepo · 84h open · 12h over 72h SLA',
            time: '+12h overdue', action: 'open-dispute' },
          { iconType: 'info', variant: 'danger',
            text: 'Dispute past SLA · DSP-2026-0121',
            meta: 'Lighthouse Med ↔ Anika Patel · 78h open · 6h over 72h SLA',
            time: '+6h overdue', action: 'open-dispute' },
          { iconType: 'clock', variant: 'default',
            text: 'Review due today · Mariana Costa (cand-008)',
            meta: 'Final review · 68h since pipeline-step-9 · 4h until SLA',
            time: 'SLA in 4h', action: 'open-review' },
          { iconType: 'clock', variant: 'default',
            text: 'Review due today · Diego Hernandez (cand-012)',
            meta: 'Final review · 66h since pipeline-step-9 · 6h until SLA',
            time: 'SLA in 6h', action: 'open-review' },
          { iconType: 'clock', variant: 'default',
            text: 'Review due today · Camila Rodríguez (cand-019)',
            meta: 'Final review · 60h since pipeline-step-9 · 12h until SLA',
            time: 'SLA in 12h', action: 'open-review' },
        ],
      },
    }),
    activity: buildActivity({
      status: 'at-risk',
      category: 'Operations',
      region: 'Mexico City',
      lateDates: [8, 15, 22],
      missedDates: [16],
      todayBody: [
        { type: 'highlight', text: '8 LinkedIn outreach messages' },
        { type: 'plain', text: ' sent to Operations candidates in LATAM · ' },
        { type: 'highlight', text: '2 candidate calls' },
        { type: 'plain', text: ' (both follow-ups) · ' },
        { type: 'highlight', text: '5 candidate reviews completed' },
        { type: 'plain', text: ' (caseload above target, working through queue) · ' },
        { type: 'highlight', text: '2 dispute resolutions' },
        { type: 'plain', text: ' (DSP-2026-0118 + DSP-2026-0121 — both partial refunds) · ' },
        { type: 'highlight', text: '1 client check-in' },
        { type: 'plain', text: ' (Acme Holdings re Carlos Restrepo escalation) · ' },
        { type: 'highlight', text: '1 internal note' },
        { type: 'plain', text: ' (flagged caseload pressure to Mateo — redistribution requested).' },
      ],
    }),
    assignments: buildAssignments({
      status: 'at-risk',
      candidatesCount: 52,
      clientsCount: 17,
      candidates: [
        { id: 'cand-002', initials: 'CR', avatar: 1, name: 'Carlos Restrepo',
          meta: '🇨🇴 CO · Logistics Manager · 6 hires · $38K',
          statusLabel: 'Live', action: 'open-candidate' },
        { id: 'cand-001', initials: 'AB', avatar: 2, name: 'Adesuwa Babatunde',
          meta: '🇳🇬 NG · Senior Engineer · 12 hires · $48K',
          statusLabel: 'Live', action: 'open-candidate' },
        { id: 'cand-006', initials: 'DK', avatar: 3, name: 'Deniz Kaya',
          meta: '🇹🇷 TR · Ops Coordinator · 7 hires · $34K',
          statusLabel: 'Live', action: 'open-candidate' },
        { id: 'cand-008', initials: 'JO', avatar: 4, name: "James O'Brien",
          meta: '🇮🇪 IE · Senior Engineer · in IV-2',
          statusLabel: 'Pipeline', statusVariant: 'warn', action: 'open-candidate' },
        { id: 'cand-004', initials: 'MT', avatar: 5, name: 'Marcus Thompson',
          meta: '🇺🇸 US · Process Analyst · in IV-1',
          statusLabel: 'Pipeline', statusVariant: 'warn', action: 'open-candidate' },
      ],
      clients: [
        { id: 'cl-001-acme', initials: 'AH', avatar: 4, name: 'Acme Holdings, Inc.',
          meta: '🇺🇸 US · 28 hires · $312K · Top Client',
          statusLabel: 'Active', action: 'open-client' },
        { id: 'cl-004-medco', initials: 'LM', avatar: 12, name: 'Lighthouse Med Co.',
          meta: '🇨🇦 CA · 12 hires · $156K · Trusted',
          statusLabel: 'Active', action: 'open-client' },
        { id: 'cl-005-tundra', initials: 'OT', avatar: 9, name: 'Open Tundra Ltd.',
          meta: '🇮🇸 IS · 9 hires · $88K · Trusted',
          statusLabel: 'Active', action: 'open-client' },
        { id: 'cl-006-lagos', initials: 'LL', avatar: 6, name: 'The Lagos Loom',
          meta: '🇳🇬 NG · 4 hires · $52K',
          statusLabel: 'Active', action: 'open-client' },
        { id: 'cl-003-quantum', initials: 'QR', avatar: 11, name: 'Quantum Robotics Pte. Ltd.',
          meta: '🇸🇬 SG · 0 hires · onboarding',
          statusLabel: 'New', statusVariant: 'neutral', action: 'open-client' },
      ],
    }),
    notes: buildNotes({
      sectionStatusLabel: 'Last updated 1d ago',
      managerAuthor: 'Mateo Vargas',
      managerBody: [
        { type: 'paragraph', emphasis: true,
          text: '"Sarah is one of the strongest LATAM operators we have. The caseload pressure is structural, not a performance issue — we need to formalize redistribution by mid-May."' },
        { type: 'paragraph', text: 'Coaching focus this quarter:' },
        { type: 'list', items: [
          'Caseload at 52 vs 45 target — discussed Apr 25; redistributing 5-7 to backfill hire',
          'SLA dipped to 92.1% (target 95%) directly tied to volume — not effort',
          'Excellent dispute mediation track record (2 resolved on Apr 30 alone)',
          'Strong WhatsApp talent-group sourcing pattern; worth documenting for the team',
        ]},
      ],
      managerLastEdited: 'Last edited Apr 29, 2026 4:18 PM by Mateo Vargas',
      adminBody: [
        { type: 'paragraph', text: 'HR observations from Q1 2026 review:' },
        { type: 'list', items: [
          'Caseload-high status flagged Apr 12; remediation plan in motion',
          'No HR concerns; no peer complaints',
          'Compliance training current (last completed Mar 28)',
          'Watch-item: ensure SLA returns to ≥95% by May 15 checkpoint',
        ]},
      ],
      adminLastEdited: 'Last edited Apr 22, 2026 by Aïsha Okafor (you)',
    }),
    reviews: buildReviews({
      pattern: 'at-risk',
      managerAuthor: 'Mateo Vargas',
      q1DeliveredDate: 'Apr 12, 2026',
      managerComment: 'Sarah is one of the strongest LATAM operators on the team — but the caseload pressure is showing up in SLA. Q1 dipped to 92.1% (target 95%) directly tied to volume, not effort. Two disputes ran past SLA; both resolved with partial refunds. Redistribution plan agreed Apr 28; checkpoint May 15.',
      adminComment: 'Concur — performance trajectory healthy modulo caseload. No HR concerns; compliance current; one stress-related sick day Mar 14 (not flagged). Recommend a "meets" rating with caseload remediation as the binding deliverable through Q2.',
    }),
    hr: buildHr({
      hireDate: 'Sep 21, 2023',
      tenure: '2y 7mo',
      baseAndBonus: '$72,000 · 12% target performance bonus',
      equity: '2,400 RSUs · 4-yr vesting (38% vested)',
      employmentStatus: { text: 'Active', emphasisColor: 'success' },
      category: 'Operations (primary)',
      baseLocation: 'Mexico City · home · co-working',
      compliance: 'all-current',
      disciplinaryDetail: 'No formal warnings, PIPs, or HR-flagged incidents in 2 years 7 months of tenure. One stress-related sick day Mar 14, 2026 (not flagged).',
    }),
  },

  'spec-003': {
    id: 'spec-003',
    atlasId: 'spec-003-b8c2f9',
    name: 'Jamal Nasir',
    initials: 'JN',
    status: 'on-track',
    statusLabel: 'On track',
    roleTag: 'Talent Specialist',
    region: 'MENA · Dubai (resident)',
    flag: '🇦🇪',
    timezone: 'Asia/Dubai · GST (UTC+4)',
    languages: 'Arabic (Native) · English (C2) · French (B2)',
    tenure: 'Tenure 2y 4mo · since Jan 16, 2024',
    category: 'Finance',
    manager: 'Mateo Vargas',
    performance: buildPerformance({
      status: 'healthy',
      slaPercent: 98.2,
      reviewsCount: 134,
      disputesCount: 18,
      category: 'Finance',
      sourcingCount: 74,
      poolSize: 286,
      channels: [
        { name: 'LinkedIn outreach', detail: '52 messages → 24 sourced', barPct: 58, pct: '58%', meta: '46% reply rate' },
        { name: 'Direct referrals', detail: '21 sourced from past placements', barPct: 30, pct: '30%', meta: '72% conversion' },
        { name: 'Industry trade groups', detail: '8 sourced from MENA finance forums', barPct: 12, pct: '12%', meta: '24% conversion' },
      ],
    }),
    workload: buildWorkload({
      status: 'on-track',
      caseload: 38,
      caseloadTarget: 40,
      category: 'Finance',
      contracts: 15,
      clientsCount: 11,
      disputes: 1,
      attention: {
        title: 'Needs attention right now',
        countLabel: '1 ITEM',
        countColor: 'var(--amber)',
        rows: [
          { iconType: 'clock', variant: 'default',
            text: 'Review due today · Faisal Al-Mahmoud (cand-021)',
            meta: 'Final review · 56h since pipeline-step-9 · 16h until SLA',
            time: 'SLA in 16h', action: 'open-review' },
        ],
      },
    }),
    activity: buildActivity({
      status: 'healthy',
      category: 'Finance',
      region: 'Dubai',
      todayBody: [
        { type: 'highlight', text: '10 LinkedIn outreach messages' },
        { type: 'plain', text: ' sent to Finance candidates in MENA · ' },
        { type: 'highlight', text: '4 candidate calls' },
        { type: 'plain', text: ' (2 first-round, 2 follow-ups) · ' },
        { type: 'highlight', text: '3 candidate reviews completed' },
        { type: 'plain', text: ' (all approved — strong Gulf banking pipeline) · ' },
        { type: 'highlight', text: '1 client check-in' },
        { type: 'plain', text: ' (Quantum Robotics re Series B finance lead) · ' },
        { type: 'highlight', text: '1 internal note' },
        { type: 'plain', text: ' (KYC verification pattern flagged for new region rollout).' },
      ],
    }),
    assignments: buildAssignments({
      status: 'on-track',
      candidatesCount: 38,
      clientsCount: 11,
      candidates: [
        { id: 'cand-007', initials: 'PS', avatar: 1, name: 'Priya Sharma',
          meta: '🇮🇳 IN · Finance Analyst · 9 hires · $54K',
          statusLabel: 'Live', action: 'open-candidate' },
        { id: 'cand-002', initials: 'CR', avatar: 2, name: 'Carlos Restrepo',
          meta: '🇨🇴 CO · Treasury Lead · 7 hires · $42K',
          statusLabel: 'Live', action: 'open-candidate' },
        { id: 'cand-001', initials: 'AB', avatar: 3, name: 'Adesuwa Babatunde',
          meta: '🇳🇬 NG · KYC Officer · 6 hires · $48K',
          statusLabel: 'Live', action: 'open-candidate' },
        { id: 'cand-008', initials: 'JO', avatar: 4, name: "James O'Brien",
          meta: '🇮🇪 IE · Risk Specialist · in IV-1',
          statusLabel: 'Pipeline', statusVariant: 'warn', action: 'open-candidate' },
      ],
      clients: [
        { id: 'cl-001-acme', initials: 'AH', avatar: 4, name: 'Acme Holdings, Inc.',
          meta: '🇺🇸 US · 14 hires · $264K · Top Client',
          statusLabel: 'Active', action: 'open-client' },
        { id: 'cl-004-medco', initials: 'LM', avatar: 12, name: 'Lighthouse Med Co.',
          meta: '🇨🇦 CA · 6 hires · $182K · Trusted',
          statusLabel: 'Active', action: 'open-client' },
        { id: 'cl-002-7e1b3f', initials: 'SB', avatar: 10, name: 'Studio Berlin GmbH',
          meta: '🇩🇪 DE · 5 hires · $94K · Trusted',
          statusLabel: 'Active', action: 'open-client' },
        { id: 'cl-005-tundra', initials: 'OT', avatar: 2, name: 'Open Tundra Ltd.',
          meta: '🇮🇸 IS · 0 hires · onboarding',
          statusLabel: 'New', statusVariant: 'neutral', action: 'open-client' },
      ],
    }),
    notes: buildNotes({
      managerAuthor: 'Mateo Vargas',
      managerBody: [
        { type: 'paragraph', emphasis: true,
          text: '"Jamal is our anchor for the MENA finance build-out. KYC instincts are sharp; clients in Riyadh and Doha specifically request him."' },
        { type: 'paragraph', text: 'Q1 development priorities:' },
        { type: 'list', items: [
          'Lead candidate for MENA team-lead promotion in H2',
          'Strong cross-border KYC pattern recognition — drafting an SOP off his work',
          'Mentoring Hassan Al-Rashid (spec-010) through onboarding',
          'Caseload at 38 — comfortable below 40 target; can absorb more',
        ]},
      ],
      managerLastEdited: 'Last edited Apr 24, 2026 9:32 AM by Mateo Vargas',
      adminBody: [
        { type: 'paragraph', text: 'HR-side notes from Mar 2026 check:' },
        { type: 'list', items: [
          'No HR flags; compliance training current (last completed Apr 1)',
          'Approved for cross-border travel allowance (Q3 expansion)',
          'Eligible for retention bonus at 2.5y tenure milestone (Jul 2026)',
        ]},
      ],
      adminLastEdited: 'Last edited Mar 18, 2026 by Aïsha Okafor (you)',
    }),
    reviews: buildReviews({
      pattern: 'on-track',
      managerAuthor: 'Mateo Vargas',
      q1DeliveredDate: 'Apr 6, 2026',
      managerComment: 'Jamal anchored the MENA finance build-out in Q1. SLA at 98.2%, KYC instinct clean across Riyadh/Doha/Dubai accounts. Mentoring Hassan (spec-010) through onboarding has freed cycles for the SOP draft. Promotion candidate for H2.',
      adminComment: 'Concur — exemplary cycle. No HR notes; compliance current. Approved for the cross-border travel allowance to support Q3 expansion. Retention review on calendar for Jul 2026 (2.5y tenure milestone).',
    }),
    hr: buildHr({
      hireDate: 'Jan 16, 2024',
      tenure: '2y 4mo',
      baseAndBonus: '$74,000 · 15% target performance bonus',
      equity: '2,200 RSUs · 4-yr vesting (33% vested)',
      employmentStatus: { text: 'Active', emphasisColor: 'success' },
      category: 'Finance (primary)',
      baseLocation: 'Dubai · home · co-working',
      compliance: 'all-current',
      disciplinaryDetail: 'No formal warnings, PIPs, or HR-flagged incidents in 2 years 4 months of tenure.',
    }),
  },

  'spec-004': {
    id: 'spec-004',
    atlasId: 'spec-004-e1d7b3',
    name: 'Maya Tanaka',
    initials: 'MT',
    status: 'on-track',
    statusLabel: 'On track',
    roleTag: 'Talent Specialist',
    region: 'APAC · Tokyo (resident)',
    flag: '🇯🇵',
    timezone: 'Asia/Tokyo · JST (UTC+9)',
    languages: 'Japanese (Native) · English (C2) · Korean (B1)',
    tenure: 'Tenure 1y 11mo · since Jun 10, 2024',
    category: 'Engineering',
    manager: 'Mateo Vargas',
    performance: buildPerformance({
      status: 'healthy',
      slaPercent: 97.8,
      reviewsCount: 145,
      disputesCount: 22,
      category: 'Engineering',
      sourcingCount: 80,
      poolSize: 388,
      channels: [
        { name: 'LinkedIn outreach', detail: '46 messages → 19 sourced', barPct: 48, pct: '48%', meta: '41% reply rate' },
        { name: 'GitHub / dev communities', detail: '24 sourced from open-source contributors', barPct: 30, pct: '30%', meta: '38% conversion' },
        { name: 'Direct referrals', detail: '17 sourced from past placements', barPct: 22, pct: '22%', meta: '64% conversion' },
      ],
    }),
    workload: buildWorkload({
      status: 'on-track',
      caseload: 41,
      caseloadTarget: 40,
      category: 'Engineering',
      contracts: 16,
      clientsCount: 12,
      disputes: 2,
      attention: {
        title: 'Needs attention right now',
        countLabel: '2 ITEMS',
        countColor: 'var(--amber)',
        rows: [
          { iconType: 'clock', variant: 'default',
            text: 'Review due today · Hiroyuki Sato (cand-027)',
            meta: 'Final review · 62h since pipeline-step-9 · 10h until SLA',
            time: 'SLA in 10h', action: 'open-review' },
          { iconType: 'clock', variant: 'default',
            text: 'Review due today · Akira Watanabe (cand-031)',
            meta: 'Final review · 58h since pipeline-step-9 · 14h until SLA',
            time: 'SLA in 14h', action: 'open-review' },
        ],
      },
    }),
    activity: buildActivity({
      status: 'healthy',
      category: 'Engineering',
      region: 'Tokyo',
      missedDates: [16],
      todayBody: [
        { type: 'highlight', text: '14 LinkedIn outreach messages' },
        { type: 'plain', text: ' sent to Engineering candidates in APAC · ' },
        { type: 'highlight', text: '5 candidate calls' },
        { type: 'plain', text: ' (3 first-round, 2 follow-ups) · ' },
        { type: 'highlight', text: '4 candidate reviews completed' },
        { type: 'plain', text: ' (all approved — strong Tokyo backend pipeline) · ' },
        { type: 'highlight', text: '2 client check-ins' },
        { type: 'plain', text: ' (Quantum Robotics re ML Engineer pipeline + new APAC client onboarding) · ' },
        { type: 'highlight', text: '1 internal note' },
        { type: 'plain', text: ' (proposed weekly Tokyo office hours for new candidates).' },
      ],
    }),
    assignments: buildAssignments({
      status: 'on-track',
      candidatesCount: 41,
      clientsCount: 12,
      candidates: [
        { id: 'cand-003', initials: 'LW', avatar: 1, name: 'Lin Wei',
          meta: '🇹🇼 TW · Backend Engineer · 9 hires · $72K',
          statusLabel: 'Live', action: 'open-candidate' },
        { id: 'cand-005', initials: 'AB', avatar: 2, name: 'Aigerim Bekova',
          meta: '🇰🇿 KZ · ML Engineer · 6 hires · $84K',
          statusLabel: 'Live', action: 'open-candidate' },
        { id: 'cand-007', initials: 'PS', avatar: 3, name: 'Priya Sharma',
          meta: '🇮🇳 IN · Frontend Engineer · 11 hires · $58K',
          statusLabel: 'Live', action: 'open-candidate' },
        { id: 'cand-008', initials: 'JO', avatar: 4, name: "James O'Brien",
          meta: '🇮🇪 IE · DevOps · in IV-2',
          statusLabel: 'Pipeline', statusVariant: 'warn', action: 'open-candidate' },
        { id: 'cand-002', initials: 'CR', avatar: 5, name: 'Carlos Restrepo',
          meta: '🇨🇴 CO · Backend Engineer · in IV-1',
          statusLabel: 'Pipeline', statusVariant: 'warn', action: 'open-candidate' },
      ],
      clients: [
        { id: 'cl-003-quantum', initials: 'QR', avatar: 11, name: 'Quantum Robotics Pte. Ltd.',
          meta: '🇸🇬 SG · 8 hires · $220K · Top Client',
          statusLabel: 'Active', action: 'open-client' },
        { id: 'cl-002-7e1b3f', initials: 'SB', avatar: 10, name: 'Studio Berlin GmbH',
          meta: '🇩🇪 DE · 12 hires · $168K · Trusted',
          statusLabel: 'Active', action: 'open-client' },
        { id: 'cl-001-acme', initials: 'AH', avatar: 4, name: 'Acme Holdings, Inc.',
          meta: '🇺🇸 US · 7 hires · $112K · Trusted',
          statusLabel: 'Active', action: 'open-client' },
        { id: 'cl-006-lagos', initials: 'LL', avatar: 6, name: 'The Lagos Loom',
          meta: '🇳🇬 NG · 4 hires · $76K',
          statusLabel: 'Active', action: 'open-client' },
        { id: 'cl-005-tundra', initials: 'OT', avatar: 9, name: 'Open Tundra Ltd.',
          meta: '🇮🇸 IS · 0 hires · onboarding',
          statusLabel: 'New', statusVariant: 'neutral', action: 'open-client' },
      ],
    }),
    notes: buildNotes({
      managerAuthor: 'Mateo Vargas',
      managerBody: [
        { type: 'paragraph', emphasis: true,
          text: '"Maya is the most efficient sourcer on the APAC team — GitHub-driven pipelines have higher pass rates than the LinkedIn average."' },
        { type: 'list', items: [
          'Strong technical interviewing instincts; backend pipelines are her sweet spot',
          'Initiated weekly Tokyo office hours — clients are asking us to scale this',
          'Q1 conversion rate among top three on the team',
          'Worth promoting visibility internally — she does not self-advocate enough',
        ]},
      ],
      managerLastEdited: 'Last edited Apr 21, 2026 11:08 AM by Mateo Vargas',
      adminBody: [
        { type: 'paragraph', text: 'HR check-in (Mar 2026):' },
        { type: 'list', items: [
          'Compliance training current; passed Q1 with merit',
          'No HR concerns; tenure approaching 2y milestone (June)',
          'Considered for Tokyo office regional liaison role',
        ]},
      ],
      adminLastEdited: 'Last edited Mar 9, 2026 by Aïsha Okafor (you)',
    }),
    reviews: buildReviews({
      pattern: 'on-track',
      managerAuthor: 'Mateo Vargas',
      q1DeliveredDate: 'Apr 9, 2026',
      managerComment: 'Maya is the most efficient sourcer on the APAC team — GitHub-driven pipelines have higher pass rates than the LinkedIn average. Tokyo office-hours initiative drew positive client feedback from Quantum Robotics and Studio Berlin. One coaching note: needs to self-advocate more — her impact is under-narrated internally.',
      adminComment: 'Concur — strong Q1. No HR concerns; compliance current with Q1 merit pass. Considered for the Tokyo regional liaison role conversation in H2. Approaching 2y tenure milestone in June.',
    }),
    hr: buildHr({
      hireDate: 'Jun 10, 2024',
      tenure: '1y 11mo',
      baseAndBonus: '$76,000 · 12% target performance bonus',
      equity: '2,000 RSUs · 4-yr vesting (24% vested)',
      employmentStatus: { text: 'Active', emphasisColor: 'success' },
      category: 'Engineering (primary)',
      baseLocation: 'Tokyo · home · co-working',
      compliance: 'all-current',
      disciplinaryDetail: 'No formal warnings, PIPs, or HR-flagged incidents in 1 year 11 months of tenure.',
    }),
  },

  'spec-005': {
    id: 'spec-005',
    atlasId: 'spec-005-f4a8c1',
    name: 'Lukas Chen',
    initials: 'LC',
    status: 'inactive',
    statusLabel: 'On break',
    roleTag: 'Talent Specialist',
    region: 'APAC · Singapore (resident)',
    flag: '🇸🇬',
    timezone: 'Asia/Singapore · SGT (UTC+8)',
    languages: 'Mandarin (Native) · English (Native) · Malay (B2)',
    tenure: 'Tenure 3y 1mo · since Apr 02, 2023',
    category: 'Design',
    manager: 'Mateo Vargas',
    statusBanner: {
      title: 'Sabbatical leave',
      detail: 'Approved 8-week sabbatical through Jun 28, 2026. Caseload temporarily redistributed to Yuki Tanaka and Maya Tanaka. Return-to-work briefing scheduled for week of Jun 22.',
    },
    performance: buildPerformance({
      status: 'inactive',
      slaPercent: 94.5,
      reviewsCount: 138,
      disputesCount: 19,
      category: 'Design',
      sourcingCount: 72,
      poolSize: 274,
      channels: [
        { name: 'LinkedIn outreach', detail: '38 messages → 16 sourced (pre-leave)', barPct: 44, pct: '44%', meta: '42% reply rate' },
        { name: 'Dribbble / Behance', detail: '20 sourced from design portfolios', barPct: 30, pct: '30%', meta: '35% conversion' },
        { name: 'Direct referrals', detail: '14 sourced from past placements', barPct: 22, pct: '22%', meta: '70% conversion' },
      ],
    }),
    workload: buildWorkload({
      status: 'inactive',
      caseload: 39,
      caseloadTarget: 40,
      category: 'Design',
      contracts: 0,
      clientsCount: 0,
      disputes: 0,
      handoffNames: 'Yuki Tanaka and Maya Tanaka',
    }),
    activity: buildActivity({
      status: 'inactive',
      category: 'Design',
      region: 'Singapore',
      emptyTitle: 'On leave · activity paused',
      emptyDetail: 'Activity paused since Apr 22, 2026 · returning Jun 28, 2026 · caseload handed off to Yuki Tanaka and Maya Tanaka',
    }),
    assignments: buildAssignments({
      status: 'inactive',
      candidatesCount: 0,
      clientsCount: 0,
      handoffNames: 'Yuki Tanaka and Maya Tanaka',
      emptyTitle: 'Caseload handed off · sabbatical',
      emptyDetail: '39 candidates and 14 clients reassigned through Jun 28, 2026 · returning briefing scheduled for week of Jun 22.',
    }),
    notes: buildNotes({
      sectionStatusLabel: 'Last updated 6w ago',
      managerAuthor: 'Mateo Vargas',
      managerBody: [
        { type: 'paragraph', emphasis: true,
          text: '"Lukas earned this sabbatical — three years of consistently top-tier design sourcing. Plan is to return him as a senior IC with possible team-lead conversation in Q4."' },
        { type: 'list', items: [
          '8-week sabbatical approved Mar 12, 2026; effective through Jun 28',
          'Caseload redistribution completed Apr 22 (Yuki + Maya covering)',
          'Lukas mentoring Daniel K. informally on Asia-Pacific design sourcing',
          'Re-onboarding plan drafted — light caseload Jul, full ramp by Aug',
        ]},
      ],
      managerLastEdited: 'Last edited Mar 18, 2026 by Mateo Vargas',
      adminBody: [
        { type: 'paragraph', text: 'HR-side notes for sabbatical period:' },
        { type: 'list', items: [
          'Sabbatical approved per 3-year tenure benefit (formalized Mar 5)',
          'Compliance training renewed Apr 18 (pre-leave window)',
          'Benefits + health coverage continuous through leave window',
          'Return-to-work briefing on calendar for Jun 22, 2026',
        ]},
      ],
      adminLastEdited: 'Last edited Mar 18, 2026 by Aïsha Okafor (you)',
    }),
    reviews: buildReviews({
      pattern: 'inactive',
      managerAuthor: 'Mateo Vargas',
      q1DeliveredDate: 'Apr 18, 2026',
      managerComment: 'Lukas closed Q1 strong before sabbatical handoff (Apr 22). 94.5% SLA, top-tier design sourcing through Dribbble + Behance + the warm referral network. Caseload redistribution to Yuki + Maya completed cleanly. Re-onboarding light caseload Jul, full ramp Aug.',
      adminComment: 'Concur — clean cycle. Approved for the 8-week sabbatical per the 3-year tenure benefit (formalized Mar 5). No HR concerns. Compliance training renewed Apr 18 (pre-leave window). Returning Jun 28.',
    }),
    hr: buildHr({
      hireDate: 'Apr 2, 2023',
      tenure: '3y 1mo',
      baseAndBonus: '$74,000 · 14% target performance bonus',
      equity: '2,800 RSUs · 4-yr vesting (52% vested)',
      employmentStatus: { text: 'On sabbatical · returning Jun 28, 2026', emphasisColor: 'warn' },
      category: 'Design (primary)',
      baseLocation: 'Singapore · home · co-working',
      compliance: 'all-current',
      disciplinaryDetail: 'No formal warnings, PIPs, or HR-flagged incidents in 3 years 1 month of tenure.',
    }),
  },

  'spec-006': {
    id: 'spec-006',
    atlasId: 'spec-006-c9e3a7',
    name: 'Ana Silva',
    initials: 'AS',
    status: 'on-track',
    statusLabel: 'On track',
    roleTag: 'Talent Specialist',
    region: 'LATAM · São Paulo (resident)',
    flag: '🇧🇷',
    timezone: 'America/Sao_Paulo · BRT (UTC-3)',
    languages: 'Portuguese (Native) · Spanish (C1) · English (C1)',
    tenure: 'Tenure 2y 5mo · since Nov 28, 2023',
    category: 'Healthcare',
    manager: 'Mateo Vargas',
    performance: buildPerformance({
      status: 'healthy',
      slaPercent: 95.7,
      reviewsCount: 148,
      disputesCount: 26,
      category: 'Healthcare',
      sourcingCount: 81,
      poolSize: 248,
      channels: [
        { name: 'LinkedIn outreach', detail: '48 messages → 21 sourced', barPct: 50, pct: '50%', meta: '44% reply rate' },
        { name: 'Healthcare networks', detail: '22 sourced from Brazilian medical associations', barPct: 28, pct: '28%', meta: '52% conversion' },
        { name: 'Direct referrals', detail: '18 sourced from past placements', barPct: 22, pct: '22%', meta: '66% conversion' },
      ],
    }),
    workload: buildWorkload({
      status: 'on-track',
      caseload: 44,
      caseloadTarget: 40,
      category: 'Healthcare',
      contracts: 17,
      clientsCount: 13,
      disputes: 2,
      attention: {
        title: 'Needs attention right now',
        countLabel: '1 ITEM',
        countColor: 'var(--amber)',
        rows: [
          { iconType: 'clock', variant: 'default',
            text: 'Review due today · Beatriz Costa (cand-014)',
            meta: 'Final review · 65h since pipeline-step-9 · 7h until SLA',
            time: 'SLA in 7h', action: 'open-review' },
        ],
      },
    }),
    activity: buildActivity({
      status: 'healthy',
      category: 'Healthcare',
      region: 'São Paulo',
      lateDates: [22],
      todayBody: [
        { type: 'highlight', text: '11 LinkedIn outreach messages' },
        { type: 'plain', text: ' sent to Healthcare candidates in LATAM · ' },
        { type: 'highlight', text: '3 candidate calls' },
        { type: 'plain', text: ' (1 first-round, 2 follow-ups) · ' },
        { type: 'highlight', text: '3 candidate reviews completed' },
        { type: 'plain', text: ' (2 approved, 1 deferred pending licensing verification) · ' },
        { type: 'highlight', text: '2 client check-ins' },
        { type: 'plain', text: ' (Lighthouse Med re Clinical Researcher pipeline, new São Paulo clinic onboarding) · ' },
        { type: 'highlight', text: '1 internal note' },
        { type: 'plain', text: ' (proposed regional licensing fast-track for healthcare specialists).' },
      ],
    }),
    assignments: buildAssignments({
      status: 'on-track',
      candidatesCount: 44,
      clientsCount: 13,
      candidates: [
        { id: 'cand-001', initials: 'AB', avatar: 1, name: 'Adesuwa Babatunde',
          meta: '🇳🇬 NG · Clinical Researcher · 7 hires · $62K',
          statusLabel: 'Live', action: 'open-candidate' },
        { id: 'cand-006', initials: 'DK', avatar: 2, name: 'Deniz Kaya',
          meta: '🇹🇷 TR · Hospital Operations · 10 hires · $48K',
          statusLabel: 'Live', action: 'open-candidate' },
        { id: 'cand-002', initials: 'CR', avatar: 3, name: 'Carlos Restrepo',
          meta: '🇨🇴 CO · Pharma Liaison · 6 hires · $54K',
          statusLabel: 'Live', action: 'open-candidate' },
        { id: 'cand-007', initials: 'PS', avatar: 4, name: 'Priya Sharma',
          meta: '🇮🇳 IN · Health Tech · in IV-1',
          statusLabel: 'Pipeline', statusVariant: 'warn', action: 'open-candidate' },
      ],
      clients: [
        { id: 'cl-004-medco', initials: 'LM', avatar: 12, name: 'Lighthouse Med Co.',
          meta: '🇨🇦 CA · 18 hires · $246K · Top Client',
          statusLabel: 'Active', action: 'open-client' },
        { id: 'cl-006-lagos', initials: 'LL', avatar: 1, name: 'The Lagos Loom',
          meta: '🇳🇬 NG · 9 hires · $134K · Trusted',
          statusLabel: 'Active', action: 'open-client' },
        { id: 'cl-001-acme', initials: 'AH', avatar: 4, name: 'Acme Holdings, Inc.',
          meta: '🇺🇸 US · 6 hires · $98K · Trusted',
          statusLabel: 'Active', action: 'open-client' },
      ],
    }),
    notes: buildNotes({
      managerAuthor: 'Mateo Vargas',
      managerBody: [
        { type: 'paragraph', emphasis: true,
          text: '"Ana is the most empathetic candidate-facing operator we have. Healthcare hiring needs that touch — keep her here even as we expand the team."' },
        { type: 'list', items: [
          'Healthcare network sourcing pattern is a model — documenting for ops',
          'Caseload at 44 (target 40) is sustainable; keeping watch but no concern',
          'Proposed regional licensing fast-track — drafting RFC now',
          'Lighthouse Med specifically calls out her work in their reviews',
        ]},
      ],
      managerLastEdited: 'Last edited Apr 27, 2026 2:55 PM by Mateo Vargas',
      adminBody: [
        { type: 'paragraph', text: 'HR notes from Mar 2026 check:' },
        { type: 'list', items: [
          'Compliance training current; passed Q1 with merit',
          'No HR concerns; tenure 2y 5mo · retention review eligible Q4',
          'Backup contact for LATAM regional emergency procedures',
        ]},
      ],
      adminLastEdited: 'Last edited Mar 14, 2026 by Aïsha Okafor (you)',
    }),
    reviews: buildReviews({
      pattern: 'on-track',
      managerAuthor: 'Mateo Vargas',
      q1DeliveredDate: 'Apr 10, 2026',
      managerComment: 'Ana is the most empathetic candidate-facing operator on the team — her healthcare-network sourcing pattern is now being documented as a model for the LATAM playbook. SLA at 95.7%; one deferred candidate pending licensing verification. Lighthouse Med specifically called out her work in their Q1 client review.',
      adminComment: 'Concur — strong cycle. No HR concerns; compliance current; Q1 merit pass. Approved as backup contact for LATAM regional emergency procedures. Retention review eligible Q4 (2y 5mo tenure).',
    }),
    hr: buildHr({
      hireDate: 'Nov 28, 2023',
      tenure: '2y 5mo',
      baseAndBonus: '$73,000 · 13% target performance bonus',
      equity: '2,200 RSUs · 4-yr vesting (40% vested)',
      employmentStatus: { text: 'Active', emphasisColor: 'success' },
      category: 'Healthcare (primary)',
      baseLocation: 'São Paulo · home · co-working',
      compliance: 'all-current',
      disciplinaryDetail: 'No formal warnings, PIPs, or HR-flagged incidents in 2 years 5 months of tenure.',
    }),
  },

  'spec-007': {
    id: 'spec-007',
    atlasId: 'spec-007-d6b1e8',
    name: 'Yuki Tanaka',
    initials: 'YT',
    status: 'on-track',
    statusLabel: 'On track',
    roleTag: 'Talent Specialist',
    region: 'APAC · Osaka (resident)',
    flag: '🇯🇵',
    timezone: 'Asia/Tokyo · JST (UTC+9)',
    languages: 'Japanese (Native) · English (C1) · Mandarin (B2)',
    tenure: 'Tenure 1y 8mo · since Sep 11, 2024',
    category: 'Manufacturing',
    manager: 'Mateo Vargas',
    performance: buildPerformance({
      status: 'healthy',
      slaPercent: 96.9,
      reviewsCount: 152,
      disputesCount: 24,
      category: 'Manufacturing',
      sourcingCount: 84,
      poolSize: 264,
      channels: [
        { name: 'Industry trade groups', detail: '34 sourced from manufacturing forums', barPct: 44, pct: '44%', meta: '38% conversion' },
        { name: 'LinkedIn outreach', detail: '42 messages → 16 sourced', barPct: 36, pct: '36%', meta: '38% reply rate' },
        { name: 'Direct referrals', detail: '14 sourced from past placements', barPct: 20, pct: '20%', meta: '62% conversion' },
      ],
    }),
    workload: buildWorkload({
      status: 'on-track',
      caseload: 42,
      caseloadTarget: 40,
      category: 'Manufacturing',
      contracts: 16,
      clientsCount: 12,
      disputes: 2,
      attention: {
        title: 'Needs attention right now',
        countLabel: '1 ITEM',
        countColor: 'var(--amber)',
        rows: [
          { iconType: 'clock', variant: 'default',
            text: 'Review due today · Kenji Yamaguchi (cand-038)',
            meta: 'Final review · 60h since pipeline-step-9 · 12h until SLA',
            time: 'SLA in 12h', action: 'open-review' },
        ],
      },
    }),
    activity: buildActivity({
      status: 'healthy',
      category: 'Manufacturing',
      region: 'Osaka',
      lateDates: [9],
      todayBody: [
        { type: 'highlight', text: '13 LinkedIn outreach messages' },
        { type: 'plain', text: ' sent to Manufacturing candidates in APAC · ' },
        { type: 'highlight', text: '4 candidate calls' },
        { type: 'plain', text: ' (2 first-round, 2 follow-ups) · ' },
        { type: 'highlight', text: '3 candidate reviews completed' },
        { type: 'plain', text: ' (all approved · strong Osaka manufacturing pipeline) · ' },
        { type: 'highlight', text: '1 client check-in' },
        { type: 'plain', text: ' (new Manufacturing client onboarding · Aichi Heavy Industries) · ' },
        { type: 'highlight', text: '1 internal note' },
        { type: 'plain', text: ' (industry trade group partnership proposal — APAC manufacturing forum).' },
      ],
    }),
    assignments: buildAssignments({
      status: 'on-track',
      candidatesCount: 42,
      clientsCount: 12,
      candidates: [
        { id: 'cand-005', initials: 'AB', avatar: 1, name: 'Aigerim Bekova',
          meta: '🇰🇿 KZ · Plant Operations · 8 hires · $74K',
          statusLabel: 'Live', action: 'open-candidate' },
        { id: 'cand-003', initials: 'LW', avatar: 2, name: 'Lin Wei',
          meta: '🇹🇼 TW · Quality Engineer · 11 hires · $58K',
          statusLabel: 'Live', action: 'open-candidate' },
        { id: 'cand-008', initials: 'JO', avatar: 3, name: "James O'Brien",
          meta: '🇮🇪 IE · Process Engineer · 9 hires · $52K',
          statusLabel: 'Live', action: 'open-candidate' },
        { id: 'cand-007', initials: 'PS', avatar: 4, name: 'Priya Sharma',
          meta: '🇮🇳 IN · Robotics Tech · in IV-2',
          statusLabel: 'Pipeline', statusVariant: 'warn', action: 'open-candidate' },
      ],
      clients: [
        { id: 'cl-003-quantum', initials: 'QR', avatar: 11, name: 'Quantum Robotics Pte. Ltd.',
          meta: '🇸🇬 SG · 15 hires · $228K · Top Client',
          statusLabel: 'Active', action: 'open-client' },
        { id: 'cl-005-tundra', initials: 'OT', avatar: 9, name: 'Open Tundra Ltd.',
          meta: '🇮🇸 IS · 11 hires · $164K · Trusted',
          statusLabel: 'Active', action: 'open-client' },
        { id: 'cl-001-acme', initials: 'AH', avatar: 4, name: 'Acme Holdings, Inc.',
          meta: '🇺🇸 US · 7 hires · $112K · Trusted',
          statusLabel: 'Active', action: 'open-client' },
        { id: 'cl-002-7e1b3f', initials: 'SB', avatar: 10, name: 'Studio Berlin GmbH',
          meta: '🇩🇪 DE · 4 hires · $74K',
          statusLabel: 'Active', action: 'open-client' },
      ],
    }),
    notes: buildNotes({
      managerAuthor: 'Mateo Vargas',
      managerBody: [
        { type: 'paragraph', emphasis: true,
          text: '"Yuki has built the strongest manufacturing-trade-group sourcing motion on the team. Aichi Heavy treats him like an in-house recruiter."' },
        { type: 'list', items: [
          'Industry forum partnership proposal in motion (APAC mfg)',
          'Helping cover for Lukas C. through sabbatical (Apr-Jun)',
          'Caseload at 42 — comfortable; can absorb more volume in Q3',
          'Promotion candidate for next sprint coordinator track',
        ]},
      ],
      managerLastEdited: 'Last edited Apr 26, 2026 1:14 PM by Mateo Vargas',
      adminBody: [
        { type: 'paragraph', text: 'HR notes from Mar 2026 check:' },
        { type: 'list', items: [
          'Compliance training current (Mar 30, 2026)',
          'No HR concerns; absorbing handoff caseload smoothly',
          'Eligible for sourcing-coordinator track conversation in Q3',
        ]},
      ],
      adminLastEdited: 'Last edited Mar 11, 2026 by Aïsha Okafor (you)',
    }),
    reviews: buildReviews({
      pattern: 'on-track',
      managerAuthor: 'Mateo Vargas',
      q1DeliveredDate: 'Apr 11, 2026',
      managerComment: 'Yuki built the strongest manufacturing-trade-group sourcing motion on the team — Aichi Heavy treats him like an in-house recruiter. Q1 SLA 96.9%, absorbed handoff caseload from Lukas with zero ramp friction. APAC industry-forum partnership proposal in motion for Q3.',
      adminComment: 'Concur — strong cycle. No HR concerns; compliance current (Mar 30 renewal). Eligible for sourcing-coordinator track conversation in Q3. Approaching 2y tenure milestone.',
    }),
    hr: buildHr({
      hireDate: 'Sep 11, 2024',
      tenure: '1y 8mo',
      baseAndBonus: '$72,000 · 12% target performance bonus',
      equity: '1,800 RSUs · 4-yr vesting (21% vested)',
      employmentStatus: { text: 'Active', emphasisColor: 'success' },
      category: 'Manufacturing (primary)',
      baseLocation: 'Osaka · home · co-working',
      compliance: 'all-current',
      disciplinaryDetail: 'No formal warnings, PIPs, or HR-flagged incidents in 1 year 8 months of tenure.',
    }),
  },

  'spec-008': {
    id: 'spec-008',
    atlasId: 'spec-008-e9c2a5',
    name: 'Kofi Asante',
    initials: 'KA',
    status: 'on-track',
    statusLabel: 'On track',
    roleTag: 'Talent Specialist',
    region: 'Africa · Accra (resident)',
    flag: '🇬🇭',
    timezone: 'Africa/Accra · GMT (UTC+0)',
    languages: 'English (Native) · Twi (Native) · French (B1)',
    tenure: 'Tenure 2y 9mo · since Aug 22, 2023',
    category: 'Sustainability',
    manager: 'Mateo Vargas',
    performance: buildPerformance({
      status: 'healthy',
      slaPercent: 99.1,
      reviewsCount: 128,
      disputesCount: 14,
      category: 'Sustainability',
      sourcingCount: 70,
      poolSize: 198,
      channels: [
        { name: 'Community / NGO networks', detail: '32 sourced from West African sustainability groups', barPct: 50, pct: '50%', meta: '54% conversion' },
        { name: 'LinkedIn outreach', detail: '28 messages → 14 sourced', barPct: 30, pct: '30%', meta: '50% reply rate' },
        { name: 'Direct referrals', detail: '12 sourced from past placements', barPct: 20, pct: '20%', meta: '74% conversion' },
      ],
    }),
    workload: buildWorkload({
      status: 'on-track',
      caseload: 36,
      caseloadTarget: 40,
      category: 'Sustainability',
      contracts: 14,
      clientsCount: 9,
      disputes: 0,
      // No attention list — all caught up (uses emptyAttention default)
    }),
    activity: buildActivity({
      status: 'healthy',
      category: 'Sustainability',
      region: 'Accra',
      // No late, no missed — perfect adherence
      todayBody: [
        { type: 'highlight', text: '9 community network outreach messages' },
        { type: 'plain', text: ' sent to Sustainability candidates across West Africa · ' },
        { type: 'highlight', text: '3 candidate calls' },
        { type: 'plain', text: ' (all first-round) · ' },
        { type: 'highlight', text: '2 candidate reviews completed' },
        { type: 'plain', text: ' (both approved · strong Accra sustainability pipeline) · ' },
        { type: 'highlight', text: '1 client check-in' },
        { type: 'plain', text: ' (new sustainability client onboarding · Lagos Loom expansion) · ' },
        { type: 'highlight', text: '1 internal note' },
        { type: 'plain', text: ' (proposed NGO partnership for West African talent sourcing pipeline).' },
      ],
    }),
    assignments: buildAssignments({
      status: 'on-track',
      candidatesCount: 36,
      clientsCount: 9,
      candidates: [
        { id: 'cand-001', initials: 'AB', avatar: 1, name: 'Adesuwa Babatunde',
          meta: '🇳🇬 NG · Climate Analyst · 6 hires · $42K',
          statusLabel: 'Live', action: 'open-candidate' },
        { id: 'cand-006', initials: 'DK', avatar: 2, name: 'Deniz Kaya',
          meta: '🇹🇷 TR · ESG Reporter · 9 hires · $48K',
          statusLabel: 'Live', action: 'open-candidate' },
        { id: 'cand-007', initials: 'PS', avatar: 3, name: 'Priya Sharma',
          meta: '🇮🇳 IN · Sustainability Lead · 7 hires · $52K',
          statusLabel: 'Live', action: 'open-candidate' },
        { id: 'cand-002', initials: 'CR', avatar: 4, name: 'Carlos Restrepo',
          meta: '🇨🇴 CO · Renewable PM · in IV-2',
          statusLabel: 'Pipeline', statusVariant: 'warn', action: 'open-candidate' },
      ],
      clients: [
        { id: 'cl-006-lagos', initials: 'LL', avatar: 1, name: 'The Lagos Loom',
          meta: '🇳🇬 NG · 14 hires · $98K · Top Client',
          statusLabel: 'Active', action: 'open-client' },
        { id: 'cl-005-tundra', initials: 'OT', avatar: 9, name: 'Open Tundra Ltd.',
          meta: '🇮🇸 IS · 8 hires · $84K · Trusted',
          statusLabel: 'Active', action: 'open-client' },
        { id: 'cl-001-acme', initials: 'AH', avatar: 4, name: 'Acme Holdings, Inc.',
          meta: '🇺🇸 US · 5 hires · $46K · Trusted',
          statusLabel: 'Active', action: 'open-client' },
      ],
    }),
    notes: buildNotes({
      managerAuthor: 'Mateo Vargas',
      managerBody: [
        { type: 'paragraph', emphasis: true,
          text: '"Kofi has the cleanest SLA record on the team — 99.1% — and the best candidate-NPS scores. The community-network sourcing motion is something the rest of the team is now copying."' },
        { type: 'list', items: [
          'Perfect 30-day adherence (no missed/late submissions)',
          'NGO partnership proposal in motion — high signal for Africa expansion',
          'Mentor for new specialists; informally onboarded 3 hires this year',
          'Long-term retention priority',
        ]},
      ],
      managerLastEdited: 'Last edited Apr 26, 2026 5:02 PM by Mateo Vargas',
      adminBody: [
        { type: 'paragraph', text: 'HR notes from Mar 2026 check:' },
        { type: 'list', items: [
          'Compliance training current; full Q1 marks',
          'No HR concerns; eligible for retention bonus at 3y milestone (Aug 2026)',
          'Approved for sustainability conference travel (May 2026)',
        ]},
      ],
      adminLastEdited: 'Last edited Mar 7, 2026 by Aïsha Okafor (you)',
    }),
    reviews: buildReviews({
      pattern: 'perfect',
      managerAuthor: 'Mateo Vargas',
      q1DeliveredDate: 'Apr 5, 2026',
      managerComment: 'Kofi has the cleanest SLA on the team — 99.1% — and the best candidate-NPS scores. Perfect 30-day adherence; community-network sourcing motion is now a documented playbook. Mentored 3 new hires informally this year. Long-term retention priority.',
      adminComment: 'Concur — exemplary cycle. No HR concerns; full Q1 compliance marks. Approved for sustainability conference travel (May 2026). Retention bonus eligible at 3y milestone (Aug 2026).',
    }),
    hr: buildHr({
      hireDate: 'Aug 22, 2023',
      tenure: '2y 9mo',
      baseAndBonus: '$74,000 · 16% target performance bonus',
      equity: '2,400 RSUs · 4-yr vesting (44% vested)',
      employmentStatus: { text: 'Active', emphasisColor: 'success' },
      category: 'Sustainability (primary)',
      baseLocation: 'Accra · home · co-working',
      compliance: 'all-current',
      disciplinaryDetail: 'No formal warnings, PIPs, or HR-flagged incidents in 2 years 9 months of tenure. Exemplary record across all categories.',
    }),
  },

  'spec-009': {
    id: 'spec-009',
    atlasId: 'spec-009-a3f7c4',
    name: 'Elena Volkov',
    initials: 'EV',
    status: 'on-track',
    statusLabel: 'On track',
    roleTag: 'Talent Specialist',
    region: 'EU · Tbilisi (resident)',
    flag: '🇬🇪',
    timezone: 'Asia/Tbilisi · GET (UTC+4)',
    languages: 'Russian (Native) · Georgian (Native) · English (C1)',
    tenure: 'Tenure 1y 5mo · since Dec 04, 2024',
    category: 'Operations',
    manager: 'Mateo Vargas',
    performance: buildPerformance({
      status: 'healthy',
      slaPercent: 95.2,
      reviewsCount: 141,
      disputesCount: 21,
      category: 'Operations',
      sourcingCount: 77,
      poolSize: 232,
      channels: [
        { name: 'LinkedIn outreach', detail: '40 messages → 18 sourced', barPct: 48, pct: '48%', meta: '45% reply rate' },
        { name: 'Telegram / regional groups', detail: '21 sourced from CIS operations channels', barPct: 32, pct: '32%', meta: '40% conversion' },
        { name: 'Direct referrals', detail: '14 sourced from past placements', barPct: 20, pct: '20%', meta: '68% conversion' },
      ],
    }),
    workload: buildWorkload({
      status: 'on-track',
      caseload: 40,
      caseloadTarget: 40,
      category: 'Operations',
      contracts: 15,
      clientsCount: 11,
      disputes: 1,
      attention: {
        title: 'Needs attention right now',
        countLabel: '1 ITEM',
        countColor: 'var(--amber)',
        rows: [
          { iconType: 'clock', variant: 'default',
            text: 'Review due today · Nika Beridze (cand-052)',
            meta: 'Final review · 55h since pipeline-step-9 · 17h until SLA',
            time: 'SLA in 17h', action: 'open-review' },
        ],
      },
    }),
    activity: buildActivity({
      status: 'healthy',
      category: 'Operations',
      region: 'Tbilisi',
      lateDates: [22],
      missedDates: [9],
      todayBody: [
        { type: 'highlight', text: '10 LinkedIn outreach messages' },
        { type: 'plain', text: ' sent to Operations candidates in CIS region · ' },
        { type: 'highlight', text: '3 candidate calls' },
        { type: 'plain', text: ' (2 first-round, 1 follow-up) · ' },
        { type: 'highlight', text: '3 candidate reviews completed' },
        { type: 'plain', text: ' (2 approved, 1 deferred) · ' },
        { type: 'highlight', text: '1 client check-in' },
        { type: 'plain', text: ' (regional ops onboarding · Tbilisi-based fintech) · ' },
        { type: 'highlight', text: '1 internal note' },
        { type: 'plain', text: ' (Telegram regional groups partnership renewed for Q3).' },
      ],
    }),
    assignments: buildAssignments({
      status: 'on-track',
      candidatesCount: 40,
      clientsCount: 11,
      candidates: [
        { id: 'cand-008', initials: 'JO', avatar: 1, name: "James O'Brien",
          meta: '🇮🇪 IE · Ops Manager · 8 hires · $46K',
          statusLabel: 'Live', action: 'open-candidate' },
        { id: 'cand-002', initials: 'CR', avatar: 2, name: 'Carlos Restrepo',
          meta: '🇨🇴 CO · Logistics Lead · 11 hires · $42K',
          statusLabel: 'Live', action: 'open-candidate' },
        { id: 'cand-001', initials: 'AB', avatar: 3, name: 'Adesuwa Babatunde',
          meta: '🇳🇬 NG · Process Analyst · 7 hires · $38K',
          statusLabel: 'Live', action: 'open-candidate' },
        { id: 'cand-006', initials: 'DK', avatar: 4, name: 'Deniz Kaya',
          meta: '🇹🇷 TR · Supply Chain · in IV-2',
          statusLabel: 'Pipeline', statusVariant: 'warn', action: 'open-candidate' },
      ],
      clients: [
        { id: 'cl-002-7e1b3f', initials: 'SB', avatar: 10, name: 'Studio Berlin GmbH',
          meta: '🇩🇪 DE · 12 hires · $148K · Top Client',
          statusLabel: 'Active', action: 'open-client' },
        { id: 'cl-005-tundra', initials: 'OT', avatar: 9, name: 'Open Tundra Ltd.',
          meta: '🇮🇸 IS · 8 hires · $96K · Trusted',
          statusLabel: 'Active', action: 'open-client' },
        { id: 'cl-001-acme', initials: 'AH', avatar: 4, name: 'Acme Holdings, Inc.',
          meta: '🇺🇸 US · 6 hires · $74K · Trusted',
          statusLabel: 'Active', action: 'open-client' },
      ],
    }),
    notes: buildNotes({
      managerAuthor: 'Mateo Vargas',
      managerBody: [
        { type: 'paragraph', emphasis: true,
          text: '"Elena built our CIS-region pipeline almost from scratch. Telegram-channel sourcing pattern is now a documented playbook."' },
        { type: 'list', items: [
          'Telegram-group partnerships renewed for Q3 — strong conversion',
          'Bilingual review capability (RU/EN) closes hiring loops faster',
          'Caseload at 40 — exactly on target; sustainable',
          'Strong candidate experience scores from CIS hires',
        ]},
      ],
      managerLastEdited: 'Last edited Apr 25, 2026 10:48 AM by Mateo Vargas',
      adminBody: [
        { type: 'paragraph', text: 'HR notes from Mar 2026 check:' },
        { type: 'list', items: [
          'Compliance training current (Mar 22, 2026)',
          'No HR concerns; first-year retention milestone passed Dec 4, 2025',
          'Approved as primary point-of-contact for CIS regional escalations',
        ]},
      ],
      adminLastEdited: 'Last edited Mar 6, 2026 by Aïsha Okafor (you)',
    }),
    reviews: buildReviews({
      pattern: 'short-tenure',
      managerAuthor: 'Mateo Vargas',
      q1DeliveredDate: 'Apr 7, 2026',
      managerComment: 'Elena built our CIS-region pipeline almost from scratch. Telegram-channel sourcing pattern is now a documented playbook. Caseload at 40 — exactly on target. Bilingual review capability (RU/EN) closes hiring loops faster than the team average.',
      adminComment: 'Concur — solid Q1 with strong upward trajectory from Q4. Compliance current (Mar 22). No HR concerns. First-year retention milestone passed Dec 4, 2025. Approved as primary point-of-contact for CIS regional escalations.',
    }),
    hr: buildHr({
      hireDate: 'Dec 4, 2024',
      tenure: '1y 5mo',
      baseAndBonus: '$70,000 · 12% target performance bonus',
      equity: '1,600 RSUs · 4-yr vesting (10% vested)',
      employmentStatus: { text: 'Active', emphasisColor: 'success' },
      category: 'Operations (primary)',
      baseLocation: 'Tbilisi · home · co-working',
      compliance: 'all-current',
      disciplinaryDetail: 'No formal warnings, PIPs, or HR-flagged incidents in 1 year 5 months of tenure.',
    }),
  },

  'spec-010': {
    id: 'spec-010',
    atlasId: 'spec-010-b2d8f1',
    name: 'Hassan Al-Rashid',
    initials: 'HA',
    status: 'on-track',
    statusLabel: 'On track',
    roleTag: 'Talent Specialist',
    region: 'MENA · Riyadh (resident)',
    flag: '🇸🇦',
    timezone: 'Asia/Riyadh · AST (UTC+3)',
    languages: 'Arabic (Native) · English (C2)',
    tenure: 'Tenure 1y 2mo · since Mar 17, 2025',
    category: 'Finance',
    manager: 'Mateo Vargas',
    performance: buildPerformance({
      status: 'healthy',
      slaPercent: 97.5,
      reviewsCount: 119,
      disputesCount: 16,
      category: 'Finance',
      sourcingCount: 65,
      poolSize: 218,
      channels: [
        { name: 'LinkedIn outreach', detail: '46 messages → 22 sourced', barPct: 60, pct: '60%', meta: '48% reply rate' },
        { name: 'Direct referrals', detail: '18 sourced from past placements', barPct: 28, pct: '28%', meta: '70% conversion' },
        { name: 'Industry forums', detail: '8 sourced from Gulf finance networks', barPct: 12, pct: '12%', meta: '32% conversion' },
      ],
    }),
    workload: buildWorkload({
      status: 'on-track',
      caseload: 35,
      caseloadTarget: 40,
      category: 'Finance',
      contracts: 13,
      clientsCount: 9,
      disputes: 0,
      // No attention list — all caught up (uses emptyAttention default)
    }),
    activity: buildActivity({
      status: 'new',
      category: 'Finance',
      region: 'Riyadh',
      activeDays: 24, // 24 days submitted, 6 days future (still ramping up)
      todayBody: [
        { type: 'highlight', text: '8 LinkedIn outreach messages' },
        { type: 'plain', text: ' sent to Finance candidates in Gulf region · ' },
        { type: 'highlight', text: '2 candidate calls' },
        { type: 'plain', text: ' (both first-round) · ' },
        { type: 'highlight', text: '2 candidate reviews completed' },
        { type: 'plain', text: ' (both approved · ramp going well) · ' },
        { type: 'highlight', text: '1 mentor sync' },
        { type: 'plain', text: ' (with Daniel Kovács · onboarding ramp checkpoint) · ' },
        { type: 'highlight', text: '1 internal note' },
        { type: 'plain', text: ' (probation milestones tracked — on schedule for Q3 review).' },
      ],
    }),
    assignments: buildAssignments({
      status: 'on-track',
      candidatesCount: 35,
      clientsCount: 9,
      candidates: [
        { id: 'cand-007', initials: 'PS', avatar: 1, name: 'Priya Sharma',
          meta: '🇮🇳 IN · Risk Analyst · 5 hires · $52K',
          statusLabel: 'Live', action: 'open-candidate' },
        { id: 'cand-002', initials: 'CR', avatar: 2, name: 'Carlos Restrepo',
          meta: '🇨🇴 CO · Audit Lead · 8 hires · $68K',
          statusLabel: 'Live', action: 'open-candidate' },
        { id: 'cand-008', initials: 'JO', avatar: 3, name: "James O'Brien",
          meta: '🇮🇪 IE · Compliance Officer · 6 hires · $58K',
          statusLabel: 'Live', action: 'open-candidate' },
      ],
      clients: [
        { id: 'cl-001-acme', initials: 'AH', avatar: 4, name: 'Acme Holdings, Inc.',
          meta: '🇺🇸 US · 7 hires · $156K · Trusted',
          statusLabel: 'Active', action: 'open-client' },
        { id: 'cl-004-medco', initials: 'LM', avatar: 12, name: 'Lighthouse Med Co.',
          meta: '🇨🇦 CA · 5 hires · $98K · Trusted',
          statusLabel: 'Active', action: 'open-client' },
      ],
    }),
    notes: buildNotes({
      sectionStatusLabel: 'Last updated 4d ago',
      managerAuthor: 'Mateo Vargas',
      managerBody: [
        { type: 'paragraph', emphasis: true,
          text: '"Hassan is the strongest probation hire we have on the team — picking up Saudi/Gulf finance pipelines with very little ramp friction. Jamal is doing the formal mentoring and the chemistry is excellent."' },
        { type: 'paragraph', text: 'Probation milestones (3-month plan):' },
        { type: 'list', items: [
          'Month 1 (Mar): Shadowed Jamal — completed (✓)',
          'Month 2 (Apr): First independent caseload at 35 — on track (✓)',
          'Month 3 (May): Independent dispute handling — scheduled May 15',
          'Q3 review: caseload to 40, full probation graduation',
        ]},
      ],
      managerLastEdited: 'Last edited Apr 26, 2026 9:14 AM by Mateo Vargas',
      adminBody: [
        { type: 'paragraph', text: 'HR + onboarding notes:' },
        { type: 'list', items: [
          'Probation hire Mar 17, 2025; first review May 15, 2026',
          'Compliance training current; passed all probation modules',
          'Background check + KYC verification fully cleared',
          'No HR concerns; integrating well with MENA team',
        ]},
      ],
      adminLastEdited: 'Last edited Apr 18, 2026 by Aïsha Okafor (you)',
    }),
    reviews: buildReviews({
      pattern: 'probation',
      managerAuthor: 'Mateo Vargas',
      q1DeliveredDate: 'Apr 14, 2026',
      q1Cycle: 'probation midpoint',
      managerComment: "Hassan is the strongest probation hire on the team — picking up Saudi/Gulf finance pipelines with very little ramp friction. Jamal is doing the formal mentoring and the chemistry is excellent. Independent caseload at 35 ahead of plan. Probation graduation review scheduled May 15.",
      adminComment: 'Concur — ramping well. Background check + KYC verification fully cleared; passed all probation modules. One pending: probation cert due May 15. No HR concerns; integrating well with MENA team.',
    }),
    hr: buildHr({
      hireDate: 'Mar 17, 2025',
      tenure: '1y 2mo',
      baseAndBonus: '$68,000 · 10% probation performance bonus',
      equity: '1,200 RSUs · 4-yr vesting (15% vested)',
      employmentStatus: { text: 'Active · probation (graduates May 15, 2026)', emphasisColor: 'warn' },
      category: 'Finance (primary)',
      baseLocation: 'Riyadh · home · co-working',
      compliance: 'one-due',
      pendingProbationCert: true,
      disciplinaryDetail: 'No formal warnings, PIPs, or HR-flagged incidents in 1 year 2 months of tenure (probation period).',
    }),
  },

  'spec-011': {
    id: 'spec-011',
    atlasId: 'spec-011-c5e9a2',
    name: 'Olivia Park',
    initials: 'OP',
    status: 'inactive',
    statusLabel: 'On break',
    roleTag: 'Talent Specialist',
    region: 'Americas · Vancouver (resident)',
    flag: '🇨🇦',
    timezone: 'America/Vancouver · PST (UTC-8)',
    languages: 'English (Native) · Korean (Native) · French (B2)',
    tenure: 'Tenure 2y 2mo · since Mar 03, 2024',
    category: 'Design',
    manager: 'Mateo Vargas',
    statusBanner: {
      title: 'Wellness leave',
      detail: 'Approved 6-week wellness leave through Jun 14, 2026. Active candidates handed off to Sarah Reyes and Daniel Kovács. Phased return planned mid-June.',
    },
    performance: buildPerformance({
      status: 'inactive',
      slaPercent: 96.0,
      reviewsCount: 144,
      disputesCount: 25,
      category: 'Design',
      sourcingCount: 75,
      poolSize: 286,
      channels: [
        { name: 'LinkedIn outreach', detail: '42 messages → 18 sourced (pre-leave)', barPct: 48, pct: '48%', meta: '43% reply rate' },
        { name: 'Dribbble / Behance', detail: '21 sourced from design portfolios', barPct: 30, pct: '30%', meta: '38% conversion' },
        { name: 'Direct referrals', detail: '15 sourced from past placements', barPct: 22, pct: '22%', meta: '68% conversion' },
      ],
    }),
    workload: buildWorkload({
      status: 'inactive',
      caseload: 43,
      caseloadTarget: 40,
      category: 'Design',
      contracts: 0,
      clientsCount: 0,
      disputes: 0,
      handoffNames: 'Sarah Reyes and Daniel Kovács',
    }),
    activity: buildActivity({
      status: 'inactive',
      category: 'Design',
      region: 'Vancouver',
      emptyTitle: 'On leave · activity paused',
      emptyDetail: 'Activity paused since Apr 18, 2026 · returning Jun 14, 2026 · caseload handed off to Sarah Reyes and Daniel Kovács',
    }),
    assignments: buildAssignments({
      status: 'inactive',
      candidatesCount: 0,
      clientsCount: 0,
      handoffNames: 'Sarah Reyes and Daniel Kovács',
      emptyTitle: 'Caseload handed off · wellness leave',
      emptyDetail: '43 candidates and 11 clients reassigned through Jun 14, 2026 · phased return planned mid-June.',
    }),
    notes: buildNotes({
      sectionStatusLabel: 'Last updated 3w ago',
      managerAuthor: 'Mateo Vargas',
      managerBody: [
        { type: 'paragraph', emphasis: true,
          text: '"Olivia\'s output before leave was strong; we want her returning at her own pace. Phased return with light caseload first, then full ramp."' },
        { type: 'list', items: [
          '6-week wellness leave approved Apr 12; effective through Jun 14',
          'Caseload redistribution completed Apr 18 (Sarah + Daniel covering)',
          'Pre-leave performance: 96% SLA, 144 reviews — fully ramped',
          'Phased return plan: light caseload Jun 15-30, full caseload Jul 1',
        ]},
      ],
      managerLastEdited: 'Last edited Apr 14, 2026 by Mateo Vargas',
      adminBody: [
        { type: 'paragraph', text: 'HR-side notes for leave window:' },
        { type: 'list', items: [
          'Wellness leave approved Apr 9, 2026 (manager + HR sign-off)',
          'Compliance training renewed Apr 12 (pre-leave)',
          'Benefits + EAP coverage continuous through leave window',
          'Return-to-work check-in on calendar for Jun 8, 2026',
        ]},
      ],
      adminLastEdited: 'Last edited Apr 14, 2026 by Aïsha Okafor (you)',
    }),
    reviews: buildReviews({
      pattern: 'inactive',
      managerAuthor: 'Mateo Vargas',
      q1DeliveredDate: 'Apr 14, 2026',
      managerComment: "Olivia's output before leave was strong — 96% SLA, 144 reviews completed, fully ramped on the Vancouver design pipeline. We want her returning at her own pace: phased return with light caseload first (Jun 15-30), then full ramp Jul 1.",
      adminComment: 'Concur — clean cycle pre-leave. Wellness leave approved Apr 9 (manager + HR sign-off). Compliance training renewed Apr 12 (pre-leave). Benefits + EAP coverage continuous through leave window. Return-to-work check-in scheduled for Jun 8.',
    }),
    hr: buildHr({
      hireDate: 'Mar 3, 2024',
      tenure: '2y 2mo',
      baseAndBonus: '$73,000 · 13% target performance bonus',
      equity: '2,000 RSUs · 4-yr vesting (28% vested)',
      employmentStatus: { text: 'On leave · returning Jun 14, 2026', emphasisColor: 'warn' },
      category: 'Design (primary)',
      baseLocation: 'Vancouver · home · co-working',
      compliance: 'all-current',
      disciplinaryDetail: 'No formal warnings, PIPs, or HR-flagged incidents in 2 years 2 months of tenure.',
    }),
  },
};
