'use client';

/* admin.html lines 67169-67383 + CSS 31966-32087: single notification row
   3-col grid [32px_1fr_auto] · 4 state variants (default / unread / critical / unread-critical)
   Row click navigates to row.href via useRouter (preserves grid layout vs Link wrap)
   Open quick button navigates to same href; Archive fires toast only */

import { useRouter } from 'next/navigation';
import type {
  NfcNotificationRow,
  NfcRowState,
} from '@/lib/mock-data/admin/notifications-data';
import { NfcRowIcon } from './nfc-row-icon';
import { NfcPriorityChip } from './nfc-priority-chip';
import { NfcQuickBtn } from './nfc-quick-btn';

interface NfcRowProps {
  row: NfcNotificationRow;
}

const rowBg: Record<NfcRowState, string> = {
  default: '',
  unread: 'bg-[rgba(110,63,224,0.025)]',
  critical: 'bg-[rgba(194,65,43,0.035)]',
  'unread-critical': 'bg-[rgba(194,65,43,0.035)]',
};

export function NfcRow({ row }: NfcRowProps) {
  const router = useRouter();
  const navigate = () => router.push(row.href);

  const isUnread = row.state === 'unread' || row.state === 'unread-critical';
  const isUnreadCritical = row.state === 'unread-critical';
  const titleWeight = isUnread ? 'font-extrabold' : 'font-bold';
  const dotBg = isUnreadCritical
    ? 'bg-[var(--danger)] animate-[pulse-fr_1.2s_ease-in-out_infinite]'
    : 'bg-[var(--super)]';

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={navigate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate();
        }
      }}
      aria-label={`${row.title} — open`}
      className={`relative grid grid-cols-[32px_minmax(0,1fr)_auto] gap-[11px] py-[12px] px-[16px] border-b border-b-[var(--line-soft)] last:border-b-0 cursor-pointer transition-colors hover:bg-[var(--paper-deep)] ${rowBg[row.state]}`}
    >
      {isUnread && (
        <span
          className={`absolute top-[18px] left-[6px] w-[6px] h-[6px] rounded-full ${dotBg}`}
          aria-hidden
        />
      )}

      <NfcRowIcon type={row.iconType} />

      <div className="min-w-0">
        <div
          className={`text-[13px] text-[var(--ink)] tracking-[-0.005em] leading-[1.35] flex items-center gap-[6px] flex-wrap ${titleWeight}`}
        >
          <span>{row.title}</span>
          <NfcPriorityChip
            variant={row.priority}
            label={row.priorityLabel}
          />
        </div>
        <div
          className="font-mono text-[10.5px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.55] mt-[4px] [&_strong]:text-[var(--ink)] [&_strong]:font-bold"
          dangerouslySetInnerHTML={{ __html: row.metaHtml }}
        />
      </div>

      <div className="flex flex-col items-end gap-[6px] flex-shrink-0">
        <span className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] font-bold whitespace-nowrap">
          {row.time}
        </span>
        <div className="inline-flex gap-[4px]">
          <NfcQuickBtn
            kind="open"
            ariaLabel={row.openAction.ariaLabel}
            href={row.href}
          />
          <NfcQuickBtn
            kind="archive"
            ariaLabel="Archive"
            archiveToastLabel={`Archive ${row.id}`}
          />
        </div>
      </div>
    </div>
  );
}
