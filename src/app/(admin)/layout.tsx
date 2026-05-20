'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { SignInStateProvider } from '@/lib/admin/signin-state-context';
import { ObTourProvider } from '@/lib/admin/onboarding-context';
import { AdminLayoutShell } from '@/components/admin/shell/admin-layout-shell';
import { TimeoutModal } from '@/components/admin/auth/timeout-modal';
import { AdminActionToastProvider } from '@/components/admin/shared/admin-action-toast';
import { ObTourOverlay } from '@/components/admin/onboarding/ob-tour-overlay';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSignInPage = pathname === '/admin/signin';
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);

  const content = isSignInPage ? children : <AdminLayoutShell>{children}</AdminLayoutShell>;

  return (
    <SignInStateProvider>
      <AdminActionToastProvider>
        <ObTourProvider>
          {content}
          <TimeoutModal isOpen={showTimeoutModal} onClose={() => setShowTimeoutModal(false)} />
          <ObTourOverlay />
        </ObTourProvider>
      </AdminActionToastProvider>
    </SignInStateProvider>
  );
}
