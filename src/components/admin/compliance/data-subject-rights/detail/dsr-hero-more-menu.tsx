'use client';

import { useState, useRef, useEffect } from 'react';

export function DsrHeroMoreMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const itemCls = 'w-full text-left px-[14px] py-[10px] font-body text-[13px] text-[var(--ink)] hover:bg-[var(--paper-deep)] transition-colors flex items-center gap-[8px]';
  const sectionCls = 'px-[14px] pt-[10px] pb-[4px] font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold';

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
        <div className="absolute top-full right-0 mt-[8px] bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.12)] z-50 min-w-[260px]">
          <div className={sectionCls}>Processing</div>
          <button className={itemCls}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Generate data export (Art. 20 portable)
          </button>
          <button className={itemCls}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
              <circle cx="12" cy="12" r="10" />
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
            </svg>
            Reject (Art. 17(3) override)
          </button>
          <button className={itemCls}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Convert to Art. 18 restriction
          </button>
          <div className="h-[1px] bg-[var(--line)]" />
          <div className={sectionCls}>Communication</div>
          <button className={itemCls}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Notify subject of decision
          </button>
          <button className={itemCls}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            Request clarification
          </button>
          <div className="h-[1px] bg-[var(--line)]" />
          <div className={sectionCls}>Archive</div>
          <button className={itemCls}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
            </svg>
            Document for audit (Art. 30)
          </button>
          <button className={itemCls}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
              <polyline points="4 4 4 20 20 20" />
              <polyline points="4 12 12 4 16 8 20 4" />
            </svg>
            Full audit trail
          </button>
        </div>
      )}
    </div>
  );
}
