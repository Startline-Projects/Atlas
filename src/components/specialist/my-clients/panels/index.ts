/**
 * Barrel for my-clients inline-panel components.
 *
 * Consumed by `client-sheet-content.tsx` for the panel-mode branch and
 * by `my-clients-app.tsx` for the InviteClientFormModal mount point.
 * `SheetPanelShell` is the chrome shared across all 5 inline panels.
 */
export { SheetPanelShell } from "./sheet-panel-shell";
export { ContractsPanel } from "./contracts-panel";
export { BriefsPanel } from "./briefs-panel";
export type { ComposeBriefPayload } from "./briefs-panel";
export { TalentMatchPanel } from "./talent-match-panel";
export { PausePanel } from "./pause-panel";
export type { PausePayload } from "./pause-panel";
export { TagsPanel } from "./tags-panel";
export { InviteClientFormModal } from "./invite-client-form-modal";
export type { InvitePayload } from "./invite-client-form-modal";
