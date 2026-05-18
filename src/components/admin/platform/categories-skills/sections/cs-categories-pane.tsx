/* admin.html lines 60559-61005: Categories pane with .cs-cat-grid + 10 cards + add-new */

import { CsCatCard } from '../cs-cat-card';
import { CsCatAddCard } from '../cs-cat-add-card';
import type { CsCategoryCard, CsAddCategoryCard } from '@/lib/mock-data/admin/categories-skills-data';

interface CsCategoriesPaneProps {
  categories: CsCategoryCard[];
  addCard: CsAddCategoryCard;
}

export function CsCategoriesPane({ categories, addCard }: CsCategoriesPaneProps) {
  return (
    <div className="grid grid-cols-2 gap-[14px] max-[980px]:grid-cols-1">
      {categories.map((card) => (
        <CsCatCard key={card.id} card={card} />
      ))}
      <CsCatAddCard card={addCard} />
    </div>
  );
}
