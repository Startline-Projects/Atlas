/**
 * Signed-in candidate surface layout. Server Component.
 *
 * Focused single-column funnel layout: light sticky topbar + centered
 * content on cream. No sidebar — the candidate surface is a guided
 * path (dashboard → English test → result → retake), not a console.
 *
 * Auth guard: every route under this layout needs a live candidate session.
 * `src/proxy.ts` already turned away requests with no cookie at all; this is
 * where a cookie that exists but no longer resolves (expired token, suspended
 * account) is caught and sent back to sign-in with a `?next=`.
 */
import { redirect } from "next/navigation";

import { CandidateTopbar } from "@/components/candidate/shell/candidate-topbar";
import {
  candidateSignInPath,
  currentRequestPath,
  getCandidateSession,
} from "@/lib/auth";

export default async function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCandidateSession();
  if (!session) {
    redirect(candidateSignInPath(await currentRequestPath()));
  }

  return (
    <div className="bg-cream min-h-screen">
      <CandidateTopbar session={session} />
      <main className="mx-auto max-w-[1060px] px-6 py-10 sm:px-8">
        {children}
      </main>
    </div>
  );
}
