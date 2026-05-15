import { pendingRefunds } from '@/lib/mock-data/admin/refunds-data';
import { RefundPendingCard } from './refund-pending-card';

export function RefundsPendingList() {
  return (
    <section className="mb-[28px]">
      {/* Section header */}
      <div className="flex items-end justify-between gap-[14px] flex-wrap mb-[14px] pb-[12px] border-b border-[var(--line)]">
        <div>
          <h2 className="font-display text-[22px] font-medium tracking-[-0.02em] m-0 mb-[4px] text-[var(--ink)]">
            Pending refunds
          </h2>
          <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em]">
            awaiting admin approval · 48h SLA from request · ordered by time pending
          </div>
        </div>
        <div className="flex gap-[8px] flex-wrap">
          {/* Filter chips — placeholder for now */}
          <button
            type="button"
            className="inline-flex items-center gap-[6px] py-[6px] px-[12px] font-mono text-[10px] font-semibold tracking-[0.04em] bg-[var(--ink)] text-[var(--paper)] border border-[var(--ink)] rounded-full cursor-pointer whitespace-nowrap transition-all"
          >
            All <span className="opacity-80">4</span>
          </button>
        </div>
      </div>

      {/* Pending cards list */}
      <div className="flex flex-col gap-[14px]">
        {pendingRefunds.map((refund) => (
          <RefundPendingCard key={refund.id} refund={refund} />
        ))}
      </div>
    </section>
  );
}
