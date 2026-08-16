/**
 * Admin sign-in layout. Server Component.
 *
 * An admin who already holds a *valid* console session is sent straight to
 * the dashboard. (The proxy cannot do this — it only sees that a cookie
 * exists, and a stale one would loop between here and the guarded layout.)
 */
import { redirect } from 'next/navigation';

import { AdminAuthProviders } from '@/components/admin/auth/admin-auth-providers';
import { ADMIN_HOME_PATH, getAdminSession } from '@/lib/auth';

export default async function AdminAuthLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();
  if (session) redirect(ADMIN_HOME_PATH);

  return <AdminAuthProviders>{children}</AdminAuthProviders>;
}
