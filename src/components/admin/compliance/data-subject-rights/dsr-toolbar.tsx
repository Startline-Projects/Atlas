'use client';

import { useState } from 'react';

export function DsrToolbar() {
  const [activeFilter, setActiveFilter] = useState('all');

  const chips = [
    { id: 'all', label: 'All', count: 98 },
    { id: 'active', label: 'Active', count: 11 },
    { id: 'access', label: 'Access', count: 4 },
    { id: 'deletion', label: 'Deletion', count: 3 },
    { id: 'portability', label: 'Portability', count: 2 },
    { id: 'correction', label: 'Correction', count: 1 },
    { id: 'objection', label: 'Objection', count: 1 },
  ];

  return (
    <div className="flex items-center justify-between gap-[16px] mb-[18px] flex-wrap">
      <div className="flex items-center gap-[16px] flex-wrap flex-1 min-w-0">
        <div className="flex items-center gap-[8px] py-[8px] px-[14px] bg-[var(--paper)] border border-[var(--line)] rounded-full min-w-[280px] flex-1 max-w-[380px]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--ink-mute)] flex-shrink-0">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search by ref, subject name, account ID…"
            className="bg-transparent border-0 outline-none flex-1 min-w-0 font-body text-[12.5px] text-[var(--ink)] placeholder:text-[var(--ink-mute)] placeholder:font-mono placeholder:text-[11px]"
          />
        </div>

        <div className="inline-flex gap-[6px] flex-wrap">
          {chips.map((chip) => {
            const active = activeFilter === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => setActiveFilter(chip.id)}
                className={`inline-flex items-center gap-[6px] py-[6px] px-[12px] font-body text-[12px] font-medium rounded-full cursor-pointer tracking-[-0.005em] transition-all ${
                  active
                    ? 'bg-[var(--ink)] text-[var(--paper)] border border-[var(--ink)] font-semibold'
                    : 'text-[var(--ink-mute)] bg-[var(--paper-deep)] border border-[var(--line)] hover:text-[var(--ink)] hover:border-[var(--line-strong)]'
                }`}
              >
                {chip.label}
                <span
                  className={`font-mono text-[9.5px] py-[1px] px-[5px] rounded-[3px] font-semibold tracking-[0.04em] ${
                    active
                      ? 'bg-[rgba(251,248,242,0.18)] text-[var(--paper)]'
                      : 'bg-[var(--cream-deep)] text-[var(--ink-mute)]'
                  }`}
                >
                  {chip.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <button className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)] transition-all flex-shrink-0">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        All jurisdictions
      </button>
    </div>
  );
}
