'use client';

/* admin.html lines 65868-66031 + CSS 31298-31437: single announcement card
   default + urgent variants. urgent shows "URGENT" amber chip at top (child span replacing ::before) */

import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';
import type {
  IcmAnnouncementCard as IcmAnnouncementCardData,
  IcmAnnouncementAckPctVariant,
} from '@/lib/mock-data/admin/communications-data';
import { IcmAnnouncementMetaRow } from './icm-announcement-meta-row';

interface IcmAnnouncementCardProps {
  card: IcmAnnouncementCardData;
}

const pctColor: Record<IcmAnnouncementAckPctVariant, string> = {
  default: 'text-[var(--ink-soft)]',
  full: 'text-[var(--success)]',
  partial: 'text-[var(--amber)]',
};

export function IcmAnnouncementCard({ card }: IcmAnnouncementCardProps) {
  const { showAction } = useAdminActionToast();

  const cardClasses =
    card.variant === 'urgent'
      ? 'grid grid-cols-1 gap-0 py-[14px] px-[18px] rounded-[var(--r-md)] cursor-pointer transition-all bg-[rgba(232,118,58,0.04)] border border-[rgba(232,118,58,0.3)] hover:border-[rgba(232,118,58,0.6)] hover:bg-[rgba(232,118,58,0.07)]'
      : 'grid grid-cols-1 gap-0 py-[14px] px-[18px] bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] cursor-pointer transition-all hover:border-[var(--line-strong)] hover:bg-[var(--paper-deep)]';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => showAction(`Open announcement ${card.id}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          showAction(`Open announcement ${card.id}`);
        }
      }}
      className={cardClasses}
    >
      {card.variant === 'urgent' && (
        <span className="inline-block self-start mb-[5px] py-[2px] px-[7px] font-mono text-[8.5px] font-bold tracking-[0.12em] uppercase bg-[var(--amber)] text-[var(--paper)] rounded-[3px]">
          URGENT
        </span>
      )}
      <div className="flex items-start gap-[10px] mb-[6px] flex-wrap">
        <div className="flex-1 min-w-0">
          <IcmAnnouncementMetaRow items={card.metaItems} />
          <h3 className="font-display text-[17px] font-medium tracking-[-0.015em] text-[var(--ink)] m-0 leading-[1.25]">
            {card.title}
          </h3>
        </div>
        {card.ack && (
          <div className="flex-shrink-0 text-right">
            <div
              className={`font-mono text-[11.5px] font-bold tracking-[0.04em] tabular-nums ${pctColor[card.ack.pctVariant]}`}
            >
              {card.ack.pctValue}
              {card.ack.pctSuffix && (
                <span
                  style={{ color: 'var(--ink-mute)', fontWeight: 500 }}
                >
                  {card.ack.pctSuffix}
                </span>
              )}
            </div>
            <div className="font-mono text-[8.5px] tracking-[0.12em] uppercase text-[var(--ink-mute)] font-bold mt-[1px]">
              {card.ack.label}
            </div>
          </div>
        )}
      </div>
      <div
        className="font-body text-[13px] text-[var(--ink-soft)] tracking-[-0.005em] leading-[1.55] mb-[8px] [&_strong]:text-[var(--ink)] [&_strong]:font-bold [&_a]:text-[var(--super)] [&_a]:underline [&_a]:font-semibold [&_a]:cursor-pointer"
        dangerouslySetInnerHTML={{ __html: card.bodyHtml }}
      />
      <div className="flex items-center justify-between gap-[8px] pt-[8px] border-t border-t-dashed border-t-[var(--line-soft)] font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] flex-wrap">
        <div
          className="inline-flex gap-[14px] flex-wrap [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold"
          dangerouslySetInnerHTML={{ __html: card.footStatsHtml }}
        />
        <span>{card.footDateText}</span>
      </div>
    </div>
  );
}
