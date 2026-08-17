import type { SuspensionDetailProfile } from '@/lib/mock-data/admin/suspensions-bans-data';
import { SuspensionAppealStepper } from '../suspension-appeal-stepper';

interface SbAppealWorkflowProps {
  appeal: NonNullable<SuspensionDetailProfile['appeal']>;
}

const VARIANT_CARD_BORDER: Record<string, string> = {
  'under-review': 'border-[1.5px] border-[var(--amber)]',
  approved: 'border-[1.5px] border-[var(--success)]',
  denied: 'border-[1.5px] border-[var(--danger)]',
  none: 'border border-dashed border-[var(--line)]',
};

const VARIANT_TOP_STRIP: Record<string, string> = {
  'under-review': 'bg-[var(--amber)]',
  approved: 'bg-[var(--success)]',
  denied: 'bg-[var(--danger)]',
  none: 'hidden',
};

const VARIANT_PILL: Record<string, string> = {
  'under-review': 'bg-[var(--amber-bg)] text-[var(--amber)]',
  approved: 'bg-[var(--success-bg)] text-[var(--success)]',
  denied: 'bg-[var(--danger-bg)] text-[var(--danger)]',
  none: 'bg-[var(--cream-deep)] text-[var(--ink-mute)]',
};

const VARIANT_PILL_DOT: Record<string, string> = {
  'under-review': 'bg-[var(--amber)]',
  approved: 'bg-[var(--success)]',
  denied: 'bg-[var(--danger)]',
  none: 'bg-[var(--ink-mute)]',
};

const VARIANT_STATEMENT_LEFT: Record<string, string> = {
  'under-review': 'border-l-[var(--amber)]',
  approved: 'border-l-[var(--success)]',
  denied: 'border-l-[var(--danger)]',
  none: 'border-l-[var(--ink-mute)]',
};

export function SbAppealWorkflow({ appeal }: SbAppealWorkflowProps) {
  return (
    <>
      <style>{`
        @keyframes sb-pulse-fr {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
      <section className="mb-[16px]">
        <div
          className={`bg-[var(--paper)] rounded-[var(--r-md)] p-[20px_22px] relative ${VARIANT_CARD_BORDER[appeal.state]}`}
        >
          {/* Top strip */}
          {appeal.state !== 'none' && (
            <span
              aria-hidden="true"
              className={`absolute -top-[1.5px] -left-[1.5px] -right-[1.5px] h-[3px] rounded-tl-[var(--r-md)] rounded-tr-[var(--r-md)] ${VARIANT_TOP_STRIP[appeal.state]}`}
            />
          )}

          {/* Head */}
          <div className="flex items-center justify-between gap-[12px] flex-wrap mb-[14px] pb-[12px] border-b border-dashed border-b-[var(--line-soft)]">
            <div>
              <h3 className="font-display text-[16px] font-medium tracking-[-0.01em] m-0 mb-[3px] leading-[1.2] text-[var(--ink)]">
                {appeal.headTitle}
              </h3>
              <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em]">
                {appeal.headMeta}
              </div>
            </div>
            <span
              className={`inline-flex items-center gap-[6px] px-[10px] py-[4px] font-mono text-[10px] tracking-[0.08em] uppercase font-bold rounded-full ${VARIANT_PILL[appeal.state]}`}
            >
              <span
                className={`w-[6px] h-[6px] rounded-full ${VARIANT_PILL_DOT[appeal.state]}`}
                style={
                  appeal.state === 'under-review'
                    ? { animation: 'sb-pulse-fr 1.4s ease-in-out infinite' }
                    : undefined
                }
              />
              {appeal.stagePillLabel}
            </span>
          </div>

          {/* Stepper */}
          <SuspensionAppealStepper steps={appeal.steps} state={appeal.state} />

          {/* Statement */}
          {appeal.statement && (
            <div
              className={`p-[14px_16px] bg-[var(--paper-deep)] border border-[var(--line-soft)] border-l-[3px] ${VARIANT_STATEMENT_LEFT[appeal.state]} rounded-[var(--r-sm)] mb-[12px]`}
            >
              <div className="flex items-center gap-[8px] mb-[8px]">
                <span
                  className="w-[22px] h-[22px] rounded-full grid place-items-center font-display text-[9px] font-medium text-[var(--paper)] flex-shrink-0"
                  style={{ background: appeal.statement.gradient }}
                >
                  {appeal.statement.initials}
                </span>
                <span className="text-[12px] font-bold text-[var(--ink)] tracking-[-0.01em]">
                  {appeal.statement.author}
                </span>
                <span className="ml-auto font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.02em]">
                  {appeal.statement.time}
                </span>
              </div>
              <div className="text-[13px] text-[var(--ink-soft)] leading-[1.55] tracking-[-0.005em]">
                {appeal.statement.body}
              </div>
              {appeal.statement.attachments.length > 0 && (
                <div className="flex flex-wrap gap-[8px] mt-[10px] pt-[10px] border-t border-dashed border-t-[var(--line-soft)]">
                  {appeal.statement.attachments.map((att) => (
                    <span
                      key={att.label}
                      className="inline-flex items-center gap-[5px] px-[8px] py-[4px] bg-[var(--paper)] border border-[var(--line)] rounded-[4px] font-mono text-[10.5px] font-semibold text-[var(--ink-soft)] cursor-pointer tracking-[0.02em] transition-all hover:border-[var(--ink)] hover:text-[var(--ink)]"
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                      </svg>
                      {att.label}
                      <span className="text-[var(--ink-mute)] font-normal">· {att.size}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Review actions */}
          {appeal.reviewPrompt && appeal.reviewActions && (
            <div className="flex gap-[8px] flex-wrap items-center p-[12px] bg-[var(--paper-deep)] border border-dashed border-[var(--line)] rounded-[var(--r-sm)]">
              <div className="flex-1 font-mono text-[11.5px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.5] min-w-0">
                <strong className="text-[var(--ink)] font-bold">Pending decision:</strong> {appeal.reviewPrompt}
              </div>
              <div className="inline-flex gap-[6px]">
                {appeal.reviewActions.map((action) => {
                  const isPrimary = action.variant === 'primary';
                  const isDanger = action.variant === 'danger';
                  const isWarn = action.variant === 'warn';
                  const classes = isPrimary
                    ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] hover:bg-black'
                    : isDanger
                      ? 'bg-[var(--paper)] text-[var(--danger)] border-[rgba(194,65,43,0.3)] hover:border-[var(--danger)] hover:bg-[var(--danger-bg)]'
                      : isWarn
                        ? 'bg-[var(--paper)] text-[var(--amber)] border-[rgba(232,118,58,0.3)] hover:border-[var(--amber)] hover:bg-[var(--amber-bg)]'
                        : 'bg-[var(--paper)] text-[var(--ink-soft)] border-[var(--line)] hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)]';
                  return (
                    <button
                      key={action.label}
                      type="button"
                      className={`inline-flex items-center gap-[6px] py-[8px] pr-[14px] pl-[12px] font-body text-[12.5px] font-medium border rounded-full cursor-pointer whitespace-nowrap transition-all ${classes}`}
                    >
                      {action.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
