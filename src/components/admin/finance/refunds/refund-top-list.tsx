import { topListData } from '@/lib/mock-data/admin/refunds-data';

export function RefundTopList() {
  const d = topListData;

  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[18px_20px]">
      <h3 className="font-display text-[15px] font-medium text-[var(--ink)] tracking-[-0.01em] mb-[4px] leading-[1.2]">
        {d.title}
      </h3>
      <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] mb-[16px]">
        {d.meta}
      </div>

      <div className="flex flex-col gap-0">
        {d.rows.map((row) => (
          <div
            key={row.rank}
            className="grid grid-cols-[22px_1fr_100px_90px] gap-[12px] items-center py-[10px] border-b border-dashed border-b-[var(--line-soft)] last:border-b-0"
          >
            {/* Rank */}
            <div className="font-mono text-[10px] font-bold text-[var(--ink-mute)] tracking-[0.02em] text-center">
              {row.rank}
            </div>

            {/* Entity */}
            <div className="flex items-center gap-[10px] min-w-0">
              <div
                className="w-[26px] h-[26px] rounded-full grid place-items-center font-display text-[10px] text-[var(--paper)] font-medium flex-shrink-0"
                style={{ background: row.gradient }}
              >
                {row.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[12.5px] font-semibold text-[var(--ink)] tracking-[-0.01em] truncate">{row.name}</div>
                <div className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[1px]">{row.meta}</div>
              </div>
            </div>

            {/* Bar */}
            <div className="flex flex-col gap-[3px]">
              <div className="h-[5px] bg-[var(--cream-deep)] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: row.barWidth,
                    backgroundColor: row.barColor ?? 'var(--ink)',
                  }}
                />
              </div>
              <span
                className="font-mono text-[9.5px] tracking-[0.02em] font-semibold"
                style={{ color: row.pctColor ?? 'var(--ink-mute)' }}
              >
                {row.pct}
              </span>
            </div>

            {/* Amount */}
            <div className="font-display text-[14px] font-medium text-[var(--ink)] tracking-[-0.01em] text-right tabular-nums">
              {row.amount}
              <span className="block font-mono text-[9px] text-[var(--ink-mute)] font-medium tracking-[0.04em] mt-[1px]">
                {row.amountMeta}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
