/**
 * Phase 16b — §01 Notification status section.
 *
 * admin.html markup: L40812-40903
 * admin.html CSS:    L16823-16966 (.si-notif-panel)
 *
 * Section chrome (sh-num "01" + h2 + sh-meta) + 2-col grid of
 * IncidentNotificationCard components. Responsive 1-col at 720px.
 */
import type { IncidentNotificationData, IncidentDetailSection } from '@/lib/mock-data/admin/incidents-data';
import { IncidentNotificationCard } from '../incident-notification-card';

interface IncidentSectionNotificationProps {
  section: IncidentDetailSection;
  data: IncidentNotificationData;
}

export function IncidentSectionNotification({ section, data }: IncidentSectionNotificationProps) {
  return (
    <section
      data-si-section={section.id}
      className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[20px] px-[24px] mb-[16px]"
    >
      {/* Section header */}
      <div className="flex items-end justify-between gap-[12px] flex-wrap mb-[16px] pb-[12px] border-b border-dashed border-[var(--line-soft)]">
        <div className="flex items-baseline gap-[10px]">
          <span className="font-mono text-[9.5px] bg-[var(--cream-deep)] text-[var(--ink-mute)] py-[2px] px-[6px] rounded-[3px] font-bold tracking-[0.06em]">
            01
          </span>
          <div>
            <h2 className="font-display text-[18px] font-medium tracking-[-0.01em] m-0 leading-[1.2] text-[var(--ink)]">
              {section.title}
            </h2>
            <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em] mt-[4px]">
              {section.meta}
            </div>
          </div>
        </div>
      </div>

      {/* 2-col notification cards */}
      <div className="grid grid-cols-2 gap-[14px] max-[720px]:grid-cols-1">
        {data.cards.map((card) => (
          <IncidentNotificationCard key={card.actionKey} card={card} />
        ))}
      </div>
    </section>
  );
}
