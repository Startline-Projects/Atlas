'use client';

/* Global onboarding overlay — Option B. Mounted once in the (admin) layout.
   Reads ObTourContext and renders the welcome modal (over a blurred backdrop) or the
   tour tooltip (over a dimmed, pointer-events-none backdrop so the user can still click
   the real sidebar / page underneath mid-tour). Replaces the Pass A ob-onboarding-shell. */

import { useObTour } from '@/lib/admin/onboarding-context';
import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';
import { ObWelcomeModal } from './ob-welcome-modal';
import { ObTourTooltip } from './ob-tour-tooltip';
import {
  obWelcomeData,
  obTourSteps,
  obFinishBanner,
} from '@/lib/mock-data/admin/onboarding-data';

export function ObTourOverlay() {
  const { state, currentStep, startTour, next, back, skip, finish, goToStep } =
    useObTour();
  const { showAction } = useAdminActionToast();

  if (state === 'idle' || state === 'closed') return null;

  if (state === 'welcome') {
    return (
      <div className="fixed inset-0 bg-[rgba(50,38,28,0.55)] backdrop-blur-[3px] z-[200] flex items-center justify-center p-[24px]">
        <ObWelcomeModal
          data={obWelcomeData}
          onSkip={() => {
            skip();
            showAction('Tour skipped');
          }}
          onStart={startTour}
        />
      </div>
    );
  }

  // state === 'tour'
  const step = obTourSteps[currentStep];
  if (!step) return null;

  return (
    <>
      <div className="fixed inset-0 bg-[rgba(50,38,28,0.45)] z-[199] pointer-events-none" />
      <ObTourTooltip
        step={step}
        currentStep={currentStep}
        totalSteps={obTourSteps.length}
        finishBanner={obFinishBanner}
        onSkip={() => {
          skip();
          showAction('Tour skipped');
        }}
        onBack={back}
        onNext={() => {
          if (currentStep === obTourSteps.length - 1) {
            finish();
            showAction('Tour complete · welcome to Atlas · audit-logged');
          } else {
            next();
          }
        }}
        onDotClick={goToStep}
      />
    </>
  );
}
