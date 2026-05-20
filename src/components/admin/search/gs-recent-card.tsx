/* admin.html lines 68001-68027 + CSS 32467-32510: recent searches card — head + N rows */

import type { GsRecentRow as GsRecentRowData } from '@/lib/mock-data/admin/search-results-data';
import { GsRecentRow } from './gs-recent-row';

interface GsRecentCardProps {
  title: string;
  rows: GsRecentRowData[];
}

export function GsRecentCard({ title, rows }: GsRecentCardProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[14px] px-[18px] mb-[14px] mt-[16px]">
      <h3 className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold m-0 mb-[10px]">
        {title}
      </h3>
      {rows.map((row, idx) => (
        <GsRecentRow key={idx} row={row} />
      ))}
    </div>
  );
}
