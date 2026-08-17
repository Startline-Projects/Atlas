/**
 * DaTimingChart — submission-time distribution histogram.
 *
 * 13 hour-buckets (6 AM – 6 PM). Bar height = count of submissions
 * in that hour. Bucket counts derived live by parsing each
 * submitted specialist's `dailyActivity.timeLabel` ("9:14 AM" →
 * 9 AM bucket). Peak bucket is highlighted; submissions after 12 PM
 * are tinted "late" (amber).
 *
 * Range extended to 6 AM (vs prototype's 7 AM) to accommodate
 * Min-Jun's 6:15 AM submission; documented in audit lock.
 *
 * Ported from prototype lines 28467-28507. Peak label derived too.
 *
 * Server-renderable — pure computation, no state.
 */

import type { Specialist } from "@/lib/mock-data/manager/team";
import { cn } from "@/lib/utils/cn";

/** 13 buckets: hours 6 through 18 inclusive. */
const START_HOUR = 6;
const END_HOUR = 18;

export function DaTimingChart({
  specialists,
}: {
  specialists: ReadonlyArray<Specialist>;
}) {
  const buckets = computeBuckets(specialists);
  const max = Math.max(1, ...buckets.map((b) => b.count));
  const peak = buckets.find((b) => b.count === max);
  const peakLabel = peak
    ? `Peak: ${formatHour(peak.hour)} · ${peak.count} submission${peak.count === 1 ? "" : "s"}`
    : "No submissions yet";

  return (
    <section className="bg-paper border-line mb-6 rounded-md border p-5">
      <header className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-ink-mute font-mono text-[10px] tracking-[0.12em] uppercase">
            Distribution
          </div>
          <h2
            className="font-display text-ink m-0 mt-0.5 text-[18px] font-medium tracking-[-0.01em]"
            style={{ fontVariationSettings: '"opsz" 36' }}
          >
            Submission <em className="italic">timing</em>
          </h2>
        </div>
        <span className="text-ink-mute text-[12px]">{peakLabel}</span>
      </header>

      {/* Chart */}
      <div className="flex h-32 items-end gap-1">
        {buckets.map((b) => {
          const heightPct = (b.count / max) * 100;
          const isPeak = b.count === max && b.count > 0;
          /* Submissions at hour >= 12 PM are "late" per prototype. */
          const isLate = b.hour >= 12 && b.count > 0;
          /* Empty buckets get a tiny baseline so the axis labels
             align under visible bars. */
          const displayHeight = b.count === 0 ? 8 : heightPct;
          return (
            <div
              key={b.hour}
              title={`${formatHour(b.hour)} · ${b.count} submission${b.count === 1 ? "" : "s"}${isLate ? " (late)" : ""}`}
              style={{ height: `${displayHeight}%` }}
              className={cn(
                "flex-1 rounded-t-sm transition-colors",
                b.count === 0
                  ? "bg-cream-deep"
                  : isPeak
                    ? "bg-lime-deep"
                    : isLate
                      ? "bg-amber/80"
                      : "bg-ink",
              )}
            />
          );
        })}
      </div>

      {/* Axis */}
      <div className="mt-2 flex gap-1">
        {buckets.map((b) => (
          <div
            key={b.hour}
            className="text-ink-mute flex-1 text-center font-mono text-[9.5px] tracking-[0.04em]"
          >
            {formatHourTick(b.hour)}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   Bucket computation
   ============================================================ */

type Bucket = { hour: number; count: number };

function computeBuckets(specialists: ReadonlyArray<Specialist>): Bucket[] {
  const buckets: Bucket[] = [];
  for (let h = START_HOUR; h <= END_HOUR; h++) {
    buckets.push({ hour: h, count: 0 });
  }
  for (const s of specialists) {
    if (s.dailyActivity.kind !== "submitted") continue;
    const hour = parseHourFromTimeLabel(s.dailyActivity.timeLabel);
    if (hour === null) continue;
    if (hour < START_HOUR || hour > END_HOUR) continue;
    const bucket = buckets[hour - START_HOUR];
    if (bucket) bucket.count += 1;
  }
  return buckets;
}

/** Parse "9:14 AM" → 9, "1:30 PM" → 13, "12:00 PM" → 12.
 *  Returns null if the label can't be parsed. */
function parseHourFromTimeLabel(label: string): number | null {
  const match = label.match(/^(\d{1,2}):\d{2}\s*(AM|PM)$/i);
  if (!match) return null;
  const hStr = match[1];
  const ap = match[2];
  if (hStr === undefined || ap === undefined) return null;
  let h = parseInt(hStr, 10);
  if (isNaN(h)) return null;
  const isPm = ap.toUpperCase() === "PM";
  if (h === 12) h = isPm ? 12 : 0;
  else if (isPm) h += 12;
  return h;
}

/** "9 AM" / "12 PM" / "6 PM" — for the peak caption + tick labels. */
function formatHour(hour: number): string {
  if (hour === 0) return "12 AM";
  if (hour === 12) return "12 PM";
  if (hour < 12) return `${hour} AM`;
  return `${hour - 12} PM`;
}

/** Compact axis tick — just the number ("9" / "12" / "6"). */
function formatHourTick(hour: number): string {
  if (hour === 0 || hour === 12) return "12";
  if (hour < 12) return String(hour);
  return String(hour - 12);
}
