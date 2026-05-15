import type { TxTotalCard, TxTotalVariant } from '@/lib/mock-data/admin/transactions-data';

interface TransactionsListTotalsStripProps {
  totals: TxTotalCard[];
}

const VALUE_COLOR: Record<TxTotalVariant, string> = {
  normal: 'text-[var(--ink)]',
  success: 'text-[var(--success)]',
  warn: 'text-[var(--amber)]',
  danger: 'text-[var(--danger)]',
};

export function TransactionsListTotalsStrip({ totals }: TransactionsListTotalsStripProps) {
  return (
    <div className="grid grid-cols-5 max-[1080px]:grid-cols-3 max-[720px]:grid-cols-2 gap-0 bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] mb-[16px] overflow-hidden">
      {totals.map((t, idx) => {
        const variant = t.variant ?? 'normal';
        const valueColor = VALUE_COLOR[variant];
        const isLast = idx === totals.length - 1;
        // Desktop: every cell except last has right border
        // 1080px: every 3rd cell loses right border, first 3 get bottom border
        // 720px: every 2nd cell loses right border, first 4 get bottom border
        const desktopBorder = isLast ? '' : 'border-r border-r-[var(--line-soft)]';
        const m1080 =
          (idx + 1) % 3 === 0
            ? 'max-[1080px]:border-r-0'
            : '';
        const m1080Bottom = idx < 3 ? 'max-[1080px]:border-b max-[1080px]:border-b-[var(--line-soft)]' : '';
        const m720 =
          (idx + 1) % 2 === 0
            ? 'max-[720px]:border-r-0'
            : 'max-[720px]:border-r max-[720px]:border-r-[var(--line-soft)]';
        const m720Bottom = idx < 4 ? 'max-[720px]:border-b max-[720px]:border-b-[var(--line-soft)]' : '';

        return (
          <div
            key={t.label}
            className={`py-[14px] px-[18px] flex flex-col gap-[4px] ${desktopBorder} ${m1080} ${m1080Bottom} ${m720} ${m720Bottom}`}
          >
            <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold">
              {t.label}
            </div>
            <div
              className={`font-display text-[22px] font-medium tracking-[-0.02em] leading-[1.1] tabular-nums flex items-baseline gap-[4px] ${valueColor}`}
            >
              {t.value}
              {t.suffix && (
                <span className="font-mono text-[10px] text-[var(--ink-mute)] font-medium tracking-[0.04em]">
                  {t.suffix}
                </span>
              )}
            </div>
            <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em]">
              {t.metaBold && (
                <>
                  <strong className="text-[var(--ink-soft)] font-bold">{t.metaBold}</strong>{' '}
                </>
              )}
              {t.meta}
            </div>
          </div>
        );
      })}
    </div>
  );
}
