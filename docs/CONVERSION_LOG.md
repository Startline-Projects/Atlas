# Conversion Log

Decisions made while converting the static HTML mockups into the Next.js
codebase. Future sessions read this **before** Step 1 of their plan so we
don't relitigate decisions.

Sessions are numbered to match the conversion plan in `PROMPT.md`-style
session prompts.

---

## Session 0 — Landing page foundation

**Source:** `homepage__10_.html` view-home (lines 19599–20561).
**Routes shipped:** `/`.
**Commit:** `790b101` on `main`.

### Decisions

- **Tailwind v4 CSS-first config.** Tokens live in `src/app/globals.css`
  under `@theme`. No `tailwind.config.ts`. The `@theme inline { ... }` block
  carries `next/font` runtime variables. Re-evaluate per ADR if v4 stops
  being a comfortable fit.
- **Three semantic dark-surface tokens added** to keep components free of
  arbitrary hex: `--color-ink-deep` (#1a1a17), `--color-ink-line` (#2a2a24),
  `--color-paper-mute` (#b5b1a7). Used by the calc card, candidate-CTA
  benefit cards, and muted body copy on dark sections.
- **Reusable component classes in `@layer components`**: `.container-page`,
  `.eyebrow`, `.display`, `.serif-italic`, `.underline-accent`, `.btn`,
  `.btn-primary`, `.btn-ghost`, `.btn-lime`, `.btn-outline`, `.btn-lg`,
  `.atlas-range`. Section-specific styling uses Tailwind utilities.
- **Marketing shell** is a thin client wrapper (`MarketingShell`) so the
  signup-modal toggle can be threaded between NavBar and SignupModal while
  the page itself stays a Server Component.
- **Lucide icons** stand in for the source's hand-rolled category SVGs.
  Visually close, not pixel-identical. Swap to inline SVG if exact match
  matters.
- **Next.js 16.2.4** (not 15) — `pnpm create next-app@latest` selected the
  current major. Same App Router; downgrade is trivial if needed.

---

## Session 1 — Specialist console: shell + auth + dashboard

**Source:** `specialist (12).html` (lines 13217–14689).
**Spec:** `docs/document_pdf.pdf` (Talent Specialist Interface scope).
**Routes shipped:** `/specialist/signin`, `/specialist/forgot`,
`/specialist/dashboard`, plus eleven `Coming soon` placeholders for the
remaining sidebar items (`/specialist/review-queue`, `/recert-queue`,
`/my-candidates`, `/my-clients`, `/sourcing`, `/disputes`, `/pool-health`,
`/daily-activity`, `/reviews`, `/performance`, `/help`).

### Tokens added (this session)

Compared `:root` in `specialist (12).html` (lines 19–50) against the
existing `@theme` in `globals.css`. **Four** tokens were missing:

| Token | Value | Used where |
|---|---|---|
| `--color-success` | `#2E7D54` | approve / verified states, success pill text |
| `--color-success-bg` | `#E7F2EC` | success pill background |
| `--color-danger-bg` | `#FBEAE6` | inline error / danger pill background |
| `--shadow-card` | three-layer 0+1+2/0+2+6/0+24+60 | dashboard tile lift, auth card |
| `--color-lime-text` | `#5A6B14` | yellow-priority urgent-card type label, lime-tinted "live" pills (added in 5.4) |

All five added to `globals.css` `@theme` and now generate utilities
(`bg-success`, `bg-success-bg`, `bg-danger-bg`, `shadow-card`,
`text-lime-text`).

Everything else (cream, ink, lime, ink-deep/line/paper-mute, the three
other shadows, all radii, all fonts) was already in place from Session 0.

### Sidebar nav — source of truth (intentional deviation from PDF)

The HTML and the spec PDF disagree on the sidebar list. **This is an
intentional deviation, not an oversight.** The HTML version wins for
this and all future Specialist sessions:

1. The HTML is more recent than the PDF and groups items into "Workspace"
   and "Operations" — grouped nav scales better as Manager mode and
   other internal surfaces are added.
2. The HTML adds a **Re-cert queue** entry the PDF's sidebar list omits.
   Re-certification is a real workflow described later in the same PDF
   (Step 4), so the HTML's inclusion is consistent with the spec's intent.
3. The HTML labels the catalog item "Reviews" (not the PDF's "Reviews &
   Approvals") — matches the rest of the navigation's brevity.

If a future spec revision removes Re-cert queue or flattens the sections,
update this section, `nav-items.ts`, and the Sidebar component together.

Final sidebar (in render order), encoded in
`src/lib/mock-data/specialist/nav-items.ts`:

| Section | Key | Label | Badge | Mobile |
|---|---|---|---|---|
| Workspace | `dashboard` | Dashboard | — | shown |
| Workspace | `review-queue` | Review queue | 3 (urgent) | shown |
| Workspace | `recert-queue` | Re-cert queue | 5 (attention) | shown |
| Workspace | `my-candidates` | My candidates | 47 | shown |
| Workspace | `my-clients` | My clients | 12 | shown |
| Workspace | `sourcing` | Sourcing | — | hidden |
| Workspace | `disputes` | Disputes | 1 (urgent) | shown |
| Workspace | `pool-health` | Pool health | 18 (lime) | hidden |
| Operations | `daily-activity` | Daily activity | — | hidden |
| Operations | `reviews-approvals` | Reviews | — | hidden |
| Operations | `performance` | Performance | — | hidden |
| Operations | `help` | Help & resources | — | hidden |

`mobile-hide` matches the source's `.mobile-hide` class. Sidebar footer
shows the specialist's category + pool dot + live count.

### Mock data conventions

All hardcoded data lives under `src/lib/mock-data/specialist/`.

- Each file exports **named** `const`s with explicit types — no default
  exports, no untyped literals.
- The shapes mirror the future API payload (`apiClient.specialist.*`),
  so when real data wires up the call sites change one import, not the
  data shape.
- Constants encode spec rules: `POOL_DEPLETION_THRESHOLD = 15`,
  `DISPUTE_SLA_HOURS = 72`. UI never hardcodes these.
  > **Migration note for future sessions:** these are business rules,
  > not mock data. They live alongside mock data only because there's no
  > backend yet. **When the Specialist service slice is built** (likely
  > Session 4–6 or whenever real data arrives), move both constants to
  > `src/lib/config/constants.ts` and re-export-or-delete from the
  > mock-data module. Services and any client code should import from
  > `lib/config`, not from `lib/mock-data`.
- `IMPLEMENTED_ROUTES` is the truth list of routes that have a real
  page; placeholder routes render a one-line "Coming soon" stub.
- A barrel `index.ts` lets call sites do
  `import { ... } from "@/lib/mock-data/specialist";`.

### Conventions established (apply to all specialist sessions)

1. **Sidebar icons stay inline SVG**, not lucide-react. Reasons:
   - They're a fixed set of 12 — the lucide bundle is overkill.
   - The source uses 1.4-stroke custom shapes that lucide doesn't match.
   - Sidebar is a Server Component; inline SVG keeps it that way.
   - Marketing icons stay on lucide; the two surfaces don't share.
2. **Routes are Next.js routes**, not hash routes. The HTML `data-route`
   and `href="#x"` patterns become `<Link href="/specialist/x">`.
3. **Auth layout vs console layout** are separate route groups:
   `(specialist-auth)` (centered card, no sidebar/ribbon) and
   `(specialist)` (ribbon + sidebar + main).
4. **Staff ribbon** ("ATLAS · STAFF CONSOLE · RESTRICTED") sits inside
   the `(specialist)` layout above everything else.
5. **Active-route highlighting** uses `usePathname()` in the Sidebar; the
   sidebar is a Client Component for that one reason.
6. **Forms are visual only** — no submit handlers beyond
   `e.preventDefault()` until auth is wired in a later session.

### Auth states deferred from Session 1

The HTML signin view has six visual states: `default`, `2fa`, `lockout`,
`suspended`, `password-expired`, `routing`. **Only `default` is rendered**
this session (per scope: "pure UI form, no submit handler beyond
preventDefault"). The 2FA and lockout markup is sketched as separate
unexported helpers inside `signin-form.tsx` so a later session can lift
them without re-translating.

### Session 1 deliverable summary

**Files touched (this session only):**
- `src/app/globals.css` — added 4 tokens (success, success-bg, danger-bg, shadow-card).
- `src/lib/mock-data/specialist/{current-user,nav-items,dashboard-kpis,dashboard-cards,index}.ts` — created.
- `src/app/(specialist-auth)/layout.tsx` — created.
- `src/app/(specialist-auth)/signin/page.tsx` — created.
- `src/app/(specialist-auth)/forgot/page.tsx` — created.
- `src/app/(specialist)/layout.tsx` — created.
- `src/app/(specialist)/dashboard/page.tsx` — created.
- `src/app/(specialist)/{review-queue,recert-queue,my-candidates,my-clients,sourcing,disputes,pool-health,daily-activity,reviews,performance,help}/page.tsx` — placeholder pages.
- `src/components/specialist/shell/{sidebar,sidebar-nav-item,sidebar-profile,staff-ribbon}.tsx` — created.
- `src/components/specialist/auth/{signin-form,forgot-form}.tsx` — created.
- `src/components/specialist/dashboard/{dashboard-header,kpi-strip,urgent-cards,snapshot,three-column,performance-card,activity-feed,quick-actions}.tsx` — created.
- `docs/CONVERSION_LOG.md` — created (this file).

(The exact final filenames may shift slightly during 5.4; this list will
be tightened up at the end of Session 1.)

### What Session 2 needs to know

- **Sidebar links work but most pages are stubs.** Session 2 will pick a
  surface (review queue, my candidates, etc.), replace the stub at that
  route with the real implementation, and bump the `IMPLEMENTED_ROUTES`
  list in `nav-items.ts`.
- **Mock data lives in `lib/mock-data/specialist/`.** Add new files
  here for any new view (e.g., `review-queue.ts`); follow the same
  named-export + explicit-type convention.
- **Shapes align with the future API.** When auth + services are wired,
  the migration is one import change per call site, not a redesign.
- **Auth is intentionally not wired.** SigninForm calls
  `e.preventDefault()` only. Don't paper-fix this in Session 2 —
  Clerk vs Auth.js v5 is the Week 0 decision per `TECH_STACK.md` §7.

---

