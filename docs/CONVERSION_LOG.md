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

## Session 2 — Specialist console: review queue + recert queue

**Source:** `specialist (12).html` `view-review-queue` (lines 14690–15665) and
`view-recert-queue` (lines 15667–16595).
**Spec:** `docs/document_pdf.pdf` Part 2 Step 3 (Review Queue) and Step 4
(Re-Certification Review).
**Routes shipped:** `/specialist/review-queue`, `/specialist/recert-queue`.
Both routes leave Session 1's `Coming soon` stub behind and gain real
implementations. `IMPLEMENTED_ROUTES` in `nav-items.ts` now lists three
entries.

### Tokens added (this session)

**None.** Every hex in the queue CSS block (`specialist (12).html` lines
~2628–4100) maps to an existing token. The two recurring arbitrary
values — `#FFFDF7` (input/avatar surface) and `#C4BCA9` (hover border
accent) — already appeared inline in Sessions 0 and 1; no new tokens
warranted yet. If either crosses 5+ inline occurrences during 5.2/5.3
they get factored to a token mid-build.

### Routing — slug deviation from PDF (intentional)

The spec PDF lists `/specialist/re-cert-queue` (with a hyphen between
"re" and "cert"). Session 1 chose `/specialist/recert-queue` (no
separator) to match the source HTML's `#recert-queue` slug. Per the
"HTML wins" rule established in Session 1, the recert queue ships at
`/specialist/recert-queue` and the PDF's URL is intentionally not used.
If the spec is revised, update `nav-items.ts`, this section, and the
folder structure together.

### Business rules from the PDF (encoded as named constants)

Now living in `src/lib/mock-data/specialist/review-queue.ts` and
`recert-queue.ts`. **Migration note (carries the same one-direction
push as Session 1's POOL_DEPLETION_THRESHOLD):** every constant below is
a business rule, not data. When the Specialist service slice is built,
move them to `src/lib/config/constants.ts` and re-export-or-delete from
the mock-data modules. Services and any client code import from
`lib/config`, not `lib/mock-data`.

| Constant | Value | Source |
|---|---|---|
| `REVIEW_SLA_HOURS` | `24` | PDF §SLA — 24h window from candidate submission |
| `REVIEW_WARN_THRESHOLD_HOURS` | `24` | PDF §"Time since submission color-coded" — amber at 24h |
| `REVIEW_URGENT_THRESHOLD_HOURS` | `48` | PDF — red at >48h |
| `REJECT_REAPPLY_LOCKOUT_MONTHS` | `6` | HTML reject-modal copy |
| `RECERT_CYCLE_MONTHS` | `12` | PDF Step 4 + HTML stripe copy |
| `RECERT_OFFBOARD_GRACE_DAYS` | `[0, 14, 30]` | HTML off-board modal options |

> **POLICY UNDER REVIEW: `REJECT_REAPPLY_LOCKOUT_MONTHS = 6`.** The
> 6-month reapply lockout is taken from the HTML modal copy and is **not
> legally finalized**. Before this rule actually enforces anything in
> production, it must be reviewed with legal/policy. The constant is in
> mock-data only for now; when services land it moves to `lib/config`
> and the legal review must happen in the same PR.

### UX decisions (NOT spec-derived) — adjustable

These shape the queue UI but come from the conversion team's UX
judgment, not the PDF or HTML. Future sessions may revise them as the
specialist team gives usage feedback:

| Constant | Value | Why this number |
|---|---|---|
| `RECERT_BULK_APPROVE_MIN` | `2` | Threshold for surfacing the bulk-approve action in the recert rail. Below 2, the action adds clutter without saving meaningful clicks; above some upper bound the bulk-approve flow needs a confirmation step. 2 is the smallest useful value; revisit after first month of specialist usage. |

### Sidebar nav update

`IMPLEMENTED_ROUTES` bumped from 1 entry to 3. The longest-prefix-match
sidebar from Session 1 keeps highlighting the right item without code
changes. No sidebar component edits this session.

### Mock data shapes

Two new typed modules + a shared types module:

- `queue-types.ts` — types shared by both queues. Notable exports:
  `IvCardData` (the universal AI score-card shape used in Overview, both
  Interviews, and AI assessment); `Reference`, `ReferenceStatus` (full
  spec enum: `pending | confirmed | conflicting | unreachable`);
  `AntiCheatBlock`; `DecisionBarConfig`; `TabDef`; `AVATAR_GRADIENTS` (a
  named map of decorative gradient pairs reused across both views).
- `review-queue.ts` — `ReviewQueueCandidate` plus 9 candidates that
  collectively cover every failure mode the UI handles: clear-pass with
  pending reference (Marie); clear-pass with all confirmed (Carmen);
  borderline (Hana); unreachable reference (Wei); conflicting reference
  (Tomás); anti-cheat flag raised (Linh P. Tran); clear-fail (Rajan);
  fresh in queue (Sofia); SLA-breach >48h (David). 3 candidates carry
  full HTML-fidelity detail; 6 are tighter but every section
  populated.
- `recert-queue.ts` — `RecertCandidate` plus 5 candidates covering:
  bulk-approvable + rating climbed + tier upgrade (Anand);
  due-in-5-days + needs action (Aaliyah); bulk-approvable clean record
  (Linh Nguyen — different person from review-queue Linh); multiple
  active engagements so off-board grace is visible (Marcus); profile
  changes flagged (Priya).

### `queue-shared/` — components factored as shared (committed in 5.2)

The two views' chrome is character-for-character the same; only the
content differs. The following will live under
`src/components/specialist/queue-shared/` and be imported by both
queues — no per-queue forks. If queue-specific behavior surfaces during
5.2/5.3, prefer adding a discriminator prop over duplicating the file:

- `queue-shell.tsx` — 3-col grid (existing sidebar + queue rail +
  main column)
- `queue-rail.tsx` (header + filter chips + list + empty-state)
- `review-header.tsx` (breadcrumb + pager + identity row + progress bar)
- `review-tabs.tsx` (sticky tab bar with `TabDef[]` + active key)
- `iv-card.tsx` (overall + sub-bars + highlights + commentary)
- `decision-bar.tsx` (sticky 3-button bar; button labels come from
  `DecisionBarConfig`)
- `review-modal.tsx` (modal shell — header, body, footer slots)
- `reject-reason-chips.tsx` (single-select pill row)
- `identity-grid.tsx` (anti-cheat 4-up grid + summary)
- `ref-list.tsx` (reference cards)
- `notes-card.tsx` (auto-save textarea placeholder)
- `approved-flash.tsx` (full-screen success overlay)

Page-specific section components will live under
`src/components/specialist/review-queue/sections/` and
`src/components/specialist/recert-queue/sections/`.

### Conventions established (Session 2 additions)

1. **No `e.preventDefault()`-only forms beyond what the prior sessions
   already establish.** Multi-select for batch actions (if any) and the
   filter chips use local `useState`; submit handlers stay no-op until
   services land.
2. **The selected candidate is local Client state.** No URL search
   params yet (`?candidate=...`) — adding URL state is a future-session
   change once real data lands and the back button needs to roundtrip.
3. **Mock data shapes mirror the future API.** When real candidate data
   arrives via `apiClient.specialist.reviewQueue.list()`, call sites
   change one import. The same applies to recert.
4. **Review tabs render in body font, sentence case.** Per source CSS
   line 3022–3035 (`.review-tab` has `font-family: var(--font-body);
   font-size: 12.5px; font-weight: 500;` — no `text-transform`, no
   `letter-spacing`). An earlier review (Session 2 / 5.2 fix pass)
   flagged them as needing uppercase; that was a misread of the
   breadcrumb above the tab strip. Source-as-truth upheld. Not a
   deviation. **Future sessions should not "fix" this.**

### Session 2 — what Session 3 needs to know

- **Candidate profile detail page is referenced but not built.** The
  review-queue list and many cross-links inside the detail pane assume
  a `/specialist/candidates/[id]` (or similar) profile page exists.
  Session 3 (per the conversion plan) builds candidate management
  including that profile page; until it lands, profile links route to
  the existing `/specialist/my-candidates` "Coming soon" placeholder.
- **`queue-shared/` is real shared code.** Don't fork it for new queues
  unless behavior diverges; prefer adding a discriminator prop.
- **`POLICY UNDER REVIEW`: `REJECT_REAPPLY_LOCKOUT_MONTHS`.** Don't
  enforce this rule in any service or guard until legal/policy review
  is complete. Update this log when that review happens.
- **Constants migration target.** All Session 2 constants move from
  mock-data to `lib/config/constants.ts` when the Specialist service
  slice is built. Same migration path Session 1 set for
  `POOL_DEPLETION_THRESHOLD` and `DISPUTE_SLA_HOURS`.

---
