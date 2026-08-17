'use client';

import { useState, useMemo } from 'react';
import { ENGAGEMENTS_PAGE_DATA } from '@/lib/mock-data/admin/engagement-profiles-data';
import type { EngagementFilterKey } from '@/lib/mock-data/admin/engagement-profiles-data';
import { AdminStatsRow } from '@/components/admin/users/admins/admin-stats-row';
import { EngagementsToolbar } from './engagements-toolbar';
import { EngagementsTable } from './engagements-table';

export function EngagementsShell() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<EngagementFilterKey>('all');

  const filteredRows = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ENGAGEMENTS_PAGE_DATA.listRows.filter((row) => {
      // Filter by chip
      let filterMatch = true;
      if (selectedFilter === 'active') filterMatch = row.status === 'active';
      else if (selectedFilter === 'dispute') filterMatch = row.status === 'dispute';
      else if (selectedFilter === 'paused') filterMatch = row.status === 'paused';
      else if (selectedFilter === 'fixed') filterMatch = row.type === 'fixed-price';
      else if (selectedFilter === 'hourly') filterMatch = row.type === 'hourly';
      if (!filterMatch) return false;
      if (!q) return true;
      return (
        row.client.displayName.toLowerCase().includes(q) ||
        (row.client.realLegalEntity?.toLowerCase().includes(q) ?? false) ||
        row.candidate.name.toLowerCase().includes(q) ||
        row.role.toLowerCase().includes(q) ||
        row.id.toLowerCase().includes(q) ||
        row.atlasId.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedFilter]);

  return (
    // admin.html line 21375: eng-wrap
    <div className="mx-auto max-w-[1280px] pt-[28px] px-[32px] pb-[64px] max-[720px]:px-[18px] max-[720px]:pt-[22px] max-[720px]:pb-[48px]">
      {/* admin.html line 21378: eng-page-head */}
      <div className="flex items-end justify-between gap-[18px] mb-[22px] pb-[18px] border-b border-[var(--line)] flex-wrap">
        <div>
          <h1 className="font-display text-[32px] font-medium tracking-[-0.02em] m-0 mb-[4px] leading-[1.1]">
            Active Engagements
          </h1>
          <div className="font-mono text-[11px] tracking-[0.04em] text-[var(--ink-mute)]">
            {ENGAGEMENTS_PAGE_DATA.pageMeta}
          </div>
        </div>
        <div className="inline-flex gap-[10px] items-center">
          <button
            type="button"
            data-eng-action="export-list"
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log('[engagements] export-list clicked');
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
        </div>
      </div>

      {/* Stats row — reuse Phase 9b AdminStatsRow (identical CSS pattern) */}
      <AdminStatsRow stats={ENGAGEMENTS_PAGE_DATA.stats} />

      {/* Toolbar (search + 6 filter chips) */}
      <EngagementsToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        filterChips={ENGAGEMENTS_PAGE_DATA.filterChips}
      />

      {/* admin.html line 21436: adm-section-label */}
      <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold mt-[22px] mb-[12px] pb-[6px] border-b border-dashed border-[var(--line-soft)] flex items-center justify-between gap-[8px]">
        <span>Engagement roster</span>
        <span className="font-body normal-case tracking-[0.02em] text-[var(--ink-soft)] text-[11.5px] font-medium">
          Showing {filteredRows.length} of {ENGAGEMENTS_PAGE_DATA.totalCount} · click any row for full detail
        </span>
      </div>

      {/* Table */}
      <EngagementsTable rows={filteredRows} />

      {/* admin.html line 21596: footer */}
      <div className="flex items-center justify-between pt-[14px] flex-wrap gap-[12px]">
        <span className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">
          {ENGAGEMENTS_PAGE_DATA.footerLabel}
        </span>
        <button
          type="button"
          data-eng-action="load-more"
          onClick={() => {
            // eslint-disable-next-line no-console
            console.log('[engagements] load-more clicked');
          }}
          className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all duration-150 ease whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)]"
        >
          {ENGAGEMENTS_PAGE_DATA.loadMoreLabel}
        </button>
      </div>
    </div>
  );
}
