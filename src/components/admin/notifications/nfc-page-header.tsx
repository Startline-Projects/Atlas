'use client';

/* admin.html lines 67084-67107: fr-page-head — title + meta with meta-pulse + 3 actions (Filter / Settings / Mark all read primary) */

import { NfcMetaPulse } from './nfc-meta-pulse';
import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';
import type {
  NfcPageMeta,
  NfcHeaderAction,
} from '@/lib/mock-data/admin/notifications-data';

interface NfcPageHeaderProps {
  meta: NfcPageMeta;
  metaPulseHtml: string;
  actions: NfcHeaderAction[];
}

export function NfcPageHeader({
  meta,
  metaPulseHtml,
  actions,
}: NfcPageHeaderProps) {
  const { showAction } = useAdminActionToast();
  const handleAction = (label: string) => {
    if (label === 'Filter') showAction('Open notification filter drawer');
    else if (label === 'Settings')
      showAction('Open notification preferences');
    else if (label === 'Mark all read')
      showAction('All 14 unread notifications marked read');
    else showAction(label);
  };

  return (
    <div className="flex items-start justify-between gap-[20px] mb-[18px] flex-wrap">
      <div className="flex-1 min-w-0">
        <h1 className="font-display text-[28px] font-medium tracking-[-0.025em] text-[var(--ink)] m-0 leading-[1.1] mb-[4px]">
          {meta.title}
        </h1>
        <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5] flex items-center flex-wrap">
          <span>{meta.metaText}</span>
          <NfcMetaPulse html={metaPulseHtml} />
        </div>
      </div>

      <div className="inline-flex gap-[8px] flex-wrap items-center flex-shrink-0">
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
              {action.icon === 'funnel' && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
              )}
              {action.icon === 'gear' && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              )}
              {action.icon === 'check' && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
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
