'use client';

import Link from 'next/link';
import type { JobProfile } from '@/lib/mock-data/admin/job-profiles-data';
import { JobHero } from './job-hero';
import { JobActionsRow } from './job-actions-row';
import { JobRail } from './job-rail';
import { JobSubDesc } from './sections/job-sub-desc';
import { JobSubMatch } from './sections/job-sub-match';
import { JobSubInterest } from './sections/job-sub-interest';
import { JobSubIntervention } from './sections/job-sub-intervention';
import { JobSubOutcome } from './sections/job-sub-outcome';

interface JobDetailShellProps {
  job: JobProfile;
}

export function JobDetailShell({ job }: JobDetailShellProps) {
  return (
    // admin.html line 22582: <div class="cd-wrap"> — 1400px max-w (rail-fix dimensions)
    <div className="w-full mx-auto max-w-[1400px] pt-[24px] px-[32px] pb-[80px] min-w-0 max-[720px]:px-[16px] max-[720px]:pt-[18px] max-[720px]:pb-[100px]">
      {/* admin.html line 22585: cd-back-row */}
      <div className="flex items-center justify-between gap-[14px] mb-[18px] flex-wrap">
        <Link
          href="/admin/operations/jobs"
          data-job-action="back-to-list"
          className="inline-flex items-center gap-[6px] font-body text-[12.5px] text-[var(--ink-soft)] no-underline transition-colors duration-150 ease hover:text-[var(--ink)] [&>svg]:transition-transform [&>svg]:duration-150 hover:[&>svg]:-translate-x-[2px]"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to job postings
        </Link>
        {/* Breadcrumb */}
        <div className="font-mono text-[10.5px] tracking-[0.06em] text-[var(--ink-mute)] inline-flex items-center gap-[6px] flex-wrap">
          <span>/admin</span>
          <span className="text-[var(--line-strong)]">·</span>
          <span>operations</span>
          <span className="text-[var(--line-strong)]">·</span>
          <span>jobs</span>
          <span className="text-[var(--line-strong)]">·</span>
          <span className="text-[var(--ink)] font-semibold">{job.atlasId}</span>
        </div>
      </div>

      <JobHero job={job} />
      <JobActionsRow jobId={job.id} />

      {/* 2-col body: main + right rail — uses cd-body dimensions */}
      <div className="grid grid-cols-[minmax(0,1fr)_280px] gap-[32px] items-start max-[1100px]:grid-cols-1 max-[1100px]:gap-[24px]">
        <main className="min-w-0">
          <JobSubDesc job={job} />
          <JobSubMatch job={job} />
          <JobSubInterest job={job} />
          <JobSubIntervention job={job} />
          <JobSubOutcome job={job} />
        </main>

        <JobRail job={job} />
      </div>
    </div>
  );
}
