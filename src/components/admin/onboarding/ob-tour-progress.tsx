'use client';

/* admin.html ob-tour-progress · CSS 32817-32843 + meta formula JS 81331-81340
   10 dots (default/complete/active) + right-aligned "~Nmin remaining" meta.
   Meta verbatim: remaining = total - current - 1; 0 → "final step",
   else "~" + Math.max(1, Math.round(remaining * 0.8)) + "min remaining". */

import { ObProgressDot } from './ob-progress-dot';

interface ObTourProgressProps {
  currentStep: number; // 0-indexed
  totalSteps: number;
  onDotClick: (index: number) => void;
}

export function ObTourProgress({ currentStep, totalSteps, onDotClick }: ObTourProgressProps) {
  const remaining = totalSteps - currentStep - 1;
  const meta =
    remaining === 0
      ? 'final step'
      : `~${Math.max(1, Math.round(remaining * 0.8))}min remaining`;

  return (
    <div className="flex gap-[6px] pt-0 px-[18px] pb-[12px] items-center">
      {Array.from({ length: totalSteps }, (_, i) => {
        const state =
          i < currentStep ? 'complete' : i === currentStep ? 'active' : 'default';
        return (
          <ObProgressDot
            key={i}
            state={state}
            label={`Go to step ${i + 1}`}
            onClick={() => onDotClick(i)}
          />
        );
      })}
      <span className="ml-auto font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] font-bold">
        {meta}
      </span>
    </div>
  );
}
