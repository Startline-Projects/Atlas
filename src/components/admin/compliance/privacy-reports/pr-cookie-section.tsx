import { PrSection } from './pr-section';
import { PrSectionHead } from './pr-section-head';
import { PrConsentOverall } from './pr-consent-overall';
import { PrGeoBars } from './pr-geo-bars';
import { PrBannerVersions } from './pr-banner-versions';
import type { PrGeoRow, PrBannerVersion, PrConsentOverallData } from '@/lib/mock-data/admin/privacy-reports-data';

interface PrCookieSectionProps {
  consentOverall: PrConsentOverallData;
  geoBars: PrGeoRow[];
  bannerVersions: PrBannerVersion[];
}

export function PrCookieSection({
  consentOverall,
  geoBars,
  bannerVersions,
}: PrCookieSectionProps) {
  return (
    <PrSection id="pr-section-cookies">
      <div className="py-[12px] px-[18px] bg-[var(--paper-deep)] border-b border-b-[var(--line-soft)]">
        <PrSectionHead
          number="01"
          title="Cookie consent overview"
          meta="Consent rates across geographies and banner versions"
          actions={[
            { label: 'Detail', icon: 'search' },
            { label: 'Export CSV' },
          ]}
        />
      </div>

      <div className="py-[18px] px-[18px]">
        <PrConsentOverall
          bigValue={consentOverall.bigValue}
          bigPct={consentOverall.bigPct}
          eyebrow={consentOverall.eyebrow}
          title={consentOverall.title}
          detailHtml={consentOverall.detailHtml}
          trendValue={consentOverall.trendValue}
          trendMeta={consentOverall.trendMeta}
        />
        <div className="mb-[18px]">
          <PrGeoBars rows={geoBars} />
        </div>
        <PrBannerVersions versions={bannerVersions} />
      </div>
    </PrSection>
  );
}
