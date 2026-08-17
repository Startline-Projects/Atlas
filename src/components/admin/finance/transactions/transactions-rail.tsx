import Link from 'next/link';
import type { TxDetailProfile, TxQuickStat, TxValueVariant } from '@/lib/mock-data/admin/transactions-data';

interface TransactionsRailProps {
  profile: TxDetailProfile;
}

const VALUE_COLOR: Record<TxValueVariant, string> = {
  normal: 'text-[var(--ink)]',
  danger: 'text-[var(--danger)]',
  warn: 'text-[var(--amber)]',
};

function QuickstatRow({ row }: { row: TxQuickStat }) {
  const color = VALUE_COLOR[row.valueVariant ?? 'normal'];
  return (
    <div className="flex justify-between items-baseline gap-[12px] py-[8px] border-b border-dashed border-b-[var(--line-soft)] last:border-b-0 text-[12.5px]">
      <span className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em]">{row.label}</span>
      <span className={`font-body font-semibold tracking-[-0.01em] text-right ${color}`}>
        {row.link ? (
          <Link
            href={row.link}
            className="text-[var(--ink)] underline cursor-pointer hover:text-[var(--super)]"
          >
            {row.value}
          </Link>
        ) : (
          row.value
        )}
      </span>
    </div>
  );
}

export function TransactionsRail({ profile }: TransactionsRailProps) {
  return (
    <aside className="sticky top-[80px] flex flex-col gap-[14px] self-start max-[1100px]:static max-[1100px]:order-[-1]">
      {/* At a glance */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[18px_20px]">
        <h3 className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold m-0 mb-[14px]">
          At a glance
        </h3>
        <div className="flex flex-col">
          {profile.atAGlance.map((row, i) => (
            <QuickstatRow key={i} row={row} />
          ))}
        </div>
      </div>

      {/* Related transactions */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[18px_20px]">
        <h3 className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold m-0 mb-[14px]">
          Related transactions
        </h3>
        <div className="flex flex-col">
          {profile.relatedTransactions.map((row, i) => (
            <QuickstatRow key={i} row={row} />
          ))}
        </div>
        {profile.linkedSanctionId && profile.linkedSanctionLabel && (
          <div className="mt-[10px] pt-[10px] border-t border-dashed border-t-[var(--line-soft)] font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5]">
            Linked sanction:{' '}
            <Link
              href={`/admin/trust-safety/suspensions-bans/${profile.linkedSanctionId}`}
              className="text-[var(--amber)] underline cursor-pointer font-bold hover:text-[var(--ink)]"
            >
              {profile.linkedSanctionLabel} →
            </Link>{' '}
            · {profile.linkedSanctionMeta ?? ''}
          </div>
        )}
      </div>
    </aside>
  );
}
