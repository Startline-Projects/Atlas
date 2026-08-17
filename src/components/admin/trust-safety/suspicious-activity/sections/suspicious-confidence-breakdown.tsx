import type { SuspiciousFeature } from '@/lib/mock-data/admin/suspicious-activity-data';

interface SuspiciousConfidenceBreakdownProps {
  aiConfidence: number;
  features: SuspiciousFeature[];
}

const FILL_VARIANT: Record<SuspiciousFeature['level'], string> = {
  high: 'bg-[var(--danger)]',
  med: 'bg-[var(--amber)]',
  low: 'bg-[var(--ink-soft)]',
};

const WEIGHT_VARIANT: Record<SuspiciousFeature['level'], string> = {
  high: 'text-[var(--danger)]',
  med: 'text-[var(--amber)]',
  low: 'text-[var(--ink)]',
};

export function SuspiciousConfidenceBreakdown({ aiConfidence, features }: SuspiciousConfidenceBreakdownProps) {
  const fullArc = 251.3;
  const dashOffset = fullArc * (1 - aiConfidence / 100);

  return (
    <section className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[20px_24px] mb-[16px]">
      {/* Section head with dashed bottom border */}
      <div className="flex items-end justify-between gap-[12px] flex-wrap mb-[16px] pb-[12px] border-b border-dashed border-b-[var(--line-soft)]">
        <div className="flex items-baseline gap-[10px]">
          <span className="font-mono text-[9.5px] tracking-[0.06em] bg-[var(--cream-deep)] text-[var(--ink-mute)] px-[6px] py-[2px] rounded-[3px] font-bold">
            02
          </span>
          <div>
            <h2 className="font-display text-[18px] font-medium tracking-[-0.01em] text-[var(--ink)] leading-[1.2] m-0">
              AI confidence breakdown
            </h2>
            <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em] mt-[4px]">
              model: anom-detector-v4.2 · explainable features below · {aiConfidence}% suspicious
            </div>
          </div>
        </div>
      </div>

      {/* 2-col grid: gauge (1.6fr) + features (1fr) */}
      <div className="grid grid-cols-[1.6fr_1fr] max-[980px]:grid-cols-1 gap-[16px]">
        {/* Gauge card */}
        <div className="relative overflow-hidden bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[18px_20px] text-center">
          {/* Top gradient strip (was ::before) */}
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 right-0 h-[3px]"
            style={{ background: 'linear-gradient(to right, var(--lime-deep), var(--amber), var(--danger))' }}
          />
          <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-[var(--ink-mute)] font-bold mb-[4px]">
            SUSPICIOUS PROBABILITY
          </div>
          <div className="font-display text-[13px] font-medium text-[var(--ink)] tracking-[-0.01em] mb-[18px]">
            Anomaly classifier output
          </div>
          <div className="relative w-[200px] h-[110px] mx-auto mb-[12px]">
            <svg viewBox="0 0 200 110" preserveAspectRatio="xMidYMid meet" className="w-full h-full block">
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="var(--cream-deep)"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="var(--amber)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={fullArc}
                strokeDashoffset={dashOffset}
              />
            </svg>
            <div className="absolute bottom-0 left-0 right-0 text-center font-display text-[36px] font-medium text-[var(--ink)] tracking-[-0.02em] leading-none tabular-nums">
              {aiConfidence}
              <span
                className="font-mono text-[14px] text-[var(--ink-mute)] font-semibold ml-[2px]"
                style={{ verticalAlign: '4px' }}
              >
                %
              </span>
            </div>
          </div>
          <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5] pt-[12px] border-t border-dashed border-t-[var(--line-soft)]">
            <strong className="text-[var(--ink-soft)] font-bold">Threshold for auto-escalate:</strong> 85%
            <br />
            <strong className="text-[var(--ink-soft)] font-bold">Threshold for auto-dismiss:</strong> 25%
            <br />
            Currently in <strong className="text-[var(--amber)] font-bold">manual-review band</strong>.
          </div>
        </div>

        {/* Features list */}
        <div>
          <div className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold mb-[10px]">
            Top contributing features
          </div>
          <div className="flex flex-col gap-[8px]">
            {features.map((feature, i) => (
              <div
                key={i}
                className="grid grid-cols-[minmax(0,1fr)_80px_60px] gap-[10px] items-center p-[8px_12px] bg-[var(--paper-deep)] border border-[var(--line-soft)] rounded-[var(--r-sm)]"
              >
                <div className="min-w-0">
                  <div className="text-[12px] font-semibold text-[var(--ink)] tracking-[-0.01em]">
                    {feature.name}
                  </div>
                  <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.4] mt-[2px]">
                    {feature.detail}
                  </div>
                </div>
                <div className="h-[6px] bg-[var(--cream-deep)] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${FILL_VARIANT[feature.level]}`}
                    style={{ width: `${feature.barPercent}%` }}
                  />
                </div>
                <div
                  className={`font-mono text-[11px] font-bold tracking-[0.02em] text-right tabular-nums ${feature.weightPositive ? WEIGHT_VARIANT[feature.level] : 'text-[var(--success)]'}`}
                >
                  {feature.weight}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
