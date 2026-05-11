import { notFound } from 'next/navigation';
import { DISPUTE_PROFILES } from '@/lib/mock-data/admin/dispute-profiles-data';
import { DisputeDetailShell } from '@/components/admin/operations/disputes/dispute-detail-shell';

export async function generateStaticParams() {
  return Object.keys(DISPUTE_PROFILES).map((id) => ({ id }));
}

interface DisputeDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: DisputeDetailPageProps) {
  const { id } = await params;
  const profile = DISPUTE_PROFILES[id];
  if (!profile) return { title: 'Dispute not found - Atlas' };
  return {
    title: `${profile.atlasId} — ${profile.claimant.name} vs. ${profile.respondent.name} - Atlas`,
    description: `Dispute ${profile.atlasId} · ${profile.status} · ${profile.statusPillText}`,
  };
}

export default async function DisputeDetailPage({ params }: DisputeDetailPageProps) {
  const { id } = await params;
  const profile = DISPUTE_PROFILES[id];
  if (!profile) notFound();
  return <DisputeDetailShell dispute={profile} />;
}
