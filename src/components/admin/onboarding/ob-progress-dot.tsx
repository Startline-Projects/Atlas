'use client';

/* admin.html obtp-dot · CSS 32817-32843 + render JS 81324-81329
   default → --line · .complete → --success · .active → --ink + scale 1.4
   admin.html uses <span data-ob-dot>; here a button so dots are click-to-jump. */

type ObProgressDotState = 'default' | 'complete' | 'active';

interface ObProgressDotProps {
  state: ObProgressDotState;
  label: string;
  onClick: () => void;
}

export function ObProgressDot({ state, label, onClick }: ObProgressDotProps) {
  const stateClass =
    state === 'active'
      ? 'bg-[var(--ink)] scale-[1.4]'
      : state === 'complete'
        ? 'bg-[var(--success)]'
        : 'bg-[var(--line)]';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`w-[7px] h-[7px] rounded-full border-0 p-0 cursor-pointer transition-all duration-[120ms] ease-in-out ${stateClass}`}
    />
  );
}
