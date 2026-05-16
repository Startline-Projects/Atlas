import { AudPageHeader } from './aud-page-header';
import { AudStatsStrip } from './aud-stats-strip';
import { AudToolbar } from './aud-toolbar';
import { AudTable } from './aud-table';
import type { AudRow } from '@/lib/mock-data/admin/audit-logs-data';

interface AudShellProps {
  meta: {
    title: string;
    subtitle: string;
    live: boolean;
    liveLabel: string;
  };
  stats: Array<{
    label: string;
    value: string;
    meta?: string;
    variant?: 'warn' | 'danger';
    sparkline?: number[];
  }>;
  filterChips: Array<{ label: string; count: number; active?: boolean }>;
  timeRanges: Array<{ label: string; value: string; active?: boolean }>;
  rows: AudRow[];
}

export function AudShell({ meta, stats, filterChips, timeRanges, rows }: AudShellProps) {
  return (
    <div className="max-w-[1320px] mx-auto pt-[22px] px-[32px] pb-[64px] max-[720px]:pt-[18px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      <AudPageHeader title={meta.title} subtitle={meta.subtitle} />
      <AudStatsStrip stats={stats} />
      <AudToolbar filterChips={filterChips} timeRanges={timeRanges} />
      <AudTable rows={rows} />
    </div>
  );
}
