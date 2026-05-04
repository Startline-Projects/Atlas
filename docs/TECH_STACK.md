# Atlas — Technology Stack

> **Rule:** Every dependency in this document is approved. Adding a new dependency requires an ADR and team-lead sign-off. Deviating in code without updating this document is a code review block.

---

## 1. At a Glance

| Concern | Pick | Locked? |
|---|---|---|
| App framework | Next.js 15 (App Router) | Yes |
| Language | TypeScript (strict) | Yes |
| Package manager | pnpm | Yes |
| Database | PostgreSQL via Supabase | Yes |
| ORM | Prisma | Yes |
| Auth | Clerk (recommended) or Auth.js v5 | Choose week 0 |
| Realtime | Pusher Channels | Yes |
| Background jobs | Inngest | Yes |
| Payments | Stripe Connect (Express) + Wise API for non-Stripe corridors | Yes |
| Identity / KYC | Stripe Identity (or Persona) | Choose week 0 |
| File storage | Supabase Storage (S3-compatible) | Yes |
| Email | Resend | Yes |
| Search | Postgres FTS now, Algolia/Meilisearch later | Yes |
| AI | Anthropic + OpenAI APIs | Yes |
| Validation | Zod | Yes |
| Permissions / RBAC | CASL (or hand-rolled module) | Choose week 0 |
| UI primitives | shadcn/ui + Radix | Yes |
| Styling | Tailwind CSS v4 | Yes |
| Forms | React Hook Form + Zod | Yes |
| Client state | Zustand (sparingly) | Yes |
| Server state | RSC + native fetch with revalidation | Yes |
| Tables | TanStack Table | Yes |
| Virtualization | TanStack Virtual | Yes |
| Charts | Recharts | Yes |
| Date / time | date-fns | Yes |
| Money | dinero.js | Yes |
| ID generation | @paralleldrive/cuid2 | Yes |
| Logging | pino | Yes |
| Errors | Sentry | Yes |
| Rate limiting | Upstash Ratelimit + Redis | Yes |
| Testing — unit | Vitest | Yes |
| Testing — E2E | Playwright | Yes |
| Linting | ESLint + Prettier | Yes |
| Hosting (web) | Vercel | Yes |
| Hosting (DB) | Supabase | Yes |
| CI/CD | GitHub Actions + Vercel | Yes |
| Secret management | Vercel env + Supabase env | Yes |

---

## 2. Layer-by-Layer

### 2.1 Frontend

**Next.js 15 (App Router).** RSC by default, Client Components where interactivity is needed. Server Actions allowed for forms, but they must delegate to services.

**TypeScript** in strict mode, with `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes` on. No `any` on public interfaces.

**Tailwind CSS v4** for all styling. No CSS-in-JS, no CSS modules outside global resets. Design tokens in `tailwind.config.ts`.

**shadcn/ui + Radix** for accessible, unstyled primitives we own and modify. We are *not* installing a heavy component library.

**React Hook Form + Zod resolver** for forms. The same Zod schema validates server-side in the API.

**Zustand** for the rare bits of cross-component client state (e.g. an open chat panel). Default to RSC + URL state.

**TanStack Table + TanStack Virtual** for long lists. Required by the spec ("long tables virtualized").

**Recharts** for analytics dashboards.

**Lucide-react** for icons.

### 2.2 API / App Layer

Route Handlers (`app/api/v1/**/route.ts`) for the HTTP surface. Versioned from day one.

Server Actions allowed for form submissions inside the same app, with the constraint that they delegate to a service exactly like a Route Handler does. Do not put logic in Server Actions.

`middleware.ts` for: redirect-to-login, locale detection (Phase 2), rate limit enforcement, CSP nonces.

### 2.3 Service Layer

Plain TypeScript modules in `src/lib/services/`. Only allowed dependencies: Node standard library, the integrations layer, the repository layer, Zod, date-fns, dinero.js, the project's own domain types and errors.

**Forbidden in services:** `next/server`, `react`, any UI library, any direct SDK import (Stripe, Resend, OpenAI — these go through `lib/integrations`).

### 2.4 Data Layer

**PostgreSQL 15** on Supabase. Connection pooling via Supabase's pgBouncer (transaction mode for Prisma).

**Prisma 5** as the ORM. Schema is at `prisma/schema.prisma`. Migrations at `prisma/migrations/`.

**Repositories** in `src/lib/repositories/` are the only callers of Prisma. They map Prisma rows to domain types. This is what makes future backend extraction cheap.

**`@paralleldrive/cuid2`** for primary keys: short, sortable, URL-safe.

**Postgres FTS** for search in MVP. We add a `tsvector` column and a GIN index to searchable tables. Algolia/Meilisearch is on the Phase 2 list but explicitly not in MVP.

### 2.5 Auth & Identity

**Clerk** is the recommended pick. It saves ~5–7 days of work over Auth.js v5 by handling: email verification, password reset, 2FA (TOTP and SMS), magic links, session management, suspended-account state, and admin impersonation. The cost is ~$25/month at MVP scale, scaling with MAU.

**Auth.js v5 (NextAuth)** is the fallback if budget says no to Clerk. More control, more work. Pick before week 1.

**Stripe Identity** for KYC of candidates earning over thresholds. **Persona** is the alternative if a more configurable flow is needed.

**RBAC:** CASL with abilities defined in `src/lib/permissions/abilities.ts`, or a hand-rolled `can(session, action, resource)` module. Either way, all checks go through one function and run in services, not API handlers.

### 2.6 Realtime

**Pusher Channels** (or Ably — equivalent). Used for: messaging, notifications, live dashboard counters, audit-log tail in admin. Wrapped in `lib/integrations/pusher/`.

**No self-hosted Socket.io.** Vercel's serverless model does not support persistent connections; running a separate Socket.io server is operational overhead we do not need to take on for MVP.

### 2.7 Background Jobs

**Inngest.** Functions are defined as TypeScript modules in `src/lib/jobs/` and registered at `app/api/inngest/route.ts`. Inngest invokes them via signed HTTP calls.

Use cases in MVP: email sends (transactional + notifications), payout reconciliation, audit log export, daily activity summaries, webhook retry on transient failure, AI screening runs (Phase 2 hook ready).

### 2.8 Payments

**Stripe Connect (Custom or Express accounts).** Express in MVP — Stripe handles the candidate's onboarding form. Custom is a Phase 2 upgrade for white-label payouts.

Money flow:
1. Client charged via Stripe (PaymentIntent).
2. 90% of charge transferred to candidate's Connect account.
3. 10% retained as platform fee.
4. Payouts settle to candidate's bank on Stripe's schedule.

**Wise API** for international corridors where Stripe Connect is unavailable (e.g. some MENA, SEA, Africa countries that Atlas is targeting). The candidate picks Stripe or Wise during payout setup.

Webhooks: `app/api/webhooks/stripe/route.ts` verifies signature → validates payload → delegates to `paymentService`. Critical events: `payment_intent.succeeded`, `charge.refunded`, `account.updated`, `transfer.failed`.

### 2.9 Email

**Resend.** Templates in `src/emails/` using React Email. Each transactional email goes through `notificationService`, which queues an Inngest job that calls Resend.

### 2.10 File Storage

**Supabase Storage** (S3-compatible). Pre-signed upload URLs issued by `storageService`. Buckets:

- `avatars` — public.
- `portfolios` — public.
- `kyc-documents` — private, accessed via signed URLs only.
- `attachments` — private (chat attachments).

### 2.11 Logging & Observability

- **Sentry** for unhandled errors and performance monitoring. Source maps uploaded on each deploy.
- **pino** for structured server-side logging. Pretty-printed locally, JSON in production.
- **Vercel Analytics** for web vitals.
- **Inngest dashboard** for job runs.
- **Supabase logs** for database.

Trace IDs propagate from middleware → API → service → external calls (X-Request-Id header).

### 2.12 Rate Limiting

**Upstash Ratelimit** with Upstash Redis. Configured per route family in `src/lib/config/rate-limits.ts`. Default 60 rpm per IP for unauth, 300 rpm per user for auth. Aggressive limits on signup, signin, OTP, message-send, AI calls.

### 2.13 Validation

**Zod** everywhere. Schemas in `src/lib/validators/`. Shared between API (server-side validation) and UI (React Hook Form `zodResolver`). Webhook payloads validated after signature check.

### 2.14 AI

**Anthropic Messages API** (primary) and **OpenAI** (fallback / specific tasks). Wrapped in `lib/integrations/anthropic/` and `lib/integrations/openai/`. Heavy or long-running calls go through Inngest jobs to avoid serverless timeouts.

MVP AI usage is thin: maybe job-description writing assist for clients, profile-summary suggestion for candidates. The full AI screening is Phase 2 — but the wiring is done now.

### 2.15 Money & Numbers

**dinero.js** for all monetary arithmetic. We never use JavaScript floats for money. Storage: `BigInt` for cents in Postgres, or `Decimal(19,4)`. Currency code travels with the amount.

---

## 3. Hosting & Environments

| Environment | URL | Hosting | Database |
|---|---|---|---|
| Local | `http://localhost:3000` | `next dev` | Personal Supabase branch or Docker Postgres |
| Preview (per PR) | Vercel preview URL | Vercel | Supabase branch (auto-created via Supabase Branching) |
| Staging | `staging.atlas.app` | Vercel | Supabase staging project |
| Production | `atlas.app` | Vercel | Supabase production project |

Each environment has its own set of secrets. **Secrets are never committed.** Local secrets are in `.env.local` (gitignored). Vercel and Supabase manage their own.

---

## 4. CI / CD

GitHub Actions pipeline on every PR:

1. `pnpm install --frozen-lockfile`
2. `pnpm typecheck`
3. `pnpm lint`
4. `pnpm test:unit`
5. `pnpm test:integration` (against ephemeral Postgres via Testcontainers or Supabase test branch)
6. `pnpm build`
7. Vercel preview deploy.
8. `pnpm test:e2e` against the preview deploy (smoke level — full E2E nightly).

Merge to `main` triggers production deploy via Vercel. Database migrations run automatically via `prisma migrate deploy` in a build step.

---

## 5. Repository Hygiene

- **One repo.** No premature monorepo. We can split later.
- **`pnpm`** for installs and scripts.
- **Conventional commits** (`feat:`, `fix:`, `chore:`, etc.).
- **Trunk-based development.** Short-lived branches, daily merges to `main`.
- **Branch protection on `main`:** PRs only, all checks green, ≥ 1 approval.
- **PR template** asks: which slice, which docs updated, which tests added.

---

## 6. Cost Estimate (Approximate, MVP Scale)

| Service | Monthly Cost (estimate) |
|---|---|
| Vercel (Pro plan) | $20 / dev seat |
| Supabase (Pro) | $25 |
| Clerk | ~$25 (up to 10k MAU) |
| Pusher | $0 (free tier) → $49 |
| Inngest | $0 (free tier) → $50 |
| Sentry | $0 (free tier for small team) |
| Resend | $20 |
| Upstash Redis | $0 → $10 |
| Stripe | Pay-per-use (no fixed cost) |
| Anthropic + OpenAI | Pay-per-use |
| Domain + DNS | ~$15/year |

**Floor:** ~$110/month at near-zero traffic. Scales linearly with usage.

---

## 7. Decisions Pending (Resolve in Week 0)

These are the only things not locked. Choose, write a one-pager ADR, move on.

1. **Auth: Clerk vs Auth.js v5.** Recommend Clerk if budget allows.
2. **KYC: Stripe Identity vs Persona.** Stripe Identity if you're already Stripe-heavy.
3. **RBAC: CASL vs hand-rolled.** CASL if the team has used it; otherwise hand-rolled is 1 day of work and equally clean.
4. **Realtime: Pusher vs Ably.** Either works. Pusher's pricing is simpler at MVP scale.

---

## 8. Banned Technologies (For This Phase)

Not because they're bad, but because they don't pay rent during a 4-week MVP:

- **GraphQL / Apollo / urql.** REST is faster to ship, easier to mock, and trivially callable from mobile.
- **tRPC.** Tempting, but it couples client and server too tightly for a project planning to extract the backend.
- **Redux / MobX / Recoil / Jotai.** Pick one — Zustand — and use it sparingly.
- **Custom Webpack / esbuild config.** Use Next.js defaults.
- **Yarn / npm.** Standardize on pnpm.
- **CommonJS.** ESM only.
- **Self-hosted databases / Redis / MQ.** Managed services only.
- **Kubernetes.** Vercel + Supabase. Done.
- **Lerna / Nx / Turborepo monorepo.** Not yet. Single Next.js app for MVP.

---

## 9. Upgrade Path Notes

- **From Clerk to self-hosted auth:** Clerk exports user data; Auth.js v5 can re-import. Migration cost is roughly 1 week.
- **From Pusher to self-hosted Socket.io:** Realistic only if MAU justifies the operational cost (probably 100k+).
- **From Postgres FTS to Algolia/Meilisearch:** Hot-swappable behind `searchService` interface.
- **From Vercel to Cloud Run / Fly.io:** Possible but unjustified pre-Series A.

---

**Last updated:** 2026-05-04
**Owner:** Engineering team lead
