/* admin.html lines 66956-66981 + CSS 31810-31835: phase checklist row
   18px square box + complete variant fills success + check icon + line-through text */

interface KbStepCheckProps {
  text: string;
  isComplete: boolean;
}

export function KbStepCheck({ text, isComplete }: KbStepCheckProps) {
  return (
    <div className="flex items-start gap-[10px] py-[6px]">
      <span
        className={`w-[18px] h-[18px] border-[1.5px] rounded-[4px] grid place-items-center flex-shrink-0 mt-[2px] text-[var(--paper)] ${
          isComplete
            ? 'bg-[var(--success)] border-[var(--success)]'
            : 'border-[var(--line-strong)]'
        }`}
      >
        {isComplete && (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      <span
        className={`text-[14px] leading-[1.5] ${
          isComplete
            ? 'text-[var(--ink-mute)] line-through'
            : 'text-[var(--ink-soft)]'
        } [&_code]:font-mono [&_code]:text-[11.5px] [&_code]:bg-[var(--paper-deep)] [&_code]:py-[1px] [&_code]:px-[4px] [&_code]:rounded-[2px]`}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
}
