/**
 * Phase 16a — Incidents toolbar (search + 5 filter chips + date picker).
 *
 * admin.html: L40391-40412
 *
 * Mirrors fraud-alerts-toolbar pattern. Different placeholder + 5 status chips.
 */
import type { IncidentFilterKey, IncidentFilterChip } from '@/lib/mock-data/admin/incidents-data';

interface IncidentsToolbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedFilter: IncidentFilterKey;
  onFilterChange: (f: IncidentFilterKey) => void;
  filterChips: IncidentFilterChip[];
  dateRangeLabel: string;
}

export function IncidentsToolbar({
  searchQuery,
  onSearchChange,
  selectedFilter,
  onFilterChange,
  filterChips,
  dateRangeLabel,
}: IncidentsToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-[14px] mb-[16px] flex-wrap">
      <div className="inline-flex items-center gap-[10px] flex-wrap">
        {/* Search */}
        <div className="relative">
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[var(--ink-mute)] pointer-events-none"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by incident ID, vector, affected service…"
            aria-label="Search incidents"
            className="font-body text-[13px] py-[8px] pl-[34px] pr-[14px] bg-[var(--paper-deep)] border border-[var(--line)] rounded-full w-[280px] outline-none tracking-[-0.005em] text-[var(--ink)] transition-[border-color] duration-[120ms] ease placeholder:text-[var(--ink-mute)] focus:border-[var(--ink)]"
          />
        </div>

        {/* Filter chips */}
        <div className="inline-flex gap-[6px] flex-wrap">
          {filterChips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              onClick={() => onFilterChange(chip.key)}
              className={`inline-flex items-center gap-[6px] py-[6px] px-[12px] font-body text-[12px] font-medium rounded-full border cursor-pointer tracking-[-0.005em] transition-all duration-[120ms] ease ${
                selectedFilter === chip.key
                  ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] font-semibold'
                  : 'bg-[var(--paper-deep)] text-[var(--ink-mute)] border-[var(--line)] hover:text-[var(--ink)] hover:border-[var(--line-strong)]'
              }`}
            >
              {chip.label}
              <span className={`font-mono text-[9.5px] font-semibold tracking-[0.04em] py-[1px] px-[5px] rounded-[3px] ${
                selectedFilter === chip.key
                  ? 'bg-[rgba(251,248,242,0.18)] text-[var(--paper)]'
                  : 'bg-[var(--cream-deep)] text-[var(--ink-mute)]'
              }`}>
                {chip.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Date range picker */}
      <div>
        <button
          type="button"
          data-si-action="open-date-picker"
          onClick={() => console.log('[si] date-picker clicked')}
          className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all duration-150 ease whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] [&>svg]:flex-shrink-0 [&>svg]:text-[var(--ink-mute)] hover:[&>svg]:text-[var(--ink)]"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          {dateRangeLabel}
        </button>
      </div>
    </div>
  );
}
