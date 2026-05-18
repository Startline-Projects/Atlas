import { PfShell } from '@/components/admin/internal/performance/pf-shell';
import {
  pfPageMeta,
  pfMetaPulseHtml,
  pfPeriodTabs,
  pfHeaderActions,
  pfTopStats,
  pfManager,
  pfSpecialistTable,
  pfClusterGrid,
  pfDeepDiveGrid,
} from '@/lib/mock-data/admin/performance-data';

export const metadata = {
  title: 'Performance dashboards',
};

export default function PerformancePage() {
  return (
    <PfShell
      meta={pfPageMeta}
      metaPulseHtml={pfMetaPulseHtml}
      periodTabs={pfPeriodTabs}
      actions={pfHeaderActions}
      topStats={pfTopStats}
      manager={pfManager}
      specialistTable={pfSpecialistTable}
      clusterGrid={pfClusterGrid}
      deepDiveGrid={pfDeepDiveGrid}
    />
  );
}
