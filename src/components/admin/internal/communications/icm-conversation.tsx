'use client';

/* admin.html lines 65740-65842 + CSS 31115-31171: active conversation right column
   head (32px square avatar + name + meta + 2 quick action buttons) + scrollable body + composer */

import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';
import type {
  IcmConversationData,
  IcmConvHeadIconKey,
} from '@/lib/mock-data/admin/communications-data';
import { IcmMessage } from './icm-message';
import { IcmComposer } from './icm-composer';

interface IcmConversationProps {
  data: IcmConversationData;
}

function renderHeadIcon(key: IcmConvHeadIconKey) {
  if (key === 'pin') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="17" x2="12" y2="22" />
        <path d="M5 17h14l-1.6-7H6.6L5 17zM12 4v6" />
        <path d="M9 4h6" />
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

export function IcmConversation({ data }: IcmConversationProps) {
  const { showAction } = useAdminActionToast();

  return (
    <div className="flex flex-col min-h-0">
      <div className="flex items-center gap-[10px] py-[12px] px-[18px] bg-[var(--paper-deep)] border-b border-b-[var(--line-soft)] flex-shrink-0">
        <div
          className="w-[32px] h-[32px] rounded-[6px] grid place-items-center font-display text-[11px] font-bold text-[var(--paper)] tracking-[-0.01em] flex-shrink-0"
          style={{ background: data.avatarGradient }}
        >
          {data.avatarInitials}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-display text-[14.5px] font-medium text-[var(--ink)] tracking-[-0.01em] m-0 leading-[1.2]">
            {data.name}
          </h4>
          <div
            className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] mt-[2px] [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold"
            dangerouslySetInnerHTML={{ __html: data.metaHtml }}
          />
        </div>
        <div className="inline-flex gap-[5px] flex-shrink-0">
          {data.headActions.map((action, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={action.label}
              onClick={() => showAction(`${action.label} thread`)}
              className="w-[28px] h-[28px] grid place-items-center bg-[var(--paper)] border border-[var(--line)] rounded-[4px] text-[var(--ink-soft)] cursor-pointer transition-colors hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]"
            >
              {renderHeadIcon(action.iconKey)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pt-[14px] px-[18px] pb-[8px] bg-[var(--paper)] min-h-0">
        {data.messages.map((msg, idx) => (
          <IcmMessage key={idx} message={msg} />
        ))}
      </div>

      <IcmComposer
        placeholder={data.composerPlaceholder}
        sendLabel={data.composerSendLabel}
      />
    </div>
  );
}
