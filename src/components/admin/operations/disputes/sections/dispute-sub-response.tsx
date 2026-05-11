'use client';

import type { DisputeProfile } from '@/lib/mock-data/admin/dispute-profiles-data';
import { DisputePartyCardSection } from './dispute-party-card-section';

export function DisputeSubResponse({ dispute }: { dispute: DisputeProfile }) {
  return (
    <DisputePartyCardSection
      data={dispute.response}
      sectionId="disp-section-response"
      sectionNum="02 · 06"
      sectionTitle="Respondent's response"
      disputeId={dispute.id}
    />
  );
}
