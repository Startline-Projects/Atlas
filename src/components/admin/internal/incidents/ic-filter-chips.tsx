'use client';

/* admin.html lines 64919-64931: severity + state filter chips toolbar (7 chips) */

import type { IcFilterChip } from '@/lib/mock-data/admin/internal-incidents-data';

interface IcFilterChipsProps {
  chips: IcFilterChip[];
  active: string;
  onChange: (value: string) => void;
}

export function IcFilterChips({ chips, active, onChange }: IcFilterChipsProps) {
  return (
    <div className="flex items-center gap-[6px] mb-[16px] flex-wrap">
      {chips.map((chip) => {
        const isActive = chip.value === active;
        const cls = isActive
          ? 'bg-[var(--ink)] border-[var(--ink)] text-[var(--paper)]'
          : 'bg-[var(--paper)] border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)]';
        return (
          <button
            key={chip.value}
            type="button"
            onClick={() => onChange(chip.value)}
            className={`inline-flex items-center gap-[5px] py-[5px] px-[10px] font-mono text-[10.5px] font-semibold tracking-[0.04em] rounded-full border cursor-pointer transition-colors ${cls}`}
          >
            {chip.label}
            <span className="inline font-mono text-[9px] opacity-60 tracking-[0.06em]">
              {chip.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
