import { PrSection } from './pr-section';
import { PrSectionHead } from './pr-section-head';
import { PrRetentionTable } from './pr-retention-table';
import type { PrRetentionRow } from '@/lib/mock-data/admin/privacy-reports-data';

interface PrRetentionSectionProps {
  rows: PrRetentionRow[];
}

export function PrRetentionSection({ rows }: PrRetentionSectionProps) {
  return (
    <PrSection id="pr-section-retention">
      <div className="py-[12px] px-[18px] bg-[var(--paper-deep)] border-b border-b-[var(--line-soft)]">
        <PrSectionHead
          number="03"
          title="Data retention compliance"
          meta="9 data categories tracked · retention policies per legal basis · last full audit Apr 15 · 1 review-due flag"
          actions={[
            { label: 'Full audit report' },
            { label: 'Run purge job', icon: 'trash' },
          ]}
        />
      </div>

      <div className="overflow-x-auto">
        <PrRetentionTable rows={rows} />
      </div>
    </PrSection>
  );
}
