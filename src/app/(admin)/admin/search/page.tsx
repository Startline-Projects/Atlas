import { GsShell } from '@/components/admin/search/gs-shell';
import {
  gsPageMeta,
  gsMetaPulseHtml,
  gsQuery,
  gsHeaderActions,
  gsTopStats,
  gsSidebarHeadLabel,
  gsSidebarCategories,
  gsResultGroups,
  gsEmptyGroup,
  gsRecentCardTitle,
  gsRecentRows,
} from '@/lib/mock-data/admin/search-results-data';

export const metadata = {
  title: 'Search results',
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q ?? gsQuery;

  return (
    <GsShell
      meta={gsPageMeta}
      metaPulseHtml={gsMetaPulseHtml}
      query={query}
      actions={gsHeaderActions}
      topStats={gsTopStats}
      sidebarHeadLabel={gsSidebarHeadLabel}
      sidebarCategories={gsSidebarCategories}
      resultGroups={gsResultGroups}
      emptyGroup={gsEmptyGroup}
      recentCardTitle={gsRecentCardTitle}
      recentRows={gsRecentRows}
    />
  );
}
