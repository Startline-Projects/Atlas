import { StatCell } from '@/lib/mock-data/admin/users-data';

const deltaColorMap: Record<string, string> = {
  up: 'text-[var(--color-success)]',
  down: 'text-[var(--color-danger)]',
  flat: 'text-[var(--color-ink-mute)]',
};

const usMetaColorMap: Record<string, string> = {
  '': 'text-[var(--color-ink-mute)]',
  warn: 'text-[var(--color-amber)]',
  danger: 'text-[var(--color-danger)]',
};

export function UsersStats({ stats }: { stats: StatCell[] }) {
  return (
    <div className="grid grid-cols-4 gap-0 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-md)] overflow-hidden mb-[22px] max-[880px]:grid-cols-2 max-[720px]:grid-cols-2">
      {stats.map((stat, idx) => (
        <div key={idx} className="px-[20px] py-[16px] border-r border-[var(--color-line-soft)] last:border-r-0 max-[720px]:[&:nth-child(2n)]:border-r-0 max-[720px]:[&:nth-child(-n+2)]:border-b max-[720px]:[&:nth-child(-n+2)]:border-[var(--color-line-soft)]">
          {/* Label */}
          <div className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--color-ink-mute)] mb-[7px]">
            {stat.label}
          </div>

          {/* Value with delta/suffix/prefix */}
          <div className="font-display [font-variation-settings:'opsz'_64] text-[24px] font-medium text-[var(--color-ink)] tracking-[-0.02em] leading-none [font-variant-numeric:tabular-nums] flex items-baseline gap-[6px]">
            {stat.valuePrefix && (
              <span className="font-mono text-[14px] text-[var(--color-ink-mute)] font-normal">
                {stat.valuePrefix}
              </span>
            )}
            <span>{stat.value}</span>
            {stat.delta && (
              <span className={`font-mono text-[11px] font-semibold tracking-[0.02em] ml-[4px] ${deltaColorMap[stat.delta.direction] || 'text-[var(--color-ink-mute)]'}`}>
                {stat.delta.direction === 'up' ? '↑' : '↓'}
                {stat.delta.percent}
              </span>
            )}
            {stat.suffix && (
              <span className="font-mono text-[13px] text-[var(--color-ink-mute)] font-normal">
                {stat.suffix}
              </span>
            )}
          </div>

          {/* Meta */}
          <div className={`mt-[7px] font-mono text-[10.5px] tracking-[0.04em] ${usMetaColorMap[stat.metaType || ''] || 'text-[var(--color-ink-mute)]'}`}>
            {stat.meta}
          </div>
        </div>
      ))}
    </div>
  );
}
