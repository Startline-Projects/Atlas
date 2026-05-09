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

  // Section data fields will be added in Phases 7f–7k:
  // assignments?, notes?, reviews?, hr?, auditLog?, quickFacts?
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
  },
};
