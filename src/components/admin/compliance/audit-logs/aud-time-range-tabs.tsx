'use client';

import { useState } from 'react';

interface TimeRange {
  label: string;
  value: string;
  active?: boolean;
}

interface AudTimeRangeTabsProps {
  timeRanges: TimeRange[];
  onSelect?: (value: string) => void;
}

export function AudTimeRangeTabs({ timeRanges, onSelect }: AudTimeRangeTabsProps) {
  const initial = timeRanges.find((r) => r.active)?.value ?? timeRanges[0]?.value ?? '';
  const [active, setActive] = useState(initial);

  return (
    <div className="inline-flex items-center gap-[2px] p-[3px] bg-[var(--paper)] border border-[var(--line)] rounded-full">
      {timeRanges.map((range) => {
        const isActive = range.value === active;
        return (
          <button
            key={range.value}
            type="button"
            onClick={() => {
              setActive(range.value);
              onSelect?.(range.value);
            }}
            className={`font-mono text-[10.5px] font-semibold tracking-[0.04em] py-[4px] px-[12px] rounded-full border-0 cursor-pointer transition-all duration-[120ms] ${
              isActive
                ? 'bg-[var(--ink)] text-[var(--paper)]'
                : 'bg-transparent text-[var(--ink-mute)] hover:text-[var(--ink)]'
            }`}
          >
            {range.label}
          </button>
        );
      })}
    </div>
  );
}
