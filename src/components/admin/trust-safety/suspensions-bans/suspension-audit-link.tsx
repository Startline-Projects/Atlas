import Link from 'next/link';
import type { SbAuditEntry } from '@/lib/mock-data/admin/suspensions-bans-data';

interface SuspensionAuditLinkProps {
  entry: SbAuditEntry;
  isLast: boolean;
}

export function SuspensionAuditLink({ entry, isLast }: SuspensionAuditLinkProps) {
  const variant = entry.variant ?? 'default';
  const dotBg =
    variant === 'system'
      ? 'bg-[var(--ink)]'
      : variant === 'success'
        ? 'bg-[var(--success)]'
        : 'bg-[var(--paper)]';
  const dotBorder =
    variant === 'danger'
      ? 'border-[var(--danger)]'
      : variant === 'success'
        ? 'border-[var(--success)]'
        : 'border-[var(--ink)]';
  const bottomBorder = isLast ? '' : 'border-b border-dashed border-b-[var(--line-soft)]';

  return (
    <div className={`relative py-[8px] pl-[14px] ${bottomBorder}`}>
      <span
        aria-hidden="true"
        className={`absolute -left-[17px] top-[14px] w-[10px] h-[10px] rounded-full border-2 z-[1] ${dotBg} ${dotBorder}`}
      />
      <div className="flex items-center gap-[8px] flex-wrap mb-[3px]">
        <span className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] font-semibold">
          {entry.time}
        </span>
        <span className="text-[12.5px] font-semibold text-[var(--ink)] tracking-[-0.005em]">
          {entry.action}
        </span>
        {entry.actor && (
          <span className="inline-flex items-center gap-[5px] font-body text-[11px] text-[var(--ink-mute)] tracking-[-0.005em]">
            <span
              className="w-[16px] h-[16px] rounded-full grid place-items-center font-display text-[8px] font-medium text-[var(--paper)] flex-shrink-0"
              style={{ background: entry.actor.gradient }}
            >
              {entry.actor.initials}
            </span>
            {entry.actor.name}
            {entry.actor.role && (
              <span className="text-[var(--line-strong)]">· {entry.actor.role}</span>
            )}
          </span>
        )}
      </div>
      {entry.detail && (
        <div className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.55] mt-[2px]">
          {entry.detail}
          {entry.detailLinkLabel && entry.detailLinkHref && (
            <>
              {' '}
              <Link
                href={entry.detailLinkHref}
                className="text-[var(--ink)] underline cursor-pointer font-semibold hover:text-[var(--super)]"
              >
                {entry.detailLinkLabel}
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
