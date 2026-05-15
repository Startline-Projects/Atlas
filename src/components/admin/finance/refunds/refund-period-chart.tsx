import { periodChartData } from '@/lib/mock-data/admin/refunds-data';

export function RefundPeriodChart() {
  const d = periodChartData;

  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[18px_20px]">
      <h3 className="font-display text-[15px] font-medium text-[var(--ink)] tracking-[-0.01em] mb-[4px] leading-[1.2]">
        {d.title}
      </h3>
      <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] mb-[16px]">
        {d.meta}
      </div>

      <div className="flex flex-col gap-[12px]">
        {/* Bar chart */}
        <div className="flex items-end gap-[4px] h-[70px] py-[4px]">
          {d.bars.map((bar, idx) => (
            <div
              key={idx}
              className="flex-1 rounded-t-[2px] relative transition-all min-h-[4px] hover:opacity-80"
              style={{
                height: bar.height,
                background: bar.current
                  ? 'linear-gradient(to top, var(--amber), #d57b3a)'
                  : 'linear-gradient(to top, var(--ink-soft), var(--ink-mute))',
              }}
              title={bar.title}
            />
          ))}
        </div>

        {/* Axis */}
        <div className="flex justify-between font-mono text-[9px] text-[var(--ink-mute)] tracking-[0.04em] pt-[4px] border-t border-t-[var(--line-soft)]">
          <span>13 wk ago</span>
          <span>this wk</span>
        </div>

        {/* Summary */}
        <div className="font-mono text-[10.5px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.55] pt-[6px]">
          Volume <strong className="text-[var(--ink)] font-bold">stable</strong> at ~3.2 / wk avg · peak <strong className="text-[var(--ink)] font-bold">W8 (6)</strong> coincided with the Vorona ring incident · no anomalies otherwise.
        </div>
      </div>
    </div>
  );
}
