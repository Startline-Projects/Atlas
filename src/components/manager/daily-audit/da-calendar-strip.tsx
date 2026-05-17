/**
 * DaCalendarStrip — 14-day horizontal calendar strip.
 *
 * Today is rightmost. Each cell shows day label + submitted count +
 * adherence%. Weekend cells muted. Today cell highlighted. Cells
 * with `late` or `miss` tones get a danger/amber accent.
 *
 * Per Step 6: cells render but are NOT clickable in this step
 * (historical date views deferred — same reason the date-range tabs
 * are visible-but-disabled). Each cell carries a `title` tooltip
 * "Historical day view coming later."
 *
 * Ported from prototype lines 29024-29050.
 *
 * Server-renderable.
 */

import { calendarStripDays, type CalendarStripDayTone } from "@/lib/mock-data/manager/daily-audit-data";
import { cn } from "@/lib/utils/cn";

const CELL_BORDER: Record<CalendarStripDayTone, string> = {
  normal: "border-line",
  weekend: "border-line",
  late: "border-l-amber border-l-[3px]",
  miss: "border-l-danger border-l-[3px]",
  today: "border-ink ring-1 ring-ink/10",
};

const CELL_BG: Record<CalendarStripDayTone, string> = {
  normal: "bg-paper",
  weekend: "bg-cream/40",
  late: "bg-paper",
  miss: "bg-paper",
  today: "bg-paper",
};

const RATE_TONE: Record<CalendarStripDayTone, string> = {
  normal: "text-ink",
  weekend: "text-ink-mute",
  late: "text-amber",
  miss: "text-danger",
  today: "text-ink font-semibold",
};

export function DaCalendarStrip() {
  return (
    <section className="bg-paper border-line rounded-md border p-5">
      <header className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-ink-mute font-mono text-[10px] tracking-[0.12em] uppercase">
            History
          </div>
          <h2
            className="font-display text-ink m-0 mt-0.5 text-[18px] font-medium tracking-[-0.01em]"
            style={{ fontVariationSettings: '"opsz" 36' }}
          >
            Past <em className="italic">14 days</em>
          </h2>
        </div>
        <span className="text-ink-mute text-[12px]">
          Historical day view — coming later
        </span>
      </header>
      <div className="grid grid-cols-7 gap-1.5 md:grid-cols-14">
        {calendarStripDays.map((day) => (
          <div
            key={day.id}
            title="Historical day view coming later"
            className={cn(
              "flex cursor-not-allowed flex-col gap-1 rounded-md border p-2",
              CELL_BORDER[day.tone],
              CELL_BG[day.tone],
            )}
            aria-disabled="true"
          >
            <div className="text-ink-mute font-mono text-[9px] tracking-[0.08em] uppercase">
              {day.dayLabel}
            </div>
            <div
              className={cn(
                "font-display text-[18px] leading-none font-medium",
                day.submittedCount === null ? "text-ink-mute" : "text-ink",
              )}
              style={{ fontVariationSettings: '"opsz" 36' }}
            >
              {day.submittedCount === null ? "—" : day.submittedCount}
            </div>
            <div className={cn("text-[10px]", RATE_TONE[day.tone])}>
              {day.rateLabel}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
