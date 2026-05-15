import { rateGaugeData } from '@/lib/mock-data/admin/refunds-data';

export function RefundRateGauge() {
  const d = rateGaugeData;

  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[18px_20px]">
      <h3 className="font-display text-[15px] font-medium text-[var(--ink)] tracking-[-0.01em] mb-[4px] leading-[1.2]">
        {d.title}
      </h3>
      <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] mb-[16px]">
        {d.meta}
      </div>

      <div className="flex items-center gap-[18px]">
        {/* Gauge */}
        <div className="relative w-[130px] h-[75px] flex-shrink-0">
          <svg viewBox="0 0 130 75" preserveAspectRatio="xMidYMid meet" aria-hidden="true" className="w-full h-full block">
            <path
              d="M 15 65 A 50 50 0 0 1 115 65"
              fill="none"
              stroke="var(--cream-deep)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M 15 65 A 50 50 0 0 1 115 65"
              fill="none"
              stroke="var(--success)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={String(d.arcLength)}
              strokeDashoffset={String(d.dashOffset)}
            />
          </svg>
          <div className="absolute bottom-0 left-0 right-0 text-center">
            <span className="font-display text-[26px] font-medium text-[var(--ink)] tracking-[-0.02em] leading-none tabular-nums">
              {d.rate}
            </span>
            <span className="font-mono text-[11px] text-[var(--ink-mute)] font-semibold ml-[1px]">%</span>
          </div>
        </div>

        {/* Context */}
        <div className="flex-1">
          <div className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.55]">
            Below the <strong className="text-[var(--ink)] font-bold">1.2% industry benchmark</strong> and within Atlas&apos;s <strong className="text-[var(--ink)] font-bold">1.0% target ceiling</strong>. Trending flat vs the prior 90-day window (0.71%).
          </div>
          <div className="grid grid-cols-2 gap-[8px] mt-[10px] pt-[10px] border-t border-dashed border-t-[var(--line-soft)]">
            {d.targets.map((t) => (
              <div key={t.label} className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em]">
                <span className="block font-mono text-[9px] tracking-[0.14em] uppercase font-semibold mb-[2px]">
                  {t.label}
                </span>
                <span className="font-display text-[16px] font-medium text-[var(--ink)] tracking-[-0.01em]">
                  {t.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
