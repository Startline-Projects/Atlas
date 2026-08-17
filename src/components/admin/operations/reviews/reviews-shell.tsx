'use client';

import { useState, useMemo } from 'react';
import { REVIEWS_PAGE_DATA } from '@/lib/mock-data/admin/review-profiles-data';
import type { ReviewFilterKey, ReviewDirectionFilterKey } from '@/lib/mock-data/admin/review-profiles-data';
import { AdminStatsRow } from '@/components/admin/users/admins/admin-stats-row';
import { ReviewsToolbar } from './reviews-toolbar';
import { ReviewsTable } from './reviews-table';

export function ReviewsShell() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<ReviewFilterKey>('all');
  const [selectedDirection, setSelectedDirection] = useState<ReviewDirectionFilterKey>('all');

  const filteredRows = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return REVIEWS_PAGE_DATA.listRows.filter((row) => {
      // Direction axis (independent)
      if (selectedDirection !== 'all' && row.direction !== selectedDirection) return false;
      // Status axis
      if (selectedFilter !== 'all' && row.status !== selectedFilter) return false;
      // Search
      if (!q) return true;
      return (
        row.atlasId.toLowerCase().includes(q) ||
        row.id.toLowerCase().includes(q) ||
        row.reviewer.name.toLowerCase().includes(q) ||
        row.reviewee.name.toLowerCase().includes(q) ||
        row.snippet.toLowerCase().includes(q) ||
        row.reviewer.metaText.toLowerCase().includes(q) ||
        row.reviewee.metaText.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedFilter, selectedDirection]);

  return (
    // admin.html L12849 — .rev-wrap (1280px)
    <div className="mx-auto max-w-[1280px] pt-[28px] px-[32px] pb-[64px] max-[720px]:px-[18px] max-[720px]:pt-[22px] max-[720px]:pb-[48px]">
      {/* Page header */}
      <div className="flex items-end justify-between gap-[18px] mb-[22px] pb-[18px] border-b border-[var(--line)] flex-wrap">
        <div>
          <h1 className="font-display text-[32px] font-medium tracking-[-0.02em] m-0 mb-[4px] leading-[1.1]">
            Reviews moderation
          </h1>
          <div className="font-mono text-[11px] tracking-[0.04em] text-[var(--ink-mute)]">
            {REVIEWS_PAGE_DATA.pageMeta}
          </div>
        </div>
        <div className="inline-flex gap-[10px] items-center">
          <button
            type="button"
            data-rev-action="export-list"
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log('[reviews] export-list clicked');
            }}
            className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all duration-150 ease whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] [&>svg]:flex-shrink-0 [&>svg]:text-[var(--ink-mute)] hover:[&>svg]:text-[var(--ink)]"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export CSV
          </button>
          <button
            type="button"
            data-rev-action="open-patterns"
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log('[reviews] open-patterns clicked');
            }}
            className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all duration-150 ease whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] [&>svg]:flex-shrink-0 [&>svg]:text-[var(--ink-mute)] hover:[&>svg]:text-[var(--ink)]"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="4" />
              <line x1="12" y1="2" x2="12" y2="4" />
              <line x1="12" y1="20" x2="12" y2="22" />
              <line x1="2" y1="12" x2="4" y2="12" />
              <line x1="20" y1="12" x2="22" y2="12" />
            </svg>
            View pattern clusters (4)
          </button>
        </div>
      </div>

      <AdminStatsRow stats={REVIEWS_PAGE_DATA.stats} />

      <ReviewsToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedDirection={selectedDirection}
        onDirectionChange={setSelectedDirection}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        directionTabs={REVIEWS_PAGE_DATA.directionTabs}
        filterChips={REVIEWS_PAGE_DATA.filterChips}
      />

      {/* Section label */}
      <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold mt-[22px] mb-[12px] pb-[6px] border-b border-dashed border-[var(--line-soft)] flex items-center justify-between gap-[8px]">
        <span>{REVIEWS_PAGE_DATA.sectionLabel}</span>
        <span className="font-body normal-case tracking-[0.02em] text-[var(--ink-soft)] text-[11.5px] font-medium">
          {REVIEWS_PAGE_DATA.sectionLabelMeta}
        </span>
      </div>

      <ReviewsTable rows={filteredRows} />

      {/* Footer */}
      <div className="flex items-center justify-between pt-[14px] flex-wrap gap-[12px]">
        <span className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">
          {REVIEWS_PAGE_DATA.footerLabel}
        </span>
        <button
          type="button"
          data-rev-action="load-more"
          onClick={() => {
            // eslint-disable-next-line no-console
            console.log('[reviews] load-more clicked');
          }}
          className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all duration-150 ease whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)]"
        >
          {REVIEWS_PAGE_DATA.loadMoreLabel}
        </button>
      </div>
    </div>
  );
}
