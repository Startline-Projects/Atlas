'use client';

/* admin.html lines 65849-66039: Section 03 Announcements
   3 filter buttons (top-right, handled by parent shell) + 5 cards stacked + footer with action */

import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';
import type { IcmAnnouncementsData } from '@/lib/mock-data/admin/communications-data';
import { IcmAnnouncementCard } from './icm-announcement-card';

interface IcmAnnouncementsSectionProps {
  data: IcmAnnouncementsData;
}

export function IcmAnnouncementsSection({
  data,
}: IcmAnnouncementsSectionProps) {
  const { showAction } = useAdminActionToast();
  return (
    <div>
      <div className="flex flex-col gap-[10px]">
        {data.cards.map((card) => (
          <IcmAnnouncementCard key={card.id} card={card} />
        ))}
      </div>
      <div className="mt-[14px] flex items-center justify-between gap-[12px] flex-wrap font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em]">
        <span>{data.footerText}</span>
        <button
          type="button"
          onClick={() => showAction('Open announcements archive')}
          className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full border bg-[var(--paper)] border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:text-[var(--ink)] cursor-pointer transition-all whitespace-nowrap"
        >
          {data.footerActionLabel}
        </button>
      </div>
    </div>
  );
}
