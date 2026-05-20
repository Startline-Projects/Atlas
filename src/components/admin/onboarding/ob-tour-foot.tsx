'use client';

/* admin.html ob-tour-foot · markup 68164-68170 + CSS 32845-32895 + JS 81342-81348
   Skip (left ghost) · Back (outline, disabled on step 1) · Next (solid ink).
   Next label verbatim: "Finish ✓" on finish step (JS 81347), else "Next →". */

interface ObTourFootProps {
  isFirstStep: boolean;
  isFinishStep: boolean;
  onSkip: () => void;
  onBack: () => void;
  onNext: () => void;
}

export function ObTourFoot({
  isFirstStep,
  isFinishStep,
  onSkip,
  onBack,
  onNext,
}: ObTourFootProps) {
  return (
    <div className="flex items-center justify-between gap-[8px] py-[12px] px-[18px] border-t border-t-[var(--line-soft)] bg-[var(--paper-deep)]">
      <button
        type="button"
        onClick={onSkip}
        className="bg-transparent border-0 py-[6px] px-[10px] font-mono text-[10.5px] font-bold tracking-[0.04em] text-[var(--ink-mute)] cursor-pointer hover:text-[var(--ink-soft)] hover:underline"
      >
        Skip tour
      </button>
      <div className="inline-flex gap-[6px]">
        <button
          type="button"
          onClick={onBack}
          disabled={isFirstStep}
          className="py-[7px] px-[14px] rounded-[5px] font-body text-[12.5px] font-semibold tracking-[-0.005em] cursor-pointer border border-[var(--line)] bg-[var(--paper)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] disabled:opacity-[0.4] disabled:cursor-not-allowed"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="py-[7px] px-[14px] rounded-[5px] font-body text-[12.5px] font-semibold tracking-[-0.005em] cursor-pointer border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] hover:bg-[#2A1F18]"
        >
          {isFinishStep ? 'Finish ✓' : 'Next →'}
        </button>
      </div>
    </div>
  );
}
