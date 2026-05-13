import type { SbCommMessage } from '@/lib/mock-data/admin/suspensions-bans-data';
import { SuspensionCommMessage } from '../suspension-comm-message';

interface SbCommunicationThreadProps {
  messages: SbCommMessage[];
  sectionNum: string;
}

export function SbCommunicationThread({ messages, sectionNum }: SbCommunicationThreadProps) {
  return (
    <section className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[20px_24px] mb-[16px]">
      <div className="flex items-end justify-between gap-[12px] flex-wrap mb-[16px] pb-[12px] border-b border-dashed border-b-[var(--line-soft)]">
        <div className="flex items-baseline gap-[10px]">
          <span className="font-mono text-[9.5px] tracking-[0.06em] bg-[var(--cream-deep)] text-[var(--ink-mute)] px-[6px] py-[2px] rounded-[3px] font-bold">
            {sectionNum}
          </span>
          <div>
            <h2 className="font-display text-[18px] font-medium tracking-[-0.01em] text-[var(--ink)] leading-[1.2] m-0">
              Communication with user
            </h2>
            <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em] mt-[4px]">
              admin ↔ user thread · separate from internal notes · audit logged
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[10px] p-[12px] bg-[var(--paper-deep)] border border-[var(--line)] rounded-[var(--r-sm)]">
        {messages.map((msg, i) => (
          <SuspensionCommMessage key={i} message={msg} />
        ))}
      </div>

      <div className="mt-[8px] p-[10px_12px] bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-sm)]">
        <textarea
          placeholder="Message the party · sent via email + in-app · audit logged on save"
          className="w-full min-h-[50px] font-body text-[13px] text-[var(--ink)] bg-transparent border-0 resize-y outline-none tracking-[-0.005em] leading-[1.5] placeholder:text-[var(--ink-mute)]"
        />
        <div className="flex justify-between items-center gap-[8px] mt-[8px] pt-[8px] border-t border-dashed border-t-[var(--line-soft)] font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.02em]">
          <span>Sent via email + in-app · audit logged on save</span>
          <button
            type="button"
            className="inline-flex items-center gap-[6px] py-[5px] px-[12px] font-body text-[11.5px] font-medium bg-[var(--ink)] text-[var(--paper)] border border-[var(--ink)] rounded-full cursor-pointer whitespace-nowrap hover:bg-black transition-all"
          >
            Send message
          </button>
        </div>
      </div>
    </section>
  );
}
