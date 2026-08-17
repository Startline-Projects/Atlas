/**
 * Phase 8a/8b — Manager Detail Page Data
 *
 * Single fixture (mgr-001 Mateo Vargas) — all data sourced verbatim from
 * admin.html view-manager (lines 19363-20624).
 *
 * Status union mirrors SpecialistProfile (5 states). For mgr-001, status =
 * 'on-track' per admin.html line 19382 data-mgr-status="on-track".
 */

// ============================================================
// HERO TYPES (Phase 8a)
// ============================================================

export interface ManagerProfile {
  // Identity
  id: string;
  atlasId: string;
  name: string;
  initials: string;

  // Hero status
  status: 'on-track' | 'at-risk' | 'off-track' | 'inactive' | 'pending';
  statusLabel: string;

  // Hero meta (admin.html lines 19386-19410)
  roleTag: string;
  region: string;
  flag: string;
  timezone: string;
  languages: string;
  tenure: string;

  // Right-side chips (admin.html lines 19408-19409)
  managesLabel: string;
  reportsToLabel: string;

  // Optional status banner (admin.html lines 19414-19423)
  statusBanner?: { title: string; detail: string };

  // Section 01 — Performance summary (Phase 8b)
  performance?: ManagerPerformanceSummary;

  // Section 02 — Workload & team oversight (Phase 8c)
  workload?: ManagerWorkload;

  // Section 03 — Daily activity audit (Phase 8d)
  activity?: ManagerActivity;

  // Section 04 — Team & assignments (Phase 8e)
  team?: ManagerTeam;

  // Section 05 — Notes (Phase 8f)
  notes?: ManagerNotes;

  // Section 06 — Performance review history (Phase 8g)
  reviews?: ManagerReviews;

  // Section 07 — HR record (Phase 8h)
  hr?: ManagerHr;

  // Section 08 — Audit log (Phase 8i)
  auditLog?: ManagerAuditLog;

  // Right rail — TOC + Quick Facts (Phase 8j)
  rail?: ManagerRail;
}

// ============================================================
// PERFORMANCE SHARED TYPES (defined locally — decoupled from specialist)
// ============================================================

export interface StatTile {
  label: string;
  value: string;
  delta?: { label: string; variant: 'up' | 'down' | 'flat' };
  vSuffix?: string;
  meta: string;
  metaVariant?: 'default' | 'warn' | 'danger';
  valueOverrideStyle?: { color?: string; fontSize?: string };
}

export interface TrendBar {
  value: string;
  heightPct: number;
  label: string;
  variant?: 'default' | 'muted' | 'warn';
}

export interface TrendChart {
  title: string;
  metaTotal: string;
  metaDelta?: { label: string; variant: 'up' | 'down' };
  bars: TrendBar[];
}

export interface BreakdownRow {
  label: string;
  value: string;
  percent: string;
}

export interface ChannelRow {
  name: string;
  detail: string;
  barPct: number;
  pct: string;
  meta: string;
}

// ============================================================
// PERFORMANCE — Manager-specific types (Phase 8b)
// ============================================================

export type ManagerPerfMode = 'personal' | 'managerial';
export type PersonalPerfTab = 'reviews' | 'disputes' | 'sourcing' | 'pool';
export type ManagerialPerfTab = 'coaching' | 'delivered' | 'strategic' | 'coordination';

export interface PersonalTab {
  tabCount: number;
  stats: StatTile[];
  trend?: TrendChart;        // pool tab has no trend
  breakdown?: BreakdownRow[]; // sourcing & pool tabs have no breakdown
}

export interface ManagerAuditRating {
  ratingNum: string;        // '4.6'
  ratingDenom: string;      // '/5'
  starsFilled: number;      // 4
  label: string;            // 'Q1 2026 audit rating · oversight quality'
  verdict: string;          // 'Exceeds expectations'
  verdictVariant?: 'success' | 'warn' | 'danger';
  by: string;
  ctaLabel: string;
  ctaAction: string;
}

export type DecisionIconVariant = 'default' | 'success' | 'amber' | 'navy';
export type DecisionIcon = 'check' | 'users' | 'activity' | 'chart';

export interface ManagerDecisionRow {
  iconVariant: DecisionIconVariant;
  icon: DecisionIcon;
  title: string;
  meta: string;
  time: string;
  action: string;
}

export interface ManagerialCoachingTab {
  tabCount: number;
  stats: StatTile[];
  trend: TrendChart;
  breakdown: BreakdownRow[];
}

export interface ManagerialDeliveredTab {
  tabCount: number;
  stats: StatTile[];
  breakdown: BreakdownRow[];
}

export interface ManagerialStrategicTab {
  tabCount: number;
  stats: StatTile[];
  decisions: ManagerDecisionRow[];
}

export interface ManagerialCoordinationTab {
  tabCount: number;
  stats: StatTile[];
  channels: ChannelRow[];
}

export interface ManagerPerformanceSummary {
  sectionStatus: { label: string; variant: 'success' | 'warn' | 'danger' | 'neutral' };
  modeToggle: {
    personalCount: number;
    managerialCount: number;
  };
  personal: {
    reviews: PersonalTab;
    disputes: PersonalTab;
    sourcing: PersonalTab;
    pool: PersonalTab;
  };
  managerial: {
    auditRating: ManagerAuditRating;
    coaching: ManagerialCoachingTab;
    delivered: ManagerialDeliveredTab;
    strategic: ManagerialStrategicTab;
    coordination: ManagerialCoordinationTab;
  };
}

// ============================================================
// WORKLOAD SECTION TYPES (Phase 8c) — Section 02
// ============================================================

export interface ManagerStatLine {
  label: string;
  value: string;
  valueColor?: 'success' | 'warn' | 'danger';
  meta: string;
}

export interface ManagerDualBlock {
  title: string;                 // "Personal caseload"
  pillLabel: string;             // "As Specialist"
  pillVariant: 'default' | 'lime';
  lines: ManagerStatLine[];
}

export type AttentionIcon = 'users' | 'info';
export type AttentionRowVariant = 'default' | 'danger';

export interface ManagerAttentionRow {
  iconType: AttentionIcon;
  variant: AttentionRowVariant;
  text: string;
  meta: string;
  time: string;
  timeVariant?: 'amber' | 'danger';
  action: string;                // data-mgr-action
}

export interface ManagerAttentionList {
  title: string;
  countLabel: string;
  countColor?: string;           // inline color (e.g. 'var(--amber)')
  rows: ManagerAttentionRow[];
}

export interface ManagerWorkload {
  sectionStatus: { label: string; variant: 'success' | 'warn' | 'danger' | 'neutral' };
  dualBlocks: [ManagerDualBlock, ManagerDualBlock];
  attention: ManagerAttentionList;
}

// ============================================================
// ACTIVITY SECTION TYPES (Phase 8d) — Section 03
// ============================================================

export type ActivityDayStatus = 'submitted' | 'late' | 'missed' | 'excused' | 'future';

export interface ActivityDay {
  status: ActivityDayStatus;
  title?: string;
}

export type ActivityLegendStatus = 'submitted' | 'late' | 'missed' | 'excused';

export interface ActivityLegendItem {
  type: 'swatch' | 'note';
  status?: ActivityLegendStatus;  // for swatch
  label: string;
  color?: string;                 // for note inline color
  bold?: boolean;
}

export interface ManagerActivityGrid {
  title: string;
  adherencePct: string;
  adherenceLabel: string;
  days: ActivityDay[];            // 30
  legend: ActivityLegendItem[];
}

export interface TodayReportSegment {
  type: 'highlight' | 'plain' | 'br';
  text?: string;
}

export interface ManagerTodayReport {
  dateLabel: string;
  metaLabel: string;
  body: TodayReportSegment[];
}

export interface ManagerActivityCompact {
  title: string;
  adherencePct: string;
  adherenceLabel: string;
  summary: string;
}

export interface ManagerActivity {
  sectionStatus: { label: string; variant: 'success' | 'warn' | 'danger' | 'neutral' };
  managerGrid: ManagerActivityGrid;
  todayReport: ManagerTodayReport;
  personalCompact: ManagerActivityCompact;
}

// ============================================================
// TEAM SECTION TYPES (Phase 8e) — Section 04
// ============================================================

export type TeamDotVariant = 'default' | 'warn' | 'danger' | 'muted';

export interface ManagedSpecialistCard {
  id: string;                  // 'spec-001' for navigation
  initials: string;
  avatarGradient: string;      // CSS linear-gradient string
  name: string;
  meta: string;                // "EU · Berlin · 47 cases"
  dotVariant: TeamDotVariant;
}

// AssignmentRow declared locally (decoupled from Phase 7f specialist file)
export interface ManagerAssignmentRow {
  id?: string;
  initials: string;
  avatar: number;              // 1-12 (av-N gradient variant)
  name: string;
  meta: string;
  statusLabel: string;
  statusVariant?: 'default' | 'warn' | 'neutral';
  action: string;
}

export interface ManagerAssignmentList {
  title: string;
  viewAllLabel: string;
  viewAllAction: string;
  rows: ManagerAssignmentRow[];
}

export interface ManagerTeam {
  sectionStatus: { label: string; variant: 'success' | 'warn' | 'danger' | 'neutral' };
  teamGrid: {
    title: string;
    viewAllLabel: string;
    viewAllAction: string;
    cards: ManagedSpecialistCard[];
  };
  personalCandidates: ManagerAssignmentList;
  personalClients: ManagerAssignmentList;
}

// ============================================================
// NOTES SECTION TYPES (Phase 8f) — Section 05
// ============================================================

export type ManagerNoteBlockType =
  | { type: 'paragraph'; emphasis?: boolean; text: string }
  | { type: 'list'; items: string[] };

export interface ManagerNoteEntry {
  kind: 'admin' | 'self';
  headTitle: string;           // "Admin's notes" / "Self-evaluation"
  author: string;
  visibility: string;          // "Admin-only" / "Self + Admin"
  visibilityVariant?: 'default' | 'admin-only';
  body: ManagerNoteBlockType[];
  footLabel: string;
  editAction?: string;         // 'edit-admin-note' (admin only)
  readOnlyLabel?: string;      // self-eval read-only
}

export interface ManagerNotes {
  sectionStatus: { label: string; variant: 'success' | 'warn' | 'danger' | 'neutral' };
  notes: ManagerNoteEntry[];
}

// ============================================================
// REVIEWS SECTION TYPES (Phase 8g) — Section 06
// ============================================================

export interface ManagerReviewComment {
  authorRole: 'Admin' | 'Super Admin';
  authorName: string;
  text: string;
}

export interface ManagerReviewCycle {
  quarter: string;
  isLatest?: boolean;
  meta: string;
  ratingLabel: string;
  ratingValue: string;
  ratingHigh?: boolean;
  starsFilled: number;
  // Manager-tier addition (latest review only): Audit score
  auditLabel?: string;
  auditValue?: string;
  auditHigh?: boolean;
  comments?: ManagerReviewComment[];
}

export interface ManagerReviews {
  sectionStatus: { label: string; variant: 'success' | 'warn' | 'danger' | 'neutral' };
  cycles: ManagerReviewCycle[];
  initiateLabel?: string;
  initiateAction?: string;
}

// ============================================================
// HR SECTION TYPES (Phase 8h) — Section 07
// ============================================================

export interface ManagerHrDdValue {
  text: string;
  // 'super' variant added for Manager · elevated permission tier
  emphasisColor?: 'success' | 'warn' | 'danger' | 'super';
}

export interface ManagerHrDlEntry {
  dt: string;
  dd: ManagerHrDdValue;
}

export interface ManagerHrCard {
  title: string;
  entries: ManagerHrDlEntry[];
}

export interface ManagerComplianceRow {
  name: string;
  meta: string;
  due: string;
  statusLabel: string;
  variant: 'current' | 'due' | 'overdue';
}

export interface ManagerDisciplinaryClean {
  flagged?: false;
  title: string;
  detail: string;
}

export interface ManagerHr {
  sectionStatus: { label: string; variant: 'success' | 'warn' | 'danger' | 'neutral' };
  hrCards: ManagerHrCard[];
  compliance: {
    headTitle: string;
    summaryLabel: string;
    summaryVariant: 'success' | 'warn';
    rows: ManagerComplianceRow[];
  };
  disciplinary: ManagerDisciplinaryClean;
}

// ============================================================
// AUDIT LOG TYPES (Phase 8i) — Section 08
// ============================================================

export type ManagerAuditCategory = 'signin' | 'override' | 'suspension' | 'ban' | 'refund' | 'dispute' | 'export';
export type ManagerAuditTagVariant =
  | 'default' | 'signin' | 'override' | 'refund' | 'dispute'
  | 'suspension' | 'ban' | 'export' | 'investigation'
  | 'delivered'   // NEW manager: lime-tint
  | 'received';   // NEW manager: super-tint

export type ManagerAuditOutcomeVariant = 'success' | 'partial' | 'escalated';

export interface ManagerAuditDetailSegment {
  type: 'text' | 'sep' | 'refId' | 'outcome';
  text: string;
  outcomeVariant?: ManagerAuditOutcomeVariant;
}

export interface ManagerAuditEvent {
  time: string;
  cat?: ManagerAuditCategory;
  verb: string;
  target?: string;
  details: ManagerAuditDetailSegment[];
  tagLabel: string;
  tagVariant: ManagerAuditTagVariant;
}

export interface ManagerAuditDay {
  dateLabel: string;
  countLabel: string;
  events: ManagerAuditEvent[];
}

export interface ManagerAuditLog {
  sectionStatus: { label: string; variant: 'success' | 'warn' | 'danger' | 'neutral' };
  days: ManagerAuditDay[];
  footerLabel?: string;
  loadMoreLabel?: string;
  loadMoreAction?: string;
  emptyState?: { title: string; detail: string };
}

// ============================================================
// RAIL TYPES (Phase 8j) — TOC + Quick Facts
// ============================================================

export type ManagerTocStatus = 'default' | 'ok' | 'warn' | 'danger';

export interface ManagerTocItem {
  num: string;
  href: string;
  sectionId: string;
  dataKey: string;
  label: string;
  meta: string;
  metaVariant: ManagerTocStatus;
}

export interface ManagerQuickFact {
  label: string;
  value: string;
  // 'super' added for Manager · elevated permission tier
  valueVariant?: 'success' | 'warn' | 'danger' | 'super';
}

export interface ManagerRail {
  toc: ManagerTocItem[];
  quickFacts: ManagerQuickFact[];
}

// ============================================================
// MANAGER FIXTURES — single fixture (managersCount: 1)
// ============================================================

export const MANAGER_PROFILES: Record<string, ManagerProfile> = {
  'mgr-001': {
    id: 'mgr-001',
    atlasId: 'mgr-001-v8b2c4',
    name: 'Mateo Vargas',
    initials: 'MV',
    status: 'on-track',
    statusLabel: 'On track',
    roleTag: 'Manager of Talent Specialists',
    region: 'AR · Buenos Aires (resident)',
    flag: '🇦🇷',
    timezone: 'America/Argentina/Buenos_Aires · ART (UTC−3)',
    languages: 'Spanish · English · Portuguese (B2)',
    tenure: 'Tenure 5y 1mo · since Mar 14, 2021',
    managesLabel: 'Manages 11 Specialists · 6 regions',
    reportsToLabel: 'Reports to Admin team',
    // Performance — VERBATIM from admin.html lines 19474-19755
    performance: {
      sectionStatus: { label: 'Last 30 days · Q1 audit Exceeds', variant: 'success' },
      modeToggle: { personalCount: 48, managerialCount: 22 },
      personal: {
        reviews: {
          tabCount: 48,
          stats: [
            { label: 'Reviews completed', value: '48', delta: { label: '↑4', variant: 'up' }, meta: 'vs last 30 days' },
            { label: 'Avg review time',   value: '36', vSuffix: 'h', meta: 'target < 72h SLA' },
            { label: 'Approval rate',     value: '91', vSuffix: '%', meta: 'team avg 84%' },
            { label: 'SLA hit rate',      value: '98', vSuffix: '%', meta: '1 breach in Q1' },
          ],
          trend: {
            title: 'Reviews completed · last 4 weeks',
            metaTotal: 'Total 48',
            metaDelta: { label: '↑8%', variant: 'up' },
            bars: [
              { value: '10', heightPct: 67, label: 'W14' },
              { value: '12', heightPct: 80, label: 'W15' },
              { value: '11', heightPct: 73, label: 'W16' },
              { value: '15', heightPct: 100, label: 'W17' },
            ],
          },
          breakdown: [
            { label: 'Approvals',        value: '44', percent: '91.7%' },
            { label: 'Skills issues',    value: '2',  percent: '4.2%' },
            { label: 'Integrity issues', value: '1',  percent: '2.1%' },
            { label: 'Profile issues',   value: '1',  percent: '2.1%' },
          ],
        },
        disputes: {
          tabCount: 7,
          stats: [
            { label: 'Disputes handled', value: '7',   meta: 'personal caseload only' },
            { label: 'Avg resolution',   value: '38',  vSuffix: 'h', meta: 'target < 72h' },
            { label: 'SLA hit rate',     value: '100', vSuffix: '%', meta: '0 breaches' },
            { label: 'Escalation rate',  value: '0',   vSuffix: '%', meta: 'none escalated up' },
          ],
          trend: {
            title: 'Disputes resolved · last 4 weeks',
            metaTotal: 'Total 7',
            bars: [
              { value: '2', heightPct: 67, label: 'W14' },
              { value: '1', heightPct: 33, label: 'W15' },
              { value: '2', heightPct: 67, label: 'W16' },
              { value: '2', heightPct: 67, label: 'W17' },
            ],
          },
          breakdown: [
            { label: 'Sided with client', value: '3', percent: '42.9%' },
            { label: 'Sided with talent', value: '2', percent: '28.6%' },
            { label: 'Partial / split',   value: '2', percent: '28.6%' },
            { label: 'Dismissed',         value: '0', percent: '0%' },
          ],
        },
        sourcing: {
          tabCount: 22,
          stats: [
            { label: 'Candidates sourced', value: '22', meta: 'personal pipeline' },
            { label: 'Pass rate',          value: '55', vSuffix: '%', meta: 'above team avg 41%' },
            { label: 'Hire rate',          value: '36', vSuffix: '%', meta: 'above team avg 26%' },
            { label: 'Daily activity',     value: '22', vSuffix: '/22', meta: '100% adherence' },
          ],
          trend: {
            title: 'Candidates sourced · last 4 weeks',
            metaTotal: 'Total 22',
            bars: [
              { value: '5', heightPct: 71,  label: 'W14' },
              { value: '6', heightPct: 86,  label: 'W15' },
              { value: '4', heightPct: 57,  label: 'W16' },
              { value: '7', heightPct: 100, label: 'W17' },
            ],
          },
          // No breakdown for sourcing (admin.html lines 19572-19588)
        },
        pool: {
          tabCount: 412,
          stats: [
            { label: 'Engineering pool', value: '412', meta: 'target 350' },
            { label: 'Pool health',      value: 'Stable', valueOverrideStyle: { fontSize: '20px', color: 'var(--success)' }, meta: 'last 30 days' },
            { label: 'Net change',       value: '+18', delta: { label: '↑', variant: 'up' }, meta: '22 added · 4 deactivated' },
            { label: 'Co-owns with',     value: 'Daniel K.', valueOverrideStyle: { fontSize: '16px' }, meta: 'Engineering · EU primary' },
          ],
          // No trend, no breakdown for pool (admin.html lines 19590-19597)
        },
      },
      managerial: {
        auditRating: {
          ratingNum: '4.6',
          ratingDenom: '/5',
          starsFilled: 4,
          label: 'Q1 2026 audit rating · oversight quality',
          verdict: 'Exceeds expectations',
          verdictVariant: 'success',
          by: 'Audited by Aïsha Okafor (you) + Dario Mensah · delivered Apr 14, 2026',
          ctaLabel: 'View full audit →',
          ctaAction: 'open-audit-rating',
        },
        coaching: {
          tabCount: 36,
          stats: [
            { label: '1:1s held',             value: '22',  meta: '11 specialists × 2/mo cadence' },
            { label: 'Coaching notes logged', value: '14',  delta: { label: '↑3', variant: 'up' }, meta: 'vs last 30 days' },
            { label: 'Avg 1:1 length',        value: '34',  vSuffix: 'm', meta: 'target 30m' },
            { label: 'Cadence adherence',     value: '100', vSuffix: '%', meta: 'no missed 1:1s' },
          ],
          trend: {
            title: 'Coaching activity · last 4 weeks',
            metaTotal: '36 events total',
            metaDelta: { label: '↑18%', variant: 'up' },
            bars: [
              { value: '8',  heightPct: 67,  label: 'W14' },
              { value: '9',  heightPct: 75,  label: 'W15' },
              { value: '7',  heightPct: 58,  label: 'W16' },
              { value: '12', heightPct: 100, label: 'W17' },
            ],
          },
          breakdown: [
            { label: 'Performance coaching', value: '8', percent: '57.1%' },
            { label: 'Career development',   value: '3', percent: '21.4%' },
            { label: 'Workload & capacity',  value: '2', percent: '14.3%' },
            { label: 'Recognition / praise', value: '1', percent: '7.1%' },
          ],
        },
        delivered: {
          tabCount: 11,
          stats: [
            { label: 'Reviews delivered',    value: '11',   meta: 'all 11 specialists · Q1 cycle' },
            { label: 'On-time delivery',     value: '11',   vSuffix: '/11', meta: '100% within window' },
            { label: 'Avg cycle time',       value: '9',    vSuffix: 'd',   meta: 'target < 14d' },
            { label: 'Calibration variance', value: '±0.4', meta: 'vs Admin co-sign' },
          ],
          breakdown: [
            { label: 'Exceeds expectations', value: '3', percent: '27.3%' },
            { label: 'Meets expectations',   value: '7', percent: '63.6%' },
            { label: 'Needs improvement',    value: '1', percent: '9.1%' },
            { label: 'Unsatisfactory',       value: '0', percent: '0%' },
          ],
        },
        strategic: {
          tabCount: 8,
          stats: [
            { label: 'Strategic decisions',  value: '8', meta: 'last 30 days' },
            { label: 'Sprint approvals',     value: '3', meta: '2 Engineering · 1 Design' },
            { label: 'Caseload rebalances',  value: '2', meta: '5 cases moved each' },
            { label: 'Escalations resolved', value: '3', meta: 'avg 2.4 days each' },
          ],
          decisions: [
            { iconVariant: 'success', icon: 'check',
              title: 'Approved Engineering recruitment sprint · 30 candidates / 14 days',
              meta: 'SD-2026-0084 · proposed by Daniel Kovács · co-signed by you · executes May 2 → May 16',
              time: '2d ago', action: 'open-decision' },
            { iconVariant: 'amber', icon: 'users',
              title: 'Caseload rebalancing · 5 cases moved Daniel K. → Lukas C.',
              meta: 'SD-2026-0081 · 117% capacity reason · effective May 1 · self-initiated',
              time: '3d ago', action: 'open-decision' },
            { iconVariant: 'navy', icon: 'activity',
              title: 'Escalation resolved · DSP-2026-0144 contested timeline',
              meta: 'SD-2026-0079 · client + talent both partial-refunded $440 · 4-day cycle',
              time: '5d ago', action: 'open-decision' },
            { iconVariant: 'default', icon: 'chart',
              title: 'Pool depletion alert raised · Customer Support category',
              meta: 'SD-2026-0072 · escalated to Admin · cross-category sprint requested',
              time: '8d ago', action: 'open-decision' },
          ],
        },
        coordination: {
          tabCount: 6,
          stats: [
            { label: 'Coordination items',     value: '6',  meta: 'last 30 days' },
            { label: 'Cross-category sprints', value: '1',  meta: 'Eng + Design joint' },
            { label: 'Manager daily reports',  value: '22', vSuffix: '/22', meta: '100% submitted to Admin' },
            { label: 'Reports avg cycle',      value: '11', vSuffix: 'PM',  meta: 'submitted before 12 AM' },
          ],
          channels: [
            { name: 'Daily reports to Admin',   detail: '22 of 22 submitted on time', barPct: 100, pct: '100%', meta: 'avg 11:42 PM' },
            { name: 'Cross-team meetings',      detail: '4 sessions · all attended',   barPct: 100, pct: '100%', meta: '4 attended' },
            { name: 'Sprint coordination calls', detail: '2 sprints kicked off',       barPct: 50,  pct: '50%',  meta: '2 of 4 quarter target' },
          ],
        },
      },
    },
    // Workload — VERBATIM from admin.html lines 19760-19842
    workload: {
      sectionStatus: { label: '2 items need attention', variant: 'warn' },
      dualBlocks: [
        {
          title: 'Personal caseload',
          pillLabel: 'As Specialist',
          pillVariant: 'default',
          lines: [
            { label: 'Active candidates', value: '22', meta: 'in Engineering' },
            { label: 'Active contracts',  value: '8',  meta: 'across 6 clients' },
            { label: 'Open disputes',     value: '1',  meta: 'within SLA' },
            { label: 'Capacity',          value: '62%', valueColor: 'success', meta: 'target 50%' },
          ],
        },
        {
          title: 'Team oversight',
          pillLabel: 'As Manager',
          pillVariant: 'lime',
          lines: [
            { label: 'Specialists managed', value: '11',    meta: 'across 6 regions' },
            { label: 'Team total caseload', value: '412',   meta: 'candidates · 245 contracts' },
            { label: 'Team open disputes',  value: '12',    meta: '2 escalated to him' },
            { label: 'Team SLA · 7d',       value: '96.5%', valueColor: 'success', meta: 'target 95%' },
          ],
        },
      ],
      attention: {
        title: 'Needs attention right now',
        countLabel: '2 ITEMS',
        countColor: 'var(--amber)',
        rows: [
          {
            iconType: 'users', variant: 'default',
            text: 'Daniel Kovács caseload high · 117% of target',
            meta: 'Sustained 14+ days · coaching note logged Apr 28 · rebalancing 5 cases to Lukas C. underway',
            time: 'in progress', timeVariant: 'amber', action: 'open-specialist-flag',
          },
          {
            iconType: 'info', variant: 'default',
            text: 'Pool depletion · Customer Support category',
            meta: 'Falling toward threshold · 87 of target 100 · cross-category sprint proposal due May 5',
            time: '5d to deadline', timeVariant: 'amber', action: 'open-escalation',
          },
        ],
      },
    },
    // Activity — VERBATIM from admin.html lines 19847-19924
    activity: {
      sectionStatus: { label: 'Both submissions current', variant: 'success' },
      managerGrid: {
        title: 'Last 30 days · Manager daily reports to Admin',
        adherencePct: '100%',
        adherenceLabel: 'adherence rate',
        days: [
          { status: 'submitted', title: 'Apr 1 · submitted 11:38 PM' },
          { status: 'submitted', title: 'Apr 2' },
          { status: 'excused',   title: 'Apr 3 · weekend' },
          { status: 'excused',   title: 'Apr 4 · weekend' },
          { status: 'submitted' },
          { status: 'submitted' },
          { status: 'submitted' },
          { status: 'submitted' },
          { status: 'submitted' },
          { status: 'excused',   title: 'Apr 10 · weekend' },
          { status: 'excused',   title: 'Apr 11 · weekend' },
          { status: 'submitted' },
          { status: 'submitted' },
          { status: 'submitted' },
          { status: 'submitted' },
          { status: 'submitted' },
          { status: 'excused',   title: 'Apr 17 · weekend' },
          { status: 'excused',   title: 'Apr 18 · weekend' },
          { status: 'submitted' },
          { status: 'submitted' },
          { status: 'submitted' },
          { status: 'submitted' },
          { status: 'submitted' },
          { status: 'excused',   title: 'Apr 24 · weekend' },
          { status: 'excused',   title: 'Apr 25 · weekend' },
          { status: 'submitted' },
          { status: 'submitted' },
          { status: 'submitted' },
          { status: 'submitted' },
          { status: 'submitted', title: 'Today · submitted 11:42 PM' },
        ],
        legend: [
          { type: 'swatch', status: 'submitted', label: 'Submitted on time (22)' },
          { type: 'swatch', status: 'excused',   label: 'Weekend / excused (8)' },
          { type: 'note', label: 'No misses · no late · 100% record · 5y running', color: 'var(--success)', bold: true },
        ],
      },
      todayReport: {
        dateLabel: "Today's Manager daily report · Apr 30, 2026",
        metaLabel: 'Submitted 11:42 PM ART · approved by Aïsha (you)',
        body: [
          { type: 'highlight', text: 'Specialists supported:' }, { type: 'plain', text: ' 4 (Daniel K., Lukas C., Sarah R., Lin Y.) · ' },
          { type: 'highlight', text: '1:1s held:' },             { type: 'plain', text: ' 2 (Daniel monthly, new Specialist Aigerim onboarding) · ' },
          { type: 'highlight', text: 'Disputes intervened:' },   { type: 'plain', text: ' 1 (DSP-2026-0156 escalated by Lin) · ' },
          { type: 'highlight', text: 'Reviews delivered:' },     { type: 'plain', text: ' 0 (Q1 cycle complete Apr 14) · ' },
          { type: 'highlight', text: 'Strategic decisions:' },   { type: 'plain', text: ' 1 (Engineering sprint approved SD-2026-0084) · ' },
          { type: 'highlight', text: 'Cross-team coordination:' }, { type: 'plain', text: ' 1 (Customer Support pool depletion call with Aïsha + Carmen).' },
          { type: 'br' }, { type: 'br' },
          { type: 'highlight', text: "Today's wins:" }, { type: 'plain', text: " Engineering sprint approved cleanly, Daniel's caseload reduction underway. " },
          { type: 'highlight', text: 'Blockers:' },     { type: 'plain', text: ' Customer Support category still trending below target. ' },
          { type: 'highlight', text: 'Tomorrow:' },     { type: 'plain', text: ' Sprint kickoff with Daniel + Lukas; CS category deep-dive with Carmen.' },
        ],
      },
      personalCompact: {
        title: 'Last 30 days · personal Specialist daily activity (separate stream)',
        adherencePct: '100%',
        adherenceLabel: 'adherence',
        summary: '22 submitted on time · 8 weekends · 0 missed · auditing complete by Admin',
      },
    },
    // Team & assignments — admin.html lines 19929-20121 with Phase 7 specialist remap (Option B)
    team: {
      sectionStatus: { label: '11 specialists · 22 personal candidates', variant: 'success' },
      teamGrid: {
        title: 'Talent Specialists managed (11)',
        viewAllLabel: 'Open team page →',
        viewAllAction: 'view-all-specialists',
        cards: [
          { id: 'spec-001', initials: 'DK', avatarGradient: 'linear-gradient(135deg, #7BA8D9, #3F6CA1)', name: 'Daniel Kovács',     meta: 'EU · Berlin · 47 cases',           dotVariant: 'warn' },
          { id: 'spec-002', initials: 'SR', avatarGradient: 'linear-gradient(135deg, #C2A8E8, #8B5FB8)', name: 'Sarah Reyes',       meta: 'Americas · Mexico City · 52 cases', dotVariant: 'warn' },
          { id: 'spec-005', initials: 'LC', avatarGradient: 'linear-gradient(135deg, #F0CC4F, #E8911E)', name: 'Lukas Chen',        meta: 'APAC · Singapore · on sabbatical',  dotVariant: 'muted' },
          { id: 'spec-004', initials: 'MT', avatarGradient: 'linear-gradient(135deg, #95D9A8, #4A8E5F)', name: 'Maya Tanaka',       meta: 'APAC · Tokyo · 41 cases',           dotVariant: 'default' },
          { id: 'spec-006', initials: 'AS', avatarGradient: 'linear-gradient(135deg, #E8A4A4, #B85B5B)', name: 'Ana Silva',         meta: 'LATAM · São Paulo · 44 cases',      dotVariant: 'default' },
          { id: 'spec-010', initials: 'HA', avatarGradient: 'linear-gradient(135deg, #A8D9D9, #4A8E8E)', name: 'Hassan Al-Rashid',  meta: 'MENA · Riyadh · onboarding',        dotVariant: 'muted' },
          { id: 'spec-003', initials: 'JN', avatarGradient: 'linear-gradient(135deg, #D9C2A8, #8E7048)', name: 'Jamal Nasir',       meta: 'MENA · Dubai · 38 cases',           dotVariant: 'default' },
          { id: 'spec-007', initials: 'YT', avatarGradient: 'linear-gradient(135deg, #B8D9F0, #5A8EC2)', name: 'Yuki Tanaka',       meta: 'APAC · Osaka · 42 cases',           dotVariant: 'default' },
          { id: 'spec-008', initials: 'KA', avatarGradient: 'linear-gradient(135deg, #C9C2A4, #7A745A)', name: 'Kofi Asante',       meta: 'Africa · Accra · 36 cases',         dotVariant: 'default' },
          { id: 'spec-009', initials: 'EV', avatarGradient: 'linear-gradient(135deg, #D9A8C2, #B8487A)', name: 'Elena Volkov',      meta: 'EU · Tbilisi · 40 cases',           dotVariant: 'default' },
          { id: 'spec-011', initials: 'OP', avatarGradient: 'linear-gradient(135deg, #A8B5D9, #5A6BAB)', name: 'Olivia Park',       meta: 'Americas · Vancouver · on leave',   dotVariant: 'muted' },
        ],
      },
      personalCandidates: {
        title: 'Personal candidates (top 5 of 22)',
        viewAllLabel: 'View all →',
        viewAllAction: 'view-all-personal-cands',
        rows: [
          { initials: 'VK', avatar: 4, name: 'Valentina Kraft', meta: '🇦🇷 AR · Senior Engineer · 6 hires · $61K', statusLabel: 'Live',     action: 'open-candidate' },
          { initials: 'FN', avatar: 2, name: 'Felipe Núñez',    meta: '🇨🇱 CL · Backend Eng · 4 hires · $42K',     statusLabel: 'Live',     action: 'open-candidate' },
          { initials: 'CG', avatar: 6, name: 'Camila Gonzales', meta: '🇵🇪 PE · Data Engineer · 3 hires · $52K',  statusLabel: 'Live',     action: 'open-candidate' },
          { initials: 'DM', avatar: 9, name: 'Diego Marín',     meta: '🇨🇴 CO · DevOps · in IV-2',                statusLabel: 'Pipeline', statusVariant: 'warn', action: 'open-candidate' },
          { initials: 'IB', avatar: 1, name: 'Isabela Borges',  meta: '🇧🇷 BR · Frontend Eng · in IV-1',          statusLabel: 'Pipeline', statusVariant: 'warn', action: 'open-candidate' },
        ],
      },
      personalClients: {
        title: 'Personal clients (top 5 of 11)',
        viewAllLabel: 'View all →',
        viewAllAction: 'view-all-personal-clients',
        rows: [
          { initials: 'PM', avatar: 7,  name: 'Patagonia Mining Co.', meta: '🇦🇷 AR · 12 hires · $145K · Top Client', statusLabel: 'Active', action: 'open-client' },
          { initials: 'AT', avatar: 8,  name: 'Andina Telecom S.A.',  meta: '🇨🇴 CO · 6 hires · $78K · Trusted',       statusLabel: 'Active', action: 'open-client' },
          { initials: 'SR', avatar: 5,  name: 'Solar Rio Energia',    meta: '🇧🇷 BR · 8 hires · $96K · Trusted',       statusLabel: 'Active', action: 'open-client' },
          { initials: 'CT', avatar: 3,  name: 'Cruz del Sur Tech',    meta: '🇨🇱 CL · 4 hires · $52K · Trusted',       statusLabel: 'Active', action: 'open-client' },
          { initials: 'NB', avatar: 11, name: 'Nova Buenos Studios',  meta: '🇦🇷 AR · 2 hires · $24K · Trusted',       statusLabel: 'Active', action: 'open-client' },
        ],
      },
    },
    // Notes — VERBATIM from admin.html lines 20126-20174
    notes: {
      sectionStatus: { label: 'Last updated 4d ago', variant: 'neutral' },
      notes: [
        {
          kind: 'admin',
          headTitle: "Admin's notes",
          author: 'Aïsha Okafor (you)',
          visibility: 'Admin-only',
          visibilityVariant: 'admin-only',
          body: [
            { type: 'paragraph', emphasis: true,
              text: '"Mateo is the most consistent operator on the platform. Five years running, never missed a daily report, never failed an audit cycle. His judgement on caseload and dispute escalations is uniquely well-calibrated."' },
            { type: 'paragraph', text: 'Q1 observations from quarterly Admin review:' },
            { type: 'list', items: [
              'Calibration variance with my own ratings was ±0.4 — within excellent band',
              'Handles his own personal caseload at 62% capacity, leaving headroom for managerial work — good split',
              'Cross-team coordination on the Customer Support pool depletion was textbook — escalated cleanly with full data + proposal attached',
              "Watch: he's overdue for an exec-track conversation. Tenure milestone Q3 2026.",
            ]},
          ],
          footLabel: 'Last edited Apr 26, 2026 by Aïsha Okafor (you)',
          editAction: 'edit-admin-note',
        },
        {
          kind: 'self',
          headTitle: 'Self-evaluation',
          author: 'Mateo Vargas',
          visibility: 'Self + Admin',
          visibilityVariant: 'default',
          body: [
            { type: 'paragraph', emphasis: true,
              text: '"My calibration with Admin is tighter this quarter than last. Two areas to keep working on: (1) anticipating pool depletion earlier — Customer Support shouldn\'t have surprised me, the trend was visible 30 days out, (2) more deliberate succession planning — Daniel is ready for more, I should be giving him concrete stretches."' },
            { type: 'paragraph', text: 'Submitted as part of Q1 2026 self-evaluation cycle.' },
          ],
          footLabel: 'Submitted Apr 10, 2026 · auto-shared with Admin',
          readOnlyLabel: 'Read-only · self-eval window closed',
        },
      ],
    },
    // Reviews — VERBATIM from admin.html lines 20179-20268
    reviews: {
      sectionStatus: { label: '5 reviews on file · all delivered by Admin', variant: 'success' },
      initiateLabel: 'Initiate Q2 2026 review',
      initiateAction: 'initiate-review',
      cycles: [
        {
          quarter: 'Q1 2026 review',
          isLatest: true,
          meta: 'Final · delivered Apr 14, 2026 · cycle annual',
          ratingLabel: 'Overall rating',
          ratingValue: 'Exceeds expectations',
          ratingHigh: true,
          starsFilled: 4,
          auditLabel: 'Audit score',
          auditValue: '4.6 / 5',
          auditHigh: true,
          comments: [
            { authorRole: 'Admin', authorName: 'Aïsha Okafor (you)',
              text: "Five years of remarkable consistency. Mateo's calibration with my own ratings is the tightest on the platform. The Customer Support pool intervention this quarter was textbook escalation — clean data, clear proposal, executed without friction. One growth area: more proactive talent development for his strongest specialists, particularly Daniel." },
            { authorRole: 'Super Admin', authorName: 'Dario Mensah',
              text: "Mateo is one of the platform's most strategic assets. His judgement on edge cases — particularly cross-category coordination — is uniquely good. Recommend formal exec-track conversation by end of Q3. He's ready, and the platform needs people of his caliber moving up." },
          ],
        },
        { quarter: 'Q4 2025 review', meta: 'Final · delivered Jan 12, 2026',
          ratingLabel: 'Overall', ratingValue: 'Exceeds expectations', ratingHigh: true, starsFilled: 4 },
        { quarter: 'Q3 2025 review', meta: 'Final · delivered Oct 8, 2025',
          ratingLabel: 'Overall', ratingValue: 'Exceeds expectations', ratingHigh: true, starsFilled: 4 },
        { quarter: 'Q2 2025 review', meta: 'Final · delivered Jul 14, 2025',
          ratingLabel: 'Overall', ratingValue: 'Meets expectations', starsFilled: 3 },
        { quarter: 'Q1 2025 review', meta: 'Final · delivered Apr 9, 2025',
          ratingLabel: 'Overall', ratingValue: 'Meets expectations', starsFilled: 3 },
      ],
    },
    // HR — VERBATIM from admin.html lines 20273-20405
    hr: {
      sectionStatus: { label: 'All current · clean', variant: 'success' },
      hrCards: [
        { title: 'Employment terms · Manager tier', entries: [
          { dt: 'Hire date',           dd: { text: 'Mar 14, 2021 · 5y 1mo' } },
          { dt: 'Promoted',            dd: { text: 'Specialist → Manager · Sep 2022' } },
          { dt: 'Contract type',       dd: { text: 'Full-time · permanent' } },
          { dt: 'Base + bonus',        dd: { text: '$135,000 · 25% target performance bonus' } },
          { dt: 'Equity',              dd: { text: '8,000 RSUs (80% vested) + 4,000 manager grant (unvested)' } },
          { dt: 'Employment status',   dd: { text: 'Active', emphasisColor: 'success' } },
          { dt: 'Termination history', dd: { text: 'None' } },
        ]},
        { title: 'Admin tool access · elevated', entries: [
          { dt: 'Permission tier',    dd: { text: 'Manager · elevated', emphasisColor: 'super' } },
          { dt: 'Elevated access',    dd: { text: 'Suspend specialists (Admin co-sign required) · adjudicate cross-specialist disputes · approve recruitment sprints' } },
          { dt: 'Categories owned',   dd: { text: 'Engineering (personal) · all 11 categories (oversight)' } },
          { dt: 'Restricted actions', dd: { text: 'Cannot suspend candidates/clients · cannot issue refunds > $1,000 · cannot modify platform settings' } },
          { dt: 'SSO domains',        dd: { text: 'atlas.example · 2FA enforced (TOTP + WebAuthn key)' } },
          { dt: 'IP allowlist',       dd: { text: '2 trusted IPs (Buenos Aires home · BA office)' } },
        ]},
      ],
      compliance: {
        headTitle: 'Compliance training · Manager tier (extended set)',
        summaryLabel: 'All current · 6 of 6',
        summaryVariant: 'success',
        rows: [
          { name: 'Privacy training (GDPR + CCPA + LATAM)',                 meta: 'Annual cycle · cert PRT-2024-2901',                       due: 'renews Apr 2, 2027',  statusLabel: 'Current', variant: 'current' },
          { name: 'Security training (Phishing + MFA + Incident response)', meta: 'Annual cycle · cert SEC-2024-1283',                       due: 'renews Apr 2, 2027',  statusLabel: 'Current', variant: 'current' },
          { name: 'Mediation & dispute resolution',                         meta: 'Atlas Internal · advanced level · cert MED-2023-0012',    due: 'renews Sep 14, 2026', statusLabel: 'Current', variant: 'current' },
          { name: 'People management certification (manager-only)',         meta: 'Atlas Internal · LDR-2022-0004 · since promotion',        due: 'renews Sep 14, 2026', statusLabel: 'Current', variant: 'current' },
          { name: 'Anti-harassment & inclusive leadership',                 meta: 'Annual · manager-only · cert AHL-2025-0011',              due: 'renews Feb 14, 2027', statusLabel: 'Current', variant: 'current' },
          { name: 'Anti-fraud & financial integrity',                       meta: 'Annual · cert FIN-2025-0028',                             due: 'renews Jun 14, 2026', statusLabel: 'Current', variant: 'current' },
        ],
      },
      disciplinary: {
        title: 'Disciplinary record · clean',
        detail: 'No formal warnings, PIPs, or HR-flagged incidents in 5 years 1 month of tenure. Promoted Specialist → Manager Sep 2022 on merit.',
      },
    },
    // Audit log — VERBATIM from admin.html lines 20410-20557
    auditLog: {
      sectionStatus: { label: '94 events · audited separately', variant: 'neutral' },
      days: [
        {
          dateLabel: 'Today · April 30, 2026', countLabel: '3 events',
          events: [
            {
              time: '11:42 PM',
              verb: 'Manager daily report submitted',
              target: 'Apr 30 cycle · approved by Aïsha',
              details: [
                { type: 'text', text: '4 specialists supported · 2 1:1s · 1 dispute intervention · 1 strategic decision' },
                { type: 'sep', text: '·' },
                { type: 'outcome', outcomeVariant: 'success', text: 'On time' },
              ],
              tagLabel: 'REPORT', tagVariant: 'default',
            },
            {
              time: '3:08 PM',
              verb: 'Strategic decision logged',
              target: 'Engineering recruitment sprint approved',
              details: [
                { type: 'text', text: '30 candidates / 14 days · proposed by Daniel Kovács · co-signed by Aïsha (you)' },
                { type: 'sep', text: '·' },
                { type: 'refId', text: 'SD-2026-0084' },
              ],
              tagLabel: 'DECISION', tagVariant: 'delivered',
            },
            {
              time: '8:32 AM', cat: 'signin',
              verb: 'Sign-in', target: 'Mateo Vargas',
              details: [
                { type: 'text', text: '200.81.74.12 · Buenos Aires · Firefox · macOS 14.4' },
                { type: 'sep', text: '·' },
                { type: 'outcome', outcomeVariant: 'success', text: '2FA + WebAuthn verified' },
              ],
              tagLabel: 'SIGN-IN', tagVariant: 'signin',
            },
          ],
        },
        {
          dateLabel: 'Apr 28, 2026', countLabel: '2 events',
          events: [
            {
              time: '11:42 AM', cat: 'override',
              verb: 'Coaching note delivered',
              target: 'to Daniel Kovács · caseload rebalancing',
              details: [
                { type: 'text', text: 'Topic: 117% capacity · 5 cases moved Daniel → Lukas C.' },
                { type: 'sep', text: '·' },
                { type: 'refId', text: 'CN-2026-0412' },
              ],
              tagLabel: 'COACHING', tagVariant: 'delivered',
            },
            {
              time: '10:08 AM',
              verb: 'Strategic decision logged',
              target: 'caseload rebalancing',
              details: [
                { type: 'text', text: '5 cases reassigned within Engineering team' },
                { type: 'sep', text: '·' },
                { type: 'text', text: 'Self-initiated · no co-sign required (within authority)' },
                { type: 'sep', text: '·' },
                { type: 'refId', text: 'SD-2026-0081' },
              ],
              tagLabel: 'DECISION', tagVariant: 'delivered',
            },
          ],
        },
        {
          dateLabel: 'Apr 14, 2026', countLabel: '2 events',
          events: [
            {
              time: '4:18 PM', cat: 'override',
              verb: 'Q1 2026 performance review delivered to him',
              target: 'Exceeds expectations · 4.6/5',
              details: [
                { type: 'text', text: 'By Aïsha Okafor (you) + Dario Mensah (Super Admin)' },
                { type: 'sep', text: '·' },
                { type: 'text', text: 'Annual cycle' },
                { type: 'sep', text: '·' },
                { type: 'refId', text: 'PR-2026-0414-MV' },
              ],
              tagLabel: 'REVIEW IN', tagVariant: 'received',
            },
            {
              time: '9:44 AM', cat: 'override',
              verb: 'Q1 reviews delivered to all 11 specialists',
              target: 'cycle complete',
              details: [
                { type: 'text', text: 'Distribution: 3 Exceeds · 7 Meets · 1 Needs improvement · 0 Unsatisfactory' },
                { type: 'sep', text: '·' },
                { type: 'refId', text: 'PR-Q1-2026 batch' },
              ],
              tagLabel: 'REVIEW OUT', tagVariant: 'delivered',
            },
          ],
        },
        {
          dateLabel: 'Earlier · 2022', countLabel: '1 event',
          events: [
            {
              time: 'Sep 1\n2022', cat: 'signin',
              verb: 'Promoted Specialist → Manager of Talent Specialists',
              details: [
                { type: 'text', text: 'Promoted by Dario Mensah after 18 months as Specialist' },
                { type: 'sep', text: '·' },
                { type: 'text', text: 'Initial team size: 6 specialists' },
                { type: 'sep', text: '·' },
                { type: 'refId', text: 'PROMO-2022-0001' },
              ],
              tagLabel: 'PROMOTED', tagVariant: 'signin',
            },
          ],
        },
      ],
      footerLabel: 'Showing 8 of 94 events · audited separately for fairness',
      loadMoreLabel: 'Load more',
      loadMoreAction: 'load-more-audit',
    },
    // Right rail — VERBATIM from admin.html lines 20562-20620
    rail: {
      toc: [
        { num: '01', href: '#mgr-section-performance', sectionId: 'mgr-section-performance', dataKey: 'performance', label: 'Performance',     meta: '4.6/5',     metaVariant: 'ok' },
        { num: '02', href: '#mgr-section-workload',    sectionId: 'mgr-section-workload',    dataKey: 'workload',    label: 'Workload',        meta: '2 items',   metaVariant: 'warn' },
        { num: '03', href: '#mgr-section-activity',    sectionId: 'mgr-section-activity',    dataKey: 'activity',    label: 'Daily activity',  meta: '100%',      metaVariant: 'ok' },
        { num: '04', href: '#mgr-section-team',        sectionId: 'mgr-section-team',        dataKey: 'team',        label: 'Team',            meta: '11 / 22',   metaVariant: 'default' },
        { num: '05', href: '#mgr-section-notes',       sectionId: 'mgr-section-notes',       dataKey: 'notes',       label: 'Notes',           meta: '2 entries', metaVariant: 'default' },
        { num: '06', href: '#mgr-section-reviews',     sectionId: 'mgr-section-reviews',     dataKey: 'reviews',     label: 'Reviews',         meta: '5 cycles',  metaVariant: 'default' },
        { num: '07', href: '#mgr-section-hr',          sectionId: 'mgr-section-hr',          dataKey: 'hr',          label: 'HR record',       meta: 'clean',     metaVariant: 'ok' },
        { num: '08', href: '#mgr-section-audit',       sectionId: 'mgr-section-audit',       dataKey: 'audit',       label: 'Audit log',       meta: '94',        metaVariant: 'default' },
      ],
      quickFacts: [
        { label: 'Atlas employee ID', value: 'mgr-001-v8b2c4' },
        { label: 'Hired',             value: 'Mar 14, 2021' },
        { label: 'Tenure',            value: '5y 1mo' },
        { label: 'Promoted',          value: 'Manager · Sep 2022' },
        { label: 'Reports to',        value: 'Aïsha + Dario (Admin)' },
        { label: 'Direct reports',    value: '11 Talent Specialists' },
        { label: 'Permission tier',   value: 'Manager · elevated', valueVariant: 'super' },
        { label: '2FA',               value: 'TOTP + WebAuthn',    valueVariant: 'success' },
        { label: 'Last seen',         value: '2h ago',             valueVariant: 'success' },
      ],
    },
  },
};
