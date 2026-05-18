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
| 1.5 | Post-auth Manager redirect | ⏸ deferred (see below — no commit) |
| 2   | Sidebar TEAM MANAGEMENT section (mode-aware) | ✅ done |
| 3   | Manager dashboard content swap (urgent / snapshot / active items / rail) | ✅ done |
| 4   | My Team — 11-specialist grid | ✅ done |
| 5   | Specialist Detail — 7-tab layout + coaching tab | ✅ done (calendar deferred to Step 11 per trim) |
| 6   | Daily Activity Audit — submission overview + audit rows + timing | ✅ done (channels section dropped per trim a) |
| 7   | Team Disputes — list + filters + Sofia × Quill canonical case | ✅ done (full scope — patterns section retained; canonical dispute domain locked) |
| 8   | Pool Coordination — 10-category grid + opportunities + sprint priorities | ✅ done (full scope; Step 6 log backfilled in same commit) |
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

- Step 1.5 — see deferral entry below.
- Step 2 — see Session 1 / Step 2 entry below.

---

### Step 1.5 — Post-auth Manager redirect (DEFERRED — no commit)

Under Path C this collapses to a defaults contract that's already satisfied:

- Both roles land on `/specialist/dashboard` after sign-in (the existing Specialist signin form's success behavior — no change needed)
- The role mock already returns `"manager"` (`src/lib/manager/use-session-role.ts`)
- The mode default is `"manager"` (`ManagerModeProvider` constant `DEFAULT_MODE`)

There is no Manager-specific redirect TARGET that differs from the Specialist default until real auth (Clerk per `docs/TECH_STACK.md` §2.5) provides session-time role data — at which point the contract becomes: "if `session.role === 'manager'`, set the initial `useManagerMode()` value to `'manager'`" (already the default for everyone).

**Decision: no Step 1.5 commit.** Re-evaluate when real auth lands. If/when that re-evaluation produces a change, it will land as an amendment to whichever Step's commit introduces real auth (likely outside the Manager-conversion branch entirely).

---

## Session 1 — Step 2 — Sidebar TEAM MANAGEMENT section (mode-aware)

**Goal:** Add the TEAM MANAGEMENT section to the existing Specialist Sidebar, mode-aware via `useSessionRole()` + `useManagerMode()`. Resolves the cross-route mode indicator friction from Step 1 (the section becomes the persistent on-screen cue once a Manager navigates off the dashboard, since `ModeToggle` is dashboard-only per scope MD §1).

### Files added (3)

| File | Purpose |
|---|---|
| `src/lib/mock-data/manager/manager-nav-items.ts` | 7 Manager nav items + types (`ManagerNavItem`, `ManagerNavIconKey`, `ManagerNavBadgeTone`). Each item carries `disabled?: boolean` — all 7 are `true` in Step 2; Steps 4-11 flip them as routes land. Locked the Path C URL prefix (`/specialist/team`, `/specialist/daily-audit`, etc.). |
| `src/components/manager/shell/manager-sidebar-icons.tsx` | 7 inline SVG icon components mirroring `specialist/shell/sidebar-icons.tsx` shape. Shapes ported faithfully from `reference/manager.html` `TEAM_MANAGEMENT_ITEMS` (lines 33297-33345). Duplicated rather than shared per Step 2 lock — keeps role-surface boundary clean. |
| `src/components/manager/shell/manager-sidebar-section.tsx` | Client Component. Render gate: `useSessionRole() === "manager" AND useManagerMode() === "manager"` — either failing returns `null`. Renders section header + 7 disabled `<span aria-disabled>` items. Item visual replicates `SidebarNavItem`'s layout without importing it (avoids extending Specialist `NavItem` union types). |

### Files modified (3)

| File | Diff shape |
|---|---|
| `src/components/specialist/shell/sidebar.tsx` | **(Specialist-side edit)** +1 import (with marker comment) and +1 component mount (with full marker fence) inside `<nav>` after the existing sections + before the `<SidebarProfile>` footer. Net ~13 lines added including comments. Sidebar's existing logic untouched. |
| `src/lib/mock-data/manager/index.ts` | +1 barrel re-export. |
| `docs/manager/CONVERSION_LOG.md` | Step 1.5 deferral note + this Step 2 entry. |

### Locked decisions (Step 2)

| | |
|---|---|
| **"Team Performance" dropped** | The prototype's 8-item TEAM_MANAGEMENT array includes "Team Performance" → `#team-performance` — but there is no `view-team-performance` in the 28-view list (sidebar-only dead navigation). Under Path C the Manager's own Specialist performance lives at `/specialist/performance` (existing), and team-wide performance lives at Team Reports (item 6 below, Step 10). Adding a dead nav entry would create user-visible "broken link UX." 7-item list final. |
| **Manager icon-key union is separate** | `ManagerNavIconKey` is its own union; does NOT extend or reuse Specialist's `NavIconKey`. Even visually-similar icons (e.g. the calendar in "Daily Activity" and "Manager Daily Activity") are duplicated as separate inline SVGs in `manager-sidebar-icons.tsx` rather than imported across the boundary. |
| **Disabled span pattern** | All 7 items render as `<span aria-disabled cursor-not-allowed opacity-60>` in Step 2 since their routes 404. Matches Session 9 C1's sub-nav-tabs convention from the Specialist surface. As each route lands (Steps 4-11), the corresponding `disabled` flag flips to `false` and the item becomes a real `<Link>`. DOM stays stable. |
| **Active-state machinery deferred** | No no-op infrastructure in Step 2 (all items are disabled — there's nothing to highlight). Active-state logic lands in Step 4 with the first enabled item (`/specialist/team`). |
| **Cross-route mode indicator** | TEAM MANAGEMENT section IS the indicator. No additional Topbar badge needed. The ModeToggle stays dashboard-only per scope MD §1. |
| **Marker comment fence** | The single Specialist-file edit (`sidebar.tsx`) is wrapped in a clear comment fence containing "Manager-extension surface (ADR 0001 — Path C)" — the same string will fence every Manager-extension edit through Step 14. Grep-friendly for migration scripts if ADR 0001 ever reverses. |
| **Badge counts** | `My Team` badge is derived from `specialists.length` (currently 1; auto-updates to 11 when Step 4 lands the full roster). Other badges (Daily Activity Audit "2", Team Disputes "3", Recruitment Sprints "4") are hardcoded prototype-derived placeholders — replaced with derived counts in Steps 6, 7, 9 respectively when their data files land. |

### Hrefs locked (Step 2)

| Item | Href (Path C: `/specialist/` prefix) | Enables in Step |
|---|---|---|
| My Team | `/specialist/team` | 4 |
| Daily Activity Audit | `/specialist/daily-audit` | 6 |
| Team Disputes | `/specialist/team-disputes` | 7 |
| Pool Coordination | `/specialist/pool-coordination` | 8 |
| Recruitment Sprints | `/specialist/recruitment-sprints` | 9 |
| Team Reports | `/specialist/team-reports` | 10 |
| Manager Daily Activity | `/specialist/manager-daily-activity` | 11 |

### Known friction (Step 2)

- **Hydration flash on section mount.** Server renders without the TEAM MANAGEMENT section (`getServerSnapshot` returns the default mode; on first paint `useManagerMode()` returns `"manager"` matching default; so server-rendered DOM INCLUDES the section). On hydration, if localStorage says `"specialist"`, the section flashes out (small layout shift, ~280px tall section vanishing). Inverse hydration flash from Step 1's toggle. Acceptable trade-off of localStorage-backed client state; revisit when/if a cookie-based pattern is preferred for SSR-side mode resolution.
- **Step 1's cross-route mode indicator friction is resolved.** Once a Manager navigates off the dashboard, the TEAM MANAGEMENT section persists as the on-screen cue that Manager Mode is active.

### Step 2 verification (a-l — all green)

| | | |
|---|---|---|
| (a) | `/specialist/dashboard` renders unchanged | ✓ |
| (b) | TEAM MANAGEMENT section visible at sidebar bottom with 7 items | ✓ |
| (c) | Toggle to "Specialist" → section disappears instantly (no reload) | ✓ |
| (d) | Toggle back to "Manager" → section reappears | ✓ |
| (e) | Navigate to `/specialist/review-queue` → TEAM MANAGEMENT still visible (mode persists; toggle disappears as expected — dashboard-only) | ✓ |
| (f) | Navigate back to dashboard → toggle + section both visible | ✓ |
| (g) | Refresh on `/specialist/review-queue` → section state persists | ✓ |
| (h) | Click any disabled item → no navigation, cursor-not-allowed | ✓ |
| (i) | `<md` viewport → entire section hidden (`max-md:hidden`) | ✓ |
| (j) | `pnpm typecheck`, `pnpm lint`, `pnpm build` all clean | ✓ |
| (k) | Every Specialist route renders unchanged outside the sidebar section addition | ✓ |
| (l) | Temporarily flipped `useSessionRole()` to `"specialist"` → section disappears even when `useManagerMode() === "manager"` (verifies both gates work independently); reverted to `"manager"` before commit | ✓ |

### Up next

- See Session 1 / Step 3 entry below.

---

## Session 1 — Step 3 — Manager dashboard content swap

**Goal:** First step where toggling mode produces a meaningful content change. The entire dashboard content (header / urgent panel / today's snapshot / active items / team performance / right rail) forks to team-wide Manager content when `useSessionRole() === "manager" && useManagerMode() === "manager"`. The temporary "Current mode" indicator from Step 1's `ModeToggle` is removed — the content swap is now the visible cue.

### Files added (14)

**Components (`src/components/manager/dashboard/`):**

| File | Role | Notes |
|---|---|---|
| `dashboard-mode-fork.tsx` | Client | The single content switch. Renders `managerContent` prop when both gates `"manager"`; else `children`. |
| `manager-action-placeholder-modal.tsx` | Client | "Coming in Step N" modal. Data-driven body via `landsInStep` + centralized `STEP_FEATURES` map. A11y: focus trap, Esc, focus restore on close. |
| `manager-dashboard-app.tsx` | Server | Top-level orchestrator. Composes header + main column + rail in the same grid as Specialist. |
| `manager-dashboard-header.tsx` | Server | "Manager view, **Mateo**." (reads `currentManager.firstName`) + 3 quick stats. Drift-proof against "Miguel". |
| `manager-urgent-section.tsx` | Client | 6 cards. Owns placeholder modal state. Inlined `UrgentCard`. |
| `manager-snapshot-section.tsx` | Server | 6 stat tiles. 4 disabled wrappers (cursor-not-allowed), 2 plain. Inlined `SnapshotCard`. |
| `manager-active-items-section.tsx` | Server | 3 columns (Specialists need attention, Disputes need oversight, Recent team activity). Column footer links disabled. Inlined `Column`, `SpecialistRow`, `DisputeRow`, `FeedItem`. |
| `manager-team-perf-section.tsx` | Server | 6 metric tiles with trend arrows. Inlined `MetricTile`, `TrendArrow`. |
| `manager-dashboard-rail.tsx` | Client | On-call card (direct reuse from `specialist/dashboard/on-call-card.tsx`) + Manager quick actions (5 buttons) + Manager daily report card. Owns placeholder modal state. Inlined sub-cards. |

**Mock data (`src/lib/mock-data/manager/`):**

| File | Content | Item count |
|---|---|---|
| `manager-urgent-items.ts` | 6 urgent cards (priority, type, body, SLA, 2 CTAs per) | 6 |
| `manager-snapshot.ts` | 6 snapshot tiles (number/pill value, detail, disabledRoute target) | 6 |
| `manager-active-items.ts` | 3 lists: 4 Specialists + 4 Disputes + 6 feed items | 14 |
| `manager-team-perf.ts` | 6 team performance metrics with trend tone + delta | 6 |
| `manager-rail.ts` | 5 quick actions + daily report state + shared `ManagerActionCTA`/`ManagerActionStep` types | 6 |

### Files modified (4)

| File | Diff shape |
|---|---|
| `src/app/(specialist)/specialist/dashboard/page.tsx` | **(Specialist-side edit, marker-fenced)** Restructured: `ModeToggle` hoisted ABOVE the `<DashboardModeFork>` switch (focus + keyboard state survive mode swaps per Q1B). The fork wraps the existing Specialist body unchanged (`DashboardHeader` + UrgentSection + SnapshotSection + ActiveItemsSection + PerformanceSection + DashboardRail). Two marker-fence comment blocks. Net ~15 lines changed; logic stable. |
| `src/components/manager/shell/mode-toggle.tsx` | Removed the Step 1 temporary "Current mode: …" indicator + the now-unused outer flex wrapper. Net −10 lines. |
| `src/lib/mock-data/manager/team.ts` | **Stub correction:** Lucas Andersen `countryCode` Denmark → Sweden, `countryName` updated. Prototype dashboard (line 19747) shows 🇸🇪; Step 1 guessed DK. Single-line correction with inline comment. |
| `src/lib/mock-data/manager/index.ts` | +5 barrel re-exports for the new dashboard data files. |
| `docs/manager/CONVERSION_LOG.md` | This entry. |

### Locked decisions (Step 3)

| | |
|---|---|
| **Single switch (Q1B)** | One `<DashboardModeFork>` wraps the entire main+rail body. ModeToggle hoisted ABOVE the fork so it doesn't unmount on swap — focus + keyboard state survive. The fork is a Client Component; the page stays a Server Component. |
| **Two-tier CTA pattern (Q2)** | Navigation links (Open profile, View team, "→" footers, snapshot card clicks) render as `<span aria-disabled cursor-not-allowed opacity-60>`. Action buttons (Run sprint, Schedule 1:1, Submit now, etc.) open `<ManagerActionPlaceholderModal>` with data-driven copy. No silent no-ops anywhere. |
| **Denormalized specialist names (Q3)** | Mock data uses plain strings for "Priya Mehra", "Diego Cabrera", "Aisha Bello", "Yara Khalil", "Felipe Santos", "Min-Jun Park", "Olena K." — paired with `TODO(step-4)` comments at every site. Grep `TODO(step-4)` in `src/lib/mock-data/manager/` for the Step 4 refactor target list. |
| **Lucas → Sweden (Q4)** | One-line correction to Step 1 stub. Prototype is the spec; Step 1's Denmark was a guess. |
| **On-call card direct reuse (Q5)** | `ManagerDashboardRail` imports `OnCallCard` from `@/components/specialist/dashboard/on-call-card`. Genuinely shared (Sofia Reyes call applies to both modes); duplicating would create drift. Different from the sidebar-icons situation in Step 2 (where the icons differed visually). |
| **Inlined sub-components (Q6)** | UrgentCard, SnapshotCard, Column, SpecialistRow, DisputeRow, FeedItem, MetricTile, TrendArrow, QuickActionsCard, QuickActionButton, QuickActionIcon, DailyReportCard all inlined into their parent section files. Keeps file count lean; each parent stays under ~340 LOC. |
| **Modal copy is data-driven (per Q7 + addendum)** | `STEP_FEATURES` map lives inside `ManagerActionPlaceholderModal`. Each `ManagerActionCTA` carries `landsInStep` (4-11 union); modal renders `{label} lands in Step {N} — {feature}` by default, or honors a per-call `description` override. Single file changes if step numbering shifts. |
| **Removed Step 1 temporary indicator** | The "Current mode: Manager/Specialist" ink-mute label is gone from `ModeToggle`. Step 3's content swap is the visible mode indicator. |

### Prototype → Path C translation notes

- **`data-mode-show` CSS swaps** in the prototype (29 attribute selectors) → React conditional rendering via `<DashboardModeFork>`. The Manager content lives in its own component tree; the Specialist content stays untouched.
- **The Specialist content INSIDE the fork is byte-identical to its pre-Step-3 state.** Only the wrapping JSX changed.
- **The shared on-call card** (which the prototype rendered ONCE outside both `data-mode-show` divs) is rendered in each mode's rail component — Specialist `DashboardRail` already has it; Manager `ManagerDashboardRail` imports it. Functionally identical to "share once" because both modes render the same component instance with the same mock data.

### A11y verification — `ManagerActionPlaceholderModal` (Q7m)

| | |
|---|---|
| Focus traps inside the modal while open | ✓ — keydown handler cycles Tab between Close (X) and "Got it" buttons |
| Esc closes | ✓ — keydown handler matches Escape |
| Focus returns to trigger element on close | ✓ — captures `document.activeElement` at open in a ref; restores on unmount via cleanup |
| Backdrop click closes | ✓ — `<button aria-label="Close dialog">` underlay |
| `role="dialog" + aria-modal="true" + aria-labelledby` | ✓ |

Established once here; downstream Manager steps that use the same modal don't need to re-verify a11y.

### Canonical numbers preserved (lock check)

| Number | Source | Step 3 location |
|---|---|---|
| 12 open disputes, 3 SLA at risk | Header quick stats + snapshot card 3 + urgent card 2 | ✓ |
| 9 of 11 daily submitted | Header quick stat + snapshot card 2 | ✓ |
| 91% team SLA hit rate | Team perf metric 3 | ✓ |
| 19 hires this month | Team perf metric 4 | ✓ |
| 4 active sprints, 2 on track, 2 behind | Snapshot card 6 | ✓ |
| Mixed pool (9 strong, 1 depleted) | Snapshot card 5 | ✓ |
| $48.2k revenue | NOT in dashboard — that's Team Reports (Step 10) | n/a |

### Specialist name references — Step 4 refactor target list

Generated via `grep -rn "TODO(step-4)" src/lib/mock-data/manager/`:

- `manager-urgent-items.ts` — Priya Mehra, Lucas (in dispute attribution), Aisha Bello, Diego Cabrera (3 sites)
- `manager-active-items.ts` — Priya Mehra, Diego Cabrera, Aisha Bello, Lucas Andersen, Yara Khalil, Aaliyah Kone (candidate, NOT a specialist), Felipe Santos, Min-Jun Park
- `manager-snapshot.ts` — Olena K.

Step 4 lands the full 11-Specialist roster in `team.ts`. The refactor flips each denormalized string to a `getSpecialist(id)?.fullName` call.

### Known friction (Step 3)

- **Hydration flash on dashboard content swap.** Server renders the Manager dashboard (default mode = `"manager"`). On hydration, if localStorage says `"specialist"`, the entire dashboard body flashes from Manager → Specialist. Larger visual impact than Step 1's toggle flash or Step 2's sidebar section flash. Trade-off of localStorage-backed client state without SSR-readable mode. Revisit if/when a cookie-based pattern is introduced for SSR-side mode resolution (cleanest fix; would require a parallel auth-time decision).
- **Mateo's initials/avatar deferred.** Manager header renders the greeting "Manager view, Mateo." but no avatar pill anywhere yet. The `currentManager.initials = "MV"` lock is in place; first UI consumer lands in Step 4 (My Team grid) or later.
- **Column 1 ordering** — "Specialists need attention" row order matches prototype: Priya / Diego / Aisha / Lucas. If product wants severity-sorted (urgent → attn → neutral), revisit in Step 4 when full roster lands.

### Step 3 verification (a-m — all green)

| | | |
|---|---|---|
| (a) | `/specialist/dashboard` in Manager Mode renders the full Manager dashboard | ✓ |
| (b) | Toggle to "Specialist" → existing Specialist dashboard renders, unchanged | ✓ |
| (c) | Toggle back to "Manager" → Manager dashboard returns | ✓ |
| (d) | All 6 urgent card CTAs open the placeholder modal with the correct step number | ✓ |
| (e) | All 4 snapshot clickable tiles render as disabled wrappers; no nav on click | ✓ |
| (f) | All 3 column footers + "View team" / "View all" header links render disabled | ✓ |
| (g) | All 5 quick action buttons open the placeholder modal with the correct step | ✓ |
| (h) | "Submit now" in daily report card opens the placeholder modal (Step 11) | ✓ |
| (i) | Mode toggle preserves focus + keyboard state across swap (hoisted above fork) | ✓ |
| (j) | `pnpm typecheck`, `pnpm lint`, `pnpm build` all clean (165 routes preserved; no new routes) | ✓ |
| (k) | Every other Specialist route renders unchanged | ✓ |
| (l) | Temporarily flipped `useSessionRole()` to `"specialist"` → Manager dashboard never renders even when mode is `"manager"`; flipped back to `"manager"` before commit | ✓ |
| (m) | Modal a11y verified: focus traps cycle Close ↔ Got it; Esc closes; focus returns to trigger on close. Once verified here; downstream Manager steps using the same modal don't need to re-verify | ✓ |

### Up next

- See Session 1 / Step 4 entry below.

---

## Session 1 — Step 4 — My Team page + 11-Specialist roster + Step 3 refactor

**Goal:** First Manager-only route lands. Full 11-Specialist roster locked in `team.ts`. All `TODO(step-4)` sites in dashboard mock data refactored to use canonical `spec-*` IDs. Sidebar TEAM MANAGEMENT "My Team" item flips from disabled to active. Route guard primitive established for Steps 5-11 reuse.

### Files added (9)

| File | Role | Notes |
|---|---|---|
| `src/app/(specialist)/specialist/team/page.tsx` | Server | Manager-only page. Wraps `<MyTeamApp />` in `<ManagerRouteGuard>`. |
| `src/components/manager/shell/manager-route-guard.tsx` | Client | Reusable dual-gate guard. `useSessionRole()` + `useManagerMode()` both required. Renders centered "Redirecting…" message during unauthorized state per Q8 lock. Steps 5-11 reuse. |
| `src/components/manager/shell/mgr-avatar.tsx` | Server | 10-gradient avatar primitive (`av-1` to `av-10` + `av-you`). Gradient stops ported from prototype CSS lines 14291-14301. Two sizes (sm/md). Step 5+ reuses. |
| `src/lib/utils/country-flag.ts` | — | ISO-2 → emoji helper via Unicode regional-indicator formula. No lookup table. |
| `src/components/manager/team/my-team-app.tsx` | Client | Orchestrator. Owns cohort + search + sort state. Computes filter pipeline + reset. |
| `src/components/manager/team/my-team-header.tsx` | Client | Eyebrow + title + dynamic subtitle (counts from team.ts) + 2 header buttons (Export → step 10 modal; Team meeting → step 14 "coming soon" modal). |
| `src/components/manager/team/my-team-attention-strip.tsx` | Server | 3-card priority strip (Priya / Diego / Aisha). Each card is a `TODO(step-5)` disabled wrapper — Step 5 flips to `<Link>`. |
| `src/components/manager/team/my-team-filters.tsx` | Client | Cohort chips (5) + search input + sort select + result count. Pure controlled component. |
| `src/components/manager/team/my-team-grid.tsx` | Client | 11-card grid + empty state. Inlined `SpecialistCard`, `DailyActivityValue`, `PerformanceBar` per Step 3 Q6. Owns 1:1 modal state. |

### Files modified (7)

| File | Diff shape |
|---|---|
| `src/lib/mock-data/manager/team.ts` | **MAJOR EDIT.** Type union changes: `SpecialistRole` expanded to prototype's 10 categories (6 of 10 entries renamed/added). `SpecialistId` strict literal-string union added. `AvatarSlot` extracted as own type. `DailyActivityState` discriminated union added. Records expanded from 1 stub to 11 canonical entries. New helpers: `formatFirstAndInitial`, `getSpecialistByName`, `countSpecialistsByCohort`. Performance score banding rule documented in file header. |
| `src/lib/mock-data/manager/manager-nav-items.ts` | Flipped `disabled: true` → removed (default) on `my-team` item. `/specialist/team` now active. |
| `src/lib/mock-data/manager/manager-urgent-items.ts` | 5 inline specialist-name strings → `getSpecialist("spec-…")?.fullName` lookups (resolved at module load). |
| `src/lib/mock-data/manager/manager-active-items.ts` | `ActiveSpecialistRow`s built via new `buildSpecialistRow()` helper that derives `initials` / `fullName` / `countryFlag` from canonical Specialist records. Dispute owner names + activity feed body strings also pull from team.ts. Aaliyah Kone (candidate, not specialist) stays inline. |
| `src/lib/mock-data/manager/manager-snapshot.ts` | "Olena K." → `formatFirstAndInitial("spec-olena-kovalenko")` helper call. Specialists-active card's `disabledRoute` removed — `/specialist/team` is now live so the dashboard snapshot card auto-upgrades to a real `<Link>` (the snapshot section component reads `disabledRoute` to fork between span and link). |
| `src/lib/mock-data/manager/manager-rail.ts` | `ManagerActionStep` union extended to include `14` (Help) for "coming soon" actions whose target never lands as a dedicated step (Team meeting). |
| `src/components/manager/dashboard/manager-action-placeholder-modal.tsx` | `STEP_FEATURES` map: added `14: "Help & resources"` entry. |
| `src/components/manager/shell/manager-sidebar-section.tsx` | Wired active-state. `usePathname()` import. Each non-disabled item now resolves `isActive` via `pathname === item.href \|\| pathname.startsWith(item.href + "/")`. Active visual matches Specialist `SidebarNavItem` exactly (`bg-ink text-paper` + `text-lime` icon). `aria-current="page"` set on active links. |
| `docs/manager/CONVERSION_LOG.md` | This entry. |

(Note: 7 source files modified + log = 8 lines in the table; the manager-rail.ts + modal.tsx were micro-edits to support the Team meeting step-14 routing per the user's Q2 refinement.)

### 11 spec-* IDs — locked canonical roster

| # | ID | Display name | Role | Status | Cohort | Country | Avatar | Perf |
|---|---|---|---|---|---|---|---|---|
| 1 | `spec-mateo-vargas` | Mateo Vargas | Virtual Assistants | active | senior | 🇲🇽 MX | you | 94 |
| 2 | `spec-priya-mehra` | Priya Mehra | Tech Support | flag | mid | 🇮🇳 IN | 3 | 76 |
| 3 | `spec-diego-cabrera` | Diego Cabrera | Bookkeeping | flag | senior | 🇲🇽 MX | 1 | 85 |
| 4 | `spec-aisha-bello` | Aisha Bello | Customer Support | capacity | mid | 🇳🇬 NG | 4 | 88 |
| 5 | `spec-lucas-andersen` | Lucas Andersen | Marketing Ops | capacity | mid | 🇸🇪 SE | 5 | 90 |
| 6 | `spec-felipe-santos` | Felipe Santos | Sales Development | active | senior | 🇧🇷 BR | 6 | 92 |
| 7 | `spec-yara-khalil` | Yara Khalil | Project Management | active | senior | 🇪🇬 EG | 7 | 95 |
| 8 | `spec-min-jun-park` | Min-Jun Park | Data Operations | active | senior | 🇰🇷 KR | 8 | 91 |
| 9 | `spec-olena-kovalenko` | Olena Kovalenko | Bookkeeping | vacation | senior | 🇺🇦 UA | 9 | 87 |
| 10 | `spec-kavi-rajan` | Kavi Rajan | Recruiting Coordinators | active | mid | 🇮🇳 IN | 10 | 89 |
| 11 | `spec-naomi-adebayo` | Naomi Adebayo | Designers | active | senior | 🇳🇬 NG | 2 | 93 |

Cohort counts: 11 all · 10 active (non-vacation) · 1 vacation · 2 flag · 2 capacity. Matches prototype chip counts.

### Locked decisions (Step 4)

| | |
|---|---|
| **Mateo dual identity (Decision A)** | `spec-mateo-vargas` Specialist record with `isManager: true` + `managerId: "mgr-001-v8b2c4"` cross-link to `currentManager`. Namespace uniformity won — all 11 cards under `spec-*`. |
| **Min-Jun naming (Decision B)** | `spec-min-jun-park` (kebab-cased, departs from prototype's `data-mt-id="minjun-park"`). DOM-attribute names from prototype are artifact. |
| **Lucas Sweden** | Step 3's stub-correction comment + the SE country code carry forward into the full record. |
| **Role union** | 10 prototype-faithful entries (`Tech Support`, `Marketing Ops`, `Designers`, `Project Management`, `Data Operations`, `Recruiting Coordinators` added; `Engineering`, `Content & Writing`, `Operations`, `Design`, `Data & Analytics`, `Marketing` removed/renamed from Step 1's stub union). |
| **Cohort field** | Kept on the type (per scope MD requirement that fields stay canonical). Values are INFERRED from tenure + role complexity — documented in file header. Not surfaced in Step 4 UI (chips filter on `status`, not `cohort`). |
| **Avatar slot mapping** | 10 numbered slots used uniquely (no duplicates) + Mateo on `av-you`. Prototype assignments preserved literally. |
| **Performance banding** | 3-band visual: ≥85 = high (success bar), 75-84 = mid (amber bar), <75 = low (danger bar). Value text tone: success at ≥95 (Yara only), attn at mid-band (Diego only), neutral otherwise. Documented in `team.ts` header so Steps 5/10/11 use the same logic. |
| **CTA pattern (Q1)** | Mateo card → 2 REAL Links (View dashboard → `/specialist/dashboard`, Performance → `/specialist/performance`). Other 10 cards → View profile + Message as disabled spans (Steps 5 / 13). 1:1 as modal trigger (`landsInStep: 5`). Vacation specialists skip the 1:1 button. Attention strip cards = `TODO(step-5)` disabled wrappers — grep target. |
| **Header CTAs (Q2)** | Export → `landsInStep: 10` (Team Reports — closest fit). Team meeting → `landsInStep: 14` with description override "Team meeting scheduling — coming soon." (no step delivers a Team Meeting scheduler — honest "coming soon" beats a misleading step promise). |
| **Sort + cohort defaults (Q4)** | cohort = "all"; sort = "name" (A-Z). |
| **Search semantics (Q5)** | Case-insensitive substring against fullName / role / countryName / **initials** (per Q5 addition — scanning for "MV" or "PM" finds Mateo/Priya). Empty query = no filtering. |
| **Filter composition (Q6)** | Cohort AND search compose, then sort, then count. |
| **Sidebar active state (Q7)** | Matches Specialist `SidebarNavItem` exactly: `bg-ink text-paper` background + `text-lime` icon. Detail-route prefix match so Step 5's `/specialist/team/[id]` will also highlight My Team. |
| **Route guard (Q8)** | `<ManagerRouteGuard>` reusable primitive. Renders centered "Redirecting…" message (NOT null) during unauthorized state — avoids flash-of-empty-page during useEffect-to-navigation gap. Steps 5-11 reuse this exact primitive. |
| **Step 3 cross-step cleanup** | All 14 `TODO(step-4)` hits resolved. Canary `grep -rn "TODO(step-4)" src/` returns zero. |

### Step 3 refactor — what changed

Resolving the 14 `TODO(step-4)` hits:

- `manager-urgent-items.ts` (5 inline sites): names sourced via `getSpecialist("spec-…")?.fullName` at module load. Defensive `?? "<literal>"` fallback preserved.
- `manager-active-items.ts` (4 sites in `activeSpecialistsNeedingAttention` + 4 sites in dispute owners + 5 sites in activity feed): `buildSpecialistRow()` helper for the attention list; inline lookups for disputes + feed. Aaliyah Kone (candidate) stays as literal string.
- `manager-snapshot.ts` (1 site): "Olena K." → `formatFirstAndInitial("spec-olena-kovalenko")` helper. Specialists-active card's `disabledRoute` removed (Step 4 enables the route → card auto-upgrades to Link via the existing `disabledRoute` fork in the snapshot section component).

### Known friction (Step 4)

- **Attention strip cards are disabled wrappers in Step 4.** Per the two-tier CTA pattern, navigation to Specialist Detail (Step 5) renders as `cursor-not-allowed`. Three cards affected. `TODO(step-5)` grep target for the un-disable refactor.
- **`max-md:hidden` sidebar items unreachable on mobile.** The "My Team" item carries the sidebar's standard mobile-hide convention. Manager users on `<768px` viewports can still hit `/specialist/team` by URL but the sidebar nav doesn't surface it. Consistent with the other Specialist sidebar items that hide on mobile (Daily activity, Reviews, Performance, Help).
- **Search input loses focus during cohort chip change.** React re-renders the filter component on cohort change, which preserves form-input state via React's controlled-component reconciliation — no actual focus loss in practice. Tested manually; documented in case future ref-based interventions are needed.

### Step 4 verification (a-p — all green)

| | | |
|---|---|---|
| (a) | `/specialist/team` renders the My Team page when role+mode = manager | ✓ |
| (b) | `/specialist/team` redirects to `/specialist/dashboard` when mode toggled to specialist | ✓ |
| (c) | Cohort chip click filters grid (all → 11; active → 10; vacation → 1; flag → 2; capacity → 2) | ✓ |
| (d) | Search input filters grid (name / role / country / initials all match case-insensitively) | ✓ |
| (e) | Sort dropdown re-orders grid (name A-Z, role, perf high-low, workload high-low) | ✓ |
| (f) | Empty state appears when filters yield 0 matches | ✓ |
| (g) | "Reset filters" button restores defaults (cohort=all, query="", sort=name) | ✓ |
| (h) | Mateo card shows is-you treatment: av-you avatar + "You" tag + lime ring + 2 buttons (View dashboard / Performance) | ✓ |
| (i) | Other 10 cards show 3 buttons (View profile + Message disabled spans; 1:1 modal trigger). Olena (vacation) shows only 2 (no 1:1) | ✓ |
| (j) | View dashboard + Performance buttons navigate to existing Specialist routes | ✓ |
| (k) | Sidebar My Team item active with `bg-ink text-paper` + `text-lime` icon when on `/specialist/team` | ✓ |
| (l) | Sidebar TEAM MANAGEMENT section visible (Step 2 verification still passes) | ✓ |
| (m) | `pnpm typecheck`, `pnpm lint`, `pnpm build` all clean. 166 routes prerender (+1 from Step 3's 165) | ✓ |
| (n) | Other Specialist routes unchanged. Dashboard's Specialists-active snapshot card now upgrades to a real Link | ✓ |
| (o) | Temporarily flipped `useSessionRole()` to "specialist" → `/specialist/team` redirects to `/specialist/dashboard`. Flipped back before commit | ✓ |
| (p) | `grep -rn "TODO(step-4)" src/` returns zero hits (cross-step cleanup canary) | ✓ |

### Up next

- See Session 1 / Step 5 entry below.

---

## Session 1 — Step 5 — Specialist Detail + 11 SSG routes + Step 4 un-disable pass

**Goal:** `/specialist/team/[id]` route lands with 11 SSG pages (one per Specialist). 7-tab layout per prototype (Overview / Performance / Workload / Daily Activity / Coaching Notes / Communication / Their Work). 6 fields added to each Specialist record (`atlasTsId`, `city`, `joinDate`, `timeZone`, `languages`, `caseloadCapacity`). All Step 4 `TODO(step-5)` un-disable sites resolved.

### Files added (15)

| File | Role | Notes |
|---|---|---|
| `src/app/(specialist)/specialist/team/[id]/page.tsx` | Server | Dynamic route. `generateStaticParams(ALL_SPECIALIST_IDS)` + strict-union `notFound()` validation. Wraps content in `<ManagerRouteGuard>` + `<Suspense>` (required for `useSearchParams()` under SSG). |
| `src/components/manager/specialist-detail/specialist-detail-app.tsx` | Client | Orchestrator. Owns active-tab state via `useState`. Reads `?tab=` searchParam ONCE on mount for initial state (per Q1 lock); local React state after clicks (no URL sync). |
| `src/components/manager/specialist-detail/sd-back-link.tsx` | Server | "← Back to My team" Link. |
| `src/components/manager/specialist-detail/sd-hero.tsx` | Client | Avatar + name + eyebrow + meta + status tag + 6 action buttons. Owns modal state. Mateo self-adjustments per Q2 (suppress Message + Schedule 1:1; keep Audit daily). |
| `src/components/manager/specialist-detail/sd-meta-bar.tsx` | Server | Slim meta bar: Time zone / Languages / Performance score / Last active. |
| `src/components/manager/specialist-detail/sd-stats-strip.tsx` | Server | 5-stat strip: Candidates / Contracts / Reviews · month / Disputes resolved / Daily adherence. |
| `src/components/manager/specialist-detail/sd-tabs.tsx` | Client | 7-tab nav. Controlled by orchestrator. |
| `src/components/manager/specialist-detail/sd-tab-overview.tsx` | Client | At-a-glance tiles + recent timeline (6 entries — shared placeholder). |
| `src/components/manager/specialist-detail/sd-tab-performance.tsx` | Client | 4 cards 2x2: Reviews / Disputes / Sourcing / Pool, each with 4 tiles + sparkline. |
| `src/components/manager/specialist-detail/sd-tab-workload.tsx` | Client | 3 cards: capacity bars (3) + recent assignments (4) + needs attention now (4). Capacity bar tone forks at ≥100% / ≥85% / else. |
| `src/components/manager/specialist-detail/sd-tab-daily.tsx` | Client | **Per trim (b): no 30-day calendar.** Today's submission + recent submissions (3 rows). Placeholder card with `TODO(step-11)` marker for calendar primitive. |
| `src/components/manager/specialist-detail/sd-tab-coaching.tsx` | Client | Editor (textarea, local draft state) + past notes (3 entries). Mateo self-page: past notes empty state. |
| `src/components/manager/specialist-detail/sd-tab-communication.tsx` | Client | Recent thread (3 msgs) + past 1:1 sessions (3). Owns modal state. Mateo self-page: both sides render as "You" per Q3 reminder; Open chat + Schedule next buttons suppressed. |
| `src/components/manager/specialist-detail/sd-tab-work.tsx` | Client | 5 portfolio cards (all disabled — destination routes don't exist) + Manager actions (Flag for admin / Suspend disabled). Mateo: Manager actions section suppressed. |
| `src/lib/mock-data/manager/spec-detail-data.ts` | — | Per-Specialist stats (`getSpecStats(id)`) + shared placeholder content for tabs (timeline, performance cards/sparklines, workload items, recent submissions, coaching notes, communication thread, 1:1 sessions, work portfolio defs). |

### Files modified (7)

| File | Diff shape |
|---|---|
| `src/lib/mock-data/manager/team.ts` | **Specialist type extended:** added 6 new required fields (`atlasTsId`, `city`, `joinDate`, `timeZone`, `languages`, `caseloadCapacity`). All 11 records updated with locked values. Lucas's `caseloadCapacity: 40` documented with the over-capacity rationale (41/40 = 103%). |
| `src/lib/mock-data/manager/manager-rail.ts` | `ManagerActionStep` union extended with `13` (Specialist Chat for hero Message CTA). `ManagerActionCTA` extended with optional `href?: string` field — CTAs with `href` render as real `<Link>` (Step 5 un-disable). |
| `src/components/manager/dashboard/manager-action-placeholder-modal.tsx` | `STEP_FEATURES` map: added `13: "Specialist Chat"`. |
| `src/components/manager/dashboard/manager-urgent-section.tsx` | Action buttons fork on `href` presence: `<Link>` if set, button + modal otherwise. Extracted `<ArrowIcon>` helper. |
| `src/lib/mock-data/manager/manager-urgent-items.ts` | Card 1 primary + Card 4 primary + Card 4 ghost: added `href` for direct navigation to Specialist Detail (with tab deep-linking where appropriate). |
| `src/components/manager/team/my-team-attention-strip.tsx` | Un-disabled: 3 wrappers flipped from `<div aria-disabled>` to `<Link>`. Added hover tone per priority. |
| `src/components/manager/team/my-team-grid.tsx` | Un-disabled: "View profile" buttons (10 cards) → `<Link>`. 1:1 button → `<Link>` with `?tab=communication` deep-link. Dropped the placeholder modal mount + `ONE_ON_ONE_CTA` constant. File no longer owns state; comment updated to reflect inherited Client boundary. |
| `docs/manager/CONVERSION_LOG.md` | This entry. |

### Locked decisions (Step 5)

| | |
|---|---|
| **Tab state (Q1)** | `?tab=` searchParam for initial state only (deep-linkable from urgent cards). Local React state after clicks. No URL sync, no history push. Suspense boundary required for `useSearchParams()` under SSG. |
| **Mateo self-adjustments (Q2)** | "You" tag in hero. Suppress Message + Schedule 1:1 (interpersonal). Keep Audit daily (auditing own submissions is legitimate — Mateo IS a Specialist). Keep View dashboard (real Link). Suppress Manager actions in Their Work (Flag/Suspend). Coaching past notes + Communication thread/sessions all show self-empty/self-referential states. |
| **Tab content variance (Q3)** | Per-specialist: hero / meta bar / stats strip / workload capacity. Shared placeholder: Overview timeline, Performance sparklines, Workload assignments + queue, Coaching past notes, Communication thread + sessions. Name interpolation handled at render time. |
| **Calendar trim (Q4 = b)** | Daily tab in Step 5 renders text-only today's status + 3 recent submissions. The 30-day calendar grid lands in Step 11 — Manager Daily Activity has a "past 14-day calendar" that's the same primitive. `TODO(step-11)` marker mounted at the intended insertion point. |
| **Performance review CTA (Q5)** | Hero "Performance review" button → modal `landsInStep: 10` (Team Reports). Default auto-derived copy ("Performance review lands in Step 10 — Team Reports"); no description override. |
| **Caseload capacity (Q6)** | Per-specialist capacity field locked. Lucas at 40 (over-capacity at 41/40 = 103%) — rationale documented in `team.ts` comment near the field. All other specialists' capacities documented as inferred. |
| **Two-tier CTA via `href`** | `ManagerActionCTA` extended with optional `href`. URGENT section + future consumers fork: `href` set → render as `<Link>`; otherwise button + modal. Backward-compatible (existing CTAs without `href` keep modal behavior). |
| **Self vs others rendering** | All 7 tabs check `s.isManager === true` and adjust where applicable. Most tabs render identically; Coaching + Communication + Work have self-specific adjustments. |
| **`Suspense` boundary** | Wraps `<SpecialistDetailApp>` at the page level. Required by Next.js when a Client Component uses `useSearchParams()` under SSG. Fallback is `null`; server renders with default tab (Overview), client hydrates and may swap to `?tab=` initial. |

### Step 4 un-disable pass — all `landsInStep: 5` sites resolved

| Site | Step 4 state | Step 5 state |
|---|---|---|
| 3 attention strip cards | disabled `<div>` wrappers | `<Link href="/specialist/team/${id}">` |
| 10 "View profile" buttons on SpecialistCard | disabled `<span>` | `<Link href="/specialist/team/${id}">` |
| 10 "1:1" buttons on SpecialistCard | modal trigger (Step 5) | `<Link href="/specialist/team/${id}?tab=communication">` |
| Dashboard urgent card 1 "Open profile" | modal trigger | `href="/specialist/team/spec-priya-mehra"` |
| Dashboard urgent card 4 "View performance" | modal trigger | `href="/specialist/team/spec-diego-cabrera?tab=performance"` |
| Dashboard urgent card 4 "Schedule 1:1" | modal trigger | `href="/specialist/team/spec-diego-cabrera?tab=communication"` |

Sites that **stayed as modal** (intentional):
- Dashboard urgent card 5 "Open templates" — no template feature in any step
- Dashboard rail "Schedule a 1:1" — generic action; no target specialist

### 6 new Specialist fields locked

| Field | All 11 specialists |
|---|---|
| `atlasTsId` | ATLAS-TS-001 through ATLAS-TS-011 |
| `city` | Mexico City / Mumbai / Guadalajara / Lagos / Stockholm / São Paulo / Cairo / Seoul / Kyiv / Bengaluru / Lagos |
| `joinDate` | Range: Nov 2022 (Olena, longest tenure) → May 2024 (Mateo, newest as Manager) |
| `timeZone` | Per city (GMT-6 to GMT+9) |
| `languages` | 1-3 per specialist; rendered as `Spanish · English` |
| `caseloadCapacity` | 25-40 per specialist; Lucas at 40 (over at 41); Aisha at 35 (89% — capacity flag) |

### Locked-shape drift — flagged for follow-up

Step 4 extended `SpecialistRole` union (10 entries replacing Step 1's stub union). Step 5 added 6 fields per record. Two locked-shape changes in two steps.

**Step 5 follow-up — Specialist shape audit pass (proposed before Step 6):** Re-read the prototype exhaustively, identify every per-specialist field still missing from `team.ts`, lock all remaining shape additions in one go. Prevents further additive drift across Steps 6-11.

Candidate fields to audit (preliminary list — NOT a commit):
- Skills / specialization (Step 8 Pool Coordination might need)
- Communication channels (Step 13 Specialist Chat might need)
- Audit history / coaching frequency (Step 6 Audit + Step 5 Coaching might want)
- Hire success metrics (Step 10 Team Reports references)

Do NOT do the audit now. Defer until before Step 6 begins.

### Known friction (Step 5)

- **Sparkline numbers are shared across all 11 specialists.** Faithful to prototype which uses one HTML block + JS data swap of hero/stats only. Numbers will vary per specialist when Step 10's audit pass parameterizes them.
- **Coaching notes editor has no persistence.** Auto-saving indicator is decorative. Real save flow lands when backend wires up.
- **Their Work portfolio cards all disabled.** The "Manager view as specialist" surface doesn't exist in any step — it would require a major architectural addition (Manager reads Specialist routes in shadow mode). Deferred indefinitely; cards render as honest unavailable affordances.
- **Suspense boundary fallback is `null`.** Brief flash on tab deep-link from `?tab=...` URL before hydration. Acceptable per the user's "no URL sync after clicks" lock — the deep-link is the only path that uses searchParam state.

### Step 5 verification (a-p — all green)

| | | |
|---|---|---|
| (a) | `/specialist/team/[id]` renders for all 11 ids | ✓ |
| (b) | `/specialist/team/invalid-id` returns 404 | ✓ |
| (c) | Tab clicks switch active panel (local state) | ✓ |
| (d) | `?tab=communication` initial URL renders with Communication tab active | ✓ |
| (e) | Back link navigates to `/specialist/team` | ✓ |
| (f) | Mateo's page suppresses Message + Schedule 1:1; renders "You" tag; keeps Audit daily | ✓ |
| (g) | Other specialists show all hero buttons (Message + Schedule 1:1 + Audit daily + Performance review + Log coaching note) | ✓ |
| (h) | All 5 portfolio cards in Their Work are disabled wrappers | ✓ |
| (i) | Suspend Specialist button is disabled (prototype precedent) | ✓ |
| (j) | `pnpm typecheck` + lint + build clean. 177 routes prerender (166 + 11 SSG specialist detail pages) | ✓ |
| (k) | Other Specialist routes unchanged | ✓ |
| (l) | `useSessionRole()` flip → 11 detail pages redirect to dashboard via ManagerRouteGuard | ✓ |
| (m) | `grep -rn "TODO(step-5)" src/` returns 0 hits | ✓ |
| (n) | Modal a11y still works (regression — focus trap, Esc close, focus restore) | ✓ |
| (o) | Dashboard urgent cards' "Open profile" / "View performance" / "Schedule 1:1" buttons now navigate to specialist detail with correct tab pre-selected | ✓ |
| (p) | Click Dashboard urgent card 4 "View performance" → `/specialist/team/spec-diego-cabrera?tab=performance` with Performance tab pre-selected (NOT Overview). End-to-end tab-deep-linking verified | ✓ |

### Future grep targets created

- `TODO(step-11)` — calendar primitive insertion point in `sd-tab-daily.tsx` (deferred from Step 5)
- `TODO(step-7)` — dispute attribution refactor in `manager-active-items.ts` (still open from Step 4)

### Up next

- See "Specialist shape audit" entry below.

---

## Session 1 — Specialist shape audit pass — kpis + dailyHistory + todayActivity + dailyActivity context

**Goal:** Lock all remaining per-Specialist data fields needed across Steps 6-11 in one commit. Prevents further additive drift across the upcoming feature steps.

### What changed (5 shape additions)

| # | Change | Type | Steps consuming |
|---|---|---|---|
| 1 | `kpis: SpecialistKpis` (NEW nested object, 8 numeric stats) | Add | 5, 10 |
| 2 | `DailyActivityState` discriminated union extended with per-status context | Extend | 5, 6 |
| 3 | `todayActivity: TodayActivityCounts` (NEW nested object, 4 counts) | Add | 5, 6 |
| 4 | `dailyHistory: ReadonlyArray<DailyHistoryDay>` (NEW — 14 weekday entries per spec) | Add | 10, 11 |
| 5 | 3 NEW flat capacity fields (`contractsCapacity`, `reviewsPendingNow`, `reviewsPendingCapacity`) | Add (move from spec-detail-data.ts) | 5 (Workload tab) |

### KPI value reconciliation — Step 10 charts override prior Step 5 numbers

Step 5's `spec-detail-data.ts` `SPEC_STATS` map carried Mateo's reviewsMonth + SLA values that matched Step 10 — but the other 10 specialists' numbers were prior guesses that didn't match the canonical Step 10 chart bars. The audit reconciles to Step 10 canonical (prototype `view-team-reports` per-specialist comparison charts).

Diffs vs. previous Step 5 numbers (Step 10 wins, in **bold**):

| Specialist | reviewsMonth | SLA% | dispute hrs (NEW) | sourcing | hires | Other adjustments |
|---|---|---|---|---|---|---|
| Mateo | 22 (=) | 94 (=) | **28** | 48 (=) | 4 (=) | — |
| Priya | 14 (=) | 78 (**was 76**) | **52** | **18** (was 38) | **1** (was 2) | dailyAdherence **78%** (was 65%) — Step 10 metric foot |
| Diego | **19** (was 18) | 85 (=) | **40** | **32** (was 42) | **2** (was 3) | — |
| Aisha | **26** (was 20) | **90** (was 88) | **34** | **41** (was 45) | 3 (=) | — |
| Lucas | **31** (was 28) | **95** (was 90) | **24** | **56** (was 55) | 5 (=) | — |
| Felipe | **18** (was 16) | **96** (was 92) | **18** | **38** (was 40) | 4 (=) | — |
| Yara | **28** (was 24) | **98** (was 95) | **22** | **44** (was 50) | 5 (=) | — |
| Min-Jun | **24** (was 19) | **92** (was 91) | **30** | **36** (was 44) | 3 (=) | — |
| Olena | 12 (=) | **88** (was 87) | **32** | 22 (=) | 2 (=) | — |
| Kavi | 17 (=) | 89 (=) | **26** | **28** (was 41) | 2 (=) | — |
| Naomi | **20** (was 18) | **95** (was 93) | **32** | **31** (was 38) | 3 (=) | — |

Other KPIs (disputesResolvedMonth, candidatesApprovedMonth) kept from Step 5 — prototype doesn't override.

### `DailyActivityState` extensions

Per-status context fields added for Step 6 audit-row copy:

```ts
| { kind: "pending"; dueLabel: string; lastActivityLabel: string }
| { kind: "missed"; daysCount: number; lastSubmittedDate: string; lastSubmittedTime: string }
| { kind: "excused"; untilLabel: string; resumesDate: string }
```

Only 3 specialists carry non-submitted state currently: Priya (missed), Aisha (pending), Olena (excused). Records updated accordingly.

### `dailyHistory` — 14 weekdays, all 11 specialists

Heatmap pattern from prototype `view-team-reports` heatmap (lines 31312-31396). Intensity scale extended to include `s0` (excused — Olena's last 4 vacation days render as `s0`). Lucas/Felipe/Yara render perfect adherence (mostly s4); Priya's last 3 days are `s1` (missed — matches her `dailyActivity.missed.daysCount: 2` + today's missed → 3 cells).

A `makeHistory()` helper validates the 14-entry length at module load — typo-safety.

### `todayActivity` — 4-count breakdown per specialist

Mateo's values match the prototype Step 5 placeholder string (14/3/2/1). The other 10 specialists' values are inferred per persona (workload, status) — prototype only shows Mateo's. Documented in records as inferred.

A new `TodayActivitySummary` sub-component in `sd-tab-daily.tsx` composes human copy from the 4 counts ("Logged X outreach, Y check-ins, Z interviews, N signups."). Handles vacation ("No activity logged — excused for vacation"), pending ("Logged so far today: …"), and missed (zero-state).

### 3 flat workload-capacity fields

Moved verbatim from `spec-detail-data.ts`'s `SPEC_STATS` map onto Specialist. Naming: `contractsCapacity` + `reviewsPendingCapacity` parallel pattern, but legacy `caseloadCapacity` (candidate denominator) stays — symmetry would have it as `candidatesCapacity`. Code-smell noted in team.ts comment near the field; no TODO grep marker (deliberately) — small inconsistency, future rename pass can address.

### `spec-detail-data.ts` pruned

Removed (~210 LOC):
- `SpecStats` type
- `SPEC_STATS: Record<SpecialistId, SpecStats>` const (11 records × 10 fields)
- `getSpecStats(id)` lookup
- `dailyTodayDetailTemplate` string
- `SpecialistId` import (unused)

What's left: pure shared placeholder content for tabs (`overviewTimelineEntries`, `performanceCards`, `workloadRecentAssignments`, `workloadNeedsAttention`, `recentSubmissions`, `coachingPastNotes`, `communicationThread`, `past1on1Sessions`, `workPortfolioCardDefs`). Per-Specialist data sits ENTIRELY on `Specialist` record.

### Future-maintainer note (post-Clerk)

KPI access is currently direct field reads on the canonical Specialist record (`s.kpis.reviewsMonth`). When KPIs become async-fetched (after real auth + backend land), an adapter layer at the page or orchestrator level should resolve KPIs and pass them down. The 5 consuming components (`sd-stats-strip`, `sd-tab-overview`, `sd-tab-workload`, `sd-tab-daily`, and Step 10 components when they land) stay unchanged.

This is a breadcrumb for whoever lands real auth, not a Step 6 concern.

### Files touched (3 new — by way of zero — and 6 modified)

| File | Diff |
|---|---|
| `src/lib/mock-data/manager/team.ts` | +~330 / -~30 — 5 new type defs, 11 records expanded with new fields, KPI reconciliation per Step 10 |
| `src/lib/mock-data/manager/spec-detail-data.ts` | +~30 / -~210 — remove SpecStats/SPEC_STATS/getSpecStats/dailyTodayDetailTemplate; update file header |
| `src/components/manager/specialist-detail/sd-stats-strip.tsx` | -1 import, swap `getSpecStats(s.id).*` → `s.kpis.*`. ~-4/+4 |
| `src/components/manager/specialist-detail/sd-tab-overview.tsx` | Same pattern. ~-4/+4 |
| `src/components/manager/specialist-detail/sd-tab-workload.tsx` | Same pattern + `s.contractsCapacity` / `s.reviewsPendingNow` / `s.reviewsPendingCapacity` direct reads. ~-5/+5 |
| `src/components/manager/specialist-detail/sd-tab-daily.tsx` | Drop `dailyTodayDetailTemplate` import; add `<TodayActivitySummary>` sub-component composing per-spec copy from `s.todayActivity` discriminated by `dailyActivity.kind`. ~+55/-4 |
| `docs/manager/CONVERSION_LOG.md` | This entry |

### Verification — all green

| | | |
|---|---|---|
| (a) | `pnpm typecheck` clean | ✓ |
| (b) | `pnpm lint` baseline preserved (0 new) | ✓ |
| (c) | `pnpm build` clean — 177 routes preserved (no new, no removed) | ✓ |
| (d) | Specialist Detail renders for all 11 specialists with updated stat numbers | ✓ |
| (e) | Mateo self-adjustments still work (suppress Message + Schedule 1:1, "You" tag, etc.) | ✓ |
| (f) | Modal a11y unchanged | ✓ |
| (g) | `grep -rn "TODO(step-5)" src/` returns 0 | ✓ |
| (h) | `useSessionRole()` flip → all detail pages redirect (regression check) | ✓ |
| (i) | All other Specialist routes unchanged | ✓ |

### What's NOT in this audit (intentionally deferred)

- **Skills / specialization** — Step 8 Pool Coordination uses ROLE (already in Specialist). No skill-tagging surface in Steps 6-11.
- **Communication channels** — Step 13 (Specialist Chat) is out of scope here.
- **Audit history / coaching frequency** — Steps 5 + 6 don't reference per-specialist.
- **Hire success metrics breakdown** — Team aggregates only in Step 10; per-specialist breakdown not in any 6-11 surface.

If any of these surface in Steps 6-11 once we build them, address as a one-off Specialist extension (small) rather than another audit pass.

---

> **Note on log gap (resolved in Step 8 commit):** The Step 6 detailed entry below was added retroactively in Step 8's commit (`feat(manager): step 8 — Pool Coordination + Step 6 log backfill`). Original Step 6 commit (`a55ba3c`) only updated the table-row status flip.

---

## Session 1 — Step 6 — Daily Activity Audit (RETRO BACKFILL)

> Backfilled in Step 8's commit. Original commit: `a55ba3c` (May 18 2026).

**Goal:** First Manager-only ops route. `/specialist/daily-audit` — submission overview + timing chart + 11 audit rows (status-aware, single-accordion expand) + 14-day calendar strip. All 5 `landsInStep: 6` un-disable sites flipped.

### Files added (9)

| File | Role | Notes |
|---|---|---|
| `src/app/(specialist)/specialist/daily-audit/page.tsx` | Server | `ManagerRouteGuard` + `Suspense` (needed for `?row=` deep-link). |
| `src/components/manager/daily-audit/daily-audit-app.tsx` | Client | Orchestrator. Owns sort + expandedRowId + dateRange state. Reads `?row=spec-…` searchParam ONCE on mount; scrolls expanded row into center via `block: "center"` per Q2. |
| `src/components/manager/daily-audit/da-header.tsx` | Client | Eyebrow + title + dynamic subtitle + 4 date-range tabs (Today active; 3 disabled) + Custom date (modal step 14) + Submit Manager daily (disabled span — Step 11 flips). |
| `src/components/manager/daily-audit/da-status-overview.tsx` | Server | 4 status tiles computed live from team.ts dailyActivity discriminators. |
| `src/components/manager/daily-audit/da-timing-chart.tsx` | Server | 13 hour-buckets (6 AM-6 PM — extended past prototype's 7 AM for Min-Jun's 6:15 AM). Peak highlighted lime; >12 PM tinted amber. |
| `src/components/manager/daily-audit/da-audit-list.tsx` | Client | Toolbar (title + count + sort) + 11 sorted rows. 4 sort keys. |
| `src/components/manager/daily-audit/da-audit-row.tsx` | Client | Single audit row. 4-variant detail panel (SUBMITTED / PENDING / MISSED / EXCUSED). Mateo's custom buttons (Edit my submission disabled + View dashboard Link). ~390 LOC. |
| `src/components/manager/daily-audit/da-calendar-strip.tsx` | Server | 14-cell horizontal strip. Today rightmost. Weekend / late / miss / today tones. All cells non-interactive (historical day view deferred). |

### Files added — mock data (1)

| File | Purpose |
|---|---|
| `src/lib/mock-data/manager/daily-audit-data.ts` | Team-wide aggregate only: 14-day calendar strip days. Editorial notes intentionally skipped per Q5 (status-derived composed notes only). Per-channel detail tiles intentionally skipped per Q4 (4-count tiles from canonical `todayActivity`). |

### Files modified (6)

| File | Diff |
|---|---|
| `src/lib/mock-data/manager/manager-nav-items.ts` | `daily-audit` item: `disabled: true` removed. |
| `src/lib/mock-data/manager/manager-urgent-items.ts` | Card 1 ghost "Open daily audit": `href` added; `landsInStep: 6` dropped. |
| `src/lib/mock-data/manager/manager-snapshot.ts` | Card 2 (Daily activity): `disabledRoute` removed — auto-upgrades to Link. |
| `src/lib/mock-data/manager/manager-rail.ts` | `qa-audit-specialist` quick action: `href` added; `landsInStep: 6` dropped. **Type change:** `ManagerActionCTA.landsInStep` made optional (required for modal CTAs; vestigial for href-set CTAs). |
| `src/components/manager/dashboard/manager-action-placeholder-modal.tsx` | Modal body composition: fallback `"a future step"` + `"<label> — coming soon."` when `cta.landsInStep` is undefined. |
| `src/components/manager/dashboard/manager-dashboard-rail.tsx` | `QuickActionButton`: fork on `action.href` presence → `<Link>` vs `<button>`. Matches Step 5's pattern in `manager-urgent-section.tsx`. |
| `src/components/manager/specialist-detail/sd-hero.tsx` | "Audit daily" button → real `<Link href="/specialist/daily-audit?row={s.id}">`. Drop `AUDIT_DAILY_CTA` const. |

### Locked decisions (Step 6)

| | |
|---|---|
| **Trim (a)** | Channels section ("Most used channels" + "Reply rates by channel") dropped. Step 10 (Team Reports) is natural home. |
| **Row-click (Q1)** | Inline expand, single-accordion. |
| **`?row=` deep-link (Q2)** | Lazy-init on mount; scroll-into-view with `block: "center"`. |
| **Date-range tabs (Q3)** | Visible-but-disabled for Yesterday / 7d / 30d. |
| **Detail tile content (Q4)** | 4 generic activity-count tiles from `todayActivity` (Outreach / Check-ins / Interviews / Signups). Per-channel breakdown skipped — would need new per-spec data, violating audit-pass lock. |
| **Status-aware copy** | SUBMITTED "Today's activity" / PENDING "Today's activity so far" / MISSED + EXCUSED render NO tiles. |
| **Editorial notes (Q5)** | Skipped entirely. Status-derived composed notes only. |
| **Mateo's row (Q6)** | "Edit my submission" disabled span (Step 11 flips). "View dashboard →" real Link. No Approve/Flag/Clarify. |
| **Submit Manager daily (Q7)** | Disabled span. Step 11 flips. |
| **Status priority sort (Q10v)** | Default sort = Missed → Pending → Excused → Submitted, alphabetical within. |
| **Timing chart range** | Extended to 6 AM (vs prototype's 7 AM) for Min-Jun's 6:15 AM. 13 buckets. |
| **`landsInStep` optional** | Type-level tweak so canary `grep "landsInStep: N"` returns 0 once a step's CTAs flip. Defensive modal fallback. |

### Un-disable pass — all 5 sites resolved

| Site | Before | After |
|---|---|---|
| Sidebar "Daily Activity Audit" | disabled | active Link |
| Dashboard urgent card 1 ghost "Open daily audit" | modal | `<Link>` |
| Dashboard snapshot card 2 (Daily activity) | disabled | `<Link>` |
| Dashboard rail quick action "Audit a Specialist" | modal | `<Link>` |
| Specialist Detail hero "Audit daily" | modal | `<Link>` with `?row=` |

### Step 6 verification (a-u, all green)

(a) Route renders for Managers · (b) Redirects on role/mode fail · (c) Status overview counts from team.ts · (d) Timing chart bars match submission times · (e) All 11 rows render · (f) Sort dropdown re-orders rows · (g) Click row expands/collapses; single-accordion · (h) `?row=spec-priya-mehra` pre-expands + scrolls to center · (i) Mateo's row custom buttons · (j) Status-specific notes + actions for missed/pending/excused · (k) Calendar strip 14 cells · (l-p) All 5 un-disable sites → real Links · (q) typecheck + lint + build clean. 178 routes (+1 from Step 5) · (r) Role flip redirects · (s) `grep "TODO(step-6)" src/` returns 0 · (t) `grep "landsInStep: 6" src/` returns 0 · (u) Modal a11y unchanged.

### Architectural primitives introduced

- **`ManagerActionCTA.landsInStep` made optional** — so href-set CTAs don't carry vestigial step metadata.
- **`href`-fork pattern in `QuickActionButton`** — consistent with `manager-urgent-section.tsx` from Step 5.

---

## Session 1 — Step 8 — Pool Coordination + Step 6 log backfill

**Goal:** Third Manager-only ops route. `/specialist/pool-coordination` — 4 totals tiles + 3 coordination opportunity cards + 10-category grid + sprint priorities card. All 3 `landsInStep: 8` un-disable sites + sidebar disabled flag flipped. Plus retro Step 6 log entry (see above) per "don't let log integrity rot" instruction.

### Files added (9)

| File | Role | Notes |
|---|---|---|
| `src/app/(specialist)/specialist/pool-coordination/page.tsx` | Server | `ManagerRouteGuard` + `Suspense` (needed for `?focus=` deep-link). |
| `src/components/manager/pool-coordination/pool-coordination-app.tsx` | Client | Orchestrator. Owns dateRange state + reads `?focus=` searchParam ONCE on mount. Scrolls matching category card into center via `block: "center"` per Q1. Auto-clears focus state after 2s so ring fades. |
| `src/components/manager/pool-coordination/pc-header.tsx` | Client | Eyebrow + title + dynamic subtitle (counts computed live) + 3 date-range tabs (Today active; 7d / 30d disabled per Q5) + Export (modal step 14). |
| `src/components/manager/pool-coordination/pc-totals-strip.tsx` | Server | 4 tiles: Total candidates (sum) / Strong pools / Stable+Steady / ⚠ Needs attention (depleted+overflowing). All computed live. |
| `src/components/manager/pool-coordination/pc-opportunities-section.tsx` | Client | 3 opportunity cards (each has 2 modal-trigger buttons). Sub-component `OpportunityCard` inlined. Tone forks: urgent / warn / info with distinct icons. |
| `src/components/manager/pool-coordination/pc-categories-grid.tsx` | Server | Responsive grid wrapper (1 / 2 / 3 / 4 cols). Forwards `focusedCategoryId` + ref-registration to each card. |
| `src/components/manager/pool-coordination/pc-category-card.tsx` | Client | Single category card. 5-status fork + Mateo "self" variant. Pool bar with threshold marker (capped at 100% for overflowing). Inlined sub-components for metrics + action buttons. ~390 LOC. |
| `src/components/manager/pool-coordination/pc-sprint-priorities.tsx` | Client | Sprint priorities card with 3 prioritized rows (rank badge colored per priority). Each row "Launch sprint →" → modal step 9. Footer Diego-surplus note. Defensive `category-not-found` guard on each row. |

### Files added — mock data (1)

| File | Purpose |
|---|---|
| `src/lib/mock-data/manager/manager-pool-coordination-data.ts` | **Canonical pool domain.** Type defs (`PoolCategory`, `PoolCategoryStatus`, `PoolTrend`, `CoordinationOpportunity`, `CoordinationOpportunityTone`, `SprintPriority`) + 10 category records + 3 opportunities + 3 sprint priorities + lookups (`getCategory`, `getCategoriesByStatus`) + 6 display helpers (`getCategoryLabel`, `statusPillLabel`, `trendArrow`, `trendLabel`, `thresholdLabel`, `isCategoryOwnedByManager`). **Module-load assertion** (`assertSprintPriorityCategoriesValid`) fail-fasts if a sprint priority references an unknown category. |

### Files modified (4)

| File | Diff |
|---|---|
| `src/lib/mock-data/manager/manager-nav-items.ts` | `pool-coordination` item: `disabled: true` removed. |
| `src/lib/mock-data/manager/manager-urgent-items.ts` | Card 3 (Pool depletion) ghost: `href: ".../?focus=customer-support"` deep-link; drop `landsInStep`. Card 6 (Sprint forecast) ghost: `href: ".../?focus=bookkeeping"` deep-link; drop `landsInStep`. |
| `src/lib/mock-data/manager/manager-snapshot.ts` | Snapshot card 5 (Pool health): `disabledRoute` removed — auto-upgrades to real Link. |
| `docs/manager/CONVERSION_LOG.md` | This entry + Step 6 retro backfill |

### Locked decisions (Step 8)

| | |
|---|---|
| **No trim — full scope** | Accepted ~5% LOC overrun. Step 8's value is in showing all 3 sections (totals + opportunities + categories + priorities). |
| **`?focus=` deep-link (Q1)** | `?focus=<category-id>` reads ONCE on mount; orchestrator scrolls matching card into center (`block: "center"` per Step 6's pattern) + applies lime ring overlay via `data-pc-focused` + `ring-2 ring-lime` for 2 seconds, then auto-clears. |
| **Static cards (Q2)** | No expand/collapse — action buttons live directly on each card. Matches prototype. |
| **Action targets (Q3)** | Run sprint / ⚡ Redirect → modal step 9. View health / Reassign / View my health / Sourcing → modal step 14. "View <Name> →" → real Link `/specialist/team/[id]?tab=overview` (explicit `?tab=` for Step 5 consistency per refinement). |
| **Bookkeeping single-owner (Q4)** | Diego only. Olena (also Bookkeeping role) is coverage backup, NOT category owner. Documented in data file header — single-owner rule applies to any future multi-specialist role. |
| **Date-range tabs (Q5)** | Visible-but-disabled for 7d / 30d. Same pattern as Steps 5/6/7. |
| **Canonical role labels (Q7)** | Category labels derive from `getSpecialist().role` (canonical SpecialistRole union). "Marketing Operations" → "Marketing Ops" (canonical). Prototype's "Marketing Operations" rendering is artifact; we always render the canonical short form. **Pre-existing minor inconsistency flagged:** Step 7's `disputesByRoleCategory` patterns data carries freeform `"Data Ops"` label that mismatches canonical `"Data Operations"` — not retroactively fixed in this commit; future cleanup. |
| **Sprint slug verification (Q9w)** | Module-load assertion `assertSprintPriorityCategoriesValid()` fail-fasts if any `SprintPriority.categoryId` doesn't resolve. Plus defensive `category-not-found` guard at render time in `PriorityRow`. |
| **Mateo's self-card** | Lime ring (`ring-1 ring-lime/40`) on card root + "You" tag on owner row + custom buttons: "View my health" (lime tint) + "Sourcing" — no self-link. |

### Un-disable pass — all `landsInStep: 8` sites resolved

| Site | Before | After |
|---|---|---|
| Sidebar "Pool Coordination" item | disabled span | active Link with active-state styling |
| Dashboard urgent card 3 ghost "Pool coordination" | modal trigger | `<Link>` to `/specialist/pool-coordination?focus=customer-support` |
| Dashboard urgent card 6 ghost "View forecast" | modal trigger | `<Link>` to `/specialist/pool-coordination?focus=bookkeeping` |
| Dashboard snapshot card 5 (Pool health) | disabled wrapper | real `<Link>` (auto-upgrade via `disabledRoute` removal) |

### Known friction (Step 8)

- **Action buttons mostly land in modals.** Run sprint / Redirect → step 9 (Recruitment Sprints). View health / Reassign / Sourcing → step 14 (generic catch-all). Cross-category coordination flows (3 opportunity cards × 2 actions) all → step 14.
- **Pool bar fill is capped at 100%.** Overflowing pools (Bookkeeping 45/25) render the bar at 100% with the threshold marker at ~56%. The "+20 over target" metric tile carries the actual overshoot.
- **Sprint priorities are editorial, not derived.** The 3 ranked records don't auto-compute from category status (e.g. "all depleted categories first"). Locked content per prototype.
- **Date-range tabs disabled.** 7d / 30d historical views deferred.
- **Step 7 `Data Ops` label inconsistency** — `disputesByRoleCategory[5].category === "Data Ops"` in Step 7's patterns data; canonical is "Data Operations". Pre-existing; flagged for future doc-cleanup.

### Step 8 verification (a-w — all green)

| | | |
|---|---|---|
| (a)-(b) | Route renders for Managers; redirects on role/mode fail | ✓ |
| (c) | Totals: 187 / 5 strong / 3 stable+steady / 2 needs-attention (1 depleted + 1 overflowing) | ✓ |
| (d) | All 10 cards render | ✓ |
| (e) | Status pills + pool bars colored per status | ✓ |
| (f) | Mateo's VAs card: lime ring + "You" tag + custom buttons (View my health lime + Sourcing) | ✓ |
| (g) | Non-self cards: Run sprint (depleted) / ⚡ Redirect (overflowing) / View health / View Name → (real Link) | ✓ |
| (h) | 3 opportunity cards: tone-tinted left borders + icons + 2 actions each | ✓ |
| (i) | Sprint priorities: 3 rows + Diego footer note | ✓ |
| (j) | `?focus=customer-support` URL scrolls to card + briefly rings | ✓ |
| (k) | Date-range tabs: Today active, 7d/30d disabled | ✓ |
| (l) | Sidebar "Pool Coordination" active when on route | ✓ |
| (m) | Dashboard urgent card 3 ghost → real Link with `?focus=customer-support` | ✓ |
| (n) | Dashboard urgent card 6 ghost → real Link with `?focus=bookkeeping` | ✓ |
| (o) | Snapshot card 5 → real Link | ✓ |
| (p) | typecheck + lint + build clean. **180 routes** (179 + 1) | ✓ |
| (q) | `useSessionRole()` flip → redirects | ✓ |
| (r) | `grep "TODO(step-8)" src/` returns 0 | ✓ |
| (s) | `grep "landsInStep: 8" src/` returns 0 | ✓ |
| (t) | Modal a11y unchanged | ✓ |
| (u) | Bookkeeping card attributes to Diego only (not Olena) | ✓ |
| (v) | Marketing Ops card reads "Marketing Ops" (canonical), not prototype's "Marketing Operations" | ✓ |
| (w) | All 3 sprint priority `categoryId` values resolve to real `PoolCategory.id` (module-load assertion + render-time guard + string-based double-check) | ✓ |

### Architectural primitives introduced

- **Module-load assertion pattern** — `assertSprintPriorityCategoriesValid()` runs at import time, fail-fasts on data drift. Apply to any future data files where one collection references IDs from another.
- **`?focus=` deep-link with auto-clearing ring** — orchestrator owns focus state, auto-clears after 2s. Different shape from Step 6's `?row=` (which persists the expanded row) — Step 8's focus is ephemeral signal, not persistent state.
- **Single-owner category rule** — documented for multi-specialist role coverage scenarios. Future role categories with multiple specialists follow same convention.

### Up next

- **Step 9 — Recruitment Sprints.** `/specialist/recruitment-sprints` Manager-only route. Goal banner ($30-candidate weekly target) + 4-tile totals + 4 active sprint cards (Aisha behind, Yara on-track, Naomi ahead, Lucas — 4th from prototype) + sprint history. Un-disables: dashboard urgent card 3 primary "Run sprint" + card 6 primary "Start sprint" + sidebar "Recruitment Sprints" + Pool Coordination card actions ("Run sprint", "⚡ Redirect", "Launch sprint" from sprint priorities). Big un-disable pass — all sprint-launching CTAs across Steps 7 + 8 flip to real Links.

---

## Session 1 — Step 7 — Team Disputes + canonical dispute domain

**Goal:** Second Manager-only ops route. `/specialist/team-disputes` — 12 open dispute rows + 6-chip filter bar + 4-tile status overview + 3-card patterns section. All 4 `landsInStep: 7` un-disable sites flipped. Both `TODO(step-7)` markers in `manager-active-items.ts` cleared via canonical-dispute-domain refactor. **Bonus** Step 4 leftover dead-disable on active-items column 1 also flipped.

### Files added (9)

| File | Role | Notes |
|---|---|---|
| `src/app/(specialist)/specialist/team-disputes/page.tsx` | Server | Wraps `<TeamDisputesApp />` in `<ManagerRouteGuard>` + `<Suspense>` (required for `useSearchParams` reading `?filter=` deep-link). |
| `src/components/manager/team-disputes/team-disputes-app.tsx` | Client | Orchestrator. Owns filter + sort + expandedRowId state. Reads `?filter=` searchParam ONCE on mount via `isFilterKey()` type-guard. Resets expanded row on filter change. |
| `src/components/manager/team-disputes/td-header.tsx` | Client | Eyebrow + title + dynamic subtitle (computed from disputes) + Export (modal step 14) + Message owners (modal step 13). |
| `src/components/manager/team-disputes/td-status-overview.tsx` | Server | 4 tiles: Total open · ⚠ SLA at risk · In progress · Escalated. "Across N Specialists" caption from unique owner count. |
| `src/components/manager/team-disputes/td-filter-bar.tsx` | Client | 6 single-select chips with derived counts. Exports `matchesFilter()` predicate + `isFilterKey()` type-guard (shared with orchestrator). SLA-risk chip danger-tinted. |
| `src/components/manager/team-disputes/td-dispute-list.tsx` | Client | Toolbar (meta + sort) + filtered+sorted rows + empty state with reset button. Default sort `sla` ascending, severity desc + age desc tiebreaks. |
| `src/components/manager/team-disputes/td-dispute-row.tsx` | Client | Single row with collapsible quick-actions. 5-way action fork (Mateo / Escalated / SLA-urgent / First / Default+contested). ~380 LOC (under 400 watch). |
| `src/components/manager/team-disputes/td-patterns-section.tsx` | Server | 3 cards (Volume / Category / Resolution time). Sub-components inlined. |

### Files added — mock data (2)

| File | Purpose |
|---|---|
| `src/lib/mock-data/manager/manager-team-disputes-data.ts` | **Canonical dispute domain.** Type defs (`Dispute`, `DisputeId`, `DisputeStatus`, `DisputeReason`, `DisputeInitiator`, `SlaBand`) + 12 dispute records + lookups (`getDispute`, `getDisputeStrict`) + 9 display helpers (`disputeTitleParts`, `disputeReasonLabel`, `disputeInitiatorLabel`, `disputeInitiatorIsBold`, `slaBand`, `slaLabelSuffix`, `slaHoursLabel`, `disputeAgeLabel`, `isOwnedByManager`). **DSP-2026-04-12 is THE canonical dispute** — Sofia × Quill, owned by `MANAGER_SPECIALIST_ID`. File header documents this lock. |
| `src/lib/mock-data/manager/manager-team-disputes-patterns.ts` | Team-wide 30-day historical aggregates (NOT derived from 12 currently-open). 3 datasets: `disputeVolumePerSpecialist` (8 rows) · `disputesByRoleCategory` (8 rows) · `avgResolutionTimePerSpecialist` (7 rows) + 2 insight strings. |

### Files modified (7)

| File | Diff |
|---|---|
| `src/lib/mock-data/manager/team.ts` | **New const:** `MANAGER_SPECIALIST_ID = "spec-mateo-vargas" as const`. Header doc-block explains the lock. All future "is this Mateo?" checks reference this constant. |
| `src/lib/mock-data/manager/manager-nav-items.ts` | `team-disputes` item: `disabled: true` flag removed. Badge TODO note updated. |
| `src/lib/mock-data/manager/manager-urgent-items.ts` | Card 2 primary: `href` added, `landsInStep: 7` dropped. Card 2 ghost: `href` with `?filter=sla-risk` deep-link added, `landsInStep` + `description` dropped. |
| `src/lib/mock-data/manager/manager-snapshot.ts` | Snapshot card 3 (Open disputes): `disabledRoute` removed — auto-upgrades to real Link via existing fork. |
| `src/lib/mock-data/manager/manager-active-items.ts` | **TODO(step-7) refactor.** `ActiveDisputeRow` extended with `disputeId: DisputeId`. New `buildDisputeRow()` helper derives title/SLA-tag/owner from canonical dispute. 4 dispute rows shrink to 5 LOC each. `isOwnedByManager()` replaces inline string compare. Both TODO markers removed. |
| `src/components/manager/dashboard/manager-active-items-section.tsx` | **Step 4 + Step 7 active-items un-disable.** `ColumnLinkSpec` discriminated union (`{ href }` → `<Link>`; `{ landsInStep }` → disabled span). Column 1 (Specialists) + Column 2 (Disputes) both flip. Column 3 (Activity feed) stays at `landsInStep: 10`. 4 links flipped from disabled span → real Link. |
| `docs/manager/CONVERSION_LOG.md` | This entry |

### Locked decisions (Step 7)

| | |
|---|---|
| **Dispute record shape (Q8)** | Type `Dispute` carries `client`, `candidate`, `ownerSpecialistId`, `status`, `reason`, `initiator`, `severity`, `ageHours`, `slaHours`, `isFirstForOwner?`. Candidates inline strings (NOT in team.ts). Sofia × Quill = `DSP-2026-04-12`, owned by `MANAGER_SPECIALIST_ID`. |
| **Title convention (Q8 + Q11x)** | `disputeTitleParts(d)` returns ordered fragments. Candidate-initiated → candidate first (italicized). Client-initiated → client first (candidate italicized). Contested → client first (default). Verified: Sofia × Quill candidate-first; Lumio × Felipe client-first; Quill × Min-Jun contested client-first. |
| **SLA bands (Q4)** | `<24h` urgent · `<48h` warn · `>=48h` neutral · escalated → neutral (status badge owns urgency). Label suffix: "to SLA" for open/progress, "to admin" for escalated. |
| **Filter semantics (Q2)** | Single-select. Predicate `matchesFilter()` exported (shared between filter bar + list). 6 keys: `all` / `sla-risk` / `contested` / `first` / `escalation` / `mine`. |
| **Default sort (Q3)** | `sla` ascending, severity desc tiebreak, age desc tiebreak. |
| **Row expansion (Q1)** | Inline expand, single-accordion. Filter change resets expansion. |
| **Mateo's row (Q5 + Q6)** | DSP-2026-04-12 quick-actions: "Open dispute →" (modal 14) + "View as Specialist" → real Link to `/specialist/team/spec-mateo-vargas?tab=performance` (Performance tab houses dispute stats; no standalone Disputes tab in Step 5). |
| **MANAGER_SPECIALIST_ID const (Q10)** | Exported from `team.ts`. Single source-of-truth. |
| **Patterns section retained** | 30-day historicals in separate file. NOT derived from open disputes. Mateo at 3 disputes historical (Q9). |
| **Active-items leftover** | Step 4 column 1 links (View team / Open team directory →) were still disabled because `Column` lacked href support. Step 7 fixes both columns. |

### Un-disable pass — all `landsInStep: 7` sites resolved

| Site | Before | After |
|---|---|---|
| Sidebar "Team Disputes" item | disabled span | active Link |
| Dashboard urgent card 2 primary "Open team disputes" | modal trigger | `<Link>` to route |
| Dashboard urgent card 2 ghost "Filter by SLA" | modal trigger | `<Link>` to route with `?filter=sla-risk` |
| Snapshot card 3 (Open disputes) | disabled wrapper | real `<Link>` |
| Active-items col 2 header "View all" | disabled span | `<Link>` |
| Active-items col 2 footer "Open team disputes →" | disabled span | `<Link>` |
| **Bonus** Active-items col 1 header "View team" | disabled (leftover Step 4) | `<Link>` to `/specialist/team` |
| **Bonus** Active-items col 1 footer "Open team directory →" | disabled (leftover Step 4) | `<Link>` to `/specialist/team` |

### Known friction (Step 7)

- **Per-dispute detail page deferred.** "Open dispute →" triggers placeholder modal. Future step.
- **Patterns section NOT computed from canonical 12 disputes** — 30-day historicals in separate file. Future: replace with derived rollups when historical records exist.
- **Sort by Specialist sorts by id slug**, not display name. Adequate for Step 7.
- **Empty state hard to reach** — every filter currently matches ≥1 row. State exists for safety + future filter composition.

### Step 7 verification (a-w + x — all green)

| | | |
|---|---|---|
| (a)-(b) | Route renders for Managers; redirects on role/mode fail | ✓ |
| (c) | Status overview: 12 / 3 / 5 / 1 from canonical data | ✓ |
| (d)-(g) | 12 rows render; chip filter works; sort dropdown works; single-accordion expand works | ✓ |
| (h) | `?filter=sla-risk` deep-link pre-activates filter | ✓ |
| (i) | Mateo's DSP-2026-04-12 row: "Open dispute →" + "View as Specialist" only (no Intervene / Message / Coach) | ✓ |
| (j) | Empty state + reset button | ✓ |
| (k)-(m) | Patterns section 3 cards correct; Mateo 3 disputes; Priya 70h urgent | ✓ |
| (n)-(s) | All 6 un-disable sites + 2 bonus active-items links → real Links; "Disputes need oversight" still renders 4 rows via canonical refactor | ✓ |
| (t) | typecheck + lint + build clean. **179 routes** (178 + 1 new) | ✓ |
| (u) | `useSessionRole()` flip → redirects | ✓ |
| (v) | `grep -rn "TODO(step-7)" src/` returns 0 | ✓ |
| (w) | `grep -rn "landsInStep: 7" src/` returns 0 | ✓ |
| (x) | Title convention spot-check (3 disputes) all correct | ✓ |

### Architectural primitives introduced

- **`MANAGER_SPECIALIST_ID` const** in team.ts — single source-of-truth for "is this Mateo?" checks. Future steps reference this rather than inline strings.
- **`DisputeId` template-literal type** `DSP-${string}` — compile-time hint without locking date format.
- **Canonical dispute domain pattern** — `getDispute` + `getDisputeStrict` lookups. Other steps reference `DSP-*` IDs without redefining records.
- **`ColumnLinkSpec` discriminated union** — `{ href } | { landsInStep }`. Same fork pattern as `ManagerActionCTA` + `QuickActionButton`.

### Up next

- **Step 8 — Pool Coordination.** `/specialist/pool-coordination` Manager-only route. 10 role-category cards (depleted / steady / strong / overflowing) + 3 coordination opportunity cards + cross-category overview grid. Un-disables: sidebar "Pool Coordination" item + any pool-related dashboard CTAs. New canonical data domain `manager-pool-coordination-data.ts` for role categories.

---
