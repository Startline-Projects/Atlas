'use client';

/* admin.html lines 67154-67159 + CSS 32092-32131: 3-tab underline strip with count badges
   Active tab gets ink text + ink bottom-border + inverted count badge (ink bg / paper text) */

import type { NfcTab, NfcTabKey } from '@/lib/mock-data/admin/notifications-data';

interface NfcTabRowProps {
  tabs: NfcTab[];
  active: NfcTabKey;
  onChange: (key: NfcTabKey) => void;
}

export function NfcTabRow({ tabs, active, onChange }: NfcTabRowProps) {
  return (
    <div className="flex gap-0 mb-[16px] border-b border-b-[var(--line)]">
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        const btnClasses = isActive
          ? 'text-[var(--ink)] border-b-[var(--ink)]'
          : 'text-[var(--ink-mute)] border-b-transparent hover:text-[var(--ink-soft)]';
        const countClasses = isActive
          ? 'bg-[var(--ink)] text-[var(--paper)]'
          : 'bg-[var(--paper-deep)] text-[var(--ink-mute)]';
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={`py-[10px] px-[18px] bg-transparent border-0 border-b-2 mb-[-1px] font-display text-[14px] font-medium tracking-[-0.01em] cursor-pointer transition-colors ${btnClasses}`}
          >
            {tab.label}
            <span
              className={`inline-block ml-[6px] py-[1px] px-[7px] rounded-full font-mono text-[10px] font-bold ${countClasses}`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
