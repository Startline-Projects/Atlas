/* admin.html lines 61537-61549: .in-cat-filter — 7 filter chips with counts (first active) */

'use client';

import type { IntegrationCategoryFilter } from '@/lib/mock-data/admin/integrations-data';

interface IntCategoryFilterProps {
  chips: IntegrationCategoryFilter[];
  active: string;
  onChange: (value: string) => void;
}

export function IntCategoryFilter({ chips, active, onChange }: IntCategoryFilterProps) {
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
