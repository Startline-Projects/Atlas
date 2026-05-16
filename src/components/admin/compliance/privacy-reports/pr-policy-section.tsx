import { PrSection } from './pr-section';
import { PrSectionHead } from './pr-section-head';
import { PrPolicyTimeline } from './pr-policy-timeline';
import { PrNextReview } from './pr-next-review';
import type { PrPolicyVersion } from '@/lib/mock-data/admin/privacy-reports-data';

interface PrPolicySectionProps {
  versions: PrPolicyVersion[];
  eyebrow: string;
  title: string;
  meta: string;
  buttonLabel: string;
}

export function PrPolicySection({
  versions,
  eyebrow,
  title,
  meta,
  buttonLabel,
}: PrPolicySectionProps) {
  return (
    <PrSection id="pr-section-policy">
      <div className="py-[12px] px-[18px] bg-[var(--paper-deep)] border-b border-b-[var(--line-soft)]">
        <PrSectionHead
          number="05"
          title="Privacy policy update history"
          meta="5 versions tracked · quarterly review cadence · last update Apr 2 · next review due Jul 1"
          actions={[
            { label: 'View v3.2 diff' },
            { label: 'Draft v3.3', icon: 'edit', isPrimary: true },
          ]}
        />
      </div>

      <div className="overflow-x-auto">
        <div className="px-[18px] py-[18px]">
          <PrPolicyTimeline versions={versions} />
          <PrNextReview eyebrow={eyebrow} title={title} meta={meta} buttonLabel={buttonLabel} />
        </div>
      </div>
    </PrSection>
  );
}
