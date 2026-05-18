/* admin.html lines 61966-61995: fr-hero high — logo + name + status + env meta + h1 title + subtitle + actions */

import { IntStatusPill } from '../int-status-pill';
import { IntEnvToggle } from './int-env-toggle';
import type { IntDetailHero, IntegrationStatus } from '@/lib/mock-data/admin/integrations-data';

interface IntDetailHeroProps {
  hero: IntDetailHero;
  name: string;
}

const HERO_SHELL: Record<IntegrationStatus, string> = {
  connected: 'border-[rgba(232,118,58,0.35)]',
  error: 'border-[rgba(194,65,43,0.4)]',
  warn: 'border-[rgba(232,118,58,0.35)]',
  disconnected: 'border-[var(--line)]',
};

const HERO_ACCENT: Partial<Record<IntegrationStatus, string>> = {
  connected: 'bg-[var(--amber)]',
  error: 'bg-[var(--danger)]',
  warn: 'bg-[var(--amber)]',
};

export function IntDetailHero({ hero, name }: IntDetailHeroProps) {
  const accent = HERO_ACCENT[hero.status];

  return (
    <div
      className={`relative overflow-hidden bg-[var(--paper)] border rounded-[var(--r-md)] mb-[18px] py-[22px] px-[26px] ${HERO_SHELL[hero.status]}`}
    >
      {accent && (
        <span className={`absolute top-0 left-0 right-0 h-[3px] ${accent}`} aria-hidden="true" />
      )}
      <div className="flex items-start gap-[18px] flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-[10px] mb-[8px] flex-wrap">
            <div
              className="w-[32px] h-[32px] rounded-[6px] grid place-items-center font-display text-[14px] font-bold text-[var(--paper)] flex-shrink-0 tracking-[-0.01em]"
              style={{ background: hero.logoGradient }}
            >
              {hero.initials}
            </div>
            <span className="font-display text-[15px] font-medium text-[var(--ink)] tracking-[-0.01em]">
              {name}
            </span>
            <IntStatusPill status={hero.status} label={hero.statusLabel} />
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
        <div className="inline-flex items-center gap-[8px] flex-wrap flex-shrink-0">
          <IntEnvToggle options={hero.envToggle} />
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
                {action.icon === 'play' && (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
                {action.icon === 'external' && (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
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
