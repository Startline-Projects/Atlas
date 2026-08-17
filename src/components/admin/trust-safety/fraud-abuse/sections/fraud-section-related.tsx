/**
 * Phase 15b — §02 Related accounts (Server component).
 * Phase 15e — Optional graph + per-alert sectionMeta.
 *
 * admin.html CSS: .fr-network + .fr-network-legend + .fr-shared-signals (L16106-16246)
 * admin.html markup: L39777-39888
 *
 * When data.graph is present + has nodes: render network + legend + table.
 * When data.graph is absent: render only the matrix table (single-account alerts).
 */
import type { FraudRelatedData } from '@/lib/mock-data/admin/fraud-alerts-data';
import { FraudNetworkGraphEl } from '../fraud-network-graph';

interface FraudSectionRelatedProps {
  data: FraudRelatedData;
}

export function FraudSectionRelated({ data }: FraudSectionRelatedProps) {
  const hasGraph = !!data.graph && data.graph.nodes.length > 0;

  return (
    <section
      data-fraud-section="related-accounts"
      className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[20px] px-[24px] mb-[16px]"
    >
      {/* Section head */}
      <div className="flex items-end justify-between gap-[12px] flex-wrap mb-[16px] pb-[12px] border-b border-dashed border-[var(--line-soft)]">
        <div className="flex items-baseline gap-[10px]">
          <span className="font-mono text-[9.5px] bg-[var(--cream-deep)] text-[var(--ink-mute)] py-[2px] px-[6px] rounded-[3px] font-bold tracking-[0.06em]">
            02
          </span>
          <div>
            <h2 className="font-display text-[18px] font-medium tracking-[-0.01em] m-0 leading-[1.2] text-[var(--ink)]">
              Related accounts &amp; pattern analysis
            </h2>
            <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em] mt-[4px]">
              {data.sectionMeta}
            </div>
          </div>
        </div>
      </div>

      {/* Network graph + legend (only when graph present) */}
      {hasGraph && data.graph && (
        <>
          <FraudNetworkGraphEl graph={data.graph} />
          <div className="flex gap-[12px] flex-wrap font-mono text-[10px] text-[var(--ink-soft)] tracking-[0.04em] mt-[10px]">
            <span className="inline-flex items-center gap-[5px]">
              <span className="w-[9px] h-[9px] rounded-full border-[1.5px] border-[var(--ink)] bg-[var(--ink)]" />
              Lead / target account
            </span>
            <span className="inline-flex items-center gap-[5px]">
              <span className="w-[9px] h-[9px] rounded-full border-[1.5px] border-[var(--danger)] bg-[var(--danger-bg)]" />
              Linked / satellite account
            </span>
            <span className="inline-flex items-center gap-[5px]">
              <span className="w-[16px] h-[2px] bg-[var(--danger)] rounded-full" />
              Shared signals
            </span>
          </div>
        </>
      )}

      {/* Shared-signals matrix table (always renders) */}
      <div className={`grid grid-cols-1 ${hasGraph ? 'mt-[14px]' : ''} font-mono text-[11.5px] border border-[var(--line)] rounded-[var(--r-sm)] overflow-hidden`}>
        {/* Head row */}
        <div className="grid grid-cols-[1fr_90px_130px] gap-[12px] items-baseline py-[8px] px-[14px] bg-[var(--paper-deep)] border-b border-[var(--line)] font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-bold">
          <div>Entity</div>
          <div className="text-right">Signals</div>
          <div className="text-right">Status</div>
        </div>

        {/* Body rows */}
        {data.table.rows.map((row, i) => (
          <div
            key={row.nameStrong}
            className={`grid grid-cols-[1fr_90px_130px] gap-[12px] items-baseline py-[8px] px-[14px] ${
              i < data.table.rows.length - 1 ? 'border-b border-[var(--line-soft)]' : ''
            }`}
          >
            <div className="text-[var(--ink-soft)]">
              <strong className="text-[var(--ink)] font-bold">{row.nameStrong}</strong>
              {row.meta}
            </div>
            <div className="text-right font-bold text-[var(--danger)] tabular-nums">
              {row.signalsFired} / {row.signalsTotal}
            </div>
            <div className="text-right text-[var(--ink-soft)] tracking-[0.02em]">
              {row.status}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
