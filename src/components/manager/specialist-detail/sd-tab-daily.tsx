"use client";

/**
 * SdTabDaily — Daily Activity tab.
 *
 * **Per Step 5 trim (b): NO 30-day calendar visual.** The calendar
 * primitive will be built in Step 11 (Manager Daily Activity), which
 * also needs a "past 14-day calendar". Step 11 will then back-fill
 * this tab with the proper grid.
 *
 * For Step 5 the Daily tab renders:
 *   1. Today's submission status card (status pill + detail line)
 *   2. Recent submissions list (last 3 days)
 *
 * The "30-day Submission calendar" card is replaced with a single
 * TODO marker — see TODO(step-11) below.
 *
 * Ported from prototype lines 28042-28122.
 */

import {
  dailyTodayDetailTemplate,
  recentSubmissions,
} from "@/lib/mock-data/manager/spec-detail-data";
import type { Specialist } from "@/lib/mock-data/manager/team";

export function SdTabDaily({ specialist: s }: { specialist: Specialist }) {
  const todayLabel = todayBadgeLabel(s.dailyActivity);
  return (
    <div className="flex flex-col gap-4">
      {/* Today */}
      <section className="bg-paper border-line rounded-md border p-5">
        <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="text-ink-mute font-mono text-[10px] tracking-[0.12em] uppercase">
              Today
            </div>
            <h2
              className="font-display text-ink m-0 mt-0.5 text-[18px] font-medium tracking-[-0.01em]"
              style={{ fontVariationSettings: '"opsz" 36' }}
            >
              Submission <em className="italic">status</em>
            </h2>
          </div>
          <span className={`rounded-full border px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[0.08em] uppercase ${todayLabel.className}`}>
            {todayLabel.text}
          </span>
        </div>
        <p
          className="text-ink-soft m-0 text-[13.5px] leading-[1.5]"
          dangerouslySetInnerHTML={{ __html: dailyTodayDetailTemplate }}
        />
      </section>

      {/* TODO(step-11): 30-day calendar grid lands when Step 11 builds
          the Manager Daily Activity calendar primitive. This block is
          the intended mount point. For Step 5, the placeholder card
          surfaces the intent honestly. */}
      <section className="border-line bg-cream/40 rounded-md border border-dashed p-5">
        <div className="text-ink-mute font-mono text-[10px] tracking-[0.12em] uppercase">
          30 days
        </div>
        <h2
          className="font-display text-ink m-0 mt-0.5 mb-2 text-[18px] font-medium tracking-[-0.01em]"
          style={{ fontVariationSettings: '"opsz" 36' }}
        >
          Submission <em className="italic">calendar</em>
        </h2>
        <p className="text-ink-mute m-0 text-[12.5px]">
          Calendar grid lands in Step 11 — the Manager Daily Activity
          primitive will mount here.
        </p>
      </section>

      {/* Recent submissions */}
      <section className="bg-paper border-line rounded-md border p-5">
        <div className="mb-4">
          <div className="text-ink-mute font-mono text-[10px] tracking-[0.12em] uppercase">
            Recent submissions
          </div>
          <h2
            className="font-display text-ink m-0 mt-0.5 text-[18px] font-medium tracking-[-0.01em]"
            style={{ fontVariationSettings: '"opsz" 36' }}
          >
            Last <em className="italic">3 days</em>
          </h2>
        </div>
        <ul className="flex flex-col gap-3">
          {recentSubmissions.map((row) => (
            <li key={row.id} className="border-line-soft border-b pb-3 last:border-b-0 last:pb-0">
              <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-ink text-[13px] font-semibold">
                  {row.dateLabel}
                </span>
                <span className="text-ink-mute font-mono text-[10.5px] tracking-[0.04em]">
                  {row.timeLabel}
                </span>
              </div>
              {row.isExcused ? (
                <div className="text-ink-mute text-[12px]">No activity required</div>
              ) : (
                <div className="text-ink-soft flex flex-wrap gap-x-4 gap-y-1 text-[12px]">
                  {row.stats.map((st) => (
                    <span key={st.label}>
                      <strong className="text-ink font-semibold">{st.count}</strong>{" "}
                      {st.label}
                    </span>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function todayBadgeLabel(state: Specialist["dailyActivity"]): {
  text: string;
  className: string;
} {
  switch (state.kind) {
    case "submitted":
      return {
        text: `● Submitted at ${state.timeLabel}`,
        className: "bg-success-bg text-success border-success/30",
      };
    case "pending":
      return {
        text: `⏳ Pending · ${state.dueLabel}`,
        className: "bg-amber-bg text-amber border-amber/30",
      };
    case "missed":
      return {
        text: `⚠ Missed · ${state.daysCount} day${state.daysCount === 1 ? "" : "s"}`,
        className: "bg-danger-bg text-danger border-danger/30",
      };
    case "excused":
      return {
        text: `— Excused until ${state.untilLabel}`,
        className: "bg-cream-deep text-ink-soft border-line",
      };
  }
}
