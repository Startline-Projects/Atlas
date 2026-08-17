'use client';

import { useState } from 'react';

interface FilterChip {
  id: string;
  label: string;
  count: string;
}

const FILTER_CHIPS: FilterChip[] = [
  { id: 'all', label: 'All', count: '14,284' },
  { id: 'payment', label: 'Payments', count: '8,952' },
  { id: 'payout', label: 'Payouts', count: '4,180' },
  { id: 'fee', label: 'Fees', count: '1,098' },
  { id: 'refund', label: 'Refunds', count: '47' },
  { id: 'failed', label: 'Failed', count: '7' },
];

export function TransactionsListToolbar() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div className="flex items-center justify-between gap-[14px] mb-[16px] flex-wrap">
      {/* Left: search + filter chips */}
      <div className="inline-flex items-center gap-[10px] flex-wrap">
        {/* Search */}
        <div className="relative">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[var(--ink-mute)] pointer-events-none"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, ref, account, amount…"
            className="font-body text-[13px] py-[8px] pr-[14px] pl-[34px] bg-[var(--paper-deep)] border border-[var(--line)] rounded-full w-[280px] outline-none tracking-[-0.005em] transition-colors text-[var(--ink)] focus:border-[var(--ink)] placeholder:text-[var(--ink-mute)]"
          />
        </div>

        {/* Filter chips */}
        <div className="inline-flex gap-[6px] flex-wrap">
          {FILTER_CHIPS.map((chip) => {
            const isActive = activeFilter === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => setActiveFilter(chip.id)}
                className={`inline-flex items-center gap-[6px] py-[6px] px-[12px] font-body text-[12px] border rounded-full cursor-pointer tracking-[-0.005em] transition-all ${
                  isActive
                    ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] font-semibold'
                    : 'bg-[var(--paper-deep)] text-[var(--ink-mute)] border-[var(--line)] font-medium hover:text-[var(--ink)] hover:border-[var(--line-strong)]'
                }`}
              >
                {chip.label}
                <span
                  className={`font-mono text-[9.5px] py-[1px] px-[5px] rounded-[3px] font-semibold tracking-[0.04em] ${
                    isActive ? 'bg-[rgba(251,248,242,0.18)] text-[var(--paper)]' : 'bg-[var(--cream-deep)] text-[var(--ink-mute)]'
                  }`}
                >
                  {chip.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: currency + amount filters */}
      <div className="inline-flex gap-[8px]">
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[8px] pr-[14px] pl-[12px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] transition-all"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          All currencies
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[8px] pr-[14px] pl-[12px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] transition-all"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
          Any amount
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
    </div>
  );
}
