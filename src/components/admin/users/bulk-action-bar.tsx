'use client';

import type { BulkAction } from '@/lib/mock-data/admin/users-data';

interface BulkActionBarProps {
  count: number;
  actions: BulkAction[];
  onClear: () => void;
}

export function BulkActionBar({ count, actions, onClear }: BulkActionBarProps) {
  return (
    <div className="flex items-center gap-[12px] pt-[10px] pr-[16px] pb-[10px] pl-[18px] bg-[var(--color-ink)] text-[var(--color-paper)] rounded-[var(--radius-md)] mb-[12px] flex-wrap animate-bulk-slide-in">
      {/* Count Pill */}
      <div className="inline-flex items-center gap-[8px] flex-shrink-0 text-[13px] font-medium">
        <span className="font-mono text-[11px] font-semibold bg-[rgba(251,248,242,0.18)] px-[8px] pt-[2px] pb-[2px] pl-[7px] rounded-full tracking-[0.04em]">
          {count} selected
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-[4px] flex-wrap">
        {actions.map((action) => (
          <button
            key={action.action}
            type="button"
            className={`py-[6px] px-[13px] font-body text-[12.5px] font-medium rounded-full cursor-pointer whitespace-nowrap transition-[background,border-color] duration-[150ms] ease ${
              action.variant === 'danger'
                ? 'bg-[rgba(251,248,242,0.06)] text-[#ffb1a3] border border-[rgba(255,177,163,0.3)] hover:bg-[rgba(194,65,43,0.3)] hover:border-[rgba(255,177,163,0.5)]'
                : 'bg-[rgba(251,248,242,0.06)] text-[var(--color-paper)] border border-[rgba(251,248,242,0.18)] hover:bg-[rgba(251,248,242,0.16)] hover:border-[rgba(251,248,242,0.3)]'
            }`}
            data-users-action={action.action}
          >
            {action.label}
          </button>
        ))}
      </div>

      {/* Clear Selection Button */}
      <button
        type="button"
        onClick={onClear}
        className="ml-auto py-[5px] px-[10px] font-mono text-[10.5px] uppercase font-medium tracking-[0.06em] bg-none border-none text-[rgba(251,248,242,0.65)] cursor-pointer transition-colors duration-[150ms] ease hover:text-[var(--color-paper)]"
        data-bulk-clear
      >
        Clear selection
      </button>
    </div>
  );
}
