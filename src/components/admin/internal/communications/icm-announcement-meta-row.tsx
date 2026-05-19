/* admin.html ~65871-65879 + CSS 31327-31376: meta-row containing author + scope chips + pinned span + date
   Items render in source order, no separator between them (chips have their own spacing via parent gap-[7px]) */

import type {
  IcmAnnouncementMetaItem,
  IcmAnnouncementScopeVariant,
} from '@/lib/mock-data/admin/communications-data';

interface IcmAnnouncementMetaRowProps {
  items: IcmAnnouncementMetaItem[];
}

const scopeClass: Record<IcmAnnouncementScopeVariant, string> = {
  default:
    'bg-[var(--paper-deep)] border border-[var(--line)] text-[var(--ink-soft)]',
  super:
    'bg-[rgba(110,63,224,0.1)] border border-[rgba(110,63,224,0.3)] text-[var(--super)]',
  team:
    'bg-[var(--success-bg)] border border-[rgba(46,125,84,0.3)] text-[var(--success)]',
};

export function IcmAnnouncementMetaRow({
  items,
}: IcmAnnouncementMetaRowProps) {
  return (
    <div className="flex items-center gap-[7px] flex-wrap font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mb-[4px]">
      {items.map((item, idx) => {
        if (item.kind === 'author') {
          return (
            <span
              key={idx}
              className="inline-flex items-center gap-[5px] text-[var(--ink-soft)] font-bold"
            >
              <span
                className="w-[16px] h-[16px] rounded-full grid place-items-center font-display text-[7.5px] font-bold text-[var(--paper)] tracking-[0]"
                style={{ background: item.avatarGradient }}
              >
                {item.avatarInitials}
              </span>
              {item.name}
            </span>
          );
        }
        if (item.kind === 'scope') {
          return (
            <span
              key={idx}
              className={`py-[1px] px-[6px] rounded-[3px] font-bold tracking-[0.06em] uppercase text-[9px] ${scopeClass[item.variant]}`}
            >
              {item.label}
            </span>
          );
        }
        if (item.kind === 'pinned') {
          return (
            <span
              key={idx}
              style={{ color: 'var(--super)', fontWeight: 700 }}
            >
              📌 PINNED
            </span>
          );
        }
        // date
        return <span key={idx}>{item.text}</span>;
      })}
    </div>
  );
}
