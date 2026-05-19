/* admin.html lines 65584-65604 + CSS 30920-30954: single 4-up stat cell inside pinned card */

import type { IcmPinnedStat } from '@/lib/mock-data/admin/communications-data';

interface IcmPinnedStatCellProps {
  stat: IcmPinnedStat;
}

export function IcmPinnedStatCell({ stat }: IcmPinnedStatCellProps) {
  return (
    <div className="py-[10px] px-[14px] border-r border-r-[var(--line-soft)] last:border-r-0 max-[720px]:[&:nth-child(2n)]:border-r-0 max-[720px]:[&:nth-child(-n+2)]:border-b max-[720px]:[&:nth-child(-n+2)]:border-b-[var(--line-soft)]">
      <div className="font-mono text-[8.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold mb-[4px]">
        {stat.label}
      </div>
      <div className="font-display text-[18px] font-medium text-[var(--ink)] tracking-[-0.02em] leading-[1] tabular-nums">
        {stat.value}
        {stat.valueSuffix && (
          <span style={{ fontSize: '11px', color: 'var(--ink-mute)' }}>
            {stat.valueSuffix}
          </span>
        )}
      </div>
      <div className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[3px] font-semibold">
        {stat.meta}
      </div>
    </div>
  );
}
