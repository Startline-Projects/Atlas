import { notFound } from 'next/navigation';
import { REVIEW_PROFILES } from '@/lib/mock-data/admin/review-profiles-data';
import { ReviewDetailShell } from '@/components/admin/operations/reviews/review-detail-shell';

export async function generateStaticParams() {
  return Object.keys(REVIEW_PROFILES).map((id) => ({ id }));
}

interface ReviewDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ReviewDetailPageProps) {
  const { id } = await params;
  const profile = REVIEW_PROFILES[id];
  if (!profile) return { title: 'Review not found - Atlas' };
  return {
    title: `${profile.atlasId} — ${profile.reviewerHero.name} reviewing ${profile.revieweeHero.name} - Atlas`,
    description: `Review ${profile.atlasId} · ${profile.status} · ${profile.statusPillText} · ${profile.rating}★`,
  };
}

export default async function ReviewDetailPage({ params }: ReviewDetailPageProps) {
  const { id } = await params;
  const profile = REVIEW_PROFILES[id];
  if (!profile) notFound();
  return <ReviewDetailShell review={profile} />;
}
