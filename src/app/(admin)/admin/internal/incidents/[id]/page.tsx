import {
  icResolvedRows,
  icActiveCallout,
  icCanonicalDetail,
} from '@/lib/mock-data/admin/internal-incidents-data';
import { IcDetailShell } from '@/components/admin/internal/incidents/detail/ic-detail-shell';

export async function generateStaticParams() {
  const ids = [
    'inc-2026-058',
    ...icResolvedRows.map((r) => r.id),
  ];
  return ids.map((id) => ({ id }));
}

export default async function IncidentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (id === 'inc-2026-042') {
    return <IcDetailShell detail={icCanonicalDetail} />;
  }

  const row = icResolvedRows.find((r) => r.id === id);
  const isActive = id === 'inc-2026-058';
  const title = isActive ? icActiveCallout.title : row?.title ?? 'Incident';

  return (
    <div className="max-w-[1320px] mx-auto pt-[22px] px-[32px] pb-[64px] max-[720px]:pt-[18px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[28px] px-[22px] text-center">
        <h2 className="font-display text-[17px] font-medium text-[var(--ink)] tracking-[-0.01em] mb-[6px]">
          {title} · detail
        </h2>
        <p className="font-mono text-[11.5px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.6] max-w-[480px] mx-auto">
          Detail content available for INC-2026-042 canonical only in admin.html. Other incidents follow the same timeline + PM + action items pattern.
        </p>
      </div>
    </div>
  );
}
