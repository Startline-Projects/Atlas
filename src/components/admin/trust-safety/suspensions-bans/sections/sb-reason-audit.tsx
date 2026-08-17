import Link from 'next/link';
import type { SuspensionDetailProfile } from '@/lib/mock-data/admin/suspensions-bans-data';
import { SuspensionAuditLink } from '../suspension-audit-link';

interface SbReasonAuditProps {
  reasonSummary?: SuspensionDetailProfile['reasonSummary'];
  auditChain: SuspensionDetailProfile['auditChain'];
  sectionNum: string;
}

export function SbReasonAudit({ reasonSummary, auditChain, sectionNum }: SbReasonAuditProps) {
  return (
    <section className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[20px_24px] mb-[16px]">
      <div className="flex items-end justify-between gap-[12px] flex-wrap mb-[16px] pb-[12px] border-b border-dashed border-b-[var(--line-soft)]">
        <div className="flex items-baseline gap-[10px]">
          <span className="font-mono text-[9.5px] tracking-[0.06em] bg-[var(--cream-deep)] text-[var(--ink-mute)] px-[6px] py-[2px] rounded-[3px] font-bold">
            {sectionNum}
          </span>
          <div>
            <h2 className="font-display text-[18px] font-medium tracking-[-0.01em] text-[var(--ink)] leading-[1.2] m-0">
              Reason & audit trail
            </h2>
            <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em] mt-[4px]">
              primary sanction reason · full audit chain from creation to now
            </div>
          </div>
        </div>
      </div>

      {/* Reason summary block */}
      {reasonSummary && (
        <div className="p-[14px_16px] bg-[var(--amber-bg)] border border-[rgba(232,118,58,0.3)] border-l-[3px] border-l-[var(--amber)] rounded-[var(--r-sm)] mb-[16px]">
          <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--amber)] font-bold mb-[6px]">
            {reasonSummary.eyebrow}
          </div>
          <div className="text-[13px] text-[var(--ink)] leading-[1.55] tracking-[-0.005em] mb-[6px]">
            {reasonSummary.bullet}
          </div>
          <Link
            href={reasonSummary.sourceLinkHref}
            className="font-mono text-[11px] text-[var(--ink-soft)] underline cursor-pointer font-semibold hover:text-[var(--ink)] tracking-[0.02em]"
          >
            {reasonSummary.sourceLinkLabel} →
          </Link>
        </div>
      )}

      {/* Audit chain */}
      <div className="flex flex-col gap-0 relative pl-[18px]">
        <span
          aria-hidden="true"
          className="absolute left-[5px] top-[6px] bottom-[6px] w-[2px] bg-[var(--line)]"
        />
        {auditChain.map((entry, i) => (
          <SuspensionAuditLink key={i} entry={entry} isLast={i === auditChain.length - 1} />
        ))}
      </div>
    </section>
  );
}
