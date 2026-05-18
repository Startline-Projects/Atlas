/**
 * PcCategoriesGrid — 10-card responsive grid.
 *
 * 1 col mobile · 2 cols tablet · 3 cols lg · 4 cols xl.
 *
 * The orchestrator passes `focusedCategoryId` + `registerCardRef`
 * so the deep-link from `?focus=` can scroll-and-ring the matching
 * card. Each card forwards its DOM ref via `registerCardRef`.
 *
 * Server-renderable wrapper (no state). Cards themselves are
 * Client because they trigger action modals.
 */

import { type PoolCategory } from "@/lib/mock-data/manager/manager-pool-coordination-data";
import { PcCategoryCard } from "./pc-category-card";

type PcCategoriesGridProps = {
  categories: ReadonlyArray<PoolCategory>;
  focusedCategoryId: string | null;
  registerCardRef: (id: string, el: HTMLElement | null) => void;
};

export function PcCategoriesGrid({
  categories,
  focusedCategoryId,
  registerCardRef,
}: PcCategoriesGridProps) {
  return (
    <section className="mb-8">
      <header className="mb-3 flex items-baseline justify-between gap-3">
        <h2
          className="font-display text-ink m-0 text-[18px] font-medium tracking-[-0.01em]"
          style={{ fontVariationSettings: '"opsz" 36' }}
        >
          Cross-category <em className="italic">overview</em>
        </h2>
        <span className="text-ink-mute text-[12px]">
          {categories.length} categories
        </span>
      </header>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((c) => (
          <PcCategoryCard
            key={c.id}
            category={c}
            isFocused={focusedCategoryId === c.id}
            registerRef={(el) => registerCardRef(c.id, el)}
          />
        ))}
      </div>
    </section>
  );
}
