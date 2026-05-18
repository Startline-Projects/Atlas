import { PsCategorySection } from '../ps-category-section';
import { PsSettingRow } from '../ps-setting-row';
import { psOperationalSettings } from '@/lib/mock-data/admin/platform-settings-data';

export function PsOperationalSection() {
  return (
    <PsCategorySection
      id="ps-section-operational"
      variant="operational"
      eyebrow="CATEGORY 01"
      title="Operational"
      meta="vetting thresholds · match scoring · SLA targets · pool monitoring · 7 settings"
    >
      {psOperationalSettings.map((setting, idx) => (
        <PsSettingRow key={idx} setting={setting} />
      ))}
    </PsCategorySection>
  );
}
