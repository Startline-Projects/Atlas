import type { SbCommMessage } from '@/lib/mock-data/admin/suspensions-bans-data';

interface SuspensionCommMessageProps {
  message: SbCommMessage;
}

export function SuspensionCommMessage({ message }: SuspensionCommMessageProps) {
  const isAdmin = message.from === 'admin';
  const justify = isAdmin ? 'justify-end' : 'justify-start';
  const wrapAlign = isAdmin ? 'items-end' : 'items-start';
  const bubbleClasses = isAdmin
    ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]'
    : 'bg-[var(--paper)] text-[var(--ink-soft)] border-[var(--line)]';
  const metaClasses = isAdmin
    ? 'text-[rgba(251,248,242,0.7)] border-t-[rgba(251,248,242,0.18)]'
    : 'text-[var(--ink-mute)] border-t-[var(--line-soft)]';

  return (
    <div className={`flex gap-[10px] items-start ${justify}`}>
      {!isAdmin && (
        <span
          className="w-[28px] h-[28px] rounded-full grid place-items-center font-display text-[10px] font-medium text-[var(--paper)] flex-shrink-0"
          style={{ background: message.gradient }}
        >
          {message.initials}
        </span>
      )}
      <div className={`flex flex-col max-w-[75%] ${wrapAlign}`}>
        <div className={`rounded-[12px] p-[10px_14px] border text-[13px] leading-[1.55] tracking-[-0.005em] ${bubbleClasses}`}>
          {message.body}
          <div
            className={`font-mono text-[9.5px] tracking-[0.04em] font-semibold mt-[6px] pt-[6px] border-t border-dashed ${metaClasses}`}
          >
            {message.meta}
          </div>
        </div>
      </div>
      {isAdmin && (
        <span
          className="w-[28px] h-[28px] rounded-full grid place-items-center font-display text-[10px] font-medium text-[var(--paper)] flex-shrink-0"
          style={{ background: message.gradient }}
        >
          {message.initials}
        </span>
      )}
    </div>
  );
}
