'use client';

/* admin.html lines 67630-67983 + CSS 32242-32308: result group section
   head (icon + title + count + View-all link) with dashed border + N result rows */

import { useRouter } from 'next/navigation';
import type { GsResultGroup } from '@/lib/mock-data/admin/search-results-data';
import { GsGroupIcon } from './gs-group-icon';
import { GsResult } from './gs-result';

interface GsGroupProps {
  group: GsResultGroup;
}

export function GsGroup({ group }: GsGroupProps) {
  const router = useRouter();
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
        <span
          role="link"
          tabIndex={0}
          onClick={() => router.push(group.viewAllHref)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              router.push(group.viewAllHref);
            }
          }}
          className="font-mono text-[10.5px] font-bold tracking-[0.04em] text-[var(--ink)] cursor-pointer underline hover:text-[var(--super)] whitespace-nowrap"
        >
          {group.viewAllLink}
        </span>
      </div>

      <div>
        {group.results.map((result) => (
          <GsResult key={result.id} result={result} />
        ))}
      </div>
    </section>
  );
}
