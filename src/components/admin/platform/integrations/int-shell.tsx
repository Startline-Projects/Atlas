"use client";

/* Step 31 LIST shell — header + stats strip + category filter (client state) + integration grid */

import { useState, useMemo } from "react";
import { IntPageHeader } from "./int-page-header";
import { PrStatStrip } from "@/components/admin/compliance/privacy-reports/pr-stat-strip";
import { IntCategoryFilter } from "./int-category-filter";
import { IntGridPane } from "./sections/int-grid-pane";
import type { PrStat } from "@/lib/mock-data/admin/privacy-reports-data";
import type {
  IntegrationPageMeta,
  IntegrationHeaderAction,
  IntegrationCategoryFilter,
  IntegrationCard,
  IntegrationAddCard,
} from "@/lib/mock-data/admin/integrations-data";
import { intCardCategoryMap } from "@/lib/mock-data/admin/integrations-data";

interface IntShellProps {
  meta: IntegrationPageMeta;
  searchPlaceholder: string;
  actions: IntegrationHeaderAction[];
  topStats: PrStat[];
  categoryFilters: IntegrationCategoryFilter[];
  cards: IntegrationCard[];
  addCard: IntegrationAddCard;
}

export function IntShell({
  meta,
  searchPlaceholder,
  actions,
  topStats,
  categoryFilters,
  cards,
  addCard,
}: IntShellProps) {
  const initialActive = categoryFilters.find((c) => c.active)?.value ?? "all";
  const [active, setActive] = useState<string>(initialActive);

  const filteredCards = useMemo(() => {
    if (active === "all") return cards;
    return cards.filter((card) => intCardCategoryMap[card.id] === active);
  }, [cards, active]);

  return (
    <div className="mx-auto max-w-[1320px] px-[32px] pt-[22px] pb-[64px] max-[720px]:px-[18px] max-[720px]:pt-[18px] max-[720px]:pb-[48px]">
      <IntPageHeader
        title={meta.title}
        metaText={meta.metaText}
        restrictionLabel={meta.restrictionLabel}
        searchPlaceholder={searchPlaceholder}
        actions={actions}
      />

      <PrStatStrip stats={topStats} />

      <IntCategoryFilter
        chips={categoryFilters}
        active={active}
        onChange={setActive}
      />

      <IntGridPane cards={filteredCards} addCard={addCard} />
    </div>
  );
}
