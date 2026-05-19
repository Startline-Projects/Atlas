'use client';

/* admin.html lines 65503-65535: fr-page-head pattern — title + meta with meta-pulse + search + Audit + Compose dropdown */

import { IcmMetaPulse } from './icm-meta-pulse';
import { IcmComposeDropdown } from './icm-compose-dropdown';
import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';
import type {
  IcmPageMeta,
  IcmHeaderAction,
  IcmComposeOption,
} from '@/lib/mock-data/admin/communications-data';

interface IcmPageHeaderProps {
  meta: IcmPageMeta;
  metaPulseHtml: string;
  searchPlaceholder: string;
  actions: IcmHeaderAction[];
  composeOptions: IcmComposeOption[];
}

export function IcmPageHeader({
  meta,
  metaPulseHtml,
  searchPlaceholder,
  actions,
  composeOptions,
}: IcmPageHeaderProps) {
  const { showAction } = useAdminActionToast();

  return (
    <div className="flex items-start justify-between gap-[20px] mb-[18px] flex-wrap">
      {/* Left: title + meta + meta-pulse */}
      <div className="flex-1 min-w-0">
        <h1 className="font-display text-[28px] font-medium tracking-[-0.025em] text-[var(--ink)] m-0 leading-[1.1] mb-[4px]">
          {meta.title}
        </h1>
        <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5] flex items-center flex-wrap">
          <span>{meta.metaText}</span>
          <IcmMetaPulse html={metaPulseHtml} />
        </div>
      </div>

      {/* Right: search + Audit + Compose dropdown */}
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
          if (action.hasDropdown) {
            return <IcmComposeDropdown key={idx} options={composeOptions} />;
          }
          return (
            <button
              key={idx}
              type="button"
              onClick={() => showAction(`${action.label} — opening drawer`)}
              className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full border cursor-pointer transition-all whitespace-nowrap bg-[var(--paper)] border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:text-[var(--ink)]"
            >
              {action.icon === 'chart-line' && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 4 4 20 20 20" />
                  <polyline points="4 12 12 4 16 8 20 4" />
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
