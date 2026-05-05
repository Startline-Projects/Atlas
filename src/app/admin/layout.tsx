'use client';

import { useState } from 'react';
import { SignInStateProvider } from '@/lib/admin/signin-state-context';
import { AdminPreviewPanel } from '@/components/admin/admin-preview-panel';
import { TimeoutModal } from '@/components/admin/timeout-modal';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);

  return (
    <SignInStateProvider>
      <>
        {children}
        <AdminPreviewPanel onShowTimeoutModal={() => setShowTimeoutModal(true)} />
        <TimeoutModal isOpen={showTimeoutModal} onClose={() => setShowTimeoutModal(false)} />
      </>
    </SignInStateProvider>
  );
}
