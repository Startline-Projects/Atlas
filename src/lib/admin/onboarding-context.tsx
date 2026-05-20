'use client';

/* Onboarding tour state — Option B (global overlay).
   Mounted in the (admin) layout so the tooltip persists across route changes.
   Each step advance router.pushes the underlying route to that step's hashTarget,
   so the real admin page + sidebar active-state render behind the tooltip. */

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { obTourSteps } from '@/lib/mock-data/admin/onboarding-data';

export type ObTourState = 'idle' | 'welcome' | 'tour' | 'closed';

interface ObTourContextValue {
  state: ObTourState;
  currentStep: number;
  startWelcome: () => void;
  startTour: () => void;
  goToStep: (idx: number) => void;
  next: () => void;
  back: () => void;
  skip: () => void;
  finish: () => void;
  close: () => void;
}

const ObTourContext = createContext<ObTourContextValue | null>(null);

export function ObTourProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [state, setState] = useState<ObTourState>('idle');
  const [currentStep, setCurrentStep] = useState(0);

  const startWelcome = () => setState('welcome');

  const goToStep = (idx: number) => {
    const step = obTourSteps[idx];
    if (!step) return;
    setCurrentStep(idx);
    router.push(step.hashTarget);
  };

  const startTour = () => {
    setCurrentStep(0);
    setState('tour');
    const first = obTourSteps[0];
    if (first) router.push(first.hashTarget);
  };

  const next = () => {
    const nextIdx = currentStep + 1;
    if (nextIdx >= obTourSteps.length) {
      setState('closed');
      router.push('/admin/dashboard');
      return;
    }
    goToStep(nextIdx);
  };

  const back = () => {
    if (currentStep > 0) goToStep(currentStep - 1);
  };

  const skip = () => {
    setState('closed');
    router.push('/admin/dashboard');
  };

  const finish = () => {
    setState('closed');
    router.push('/admin/dashboard');
  };

  const close = () => setState('closed');

  return (
    <ObTourContext.Provider
      value={{
        state,
        currentStep,
        startWelcome,
        startTour,
        goToStep,
        next,
        back,
        skip,
        finish,
        close,
      }}
    >
      {children}
    </ObTourContext.Provider>
  );
}

export function useObTour() {
  const ctx = useContext(ObTourContext);
  if (!ctx) {
    throw new Error('useObTour must be used within ObTourProvider');
  }
  return ctx;
}
