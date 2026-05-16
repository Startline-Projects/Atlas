'use client';

import { useState } from 'react';

interface MenuSection {
  section: string;
  items: Array<{
    icon: string;
    label: string;
  }>;
}

interface AudHeroMoreMenuProps {
  navigate: Array<{ icon: string; label: string }>;
  forensics: Array<{ icon: string; label: string }>;
  disabled: Array<{ icon: string; label: string }>;
}

export function AudHeroMoreMenu({ navigate, forensics, disabled }: AudHeroMoreMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const iconMap: Record<string, React.ReactNode> = {
    prev: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    ),
    next: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    ),
    expand: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9l6 6 6-6" />
      </svg>
    ),
    code: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    check: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4" />
        <path d="M21 12c0 5-3.5 9-9 9s-9-4-9-9 3.5-9 9-9c2 0 4 .5 5.5 1.5" />
      </svg>
    ),
    chain: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="18" r="3" />
        <path d="M9 6l9 12" />
      </svg>
    ),
    delete: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      </svg>
    ),
    edit: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]"
      >
        More
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-[8px] bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] shadow-[0_10px_40px_rgba(0,0,0,0.1)] z-50 min-w-[240px] overflow-hidden">
          {/* Navigate section */}
          <div>
            <div className="px-[12px] py-[8px] font-mono text-[9px] font-bold tracking-[0.16em] uppercase text-[var(--ink-mute)]">
              Navigate
            </div>
            {navigate.map((item, idx) => (
              <button
                key={idx}
                className="w-full text-left px-[12px] py-[8px] font-body text-[12px] text-[var(--ink)] flex items-center gap-[8px] hover:bg-[var(--paper-deep)] transition-colors"
              >
                <span className="text-[var(--ink-soft)]">{iconMap[item.icon]}</span>
                {item.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-[var(--line)]" />

          {/* Forensics section */}
          <div>
            <div className="px-[12px] py-[8px] font-mono text-[9px] font-bold tracking-[0.16em] uppercase text-[var(--ink-mute)]">
              Forensics
            </div>
            {forensics.map((item, idx) => (
              <button
                key={idx}
                className="w-full text-left px-[12px] py-[8px] font-body text-[12px] text-[var(--ink)] flex items-center gap-[8px] hover:bg-[var(--paper-deep)] transition-colors"
              >
                <span className="text-[var(--ink-soft)]">{iconMap[item.icon]}</span>
                {item.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-[var(--line)]" />

          {/* Disabled section */}
          <div>
            <div className="px-[12px] py-[8px] font-mono text-[9px] font-bold tracking-[0.16em] uppercase text-[var(--ink-mute)]">
              Disabled
            </div>
            {disabled.map((item, idx) => (
              <button
                key={idx}
                disabled
                className="w-full text-left px-[12px] py-[8px] font-body text-[12px] text-[var(--ink-mute)] flex items-center gap-[8px] opacity-50 cursor-not-allowed"
              >
                <span className="text-[var(--ink-mute)]">{iconMap[item.icon]}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
