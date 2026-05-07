# Admin Interface Conversion Log

Decisions and progress tracking for converting the Atlas Admin Interface from `reference/admin.html` into a Next.js application.

---

## Session 2 — Admin Interface: Steps 1–12

**Source:** `reference/admin.html` (30,216 lines).
**Spec:** `reference/scope-pdfs/Atlas-Admin-Interface-Scope.pdf` (40-step functional spec).
**Routes to ship (Steps 1–12):** `/admin/signin`, `/admin/dashboard`, `/admin/profile`, `/admin/users`, `/admin/users/candidates/[id]`, `/admin/users/clients/[id]`, `/admin/users/specialists/[id]`, `/admin/users/manager`, `/admin/users/admins`, `/admin/engagements`, `/admin/engagements/[id]`, `/admin/jobs`, `/admin/jobs/[id]`, `/admin/disputes`, `/admin/disputes/[id]`.

### Design tokens (Session 2)

The admin.html `:root` (lines 19–63) introduces four additional tokens beyond what Sessions 0 and 1 added. Compare against current `globals.css` `@theme` and add any missing:

| Token | Value | Used where |
|---|---|---|
| `--restricted` | `#8B1A1A` | restricted chrome, security-sensitive headers |
| `--restricted-bg` | `#F5E2DD` | restricted background |
| `--super` | `#6E3FE0` | Super-Admin-only actions (deferred to Step 9+) |
| `--super-bg` | `#EFE9FB` | Super-Admin background (deferred) |

Note: `--logged`, `--logged-bg` are present in the HTML but unused in Steps 1–12; defer adding them until Step 13 (Reviews moderation) requires audit indicators.

### Source line ranges (for navigation)

| Step | View ID(s) | HTML line range |
|---|---|---|
| 1 | view-signin | 12569–13331 |
| 2 | view-dashboard | 13332–13933 |
| 3 | view-profile | 13934–14895 |
| 4 | view-users | 14896–15914 |
| 5 | view-candidate | 15915–17093 |
| 6 | view-client | 17094–18206 |
| 7 | view-specialist | 18207–19362 |
| 8 | view-manager | 19363–20632 |
| 9 | view-admins | 20633–21373 |
| 10 | view-engagements + view-engagement | 21374–22292 |
| 11 | view-jobs + view-job | 22293–23446 |
| 12 | view-disputes + view-dispute | 23447–~24692 |

### Conversion order (Session 2)

Build in this sequence, one step at a time:

| Step | Title | Status | Files | Notes |
|---|---|---|---|---|
| 1 | Admin Sign In | ✅ done | src/components/admin/signin-form.tsx, src/components/admin/timeout-modal.tsx, src/lib/admin/signin-state-context.tsx, src/components/admin/admin-preview-panel.tsx, src/app/admin/layout.tsx, src/components/ui/icons.tsx | 2FA, CAPTCHA, lockout, anomaly detection states; preview panel refactored to layout level with React Context for state sharing |
| 2 | Admin Dashboard | ❌ not started | — | Critical alerts, platform health, financial snapshot, activity feed |
| 3 | Admin Profile & Permissions | ❌ not started | — | Permissions matrix, activity timeline, account settings |
| 4 | Users Overview | ❌ not started | — | Tabs (Candidates, Clients, Specialists, Manager, Admins), bulk actions |
| 5 | Candidate Detail | ✅ done | ProfileSectionIdentity, ProfileSectionPipeline, ProfileSectionSnapshot, ProfileSectionEngagements, ProfileSectionFinancial, ProfileRail, ProfileSectionTrust, ProfileSectionPrivacy, CandidateProfileShell, ProfileSectionCommunications, CommunicationFilterTabs, ProfileSectionAudit | 11 sub-steps (5a–5k): identity verification, vetting pipeline, profile snapshot, engagements, financial, quick facts, trust signals, privacy, shell/nav, communications (filter tabs + threads), audit log (day-grouped timeline, pseudo-line/dot, outcome labels, avatar initials). All 4 audit passes completed. 13 visual-fidelity drifts fixed. 6 conversion patterns documented. |
| 6 | Client Detail | ❌ not started | — | Similar structure to Step 5, client-specific sections |
| 7 | Specialist Detail | ❌ not started | — | Performance summary, caseload, audit-level visibility |
| 8 | Manager Detail | ❌ not started | — | Manager-specific metrics and actions. Singleton route /admin/users/manager — Atlas currently has one Manager of Talent Specialists (Mateo Vargas, mgr-001-v8b2c4). If future product decisions add other manager roles, this route will need to migrate to /admin/users/managers/[id]. Flag for review at that point. |
| 9 | Other Admins | ❌ not started | — | Admin account management, role assignment (Super Admin only) |
| 10 | Active Engagements | ❌ not started | — | List and detail view of contracts in progress |
| 11 | Job Postings | ❌ not started | — | List and detail view of all jobs posted on platform |
| 12 | Disputes | ❌ not started | — | List and detail view of open / escalated disputes (final MVP step) |

### Current session status

- **Current step:** 5 (Candidate Detail) — DONE (all 11 sub-steps: 5a–5k completed and verified)
- **Last finished:** 5k (Communications & Audit Log) — day-grouped timeline, outcome labels, avatar initials, status pills
- **Next step:** 6 (Client Detail) — pending approval to begin

### Step 1 — Fixes and refactors applied

- **Preview panel positioning** (commit bb33f8a): Fixed floating position to match admin.html (`bottom-5 right-5`, `max-h-[70vh] overflow-y-auto`). Panel now floats in bottom-right corner without pushing page content.

- **Preview panel refactor to shared component + Context fix** (Phase 1 commit): 
  - Renamed `SignInPreviewPanel` → `AdminPreviewPanel`
  - Added 15-tab view switcher (Signin, Dash, Profile, Users, Cand, Clnt, Spec, Mgr, Adm, Eng·List, Eng·Detail, Job·List, Job·Detail, Disp·List, Disp·Detail, + locked Rev tab)
  - Moved panel from `/src/components/admin/signin-form.tsx` to `/src/app/admin/layout.tsx` so it wraps all admin routes
  - Created React Context (`SignInStateContext`) at `/src/lib/admin/signin-state-context.tsx` to share sign-in state between panel and form without prop drilling
  - Panel state buttons now update the form in real-time
  - TimeoutModal moved from signin-form to layout level
  - Used design tokens for colors instead of raw hex values
  - Tab clicks toggle internal state (no route navigation in Phase 1)
  - All 8 browser tests verified (state buttons trigger form changes, tabs switch panel content, timeout modal opens)
  - This pattern is reused for Steps 2–12

### In scope (Session 2)

- Admin interface only (Steps 1–12 from `reference/admin.html`)
- All 15 views (view-signin, view-dashboard, view-profile, view-users, view-candidate, view-client, view-specialist, view-manager, view-admins, view-engagements, view-engagement, view-jobs, view-job, view-disputes, view-dispute)
- Design tokens specific to admin
- Routes and layout structure matching Next.js conventions
- **Behavioral fidelity:** every link, button, action, state, animation, filter, tab, and interaction must match admin.html exactly

### Out of scope (Session 2)

- **Specialist interface** — Session 1 owns `/specialist/*` routes; do not touch
- **Public landing page** — Session 0 owns `/` and `(marketing)` group; do not touch
- **Candidate UI** — deferred to later session
- **Client UI** — deferred to later session
- **Steps 13–40** — not yet present in `reference/admin.html`. The HTML source currently contains Steps 1–12 only. When `reference/admin.html` is extended to include Step 13 (Reviews moderation) and beyond, those steps will be added to this conversion in the same sequential order. Do not invent or scaffold those steps before the HTML source for them exists.
- **Backend logic, services, auth integration** — API and services are out of scope; sign-in form is presentational only

### Durability rule (Session 2)

Every time a step is completed:
1. Update this section: change "current step", "last finished", "next step", and mark the step row as ✅ done
2. Commit the `/docs/admin/CONVERSION_LOG.md` update in the SAME commit as the step's code
3. Do not modify any other doc file

This ensures future sessions can read `/docs/admin/CONVERSION_LOG.md` and immediately know which step we're on and what work remains.

---

Structure Claude Code follows (read before every step)
Before implementing any step, Claude Code MUST verify the following layout exists and respect it. This is enforced by AI_RULES.md §3.6 and FOLDER_STRUCTURE.md. No exceptions.
Routes:

Main admin views → src/app/(admin)/admin/<feature>/page.tsx
Admin auth views → src/app/(admin-auth)/admin/<auth-route>/page.tsx
Detail routes use dynamic segments → src/app/(admin)/admin/users/candidates/[id]/page.tsx

Components (admin-only UI):

src/components/admin/shell/ — layout, topbar, sidebar, preview panel
src/components/admin/auth/ — signin form, OTP, timeout modal
src/components/admin/<feature>/ — feature-specific components (one folder per step's view)

Mock data:

ALL .ts data files → src/lib/mock-data/admin/
Barrel re-exports in src/lib/mock-data/admin/index.ts
Components import via @/lib/mock-data/admin/<file> (direct path, not barrel)

Client state / context:

src/lib/admin/<feature>-state-context.tsx
Never under src/components/

Hard invariants:

❌ NO .ts data files under src/components/
❌ NO components or JSX under src/lib/
❌ NO Tailwind utility classes for raw hex colors — use design tokens (bg-restricted, bg-restricted-bg, bg-super, etc.) defined in src/app/globals.css @theme
❌ NO inline style={{ color: '#8B1A1A' }} — always Tailwind classes
✅ Always Tailwind. No CSS modules, no styled-components.
✅ Server Components by default. "use client" only where needed (state, scroll listeners, modals).
✅ Reuse AdminPreviewPanel from layout — never re-import or duplicate it inside a step's page.

### Conversion patterns (documented in Phase 5 commits)

1. **Design token naming in arbitrary brackets:** Always use SHORT aliases from `:root` block (e.g., `var(--line)` not `var(--color-line)`) when using arbitrary bracket notation like `border-[var(...)]`. SHORT aliases resolve correctly; LONG form from `@theme` silently falls back.

2. **Fraunces font optical sizing:** Use `font-display` utility for font-family PLUS separate `[font-variation-settings:'opsz'_96]` arbitrary class for optical sizing. The `font-display` utility alone sets only the font-family; optical sizing requires the variation-settings override.

3. **Status pill pseudo-elements with currentColor:** Implement ::before/::after dots/icons as semantic HTML divs (not CSS pseudo-elements) when they need to inherit color from parent. Pattern: `before:content-[''] before:bg-[currentColor]` makes the dot inherit the text color of its container, eliminating need for separate color rules per variant.

4. **Outcome label vs. variant data structure:** Store outcome as an object with two fields, not a string enum. Shape: `outcome?: { label: string; variant: 'success' | 'partial' | 'escalated' }`. The `label` is the display text ("Auto-approved", "Verified · 2FA", etc.); `variant` is the CSS class selector. This separation allows specific labels per event type while sharing color logic.

5. **Avatar initials as explicit data, not derived:** Add `initials: string` field to data interfaces. Do NOT derive initials from name parsing (e.g., `name.split(' ').map(w => w[0])`), as multi-word names like "The Lagos Loom" produce "TL" instead of intended "LL". Admin.html hardcodes initials per row; store them as data.

6. **Day-grouped lists (Pattern X: single card, inline header dividers):** When admin.html shows grouped content (audit days, threads by date, engagement history by year), the structure is ONE card with header dividers inside, not MULTIPLE cards per group. Headers use a different background color (paper-deep/cream) and border lines to create visual separation. Store a `dayGroup?: { label, count }` field on the FIRST entry of each group; render emits a divider when the field is present. Labels are bespoke ("Today · April 30, 2026", "Mar 12, 2024 — Mar 8, 2024 · earlier") and must be stored as data, not computed from timestamps.

Step 5 sub-step breakdown (Candidate Detail)
Step 5 is large (HTML lines 15915–17093, ~1,178 lines, 9 sections + header + action toolbar). Split into 11 sub-steps. Ship one sub-step per commit. Update the row's status here when each sub-step closes.

| Phase | Section(s) | HTML lines | Status | Files | Notes |
|---|---|---|---|---|---|
| 5a | Identity Verification | 16015–16186 | ✅ | ProfileSectionIdentity, IdentityVerificationContext | Type-safe interfaces for IdentityCheckResult antifraudChecks array |
| 5b | Vetting Pipeline | 16188–16322 | ✅ | ProfileSectionPipeline, VettingPipelineContext | Pipeline step timeline with color-coded status badges |
| 5c | Profile Snapshot | 16324–16464 | ✅ | ProfileSectionSnapshot, ProfileSnapshotContext | Skills grid, work history, portfolio, ratings |
| 5d | Engagement History | 16466–16521 | ✅ | ProfileSectionEngagements, EngagementsContext | Active vs. past engagements, hourly rates, date ranges |
| 5e | Financial Activity | 16523–16626 | ✅ | ProfileSectionFinancial, FinancialContext | Total earned, pending payout, transaction history |
| 5f | Right Rail (Quick Facts) | 16628–16720 | ✅ | ProfileRail | Joined date, timezone, languages, status indicators |
| 5g | Trust & Safety Signals | 16882–16968 | ✅ | ProfileSectionTrust, TrustSignalsContext | Anti-cheat flags, multi-account detection, pattern analysis |
| 5h | Privacy & Legal | 16970–17018 | ✅ | ProfileSectionPrivacy, PrivacyContext | GDPR/CCPA requests, data exports, deletion requests, legal holds |
| 5i | Navigation & Shell | phase-5-overview | ✅ | CandidateProfileShell, ProfileBackRow, ProfileHero, ProfileHeroBanner | Top-level page layout with sidebar navigation, status banners |
| 5j | Search & Filtering | tbd | ❌ | tbd | Candidate search, filter by status, sort by metrics (deferred) |
| 5k | Communications & Audit Log | 16628–16880 | ✅ | ProfileSectionCommunications, CommunicationFilterTabs, ProfileSectionAudit, AVATAR_GRADIENTS lookup map | Section 6 & 7: Filter tabs (All/Specialist/Clients/Admin), thread list with avatar gradients, timeline pseudoelements (pseudo-line and pseudo-dot via semantic divs), day headers, category-based tag colors, outcome badges, responsive mobile layout (max-[540px] variants) |