/* admin.html fr-section-head pattern (lines 62868-62876, 62927-62935): cream-deep num badge + h2 + meta with dashed bottom separator */

import type { TmSectionHeadData } from '@/lib/mock-data/admin/templates-data';

interface TmSectionHeadProps {
  head: TmSectionHeadData;
}

export function TmSectionHead({ head }: TmSectionHeadProps) {
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
          <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em] mt-[4px]">
            {head.meta}
          </div>
        </div>
      </div>
    </div>
  );
}
