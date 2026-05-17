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

- Step 4 — My Team. Lands the full 11-Specialist roster in `team.ts` and refactors all `TODO(step-4)` sites in dashboard mock data to use canonical `spec-*` ids. First Manager-only route enabled in the sidebar (`/specialist/team` Link replaces disabled span).

---
