import { bulkOperationsHeader, bulkOpCards } from '@/lib/mock-data/admin/tax-documents-data';

function renderWithStrong(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((p, i) =>
    i % 2 === 1
      ? <strong key={i} className="text-[var(--ink)] font-bold">{p}</strong>
      : <span key={i}>{p}</span>
  );
}

function renderDescWithStrong(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((p, i) =>
    i % 2 === 1
      ? <strong key={i} className="text-[var(--ink)] font-bold">{p}</strong>
      : <span key={i}>{p}</span>
  );
}

export function TdBulkOperations() {
  return (
    <section id="td-section-bulk" className="scroll-mt-[120px] mb-[28px]">
      <div className="flex items-end justify-between gap-[12px] flex-wrap mb-[14px] pb-[12px] border-b border-b-[var(--line)]">
        <div>
          <h2 className="font-display text-[22px] font-medium tracking-[-0.02em] text-[var(--ink)] mb-[4px] leading-[1.2]">
            {bulkOperationsHeader.title}
          </h2>
          <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em]">
            {bulkOperationsHeader.meta}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[14px] max-[880px]:grid-cols-1">
        {bulkOpCards.map((card) => {
          const isComplete = card.variant === 'complete';
          const isUrgent = card.variant === 'urgent';

          return (
            <div
              key={card.id}
              className={`bg-[var(--paper)] rounded-[var(--r-md)] p-[18px_20px] flex flex-col gap-[12px] relative ${isComplete ? 'border border-[rgba(46,125,84,0.3)]' : isUrgent ? 'border border-[var(--amber)]' : 'border border-[var(--line)]'}`}
              style={isComplete ? { background: 'linear-gradient(135deg, rgba(46,125,84,0.02), var(--paper))' } : undefined}
            >
              {isUrgent && <span className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--amber)]" />}

              <div className="flex items-start gap-[12px]">
                <div
                  className={`w-[36px] h-[36px] rounded-[8px] grid place-items-center flex-shrink-0 border ${isComplete ? 'bg-[var(--success-bg)] text-[var(--success)] border-[rgba(46,125,84,0.3)]' : isUrgent ? 'bg-[var(--amber-bg)] text-[var(--amber)] border-[rgba(232,118,58,0.3)]' : 'bg-[var(--paper-deep)] text-[var(--ink-soft)] border-[var(--line)]'}`}
                  dangerouslySetInnerHTML={{ __html: card.iconSvg }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-[15px] font-medium tracking-[-0.01em] text-[var(--ink)] mb-[4px] leading-[1.2]">
                    {card.title}
                  </h3>
                  <div className="font-mono text-[10.5px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.55]">
                    {renderDescWithStrong(card.desc)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-[10px] py-[10px] px-[12px] bg-[var(--paper-deep)] rounded-[var(--r-sm)]">
                <div>
                  <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-bold mb-[3px]">
                    {card.stat1Label}
                  </div>
                  <div className={`font-display text-[17px] font-medium tracking-[-0.01em] leading-none tabular-nums ${card.stat1Value === 'Connected' ? 'text-[var(--success)]' : 'text-[var(--ink)]'}`}>
                    {card.stat1Value}
                  </div>
                  <div className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px]">
                    {card.stat1Meta}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-bold mb-[3px]">
                    {card.stat2Label}
                  </div>
                  <div className="font-display text-[17px] font-medium text-[var(--ink)] tracking-[-0.01em] leading-none tabular-nums">
                    {card.stat2Value}
                  </div>
                  <div className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px]">
                    {card.stat2Meta}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-[10px] pt-[10px] flex-wrap border-t border-dashed border-t-[var(--line-soft)]">
                <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5]">
                  {renderWithStrong(card.lastRun)}
                </div>
                <button className={`inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full cursor-pointer transition-all ${card.actionPrimary ? 'bg-[var(--ink)] text-[var(--paper)] border border-[var(--ink)] hover:bg-[var(--ink-soft)]' : 'bg-[var(--paper)] text-[var(--ink-soft)] border border-[var(--line)] hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]'}`}>
                  {card.actionLabel}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
