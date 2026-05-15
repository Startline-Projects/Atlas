/**
 * Barrel — re-exports for the `clients-shared/` family.
 *
 * Components here are shared between:
 *   - `/specialist/my-clients` sheet (Layer A bodies — sheet panel
 *     wrappers in `my-clients/panels/` import these)
 *   - `/specialist/clients/[id]/...` dedicated pages (Session 9)
 *
 * See Session 9 Checkpoint 1 in `docs/CONVERSION_LOG.md` for the
 * Layer A / Layer B extraction pattern.
 */

export { ClientPageHeader } from "./client-page-header";
export {
  ClientSubNavTabs,
  type ClientSubNavCounts,
} from "./client-sub-nav-tabs";
export { ClientOverviewApp } from "./client-overview-app";
export {
  ContractsListBody,
  ContractsEmptyState,
} from "./contracts-list-body";
export { BriefsListBody } from "./briefs-list-body";
