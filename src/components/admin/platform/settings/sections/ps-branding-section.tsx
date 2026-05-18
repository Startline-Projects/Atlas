import { PsCategorySection } from '../ps-category-section';
import { PsSettingRow } from '../ps-setting-row';
import { psBrandingSettings } from '@/lib/mock-data/admin/platform-settings-data';

export function PsBrandingSection() {
  return (
    <PsCategorySection
      id="ps-section-branding"
      variant="branding"
      eyebrow="CATEGORY 04"
      title="Branding"
      meta="logo · colors · email branding · 4 settings"
    >
      {psBrandingSettings.map((setting, idx) => (
        <PsSettingRow key={idx} setting={setting} />
      ))}
    </PsCategorySection>
  );
}
