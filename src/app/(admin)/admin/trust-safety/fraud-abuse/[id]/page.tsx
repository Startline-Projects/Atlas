import { notFound } from 'next/navigation';
import { FRAUD_ALERT_PROFILES } from '@/lib/mock-data/admin/fraud-alerts-data';
import { FraudDetailShell } from '@/components/admin/trust-safety/fraud-abuse/fraud-detail-shell';

export async function generateStaticParams() {
  return Object.keys(FRAUD_ALERT_PROFILES).map((id) => ({ id }));
}

interface FraudDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: FraudDetailPageProps) {
  const { id } = await params;
  const profile = FRAUD_ALERT_PROFILES[id];
  if (!profile) return { title: 'Alert not found – Atlas' };
  return {
    title: `${profile.atlasId} — ${profile.title} – Atlas`,
    description: `Fraud alert ${profile.atlasId} · ${profile.severity} · ${profile.statusLabel}`,
  };
}

export default async function FraudDetailPage({ params }: FraudDetailPageProps) {
  const { id } = await params;
  const profile = FRAUD_ALERT_PROFILES[id];
  if (!profile) notFound();
  return <FraudDetailShell alert={profile} />;
}
