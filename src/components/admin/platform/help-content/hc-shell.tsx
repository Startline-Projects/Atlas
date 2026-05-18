'use client';

/* Step 33 LIST shell — page header with meta-pulse + stats strip + 2-col layout (sticky category sidebar + article sections) */

import { useState, useMemo } from 'react';
import { HcPageHeader } from './hc-page-header';
import { PrStatStrip } from '@/components/admin/compliance/privacy-reports/pr-stat-strip';
import { HcCatSide } from './hc-cat-side';
import { HcCatSection } from './hc-cat-section';
import type { PrStat } from '@/lib/mock-data/admin/privacy-reports-data';
import type {
  HcPageMeta,
  HcHeaderAction,
  HcCategoryItem,
  HcCategorySection,
} from '@/lib/mock-data/admin/help-content-data';

interface HcShellProps {
  meta: HcPageMeta;
  metaPulseHtml: string;
  searchPlaceholder: string;
  actions: HcHeaderAction[];
  topStats: PrStat[];
  categories: HcCategoryItem[];
  sections: HcCategorySection[];
  listFooterText: string;
}

export function HcShell({
  meta,
  metaPulseHtml,
  searchPlaceholder,
  actions,
  topStats,
  categories,
  sections,
  listFooterText,
}: HcShellProps) {
  const initial = categories.find((c) => c.active)?.id ?? 'all';
  const [activeCategory, setActiveCategory] = useState<string>(initial);

  const filteredSections = useMemo(() => {
    if (activeCategory === 'all') return sections;
    return sections.filter((s) => s.id === activeCategory);
  }, [sections, activeCategory]);

  return (
    <div className="max-w-[1320px] mx-auto pt-[22px] px-[32px] pb-[64px] max-[720px]:pt-[18px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      <HcPageHeader
        title={meta.title}
        metaText={meta.metaText}
        metaPulseHtml={metaPulseHtml}
        searchPlaceholder={searchPlaceholder}
        actions={actions}
      />

      <PrStatStrip stats={topStats} />

      <div className="grid grid-cols-[240px_minmax(0,1fr)] gap-[20px] items-start max-[980px]:grid-cols-1">
        <HcCatSide categories={categories} active={activeCategory} onChange={setActiveCategory} />

        <div className="flex flex-col gap-[28px]">
          {filteredSections.map((section) => (
            <HcCatSection key={section.id} section={section} />
          ))}
          {filteredSections.length === 0 && (
            <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[28px] px-[22px] text-center font-mono text-[11.5px] text-[var(--ink-mute)] tracking-[0.02em]">
              No articles rendered in this category yet (admin.html shows only 4 sample categories with article rows; click "All articles" to see them).
            </div>
          )}
          <div className="pt-[4px] font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">
            {listFooterText}
          </div>
        </div>
      </div>
    </div>
  );
}
