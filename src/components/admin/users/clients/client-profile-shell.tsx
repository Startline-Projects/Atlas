import type { ClientProfile } from '@/lib/mock-data/admin/client-profiles-data';
import { ClientBackRow } from './client-back-row';
import { ClientHero } from './client-hero';
import { ClientRail } from './client-rail';
import { ClientSectionIdentity } from './sections/client-section-identity';
import { ClientSectionOnboarding } from './sections/client-section-onboarding';
import { ClientSectionSnapshot } from './sections/client-section-snapshot';
import { ClientSectionHiring } from './sections/client-section-hiring';
import { ClientSectionFinancial } from './sections/client-section-financial';
import { ClientSectionComms } from './sections/client-section-comms';
import { ClientSectionSignals } from './sections/client-section-signals';
import { ClientSectionAudit } from './sections/client-section-audit';

interface ClientProfileShellProps {
  profile: ClientProfile;
}

export function ClientProfileShell({ profile }: ClientProfileShellProps) {
  return (
    <main className="mx-auto max-w-[1400px] pt-[28px] px-[32px] pb-[100px] max-[720px]:px-[16px] max-[720px]:pt-[18px]">
      {/* Back row — Phase 6c */}
      <ClientBackRow profile={profile} />

      {/* Hero — Phase 6c */}
      <ClientHero profile={profile} />

      {/* admin.html line 5454-5463: 2-column body grid (main + 280px rail) */}
      <div className="grid grid-cols-[minmax(0,1fr)_280px] gap-[32px] items-start max-[1100px]:grid-cols-[1fr] max-[1100px]:gap-[24px]">
        {/* Main content column — Sections 01–08 */}
        <div className="min-w-0">
          <ClientSectionIdentity profile={profile} />
          <ClientSectionOnboarding profile={profile} />
          <ClientSectionSnapshot profile={profile} />
          <ClientSectionHiring profile={profile} />
          <ClientSectionFinancial profile={profile} />
          <ClientSectionComms profile={profile} />
          <ClientSectionSignals profile={profile} />
          <ClientSectionAudit profile={profile} />
        </div>

        {/* Right rail — Phase 6n: TOC (scroll-spy) + Quick Facts */}
        <ClientRail profile={profile} />
      </div>
    </main>
  );
}
