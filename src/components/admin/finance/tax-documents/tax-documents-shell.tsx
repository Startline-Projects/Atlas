'use client';

import { TaxDocumentsPageHeader } from './tax-documents-page-header';
import { TaxYearTabs } from './tax-year-tabs';
import { TaxDocumentsSectionNav } from './tax-documents-section-nav';
import { TaxDocumentsStatsStrip } from './tax-documents-stats-strip';
import { TdFilingPipeline } from './sections/td-filing-pipeline';
import { TdJurisdictionGrid } from './sections/td-jurisdiction-grid';
import { TdSectionStub } from './sections/td-section-stub';
import {
  yearTabs,
  taxDocsSectionNav,
  sectionStubs,
} from '@/lib/mock-data/admin/tax-documents-data';

export function TaxDocumentsShell() {
  return (
    <div className="max-w-[1320px] mx-auto pt-[28px] px-[32px] pb-[64px] max-[720px]:pt-[22px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      <TaxDocumentsPageHeader />

      <TaxYearTabs tabs={yearTabs} />

      <TaxDocumentsSectionNav items={taxDocsSectionNav} />

      <TaxDocumentsStatsStrip />

      <TdFilingPipeline />

      <TdJurisdictionGrid />

      <TdSectionStub
        id="td-section-documents"
        title={sectionStubs.documents.title}
        meta={sectionStubs.documents.meta}
      />

      <TdSectionStub
        id="td-section-bulk"
        title={sectionStubs.bulk.title}
        meta={sectionStubs.bulk.meta}
      />

      <TdSectionStub
        id="td-section-calendar"
        title={sectionStubs.calendar.title}
        meta={sectionStubs.calendar.meta}
      />

      {/* Scoped pulse-fr keyframe for meta-pulse dots */}
      <style>{`
        @keyframes pulse-fr {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse-fr {
          animation: pulse-fr 1.4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
