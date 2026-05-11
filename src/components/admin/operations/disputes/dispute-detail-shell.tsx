'use client';

import Link from 'next/link';
import type { DisputeProfile } from '@/lib/mock-data/admin/dispute-profiles-data';
import { DisputeHero } from './dispute-hero';
import { DisputeStageTracker } from './dispute-stage-tracker';
import { DisputeActionsRow } from './dispute-actions-row';
import { DisputeRail } from './dispute-rail';
import { DisputeSubPlaceholder } from './sections/dispute-sub-placeholder';

interface DisputeDetailShellProps {
  dispute: DisputeProfile;
}

export function DisputeDetailShell({ dispute }: DisputeDetailShellProps) {
  return (
    // .cd-wrap — 1400px (rail-fix dimensions)
    <div className="w-full mx-auto max-w-[1400px] pt-[24px] px-[32px] pb-[80px] min-w-0 max-[720px]:px-[16px] max-[720px]:pt-[18px] max-[720px]:pb-[100px]">
      {/* Back row + breadcrumb */}
      <div className="flex items-center justify-between gap-[14px] mb-[18px] flex-wrap">
        <Link
          href="/admin/operations/disputes"
          data-disp-action="back-to-list"
          className="inline-flex items-center gap-[6px] font-body text-[12.5px] text-[var(--ink-soft)] no-underline transition-colors duration-150 ease hover:text-[var(--ink)] [&>svg]:transition-transform [&>svg]:duration-150 hover:[&>svg]:-translate-x-[2px]"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to disputes
        </Link>
        <div className="font-mono text-[10.5px] tracking-[0.06em] text-[var(--ink-mute)] inline-flex items-center gap-[6px] flex-wrap">
          <span>/admin</span>
          <span className="text-[var(--line-strong)]">·</span>
          <span>operations</span>
          <span className="text-[var(--line-strong)]">·</span>
          <span>disputes</span>
          <span className="text-[var(--line-strong)]">·</span>
          <span className="text-[var(--ink)] font-semibold">{dispute.atlasId}</span>
        </div>
      </div>

      <DisputeHero dispute={dispute} />
      <DisputeStageTracker tracker={dispute.stageTracker} />
      <DisputeActionsRow disputeId={dispute.id} />

      {/* 2-col body: main + right rail (cd-body 280/32) */}
      <div className="grid grid-cols-[minmax(0,1fr)_280px] gap-[32px] items-start max-[1100px]:grid-cols-1 max-[1100px]:gap-[24px]">
        <main className="min-w-0">
          <DisputeSubPlaceholder
            sectionId="disp-section-claim"
            num="01 · 06"
            title="Claim"
            status="Pending build"
            phase="12b"
          />
          <DisputeSubPlaceholder
            sectionId="disp-section-response"
            num="02 · 06"
            title="Response"
            status="Pending build"
            phase="12b"
          />
          <DisputeSubPlaceholder
            sectionId="disp-section-investigation"
            num="03 · 06"
            title="Investigation"
            status="Pending build"
            phase="12b"
          />
          <DisputeSubPlaceholder
            sectionId="disp-section-decision"
            num="04 · 06"
            title="Decision"
            status="Pending build"
            phase="12b"
          />
          <DisputeSubPlaceholder
            sectionId="disp-section-audit"
            num="05 · 06"
            title="Audit log"
            status="Pending build"
            phase="12b"
          />
          <DisputeSubPlaceholder
            sectionId="disp-section-linked"
            num="06 · 06"
            title="Linked engagements"
            status="Pending build"
            phase="12b"
          />
        </main>

        <DisputeRail dispute={dispute} />
      </div>
    </div>
  );
}
