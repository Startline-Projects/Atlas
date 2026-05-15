/**
 * Phase 14a — Reports & Analytics data
 *
 * Foundation primitives + Tab 1 Platform-wide fixtures verbatim per
 * admin.html L38007-38309.
 *
 * Subsequent phases:
 *   14b → trust-safety + performance tabs
 *   14c → financial + compliance tabs
 *   14d → custom report builder
 */

// ============================================================
// SHARED PRIMITIVES (reused across all 5 tabs)
// ============================================================

export type DeltaVariant = 'up' | 'down' | 'flat';

export interface ReportsKpiDelta {
  text: string;
  variant: DeltaVariant;
}

export interface ReportsSparkline {
  variant: 'up' | 'down';
  viewBoxWidth: number;
  viewBoxHeight: number;
  areaPoints: string;
  linePoints: string;
  dotX: number;
  dotY: number;
  dotR: number;
  heightOverridePx?: number;
}

export interface ReportsKpiTile {
  label: string;
  value: string;
  vSuffix?: string;
  delta?: ReportsKpiDelta;
  meta: string;
  sparkline?: ReportsSparkline;
}

// ============================================================
// CHART PRIMITIVES
// ============================================================

export interface ReportsChartGridLine {
  x1: number; y1: number; x2: number; y2: number;
}

export interface ReportsChartAxisLabel {
  text: string; x: number; y: number;
}

export interface ReportsChartAnnotation {
  x1: number; y1: number; x2: number; y2: number;
  textX: number; textY: number;
  text: string;
}

export type LineChartSeriesVariant = 'candidates' | 'clients' | 'disputes' | 'gmv';

export interface ReportsLineChartSeries {
  variant: LineChartSeriesVariant;
  areaPoints: string;
  linePoints: string;
  dotX: number;
  dotY: number;
  dotR: number;
}

export interface ReportsLineChartLegendItem {
  variant: LineChartSeriesVariant;
  label: string;
}

export interface ReportsLineChart {
  viewBoxWidth: number;
  viewBoxHeight: number;
  containerHeightPx: number;
  gridLines: ReportsChartGridLine[];
  axisLabels: ReportsChartAxisLabel[];
  annotation?: ReportsChartAnnotation;
  series: ReportsLineChartSeries[];
}

// ============================================================
// FUNNEL
// ============================================================

export type FunnelStageVariant = 'default' | 'warn' | 'danger';

export interface ReportsFunnelStage {
  num: string;
  label: string;
  barLabel: string;
  count: string;
  dropoff: string;
  widthPercent: number;
  variant: FunnelStageVariant;
}

// ============================================================
// MINI TABLE
// ============================================================

export type MiniTableCellVariant = 'default' | 'warn' | 'danger' | 'success';

export interface ReportsMiniTableCell {
  text: string;
  isNum?: boolean;
  variant?: MiniTableCellVariant;
  /** Use body font instead of mono (e.g. specialist names) */
  isBodyFont?: boolean;
  /** Render as ink-mute (e.g. aggregate / "Other 4" row) */
  isMuted?: boolean;
  /** Apply font-semibold (e.g. specialist names) */
  strong?: boolean;
  /** Optional href — when set, the cell renders as a Next.js Link */
  href?: string;
}

export interface ReportsMiniTableRow {
  cells: ReportsMiniTableCell[];
  isHead?: boolean;
}

export interface ReportsMiniTable {
  gridTemplateColumns: string;
  rows: ReportsMiniTableRow[];
}

// ============================================================
// STACK LIST
// ============================================================

export type StackSegmentVariant =
  | 'engineering' | 'design' | 'product' | 'marketing'
  | 'support' | 'solid' | 'success' | 'warn' | 'danger';

export interface ReportsStackListRow {
  label: string;
  value: string;
  meta?: string;
  widthPercent: number;
  segmentVariant: StackSegmentVariant;
}

// ============================================================
// CARD HEAD (shared chrome)
// ============================================================

export interface ReportsCardAction {
  label: string;
  key: string;
}

export interface ReportsCardHead {
  title: string;
  meta: string;
  action?: ReportsCardAction;
}

// ============================================================
// TAB 1 PLATFORM-WIDE
// ============================================================

export interface ReportsGmvCard {
  head: ReportsCardHead;
  value: string;
  delta: ReportsKpiDelta;
  subLine: string;
  sparkline: ReportsSparkline;
  footerPrefix: string;
  footerStrong: string;
  footerSuffix: string;
}

export interface ReportsRevenueCard {
  head: ReportsCardHead;
  value: string;
  delta: ReportsKpiDelta;
  subLine: string;
  table: ReportsMiniTable;
}

export interface ReportsCohortCard {
  head: ReportsCardHead;
  rows: ReportsStackListRow[];
}

export interface ReportsSignupsChartCard {
  head: ReportsCardHead;
  legend: ReportsLineChartLegendItem[];
  chart: ReportsLineChart;
}

export interface ReportsFunnelCard {
  head: ReportsCardHead;
  stages: ReportsFunnelStage[];
}

export interface ReportsTabPlatform {
  kpis: ReportsKpiTile[];
  signupsChart: ReportsSignupsChartCard;
  funnel: ReportsFunnelCard;
  gmvCard: ReportsGmvCard;
  revenueCard: ReportsRevenueCard;
  cohortCard: ReportsCohortCard;
}

// ============================================================
// TABS + DATE RANGE
// ============================================================

export type ReportsTabKey = 'platform' | 'trust-safety' | 'performance' | 'financial' | 'compliance';
export type ReportsDateRangeKey = '7d' | '30d' | '90d' | 'ytd' | '12mo' | 'custom';
export type ReportsTabIconKey = 'globe' | 'shield' | 'activity' | 'dollar' | 'file-text';

export interface ReportsTabDef {
  key: ReportsTabKey;
  label: string;
  count: number;
  iconKey: ReportsTabIconKey;
}

export interface ReportsDateRangeOption {
  key: ReportsDateRangeKey;
  label: string;
  isCustom?: boolean;
}

// ============================================================
// TAB 2 TRUST & SAFETY — new types (Phase 14b)
// ============================================================

export type StageSegmentVariant = 's1' | 's2' | 's3' | 's4';

export interface ReportsStageSegment {
  variant: StageSegmentVariant;
  widthPercent: number;
  text: string;
  title: string;
}

export interface ReportsStageLegendItem {
  variant: StageSegmentVariant;
  label: string;
}

export interface ReportsStageStackedBar {
  segments: ReportsStageSegment[];
  legend: ReportsStageLegendItem[];
}

export interface ReportsAnalysisNote {
  strongPrefix: string;
  rest: string;
  strongColor?: 'ink' | 'danger';
}

export interface ReportsDisputeStagesCard {
  head: ReportsCardHead;
  stackedBar: ReportsStageStackedBar;
  analysisNote: ReportsAnalysisNote;
}

export interface ReportsAntiFraudCard {
  head: ReportsCardHead;
  table: ReportsMiniTable;
}

export interface ReportsTabTrustSafety {
  kpis: ReportsKpiTile[];
  disputeStagesCard: ReportsDisputeStagesCard;
  antiFraudCard: ReportsAntiFraudCard;
}

// ============================================================
// TAB 3 PERFORMANCE — new types (Phase 14b)
// ============================================================

export type PoolHeatState = 'healthy' | 'balanced' | 'thin' | 'critical';

export interface ReportsPoolCell {
  name: string;
  count: string;
  state: PoolHeatState;
}

export interface ReportsPoolLegendItem {
  state: PoolHeatState;
  label: string;
}

export interface ReportsPoolGrid {
  cells: ReportsPoolCell[];
  legend: ReportsPoolLegendItem[];
}

export interface ReportsSpecialistsCard {
  head: ReportsCardHead;
  table: ReportsMiniTable;
}

export interface ReportsPoolHealthCard {
  head: ReportsCardHead;
  inlineLegend: ReportsPoolLegendItem[];
  grid: ReportsPoolGrid;
  analysisNote: ReportsAnalysisNote;
}

export interface ReportsTabPerformance {
  kpis: ReportsKpiTile[];
  specialists: ReportsSpecialistsCard;
  poolHealth: ReportsPoolHealthCard;
}

// ============================================================
// TOP-LEVEL
// ============================================================

// ============================================================
// PHASE 14d — CUSTOM REPORT BUILDER
// ============================================================

// — Saved templates strip —
export type BuilderTemplateIconKey = 'activity' | 'info-circle' | 'grid' | 'file-text';
export interface ReportsBuilderTemplate {
  id: string;
  label: string;
  cadenceMeta: string;
  iconKey: BuilderTemplateIconKey;
}

// — Toolbar —
export type BuilderToolbarActionKey = 'discard' | 'save' | 'run';
export interface ReportsBuilderToolbarAction {
  key: BuilderToolbarActionKey;
  label: string;
  variant: 'default' | 'primary';
  iconKey?: 'save' | 'play';
}
export interface ReportsBuilderToolbar {
  eyebrow: string;
  nameInputDefault: string;
  actions: ReportsBuilderToolbarAction[];
}

// — Data sources sidebar —
export type BuilderSourceIconKey =
  | 'signups' | 'approvals' | 'hires' | 'engagements'
  | 'disputes' | 'reviews' | 'gmv' | 'revenue'
  | 'refunds' | 'dsr' | 'legal';
export interface ReportsBuilderSourceChip {
  key: string;
  label: string;
  iconKey: BuilderSourceIconKey;
  inUse?: boolean;
}
export interface ReportsBuilderSourceGroup {
  label: string;
  chips: ReportsBuilderSourceChip[];
}

// — Canvas config blocks —
export type ConfigChipVariant = 'metric' | 'filter' | 'group' | 'viz' | 'range';
export interface ReportsBuilderConfigChip {
  key: string;
  text: string;
  variant: ConfigChipVariant;
}
export type ConfigBlockIconKey = 'activity' | 'filter' | 'rows' | 'calendar';
export interface ReportsBuilderConfigBlock {
  iconKey: ConfigBlockIconKey;
  label: string;
  required?: boolean;
  chips: ReportsBuilderConfigChip[];
  addBtnLabel?: string;
  addBtnKey?: string;
}

// — Viz picker —
export type VizKey = 'line' | 'bar' | 'table' | 'map' | 'kpi';
export interface ReportsBuilderVizOption {
  key: VizKey;
  label: string;
}
export interface ReportsBuilderVizPicker {
  iconKey: ConfigBlockIconKey;
  label: string;
  options: ReportsBuilderVizOption[];
  defaultActive: VizKey;
}

export interface ReportsBuilderCanvas {
  headerLabel: string;
  metricBlock: ReportsBuilderConfigBlock;
  filtersBlock: ReportsBuilderConfigBlock;
  groupByBlock: ReportsBuilderConfigBlock;
  vizPicker: ReportsBuilderVizPicker;
  dateRangeBlock: ReportsBuilderConfigBlock;
}

// — Preview —
export interface ReportsBuilderPreviewChart {
  viewBoxWidth: number;
  viewBoxHeight: number;
  gridLines: ReportsChartGridLine[];
  axisLabels: ReportsChartAxisLabel[];
  /** Area polyline (super-tinted fill) */
  areaPoints: string;
  /** Line polyline (super stroke) */
  linePoints: string;
  dotX: number;
  dotY: number;
  dotR: number;
}

export interface ReportsBuilderPreview {
  headerLabel: string;
  liveLabel: string;
  subtitle: string;
  meta: string;
  chart: ReportsBuilderPreviewChart;
  footStrong: string;
  footStrongColor: 'success' | 'danger' | 'ink';
  footRest: string;
}

// — Footer (schedule + recipients + format) —
export type ScheduleFreq = 'once' | 'daily' | 'weekly' | 'monthly' | 'quarterly';
export interface ReportsBuilderSchedulePill {
  key: ScheduleFreq;
  label: string;
}
export interface ReportsBuilderSchedule {
  pills: ReportsBuilderSchedulePill[];
  defaultActive: ScheduleFreq;
  metaPrefix: string;
  metaStrong1: string;
  metaMiddle: string;
  metaStrong2: string;
  metaSuffix: string;
}

export interface ReportsBuilderRecipient {
  initials: string;
  gradient: string;
  name: string;
}
export interface ReportsBuilderRecipients {
  list: ReportsBuilderRecipient[];
  addLabel: string;
  meta: string;
}

export type FormatKey = 'pdf' | 'csv' | 'xlsx' | 'email';
export interface ReportsBuilderFormatPill {
  key: FormatKey;
  label: string;
}
export interface ReportsBuilderFormat {
  pills: ReportsBuilderFormatPill[];
  defaultActive: FormatKey;
  meta: string;
}

export interface ReportsBuilderFoot {
  schedule: ReportsBuilderSchedule;
  recipients: ReportsBuilderRecipients;
  format: ReportsBuilderFormat;
}

// ============================================================
// PHASE 14c — TAB 4 FINANCIAL
// ============================================================

export interface ReportsGmvCategoryCard {
  head: ReportsCardHead;
  rows: ReportsStackListRow[];
}

export interface ReportsFeeRevenueChartCard {
  head: ReportsCardHead;
  chart: ReportsLineChart;
  quarterlyFooter: string;
}

export interface ReportsRefundsCard {
  head: ReportsCardHead;
  table: ReportsMiniTable;
}

export interface ReportsFailedPaymentsCard {
  head: ReportsCardHead;
  table: ReportsMiniTable;
}

export interface ReportsTabFinancial {
  kpis: ReportsKpiTile[];
  gmvCategoryCard: ReportsGmvCategoryCard;
  feeRevenueChart: ReportsFeeRevenueChartCard;
  refundsCard: ReportsRefundsCard;
  failedPaymentsCard: ReportsFailedPaymentsCard;
}

// ============================================================
// PHASE 14c — TAB 5 COMPLIANCE
// ============================================================

export interface ReportsDsrCard {
  head: ReportsCardHead;
  table: ReportsMiniTable;
  jurisdictionStrong: string;
  jurisdictionRest: string;
}

export interface ReportsLegalRequestsCard {
  head: ReportsCardHead;
  table: ReportsMiniTable;
}

export interface ReportsTabCompliance {
  kpis: ReportsKpiTile[];
  dsrCard: ReportsDsrCard;
  legalRequestsCard: ReportsLegalRequestsCard;
}

// — Top-level builder —
export interface ReportsCustomBuilder {
  sectionHead: { title: string; meta: string };
  templates: ReportsBuilderTemplate[];
  toolbar: ReportsBuilderToolbar;
  sources: ReportsBuilderSourceGroup[];
  canvas: ReportsBuilderCanvas;
  preview: ReportsBuilderPreview;
  foot: ReportsBuilderFoot;
}

// ============================================================
// TOP-LEVEL
// ============================================================

export interface ReportsAnalyticsData {
  pageMeta: string;
  dateRangeOptions: ReportsDateRangeOption[];
  dateRangeActive: ReportsDateRangeKey;
  tabs: ReportsTabDef[];
  tabActive: ReportsTabKey;
  platform: ReportsTabPlatform;
  trustSafety: ReportsTabTrustSafety;
  performance: ReportsTabPerformance;
  financial: ReportsTabFinancial;
  compliance: ReportsTabCompliance;
  customBuilder: ReportsCustomBuilder;
}

// ============================================================
// TAB DEFINITIONS (admin.html L38041-38067)
// ============================================================

const TABS: ReportsTabDef[] = [
  { key: 'platform', label: 'Platform-wide', count: 7, iconKey: 'globe' },
  { key: 'trust-safety', label: 'Trust & Safety', count: 4, iconKey: 'shield' },
  { key: 'performance', label: 'Performance', count: 4, iconKey: 'activity' },
  { key: 'financial', label: 'Financial', count: 5, iconKey: 'dollar' },
  { key: 'compliance', label: 'Compliance', count: 4, iconKey: 'file-text' },
];

const DATE_RANGES: ReportsDateRangeOption[] = [
  { key: '7d', label: '7d' },
  { key: '30d', label: '30d' },
  { key: '90d', label: '90d' },
  { key: 'ytd', label: 'YTD' },
  { key: '12mo', label: '12mo' },
  { key: 'custom', label: 'Feb 5 → May 5', isCustom: true },
];

// ============================================================
// TAB 1 PLATFORM-WIDE (admin.html L38072-38309)
// ============================================================

// — 5 KPI tiles (admin.html L38077-38131) —
const PLATFORM_KPIS: ReportsKpiTile[] = [
  {
    label: 'Total users',
    value: '28.4K',
    delta: { text: '↑ 8% MoM', variant: 'up' },
    meta: '22.1K candidates · 6.2K clients · 11 specialists',
    sparkline: {
      variant: 'up',
      viewBoxWidth: 100, viewBoxHeight: 28,
      areaPoints: '0,28 0,22 12,20 24,18 36,15 48,14 60,12 72,9 84,7 100,4 100,28',
      linePoints: '0,22 12,20 24,18 36,15 48,14 60,12 72,9 84,7 100,4',
      dotX: 100, dotY: 4, dotR: 2.4,
    },
  },
  {
    label: 'New signups · 30d',
    value: '1,847',
    delta: { text: '↑ 12%', variant: 'up' },
    meta: '61 / day avg · candidates 71% · clients 29%',
    sparkline: {
      variant: 'up',
      viewBoxWidth: 100, viewBoxHeight: 28,
      areaPoints: '0,28 0,18 10,16 20,14 30,17 40,12 50,15 60,11 70,10 80,8 90,9 100,5 100,28',
      linePoints: '0,18 10,16 20,14 30,17 40,12 50,15 60,11 70,10 80,8 90,9 100,5',
      dotX: 100, dotY: 5, dotR: 2.4,
    },
  },
  {
    label: 'Approval rate',
    value: '62%',
    delta: { text: '↓ 3pt', variant: 'down' },
    meta: 'of 1,847 signups · 1,145 approved to live',
    sparkline: {
      variant: 'down',
      viewBoxWidth: 100, viewBoxHeight: 28,
      areaPoints: '0,28 0,5 12,7 24,8 36,10 48,9 60,12 72,15 84,17 100,16 100,28',
      linePoints: '0,5 12,7 24,8 36,10 48,9 60,12 72,15 84,17 100,16',
      dotX: 100, dotY: 16, dotR: 2.4,
    },
  },
  {
    label: 'Hire rate',
    value: '41%',
    delta: { text: '↑ 2pt', variant: 'up' },
    meta: 'of live candidates hired in their first 30d',
    sparkline: {
      variant: 'up',
      viewBoxWidth: 100, viewBoxHeight: 28,
      areaPoints: '0,28 0,18 14,16 28,17 42,14 56,12 70,11 84,9 100,8 100,28',
      linePoints: '0,18 14,16 28,17 42,14 56,12 70,11 84,9 100,8',
      dotX: 100, dotY: 8, dotR: 2.4,
    },
  },
  {
    label: 'Avg time-to-hire',
    value: '8.2d',
    delta: { text: '↓ 0.6d', variant: 'up' },
    meta: 'live → first hire · 30d rolling',
    sparkline: {
      variant: 'up',
      viewBoxWidth: 100, viewBoxHeight: 28,
      areaPoints: '0,28 0,7 12,9 24,8 36,11 48,10 60,13 72,12 84,15 100,17 100,28',
      linePoints: '0,7 12,9 24,8 36,11 48,10 60,13 72,12 84,15 100,17',
      dotX: 100, dotY: 17, dotR: 2.4,
    },
  },
];

// — Daily signups chart (admin.html L38138-38174) —
const SIGNUPS_CHART: ReportsSignupsChartCard = {
  head: {
    title: 'Daily signups · last 90 days',
    meta: 'candidates vs clients · 5,476 total · platform launch reference at day 0',
  },
  legend: [
    { variant: 'candidates', label: 'Candidates' },
    { variant: 'clients', label: 'Clients' },
  ],
  chart: {
    viewBoxWidth: 600,
    viewBoxHeight: 220,
    containerHeightPx: 240,
    gridLines: [
      { x1: 40, y1: 40, x2: 585, y2: 40 },
      { x1: 40, y1: 90, x2: 585, y2: 90 },
      { x1: 40, y1: 140, x2: 585, y2: 140 },
      { x1: 40, y1: 190, x2: 585, y2: 190 },
    ],
    axisLabels: [
      { text: '80', x: 6, y: 44 },
      { text: '60', x: 6, y: 94 },
      { text: '40', x: 6, y: 144 },
      { text: '20', x: 6, y: 194 },
      { text: '0', x: 6, y: 210 },
      { text: 'Feb 5', x: 40, y: 218 },
      { text: 'Mar 5', x: 180, y: 218 },
      { text: 'Apr 5', x: 320, y: 218 },
      { text: 'May 5', x: 460, y: 218 },
    ],
    annotation: {
      x1: 290, y1: 40, x2: 290, y2: 200,
      textX: 295, textY: 50,
      text: 'Spring campaign',
    },
    series: [
      {
        variant: 'candidates',
        areaPoints: '40,162 60,158 80,155 100,160 120,150 140,148 160,145 180,140 200,138 220,130 240,128 260,120 280,108 300,98 320,92 340,86 360,82 380,76 400,72 420,68 440,64 460,58 480,52 500,48 520,44 540,42 560,40 585,38 585,200 40,200',
        linePoints: '40,162 60,158 80,155 100,160 120,150 140,148 160,145 180,140 200,138 220,130 240,128 260,120 280,108 300,98 320,92 340,86 360,82 380,76 400,72 420,68 440,64 460,58 480,52 500,48 520,44 540,42 560,40 585,38',
        dotX: 585, dotY: 38, dotR: 3,
      },
      {
        variant: 'clients',
        areaPoints: '40,188 60,186 80,184 100,186 120,182 140,180 160,178 180,176 200,174 220,170 240,168 260,164 280,160 300,156 320,152 340,148 360,144 380,140 400,136 420,132 440,128 460,124 480,120 500,116 520,112 540,108 560,106 585,104 585,200 40,200',
        linePoints: '40,188 60,186 80,184 100,186 120,182 140,180 160,178 180,176 200,174 220,170 240,168 260,164 280,160 300,156 320,152 340,148 360,144 380,140 400,136 420,132 440,128 460,124 480,120 500,116 520,112 540,108 560,106 585,104',
        dotX: 585, dotY: 104, dotR: 3,
      },
    ],
  },
};

// — Approval funnel (admin.html L38176-38228) —
const FUNNEL: ReportsFunnelCard = {
  head: {
    title: 'Approval funnel',
    meta: 'last 90d · 1,847 signups · 1,145 live (62%)',
  },
  stages: [
    { num: '01', label: 'Signed up',           barLabel: '1,847', count: '1,847', dropoff: '100%', widthPercent: 100, variant: 'default' },
    { num: '02', label: 'Email + WA verified', barLabel: '1,679', count: '1,679', dropoff: '−9%',  widthPercent: 91,  variant: 'default' },
    { num: '03', label: 'Identity verified',   barLabel: '1,478', count: '1,478', dropoff: '−12%', widthPercent: 80,  variant: 'default' },
    { num: '04', label: 'English assessment',  barLabel: '1,348', count: '1,348', dropoff: '−9%',  widthPercent: 73,  variant: 'warn' },
    { num: '05', label: 'Interview 1 passed',  barLabel: '1,254', count: '1,254', dropoff: '−7%',  widthPercent: 68,  variant: 'warn' },
    { num: '06', label: 'Interview 2 passed',  barLabel: '1,194', count: '1,194', dropoff: '−5%',  widthPercent: 65,  variant: 'danger' },
    { num: '07', label: 'Live on Atlas',       barLabel: '1,145', count: '1,145', dropoff: '62%',  widthPercent: 62,  variant: 'default' },
  ],
};

// — GMV card (admin.html L38235-38253) —
const GMV_CARD: ReportsGmvCard = {
  head: {
    title: 'GMV per period',
    meta: 'gross merchandise value · 90d trend',
    action: { label: 'Drill in →', key: 'open-gmv' },
  },
  value: '$487K',
  delta: { text: '↑ 14%', variant: 'up' },
  subLine: 'this month · vs $427K last month',
  sparkline: {
    variant: 'up',
    viewBoxWidth: 100, viewBoxHeight: 36,
    areaPoints: '0,36 0,28 12,26 24,24 36,22 48,18 60,15 72,13 84,9 100,6 100,36',
    linePoints: '0,28 12,26 24,24 36,22 48,18 60,15 72,13 84,9 100,6',
    dotX: 100, dotY: 6, dotR: 2.6,
    heightOverridePx: 56,
  },
  footerPrefix: 'YTD total: ',
  footerStrong: '$1.84M',
  footerSuffix: ' · run-rate $4.6M',
};

// — Revenue card (admin.html L38255-38273) —
const REVENUE_CARD: ReportsRevenueCard = {
  head: {
    title: 'Revenue · 10% fee',
    meta: "Atlas's cut · 90d trend",
    action: { label: 'Drill in →', key: 'open-revenue' },
  },
  value: '$48.7K',
  delta: { text: '↑ 14%', variant: 'up' },
  subLine: 'this month · take rate exactly 10%',
  table: {
    gridTemplateColumns: '1fr 90px 70px',
    rows: [
      {
        isHead: true,
        cells: [
          { text: 'Channel' },
          { text: 'Rev', isNum: true },
          { text: 'Δ', isNum: true },
        ],
      },
      {
        cells: [
          { text: 'Engagements' },
          { text: '$42.1K', isNum: true },
          { text: '↑ 12%', isNum: true, variant: 'success' },
        ],
      },
      {
        cells: [
          { text: 'Subscriptions' },
          { text: '$5.8K', isNum: true },
          { text: '↑ 22%', isNum: true, variant: 'success' },
        ],
      },
      {
        cells: [
          { text: 'One-offs' },
          { text: '$0.8K', isNum: true },
          { text: '↓ 4%', isNum: true, variant: 'warn' },
        ],
      },
    ],
  },
};

// — Cohort card (admin.html L38275-38306) —
const COHORT_CARD: ReportsCohortCard = {
  head: {
    title: "This week's cohort",
    meta: '312 new candidates this week · top 5 categories',
    action: { label: 'Open →', key: 'open-cohort' },
  },
  rows: [
    { label: 'Engineering',      value: '142', meta: '46%', widthPercent: 100, segmentVariant: 'engineering' },
    { label: 'Design',           value: '68',  meta: '22%', widthPercent: 48,  segmentVariant: 'design' },
    { label: 'Product mgmt',     value: '42',  meta: '13%', widthPercent: 30,  segmentVariant: 'product' },
    { label: 'Marketing',        value: '36',  meta: '12%', widthPercent: 25,  segmentVariant: 'marketing' },
    { label: 'Customer support', value: '24',  meta: '8%',  widthPercent: 17,  segmentVariant: 'support' },
  ],
};

const PLATFORM: ReportsTabPlatform = {
  kpis: PLATFORM_KPIS,
  signupsChart: SIGNUPS_CHART,
  funnel: FUNNEL,
  gmvCard: GMV_CARD,
  revenueCard: REVENUE_CARD,
  cohortCard: COHORT_CARD,
};

// ============================================================
// TOP-LEVEL EXPORT
// ============================================================

// ============================================================
// TAB 2 TRUST & SAFETY (admin.html L38314-38433)
// ============================================================

const TRUST_SAFETY_KPIS: ReportsKpiTile[] = [
  {
    label: 'Disputes resolved · 90d',
    value: '38',
    delta: { text: '↑ 4%', variant: 'up' },
    meta: '76% by Specialist · 19% Manager · 4% Admin · 1% appeal',
    sparkline: {
      variant: 'up',
      viewBoxWidth: 100, viewBoxHeight: 28,
      areaPoints: '0,28 0,18 20,16 40,15 60,13 80,11 100,10 100,28',
      linePoints: '0,18 20,16 40,15 60,13 80,11 100,10',
      dotX: 100, dotY: 10, dotR: 2.4,
    },
  },
  {
    label: 'Suspended / banned · 90d',
    value: '31',
    delta: { text: '↑ 8', variant: 'down' },
    meta: '22 candidates · 7 clients · 2 specialists · all reasons captured',
    sparkline: {
      variant: 'down',
      viewBoxWidth: 100, viewBoxHeight: 28,
      areaPoints: '0,28 0,20 20,18 40,16 60,12 80,9 100,7 100,28',
      linePoints: '0,20 20,18 40,16 60,12 80,9 100,7',
      dotX: 100, dotY: 7, dotR: 2.4,
    },
  },
  {
    label: 'Suspicious activity flags',
    value: '147',
    delta: { text: '↑ 18%', variant: 'down' },
    meta: '42 actioned · 67 dismissed · 38 pending review',
    sparkline: {
      variant: 'down',
      viewBoxWidth: 100, viewBoxHeight: 28,
      areaPoints: '0,28 0,20 20,17 40,14 60,12 80,8 100,5 100,28',
      linePoints: '0,20 20,17 40,14 60,12 80,8 100,5',
      dotX: 100, dotY: 5, dotR: 2.4,
    },
  },
  {
    label: 'Anti-fraud effectiveness',
    value: '81%',
    delta: { text: '↑ 3pt', variant: 'up' },
    meta: 'true-positive rate on system flags · 19% false positive',
    sparkline: {
      variant: 'up',
      viewBoxWidth: 100, viewBoxHeight: 28,
      areaPoints: '0,28 0,15 20,13 40,12 60,10 80,8 100,6 100,28',
      linePoints: '0,15 20,13 40,12 60,10 80,8 100,6',
      dotX: 100, dotY: 6, dotR: 2.4,
    },
  },
  {
    label: 'Avg dispute resolution',
    value: '3.9d',
    delta: { text: '↓ 0.4d', variant: 'up' },
    meta: 'all stages · stage 1 → 4',
    sparkline: {
      variant: 'up',
      viewBoxWidth: 100, viewBoxHeight: 28,
      areaPoints: '0,28 0,8 20,10 40,11 60,13 80,16 100,18 100,28',
      linePoints: '0,8 20,10 40,11 60,13 80,16 100,18',
      dotX: 100, dotY: 18, dotR: 2.4,
    },
  },
];

const DISPUTE_STAGES_CARD: ReportsDisputeStagesCard = {
  head: {
    title: 'Where disputes get resolved',
    meta: '38 resolved disputes · stage at resolution · last 90d',
    action: { label: 'Open list →', key: 'open-disputes' },
  },
  stackedBar: {
    segments: [
      { variant: 's1', widthPercent: 47, text: '18 (47%)', title: 'Stage 1 — direct resolution' },
      { variant: 's2', widthPercent: 29, text: '11 (29%)', title: 'Stage 2 — Specialist mediation' },
      { variant: 's3', widthPercent: 19, text: '7 (19%)',  title: 'Stage 3 — Manager review' },
      { variant: 's4', widthPercent: 5,  text: '2',        title: 'Stage 4 — Admin escalation' },
    ],
    legend: [
      { variant: 's1', label: 'Stage 1 — direct (parties)' },
      { variant: 's2', label: 'Stage 2 — Specialist' },
      { variant: 's3', label: 'Stage 3 — Manager' },
      { variant: 's4', label: 'Stage 4 — Admin' },
    ],
  },
  analysisNote: {
    strongPrefix: 'Healthy distribution.',
    rest: ' 76% of disputes resolve at Stage 1 or 2 without escalation. Manager + Admin combined under 25% — within target band of 25-30%.',
  },
};

const ANTI_FRAUD_CARD: ReportsAntiFraudCard = {
  head: {
    title: 'Anti-fraud system effectiveness',
    meta: '147 system flags · 90d · post-investigation outcome',
    action: { label: 'Open T&S →', key: 'open-fraud' },
  },
  table: {
    gridTemplateColumns: '1fr 80px 80px 70px',
    rows: [
      {
        isHead: true,
        cells: [
          { text: 'Detection type' },
          { text: 'Flagged',    isNum: true },
          { text: 'Confirmed',  isNum: true },
          { text: 'TPR',        isNum: true },
        ],
      },
      {
        cells: [
          { text: 'Multi-account' },
          { text: '42', isNum: true },
          { text: '38', isNum: true, variant: 'success' },
          { text: '90%', isNum: true, variant: 'success' },
        ],
      },
      {
        cells: [
          { text: 'Identity mismatch' },
          { text: '31', isNum: true },
          { text: '26', isNum: true, variant: 'success' },
          { text: '84%', isNum: true, variant: 'success' },
        ],
      },
      {
        cells: [
          { text: 'Sock-puppet reviews' },
          { text: '28', isNum: true },
          { text: '25', isNum: true, variant: 'success' },
          { text: '89%', isNum: true, variant: 'success' },
        ],
      },
      {
        cells: [
          { text: 'Payment fraud' },
          { text: '22', isNum: true },
          { text: '14', isNum: true, variant: 'warn' },
          { text: '64%', isNum: true, variant: 'warn' },
        ],
      },
      {
        cells: [
          { text: 'Anti-cheat (assessment)' },
          { text: '14', isNum: true },
          { text: '10', isNum: true },
          { text: '71%', isNum: true },
        ],
      },
      {
        cells: [
          { text: 'Behavioral anomaly' },
          { text: '10', isNum: true },
          { text: '6', isNum: true, variant: 'warn' },
          { text: '60%', isNum: true, variant: 'warn' },
        ],
      },
    ],
  },
};

const TRUST_SAFETY: ReportsTabTrustSafety = {
  kpis: TRUST_SAFETY_KPIS,
  disputeStagesCard: DISPUTE_STAGES_CARD,
  antiFraudCard: ANTI_FRAUD_CARD,
};

// ============================================================
// TAB 3 PERFORMANCE (admin.html L38438-38569)
// ============================================================

const PERFORMANCE_KPIS: ReportsKpiTile[] = [
  // No sparklines per admin.html L38441-38465
  {
    label: 'Specialist avg score',
    value: '4.42',
    vSuffix: '/ 5.0',
    delta: { text: '↑ 0.08', variant: 'up' },
    meta: '11 specialists · auditor + manager composite',
  },
  {
    label: 'Match success rate',
    value: '73%',
    delta: { text: '↑ 4pt', variant: 'up' },
    meta: 'shortlisted → hired · 90d rolling',
  },
  {
    label: 'Pool health',
    value: '18',
    vSuffix: '/ 22 healthy',
    meta: '3 thin · 1 critical (customer support)',
  },
  {
    label: 'Daily activity audit',
    value: '96%',
    delta: { text: '↑ 2pt', variant: 'up' },
    meta: 'sessions logged with full audit · target ≥ 95%',
  },
  {
    label: 'Caseload balance',
    value: 'σ 8.3',
    delta: { text: '↑ 1.1', variant: 'down' },
    meta: 'σ across 11 specialists · target < 7 (rebalance signal)',
  },
];

const SPECIALISTS_CARD: ReportsSpecialistsCard = {
  head: {
    title: 'Talent Specialist performance · last 90d',
    meta: '11 specialists · ranked by composite score (0-5) · audit % · disputes / 30d',
    action: { label: 'Open list →', key: 'open-specialists' },
  },
  table: {
    gridTemplateColumns: '36px 1fr 90px 80px 80px 90px',
    rows: [
      {
        isHead: true,
        cells: [
          { text: '#' },
          { text: 'Specialist' },
          { text: 'Score',    isNum: true },
          { text: 'Match%',   isNum: true },
          { text: 'Disputes', isNum: true },
          { text: 'Caseload', isNum: true },
        ],
      },
      // Rank 1 — Daniel Kovács (spec-001 ✅)
      {
        cells: [
          { text: '1', isMuted: true },
          { text: 'Daniel Kovács', isBodyFont: true, strong: true, href: '/admin/users/specialists/spec-001' },
          { text: '4.78', isNum: true, variant: 'success' },
          { text: '81%',  isNum: true, variant: 'success' },
          { text: '12',   isNum: true },
          { text: '61',   isNum: true, variant: 'warn' },
        ],
      },
      // Rank 2 — Sarah Reyes (spec-002 ✅)
      {
        cells: [
          { text: '2', isMuted: true },
          { text: 'Sarah Reyes', isBodyFont: true, strong: true, href: '/admin/users/specialists/spec-002' },
          { text: '4.65', isNum: true, variant: 'success' },
          { text: '76%',  isNum: true, variant: 'success' },
          { text: '8',    isNum: true },
          { text: '52',   isNum: true },
        ],
      },
      // Rank 3 — Renata Cordeiro (no real profile)
      {
        cells: [
          { text: '3', isMuted: true },
          { text: 'Renata Cordeiro', isBodyFont: true, strong: true },
          { text: '4.51', isNum: true, variant: 'success' },
          { text: '73%',  isNum: true },
          { text: '5',    isNum: true },
          { text: '48',   isNum: true },
        ],
      },
      // Rank 4 — Mateo Vargas (no real profile)
      {
        cells: [
          { text: '4', isMuted: true },
          { text: 'Mateo Vargas', isBodyFont: true, strong: true },
          { text: '4.48', isNum: true, variant: 'success' },
          { text: '71%',  isNum: true },
          { text: '9',    isNum: true },
          { text: '44',   isNum: true },
        ],
      },
      // Rank 5 — Wei Zhang
      {
        cells: [
          { text: '5', isMuted: true },
          { text: 'Wei Zhang', isBodyFont: true, strong: true },
          { text: '4.32', isNum: true },
          { text: '70%',  isNum: true },
          { text: '6',    isNum: true },
          { text: '42',   isNum: true },
        ],
      },
      // Rank 6 — Ben Otieno
      {
        cells: [
          { text: '6', isMuted: true },
          { text: 'Ben Otieno', isBodyFont: true, strong: true },
          { text: '4.28', isNum: true },
          { text: '68%',  isNum: true },
          { text: '4',    isNum: true },
          { text: '38',   isNum: true },
        ],
      },
      // Rank 7 — Jana Reinholt
      {
        cells: [
          { text: '7', isMuted: true },
          { text: 'Jana Reinholt', isBodyFont: true, strong: true },
          { text: '4.12', isNum: true, variant: 'warn' },
          { text: '65%',  isNum: true },
          { text: '7',    isNum: true, variant: 'warn' },
          { text: '36',   isNum: true },
        ],
      },
      // Aggregate row "Other 4 specialists" — muted styling
      {
        cells: [
          { text: '8-11', isMuted: true },
          { text: 'Other 4 specialists', isBodyFont: true, isMuted: true },
          { text: '4.10 avg', isNum: true },
          { text: '63%',      isNum: true },
          { text: '11 total', isNum: true },
          { text: '38 avg',   isNum: true },
        ],
      },
    ],
  },
};

const POOL_HEALTH_CARD: ReportsPoolHealthCard = {
  head: {
    title: 'Pool health by category',
    meta: '22 categories · live candidates available right now · 7-day demand vs supply',
  },
  inlineLegend: [
    { state: 'healthy',  label: 'Healthy' },
    { state: 'balanced', label: 'Balanced' },
    { state: 'thin',     label: 'Thin' },
    { state: 'critical', label: 'Critical' },
  ],
  grid: {
    cells: [
      { name: 'Engineering',           count: '3,420 live · ratio 1:8', state: 'healthy' },
      { name: 'Design',                count: '1,180 · 1:6',            state: 'healthy' },
      { name: 'Product mgmt',          count: '680 · 1:5',              state: 'healthy' },
      { name: 'Marketing',             count: '540 · 1:4',              state: 'healthy' },
      { name: 'Data science',          count: '420 · 1:3',              state: 'balanced' },
      { name: 'Sales',                 count: '380 · 1:3',              state: 'balanced' },
      { name: 'Content / writing',     count: '340 · 1:3',              state: 'balanced' },
      { name: 'Finance / accounting',  count: '280 · 1:2',              state: 'balanced' },
      { name: 'HR / recruiting',       count: '240 · 1:2',              state: 'balanced' },
      { name: 'Operations',            count: '220 · 1:2',              state: 'balanced' },
      { name: 'Legal',                 count: '180 · 1:2',              state: 'balanced' },
      { name: 'Strategy / consulting', count: '160 · 1:2',              state: 'balanced' },
      { name: 'QA / testing',          count: '160 · 1:2',              state: 'balanced' },
      { name: 'DevOps / SRE',          count: '140 · 1:2',              state: 'balanced' },
      { name: 'UX research',           count: '120 · 1:2',              state: 'balanced' },
      { name: 'Project mgmt',          count: '110 · 1:2',              state: 'balanced' },
      { name: 'Localization',          count: '90 · 1:2',               state: 'balanced' },
      { name: 'Mobile dev',            count: '88 · 1:2',               state: 'balanced' },
      { name: 'Video / motion',        count: '62 · 1:1',               state: 'thin' },
      { name: 'Game dev',              count: '48 · 1:1',               state: 'thin' },
      { name: 'ML engineering',        count: '38 · 1:1',               state: 'thin' },
      { name: 'Customer support',      count: '12 · ratio 0.4:1',       state: 'critical' },
    ],
    legend: [
      { state: 'healthy',  label: 'Healthy' },
      { state: 'balanced', label: 'Balanced' },
      { state: 'thin',     label: 'Thin' },
      { state: 'critical', label: 'Critical' },
    ],
  },
  analysisNote: {
    strongPrefix: 'Action needed:',
    rest: ' Customer support pool at 12 live candidates with active demand for ~30. Recommend recruitment-sprint trigger (Mateo’s call · escalated by Jana R.).',
    strongColor: 'danger',
  },
};

const PERFORMANCE: ReportsTabPerformance = {
  kpis: PERFORMANCE_KPIS,
  specialists: SPECIALISTS_CARD,
  poolHealth: POOL_HEALTH_CARD,
};

// ============================================================
// TAB 4 FINANCIAL (admin.html L38574-38748)
// ============================================================

const FINANCIAL_KPIS: ReportsKpiTile[] = [
  {
    label: 'GMV · this month',
    value: '$487K',
    delta: { text: '↑ 14%', variant: 'up' },
    meta: 'vs $427K last month · YTD $1.84M',
    sparkline: {
      variant: 'up',
      viewBoxWidth: 100, viewBoxHeight: 28,
      areaPoints: '0,28 0,22 25,18 50,14 75,9 100,5 100,28',
      linePoints: '0,22 25,18 50,14 75,9 100,5',
      dotX: 100, dotY: 5, dotR: 2.4,
    },
  },
  {
    label: 'Fee revenue · 30d',
    value: '$48.7K',
    delta: { text: '↑ 14%', variant: 'up' },
    meta: '10% take rate · run-rate $584K/yr',
    sparkline: {
      variant: 'up',
      viewBoxWidth: 100, viewBoxHeight: 28,
      areaPoints: '0,28 0,21 25,17 50,14 75,9 100,5 100,28',
      linePoints: '0,21 25,17 50,14 75,9 100,5',
      dotX: 100, dotY: 5, dotR: 2.4,
    },
  },
  {
    label: 'Refunds · 30d',
    value: '$3.2K',
    delta: { text: '↑ 7%', variant: 'down' },
    meta: '14 refunds · 0.65% of GMV · target < 1%',
    sparkline: {
      variant: 'down',
      viewBoxWidth: 100, viewBoxHeight: 28,
      areaPoints: '0,28 0,18 25,16 50,15 75,12 100,10 100,28',
      linePoints: '0,18 25,16 50,15 75,12 100,10',
      dotX: 100, dotY: 10, dotR: 2.4,
    },
  },
  {
    label: 'Failed payments · 30d',
    value: '37',
    delta: { text: '↓ 4', variant: 'up' },
    meta: '0.8% failure rate · 32 retried + recovered · 5 escalated',
    sparkline: {
      variant: 'up',
      viewBoxWidth: 100, viewBoxHeight: 28,
      areaPoints: '0,28 0,8 25,11 50,13 75,15 100,17 100,28',
      linePoints: '0,8 25,11 50,13 75,15 100,17',
      dotX: 100, dotY: 17, dotR: 2.4,
    },
  },
  {
    label: 'Active subscriptions',
    value: '412',
    delta: { text: '↑ 22', variant: 'up' },
    meta: '$5.8K MRR · churn 2.1% (low)',
    sparkline: {
      variant: 'up',
      viewBoxWidth: 100, viewBoxHeight: 28,
      areaPoints: '0,28 0,20 25,17 50,14 75,11 100,7 100,28',
      linePoints: '0,20 25,17 50,14 75,11 100,7',
      dotX: 100, dotY: 7, dotR: 2.4,
    },
  },
];

const GMV_CATEGORY_CARD: ReportsGmvCategoryCard = {
  head: {
    title: 'GMV per category · last 30d',
    meta: '$487K total · top 6 categories shown · all 22 below',
    action: { label: 'All 22 →', key: 'open-gmv-cats' },
  },
  rows: [
    { label: 'Engineering',          value: '$214K', meta: '44%', widthPercent: 100, segmentVariant: 'engineering' },
    { label: 'Design',               value: '$92K',  meta: '19%', widthPercent: 43,  segmentVariant: 'design' },
    { label: 'Product mgmt',         value: '$58K',  meta: '12%', widthPercent: 27,  segmentVariant: 'product' },
    { label: 'Marketing',            value: '$42K',  meta: '9%',  widthPercent: 20,  segmentVariant: 'marketing' },
    { label: 'Data science',         value: '$28K',  meta: '6%',  widthPercent: 13,  segmentVariant: 'solid' },
    { label: 'Other 17 categories',  value: '$53K',  meta: '10%', widthPercent: 25,  segmentVariant: 'support' },
  ],
};

const FEE_REVENUE_CHART: ReportsFeeRevenueChartCard = {
  head: {
    title: 'Fee revenue trend · 90d',
    meta: '$132K Q1 fees · current run-rate $584K/year',
  },
  chart: {
    viewBoxWidth: 600,
    viewBoxHeight: 200,
    containerHeightPx: 200,
    gridLines: [
      { x1: 40, y1: 20,  x2: 585, y2: 20 },
      { x1: 40, y1: 70,  x2: 585, y2: 70 },
      { x1: 40, y1: 120, x2: 585, y2: 120 },
      { x1: 40, y1: 170, x2: 585, y2: 170 },
    ],
    axisLabels: [
      { text: '$60K', x: 6, y: 24 },
      { text: '$45K', x: 6, y: 74 },
      { text: '$30K', x: 6, y: 124 },
      { text: '$15K', x: 6, y: 174 },
      { text: 'Feb', x: 40,  y: 195 },
      { text: 'Mar', x: 220, y: 195 },
      { text: 'Apr', x: 400, y: 195 },
      { text: 'May', x: 555, y: 195 },
    ],
    series: [
      {
        variant: 'gmv',
        areaPoints: '40,160 80,158 120,150 160,142 200,134 240,128 280,118 320,108 360,98 400,86 440,72 480,58 520,46 560,38 585,32 585,180 40,180',
        linePoints: '40,160 80,158 120,150 160,142 200,134 240,128 280,118 320,108 360,98 400,86 440,72 480,58 520,46 560,38 585,32',
        dotX: 585, dotY: 32, dotR: 3,
      },
    ],
  },
  quarterlyFooter: 'Quarterly: Q1 $132K · Q2 to-date $48.7K (33% of Q1 in first month)',
};

const REFUNDS_CARD: ReportsRefundsCard = {
  head: {
    title: 'Refunds · last 90d',
    meta: '42 total · $9.6K · 0.52% of period GMV',
    action: { label: 'Open queue →', key: 'open-refunds' },
  },
  table: {
    gridTemplateColumns: '1fr 80px 80px',
    rows: [
      {
        isHead: true,
        cells: [
          { text: 'Reason' },
          { text: 'Count',   isNum: true },
          { text: '$ Total', isNum: true },
        ],
      },
      { cells: [{ text: 'Dispute resolution' }, { text: '18', isNum: true }, { text: '$4,200', isNum: true }] },
      { cells: [{ text: 'Client cancellation' }, { text: '11', isNum: true }, { text: '$2,840', isNum: true }] },
      { cells: [{ text: 'Engagement quality' }, { text: '7',  isNum: true }, { text: '$1,560', isNum: true }] },
      { cells: [{ text: 'Duplicate / mistake' }, { text: '4', isNum: true }, { text: '$680',   isNum: true }] },
      { cells: [{ text: 'Fraud / chargeback' }, { text: '2', isNum: true, variant: 'warn' }, { text: '$320', isNum: true, variant: 'warn' }] },
    ],
  },
};

const FAILED_PAYMENTS_CARD: ReportsFailedPaymentsCard = {
  head: {
    title: 'Failed payments · 30d',
    meta: '37 failed · 32 recovered · 5 still failing',
    action: { label: 'Open list →', key: 'open-failed' },
  },
  table: {
    gridTemplateColumns: '1fr 70px 90px',
    rows: [
      {
        isHead: true,
        cells: [
          { text: 'Failure reason' },
          { text: 'Count',     isNum: true },
          { text: 'Recovered', isNum: true },
        ],
      },
      { cells: [{ text: 'Insufficient funds' },  { text: '14', isNum: true }, { text: '12', isNum: true, variant: 'success' }] },
      { cells: [{ text: 'Card expired' },        { text: '9',  isNum: true }, { text: '9',  isNum: true, variant: 'success' }] },
      { cells: [{ text: '3DS auth failed' },     { text: '7',  isNum: true }, { text: '5',  isNum: true }] },
      { cells: [{ text: 'Bank decline (risk)' }, { text: '5', isNum: true, variant: 'warn' }, { text: '4', isNum: true, variant: 'warn' }] },
      { cells: [{ text: 'Network / processor' }, { text: '2',  isNum: true }, { text: '2',  isNum: true, variant: 'success' }] },
    ],
  },
};

const FINANCIAL: ReportsTabFinancial = {
  kpis: FINANCIAL_KPIS,
  gmvCategoryCard: GMV_CATEGORY_CARD,
  feeRevenueChart: FEE_REVENUE_CHART,
  refundsCard: REFUNDS_CARD,
  failedPaymentsCard: FAILED_PAYMENTS_CARD,
};

// ============================================================
// TAB 5 COMPLIANCE (admin.html L38753-38835)
// ============================================================

const COMPLIANCE_KPIS: ReportsKpiTile[] = [
  {
    label: 'Data subject requests',
    value: '23',
    delta: { text: '↑ 6', variant: 'down' },
    meta: '14 access · 6 deletion · 3 portability · all within 30d SLA',
    sparkline: {
      variant: 'down',
      viewBoxWidth: 100, viewBoxHeight: 28,
      areaPoints: '0,28 0,18 25,15 50,12 75,9 100,7 100,28',
      linePoints: '0,18 25,15 50,12 75,9 100,7',
      dotX: 100, dotY: 7, dotR: 2.4,
    },
  },
  // KPIs 2-5 have NO sparkline per admin.html L38766-38785
  {
    label: 'Legal requests',
    value: '8',
    delta: { text: 'flat', variant: 'flat' },
    meta: '5 subpoenas · 2 LE · 1 pending deadline (May 12)',
  },
  {
    label: 'Privacy policy updates',
    value: '2',
    delta: { text: 'YTD', variant: 'flat' },
    meta: 'last update Mar 18 · 92% users acknowledged within 14d',
  },
  {
    label: 'Cookie consent rate',
    value: '71%',
    delta: { text: '↑ 4pt', variant: 'up' },
    meta: 'accept-all · 21% custom · 8% reject-all · all logged',
  },
  {
    label: 'Audit log integrity',
    value: '100%',
    delta: { text: 'no breaks', variant: 'flat' },
    meta: '14.2M events · zero gaps · zero rewrites · checksum verified',
  },
];

const DSR_CARD: ReportsDsrCard = {
  head: {
    title: 'Data subject requests · 90d',
    meta: '23 received · 21 fulfilled · 2 in progress (within 30d SLA)',
    action: { label: 'Open queue →', key: 'open-dsr' },
  },
  table: {
    gridTemplateColumns: '1fr 70px 80px 80px',
    rows: [
      {
        isHead: true,
        cells: [
          { text: 'Request type' },
          { text: 'Count',    isNum: true },
          { text: 'Avg days', isNum: true },
          { text: 'SLA',      isNum: true },
        ],
      },
      {
        cells: [
          { text: 'Access (data export)' },
          { text: '14', isNum: true },
          { text: '3.2d', isNum: true },
          { text: '100%', isNum: true, variant: 'success' },
        ],
      },
      {
        cells: [
          { text: 'Deletion (RTBF)' },
          { text: '6', isNum: true },
          { text: '8.4d', isNum: true },
          { text: '100%', isNum: true, variant: 'success' },
        ],
      },
      {
        cells: [
          { text: 'Portability' },
          { text: '3', isNum: true },
          { text: '4.1d', isNum: true },
          { text: '100%', isNum: true, variant: 'success' },
        ],
      },
    ],
  },
  jurisdictionStrong: 'Jurisdictions:',
  jurisdictionRest: ' 18 GDPR (EU) · 4 CCPA (US-CA) · 1 LGPD (BR) · all routed through Compliance Admin desk.',
};

const LEGAL_REQUESTS_CARD: ReportsLegalRequestsCard = {
  head: {
    title: 'Legal requests & deadlines',
    meta: '8 active · 1 deadline within 7 days · 2 in regulatory queue',
    action: { label: 'Open desk →', key: 'open-legal' },
  },
  table: {
    gridTemplateColumns: '90px 1fr 90px 70px',
    rows: [
      {
        isHead: true,
        cells: [
          { text: 'Ref' },
          { text: 'Type / matter' },
          { text: 'Deadline', isNum: true },
          { text: 'Status',   isNum: true },
        ],
      },
      {
        cells: [
          { text: 'LR-2026-018' },
          { text: 'Subpoena · NY-S.D.' },
          { text: 'May 12 · 7d', isNum: true, variant: 'warn' },
          { text: 'Active',      isNum: true, variant: 'warn' },
        ],
      },
      {
        cells: [
          { text: 'LR-2026-019' },
          { text: 'Subpoena · LATAM' },
          { text: 'May 28', isNum: true },
          { text: 'Active', isNum: true },
        ],
      },
      {
        cells: [
          { text: 'LR-2026-020' },
          { text: 'Law-enforcement RFI' },
          { text: 'Jun 10', isNum: true },
          { text: 'Active', isNum: true },
        ],
      },
      {
        cells: [
          { text: 'LR-2026-014' },
          { text: 'EU breach RFI' },
          { text: 'Apr 30', isNum: true },
          { text: 'Filed',  isNum: true, variant: 'success' },
        ],
      },
      {
        cells: [
          { text: 'LR-2026-013' },
          { text: 'Subpoena · CA' },
          { text: 'Apr 22', isNum: true },
          { text: 'Filed',  isNum: true, variant: 'success' },
        ],
      },
    ],
  },
};

const COMPLIANCE: ReportsTabCompliance = {
  kpis: COMPLIANCE_KPIS,
  dsrCard: DSR_CARD,
  legalRequestsCard: LEGAL_REQUESTS_CARD,
};

// ============================================================
// CUSTOM REPORT BUILDER (admin.html L38842-39160)
// ============================================================

const CUSTOM_BUILDER: ReportsCustomBuilder = {
  sectionHead: {
    title: 'Custom report builder',
    meta: 'drag data sources from the left · the preview updates live · save as template, schedule, share with admins',
  },

  // Saved templates (admin.html L38854-38869)
  templates: [
    { id: 'weekly-cohort', label: 'Weekly cohort summary', cadenceMeta: '· daily 8:00 AM', iconKey: 'activity' },
    { id: 'dispute-rates', label: 'Dispute rates by client', cadenceMeta: '· monthly 1st', iconKey: 'info-circle' },
    { id: 'pool-health',   label: 'Pool health by category', cadenceMeta: '· weekly Mon',  iconKey: 'grid' },
    { id: 'board-q',       label: 'Board pack · Q-end',      cadenceMeta: '· quarterly',   iconKey: 'file-text' },
  ],

  // Toolbar (L38875-38893)
  toolbar: {
    eyebrow: 'Report',
    nameInputDefault: 'Brazil hire rate · weekly',
    actions: [
      { key: 'discard', label: 'Discard',            variant: 'default' },
      { key: 'save',    label: 'Save as template',   variant: 'default', iconKey: 'save' },
      { key: 'run',     label: 'Run report',          variant: 'primary', iconKey: 'play' },
    ],
  },

  // Data sources (L38899-38961)
  sources: [
    {
      label: 'Users',
      chips: [
        { key: 'signups',   label: 'Signups',    iconKey: 'signups' },
        { key: 'approvals', label: 'Approvals',  iconKey: 'approvals' },
        { key: 'hires',     label: 'Hires',      iconKey: 'hires', inUse: true },
      ],
    },
    {
      label: 'Activity',
      chips: [
        { key: 'engagements', label: 'Engagements', iconKey: 'engagements' },
        { key: 'disputes',    label: 'Disputes',    iconKey: 'disputes' },
        { key: 'reviews',     label: 'Reviews',     iconKey: 'reviews' },
      ],
    },
    {
      label: 'Financial',
      chips: [
        { key: 'gmv',     label: 'GMV',           iconKey: 'gmv' },
        { key: 'revenue', label: 'Revenue (fees)', iconKey: 'revenue' },
        { key: 'refunds', label: 'Refunds',        iconKey: 'refunds' },
      ],
    },
    {
      label: 'Compliance',
      chips: [
        { key: 'dsr',   label: 'DSR requests',   iconKey: 'dsr' },
        { key: 'legal', label: 'Legal requests', iconKey: 'legal' },
      ],
    },
  ],

  // Canvas (L38964-39059)
  canvas: {
    headerLabel: 'Build your report',
    metricBlock: {
      iconKey: 'activity',
      label: 'Metric',
      required: true,
      chips: [{ key: 'metric', text: 'Hire rate', variant: 'metric' }],
    },
    filtersBlock: {
      iconKey: 'filter',
      label: 'Filters',
      chips: [
        { key: 'filter-1', text: 'Country = Brazil', variant: 'filter' },
        { key: 'filter-2', text: 'Category ∈ (Engineering, Design, Product)', variant: 'filter' },
      ],
      addBtnLabel: '+ Add filter',
      addBtnKey: 'add-filter',
    },
    groupByBlock: {
      iconKey: 'rows',
      label: 'Group by',
      chips: [{ key: 'group', text: 'Week', variant: 'group' }],
      addBtnLabel: '+ Secondary',
      addBtnKey: 'add-group',
    },
    vizPicker: {
      iconKey: 'activity',
      label: 'Visualization',
      defaultActive: 'line',
      options: [
        { key: 'line',  label: 'Line' },
        { key: 'bar',   label: 'Bar' },
        { key: 'table', label: 'Table' },
        { key: 'map',   label: 'Map' },
        { key: 'kpi',   label: 'KPI' },
      ],
    },
    dateRangeBlock: {
      iconKey: 'calendar',
      label: 'Date range',
      chips: [{ key: 'range', text: 'Last 90 days · rolling', variant: 'range' }],
    },
  },

  // Live preview (L39063-39094)
  preview: {
    headerLabel: 'Live preview',
    liveLabel: 'LIVE · 412ms',
    subtitle: 'Hire rate · Brazil · weekly',
    meta: '12 weeks · n=287 hires from 698 live candidates · grouping by ISO week',
    chart: {
      viewBoxWidth: 480,
      viewBoxHeight: 200,
      gridLines: [
        { x1: 32, y1: 20,  x2: 470, y2: 20 },
        { x1: 32, y1: 70,  x2: 470, y2: 70 },
        { x1: 32, y1: 120, x2: 470, y2: 120 },
        { x1: 32, y1: 170, x2: 470, y2: 170 },
      ],
      axisLabels: [
        { text: '60%', x: 2, y: 24 },
        { text: '45%', x: 2, y: 74 },
        { text: '30%', x: 2, y: 124 },
        { text: '15%', x: 2, y: 174 },
        { text: 'W7',  x: 32,  y: 194 },
        { text: 'W11', x: 180, y: 194 },
        { text: 'W15', x: 320, y: 194 },
        { text: 'W19', x: 448, y: 194 },
      ],
      areaPoints: '32,150 70,148 108,142 146,138 184,128 222,118 260,108 298,96 336,82 374,72 412,60 450,52 470,48 470,180 32,180',
      linePoints: '32,150 70,148 108,142 146,138 184,128 222,118 260,108 298,96 336,82 374,72 412,60 450,52 470,48',
      dotX: 470,
      dotY: 48,
      dotR: 3.5,
    },
    footStrong: '+18pt',
    footStrongColor: 'success',
    footRest: ' over 12 weeks · current 52% · range 32–52% · BR cohort outperforming global avg of 41% by 11pt.',
  },

  // Footer (L39103-39155)
  foot: {
    schedule: {
      pills: [
        { key: 'once',      label: 'One-time' },
        { key: 'daily',     label: 'Daily' },
        { key: 'weekly',    label: 'Weekly' },
        { key: 'monthly',   label: 'Monthly' },
        { key: 'quarterly', label: 'Quarterly' },
      ],
      defaultActive: 'weekly',
      metaPrefix: 'Runs every ',
      metaStrong1: 'Monday at 8:00 AM EST',
      metaMiddle: '. Next run: ',
      metaStrong2: 'Mon May 11 · in 5d 22h',
      metaSuffix: '.',
    },
    recipients: {
      list: [
        { initials: 'AO', gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', name: 'Aïsha Okafor (you)' },
        { initials: 'DF', gradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)', name: 'Dario Fonseca' },
        { initials: 'SR', gradient: 'linear-gradient(135deg, #A0C9B8, #4F8B6E)', name: 'Sarah Reyes' },
      ],
      addLabel: '+ Add',
      meta: '3 admin recipients · all permissions verified · audit-logged.',
    },
    format: {
      pills: [
        { key: 'pdf',   label: 'PDF' },
        { key: 'csv',   label: 'CSV' },
        { key: 'xlsx',  label: 'Excel' },
        { key: 'email', label: 'Inline email' },
      ],
      defaultActive: 'pdf',
      meta: 'PDF · embeds chart + data table · attachment limit 10MB · branded with Atlas footer.',
    },
  },
};

// ============================================================
// TOP-LEVEL EXPORT
// ============================================================

export const REPORTS_ANALYTICS_DATA: ReportsAnalyticsData = {
  pageMeta: '/admin/operations/reports · last refreshed 3 min ago · auto-refresh every 5 min',
  dateRangeOptions: DATE_RANGES,
  dateRangeActive: '90d',
  tabs: TABS,
  tabActive: 'platform',
  platform: PLATFORM,
  trustSafety: TRUST_SAFETY,
  performance: PERFORMANCE,
  financial: FINANCIAL,
  compliance: COMPLIANCE,
  customBuilder: CUSTOM_BUILDER,
};
