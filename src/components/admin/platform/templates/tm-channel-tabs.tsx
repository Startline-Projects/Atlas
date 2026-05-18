'use client';

/* admin.html lines 62446-62462: 3-tab pill bar (Email / SMS / WhatsApp) with icon + label + count badge */

import type { TmChannelTab, TmChannelValue } from '@/lib/mock-data/admin/templates-data';

interface TmChannelTabsProps {
  tabs: TmChannelTab[];
  active: TmChannelValue;
  onChange: (value: TmChannelValue) => void;
}

function ChannelIcon({ icon }: { icon: TmChannelTab['icon'] }) {
  if (icon === 'envelope') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[13px] h-[13px]">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    );
  }
  if (icon === 'chat') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[13px] h-[13px]">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[13px] h-[13px]">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

export function TmChannelTabs({ tabs, active, onChange }: TmChannelTabsProps) {
  return (
    <div className="flex gap-[2px] bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[4px] mb-[16px] w-fit">
      {tabs.map((tab) => {
        const isActive = tab.value === active;
        const btnClasses = isActive
          ? 'bg-[var(--ink)] text-[var(--paper)]'
          : 'bg-transparent text-[var(--ink-mute)] hover:text-[var(--ink)]';
        const countClasses = isActive
          ? 'bg-[rgba(251,248,242,0.15)] text-[rgba(251,248,242,0.85)]'
          : 'bg-[var(--paper-deep)] text-[var(--ink-mute)]';

        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className={`inline-flex items-center gap-[8px] py-[8px] px-[16px] font-mono text-[11.5px] font-bold tracking-[0.04em] border-0 rounded-[var(--r-sm)] cursor-pointer transition-all ${btnClasses}`}
          >
            <ChannelIcon icon={tab.icon} />
            {tab.label}
            <span className={`font-mono text-[9.5px] font-bold py-[1px] px-[6px] rounded-full ${countClasses}`}>
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
