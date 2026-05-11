'use client';

import type { DisputeProfile } from '@/lib/mock-data/admin/dispute-profiles-data';
import { DisputePartyCardSection } from './dispute-party-card-section';

export function DisputeSubClaim({ dispute }: { dispute: DisputeProfile }) {
  return (
    <DisputePartyCardSection
      data={dispute.claim}
      sectionId="disp-section-claim"
      sectionNum="01 · 06"
      sectionTitle="Dispute submission"
      disputeId={dispute.id}
    />
  );
}
