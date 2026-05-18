/* admin.html lines 63729-63750: 4-col detail stats — Views 30d / Avg time on page / Helpfulness / Search rank.
   Hand-translated from Step 31 in-detail-stats pattern (forbidden-prefix rule). */

import type { HcDetailStat } from '@/lib/mock-data/admin/help-content-data';

interface HcDetailStatsProps {
  stats: HcDetailStat[];
}

export function HcDetailStats({ stats }: HcDetailStatsProps) {
  return (
    <div className="grid grid-cols-4 gap-0 bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden mb-[22px] max-[980px]:grid-cols-2 max-[480px]:grid-cols-1">
      {stats.map((stat, idx) => (
        <StatCell key={idx} stat={stat} />
      ))}
    </div>
  );
}

function StatCell({ stat }: { stat: HcDetailStat }) {
  const valueColor =
    stat.valueVariant === 'success'
      ? 'text-[var(--success)]'
      : stat.valueVariant === 'warn'
      ? 'text-[var(--amber)]'
      : stat.valueVariant === 'danger'
      ? 'text-[var(--danger)]'
      : 'text-[var(--ink)]';

  return (
    <div className="py-[16px] px-[20px] border-r border-r-[var(--line-soft)] last:border-r-0 max-[980px]:[&:nth-child(2n)]:border-r-0 max-[980px]:[&:nth-child(-n+2)]:border-b max-[980px]:[&:nth-child(-n+2)]:border-b-[var(--line-soft)] max-[480px]:!border-r-0 max-[480px]:border-b max-[480px]:border-b-[var(--line-soft)] max-[480px]:last:border-b-0">
      <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold mb-[6px]">
        {stat.label}
      </div>
      <div className={`font-display text-[28px] font-medium tracking-[-0.025em] leading-[1] tabular-nums ${valueColor}`}>
        {stat.value}
        {stat.valueSuffix && (
          <span className="text-[14px] text-[var(--ink-mute)] ml-[3px]">{stat.valueSuffix}</span>
        )}
      </div>
      <div
        className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[5px] [&_.trend-up]:text-[var(--success)] [&_.trend-down]:text-[var(--danger)]"
        dangerouslySetInnerHTML={{ __html: stat.meta }}
      />
    </div>
  );
}
