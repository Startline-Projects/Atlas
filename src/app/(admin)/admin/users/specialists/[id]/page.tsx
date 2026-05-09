import { notFound } from 'next/navigation';
import { SPECIALIST_PROFILES } from '@/lib/mock-data/admin/specialist-profiles-data';
import { SpecialistProfileShell } from '@/components/admin/users/specialists/specialist-profile-shell';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SpecialistProfilePage({ params }: PageProps) {
  const { id } = await params;
  const profile = SPECIALIST_PROFILES[id];

  if (!profile) {
    notFound();
  }

  return <SpecialistProfileShell profile={profile} />;
}
