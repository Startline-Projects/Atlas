import type { TxAuditEntry } from '@/lib/mock-data/admin/transactions-data';

interface TxAuditListProps {
  sectionNum: string;
  meta: string;
  entries: TxAuditEntry[];
}

function AuditEntry({ entry, isLast }: { entry: TxAuditEntry; isLast: boolean }) {
  const variant = entry.variant ?? 'default';
  const dotBg =
    variant === 'system'
      ? 'bg-[var(--ink)]'
      : variant === 'success'
        ? 'bg-[var(--success)]'
        : 'bg-[var(--paper)]';
  const dotBorder =
    variant === 'success'
      ? 'border-[var(--success)]'
      : variant === 'warn'
        ? 'border-[var(--amber)]'
        : variant === 'danger'
          ? 'border-[var(--danger)]'
          : 'border-[var(--ink)]';

  const bottomBorder = isLast ? '' : 'border-b border-dashed border-b-[var(--line-soft)]';

  return (
    <div className={`relative py-[10px] pl-[16px] ${bottomBorder}`}>
      <span
        aria-hidden="true"
        className={`absolute -left-[19px] top-[14px] w-[12px] h-[12px] rounded-full border-2 z-[1] ${dotBg} ${dotBorder}`}
      />
      <div className="flex items-baseline justify-between gap-[12px] flex-wrap mb-[3px]">
        <span className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] font-semibold">
          {entry.time}
        </span>
        <span className="font-mono text-[12px] font-bold text-[var(--ink)] tracking-[0.02em] tabular-nums">
          {entry.delta}
        </span>
      </div>
      <div className="text-[12.5px] font-semibold text-[var(--ink)] tracking-[-0.005em] mb-[2px]">
        {entry.titleActor && <span className="text-[var(--ink)] font-bold">{entry.titleActor}</span>}{' '}
        {entry.title}
      </div>
      <div className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.55]">
        {entry.detail}
        {entry.detailCode && (
          <>
            {' '}
            <code className="font-mono text-[10.5px] bg-[var(--cream-deep)] px-[5px] py-[1px] rounded-[3px]">
              {entry.detailCode}
            </code>
          </>
        )}
      </div>
    </div>
  );
}

export function TxAuditList({ sectionNum, meta, entries }: TxAuditListProps) {
  return (
    <section className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[20px_24px] mb-[16px]">
      <div className="flex items-end justify-between gap-[12px] flex-wrap mb-[16px] pb-[12px] border-b border-dashed border-b-[var(--line-soft)]">
        <div className="flex items-baseline gap-[10px]">
          <span className="font-mono text-[9.5px] tracking-[0.06em] bg-[var(--cream-deep)] text-[var(--ink-mute)] px-[6px] py-[2px] rounded-[3px] font-bold">
            {sectionNum}
          </span>
          <div>
            <h2 className="font-display text-[18px] font-medium tracking-[-0.01em] text-[var(--ink)] leading-[1.2] m-0">
              Audit trail
            </h2>
            <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em] mt-[4px]">
              {meta}
            </div>
          </div>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[8px] pr-[14px] pl-[12px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] transition-all"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copy audit log
        </button>
      </div>
      <div className="relative pl-[22px]">
        <span
          aria-hidden="true"
          className="absolute left-[7px] top-[6px] bottom-[6px] w-[2px] bg-[var(--line)]"
        />
        {entries.map((entry, i) => (
          <AuditEntry key={i} entry={entry} isLast={i === entries.length - 1} />
        ))}
      </div>
    </section>
  );
}
