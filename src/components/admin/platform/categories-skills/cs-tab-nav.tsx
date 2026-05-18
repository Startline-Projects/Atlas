'use client';

/* admin.html lines 60537-60554: .cs-tab-nav 3-tab button group with counts + SVG icons */

interface CsTabNavItem {
  value: string;
  label: string;
  icon: string;
  count: string;
}

interface CsTabNavProps {
  tabs: CsTabNavItem[];
  activeValue: string;
  onChange: (value: string) => void;
}

export function CsTabNav({ tabs, activeValue, onChange }: CsTabNavProps) {
  return (
    <div className="inline-flex gap-[2px] bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[4px] mb-[22px] w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onChange(tab.value)}
          className={`inline-flex items-center gap-[8px] py-[8px] px-[16px] font-mono text-[11.5px] font-bold tracking-[0.04em] border-0 rounded-[var(--r-sm)] cursor-pointer transition-all ${
            activeValue === tab.value
              ? 'bg-[var(--ink)] text-[var(--paper)]'
              : 'bg-transparent text-[var(--ink-mute)] hover:text-[var(--ink)]'
          }`}
          role="tab"
          aria-selected={activeValue === tab.value}
        >
          {/* Grid icon */}
          {tab.icon === 'grid' && (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[13px] h-[13px]">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          )}
          {/* Layers icon */}
          {tab.icon === 'layers' && (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[13px] h-[13px]">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          )}
          {/* Tool icon */}
          {tab.icon === 'tool' && (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[13px] h-[13px]">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          )}
          {tab.label}
          <span
            className={`font-mono text-[9.5px] font-bold py-[1px] px-[6px] rounded-full ${
              activeValue === tab.value
                ? 'bg-[rgba(251,248,242,0.15)] text-[rgba(251,248,242,0.85)]'
                : 'bg-[var(--paper-deep)] text-[var(--ink-mute)]'
            }`}
          >
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
}
