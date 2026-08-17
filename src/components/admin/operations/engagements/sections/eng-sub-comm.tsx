'use client';

import type { EngagementProfile, CommMessage } from '@/lib/mock-data/admin/engagement-profiles-data';

interface EngSubCommProps {
  engagement: EngagementProfile;
}

function MessageRow({ message }: { message: CommMessage }) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-[12px] py-[12px] px-[20px] border-b border-dashed border-[var(--line-soft)] last:border-b-0">
      <div
        aria-hidden="true"
        className="w-[30px] h-[30px] rounded-full grid place-items-center font-display text-[11px] text-[var(--paper)] font-medium tracking-[-0.01em] flex-shrink-0"
        style={{ background: message.avatarGradient }}
      >
        {message.avatarInitials}
      </div>
      <div className="min-w-0">
        <div className="flex items-baseline gap-[8px] flex-wrap mb-[3px]">
          <span className="text-[12.5px] font-semibold text-[var(--ink)]">{message.fromName}</span>
          <span className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em]">
            {message.time}
          </span>
        </div>
        <div className="text-[13px] text-[var(--ink-soft)] leading-[1.5]">{message.text}</div>
      </div>
    </div>
  );
}

export function EngSubComm({ engagement }: EngSubCommProps) {
  const { communication } = engagement;

  const handleOpenFullThread = () => {
    // eslint-disable-next-line no-console
    console.log(`[engagement-comm] full-thread clicked for ${engagement.id}`);
  };

  return (
    <section
      id="eng-section-comm"
      className="py-[36px] border-t border-[var(--line)] scroll-mt-[80px] [&:first-child]:border-t-0 [&:first-child]:pt-[12px]"
    >
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            04 · 06
          </span>
          <h2 className="font-display text-[24px] font-medium tracking-[-0.02em] leading-[1.1] [font-variation-settings:'opsz'_96] m-0">
            Communication history
          </h2>
        </div>
        <span className="inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[0.14em] uppercase font-semibold py-[3px] pl-[8px] pr-[9px] rounded-full bg-[var(--success-bg)] text-[var(--success)] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current">
          {communication.messages.length} of many · admin-read only
        </span>
      </div>

      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
        <div className="py-[14px] px-[20px] bg-[var(--paper-deep)] border-b border-[var(--line)] flex items-center justify-between flex-wrap gap-[8px]">
          <div className="font-display text-[15px] font-medium">{communication.title}</div>
          <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">
            {communication.metaLine}
          </div>
        </div>

        {communication.messages.map((msg, idx) => (
          <MessageRow key={idx} message={msg} />
        ))}

        {/* admin.html line 22145: inline-styled footer mapped to Tailwind */}
        <div className="py-[12px] px-[20px] border-t border-[var(--line)] bg-[var(--paper-deep)] flex items-center justify-between flex-wrap gap-[8px]">
          <span className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em]">
            {communication.footerLabel}
          </span>
          <button
            type="button"
            onClick={handleOpenFullThread}
            data-eng-action="full-thread"
            className="inline-flex items-center gap-[6px] py-[6px] px-[12px] font-mono text-[11px] tracking-[0.02em] text-[var(--ink-soft)] bg-[var(--paper)] border border-[var(--line)] rounded-full cursor-pointer transition-colors duration-[120ms] ease hover:bg-[var(--cream-deep)] hover:text-[var(--ink)]"
          >
            {communication.fullThreadLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
