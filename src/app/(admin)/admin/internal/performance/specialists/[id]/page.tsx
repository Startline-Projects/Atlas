import {
  findPfSpecialistById,
  buildPfProfileFromRow,
  pfSpecialistTable,
} from '@/lib/mock-data/admin/performance-data';
import { PfProfileShell } from '@/components/admin/internal/performance/profile/pf-profile-shell';

export async function generateStaticParams() {
  return pfSpecialistTable.rows.map((row) => ({ id: row.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = findPfSpecialistById(id);
  return { title: `${row?.name ?? 'Specialist'} · Performance` };
}

export default async function SpecialistProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = findPfSpecialistById(id);

  if (!row) {
    return (
      <div className="max-w-[1320px] mx-auto pt-[22px] px-[32px] pb-[64px] max-[720px]:pt-[18px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
        <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[28px] px-[22px] text-center">
          <h2 className="font-display text-[17px] font-medium text-[var(--ink)] tracking-[-0.01em]">
            Specialist not found
          </h2>
        </div>
      </div>
    );
  }

  const profile = buildPfProfileFromRow(row);
  return <PfProfileShell profile={profile} />;
}
