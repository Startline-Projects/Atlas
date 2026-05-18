import { PsCategoryHead } from './ps-category-head';
import type { PsCategoryVariant } from '@/lib/mock-data/admin/platform-settings-data';

interface PsCategorySectionProps {
  id: string;
  variant: PsCategoryVariant;
  eyebrow: string;
  title: string;
  meta: string;
  children: React.ReactNode;
}

export function PsCategorySection({
  id,
  variant,
  eyebrow,
  title,
  meta,
  children,
}: PsCategorySectionProps) {
  return (
    <section
      id={id}
      className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] mb-[22px] overflow-hidden scroll-mt-[80px]"
    >
      <PsCategoryHead
        variant={variant}
        eyebrow={eyebrow}
        title={title}
        meta={meta}
      />
      {children}
    </section>
  );
}
