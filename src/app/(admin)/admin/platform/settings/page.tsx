import { PsShell } from '@/components/admin/platform/settings/ps-shell';
import { psPageData } from '@/lib/mock-data/admin/platform-settings-data';

export const metadata = {
  title: 'Platform settings',
};

export default function PlatformSettingsPage() {
  return <PsShell data={psPageData} />;
}
