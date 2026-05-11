import type {
  EngagementProfile,
  PayIconVariant,
  PayTagVariant,
  PaymentRow,
} from '@/lib/mock-data/admin/engagement-profiles-data';
import { cn } from '@/lib/utils/cn';

interface EngSubPaymentsProps {
  engagement: EngagementProfile;
}

// admin.html lines 10091-10107 — pay-icon variants
function payIconClass(variant: PayIconVariant): string {
  switch (variant) {
    case 'pending':
      return 'bg-[var(--amber-bg)] text-[var(--amber)]';
    case 'held':
      return 'bg-[var(--danger-bg)] text-[var(--danger)]';
    case 'released':
    default:
      return 'bg-[var(--success-bg)] text-[var(--success)]';
  }
}

// admin.html lines 10154-10169 — pay-tag variants
function payTagClass(variant: PayTagVariant): string {
  switch (variant) {
    case 'pending':
      return 'bg-[var(--amber-bg)] text-[var(--amber)]';
    case 'held':
      return 'bg-[var(--danger-bg)] text-[var(--danger)]';
    case 'scheduled':
      return 'bg-[var(--cream-deep)] text-[var(--ink-mute)]';
    case 'released':
    default:
      return 'bg-[var(--success-bg)] text-[var(--success)]';
  }
}

function PayIconSvg({ isCheck }: { isCheck: boolean }) {
  if (isCheck) {
    // checkmark — admin.html line 22007
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    );
  }
  // clock — admin.html line 21990
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function PaymentRowView({ row }: { row: PaymentRow }) {
  return (
    <div className="grid grid-cols-[auto_1.4fr_1.6fr_1fr_auto] gap-[14px] items-center py-[12px] px-[20px] border-b border-dashed border-[var(--line-soft)] last:border-b-0 text-[12.5px]">
      <span
        aria-hidden="true"
        className={cn(
          'w-[32px] h-[32px] rounded-full grid place-items-center flex-shrink-0',
          payIconClass(row.iconVariant)
        )}
      >
        <PayIconSvg isCheck={row.iconIsCheck} />
      </span>

      <div className="font-semibold text-[var(--ink)] min-w-0">
        {row.periodLabel}
        <span className="block font-mono text-[10.5px] text-[var(--ink-mute)] font-normal mt-[2px] tracking-[0.02em]">
          {row.periodMeta}
        </span>
      </div>

      <div className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em] min-w-0">
        {row.detailLine}
        <span className="block text-[10.5px] text-[var(--ink-mute)] mt-[2px]">
          {row.detailMeta}
        </span>
      </div>

      <div
        className={cn(
          'font-display text-[17px] font-medium tracking-[-0.01em] [font-variant-numeric:tabular-nums] text-right whitespace-nowrap',
          row.amountReleased ? 'text-[var(--success)]' : 'text-[var(--ink)]'
        )}
      >
        {row.amount}
      </div>

      <span
        className={cn(
          'font-mono text-[9px] tracking-[0.12em] uppercase py-[3px] px-[8px] rounded-[3px] font-semibold whitespace-nowrap',
          payTagClass(row.tagVariant)
        )}
      >
        {row.tagLabel}
      </span>
    </div>
  );
}

export function EngSubPayments({ engagement }: EngSubPaymentsProps) {
  const { payments } = engagement;

  return (
    <section
      id="eng-section-payments"
      className="py-[36px] border-t border-[var(--line)] scroll-mt-[80px] [&:first-child]:border-t-0 [&:first-child]:pt-[12px]"
    >
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            03 · 06
          </span>
          <h2 className="font-display text-[24px] font-medium tracking-[-0.02em] leading-[1.1] [font-variation-settings:'opsz'_96] m-0">
            Payment history
          </h2>
        </div>
        <span className="inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[0.14em] uppercase font-semibold py-[3px] pl-[8px] pr-[9px] rounded-full bg-[var(--success-bg)] text-[var(--success)] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current">
          {payments.rows.length} cycles · 0 disputes · 100% on time
        </span>
      </div>

      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
        <div className="py-[14px] px-[20px] bg-[var(--paper-deep)] border-b border-[var(--line)] flex items-center justify-between flex-wrap gap-[8px]">
          <div className="font-display text-[15px] font-medium tracking-[-0.01em]">
            {payments.title}
          </div>
          <div className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em]">
            {payments.summaryPrefix}{' '}
            <strong className="text-[var(--success)] font-semibold text-[13px]">
              {payments.totalReleased}
            </strong>
            {payments.summarySuffix}
          </div>
        </div>

        {payments.rows.map((row, idx) => (
          <PaymentRowView key={idx} row={row} />
        ))}
      </div>
    </section>
  );
}
