'use client';

import { useEffect, useState } from 'react';
import { ClockIcon } from '@/components/ui/icons';

export function TimeoutModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [secondsLeft, setSecondsLeft] = useState(298); // 5 min - 2 sec = 4:58

  // Countdown timer
  useEffect(() => {
    if (!isOpen) return;

    // Reset seconds when modal opens
    setSecondsLeft(298);

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Auto-close when countdown reaches 0
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const displayTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="timeoutModalTitle"
    >
      <div
        className="bg-[var(--color-paper)] rounded-[var(--radius-xl)] shadow-[var(--shadow-card)] p-8 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon + Eyebrow + Title */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 rounded-full bg-[var(--color-amber-bg)] flex items-center justify-center flex-shrink-0">
            <ClockIcon className="w-5 h-5 text-[var(--color-amber)]" />
          </div>
          <div>
            <div className="text-[11px] tracking-[0.12em] uppercase text-[var(--color-amber)] font-semibold mb-1">
              Session timing out
            </div>
            <h3
              className="font-display text-[21px] font-medium tracking-[-0.01em] text-[var(--color-ink)]"
              id="timeoutModalTitle"
            >
              Still there?
            </h3>
          </div>
        </div>

        {/* Body text */}
        <p className="text-[14px] text-[var(--color-ink-soft)] leading-[1.55] mb-6">
          Your admin session has been idle for 55 minutes. For security,
          we'll sign you out automatically. Stay signed in to keep working —
          anything you've started will be preserved.
        </p>

        {/* Countdown display */}
        <div className="bg-[var(--color-cream-deep)] rounded-[var(--radius-md)] px-4 py-3 mb-6 text-center">
          <div className="font-display text-[32px] font-medium text-[var(--color-ink)] tabular-nums">
            {displayTime}
          </div>
          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--color-ink-mute)] mt-1">
            Until automatic sign-out
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2.5">
          <button
            onClick={onClose}
            // Demo: HTML also calls setSigninState('default') here, but in demo
            // context the form state is unchanged when the modal opens. If we
            // wire this to a real session-timeout flow later, restore the state reset.
            className="flex-1 px-4 py-3 border border-[var(--color-ink)] text-[13px] font-medium text-[var(--color-ink)] rounded-full hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
          >
            Sign out now
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-[var(--color-ink)] text-[13px] font-medium text-[var(--color-paper)] rounded-full hover:bg-black transition-colors"
          >
            Stay signed in
          </button>
        </div>
      </div>
    </div>
  );
}
