import { PoolHealthPage as PoolHealthDashboard } from "@/components/specialist/pool-health/pool-health-page";

/**
 * Pool-health view — strategic dashboard. Server-rendered; the only
 * Client island is the period-toggle in the header. No URL state.
 */
export default function PoolHealthPage() {
  return <PoolHealthDashboard />;
}
