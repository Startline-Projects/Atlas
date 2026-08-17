/**
 * Phase 14c — Tab 4 Financial content.
 *
 * admin.html markup: L38574-38748
 *
 * Composition (all primitives from 14a/14b — no new components):
 *   - 5-KPI strip (4 up + 1 down sparklines)
 *   - 2-col grid: GMV per category + Fee revenue trend (with quarterly footer)
 *   - 2-col grid: Refunds table + Failed payments table
 */
import { ReportsKpiStrip } from '../reports-kpi-tile';
import { ReportsCard } from '../reports-card';
import { ReportsStackList } from '../reports-stack-list';
import { ReportsLineChartEl } from '../reports-line-chart';
import { ReportsMiniTableEl } from '../reports-mini-table';
import type { ReportsTabFinancial } from '@/lib/mock-data/admin/reports-analytics-data';

interface ReportsTabFinancialProps {
  data: ReportsTabFinancial;
}

export function ReportsTabFinancial({ data }: ReportsTabFinancialProps) {
  return (
    <div data-rep-tab-content="financial">
      {/* Block 1 — 5-KPI strip */}
      <ReportsKpiStrip tiles={data.kpis} />

      {/* Block 2 — 2-col: GMV per category + Fee revenue trend */}
      <div className="grid grid-cols-[1.6fr_1fr] gap-[16px] mb-[22px] max-[980px]:grid-cols-1">
        {/* LEFT — GMV per category stack list */}
        <ReportsCard head={data.gmvCategoryCard.head}>
          <ReportsStackList rows={data.gmvCategoryCard.rows} />
        </ReportsCard>

        {/* RIGHT — Fee revenue trend chart + quarterly footer */}
        <ReportsCard head={data.feeRevenueChart.head}>
          <ReportsLineChartEl chart={data.feeRevenueChart.chart} ariaLabel="Fee revenue trend" />
          {/* Quarterly footer — admin.html L38696-38698 inline styles */}
          <p className="mt-[8px] pt-[10px] border-t border-dashed border-[var(--line-soft)] font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] m-0">
            {data.feeRevenueChart.quarterlyFooter}
          </p>
        </ReportsCard>
      </div>

      {/* Block 3 — 2-col: Refunds + Failed payments */}
      <div className="grid grid-cols-[1.6fr_1fr] gap-[16px] max-[980px]:grid-cols-1">
        {/* LEFT — Refunds 5-row table */}
        <ReportsCard head={data.refundsCard.head}>
          <ReportsMiniTableEl table={data.refundsCard.table} />
        </ReportsCard>

        {/* RIGHT — Failed payments 5-row table */}
        <ReportsCard head={data.failedPaymentsCard.head}>
          <ReportsMiniTableEl table={data.failedPaymentsCard.table} />
        </ReportsCard>
      </div>
    </div>
  );
}
