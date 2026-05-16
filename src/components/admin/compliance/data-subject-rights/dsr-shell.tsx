import { DsrPageHeader } from './dsr-page-header';
import { DsrStatsStrip } from './dsr-stats-strip';
import { DsrToolbar } from './dsr-toolbar';
import { DsrTable } from './dsr-table';
import { dsrListMeta } from '@/lib/mock-data/admin/data-subject-rights-data';

export function DsrShell() {
  return (
    <div className="max-w-[1320px] mx-auto pt-[22px] px-[32px] pb-[64px] max-[720px]:pt-[18px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      <DsrPageHeader title={dsrListMeta.title} metaText={dsrListMeta.metaText} metaPulse={dsrListMeta.metaPulse} />
      <DsrStatsStrip />
      <DsrToolbar />
      <DsrTable />
    </div>
  );
}
