import type { TxFlowNode, TxFlowArrow, TxSettlementRow } from '@/lib/mock-data/admin/transactions-data';

interface TxMoneyFlowDiagramProps {
  sectionNum: string;
  meta: string;
  nodes: TxFlowNode[];
  arrows: TxFlowArrow[];
  settlement: TxSettlementRow[];
}

const NODE_VARIANT: Record<TxFlowNode['variant'], string> = {
  atlas: 'bg-[var(--ink)] border-[var(--ink)] text-[var(--paper)]',
  client: 'bg-[var(--paper)] border-[var(--super)] text-[var(--super)]',
  candidate: 'bg-[var(--paper)] border-[var(--lime-deep)] text-[var(--lime-deep)]',
};

function NodeIcon({ kind }: { kind: TxFlowNode['iconKind'] }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor' as const,
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  if (kind === 'atlas') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    );
  }
  if (kind === 'building') {
    return (
      <svg {...common}>
        <path d="M3 21h18" />
        <path d="M5 21V7l8-4v18" />
        <path d="M19 21V11l-6-4" />
      </svg>
    );
  }
  // person
  return (
    <svg {...common}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function FlowArrow({ amount, label, dashed, muted }: TxFlowArrow) {
  return (
    <div className="flex flex-col items-center gap-[6px]">
      <span className={`font-display tracking-[-0.01em] tabular-nums ${muted ? 'text-[12px] text-[var(--ink-mute)] font-medium' : 'text-[14px] text-[var(--ink)] font-medium'}`}>
        {amount}
      </span>
      <span
        className={`w-[60px] h-0 ${dashed ? 'border-t-2 border-dashed border-t-[var(--ink-mute)]' : muted ? 'border-t-2 border-solid border-t-[var(--cream-deep)]' : 'border-t-2 border-solid border-t-[var(--ink)]'}`}
      />
      <span className="font-mono text-[9px] tracking-[0.08em] uppercase text-[var(--ink-mute)] font-semibold">
        {label}
      </span>
    </div>
  );
}

export function TxMoneyFlowDiagram({ sectionNum, meta, nodes, arrows, settlement }: TxMoneyFlowDiagramProps) {
  return (
    <section className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[20px_24px] mb-[16px]">
      {/* Section head */}
      <div className="flex items-end justify-between gap-[12px] flex-wrap mb-[16px] pb-[12px] border-b border-dashed border-b-[var(--line-soft)]">
        <div className="flex items-baseline gap-[10px]">
          <span className="font-mono text-[9.5px] tracking-[0.06em] bg-[var(--cream-deep)] text-[var(--ink-mute)] px-[6px] py-[2px] rounded-[3px] font-bold">
            {sectionNum}
          </span>
          <div>
            <h2 className="font-display text-[18px] font-medium tracking-[-0.01em] text-[var(--ink)] leading-[1.2] m-0">
              Money flow
            </h2>
            <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em] mt-[4px]">
              {meta}
            </div>
          </div>
        </div>
      </div>

      {/* Flow diagram */}
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] max-[720px]:grid-cols-1 gap-[14px] max-[720px]:gap-[8px] items-center p-[22px_20px] bg-[var(--paper-deep)] border border-[var(--line-soft)] rounded-[var(--r-md)] mb-[18px]">
        {/* Node 1 */}
        <div className="flex flex-col items-center gap-[6px] text-center">
          <div className={`w-[44px] h-[44px] rounded-full border-2 grid place-items-center ${NODE_VARIANT[nodes[0]!.variant]}`}>
            <NodeIcon kind={nodes[0]!.iconKind} />
          </div>
          <div className="text-[12.5px] font-bold text-[var(--ink)] tracking-[-0.01em]">{nodes[0]!.name}</div>
          <div className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.02em]">{nodes[0]!.id}</div>
        </div>
        {arrows[0] && <FlowArrow {...arrows[0]} />}
        <div className="flex flex-col items-center gap-[6px] text-center">
          <div className={`w-[44px] h-[44px] rounded-full border-2 grid place-items-center ${NODE_VARIANT[nodes[1]!.variant]}`}>
            <NodeIcon kind={nodes[1]!.iconKind} />
          </div>
          <div className="text-[12.5px] font-bold text-[var(--ink)] tracking-[-0.01em]">{nodes[1]!.name}</div>
          <div className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.02em]">{nodes[1]!.id}</div>
        </div>
        {arrows[1] && <FlowArrow {...arrows[1]} />}
        <div className="flex flex-col items-center gap-[6px] text-center">
          <div className={`w-[44px] h-[44px] rounded-full border-2 grid place-items-center ${NODE_VARIANT[nodes[2]!.variant]}`}>
            <NodeIcon kind={nodes[2]!.iconKind} />
          </div>
          <div className="text-[12.5px] font-bold text-[var(--ink)] tracking-[-0.01em]">{nodes[2]!.name}</div>
          <div className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.02em]">{nodes[2]!.id}</div>
        </div>
      </div>

      {/* Settlement breakdown */}
      <div className="grid grid-cols-[minmax(0,1fr)_90px] gap-0 border border-[var(--line-soft)] rounded-[var(--r-sm)] overflow-hidden">
        <div className="bg-[var(--paper-deep)] py-[8px] px-[12px] font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold border-b border-b-[var(--line-soft)]">
          Settlement breakdown (if successful)
        </div>
        <div className="bg-[var(--paper-deep)] py-[8px] px-[12px] font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold border-b border-b-[var(--line-soft)] text-right">
          Amount
        </div>
        {settlement.map((row, i) => {
          const isLast = i === settlement.length - 1;
          return (
            <div key={i} className="contents">
              <div className={`py-[8px] px-[12px] text-[12px] ${isLast ? '' : 'border-b border-b-[var(--line-soft)]'} ${row.bold ? 'font-semibold text-[var(--ink)]' : 'text-[var(--ink-soft)]'}`}>
                {row.label}
              </div>
              <div className={`py-[8px] px-[12px] text-[12px] text-right font-mono tabular-nums ${isLast ? '' : 'border-b border-b-[var(--line-soft)]'} ${row.bold ? 'font-bold text-[var(--ink)]' : 'text-[var(--ink-soft)]'}`}>
                {row.value}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
