# ADR 0001 — Manager as Specialist extension (not separate role surface)

**Status:** Accepted
**Date:** 2026-05-17
**Authors:** Manager-conversion working session
**Branch landed:** `manager-conversion`

## Context

`docs/FOLDER_STRUCTURE.md` §"Per-Role Surface Structure" establishes a canonical per-role layout:

```
src/app/
├── (role)/role/...
└── (role-auth)/role/...
```

Reference implementations already in the codebase: `(specialist)` + `(specialist-auth)`, `(admin)` + `(admin-auth)`. The doc states: **"No exceptions without an ADR."**

The Manager-of-Talent-Specialists surface — defined in `reference/manager.html` (43,305 lines, 28 unique views) plus `reference/scope-pdfs/Atlas_Talent_Specialist_Manager_Additions_Scope (2).md` (873 lines, 14-step functional spec) — introduces a Manager role whose product design fundamentally differs from the canonical per-role surface pattern.

## The product design (from scope MD §"Core principle")

> "The Manager is a Talent Specialist with extra responsibilities. They are not a different kind of user. The interface reflects this by being **the Talent Specialist interface plus a toggleable Management layer** — same shell, same login, same navigation patterns, with one additional dimension."

Key behavioral requirements from the scope MD:

| Requirement | Source |
|---|---|
| Single shell (same topbar, same sidebar, same auth) | §"Core principle" |
| Mode toggle performs **instant in-place swap** (no page reload) | §1 ("Click the inactive segment → instant content swap (no page reload)") |
| Mode persists across sessions via `localStorage` | §1 ("Mode persists across sessions (saved in localStorage or session storage)") |
| **Default mode = Manager** on first login | §1 ("Default state on first login: Manager Mode") |
| Toggle visible **only on dashboard view**; mode persists across navigation | §1 ("The toggle is only visible on the dashboard view — once the Manager navigates to a specific page, the toggle disappears from that page but the active mode persists") |
| TEAM MANAGEMENT sidebar section appears / disappears with mode | §2 |
| Notifications + messages **shared** across modes with smart routing | §3-4 ("Single unified notification stream" + "smart routing — clicking a Specialist-context notification in Manager Mode auto-switches to Specialist Mode and navigates") |

## Decision

Build Manager features as **in-place extensions of the existing `(specialist)` surface**. No new `(manager)` route group.

Concretely:

- All Manager-only pages live under `/specialist/team`, `/specialist/team-disputes`, `/specialist/pool-coordination`, etc. — same URL prefix as the rest of the surface.
- Mode is a client-side React Context (`ManagerModeProvider`) wrapping `(specialist)/layout.tsx`, persisting to `localStorage["atlas:managerMode"]`.
- `ModeToggle` mounts inside `/specialist/dashboard` only.
- Sidebar (existing Specialist file) gets one mode-aware conditional render block in Step 2.
- Notifications + Messages topbar panels (existing Specialist files) get mode-aware context tags + filters + smart-routing in Steps 12-13.
- Manager-specific data lives in `src/lib/mock-data/manager/`.
- Manager-specific components live in `src/components/manager/`.
- Manager-specific client contexts live in `src/lib/manager/`.
- Specialist files are edited **only where the edit adds mode-awareness** — no refactors.

## Alternatives considered

### A. Strict per-role surface (canonical FOLDER_STRUCTURE.md pattern)

`(manager)/manager/dashboard`, `(manager)/manager/team`, `(manager-auth)/manager/signin`. Manager-only routes in their own tree.

**Why rejected:** Cannot satisfy "same shell, same login, instant in-place swap, shared bell" from the scope MD. Two route groups would falsely split one user identity. The toggle would become navigation (router.push), breaking the instant-swap UX. Notifications would either duplicate per surface OR require cross-surface coordination that defeats the per-role-isolation the pattern exists to enforce.

### B. Hybrid (separate `(manager)` group + shared notifications via top-level routes)

Manager-only pages under `(manager)/manager/...`; notifications + messages at top-level `/notifications`, `/messages`. Mode toggle as nav between dashboards.

**Why rejected:** Still doesn't deliver instant-swap UX. Still splits the user identity. The shared notification routes break the per-role-isolation rule. Worst-of-both-worlds — keeps both pattern's complexities, delivers neither's benefits.

### C. Extension of `(specialist)` surface (chosen)

Trades the per-role-isolation guarantee for design fidelity to the scope MD. Justified by the scope MD's explicit framing of the Manager as "a Talent Specialist with extra responsibilities."

## Trade-offs accepted

- Specialist files are no longer strictly Specialist-only; some get touched by Manager-extension commits.
- A non-Manager Specialist user loads (but does not render) Manager-extension code paths. Mitigated by the `useSessionRole() === "manager"` role gate at every Manager-extension entry point.
- Future migration to a separate `(manager)` group (if scope changes) requires moving Manager-extension code OUT of Specialist files. Mechanical, not architectural — see "Reversibility" below.

## Constraints to preserve

- Edits to Specialist files MUST be additive — new code blocks only, no refactoring of existing logic.
- Edits MUST be conditional on `useSessionRole() === "manager"` so non-Manager Specialist users see ZERO behavior change.
- Manager-only pages live under `/specialist/...` URL prefix but their `page.tsx` Server Components MUST check `useSessionRole()` and `notFound()` for non-Managers. (Step 4+ concern; not yet relevant in Step 1.)
- The `ManagerModeProvider` MUST tolerate `localStorage` being unavailable (Safari private mode, embedded WebViews) by falling back to the default mode.
- Each Step's CONVERSION_LOG entry MUST list which Specialist files were edited and the diff shape.

## Reversibility

If product decisions move Managers to a separate user identity later:

1. Create `(manager)/manager/...` route group with its own layout (copy the Specialist layout structure).
2. Move `src/components/manager/**` to render under the new layout (file move, no logic change).
3. Move Manager-only pages from `/specialist/team/**` to `/manager/team/**` (route move + import-path updates).
4. Strip `useSessionRole() === "manager"` conditionals from Specialist files — the code blocks become dead code; delete them.
5. Drop `ManagerModeProvider` from the Specialist layout. Under the new architecture, mode = URL truth.

**Migration scope estimate:** ~30-40 file moves, ~10 file deletions, ~20 import-path updates. Mechanical, not a rewrite. Should take ~1 working day end-to-end.

## Status

Accepted as of Manager-conversion Session 1 / Step 1 (`manager-conversion` branch, commit forthcoming). Revisit if/when:

- The Manager scope MD materially changes
- Product decides Managers should be a separate user identity (e.g. dedicated admin-style backend, distinct billing model, etc.)
- The "purely additive for non-Managers" guarantee starts to leak (e.g. a Manager-extension edit accidentally affects Specialist behavior)
