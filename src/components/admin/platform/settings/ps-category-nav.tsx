'use client';

import type { PsCategoryNavChip as PsCategoryNavChipType } from '@/lib/mock-data/admin/platform-settings-data';

interface PsCategoryNavProps {
  chips: PsCategoryNavChipType[];
  activeValue?: string;
  onChange?: (value: string) => void;
}

function getChipIcon(icon: string) {
  const icons: Record<string, string> = {
    'settings-cog': '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    'dollar': '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    'message': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    'globe-decorated': '<circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>',
    'shield': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  };
  return icons[icon] || '';
}

export function PsCategoryNav({
  chips,
  activeValue,
  onChange,
}: PsCategoryNavProps) {
  const handleClick = (value: string) => {
    onChange?.(value);
    const el = document.getElementById(`ps-section-${value}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-wrap gap-[6px] py-[14px] px-[18px] bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] mb-[22px] sticky top-0 z-[5]">
      {chips.map((chip) => {
        const isActive = activeValue === chip.value;
        return (
          <button
            key={chip.value}
            type="button"
            onClick={() => handleClick(chip.value)}
            className={`inline-flex items-center gap-[6px] py-[6px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] rounded-full cursor-pointer transition-all no-underline whitespace-nowrap ${
              isActive
                ? 'bg-[var(--ink)] text-[var(--paper)] border border-[var(--ink)]'
                : 'bg-[var(--paper-deep)] text-[var(--ink-soft)] border border-[var(--line)] hover:text-[var(--ink)] hover:border-[var(--line-strong)]'
            }`}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0"
            >
              <g dangerouslySetInnerHTML={{ __html: getChipIcon(chip.icon) }} />
            </svg>
            <span>{chip.label}</span>
            <span className={`font-mono text-[9px] font-bold py-[1px] px-[6px] rounded-full tracking-[0.04em] ${
              isActive
                ? 'bg-[rgba(251,248,242,0.15)] text-[rgba(251,248,242,0.85)]'
                : 'bg-[var(--paper)] text-[var(--ink-mute)]'
            }`}>{chip.count}</span>
          </button>
        );
      })}
    </div>
  );
}
