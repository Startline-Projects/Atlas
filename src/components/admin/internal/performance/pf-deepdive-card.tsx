/* admin.html lines 64742-64841: pf-deepdive card (top + improving variants) — head with avatar/identity/score + body with stat rows + foot prose */

import type { PfDeepDiveCard, PfBarVariant } from '@/lib/mock-data/admin/performance-data';

interface PfDeepDiveCardProps {
  card: PfDeepDiveCard;
}

function barFillClass(variant: PfBarVariant): string {
  return variant === 'high'
    ? 'bg-[var(--success)]'
    : variant === 'medium'
    ? 'bg-[var(--amber)]'
    : 'bg-[var(--danger)]';
}

export function PfDeepDiveCardComponent({ card }: PfDeepDiveCardProps) {
  const isTop = card.variant === 'top';
  const borderClass = isTop ? 'border-[var(--success)]' : 'border-[var(--amber)]';
  const headGradient = isTop
    ? 'bg-gradient-to-r from-[var(--success-bg)] to-[var(--paper)]'
    : 'bg-gradient-to-r from-[var(--amber-bg)] to-[var(--paper)]';
  const eyebrowColor = isTop ? 'text-[var(--success)]' : 'text-[var(--amber)]';
  const scoreColor = isTop ? 'text-[var(--success)]' : 'text-[var(--amber)]';

  return (
    <div className={`bg-[var(--paper)] border rounded-[var(--r-md)] overflow-hidden ${borderClass}`}>
      {/* Head */}
      <div className={`flex items-center gap-[14px] py-[16px] px-[20px] border-b border-b-[var(--line-soft)] ${headGradient}`}>
        <div
          className="w-[44px] h-[44px] rounded-full grid place-items-center font-display text-[17px] font-medium text-[var(--paper)] flex-shrink-0 tracking-[-0.01em]"
          style={{ background: card.avatarGradient }}
        >
          {card.avatarInitials}
        </div>
        <div className="flex-1 min-w-0">
          <div className={`font-mono text-[9px] tracking-[0.14em] uppercase font-bold mb-[3px] ${eyebrowColor}`}>
            {card.eyebrow}
          </div>
          <h3 className="font-display text-[17px] font-medium tracking-[-0.015em] text-[var(--ink)] m-0 mb-[2px] leading-[1.2]">
            {card.name}
          </h3>
          <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em]">
            {card.metaText}
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className={`font-display text-[28px] font-medium tracking-[-0.025em] leading-[1] tabular-nums ${scoreColor}`}>
            {card.scoreValue}
          </div>
          <div className="font-mono text-[9px] tracking-[0.12em] uppercase text-[var(--ink-mute)] font-bold mt-[4px]">
            {card.scoreLabel}
          </div>
        </div>
      </div>

      {/* Body — stat rows */}
      <div className="py-[14px] px-[20px] pb-[16px]">
        {card.stats.map((row, idx) => (
          <div
            key={idx}
            className="grid grid-cols-[130px_minmax(0,1fr)_auto] gap-[10px] items-center py-[8px] border-b border-b-dashed border-b-[var(--line-soft)] last:border-b-0"
          >
            <div className="font-mono text-[10px] tracking-[0.06em] uppercase text-[var(--ink-mute)] font-bold">
              {row.label}
            </div>
            <div className="h-[6px] bg-[var(--paper-deep)] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${barFillClass(row.variant)}`}
                style={{ width: `${row.percent}%` }}
              />
            </div>
            <div className="font-mono text-[11.5px] font-bold text-[var(--ink)] tracking-[0.02em] tabular-nums text-right">
              {row.value}
            </div>
          </div>
        ))}
      </div>

      {/* Foot */}
      <div
        className="py-[12px] px-[20px] bg-[var(--paper-deep)] border-t border-t-[var(--line-soft)] font-mono text-[10.5px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.6] [&_strong]:text-[var(--ink)] [&_strong]:font-bold"
        dangerouslySetInnerHTML={{ __html: card.footHtml }}
      />
    </div>
  );
}
