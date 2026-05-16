import { RsJurisdictionCardComponent } from '../rs-jurisdiction-card';
import type { RsJurisdictionCard } from '@/lib/mock-data/admin/regulatory-submissions-data';

interface RsJurisdictionPaneProps {
  cards: RsJurisdictionCard[];
}

export function RsJurisdictionPane({ cards }: RsJurisdictionPaneProps) {
  return (
    <div data-rs-view-pane="jurisdiction">
      {cards.map((card) => (
        <RsJurisdictionCardComponent key={card.id} card={card} />
      ))}
    </div>
  );
}
