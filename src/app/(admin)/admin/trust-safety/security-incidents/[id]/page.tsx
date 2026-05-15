import { notFound } from 'next/navigation';
import { INCIDENT_PROFILES } from '@/lib/mock-data/admin/incidents-data';
import { IncidentDetailShell } from '@/components/admin/trust-safety/incidents/incident-detail-shell';

export async function generateStaticParams() {
  return Object.keys(INCIDENT_PROFILES).map((id) => ({ id }));
}

interface IncidentDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: IncidentDetailPageProps) {
  const { id } = await params;
  const profile = INCIDENT_PROFILES[id];
  if (!profile) return { title: 'Incident not found – Atlas' };
  return {
    title: `${profile.atlasId} — ${profile.title} – Atlas`,
    description: `Security incident ${profile.atlasId} · ${profile.severity} · ${profile.statusLabel}`,
  };
}

export default async function IncidentDetailPage({ params }: IncidentDetailPageProps) {
  const { id } = await params;
  const profile = INCIDENT_PROFILES[id];
  if (!profile) notFound();
  return <IncidentDetailShell incident={profile} />;
}
