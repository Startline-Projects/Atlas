'use client';

import { SignInStateProvider } from '@/lib/admin/signin-state-context';

export default function AdminAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <SignInStateProvider>
      {children}
    </SignInStateProvider>
  );
}
