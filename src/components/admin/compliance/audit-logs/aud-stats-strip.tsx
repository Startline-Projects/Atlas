import { AudSparkline } from './aud-sparkline';

interface AudStat {
  label: string;
  value: string;
  meta?: string;
  variant?: 'warn' | 'danger';
  sparkline?: number[];
}

interface AudStatsStripProps {
  stats: AudStat[];
}

export function AudStatsStrip({ stats }: AudStatsStripProps) {
  return (
    <div className="grid grid-cols-5 gap-0 bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] mb-[18px] overflow-hidden max-[1080px]:grid-cols-3 max-[720px]:grid-cols-2">
      {stats.map((stat, idx) => {
        const valueVariantClass =
          stat.variant === 'danger' ? 'text-[var(--danger)]' :
          stat.variant === 'warn'   ? 'text-[var(--amber)]'  :
                                      'text-[var(--ink)]';

        return (
          <div
            key={idx}
            className="py-[12px] px-[16px] border-r border-r-[var(--line-soft)] last:border-r-0"
          >
            <div className="font-mono text-[8.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold mb-[4px]">
              {stat.label}
            </div>
            <div className={`font-display text-[24px] font-medium tracking-[-0.025em] leading-[1.1] tabular-nums ${valueVariantClass}`}>
              {stat.value}
            </div>
            {stat.sparkline && <AudSparkline data={stat.sparkline} />}
            {stat.meta && (
              <div
                className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px] [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold"
                dangerouslySetInnerHTML={{ __html: stat.meta }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
