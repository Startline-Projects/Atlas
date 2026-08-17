import { FP_AUDIT_EVENTS, type FpAuditEvent } from '@/lib/mock-data/admin/fees-pricing-data';
import { FeesPricingSectionHead } from '../fees-pricing-section-head';

function AuditEvent({ event, isLast }: { event: FpAuditEvent; isLast: boolean }) {
  const variant = event.variant ?? 'super';
  const dotClasses =
    variant === 'system'
      ? 'bg-[var(--ink)] border-[var(--ink)]'
      : 'bg-[var(--super)] border-[var(--super)]';

  return (
    <div
      className={`relative py-[12px] pl-[16px] ${isLast ? '' : 'border-b border-dashed border-b-[var(--line-soft)]'}`}
    >
      <span
        aria-hidden="true"
        className={`absolute -left-[19px] top-[18px] w-[12px] h-[12px] rounded-full border-2 z-[1] ${dotClasses}`}
      />
      <div className="flex items-baseline justify-between gap-[12px] flex-wrap mb-[3px]">
        <span className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] font-bold">
          {event.time}
        </span>
        <span className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.04em] font-semibold">
          {event.refId}
          {event.refMeta && ` · ${event.refMeta}`}
        </span>
      </div>
      <div className="text-[13px] font-semibold text-[var(--ink)] tracking-[-0.005em]">
        {event.titleLeading}{' '}
        {event.promoCode && (
          <>
            <code className="font-mono text-[11px] font-bold text-[var(--ink)] tracking-[0.04em] bg-[var(--cream-deep)] py-[2px] px-[5px] rounded-[3px] inline-block">
              {event.promoCode}
            </code>{' '}
            created · by{' '}
          </>
        )}
        <span className="text-[var(--super)] font-bold">{event.actor}</span>
        {event.titleTrailing && <> {event.titleTrailing}</>}
      </div>
      {event.change && (
        <div className="inline-flex items-center gap-[6px] font-mono text-[11.5px] font-bold tracking-[0.02em] tabular-nums mt-[6px]">
          {event.change.before && (
            <>
              <span className="text-[var(--ink-mute)] line-through">{event.change.before}</span>
              <span className="text-[var(--ink-mute)]">→</span>
            </>
          )}
          <span className="text-[var(--ink)]">{event.change.after}</span>
        </div>
      )}
      <div className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.55] mt-[4px] pl-[12px] border-l-2 border-l-[var(--line)]">
        {event.reason}
      </div>
    </div>
  );
}

export function FpAuditLog() {
  return (
    <section id="fp-section-audit" className="mb-[28px]">
      <FeesPricingSectionHead
        title="Audit log · fee changes"
        meta="last 23 fee modifications · all changes audit-logged with reason + before/after values · never editable, never deletable"
        action={
          <button
            type="button"
            className="inline-flex items-center gap-[6px] py-[8px] pr-[14px] pl-[12px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] transition-all"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export audit log
          </button>
        }
      />

      <div className="relative pl-[22px]">
        <span
          aria-hidden="true"
          className="absolute left-[7px] top-[6px] bottom-[6px] w-[2px] bg-[var(--line)]"
        />
        {FP_AUDIT_EVENTS.map((event, idx) => (
          <AuditEvent key={event.id} event={event} isLast={idx === FP_AUDIT_EVENTS.length - 1} />
        ))}
      </div>
    </section>
  );
}
