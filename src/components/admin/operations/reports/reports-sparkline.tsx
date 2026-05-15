/**
 * Phase 14a — Inline SVG sparkline for KPI tiles + GMV card.
 *
 * admin.html markup: per usage (L38082-38085 etc.)
 * admin.html CSS: L14307-14334
 */
import { cn } from '@/lib/utils/cn';
import type { ReportsSparkline } from '@/lib/mock-data/admin/reports-analytics-data';

interface ReportsSparklineProps {
  spark: ReportsSparkline;
}

function lineStroke(v: ReportsSparkline['variant']): string {
  return v === 'down' ? 'var(--danger)' : 'var(--success)';
}

function areaFill(v: ReportsSparkline['variant']): string {
  return v === 'down' ? 'rgba(194,65,43,0.08)' : 'rgba(46,125,84,0.10)';
}

export function ReportsSparkline({ spark }: ReportsSparklineProps) {
  const stroke = lineStroke(spark.variant);
  const fill = areaFill(spark.variant);
  const heightStyle = spark.heightOverridePx
    ? { height: `${spark.heightOverridePx}px` }
    : undefined;

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${spark.viewBoxWidth} ${spark.viewBoxHeight}`}
      preserveAspectRatio="none"
      className={cn('mt-[4px] w-full block', !spark.heightOverridePx && 'h-[28px]')}
      {...(heightStyle ? { style: heightStyle } : {})}
    >
      <polyline points={spark.areaPoints} fill={fill} stroke="none" />
      <polyline
        points={spark.linePoints}
        fill="none"
        stroke={stroke}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={spark.dotX}
        cy={spark.dotY}
        r={spark.dotR}
        fill="var(--paper)"
        stroke={stroke}
        strokeWidth={1.4}
      />
    </svg>
  );
}
