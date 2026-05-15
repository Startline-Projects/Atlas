import { analyticsHeader } from '@/lib/mock-data/admin/refunds-data';
import { RefundRateGauge } from './refund-rate-gauge';
import { RefundPeriodChart } from './refund-period-chart';
import { RefundReasonBars } from './refund-reason-bars';
import { RefundTopList } from './refund-top-list';

export function RefundAnalyticsGrid() {
  const d = analyticsHeader;

  return (
    <section className="mb-[28px]">
      <div className="flex items-end justify-between gap-[14px] flex-wrap mb-[14px] pb-[12px] border-b border-[var(--line)]">
        <div>
          <h2 className="font-display text-[22px] font-medium tracking-[-0.02em] m-0 mb-[4px] text-[var(--ink)]">
            {d.title}
          </h2>
          <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em]">
            {d.meta}
          </div>
        </div>
        <div className="inline-flex rounded-full border border-[var(--line)] overflow-hidden">
          {d.dateRanges.map((range) => (
            <button
              key={range}
              type="button"
              className={`py-[6px] px-[14px] font-mono text-[10px] font-bold tracking-[0.06em] uppercase border-0 cursor-pointer transition-all ${
                range === d.activeDateRange
                  ? 'bg-[var(--ink)] text-[var(--paper)]'
                  : 'bg-[var(--paper)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:text-[var(--ink)]'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[14px] max-[880px]:grid-cols-1">
        <RefundRateGauge />
        <RefundPeriodChart />
        <RefundReasonBars />
        <RefundTopList />
      </div>
    </section>
  );
}
