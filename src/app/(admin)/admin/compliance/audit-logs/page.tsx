import { AudShell } from '@/components/admin/compliance/audit-logs/aud-shell';
import { audListMeta, audStats, audFilterChips, audTimeRanges, audRows } from '@/lib/mock-data/admin/audit-logs-data';

export const metadata = {
  title: 'Audit logs - Atlas',
};

export default function AuditLogsPage() {
  return (
    <AudShell
      meta={audListMeta}
      stats={audStats}
      filterChips={audFilterChips}
      timeRanges={audTimeRanges}
      rows={audRows}
    />
  );
}
