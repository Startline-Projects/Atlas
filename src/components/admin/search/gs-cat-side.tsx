'use client';

/* admin.html lines 67555-67623 + CSS 32220-32240: sticky 220px category sidebar
   Head "CATEGORIES · 9" + 13 category rows (All + 12). Active state local (filter is decorative — static fixture view) */

import { useState } from 'react';
import type { GsSidebarCategory } from '@/lib/mock-data/admin/search-results-data';
import { GsCatItem } from './gs-cat-item';

interface GsCatSideProps {
  headLabel: string;
  categories: GsSidebarCategory[];
}

export function GsCatSide({ headLabel, categories }: GsCatSideProps) {
  const initial = categories.find((c) => c.active)?.key ?? 'all';
  const [active, setActive] = useState<string>(initial);

  return (
    <aside className="sticky top-[12px] self-start bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden max-[980px]:static">
      <div className="py-[10px] px-[14px] bg-[var(--paper-deep)] border-b border-b-[var(--line-soft)] font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold">
        {headLabel}
      </div>
      <div className="flex flex-col">
        {categories.map((cat) => (
          <GsCatItem
            key={cat.key}
            category={cat}
            isActive={cat.key === active}
            onSelect={setActive}
          />
        ))}
      </div>
    </aside>
  );
}
