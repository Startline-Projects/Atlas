import type {
  ReviewProfile,
  ReviewStatus,
  ReviewStatusPillVariant,
  ReviewHeroStat,
  ReviewHeroBanner,
} from '@/lib/mock-data/admin/review-profiles-data';
import { cn } from '@/lib/utils/cn';
import { StarRating } from './reviews-table';

interface ReviewHeroProps {
  review: ReviewProfile;
}

// admin.html L13192-13202 — ::before 3px top bar, default success + data-status overrides
function topBarBg(status: ReviewStatus): string {
  switch (status) {
    case 'flagged': return 'var(--amber)';
    case 'pattern': return 'var(--danger)';
    case 'removed': return 'var(--ink-mute)';
    case 'appealed': return 'var(--super)';
    case 'live':
    default:
      return 'var(--success)'; // L13197 default
  }
}

function statusPillClass(v: ReviewStatusPillVariant): string {
  switch (v) {
    case 'rv-live': return 'bg-[var(--success-bg)] text-[var(--success)]';
    case 'rv-flagged': return 'bg-[var(--amber-bg)] text-[var(--amber)]';
    case 'rv-pattern': return 'bg-[var(--danger-bg)] text-[var(--danger)]';
    case 'rv-removed': return 'bg-[var(--cream-deep)] text-[var(--ink-mute)] line-through';
    case 'rv-appealed': return 'bg-[rgba(110,63,224,0.12)] text-[var(--super)]';
  }
}

function statusPillPrefix(v: ReviewStatusPillVariant): string | null {
  switch (v) {
    case 'rv-flagged': return '⚑';
    case 'rv-pattern': return '!';
    case 'rv-appealed': return '↩';
    default: return null;
  }
}

function directionChipClass(dir: 'cs' | 'cl'): string {
  return dir === 'cs'
    ? 'bg-[rgba(123,168,217,0.15)] text-[#3F6CA1]'
    : 'bg-[rgba(232,145,30,0.15)] text-[#B86C1A]';
}

function heroStatValueColor(c?: ReviewHeroStat['valueColor']): string {
  switch (c) {
    case 'danger': return 'text-[var(--danger)]';
    case 'warn': return 'text-[var(--amber)]';
    case 'success': return 'text-[var(--success)]';
    default: return 'text-[var(--ink)]';
  }
}

// admin.html L13352-77 — banner variants: 1px border + 3px border-LEFT colored stripe
function bannerVariantClass(v: ReviewHeroBanner['variant']): { bg: string; icon: string } {
  switch (v) {
    case 'danger':
      return { bg: 'bg-[var(--danger-bg)] border-[rgba(194,65,43,0.4)] border-l-[var(--danger)]', icon: 'text-[var(--danger)]' };
    case 'amber':
      return { bg: 'bg-[var(--amber-bg)] border-[rgba(232,118,58,0.4)] border-l-[var(--amber)]', icon: 'text-[var(--amber)]' };
    case 'success':
      return { bg: 'bg-[var(--success-bg)] border-[rgba(46,125,84,0.4)] border-l-[var(--success)]', icon: 'text-[var(--success)]' };
    case 'neutral':
      return { bg: 'bg-[var(--cream-deep)] border-[var(--line)] border-l-[var(--ink-mute)]', icon: 'text-[var(--ink-mute)]' };
  }
}

function StatTile({ stat }: { stat: ReviewHeroStat }) {
  return (
    // admin.html L13316-49 — rhs-stat: py-14 px-16 + 1px dashed line-soft right border + text-center
    <div className="py-[14px] px-[16px] border-r border-dashed border-[var(--line-soft)] text-center last:border-r-0">
      <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold mb-[4px]">
        {stat.label}
      </div>
      <div
        className={cn(
          // L13331-39 — rhs-value: 20px (NOT 18) tracking -0.02em line-height 1 tabular-nums
          'font-display text-[20px] font-medium tracking-[-0.02em] leading-[1] [font-variant-numeric:tabular-nums]',
          heroStatValueColor(stat.valueColor)
        )}
      >
        {stat.value}
      </div>
      {/* L13343-49 — rhs-meta: mono 9.5px ink-mute mt-4 */}
      <div className="font-mono text-[9.5px] tracking-[0.02em] text-[var(--ink-mute)] mt-[4px]">
        {stat.meta}
      </div>
    </div>
  );
}

export function ReviewHero({ review }: ReviewHeroProps) {
  const barBg = topBarBg(review.status);
  const banner = bannerVariantClass(review.banner.variant);

  return (
    <div
      data-status={review.status}
      className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] mb-[18px] relative overflow-hidden"
    >
      {/* admin.html L13192-13202 — ::before 3px top bar always present (default success + data-status overrides) */}
      <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: barBg }} />

      {/* admin.html L13204-11 — .rev-hero-top: padding 22 28 18, 1fr auto grid */}
      <div className="pt-[22px] px-[28px] pb-[18px] grid grid-cols-[1fr_auto] gap-[16px] items-start max-[720px]:grid-cols-1">
        <div className="min-w-0">
          {/* L13213-19 — meta row */}
          <div className="flex items-center gap-[10px] flex-wrap mb-[10px]">
            <span
              className={cn(
                'inline-flex items-center gap-[5px] py-[3px] pl-[8px] pr-[9px] rounded-full font-mono text-[9.5px] tracking-[0.1em] uppercase font-semibold whitespace-nowrap',
                statusPillClass(review.statusPillVariant)
              )}
            >
              {statusPillPrefix(review.statusPillVariant) && (
                <span aria-hidden="true" className="font-bold">{statusPillPrefix(review.statusPillVariant)}</span>
              )}
              {review.statusPillText}
            </span>
            <span
              className={cn(
                'inline-flex items-center gap-[4px] font-mono text-[9.5px] tracking-[0.10em] uppercase py-[2px] px-[6px] rounded-[3px] font-semibold whitespace-nowrap',
                directionChipClass(review.direction)
              )}
            >
              {review.directionChipLabel}
            </span>
            <span className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em]">
              {review.postedMetaLine}
            </span>
          </div>

          {/* L13220-32 — h1.rev-title: 26px medium -0.02em leading-1.2 mb-12; em italic font-weight 400 */}
          <h1 className="font-display text-[26px] font-medium tracking-[-0.02em] leading-[1.2] m-0 mb-[12px] text-[var(--ink)]">
            {review.title.prefix}
            <em className="italic font-normal">{review.title.italic}</em>
            {review.title.suffix}
          </h1>

          {/* L13233-73 — rev-hero-pair: flex gap-8 13px ink-soft */}
          <div className="flex items-center flex-wrap gap-[8px] text-[13px] text-[var(--ink-soft)]">
            {/* hp-party reviewer */}
            <span className="inline-flex items-center gap-[6px] font-semibold text-[var(--ink)]">
              <span
                aria-hidden="true"
                className="w-[22px] h-[22px] rounded-full grid place-items-center font-display text-[9px] text-[var(--paper)] font-medium tracking-[-0.01em] flex-shrink-0"
                style={{ background: review.reviewerHero.gradient }}
              >
                {review.reviewerHero.initials}
              </span>
              {review.reviewerHero.name}
              {review.reviewerHero.realChip && (
                <span className="font-mono text-[9px] tracking-[0.04em] bg-[rgba(110,63,224,0.12)] text-[var(--super)] py-[1px] px-[5px] rounded-[3px] font-semibold align-[1px] ml-[4px]">
                  {review.reviewerHero.realChip}
                </span>
              )}
            </span>
            {/* hp-arrow — L13259-67: mono 10px 0.16em uppercase ink-mute 600 padding 0 4px (NO bg, NO rounded) */}
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold px-[4px]">
              REVIEWING
            </span>
            {/* hp-party reviewee */}
            <span className="inline-flex items-center gap-[6px] font-semibold text-[var(--ink)]">
              <span
                aria-hidden="true"
                className="w-[22px] h-[22px] rounded-full grid place-items-center font-display text-[9px] text-[var(--paper)] font-medium tracking-[-0.01em] flex-shrink-0"
                style={{ background: review.revieweeHero.gradient }}
              >
                {review.revieweeHero.initials}
              </span>
              {review.revieweeHero.name}
              {review.revieweeHero.atlasChip && (
                <span className="font-mono text-[9px] bg-[var(--cream-deep)] text-[var(--ink-mute)] py-[1px] px-[5px] rounded-[3px] font-semibold align-[1px] ml-[4px] tracking-[0.04em]">
                  {review.revieweeHero.atlasChip}
                </span>
              )}
            </span>
            {/* hp-meta — L13268-73 */}
            <span className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] basis-full mt-[2px]">
              {review.engagementContextLine}
            </span>
          </div>
        </div>

        {/* L13287-94 — rev-hero-status: text-right flex-col items-end gap-6 */}
        <div className="text-right flex flex-col items-end gap-[6px] max-[720px]:items-start max-[720px]:text-left">
          {/* L13295-305 — id-mono */}
          <span className="font-mono text-[10.5px] bg-[var(--cream-deep)] text-[var(--ink-mute)] py-[3px] px-[8px] rounded-[3px] tracking-[0.04em] font-medium inline-block">
            {review.atlasId}
          </span>
          {/* rv-stars lg danger — L12997-99 */}
          <div className="inline-flex items-center gap-[1px]">
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                aria-hidden="true"
                className={cn(
                  'text-[18px] leading-none',
                  i <= Math.round(review.rating)
                    ? 'text-[var(--danger)]'
                    : 'text-[var(--line-strong)]'
                )}
              >
                ★
              </span>
            ))}
            <span className="font-mono text-[14px] text-[var(--ink-soft)] ml-[6px] font-semibold">
              {review.ratingNum}
            </span>
          </div>
        </div>
      </div>

      {/* L13307-49 — rev-hero-stats: 5-tile grid */}
      <div className="grid grid-cols-5 gap-0 border-t border-[var(--line)] bg-[var(--paper-deep)] max-[720px]:grid-cols-2">
        {review.heroStats.map((stat, idx) => (
          <StatTile key={idx} stat={stat} />
        ))}
      </div>

      {/* L13352-91 — rev-hero-banner: SEPARATE card with margin 0/28/18 + 1px border + 3px border-LEFT + r-sm */}
      <div
        className={cn(
          'mt-0 mb-[18px] mx-[28px] py-[14px] px-[18px] rounded-[var(--r-sm)] flex items-start gap-[12px] border border-l-[3px]',
          banner.bg
        )}
      >
        <span aria-hidden="true" className={cn('flex-shrink-0 pt-[1px]', banner.icon)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" />
            <line x1="12" y1="2" x2="12" y2="4" />
            <line x1="12" y1="20" x2="12" y2="22" />
          </svg>
        </span>
        <div className="min-w-0 text-[13px] text-[var(--ink)] leading-[1.5]">
          <strong className="font-semibold">{review.banner.title}</strong>
          <div className="font-mono text-[10.5px] text-[var(--ink-soft)] mt-[4px] tracking-[0.02em] leading-[1.55]">
            {review.banner.meta}
          </div>
        </div>
      </div>
    </div>
  );
}

// Re-export for any consumer
export { StarRating };
