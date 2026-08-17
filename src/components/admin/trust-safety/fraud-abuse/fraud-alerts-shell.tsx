/**
 * Phase 15a — Fraud & Abuse list-view shell.
 *
 * admin.html CSS: .fr-wrap + .fr-page-head (L15412-15428)
 * admin.html markup: L39171-39537
 *
 * max-w 1320px (NOT 1280, NOT 1400). 3 header buttons. meta-pulse inline.
 */
'use client';

import { useState, useMemo } from 'react';
import { FRAUD_ALERTS_PAGE_DATA } from '@/lib/mock-data/admin/fraud-alerts-data';
import type { FraudFilterKey } from '@/lib/mock-data/admin/fraud-alerts-data';
import { FraudSeverityStrip } from './fraud-severity-strip';
import { FraudAlertsToolbar } from './fraud-alerts-toolbar';
import { FraudAlertsTable } from './fraud-alerts-table';

export function FraudAlertsShell() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FraudFilterKey>('all');

  const filteredRows = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return FRAUD_ALERTS_PAGE_DATA.listRows.filter((row) => {
      if (selectedFilter !== 'all' && row.status !== selectedFilter) return false;
      if (!q) return true;
      return (
        row.atlasId.toLowerCase().includes(q) ||
        row.accountName.toLowerCase().includes(q) ||
        row.accountMeta.toLowerCase().includes(q) ||
        row.alertType.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedFilter]);

  return (
    <div className="mx-auto max-w-[1320px] pt-[28px] px-[32px] pb-[64px] max-[720px]:px-[18px] max-[720px]:pt-[22px] max-[720px]:pb-[48px]">
      {/* Page header — fr-page-head */}
      <div className="flex items-end justify-between gap-[18px] mb-[22px] pb-[18px] border-b border-[var(--line)] flex-wrap">
        <div>
          <h1 className="font-display text-[32px] font-medium tracking-[-0.02em] m-0 mb-[4px] leading-[1.1]">
            {FRAUD_ALERTS_PAGE_DATA.pageTitle}
          </h1>
          <div className="font-mono text-[11px] tracking-[0.04em] text-[var(--ink-mute)]">
            /admin/trust-safety/fraud-abuse · {FRAUD_ALERTS_PAGE_DATA.pageMeta}
            <span className="inline-flex items-center gap-[5px] ml-[12px] text-[var(--danger)] font-semibold before:content-[''] before:w-[6px] before:h-[6px] before:rounded-full before:bg-[var(--danger)] before:animate-pulse">
              {FRAUD_ALERTS_PAGE_DATA.activeIndicator}
            </span>
          </div>
        </div>
        <div className="inline-flex gap-[10px] items-center flex-wrap">
          <button
            type="button"
            data-fraud-action="export-list"
            onClick={() => console.log('[fraud] export-list clicked')}
            className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all duration-150 ease whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] [&>svg]:flex-shrink-0 [&>svg]:text-[var(--ink-mute)] hover:[&>svg]:text-[var(--ink)]"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export
          </button>
          <button
            type="button"
            data-fraud-action="open-watchlist"
            onClick={() => console.log('[fraud] watchlist clicked')}
            className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all duration-150 ease whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] [&>svg]:flex-shrink-0 [&>svg]:text-[var(--ink-mute)] hover:[&>svg]:text-[var(--ink)]"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
            </svg>
            Watchlist (14)
          </button>
          <button
            type="button"
            data-fraud-action="new-investigation"
            onClick={() => console.log('[fraud] new-investigation clicked')}
            className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-[var(--ink)] text-[var(--paper)] border border-[var(--ink)] rounded-full cursor-pointer transition-all duration-150 ease whitespace-nowrap hover:bg-black [&>svg]:flex-shrink-0"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            New investigation
          </button>
        </div>
      </div>

      <FraudSeverityStrip cards={FRAUD_ALERTS_PAGE_DATA.severityCards} />

      <FraudAlertsToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        filterChips={FRAUD_ALERTS_PAGE_DATA.filterChips}
      />

      <FraudAlertsTable rows={filteredRows} />

      {/* Footer — admin.html inline styles L39534-39536 */}
      <div className="flex items-center justify-between pt-[14px] flex-wrap gap-[12px]">
        <span className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">
          {FRAUD_ALERTS_PAGE_DATA.footerLabel}
        </span>
        <button
          type="button"
          data-fraud-action="load-more"
          onClick={() => console.log('[fraud] load-more clicked')}
          className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all duration-150 ease whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)]"
        >
          Load more (38 remaining) →
        </button>
      </div>
    </div>
  );
}
