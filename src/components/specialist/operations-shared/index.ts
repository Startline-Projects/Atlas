/**
 * Barrel for operations-shared components. Same discipline as
 * `queue-shared/`, `people-shared/`, `chat-shared/`: extract only when
 * ≥2 of the 4 operations views (sourcing / pool-health / disputes /
 * daily-activity) genuinely share the same shape.
 *
 * 5.3 ships `stat-card` (sourcing + daily-activity). 5.4 will ship
 * `period-toggle` (pool-health + daily-activity) and `heat-cell`
 * (pool-health + daily-activity).
 */

export { StatCard } from "./stat-card";
export type { StatCardProps, StatCardTrendTone } from "./stat-card";
export { PeriodToggle } from "./period-toggle";
export type { PeriodOption } from "./period-toggle";
export { HeatCell } from "./heat-cell";
export type { HeatDensity } from "./heat-cell";
