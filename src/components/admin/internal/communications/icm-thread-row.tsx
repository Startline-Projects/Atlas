'use client';

/* admin.html lines 65644-65734 + CSS 31026-31113: single thread row
   3 variants: default / active (inverted ink bg) / unread (super-tinted bg + bold preview)
   2 avatar kinds: person (rounded-full) / group (rounded-[6px]) */

import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';
import type {
  IcmThread,
  IcmThreadVariant,
} from '@/lib/mock-data/admin/communications-data';

interface IcmThreadRowProps {
  thread: IcmThread;
  onSelect?: (id: string) => void;
}

const rowBg: Record<IcmThreadVariant, string> = {
  default: 'cursor-pointer transition-colors hover:bg-[var(--paper-deep)]',
  active: 'bg-[var(--ink)] cursor-pointer transition-colors',
  unread:
    'bg-[rgba(110,63,224,0.04)] cursor-pointer transition-colors hover:bg-[var(--paper-deep)]',
};

const nameColor: Record<IcmThreadVariant, string> = {
  default: 'text-[var(--ink)]',
  active: 'text-[var(--paper)]',
  unread: 'text-[var(--ink)]',
};

const previewColor: Record<IcmThreadVariant, string> = {
  default: 'text-[var(--ink-mute)] font-normal',
  active: 'text-[rgba(251,248,242,0.55)] font-normal',
  unread: 'text-[var(--ink-soft)] font-semibold',
};

const timeColor: Record<IcmThreadVariant, string> = {
  default: 'text-[var(--ink-mute)]',
  active: 'text-[rgba(251,248,242,0.55)]',
  unread: 'text-[var(--ink-mute)]',
};

export function IcmThreadRow({ thread, onSelect }: IcmThreadRowProps) {
  const { showAction } = useAdminActionToast();
  const handleClick = () => {
    if (onSelect) onSelect(thread.id);
    else showAction(`Open thread ${thread.name}`);
  };

  const avatarShape =
    thread.avatarKind === 'group' ? 'rounded-[6px]' : 'rounded-full';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      className={`grid grid-cols-[30px_minmax(0,1fr)_auto] gap-[10px] items-center py-[10px] px-[14px] border-b border-b-[var(--line-soft)] ${rowBg[thread.variant]}`}
    >
      <div
        className={`w-[30px] h-[30px] ${avatarShape} grid place-items-center font-display text-[10.5px] font-bold text-[var(--paper)] tracking-[-0.01em] flex-shrink-0`}
        style={{ background: thread.avatarGradient }}
      >
        {thread.avatarInitials}
      </div>
      <div className="min-w-0">
        <div
          className={`text-[12.5px] font-bold tracking-[-0.01em] whitespace-nowrap overflow-hidden text-ellipsis leading-[1.3] ${nameColor[thread.variant]}`}
        >
          {thread.name}
        </div>
        <div
          className={`font-mono text-[10px] tracking-[0.01em] mt-[2px] whitespace-nowrap overflow-hidden text-ellipsis leading-[1.4] ${previewColor[thread.variant]}`}
          dangerouslySetInnerHTML={{ __html: thread.previewHtml }}
        />
      </div>
      <div className="text-right flex-shrink-0">
        <div
          className={`font-mono text-[9.5px] tracking-[0.04em] font-semibold ${timeColor[thread.variant]}`}
        >
          {thread.time}
        </div>
        {thread.unreadCount && (
          <span className="inline-block mt-[4px] min-w-[16px] h-[16px] py-0 px-[5px] rounded-full bg-[var(--super)] text-[var(--paper)] font-mono text-[9px] font-bold leading-[16px] text-center tracking-[0]">
            {thread.unreadCount}
          </span>
        )}
      </div>
    </div>
  );
}
