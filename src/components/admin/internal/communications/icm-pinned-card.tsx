'use client';

/* admin.html lines 65569-65616 + CSS 30846-30969: UNIQUE pinned-announcement widget
   2px super border + super gradient bg + STATIC "📌 PINNED · ADMIN TEAM" eyebrow (no pulse)
   head (iaha-dot avatar + id + REQUIRED ACK chip + author meta) + h3 + summary + 4-stat + foot */

import type { IcmPinnedData } from '@/lib/mock-data/admin/communications-data';
import { IcmRequiredAckChip } from './icm-required-ack-chip';
import { IcmPinnedStatCell } from './icm-pinned-stat';
import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';

interface IcmPinnedCardProps {
  pinned: IcmPinnedData;
}

export function IcmPinnedCard({ pinned }: IcmPinnedCardProps) {
  const { showAction } = useAdminActionToast();

  const handleAction = (label: string) => {
    if (label === 'Send reminder')
      showAction('Reminder queued to 4 outstanding admins');
    else if (label === 'Acknowledge')
      showAction('v3.2 policy acknowledged — audit logged');
    else showAction(label);
  };

  return (
    <div className="relative bg-[linear-gradient(135deg,rgba(110,63,224,0.08),var(--paper))] border-[2px] border-[var(--super)] rounded-[var(--r-md)] py-[18px] px-[22px] mb-[22px]">
      {/* "📌 PINNED · ADMIN TEAM" static eyebrow (replaces ::before) */}
      <span className="absolute top-[-1px] left-[18px] bg-[var(--super)] text-[var(--paper)] font-mono text-[8.5px] tracking-[0.14em] font-bold py-[3px] pl-[11px] pr-[9px] rounded-b-[4px]">
        📌 PINNED · ADMIN TEAM
      </span>

      {/* Head: id row + title + summary */}
      <div className="flex items-start gap-[14px] mb-[12px] pt-[10px]">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-[8px] mb-[6px] flex-wrap">
            <span className="font-mono text-[11px] tracking-[0.1em] text-[var(--ink-soft)] font-bold">
              {pinned.id}
            </span>
            <IcmRequiredAckChip label={pinned.requiredAckLabel} />
            <span className="inline-flex items-center gap-[5px] font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em]">
              <span
                className="w-[16px] h-[16px] rounded-full grid place-items-center font-display text-[7.5px] font-bold text-[var(--paper)] tracking-[0]"
                style={{ background: pinned.authorAvatarGradient }}
              >
                {pinned.authorAvatarInitials}
              </span>
              {pinned.authorMetaText}
            </span>
          </div>
          <h3 className="font-display text-[19px] font-medium tracking-[-0.015em] text-[var(--ink)] m-0 mb-[6px] leading-[1.25]">
            {pinned.title}
          </h3>
          <div
            className="font-body text-[13.5px] text-[var(--ink-soft)] tracking-[-0.005em] leading-[1.55] [&_strong]:text-[var(--ink)] [&_strong]:font-bold [&_a]:text-[var(--super)] [&_a]:underline [&_a]:font-bold [&_a]:cursor-pointer"
            dangerouslySetInnerHTML={{ __html: pinned.summaryHtml }}
          />
        </div>
      </div>

      {/* 4-cell pinned stats */}
      <div className="grid grid-cols-4 gap-0 bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-sm)] overflow-hidden mb-[12px] max-[720px]:grid-cols-2">
        {pinned.stats.map((stat, idx) => (
          <IcmPinnedStatCell key={idx} stat={stat} />
        ))}
      </div>

      {/* Foot: meta + actions */}
      <div className="flex items-center justify-between gap-[10px] flex-wrap">
        <div
          className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em] [&_strong]:text-[var(--ink)] [&_strong]:font-bold"
          dangerouslySetInnerHTML={{ __html: pinned.footMetaHtml }}
        />
        <div className="inline-flex gap-[6px]">
          {pinned.actions.map((action, idx) => {
            const isPrimary = action.isPrimary;
            const btnClasses = isPrimary
              ? 'bg-[var(--ink)] border-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink-soft)] hover:border-[var(--ink-soft)]'
              : 'bg-[var(--paper)] border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:text-[var(--ink)]';
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleAction(action.label)}
                className={`inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full border cursor-pointer transition-all whitespace-nowrap ${btnClasses}`}
              >
                {action.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
