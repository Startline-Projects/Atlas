/* admin.html lines 61480-61505: fr-page-head pattern — title + meta + restriction banner + search + 2 actions */

import { PsRestrictionBanner } from '../settings/ps-restriction-banner';
import type { IntegrationHeaderAction } from '@/lib/mock-data/admin/integrations-data';

interface IntPageHeaderProps {
  title: string;
  metaText: string;
  restrictionLabel: string;
  searchPlaceholder: string;
  actions: IntegrationHeaderAction[];
}

export function IntPageHeader({
  title,
  metaText,
  restrictionLabel,
  searchPlaceholder,
  actions,
}: IntPageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-[20px] mb-[18px] flex-wrap">
      {/* Left: title + meta */}
      <div className="flex-1 min-w-0">
        <h1 className="font-display text-[28px] font-medium tracking-[-0.025em] text-[var(--ink)] m-0 leading-[1.1] mb-[4px]">
          {title}
        </h1>
        <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5] flex items-center gap-[8px] flex-wrap">
          <span>{metaText}</span>
          <PsRestrictionBanner label={restrictionLabel} />
        </div>
      </div>

      {/* Right: search + action buttons */}
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
