'use client';

import Link from 'next/link';
import type { EngagementProfile } from '@/lib/mock-data/admin/engagement-profiles-data';
import { EngagementPairHero } from './engagement-pair-hero';
import { EngagementActionsRow } from './engagement-actions-row';
import { EngagementRail } from './engagement-rail';
import { EngSubContract } from './sections/eng-sub-contract';
import { EngSubTracker } from './sections/eng-sub-tracker';
import { EngSubPayments } from './sections/eng-sub-payments';
import { EngSubComm } from './sections/eng-sub-comm';
import { EngSubDisputes } from './sections/eng-sub-disputes';
import { EngSubParties } from './sections/eng-sub-parties';

interface EngagementDetailShellProps {
  engagement: EngagementProfile;
}

export function EngagementDetailShell({ engagement }: EngagementDetailShellProps) {
  return (
    // admin.html line 5158-5165: .cd-wrap — max-w 1400, padding 24/32/80, mobile 18/16/100
    <div className="w-full mx-auto max-w-[1400px] pt-[24px] px-[32px] pb-[80px] min-w-0 max-[720px]:px-[16px] max-[720px]:pt-[18px] max-[720px]:pb-[100px]">
      {/* admin.html line 21613: cd-back-row */}
      <div className="flex items-center justify-between gap-[14px] mb-[18px] flex-wrap">
        <Link
          href="/admin/operations/engagements"
          data-eng-action="back-to-list"
          className="inline-flex items-center gap-[6px] font-body text-[12.5px] text-[var(--ink-soft)] no-underline transition-colors duration-150 ease hover:text-[var(--ink)] [&>svg]:transition-transform [&>svg]:duration-150 hover:[&>svg]:-translate-x-[2px]"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to engagements
        </Link>
        {/* Breadcrumb */}
        <div className="font-mono text-[10.5px] tracking-[0.06em] text-[var(--ink-mute)] inline-flex items-center gap-[6px] flex-wrap">
          <span>/admin</span>
          <span className="text-[var(--line-strong)]">·</span>
          <span>operations</span>
          <span className="text-[var(--line-strong)]">·</span>
          <span>engagements</span>
          <span className="text-[var(--line-strong)]">·</span>
          <span className="text-[var(--ink)] font-semibold">{engagement.atlasId}</span>
        </div>
      </div>

      {/* Dual-party hero */}
      <EngagementPairHero engagement={engagement} />

      {/* Actions row */}
      <EngagementActionsRow engagementId={engagement.id} />

      {/* admin.html line 5455-5462: .cd-body — minmax(0,1fr) 280px, gap 32px (mobile gap 24px) */}
      <div className="grid grid-cols-[minmax(0,1fr)_280px] gap-[32px] items-start max-[1100px]:grid-cols-1 max-[1100px]:gap-[24px]">
        <main className="min-w-0">
          <EngSubContract engagement={engagement} />
          <EngSubTracker engagement={engagement} />
          <EngSubPayments engagement={engagement} />
          <EngSubComm engagement={engagement} />
          <EngSubDisputes engagement={engagement} />
          <EngSubParties engagement={engagement} />
        </main>

        <EngagementRail engagement={engagement} />
      </div>
    </div>
  );
}
