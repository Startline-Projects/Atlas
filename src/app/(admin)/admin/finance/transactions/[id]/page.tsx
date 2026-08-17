import { notFound } from 'next/navigation';
import {
  TRANSACTIONS_DETAIL_IDS,
  TRANSACTIONS_PROFILES,
  TRANSACTIONS_STUBS,
} from '@/lib/mock-data/admin/transactions-data';
import { TransactionsDetailShell } from '@/components/admin/finance/transactions/transactions-detail-shell';
import { TransactionsStub } from '@/components/admin/finance/transactions/transactions-stub';

export async function generateStaticParams() {
  return TRANSACTIONS_DETAIL_IDS.map((id) => ({ id }));
}

interface TransactionDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: TransactionDetailPageProps) {
  const { id } = await params;
  const profile = TRANSACTIONS_PROFILES[id];
  const stub = TRANSACTIONS_STUBS[id];
  const item = profile || stub;
  if (!item) return { title: 'Transaction not found – Atlas' };
  return {
    title: `${item.atlasId} — ${item.title} – Atlas`,
    description: `Transaction ${item.atlasId} · ${item.statusLabel}`,
  };
}

export default async function TransactionDetailPage({ params }: TransactionDetailPageProps) {
  const { id } = await params;

  const profile = TRANSACTIONS_PROFILES[id];
  if (profile) return <TransactionsDetailShell profile={profile} />;

  const stub = TRANSACTIONS_STUBS[id];
  if (stub) return <TransactionsStub stub={stub} />;

  notFound();
}
