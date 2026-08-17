import type { TxAmountVariant } from '@/lib/mock-data/admin/transactions-data';

interface TransactionAmountProps {
  amount: string;
  currency: string;
  variant: TxAmountVariant;
  meta?: string | undefined;
}

const COLOR: Record<TxAmountVariant, string> = {
  normal: 'text-[var(--ink)]',
  negative: 'text-[var(--danger)]',
  outgoing: 'text-[var(--ink)]',
  incoming: 'text-[var(--ink)]',
  muted: 'text-[var(--ink-mute)] font-normal',
};

export function TransactionAmount({ amount, currency, variant, meta }: TransactionAmountProps) {
  const prefix =
    variant === 'outgoing' ? (
      <span className="text-[var(--ink-mute)] mr-[1px]">−</span>
    ) : variant === 'incoming' ? (
      <span className="text-[var(--success)] mr-[1px]">+</span>
    ) : null;

  return (
    <div
      className={`font-display text-[15px] font-medium tracking-[-0.01em] tabular-nums text-right leading-[1.1] ${COLOR[variant]}`}
    >
      <span>
        {prefix}
        {amount}
        <span
          className="font-mono text-[9.5px] font-bold text-[var(--ink-mute)] tracking-[0.06em] ml-[4px]"
          style={{ verticalAlign: '1px' }}
        >
          {currency}
        </span>
      </span>
      {meta && (
        <span className="block font-mono text-[9.5px] font-medium text-[var(--ink-mute)] tracking-[0.04em] mt-[2px] text-right">
          {meta}
        </span>
      )}
    </div>
  );
}
