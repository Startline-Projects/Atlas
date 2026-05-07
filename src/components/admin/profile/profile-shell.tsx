import ProfileHeader from '@/components/admin/profile/profile-header';
import PermissionsMatrix from '@/components/admin/profile/permissions-matrix';
import ActivityTimeline from '@/components/admin/profile/activity-timeline';
import AccountSettings from '@/components/admin/profile/account-settings';

export default function ProfileShell() {
  return (
    <main className="max-w-[1100px] mx-auto w-full pt-7 pr-8 pb-20 pl-8">
      <ProfileHeader />
      <PermissionsMatrix />
      <ActivityTimeline />
      <AccountSettings />
    </main>
  );
}
