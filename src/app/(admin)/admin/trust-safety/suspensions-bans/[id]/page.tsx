import { notFound } from 'next/navigation';
import {
  SUSPENSIONS_BANS_DETAIL_IDS,
  SUSPENSIONS_BANS_PROFILES,
  SUSPENSIONS_BANS_STUBS,
} from '@/lib/mock-data/admin/suspensions-bans-data';
import { SuspensionsBansDetailShell } from '@/components/admin/trust-safety/suspensions-bans/suspensions-bans-detail-shell';
import { SuspensionsBansStub } from '@/components/admin/trust-safety/suspensions-bans/suspensions-bans-stub';

export async function generateStaticParams() {
  return SUSPENSIONS_BANS_DETAIL_IDS.map((id) => ({ id }));
}

interface SuspensionsBansDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: SuspensionsBansDetailPageProps) {
  const { id } = await params;
  const profile = SUSPENSIONS_BANS_PROFILES[id];
  const stub = SUSPENSIONS_BANS_STUBS[id];
  const item = profile || stub;
  if (!item) return { title: 'Sanction not found – Atlas' };
  return {
    title: `${item.atlasId} — ${item.title} – Atlas`,
    description: `Suspension/ban ${item.atlasId} · ${item.statusLabel}`,
  };
}

export default async function SuspensionsBansDetailPage({ params }: SuspensionsBansDetailPageProps) {
  const { id } = await params;

  const profile = SUSPENSIONS_BANS_PROFILES[id];
  if (profile) return <SuspensionsBansDetailShell profile={profile} />;

  const stub = SUSPENSIONS_BANS_STUBS[id];
  if (stub) return <SuspensionsBansStub stub={stub} />;

  notFound();
}
