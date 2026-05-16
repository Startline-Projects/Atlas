import { LegalRequestsPageHeader } from './legal-requests-page-header';
import { LegalRequestsStatsStrip } from './legal-requests-stats-strip';
import { LegalRequestsToolbar } from './legal-requests-toolbar';
import { LegalRequestsTable } from './legal-requests-table';
import { legalRequestsListMeta } from '@/lib/mock-data/admin/legal-requests-data';

export function LegalRequestsShell() {
  return (
    <div className="max-w-[1320px] mx-auto pt-[28px] px-[32px] pb-[64px] max-[720px]:pt-[22px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      <LegalRequestsPageHeader
        title={legalRequestsListMeta.title}
        meta={legalRequestsListMeta.meta}
        metaPulse={legalRequestsListMeta.metaPulse}
      />

      <LegalRequestsStatsStrip />

      <LegalRequestsToolbar />

      <LegalRequestsTable />
    </div>
  );
}
