import { PrPageHeader } from './pr-page-header';
import { PrStatStrip } from './pr-stat-strip';
import { PrCookieSection } from './pr-cookie-section';
import { PrProcessingSection } from './pr-processing-section';
import { PrRetentionSection } from './pr-retention-section';
import { PrSubprocessorSection } from './pr-subprocessor-section';
import { PrPolicySection } from './pr-policy-section';
import type { PrPageData } from '@/lib/mock-data/admin/privacy-reports-data';

interface PrShellProps {
  data: PrPageData;
}

export function PrShell({ data }: PrShellProps) {
  return (
    <div className="max-w-[1320px] mx-auto pt-[22px] px-[32px] pb-[64px] max-[720px]:pt-[18px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      {/* Page header (transparent, no stats) */}
      <PrPageHeader
        meta={data.meta}
        periodOptions={data.periodOptions}
        selectedPeriod={data.selectedPeriod}
        headerActions={data.headerActions}
      />

      {/* Stats strip (separate sibling) */}
      <PrStatStrip stats={data.topStats} />

      {/* Section 01: Cookie consent */}
      <PrCookieSection
        consentOverall={data.cookieConsent.consentOverall}
        geoBars={data.cookieConsent.geoBars}
        bannerVersions={data.cookieConsent.bannerVersions}
      />

      {/* Section 02: Data processing */}
      <PrProcessingSection
        dsrRows={data.dsrVolume.rows}
        dsrTotalLabel={data.dsrVolume.totalLabel}
        dsrTotalValue={data.dsrVolume.totalValue}
        metrics={data.secondaryMetrics}
      />

      {/* Section 03: Retention table */}
      <PrRetentionSection rows={data.retention} />

      {/* Section 04: Subprocessors table */}
      <PrSubprocessorSection rows={data.subprocessors} />

      {/* Section 05: Policy timeline */}
      <PrPolicySection
        versions={data.policyVersions}
        eyebrow={data.nextReview.eyebrow}
        title={data.nextReview.title}
        meta={data.nextReview.meta}
        buttonLabel={data.nextReview.buttonLabel}
      />
    </div>
  );
}
