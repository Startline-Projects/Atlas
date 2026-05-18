import { IcShell } from '@/components/admin/internal/incidents/ic-shell';
import {
  icPageMeta,
  icMetaPulseHtml,
  icSearchPlaceholder,
  icHeaderActions,
  icTopStats,
  icFilterChips,
  icActiveCallout,
  icResolvedRows,
  icResolvedSectionEyebrow,
  icResolvedSectionTitle,
  icResolvedSectionHint,
  icFooterSummaryHtml,
  icArchiveButtonLabel,
} from '@/lib/mock-data/admin/internal-incidents-data';

export const metadata = {
  title: 'Internal incidents',
};

export default function InternalIncidentsPage() {
  return (
    <IcShell
      meta={icPageMeta}
      metaPulseHtml={icMetaPulseHtml}
      searchPlaceholder={icSearchPlaceholder}
      headerActions={icHeaderActions}
      topStats={icTopStats}
      filterChips={icFilterChips}
      activeCallout={icActiveCallout}
      resolvedRows={icResolvedRows}
      resolvedEyebrow={icResolvedSectionEyebrow}
      resolvedTitle={icResolvedSectionTitle}
      resolvedHint={icResolvedSectionHint}
      footerSummaryHtml={icFooterSummaryHtml}
      archiveButtonLabel={icArchiveButtonLabel}
    />
  );
}
