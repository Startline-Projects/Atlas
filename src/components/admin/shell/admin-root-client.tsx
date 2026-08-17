'use client';

import { useState } from 'react';
import { SignInStateProvider } from '@/lib/admin/signin-state-context';
import { AdminLayoutShell } from '@/components/admin/shell/admin-layout-shell';
import { TimeoutModal } from '@/components/admin/auth/timeout-modal';
import type { AdminIdentity } from '@/components/admin/shell/admin-identity';

/**
 * Client half of the admin console layout: the shell chrome and the
 * session-timeout modal. Rendered by the (server)
 * `(admin)/layout.tsx` only after the admin session has been verified — the
 * identity it receives is the real signed-in admin.
 */
export function AdminRootClient({
  admin,
  children,
}: {
  admin: AdminIdentity;
  children: React.ReactNode;
}) {
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);

  return (
    <SignInStateProvider>
      <>
        <AdminLayoutShell admin={admin}>{children}</AdminLayoutShell>
        <TimeoutModal isOpen={showTimeoutModal} onClose={() => setShowTimeoutModal(false)} />
      </>
    </SignInStateProvider>
  );
}
