import { PrSection } from './pr-section';
import { PrSectionHead } from './pr-section-head';
import { PrDsrVolume } from './pr-dsr-volume';
import { PrSecondaryMetrics } from './pr-secondary-metrics';
import type { PrDsrRow, PrSecondaryMetric } from '@/lib/mock-data/admin/privacy-reports-data';

interface PrProcessingSectionProps {
  dsrRows: PrDsrRow[];
  dsrTotalLabel: string;
  dsrTotalValue: string;
  metrics: PrSecondaryMetric[];
}

export function PrProcessingSection({
  dsrRows,
  dsrTotalLabel,
  dsrTotalValue,
  metrics,
}: PrProcessingSectionProps) {
  return (
    <PrSection id="pr-section-processing">
      <div className="py-[12px] px-[18px] bg-[var(--paper-deep)] border-b border-b-[var(--line-soft)]">
        <PrSectionHead
          number="02"
          title="Data processing & subject requests"
          meta="DSR volume, completion rates, and secondary metrics"
          actions={[{ label: 'Open DSR page', icon: 'code' }]}
        />
      </div>

      <div className="py-[18px] px-[18px]">
        <div className="mb-[18px]">
          <PrDsrVolume rows={dsrRows} totalLabel={dsrTotalLabel} totalValue={dsrTotalValue} />
        </div>
        <div className="border-t border-t-[var(--line-soft)] pt-[18px]">
          <PrSecondaryMetrics metrics={metrics} />
        </div>
      </div>
    </PrSection>
  );
}
