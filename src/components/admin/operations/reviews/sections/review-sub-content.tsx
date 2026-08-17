/**
 * Phase 13b-1 — §01 Review Content section.
 * Replaces ReviewSubPlaceholder for rev-section-content when contentData exists.
 *
 * admin.html markup: L37354-37396
 * admin.html CSS: L13394-13481 (.rv-content-card, .rcc-*, .hl-template)
 */
import { cn } from '@/lib/utils/cn';
import type {
  ReviewContentData,
  ReviewSectionStatus,
} from '@/lib/mock-data/admin/review-profiles-data';
import { RichInline } from './review-rich';

interface ReviewSubContentProps {
  data: ReviewContentData;
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

export function ReviewSubContent({ data, sectionStatus }: ReviewSubContentProps) {
  return (
    <section
      id="rev-section-content"
      className="py-[36px] border-t border-[var(--line)] scroll-mt-[80px] [&:first-child]:border-t-0 [&:first-child]:pt-[12px]"
    >
      {/* cd-section-head — L5676-5727 */}
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            01 · 06
          </span>
          <h2 className="font-display text-[24px] font-medium tracking-[-0.02em] leading-[1.1] [font-variation-settings:'opsz'_96] m-0">
            Review content
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

      {/* rv-content-card — L13394-13399 */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[24px] px-[28px]">

        {/* rcc-head — L13400-13409 */}
        <div className="flex items-center justify-between gap-[12px] flex-wrap mb-[14px] pb-[14px] border-b border-dashed border-[var(--line-soft)]">
          {/* rcc-byline — L13410-13415 */}
          <div className="flex items-center gap-[10px] min-w-0">
            {/* rcc-byline-avatar — L13416-13426 */}
            <span
              aria-hidden="true"
              className="w-[32px] h-[32px] rounded-full grid place-items-center font-display text-[11px] text-[var(--paper)] font-medium flex-shrink-0"
              style={{ background: data.byline.avatarGradient }}
            >
              {data.byline.avatarInitials}
            </span>
            {/* rcc-byline-text — L13427 */}
            <div className="min-w-0">
              {/* rcc-name — L13428-13433 */}
              <div className="text-[13.5px] font-semibold text-[var(--ink)] tracking-[-0.01em]">
                {data.byline.name}
                {data.byline.realChip && (
                  <span className="font-mono text-[9px] bg-[rgba(110,63,224,0.12)] text-[var(--super)] py-[1px] px-[5px] rounded-[3px] font-semibold tracking-[0.04em] align-[1px] ml-[4px]">
                    {data.byline.realChip}
                  </span>
                )}
              </div>
              {/* rcc-role — L13434-13440 */}
              <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[1px]">
                {data.byline.role}
              </div>
            </div>
          </div>

          {/* rv-stars lg danger — reuse star pattern from hero */}
          <div className="inline-flex items-center gap-[1px]">
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                aria-hidden="true"
                className={cn(
                  'text-[18px] leading-none',
                  i <= Math.round(data.rating)
                    ? 'text-[var(--danger)]'
                    : 'text-[var(--line-strong)]'
                )}
              >
                ★
              </span>
            ))}
            <span className="font-mono text-[14px] text-[var(--ink-soft)] ml-[6px] font-semibold">
              {data.ratingNum}
            </span>
          </div>
        </div>

        {/* rcc-headline — L13441-13449 */}
        <div className="font-display text-[20px] font-medium text-[var(--ink)] tracking-[-0.01em] leading-[1.25] mb-[12px]">
          {data.headline}
        </div>

        {/* rcc-body — L13450-13457 */}
        <div className="text-[14px] text-[var(--ink-soft)] leading-[1.65]">
          {data.paragraphs.map((para, idx) => (
            <p key={idx} className="mb-[10px] last:mb-0">
              <RichInline segments={para.segments} />
            </p>
          ))}

          {/* Footer meta paragraph — L37385 inline style */}
          <p className="font-mono text-[11px] text-[var(--ink-mute)] mt-[14px] mb-0">
            {data.footerMeta}
          </p>
        </div>

        {/* rcc-foot — L13458-13473 */}
        <div className="mt-[16px] pt-[14px] border-t border-dashed border-[var(--line-soft)] flex items-center justify-between gap-[12px] flex-wrap font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em]">
          {data.footStats.map((stat, idx) => (
            <span key={idx} className="inline-flex items-center gap-[5px]">
              {stat.bold ? (
                <strong className="text-[var(--ink-soft)] font-semibold">{stat.value}</strong>
              ) : (
                <span>{stat.value}</span>
              )}
              {stat.label}
            </span>
          ))}
          {data.dangerStat && (
            <span className="inline-flex items-center gap-[5px] text-[var(--danger)] font-semibold">
              {data.dangerStat.text}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
