'use client';

/* admin.html lines 62754-62779: 6 locale tabs with inline flag gradient bars + active state */

import { useState } from 'react';
import type { TmLocaleTab } from '@/lib/mock-data/admin/templates-data';

interface TmLocaleTabsProps {
  tabs: TmLocaleTab[];
}

export function TmLocaleTabs({ tabs }: TmLocaleTabsProps) {
  const initial = tabs.find((t) => t.active)?.code ?? tabs[0]?.code ?? '';
  const [active, setActive] = useState<string>(initial);

  return (
    <div className="inline-flex bg-[var(--paper-deep)] border border-[var(--line)] rounded-[4px] p-[2px] gap-[1px] flex-wrap">
      {tabs.map((tab) => {
        const isActive = tab.code === active;
        const btnClasses = isActive
          ? 'bg-[var(--ink)] text-[var(--paper)]'
          : tab.fallback
          ? 'bg-transparent text-[var(--ink-mute)] italic'
          : 'bg-transparent text-[var(--ink-mute)]';

        return (
          <button
            key={tab.code}
            type="button"
            onClick={() => setActive(tab.code)}
            className={`inline-flex items-center gap-[5px] py-[4px] px-[9px] font-mono text-[10.5px] font-bold tracking-[0.04em] border-0 rounded-[3px] cursor-pointer transition-colors ${btnClasses}`}
          >
            <span
              className="w-[13px] h-[9px] rounded-[1px] flex-shrink-0"
              style={{ background: tab.flagGradient }}
            />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
