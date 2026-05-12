/**
 * Phase 15b — §01 System signals (Server component).
 *
 * admin.html CSS: .fr-signal + .sig-* (L16031-16104)
 * admin.html markup: L39651-39774
 *
 * 9 signal rows. 8 fired (red-tinted) + 1 not-fired (signal 9, em-dash conf-value).
 * Signal 3 has inline <code> chip ("pm_4Xb…91N").
 * conf-fill width via inline style. Variant color (fired = danger, default = ink-soft).
 */
import type { FraudSignal, FraudSignalsData } from '@/lib/mock-data/admin/fraud-alerts-data';

interface FraudSectionSignalsProps {
  data: FraudSignalsData;
}

/** Render signal detail with optional inline <code> chip replacing `{code}` placeholder. */
function SignalDetail({ signal }: { signal: FraudSignal }) {
  if (signal.detailCodeChip) {
    const parts = signal.detail.split('{code}');
    return (
      <span>
        {parts[0]}
        <code className="font-mono text-[10.5px] bg-[var(--cream-deep)] py-[1px] px-[4px] rounded-[3px]">
          {signal.detailCodeChip}
        </code>
        {parts[1]}
      </span>
    );
  }
  return <>{signal.detail}</>;
}

export function FraudSectionSignals({ data }: FraudSectionSignalsProps) {
  return (
    <section
      data-fraud-section="signals"
      className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[20px] px-[24px] mb-[16px]"
    >
      {/* Section head */}
      <div className="flex items-end justify-between gap-[12px] flex-wrap mb-[16px] pb-[12px] border-b border-dashed border-[var(--line-soft)]">
        <div className="flex items-baseline gap-[10px]">
          <span className="font-mono text-[9.5px] bg-[var(--cream-deep)] text-[var(--ink-mute)] py-[2px] px-[6px] rounded-[3px] font-bold tracking-[0.06em]">
            01
          </span>
          <div>
            <h2 className="font-display text-[18px] font-medium tracking-[-0.01em] m-0 leading-[1.2] text-[var(--ink)]">
              System signals that triggered the alert
            </h2>
            <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em] mt-[4px]">
              {data.totalSignals} signals evaluated · {data.firedCount} fired · {data.lastEvaluated}
            </div>
          </div>
        </div>
      </div>

      {/* Signal list */}
      <div className="flex flex-col gap-[10px]">
        {data.signals.map((signal) => {
          const fired = signal.state === 'fired';
          return (
            <div
              key={signal.index}
              className={`grid grid-cols-[32px_1fr_110px] gap-[12px] items-center py-[12px] px-[14px] rounded-[var(--r-sm)] transition-[border-color] duration-[120ms] ease ${
                fired
                  ? 'bg-[rgba(194,65,43,0.025)] border border-[rgba(194,65,43,0.4)]'
                  : 'bg-[var(--paper-deep)] border border-[var(--line-soft)]'
              }`}
            >
              {/* sig-num */}
              <div
                className={`w-[28px] h-[28px] rounded-full grid place-items-center font-mono text-[11px] font-bold tracking-[0.02em] flex-shrink-0 ${
                  fired ? 'bg-[var(--danger)] text-[var(--paper)]' : 'bg-[var(--cream-deep)] text-[var(--ink-mute)]'
                }`}
              >
                {signal.index}
              </div>

              {/* sig-text */}
              <div className="min-w-0">
                <div className="text-[13px] font-semibold text-[var(--ink)] tracking-[-0.01em] mb-[2px]">
                  {signal.name}
                </div>
                <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.45]">
                  <SignalDetail signal={signal} />
                </div>
              </div>

              {/* sig-confidence */}
              <div className="text-right">
                <div
                  className={`font-mono text-[13px] font-bold tracking-[0.02em] tabular-nums ${
                    fired ? 'text-[var(--danger)]' : 'text-[var(--ink-mute)]'
                  }`}
                >
                  {fired ? `${signal.confidencePercent}%` : '—'}
                </div>
                <div className="h-[3px] bg-[var(--cream-deep)] rounded-full mt-[4px] overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${signal.confidencePercent}%`,
                      background: fired ? 'var(--danger)' : 'var(--ink-soft)',
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
