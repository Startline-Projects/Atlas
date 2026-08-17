import type { TxDetailProfile } from '@/lib/mock-data/admin/transactions-data';

interface TxRefundDrawerProps {
  drawer: NonNullable<TxDetailProfile['refundDrawer']>;
}

export function TxRefundDrawer({ drawer }: TxRefundDrawerProps) {
  return (
    <section className="bg-[var(--paper)] border-[1.5px] border-[var(--amber)] rounded-[var(--r-md)] mb-[18px] overflow-hidden relative">
      <span aria-hidden="true" className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--amber)]" />

      {/* Head */}
      <div className="flex items-start justify-between gap-[14px] py-[16px] px-[20px] border-b border-b-[var(--line-soft)] bg-[var(--amber-bg)] flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-[var(--amber)] font-bold mb-[3px]">
            {drawer.eyebrow}
          </div>
          <h3 className="font-display text-[16px] font-medium tracking-[-0.01em] m-0 mb-[3px] text-[var(--ink)] leading-[1.2]">
            {drawer.title}
          </h3>
          <div className="font-mono text-[10.5px] text-[var(--ink-soft)] tracking-[0.04em]">
            {drawer.meta}
          </div>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[8px] pr-[14px] pl-[12px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] transition-all"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          Close
        </button>
      </div>

      {/* Body */}
      <div className="py-[18px] px-[20px] grid grid-cols-2 max-[720px]:grid-cols-1 gap-[18px]">
        {/* Amount block */}
        <div>
          <div className="flex items-center gap-[8px] font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-bold mb-[8px]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            Refund amount
          </div>
          <div className="flex items-stretch border border-[var(--line)] rounded-[var(--r-sm)] bg-[var(--paper-deep)] overflow-hidden">
            <input
              type="text"
              defaultValue={drawer.amountInput}
              className="flex-1 border-0 py-[10px] px-[12px] font-display text-[17px] font-medium text-[var(--ink)] tracking-[-0.01em] bg-transparent outline-none tabular-nums min-w-0"
            />
            <span className="grid place-items-center py-0 px-[12px] bg-[var(--cream-deep)] border-l border-l-[var(--line)] font-mono text-[11px] font-bold text-[var(--ink-soft)] tracking-[0.06em]">
              {drawer.currency}
            </span>
          </div>
          <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[6px]">
            {drawer.amountMetaHTMLText}
          </div>
          <div className="flex gap-[4px] flex-wrap mt-[8px]">
            {drawer.presets.map((p) => {
              const isActive = !!p.active;
              return (
                <button
                  key={p.preset}
                  type="button"
                  className={`py-[4px] px-[10px] font-mono text-[11px] font-semibold border rounded-full cursor-pointer tracking-[0.02em] transition-all ${
                    isActive
                      ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]'
                      : 'bg-[var(--paper)] text-[var(--ink-soft)] border-[var(--line)] hover:text-[var(--ink)] hover:border-[var(--line-strong)]'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Reason block */}
        <div>
          <div className="flex items-center gap-[8px] font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-bold mb-[8px]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Reason for refund
            <span className="ml-auto font-mono text-[9px] tracking-[0.06em] bg-[var(--cream-deep)] text-[var(--ink-mute)] px-[5px] py-[1px] rounded-[3px] font-semibold normal-case">
              required
            </span>
          </div>
          <select
            defaultValue={drawer.reasonSelected}
            className="w-full border border-[var(--line)] rounded-[var(--r-sm)] py-[9px] px-[10px] font-body text-[12.5px] text-[var(--ink)] bg-[var(--paper-deep)] outline-none tracking-[-0.005em] cursor-pointer mb-[12px]"
          >
            {drawer.reasonOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <div className="flex items-center gap-[8px] font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-bold mb-[6px]">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Internal notes
          </div>
          <textarea
            placeholder="Optional internal notes · admin-only · audit logged · supports markdown…"
            className="w-full border border-[var(--line)] rounded-[var(--r-sm)] py-[8px] px-[10px] font-body text-[12.5px] text-[var(--ink)] bg-[var(--paper-deep)] outline-none tracking-[-0.005em] resize-y min-h-[60px] leading-[1.5]"
          />
        </div>
      </div>

      {/* Foot */}
      <div className="flex justify-between items-center gap-[14px] py-[14px] px-[20px] border-t border-t-[var(--line-soft)] bg-[var(--paper-deep)] flex-wrap">
        <div className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.5] flex-1 min-w-[200px]">
          {drawer.footSummaryHTML}
        </div>
        <div className="inline-flex gap-[8px]">
          <button
            type="button"
            className="inline-flex items-center gap-[6px] py-[8px] pr-[14px] pl-[12px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-[6px] py-[8px] pr-[14px] pl-[12px] font-body text-[12.5px] font-medium bg-[var(--ink)] text-[var(--paper)] border border-[var(--ink)] rounded-full cursor-pointer whitespace-nowrap hover:bg-black transition-all"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Confirm refund
          </button>
        </div>
      </div>
    </section>
  );
}
