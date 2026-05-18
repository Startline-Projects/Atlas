/* admin.html lines 62740-62790: detail hero — mono key + status pill + env meta + h1 title + subtitle + locale tabs + 2 actions */

import { TmStatusPill } from '../tm-status-pill';
import { TmLocaleTabs } from './tm-locale-tabs';
import type { TmDetailHero } from '@/lib/mock-data/admin/templates-data';

interface TmDetailHeroProps {
  hero: TmDetailHero;
}

export function TmDetailHero({ hero }: TmDetailHeroProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] mb-[18px] py-[22px] px-[26px]">
      <div className="flex items-start gap-[18px] flex-wrap">
        {/* LEFT */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-[10px] mb-[8px] flex-wrap">
            <span className="font-mono text-[12px] font-medium text-[var(--ink)] tracking-[0.02em]">
              {hero.key}
            </span>
            <TmStatusPill status={hero.status} label={hero.statusLabel} />
            <span className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em]">
              {hero.envMetaText}
            </span>
          </div>
          <h1 className="font-display text-[22px] font-medium tracking-[-0.02em] text-[var(--ink)] m-0 mb-[8px] leading-[1.2]">
            {hero.title}
          </h1>
          <div
            className="font-body text-[13px] text-[var(--ink-soft)] tracking-[-0.005em] leading-[1.55] max-w-[640px] [&_a]:text-[var(--super)] [&_a]:underline [&_a]:font-bold [&_a]:cursor-pointer [&_strong]:text-[var(--ink)] [&_strong]:font-bold"
            dangerouslySetInnerHTML={{ __html: hero.subtitleHtml }}
          />
        </div>

        {/* RIGHT: locale tabs + 2 actions */}
        <div className="inline-flex items-center gap-[8px] flex-wrap flex-shrink-0">
          <TmLocaleTabs tabs={hero.localeTabs} />
          {hero.actions.map((action, idx) => {
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
                {action.icon === 'eye' && (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
                {action.icon === 'save' && (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                )}
                {action.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
