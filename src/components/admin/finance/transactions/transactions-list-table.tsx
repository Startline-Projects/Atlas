import Link from 'next/link';
import type { TxListRow } from '@/lib/mock-data/admin/transactions-data';
import { TransactionTypePill } from './transaction-type-pill';
import { TransactionStatusPill } from './transaction-status-pill';
import { TransactionAmount } from './transaction-amount';
import { TransactionFlowCell } from './transaction-flow-cell';

interface TransactionsListTableProps {
  rows: TxListRow[];
}

const COLS =
  'grid grid-cols-[110px_120px_280px_minmax(0,1fr)_120px_110px_50px] max-[1280px]:grid-cols-[100px_110px_240px_minmax(0,1fr)_110px_100px_50px] gap-[10px] items-center py-[12px] px-[18px]';

export function TransactionsListTable({ rows }: TransactionsListTableProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
      {/* Table head */}
      <div
        className={`${COLS} bg-[var(--paper-deep)] border-b border-b-[var(--line)] font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold`}
      >
        <div>Date</div>
        <div>Type</div>
        <div>Flow</div>
        <div>Ref</div>
        <div className="text-right">Amount</div>
        <div>Status</div>
        <div />
      </div>

      {/* Rows */}
      {rows.map((row, idx) => {
        const isFailed = row.variant === 'failed';
        const isRefunded = row.variant === 'refunded';
        const rowBg = isFailed
          ? 'bg-[rgba(194,65,43,0.025)]'
          : isRefunded
            ? 'bg-[rgba(110,63,224,0.025)]'
            : '';
        const isLast = idx === rows.length - 1;

        return (
          <Link
            key={row.id}
            href={`/admin/finance/transactions/${row.id}`}
            className={`${COLS} cursor-pointer transition-colors relative hover:bg-[var(--paper-deep)] ${rowBg} ${isLast ? '' : 'border-b border-b-[var(--line-soft)]'}`}
          >
            {isFailed && (
              <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--danger)]" />
            )}
            {isRefunded && (
              <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--super)]" />
            )}

            {/* col-date */}
            <div className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em]">
              {row.date}
              <span className="block text-[9.5px] text-[var(--ink-mute)] tracking-[0.04em] mt-[2px]">
                {row.dateRelative}
              </span>
            </div>

            {/* col-type */}
            <div className="min-w-0 overflow-hidden">
              <TransactionTypePill type={row.type} label={row.typeLabel} />
            </div>

            {/* col-flow */}
            <div className="min-w-0 overflow-hidden">
              <TransactionFlowCell
                fromName={row.fromName}
                fromId={row.fromId}
                toName={row.toName}
                toId={row.toId}
              />
            </div>

            {/* col-ref */}
            <div className="font-mono text-[11px] font-semibold text-[var(--ink-soft)] tracking-[0.02em] flex flex-col min-w-0 overflow-hidden">
              <span className="truncate">{row.refId}</span>
              <span className="block font-mono text-[9.5px] text-[var(--ink-mute)] font-medium tracking-[0.04em] mt-[2px] truncate">
                {row.refMeta}
              </span>
            </div>

            {/* col-amount */}
            <div>
              <TransactionAmount
                amount={row.amount}
                currency={row.currency}
                variant={row.amountVariant}
                meta={row.amountMeta}
              />
            </div>

            {/* col-status */}
            <div>
              <TransactionStatusPill status={row.status} label={row.statusLabel} />
            </div>

            {/* col-actions (decorative) */}
            <div>
              <span
                className="w-[28px] h-[28px] border border-[var(--line)] bg-[var(--paper)] rounded-full grid place-items-center text-[var(--ink-mute)]"
                aria-hidden="true"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
