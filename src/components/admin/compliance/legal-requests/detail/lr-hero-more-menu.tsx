'use client';

import { useState, useRef, useEffect } from 'react';

export function LrHeroMoreMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)] whitespace-nowrap"
      >
        More
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-[8px] bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.12)] z-50 min-w-[200px]">
          <button className="w-full text-left px-[14px] py-[10px] font-body text-[13px] text-[var(--ink)] hover:bg-[var(--paper-deep)] transition-colors flex items-center gap-[8px]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3m-5-5.477A5 5 0 0 0 5 12" />
            </svg>
            Copy link
          </button>
          <button className="w-full text-left px-[14px] py-[10px] font-body text-[13px] text-[var(--ink)] hover:bg-[var(--paper-deep)] transition-colors flex items-center gap-[8px]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
            Export as PDF
          </button>
          <button className="w-full text-left px-[14px] py-[10px] font-body text-[13px] text-[var(--ink)] hover:bg-[var(--paper-deep)] transition-colors flex items-center gap-[8px]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit matter info
          </button>
          <div className="h-[1px] bg-[var(--line)]" />
          <button className="w-full text-left px-[14px] py-[10px] font-body text-[13px] text-[var(--danger)] hover:bg-[rgba(194,65,43,0.05)] transition-colors flex items-center gap-[8px]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
              <polyline points="3 6 5 4 21 4 23 6 23 20a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
            Archive matter
          </button>
        </div>
      )}
    </div>
  );
}
