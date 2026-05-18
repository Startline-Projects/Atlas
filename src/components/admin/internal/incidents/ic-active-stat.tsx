/* admin.html CSS lines 30393-30428: single stat cell inside ic-active-callout (4-up grid) */

import type { IcActiveStat } from '@/lib/mock-data/admin/internal-incidents-data';

interface IcActiveStatProps {
  stat: IcActiveStat;
}

export function IcActiveStatCell({ stat }: IcActiveStatProps) {
  const valueColor = stat.valueIsDanger
    ? 'text-[var(--danger)]'
    : 'text-[var(--ink)]';
  return (
    <div className="py-[10px] px-[14px] border-r border-r-[var(--line-soft)] last:border-r-0 max-[720px]:[&:nth-child(2n)]:border-r-0 max-[720px]:[&:nth-child(-n+2)]:border-b max-[720px]:[&:nth-child(-n+2)]:border-b-[var(--line-soft)]">
      <div className="font-mono text-[8.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold mb-[4px]">
        {stat.label}
      </div>
      <div
        className={`font-display text-[18px] font-medium tracking-[-0.02em] leading-[1] tabular-nums ${valueColor}`}
      >
        {stat.value}
        {stat.valueSuffix && (
          <span className="text-[11px] text-[var(--ink-mute)] ml-[3px] font-normal">
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
