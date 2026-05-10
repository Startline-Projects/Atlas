'use client';

import type { AdminFilterChip, AdminFilterRoleKey } from '@/lib/mock-data/admin/admin-profiles-data';
import { cn } from '@/lib/utils/cn';

interface AdminToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedRole: AdminFilterRoleKey;
  onRoleChange: (key: AdminFilterRoleKey) => void;
  filterChips: AdminFilterChip[];
}

export function AdminToolbar({ searchQuery, onSearchChange, selectedRole, onRoleChange, filterChips }: AdminToolbarProps) {
  return (
    // admin.html line 8552: .adm-toolbar
    <div className="flex items-center gap-[12px] mb-[18px] flex-wrap">
      {/* admin.html line 8559: .adm-search */}
      <div className="flex-[1_1_280px] flex items-center gap-[8px] bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[8px] px-[14px] min-w-0">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="text-[var(--ink-mute)] flex-shrink-0"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search admins by name, email, or role…"
          aria-label="Search admins"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 border-0 bg-transparent font-body text-[13px] text-[var(--ink)] outline-none min-w-0"
        />
      </div>

      {/* admin.html line 8581: .adm-filters */}
      <div className="inline-flex gap-[8px] flex-wrap">
        {filterChips.map((chip) => {
          const isActive = chip.key === selectedRole;
          return (
            <button
              key={chip.key}
              type="button"
              onClick={() => onRoleChange(chip.key)}
              data-adm-filter={chip.key}
              className={cn(
                // admin.html line 8585: .filter-chip base
                'font-mono text-[10.5px] tracking-[0.06em] py-[7px] px-[12px] border rounded-full cursor-pointer transition-[background,color] duration-[120ms] ease inline-flex items-center gap-[6px]',
                isActive
                  ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]'
                  : 'bg-[var(--paper)] border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--cream-deep)] hover:text-[var(--ink)]'
              )}
            >
              {chip.label}
              <span
                className={cn(
                  // admin.html line 8602: .chip-count
                  'text-[9px] py-[1px] px-[6px] rounded-full tracking-[0.04em]',
                  isActive
                    ? 'bg-[rgba(255,255,255,0.18)]'
                    : 'bg-[var(--cream-deep)] text-[var(--ink-mute)]'
                )}
              >
                {chip.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
