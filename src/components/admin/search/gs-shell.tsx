'use client';

/* admin.html lines 67493-68033: full Global Search view orchestrator
   Pass A: page header + query pill + 4-stat strip + category sidebar
   Pass B: + 7 grouped result sections + empty group + recent searches */

import { PrStatStrip } from '@/components/admin/compliance/privacy-reports/pr-stat-strip';
import { GsPageHeader } from './gs-page-header';
import { GsCatSide } from './gs-cat-side';
import { GsGroup } from './gs-group';
import { GsEmpty } from './gs-empty';
import { GsRecentCard } from './gs-recent-card';
import type { PrStat } from '@/lib/mock-data/admin/privacy-reports-data';
import type {
  GsPageMeta,
  GsHeaderAction,
  GsSidebarCategory,
  GsResultGroup,
  GsEmptyGroup,
  GsRecentRow as GsRecentRowData,
} from '@/lib/mock-data/admin/search-results-data';

interface GsShellProps {
  meta: GsPageMeta;
  metaPulseHtml: string;
  query: string;
  actions: GsHeaderAction[];
  topStats: PrStat[];
  sidebarHeadLabel: string;
  sidebarCategories: GsSidebarCategory[];
  resultGroups: GsResultGroup[];
  emptyGroup: GsEmptyGroup;
  recentCardTitle: string;
  recentRows: GsRecentRowData[];
}

export function GsShell({
  meta,
  metaPulseHtml,
  query,
  actions,
  topStats,
  sidebarHeadLabel,
  sidebarCategories,
  resultGroups,
  emptyGroup,
  recentCardTitle,
  recentRows,
}: GsShellProps) {
  return (
    <div className="max-w-[1320px] mx-auto pt-[22px] px-[32px] pb-[64px] max-[720px]:pt-[18px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      <GsPageHeader
        meta={meta}
        metaPulseHtml={metaPulseHtml}
        query={query}
        actions={actions}
      />

      <PrStatStrip stats={topStats} />

      <div className="grid grid-cols-[220px_minmax(0,1fr)] gap-[20px] items-start max-[980px]:grid-cols-1">
        <GsCatSide headLabel={sidebarHeadLabel} categories={sidebarCategories} />

        <div>
          {resultGroups.map((group, idx) => (
            <GsGroup key={idx} group={group} />
          ))}
          <GsEmpty group={emptyGroup} />
          <GsRecentCard title={recentCardTitle} rows={recentRows} />
        </div>
      </div>
    </div>
  );
}
