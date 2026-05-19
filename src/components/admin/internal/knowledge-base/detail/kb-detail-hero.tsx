'use client';

/* admin.html lines 66727-66755: fr-hero high — mono id + KbStatusPill Live·v6 + meta + h1 + rich subtitleHtml + 3 actions */

import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';
import type {
  KbDetailHero,
  KbDetailHeroIconKey,
} from '@/lib/mock-data/admin/knowledge-base-data';
import { KbStatusPill } from '../kb-status-pill';

interface KbDetailHeroProps {
  hero: KbDetailHero;
}

function renderIcon(key: KbDetailHeroIconKey | undefined) {
  if (key === 'link') {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    );
  }
  if (key === 'history') {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 4v6h6" />
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
      </svg>
    );
  }
  if (key === 'save') {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
        <polyline points="17 21 17 13 7 13 7 21" />
        <polyline points="7 3 7 8 15 8" />
      </svg>
    );
  }
  return null;
}

export function KbDetailHeroCard({ hero }: KbDetailHeroProps) {
  const { showAction } = useAdminActionToast();
  const handleAction = (label: string) => {
    if (label === 'Copy link') showAction('KB article link copied to clipboard');
    else if (label === 'Version history') showAction('Open version history drawer');
    else if (label === 'Save & publish v7')
      showAction('Save & publish v7 — audit logged');
    else showAction(label);
  };

  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] mb-[18px] py-[22px] px-[26px]">
      <div className="flex items-start gap-[18px] flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-[10px] mb-[8px] flex-wrap">
            <span className="font-mono text-[11.5px] text-[var(--ink-soft)] tracking-[0.08em] font-bold">
              {hero.id}
            </span>
            <KbStatusPill variant={hero.statusVariant} label={hero.statusLabel} />
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
                {renderIcon(action.iconKey)}
                {action.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
