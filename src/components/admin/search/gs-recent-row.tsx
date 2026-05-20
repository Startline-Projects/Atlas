'use client';

/* admin.html lines 68003-68026 + CSS 32483-32510: single recent-search row
   3-col grid [18px clock svg + query/meta + → arrow] · router.push on click */

import { useRouter } from 'next/navigation';
import type { GsRecentRow } from '@/lib/mock-data/admin/search-results-data';

interface GsRecentRowProps {
  row: GsRecentRow;
}

export function GsRecentRow({ row }: GsRecentRowProps) {
  const router = useRouter();
  const navigate = () => router.push(row.href);
  return (
    <div
      role="link"
      tabIndex={0}
      onClick={navigate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate();
        }
      }}
      className="grid grid-cols-[18px_minmax(0,1fr)_auto] gap-[10px] items-center py-[7px] border-b border-b-dashed border-b-[var(--line-soft)] last:border-b-0 cursor-pointer hover:bg-[var(--paper-deep)] transition-colors"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--ink-mute)]">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      <div className="min-w-0">
        <div className="font-mono text-[12.5px] font-bold text-[var(--ink)] tracking-[0.02em]">
          {row.query}
        </div>
        <div className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.04em]">
          {row.meta}
        </div>
      </div>
      <span className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.04em]">→</span>
    </div>
  );
}
