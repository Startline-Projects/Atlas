'use client';

/* admin.html lines 66162-66189: fr-page-head — title + meta with meta-pulse + search + 3 actions (Audit / Verification queue / New SOP primary) */

import { KbMetaPulse } from './kb-meta-pulse';
import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';
import type {
  KbPageMeta,
  KbHeaderAction,
} from '@/lib/mock-data/admin/knowledge-base-data';

interface KbPageHeaderProps {
  meta: KbPageMeta;
  metaPulseHtml: string;
  searchPlaceholder: string;
  actions: KbHeaderAction[];
}

export function KbPageHeader({
  meta,
  metaPulseHtml,
  searchPlaceholder,
  actions,
}: KbPageHeaderProps) {
  const { showAction } = useAdminActionToast();
  const handleAction = (label: string) => {
    if (label === 'Audit') showAction('Open KB audit log');
    else if (label === 'Verification queue')
      showAction('Open re-verification queue (7 aging docs)');
    else if (label === 'New SOP') showAction('Open new SOP editor');
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
          <KbMetaPulse html={metaPulseHtml} />
        </div>
      </div>

      <div className="inline-flex gap-[8px] flex-wrap items-center flex-shrink-0">
        <div className="inline-flex items-center gap-[6px] bg-[var(--paper)] border border-[var(--line)] rounded-full py-[6px] px-[12px] max-w-[240px]">
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
              {action.icon === 'check' && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
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
