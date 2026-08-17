import type { SbNotificationTouch } from '@/lib/mock-data/admin/suspensions-bans-data';
import { SuspensionNotificationTouch } from '../suspension-notification-touch';

interface SbNotificationsProps {
  notifications: SbNotificationTouch[];
  sectionNum: string;
}

export function SbNotifications({ notifications, sectionNum }: SbNotificationsProps) {
  return (
    <section className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[20px_24px] mb-[16px]">
      <div className="flex items-end justify-between gap-[12px] flex-wrap mb-[16px] pb-[12px] border-b border-dashed border-b-[var(--line-soft)]">
        <div className="flex items-baseline gap-[10px]">
          <span className="font-mono text-[9.5px] tracking-[0.06em] bg-[var(--cream-deep)] text-[var(--ink-mute)] px-[6px] py-[2px] rounded-[3px] font-bold">
            {sectionNum}
          </span>
          <div>
            <h2 className="font-display text-[18px] font-medium tracking-[-0.01em] text-[var(--ink)] leading-[1.2] m-0">
              Notifications sent
            </h2>
            <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em] mt-[4px]">
              every touchpoint to the user · email · WhatsApp · in-app · status & delivery
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[8px]">
        {notifications.map((touch, i) => (
          <SuspensionNotificationTouch key={i} touch={touch} />
        ))}
      </div>
    </section>
  );
}
