// Admin.html lines 48009-48074
import type { DsrAuditEntry } from '@/lib/mock-data/admin/data-subject-rights-data';

interface DsrAuditChainProps {
  entries: DsrAuditEntry[];
}

export function DsrAuditChain({ entries }: DsrAuditChainProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[14px] px-[18px] overflow-hidden flex flex-col gap-[14px]">
      {entries.map((entry, idx) => (
        <div
          key={idx}
          className={`relative pl-[24px] py-[6px] ${
            entry.variant === 'warn'
              ? 'before:absolute before:left-[6px] before:top-[6px] before:bottom-[-14px] before:w-[1px] before:bg-[var(--line)] before:last:hidden after:absolute after:left-[2px] after:top-[10px] after:w-[10px] after:h-[10px] after:rounded-full after:bg-[var(--amber)] after:border-2 after:border-[var(--amber)]'
              : 'before:absolute before:left-[6px] before:top-[6px] before:bottom-[-14px] before:w-[1px] before:bg-[var(--line)] before:last:hidden after:absolute after:left-[2px] after:top-[10px] after:w-[10px] after:h-[10px] after:rounded-full after:bg-[var(--paper)] after:border-2 after:border-[var(--ink-mute)]'
          }`}
        >
          <div className="flex items-baseline gap-[10px] flex-wrap mb-[3px]">
            <span className="font-mono text-[10px] font-bold tracking-[0.04em] text-[var(--ink)] flex-shrink-0">
              {entry.time}
            </span>
            <span className="text-[12.5px] font-semibold text-[var(--ink)] tracking-[-0.01em]">
              {entry.action}
            </span>
            <span
              className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold"
              dangerouslySetInnerHTML={{ __html: entry.actorHtml }}
            />
          </div>
          <div className="font-body text-[11.5px] text-[var(--ink-soft)] leading-[1.6] tracking-[-0.005em] mt-[4px]">
            {entry.detail}
          </div>
        </div>
      ))}
    </div>
  );
}
