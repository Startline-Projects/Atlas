'use client';

import { useEffect, useRef, useState } from 'react';
import type { TxDetailProfile, TxMoreMenuItem } from '@/lib/mock-data/admin/transactions-data';

interface TransactionsMoreMenuProps {
  menu: TxDetailProfile['moreMenu'];
}

function MenuIcon({ kind }: { kind: TxMoreMenuItem['iconKind'] }) {
  const common = {
    width: 13,
    height: 13,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor' as const,
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: 'flex-shrink-0',
  };
  if (kind === 'external') {
    return (
      <svg {...common}>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    );
  }
  if (kind === 'copy') {
    return (
      <svg {...common}>
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
    );
  }
  if (kind === 'reverse') {
    return (
      <svg {...common}>
        <polyline points="1 4 1 10 7 10" />
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
      </svg>
    );
  }
  if (kind === 'cancel') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
      </svg>
    );
  }
  // export
  return (
    <svg {...common}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

const ITEM_VARIANT: Record<NonNullable<TxMoreMenuItem['variant']>, string> = {
  default: 'text-[var(--ink-soft)] hover:bg-[var(--cream-deep)] hover:text-[var(--ink)] [&:hover_svg]:text-[var(--ink)]',
  danger: 'text-[var(--danger)] hover:bg-[var(--danger-bg)] [&_svg]:text-[var(--danger)]',
  warn: 'text-[var(--amber)] hover:bg-[var(--amber-bg)] [&_svg]:text-[var(--amber)]',
};

export function TransactionsMoreMenu({ menu }: TransactionsMoreMenuProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div ref={wrapRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-[6px] py-[8px] pr-[14px] pl-[12px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] transition-all"
      >
        More
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+6px)] min-w-[220px] bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-sm)] shadow-[0_8px_24px_rgba(14,14,12,0.08)] py-[6px] z-50"
        >
          {menu.sections.map((section, sIdx) => (
            <div key={sIdx}>
              {sIdx > 0 && <div className="h-px bg-[var(--line-soft)] my-[6px]" aria-hidden="true" />}
              <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold py-[6px_4px] pl-[14px] pr-[14px]">
                {section.heading}
              </div>
              {section.items.map((item, iIdx) => {
                const variantClass = ITEM_VARIANT[item.variant ?? 'default'];
                return (
                  <button
                    key={iIdx}
                    type="button"
                    role="menuitem"
                    className={`flex items-center gap-[10px] py-[8px] px-[14px] font-body text-[12.5px] font-medium cursor-pointer whitespace-nowrap bg-transparent border-0 w-full text-left [&_svg]:text-[var(--ink-mute)] ${variantClass}`}
                  >
                    <MenuIcon kind={item.iconKind} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
