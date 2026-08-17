import Link from 'next/link';
import type { TxStubProfile } from '@/lib/mock-data/admin/transactions-data';
import { TransactionStatusPill } from './transaction-status-pill';
import { TransactionTypePill } from './transaction-type-pill';

interface TransactionsStubProps {
  stub: TxStubProfile;
}

export function TransactionsStub({ stub }: TransactionsStubProps) {
  return (
    <div className="max-w-[1320px] mx-auto pt-[22px] px-[32px] pb-[64px] max-[720px]:pt-[18px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      {/* Breadcrumb */}
      <div className="inline-flex items-center gap-[6px] font-mono text-[11px] tracking-[0.02em] text-[var(--ink-mute)] mb-[18px] flex-wrap">
        <Link
          href="/admin/finance/transactions"
          className="text-[var(--ink-mute)] no-underline hover:text-[var(--ink)] cursor-pointer transition-colors duration-[120ms]"
        >
          Transactions
        </Link>
        <span className="text-[var(--ink-mute)] opacity-50">›</span>
        <span className="text-[var(--ink)] font-semibold">
          {stub.atlasId} · {stub.refClientName}
        </span>
      </div>

      {/* Minimal hero */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[22px_26px] mb-[22px] relative overflow-hidden border-t-[4px] border-t-[var(--line-strong)]">
        <div className="flex items-center gap-[10px] flex-wrap mb-[8px]">
          <span className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.04em] font-semibold">
            {stub.atlasId}
          </span>
          <TransactionStatusPill status={stub.status} label={stub.statusLabel} />
          <TransactionTypePill type={stub.type} label={stub.typeLabel} />
          <span className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em]">
            {stub.timestamp} · {stub.relativeTime}
          </span>
        </div>

        <h1 className="font-display text-[26px] font-medium tracking-[-0.02em] mb-[6px] leading-[1.2] text-[var(--ink)]">
          {stub.title}
        </h1>

        <div className="font-mono text-[11.5px] tracking-[0.04em] text-[var(--ink-mute)] leading-[1.5]">
          <span className="text-[var(--ink-soft)] font-semibold">
            {stub.refClientName} ({stub.refClientId})
          </span>
        </div>
      </div>

      {/* Placeholder */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[28px_32px] text-center">
        <div className="font-display text-[16px] font-medium text-[var(--ink)] tracking-[-0.01em] mb-[6px]">
          Full transaction breakdown not yet wired
        </div>
        <div className="font-mono text-[11.5px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5]">
          The canonical detail breakdown (money-flow diagram, processor card, error analysis, audit
          timeline, refund drawer) is wired up for TX-2026-08442 (Studio Berlin failed payment). Other
          transactions are scaffolded for routing parity and will be populated in Pass B.
        </div>
        <div className="mt-[16px]">
          <Link
            href="/admin/finance/transactions"
            className="inline-flex items-center gap-[6px] py-[8px] pr-[14px] pl-[12px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] transition-all"
          >
            ← Back to transactions
          </Link>
        </div>
      </div>
    </div>
  );
}
