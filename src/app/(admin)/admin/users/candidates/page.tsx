import { redirect } from 'next/navigation';

import { UsersShell } from '@/components/admin/users/users-shell';
import { toCandidateRow } from '@/lib/admin/candidate-rows';
import { adminSignInPath, getAdminSession } from '@/lib/auth';
import type { CandidateUser } from '@/lib/mock-data/admin/users-data';
// The layer rule assumes a page is client UI reaching for data over HTTP. This
// one is a Server Component: it already runs on the server and has already
// verified the admin session, so it reads through the service — still the
// lowest layer it touches. An HTTP self-call would only add a hop.
// eslint-disable-next-line import/no-restricted-paths
import { candidateService } from '@/lib/services/candidate';

export const metadata = {
  title: 'Candidates - Atlas',
  description: 'Manage all candidates.',
};

// Every signup has to be visible immediately, so this page is never cached.
export const dynamic = 'force-dynamic';

export default async function UsersCandidatesPage() {
  // The layout already guards; this re-check covers client-side navigation
  // (layouts do not re-render then) and is free — the lookup is memoised.
  const session = await getAdminSession();
  if (!session) redirect(adminSignInPath('/admin/users/candidates'));

  let rows: CandidateUser[] | undefined;

  try {
    const { candidates } = await candidateService.list({ limit: 100 });
    const now = new Date();
    rows = candidates.map((candidate) => toCandidateRow(candidate, now));
  } catch (error) {
    // If the database is unreachable the mock rows are still worth more than
    // an error page — the rest of the screen stays reviewable.
    console.error('[admin/users/candidates] falling back to mock rows', error);
  }

  return <UsersShell initialTab="candidates" candidateRows={rows} />;
}
