import { FP_PROMO_ROWS, type FpPromoStatus } from '@/lib/mock-data/admin/fees-pricing-data';
import { FeesPricingSectionHead } from '../fees-pricing-section-head';

const ROW_GRID =
  'grid grid-cols-[140px_minmax(0,1fr)_110px_120px_110px_80px_50px] gap-[10px] items-center';

const STATUS_PILL: Record<FpPromoStatus, string> = {
  completed: 'bg-[var(--success-bg)] text-[var(--success)]',
  expired: 'bg-[var(--cream-deep)] text-[var(--ink-mute)]',
};

export function FpPromoCodes() {
  return (
    <section id="fp-section-promo" className="mb-[28px]">
      <FeesPricingSectionHead
        title="Promotional codes"
        meta="discount codes for client onboarding · founder cohort gifts · partner referrals · 4 active · Operations Admin can manage"
        action={
          <button
            type="button"
            className="inline-flex items-center gap-[6px] py-[8px] pr-[14px] pl-[12px] font-body text-[12.5px] font-medium bg-[var(--ink)] text-[var(--paper)] border border-[var(--ink)] rounded-full cursor-pointer whitespace-nowrap hover:bg-black transition-all"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New promo code
          </button>
        }
      />

      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
        {/* Head */}
        <div className={`${ROW_GRID} py-[12px] px-[18px] bg-[var(--paper-deep)] border-b border-b-[var(--line)] font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold`}>
          <div>Code</div>
          <div>Description</div>
          <div>Discount</div>
          <div>Expires</div>
          <div className="text-right">Uses</div>
          <div>Status</div>
          <div />
        </div>

        {/* Rows */}
        {FP_PROMO_ROWS.map((row, idx) => {
          const isLast = idx === FP_PROMO_ROWS.length - 1;
          return (
            <div
              key={row.code}
              className={`${ROW_GRID} py-[12px] px-[18px] ${isLast ? '' : 'border-b border-b-[var(--line-soft)]'}`}
            >
              <div>
                <code className="font-mono text-[12.5px] font-bold text-[var(--ink)] tracking-[0.04em] bg-[var(--cream-deep)] py-[4px] px-[8px] rounded-[4px] inline-block">
                  {row.code}
                </code>
              </div>
              <div className="min-w-0">
                <div className="text-[12.5px] font-semibold text-[var(--ink)] tracking-[-0.01em]">
                  {row.name}
                </div>
                <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px]">
                  {row.meta}
                </div>
              </div>
              <div className="font-mono text-[12px] font-bold text-[var(--success)] tracking-[0.02em] tabular-nums">
                {row.discount}
              </div>
              <div className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em]">
                {row.expires}
              </div>
              <div className="font-mono text-[11px] font-bold text-[var(--ink)] tracking-[0.02em] tabular-nums text-right">
                {row.uses}
                <span className="block text-[9.5px] text-[var(--ink-mute)] font-medium mt-[1px]">
                  {row.usesMeta}
                </span>
              </div>
              <div>
                <span
                  className={`inline-flex items-center gap-[5px] py-[3px] px-[9px] font-mono text-[9.5px] font-bold tracking-[0.08em] uppercase rounded-full ${STATUS_PILL[row.status]}`}
                >
                  {row.statusLabel}
                </span>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  aria-label="Edit"
                  className="w-[28px] h-[28px] border border-[var(--line)] bg-[var(--paper)] rounded-full grid place-items-center text-[var(--ink-mute)] cursor-pointer hover:bg-[var(--ink)] hover:text-[var(--paper)] hover:border-[var(--ink)] transition-all"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
