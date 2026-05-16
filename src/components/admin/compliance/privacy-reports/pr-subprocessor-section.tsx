import { PrSection } from './pr-section';
import { PrSectionHead } from './pr-section-head';
import { PrSubprocessorTable } from './pr-subprocessor-table';
import type { PrSubprocessorRow } from '@/lib/mock-data/admin/privacy-reports-data';

interface PrSubprocessorSectionProps {
  rows: PrSubprocessorRow[];
}

export function PrSubprocessorSection({ rows }: PrSubprocessorSectionProps) {
  return (
    <PrSection id="pr-section-subprocessors">
      <div className="py-[12px] px-[18px] bg-[var(--paper-deep)] border-b border-b-[var(--line-soft)]">
        <PrSectionHead
          number="04"
          title="Subprocessors"
          meta="10 active subprocessors · all have signed DPAs · annual review cadence · 1 review overdue"
          actions={[
            { label: 'Add vendor', icon: 'plus' },
            { label: 'Export list' },
          ]}
        />
      </div>

      <div className="overflow-x-auto">
        <PrSubprocessorTable rows={rows} />
      </div>
    </PrSection>
  );
}
