/**
 * Phase 14b — Tab 3 Performance content.
 *
 * admin.html markup: L38438-38569
 *
 * Composition:
 *   - 5-KPI strip (no sparklines)
 *   - Full-width specialist performance table (8 rows: 7 named + 1 aggregate)
 *   - Pool health 22-cell heat-grid card with custom right-side legend
 */
import { ReportsKpiStrip } from '../reports-kpi-tile';
import { ReportsCard } from '../reports-card';
import { ReportsMiniTableEl } from '../reports-mini-table';
import { ReportsPoolGridEl } from '../reports-pool-grid';
import type {
  ReportsTabPerformance,
  ReportsAnalysisNote,
  ReportsPoolLegendItem,
  PoolHeatState,
} from '@/lib/mock-data/admin/reports-analytics-data';

interface ReportsTabPerformanceProps {
  data: ReportsTabPerformance;
}

function AnalysisNote({ note }: { note: ReportsAnalysisNote }) {
  const strongColor = note.strongColor === 'danger' ? 'text-[var(--danger)]' : 'text-[var(--ink)]';
  return (
    <p className="mt-[14px] pt-[12px] border-t border-dashed border-[var(--line-soft)] font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.6] m-0">
      <strong className={`${strongColor} font-bold`}>{note.strongPrefix}</strong>
      {note.rest}
    </p>
  );
}

// Inline pool-health swatch styles match admin.html L38533-38536 verbatim
function inlineSwatchClass(state: PoolHeatState): string {
  switch (state) {
    case 'healthy':
      return 'bg-[var(--success-bg)] border-[rgba(46,125,84,0.3)]';
    case 'balanced':
      return 'bg-[var(--paper-deep)] border-[var(--line-soft)]';
    case 'thin':
      return 'bg-[var(--amber-bg)] border-[rgba(232,118,58,0.3)]';
    case 'critical':
      return 'bg-[var(--danger-bg)] border-[rgba(194,65,43,0.4)]';
  }
}

function PoolInlineLegend({ items }: { items: ReportsPoolLegendItem[] }) {
  return (
    <div className="inline-flex gap-[12px] font-mono text-[10px] tracking-[0.04em] text-[var(--ink-soft)] flex-wrap">
      {items.map((item, idx) => (
        <span key={idx} className="inline-flex items-center gap-[5px]">
          <span aria-hidden="true" className={`w-[10px] h-[10px] rounded-[2px] border ${inlineSwatchClass(item.state)}`} />
          {item.label}
        </span>
      ))}
    </div>
  );
}

export function ReportsTabPerformance({ data }: ReportsTabPerformanceProps) {
  return (
    <div data-rep-tab-content="performance">
      {/* Block 1 — 5-KPI strip (no sparklines) */}
      <ReportsKpiStrip tiles={data.kpis} />

      {/* Block 2 — Specialist performance full-width table */}
      <ReportsCard head={data.specialists.head} className="mb-[22px]">
        <ReportsMiniTableEl table={data.specialists.table} />
      </ReportsCard>

      {/* Block 3 — Pool health heat-grid with right-side inline legend */}
      <ReportsCard
        head={data.poolHealth.head}
        customHeadRight={<PoolInlineLegend items={data.poolHealth.inlineLegend} />}
      >
        <ReportsPoolGridEl data={data.poolHealth.grid} />
        <AnalysisNote note={data.poolHealth.analysisNote} />
      </ReportsCard>
    </div>
  );
}
