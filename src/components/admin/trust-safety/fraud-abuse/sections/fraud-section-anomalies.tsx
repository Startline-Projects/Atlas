/**
 * Phase 15b — §03 Behavioral anomalies (Server component).
 *
 * admin.html CSS: .fr-anomaly-row + .an-* (L16248-16293)
 * admin.html markup: L39891-39956
 *
 * 5 anomaly rows: grid 32/1fr/90 gap-12 items-center py-10 border-b dashed line-soft (last:none).
 * Icon variants: default (bg paper-deep, color amber) or danger (bg danger-bg, color danger).
 * Sigma badge inlined: mono 11.5px 700 0.02em, color danger or amber.
 */
import type { FraudAnomaliesData, FraudAnomalyIconKey } from '@/lib/mock-data/admin/fraud-alerts-data';

interface FraudSectionAnomaliesProps {
  data: FraudAnomaliesData;
}

/** Icon SVG dictionary — admin.html L39904-39949 verbatim path data. */
function AnomalyIcon({ iconKey }: { iconKey: FraudAnomalyIconKey }) {
  switch (iconKey) {
    case 'clock':
      return (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>);
    case 'activity':
      return (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>);
    case 'bolt':
      return (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>);
    case 'dollar':
      return (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>);
    case 'star':
      return (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="12 2 15 8.5 22 9.3 17 14.1 18 21 12 17.7 6 21 7 14.1 2 9.3 9 8.5 12 2"/></svg>);
  }
}

export function FraudSectionAnomalies({ data }: FraudSectionAnomaliesProps) {
  return (
    <section
      data-fraud-section="anomalies"
      className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[20px] px-[24px] mb-[16px]"
    >
      {/* Section head */}
      <div className="flex items-end justify-between gap-[12px] flex-wrap mb-[16px] pb-[12px] border-b border-dashed border-[var(--line-soft)]">
        <div className="flex items-baseline gap-[10px]">
          <span className="font-mono text-[9.5px] bg-[var(--cream-deep)] text-[var(--ink-mute)] py-[2px] px-[6px] rounded-[3px] font-bold tracking-[0.06em]">
            03
          </span>
          <div>
            <h2 className="font-display text-[18px] font-medium tracking-[-0.01em] m-0 leading-[1.2] text-[var(--ink)]">
              Behavioral anomalies
            </h2>
            <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em] mt-[4px]">
              deviation from normal client behavior · last 30 days
            </div>
          </div>
        </div>
      </div>

      {/* Anomaly rows */}
      <div>
        {data.anomalies.map((anomaly, i) => {
          const danger = anomaly.variant === 'danger';
          return (
            <div
              key={anomaly.name}
              className={`grid grid-cols-[32px_1fr_90px] gap-[12px] items-center py-[10px] ${
                i < data.anomalies.length - 1 ? 'border-b border-dashed border-[var(--line-soft)]' : ''
              }`}
            >
              {/* an-icon */}
              <div
                className={`w-[28px] h-[28px] rounded-[6px] grid place-items-center flex-shrink-0 ${
                  danger
                    ? 'bg-[var(--danger-bg)] text-[var(--danger)]'
                    : 'bg-[var(--paper-deep)] text-[var(--amber)]'
                }`}
              >
                <AnomalyIcon iconKey={anomaly.iconKey} />
              </div>

              {/* an-text */}
              <div className="min-w-0">
                <div className="text-[13px] font-semibold text-[var(--ink)] tracking-[-0.01em]">
                  {anomaly.name}
                </div>
                <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.4] mt-[2px]">
                  {anomaly.detail}
                </div>
              </div>

              {/* sigma badge (inlined) */}
              <div
                className={`text-right font-mono text-[11.5px] font-bold tracking-[0.02em] ${
                  danger ? 'text-[var(--danger)]' : 'text-[var(--amber)]'
                }`}
              >
                {anomaly.sigmaValue}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
