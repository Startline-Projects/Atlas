'use client';

/* admin.html lines 64861-64887: fr-page-head pattern — title + meta with meta-pulse + search + 3 actions */

import { IcMetaPulse } from './ic-meta-pulse';
import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';
import type {
  IcPageMeta,
  IcHeaderAction,
} from '@/lib/mock-data/admin/internal-incidents-data';

interface IcPageHeaderProps {
  meta: IcPageMeta;
  metaPulseHtml: string;
  searchPlaceholder: string;
  actions: IcHeaderAction[];
}

export function IcPageHeader({
  meta,
  metaPulseHtml,
  searchPlaceholder,
  actions,
}: IcPageHeaderProps) {
  const { showAction } = useAdminActionToast();
  const handleAction = (label: string) => {
    if (label === 'Audit') showAction('Open SEV-history audit drawer');
    else if (label === 'Runbooks') showAction('Open incident response runbooks');
    else if (label === 'Declare incident') showAction('Open declare-incident form — PagerDuty');
    else showAction(label);
  };

  return (
    <div className="flex items-start justify-between gap-[20px] mb-[18px] flex-wrap">
      {/* Left: title + meta line + meta-pulse */}
      <div className="flex-1 min-w-0">
        <h1 className="font-display text-[28px] font-medium tracking-[-0.025em] text-[var(--ink)] m-0 leading-[1.1] mb-[4px]">
          {meta.title}
        </h1>
        <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5] flex items-center flex-wrap">
          <span>{meta.metaText}</span>
          <IcMetaPulse html={metaPulseHtml} />
        </div>
      </div>

      {/* Right: search + 3 actions */}
      <div className="inline-flex gap-[8px] flex-wrap items-center flex-shrink-0">
        <div className="inline-flex items-center gap-[6px] bg-[var(--paper)] border border-[var(--line)] rounded-full py-[6px] px-[12px] max-w-[220px]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--ink-mute)] flex-shrink-0">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="bg-transparent border-0 outline-none text-[12px] text-[var(--ink)] placeholder:text-[var(--ink-mute)] w-full"
          />
        </div>
        {actions.map((action, idx) => {
          const isPrimary = action.isPrimary;
          const btnClasses = isPrimary
            ? 'bg-[var(--ink)] border-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink-soft)] hover:border-[var(--ink-soft)]'
            : 'bg-[var(--paper)] border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:text-[var(--ink)]';
          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleAction(action.label)}
              className={`inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full border cursor-pointer transition-all whitespace-nowrap ${btnClasses}`}
            >
              {action.icon === 'chart-line' && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 4 4 20 20 20" />
                  <polyline points="4 12 12 4 16 8 20 4" />
                </svg>
              )}
              {action.icon === 'book' && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              )}
              {action.icon === 'triangle-alert' && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
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
