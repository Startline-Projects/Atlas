'use client';

import Link from 'next/link';
import type { ReviewProfile } from '@/lib/mock-data/admin/review-profiles-data';
import { ReviewHero } from './review-hero';
import { ReviewActionsRow } from './review-actions-row';
import { ReviewRail } from './review-rail';
import { ReviewSubPlaceholder } from './sections/review-sub-placeholder';
import { ReviewSubContent } from './sections/review-sub-content';
import { ReviewSubContext } from './sections/review-sub-context';
import { ReviewSubPattern } from './sections/review-sub-pattern';
import { ReviewSubFlags } from './sections/review-sub-flags';
import { ReviewSubModeration } from './sections/review-sub-moderation';

interface ReviewDetailShellProps {
  review: ReviewProfile;
}

export function ReviewDetailShell({ review }: ReviewDetailShellProps) {
  return (
    // .cd-wrap — 1400px
    <div className="w-full mx-auto max-w-[1400px] pt-[24px] px-[32px] pb-[80px] min-w-0 max-[720px]:px-[16px] max-[720px]:pt-[18px] max-[720px]:pb-[100px]">
      {/* Back row + breadcrumb */}
      <div className="flex items-center justify-between gap-[14px] mb-[18px] flex-wrap">
        <Link
          href="/admin/operations/reviews"
          data-rev-action="back-to-list"
          className="inline-flex items-center gap-[6px] font-body text-[12.5px] text-[var(--ink-soft)] no-underline transition-colors duration-150 ease hover:text-[var(--ink)] [&>svg]:transition-transform [&>svg]:duration-150 hover:[&>svg]:-translate-x-[2px]"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to reviews
        </Link>
        <div className="font-mono text-[10.5px] tracking-[0.06em] text-[var(--ink-mute)] inline-flex items-center gap-[6px] flex-wrap">
          <span>/admin</span>
          <span className="text-[var(--line-strong)]">·</span>
          <span>operations</span>
          <span className="text-[var(--line-strong)]">·</span>
          <span>reviews</span>
          <span className="text-[var(--line-strong)]">·</span>
          <span className="text-[var(--ink)] font-semibold">{review.atlasId}</span>
        </div>
      </div>

      <ReviewHero review={review} />
      <ReviewActionsRow reviewId={review.id} />

      {/* 2-col body: main + right rail (cd-body 280/32). main:min-h-screen guarantees grid row >= viewport so rail's sticky has scroll room even during Phase 13a placeholders. Harmless once Phase 13b real sections make main taller naturally. */}
      <div className="grid grid-cols-[minmax(0,1fr)_280px] gap-[32px] items-start max-[1100px]:grid-cols-1 max-[1100px]:gap-[24px]">
        <main className="min-w-0 min-h-screen">
          {review.contentData ? (
            <ReviewSubContent data={review.contentData} sectionStatus={review.sections.content} />
          ) : (
            <ReviewSubPlaceholder
              sectionId="rev-section-content"
              num="01 · 06"
              title="Review content"
              statusText={review.sections.content.statusText}
              statusVariant={review.sections.content.statusVariant}
              phase="13b"
            />
          )}
          {review.contextData ? (
            <ReviewSubContext data={review.contextData} sectionStatus={review.sections.context} />
          ) : (
            <ReviewSubPlaceholder
              sectionId="rev-section-context"
              num="02 · 06"
              title="Engagement context"
              statusText={review.sections.context.statusText}
              statusVariant={review.sections.context.statusVariant}
              phase="13b"
            />
          )}
          {review.patternData ? (
            <ReviewSubPattern data={review.patternData} sectionStatus={review.sections.pattern} reviewId={review.id} />
          ) : (
            <ReviewSubPlaceholder
              sectionId="rev-section-pattern"
              num="03 · 06"
              title="Pattern detection"
              statusText={review.sections.pattern.statusText}
              statusVariant={review.sections.pattern.statusVariant}
              phase="13b"
            />
          )}
          {review.flagsData ? (
            <ReviewSubFlags data={review.flagsData} sectionStatus={review.sections.flags} />
          ) : (
            <ReviewSubPlaceholder
              sectionId="rev-section-flags"
              num="04 · 06"
              title="Reports & flags"
              statusText={review.sections.flags.statusText}
              statusVariant={review.sections.flags.statusVariant}
              phase="13b"
            />
          )}
          {review.moderationData ? (
            <ReviewSubModeration data={review.moderationData} sectionStatus={review.sections.moderation} />
          ) : (
            <ReviewSubPlaceholder
              sectionId="rev-section-moderation"
              num="05 · 06"
              title="Moderation history"
              statusText={review.sections.moderation.statusText}
              statusVariant={review.sections.moderation.statusVariant}
              phase="13b"
            />
          )}
          <ReviewSubPlaceholder
            sectionId="rev-section-audit"
            num="06 · 06"
            title="Admin audit log"
            statusText={review.sections.audit.statusText}
            statusVariant={review.sections.audit.statusVariant}
            phase="13b"
          />
        </main>

        <ReviewRail review={review} />
      </div>
    </div>
  );
}
