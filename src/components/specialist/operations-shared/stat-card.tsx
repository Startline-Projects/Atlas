/**
 * Stat card — shared by sourcing's 4-card stat strip and
 * daily-activity's 4-card stat strip. Source CSS for `.sp-stat-card`
 * and `.act-stat-card` is character-for-character identical.
 *
 * Slots:
 *   - label: small mono uppercase header
 *   - num + numEm: bignum body, with optional italic suffix
 *     (e.g. "5" + "/8", "11" + "d", "28" + "%")
 *   - trend: optional bottom line with success/amber/default tone
 *   - children: optional bottom slot for things that don't fit the
 *     trend pattern (sourcing's conversion-bar uses this slot)
 *
 * Server Component.
 */

import { cn } from "@/lib/utils/cn";

export type StatCardTrendTone = "success" | "amber" | "default";

const TREND_TONE: Record<StatCardTrendTone, string> = {
  default: "text-ink-mute",
  success: "text-success",
  amber: "text-amber",
};

export type StatCardProps = {
  label: string;
  num: string;
  /** Italic suffix on the bignum ("/8", "%", "d"). */
  numEm?: string;
  /** Optional trend caption + tone. */
  trend?: { tone: StatCardTrendTone; text: string };
  /** Slot for non-trend bottom content (e.g. sourcing's `--w` conversion bar). */
  children?: React.ReactNode;
};

export function StatCard({
  label,
  num,
  numEm,
  trend,
  children,
}: StatCardProps) {
  return (
    <div className="bg-paper border-line flex flex-col gap-1 rounded-[10px] border px-4 pt-3 pb-3.5">
      <div className="font-mono text-[10px] font-medium tracking-[0.12em] uppercase text-ink-mute">
        {label}
      </div>
      <div
        className="font-display flex items-baseline text-[28px] font-normal leading-[1] tracking-[-0.02em] text-ink"
        style={{ fontVariationSettings: '"opsz" 72' }}
      >
        {num}
        {numEm ? (
          <em className="ml-0.5 font-body text-[14px] not-italic font-normal text-ink-mute">
            {numEm}
          </em>
        ) : null}
      </div>
      {trend ? (
        <div
          className={cn(
            "mt-1 font-mono text-[10.5px] tracking-[0.04em]",
            TREND_TONE[trend.tone],
          )}
        >
          {trend.text}
        </div>
      ) : null}
      {children}
    </div>
  );
}
