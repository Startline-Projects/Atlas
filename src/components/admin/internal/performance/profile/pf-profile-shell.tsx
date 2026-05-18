/* Profile shell — breadcrumb + hero + 4-stat strip + 2-col body (Performance metrics main + Manager context rail sticky) */

import { PfProfileBreadcrumb } from './pf-profile-breadcrumb';
import { PfProfileHeroComponent } from './pf-profile-hero';
import { PfProfileStats } from './pf-profile-stats';
import { PfProfilePerfCard } from './pf-profile-perf-card';
import { PfProfileContextCard } from './pf-profile-context-card';
import { PfSectionHeadComponent } from '../pf-section-head';
import type { PfSpecialistProfile } from '@/lib/mock-data/admin/performance-data';

interface PfProfileShellProps {
  profile: PfSpecialistProfile;
}

const FR_SECTION_CLASSES =
  'bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[20px] px-[24px]';

export function PfProfileShell({ profile }: PfProfileShellProps) {
  return (
    <div className="max-w-[1320px] mx-auto pt-[22px] px-[32px] pb-[64px] max-[720px]:pt-[18px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      <PfProfileBreadcrumb items={profile.breadcrumb} />
      <PfProfileHeroComponent hero={profile.hero} />
      <PfProfileStats stats={profile.detailStats} />

      <div className="grid grid-cols-[minmax(0,1fr)_320px] gap-[22px] items-start max-[1080px]:grid-cols-1">
        {/* Main — Performance metrics */}
        <section className={FR_SECTION_CLASSES}>
          <PfSectionHeadComponent head={profile.perfMetrics.sectionHead} />
          <PfProfilePerfCard data={profile.perfMetrics} />
        </section>

        {/* Rail — Manager context (sticky) */}
        <aside className="sticky top-[22px] self-start flex flex-col gap-[14px] max-[1080px]:static max-[1080px]:order-[-1]">
          <section className={FR_SECTION_CLASSES}>
            <PfSectionHeadComponent head={profile.managerContext.sectionHead} />
            <PfProfileContextCard data={profile.managerContext} />
          </section>
        </aside>
      </div>
    </div>
  );
}
