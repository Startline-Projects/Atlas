/* admin.html lines 63129-63155: fr-page-head pattern — title + meta with meta-pulse + search + 3 actions */

import { HcMetaPulse } from './hc-meta-pulse';
import type { HcHeaderAction } from '@/lib/mock-data/admin/help-content-data';

interface HcPageHeaderProps {
  title: string;
  metaText: string;
  metaPulseHtml: string;
  searchPlaceholder: string;
  actions: HcHeaderAction[];
}

export function HcPageHeader({
  title,
  metaText,
  metaPulseHtml,
  searchPlaceholder,
  actions,
}: HcPageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-[20px] mb-[18px] flex-wrap">
      <div className="flex-1 min-w-0">
        <h1 className="font-display text-[28px] font-medium tracking-[-0.025em] text-[var(--ink)] m-0 leading-[1.1] mb-[4px]">
          {title}
        </h1>
        <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5] flex items-center flex-wrap">
          <span>{metaText}</span>
          <HcMetaPulse html={metaPulseHtml} />
        </div>
      </div>

      <div className="inline-flex gap-[8px] flex-wrap items-center flex-shrink-0">
        <div className="max-w-[220px] inline-flex items-center gap-[8px] py-[8px] px-[14px] bg-[var(--paper)] border border-[var(--line)] rounded-full">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="bg-transparent border-0 outline-none text-[13px] w-full placeholder:text-[var(--ink-mute)]"
          />
        </div>

        {actions.map((action, idx) => {
          const isPrimary = action.isPrimary;
          const btnClasses = isPrimary
            ? 'bg-[var(--ink)] border-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink-soft)] hover:border-[var(--ink-soft)]'
            : 'bg-[var(--paper)] border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]';

          return (
            <button
              key={idx}
              type="button"
              className={`inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full border cursor-pointer transition-all whitespace-nowrap ${btnClasses}`}
            >
              {action.icon === 'audit' && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 4 4 20 20 20" />
                  <polyline points="4 12 12 4 16 8 20 4" />
                </svg>
              )}
              {action.icon === 'external' && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              )}
              {action.icon === 'plus' && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
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
