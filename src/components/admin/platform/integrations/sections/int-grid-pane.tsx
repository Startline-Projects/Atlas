/* admin.html lines 61552-61945: .in-grid — 3-col responsive grid wrapping 10 cards + add-new */

import { IntCardComponent } from '../int-card';
import { IntAddCardComponent } from '../int-add-card';
import type { IntegrationCard, IntegrationAddCard } from '@/lib/mock-data/admin/integrations-data';

interface IntGridPaneProps {
  cards: IntegrationCard[];
  addCard: IntegrationAddCard;
}

export function IntGridPane({ cards, addCard }: IntGridPaneProps) {
  return (
    <div className="grid grid-cols-3 gap-[14px] max-[1180px]:grid-cols-2 max-[720px]:grid-cols-1">
      {cards.map((card) => (
        <IntCardComponent key={card.id} card={card} />
      ))}
      <IntAddCardComponent card={addCard} />
    </div>
  );
}
