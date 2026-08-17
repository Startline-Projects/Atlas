import { notFound } from 'next/navigation';
import { JOB_PROFILES } from '@/lib/mock-data/admin/job-profiles-data';
import { JobDetailShell } from '@/components/admin/operations/jobs/job-detail-shell';

export async function generateStaticParams() {
  return Object.keys(JOB_PROFILES).map((id) => ({ id }));
}

interface JobDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: JobDetailPageProps) {
  const { id } = await params;
  const profile = JOB_PROFILES[id];
  if (!profile) return { title: 'Job not found - Atlas' };
  return {
    title: `${profile.title} — ${profile.client.name} - Atlas`,
    description: `Job posting ${profile.atlasId} · ${profile.status}`,
  };
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params;
  const profile = JOB_PROFILES[id];
  if (!profile) notFound();
  return <JobDetailShell job={profile} />;
}
