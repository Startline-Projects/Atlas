'use client';

import { RsViewToggle } from './rs-view-toggle';

interface RsToolbarProps {
  toggles: Array<{
    label: string;
    icon: string;
    value: string;
    active?: boolean;
  }>;
  active: string;
  onChange: (value: string) => void;
}

export function RsToolbar({
  toggles,
  active,
  onChange,
}: RsToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-[16px] mb-[18px] flex-wrap">
      <RsViewToggle toggles={toggles} active={active} onChange={onChange} />
      <button
        type="button"
        className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full bg-[var(--paper)] border border-[var(--line)] text-[var(--ink-soft)] cursor-pointer transition-all hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)] whitespace-nowrap"
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        Show all
      </button>
    </div>
  );
}
