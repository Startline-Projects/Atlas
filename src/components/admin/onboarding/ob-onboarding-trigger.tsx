'use client';

/* /admin/onboarding entry point. Visiting the route opens the welcome modal (via context)
   and redirects the URL to /admin/dashboard, so the user sees the welcome modal over a real
   admin page from step 0. The global ObTourOverlay (in the layout) renders the modal. */

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useObTour } from '@/lib/admin/onboarding-context';

export function ObOnboardingTrigger() {
  const { startWelcome } = useObTour();
  const router = useRouter();
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    startWelcome();
    router.replace('/admin/dashboard');
  }, [startWelcome, router]);

  return null;
}
