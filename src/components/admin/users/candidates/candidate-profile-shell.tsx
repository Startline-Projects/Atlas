'use client';

import type { CandidateProfile } from '@/lib/mock-data/admin/candidate-profiles-data';
import { CandidateBackRow } from './candidate-back-row';
import { CandidateHero } from './candidate-hero';
import { CandidateHeroBanner } from './candidate-hero-banner';
import { CandidateRail } from './candidate-rail';
import { CandidateSectionIdentity } from './sections/candidate-section-identity';
import { CandidateSectionPipeline } from './sections/candidate-section-pipeline';
import { CandidateSectionSnapshot } from './sections/candidate-section-snapshot';
import { CandidateSectionEngagements } from './sections/candidate-section-engagements';
import { CandidateSectionFinancial } from './sections/candidate-section-financial';
import { CandidateSectionCommunications } from './sections/candidate-section-communications';
import { CandidateSectionAudit } from './sections/candidate-section-audit';
import { CandidateSectionSignals } from './sections/candidate-section-signals';
import { CandidateSectionPrivacy } from './sections/candidate-section-privacy';

interface CandidateProfileShellProps {
  profile: CandidateProfile;
}

export function CandidateProfileShell({ profile }: CandidateProfileShellProps) {
  return (
    <main className="mx-auto max-w-[1400px] pt-[28px] px-[32px] pb-[100px] max-[720px]:px-[16px] max-[720px]:pt-[18px]">
      <CandidateBackRow profile={profile} />
      <CandidateHero profile={profile} />
      <CandidateHeroBanner profile={profile} />

      {/* 2-col grid: main content + right rail */}
      <div className="grid grid-cols-[minmax(0,1fr)_280px] gap-[32px] items-start
                      max-[1100px]:grid-cols-[1fr] max-[1100px]:gap-[24px]">

        {/* Main content column - Sections 1-7 */}
        <div className="min-w-0">
          <CandidateSectionIdentity profile={profile} />
          <CandidateSectionPipeline profile={profile} />
          <CandidateSectionSnapshot profile={profile} />
          <CandidateSectionEngagements profile={profile} />
          <CandidateSectionFinancial profile={profile} />
          <CandidateSectionCommunications profile={profile} />
          <CandidateSectionAudit profile={profile} />
          <CandidateSectionSignals profile={profile} />
          <CandidateSectionPrivacy profile={profile} />
        </div>

        {/* Right rail */}
        <CandidateRail profile={profile} />
      </div>
    </main>
  );
}
