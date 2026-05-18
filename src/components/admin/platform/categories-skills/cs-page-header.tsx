'use client';

/* admin.html lines 60509-60533: fr-page-head pattern with title + meta + restriction + search + 2 action buttons */

import { PsRestrictionBanner } from '../settings/ps-restriction-banner';
import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';

interface CsPageHeaderProps {
  title: string;
  metaText: string;
  restrictionLabel: string;
  searchPlaceholder: string;
  actions: Array<{ label: string; icon: string }>;
}

export function CsPageHeader({
  title,
  metaText,
  restrictionLabel,
  searchPlaceholder,
  actions,
}: CsPageHeaderProps) {
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
        {/* Search input */}
        <div className="max-w-[240px] inline-flex items-center gap-[8px] py-[8px] px-[14px] bg-[var(--paper)] border border-[var(--line)] rounded-full">
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

        {/* Action buttons */}
        {actions.map((action, idx) => (
          <button
            key={idx}
            type="button"
            className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full bg-[var(--paper)] border border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)] cursor-pointer transition-all whitespace-nowrap"
          >
            {action.icon === 'audit' && (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 4 4 20 20 20" />
                <polyline points="4 12 12 4 16 8 20 4" />
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
        ))}
      </div>
    </div>
  );
}
