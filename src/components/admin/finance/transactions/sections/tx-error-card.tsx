import type { TxDetailProfile } from '@/lib/mock-data/admin/transactions-data';

interface TxErrorCardProps {
  error: NonNullable<TxDetailProfile['error']>;
}

export function TxErrorCard({ error }: TxErrorCardProps) {
  return (
    <section className="bg-[var(--danger-bg)] border-[1.5px] border-[var(--danger)] rounded-[var(--r-md)] p-[16px_20px] mb-[18px] flex items-start gap-[14px] flex-wrap">
      <div className="w-[36px] h-[36px] rounded-full bg-[var(--paper)] grid place-items-center text-[var(--danger)] flex-shrink-0">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-display text-[15px] font-medium tracking-[-0.01em] text-[var(--ink)] mb-[4px]">
          {error.title}
        </div>
        <div className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.55]">
          {error.detail}{' '}
          <code className="font-mono text-[10.5px] bg-[var(--paper)] px-[5px] py-[1px] rounded-[3px]">
            {error.detailCode}
          </code>
          {error.detailExtra}
          <br />
          <strong className="text-[var(--ink)] font-bold">Suggested actions:</strong> {error.suggestedActions}
        </div>
      </div>
      <div className="inline-flex gap-[6px] flex-shrink-0">
        {error.actions.map((action) => {
          const isWarn = action.variant === 'warn';
          const classes = isWarn
            ? 'bg-[var(--paper)] text-[var(--amber)] border-[rgba(232,118,58,0.3)] hover:border-[var(--amber)] hover:bg-[var(--amber-bg)]'
            : 'bg-[var(--paper)] text-[var(--ink-soft)] border-[var(--line)] hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)]';
          return (
            <button
              key={action.label}
              type="button"
              className={`inline-flex items-center gap-[6px] py-[8px] pr-[14px] pl-[12px] font-body text-[12.5px] font-medium border rounded-full cursor-pointer whitespace-nowrap transition-all ${classes}`}
            >
              {action.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
