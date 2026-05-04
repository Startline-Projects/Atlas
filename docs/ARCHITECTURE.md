# Atlas — Architecture

> **Status:** Source of truth. If a code change conflicts with this document, either the change is wrong or this document needs an ADR-backed update (see `/docs/adr`). No exceptions.

---

## 1. Goals

1. **Ship the MVP in 4 weeks** with production-grade quality.
2. **Extract the backend into a separate Node/NestJS/Fastify service later** without rewriting business logic.
3. **Be mobile-ready** — every capability the web app uses must be reachable through a versioned HTTP API.
4. **Be testable** — business logic must run in unit tests with no Next.js, no HTTP, no real database.
5. **Be onboardable** — a new developer ships their first feature in their first week.

## 2. Architectural Style

**Modular monolith on Next.js 15 (App Router) with strict layered architecture and a clear dependency direction.**

- Single deployable unit, single repository.
- Five layers, one direction of dependency (downward only).
- All business logic lives in `src/lib/services` and is **framework-free** — no `next/*` imports anywhere below the API layer.
- All data access goes through repositories, not Prisma directly.

We are explicitly **not** doing: microservices, GraphQL, event sourcing, CQRS, DDD aggregates, Kafka, Kubernetes, or any other architecture that does not justify itself before week 4.

---

## 3. The Five Layers

```
┌─────────────────────────────────────────────────────────────┐
│  UI Layer            src/app/(routes), src/components       │
│  React Server + Client Components, forms, page composition  │
└──────────────────────────┬──────────────────────────────────┘
                           │ fetch() via lib/api-client
                           │ (or Server Actions that delegate)
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  API Layer           src/app/api/v1/**/route.ts             │
│  Thin HTTP handlers — auth, validate, delegate, respond     │
└──────────────────────────┬──────────────────────────────────┘
                           │ calls service functions
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  Service Layer       src/lib/services                       │
│  ★ ALL BUSINESS LOGIC LIVES HERE ★                          │
│  Orchestration, permissions, domain rules, transactions     │
└──────────────────────────┬──────────────────────────────────┘
                           │ calls repositories + integrations
                           ▼
┌────────────────────────────────────────┬────────────────────┐
│  Repository Layer                      │  Integrations      │
│  src/lib/repositories                  │  src/lib/          │
│  Data access only. Wraps Prisma.       │  integrations      │
│  Returns domain types.                 │  Stripe, Resend,   │
│                                        │  Pusher, S3, etc.  │
└──────────────────────────┬─────────────┴────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  Database            PostgreSQL (Supabase)                  │
│  Prisma Client (singleton in src/lib/db)                    │
└─────────────────────────────────────────────────────────────┘
```

**Supporting modules that any layer above the DB can use:**
`src/lib/domain` (pure types/enums), `src/lib/validators` (Zod schemas), `src/lib/errors` (domain error classes), `src/lib/permissions` (RBAC policies), `src/lib/utils` (pure helpers), `src/lib/config` (env).

---

## 4. The Dependency Rule

**Dependencies always flow downward. No exceptions.**

| From layer | May import from | May NOT import from |
|---|---|---|
| UI (`app/`, `components/`) | `lib/api-client`, `lib/validators`, `lib/domain`, `lib/utils`, `hooks/`, `stores/` | `lib/services`, `lib/repositories`, `lib/db`, `prisma`, `lib/integrations` |
| API (`app/api/`) | `lib/services`, `lib/validators`, `lib/auth`, `lib/errors`, `lib/domain` | `lib/repositories`, `lib/db`, `prisma` directly |
| Service (`lib/services`) | `lib/repositories`, `lib/integrations`, `lib/domain`, `lib/validators`, `lib/permissions`, `lib/errors`, `lib/utils`, `lib/jobs` | Anything in `app/`, `components/`, `next/*`, `react` |
| Repository (`lib/repositories`) | `lib/db`, `lib/domain`, `lib/errors` | `lib/services`, `lib/integrations`, anything in `app/` |
| Integrations | `lib/domain`, `lib/errors`, `lib/config` | Services, repositories, app, components |

**Enforcement:** ESLint's `import/no-restricted-paths` rule blocks every illegal direction at lint time. CI fails on violation. See `.eslintrc.cjs`.

---

## 5. Each Layer in Detail

### 5.1 UI Layer

**Location:** `src/app/(routes)/`, `src/components/`

**Responsibilities:**
- Render UI (Server and Client Components).
- Compose pages, manage form state, handle interactions.
- Call the typed API client to read/write data.

**Forbidden:**
- Any database access.
- Any business rule (e.g. "if candidate verified, show X"). Such rules come from API responses or from a service-computed flag.
- Direct imports from `lib/services`, `lib/repositories`, or Prisma.

**Pattern — reading data in a Server Component:**

```ts
// src/app/(client)/dashboard/page.tsx
import { apiClient } from "@/lib/api-client";

export default async function DashboardPage() {
  // The API client is a typed fetch wrapper — same shape on web and (future) mobile.
  const dashboard = await apiClient.client.getDashboard();
  return <ClientDashboard data={dashboard} />;
}
```

**Pattern — writing data via a Server Action:**

Server Actions are allowed for form submissions, **but** they must remain thin and delegate to a service. They are not an excuse to put logic in `app/`.

```ts
// src/app/(candidate)/proposals/new/actions.ts
"use server";
import { proposalService } from "@/lib/services/proposal";
import { createProposalSchema } from "@/lib/validators/proposal";
import { requireSession } from "@/lib/auth";

export async function submitProposal(formData: FormData) {
  const session = await requireSession("candidate");
  const input = createProposalSchema.parse(Object.fromEntries(formData));
  return await proposalService.create({ ...input, candidateId: session.userId });
}
```

### 5.2 API Layer

**Location:** `src/app/api/v1/**/route.ts`

**Versioned from day one (`/api/v1/...`).** When v2 ships, v1 keeps working for mobile clients during migration.

**A Route Handler does exactly four things, in order:**
1. Authenticate the request (`getSession` / `requireSession`).
2. Validate input with a Zod schema.
3. Delegate to a service function.
4. Map the result (or thrown domain error) to an HTTP response.

**Hard limit: no Route Handler should exceed 40 lines.** If yours is longer, the logic belongs in a service.

**Canonical example:**

```ts
// src/app/api/v1/proposals/route.ts
import { NextRequest } from "next/server";
import { proposalService } from "@/lib/services/proposal";
import { createProposalSchema } from "@/lib/validators/proposal";
import { requireSession } from "@/lib/auth";
import { handleApiError, ok, created } from "@/lib/api/response";

export async function POST(req: NextRequest) {
  try {
    const session = await requireSession("candidate");
    const body = createProposalSchema.parse(await req.json());

    const proposal = await proposalService.create({
      ...body,
      candidateId: session.userId,
    });

    return created(proposal);
  } catch (err) {
    return handleApiError(err);
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await requireSession();
    const proposals = await proposalService.listForUser(session);
    return ok(proposals);
  } catch (err) {
    return handleApiError(err);
  }
}
```

**Forbidden in API routes:**
- Prisma calls (`prisma.candidate.findMany(...)`).
- Multi-step orchestration (call service A then service B).
- Permission logic (`if (user.role !== "admin") ...`) — that's the permission module's job, called by the service.
- External API calls (Stripe, Resend, etc.) — services call those.
- Business rules of any kind.

**The Response Helper:** `src/lib/api/response.ts` exposes `ok()`, `created()`, `noContent()`, and `handleApiError()`. The error handler maps domain errors (`NotFoundError`, `ForbiddenError`, `ValidationError`, etc.) to the correct HTTP status, and unknown errors to a generic 500 with a Sentry-captured ID. **Never `JSON.stringify` and `new Response(...)` ad-hoc** — go through the helper so contracts stay consistent.

### 5.3 Service Layer ★

**Location:** `src/lib/services/<domain>/`

**This is where Atlas lives.** Every business rule, every cross-resource workflow, every permission check, every integration orchestration. If you can describe a behavior in plain English ("when a candidate submits a proposal, deduct from their daily quota, notify the client, write an audit entry"), it belongs here.

**A service is a folder, not a single file.** Each domain has:

```
src/lib/services/proposal/
├── index.ts          # Public API — re-exports the service object
├── proposal.service.ts   # Implementation
├── proposal.types.ts     # Input/output types (or live in lib/domain)
└── proposal.test.ts      # Unit tests
```

**Service shape:**

```ts
// src/lib/services/proposal/proposal.service.ts
import { proposalRepository } from "@/lib/repositories/proposal";
import { jobRepository } from "@/lib/repositories/job";
import { auditService } from "@/lib/services/audit";
import { notificationService } from "@/lib/services/notification";
import { can } from "@/lib/permissions";
import {
  ForbiddenError,
  NotFoundError,
  BusinessRuleError,
} from "@/lib/errors";
import type { CreateProposalInput, Proposal } from "@/lib/domain/proposal";

export const proposalService = {
  async create(input: CreateProposalInput): Promise<Proposal> {
    const job = await jobRepository.findById(input.jobId);
    if (!job) throw new NotFoundError("job", input.jobId);
    if (job.status !== "OPEN") {
      throw new BusinessRuleError("PROPOSAL_JOB_CLOSED");
    }

    const existing = await proposalRepository.findByCandidateAndJob(
      input.candidateId,
      input.jobId,
    );
    if (existing) throw new BusinessRuleError("PROPOSAL_ALREADY_EXISTS");

    const proposal = await proposalRepository.create({
      jobId: input.jobId,
      candidateId: input.candidateId,
      coverLetter: input.coverLetter,
      proposedRate: input.proposedRate,
      status: "SUBMITTED",
    });

    await auditService.log({
      actor: { type: "candidate", id: input.candidateId },
      action: "proposal.created",
      target: { type: "proposal", id: proposal.id },
    });

    await notificationService.notifyClient(job.clientId, {
      type: "PROPOSAL_RECEIVED",
      proposalId: proposal.id,
    });

    return proposal;
  },

  async listForUser(session: Session): Promise<Proposal[]> {
    if (session.role === "candidate") {
      return proposalRepository.listByCandidate(session.userId);
    }
    if (session.role === "client") {
      return proposalRepository.listByClient(session.userId);
    }
    throw new ForbiddenError();
  },

  async withdraw(id: string, session: Session): Promise<Proposal> {
    const proposal = await proposalRepository.findById(id);
    if (!proposal) throw new NotFoundError("proposal", id);
    if (!can(session, "withdraw", proposal)) throw new ForbiddenError();
    if (proposal.status !== "SUBMITTED") {
      throw new BusinessRuleError("PROPOSAL_NOT_WITHDRAWABLE");
    }
    return proposalRepository.updateStatus(id, "WITHDRAWN");
  },
};
```

**Service rules:**
- Pure TypeScript functions, no `next/server` imports, no `react`.
- Throw typed domain errors. Never return `{ error: "..." }` shapes.
- Permission checks happen **here**, not in API routes.
- Multi-step writes that need atomicity wrap a Prisma transaction via the repository (`proposalRepository.transaction(async (tx) => { ... })`) or via a unit-of-work pattern in `lib/db`.
- Side effects (notifications, audit, jobs) happen here.
- Services may call other services (e.g. `proposalService` calls `notificationService`). Avoid cycles.

### 5.4 Repository Layer

**Location:** `src/lib/repositories/<domain>/`

**Responsibilities:**
- Wrap Prisma. Provide named query methods (`findByCandidateAndJob`, `listByClient`).
- Map Prisma rows to domain types (strip internal columns, normalize `Decimal` to `number`/`string`, parse JSON columns).
- Expose a transaction helper for multi-table writes.

**Forbidden:**
- Business rules of any kind. No `if (proposal.status === "OPEN") throw ...`.
- Authorization checks.
- Calling other repositories (composition belongs in services).

**Why this layer matters:** when Atlas extracts the backend into a separate NestJS service in 6 months, the *only* code that touches Prisma is here. Services move untouched. Repositories may be reimplemented against a different ORM, a remote API, or a SQL-builder, and nothing else changes.

**Canonical example:**

```ts
// src/lib/repositories/proposal/proposal.repository.ts
import { prisma } from "@/lib/db";
import type { Proposal, ProposalStatus } from "@/lib/domain/proposal";
import { mapProposal } from "./proposal.mapper";

export const proposalRepository = {
  async create(data: { /* ... */ }): Promise<Proposal> {
    const row = await prisma.proposal.create({ data });
    return mapProposal(row);
  },

  async findById(id: string): Promise<Proposal | null> {
    const row = await prisma.proposal.findUnique({ where: { id } });
    return row ? mapProposal(row) : null;
  },

  async findByCandidateAndJob(candidateId: string, jobId: string) {
    const row = await prisma.proposal.findFirst({
      where: { candidateId, jobId },
    });
    return row ? mapProposal(row) : null;
  },

  async listByCandidate(candidateId: string): Promise<Proposal[]> {
    const rows = await prisma.proposal.findMany({
      where: { candidateId },
      orderBy: { createdAt: "desc" },
    });
    return rows.map(mapProposal);
  },

  async updateStatus(id: string, status: ProposalStatus): Promise<Proposal> {
    const row = await prisma.proposal.update({
      where: { id },
      data: { status },
    });
    return mapProposal(row);
  },
};
```

### 5.5 Domain Layer

**Location:** `src/lib/domain/`

**Pure types and enums, zero runtime code, zero dependencies.** Importable from any layer.

```ts
// src/lib/domain/proposal.ts
export type ProposalStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "SHORTLISTED"
  | "WITHDRAWN"
  | "REJECTED"
  | "ACCEPTED";

export interface Proposal {
  id: string;
  jobId: string;
  candidateId: string;
  coverLetter: string;
  proposedRate: number; // hourly USD
  status: ProposalStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProposalInput {
  jobId: string;
  candidateId: string;
  coverLetter: string;
  proposedRate: number;
}
```

### 5.6 Integrations Layer

**Location:** `src/lib/integrations/<vendor>/`

Each external dependency (Stripe, Resend, Pusher, Daily.co, S3, OpenAI, Anthropic, Wise) gets a wrapper that:
- Hides the SDK behind a function-level interface.
- Translates vendor errors into domain errors.
- Is the *only* place the vendor SDK is imported.

```ts
// src/lib/integrations/stripe/stripe.client.ts
import Stripe from "stripe";
import { config } from "@/lib/config";

export const stripeClient = new Stripe(config.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});
```

```ts
// src/lib/integrations/stripe/stripe.payments.ts
import { stripeClient } from "./stripe.client";
import { PaymentError } from "@/lib/errors";

export const stripePayments = {
  async createPaymentIntent(amountCents: number, customerId: string) {
    try {
      return await stripeClient.paymentIntents.create({
        amount: amountCents,
        currency: "usd",
        customer: customerId,
      });
    } catch (e) {
      throw new PaymentError("STRIPE_CREATE_INTENT_FAILED", { cause: e });
    }
  },
};
```

Services depend on `stripePayments`, not on the Stripe SDK.

---

## 6. Vertical Slice — End to End

The way to build any feature: bottom-up in the slice, but ship the whole slice before starting another.

**Feature: candidate submits a proposal.**

1. **Domain** — define `Proposal`, `ProposalStatus`, `CreateProposalInput` in `lib/domain/proposal.ts`.
2. **Schema** — add the `Proposal` model in `prisma/schema.prisma`. Run `pnpm db:migrate`.
3. **Validator** — define `createProposalSchema` (Zod) in `lib/validators/proposal.ts`.
4. **Repository** — implement `proposalRepository` in `lib/repositories/proposal/`.
5. **Service** — implement `proposalService.create` in `lib/services/proposal/`. Write unit tests.
6. **API route** — wire `POST /api/v1/proposals` and `GET /api/v1/proposals` in `app/api/v1/proposals/route.ts`.
7. **API client** — add typed `apiClient.proposals.create()` and `list()` in `lib/api-client/`.
8. **UI** — build the form page in `app/(candidate)/proposals/new/page.tsx`, calling the API client (or a Server Action that delegates to the service).
9. **Integration test** — Playwright test for the happy path.

Every PR ships a complete slice. **No "API-only" or "UI-only" PRs in weeks 1–2.**

---

## 7. Cross-Cutting Concerns

### 7.1 Authentication
Clerk (recommended) or Auth.js v5. Session is read in the API route via `requireSession()` (or `getSession()` for optional auth). The session object carries `userId`, `role`, and any role-scoped IDs (e.g. `candidateProfileId`). Services receive the session as an argument when they need it; they never read it from request context.

### 7.2 Authorization (RBAC)
`src/lib/permissions/` defines a policy module (CASL or hand-rolled). The single entry point is `can(session, action, resource)`. Permission checks happen in services, never in API handlers, never in UI. UI may *call* `can()` to hide buttons, but the server is always the source of truth.

### 7.3 Validation
**Every untrusted boundary is validated by Zod.** That means:
- Every API Route Handler validates `req.json()` / `req.nextUrl.searchParams`.
- Every Server Action validates `formData`.
- Webhook payloads are validated after signature verification.

Schemas live in `src/lib/validators/` and are shared between API and UI (so client-side form validation uses the same schema).

### 7.4 Error Handling
Domain errors are concrete classes in `src/lib/errors/`:

```ts
export class NotFoundError extends DomainError { /* 404 */ }
export class ForbiddenError extends DomainError { /* 403 */ }
export class ValidationError extends DomainError { /* 400 */ }
export class BusinessRuleError extends DomainError { /* 422 */ }
export class PaymentError extends DomainError { /* 502 */ }
```

`handleApiError()` maps them. Anything unhandled becomes a 500 with a Sentry event ID returned to the client (`{ error: { code: "INTERNAL", traceId } }`).

### 7.5 Logging & Observability
- Sentry for errors — wired in `next.config.mjs` and `instrumentation.ts`.
- Structured logging via `pino` in `lib/observability/logger.ts`. Every service call logs at `info` with a request-scoped trace ID.
- Vercel Analytics for web vitals.
- Inngest dashboard for background jobs.

### 7.6 Rate Limiting
Upstash Ratelimit, applied in `middleware.ts` for sensitive endpoints (signup, login, OTP, AI calls, message send). Limits are configured per route in `lib/config/rate-limits.ts`.

### 7.7 Audit Trail
`auditService.log()` is called from any service that performs a state-changing action on behalf of a user. Audit rows are immutable, written to a dedicated `AuditLog` table.

### 7.8 Background Jobs
Inngest. Functions are defined in `src/lib/jobs/` and registered in `app/api/inngest/route.ts`. Use jobs for: email sends, video transcoding triggers, AI screening, payout reconciliation, SLA timers, daily reports.

### 7.9 Realtime
Pusher Channels (or Ably). Wrapped in `lib/integrations/pusher/`. Services emit events; clients subscribe via a hook.

### 7.10 Webhooks
Inbound webhooks (Stripe, Clerk, etc.) live in `app/api/webhooks/<vendor>/route.ts`. Each verifies the signature, validates payload with Zod, then delegates to a service. **No webhook handler does work directly.**

### 7.11 File Uploads
Supabase Storage or S3 with pre-signed URLs. The API issues the URL via `storageService.getUploadUrl()`; the client PUTs directly to storage. After upload, the client calls a confirm endpoint that triggers post-processing in Inngest (virus scan, image resize, etc.).

### 7.12 Money
- Always store as **integer cents** (`BigInt` in Prisma) or `Decimal(19,4)` — never `Float`.
- Currency is always explicit (`amount: 1000, currency: "USD"`).
- Fee calculations live in `lib/services/billing/fees.ts`. The 10% client fee constant is one place, not scattered.

---

## 8. Database

- PostgreSQL on Supabase (managed). Connection pooling via Supabase's pgBouncer.
- Prisma is the ORM. Schema is the single source of truth.
- **Every schema change is a migration committed to Git.** `pnpm db:migrate dev` locally, applied automatically in CI on deploy.
- Never `prisma db push` against a shared environment.
- Use `cuid2` IDs (sortable, URL-safe, 24 chars).
- Soft-deletable resources have a `deletedAt` timestamp. Repositories filter out soft-deleted by default.
- Audit-relevant tables are append-only.
- Indexes are added with the migration that needs them — never as an afterthought.

Each developer gets their own Supabase database branch (or a local Postgres in Docker). **No shared dev database.**

---

## 9. Testing Strategy

| Test type | Tool | Where | What it covers |
|---|---|---|---|
| Unit | Vitest | `*.test.ts` next to the source | Service logic with mocked repositories. Pure functions. |
| Repository | Vitest + Testcontainers Postgres (or Supabase test branch) | `tests/integration/repositories/` | Real Prisma queries against a real Postgres. |
| API integration | Vitest + supertest | `tests/integration/api/` | Boots Next handlers, exercises happy + error paths. |
| E2E | Playwright | `tests/e2e/` | Critical user flows only: signup, signin, propose, hire, message, pay. |

**Coverage is not a target.** What is required: every service has a unit test, every API route has at least one integration test for the success path and one for the most likely failure.

---

## 10. Future Extraction Path

When Atlas needs a dedicated backend (mobile app at scale, AI-heavy workloads, multi-team ownership), the migration is:

1. **Lift** `src/lib/services`, `src/lib/repositories`, `src/lib/domain`, `src/lib/integrations`, `src/lib/permissions`, `src/lib/validators`, `src/lib/errors`, `src/lib/jobs` into a new package or repo.
2. **Wrap** the services with a thin NestJS/Fastify HTTP layer that mirrors the existing `app/api/v1` contract exactly — same paths, same payloads, same status codes.
3. **Switch** Next.js to call the new backend via `lib/api-client` (which already abstracts the base URL via env var).
4. **Delete** `src/app/api/v1/` from the Next.js app.
5. **Done.** The frontend code is untouched.

This works because:
- Services and below have zero `next/*` dependencies.
- The API client already speaks HTTP, not in-process function calls.
- The API contract is versioned (`/v1`), so the new backend can ship a v2 in parallel.

The cost is roughly one engineer-week, not a re-write.

---

## 11. Forbidden Patterns

The following will fail code review automatically:

1. **Prisma calls outside `lib/repositories/` or `lib/db/`.** No `prisma.foo.findMany()` in API routes, services (except via repositories), components, or pages.
2. **Business logic in API routes.** If a Route Handler exceeds 40 lines or contains an `if`/`else` branch on domain state, it's wrong.
3. **Business logic in components.** No `if (user.subscription.tier === "PRO" && user.country === "US") ...` in JSX.
4. **`fetch` to external APIs from components or pages.** Always go through the API → service → integration chain.
5. **Direct SDK imports in services.** Stripe, Resend, OpenAI SDKs are imported only by their integration wrappers.
6. **Catching errors silently.** No empty `catch` blocks. Either re-throw, throw a domain error, or log with Sentry.
7. **`any` types** on public service or repository interfaces. Internal `any` requires a comment explaining why.
8. **Hard-coded secrets, IDs, or URLs.** Everything env-driven via `lib/config`.
9. **Logging PII.** Email, names, IDs in logs only when essential, and never auth tokens or payment data.
10. **Cross-layer types.** UI components must not import Prisma-generated types. They consume domain types only.
11. **Side effects in Server Components on render.** Server Components fetch data; they do not write.
12. **`useState` in Server Components.** `"use client"` directives are required for interactive components.
13. **Skipping migrations.** If you change `schema.prisma`, you commit a migration.
14. **Untyped fetch in the UI.** All HTTP calls go through `lib/api-client`, which is fully typed.
15. **Ad-hoc Response objects in API routes.** Use `ok()`, `created()`, `handleApiError()` from `lib/api/response`.

---

## 12. Versioning

- The package version follows semver but is mostly informational pre-launch.
- The **API is versioned** (`/api/v1`). Breaking changes require `/api/v2`.
- Database migrations are forward-only in production; rollbacks are done by writing a new forward migration.

---

## 13. Performance Budget

- Time to interactive on cold load: **< 2.5s** on 4G.
- API p95 latency for read endpoints: **< 300ms**.
- API p95 latency for write endpoints: **< 600ms**.
- Long lists (candidates, jobs, audit logs): virtualized with `@tanstack/react-virtual`.
- Images: Next.js `<Image>` with explicit sizes.
- No blocking third-party scripts above the fold.

---

## 14. Accessibility

WCAG 2.1 AA from day one. Non-negotiable. See `docs/runbooks/accessibility.md` for the testing checklist.

---

## 15. Security Baseline

- All routes default to authenticated. Public routes are explicitly listed in `middleware.ts`.
- CSRF: Next.js Server Actions are CSRF-protected by default. API routes that accept cookies set `SameSite=Lax`.
- Headers: `next.config.mjs` enables HSTS, CSP, frame deny, no-sniff.
- Secrets: Only in `process.env`, accessed via `lib/config`. Never committed.
- Dependency scanning: GitHub Dependabot + `pnpm audit` in CI.

---

## 16. ADRs

Significant architectural decisions are captured as Architectural Decision Records in `/docs/adr/NNNN-title.md`. An ADR includes context, the decision, alternatives considered, and consequences. Anything in this document that changes meaningfully gets a new ADR.

---

**Last updated:** 2026-05-04
**Owner:** Engineering team lead
