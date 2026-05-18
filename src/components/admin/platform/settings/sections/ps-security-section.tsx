import { PsCategorySection } from '../ps-category-section';
import { PsSettingRow } from '../ps-setting-row';
import { psSecuritySettings } from '@/lib/mock-data/admin/platform-settings-data';

export function PsSecuritySection() {
  return (
    <PsCategorySection
      id="ps-section-security"
      variant="security"
      eyebrow="CATEGORY 05"
      title="Security"
      meta="2FA · session timeouts · password policy · lockout rules · 5 settings"
    >
      {psSecuritySettings.map((setting, idx) => (
        <PsSettingRow key={idx} setting={setting} />
      ))}
    </PsCategorySection>
  );
}
