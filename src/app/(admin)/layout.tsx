'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { SignInStateProvider } from '@/lib/admin/signin-state-context';
import { AdminLayoutShell } from '@/components/admin/shell/admin-layout-shell';
import { AdminPreviewPanel } from '@/components/admin/shell/admin-preview-panel';
import { TimeoutModal } from '@/components/admin/auth/timeout-modal';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSignInPage = pathname === '/admin/signin';
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);

  const content = isSignInPage ? children : <AdminLayoutShell>{children}</AdminLayoutShell>;

  return (
    <SignInStateProvider>
      <>
        {content}
        <AdminPreviewPanel onShowTimeoutModal={() => setShowTimeoutModal(true)} />
        <TimeoutModal isOpen={showTimeoutModal} onClose={() => setShowTimeoutModal(false)} />
      </>
    </SignInStateProvider>
  );
}
