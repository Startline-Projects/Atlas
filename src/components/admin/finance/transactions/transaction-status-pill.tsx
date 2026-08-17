import type { TxStatus } from '@/lib/mock-data/admin/transactions-data';

interface TransactionStatusPillProps {
  status: TxStatus;
  label: string;
}

const VARIANT: Record<TxStatus, string> = {
  completed: 'bg-[var(--success-bg)] text-[var(--success)]',
  pending: 'bg-[var(--amber-bg)] text-[var(--amber)]',
  failed: 'bg-[var(--danger-bg)] text-[var(--danger)]',
  refunded: 'bg-[rgba(110,63,224,0.10)] text-[var(--super)]',
  processing: 'bg-[var(--cream-deep)] text-[var(--ink-mute)]',
};

export function TransactionStatusPill({ status, label }: TransactionStatusPillProps) {
  return (
    <>
      <style>{`
        @keyframes tx-pulse-fr {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
      `}</style>
      <span
        className={`inline-flex items-center gap-[5px] py-[3px] px-[9px] font-mono text-[9.5px] font-bold tracking-[0.08em] uppercase rounded-full ${VARIANT[status]}`}
      >
        {status === 'processing' && (
          <span
            className="inline-block w-[5px] h-[5px] rounded-full bg-[var(--ink-mute)]"
            style={{ animation: 'tx-pulse-fr 1.4s ease-in-out infinite' }}
          />
        )}
        {label}
      </span>
    </>
  );
}
