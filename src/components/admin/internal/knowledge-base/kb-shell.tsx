'use client';

/* admin.html lines 66159-66707: full LIST view orchestrator
   page header + 5-stat strip + hc-layout 2-col (sticky 7-category sidebar + 4 category sections with 13 docs) + footer */

import { useState, useMemo } from 'react';
import { PrStatStrip } from '@/components/admin/compliance/privacy-reports/pr-stat-strip';
import { KbPageHeader } from './kb-page-header';
import { KbCatSide } from './kb-cat-side';
import { KbCatSection } from './kb-cat-section';
import type { PrStat } from '@/lib/mock-data/admin/privacy-reports-data';
import type {
  KbPageMeta,
  KbHeaderAction,
  KbCategoryItem,
  KbCategorySectionData,
} from '@/lib/mock-data/admin/knowledge-base-data';

interface KbShellProps {
  meta: KbPageMeta;
  metaPulseHtml: string;
  searchPlaceholder: string;
  actions: KbHeaderAction[];
  topStats: PrStat[];
  categories: KbCategoryItem[];
  sections: KbCategorySectionData[];
  footerText: string;
}

export function KbShell({
  meta,
  metaPulseHtml,
  searchPlaceholder,
  actions,
  topStats,
  categories,
  sections,
  footerText,
}: KbShellProps) {
  const initial = categories.find((c) => c.isActive)?.value ?? 'all';
  const [activeCategory, setActiveCategory] = useState<string>(initial);

  const filteredSections = useMemo(() => {
    if (activeCategory === 'all') return sections;
    return sections.filter((s) => s.id === activeCategory);
  }, [sections, activeCategory]);

  return (
    <div className="max-w-[1320px] mx-auto pt-[22px] px-[32px] pb-[64px] max-[720px]:pt-[18px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      <KbPageHeader
        meta={meta}
        metaPulseHtml={metaPulseHtml}
        searchPlaceholder={searchPlaceholder}
        actions={actions}
      />

      <PrStatStrip stats={topStats} />

      <div className="grid grid-cols-[240px_minmax(0,1fr)] gap-[20px] items-start max-[980px]:grid-cols-1">
        <KbCatSide
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />

        <div className="flex flex-col gap-[28px]">
          {filteredSections.map((section) => (
            <KbCatSection key={section.id} section={section} />
          ))}
          {filteredSections.length === 0 && (
            <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[28px] px-[22px] text-center font-mono text-[11.5px] text-[var(--ink-mute)] tracking-[0.02em]">
              No documents rendered in this category yet (admin.html shows only 4 sample categories with doc rows; click &ldquo;All documents&rdquo; to see them).
            </div>
          )}
          <div className="pt-[4px] font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">
            {footerText}
          </div>
        </div>
      </div>
    </div>
  );
}
