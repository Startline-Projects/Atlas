'use client';

import Link from 'next/link';
import type { ReviewProfile } from '@/lib/mock-data/admin/review-profiles-data';
import { ReviewHero } from './review-hero';
import { ReviewActionsRow } from './review-actions-row';
import { ReviewRail } from './review-rail';
import { ReviewSubContent } from './sections/review-sub-content';
import { ReviewSubContext } from './sections/review-sub-context';
import { ReviewSubPattern } from './sections/review-sub-pattern';
import { ReviewSubFlags } from './sections/review-sub-flags';
import { ReviewSubModeration } from './sections/review-sub-moderation';
import { ReviewSubAudit } from './sections/review-sub-audit';

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

      {/* 2-col body: main + right rail (cd-body 280/32) — matches engagement/dispute/candidate shell structure for working sticky rail. */}
      <div className="grid grid-cols-[minmax(0,1fr)_280px] gap-[32px] items-start max-[1100px]:grid-cols-1 max-[1100px]:gap-[24px]">
        <main className="min-w-0">
          {/* All 6 sections always render — every review has populated data via REV_834 canonical or stubReviewProfile derived stubs. §03/§04 handle their own clean empty states. */}
          {review.contentData && (
            <ReviewSubContent data={review.contentData} sectionStatus={review.sections.content} />
          )}
          {review.contextData && (
            <ReviewSubContext data={review.contextData} sectionStatus={review.sections.context} />
          )}
          <ReviewSubPattern
            {...(review.patternData ? { data: review.patternData } : {})}
            sectionStatus={review.sections.pattern}
            reviewId={review.id}
          />
          {review.flagsData && (
            <ReviewSubFlags data={review.flagsData} sectionStatus={review.sections.flags} />
          )}
          {review.moderationData && (
            <ReviewSubModeration data={review.moderationData} sectionStatus={review.sections.moderation} />
          )}
          {review.auditData && (
            <ReviewSubAudit data={review.auditData} sectionStatus={review.sections.audit} />
          )}
        </main>

        <ReviewRail review={review} />
      </div>
    </div>
  );
}
