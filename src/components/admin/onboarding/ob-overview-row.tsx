/* admin.html lines 68064-68069 + CSS 32620-32656: single overview row — ink number circle + text + mono sub */

import type { ObOverviewRow } from '@/lib/mock-data/admin/onboarding-data';

interface ObOverviewRowProps {
  row: ObOverviewRow;
}

export function ObOverviewRowItem({ row }: ObOverviewRowProps) {
  return (
    <div className="flex items-center gap-[9px] py-[9px] px-[12px] bg-[var(--paper-deep)] border border-[var(--line-soft)] rounded-[6px]">
      <div className="w-[22px] h-[22px] rounded-full bg-[var(--ink)] text-[var(--paper)] grid place-items-center font-mono text-[10px] font-bold flex-shrink-0">
        {row.num}
      </div>
      <div className="text-[12px] font-semibold text-[var(--ink)] tracking-[-0.005em] leading-[1.3]">
        {row.text}
        <span className="block font-mono text-[9.5px] font-medium text-[var(--ink-mute)] tracking-[0.02em] mt-[2px]">
          {row.sub}
        </span>
      </div>
    </div>
  );
}
