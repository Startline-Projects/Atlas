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
| 1 | Admin Sign In | ✅ done | src/components/admin/signin-form.tsx, src/components/admin/signin-preview-panel.tsx, src/components/admin/timeout-modal.tsx, src/components/ui/icons.tsx | 2FA, CAPTCHA, lockout, anomaly detection states |
| 2 | Admin Dashboard | ❌ not started | — | Critical alerts, platform health, financial snapshot, activity feed |
| 3 | Admin Profile & Permissions | ❌ not started | — | Permissions matrix, activity timeline, account settings |
| 4 | Users Overview | ❌ not started | — | Tabs (Candidates, Clients, Specialists, Manager, Admins), bulk actions |
| 5 | Candidate Detail | ❌ not started | — | Identity verification, vetting pipeline, engagement history, audit log, trust signals |
| 6 | Client Detail | ❌ not started | — | Similar structure to Step 5, client-specific sections |
| 7 | Specialist Detail | ❌ not started | — | Performance summary, caseload, audit-level visibility |
| 8 | Manager Detail | ❌ not started | — | Manager-specific metrics and actions. Singleton route /admin/users/manager — Atlas currently has one Manager of Talent Specialists (Mateo Vargas, mgr-001-v8b2c4). If future product decisions add other manager roles, this route will need to migrate to /admin/users/managers/[id]. Flag for review at that point. |
| 9 | Other Admins | ❌ not started | — | Admin account management, role assignment (Super Admin only) |
| 10 | Active Engagements | ❌ not started | — | List and detail view of contracts in progress |
| 11 | Job Postings | ❌ not started | — | List and detail view of all jobs posted on platform |
| 12 | Disputes | ❌ not started | — | List and detail view of open / escalated disputes (final MVP step) |

### Current session status

- **Current step:** 1 (Sign In) — DONE
- **Last finished:** 1 (Admin Sign In)
- **Next step:** 2 (Admin Dashboard) — pending approval to begin

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
