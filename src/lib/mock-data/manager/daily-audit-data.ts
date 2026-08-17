/**
 * Daily Activity Audit page — team-wide aggregates.
 *
 * Per Step 6 audit lock: per-Specialist data (kpis, dailyActivity,
 * todayActivity, dailyHistory) reads directly from `team.ts`. This
 * file holds only **team-wide aggregates** that don't fit on the
 * Specialist record:
 *
 *   - `calendarStripDays` — 14-day team-wide submission history
 *     (one bucket per day; ports prototype lines 29035-29048 literally).
 *
 * NOT in this file (intentionally):
 *   - Per-specialist editorial notes (Wins/Blockers/Tomorrow) —
 *     Step 6 Q5 lock skips these; status-derived notes composed at
 *     render time from `dailyActivity.kind`
 *   - Per-channel breakdown for detail tiles — Step 6 Q4 lock uses
 *     the 4-count `todayActivity` from team.ts instead
 *   - "Submission patterns" / channel rollup — Step 6 trim (a)
 *     dropped this section
 *   - Timing chart hour-buckets — computed at render from
 *     `team.ts` `dailyActivity.submitted.timeLabel` strings; no
 *     static data needed
 */

/* ============================================================
   14-day calendar strip
   ============================================================ */

export type CalendarStripDayTone =
  /** Standard day — 100% adherence. */
  | "normal"
  /** Late submission(s) recorded. */
  | "late"
  /** Missed submission(s) recorded. */
  | "miss"
  /** Saturday or Sunday — no submissions expected. */
  | "weekend"
  /** The rightmost cell — today. */
  | "today";

export type CalendarStripDay = {
  id: string;
  /** Short day label rendered in cell ("Thu 17", "Today"). */
  dayLabel: string;
  /** Submitted count for the day; null on weekends. Today shows the
   *  running count even though it's mid-day. */
  submittedCount: number | null;
  /** Adherence percentage caption ("100%", "90% · 1 late",
   *  "weekend", "82% · 1 pending"). */
  rateLabel: string;
  tone: CalendarStripDayTone;
};

/* Ported from prototype lines 29035-29048. Reads LEFT-to-RIGHT
   forward in time; "Today" is the rightmost cell.
   Note: the prototype's date labels don't form a self-consistent
   calendar (mixing weekday names with non-matching dates). Ported
   literally to preserve the prototype's narrative; not a real date
   axis. */
export const calendarStripDays: ReadonlyArray<CalendarStripDay> = [
  { id: "cal-1", dayLabel: "Thu 17", submittedCount: 11, rateLabel: "100%", tone: "normal" },
  { id: "cal-2", dayLabel: "Fri 18", submittedCount: 10, rateLabel: "100%", tone: "normal" },
  { id: "cal-3", dayLabel: "Sat 19", submittedCount: null, rateLabel: "weekend", tone: "weekend" },
  { id: "cal-4", dayLabel: "Sun 20", submittedCount: null, rateLabel: "weekend", tone: "weekend" },
  { id: "cal-5", dayLabel: "Mon 21", submittedCount: 9, rateLabel: "90% · 1 late", tone: "late" },
  { id: "cal-6", dayLabel: "Tue 22", submittedCount: 10, rateLabel: "100%", tone: "normal" },
  { id: "cal-7", dayLabel: "Wed 23", submittedCount: 10, rateLabel: "100%", tone: "normal" },
  { id: "cal-8", dayLabel: "Thu 24", submittedCount: 10, rateLabel: "100%", tone: "normal" },
  { id: "cal-9", dayLabel: "Fri 25", submittedCount: 10, rateLabel: "100%", tone: "normal" },
  { id: "cal-10", dayLabel: "Sat 26", submittedCount: null, rateLabel: "weekend", tone: "weekend" },
  { id: "cal-11", dayLabel: "Sun 27", submittedCount: null, rateLabel: "weekend", tone: "weekend" },
  { id: "cal-12", dayLabel: "Mon 28", submittedCount: 10, rateLabel: "100%", tone: "normal" },
  { id: "cal-13", dayLabel: "Tue 29", submittedCount: 9, rateLabel: "90% · 1 missed", tone: "miss" },
  { id: "cal-14", dayLabel: "Today", submittedCount: 9, rateLabel: "82% · 1 pending", tone: "today" },
];
