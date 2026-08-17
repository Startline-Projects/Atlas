import type { DisputeProfile } from '@/lib/mock-data/admin/dispute-profiles-data';
import { cn } from '@/lib/utils/cn';
import { RichInline, RichBlock } from './dispute-rich';

export function DisputeSubInvestigation({ dispute }: { dispute: DisputeProfile }) {
  const inv = dispute.investigation;

  return (
    <section
      id="disp-section-investigation"
      className="py-[36px] border-t border-[var(--line)] scroll-mt-[80px] [&:first-child]:border-t-0 [&:first-child]:pt-[12px]"
    >
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">03 · 06</span>
          <h2 className="font-display text-[24px] font-medium tracking-[-0.02em] leading-[1.1] [font-variation-settings:'opsz'_96] m-0">
            Specialist&apos;s investigation
          </h2>
        </div>
        <span className="inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[0.14em] uppercase font-semibold py-[3px] pl-[8px] pr-[9px] rounded-full bg-[var(--cream-deep)] text-[var(--ink-soft)] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current">
          {inv.statusText}
        </span>
      </div>

      {/* admin.html line 12171 — .disp-investigation-card (single unified) */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
        {/* Head */}
        <div className="py-[14px] px-[22px] bg-[var(--paper-deep)] border-b border-[var(--line)] flex items-center justify-between flex-wrap gap-[8px]">
          <div className="font-display text-[15px] font-medium flex items-center gap-[10px]">{inv.headTitle}</div>
          <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">{inv.headMeta}</div>
        </div>

        {/* Body */}
        <div className="py-[18px] px-[22px]">
          {/* Section 1: Notes */}
          <div className="mb-[18px]">
            <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold mb-[8px]">
              {inv.notesLabel}
            </div>
            <div className="text-[13.5px] text-[var(--ink-soft)] leading-[1.6] whitespace-pre-wrap">
              <RichBlock text={inv.notesText} />
            </div>
          </div>

          {/* Section 2: Evidence reviewed */}
          {inv.reviewItems.length > 0 && (
            <div className="mb-[18px]">
              <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold mb-[8px]">
                {inv.reviewLabel}
              </div>
              <div className="bg-[var(--paper-deep)] py-[12px] px-[14px] rounded-[var(--r-sm)] border border-dashed border-[var(--line)] grid grid-cols-2 gap-y-[6px] gap-x-[14px] max-[720px]:grid-cols-1">
                {inv.reviewItems.map((item, i) => (
                  <div key={i} className="grid grid-cols-[auto_1fr_auto] gap-[8px] items-center text-[12.5px] py-[6px]">
                    <span
                      className={cn(
                        'w-[16px] h-[16px] rounded-[3px] grid place-items-center flex-shrink-0',
                        item.checked
                          ? 'bg-[var(--success)] text-[var(--paper)]'
                          : 'bg-[var(--paper)] border border-dashed border-[var(--line-strong)] text-[var(--line-strong)]'
                      )}
                    >
                      {item.checked && (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </span>
                    <span className={cn('whitespace-nowrap overflow-hidden text-ellipsis', item.checked ? 'text-[var(--ink)]' : 'text-[var(--ink-mute)]')}>
                      {item.text}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] whitespace-nowrap">
                      {item.by}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 3: Conversations meta */}
          <div>
            <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold mb-[8px]">
              {inv.convoLabel}
            </div>
            <div className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.55]">
              <RichInline paragraph={inv.convoText} />
            </div>
          </div>
        </div>
      </div>

      {/* SEPARATE convo card (admin.html L24180 — mt-14) */}
      {inv.convoMsgs.length > 0 && (
        <div className="mt-[14px] bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
          <div className="py-[14px] px-[22px] bg-[var(--paper-deep)] border-b border-[var(--line)] flex items-center justify-between flex-wrap gap-[8px]">
            <div className="font-display text-[14px] font-medium">{inv.convoCardHeadTitle}</div>
            <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">{inv.convoCardHeadMeta}</div>
          </div>
          {inv.convoMsgs.map((msg, i) => (
            <div
              key={i}
              className={cn(
                'grid grid-cols-[auto_minmax(0,1fr)] gap-[12px] py-[12px] px-[22px] border-b border-dashed border-[var(--line-soft)]',
                i === inv.convoMsgs.length - 1 && 'border-b-0'
              )}
            >
              <span
                aria-hidden="true"
                className="w-[30px] h-[30px] rounded-full grid place-items-center font-display text-[11px] text-[var(--paper)] font-medium tracking-[-0.01em] flex-shrink-0"
                style={{ background: msg.gradient }}
              >
                {msg.initials}
              </span>
              <div className="min-w-0">
                <div className="flex items-baseline gap-[8px] flex-wrap mb-[3px]">
                  <span className="text-[12.5px] font-semibold text-[var(--ink)]">{msg.from}</span>
                  <span className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em]">{msg.time}</span>
                  <span
                    className={cn(
                      'font-mono text-[8.5px] tracking-[0.12em] uppercase py-[1px] px-[6px] rounded-[3px] font-semibold',
                      msg.tagFlagged ? 'bg-[var(--danger-bg)] text-[var(--danger)]' : 'bg-[var(--cream-deep)] text-[var(--ink-mute)]'
                    )}
                  >
                    {msg.tagLabel}
                  </span>
                </div>
                <div className="text-[13px] text-[var(--ink-soft)] leading-[1.5]">{msg.text}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
