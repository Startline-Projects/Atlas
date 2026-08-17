interface TransactionFlowCellProps {
  fromName: string;
  fromId: string;
  toName: string;
  toId: string;
}

export function TransactionFlowCell({ fromName, fromId, toName, toId }: TransactionFlowCellProps) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_16px_minmax(0,1fr)] gap-[8px] items-center font-mono text-[10.5px] tracking-[0.02em]">
      <div className="min-w-0">
        <div className="text-[var(--ink)] font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
          {fromName}
        </div>
        <div className="text-[var(--ink-mute)] text-[9.5px] mt-[1px] whitespace-nowrap overflow-hidden text-ellipsis">
          {fromId}
        </div>
      </div>
      <div className="text-[var(--ink-mute)] grid place-items-center">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </div>
      <div className="min-w-0">
        <div className="text-[var(--ink)] font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
          {toName}
        </div>
        <div className="text-[var(--ink-mute)] text-[9.5px] mt-[1px] whitespace-nowrap overflow-hidden text-ellipsis">
          {toId}
        </div>
      </div>
    </div>
  );
}
