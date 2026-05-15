import { notFound } from 'next/navigation';
import { CLIENT_PROFILES } from '@/lib/mock-data/admin/client-profiles-data';
import { ClientProfileShell } from '@/components/admin/users/clients/client-profile-shell';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ClientProfilePage({ params }: PageProps) {
  const { id } = await params;
  const profile = CLIENT_PROFILES[id];

  if (!profile) {
    notFound();
  }

  return <ClientProfileShell profile={profile} />;
}
