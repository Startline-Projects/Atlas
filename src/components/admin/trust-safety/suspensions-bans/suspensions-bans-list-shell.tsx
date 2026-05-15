'use client';

import { useState } from 'react';
import {
  SUSPENSIONS_BANS_ROWS,
  SUSPENSIONS_BANS_PAGE_HEADER,
  SUSPENSIONS_BANS_SEVERITY_CARDS,
  SUSPENSIONS_BANS_FILTER_CHIPS,
  SUSPENSIONS_BANS_LIST_FOOTER,
} from '@/lib/mock-data/admin/suspensions-bans-data';
import { SuspensionsBansListTable } from './suspensions-bans-list-table';

const SEVERITY_BORDER_TOP: Record<string, string> = {
  'active-suspensions': 'border-t-[var(--amber)]',
  'active-bans': 'border-t-[var(--danger)]',
  'appeals-open': 'border-t-[var(--super)]',
  'lifted-30d': 'border-t-[var(--success)]',
};

export function SuspensionsBansListShell() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div className="max-w-[1480px] mx-auto px-[28px] py-[24px]">
      {/* Page header */}
      <div className="flex flex-col gap-[14px] mb-[22px] pb-[18px] border-b border-[var(--line)]">
        <div className="min-w-0">
          <h1 className="font-display text-[32px] font-medium tracking-[-0.02em] mb-1 leading-[1.1] text-[var(--ink)]">
            {SUSPENSIONS_BANS_PAGE_HEADER.title}
          </h1>
          <div className="font-mono text-[11px] tracking-[0.04em] text-[var(--ink-mute)] flex flex-wrap items-center gap-2">
            <span>{SUSPENSIONS_BANS_PAGE_HEADER.meta}</span>
            <span className="inline-flex items-center gap-[5px] ml-[12px] text-[var(--amber)] font-semibold">
              {SUSPENSIONS_BANS_PAGE_HEADER.pulse}
            </span>
          </div>
        </div>
        <div className="inline-flex gap-[8px] flex-wrap items-center">
          <button
            type="button"
            className="inline-flex items-center gap-[6px] py-[8px] pr-[14px] pl-[12px] font-body text-[12.5px] font-medium bg-[var(--ink)] border border-[var(--ink)] rounded-full text-[var(--paper)] cursor-pointer whitespace-nowrap hover:bg-black transition-all"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New sanction
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-[6px] py-[8px] pr-[14px] pl-[12px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] transition-all"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
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
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            Sanction policy
          </button>
        </div>
      </div>

      {/* Severity strip */}
      <div className="grid grid-cols-4 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1 gap-[10px] mb-[22px]">
        {SUSPENSIONS_BANS_SEVERITY_CARDS.map((card) => (
          <div
            key={card.id}
            className={`bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[14px_16px] flex flex-col gap-[6px] border-t-[3px] cursor-pointer hover:-translate-y-[1px] transition-transform ${SEVERITY_BORDER_TOP[card.id]}`}
          >
            <div className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold flex items-center justify-between">
              <span>{card.label}</span>
            </div>
            <div className="font-display text-[32px] font-medium text-[var(--ink)] tracking-[-0.02em] leading-none">
              {card.count}
            </div>
            <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em]">
              {card.meta}
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-[14px] mb-4 flex-wrap">
        <div className="inline-flex items-center gap-[10px] flex-wrap">
          <div className="relative inline-flex items-center">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ink-mute)] pointer-events-none"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search by ID, account, or reason…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[280px] pl-[34px] pr-[14px] py-[8px] rounded-full bg-[var(--paper-deep)] border border-[var(--line)] font-body text-[13px] tracking-[-0.005em] text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none placeholder:text-[var(--ink-mute)]"
            />
          </div>
          <div className="inline-flex gap-[6px] flex-wrap">
            {SUSPENSIONS_BANS_FILTER_CHIPS.map((chip) => {
              const isActive = activeFilter === chip.id;
              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => setActiveFilter(chip.id)}
                  className={`inline-flex items-center gap-[6px] px-[12px] py-[6px] font-body text-[13px] border rounded-full cursor-pointer tracking-[-0.005em] transition-all ${
                    isActive
                      ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] font-semibold'
                      : 'bg-[var(--paper-deep)] text-[var(--ink-mute)] border-[var(--line)] font-medium hover:text-[var(--ink)] hover:border-[var(--line-strong)]'
                  }`}
                >
                  {chip.label}{' '}
                  <span
                    className={`font-mono text-[9.5px] px-[5px] py-[2px] rounded tracking-[0.04em] font-bold ml-[4px] ${
                      isActive ? 'bg-white/20 text-[var(--paper)]' : 'bg-[var(--cream-deep)] text-[var(--ink-mute)]'
                    }`}
                  >
                    {chip.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[8px] pr-[14px] pl-[12px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] transition-all flex-shrink-0"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          Last 30d
        </button>
      </div>

      {/* List table */}
      <SuspensionsBansListTable rows={SUSPENSIONS_BANS_ROWS} />

      {/* Footer */}
      <div className="flex items-center justify-between pt-[14px] flex-wrap gap-3">
        <span className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">
          {SUSPENSIONS_BANS_LIST_FOOTER}
        </span>
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[8px] pr-[14px] pl-[12px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] transition-all"
        >
          Load more →
        </button>
      </div>
    </div>
  );
}
