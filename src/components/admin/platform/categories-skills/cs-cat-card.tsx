/* admin.html lines 60563-60606: full .cs-cat-card structure with head + stats + subs + foot */

import type { CsCategoryCard, CsCatStat, CsCatSub } from '@/lib/mock-data/admin/categories-skills-data';

interface CsCatCardProps {
  card: CsCategoryCard;
}

export function CsCatCard({ card }: CsCatCardProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-0 overflow-hidden transition-colors hover:border-[var(--line-strong)]">
      {/* Head: icon + name/meta + action */}
      <div className="flex items-center gap-[12px] py-[14px] px-[18px] border-b border-b-[var(--line-soft)] bg-gradient-to-r from-[var(--paper-deep)] to-[var(--paper)]">
        {/* Icon (36px gradient) */}
        <div
          className="w-[36px] h-[36px] rounded-[8px] grid place-items-center text-[var(--paper)] flex-shrink-0 font-display text-[13px] font-medium tracking-[-0.01em]"
          style={{ background: card.iconGradient }}
        >
          {card.iconInitials}
        </div>

        {/* Text: name + owner meta */}
        <div className="flex-1 min-w-0">
          <div className="font-display text-[16px] font-medium tracking-[-0.01em] text-[var(--ink)] mb-[2px] leading-[1.25]">
            {card.name}
          </div>
          <div
            className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold"
            dangerouslySetInnerHTML={{ __html: card.ownerHtml }}
          />
        </div>

        {/* Quick-open button */}
        <div className="inline-flex gap-[4px] flex-shrink-0">
          <button
            type="button"
            className="inline-flex items-center justify-center w-[28px] h-[28px] rounded-full text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] transition-colors"
            aria-label="Open"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Stats: 3 cells */}
      <div className="grid grid-cols-3 gap-0 border-b border-b-[var(--line-soft)]">
        {card.stats.map((stat, idx) => (
          <CsCatStatCell key={idx} stat={stat} isLast={idx === card.stats.length - 1} />
        ))}
      </div>

      {/* Sub-categories list */}
      <div className="py-[12px] px-[18px] flex flex-wrap gap-[5px]">
        <div className="w-full font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold mb-[6px]">
          SUB-CATEGORIES · {card.subCats.length}
        </div>
        {card.subCats.map((sub, idx) => (
          <CsCatSubChip key={idx} sub={sub} />
        ))}
      </div>

      {/* Footer: modified meta + audit link */}
      <div className="flex items-center justify-between gap-[10px] py-[10px] px-[18px] border-t border-t-[var(--line-soft)] bg-[var(--paper-deep)] font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] flex-wrap [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold [&_a]:text-[var(--super)] [&_a]:underline [&_a]:font-bold">
        <span
          dangerouslySetInnerHTML={{ __html: card.footerHtml }}
        />
        <a href="#" className="flex-shrink-0">
          audit →
        </a>
      </div>
    </div>
  );
}

interface CsCatStatCellProps {
  stat: CsCatStat;
  isLast: boolean;
}

function CsCatStatCell({ stat, isLast }: CsCatStatCellProps) {
  return (
    <div className={`py-[10px] px-[16px] ${!isLast ? 'border-r border-r-[var(--line-soft)]' : ''}`}>
      <div className="font-mono text-[8.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold mb-[3px]">
        {stat.label}
      </div>
      <div
        className={`font-display text-[18px] font-medium text-[var(--ink)] tracking-[-0.02em] leading-[1] tabular-nums ${
          stat.valueVariant === 'warn' ? 'text-[var(--amber)]' : stat.valueVariant === 'danger' ? 'text-[var(--danger)]' : ''
        }`}
      >
        {stat.value}
      </div>
      <div
        className={`inline-flex items-center gap-[2px] mt-[3px] font-mono text-[9px] font-bold tracking-[0.04em] ${
          stat.trend === 'up' ? 'text-[var(--success)]' : stat.trend === 'down' ? 'text-[var(--danger)]' : 'text-[var(--ink-mute)]'
        }`}
      >
        {stat.trendLabel}
      </div>
    </div>
  );
}

interface CsCatSubChipProps {
  sub: CsCatSub;
}

function CsCatSubChip({ sub }: CsCatSubChipProps) {
  return (
    <span className="inline-flex items-center gap-[5px] py-[4px] px-[9px] font-mono text-[10.5px] font-semibold tracking-[0.02em] bg-[var(--paper-deep)] border border-[var(--line)] rounded-[4px] text-[var(--ink-soft)]">
      {sub.name}
      <span className="text-[9px] font-bold text-[var(--ink-mute)] tracking-[0.04em]">
        {sub.count}
      </span>
    </span>
  );
}
