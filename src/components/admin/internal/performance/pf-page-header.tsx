'use client';

/* admin.html lines 64005-64030: fr-page-head pattern — title + meta with meta-pulse + period selector + 2 actions (no search) */

import { PfMetaPulse } from './pf-meta-pulse';
import { PfPeriodSelector } from './pf-period-selector';
import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';
import type {
  PfHeaderAction,
  PfPeriodTab,
  PfPeriodValue,
} from '@/lib/mock-data/admin/performance-data';

interface PfPageHeaderProps {
  title: string;
  metaText: string;
  metaPulseHtml: string;
  periodTabs: PfPeriodTab[];
  activePeriod: PfPeriodValue;
  onPeriodChange: (value: PfPeriodValue) => void;
  actions: PfHeaderAction[];
}

export function PfPageHeader({
  title,
  metaText,
  metaPulseHtml,
  periodTabs,
  activePeriod,
  onPeriodChange,
  actions,
}: PfPageHeaderProps) {
  const { showAction } = useAdminActionToast();
  const handleAction = (label: string) => {
    if (label === 'Schedule 1:1s') showAction('Open 1:1 scheduling drawer');
    else if (label === 'Export PDF') showAction('Generate performance PDF — audit logged');
    else showAction(label);
  };
  return (
    <div className="flex items-start justify-between gap-[20px] mb-[18px] flex-wrap">
      {/* Left: title + meta line + meta-pulse */}
      <div className="flex-1 min-w-0">
        <h1 className="font-display text-[28px] font-medium tracking-[-0.025em] text-[var(--ink)] m-0 leading-[1.1] mb-[4px]">
          {title}
        </h1>
        <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5] flex items-center flex-wrap">
          <span>{metaText}</span>
          <PfMetaPulse html={metaPulseHtml} />
        </div>
      </div>

      {/* Right: period selector + 2 actions */}
      <div className="inline-flex gap-[8px] flex-wrap items-center flex-shrink-0">
        <PfPeriodSelector tabs={periodTabs} active={activePeriod} onChange={onPeriodChange} />

        {actions.map((action, idx) => {
          const isPrimary = action.isPrimary;
          const btnClasses = isPrimary
            ? 'bg-[var(--ink)] border-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink-soft)] hover:border-[var(--ink-soft)]'
            : 'bg-[var(--paper)] border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]';

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleAction(action.label)}
              className={`inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full border cursor-pointer transition-all whitespace-nowrap ${btnClasses}`}
            >
              {action.icon === 'calendar' && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              )}
              {action.icon === 'download' && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              )}
              {action.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
