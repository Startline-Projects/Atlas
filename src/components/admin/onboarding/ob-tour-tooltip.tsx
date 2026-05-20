'use client';

/* admin.html tour tooltip · markup 68131-68171 + render JS 81290-81362 + CSS 32716-32895.
   CENTERED override (Option A) — admin.html anchors via JS (top 90px / left 50%); on the
   dedicated route we center with translate and OMIT the ::before pointer arrow (points at nothing).
   Layout: head (eyebrow + "N / 10") → body (optional finish banner → optional section badge →
   h3 + prose + hint + per-step Go-to link) → 10-dot progress → foot (skip/back/next). */

import type { ObTourStep, ObFinishBanner } from '@/lib/mock-data/admin/onboarding-data';
import { ObSectionBadge } from './ob-section-badge';
import { ObFinishBannerCard } from './ob-finish-banner';
import { ObGoToLink } from './ob-go-to-link';
import { ObTourProgress } from './ob-tour-progress';
import { ObTourFoot } from './ob-tour-foot';

interface ObTourTooltipProps {
  step: ObTourStep;
  currentStep: number; // 0-indexed
  totalSteps: number;
  finishBanner: ObFinishBanner;
  onSkip: () => void;
  onBack: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
}

export function ObTourTooltip({
  step,
  currentStep,
  totalSteps,
  finishBanner,
  onSkip,
  onBack,
  onNext,
  onDotClick,
}: ObTourTooltipProps) {
  return (
    <div
      role="dialog"
      aria-label="Onboarding tour step"
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[201] w-[420px] max-w-[calc(100vw-32px)] max-[720px]:w-[calc(100vw-24px)] bg-[var(--paper)] border border-[var(--line)] rounded-[10px] shadow-[0_16px_48px_rgba(50,38,28,0.28),0_4px_12px_rgba(50,38,28,0.12)] flex flex-col overflow-hidden"
    >
      {/* Head */}
      <div className="flex items-center justify-between gap-[10px] pt-[14px] px-[18px] pb-[4px]">
        <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--super)] font-bold">
          {step.eyebrow}
        </div>
        <div className="font-mono text-[10px] tracking-[0.06em] text-[var(--ink-mute)] font-bold">
          <strong className="text-[var(--ink)]">{currentStep + 1}</strong> / {totalSteps}
        </div>
      </div>

      {/* Body */}
      <div className="pt-[4px] px-[18px] pb-[14px]">
        {step.finish && <ObFinishBannerCard data={finishBanner} />}
        {step.badge && <ObSectionBadge badge={step.badge} />}
        <h3 className="font-display text-[18px] font-medium tracking-[-0.015em] text-[var(--ink)] m-0 mb-[8px] leading-[1.25]">
          {step.title}
        </h3>
        <p
          className="font-body text-[13.5px] text-[var(--ink-soft)] leading-[1.6] tracking-[-0.005em] m-0 [&_strong]:text-[var(--ink)] [&_strong]:font-semibold"
          dangerouslySetInnerHTML={{ __html: step.proseHtml }}
        />
        <div
          className="mt-[12px] py-[10px] px-[12px] bg-[var(--paper-deep)] rounded-[6px] font-mono text-[10.5px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.55] [&_strong]:text-[var(--ink)] [&_strong]:font-bold [&_[data-ob-kbd]]:inline-block [&_[data-ob-kbd]]:py-[1px] [&_[data-ob-kbd]]:px-[5px] [&_[data-ob-kbd]]:font-mono [&_[data-ob-kbd]]:text-[10px] [&_[data-ob-kbd]]:font-bold [&_[data-ob-kbd]]:bg-[var(--ink)] [&_[data-ob-kbd]]:text-[var(--paper)] [&_[data-ob-kbd]]:rounded-[3px] [&_[data-ob-kbd]]:mx-[1px]"
          dangerouslySetInnerHTML={{ __html: step.hintHtml }}
        />
        <ObGoToLink href={step.hashTarget} label={step.hashLabel} />
      </div>

      {/* Progress */}
      <ObTourProgress
        currentStep={currentStep}
        totalSteps={totalSteps}
        onDotClick={onDotClick}
      />

      {/* Foot */}
      <ObTourFoot
        isFirstStep={currentStep === 0}
        isFinishStep={!!step.finish}
        onSkip={onSkip}
        onBack={onBack}
        onNext={onNext}
      />
    </div>
  );
}
