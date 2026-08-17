import type { CandidateProfile } from '@/lib/mock-data/admin/candidate-profiles-data';
import { CandidateRailToc } from './candidate-rail-toc';
import { CandidateRailQuickFacts } from './candidate-rail-quick-facts';

interface CandidateRailProps {
  profile: CandidateProfile;
}

export function CandidateRail({ profile }: CandidateRailProps) {
  return (
    <aside className="sticky top-[80px] flex flex-col gap-[16px]
                      max-[1100px]:static max-[1100px]:order-[-1]">
      <CandidateRailToc />
      <CandidateRailQuickFacts profile={profile} />
    </aside>
  );
}
