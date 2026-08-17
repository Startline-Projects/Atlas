/**
 * Signed-in client surface layout. Server Component.
 *
 * Same focused single-column shape as the candidate surface: sticky light
 * topbar + centered content on cream. Auth guard: every route under this
 * layout needs a live client session. `src/proxy.ts` already turned away
 * requests with no cookie at all; a cookie that exists but no longer resolves
 * (expired token, suspended account) is caught here and sent back to sign-in
 * with a `?next=`.
 */
import { redirect } from "next/navigation";

import { ClientTopbar } from "@/components/client/shell/client-topbar";
import { clientSignInPath, currentRequestPath, getClientSession } from "@/lib/auth";

export default async function ClientLayout({ children }: { children: React.ReactNode }) {
  const session = await getClientSession();
  if (!session) {
    redirect(clientSignInPath(await currentRequestPath()));
  }

  return (
    <div className="bg-cream min-h-screen">
      <ClientTopbar session={session} />
      <main className="mx-auto max-w-[1060px] px-6 py-10 sm:px-8">{children}</main>
    </div>
  );
}
