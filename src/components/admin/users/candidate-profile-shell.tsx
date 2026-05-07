'use client';

import type { CandidateProfile } from '@/lib/mock-data/admin/candidate-profiles-data';
import { ProfileBackRow } from './profile-back-row';
import { ProfileHero } from './profile-hero';
import { ProfileHeroBanner } from './profile-hero-banner';
import { ProfileRail } from './profile-rail';
import { ProfileSectionIdentity } from './sections/profile-section-identity';
import { ProfileSectionPipeline } from './sections/profile-section-pipeline';
import { ProfileSectionSnapshot } from './sections/profile-section-snapshot';
import { ProfileSectionEngagements } from './sections/profile-section-engagements';
import { ProfileSectionFinancial } from './sections/profile-section-financial';
import { ProfileSectionCommunications } from './sections/profile-section-communications';
import { ProfileSectionAudit } from './sections/profile-section-audit';
import { ProfileSectionSignals } from './sections/profile-section-signals';

interface CandidateProfileShellProps {
  profile: CandidateProfile;
}

export function CandidateProfileShell({ profile }: CandidateProfileShellProps) {
  return (
    <main className="mx-auto max-w-[1400px] pt-[28px] px-[32px] pb-[100px] max-[720px]:px-[16px] max-[720px]:pt-[18px]">
      <ProfileBackRow profile={profile} />
      <ProfileHero profile={profile} />
      <ProfileHeroBanner profile={profile} />

      {/* 2-col grid: main content + right rail */}
      <div className="grid grid-cols-[minmax(0,1fr)_280px] gap-[32px] items-start
                      max-[1100px]:grid-cols-[1fr] max-[1100px]:gap-[24px]">

        {/* Main content column - Sections 1-7 */}
        <div className="min-w-0">
          <ProfileSectionIdentity profile={profile} />
          <ProfileSectionPipeline profile={profile} />
          <ProfileSectionSnapshot profile={profile} />
          <ProfileSectionEngagements profile={profile} />
          <ProfileSectionFinancial profile={profile} />
          <ProfileSectionCommunications profile={profile} />
          <ProfileSectionAudit profile={profile} />
          <ProfileSectionSignals profile={profile} />
        </div>

        {/* Right rail */}
        <ProfileRail profile={profile} />
      </div>
    </main>
  );
}
