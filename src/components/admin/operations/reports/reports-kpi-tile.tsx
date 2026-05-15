/**
 * Phase 14a — Shared KPI tile (used 25x total across 5 tabs).
 *
 * admin.html markup: L38077-38131 (Tab 1 examples)
 * admin.html CSS: L14243-14306
 */
import { cn } from '@/lib/utils/cn';
import { ReportsSparkline } from './reports-sparkline';
import type { ReportsKpiTile, DeltaVariant } from '@/lib/mock-data/admin/reports-analytics-data';

interface ReportsKpiTileProps {
  tile: ReportsKpiTile;
}

function deltaClass(v: DeltaVariant): string {
  switch (v) {
    case 'up':   return 'text-[var(--success)]';
    case 'down': return 'text-[var(--danger)]';
    case 'flat':
    default:     return 'text-[var(--ink-mute)]';
  }
}

export function ReportsKpiTileCell({ tile }: ReportsKpiTileProps) {
  return (
    <div className="py-[16px] px-[18px] border-r border-[var(--line-soft)] flex flex-col gap-[6px] last:border-r-0 max-[1080px]:[&:nth-child(3n)]:border-r-0 max-[1080px]:[&:nth-child(-n+3)]:border-b max-[1080px]:[&:nth-child(-n+3)]:border-b-[var(--line-soft)] max-[720px]:[&:nth-child(2n)]:border-r-0 max-[720px]:[&:nth-child(-n+2)]:border-b max-[720px]:[&:nth-child(-n+2)]:border-b-[var(--line-soft)]">
      {/* kpi-label */}
      <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold">
        {tile.label}
      </div>
      {/* kpi-value */}
      <div className="font-display text-[26px] font-medium text-[var(--ink)] tracking-[-0.02em] leading-[1] [font-variant-numeric:tabular-nums] flex items-baseline gap-[6px] flex-wrap">
        {tile.value}
        {tile.vSuffix && (
          <span className="font-mono text-[11px] text-[var(--ink-mute)] font-normal tracking-[0.02em]">
            {tile.vSuffix}
          </span>
        )}
        {tile.delta && (
          <span
            className={cn(
              'font-mono text-[11px] font-semibold tracking-[0.02em] inline-flex items-center gap-[4px]',
              deltaClass(tile.delta.variant)
            )}
          >
            {tile.delta.text}
          </span>
        )}
      </div>
      {/* kpi-meta */}
      <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.4]">
        {tile.meta}
      </div>
      {/* optional sparkline */}
      {tile.sparkline && <ReportsSparkline spark={tile.sparkline} />}
    </div>
  );
}

interface ReportsKpiStripProps {
  tiles: ReportsKpiTile[];
}

export function ReportsKpiStrip({ tiles }: ReportsKpiStripProps) {
  return (
    // rep-kpi-strip — L14231-14242
    <div className="grid grid-cols-5 bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] mb-[22px] overflow-hidden max-[1080px]:grid-cols-3 max-[720px]:grid-cols-2">
      {tiles.map((tile, idx) => (
        <ReportsKpiTileCell key={idx} tile={tile} />
      ))}
    </div>
  );
}
