'use client';

import { useState } from 'react';
import type { PrPeriodOption } from '@/lib/mock-data/admin/privacy-reports-data';

interface PrPeriodSelectorProps {
  options: PrPeriodOption[];
  selectedValue: string;
}

export function PrPeriodSelector({ options, selectedValue }: PrPeriodSelectorProps) {
  const [selected, setSelected] = useState(selectedValue);

  return (
    <div className="flex items-center gap-[6px]">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => setSelected(option.value)}
          className={`inline-flex items-center px-[10px] py-[6px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full transition-all ${
            selected === option.value
              ? 'bg-[var(--ink)] text-[var(--paper)] border border-[var(--ink)]'
              : 'bg-[var(--paper)] text-[var(--ink-soft)] border border-[var(--line)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
