import { notFound } from 'next/navigation';
import { MANAGER_PROFILES } from '@/lib/mock-data/admin/manager-profiles-data';
import { ManagerProfileShell } from '@/components/admin/users/managers/manager-profile-shell';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ManagerProfilePage({ params }: PageProps) {
  const { id } = await params;
  const profile = MANAGER_PROFILES[id];

  if (!profile) {
    notFound();
  }

  return <ManagerProfileShell profile={profile} />;
}
