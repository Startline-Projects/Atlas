/* admin.html lines 63082-63100: test-send card — paper-plane icon + h3 head + desc + email input + Send button + history footer */

import type { TmTestSendData } from '@/lib/mock-data/admin/templates-data';

interface TmTestSendCardProps {
  data: TmTestSendData;
}

export function TmTestSendCard({ data }: TmTestSendCardProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[16px] px-[18px]">
      {/* Head */}
      <div className="flex items-center gap-[10px] mb-[12px]">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[var(--ink-mute)]"
        >
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
        <h3 className="font-display text-[14.5px] font-medium text-[var(--ink)] m-0 tracking-[-0.01em]">
          {data.headTitle}
        </h3>
      </div>

      {/* Description */}
      <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.55] mb-[12px]">
        {data.description}
      </div>

      {/* Input + button row */}
      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-[8px] items-stretch">
        <input
          type="email"
          placeholder={data.inputPlaceholder}
          defaultValue={data.inputDefaultValue}
          className="py-[9px] px-[12px] font-body text-[13px] bg-[var(--paper-deep)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] outline-none transition-colors focus:border-[var(--ink)]"
        />
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[7px] px-[14px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full bg-[var(--ink)] border border-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink-soft)] hover:border-[var(--ink-soft)] cursor-pointer transition-all whitespace-nowrap"
        >
          {data.sendButtonLabel}
        </button>
      </div>

      {/* History footer */}
      <div
        className="mt-[10px] pt-[10px] border-t border-t-dashed border-t-[var(--line-soft)] font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.55] [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold"
        dangerouslySetInnerHTML={{ __html: data.historyFooterHtml }}
      />
    </div>
  );
}
