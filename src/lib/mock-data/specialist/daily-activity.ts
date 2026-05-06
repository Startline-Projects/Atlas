/**
 * Mock data for `/specialist/daily-activity` — read-only audit log feed.
 *
 * **HTML / PDF DIVERGENCE — building the HTML's audit log this session.**
 *
 * The HTML's `view-daily-activity` is a read-only timeline of completed
 * actions: 4-card stat strip, 30-day activity heatmap, filter chips per
 * action category, and a chronological feed grouped by day.
 *
 * The PDF (Step 12) describes a different surface: a SUBMISSION FORM
 * with manager-required enforcement (LinkedIn message counts, email
 * counts, signups generated, today's wins / blockers / tomorrow's
 * priorities, submit button + post-submission lock, calendar view of
 * past submissions). The PDF's surface is captured on the type layer
 * via `DailyActivitySubmission` below — NOT rendered this session.
 *
 * Migration target (when services land):
 *
 *   Daily-activity in production needs both surfaces — the read-only
 *   audit log (this session's UI) AND a daily submission form with
 *   manager-required enforcement. Recommended path: a separate route
 *   `/specialist/daily-activity/submit` launched from a "Submit today's
 *   report" CTA at the top of the audit log, OR a modal triggered from
 *   the same CTA. Manager-required enforcement is service-layer (block
 *   sign-out / surface dashboard alert if previous day not submitted).
 *   When services land, this becomes a real migration item.
 *
 * Cross-session ID strategy:
 *   - Feed items reference candidate review decisions, message threads,
 *     recert outcomes, dispute movements. Most entries carry a
 *     `candidateId: cand-*` or `clientId: client-*` back-reference.
 *   - Names rendered in `title` use bold Sessions 2-3 names so the feed
 *     reads like a real specialist's day.
 */

/* ============================================================
   Types — feed
   ============================================================ */

/**
 * Filter chip keys. The HTML colors each chip's leading dot via
 * `.act-filter-dot.<key>` — we preserve those keys verbatim.
 */
export type ActivityFilterKey =
  | "all"
  | "review"
  | "message"
  | "recert"
  | "dispute"
  | "match"
  | "system";

export type ActivityFilterDef = {
  key: ActivityFilterKey;
  label: string;
};

export const ACTIVITY_FILTERS: ReadonlyArray<ActivityFilterDef> = [
  { key: "all", label: "All" },
  { key: "review", label: "Reviews & decisions" },
  { key: "message", label: "Messages" },
  { key: "recert", label: "Re-cert" },
  { key: "dispute", label: "Disputes" },
  { key: "match", label: "Matches & briefs" },
  { key: "system", label: "System" },
];

/** A single feed item — one specialist action. */
export type ActivityFeedItemKind = Exclude<ActivityFilterKey, "all">;

export type ActivityChipTone =
  | "default"
  | "success"
  | "amber"
  | "danger"
  | "lime"
  | "elite";

export type ActivityChip = {
  label: string;
  tone: ActivityChipTone;
};

/**
 * A single item in the activity feed. Cross-session refs (`candidateId`,
 * `clientId`, `disputeId`) are optional but encouraged — they future-proof
 * for hover-cards / nav-on-click later.
 */
export type ActivityFeedItem = {
  id: string;
  /** Pre-formatted clock time ("4:18 PM"). */
  time: string;
  /** Day grouping label ("Today", "Yesterday", "Mon Apr 28"). */
  date: string;
  kind: ActivityFeedItemKind;
  /** Almost always "you"; "system" for auto-events. */
  actor: "you" | "system";
  /**
   * Title text — supports inline `<strong>name</strong>` and
   * `<em>action</em>` markup. The activity-feed-item component parses
   * these into typed `TitleNode` arrays and renders them as React
   * elements (NO `dangerouslySetInnerHTML`, per Session 5 convention).
   */
  title: string;
  /** Optional second line — secondary context. */
  detail?: string;
  /** Optional message excerpt rendered as italic block-quote. */
  quote?: string;
  /** Optional outcome chips rendered to the right of the title row. */
  chips?: ReadonlyArray<ActivityChip>;
  /* Cross-session refs (used for future hover-cards / click-throughs) */
  candidateId?: string;
  clientId?: string;
  disputeId?: string;
};

/* ============================================================
   Types — heatmap
   ============================================================ */

/** 5-step density (h0..h4) — same scale as `pool-health.HeatDensity`. */
export type ActivityHeatDensity = 0 | 1 | 2 | 3 | 4;

export type ActivityHeatmapCell = {
  /** ISO date for tooltip / accessible label. */
  date: string;
  /** Total action count for the day. */
  count: number;
  /** Pre-computed density bucket (0-4). 0 = no actions (missed day). */
  density: ActivityHeatDensity;
  /** Pre-formatted tooltip ("12 actions · Apr 24"). */
  tooltip: string;
};

/* ============================================================
   Types — stat strip
   ============================================================ */

export type ActivityStatTone = "success" | "amber" | "default";

export type ActivityStatCard = {
  label: string;
  num: string;
  numEm?: string;
  trend?: { tone: ActivityStatTone; text: string };
};

/* ============================================================
   Types — period toggle
   ============================================================ */

export type ActivityPeriod = "today" | "7d" | "30d";

export type ActivityPeriodDef = {
  key: ActivityPeriod;
  label: string;
};

export const ACTIVITY_PERIODS: ReadonlyArray<ActivityPeriodDef> = [
  { key: "today", label: "Today" },
  { key: "7d", label: "7 days" },
  { key: "30d", label: "30 days" },
];

/* ============================================================
   Types — full snapshot
   ============================================================ */

export type ActivitySnapshot = {
  category: string;
  /** Currently-active period key. */
  activePeriod: ActivityPeriod;

  /* 4-card stat strip — depends on active period */
  stats: ReadonlyArray<ActivityStatCard>;

  /* Filter chip counts — total across the active period */
  filterCounts: Record<ActivityFilterKey, number>;

  /* 30-day heatmap — always 30 cells regardless of period (per HTML) */
  heatmap: ReadonlyArray<ActivityHeatmapCell>;

  /* Feed — sorted newest-first */
  feed: ReadonlyArray<ActivityFeedItem>;
};

/* ============================================================
   PDF-shape submission form — typed for migration, NOT rendered
   ============================================================ */

/**
 * PDF Step 12 §"Activity submission form" — typed but not surfaced this
 * session. Fields mirror the PDF verbatim. Service-layer enforcement
 * (lock-after-submit, manager-required) is out of scope until services
 * land. See migration note at the top of this file.
 */
export type DailyActivitySubmissionStatus =
  | "not-submitted"
  | "submitted"
  | "locked";

export type DailyActivitySubmission = {
  /** ISO date the report covers. */
  date: string;
  status: DailyActivitySubmissionStatus;

  /** PDF Section 1 — outreach tracking, per-platform counts. */
  outreachCounts: {
    linkedinMessages: number;
    linkedinPosts: number;
    emails: number;
    redditPosts: number;
    fbGroupPosts: number;
    directReferrals: number;
    /** "Other" channel free-text label. */
    otherText?: string;
    /** "Other" channel count. */
    otherCount?: number;
  };

  /** PDF Section 2 — conversations / outreach results. */
  conversationsResults: {
    responsesReceived: number;
    signupsGenerated: number;
    /** Subjective 1-5 quality rating. */
    qualityRating?: 1 | 2 | 3 | 4 | 5;
  };

  /** PDF Section 3 — auto-calculated profile-work counts. */
  profileWorkAutoCalc: {
    reviewsCompleted: number;
    disputesResolved: number;
    recertsReviewed: number;
    profileUpdatesApproved: number;
    profileUpdatesRejected: number;
  };

  /** PDF Section 4 — free-text notes. */
  notesWins?: string;
  notesBlockers?: string;
  tomorrowsPriorities?: string;

  /** Set after submission. */
  submittedAtIso?: string;
  /** Set after admin lock (or auto-lock at end-of-day). */
  lockedAtIso?: string;
};

/* ============================================================
   Helpers
   ============================================================ */

function chip(label: string, tone: ActivityChipTone): ActivityChip {
  return { label, tone };
}

function densityFor(count: number): ActivityHeatDensity {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 7) return 2;
  if (count <= 15) return 3;
  return 4;
}

/* ============================================================
   30-day heatmap (one missed day at index 11 — May 1)
   ============================================================ */

const heatmapCounts: ReadonlyArray<{ date: string; count: number }> = [
  { date: "2026-04-07", count: 8 },
  { date: "2026-04-08", count: 14 },
  { date: "2026-04-09", count: 22 },
  { date: "2026-04-10", count: 18 },
  { date: "2026-04-11", count: 4 },
  { date: "2026-04-12", count: 0 },
  { date: "2026-04-13", count: 12 },
  { date: "2026-04-14", count: 16 },
  { date: "2026-04-15", count: 24 },
  { date: "2026-04-16", count: 19 },
  { date: "2026-04-17", count: 13 },
  { date: "2026-04-18", count: 0 }, // missed day — visible in HTML
  { date: "2026-04-19", count: 9 },
  { date: "2026-04-20", count: 17 },
  { date: "2026-04-21", count: 28 },
  { date: "2026-04-22", count: 22 },
  { date: "2026-04-23", count: 31 },
  { date: "2026-04-24", count: 25 },
  { date: "2026-04-25", count: 6 },
  { date: "2026-04-26", count: 4 },
  { date: "2026-04-27", count: 35 }, // dispute filing day
  { date: "2026-04-28", count: 27 },
  { date: "2026-04-29", count: 24 },
  { date: "2026-04-30", count: 30 },
  { date: "2026-05-01", count: 19 },
  { date: "2026-05-02", count: 16 },
  { date: "2026-05-03", count: 5 },
  { date: "2026-05-04", count: 21 },
  { date: "2026-05-05", count: 38 },
  { date: "2026-05-06", count: 42 }, // today (current-date 2026-05-06)
];

const heatmap: ReadonlyArray<ActivityHeatmapCell> = heatmapCounts.map(
  ({ date, count }) => {
    const density = densityFor(count);
    const dateLabel = new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const tooltip =
      count === 0
        ? `No actions logged · ${dateLabel}`
        : `${count} action${count === 1 ? "" : "s"} · ${dateLabel}`;
    return { date, count, density, tooltip };
  },
);

/* ============================================================
   Feed — ~38 entries spanning today + last 30 days
   ============================================================ */

const feed: ReadonlyArray<ActivityFeedItem> = [
  /* ============= TODAY (May 6 · 42 actions sampled) ============= */
  {
    id: "act-1",
    time: "4:18 PM",
    date: "Today",
    kind: "review",
    actor: "you",
    title: "Approved <strong>Marie Okonkwo</strong> for the active pool",
    detail: "Welcome flow auto-sent · added to recommended candidate list",
    chips: [chip("Approved", "success"), chip("Vetted", "lime")],
    candidateId: "cand-marie-okonkwo",
  },
  {
    id: "act-2",
    time: "3:42 PM",
    date: "Today",
    kind: "message",
    actor: "you",
    title: "Replied to <strong>Anand Patel</strong>",
    detail: "Acme Q2 ops report — Monday EOD timeline confirmed",
    quote:
      "Glad Sarah was flexible — that's why we time-box. One ask: when you send the Monday draft, mention that you held the line so the analysis was thorough.",
    candidateId: "cand-anand-patel",
  },
  {
    id: "act-3",
    time: "3:15 PM",
    date: "Today",
    kind: "match",
    actor: "you",
    title:
      "Sent shortlist for <strong>Mercer Capital</strong> bilingual VA brief",
    detail: "3 candidates · Carmen, Carlos, Hannah · profiles + rates attached",
    chips: [chip("3 candidates", "default")],
    clientId: "client-mercer-capital",
  },
  {
    id: "act-4",
    time: "2:48 PM",
    date: "Today",
    kind: "dispute",
    actor: "you",
    title: "Reviewed dispute <strong>DSP-2026-04-04</strong> evidence",
    detail: "Anand · TechFlow billing reconciliation · all 3 docs reviewed",
    chips: [chip("12h SLA left", "danger")],
    disputeId: "DSP-2026-04-04",
  },
  {
    id: "act-5",
    time: "2:20 PM",
    date: "Today",
    kind: "recert",
    actor: "you",
    title: "Approved re-cert for <strong>Linh Nguyen</strong>",
    detail: "12-month cycle · clean record · no changes needed",
    chips: [chip("Recert clean", "success")],
    candidateId: "cand-linh-nguyen",
  },
  {
    id: "act-6",
    time: "1:42 PM",
    date: "Today",
    kind: "review",
    actor: "you",
    title:
      "Requested revisions on <strong>Hana Reza</strong>'s profile",
    detail: "References needed re-verification · sent re-verify request",
    chips: [chip("Revision", "amber")],
    candidateId: "cand-hana-reza",
  },
  {
    id: "act-7",
    time: "12:34 PM",
    date: "Today",
    kind: "message",
    actor: "you",
    title: "Replied to <strong>Quill &amp; Co</strong> dispute thread",
    detail: "Lowering temperature on Sofia/Quill case · settlement direction",
    quote:
      "Understood. I want to be straight with you — I've reviewed the SOW you signed, and item 4 does carry prep at $42/h as a billable line.",
    clientId: "client-quill-co",
    disputeId: "DSP-2026-04-12",
  },
  {
    id: "act-8",
    time: "11:42 AM",
    date: "Today",
    kind: "dispute",
    actor: "you",
    title:
      "Drafted preliminary recommendation on <strong>DSP-2026-04-12</strong>",
    detail: "Sofia · Quill payment-delay case · partial in favor of claimant",
    disputeId: "DSP-2026-04-12",
  },
  {
    id: "act-9",
    time: "11:08 AM",
    date: "Today",
    kind: "system",
    actor: "system",
    title: "<strong>Pool health refresh</strong> — score now 82/100",
    detail: "+1 vs yesterday · top quartile maintained",
  },
  {
    id: "act-10",
    time: "10:14 AM",
    date: "Today",
    kind: "match",
    actor: "you",
    title:
      "Acknowledged brief from <strong>Lumio Health</strong>",
    detail: "Spanish-speaking VA · shortlist target Friday EOD",
    clientId: "client-lumio-health",
  },
  {
    id: "act-11",
    time: "9:32 AM",
    date: "Today",
    kind: "review",
    actor: "you",
    title: "Rejected <strong>Wei Tan</strong> from review queue",
    detail: "Fit not strong enough — async-only role mismatch · 6mo lockout",
    chips: [chip("Rejected", "danger")],
    candidateId: "cand-wei-tan",
  },
  {
    id: "act-12",
    time: "8:42 AM",
    date: "Today",
    kind: "system",
    actor: "system",
    title: "Day started — first action of the day",
  },

  /* ============= YESTERDAY (May 5 · 38 actions sampled) ============= */
  {
    id: "act-y1",
    time: "5:48 PM",
    date: "Yesterday",
    kind: "match",
    actor: "you",
    title: "Sent shortlist for <strong>Saunders SaaS</strong> first brief",
    detail: "4 candidates for customer-ops VA role with APAC overlap",
    chips: [chip("4 candidates", "default")],
    clientId: "client-saunders-saas",
  },
  {
    id: "act-y2",
    time: "4:22 PM",
    date: "Yesterday",
    kind: "review",
    actor: "you",
    title: "Approved <strong>Tomás Reyes</strong> from review queue",
    detail: "Bilingual VA · referred by Carmen · clean references",
    chips: [chip("Approved", "success"), chip("Standard", "default")],
    candidateId: "cand-marie-okonkwo",
  },
  {
    id: "act-y3",
    time: "2:14 PM",
    date: "Yesterday",
    kind: "message",
    actor: "you",
    title: "Replied to <strong>Acme Co</strong>",
    detail: "Confirmed Anand extension renewal · Sarah's 5★ kudos forwarded",
    clientId: "client-acme-co",
  },
  {
    id: "act-y4",
    time: "11:30 AM",
    date: "Yesterday",
    kind: "recert",
    actor: "you",
    title: "Reviewed re-cert for <strong>Aaliyah Koné</strong>",
    detail: "12-month cycle approaching · slipping toward grace · pinged her",
    chips: [chip("Pending action", "amber")],
    candidateId: "cand-aaliyah-kone",
  },
  {
    id: "act-y5",
    time: "9:48 AM",
    date: "Yesterday",
    kind: "system",
    actor: "system",
    title: "<strong>Daily summary</strong> — 38 actions · 9 decisions · 14 messages",
  },

  /* ============= LAST 7 DAYS sample ============= */
  {
    id: "act-w1",
    time: "3:42 PM",
    date: "Mon Apr 28",
    kind: "dispute",
    actor: "you",
    title: "Filed escalation on <strong>DSP-2026-04-15</strong>",
    detail: "Tomás Silva-Mendes / Bridgepoint LLC · damages claim out of scope",
    chips: [chip("Escalated", "danger")],
    disputeId: "DSP-2026-04-15",
    candidateId: "cand-tomas-silva",
  },
  {
    id: "act-w2",
    time: "2:08 PM",
    date: "Mon Apr 28",
    kind: "review",
    actor: "you",
    title: "Approved <strong>Carmen Lopez</strong> for the pool",
    detail: "Bilingual ops VA · clean references · added to available roster",
    chips: [chip("Approved", "success"), chip("Vetted", "lime")],
    candidateId: "cand-carmen-lopez",
  },
  {
    id: "act-w3",
    time: "11:24 AM",
    date: "Mon Apr 28",
    kind: "message",
    actor: "you",
    title: "Sent check-in to <strong>Northwind Solutions</strong>",
    detail: "62-day brief silence · proposed 30-min retro call",
    quote:
      "Sounds good — I'll keep next week open. If it's helpful, happy to do a 30-min retro on what worked + what didn't on the last engagements.",
    clientId: "client-northwind",
  },
  {
    id: "act-w4",
    time: "5:14 PM",
    date: "Sun Apr 27",
    kind: "dispute",
    actor: "system",
    title: "<strong>DSP-2026-04-12</strong> filed",
    detail: "Sofia Reyes · Quill &amp; Co · payment-delay claim",
    chips: [chip("New dispute", "danger")],
    disputeId: "DSP-2026-04-12",
    candidateId: "cand-sofia-reyes",
    clientId: "client-quill-co",
  },
  {
    id: "act-w5",
    time: "10:14 AM",
    date: "Sun Apr 27",
    kind: "system",
    actor: "system",
    title: "<strong>Pool health alert</strong> — score dropped to 81/100",
    detail: "Sofia dispute filed · churn-risk list updated",
  },
  {
    id: "act-w6",
    time: "4:48 PM",
    date: "Sat Apr 26",
    kind: "match",
    actor: "you",
    title: "Acknowledged brief from <strong>Acme Co</strong>",
    detail: "Senior ops backup · same calibre as Anand · sourcing to start",
    clientId: "client-acme-co",
  },
  {
    id: "act-w7",
    time: "9:42 AM",
    date: "Fri Apr 25",
    kind: "recert",
    actor: "you",
    title: "Bulk-approved 2 re-cert candidates",
    detail: "Linh Nguyen · Anand Patel · both clean records · 12-month cycles",
    chips: [chip("Bulk approve", "lime")],
  },
  {
    id: "act-w8",
    time: "3:18 PM",
    date: "Thu Apr 24",
    kind: "dispute",
    actor: "you",
    title: "Escalated <strong>DSP-2026-04-15</strong> to admin",
    detail: "Damages claim from Bridgepoint exceeds specialist authority",
    chips: [chip("Escalated", "danger")],
    disputeId: "DSP-2026-04-15",
  },
  {
    id: "act-w9",
    time: "11:08 AM",
    date: "Thu Apr 24",
    kind: "message",
    actor: "you",
    title: "Replied to <strong>Mei Chen</strong>",
    detail: "Pause-status check-in · pinged for performance review schedule",
    candidateId: "cand-mei-chen",
  },
  {
    id: "act-w10",
    time: "5:42 PM",
    date: "Wed Apr 23",
    kind: "review",
    actor: "you",
    title: "Approved <strong>Linh P. Tran</strong> from review queue",
    detail: "Anti-cheat flag cleared after review · standard tier",
    chips: [chip("Approved", "success"), chip("Standard", "default")],
    candidateId: "cand-linh-tran",
  },

  /* ============= EARLIER (May 6 minus 8-30 days) ============= */
  {
    id: "act-x1",
    time: "2:42 PM",
    date: "Fri Apr 18",
    kind: "system",
    actor: "system",
    title: "<strong>No actions logged</strong> — vacation day",
    detail: "Manager-approved · activity log paused",
    chips: [chip("Vacation", "default")],
  },
  {
    id: "act-x2",
    time: "4:00 PM",
    date: "Wed Apr 16",
    kind: "match",
    actor: "you",
    title: "Sent shortlist for <strong>Vertex Health</strong> expansion",
    detail: "2 lab-ops admins matching Jomari's APAC overlap",
    clientId: "client-vertex-health",
  },
  {
    id: "act-x3",
    time: "11:18 AM",
    date: "Tue Apr 15",
    kind: "dispute",
    actor: "system",
    title: "<strong>DSP-2026-04-15</strong> filed",
    detail: "Vincent Korver · Bridgepoint LLC · no-show + damages claim",
    chips: [chip("New dispute", "danger")],
    disputeId: "DSP-2026-04-15",
    clientId: "client-bridgepoint-llc",
  },
  {
    id: "act-x4",
    time: "9:32 AM",
    date: "Mon Apr 14",
    kind: "review",
    actor: "you",
    title: "Rejected <strong>Rajan Kumar</strong> from review queue",
    detail: "Skill mismatch · ops focus needed · 6mo reapply lockout",
    chips: [chip("Rejected", "danger")],
    candidateId: "cand-rajan-kumar",
  },
  {
    id: "act-x5",
    time: "1:42 PM",
    date: "Sun Apr 12",
    kind: "system",
    actor: "system",
    title: "<strong>Daily summary</strong> — 0 actions · weekend",
  },
  {
    id: "act-x6",
    time: "3:14 PM",
    date: "Sat Apr 11",
    kind: "message",
    actor: "you",
    title: "Sent welcome to <strong>Helios Robotics</strong>",
    detail: "New client · onboarding follow-up · brief format guide attached",
    clientId: "client-helios-robotics",
  },
  {
    id: "act-x7",
    time: "10:08 AM",
    date: "Fri Apr 10",
    kind: "recert",
    actor: "you",
    title: "Approved re-cert for <strong>Kanya Suksawat</strong>",
    detail: "12-month cycle · all clean · tier maintained",
    chips: [chip("Recert clean", "success")],
    candidateId: "cand-kanya-suksawat",
  },
  {
    id: "act-x8",
    time: "4:18 PM",
    date: "Wed Apr 8",
    kind: "match",
    actor: "you",
    title: "Acknowledged brief from <strong>Bengaluru Bio</strong>",
    detail: "Pharma research admin · Carlos Mendoza shortlisted",
    clientId: "client-bengaluru-bio",
  },
];

/* ============================================================
   Stats — pre-computed for "today" period (matches HTML)
   ============================================================ */

export const todayStats: ReadonlyArray<ActivityStatCard> = [
  {
    label: "Total actions",
    num: "42",
    trend: { tone: "success", text: "↑ 18% vs daily avg" },
  },
  {
    label: "Decisions made",
    num: "9",
    trend: { tone: "default", text: "3 approvals · 1 reject · 5 advances" },
  },
  {
    label: "Messages sent",
    num: "14",
    trend: { tone: "default", text: "8 to candidates · 6 to clients" },
  },
  {
    label: "Active hours",
    num: "6.4",
    numEm: "h",
    trend: { tone: "amber", text: "First action 8:42 AM · last 4:18 PM" },
  },
];

/* ============================================================
   Snapshot export (today)
   ============================================================ */

export const activitySnapshot: ActivitySnapshot = {
  category: "Virtual Assistants",
  activePeriod: "today",
  stats: todayStats,
  filterCounts: {
    all: 42,
    review: 9,
    message: 14,
    recert: 4,
    dispute: 3,
    match: 7,
    system: 5,
  },
  heatmap,
  feed,
};

/* ============================================================
   Today's submission (PDF-shape — typed for migration only)
   ============================================================ */

/**
 * Sample of what today's submission WOULD look like if the form existed.
 * Not rendered this session — typed so future sessions can wire the
 * /specialist/daily-activity/submit route without redefining the shape.
 */
export const todaysSubmissionDraft: DailyActivitySubmission = {
  date: "2026-05-06",
  status: "not-submitted",
  outreachCounts: {
    linkedinMessages: 8,
    linkedinPosts: 1,
    emails: 4,
    redditPosts: 0,
    fbGroupPosts: 0,
    directReferrals: 2,
  },
  conversationsResults: {
    responsesReceived: 6,
    signupsGenerated: 1,
    qualityRating: 4,
  },
  profileWorkAutoCalc: {
    reviewsCompleted: 3,
    disputesResolved: 0,
    recertsReviewed: 2,
    profileUpdatesApproved: 0,
    profileUpdatesRejected: 0,
  },
};
