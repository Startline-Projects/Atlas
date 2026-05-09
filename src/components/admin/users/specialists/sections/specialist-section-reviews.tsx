'use client';

import type { SpecialistProfile } from '@/lib/mock-data/admin/specialist-profiles-data';
import { cn } from '@/lib/utils/cn';

interface SpecialistSectionReviewsProps {
  profile: SpecialistProfile;
}

type Reviews = NonNullable<SpecialistProfile['reviews']>;
type ReviewCycle = Reviews['cycles'][number];
type ReviewComment = NonNullable<ReviewCycle['comments']>[number];

// admin.html line 7849: rating-stars amber (filled) + line-strong empty
function RatingStars({ filled }: { filled: number }) {
  const empty = Math.max(0, 5 - filled);
  return (
    <span className="text-[var(--amber)] text-[14px] tracking-[1px]">
      {'★'.repeat(filled)}
      {empty > 0 && <span className="text-[var(--line-strong)]">{'★'.repeat(empty)}</span>}
    </span>
  );
}

// admin.html lines 7861-7876 — comment block (mono uppercase author + display italic text)
function CommentBlockView({ comment }: { comment: ReviewComment }) {
  return (
    <div>
      {/* admin.html line 7861: c-author */}
      <div className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold mb-[6px]">
        {comment.authorRole} · {comment.authorName}
      </div>
      {/* admin.html line 7870: c-text — display font, italic, ink-soft */}
      <div className="font-display text-[12.5px] leading-[1.5] text-[var(--ink-soft)] italic">
        {comment.text}
      </div>
    </div>
  );
}

// admin.html lines 7784-7876 — review card (latest variant adds ink border + shadow + comments grid)
function ReviewCardView({ cycle }: { cycle: ReviewCycle }) {
  const isLatest = cycle.isLatest === true;
  return (
    // admin.html line 7784: sp-review-card (paper bg + line border + r-md + 16/18 padding + 10mb)
    <div
      className={cn(
        'bg-[var(--paper)] border rounded-[var(--r-md)] px-[18px] py-[16px] mb-[10px]',
        isLatest
          ? 'border-[var(--ink)] shadow-[var(--shadow-card)]'
          : 'border-[var(--line)]'
      )}
    >
      {/* admin.html line 7792: sp-review-head — flex baseline space-between */}
      <div className="flex items-baseline justify-between gap-[12px] mb-[10px] flex-wrap">
        {/* admin.html line 7800: r-quarter — display 16px */}
        <span className="font-display text-[16px] font-medium tracking-[-0.01em]">
          {cycle.quarter}
          {isLatest && (
            // admin.html line 7806: latest-tag — lime bg + ink + 9px mono uppercase + vertical-align 3px
            <span
              className="font-mono text-[9px] tracking-[0.14em] uppercase bg-[var(--lime)] text-[var(--ink)] py-[2px] px-[7px] rounded-[3px] font-semibold ml-[8px]"
              style={{ verticalAlign: '3px' }}
            >
              Latest
            </span>
          )}
        </span>
        {/* admin.html line 7819: r-meta — mono 11px ink-mute */}
        <span className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">
          {cycle.meta}
        </span>
      </div>

      {/* admin.html line 7825: sp-review-rating — flex/center + dashed bottom */}
      <div
        className={cn(
          'flex items-center gap-[14px] pb-[12px] border-b border-dashed border-[var(--line-soft)]',
          isLatest ? 'mb-[12px]' : 'mb-0 pb-0 border-b-0'
        )}
      >
        {/* admin.html line 7833: rating-label — mono 10px uppercase mute */}
        <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold">
          {cycle.ratingLabel}
        </span>
        {/* admin.html line 7841: rating-value — display 15px (success when high) */}
        <span
          className={cn(
            'font-display text-[15px] font-medium tracking-[-0.01em]',
            cycle.ratingHigh ? 'text-[var(--success)]' : 'text-[var(--ink)]'
          )}
        >
          {cycle.ratingValue}
        </span>
        <RatingStars filled={cycle.starsFilled} />
      </div>

      {/* admin.html line 7855: sp-review-comments — 2-col grid, 1-col below 720px */}
      {isLatest && cycle.comments && cycle.comments.length > 0 && (
        <div className="grid grid-cols-2 gap-[14px] max-[720px]:grid-cols-1">
          {cycle.comments.map((comment, idx) => (
            <CommentBlockView key={idx} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}

export function SpecialistSectionReviews({ profile }: SpecialistSectionReviewsProps) {
  const reviews = profile.reviews;
  if (!reviews) {
    return null;
  }

  const { sectionStatus, cycles, initiateLabel, emptyState } = reviews;

  return (
    // admin.html line 18951: <section id="sp-section-reviews">
    <section
      id="sp-section-reviews"
      className="border-t border-[var(--line)] py-[36px] scroll-mt-[80px]"
    >
      {/* Section header — admin.html lines 18952-18958 */}
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            06 · 08
          </span>
          <h2 className="font-display [font-variation-settings:'opsz'_96] text-[24px] font-medium tracking-[-0.02em] leading-[1.1]">
            Performance review history
          </h2>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[0.14em] uppercase font-semibold pt-[3px] pb-[3px] pl-[8px] pr-[9px] rounded-full before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-[currentColor]",
            sectionStatus.variant === 'warn'
              ? 'bg-[var(--amber-bg)] text-[var(--amber)]'
              : sectionStatus.variant === 'danger'
                ? 'bg-[var(--danger-bg)] text-[var(--danger)]'
                : sectionStatus.variant === 'neutral'
                  ? 'bg-[var(--cream-deep)] text-[var(--ink-soft)]'
                  : 'bg-[var(--success-bg)] text-[var(--success)]'
          )}
        >
          {sectionStatus.label}
        </span>
      </div>

      {cycles.length === 0 && emptyState ? (
        <div className="bg-[var(--paper)] border border-dashed border-[var(--line)] rounded-[var(--r-md)] p-[40px] text-center">
          <div className="font-display [font-variation-settings:'opsz'_48] text-[18px] font-medium text-[var(--ink)] mb-[6px]">
            {emptyState.title}
          </div>
          <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.06em]">
            {emptyState.detail}
          </div>
        </div>
      ) : (
        <>
          {cycles.map((cycle, idx) => (
            <ReviewCardView key={idx} cycle={cycle} />
          ))}

          {/* admin.html lines 19020-19025 — Initiate Q2 2026 review (cd-action-btn warn) */}
          {initiateLabel && (
            <div className="mt-[14px]">
              <button
                type="button"
                data-sp-action="initiate-review"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    // eslint-disable-next-line no-console
                    console.log(`[specialist-reviews] initiate clicked: ${initiateLabel}`);
                  }
                }}
                className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[rgba(232,118,58,0.3)] rounded-full text-[var(--amber)] cursor-pointer transition-all duration-[150ms] ease whitespace-nowrap hover:bg-[var(--amber-bg)] hover:border-[var(--amber)] [&>svg]:flex-shrink-0"
              >
                {/* Star polygon — admin.html line 19022 */}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                {initiateLabel}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
