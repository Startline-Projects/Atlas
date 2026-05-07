/**
 * Mock data for `/specialist/performance` — self-evaluation dashboard.
 *
 * Pattern matches `/specialist/pool-health` closely (full-page dashboard
 * with score + KPI cards + tabs + grid). Reuses operations-shared/
 * MetricCard + SparklineSVG primitives (promoted from pool-health/ in
 * 6.1).
 *
 * Spec deviation captured as type field:
 *   - PDF says peer comparisons must be **anonymous** (no other-specialist
 *     specific numbers, only category averages). HTML shows specific peer
 *     scores. Per HTML wins → render the specific scores; type carries
 *     `peerComparisonsAnonymous: false` for service-layer enforcement
 *     when wired. When services land, set this true and swap to averages.
 *
 * Cross-session refs:
 *   - Header subtitle pulls from `currentUser` (firstName + tenureMonths +
 *     category + cityCountry — all extended in this session).
 *   - Peer ranking uses `peer-*` synthetic ids. The active row references
 *     the user via `isYou: true`.
 */

/* ============================================================
   Period toggle + tabs
   ============================================================ */

export type PerformancePeriod = "month" | "quarter" | "year";

export const PERFORMANCE_PERIODS = [
  { key: "month" as const, label: "Month" },
  { key: "quarter" as const, label: "Quarter" },
  { key: "year" as const, label: "Year" },
];

export type PerformanceTabKey =
  | "overview"
  | "metrics"
  | "peer-ranking"
  | "feedback"
  | "goals";

export const PERFORMANCE_TABS = [
  { key: "overview" as const, label: "Overview" },
  { key: "metrics" as const, label: "Metrics" },
  { key: "peer-ranking" as const, label: "Peer ranking" },
  { key: "feedback" as const, label: "Feedback" },
  { key: "goals" as const, label: "Goals" },
];

/* ============================================================
   Hero scorecard
   ============================================================ */

export type PerformanceGrade =
  | "top-quartile"
  | "median"
  | "below-median"
  | "bottom-quartile";

export type PerformanceQuartile = 1 | 2 | 3 | 4;

export type PerformanceDeltaTone = "up" | "down" | "flat";

export type PerformanceDelta = {
  /** "+4 points vs last quarter" */
  label: string;
  value: string;
  tone: PerformanceDeltaTone;
};

/**
 * Quartile band. The bar is 4 segments laid left to right; `active` is
 * the band the specialist's score falls in.
 */
export type QuartileBand = {
  label: string;
  /** "0-60" / "61-74" / "75-84" / "85-100" */
  rangeLabel: string;
  active: boolean;
};

export type PerformanceHero = {
  score: number;
  gradeLabel: string;
  grade: PerformanceGrade;
  quartile: PerformanceQuartile;
  bands: ReadonlyArray<QuartileBand>;
  axisLabels: { left: string; mid: string; right: string };
  deltas: ReadonlyArray<PerformanceDelta>;
};

/* ============================================================
   KPI card row (4× span-3 cards on Overview row 1)
   ============================================================ */

export type KpiTrendTone = "success" | "amber" | "danger" | "default";

export type PerformanceKpiCard = {
  label: string;
  /** Big number ("142", "11h", "94"). */
  num: string;
  /** Italic suffix on the bignum ("h", "%", "/100"). */
  numEm?: string;
  /** "+12% vs category avg" — the trend chip on the card head. */
  trend?: { tone: KpiTrendTone; text: string };
  /** "vs category benchmark · 117" — sub-line under the bignum. */
  vsBenchmark: string;
};

/* ============================================================
   You-vs-benchmark (span-6 — Overview row 2 left)
   ============================================================ */

export type CmpBarRow = {
  label: string;
  /** 0-100 rendered as `--w` width. */
  youPct: number;
  benchPct: number;
  /** Pre-formatted ("88 / 100", "11.4h / 13.2h"). */
  youLabel: string;
  benchLabel: string;
};

/* ============================================================
   Score trend (span-6 — Overview row 2 right)
   ============================================================ */

export type ScoreTrend = {
  /** 12-point series spanning the period. */
  points: ReadonlyArray<number>;
  benchPoint: number;
  benchLabel: string;
  startLabel: string;
  endLabel: string;
  endValue: number;
};

/* ============================================================
   Strengths / Growth-areas (span-6 each — Overview row 3)
   ============================================================ */

export type StrengthGrowthTone =
  | "strength"
  | "growth"
  | "future";

export type StrengthGrowthItem = {
  /** "Decision speed" / "Dispute mediation tone" */
  title: string;
  /** Body copy — what makes it a strength / growth area. */
  detail: string;
  tone: StrengthGrowthTone;
};

/* ============================================================
   Peer ranking (span-6 — Overview row 4 left)
   ============================================================ */

export type PeerRankRow = {
  /** "peer-1" through "peer-N" or "you". */
  id: string;
  rank: number;
  name: string;
  category: string;
  score: number;
  /** True for the active specialist's row. */
  isYou?: boolean;
  /** Optional ellipsis row marker for "5 specialists between" rows. */
  ellipsisLabel?: string;
};

/* ============================================================
   Quarterly goals (span-6 — Overview row 4 right)
   ============================================================ */

export type GoalStatus = "on-track" | "met" | "exceeded" | "amber" | "missed";

export type GoalRow = {
  title: string;
  /** "47 / 50" or "5 / 8". */
  progressLabel: string;
  /** 0-100 width for the progress bar. */
  progressPct: number;
  status: GoalStatus;
  /** "ON TRACK" / "MET" / "EXCEEDED" / "AT RISK" / "MISSED". */
  statusLabel: string;
};

/* ============================================================
   Feedback received (span-12 — Overview row 5)
   ============================================================ */

export type FeedbackTone = "client" | "candidate" | "manager";

export type FeedbackCard = {
  id: string;
  /** Where the feedback came from (anonymized client / candidate / manager). */
  source: string;
  sourceTone: FeedbackTone;
  /** "FROM A CLIENT" / "FROM A CANDIDATE" / "FROM YOUR MANAGER". */
  sourceLabel: string;
  /** ISO date of the feedback. */
  whenLabel: string;
  body: string;
};

/* ============================================================
   The full snapshot
   ============================================================ */

export type PerformanceSnapshot = {
  activePeriod: PerformancePeriod;
  /** "Apr 2026" — the review window label, shown in header subtitle. */
  reviewWindowLabel: string;

  hero: PerformanceHero;

  kpis: ReadonlyArray<PerformanceKpiCard>;
  comparison: ReadonlyArray<CmpBarRow>;
  trend: ScoreTrend;
  strengths: ReadonlyArray<StrengthGrowthItem>;
  growthAreas: ReadonlyArray<StrengthGrowthItem>;
  peerRanking: ReadonlyArray<PeerRankRow>;
  goals: ReadonlyArray<GoalRow>;
  feedback: ReadonlyArray<FeedbackCard>;

  /**
   * Per PDF Step 13: peer comparisons must be anonymous. HTML deviates
   * by showing specific peer scores. When this flips to true (services
   * wired), the peerRanking array should be replaced with category
   * averages only.
   */
  peerComparisonsAnonymous: boolean;
};

/* ============================================================
   The snapshot — Quarter window, Apr 2026
   ============================================================ */

export const performanceSnapshot: PerformanceSnapshot = {
  activePeriod: "quarter",
  reviewWindowLabel: "Apr 2026",

  hero: {
    score: 88,
    gradeLabel: "★ TOP QUARTILE · TOP 12%",
    grade: "top-quartile",
    quartile: 4,
    bands: [
      { label: "Q1", rangeLabel: "0–60", active: false },
      { label: "Q2", rangeLabel: "61–74", active: false },
      { label: "Q3", rangeLabel: "75–84", active: false },
      { label: "Q4", rangeLabel: "85–100", active: true },
    ],
    axisLabels: {
      left: "Bottom 25%",
      mid: "Median",
      right: "Top 25%",
    },
    deltas: [
      { label: "vs last quarter", value: "+4 points", tone: "up" },
      { label: "vs same quarter last year", value: "+9 points", tone: "up" },
      { label: "vs category average", value: "+12 points", tone: "up" },
    ],
  },

  kpis: [
    {
      label: "Volume",
      num: "142",
      vsBenchmark: "117 vs benchmark · +21%",
      trend: { tone: "success", text: "↑ 12% vs cat. avg" },
    },
    {
      label: "Speed",
      num: "11.4",
      numEm: "h",
      vsBenchmark: "13.2h vs benchmark · −14%",
      trend: { tone: "success", text: "↓ 1.8h faster" },
    },
    {
      label: "Accuracy",
      num: "94",
      numEm: "%",
      vsBenchmark: "89% vs benchmark · +5pp",
      trend: { tone: "success", text: "+ 5pp" },
    },
    {
      label: "Satisfaction",
      num: "4.7",
      numEm: "/5",
      vsBenchmark: "4.3 vs benchmark · +0.4",
      trend: { tone: "success", text: "+ 0.4" },
    },
  ],

  comparison: [
    {
      label: "Volume",
      youPct: 88,
      benchPct: 73,
      youLabel: "142 reviews",
      benchLabel: "117 cat. avg",
    },
    {
      label: "Speed",
      youPct: 86,
      benchPct: 72,
      youLabel: "11.4h avg",
      benchLabel: "13.2h cat. avg",
    },
    {
      label: "Accuracy",
      youPct: 94,
      benchPct: 89,
      youLabel: "94% match",
      benchLabel: "89% cat. avg",
    },
    {
      label: "Pool quality",
      youPct: 92,
      benchPct: 78,
      youLabel: "4.7★ pool avg",
      benchLabel: "4.3★ cat. avg",
    },
    {
      label: "Satisfaction",
      youPct: 94,
      benchPct: 86,
      youLabel: "4.7 / 5",
      benchLabel: "4.3 / 5",
    },
    {
      label: "Dispute rate",
      youPct: 12,
      benchPct: 22,
      youLabel: "1.2% disputed",
      benchLabel: "2.2% cat. avg",
    },
  ],

  trend: {
    points: [76, 78, 80, 81, 82, 83, 83, 84, 85, 86, 87, 88],
    benchPoint: 76,
    benchLabel: "BENCHMARK · 76",
    startLabel: "Mar 2025",
    endLabel: "Apr 2026 · 88",
    endValue: 88,
  },

  strengths: [
    {
      title: "Decision speed",
      detail:
        "11.4h average review time — 1.8h faster than category benchmark. Top-decile across all 6 sessions tracked.",
      tone: "strength",
    },
    {
      title: "Dispute mediation tone",
      detail:
        "Clients have rated your dispute mediation 4.8/5 across 7 closed cases. The phrase 'kept everyone calm' surfaced in 4 separate reviews.",
      tone: "strength",
    },
    {
      title: "Pool composition discipline",
      detail:
        "Your VA pool tier mix (13% elite / 51% vetted / 36% standard) is more balanced than category average (8% / 42% / 50%). Drives downstream match quality.",
      tone: "strength",
    },
  ],
  growthAreas: [
    {
      title: "Off-board decision turnaround",
      detail:
        "Off-board recommendations sit in queue avg 4.1 days vs category 2.7 days. Instinct to over-deliberate; consider faster co-sign cycles.",
      tone: "growth",
    },
    {
      title: "Sourcing pipeline volume",
      detail:
        "5 of 8 monthly applicant target. Strong on quality (88% match avg) but lighter on top-of-funnel volume than peers.",
      tone: "growth",
    },
    {
      title: "Cross-category coverage (future)",
      detail:
        "Manager flagged for Q3: ramp on Healthcare ops as a cross-coverage category. Not yet started; Q3 OKR.",
      tone: "future",
    },
  ],

  peerRanking: [
    { id: "peer-1", rank: 1, name: "Sarah Lin", category: "Engineering", score: 95 },
    { id: "peer-2", rank: 2, name: "David Park", category: "Customer Ops", score: 93 },
    { id: "peer-3", rank: 3, name: "Adaeze Okafor", category: "Healthcare Ops", score: 92 },
    {
      id: "peer-ellipsis-1",
      rank: 0,
      name: "",
      category: "",
      score: 0,
      ellipsisLabel: "5 specialists between · scores 89–92",
    },
    { id: "you", rank: 9, name: "Miguel Aguilar", category: "Virtual Assistants", score: 88, isYou: true },
    { id: "peer-10", rank: 10, name: "Elena Marquez", category: "Editorial", score: 87 },
    {
      id: "peer-ellipsis-2",
      rank: 0,
      name: "",
      category: "",
      score: 0,
      ellipsisLabel: "8 specialists between · scores 78–86",
    },
    { id: "peer-19", rank: 19, name: "Priya Anand", category: "Finance Ops", score: 76 },
  ],

  goals: [
    {
      title: "Grow VA pool to 50 talents",
      progressLabel: "47 / 50",
      progressPct: 94,
      status: "on-track",
      statusLabel: "ON TRACK",
    },
    {
      title: "Hold avg client rating ≥ 4.7",
      progressLabel: "4.7 / 4.7",
      progressPct: 100,
      status: "met",
      statusLabel: "MET",
    },
    {
      title: "8 new applicants from sourcing",
      progressLabel: "5 / 8",
      progressPct: 63,
      status: "amber",
      statusLabel: "AT RISK · 8 DAYS LEFT",
    },
    {
      title: "Resolve 1 high-risk churn case",
      progressLabel: "2 / 1",
      progressPct: 100,
      status: "exceeded",
      statusLabel: "EXCEEDED",
    },
  ],

  feedback: [
    {
      id: "fb-1",
      source: "Sarah Lin · Acme Co",
      sourceTone: "client",
      sourceLabel: "FROM A CLIENT · 5★",
      whenLabel: "1 week ago",
      body:
        "Miguel matched us with Anand and the work has been transformative. He keeps a steady hand on capacity and proactively flagged when Anand was nearing his hour ceiling. Best specialist we've worked with across 3 different platforms.",
    },
    {
      id: "fb-2",
      source: "Anand Patel · VA, 23 months",
      sourceTone: "candidate",
      sourceLabel: "FROM A CANDIDATE · 5★",
      whenLabel: "2 weeks ago",
      body:
        "Miguel's the kind of specialist who actually reads my replies before responding. The cap conversation last quarter could have gone sideways and he turned it into a clean ask to Sarah at Acme. Senior move.",
    },
    {
      id: "fb-3",
      source: "Atlas Manager · L. Diaz",
      sourceTone: "manager",
      sourceLabel: "FROM YOUR MANAGER",
      whenLabel: "Apr 4 · quarterly review",
      body:
        "Q1 was a strong quarter. The Sofia / Quill dispute showed real judgment — your draft recommendation was on the money and saved the dispute team a full review pass. Keep pushing on outbound sourcing volume; that's the one growth area I want to see Q2 movement on.",
    },
  ],

  peerComparisonsAnonymous: false,
};
