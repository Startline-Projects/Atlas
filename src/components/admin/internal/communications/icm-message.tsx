/* admin.html lines 65757-65831 + CSS 31173-31265: message row
   variants: default (avatar + head + body) / system (centered dashed-border informational stripe)
   role variants: default (cream-deep chip) / super (super-tinted chip) */

import type {
  IcmMessage,
  IcmMessageRoleVariant,
} from '@/lib/mock-data/admin/communications-data';

interface IcmMessageProps {
  message: IcmMessage;
}

const roleClass: Record<IcmMessageRoleVariant, string> = {
  default: 'bg-[var(--cream-deep)] text-[var(--ink-soft)]',
  super: 'bg-[rgba(110,63,224,0.10)] text-[var(--super)]',
};

const BODY_RICH =
  '[&_strong]:text-[var(--ink)] [&_strong]:font-bold ' +
  '[&_code]:font-mono [&_code]:text-[11.5px] [&_code]:bg-[var(--paper-deep)] [&_code]:border [&_code]:border-[var(--line-soft)] [&_code]:py-[1px] [&_code]:px-[5px] [&_code]:rounded-[3px] [&_code]:text-[var(--ink)] ' +
  '[&_a]:text-[var(--super)] [&_a]:underline [&_a]:font-semibold [&_a]:cursor-pointer';

export function IcmMessage({ message }: IcmMessageProps) {
  if (message.variant === 'system') {
    return (
      <div className="mb-[14px] last:mb-0">
        <div
          className={`py-[8px] px-[12px] bg-[var(--paper-deep)] border border-dashed border-[var(--line)] rounded-[var(--r-sm)] font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.55] text-center ${BODY_RICH}`}
          dangerouslySetInnerHTML={{ __html: message.bodyHtml }}
        />
      </div>
    );
  }

  const roleVariant = message.roleVariant ?? 'default';

  return (
    <div className="grid grid-cols-[30px_minmax(0,1fr)] gap-[10px] mb-[14px] last:mb-0">
      <div
        className="w-[30px] h-[30px] rounded-full grid place-items-center font-display text-[11px] font-bold text-[var(--paper)] tracking-[-0.01em] flex-shrink-0 self-start"
        style={{ background: message.avatarGradient }}
      >
        {message.avatarInitials}
      </div>
      <div className="min-w-0">
        <div className="flex items-baseline gap-[8px] mb-[3px] flex-wrap">
          {message.name && (
            <span className="text-[12.5px] font-bold text-[var(--ink)] tracking-[-0.005em]">
              {message.name}
            </span>
          )}
          {message.role && (
            <span
              className={`font-mono text-[8.5px] tracking-[0.12em] uppercase font-bold py-[1px] px-[6px] rounded-[3px] ${roleClass[roleVariant]}`}
            >
              {message.role}
            </span>
          )}
          {message.time && (
            <span className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] font-semibold">
              {message.time}
            </span>
          )}
        </div>
        <div
          className={`font-body text-[13px] text-[var(--ink-soft)] tracking-[-0.005em] leading-[1.55] ${BODY_RICH}`}
          dangerouslySetInnerHTML={{ __html: message.bodyHtml }}
        />
      </div>
    </div>
  );
}
