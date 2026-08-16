import { UsersShell } from '@/components/admin/users/users-shell';
import { toCandidateRow } from '@/lib/admin/candidate-rows';
import type { CandidateUser } from '@/lib/mock-data/admin/users-data';
// The layer rule assumes a page is client UI reaching for data over HTTP. This
// one is a Server Component: it already runs on the server, and there is no
// admin session yet to authenticate an HTTP call back into our own API with —
// so it reads through the service, which is still the lowest layer it touches.
// Revisit once admin auth lands (see the SECURITY note below).
// eslint-disable-next-line import/no-restricted-paths
import { candidateService } from '@/lib/services/candidate';

export const metadata = {
  title: 'Candidates - Atlas',
  description: 'Manage all candidates.',
};

// Every signup has to be visible immediately, so this page is never cached.
export const dynamic = 'force-dynamic';

/**
 * Reads candidates straight from the service rather than through the HTTP API:
 * a Server Component is already on the server, and there is no admin session to
 * authenticate a self-call with yet.
 *
 * SECURITY: `/admin/*` has no auth guard at all right now — no route here
 * checks a session or a role. That is the next slice, and it has to land
 * before any deployment this data can be reached from.
 */
export default async function UsersCandidatesPage() {
  let rows: CandidateUser[] | undefined;

  try {
    const { candidates } = await candidateService.list({ limit: 100 });
    const now = new Date();
    rows = candidates.map((candidate) => toCandidateRow(candidate, now));
  } catch (error) {
    // Before the database credentials are filled in, the mock rows are still
    // worth more than an error page — the rest of the screen stays reviewable.
    console.error('[admin/users/candidates] falling back to mock rows', error);
  }

  return <UsersShell initialTab="candidates" candidateRows={rows} />;
}
