import { PsCategorySection } from '../ps-category-section';
import { PsSettingRow } from '../ps-setting-row';
import { psCommsSettings } from '@/lib/mock-data/admin/platform-settings-data';

export function PsCommsSection() {
  return (
    <PsCategorySection
      id="ps-section-comms"
      variant="comms"
      eyebrow="CATEGORY 03"
      title="Communications"
      meta="email · WhatsApp · notification settings · 4 settings"
    >
      {psCommsSettings.map((setting, idx) => (
        <PsSettingRow key={idx} setting={setting} />
      ))}
    </PsCategorySection>
  );
}
