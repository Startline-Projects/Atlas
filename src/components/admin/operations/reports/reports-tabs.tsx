/**
 * Phase 14a — 5-tab category navigation.
 *
 * admin.html markup: L38041-38067
 * admin.html CSS: L14176-14228
 */
'use client';

import { cn } from '@/lib/utils/cn';
import type {
  ReportsTabDef,
  ReportsTabKey,
  ReportsTabIconKey,
} from '@/lib/mock-data/admin/reports-analytics-data';

interface ReportsTabsProps {
  tabs: ReportsTabDef[];
  active: ReportsTabKey;
  onChange: (key: ReportsTabKey) => void;
}

function TabIcon({ icon }: { icon: ReportsTabIconKey }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    className: 'w-[14px] h-[14px]',
  };
  switch (icon) {
    case 'globe':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case 'activity':
      return (
        <svg {...common}>
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      );
    case 'dollar':
      return (
        <svg {...common}>
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      );
    case 'file-text':
      return (
        <svg {...common}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      );
  }
}

export function ReportsTabs({ tabs, active, onChange }: ReportsTabsProps) {
  return (
    // rep-tabs — L14177-14186
    <div
      role="tablist"
      aria-label="Report category tabs"
      className="flex gap-0 border-b border-[var(--line)] mb-[22px] overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            data-rep-tab={tab.key}
            onClick={() => onChange(tab.key)}
            className={cn(
              'relative py-[14px] px-[20px] font-body text-[13px] tracking-[-0.005em] cursor-pointer border-b-2 -mb-[1px] inline-flex items-center gap-[8px] whitespace-nowrap transition-colors duration-[120ms] ease',
              isActive
                ? 'text-[var(--ink)] font-semibold border-b-[var(--ink)] [&_svg]:opacity-100'
                : 'text-[var(--ink-mute)] font-medium border-b-transparent hover:text-[var(--ink)] [&_svg]:opacity-75'
            )}
          >
            <TabIcon icon={tab.iconKey} />
            {tab.label}
            <span
              className={cn(
                'font-mono text-[9.5px] font-semibold py-[1px] px-[6px] rounded-[3px] tracking-[0.04em]',
                isActive
                  ? 'bg-[var(--ink)] text-[var(--paper)]'
                  : 'bg-[var(--cream-deep)] text-[var(--ink-mute)]'
              )}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
