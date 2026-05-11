/**
 * Phase 13b-1 — §02 Engagement Context section.
 * Replaces ReviewSubPlaceholder for rev-section-context when contextData exists.
 *
 * admin.html markup: L37401-37458
 * admin.html CSS: L10328-10396 (.eng-linked-grid, .eng-linked-card)
 *
 * NOTE: The review variant uses a FLAT card structure (lk-tag/lk-title/lk-meta/lk-detail/lk-arrow)
 * instead of the engagement's avatar-based 3-col grid (lk-avatar/lk-info/lk-arrow).
 * lk-tag, lk-title, lk-detail have NO CSS in admin.html — Tailwind treatment derived from
 * visual equivalents (.lk-role, .lk-name) + semantic intent.
 */
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import type {
  ReviewContextData,
  ReviewContextCard,
  ReviewSectionStatus,
} from '@/lib/mock-data/admin/review-profiles-data';

interface ReviewSubContextProps {
  data: ReviewContextData;
  sectionStatus: ReviewSectionStatus;
}

function statusPillClass(v: ReviewSectionStatus['statusVariant']): string {
  switch (v) {
    case 'warn': return 'bg-[var(--amber-bg)] text-[var(--amber)]';
    case 'danger': return 'bg-[var(--danger-bg)] text-[var(--danger)]';
    case 'neutral': return 'bg-[var(--cream-deep)] text-[var(--ink-mute)]';
    case 'default':
    default: return 'bg-[var(--cream-deep)] text-[var(--ink-soft)]';
  }
}

function chipColorClass(color: 'super' | 'mute'): string {
  return color === 'super' ? 'text-[var(--super)]' : 'text-[var(--ink-mute)]';
}

function ContextCard({ card }: { card: ReviewContextCard }) {
  return (
    <Link
      href={card.href}
      data-rev-action={card.actionKey}
      className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[16px] px-[18px] no-underline text-inherit cursor-pointer transition-[background,border-color] duration-[120ms] ease hover:bg-[#FCF9F1] hover:border-[var(--line-strong)] group relative block"
    >
      <div className="pr-[32px]">
        {/* lk-tag — matches .lk-role L10364-10371 visual pattern */}
        <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold mb-[2px]">
          {card.tag}
        </div>

        {/* lk-title — matches .lk-name L10373-10381 */}
        <div className="text-[14px] font-semibold text-[var(--ink)] tracking-[-0.01em] mb-[2px]">
          {card.title}
          {card.titleChip && (
            <span
              className={cn(
                'font-mono text-[11px] font-semibold align-[2px] ml-[6px]',
                chipColorClass(card.titleChip.color)
              )}
            >
              {card.titleChip.text}
            </span>
          )}
        </div>

        {/* lk-meta — L10383-10391 */}
        <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] whitespace-nowrap overflow-hidden text-ellipsis">
          {card.meta}
        </div>

        {/* lk-detail — proposed: stacked detail bullets */}
        <div className="flex flex-col gap-[4px] mt-[10px] pt-[10px] border-t border-dashed border-[var(--line-soft)]">
          {card.details.map((detail, idx) => (
            <span
              key={idx}
              className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.01em] leading-[1.5]"
            >
              <strong className="text-[var(--ink)] font-semibold">{detail.strongLabel}</strong>{' '}
              {detail.text}
            </span>
          ))}
        </div>
      </div>

      {/* lk-arrow — L10392-10396 */}
      <span
        aria-hidden="true"
        className="absolute right-[18px] top-[16px] text-[var(--ink-mute)] flex-shrink-0 transition-colors duration-[120ms] ease group-hover:text-[var(--ink)]"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </span>
    </Link>
  );
}

export function ReviewSubContext({ data, sectionStatus }: ReviewSubContextProps) {
  return (
    <section
      id="rev-section-context"
      className="py-[36px] border-t border-[var(--line)] scroll-mt-[80px] [&:first-child]:border-t-0 [&:first-child]:pt-[12px]"
    >
      {/* cd-section-head — L5676-5727 */}
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            02 · 06
          </span>
          <h2 className="font-display text-[24px] font-medium tracking-[-0.02em] leading-[1.1] [font-variation-settings:'opsz'_96] m-0">
            Engagement context
          </h2>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[0.14em] uppercase font-semibold py-[3px] pl-[8px] pr-[9px] rounded-full before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current",
            statusPillClass(sectionStatus.statusVariant)
          )}
        >
          {sectionStatus.statusText}
        </span>
      </div>

      {/* eng-linked-grid — L10328-10333, mb-0 override per L37410 */}
      <div className="grid grid-cols-2 gap-[12px] max-[720px]:grid-cols-1 mb-0">
        {data.cards.map((card) => (
          <ContextCard key={card.actionKey} card={card} />
        ))}
      </div>
    </section>
  );
}
