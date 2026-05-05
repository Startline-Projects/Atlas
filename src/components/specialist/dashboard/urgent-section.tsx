import { urgentCards } from "@/lib/mock-data/specialist/dashboard-cards";
import { SectionHeader } from "./section-header";
import { UrgentCard } from "./urgent-card";

export function UrgentSection() {
  return (
    <section className="mb-9">
      <SectionHeader
        title="Needs your attention"
        meta={
          <>
            <span
              aria-hidden="true"
              className="bg-lime-deep inline-block h-1.5 w-1.5 animate-pulse rounded-full"
            />
            {urgentCards.length} open
          </>
        }
      />
      <div className="grid gap-3.5 md:grid-cols-[repeat(auto-fill,minmax(360px,1fr))]">
        {urgentCards.map((card) => (
          <UrgentCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
}
