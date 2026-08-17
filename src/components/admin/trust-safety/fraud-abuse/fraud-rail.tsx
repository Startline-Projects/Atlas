/**
 * Phase 15a — Fraud alert right rail.
 *
 * admin.html CSS: .fr-rail (L15976-15979)
 * sticky top-80, flex-col gap-14, max-1100 static order-[-1].
 */
import type { FraudAlertProfile } from '@/lib/mock-data/admin/fraud-alerts-data';
import { FraudInvestigationTracker } from './fraud-investigation-tracker';
import { FraudQuickStats } from './fraud-quick-stats';

interface FraudRailProps {
  alert: FraudAlertProfile;
}

export function FraudRail({ alert }: FraudRailProps) {
  return (
    <aside className="sticky top-[80px] flex flex-col gap-[14px] max-[1100px]:static max-[1100px]:order-[-1]">
      <FraudInvestigationTracker
        steps={alert.investigationSteps}
        progress={alert.investigationProgress}
      />
      <FraudQuickStats stats={alert.quickStats} />
    </aside>
  );
}
