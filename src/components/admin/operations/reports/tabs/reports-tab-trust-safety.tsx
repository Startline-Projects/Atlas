/**
 * Phase 14b — Tab 2 Trust & Safety content.
 *
 * admin.html markup: L38314-38433
 *
 * Composition:
 *   - 5-KPI strip (3 up + 2 down sparklines)
 *   - 2-col grid: dispute stages stacked bar + anti-fraud table
 */
import { ReportsKpiStrip } from '../reports-kpi-tile';
import { ReportsCard } from '../reports-card';
import { ReportsStageStackedBarEl } from '../reports-stage-stacked-bar';
import { ReportsMiniTableEl } from '../reports-mini-table';
import type {
  ReportsTabTrustSafety,
  ReportsAnalysisNote,
} from '@/lib/mock-data/admin/reports-analytics-data';

interface ReportsTabTrustSafetyProps {
  data: ReportsTabTrustSafety;
}

function AnalysisNote({ note }: { note: ReportsAnalysisNote }) {
  const strongColor = note.strongColor === 'danger' ? 'text-[var(--danger)]' : 'text-[var(--ink)]';
  return (
    <p className="mt-[16px] pt-[14px] border-t border-dashed border-[var(--line-soft)] font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.6] m-0">
      <strong className={`${strongColor} font-bold`}>{note.strongPrefix}</strong>
      {note.rest}
    </p>
  );
}

export function ReportsTabTrustSafety({ data }: ReportsTabTrustSafetyProps) {
  return (
    <div data-rep-tab-content="trust-safety">
      {/* Block 1 — 5-KPI strip */}
      <ReportsKpiStrip tiles={data.kpis} />

      {/* Block 2 — 2-col grid */}
      <div className="grid grid-cols-[1.6fr_1fr] gap-[16px] mb-[22px] max-[980px]:grid-cols-1">
        {/* LEFT — Dispute stages stacked bar */}
        <ReportsCard head={data.disputeStagesCard.head}>
          <ReportsStageStackedBarEl data={data.disputeStagesCard.stackedBar} />
          <AnalysisNote note={data.disputeStagesCard.analysisNote} />
        </ReportsCard>

        {/* RIGHT — Anti-fraud mini-table */}
        <ReportsCard head={data.antiFraudCard.head}>
          <ReportsMiniTableEl table={data.antiFraudCard.table} className="mt-[4px]" />
        </ReportsCard>
      </div>
    </div>
  );
}
