/**
 * Phase 16a — Security Incidents list-view shell.
 *
 * admin.html: L40322-40650 (list view)
 *
 * Reuses .fr-wrap chrome from Phase 15 fraud. Page header has different
 * pulse text + 3 action buttons (Export · Response runbook · Report new incident primary).
 */
'use client';

import { useState, useMemo } from 'react';
import { INCIDENTS_PAGE_DATA } from '@/lib/mock-data/admin/incidents-data';
import type { IncidentFilterKey } from '@/lib/mock-data/admin/incidents-data';
import { FraudSeverityStrip } from '@/components/admin/trust-safety/fraud-abuse/fraud-severity-strip';
import { IncidentsToolbar } from './incidents-toolbar';
import { IncidentsTable } from './incidents-table';

export function IncidentsShell() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<IncidentFilterKey>('all');

  const filteredRows = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return INCIDENTS_PAGE_DATA.listRows.filter((row) => {
      if (selectedFilter !== 'all' && row.status !== selectedFilter) return false;
      if (!q) return true;
      return (
        row.atlasId.toLowerCase().includes(q) ||
        row.summaryTitle.toLowerCase().includes(q) ||
        row.summaryMeta.toLowerCase().includes(q) ||
        row.typeLabel.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedFilter]);

  return (
    <div className="mx-auto max-w-[1320px] pt-[28px] px-[32px] pb-[64px] max-[720px]:px-[18px] max-[720px]:pt-[22px] max-[720px]:pb-[48px]">
      {/* Page header — fr-page-head */}
      <div className="flex items-end justify-between gap-[18px] mb-[22px] pb-[18px] border-b border-[var(--line)] flex-wrap">
        <div>
          <h1 className="font-display text-[32px] font-medium tracking-[-0.02em] m-0 mb-[4px] leading-[1.1]">
            {INCIDENTS_PAGE_DATA.pageTitle}
          </h1>
          <div className="font-mono text-[11px] tracking-[0.04em] text-[var(--ink-mute)]">
            {INCIDENTS_PAGE_DATA.pageMeta}
            <span className="inline-flex items-center gap-[5px] ml-[12px] text-[var(--amber)] font-semibold before:content-[''] before:w-[6px] before:h-[6px] before:rounded-full before:bg-[var(--amber)] before:animate-pulse">
              {INCIDENTS_PAGE_DATA.metaPulseText}
            </span>
          </div>
        </div>
        <div className="inline-flex gap-[10px] items-center flex-wrap">
          <button
            type="button"
            data-si-action="export-list"
            onClick={() => console.log('[si] export-list clicked')}
            className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all duration-150 ease whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] [&>svg]:flex-shrink-0 [&>svg]:text-[var(--ink-mute)] hover:[&>svg]:text-[var(--ink)]"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export
          </button>
          <button
            type="button"
            data-si-action="open-runbook"
            onClick={() => console.log('[si] runbook clicked')}
            className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all duration-150 ease whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] [&>svg]:flex-shrink-0 [&>svg]:text-[var(--ink-mute)] hover:[&>svg]:text-[var(--ink)]"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
            Response runbook
          </button>
          <button
            type="button"
            data-si-action="report-incident"
            onClick={() => console.log('[si] report-incident clicked')}
            className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-[var(--ink)] text-[var(--paper)] border border-[var(--ink)] rounded-full cursor-pointer transition-all duration-150 ease whitespace-nowrap hover:bg-black [&>svg]:flex-shrink-0"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Report new incident
          </button>
        </div>
      </div>

      <FraudSeverityStrip cards={INCIDENTS_PAGE_DATA.severityCards} />

      <IncidentsToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        filterChips={INCIDENTS_PAGE_DATA.filterChips}
        dateRangeLabel={INCIDENTS_PAGE_DATA.dateRangeLabel}
      />

      <IncidentsTable rows={filteredRows} />

      {/* Footer */}
      <div className="flex items-center justify-between pt-[14px] flex-wrap gap-[12px]">
        <span className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">
          {INCIDENTS_PAGE_DATA.footerLabel}
        </span>
        <button
          type="button"
          data-si-action="load-more"
          onClick={() => console.log('[si] load-more clicked')}
          className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all duration-150 ease whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)]"
        >
          {INCIDENTS_PAGE_DATA.loadMoreLabel}
        </button>
      </div>
    </div>
  );
}
