import {
  TRANSACTIONS_PAGE_HEADER,
  TRANSACTIONS_ROWS,
  TRANSACTIONS_TOTALS,
} from '@/lib/mock-data/admin/transactions-data';
import { DateRangeTabs } from './date-range-tabs';
import { TransactionsListTotalsStrip } from './transactions-list-totals-strip';
import { TransactionsListToolbar } from './transactions-list-toolbar';
import { TransactionsListTable } from './transactions-list-table';

export function TransactionsListShell() {
  return (
    <div className="max-w-[1480px] mx-auto px-[28px] py-[24px]">
      {/* Page header */}
      <div className="flex items-end justify-between gap-[18px] mb-[22px] pb-[18px] border-b border-[var(--line)] flex-wrap">
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-[32px] font-medium tracking-[-0.02em] mb-[4px] leading-[1.1] text-[var(--ink)]">
            {TRANSACTIONS_PAGE_HEADER.title}
          </h1>
          <div className="font-mono text-[11px] tracking-[0.04em] text-[var(--ink-mute)]">
            {TRANSACTIONS_PAGE_HEADER.meta}
          </div>
        </div>
        <div className="inline-flex gap-[10px] items-center flex-wrap flex-shrink-0">
          <DateRangeTabs />
          <button
            type="button"
            className="inline-flex items-center gap-[6px] py-[8px] pr-[14px] pl-[12px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] transition-all"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-[6px] py-[8px] pr-[14px] pl-[12px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] transition-all"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 11 12 14 22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            Reconcile
          </button>
        </div>
      </div>

      {/* Totals strip */}
      <TransactionsListTotalsStrip totals={TRANSACTIONS_TOTALS} />

      {/* Toolbar (search + filter chips + currency/amount) */}
      <TransactionsListToolbar />

      {/* Transaction table */}
      <TransactionsListTable rows={TRANSACTIONS_ROWS} />

      {/* Footer — pagination meta + Load more */}
      <div className="flex items-center justify-between gap-[14px] mt-[16px] flex-wrap">
        <span className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em]">
          9 of 14,284 shown · canonical sample · sorted by recency · 90d window · all currencies displayed in native + USD
        </span>
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[8px] pr-[14px] pl-[12px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] transition-all"
        >
          Load more
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
    </div>
  );
}
