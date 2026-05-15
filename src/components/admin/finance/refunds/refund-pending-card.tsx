import type { PendingRefund } from '@/lib/mock-data/admin/refunds-data';
import { RefundWorkflowRail } from './refund-workflow-rail';
import { RefundReasonChip } from './refund-reason-chip';
import { RefundSlaPip } from './refund-sla-pip';

interface RefundPendingCardProps {
  refund: PendingRefund;
}

export function RefundPendingCard({ refund }: RefundPendingCardProps) {
  return (
    <div
      className={`bg-[var(--paper)] border rounded-[var(--r-md)] overflow-hidden transition-all relative ${
        refund.variant === 'urgent'
          ? 'border-[var(--danger)]'
          : refund.variant === 'warn'
            ? 'border-[rgba(232,118,58,0.5)]'
            : 'border-[var(--line)]'
      } hover:border-[var(--line-strong)]`}
    >
      {/* Top strip for urgent/warn variants */}
      {refund.variant === 'urgent' && (
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--danger)]" />
      )}
      {refund.variant === 'warn' && (
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--amber)]" />
      )}

      {/* Workflow rail */}
      <RefundWorkflowRail variant={refund.variant} />

      {/* Card body */}
      <div className="grid grid-cols-[minmax(0,1fr)_200px_200px] gap-[18px] p-[16px_18px] items-center max-[1080px]:grid-cols-[minmax(0,1fr)_180px] max-[1080px]:[&>div:nth-child(3)]:hidden max-[720px]:grid-cols-1 max-[720px]:gap-[12px]">
        {/* Requester block */}
        <div className="flex items-start gap-[12px] min-w-0">
          {/* Avatar */}
          <div
            className="w-[40px] h-[40px] rounded-full grid place-items-center font-display text-[14px] text-[var(--paper)] font-medium flex-shrink-0"
            style={{ background: refund.requesterGradient }}
          >
            {refund.requesterInitials}
          </div>

          {/* Text block */}
          <div className="flex-1 min-w-0">
            {/* Head row with ref + reason chip + SLA pip */}
            <div className="flex items-center gap-[8px] flex-wrap mb-[4px]">
              <span className="font-mono text-[11px] font-bold text-[var(--ink-soft)] tracking-[0.02em]">
                {refund.ref}
              </span>
              <RefundReasonChip variant={refund.reasonChip} label={refund.reasonLabel} />
              <RefundSlaPip variant={refund.slaPip} text={refund.slaText} />
            </div>

            {/* Requester name */}
            <div className="font-display text-[15px] font-medium text-[var(--ink)] tracking-[-0.01em] leading-[1.25] mb-[4px]">
              {refund.requesterName}
            </div>

            {/* Context */}
            <div className="font-mono text-[10.5px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.5] mb-[6px]">
              {refund.context}
            </div>

            {/* Reason detail */}
            <div className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.55] mt-[6px] py-[6px] px-[10px] bg-[var(--paper-deep)] border-l-[2px] border-l-[var(--line)] rounded-[3px]">
              <strong>Requester's reason:</strong> "{refund.reasonDetail}"
            </div>
          </div>
        </div>

        {/* Amount block */}
        <div className="text-right border-l border-l-[var(--line-soft)] pl-[18px]">
          <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold mb-[4px]">
            {refund.amountType}
          </div>
          <div className="font-display text-[26px] font-medium text-[var(--ink)] tracking-[-0.02em] leading-none tabular-nums flex items-baseline gap-[4px] justify-end">
            {refund.amount}
            <span className="font-mono text-[11px] font-semibold text-[var(--ink-mute)] tracking-[0.06em]">
              {refund.amountUnit}
            </span>
          </div>
          <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[4px] leading-[1.5]">
            {refund.amountMeta}
            {refund.amountPercent && (
              <span className="bg-[var(--paper-deep)] rounded px-1.5 py-0.5 text-[var(--ink-soft)] font-bold inline-block ml-[8px]">
                {refund.amountPercent}
              </span>
            )}
          </div>
        </div>

        {/* Actions block */}
        <div className="flex flex-col gap-[8px] items-stretch max-[720px]:flex-row max-[720px]:flex-wrap max-[720px]:[&>*]:flex-1 max-[720px]:[&>*]:min-w-[100px]">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-[6px] py-[8px] px-[12px] font-body text-[12.5px] font-medium bg-[var(--ink)] text-[var(--paper)] border border-[var(--ink)] rounded-[6px] cursor-pointer whitespace-nowrap transition-all hover:opacity-90"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Approve
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-[6px] py-[8px] px-[12px] font-body text-[12.5px] font-medium bg-[var(--paper)] text-[var(--ink)] border border-[var(--line)] rounded-[6px] cursor-pointer whitespace-nowrap transition-all hover:border-[var(--ink)] hover:bg-[var(--cream-deep)]"
          >
            Reject
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-[6px] py-[8px] px-[12px] font-body text-[12.5px] font-medium bg-[var(--amber-bg)] text-[var(--amber)] border border-[rgba(232,118,58,0.3)] rounded-[6px] cursor-pointer whitespace-nowrap transition-all hover:border-[var(--amber)] hover:bg-[var(--amber-bg)]"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
            Escalate
          </button>

          <div className={`font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] text-center mt-[4px] pt-[8px] border-t border-dashed border-t-[var(--line-soft)] ${refund.variant === 'urgent' ? 'text-[var(--danger)] font-bold' : refund.variant === 'warn' ? 'text-[var(--amber)] font-bold' : ''}`}>
            {refund.timeText}
          </div>
        </div>
      </div>
    </div>
  );
}
