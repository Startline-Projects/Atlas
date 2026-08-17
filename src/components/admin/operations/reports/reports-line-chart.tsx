/**
 * Phase 14a — Line / area SVG chart (signups; reused for fee revenue in 14c).
 *
 * admin.html markup: L38150-38172 (signups instance)
 * admin.html CSS: L14428-14480
 */
import type { ReportsLineChart, LineChartSeriesVariant } from '@/lib/mock-data/admin/reports-analytics-data';

interface ReportsLineChartProps {
  chart: ReportsLineChart;
  ariaLabel: string;
}

function lineStroke(v: LineChartSeriesVariant): string {
  switch (v) {
    case 'candidates': return 'var(--ink)';
    case 'clients':    return 'var(--lime-deep)';
    case 'disputes':   return 'var(--amber)';
    case 'gmv':        return 'var(--success)';
  }
}

function areaFill(v: LineChartSeriesVariant): string {
  switch (v) {
    case 'candidates': return 'var(--ink)';
    case 'clients':    return 'var(--lime-deep)';
    case 'disputes':   return 'var(--amber)';
    case 'gmv':        return 'var(--success)';
  }
}

export function ReportsLineChartEl({ chart, ariaLabel }: ReportsLineChartProps) {
  return (
    <div
      className="relative w-full"
      style={{ height: `${chart.containerHeightPx}px` }}
    >
      <svg
        viewBox={`0 0 ${chart.viewBoxWidth} ${chart.viewBoxHeight}`}
        preserveAspectRatio="none"
        aria-label={ariaLabel}
        className="block w-full h-full overflow-visible"
      >
        {/* Grid lines */}
        {chart.gridLines.map((line, idx) => (
          <line
            key={`grid-${idx}`}
            x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
            stroke="var(--line-soft)"
            strokeWidth={1}
            strokeDasharray="2 4"
          />
        ))}

        {/* Axis labels */}
        {chart.axisLabels.map((label, idx) => (
          <text
            key={`axis-${idx}`}
            x={label.x}
            y={label.y}
            fill="var(--ink-mute)"
            fontSize={9}
            fontFamily="var(--font-mono)"
            letterSpacing="0.04em"
          >
            {label.text}
          </text>
        ))}

        {/* Annotation (optional) */}
        {chart.annotation && (
          <>
            <line
              x1={chart.annotation.x1} y1={chart.annotation.y1}
              x2={chart.annotation.x2} y2={chart.annotation.y2}
              stroke="var(--ink-mute)"
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            <text
              x={chart.annotation.textX}
              y={chart.annotation.textY}
              fill="var(--ink-mute)"
              fontSize={9}
              fontFamily="var(--font-mono)"
              letterSpacing="0.04em"
            >
              {chart.annotation.text}
            </text>
          </>
        )}

        {/* Series — area first (behind line), then line, then dot */}
        {chart.series.map((s, idx) => (
          <polyline
            key={`area-${idx}`}
            points={s.areaPoints}
            fill={areaFill(s.variant)}
            fillOpacity={0.08}
            stroke="none"
          />
        ))}
        {chart.series.map((s, idx) => (
          <polyline
            key={`line-${idx}`}
            points={s.linePoints}
            fill="none"
            stroke={lineStroke(s.variant)}
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        {chart.series.map((s, idx) => (
          <circle
            key={`dot-${idx}`}
            cx={s.dotX}
            cy={s.dotY}
            r={s.dotR}
            fill="var(--paper)"
            stroke={lineStroke(s.variant)}
            strokeWidth={1.8}
          />
        ))}
      </svg>
    </div>
  );
}
