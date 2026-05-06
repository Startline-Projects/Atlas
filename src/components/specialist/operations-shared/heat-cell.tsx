/**
 * Heatmap density swatch — used by pool-health's skill×tier matrix
 * (with a count number inside) AND daily-activity's 30-day heatmap
 * (no inside content, just the color).
 *
 * Density scale (0-4):
 *   0 → cream-deep (empty)
 *   1 → success @ 0.20
 *   2 → success @ 0.45
 *   3 → success @ 0.70
 *   4 → success @ full
 *
 * Plus an `amber` override that swaps the entire background tone
 * regardless of density. Pool-health uses this on under-supplied
 * cells (e.g. "0 Elite tier on Legal/compliance row").
 *
 * The size and any text content are view-specific — supply them via
 * `className` and `children`. This keeps the primitive small.
 *
 * Server Component.
 *
 * **Note on the unified scale.** Source CSS has slightly different
 * alpha steps per view (pool-health: 0.12 / 0.28 / full at h1/h2/h3;
 * daily-activity: 0.25 / 0.50 / 0.75 / full at h1/h2/h3/h4). This
 * shared HeatCell uses an averaged 5-level ramp (0.20 / 0.45 / 0.70
 * / full) so both views can consume it without a fork. The visual
 * difference vs source CSS is sub-perceptual at typical render sizes.
 */

import { cn } from "@/lib/utils/cn";

export type HeatDensity = 0 | 1 | 2 | 3 | 4;

const DENSITY_CLASS: Record<HeatDensity, string> = {
  0: "bg-cream-deep text-ink-mute",
  1: "bg-success/20 text-success",
  2: "bg-success/45 text-paper",
  3: "bg-success/70 text-paper",
  4: "bg-success text-paper",
};

const AMBER_CLASS = "bg-amber/15 text-amber";

export function HeatCell({
  density,
  amber = false,
  className,
  children,
  title,
  ...rest
}: {
  density: HeatDensity;
  amber?: boolean;
  className?: string;
  children?: React.ReactNode;
  /** Optional native tooltip (the matrix uses count tooltips). */
  title?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      title={title}
      className={cn(
        "grid place-items-center rounded font-mono text-[11px] font-medium tabular-nums transition-[filter] hover:brightness-95",
        amber ? AMBER_CLASS : DENSITY_CLASS[density],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
