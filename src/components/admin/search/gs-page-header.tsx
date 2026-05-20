'use client';

/* admin.html lines 67496-67525: fr-page-head — h1 "Search results" + inline query pill + meta with meta-pulse + 3 actions */

import { GsQueryPill } from './gs-query-pill';
import { GsMetaPulse } from './gs-meta-pulse';
import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';
import type {
  GsPageMeta,
  GsHeaderAction,
} from '@/lib/mock-data/admin/search-results-data';

interface GsPageHeaderProps {
  meta: GsPageMeta;
  metaPulseHtml: string;
  query: string;
  actions: GsHeaderAction[];
}

export function GsPageHeader({
  meta,
  metaPulseHtml,
  query,
  actions,
}: GsPageHeaderProps) {
  const { showAction } = useAdminActionToast();
  const handleAction = (label: string) => {
    if (label === 'Advanced filters') showAction('Open advanced search filters');
    else if (label === 'Save search') showAction(`Saved search "${query}"`);
    else if (label === 'Export results') showAction('Export 18 results — CSV');
    else showAction(label);
  };

  return (
    <div className="flex items-start justify-between gap-[20px] mb-[18px] flex-wrap">
      <div className="flex-1 min-w-0">
        <h1 className="font-display text-[28px] font-medium tracking-[-0.025em] text-[var(--ink)] m-0 leading-[1.1] mb-[4px] flex items-center flex-wrap">
          {meta.title}
          {query && <GsQueryPill query={query} />}
        </h1>
        <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5] flex items-center flex-wrap [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold">
          <span dangerouslySetInnerHTML={{ __html: meta.metaHtml }} />
          <GsMetaPulse html={metaPulseHtml} />
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
              {action.icon === 'bookmark' && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
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
