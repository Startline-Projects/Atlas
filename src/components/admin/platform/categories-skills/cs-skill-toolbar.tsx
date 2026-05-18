'use client';

/* admin.html lines 61045-61060: .fr-toolbar with search + filter chips + add skill button */

import { useState } from 'react';
import { CsSkillFilterChip } from './cs-skill-filter-chip';
import type { CsSkillFilter } from '@/lib/mock-data/admin/categories-skills-data';

interface CsSkillToolbarProps {
  searchPlaceholder: string;
  filters: CsSkillFilter[];
}

export function CsSkillToolbar({ searchPlaceholder, filters }: CsSkillToolbarProps) {
  const [activeFilter, setActiveFilter] = useState(filters[0]?.value || 'all');

  return (
    <div className="flex items-center justify-between gap-[16px] mb-[18px] flex-wrap">
      {/* Left: Search + Filter chips */}
      <div className="flex items-center gap-[12px] flex-wrap flex-1 min-w-0">
        {/* Search input */}
        <div className="inline-flex items-center gap-[8px] py-[8px] px-[14px] bg-[var(--paper)] border border-[var(--line)] rounded-full max-w-[280px]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="flex-1 min-w-0 bg-transparent border-0 outline-none font-body text-[12.5px] text-[var(--ink)] placeholder:text-[var(--ink-mute)] placeholder:font-mono placeholder:text-[11px]"
          />
        </div>

        {/* Filter chips row */}
        <div className="inline-flex items-center gap-[6px] flex-wrap">
          {filters.map((filter) => (
            <CsSkillFilterChip
              key={filter.value}
              label={filter.label}
              count={filter.count}
              active={activeFilter === filter.value}
              onClick={() => setActiveFilter(filter.value)}
            />
          ))}
        </div>
      </div>

      {/* Right: Add skill button */}
      <button
        type="button"
        className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full bg-[var(--ink)] border border-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink-soft)] cursor-pointer transition-all whitespace-nowrap"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add skill
      </button>
    </div>
  );
}
