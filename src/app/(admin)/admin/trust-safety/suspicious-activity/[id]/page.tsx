import { notFound } from 'next/navigation';
import {
  SUSPICIOUS_ACTIVITY_DETAIL_IDS,
  SUSPICIOUS_ACTIVITY_PROFILES,
  SUSPICIOUS_ACTIVITY_STUBS,
} from '@/lib/mock-data/admin/suspicious-activity-data';
import { SuspiciousActivityDetailShell } from '@/components/admin/trust-safety/suspicious-activity/suspicious-activity-detail-shell';
import { SuspiciousActivityStub } from '@/components/admin/trust-safety/suspicious-activity/suspicious-activity-stub';

export async function generateStaticParams() {
  return SUSPICIOUS_ACTIVITY_DETAIL_IDS.map((id) => ({ id }));
}

interface SuspiciousActivityDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: SuspiciousActivityDetailPageProps) {
  const { id } = await params;
  const profile = SUSPICIOUS_ACTIVITY_PROFILES[id];
  const stub = SUSPICIOUS_ACTIVITY_STUBS[id];
  const item = profile || stub;
  if (!item) return { title: 'Event not found – Atlas' };
  return {
    title: `${item.atlasId} — ${item.title} – Atlas`,
    description: `Suspicious activity ${item.atlasId} · ${item.typeLabel} · ${item.strengthLabel}`,
  };
}

export default async function SuspiciousActivityDetailPage({ params }: SuspiciousActivityDetailPageProps) {
  const { id } = await params;

  // All 9 canonical IDs now have full profiles — render canonical detail.
  const profile = SUSPICIOUS_ACTIVITY_PROFILES[id];
  if (profile) return <SuspiciousActivityDetailShell profile={profile} />;

  // Fallback stub kept for any ID that may not have a full profile yet.
  const stub = SUSPICIOUS_ACTIVITY_STUBS[id];
  if (stub) return <SuspiciousActivityStub stub={stub} />;

  notFound();
}
