import { DsrDetailShell } from '@/components/admin/compliance/data-subject-rights/detail/dsr-detail-shell';
import { DsrDetailStub } from '@/components/admin/compliance/data-subject-rights/detail/dsr-detail-stub';
import { dsrDetails, dsrRows } from '@/lib/mock-data/admin/data-subject-rights-data';

export function generateStaticParams() {
  return dsrRows.map((row) => ({ id: row.id }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const canonicalIds = ['DSR-2026-0089', 'DSR-2026-0088', 'DSR-2026-0087', 'DSR-2026-0086', 'DSR-2026-0085', 'DSR-2026-0084', 'DSR-2026-0083', 'DSR-2026-0082', 'DSR-2026-0081'];
  const detail = dsrDetails[id] ?? (canonicalIds.includes(id) ? dsrDetails['DSR-2026-0089'] : undefined);
  if (!detail) return <DsrDetailStub id={id} />;
  return <DsrDetailShell detail={detail} />;
}
