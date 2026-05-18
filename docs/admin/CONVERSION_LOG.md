# Admin Interface Conversion Log

Single-source-of-truth for converting Atlas Admin Interface from `reference/admin.html` into a Next.js application. Updated after every step completes.

---

## Current Status

- **Current step:** 13 — Reviews · pending SCOPE DISCOVERY
- **Last finished:** 29 — Platform Settings · Pass A/B/C complete (page header · 5 categories · 24 settings · demo modal)
- **Total progress:** 13 of 37 steps complete (35%)
- **Routes shipped:** 206 (of ~110+ planned)
- **Sidebar groups complete:** 1 of 7 (Users); Platform Settings launched
- **Session 2 status:** ✅ CLOSED — all 12 steps shipped (signin / dashboard / profile / users / candidate / client / specialist / manager / admins / engagements / jobs / disputes)
- **Session 3 status:** ⏳ IN PROGRESS — Step 29 shipped; Step 13 queued

**Quick links:**
- [Sidebar group progress ↓](#sidebar-group-progress)
- [Build rules ↓](#build-rules)
- [Restrictions ↓](#restrictions)
- [Completed steps (1–12) ↓](#completed-steps-1-12)
- [Step 13 — Reviews (current) ↓](#step-13--reviews-current)
- [Pending steps (14–37) ↓](#pending-steps-14-37)
- [Metrics & design tokens ↓](#metrics--design-tokens)
- [Durability rule ↓](#durability-rule)

---

## Sidebar Group Progress

| Group | Status | Steps Done | Steps Pending |
|---|---|---|---|
| 1. Users | ✅ 5/5 complete | 5, 6, 7, 8, 9 | — |
| 2. Operations | 🔧 3/5 (60%) | 10, 11, 12 | 13, 14 |
| 3. Trust & Safety | ⏳ 0/4 not started | — | 15, 16, 17, 18 |
| 4. Finance | ⏳ 0/5 not started | — | 19, 20, 21, 22\*, 23 |
| 5. Compliance | ⏳ 0/5 not started | — | 24, 25, 26\*, 27\*, 28\* |
| 6. Platform Settings | ✅ 1/5 (20%) | 29 | 30–33\* |
| 7. Internal | ⏸ 0/4 deferred | — | 34\*–37\* |

\* = deferred (sidebar link only, no HTML view source yet)

**Pre-group special steps (chrome / scaffolding):**
- Step 1 Admin Sign In ✅
- Step 2 Admin Dashboard ✅
- Step 3 Admin Profile & Permissions ✅
- Step 4 Users Overview ✅

---

## Build Rules

These rules apply to every step. Established across Sessions 1–2, binding for Session 3+.

### CHECK-then-BUILD methodology

Every step follows: **SCOPE DISCOVERY → CHECK → user approval → BUILD → browser verification → push.** The user explicitly approves with "yes proceed with phase Xa build on hoor_v1" before code is written.

### Tailwind-only constraint

Zero new CSS in `globals.css`. All styling via Tailwind utilities with **SHORT-form** tokens (`var(--ink)`, `var(--paper)`, etc.). Confirmed across Steps 10–12 (0 `globals.css` mutations).

### Verbatim parity

Canonical fixtures (e.g., `dsp-144`, `eng-004`, `job-001`) match `admin.html` source 100%. Stub fixtures (other 9 per entity) populated by `stubSections`-style helpers with role-coherent fillers.

### Source-of-truth: admin.html

Every CHECK quotes `admin.html` line numbers and CSS line numbers. No invented patterns — all from source.

### CHECK element-level enumeration (post-Phase-12a)

After Phase 12a drift (25 items surfaced post-build), CHECK must include:
- Every fixture ID enumerated explicitly
- Every status pill text verbatim per fixture per section
- Every column header verbatim
- Every CSS line number quoted
- Every cross-link target verified against existing fixtures

### Hash-to-URL routing

Sidebar hash links (`#disputes`) map to real Next.js routes (`/admin/operations/disputes`). Sidebar matcher branch added per entity group.

### Per-page shells

No `OperationsShell` abstraction. Each entity gets its own shell components under `src/components/admin/operations/{entity}/`.

### Folder structure (binding — enforced by AI_RULES.md §3.6 + FOLDER_STRUCTURE.md)

**Routes:**
- Main admin views → `src/app/(admin)/admin/<feature>/page.tsx`
- Admin auth views → `src/app/(admin-auth)/admin/<auth-route>/page.tsx`
- Detail routes use dynamic segments → `src/app/(admin)/admin/users/candidates/[id]/page.tsx`

**Components (admin-only UI):**
- `src/components/admin/shell/` — layout, topbar, sidebar, preview panel
- `src/components/admin/auth/` — signin form, OTP, timeout modal
- `src/components/admin/<feature>/` — feature-specific components (one folder per step's view)

**Mock data:**
- ALL `.ts` data files → `src/lib/mock-data/admin/`
- Barrel re-exports in `src/lib/mock-data/admin/index.ts`
- Components import via `@/lib/mock-data/admin/<file>` (direct path, not barrel)

**Client state / context:**
- `src/lib/admin/<feature>-state-context.tsx`
- Never under `src/components/`

**Hard invariants:**
- ❌ NO `.ts` data files under `src/components/`
- ❌ NO components or JSX under `src/lib/`
- ❌ NO Tailwind utility classes for raw hex colors — use design tokens (`bg-restricted`, `bg-restricted-bg`, `bg-super`, etc.) defined in `src/app/globals.css` `@theme`
- ❌ NO inline `style={{ color: '#8B1A1A' }}` — always Tailwind classes
- ✅ Always Tailwind. No CSS modules, no styled-components.
- ✅ Server Components by default. `'use client'` only where needed (state, scroll listeners, modals).
- ✅ Reuse `AdminPreviewPanel` from layout — never re-import or duplicate it inside a step's page.

### Reusable component patterns (catalog)

Established and reusable across entities:

1. **AdminStatsRow** (Phase 9b) — 4-tile unified stats card with delta + meta variants
2. **Filter chip pattern** (Phase 9b / 10a / 11a / 12a) — pill chips with active ink-inverted state + count badge
3. **cd-section pattern** — `py-36 + border-top + scroll-margin-top:80px + first-child overrides`
4. **cd-rail with straddle scroll-spy** — `rect.top <= 100 && rect.bottom > 100` algorithm; hydration-safe useEffect hash init
5. **cd-wrap 1400px detail wrapper** — `cd-body 280/32` grid (Phase 10c rail-fix dimensions)
6. **Row selection lime visual** (Phase 11a + 12a urgent-override) — `bg-[rgba(214,242,77,0.10)]` + 2px `var(--lime-deep)` `::before` stripe; urgent rows keep red 3px real `border-l` and red darker bg on selection
7. **Real-tag chip pattern** (Phase 10a / 10c / 11a) — super-purple inline chip for real-legal-entity disclosure
8. **Status pill with `::before` symbols** — semantic HTML pseudo-character prefix (↑ ⚠ ✓ ★)
9. **Timeline pattern** (Phase 7jk → reused in 11b intervention + 12b audit) — day-grouped entries, `data-cat` driven dot colors, tag variants
10. **5-stage tracker** (Phase 12a) — reusable for any 5+ step lifecycle (dispute / future workflows)
11. **Decision allocation viz** (Phase 12b) — 2-col split with `dds-amount.neg` danger / `.pos` success
12. **Cross-entity Next.js Link** — bidirectional cross-references (eng-004 ↔ dsp-144 verified)
13. **Global ⌘K search** — 8 entity types, 59 records, 8 distinct chip color variants

### Documented conversion patterns (originated in Phase 5 commits)

1. **Design token naming in arbitrary brackets:** Always use SHORT aliases from `:root` block (e.g., `var(--line)` not `var(--color-line)`) when using arbitrary bracket notation. SHORT aliases resolve correctly; LONG form from `@theme` silently falls back.

2. **Fraunces font optical sizing:** Use `font-display` utility for font-family PLUS separate `[font-variation-settings:'opsz'_96]` arbitrary class for optical sizing. The `font-display` utility alone sets only the font-family; optical sizing requires the variation-settings override.

3. **Status pill pseudo-elements with currentColor:** Implement `::before` / `::after` dots/icons as semantic HTML divs (not CSS pseudo-elements) when they need to inherit color from parent. Pattern: `before:content-[''] before:bg-[currentColor]` makes the dot inherit the text color of its container.

4. **Outcome label vs. variant data structure:** Store outcome as an object with two fields. Shape: `outcome?: { label: string; variant: 'success' | 'partial' | 'escalated' }`. The `label` is the display text; `variant` is the CSS class selector. Allows specific labels per event type while sharing color logic.

5. **Avatar initials as explicit data, not derived:** Add `initials: string` field to data interfaces. Do NOT derive initials from name parsing — multi-word names like "The Lagos Loom" produce "TL" instead of intended "LL". `admin.html` hardcodes initials per row; store them as data.

6. **Day-grouped lists (Pattern X — single card, inline header dividers):** When `admin.html` shows grouped content (audit days, threads by date, engagement history by year), the structure is ONE card with header dividers inside, not MULTIPLE cards per group. Headers use `paper-deep` / `cream` bg + border lines for visual separation. Store a `dayGroup?: { label, count }` field on the FIRST entry of each group; render emits a divider when the field is present. Labels are bespoke and must be stored as data, not computed from timestamps.

7. **Right rail scroll-spy with smooth-scroll:** Client Component with `useState(activeKey)` + `useEffect` + `IntersectionObserver` (`rootMargin: '-80px 0px -60% 0px'`, `threshold: 0`). Cleanup function disconnects observer on unmount. On TOC click: prevent default, scroll target into view `{ behavior: 'smooth', block: 'start' }`, manually set `activeKey`. Use `truncate` Tailwind class (not text-overflow-ellipsis). SHORT-form tokens throughout. (Phase 11a / 12a replaced IntersectionObserver with straddle algorithm to fix skip bug on short sections — both patterns valid depending on section sizing.)

### Status-text per-fixture rule (Phase 11 drift-fix lesson)

Every section's status pill text is a `statusText: string` field on the fixture's section data — NOT hardcoded in the component, NOT derived. This prevents drift when stub fixtures need different copy than canonical ones.

### Overflow-hidden on td-cells (Phase 12a drift-fix lesson)

Every list-table `td-cell` (Status, Reason, Elapsed, SLA, Owner) gets `overflow-hidden` so wide pills (e.g., "SPECIALIST DECIDING" mono uppercase) clip at cell edge rather than bleeding into adjacent columns.

### Real CSS border-left for priority over selection pseudo (Phase 12a fix lesson)

Urgent rows use a real CSS `border-l-[3px] border-l-[var(--danger)]` (not a `::before` pseudo) so the urgency indicator coexists with the selection `::before` stripe. Selected urgent rows preserve the red border-left and switch to a **darker red** bg (not lime).

---

## Restrictions

### Scope limits

- **Admin interface only** — Specialist (`/specialist/*`), Public landing (`/` and `(marketing)`), Candidate, and Client interfaces are owned by other sessions. Do not touch.
- **No backend logic** — All presentational; mock data via fixtures only.
- **No auth integration** — Sign-in is form-only (no API).
- **Sidebar-only items (deferred)** — Steps 22, 26, 27, 28, 29–37 have sidebar links but no HTML view source. Build only when `admin.html` source is extended. Same precedent as Steps 13–40 had during Session 2 (only built once HTML existed).

### Code rules

- **Zero new `globals.css`** across Steps 10–12+ (maintained going forward).
- **No `admin.html` class names** on JSX (translate every class to Tailwind arbitrary-value utilities).
- **TypeScript strict** with `exactOptionalPropertyTypes`.
- **No invented routes** — only routes that exist in `admin.html` breadcrumbs or sidebar.

### Workflow rules

- Each step requires user approval (`"yes proceed with phase Xa build on hoor_v1"`) before BUILD.
- Build does NOT commit — user pushes manually.
- Drift fixes ship in separate small fix prompts, not folded into next step.
- `CONVERSION_LOG.md` updated in same commit as step's code.

### Singleton-route flags

- **Step 8 Manager** — Atlas currently has one Manager of Talent Specialists (Mateo Vargas, `mgr-001-v8b2c4`). The singleton route lives at `/admin/users/managers/mgr-001-v8b2c4`. If future product decisions add other manager roles, the route may need to migrate to `/admin/users/managers/[id]`. Flag for review at that point.

---

## Completed Steps (1–12)

### Step 1 — Admin Sign In

- **Status:** ✅ Done
- **Session:** 2
- **Routes:** `/admin/signin`
- **HTML lines:** 12569–13331
- **Files:** `src/components/admin/signin-form.tsx`, `src/components/admin/timeout-modal.tsx`, `src/lib/admin/signin-state-context.tsx`, `src/components/admin/admin-preview-panel.tsx`, `src/app/admin/layout.tsx`, `src/components/ui/icons.tsx`
- **Notes:** 2FA, CAPTCHA, lockout, anomaly detection states; preview panel refactored to layout level with React Context for state sharing.
- **Step 1 fixes & refactors applied:**
  - **Preview panel positioning** (commit `bb33f8a`): Fixed floating position to match `admin.html` (`bottom-5 right-5`, `max-h-[70vh] overflow-y-auto`). Panel floats in bottom-right corner without pushing page content.
  - **Preview panel refactor to shared component + Context fix** (Phase 1):
    - Renamed `SignInPreviewPanel` → `AdminPreviewPanel`
    - Added 15-tab view switcher (Signin · Dash · Profile · Users · Cand · Clnt · Spec · Mgr · Adm · Eng·List · Eng·Detail · Job·List · Job·Detail · Disp·List · Disp·Detail + locked Rev tab)
    - Moved panel from `/src/components/admin/signin-form.tsx` to `/src/app/admin/layout.tsx` so it wraps all admin routes
    - Created React Context (`SignInStateContext`) at `/src/lib/admin/signin-state-context.tsx` to share sign-in state between panel and form without prop drilling
    - Panel state buttons update the form in real-time
    - `TimeoutModal` moved from signin-form to layout level
    - Design tokens used for colors (no raw hex)
    - Tab clicks toggle internal state (no route navigation in Phase 1)
    - All 8 browser tests verified
    - Pattern reused for Steps 2–12

### Step 2 — Admin Dashboard

- **Status:** ✅ Done
- **Session:** 2
- **Routes:** `/admin/dashboard`
- **HTML lines:** 13332–13933
- **Files:** `dashboard-shell` + `header` + `alerts/health/financial/ops/activity` sections + rail; `DashboardStateProvider` context
- **Notes:** Critical alerts, platform health, financial snapshot, activity feed.

### Step 3 — Admin Profile & Permissions

- **Status:** ✅ Done
- **Session:** 2
- **Routes:** `/admin/profile`
- **HTML lines:** 13934–14895
- **Files:** admin profile page + permissions matrix + activity timeline + account settings sections
- **Notes:** Permissions matrix, activity timeline, account settings.

### Step 4 — Users Overview

- **Status:** ✅ Done
- **Session:** 2
- **Routes:** `/admin/users` (with tab content for each user type)
- **HTML lines:** 14896–15914
- **Files:** users tab shell + 5 tab contents (candidates / clients / specialists / manager / admins)
- **Notes:** Tabs, bulk actions, sortable columns per tab.

### Step 5 — Candidate Detail

- **Status:** ✅ Done
- **Session:** 2
- **Routes:** `/admin/users/candidates/[id]`
- **HTML lines:** 15915–17093
- **Files:** `ProfileSectionIdentity`, `ProfileSectionPipeline`, `ProfileSectionSnapshot`, `ProfileSectionEngagements`, `ProfileSectionFinancial`, `ProfileSectionCommunications`, `ProfileSectionAudit`, `ProfileSectionSignals`, `ProfileSectionPrivacy`, `CandidateProfileShell`, `ProfileBackRow`, `ProfileHero`, `ProfileHeroBanner`, `ProfileRail`, `ProfileRailToc`, `ProfileRailQuickFacts`
- **Phases:** 14 sub-steps (5a–5n) — split because section is large (~1,178 lines, 9 sections + header + action toolbar + rail).
- **Notes:** Hero + 9 numbered sections + rail with scroll-spy. All sections type-safe interfaces. **14 visual-fidelity drifts fixed.** 7 conversion patterns documented (see Build Rules above). Zero `globals.css` changes.

**Step 5 sub-step breakdown:**

| # | Title | Status | HTML lines | Notes |
|---|---|---|---|---|
| 5a | Profile card (hero block) | ✅ | 15936–15967 | Photo with status-conditional gradient, name, cohort badge, tags, status row, ID-mono |
| 5b | Section 01 — Identity verification | ✅ | 16017–16190 | Section frame, anti-fraud signals, Re-verify/Override/Flag actions |
| 5c | ID — Front (zoom card) | ✅ | 16060–16080 | Front ID image with zoom |
| 5d | ID — Back (zoom card) | ✅ | 16081–16100 | Back ID image with zoom |
| 5e | "On this page" TOC list (static) | ✅ | 17027–17060 | Static markup — scroll-spy added in 5n |
| 5f | Quick Facts panel | ✅ | 17061–17091 | Static facts list |
| 5g | Liveness recording — 5-point check | ✅ | 16101–16140 | Liveness video + biometric match |
| 5h | Section 02 — Vetting pipeline | ✅ | 16191–16326 | 10-step vertical timeline |
| 5i | Section 03 — Profile snapshot | ✅ | 16327–16468 | Bio, rate, skills, tools, work history, portfolio |
| 5j | Section 04 + 05 — Engagements + Financial | ✅ | 16469–16630 | Engagement history (tabs) + financial summary |
| 5k | Section 06 + 07 — Communications + Audit log | ✅ | 16631–16884 | Comm threads + day-grouped audit timeline; 13 visual fidelity drifts fixed across 4 audit passes |
| 5l | Section 08 — Trust & safety signals | ✅ | 16885–16972 | Anti-cheat flags, reports, pattern flags; `SignalGroup` + `TrustSignalsSection` interfaces |
| 5m | Section 09 — Data privacy & legal | ✅ | 16973–17023 | DSAR, exports, deletions, legal holds; `PrivacyItem` extended with `valueVariant` + `PrivacySection` |
| 5n | Right rail FULLY WORKING — scroll-spy + smooth-scroll | ✅ | JS 26959–26999, CSS 5501–5543 | Client Component, IntersectionObserver, observer cleanup, token conversion complete |

### Step 6 — Client Detail

- **Status:** ✅ Done
- **Session:** 2
- **Routes:** `/admin/users/clients/[id]`
- **HTML lines:** 17094–18206
- **Files:** `ClientProfileShell` + 9 sections following Step 5 pattern
- **Notes:** Similar structure to Step 5, client-specific sections.

### Step 7 — Specialist Detail

- **Status:** ✅ Done
- **Session:** 2
- **Routes:** `/admin/users/specialists/[id]`
- **HTML lines:** 18207–19362
- **Files:** `SpecialistProfileShell` + sections (performance / caseload / audit) + timeline pattern (7jk reused in later steps)
- **Notes:** Performance summary, caseload, audit-level visibility.

### Step 8 — Manager Detail

- **Status:** ✅ Done
- **Session:** 2
- **Routes:** `/admin/users/managers/mgr-001-v8b2c4` (singleton)
- **HTML lines:** 19363–20632
- **Files:** `ManagerProfileShell` + detail sections
- **Notes:** Manager-specific metrics and actions. Singleton route — Atlas currently has one Manager of Talent Specialists (Mateo Vargas, `mgr-001-v8b2c4`). See Restrictions § Singleton-route flags.

### Step 9 — Other Admins

- **Status:** ✅ Done
- **Session:** 2
- **Routes:** `/admin/users/admins` (master-detail with hash deep-link)
- **HTML lines:** 20633–21373
- **Files:** admin master-detail at `/admin/users/admins` with hash deep-link + Phase 9d global ⌘K search index foundation
- **Notes:** Admin account management, role assignment (Super Admin only). Established the search index pattern reused in Phases 10c / 11b / 12b.

### Step 10 — Active Engagements

- **Status:** ✅ Done
- **Session:** 2
- **Routes:** `/admin/operations/engagements`, `/admin/operations/engagements/[id]`
- **HTML lines:** 21374–22292
- **Files:** `engagements-shell` + `engagements-table` + `engagement-detail-shell` + `engagement-pair-hero` + 6 sections (contract / parties / tracker / payments / comm / disputes)
- **Notes:** `cd-wrap` 1400px detail wrapper established. Bidirectional cross-link `eng-004 ↔ dsp-144` prepared.

### Step 11 — Job Postings

- **Status:** ✅ Done
- **Session:** 2
- **Routes:** `/admin/operations/jobs`, `/admin/operations/jobs/[id]`
- **HTML lines:** 22293–23446
- **Files:** `jobs-shell` + `jobs-table` + `job-detail-shell` + `job-hero` + `job-rail` + 5 sections (desc / match / interest / intervention / outcome)
- **Notes:** **statusText drift fix** applied (per-fixture field, not component-hardcoded). Phase 11a + 11b shipped. Filled cross-link `job-003 → eng-003`, `job-008 → eng-008`.

### Step 12 — Disputes

- **Status:** ✅ Done
- **Session:** 2 (closes Session 2)
- **Routes:** `/admin/operations/disputes`, `/admin/operations/disputes/[id]`
- **HTML lines:** 23447–24629
- **Files:** `disputes-shell` + `disputes-table` + `dispute-detail-shell` + `dispute-hero` + `dispute-stage-tracker` + `dispute-actions-row` + `dispute-rail` + 6 sections (claim / response / investigation / decision / audit / linked)
- **Phases:** 12a foundation (list + detail scaffolding) + 12b full sections + global search 8th entity type
- **Notes:**
  - Global ⌘K search extended to **8th entity type** (`DSP` chip, `danger-bg` tint, 59 records total — 49 + 10)
  - **Phase 12a drift fixes** (25 items surfaced post-build): list page data verbatim corrections, urgent-row real `border-l`, stage tracker horizontal track via `before:` pseudo (parent stage cards no longer have `bg-paper` covering the track), status pill `disp-mediation` added (was missing), reason tag conduct now inverted (solid danger / paper text)
  - **Urgent-row selection visual coherence fix** (Phase 12a follow-up): urgent rows keep red bg + 3px danger `border-l` on selection — selection darkens red instead of switching to lime. Escalated rows similarly preserved.
  - **5-stage tracker pattern** introduced — reusable for future lifecycle visualizations
  - **Bidirectional cross-link** `eng-004 ↔ dsp-144` verified
  - `dsp-148 → eng-219-vor` graceful 404 fallback (per scope discovery)

### Step 29 — Platform Settings Configuration

- **Status:** ✅ Done
- **Session:** 3
- **Routes:** `/admin/platform/settings`
- **HTML lines:** 60014–60697
- **Files added:**
  - Mock data: `src/lib/mock-data/admin/platform-settings-data.ts` (type defs + 5 setting arrays + demo modal data)
  - Components: `src/components/admin/platform/settings/ps-*.tsx`
    - `ps-page-header.tsx` — title, search, restriction banner, action buttons
    - `ps-category-nav.tsx` — sticky chip navigation with inline SVG icons, smooth scroll
    - `ps-category-head.tsx` — variant-colored gradient icon, eyebrow/title/meta text
    - `ps-category-section.tsx` — card container with head inside, border separator
    - `ps-setting-row.tsx` — 4-column grid (name/key/value/meta/action button)
    - `ps-footer.tsx` — audit trail metadata + action button
    - `ps-shell.tsx` — orchestrator: header → nav → **demo modal** → 5 sections → footer
    - `ps-modal-demo.tsx` — **NEW:** Confirmation modal pattern (6 sub-blocks)
  - Section components: `ps-operational/financial/comms/branding/security-section.tsx`
  - Route: `src/app/(admin)/admin/platform/settings/page.tsx`
  - Sidebar integration: wired into Platform group via `sidebar-nav-data.ts` + active-state matcher
- **Passes:**
  - Pass A: Page header + category nav + 5 category stubs (placeholder sections)
  - Pass B: 24 real settings across 5 categories (7 operational / 4 financial / 4 comms / 4 branding / 5 security)
  - Pass C: Demo confirmation modal with 6 sub-blocks (head / diff / impact / options / audit preview / footer)
- **Data model:**
  - `PsSetting`: title, key, descriptionHtml, value, valueSuffix?, valueBadge? (default | modified), metaHtml, actionLabel?
  - `PsDemoModalData`: head (icon/eyebrow/title/detail) + diff (before/after with CEFR/% units) + impact (4 items with strong tags) + options (3 checkboxes) + audit preview (11 key-value pairs) + footer (meta + button labels)
  - All fixture data extracted **verbatim** from admin.html lines 60070–60488 and modal lines 60070–60169
- **CSS/Design tokens:**
  - Category variants: operational (super→#3D2B5A) / financial (success→#1F5C3B) / comms (amber→#A35A2C) / branding (#B8A0C9→#6E4F8B) / security (danger→#7E1525)
  - Modal diff: before background rgba(194,65,43,0.04) / after background rgba(46,125,84,0.04)
  - Impact panel: amber-bg with border-amber 0.25 opacity
  - Audit preview: dark ink terminal-style with colored values (#ff8b6f danger / #7adba4 success)
  - Responsive: max-[1080px] hides meta column / max-[720px] stacks grid to single column
- **TypeScript strict:** ✅ No errors
- **Build:** ✅ 206 routes preserved (66 routes added via new page)
- **Tailwind-only:** ✅ Zero new globals.css mutations; no inline styles
- **Forbidden classNames:** ✅ Zero matches (no ps-, psch-, pscn-, pscv-, psmh-, psds-, psih-, pap-, pmo-, psmf-, etc.)
- **Notes:**
  - **NEW sidebar group:** "Platform" group added with icon + Settings link
  - **Scrollspy navigation:** Category nav with smooth scroll to section anchors (5 sections: operational / financial / comms / branding / security)
  - **Demo modal pattern:** Shown between nav and settings to demonstrate confirmation flow for any setting change
  - Modal sub-blocks: diff (before→after with strikethrough old value), impact (dry-run preview with 4 bullet items), options (3 toggles: notify affected / staged rollout / schedule), audit preview (11-line pre-formatted log entry), footer (meta text + 2 buttons)
  - All settings rows interactive (Modify/Upload buttons) — click handlers deferred to runtime integration
  - Pattern reusable: every "Modify" button will open real modal with same structure

---

## Step 13 — Reviews (current)

- **Status:** ⏳ Pending SCOPE DISCOVERY
- **Session:** 3 (kickoff)
- **Sidebar group:** Operations (4th of 5 entities)
- **HTML lines:** 36889–38006
- **View IDs:** `view-reviews` (list) + `view-review` (detail)
- **Target routes:** `/admin/operations/reviews` (list) + `/admin/operations/reviews/[id]` (detail)
- **Counter:** warn 18 (per `admin.html` sidebar)
- **Reuse from prior steps:**
  - `AdminStatsRow` (Phase 9b)
  - `cd-section` pattern + `cd-rail` with scroll-spy
  - Filter chip + row selection lime pattern
  - Cross-link from review → engagement / job / parties
  - Overflow-hidden on td-cells (12a lesson)
  - statusText per-fixture (11 lesson)
- **Anticipated patterns (new):**
  - Star rating visualization
  - Review status pill variants (helpful / dispute / flagged / moderation)
  - Cross-link to engagement / job entity
  - Multi-party review (client → specialist, specialist → client)
  - Audit indicator (`--logged` / `--logged-bg` design tokens — may finally be used here)
- **Next action:** Send SCOPE DISCOVERY prompt.

---

## Pending Steps (14–37)

### Operations group (1 remaining)

| Step | Title | HTML lines | Status |
|---|---|---|---|
| 14 | Reports & Analytics | 38007–39170 | ⏳ not started |

### Trust & Safety group (4 entities)

| Step | Title | HTML lines | Counter | Status |
|---|---|---|---|---|
| 15 | Fraud & Abuse | 39171–40321 | urgent 5 | ⏳ not started |
| 16 | Security Incidents | 40322–41355 | — | ⏳ not started |
| 17 | Suspicious Activity | 42297–43221 | warn 3 | ⏳ not started |
| 18 | Suspensions & Bans | 41356–42296 | — | ⏳ not started |

### Finance group (5 entities)

| Step | Title | HTML lines | Counter | Status |
|---|---|---|---|---|
| 19 | Transactions | 43222–44041 | — | ⏳ not started |
| 20 | Fees & Pricing | 44042–44601 | — | ⏳ not started |
| 21 | Refunds | 44602–45430 | warn 4 | ⏳ not started |
| 22 | Subscriptions | — | — | ⏸ pending HTML |
| 23 | Tax Documents | 45431–46175 | — | ⏳ not started |

### Compliance group (5 entities)

| Step | Title | HTML lines | Counter | Status |
|---|---|---|---|---|
| 24 | Legal Requests | 46176–47178 | urgent 1 | ⏳ not started |
| 25 | Data Subject Rights | 47179–48346 | warn 2 | ⏳ not started |
| 26 | Audit Logs | — | — | ⏸ pending HTML |
| 27 | Privacy Reports | — | — | ⏸ pending HTML |
| 28 | Regulatory Submissions | — | — | ⏸ pending HTML |

### Platform Settings group (5 entities, 1 shipped)

| Step | Title | Status |
|---|---|---|
| 29 | Settings Configuration | ✅ Done |
| 30 | Categories & Skills | ⏸ pending HTML |
| 31 | Integrations | ⏸ pending HTML |
| 32 | Email & SMS Templates | ⏸ pending HTML |
| 33 | Help Center Content | ⏸ pending HTML |

### Internal group (4 entities, all deferred)

| Step | Title | Status |
|---|---|---|
| 34 | Performance Dashboards | ⏸ pending HTML |
| 35 | Incident Reports | ⏸ pending HTML |
| 36 | Internal Communications | ⏸ pending HTML |
| 37 | Knowledge Base | ⏸ pending HTML |

---

## Metrics & Design Tokens

### Atlas Admin App Metrics (after Step 12)

| Metric | Value |
|---|---|
| Routes | 74 |
| Entity types live | 8 |
| Searchable records (⌘K) | 59 |
| Cross-entity links | 3 (engagements ↔ users, jobs ↔ engagements, disputes ↔ engagements) |
| Drift fixes accumulated | 33+ |
| `globals.css` mutations (Steps 10–12) | 0 |

### Design Tokens

The `admin.html` `:root` (lines 19–63) introduces four additional tokens beyond what Sessions 0 and 1 added:

| Token | Value | Used where |
|---|---|---|
| `--restricted` | `#8B1A1A` | restricted chrome, security-sensitive headers |
| `--restricted-bg` | `#F5E2DD` | restricted background |
| `--super` | `#6E3FE0` | Super-Admin-only actions (Step 9+ shipped) |
| `--super-bg` | `#EFE9FB` | Super-Admin background |
| `--logged` | (HTML defined) | audit indicators — defer to Step 13 (Reviews moderation) |
| `--logged-bg` | (HTML defined) | audit indicator bg — defer to Step 13 |

---

## Durability Rule

Every time a step completes:

1. Update this doc:
   - Change "Current step" / "Last finished" / "Next step" markers at the top
   - Update the step's row in [Sidebar Group Progress](#sidebar-group-progress) (✅ done, increment group %)
   - Move step entry from [Pending Steps](#pending-steps-14-37) to [Completed Steps](#completed-steps-1-12) with full notes (HTML lines, files, phases, drift fixes, patterns established)
2. Commit doc update in the **same commit** as the step's code
3. Don't modify any other doc file

This ensures any future session can read this doc and immediately know: where we are, what's done, what's restricted, what to build next.
