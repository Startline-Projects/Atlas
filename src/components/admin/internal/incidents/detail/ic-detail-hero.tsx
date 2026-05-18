'use client';

/* admin.html lines 65141-65171: fr-hero high — id row (mono id + IcSev + IcStatus + meta) + h1 + subtitle + 3 hero actions */

import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';
import type {
  IcDetailHero,
  IcDetailHeroAction,
} from '@/lib/mock-data/admin/internal-incidents-data';
import { IcSevBadge } from '../ic-sev-badge';
import { IcStatusPill } from '../ic-status-pill';

interface IcDetailHeroProps {
  hero: IcDetailHero;
}

function renderIcon(icon: IcDetailHeroAction['icon']) {
  if (icon === 'copy') {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    );
  }
  if (icon === 'download') {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    );
  }
  if (icon === 'external') {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    );
  }
  return null;
}

export function IcDetailHeroCard({ hero }: IcDetailHeroProps) {
  const { showAction } = useAdminActionToast();

  const handleAction = (label: string) => {
    if (label === 'Copy report link') showAction('Incident report link copied to clipboard');
    else if (label === 'Export PDF') showAction('Generating incident PDF — audit logged');
    else if (label.startsWith('#inc-')) showAction(`Open Slack archive ${label}`);
    else showAction(label);
  };

  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] mb-[18px] py-[22px] px-[26px]">
      <div className="flex items-start gap-[18px] flex-wrap">
        {/* LEFT */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-[10px] mb-[8px] flex-wrap">
            <span className="font-mono text-[11.5px] text-[var(--ink-soft)] tracking-[0.08em] font-bold">
              {hero.id}
            </span>
            <IcSevBadge sev={hero.sev} />
            <IcStatusPill status={hero.status} label={hero.statusLabel} />
            <span className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em]">
              {hero.metaText}
            </span>
          </div>
          <h1 className="font-display text-[22px] font-medium tracking-[-0.02em] text-[var(--ink)] m-0 mb-[8px] leading-[1.2]">
            {hero.title}
          </h1>
          <div
            className="font-body text-[13px] text-[var(--ink-soft)] tracking-[-0.005em] leading-[1.55] max-w-[640px] [&_a]:text-[var(--super)] [&_a]:underline [&_a]:font-bold [&_a]:cursor-pointer [&_strong]:text-[var(--ink)] [&_strong]:font-bold [&_code]:font-mono [&_code]:text-[11.5px] [&_code]:bg-[var(--paper-deep)] [&_code]:py-[1px] [&_code]:px-[5px] [&_code]:rounded-[3px] [&_code]:text-[var(--ink)]"
            dangerouslySetInnerHTML={{ __html: hero.subtitleHtml }}
          />
        </div>

        {/* RIGHT actions */}
        <div className="inline-flex items-center gap-[8px] flex-wrap flex-shrink-0">
          {hero.actions.map((action, idx) => {
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
                {renderIcon(action.icon)}
                {action.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
