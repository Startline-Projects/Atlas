'use client';

import { SignInStateProvider } from '@/lib/admin/signin-state-context';

/** Client providers for the admin sign-in page (design-preview state). */
export function AdminAuthProviders({ children }: { children: React.ReactNode }) {
  return <SignInStateProvider>{children}</SignInStateProvider>;
}
