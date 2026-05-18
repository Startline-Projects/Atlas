/* admin.html lines 64530-64718: pf-cluster-grid — 2-col grid of role-family cluster cards (6 total).
   Each card: head (title + meta + grade badge) + N pf-cluster-row (110_1fr_70 grid, 8px bar) */

import { PfGradeBadge } from './pf-grade-badge';
import type { PfClusterGridData, PfClusterCard, PfBarVariant } from '@/lib/mock-data/admin/performance-data';

interface PfClusterGridProps {
  data: PfClusterGridData;
}

function barFillClass(variant: PfBarVariant): string {
  return variant === 'high'
    ? 'bg-[var(--success)]'
    : variant === 'medium'
    ? 'bg-[var(--amber)]'
    : 'bg-[var(--danger)]';
}

export function PfClusterGrid({ data }: PfClusterGridProps) {
  return (
    <div className="grid grid-cols-2 gap-[14px] max-[980px]:grid-cols-1">
      {data.clusters.map((cluster) => (
        <ClusterCard key={cluster.id} cluster={cluster} />
      ))}
    </div>
  );
}

function ClusterCard({ cluster }: { cluster: PfClusterCard }) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[16px] px-[18px]">
      {/* Head */}
      <div className="flex items-start justify-between gap-[10px] mb-[12px] flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="font-display text-[15px] font-medium text-[var(--ink)] tracking-[-0.01em] mb-[3px] leading-[1.25]">
            {cluster.title}
          </div>
          <div
            className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold"
            dangerouslySetInnerHTML={{ __html: cluster.metaHtml }}
          />
        </div>
        <div className="flex-shrink-0">
          <PfGradeBadge grade={cluster.grade} />
        </div>
      </div>

      {/* Rows */}
      {cluster.rows.map((row, idx) => (
        <div
          key={idx}
          className="grid grid-cols-[110px_minmax(0,1fr)_70px] gap-[10px] items-center py-[7px] border-b border-b-dashed border-b-[var(--line-soft)] last:border-b-0"
        >
          <div className="font-mono text-[10px] tracking-[0.06em] uppercase text-[var(--ink-mute)] font-bold">
            {row.label}
          </div>
          <div className="h-[8px] bg-[var(--paper-deep)] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${barFillClass(row.variant)}`}
              style={{ width: `${row.percent}%` }}
            />
          </div>
          <div className="font-mono text-[11.5px] font-bold tracking-[0.04em] text-right tabular-nums text-[var(--ink)]">
            {row.value}
          </div>
        </div>
      ))}
    </div>
  );
}
