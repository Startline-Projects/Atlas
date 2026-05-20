'use client';

/* admin.html lines 67501-67504 + CSS 32183-32208: read-only query chip in h1 with clear × button
   Clear × navigates to /admin/search (drops the ?q= param) */

import { useRouter } from 'next/navigation';

interface GsQueryPillProps {
  query: string;
}

export function GsQueryPill({ query }: GsQueryPillProps) {
  const router = useRouter();
  return (
    <span className="inline-flex items-center gap-[8px] py-[4px] px-[10px] font-mono text-[11.5px] font-bold tracking-[0.04em] bg-[var(--ink)] text-[var(--paper)] rounded-[4px] ml-[6px]">
      {query}
      <span
        role="button"
        tabIndex={0}
        aria-label="Clear query"
        onClick={() => router.push('/admin/search')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            router.push('/admin/search');
          }
        }}
        className="inline-grid place-items-center w-[14px] h-[14px] rounded-full bg-[rgba(251,248,242,0.18)] text-[var(--paper)] cursor-pointer text-[10px] leading-none hover:bg-[rgba(251,248,242,0.3)]"
      >
        ×
      </span>
    </span>
  );
}
