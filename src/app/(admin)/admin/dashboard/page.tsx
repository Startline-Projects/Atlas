'use client';

import { useState } from 'react';
import { DashboardStateProvider } from '@/lib/admin/dashboard-state-context';
import { DashboardHeader } from '@/components/admin/dashboard/dashboard-header';
import { DashboardShell } from '@/components/admin/dashboard/dashboard-shell';
import { AlertsSection } from '@/components/admin/dashboard/alerts-section';
import { HealthSection } from '@/components/admin/dashboard/health-section';
import { FinancialSection } from '@/components/admin/dashboard/financial-section';
import { OpsPanel } from '@/components/admin/dashboard/ops-panel';
import { ActivityFeed } from '@/components/admin/dashboard/activity-feed';
import { DashboardRail } from '@/components/admin/dashboard/dashboard-rail';

function DashboardContent() {
  // Overlay state (local to this page, not in context)
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <DashboardShell
      header={<DashboardHeader />}
      alertsSection={<AlertsSection />}
      healthSection={<HealthSection />}
      financialSection={<FinancialSection />}
      operationsAndActivity={
        <div className="grid grid-cols-2 gap-6 max-[880px]:grid-cols-1">
          <OpsPanel />
          <ActivityFeed />
        </div>
      }
      rail={<DashboardRail />}
    />
  );
}

export default function DashboardPage() {
  return (
    <DashboardStateProvider>
      <DashboardContent />
    </DashboardStateProvider>
  );
}
