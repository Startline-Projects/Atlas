import { tmEmailTemplates, tmVettingInviteDetail } from '@/lib/mock-data/admin/templates-data';
import { TmDetailShell } from '@/components/admin/platform/templates/detail/tm-detail-shell';

export async function generateStaticParams() {
  return tmEmailTemplates.map((t) => ({ id: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tpl = tmEmailTemplates.find((t) => t.id === id);
  return { title: `${tpl?.name ?? 'Template'} · Templates` };
}

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tpl = tmEmailTemplates.find((t) => t.id === id);

  if (id === 'tm-vetting-invite') {
    return <TmDetailShell detail={tmVettingInviteDetail} />;
  }

  return (
    <div className="max-w-[1320px] mx-auto pt-[22px] px-[32px] pb-[64px] max-[720px]:pt-[18px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[28px] px-[22px] text-center">
        <h2 className="font-display text-[17px] font-medium text-[var(--ink)] tracking-[-0.01em] mb-[6px]">
          {tpl?.name ?? 'Template'} · detail
        </h2>
        <p className="font-mono text-[11.5px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.6] max-w-[480px] mx-auto">
          Detail content available for Vetting call invite canonical only in admin.html. Other templates follow the same template editor pattern.
        </p>
      </div>
    </div>
  );
}
