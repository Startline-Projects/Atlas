/**
 * Pure inline SVG sparkline — used by capacity-sparkline (47 talents)
 * and quality-tile (4.7/5). 12-point series, full-width container,
 * 64px tall.
 *
 * Renders both the area fill (semi-transparent ink) and the line
 * stroke. Last point gets a small dot.
 *
 * Per source CSS `.ph-spark-line` / `.ph-spark-area` / `.ph-spark-dot`:
 * stroke 1.6, ink color, area opacity 0.06.
 *
 * Server Component (path computed at render time from the points).
 */

const VIEWBOX_W = 320;
const VIEWBOX_H = 64;
const PADDING_Y = 6;

export type SparklineTone = "success" | "lime" | "amber" | "danger";

const STROKE_COLOR: Record<SparklineTone, string> = {
  success: "var(--color-success)",
  lime: "var(--color-lime-deep)",
  amber: "var(--color-amber)",
  danger: "var(--color-danger)",
};

export function SparklineSVG({
  points,
  tone = "success",
}: {
  /** Series of values 0-100 (or any consistent range — the renderer normalizes). */
  points: ReadonlyArray<number>;
  tone?: SparklineTone;
}) {
  if (points.length < 2) return null;

  const stroke = STROKE_COLOR[tone];
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = Math.max(1, max - min);

  const xs = points.map((_, i) =>
    (i / (points.length - 1)) * VIEWBOX_W,
  );
  const ys = points.map(
    (v) =>
      VIEWBOX_H -
      PADDING_Y -
      ((v - min) / range) * (VIEWBOX_H - PADDING_Y * 2),
  );

  // Line path
  const linePath = xs
    .map((x, i) => `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${ys[i]!.toFixed(2)}`)
    .join(" ");

  // Area path (line + bottom-right + bottom-left + close)
  const areaPath =
    `M ${xs[0]!.toFixed(2)} ${ys[0]!.toFixed(2)} ` +
    xs
      .slice(1)
      .map((x, i) => `L ${x.toFixed(2)} ${ys[i + 1]!.toFixed(2)}`)
      .join(" ") +
    ` L ${VIEWBOX_W} ${VIEWBOX_H} L 0 ${VIEWBOX_H} Z`;

  const lastX = xs[xs.length - 1]!;
  const lastY = ys[ys.length - 1]!;

  return (
    <svg
      viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
      preserveAspectRatio="none"
      className="block h-16 w-full"
      aria-hidden="true"
    >
      <path d={areaPath} fill={stroke} fillOpacity={0.08} />
      <path
        d={linePath}
        fill="none"
        stroke={stroke}
        strokeWidth={1.6}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx={lastX} cy={lastY} r={2.5} fill={stroke} />
    </svg>
  );
}
