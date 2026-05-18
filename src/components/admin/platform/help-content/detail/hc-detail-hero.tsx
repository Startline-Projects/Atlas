/* admin.html lines 63676-63726: hero — mono key + status pill + env meta + h1 title + subtitle + 6 locale tabs (reused from Step 32) + 2 actions */

import { HcStatusPill } from '../hc-status-pill';
import { TmLocaleTabs } from '@/components/admin/platform/templates/detail/tm-locale-tabs';
import type { HcDetailHero } from '@/lib/mock-data/admin/help-content-data';

interface HcDetailHeroProps {
  hero: HcDetailHero;
}

export function HcDetailHero({ hero }: HcDetailHeroProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] mb-[18px] py-[22px] px-[26px]">
      <div className="flex items-start gap-[18px] flex-wrap">
        {/* LEFT */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-[10px] mb-[8px] flex-wrap">
            <span className="font-mono text-[11.5px] text-[var(--ink-soft)] tracking-[0.02em] font-semibold">
              {hero.key}
            </span>
            <HcStatusPill status={hero.status} label={hero.statusLabel} />
            <span className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em]">
              {hero.envMetaText}
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
                {action.icon === 'external' && (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
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
