import type { CandidateProfile } from '@/lib/mock-data/admin/candidate-profiles-data';
import { ProfileRailToc } from './profile-rail-toc';
import { ProfileRailQuickFacts } from './profile-rail-quick-facts';

interface ProfileRailProps {
  profile: CandidateProfile;
}

export function ProfileRail({ profile }: ProfileRailProps) {
  return (
    <aside className="sticky top-[80px] flex flex-col gap-[16px]
                      max-[1100px]:static max-[1100px]:order-[-1]">
      <ProfileRailToc />
      <ProfileRailQuickFacts profile={profile} />
    </aside>
  );
}
