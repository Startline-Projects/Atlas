import type { PrStat } from '@/lib/mock-data/admin/privacy-reports-data';

interface PrStatCellProps {
  stat: PrStat;
}

export function PrStatCell({ stat }: PrStatCellProps) {
  const valueColorClass =
    stat.variant === 'success' ? 'text-[var(--success)]' :
    stat.variant === 'warn'    ? 'text-[var(--amber)]'   :
    stat.variant === 'danger'  ? 'text-[var(--danger)]'  :
                                 'text-[var(--ink)]';

  const trendColorClass =
    stat.trend?.direction === 'up'   ? 'text-[var(--success)]' :
    stat.trend?.direction === 'down' ? 'text-[var(--danger)]'  :
                                       'text-[var(--ink-mute)]';

  const statusDotBg =
    stat.statusDot === 'warn'   ? 'bg-[var(--amber)]'   :
    stat.statusDot === 'danger' ? 'bg-[var(--danger)]'  :
                                  'bg-[var(--success)]';

  return (
    <div className="py-[16px] px-[18px] border-r border-r-[var(--line-soft)] last:border-r-0">
      <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold mb-[6px]">
        {stat.label}
        {stat.statusDot && (
          <span className={`inline-block w-[8px] h-[8px] rounded-full ml-[6px] align-middle ${statusDotBg}`} />
        )}
      </div>
      <div className={`font-display text-[30px] font-medium tracking-[-0.025em] leading-[1] tabular-nums ${valueColorClass}`}>
        {stat.value}
        {stat.suffix && (
          <span className="text-[14px] font-normal text-[var(--ink-mute)] ml-[3px] tracking-[-0.01em]">
            {stat.suffix}
          </span>
        )}
      </div>
      {stat.trend && (
        <div className={`inline-flex items-center gap-[3px] mt-[6px] font-mono text-[10px] font-bold tracking-[0.04em] ${trendColorClass}`}>
          {stat.trend.direction === 'up' && (
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          )}
          {stat.trend.direction === 'down' && (
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          )}
          {stat.trend.label}
        </div>
      )}
      {stat.meta && (
        <div
          className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[4px] leading-[1.55] [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold"
          dangerouslySetInnerHTML={{ __html: stat.meta }}
        />
      )}
    </div>
  );
}
