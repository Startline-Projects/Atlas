/**
 * Admin console layout. Server Component.
 *
 * Auth guard for everything under `/admin/*` except sign-in (which lives in
 * the `(admin-auth)` group). `src/proxy.ts` already turned away requests
 * with no admin cookie; this is where a cookie that exists but no longer
 * resolves — expired token, suspended admin, or a candidate token pasted
 * into the admin cookie — is caught and sent back to sign-in with `?next=`.
 *
 * The chrome itself is client-side (sidebar state, preview panel, timeout
 * modal) and lives in `AdminRootClient`; it receives the verified identity.
 */
import { redirect } from 'next/navigation';

import { AdminRootClient } from '@/components/admin/shell/admin-root-client';
import { adminSignInPath, currentRequestPath, getAdminSession } from '@/lib/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();
  if (!session) {
    redirect(adminSignInPath(await currentRequestPath()));
  }

  return (
    <AdminRootClient
      admin={{
        fullName: session.admin.fullName,
        email: session.admin.email,
        title: session.admin.title,
      }}
    >
      {children}
    </AdminRootClient>
  );
}
