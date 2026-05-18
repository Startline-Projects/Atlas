'use client';

/* admin.html lines 62465-62475: status filter chip row (All / Active / Draft / In approval / Archived) */

import type { TmStatusFilterChip, TmStatusFilter } from '@/lib/mock-data/admin/templates-data';

interface TmStatusFilterProps {
  chips: TmStatusFilterChip[];
  active: TmStatusFilter;
  onChange: (value: TmStatusFilter) => void;
}

export function TmStatusFilter({ chips, active, onChange }: TmStatusFilterProps) {
  return (
    <div className="flex gap-[6px] flex-wrap mb-[22px]">
      {chips.map((chip) => {
        const isActive = chip.value === active;
        const chipClasses = isActive
          ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]'
          : 'bg-[var(--paper)] border-[var(--line)] text-[var(--ink-soft)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]';
        const countClasses = isActive
          ? 'bg-[rgba(251,248,242,0.15)] text-[rgba(251,248,242,0.85)]'
          : 'bg-[var(--paper-deep)] text-[var(--ink-mute)]';

        return (
          <button
            key={chip.value}
            type="button"
            onClick={() => onChange(chip.value)}
            className={`inline-flex items-center gap-[5px] py-[5px] px-[10px] font-mono text-[10.5px] font-semibold tracking-[0.04em] border rounded-full cursor-pointer transition-all ${chipClasses}`}
          >
            {chip.label}
            <span className={`font-mono text-[9px] font-bold py-[1px] px-[5px] rounded-full tracking-[0.04em] ${countClasses}`}>
              {chip.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
