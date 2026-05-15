/**
 * Phase 14a — Tab 1 Platform-wide content.
 *
 * admin.html markup: L38072-38309
 *
 * Composition:
 *   - 5-KPI strip
 *   - 2-col grid: Daily signups chart + Approval funnel
 *   - 3-col grid: GMV / Revenue / Cohort
 */
import { ReportsKpiStrip } from '../reports-kpi-tile';
import { ReportsCard } from '../reports-card';
import { ReportsLineChartEl } from '../reports-line-chart';
import { ReportsFunnel } from '../reports-funnel';
import { ReportsMiniTableEl } from '../reports-mini-table';
import { ReportsStackList } from '../reports-stack-list';
import { ReportsSparkline } from '../reports-sparkline';
import type { ReportsTabPlatform } from '@/lib/mock-data/admin/reports-analytics-data';

interface ReportsTabPlatformProps {
  data: ReportsTabPlatform;
}

export function ReportsTabPlatform({ data }: ReportsTabPlatformProps) {
  return (
    <div data-rep-tab-content="platform">
      {/* Block 1 — 5-KPI strip */}
      <ReportsKpiStrip tiles={data.kpis} />

      {/* Block 2 — 2-col: signups chart + funnel */}
      <div className="grid grid-cols-[1.6fr_1fr] gap-[16px] mb-[22px] max-[980px]:grid-cols-1">
        {/* LEFT — Daily signups chart */}
        <ReportsCard head={data.signupsChart.head} legend={data.signupsChart.legend}>
          <ReportsLineChartEl chart={data.signupsChart.chart} ariaLabel="Daily signups chart" />
        </ReportsCard>
        {/* RIGHT — 7-stage approval funnel */}
        <ReportsCard head={data.funnel.head}>
          <ReportsFunnel stages={data.funnel.stages} />
        </ReportsCard>
      </div>

      {/* Block 3 — 3-col: GMV / Revenue / Cohort */}
      <div className="grid grid-cols-3 gap-[14px] mb-[8px] max-[1080px]:grid-cols-2 max-[720px]:grid-cols-1">
        {/* GMV card */}
        <ReportsCard head={data.gmvCard.head}>
          <div className="flex items-baseline gap-[6px] font-display text-[26px] font-medium tracking-[-0.02em] text-[var(--ink)] leading-[1] mb-[4px] [font-variant-numeric:tabular-nums]">
            {data.gmvCard.value}
            <span className="font-mono text-[11px] text-[var(--success)] font-semibold tracking-[0.02em]">
              {data.gmvCard.delta.text}
            </span>
          </div>
          <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] mb-[12px]">
            {data.gmvCard.subLine}
          </div>
          <ReportsSparkline spark={data.gmvCard.sparkline} />
          <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[8px] pt-[10px] border-t border-dashed border-[var(--line-soft)]">
            {data.gmvCard.footerPrefix}
            <strong className="text-[var(--ink)] font-bold">{data.gmvCard.footerStrong}</strong>
            {data.gmvCard.footerSuffix}
          </div>
        </ReportsCard>

        {/* Revenue card */}
        <ReportsCard head={data.revenueCard.head}>
          <div className="flex items-baseline gap-[6px] font-display text-[26px] font-medium tracking-[-0.02em] text-[var(--ink)] leading-[1] mb-[4px] [font-variant-numeric:tabular-nums]">
            {data.revenueCard.value}
            <span className="font-mono text-[11px] text-[var(--success)] font-semibold tracking-[0.02em]">
              {data.revenueCard.delta.text}
            </span>
          </div>
          <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] mb-[12px]">
            {data.revenueCard.subLine}
          </div>
          <ReportsMiniTableEl table={data.revenueCard.table} />
        </ReportsCard>

        {/* Cohort card */}
        <ReportsCard head={data.cohortCard.head}>
          <ReportsStackList rows={data.cohortCard.rows} />
        </ReportsCard>
      </div>
    </div>
  );
}
