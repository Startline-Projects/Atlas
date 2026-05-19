'use client';

/* admin.html lines 65521-65533: Compose primary button with chevron + cd-more-menu dropdown (4 options) */

import { useState, useEffect, useRef } from 'react';
import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';
import type { IcmComposeOption } from '@/lib/mock-data/admin/communications-data';

interface IcmComposeDropdownProps {
  options: IcmComposeOption[];
}

export function IcmComposeDropdown({ options }: IcmComposeDropdownProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { showAction } = useAdminActionToast();

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const handleOption = (label: string) => {
    setOpen(false);
    showAction(`${label} — opening composer`);
  };

  return (
    <div className="relative inline-block" ref={wrapRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full border cursor-pointer transition-all whitespace-nowrap bg-[var(--ink)] border-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink-soft)] hover:border-[var(--ink-soft)]"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Compose
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-[4px]">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-[6px] min-w-[200px] bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] shadow-lg z-50 py-[4px]">
          {options.map((opt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleOption(opt.label)}
              className="block w-full text-left py-[8px] px-[14px] font-mono text-[11px] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:text-[var(--ink)] cursor-pointer transition-colors"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
