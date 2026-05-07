import { notFound } from 'next/navigation';
import { CANDIDATE_PROFILES } from '@/lib/mock-data/admin/candidate-profiles-data';
import { CandidateProfileShell } from '@/components/admin/users/candidate-profile-shell';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CandidateProfilePage({ params }: PageProps) {
  const { id } = await params;
  const profile = CANDIDATE_PROFILES[id];

  if (!profile) {
    notFound();
  }

  return <CandidateProfileShell profile={profile} />;
}
