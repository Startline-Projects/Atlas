/* fr-section-head pattern shared with Step 32/33/34/35 — sh-num chip + h2 + sh-meta + optional right-side action */

import type { IcmSectionHead as IcmSectionHeadData } from '@/lib/mock-data/admin/communications-data';

interface IcmSectionHeadProps {
  head: IcmSectionHeadData;
  rightSlot?: React.ReactNode;
}

export function IcmSectionHead({ head, rightSlot }: IcmSectionHeadProps) {
  return (
    <div className="flex items-end justify-between gap-[12px] flex-wrap mb-[16px] pb-[12px] border-b border-b-dashed border-b-[var(--line-soft)]">
      <div className="flex items-baseline gap-[10px]">
        <span className="font-mono text-[9.5px] bg-[var(--cream-deep)] text-[var(--ink-mute)] py-[2px] px-[6px] rounded-[3px] font-bold tracking-[0.06em]">
          {head.num}
        </span>
        <div>
          <h2 className="font-display text-[18px] font-medium tracking-[-0.01em] m-0 leading-[1.2] text-[var(--ink)]">
            {head.title}
          </h2>
          <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em] mt-[4px] [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold">
            {head.meta}
          </div>
        </div>
      </div>
      {rightSlot}
    </div>
  );
}
