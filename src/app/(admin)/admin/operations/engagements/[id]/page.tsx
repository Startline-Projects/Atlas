import { notFound } from 'next/navigation';
import { ENGAGEMENT_PROFILES } from '@/lib/mock-data/admin/engagement-profiles-data';
import { EngagementDetailShell } from '@/components/admin/operations/engagements/engagement-detail-shell';

export async function generateStaticParams() {
  return Object.keys(ENGAGEMENT_PROFILES).map((id) => ({ id }));
}

interface EngagementDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: EngagementDetailPageProps) {
  const { id } = await params;
  const profile = ENGAGEMENT_PROFILES[id];
  if (!profile) return { title: 'Engagement not found - Atlas' };
  return {
    title: `${profile.client.name} × ${profile.candidate.name} - Atlas`,
    description: `Engagement ${profile.atlasId} · ${profile.status}`,
  };
}

export default async function EngagementDetailPage({ params }: EngagementDetailPageProps) {
  const { id } = await params;
  const profile = ENGAGEMENT_PROFILES[id];
  if (!profile) notFound();
  return <EngagementDetailShell engagement={profile} />;
}
