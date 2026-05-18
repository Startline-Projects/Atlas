/* admin.html lines 65175-65194: single in-detail-stat cell */

import type { IcDetailStat } from '@/lib/mock-data/admin/internal-incidents-data';

interface IcDetailStatCellProps {
  stat: IcDetailStat;
}

export function IcDetailStatCell({ stat }: IcDetailStatCellProps) {
  const valueColor =
    stat.valueVariant === 'success'
      ? 'text-[var(--success)]'
      : stat.valueVariant === 'warn'
      ? 'text-[var(--amber)]'
      : 'text-[var(--ink)]';

  return (
    <div className="py-[16px] px-[20px] border-r border-r-[var(--line-soft)] last:border-r-0 max-[980px]:[&:nth-child(2n)]:border-r-0 max-[980px]:[&:nth-child(-n+2)]:border-b max-[980px]:[&:nth-child(-n+2)]:border-b-[var(--line-soft)] max-[480px]:border-r-0 max-[480px]:[&:not(:last-child)]:border-b max-[480px]:[&:not(:last-child)]:border-b-[var(--line-soft)]">
      <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold mb-[6px]">
        {stat.label}
      </div>
      <div
        className={`font-display text-[28px] font-medium tracking-[-0.025em] leading-[1] tabular-nums ${valueColor}`}
      >
        {stat.value}
        {stat.valueSuffix && (
          <span className="text-[14px] text-[var(--ink-mute)] ml-[3px] font-normal">
            {stat.valueSuffix}
          </span>
        )}
      </div>
      <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[5px]">
        {stat.meta}
      </div>
    </div>
  );
}
