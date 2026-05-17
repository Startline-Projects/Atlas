# Manager Interface Conversion Log

Decisions and progress tracking for converting the Atlas Manager-of-Talent-Specialists Interface from `reference/manager.html` + `reference/scope-pdfs/Atlas_Talent_Specialist_Manager_Additions_Scope (2).md` into the existing Next.js codebase.

The Manager is the only Atlas user who is simultaneously a Talent Specialist (with a personal caseload) AND oversees the team of Specialists. The interface reflects this duality via a mode toggle that swaps content in place rather than navigating to a separate role surface. See `docs/adr/0001-manager-as-specialist-extension.md` for the architectural rationale.

---

## Session 1 — Manager Interface: Steps 1-14

**Source:** `reference/manager.html` (43,305 lines, 28 unique views).
**Spec:** `reference/scope-pdfs/Atlas_Talent_Specialist_Manager_Additions_Scope (2).md` (873 lines, 14-step functional spec).
**Branch:** `manager-conversion`, forked from `main` at commit `dc14daa`.
**Architecture:** Path C — Manager as in-place extension of the `(specialist)` surface (ADR 0001). Manager-extension files MAY edit existing Specialist files when the edit adds mode-awareness; refactors banned.

### Step roadmap

| Step | Title | Status |
|---|---|---|
| 1   | Mode plumbing + ModeToggle on dashboard | ✅ done |
| 1.5 | Post-auth Manager redirect (deferred mini-step) | ⏸ not started |
| 2   | Sidebar TEAM MANAGEMENT section (mode-aware) | ❌ not started |
| 3   | Manager dashboard content swap (urgent / snapshot / active items / rail) | ❌ not started |
| 4   | My Team — 11-specialist grid | ❌ not started |
| 5   | Specialist Detail — 7-tab layout + 30-day calendar + coaching | ❌ not started |
| 6   | Daily Activity Audit — submission overview + audit rows + timing | ❌ not started |
| 7   | Team Disputes — list + filters + Sofia × Quill canonical case | ❌ not started |
| 8   | Pool Coordination — 10-category grid + opportunities + sprint priorities | ❌ not started |
| 9   | Recruitment Sprints — goal banner + 4 active sprints + analytics + history | ❌ not started |
| 10  | Team Reports — overview + 5-tab comparisons + 11×14 heatmap + hire success | ❌ not started |
| 11  | Manager Daily Activity — submission form + stepper + lock-on-submit + 14-day calendar | ❌ not started |
| 12  | Notifications enhancement — context tags + filter + smart routing + full page | ❌ not started |
| 13  | Messages + Specialist Chat — type tags + filter + peer chat composer + coaching notes | ❌ not started |
| 14  | Help — Manager resources section (mode-aware) | ❌ not started |

### Locked decisions (Session 1)

| | |
|---|---|
| **Architecture** | Path C — extension of `(specialist)` surface; no new route group. ADR 0001. |
| **Mode persistence** | `localStorage["atlas:managerMode"]`. Default = `"manager"` on first paint. Falls back gracefully if localStorage unavailable. |
| **Mode toggle visibility** | Only on the dashboard page (per scope MD §1). Hidden on every other route; mode persists across navigation via context + localStorage. |
| **Role gate** | `useSessionRole()` mocked to `"manager"` for Session 1. Real auth-backed implementation deferred. All Manager-extension UI is conditional on the role being `"manager"` so non-Manager Specialist users see ZERO behavior change. |
| **Single signin** | `/specialist/signin` serves Managers too. Post-auth, Managers land on `/specialist/dashboard` (no `/manager/dashboard` exists). Step 1.5 will mock the role check + the redirect (which becomes a no-op under Path C since the URL is the same — but documenting the contract anyway). |
| **Identity** | Canonical Manager = Mateo Vargas, `mgr-001-v8b2c4`. Prototype's "Miguel Ramos" is an HTML placeholder; all Manager UI reads from `currentManager` in `lib/mock-data/manager/manager-identity.ts`. |
| **Specialist ID prefix** | `spec-{first-name-kebab}` (e.g. `spec-lucas-andersen`). Locked Step 1. |
| **Mock data location** | `src/lib/mock-data/manager/`. Components: `src/components/manager/`. Client contexts: `src/lib/manager/`. |
| **Hand-rolled primitives** | No shadcn install for this initiative. Continues the convention established by Specialist + Admin surfaces. |
| **Toast consolidation** | Prototype's `daToast` / `pcToast` / `trToast` / `mdaToast` all collapse to `useQueuedFlash` (existing Specialist hook). |
| **Testing** | Manual verification only. No Vitest / Playwright setup. |

### Prototype JS plumbing — what collapses under Path C

The HTML prototype implements mode plumbing via ~600 lines of JS:

- `localStorage` mode store (`MODE_STORAGE_KEY`)
- `document.body.setAttribute('data-mode', mode)` driving 29 CSS `data-mode-show/only/hide` swap-points
- An `atlas:modechange` CustomEvent for cross-component coordination
- 222 inline `data-route="..."` attributes paired with a click delegate that hides all `.view` divs and unhides the target
- A `setMode()` helper that mirrors mode into URL hash (`#dashboard` vs `#dashboard-manager`) via `history.replaceState`
- A `loadInitialMode()` that reads from localStorage with default fallback
- An `aria-live="polite"` announce region whose `textContent` is rewritten on every mode change

Under Path C nearly all of this collapses:

- The mode store becomes a React Context (`ManagerModeProvider`) wrapping `(specialist)/layout.tsx`. Same localStorage key, same default, same graceful-fallback semantics. ~80 lines of TypeScript replace ~80 lines of prototype JS plus a chunk of CSS attribute selectors.
- The 222 `data-route` attributes become Next.js `<Link>` components and `router.push()` calls — already the Atlas convention.
- The `body[data-mode]` CSS attribute selector pattern (29 swap-points) becomes React conditional rendering inside the specific components that mode-fork (sidebar's TEAM MANAGEMENT section, dashboard sections, notification dropdown filters). Each fork is local; no global CSS swap needed.
- The `atlas:modechange` CustomEvent disappears — React Context propagates state changes natively.
- The URL hash mirror (`#dashboard-manager`) disappears. Under Path C, the URL stays `/specialist/dashboard` regardless of mode. Scope MD §1 explicitly allows "query param — implementer's choice"; we choose neither because mode is not a URL concept here.

Net: the prototype's JS-heavy mode plumbing becomes ~80 lines of React state + a handful of `useManagerMode()` reads at the swap points across the codebase.

### Deliberate omission — `aria-live` announce region

The prototype includes an `aria-live="polite"` region whose `textContent` is rewritten to "Switched to Manager view" / "Switched to Specialist view" on every toggle click. We do NOT port this for two reasons:

1. The toggle itself is `role="tablist"` with `aria-selected` per `role="tab"`. Screen readers announce tab activation changes natively from these attributes; an additional live region is redundant.
2. Under Path C the toggle is not a navigation primitive — it's an in-page content swap. There's no Next.js route change to announce; the dashboard content updates in place. The live region's value-add was masking the SPA's hash-based "navigation" feeling jumpy in screen reader output. We don't have that jump.

If keyboard-only QA reports the toggle's mode change being inaudible, revisit and add a polite live region in `ManagerModeProvider`. Until then, this omission stays.

### Step 1 — Mode plumbing + ModeToggle on dashboard

**Goal:** Wire `ManagerModeProvider` into the Specialist layout; mount a `ModeToggle` segmented control on the dashboard; verify the toggle persists state to localStorage and reflects the persisted mode on direct URL entry. No content forks yet — those land in Step 3.

**Files added (8):**

| File | Purpose |
|---|---|
| `src/lib/manager/manager-mode-context.tsx` | Client Component context + `useManagerMode()` hook + localStorage persistence (key `atlas:managerMode`) + graceful fallback |
| `src/lib/manager/use-session-role.ts` | Mocked role hook — hardcoded `"manager"` for Step 1 |
| `src/components/manager/shell/mode-toggle.tsx` | Segmented control. Role-gated (renders null for non-Managers). Keyboard accessible (Arrow/Home/End). Lime accent on active Manager segment per scope MD §1 |
| `src/lib/mock-data/manager/index.ts` | Barrel re-exports |
| `src/lib/mock-data/manager/manager-identity.ts` | Canonical Mateo Vargas record + `ManagerIdentity` type |
| `src/lib/mock-data/manager/team.ts` | Specialist type defs (`Specialist`, `SpecialistRole`, `SpecialistStatus`, `SpecialistCohort`) + 1 stub record (Lucas Andersen, referenced by prototype's notifications/messages). Full 11-roster lands in Step 4 |
| `docs/manager/CONVERSION_LOG.md` | This file (initial entry) |
| `docs/adr/0001-manager-as-specialist-extension.md` | ADR for Path C choice + alternatives + reversibility |

**Files modified (2 Specialist files; surgical, additive):**

| File | Diff shape |
|---|---|
| `src/app/(specialist)/layout.tsx` | +1 import, wrap `{children}` in `<ManagerModeProvider>`. Layout stays Server Component; provider is Client Component (RSC can render CC children). |
| `src/app/(specialist)/specialist/dashboard/page.tsx` | +1 import, mount `<ModeToggle />` as first child of the inner column, above `<DashboardHeader />`. Page stays Server Component; ModeToggle is CC. ModeToggle's role gate ensures non-Managers see no change. |

**Visual treatment locked (ModeToggle):**

- Container: `bg-cream-deep border-line rounded-lg p-1 inline-flex gap-1`
- Segments: `px-4 py-3 text-[13px] font-medium rounded-md` (~42px tall — exceeds the 40px AA touch target per scope MD §1)
- Active: `bg-ink text-paper`
- Inactive: `text-ink-mute hover:text-ink`
- **Lime accent on active Manager segment** — a 6px lime dot LEFT of the "Manager View" label (locks lime as the Manager color)
- Temporary `Current mode: ...` label in ink-mute mono right of the toggle for Step 1 visibility. Removed in Step 3 when real dashboard content forks make the mode obvious.

**Known friction (documented for future review):**

- **Hydration flash:** Server renders with `DEFAULT_MODE = "manager"`. If the user's saved localStorage mode is `"specialist"`, a brief flash flips the active segment after mount. Acceptable for Step 1's tiny toggle UI; revisit if/when Step 3's dashboard content fork makes the flash visually obvious.
- **Empty-mode-swap feedback:** In Step 1, toggling on the dashboard changes only the active segment + the "Current mode" indicator. Real dashboard content fork lands in Step 3. Until then, toggling feels like a near-no-op. Acceptable — Step 1 is plumbing, Step 3 is payoff.
- **Cross-route mode indicator:** Once the Manager navigates away from `/specialist/dashboard` (e.g. to `/specialist/review-queue`), the toggle disappears (correctly — per scope MD §1). The mode persists in localStorage but there's no on-screen indicator outside the dashboard until Step 2 mounts the TEAM MANAGEMENT sidebar section (which appears/disappears with mode and serves as the persistent visual cue). Minor friction during the Step 1 → Step 2 gap.

**Step 1 verification (a-l):**

| | | |
|---|---|---|
| (a) | `/specialist/dashboard` renders | ✓ |
| (b) | ModeToggle visible at top of inner column | ✓ |
| (c) | Initial state = "Manager" on first load (default) | ✓ |
| (d) | localStorage key `atlas:managerMode` set on first interaction | ✓ |
| (e) | Click "Specialist" → active segment + state + localStorage all flip | ✓ |
| (f) | Keyboard (ArrowLeft/Right/Home/End) navigation works | ✓ |
| (g) | Page refresh persists mode | ✓ |
| (h) | Navigate to `/specialist/review-queue` and back → mode persists | ✓ |
| (i) | Direct URL entry / refresh → active segment reflects current mode (NOT just after click) | ✓ |
| (j) | `pnpm typecheck`, `pnpm lint`, `pnpm build` all clean | ✓ |
| (k) | Every other Specialist route renders unchanged | ✓ |
| (l) | Temporarily flipped `useSessionRole()` return value to `"specialist"` → ModeToggle renders `null` (verified via build + code inspection); reverted to `"manager"` before commit | ✓ |

### Cross-session ID locks (Session 1)

- `mgr-001-v8b2c4` — Mateo Vargas (canonical Manager; matches `docs/admin/CONVERSION_LOG.md` Step 8 precedent)
- `spec-lucas-andersen` — Step 1 stub Specialist; remaining 10 IDs land in Step 4

### Up next

- Step 1.5 — Post-auth Manager redirect (small mock change). Under Path C this is documentation-only because Managers and Specialists already land on `/specialist/dashboard`; the "redirect" becomes a defaults contract rather than a route change.
- Step 2 — Sidebar TEAM MANAGEMENT section (mode-aware conditional render inside the existing Specialist sidebar).

---
