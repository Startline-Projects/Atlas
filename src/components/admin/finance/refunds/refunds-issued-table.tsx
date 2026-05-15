import { issuedRefunds } from '@/lib/mock-data/admin/refunds-data';
import { RefundReasonChip } from './refund-reason-chip';

export function RefundsIssuedTable() {
  return (
    <section className="mb-[28px]">
      {/* Section header */}
      <div className="flex items-end justify-between gap-[14px] flex-wrap mb-[14px] pb-[12px] border-b border-[var(--line)]">
        <div>
          <h2 className="font-display text-[22px] font-medium tracking-[-0.02em] m-0 mb-[4px] text-[var(--ink)]">
            Recently issued refunds
          </h2>
          <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em]">
            last 30 days · 14 refunds totaling $4,820 · all approved · click any row to see decision audit
          </div>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer whitespace-nowrap transition-all hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)]"
        >
          View all 42 (last 90d) →
        </button>
      </div>

      {/* Table */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[110px_110px_minmax(0,1fr)_130px_160px_110px_50px] gap-[10px] items-center p-[12px_18px] bg-[var(--paper-deep)] border-b border-[var(--line)] max-[1180px]:grid-cols-[100px_100px_minmax(0,1fr)_130px_110px] max-[1180px]:[&>div:nth-child(6)]:hidden max-[1180px]:[&>div:nth-child(7)]:hidden max-[720px]:grid-cols-[100px_minmax(0,1fr)] max-[720px]:p-[12px] max-[720px]:[&>div:nth-child(2)]:hidden max-[720px]:[&>div:nth-child(5)]:hidden max-[720px]:[&>div:nth-child(6)]:hidden">
          <div className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold">
            Ref
          </div>
          <div className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold">
            Date
          </div>
          <div className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold">
            Recipient
          </div>
          <div className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold">
            Amount
          </div>
          <div className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold">
            Reason
          </div>
          <div className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold">
            Approved by
          </div>
          <div />
        </div>

        {/* Table rows */}
        {issuedRefunds.map((refund) => (
          <div
            key={refund.id}
            className="grid grid-cols-[110px_110px_minmax(0,1fr)_130px_160px_110px_50px] gap-[10px] items-center p-[12px_18px] border-b border-[var(--line-soft)] cursor-pointer transition-colors hover:bg-[var(--paper-deep)] last:border-b-0 max-[1180px]:grid-cols-[100px_100px_minmax(0,1fr)_130px_110px] max-[1180px]:[&>div:nth-child(6)]:hidden max-[1180px]:[&>div:nth-child(7)]:hidden max-[720px]:grid-cols-[100px_minmax(0,1fr)] max-[720px]:p-[12px] max-[720px]:[&>div:nth-child(2)]:hidden max-[720px]:[&>div:nth-child(5)]:hidden max-[720px]:[&>div:nth-child(6)]:hidden"
          >
            {/* Ref */}
            <div className="font-mono text-[11px] font-bold text-[var(--ink-soft)] tracking-[0.02em]">
              {refund.ref}
            </div>

            {/* Date */}
            <div className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em]">
              {refund.date}
              <div className="text-[9.5px] text-[var(--ink-mute)] tracking-[0.04em] mt-[2px]">
                {refund.dateRel}
              </div>
            </div>

            {/* Recipient */}
            <div className="flex items-center gap-[8px] min-w-0">
              <div
                className="w-[24px] h-[24px] rounded-full grid place-items-center font-display text-[10px] text-[var(--paper)] font-medium flex-shrink-0"
                style={{ background: refund.recipientGradient }}
              >
                {refund.recipientInitials}
              </div>
              <div className="min-w-0">
                <div className="text-[12px] font-semibold text-[var(--ink)] tracking-[-0.01em] whitespace-nowrap overflow-hidden text-overflow-ellipsis">
                  {refund.recipientName}
                </div>
                <div className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[1px]">
                  {refund.recipientCode} · {refund.recipientLocation}
                </div>
              </div>
            </div>

            {/* Amount */}
            <div className="font-display text-[14px] font-medium text-[var(--ink)] tracking-[-0.01em] tabular-nums text-right">
              {refund.amount}
              <span className="font-mono text-[9.5px] font-bold text-[var(--ink-mute)] tracking-[0.06em] ml-[3px]">
                {refund.amountUnit}
              </span>
            </div>

            {/* Reason */}
            <div>
              <RefundReasonChip variant={refund.reasonChip} label={refund.reasonLabel} />
            </div>

            {/* Admin */}
            <div className="flex items-center gap-[6px] font-mono text-[10.5px] text-[var(--ink-soft)] tracking-[0.02em]">
              <div
                className="w-[18px] h-[18px] rounded-full grid place-items-center font-display text-[8px] text-[var(--paper)] font-medium flex-shrink-0"
                style={{ background: refund.adminGradient }}
              >
                {refund.adminInitials}
              </div>
              {refund.adminName}
            </div>

            {/* Actions arrow */}
            <div className="flex justify-center">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--ink-mute)]">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
