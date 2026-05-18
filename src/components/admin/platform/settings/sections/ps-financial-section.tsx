import { PsCategorySection } from '../ps-category-section';
import { PsSettingRow } from '../ps-setting-row';
import { psFinancialSettings } from '@/lib/mock-data/admin/platform-settings-data';

export function PsFinancialSection() {
  return (
    <PsCategorySection
      id="ps-section-financial"
      variant="financial"
      eyebrow="CATEGORY 02"
      title="Financial"
      meta="fee structure · currency · payment processor configuration · 4 settings"
    >
      {psFinancialSettings.map((setting, idx) => (
        <PsSettingRow key={idx} setting={setting} />
      ))}
    </PsCategorySection>
  );
}
