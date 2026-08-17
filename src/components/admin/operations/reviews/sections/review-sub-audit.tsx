/**
 * Phase 13b-3 — §06 Admin Audit Log section.
 * Replaces ReviewSubPlaceholder for rev-section-audit when auditData exists.
 *
 * admin.html markup: L37809-37894
 * admin.html CSS: inline styles on grid rows
 */
import { cn } from '@/lib/utils/cn';
import type {
  ReviewAuditData,
  ReviewAuditEntry,
  ReviewSectionStatus,
} from '@/lib/mock-data/admin/review-profiles-data';

interface ReviewSubAuditProps {
  data: ReviewAuditData;
  sectionStatus: ReviewSectionStatus;
}

function statusPillClass(v: ReviewSectionStatus['statusVariant']): string {
  switch (v) {
    case 'warn': return 'bg-[var(--amber-bg)] text-[var(--amber)]';
    case 'danger': return 'bg-[var(--danger-bg)] text-[var(--danger)]';
    case 'neutral': return 'bg-[var(--cream-deep)] text-[var(--ink-mute)]';
    case 'default':
    default: return 'bg-[var(--cream-deep)] text-[var(--ink-soft)]';
  }
}

function actorClass(v: ReviewAuditEntry['actorVariant']): string {
  switch (v) {
    case 'admin': return 'text-[var(--ink)] font-semibold';
    case 'system': return 'text-[var(--ink-mute)] font-semibold';
    case 'spec': return 'text-[var(--ink)] font-semibold';
    case 'user': return 'text-[var(--ink)] font-semibold';
  }
}

function AuditRow({ entry }: { entry: ReviewAuditEntry }) {
  return (
    <div className="grid grid-cols-[130px_110px_1fr_90px] py-[10px] px-[14px] border-b border-[var(--line-soft)] items-baseline">
      <div className="text-[var(--ink-soft)]">{entry.timestamp}</div>
      <div className={actorClass(entry.actorVariant)}>{entry.actor}</div>
      <div
        className={cn(
          'leading-[1.5]',
          entry.actionVariant === 'danger'
            ? 'text-[var(--danger)] font-semibold'
            : 'text-[var(--ink-soft)]'
        )}
      >
        {entry.action}
      </div>
      <div className="text-right text-[var(--ink-mute)]">{entry.ipDev}</div>
    </div>
  );
}

export function ReviewSubAudit({ data, sectionStatus }: ReviewSubAuditProps) {
  return (
    <section
      id="rev-section-audit"
      className="py-[36px] border-t border-[var(--line)] scroll-mt-[80px] [&:first-child]:border-t-0 [&:first-child]:pt-[12px]"
    >
      {/* cd-section-head */}
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            06 · 06
          </span>
          <h2 className="font-display text-[24px] font-medium tracking-[-0.02em] leading-[1.1] [font-variation-settings:'opsz'_96] m-0">
            Admin audit log
          </h2>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[0.14em] uppercase font-semibold py-[3px] pl-[8px] pr-[9px] rounded-full before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current",
            statusPillClass(sectionStatus.statusVariant)
          )}
        >
          {sectionStatus.statusText}
        </span>
      </div>

      {/* Audit table — L37818-37892 */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden font-mono text-[11.5px]">
        {/* Header row */}
        <div className="grid grid-cols-[130px_110px_1fr_90px] py-[10px] px-[14px] bg-[var(--paper-deep)] border-b border-[var(--line)] text-[9.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-bold">
          <div>Timestamp</div>
          <div>Actor</div>
          <div>Action</div>
          <div className="text-right">IP / dev</div>
        </div>

        {/* Data rows */}
        {data.entries.map((entry, idx) => (
          <AuditRow key={idx} entry={entry} />
        ))}

        {/* Footer */}
        <div className="py-[10px] px-[14px] text-center text-[var(--ink-mute)] text-[10.5px]">
          {data.footerText}
          <a
            href="javascript:void(0)"
            data-rev-action={data.footerActionKey}
            className="text-[var(--ink-soft)] underline"
          >
            show full
          </a>
          {' ·'}
        </div>
      </div>
    </section>
  );
}
