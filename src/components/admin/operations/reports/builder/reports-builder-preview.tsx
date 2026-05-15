/**
 * Phase 14d — RIGHT column · live preview.
 *
 * admin.html markup: L39063-39095
 * admin.html CSS: L15142-15212
 */
import { cn } from '@/lib/utils/cn';
import type { ReportsBuilderPreview } from '@/lib/mock-data/admin/reports-analytics-data';

interface ReportsBuilderPreviewProps {
  data: ReportsBuilderPreview;
}

function strongColor(c: ReportsBuilderPreview['footStrongColor']): string {
  switch (c) {
    case 'success': return 'text-[var(--success)]';
    case 'danger':  return 'text-[var(--danger)]';
    case 'ink':
    default:        return 'text-[var(--ink)]';
  }
}

export function ReportsBuilderPreview({ data }: ReportsBuilderPreviewProps) {
  const { chart } = data;

  return (
    // rb-preview — L15143-15148
    <div className="py-[18px] px-[22px] bg-[var(--cream-deep)] flex flex-col max-[1080px]:col-span-2 max-[1080px]:border-t max-[1080px]:border-t-[var(--line)] max-[720px]:col-span-1">
      <h4 className="flex items-center justify-between font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold m-0 mb-[4px]">
        {data.headerLabel}
        {/* rbp-live-pip — L15161-15174 */}
        <span className="inline-flex items-center gap-[4px] text-[9px] text-[var(--success)] tracking-[0.08em] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-[var(--success)]">
          {data.liveLabel}
        </span>
      </h4>

      {/* rbp-subtitle — L15175-15183 */}
      <div className="font-display text-[16px] font-medium tracking-[-0.01em] text-[var(--ink)] mb-[12px] leading-[1.25]">
        {data.subtitle}
      </div>

      {/* rb-preview-card — L15184-15212 */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-sm)] p-[16px] flex-1 flex flex-col">
        <div className="font-mono text-[10px] tracking-[0.04em] text-[var(--ink-mute)] mb-[8px]">
          {data.meta}
        </div>
        <div className="flex-1 min-h-[180px]">
          <svg
            viewBox={`0 0 ${chart.viewBoxWidth} ${chart.viewBoxHeight}`}
            preserveAspectRatio="none"
            aria-label="Preview chart"
            className="w-full h-full overflow-visible"
          >
            {chart.gridLines.map((line, idx) => (
              <line
                key={`grid-${idx}`}
                x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                stroke="var(--line-soft)"
                strokeWidth={1}
                strokeDasharray="2 4"
              />
            ))}
            {chart.axisLabels.map((label, idx) => (
              <text
                key={`axis-${idx}`}
                x={label.x}
                y={label.y}
                fill="var(--ink-mute)"
                fontSize={9}
                fontFamily="var(--font-mono)"
                letterSpacing="0"
              >
                {label.text}
              </text>
            ))}
            <polyline
              points={chart.areaPoints}
              fill="rgba(110,63,224,0.10)"
              stroke="none"
            />
            <polyline
              points={chart.linePoints}
              fill="none"
              stroke="var(--super)"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx={chart.dotX}
              cy={chart.dotY}
              r={chart.dotR}
              fill="var(--paper)"
              stroke="var(--super)"
              strokeWidth={2}
            />
          </svg>
        </div>
        <div className="mt-[10px] pt-[10px] border-t border-dashed border-[var(--line-soft)] font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em]">
          <strong className={cn('font-bold', strongColor(data.footStrongColor))}>{data.footStrong}</strong>
          {data.footRest}
        </div>
      </div>
    </div>
  );
}
