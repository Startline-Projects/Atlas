/* admin.html lines 65316-65355: 3 PM section cards (Impact / Root cause / Contributing factors[blameless]) */

import type { IcPostmortemData } from '@/lib/mock-data/admin/internal-incidents-data';
import { IcPmSectionCard } from './ic-pm-section';

interface IcPostmortemCardProps {
  data: IcPostmortemData;
}

export function IcPostmortemCard({ data }: IcPostmortemCardProps) {
  return (
    <div>
      {data.sections.map((section, idx) => (
        <IcPmSectionCard key={idx} section={section} />
      ))}
    </div>
  );
}
