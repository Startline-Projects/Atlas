/* admin.html lines 67986-67998 + CSS 32453-32464: empty group — normal group-head + centered dashed message block */

import type { GsEmptyGroup } from '@/lib/mock-data/admin/search-results-data';
import { GsGroupIcon } from './gs-group-icon';

interface GsEmptyProps {
  group: GsEmptyGroup;
}

export function GsEmpty({ group }: GsEmptyProps) {
  return (
    <section className="mb-[24px] last:mb-0">
      <div className="flex items-center justify-between gap-[12px] pb-[10px] mb-[10px] border-b border-b-dashed border-b-[var(--line)]">
        <div className="flex items-center gap-[10px] min-w-0">
          <GsGroupIcon type={group.iconType} />
          <h3 className="font-display text-[16px] font-medium tracking-[-0.01em] text-[var(--ink)] m-0">
            {group.title}
            <span className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] font-bold ml-[6px]">
              {group.count}
            </span>
          </h3>
        </div>
      </div>
      <div
        className="py-[18px] px-[16px] bg-[var(--paper)] border border-dashed border-[var(--line)] rounded-[var(--r-md)] font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em] text-center mb-[8px] [&_strong]:text-[var(--ink)] [&_strong]:font-bold"
        dangerouslySetInnerHTML={{ __html: group.emptyHtml }}
      />
    </section>
  );
}
