interface PrSectionProps {
  id: string;
  children: React.ReactNode;
}

export function PrSection({ id, children }: PrSectionProps) {
  return (
    <section id={id} className="mb-[28px]">
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
        {children}
      </div>
    </section>
  );
}
