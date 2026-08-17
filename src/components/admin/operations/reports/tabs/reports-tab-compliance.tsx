/**
 * Phase 14c — Tab 5 Compliance content.
 *
 * admin.html markup: L38753-38835
 *
 * Composition (all primitives from 14a — no new components):
 *   - 5-KPI strip (1 with sparkline, 4 without)
 *   - 2-col grid: DSR (with jurisdiction footer) + Legal requests
 */
import { ReportsKpiStrip } from '../reports-kpi-tile';
import { ReportsCard } from '../reports-card';
import { ReportsMiniTableEl } from '../reports-mini-table';
import type { ReportsTabCompliance } from '@/lib/mock-data/admin/reports-analytics-data';

interface ReportsTabComplianceProps {
  data: ReportsTabCompliance;
}

export function ReportsTabCompliance({ data }: ReportsTabComplianceProps) {
  return (
    <div data-rep-tab-content="compliance">
      {/* Block 1 — 5-KPI strip */}
      <ReportsKpiStrip tiles={data.kpis} />

      {/* Block 2 — 2-col: DSR + Legal requests */}
      <div className="grid grid-cols-[1.6fr_1fr] gap-[16px] mb-[22px] max-[980px]:grid-cols-1">
        {/* LEFT — DSR 3-row table + jurisdiction footer */}
        <ReportsCard head={data.dsrCard.head}>
          <ReportsMiniTableEl table={data.dsrCard.table} />
          {/* Jurisdiction footer — admin.html L38807-38809 inline styles */}
          <p className="mt-[12px] pt-[12px] border-t border-dashed border-[var(--line-soft)] font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.55] m-0">
            <strong className="text-[var(--ink-soft)] font-bold">{data.dsrCard.jurisdictionStrong}</strong>
            {data.dsrCard.jurisdictionRest}
          </p>
        </ReportsCard>

        {/* RIGHT — Legal requests 5-row table */}
        <ReportsCard head={data.legalRequestsCard.head}>
          <ReportsMiniTableEl table={data.legalRequestsCard.table} />
        </ReportsCard>
      </div>
    </div>
  );
}
