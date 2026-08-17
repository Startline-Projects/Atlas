# Atlas — Folder Structure

The complete, production-grade directory layout for the Atlas Next.js 15 monolith. **This is the layout. Match it exactly.**

```
atlas/
│
├── src/
│   │
│   ├── app/                                    # Next.js App Router
│   │   ├── (marketing)/                        # Public pages
│   │   │   ├── page.tsx                        # /
│   │   │   ├── pricing/page.tsx
│   │   │   ├── about/page.tsx
│   │   │   └── legal/[slug]/page.tsx
│   │   │
│   │   ├── (auth)/                             # Auth flows
│   │   │   ├── signup/
│   │   │   │   ├── page.tsx
│   │   │   │   └── actions.ts                  # Server Actions (delegate to services)
│   │   │   ├── signin/page.tsx
│   │   │   ├── verify-email/page.tsx
│   │   │   └── reset-password/page.tsx
│   │   │
│   │   ├── (client)/                           # Client interface
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── browse/page.tsx
│   │   │   ├── candidates/[id]/page.tsx
│   │   │   ├── jobs/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── proposals/page.tsx
│   │   │   ├── contracts/[id]/page.tsx
│   │   │   ├── messages/page.tsx
│   │   │   ├── billing/page.tsx
│   │   │   └── settings/page.tsx
│   │   │
│   │   ├── (candidate)/                        # Candidate interface
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── profile/
│   │   │   │   ├── page.tsx
│   │   │   │   └── edit/page.tsx
│   │   │   ├── browse/page.tsx
│   │   │   ├── proposals/
│   │   │   │   ├── page.tsx
│   │   │   │   └── new/page.tsx
│   │   │   ├── contracts/[id]/page.tsx
│   │   │   ├── messages/page.tsx
│   │   │   ├── earnings/page.tsx
│   │   │   └── settings/page.tsx
│   │   │
│   │   ├── (admin)/                            # Admin (minimal MVP)
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── users/page.tsx
│   │   │   ├── users/[id]/page.tsx
│   │   │   ├── transactions/page.tsx
│   │   │   └── audit/page.tsx
│   │   │
│   │   ├── api/                                # ★ THIN HTTP layer
│   │   │   ├── v1/
│   │   │   │   ├── auth/
│   │   │   │   │   ├── session/route.ts
│   │   │   │   │   └── signout/route.ts
│   │   │   │   ├── candidates/
│   │   │   │   │   ├── route.ts
│   │   │   │   │   └── [id]/route.ts
│   │   │   │   ├── clients/
│   │   │   │   │   ├── route.ts
│   │   │   │   │   └── [id]/route.ts
│   │   │   │   ├── jobs/
│   │   │   │   │   ├── route.ts
│   │   │   │   │   └── [id]/route.ts
│   │   │   │   ├── proposals/
│   │   │   │   │   ├── route.ts
│   │   │   │   │   └── [id]/route.ts
│   │   │   │   ├── contracts/
│   │   │   │   │   ├── route.ts
│   │   │   │   │   └── [id]/route.ts
│   │   │   │   ├── messages/
│   │   │   │   │   ├── route.ts
│   │   │   │   │   └── [conversationId]/route.ts
│   │   │   │   ├── payments/
│   │   │   │   │   ├── intents/route.ts
│   │   │   │   │   └── payouts/route.ts
│   │   │   │   ├── uploads/
│   │   │   │   │   └── presign/route.ts
│   │   │   │   ├── notifications/route.ts
│   │   │   │   ├── audit/route.ts                      # admin only
│   │   │   │   └── admin/
│   │   │   │       ├── users/[id]/suspend/route.ts
│   │   │   │       └── refunds/route.ts
│   │   │   │
│   │   │   ├── webhooks/
│   │   │   │   ├── stripe/route.ts
│   │   │   │   ├── supabase/route.ts                   # auth-event hooks (later)
│   │   │   │   └── pusher/route.ts                     # auth endpoint
│   │   │   │
│   │   │   ├── inngest/route.ts                        # background jobs
│   │   │   └── health/route.ts
│   │   │
│   │   ├── layout.tsx                          # Root layout
│   │   ├── globals.css
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   └── loading.tsx
│   │
│   ├── components/                             # React components only
│   │   ├── ui/                                 # shadcn primitives
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...
│   │   ├── forms/                              # Composed form blocks
│   │   │   ├── signup-form.tsx
│   │   │   └── proposal-form.tsx
│   │   ├── client/                             # Client-only components
│   │   ├── candidate/                          # Candidate-only components
│   │   ├── admin/
│   │   ├── shared/                             # Cross-role components
│   │   │   ├── nav.tsx
│   │   │   ├── empty-state.tsx
│   │   │   └── data-table.tsx
│   │   └── icons/
│   │
│   ├── lib/                                    # ★ FRAMEWORK-FREE BUSINESS CODE
│   │   │
│   │   ├── services/                           # ★ ALL BUSINESS LOGIC LIVES HERE
│   │   │   ├── auth/
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.types.ts
│   │   │   │   └── auth.test.ts
│   │   │   ├── identity/                       # KYC
│   │   │   │   ├── identity.service.ts
│   │   │   │   └── identity.test.ts
│   │   │   ├── candidate/
│   │   │   │   ├── candidate.service.ts
│   │   │   │   └── candidate.test.ts
│   │   │   ├── client/
│   │   │   │   ├── client.service.ts
│   │   │   │   └── client.test.ts
│   │   │   ├── job/
│   │   │   │   ├── job.service.ts
│   │   │   │   └── job.test.ts
│   │   │   ├── proposal/
│   │   │   │   ├── proposal.service.ts
│   │   │   │   └── proposal.test.ts
│   │   │   ├── contract/
│   │   │   │   ├── contract.service.ts
│   │   │   │   └── contract.test.ts
│   │   │   ├── messaging/
│   │   │   │   ├── messaging.service.ts
│   │   │   │   └── messaging.test.ts
│   │   │   ├── billing/                        # money + fees
│   │   │   │   ├── billing.service.ts
│   │   │   │   ├── fees.ts                     # the 10% rule lives here
│   │   │   │   └── billing.test.ts
│   │   │   ├── payment/                        # Stripe orchestration
│   │   │   │   ├── payment.service.ts
│   │   │   │   └── payment.test.ts
│   │   │   ├── matching/                       # job ↔ candidate
│   │   │   │   ├── matching.service.ts
│   │   │   │   └── matching.test.ts
│   │   │   ├── notification/
│   │   │   │   ├── notification.service.ts
│   │   │   │   └── notification.test.ts
│   │   │   ├── audit/
│   │   │   │   ├── audit.service.ts
│   │   │   │   └── audit.test.ts
│   │   │   ├── search/
│   │   │   │   └── search.service.ts
│   │   │   ├── storage/                        # file uploads
│   │   │   │   └── storage.service.ts
│   │   │   ├── admin/
│   │   │   │   ├── admin.service.ts
│   │   │   │   └── admin.test.ts
│   │   │   └── index.ts                        # barrel of exported services
│   │   │
│   │   ├── repositories/                       # ★ ONLY PRISMA CALLERS
│   │   │   ├── candidate/
│   │   │   │   ├── candidate.repository.ts
│   │   │   │   └── candidate.mapper.ts
│   │   │   ├── client/
│   │   │   ├── user/
│   │   │   ├── job/
│   │   │   ├── proposal/
│   │   │   ├── contract/
│   │   │   ├── message/
│   │   │   ├── invoice/
│   │   │   ├── payment/
│   │   │   ├── audit-log/
│   │   │   ├── notification/
│   │   │   └── index.ts
│   │   │
│   │   ├── domain/                             # Pure types & enums
│   │   │   ├── user.ts
│   │   │   ├── candidate.ts
│   │   │   ├── client.ts
│   │   │   ├── job.ts
│   │   │   ├── proposal.ts
│   │   │   ├── contract.ts
│   │   │   ├── message.ts
│   │   │   ├── payment.ts
│   │   │   ├── audit.ts
│   │   │   └── shared.ts                       # common types
│   │   │
│   │   ├── validators/                         # Zod schemas
│   │   │   ├── auth.ts
│   │   │   ├── candidate.ts
│   │   │   ├── client.ts
│   │   │   ├── job.ts
│   │   │   ├── proposal.ts
│   │   │   ├── contract.ts
│   │   │   ├── message.ts
│   │   │   └── shared.ts
│   │   │
│   │   ├── errors/                             # Domain error classes
│   │   │   ├── domain-error.ts                 # base class
│   │   │   ├── not-found.ts
│   │   │   ├── forbidden.ts
│   │   │   ├── validation.ts
│   │   │   ├── business-rule.ts
│   │   │   ├── payment.ts
│   │   │   ├── conflict.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── permissions/                        # RBAC
│   │   │   ├── abilities.ts
│   │   │   ├── policies.ts
│   │   │   └── index.ts                        # exports `can()`
│   │   │
│   │   ├── integrations/                       # External services
│   │   │   ├── stripe/
│   │   │   │   ├── stripe.client.ts
│   │   │   │   ├── stripe.payments.ts
│   │   │   │   ├── stripe.connect.ts
│   │   │   │   └── stripe.identity.ts
│   │   │   ├── wise/
│   │   │   │   └── wise.client.ts
│   │   │   ├── pusher/
│   │   │   │   ├── pusher.client.ts
│   │   │   │   └── pusher.events.ts
│   │   │   ├── resend/
│   │   │   │   └── resend.client.ts
│   │   │   ├── inngest/
│   │   │   │   └── inngest.client.ts
│   │   │   ├── anthropic/
│   │   │   │   └── anthropic.client.ts
│   │   │   ├── openai/
│   │   │   │   └── openai.client.ts
│   │   │   ├── supabase/                       # auth admin API + Storage (ADR 0001)
│   │   │   │   ├── supabase.client.ts
│   │   │   │   └── storage.ts
│   │   │   └── upstash/
│   │   │       └── rate-limit.ts
│   │   │
│   │   ├── jobs/                               # Inngest function definitions
│   │   │   ├── send-email.ts
│   │   │   ├── reconcile-payouts.ts
│   │   │   ├── ai-screening.ts                 # Phase 2 hook
│   │   │   ├── webhook-retry.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── api-client/                         # Typed HTTP client (for UI)
│   │   │   ├── client.ts                       # base fetch wrapper
│   │   │   ├── jobs.ts
│   │   │   ├── candidates.ts
│   │   │   ├── clients.ts
│   │   │   ├── proposals.ts
│   │   │   ├── contracts.ts
│   │   │   ├── messages.ts
│   │   │   ├── payments.ts
│   │   │   └── index.ts                        # exports `apiClient`
│   │   │
│   │   ├── api/                                # API helpers (used by route.ts)
│   │   │   ├── response.ts                     # ok, created, handleApiError
│   │   │   └── ratelimit.ts
│   │   │
│   │   ├── auth/                               # Session + RBAC entrypoints
│   │   │   ├── session.ts                      # getSession, requireSession
│   │   │   └── index.ts
│   │   │
│   │   ├── db/                                 # Prisma client singleton
│   │   │   ├── index.ts                        # exports `prisma`
│   │   │   └── transaction.ts                  # tx helper
│   │   │
│   │   ├── observability/
│   │   │   ├── logger.ts                       # pino
│   │   │   ├── sentry.ts
│   │   │   └── trace.ts
│   │   │
│   │   ├── config/
│   │   │   ├── env.ts                          # parsed via Zod from process.env
│   │   │   ├── rate-limits.ts
│   │   │   └── constants.ts
│   │   │
│   │   └── utils/                              # Pure helpers
│   │       ├── money.ts                        # dinero.js wrappers
│   │       ├── date.ts                         # date-fns wrappers
│   │       ├── id.ts                           # cuid2
│   │       └── string.ts
│   │
│   ├── hooks/                                  # React hooks (UI only)
│   │   ├── use-session.ts
│   │   ├── use-realtime-channel.ts
│   │   ├── use-toast.ts
│   │   └── use-debounce.ts
│   │
│   ├── stores/                                 # Zustand (sparingly)
│   │   ├── ui-store.ts
│   │   └── chat-panel-store.ts
│   │
│   ├── emails/                                 # React Email templates
│   │   ├── welcome.tsx
│   │   ├── verify-email.tsx
│   │   ├── proposal-received.tsx
│   │   ├── hire-offer.tsx
│   │   ├── contract-signed.tsx
│   │   └── payment-receipt.tsx
│   │
│   ├── styles/
│   │   └── globals.css
│   │
│   ├── middleware.ts                           # auth, rate limit, CSP nonce
│   └── instrumentation.ts                      # Sentry init
│
├── prisma/
│   ├── schema.prisma                           # source of truth
│   ├── migrations/
│   └── seed.ts
│
├── tests/
│   ├── unit/                                   # Vitest, no DB
│   │   └── (parallel structure to src/lib/services)
│   ├── integration/                            # Vitest + ephemeral DB
│   │   ├── repositories/
│   │   └── api/
│   ├── e2e/                                    # Playwright
│   │   ├── auth.spec.ts
│   │   ├── candidate-onboarding.spec.ts
│   │   ├── client-hires.spec.ts
│   │   ├── messaging.spec.ts
│   │   └── payments.spec.ts
│   └── fixtures/
│       └── seed-data.ts
│
├── docs/
│   ├── ARCHITECTURE.md                         # ★ source of truth
│   ├── PROJECT_SCOPE.md
│   ├── TECH_STACK.md
│   ├── AI_RULES.md
│   ├── FOLDER_STRUCTURE.md                     # this file
│   ├── adr/                                    # Architectural Decision Records
│   │   ├── 0001-monolith-with-extraction-path.md
│   │   ├── 0002-prisma-with-repositories.md
│   │   ├── 0003-supabase-auth.md               # landed as 0001 (first ADR written)
│   │   └── 0004-pusher-vs-ably.md
│   └── runbooks/
│       ├── refund.md
│       ├── suspend-user.md
│       ├── rotate-secrets.md
│       └── restore-from-backup.md
│
├── public/
│   └── (static assets)
│
├── scripts/
│   ├── check-architecture.ts                   # custom lint for layer rules
│   └── generate-api-client.ts                  # if generated from OpenAPI
│
├── .env.example                                # all env vars documented
├── .env.local                                  # gitignored
├── .eslintrc.cjs                               # includes import/no-restricted-paths
├── .prettierrc
├── .gitignore
├── tsconfig.json                               # strict
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
├── vitest.config.ts
├── playwright.config.ts
├── package.json
├── pnpm-lock.yaml
└── README.md
```

---

## Per-Role Surface Structure (Template)

Every new role surface (specialist, admin, candidate, client, manager, etc.) follows this **canonical pattern exactly**. Specialist and admin are the reference implementations. No exceptions without an ADR.

### Routes

```
src/app/
├── (role)/                          ← route group for main surface
│   ├── layout.tsx
│   └── role/                        ← inner folder (same name as role)
│       ├── [feature]/
│       │   └── page.tsx             → /role/[feature]
│       └── dashboard/page.tsx       → /role/dashboard
│
└── (role-auth)/                     ← separate route group for auth
    ├── layout.tsx                   (own layout, own state provider)
    └── role/
        ├── signin/page.tsx          → /role/signin
        ├── forgot/page.tsx          → /role/forgot
        └── signup/page.tsx          → /role/signup (if applicable)
```

**Pattern examples:**

- **Specialist:** `(specialist)/specialist/dashboard`, `(specialist-auth)/specialist/signin`
- **Admin:** `(admin)/admin/dashboard`, `(admin-auth)/admin/signin`
- **Candidate:** `(candidate)/candidate/dashboard`, `(candidate)/candidate/jobs`, `(candidate-auth)/candidate/signin`
- **Client:** `(client)/client/dashboard`, `(client)/client/jobs/new`, `(client-auth)/client/signup`

### Components

```
src/components/role/
├── shell/
│   ├── layout-shell.tsx             ← main layout wrapper
│   ├── topbar.tsx                   (navigation bar)
│   ├── sidebar.tsx                  (if applicable)
│   └── [feature]-panel.tsx          (optional feature-specific shells)
│
├── auth/
│   ├── signin-form.tsx
│   ├── signup-form.tsx              (if applicable)
│   ├── forgot-form.tsx              (if applicable)
│   ├── otp-input.tsx                (if applicable)
│   └── timeout-modal.tsx            (if applicable)
│
├── dashboard/
│   ├── dashboard-shell.tsx
│   ├── dashboard-header.tsx
│   ├── section-a.tsx
│   └── section-b.tsx
│
└── [feature]/
    └── [feature-component].tsx      (for Steps 3+)
```

**Invariants:**

- **NO `.ts` data files under `src/components/`.** Data files belong in `src/lib/mock-data/<role>/` exclusively.
- **NO components under `src/lib/`.** UI code lives in `src/components/` only. `src/lib/` is for business logic, state, and hooks.

### Mock Data

```
src/lib/mock-data/role/
├── index.ts                         ← barrel re-exports (like specialist)
├── [feature]-data.ts
├── sidebar-nav-data.ts
└── topbar-data.ts
```

**Barrel pattern (following specialist):**

```ts
// src/lib/mock-data/role/index.ts
export * from "./dashboard-data";
export * from "./sidebar-nav-data";
export * from "./topbar-data";
```

Component imports use **direct file paths** (not the barrel), matching specialist's current practice:

```ts
// Correct — direct file import
import { ALERTS } from "@/lib/mock-data/admin/dashboard-data";

// Also correct (barrel available for future refactoring)
import { ALERTS } from "@/lib/mock-data/admin";
```

### Client State & Contexts

```
src/lib/role/
├── signin-state-context.tsx         ← Auth state (shared by both route groups)
├── dashboard-state-context.tsx      (if applicable)
└── [feature]-context.tsx            (for complex state)
```

---

## Key invariants

- **`src/lib/` is framework-free.** No `next/*`, no `react`, no `app/*` imports.
- **Every domain has the same shape:** `services/<domain>/`, `repositories/<domain>/`, `domain/<domain>.ts`, `validators/<domain>.ts`. Predictable.
- **API routes mirror REST resources** under `/api/v1/`.
- **App routes mirror role surfaces** under route groups: `(client)`, `(candidate)`, `(admin)`.
- **Tests mirror source structure** in `tests/`.

## Why this structure scales

When you extract the backend in 6 months:

- `prisma/`, `src/lib/services/`, `src/lib/repositories/`, `src/lib/domain/`, `src/lib/validators/`, `src/lib/integrations/`, `src/lib/permissions/`, `src/lib/errors/`, `src/lib/jobs/`, `src/lib/utils/`, and `src/lib/config/` → move to a new repo.
- `src/app/api/v1/` is replaced by NestJS/Fastify controllers that import the same services.
- `src/app/`, `src/components/`, `src/lib/api-client/`, `src/lib/auth/`, `src/hooks/`, `src/stores/`, `src/emails/` → stay in the Next.js app.

The split is mechanical, not a rewrite.

---

**Last updated:** 2026-05-04
