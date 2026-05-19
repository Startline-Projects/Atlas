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

### Step 30 — Categories & Skills

- **Status:** ✅ Done
- **Session:** 3
- **Routes:** `/admin/platform/categories-skills`
- **HTML lines:** 60506–61468
- **Files added:**
  - Mock data: `src/lib/mock-data/admin/categories-skills-data.ts` (type defs + Pass A/B/C fixtures: 10 role families, 15 skill rows, 3 tool sections × 7 tools)
  - Components: `src/components/admin/platform/categories-skills/cs-*.tsx`
    - `cs-page-header.tsx` — title + meta + restriction banner + search + 2 action buttons (reuses `PsRestrictionBanner` from Step 29)
    - `cs-tab-nav.tsx` — `'use client'` 3-tab pill nav (Categories 10 / Skills 847 / Tools 156) with SVG icons + count badges
    - `cs-cat-card.tsx` — role family card with gradient icon + stats grid + sub chips + audit footer
    - `cs-cat-add-card.tsx` — dashed "Add role category" card
    - `cs-consolidation-alert.tsx` — amber gradient banner with "View all" + "Run consolidation" actions
    - `cs-skill-toolbar.tsx` — `'use client'` search + 5 filter chips with `activeFilter` state
    - `cs-skill-filter-chip.tsx` — single filter chip with active/inactive variants + count badge
    - `cs-skill-row.tsx` — 6-column skill table row (name+aliases / categories / count+meta / trend / flag / action)
    - `cs-skill-flag.tsx` — merge (amber) / archive (cream) status badge with dot indicator
    - `cs-tool-card.tsx` — 32px gradient logo + name + meta, responsive `nth-child` border-r toggling (4n→3n→2n→1n)
    - `cs-tool-add-card.tsx` — dashed "Add tool" cell with plus SVG
    - `cs-tools-section.tsx` — section card with gradient head (title + meta + "View all N") + 4-col responsive grid
    - `cs-shell.tsx` — `'use client'` orchestrator: header → tab nav → conditional pane (categories / skills / tools)
  - Section panes: `sections/cs-categories-pane.tsx`, `sections/cs-skills-pane.tsx`, `sections/cs-tools-pane.tsx`, `sections/cs-pane-stub.tsx`
  - Route: `src/app/(admin)/admin/platform/categories-skills/page.tsx`
  - Sidebar integration: `sidebar-nav-data.ts` pathname updated + `admin-sidebar.tsx` active-state matcher added
- **Passes:**
  - Pass A: Page header + 3-tab nav + Categories pane (10 role family cards + add card)
  - Pass B: Skills pane (consolidation alert + filter toolbar + 6-column table with 15 sample rows + footer "Load more skills →")
  - Pass C: Tools pane (3 sections × 7 tool cards each + "Add tool" cell + footer "View remaining 7 categories →")
- **Data model:**
  - `CsCategoryCard`: icon gradient + name/owner/stats(3) + sub-categories[] + footer audit text
  - `CsSkillRow`: name + aliasesHtml + categoryChips[] + count + trend (up/down/flat) + optional flag (merge/archive) + optional action
  - `CsToolSection`: title + metaHtml + viewAllLabel + tools[] (initials + logoGradient + name + metaHtml)
  - All fixture content extracted **verbatim** from admin.html (10 categories from 60563–61000, 15 skills from 61065–61219, 21 tools from 61246–61450)
- **CSS/Design tokens:**
  - 10 unique category icon gradients (super / success / amber / branding / danger / ink variants)
  - 21 unique tool logo gradients (verbatim brand colors: GitHub #2D2D2D→#000000, Figma #F24E1E→#A23314, Pandas #150458→#0A0230, etc.)
  - Consolidation alert: `bg-gradient-to-br from-amber-bg to-paper` + amber info icon
  - Duplicate-warn rows: `bg-[rgba(232,118,58,0.04)]` + 3px amber `border-l`
  - Skill flag variants: merge = amber-bg/amber, archive = cream-deep/ink-mute (overridable via style prop)
  - Tool grid responsive: 4 cols (1081+) → 3 cols (720-1080) → 2 cols (480-720) → 1 col (<480), with `nth-child` border-r toggling per breakpoint
- **TypeScript strict:** ✅ No errors
- **Build:** ✅ 207 routes preserved
- **Tailwind-only:** ✅ Zero new globals.css mutations; inline styles limited to icon/logo gradient backgrounds and table column widths (legitimate)
- **Forbidden classNames:** ✅ Zero matches (no cs-, ccan-, ccs-, ccsc-, ccss-, csc-, csch-, cstl-, ctsh-, col-skill-, fr-, cd-, etc.)
- **Notes:**
  - **3-tab pane switching:** `'use client'` orchestrator (`cs-shell.tsx`) holds `activeTab` state with `useState<CsTab>`
  - **Reuses `PsRestrictionBanner`** from Step 29 for restriction chip in page header
  - **Inline styles total: 8 source occurrences** = 1 category gradient (× 10 via map) + 6 table column widths (skills th) + 1 tool gradient (× 21 via map)
  - **Filter state:** `cs-skill-toolbar.tsx` manages `activeFilter` locally; chip click updates state and visual variant
  - **dangerouslySetInnerHTML:** used for `aliasesHtml`, `metaHtml`, and `categoryMetaHtml` to preserve inline `<strong>` tags from reference HTML
  - **Responsive tool grid:** combined grid-cols-N + nth-child border-r modifiers handle border-r toggling across 4 breakpoints purely in Tailwind

### Step 32 — Email & SMS Templates

- **Status:** ✅ Done
- **Session:** 3
- **Routes:** `/admin/platform/templates` (LIST) + `/admin/platform/templates/[id]` (DETAIL, 14 static params)
- **HTML lines:** 62388–63117 (LIST 62388-62722, DETAIL 62727-63117)
- **Files added:**
  - Mock data: `src/lib/mock-data/admin/templates-data.ts` (LIST types + 14 verbatim email templates + 3-tab channel + 5 filter chips + SMS/WhatsApp stub fixtures; DETAIL types + Vetting-invite canonical: breadcrumb / hero with 6 locale flag tabs / 4 detail stats / approval workflow / 4 editor fields / 12 variables / email preview mock / test-send / linked context)
  - LIST components: `src/components/admin/platform/templates/tm-*.tsx`
    - `tm-page-header.tsx` — fr-page-head with meta-pulse banner inline in meta line
    - `tm-meta-pulse.tsx` — danger-tinted inline pulse alert with `pulse-fr` animated dot
    - `tm-channel-tabs.tsx` — `'use client'` 3-tab pill bar (Email/SMS/WhatsApp) with inline icons + count badges
    - `tm-status-filter.tsx` — `'use client'` 5-chip status filter (All/Active/Draft/In approval/Archived)
    - `tm-status-pill.tsx` — 4 status variants; in-approval dot animates `pulse-fr`
    - `tm-table-row.tsx` — `'use client'` with `useRouter()` for whole-row navigation; 7-column layout (name+key / flow / locales / modified / sends / status / chevron)
    - `tm-table.tsx` — outer wrap + thead (7 cols) + tbody
    - `tm-email-pane.tsx` — table + load-more footer
    - `tm-stub-pane.tsx` — centered card for SMS/WhatsApp prose stubs
    - `tm-shell.tsx` — `'use client'` orchestrator with `useState` for active channel + status filter, `useMemo` filtering
  - DETAIL components: `src/components/admin/platform/templates/detail/tm-*.tsx`
    - `tm-breadcrumb.tsx`, `tm-locale-tabs.tsx` (`'use client'` 6 flag-gradient tabs), `tm-detail-hero.tsx`
    - `tm-detail-stats.tsx` (4-col grid hand-translated from Step 31 in-detail-stats per forbidden-prefix rule)
    - `tm-approval-card.tsx` — amber-gradient outer + check icon + 3-step flow (complete/active/pending variants) + actions
    - `tm-section-head.tsx` — sh-num cream-deep badge + h2 + sh-meta with dashed bottom separator
    - `tm-editor-card.tsx` — head + 4 fields (real `<input>` for subject/preheader/from + `<div>` body-display with Liquid syntax highlighting via `data-tm-liquid` + `data-tm-tag` attribute selectors)
    - `tm-variables-panel.tsx` — 12 variable rows with super-tinted mono name + description + type badge (Required → danger-bg, else cream-deep)
    - `tm-preview-card.tsx` — centered 600px email mock with gradient header / 21px display subject / 14.5px body with strong + indented list + GDPR italic + dark CTA + paper-deep mono footer
    - `tm-test-send-card.tsx` — paper-plane icon + email input + Send button + history footer
    - `tm-linked-context.tsx` — fr-quickstats pattern hand-translated, 5 rows with super-tinted Step cross-links
    - `tm-detail-rail.tsx` — sticky `top-22 self-start gap-14` aside (NO max-h, NO overflow-y-auto per admin.html .fr-rail framework rule); at `max-[1080px]` unstacks via `static` + `order-[-1]` above main column
    - `tm-detail-shell.tsx` — orchestrator: breadcrumb + hero + stats + approval + fr-body 2-col (main = 2 fr-section cards stacked, rail = TmDetailRail)
  - Routes: `src/app/(admin)/admin/platform/templates/page.tsx` (LIST) + `src/app/(admin)/admin/platform/templates/[id]/page.tsx` (DETAIL with `generateStaticParams` for 14 ids; only `tm-vetting-invite` renders canonical, others render minimal placeholder)
  - Sidebar integration: `sidebar-nav-data.ts` Email & SMS pathname `#email-sms` → `/admin/platform/templates`; `admin-sidebar.tsx` active-state matcher handles list + descendant routes
- **Passes:**
  - Pass A: LIST view (page header with meta-pulse + 5-stat strip + 3 channel tabs + 5 filter chips + 14-row email table + SMS/WhatsApp stubs + footer + sidebar wiring + row-click navigation)
  - Pass B: DETAIL route + breadcrumb + hero with 6 locale flag tabs + 4-stat strip + amber approval workflow card
  - Pass C: fr-main 2 fr-section cards with sh-num heads, editor card with Liquid syntax + variables panel (12 vars)
  - Pass D: fr-rail with email preview mock + test-send card + linked context, sticky positioning matching admin.html .fr-rail framework rule
- **Data model:**
  - `TmTemplate`: id + name + key + flowParts[] + locales (count + list) + modified (date + author) + sends (value + meta) + status (active/draft/in-approval/archived) + isInApproval/isArchived row tints
  - `TmDetailData`: breadcrumb + hero (key + status + envMeta + title + subtitleHtml + 6 localeTabs + 2 actions) + 4 detailStats + approval (3 steps + actions) + editor (4 fields) + variables (12 vars) + preview (rendered email mock) + testSend + linked (5 cross-links)
  - All fixture content extracted **verbatim** from admin.html lines 62388-63117 (14 templates from 62496-62691, Vetting-invite canonical from 62727-63117)
- **CSS/Design tokens:**
  - 21 tokens (all existing in globals.css)
  - **ONE globals.css addition** this step: `@keyframes pulse-fr { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }` (user-approved, verbatim from admin.html line 15458) — used by meta-pulse banner + in-approval status pill dot
  - Status pill variants: active = success-bg/success, draft = cream-deep/ink-soft, in-approval = amber-bg/amber + pulse-fr dot, archived = paper-deep/ink-mute
  - Approval step variants: complete = success-bg + success num badge, active = amber-bg + amber num, pending = paper-deep + opacity-60 + line-tinted num
  - Variable type badges: Required = danger-bg/danger; Array/Number/String/Logic = cream-deep/ink-soft
  - 6 verbatim locale flag gradients (EN/ES/PT/FR/DE/ID country colors)
  - Liquid syntax highlighter: `data-tm-liquid` spans → super-tinted variable chips, `data-tm-tag` spans → danger-tinted Liquid tags
- **TypeScript strict:** ✅ No errors
- **Build:** ✅ 233 routes (1 LIST + 14 DETAIL static)
- **Tailwind-only:** ✅ Inline styles limited to 7 table column widths + 1 locale-flag-gradient (used 6× via map) = 8 source occurrences; no other inline styles
- **Forbidden classNames:** ✅ Zero matches (no tm-, tcn-, tcf-, tcl-, tcm-, tcs-, tah-, taa-, tas-, teh-, tvh-, tph-, tts-, col-tm-, meta-pulse, fr-, cd-, head-, in-, ids-, dsr-, etc.)
- **Notes:**
  - **`<input>` for editor fields** matches admin.html line 62886 verbatim (real text input with `defaultValue`, not a styled `<div>`)
  - **fr-section wrappers** for each main-column card with `sh-num` 01/02 section heads (matches admin.html lines 62867/62926 nested-card pattern from Step 31)
  - **Liquid syntax highlighting** via `data-tm-liquid` + `data-tm-tag` attribute selectors instead of `class="tm-liquid"` (tm- classes are forbidden prefix); arbitrary-attribute Tailwind selectors `[&_[data-tm-liquid]]:...` apply super-tinted chips + `[&_[data-tm-tag]]:...` apply danger-tinted tags
  - **fr-rail sticky** uses `top-[22px] self-start gap-[14px]` with **NO max-h and NO overflow-y-auto** per admin.html .fr-rail framework rule (line 15970-15979). Previous max-h-[calc(100vh-44px)] + overflow-y-auto was clipping the email mock; corrected to flow naturally.
  - **No PsRestrictionBanner** in page header (admin.html doesn't have one for templates — uses meta-pulse amber alert inline in meta line instead)
  - **Reuses `PrStatStrip` + `PrStatCell` + `PrStat` type** (Privacy Reports / Step 27) for the 5-card top stats strip
  - **Row navigation:** entire `<tr>` is clickable via `useRouter().push()` + keyboard-accessible (`tabIndex={0}`, `role="link"`, Enter/Space `onKeyDown`); chevron is a plain `<span>` SVG affordance with no Link wrapper
  - **Sample-data preview** renders variables resolved to concrete values (e.g. "Hi Adesuwa", "Software Engineering", 24 hours) rather than `{{var}}` template syntax — this is the rendered mock, distinct from the editor source

### Step 33 — Help Center Content

- **Status:** ✅ Done — **closes PART 7 Platform Configuration (5/5 pages)**
- **Session:** 3
- **Routes:** `/admin/platform/help-content` (LIST) + `/admin/platform/help-content/[id]` (DETAIL, 13 static params)
- **HTML lines:** 63125–63992 (LIST 63125-63658, DETAIL 63663-63992)
- **Files added:**
  - Mock data: `src/lib/mock-data/admin/help-content-data.ts` (LIST types + 13 verbatim articles across 4 categories + 9 sidebar categories + DETAIL types + Vetting-call canonical: breadcrumb / hero with 6 locale flag tabs / 4 detail stats / 7-row frontmatter / 9-section markdown body with 7-class syntax / public-site preview mock / 4-block categorization rail)
  - LIST components: `src/components/admin/platform/help-content/hc-*.tsx`
    - `hc-page-header.tsx` — fr-page-head pattern with meta-pulse inline + search + 3 actions (Audit / View public site / New article primary)
    - `hc-meta-pulse.tsx` — danger-tinted inline pulse alert with pulse-fr animated dot (reused from Step 32 pattern)
    - `hc-cat-side.tsx` — `'use client'` sticky sidebar (`top-12`, static at 980px) with head + 9 category buttons; inline SVG per icon key (square / bolt / user / building / star / dollar / alert-circle / lock / shield)
    - `hc-cat-section.tsx` — section head (eyebrow + h2 + 2 action buttons) with dashed bottom-border + article list
    - `hc-status-pill.tsx` — 4 variants: published (success) / draft (amber + pulse-fr dot) / review-needed (super) / archived (cream)
    - `hc-tag-chip.tsx` — 6 variants: default / featured (inverted ink/paper) / video (amber) / payment (success) / policy (danger) / compliance (super)
    - `hc-helpful-bar.tsx` — 8px pill bar with 3 fill variants (high/medium/low) + matching label + meta. Width via inline `style`.
    - `hc-article-row.tsx` — `'use client'` 5-col grid row with `useRouter()` whole-row navigation + keyboard accessibility; 3 row-tint variants (draft / review-needed / archived); collapses to 2-col at 980px
    - `hc-shell.tsx` — `'use client'` orchestrator with `useState` for active category + `useMemo` section filtering
  - DETAIL components: `src/components/admin/platform/help-content/detail/hc-*.tsx`
    - `hc-breadcrumb.tsx` — Help Center › For candidates › current article
    - `hc-detail-hero.tsx` — mono key + status pill + env meta + h1 + subtitle with cross-link to Step 31 + inline `<code>` for `{{ help.url }}` + **reuses `TmLocaleTabs` from Step 32** for 6 EN/ES/PT/FR/DE/ID flag tabs + 2 actions (View public + Save & publish v5)
    - `hc-detail-stats.tsx` — 4-col grid hand-translated from Step 31 in-detail-stats pattern: Views 30d 8,247 (↑ +12%) / Avg time 2:38 / Helpfulness 94% (success) / Search rank #1
    - `hc-section-head.tsx` — sh-num cream-deep badge + h2 + sh-meta with dashed separator + optional right-action button
    - `hc-frontmatter-card.tsx` — 7 rows: 3 text-inputs (title/slug/search keywords) + 3 text rows (category/locale/published) + 1 tag-chip row (Featured/Includes video/Setup/Vetting/+ add tag dashed)
    - `hc-markdown-card.tsx` — head + pre-wrap body with 7 attribute-selector classes via `[&_[data-hc-md-heading-1]]:...` for syntax highlighting (heading-1/heading-2/bold/em/link/code/list)
    - `hc-public-frame.tsx` — full mock public-site frame: topbar (Atlas Help logo + search pill) + breadcrumb + 26px display title + locale meta + body with h2/p/strong/em/code/ol/ul/li/a + `data-hc-video` placeholder block + helpful footer with thumbs Yes/No buttons
    - `hc-preview-card.tsx` — outer card with head ("Public preview" + path meta) + cream-backdrop body wrapping `<HcPublicFrame />`
    - `hc-categorization-card.tsx` — 4-block sidecar: Related articles (4 dashed-bottom Link rows to other hc-* ids) / Linked from (Step 31 cross-ref with `{{ help.url }}` sub-meta) / Compliance links (Step 26 + Step 24) / Revision history (v4/v3/v2/v1 with current ink-tinted) + "Full history & diff" button
    - `hc-detail-rail.tsx` — sticky aside (`top-22 self-start gap-14` NO max-h NO overflow per admin.html .fr-rail rule); unstacks above main column at `max-[1080px]` via `static` + `order-[-1]`
    - `hc-detail-shell.tsx` — orchestrator: breadcrumb + hero + stats + fr-body 2-col (main = 2 fr-section cards stacked, rail = HcDetailRail)
  - Routes: `src/app/(admin)/admin/platform/help-content/page.tsx` (LIST) + `src/app/(admin)/admin/platform/help-content/[id]/page.tsx` (DETAIL with `generateStaticParams` for 13 article ids; only `hc-vetting-call` renders canonical, others render minimal placeholder)
  - Sidebar integration: `sidebar-nav-data.ts` Help Content pathname `#help-content` → `/admin/platform/help-content`; `admin-sidebar.tsx` active-state matcher handles list + descendant routes
- **Passes:**
  - Pass A: LIST view (page header with meta-pulse + 5-stat strip + 2-col layout: sticky 9-category sidebar + 4 category sections with 13 verbatim article rows)
  - Pass B: DETAIL route + breadcrumb + hero with **reused TmLocaleTabs from Step 32** + 4-stat strip
  - Pass C: fr-main 2 fr-section cards — Frontmatter (7 rows) + Markdown editor with 7-class syntax highlighting via `data-hc-md-*` attribute selectors
  - Pass D: fr-rail with Public preview mock (full public-site chrome) + Categorization (4 blocks), sticky positioning matching admin.html .fr-rail framework rule
- **Data model:**
  - `HcArticleRow`: id + title + tags[] (6 variants) + slug + views (value + meta) + helpful (percent + label + variant + meta) + modified (date + author) + status (4 variants) + rowVariant? (3 tint variants for draft / review-needed / archived)
  - `HcDetailData`: breadcrumb + hero (key + status + envMeta + title + subtitleHtml + 6 localeTabs reused via TmLocaleTab type import + 2 actions) + 4 detailStats + frontmatter (7 rows) + markdown (sectionHead + bodyHtml with `data-hc-md-*` markers) + preview (full public-site mock) + categorization (4 blocks: related / linked / compliance / revision)
  - All fixture content extracted **verbatim** from admin.html lines 63125-63992 (13 articles from 63278-63645, Vetting-call canonical from 63663-63992)
- **CSS/Design tokens:**
  - 20 tokens (all existing in globals.css from prior steps)
  - **ZERO globals.css additions** this step (pulse-fr already shipped from Step 32)
  - Status pill variants: published = success-bg/success, draft = amber-bg/amber + pulse-fr dot, review-needed = super tint, archived = cream-deep/ink-mute
  - Tag variants: featured = inverted ink/paper, video = amber, payment = success, policy = danger tint, compliance = super tint, default = cream-deep
  - Helpfulness bar: high = success, medium = amber, low = danger; matching colored labels
  - Row tints: draft = amber-tinted bg + border, review-needed = super-tinted bg + border, archived = opacity-60
  - Markdown syntax: heading-1/heading-2/bold = ink+bold, link = super, em = ink-soft italic, code = ink-bg/paper-text inline chip, list = ink-soft
- **TypeScript strict:** ✅ No errors
- **Build:** ✅ 247 routes (1 LIST + 13 DETAIL static)
- **Tailwind-only:** ✅ Inline styles limited to **1 occurrence** = helpfulness bar width (`style={{ width: ${percent}% }}` in hc-helpful-bar.tsx used 13× via map across all article rows); zero other inline styles in Pass A/B/C/D
- **Forbidden classNames:** ✅ Zero matches (no hc-, hca-, hci-, hcsh-, hcf-, hmh-, hcrl-, hph-, hpt-, tm-, fr-, cd-, in-, ids-, etc. in any className string; all hc-* semantics live in `data-*` attributes for `dangerouslySetInnerHTML` rendering)
- **Notes:**
  - **Cross-step component reuse:** `TmLocaleTabs` from Step 32 imported directly into `hc-detail-hero.tsx` — same 6 EN/ES/PT/FR/DE/ID flag gradients, no duplication. `TmLocaleTab` type also imported into help-content-data.ts to type the hero's locale tabs.
  - **Reuses `PrStatStrip` + `PrStatCell` + `PrStat` type** (Privacy Reports / Step 27) for both the LIST 5-card top stats strip (hand-translated detail-stats via fr-section + sh-num pattern instead of importing Step 31 IntDetailStats per forbidden prefix rule)
  - **No PsRestrictionBanner** in page header (admin.html doesn't have one — uses meta-pulse amber alert inline in meta line instead)
  - **Row navigation:** entire article row clickable via `useRouter().push()` + keyboard-accessible (`tabIndex={0}`, `role="link"`, Enter/Space `onKeyDown`)
  - **Markdown syntax highlighting via `data-hc-md-*` attribute selectors** instead of `class="hc-md-*"` (hc- classes are forbidden prefix); arbitrary-attribute Tailwind selectors `[&_[data-hc-md-heading-1]]:...` apply 7 styled markdown classes (heading-1/heading-2/bold/em/link/code/list)
  - **Tag chips via `data-hc-tag-chip` attribute** with `data-hc-tag-add` variant for dashed "+ add tag" pseudo-button; revision history uses `data-hc-rev-current` for v4 ink-tinted vs subsequent revisions
  - **fr-rail sticky** uses `top-[22px] self-start gap-[14px]` with **NO max-h and NO overflow-y-auto** per admin.html .fr-rail framework rule (line 15970-15979) — same lesson learned from Step 32 Pass D
  - **Public preview mock** renders full Help Center public-site chrome (topbar with logo + search pill / breadcrumb / display title / locale meta line / 6-section body with h2/p/strong/em/code/ol/ul/li/a styling + `data-hc-video` placeholder block for the video embed / helpful footer with thumbs Yes/No)
  - **PART 7 PLATFORM CONFIGURATION COMPLETE: 5/5 pages shipped** (Step 29 Settings + Step 30 Categories & Skills + Step 31 Integrations + Step 32 Email & SMS Templates + Step 33 Help Center Content)

### Step 35 — Internal Incident Reports

- **Status:** ✅ Done — **PART 8 INTERNAL OPS: 2 of 4 pages complete (Steps 34–35)**
- **Session:** 4
- **Routes:** `/admin/internal/incidents` (LIST) + `/admin/internal/incidents/[id]` (DETAIL, 9 static params)
- **HTML lines:** 64857–65492 (LIST 64857-65123, DETAIL 65129-65492)
- **CSS lines:** 30254–30831 (577 lines)
- **Files added:**
  - Mock data: `src/lib/mock-data/admin/internal-incidents-data.ts` (LIST: 5 top stats / 7 filter chips / active SEV-3 callout INC-2026-058 with 4 inner stats / 8 verbatim resolved rows + canonical INC-2026-042 amber-tinted. DETAIL: breadcrumb / hero / 4 detail stats / timeline 8 events / postmortem 3 sections incl. blameless / action items 4 rows / commander card / 3 responders / 6 related links / 5 SLO snapshot rows.)
    - Filename `internal-incidents-data.ts` to avoid collision with Step 16 `incidents-data.ts` (external security SI-*)
  - LIST components: `src/components/admin/internal/incidents/ic-*.tsx`
    - `ic-meta-pulse.tsx` — danger pulse-fr inline alert (reused pattern from Step 32/33/34)
    - `ic-sev-badge.tsx` — 4 variants (sev-0 with pulse-fr / sev-1 danger / sev-2 amber / sev-3 super-tinted). Dot is `currentColor`.
    - `ic-status-pill.tsx` — 4 variants (open pulse / mitigated pulse / monitoring / resolved). Only open + resolved used in markup; mitigated/monitoring are reserve variants.
    - `ic-active-stat.tsx` — single 4-up callout stat cell with responsive 4→2 collapse at 720px
    - `ic-active-callout.tsx` — `'use client'` UNIQUE widget: 2px danger border + danger-tinted 135° gradient bg + absolute pulsing "ACTIVE INCIDENT" eyebrow (replaces ::before with explicit span since Tailwind can't generate ::before content) + head row + 4-stat grid + foot with meta + 2 actions
    - `ic-table-row.tsx` — `'use client'` with `useRouter().push()` whole-row navigation + keyboard accessibility (tabIndex/role=link/Enter+Space onKeyDown). Canonical row gets amber-tinted bg + 3px amber left border on first cell.
    - `ic-table.tsx` — 7-col header (12/9/36/11/14/11/7 percent widths via Tailwind `w-[N%]`) + body. Sticky header styling reused.
    - `ic-filter-chips.tsx` — `'use client'` controlled 7-chip toolbar with inline chip-count
    - `ic-page-header.tsx` — `'use client'` fr-page-head pattern with meta-pulse + search input + 3 actions (Audit / Runbooks / Declare incident primary with triangle-alert icon)
    - `ic-shell.tsx` — `'use client'` orchestrator with `useState` for active filter chip
  - DETAIL components: `src/components/admin/internal/incidents/detail/ic-*.tsx`
    - `ic-breadcrumb.tsx` — 3-segment fr-breadcrumb pattern with Next Link for href entries, current text-ink bold
    - `ic-detail-hero.tsx` — `'use client'`, reuses IcSevBadge + IcStatusPill, 3 hero actions with copy/download/external SVG icons, rich-HTML subtitle ([&_a]/[&_strong]/[&_code] styling)
    - `ic-detail-stat.tsx` — single in-detail-stat cell with success/warn variants + 4→2→1 responsive collapse at 980/480
    - `ic-detail-stats.tsx` — 4-col grid wrapper
    - `ic-section-head.tsx` — sh-num cream-deep chip + h2 + sh-meta + dashed separator
    - `ic-timeline-event.tsx` — 90/18/1fr grid with time + elapsed mono stack / 12px dot with phase-variant bg (4 of 6 used) + 2px vertical spine via `after:` pseudo conditionally appended based on isLast prop / text block with action + dangerouslySetInnerHTML detail + actor chip. Pulse-fr on detect dot.
    - `ic-timeline-card.tsx` — outer card with internal head ("Apr 18, 2026 · 14:42–14:54 UTC") + 8 event rows
    - `ic-pm-section.tsx` — single PM section card with default/blameless variants. Blameless gets `!border-[rgba(110,63,224,0.3)]` override + horizontal purple gradient head.
    - `ic-postmortem-card.tsx` — wraps 3 PM section cards
    - `ic-action-item.tsx` — 28/1fr/130/90 grid with iai-num colored circle (3 status colors: success/amber/ink) + title (complete = line-through + ink-soft) + owner + status text-right. Responsive 4→2 collapse at 720px (hides owner + status).
    - `ic-action-items-card.tsx` — outer table-wrap card with 4 action item rows
    - `ic-commander-card.tsx` — reuses Step 26 DSR pattern: dsr-subject-card header (avatar + name + sub) + 5 dsm-rows (Role / Severity / Resolution[success] / PM author / Reviewer)
    - `ic-responder-row.tsx` — 30/1fr grid with circular avatar (gradient via inline `style` per responder) + uppercase role eyebrow + name
    - `ic-responders-card.tsx` — fr-quickstats wrapper with 3 responder rows separated by dashed borders
    - `ic-quickstats-row.tsx` — single qs-label/qs-value row with optional success/warn variant
    - `ic-quickstats-card.tsx` — generic fr-quickstats card with head + N rows (reused for Related links + SLO snapshot)
    - `ic-detail-rail.tsx` — sticky aside (`top-22 self-start gap-14` NO max-h NO overflow per .fr-rail rule from Step 32/33 lesson); unstacks above main column at `max-[1080px]` via `static` + `order-[-1]`
    - `ic-detail-shell.tsx` — orchestrator: breadcrumb + hero + stats + fr-body 2-col (main = 3 fr-section cards stacked: timeline / postmortem / action items; rail = IcDetailRail with commander + responders + related + SLO)
  - Routes:
    - `src/app/(admin)/admin/internal/incidents/page.tsx` (LIST, server)
    - `src/app/(admin)/admin/internal/incidents/[id]/page.tsx` (DETAIL with `generateStaticParams` for 9 ids: inc-2026-058 active + 8 resolved; only inc-2026-042 canonical renders full IcDetailShell, other 8 render minimal placeholder card)
  - Sidebar integration: `sidebar-nav-data.ts` Incident Reports pathname `#incident-reports` → `/admin/internal/incidents` (counter "2" preserved); `admin-sidebar.tsx` active-state matcher handles list + descendant routes
- **Passes:**
  - Pass A: LIST view (page header with meta-pulse + 5-stat strip + 7 filter chips + active SEV-3 callout + 8-row resolved table with canonical INC-2026-042 amber-tinted + footer + sidebar wire-up)
  - Pass B: DETAIL route + breadcrumb + hero (ic-sev SEV-2 + ic-status resolved + 3 actions) + 4-stat strip + fr-body 2-col stubs
  - Pass C: fr-main with 3 fr-section cards (Timeline 8 events with 4 phase variants + Post-mortem 3 sections incl. blameless + Action items 4 rows with 3 status variants)
  - Pass D: fr-rail with 4 cards (Incident commander + Responders + Related links + SLO snapshot)
- **Data model:**
  - `IcIncidentRow`: id + displayId + sev (4 variants) + title + metaHtml + duration + resolvedDate + resolvedRel + pmStatus (3 variants) + pmText + isCanonical?
  - `IcActiveCallout`: id + sev + status + statusLabel + ageText + title + summaryHtml + 4 IcActiveStat + footMetaHtml + 2 IcCalloutAction
  - `IcDetailData`: breadcrumb + hero + 4 detailStats + timeline (sectionHead + headerTitle + headerMeta + 8 IcTimelineEvent) + postmortem (sectionHead + 3 IcPmSection) + actionItems (sectionHead + 4 IcActionItem) + rail (commander IcCommander + 3 IcResponder + 6 IcQuickstatsRow related + 5 IcQuickstatsRow SLO)
  - All fixture content extracted **verbatim** from admin.html lines 64857-65492
- **CSS/Design tokens:**
  - 19 tokens (all existing in globals.css from prior steps)
  - **ZERO globals.css additions** this step (pulse-fr already shipped from Step 32; sev/status/active-callout colors all literal `rgba(...)` matching prior Step 34 canonical-row pattern)
  - Sev pill variants: sev-0 = danger-bg + pulse-fr dot, sev-1 = danger-bg, sev-2 = amber-bg, sev-3 = super-tinted (rgba 110,63,224,0.10)
  - Status pill variants: open = danger-bg + pulse-fr dot, mitigated = amber-bg + pulse-fr dot, monitoring = super-tinted, resolved = success-bg
  - Active-callout: 2px solid danger border + 135° gradient bg using literal `rgba(194,65,43,0.08)` + absolute "ACTIVE INCIDENT" eyebrow chip with pulse-fr 1.5s
  - PM section blameless variant: `!border-[rgba(110,63,224,0.3)]` override + horizontal purple gradient on head
  - Timeline event phase dots: detect = danger + pulse-fr 1.4s, escalate/mitigate = amber, investigate = super, resolve = success, review = ink-soft. Vertical 2px spine via `after:` pseudo, suppressed on last event via isLast prop.
  - Action item num circle: complete = success, in-progress = amber, todo = ink. Complete title = line-through + ink-soft.
  - Canonical row tint: `bg-[rgba(232,118,58,0.04)]` + 3px amber left border on first cell (same pattern as Step 34 canonical specialist row)
- **TypeScript strict:** ✅ No errors
- **Build:** ✅ Compiled successfully — `/admin/internal/incidents` (static) + `/admin/internal/incidents/[id]` (SSG, 9 paths)
- **Tailwind-only:** ✅ Inline styles limited to per-responder avatar gradient backgrounds (literal `linear-gradient(...)` values from admin.html responder colors that don't map to existing tokens — same pattern as Step 26 DSR/admin avatars); zero other inline styles across all 4 passes
- **Forbidden classNames:** ✅ Zero matches (no ic-, iah-, ias-, iaf-, iai-, icr-, ite-, ith-, iph-, ict-, icw-, col-ic-, fr-, cd-, pf-, hc-, in-, ids-, etc. in any className string)
- **Notes:**
  - **Cross-step component reuse:** `PrStatStrip` + `PrStat` type from Step 27 reused for LIST 5-stat strip (same as Step 33/34); `AdminActionToastProvider` from Step 34 powers all button feedback toasts; `IcSevBadge` + `IcStatusPill` reused inside DETAIL hero
  - **Filename collision:** `incidents-data.ts` already taken by Step 16 external security incidents (SI-*); this step's fixture lives at `internal-incidents-data.ts` to keep the two domains separate without changing Step 16
  - **Row navigation:** entire `<tr>` is clickable via `useRouter().push()` + keyboard-accessible (`tabIndex={0}`, `role="link"`, Enter/Space `onKeyDown`); chevron button calls `e.stopPropagation()` then `navigate()` to support both click points
  - **Cache invalidation lesson (repeated):** after Pass B added the `[id]` route, dev server held stale route map; user had to `Remove-Item -Recurse -Force .next` + restart `pnpm dev` + hard-refresh browser before row clicks worked. Same lesson as Step 34 specialist row navigation.
  - **2 of 4 PART 8 INTERNAL OPS pages shipped** (Step 34 Performance + Step 35 Incident Reports). Remaining: Step 36 Internal Communications + Step 37 Knowledge Base.

### Step 36 — Internal Communications

- **Status:** ✅ Done — **PART 8 INTERNAL OPS: 3 of 4 pages complete (Steps 34–36)**
- **Session:** 4
- **Routes:** `/admin/internal/communications` (single-page dashboard, no detail route)
- **HTML lines:** 65500–66149 (single view; 4 sections: pinned widget + Messaging + Announcements + Memos)
- **CSS lines:** 30832–31524 (692 lines)
- **Files added:** ~25 total
  - Mock data: `src/lib/mock-data/admin/communications-data.ts` (page meta + meta-pulse + search + 2 header actions + 4 compose options + 5 top stats + canonical ANN-2026-018 pinned card + Section 02 messaging fixture (8 threads + #inc-042-retro conversation with 6 messages) + Section 03 announcements fixture (3 filter buttons + 5 cards) + Section 04 memos fixture (6 rows))
  - Pass A components (7): `icm-meta-pulse.tsx`, `icm-required-ack-chip.tsx` (super-tinted chip replacing Step 35 ic-sev sev-3 markup), `icm-pinned-stat.tsx`, `icm-pinned-card.tsx` (UNIQUE widget — 2px super border + super gradient bg + STATIC "📌 PINNED · ADMIN TEAM" eyebrow no pulse + 16px iaha-dot author avatar + 4-stat row + foot with 2 actions), `icm-compose-dropdown.tsx` (`'use client'` useState toggle + click-outside handler + 4 compose options), `icm-page-header.tsx`, `icm-shell.tsx`
  - Pass B components (7): `icm-section-head.tsx` (shared section head primitive with optional `rightSlot`), `icm-thread-row.tsx` (`'use client'` with 3 variants default/active inverted/unread + 2 avatar kinds person/group), `icm-thread-list.tsx` (left column with internal scroll), `icm-message.tsx` (default + system variants + super role tint), `icm-composer.tsx` (`'use client'` Enter-to-send), `icm-conversation.tsx` (32px square avatar head + 2 quick-action buttons Pin/Info + scrollable body + composer), `icm-messaging-section.tsx` (2-col `[280px_minmax(0,1fr)]` grid with fixed `h-[480px]`, collapses to 1-col + `h-auto` at ≤980px)
  - Pass C components (4): `icm-filter-button.tsx` (stateless), `icm-announcement-meta-row.tsx` (discriminated meta-item sequence: author/scope/pinned/date), `icm-announcement-card.tsx` (default + urgent variants with amber-tinted bg/border + URGENT chip + ACK indicator with partial/full color), `icm-announcements-section.tsx`
  - Pass D components (3): `icm-memo-row.tsx` (`'use client'` with inline audience color), `icm-memos-table.tsx` (5-col thead with `w-[N%]` widths), `icm-memos-section.tsx`
  - Route: `src/app/(admin)/admin/internal/communications/page.tsx` (server, renders IcmShell)
  - Sidebar integration: `sidebar-nav-data.ts` Communications pathname `#communications` → `/admin/internal/communications`; `admin-sidebar.tsx` active-state matcher added for list + descendant routes
- **Passes:**
  - Pass A: page header (meta-pulse + Audit + Compose dropdown with 4 options) + 5-stat strip + UNIQUE pinned-announcement card (ANN-2026-018 with super gradient + REQUIRED ACK chip + 4 inner stats) + sidebar wire-up
  - Pass B: Section 02 Messaging (2-col 480px-tall layout with 8 verbatim threads + canonical #inc-042-retro conversation with 6 verbatim messages + Enter-to-send composer)
  - Pass C: Section 03 Announcements (3 stateless filter buttons + 5 verbatim cards with urgent variant + partial/full ACK indicators + 📌 PINNED inline span + scope chips with 3 variants)
  - Pass D: Section 04 Memos archive (6-row table with eyebrow/title + author + tinted audience + views + published)
- **Data model:**
  - `IcmPinnedData`: id + requiredAckLabel + author avatar (initials + gradient) + author meta + title + summaryHtml + 4 IcmPinnedStat + footMetaHtml + 2 IcmPinnedAction
  - `IcmMessagingSectionData`: sectionHead + sectionActionLabel + threadList (head + 8 IcmThread) + conversation (avatar + name + metaHtml + 2 headActions + 6 IcmMessage + composer placeholder + send label)
  - `IcmAnnouncementsData`: sectionHead + 3 filterButtons + 5 IcmAnnouncementCard (discriminated metaItems: author/scope/pinned/date + optional ack with partial/full variant + bodyHtml + footStatsHtml + footDateText) + footerText + footerActionLabel
  - `IcmMemosData`: sectionHead + headerActionLabel + 6 IcmMemoRow (eyebrow + title + author + audience + audienceColor + views + publishedDate + publishedRel) + footerText + footerActionLabel
  - All fixture content extracted **verbatim** from admin.html lines 65500-66149
- **CSS/Design tokens:**
  - 18 tokens (all existing in globals.css from prior steps)
  - **ZERO globals.css additions** this step (pulse-fr already shipped from Step 32; super/amber/success tints all literal `rgba(...)` matching prior Step 34/35 patterns)
  - Pinned widget: 2px super border + 135° gradient bg using literal `rgba(110,63,224,0.08)` + STATIC "📌 PINNED · ADMIN TEAM" eyebrow chip (NO pulse, unlike Step 35 active-callout)
  - Thread variants: default = base, active = `bg-[var(--ink)]` inverted with paper-tinted text via `rgba(251,248,242,0.55)`, unread = `bg-[rgba(110,63,224,0.04)]` super-tinted + bold preview
  - Avatar kinds: person = `rounded-full`, group = `rounded-[6px]` (channel-style)
  - System message variant: collapsed to 1-col grid (no avatar) + centered dashed-border informational stripe
  - Super role tint: `bg-[rgba(110,63,224,0.10)] text-[var(--super)]` on `.imsg-role.super`
  - Announcement urgent variant: `bg-[rgba(232,118,58,0.04)]` + `border-[rgba(232,118,58,0.3)]` + child "URGENT" amber chip at top
  - ACK pct variants: default = ink-soft, partial = amber, full = success
  - Scope chip variants: default = paper-deep, super = super tint, team = success tint (reserve, not used in markup)
  - Memo audience color: inline `style={{ color: 'var(--super)' | 'var(--success)' }}` per row (CSS defines no color rule on col-mem-scope)
  - Filter buttons: stateless plain cd-action-btn (no `.active` state in admin.html)
- **TypeScript strict:** ✅ No errors
- **Build:** ✅ Compiled successfully — `/admin/internal/communications` (static, single page, no detail route)
- **Tailwind-only:** ✅ ~30 total inline-style instances at runtime: 20 verbatim avatar gradients (8 threads + 1 conv head + 5 messages + 5 announcement authors + 1 pinned author) + 6 memo audience colors + 5 ACK pct `/N` suffix sub-spans + 1 pinned-stat `/12` suffix + 1 📌 PINNED color/weight override on ANN-2026-018. All extracted verbatim from admin.html.
- **Forbidden classNames:** ✅ Zero matches (no ic2-, iph-, ips-, ipf-, itlh-, itr-, ich-, imsg-, icomp-, iah-, iaha-, iaf-, icmt-, col-mem-, fr-, cd-, etc. in any className string)
- **Notes:**
  - **Component naming `icm-*`** maps to admin.html's `ic2-*` CSS prefix (chosen to avoid awkward TS identifier with leading digit). Class names are forbidden anyway, so mapping is internal-only.
  - **Filename `communications-data.ts`** — distinct from any prior step (no collision).
  - **Cross-step component reuse:** `PrStatStrip` + `PrStat` type from Step 27 reused for 5-stat strip; `AdminActionToastProvider` from Step 34 powers all button/row feedback toasts.
  - **No detail route**: flat single-page dashboard per admin.html (no `view-comm-detail` or `view-announcement-detail` exists). All "open thread / open memo / open announcement" actions fire toast feedback instead of navigation.
  - **Fixed 480px messaging height**: matches admin.html CSS (`height: 480px` on `.ic2-messaging-layout`). Collapses to `auto` at ≤980px breakpoint.
  - **Composer Enter-to-send** added as a UX nicety (not in admin.html); Shift+Enter ignored since input is single-line.
  - **Mateo's scope chip** on ANN-2026-011 uses `default` variant (no super tint) per admin.html line 66009 markup — followed exactly despite his purple author avatar.
  - **3 of 4 PART 8 INTERNAL OPS pages shipped** (Step 34 Performance + Step 35 Incident Reports + Step 36 Internal Communications). Remaining: Step 37 Knowledge Base.

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
| 30 | Categories & Skills | ✅ Done |
| 31 | Integrations | ✅ Done |
| 32 | Email & SMS Templates | ✅ Done |
| 33 | Help Center Content | ✅ Done |

### Internal group (4 entities, 3 shipped)

| Step | Title | Status |
|---|---|---|
| 34 | Performance Dashboards | ✅ Done |
| 35 | Incident Reports | ✅ Done |
| 36 | Internal Communications | ✅ Done |
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
