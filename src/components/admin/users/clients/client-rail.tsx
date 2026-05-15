import type { ClientProfile } from '@/lib/mock-data/admin/client-profiles-data';
import { ClientRailToc } from './client-rail-toc';
import { ClientRailQuickFacts } from './client-rail-quick-facts';

interface ClientRailProps {
  profile: ClientProfile;
}

export function ClientRail({ profile }: ClientRailProps) {
  return (
    // admin.html line 18138: <aside class="cd-rail"> with sticky positioning (lines 5466-5475)
    <aside className="sticky top-[80px] flex flex-col gap-[16px] max-[1100px]:static max-[1100px]:order-[-1]">
      <ClientRailToc {...(profile.quickFacts?.tocMeta && { tocMeta: profile.quickFacts.tocMeta })} />
      <ClientRailQuickFacts profile={profile} />
    </aside>
  );
}
