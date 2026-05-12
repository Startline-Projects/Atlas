/**
 * Phase 16a — Incident detail rail.
 *
 * admin.html: L41178-41343
 *
 * Tracker IMPORTED directly from Phase 15 (handles variable step count).
 * QuickStats cloned w/ per-row valueColor variant.
 * SecurityTeamCard rendered as stub (Phase 16c fills).
 */
import type { IncidentProfile } from '@/lib/mock-data/admin/incidents-data';
import { FraudInvestigationTracker } from '@/components/admin/trust-safety/fraud-abuse/fraud-investigation-tracker';
import { IncidentQuickStats } from './incident-quickstats';
import { IncidentSecurityTeamCard } from './incident-security-team-card';

interface IncidentRailProps {
  incident: IncidentProfile;
}

export function IncidentRail({ incident }: IncidentRailProps) {
  return (
    <aside className="sticky top-[80px] flex flex-col gap-[14px] max-[1100px]:static max-[1100px]:order-[-1]">
      <FraudInvestigationTracker
        steps={incident.trackerSteps}
        progress={incident.trackerProgress}
        title="Response progress"
      />
      <IncidentQuickStats stats={incident.quickStats} />
      <IncidentSecurityTeamCard />
    </aside>
  );
}
