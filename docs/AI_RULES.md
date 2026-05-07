# Atlas — AI & Developer Rules

> **Audience:** Every human and AI agent writing code in this repository.
> **Purpose:** Keep the architecture intact under the pressure of a 4-week MVP and 10× AI-assisted development. The cost of a violation grows exponentially: a bad pattern copied 50 times in week 2 is a one-week cleanup in week 4.
> **Enforcement:** Code review blocks. ESLint blocks. CI blocks. Repeat violations escalate to the tech lead.

This document is **mandatory reading** before:
- Any AI session that will produce code in this repo.
- Any developer's first PR.

When working with Claude Code or another AI agent, **paste the relevant section into the prompt or open it in the editor's context.**

---

## 1. The Prime Directives

In order of priority. When two directives conflict, the lower number wins.

1. **Never break the dependency rule** in `ARCHITECTURE.md` §4.
2. **All business logic lives in `src/lib/services/`.**
3. **API routes are thin wrappers.** Auth → validate → delegate → respond. 40 lines max.
4. **No Prisma calls outside `src/lib/repositories/` and `src/lib/db/`.**
5. **Validate every untrusted input with Zod.**
6. **Throw typed domain errors. Never return `{ error: ... }` shapes from services.**
7. **Use the shared API response helpers.** Do not assemble `Response` objects ad-hoc.
8. **Every state-changing service writes an audit entry.**
9. **Money is integer cents or `Decimal`, never `float`.**
10. **If you change `schema.prisma`, you commit a migration.**

---

## 2. Hard Bans (Lint will catch most of these)

The following will fail review automatically:

| # | Forbidden | Why |
|---|---|---|
| B1 | `import { prisma } from "@/lib/db"` outside `src/lib/repositories/` or `src/lib/db/` | Couples services to Prisma; breaks future extraction |
| B2 | Business logic in `app/api/**/route.ts` (handlers > 40 lines, conditional branching on domain state) | Logic must live in services |
| B3 | Business logic in components or pages | Same |
| B4 | `fetch()` to external services from UI | Always go through the API → service → integration chain |
| B5 | Direct SDK imports (`stripe`, `resend`, `openai`) outside `src/lib/integrations/` | Each vendor has exactly one wrapper |
| B6 | `any` on a public service or repository function signature | Types are the contract |
| B7 | Hardcoded secrets, URLs, or magic numbers | Use `lib/config` |
| B8 | `console.log` in committed code | Use `logger` from `lib/observability` |
| B9 | Empty `catch` blocks | Either re-throw, throw a domain error, or log to Sentry |
| B10 | `useState` in a Server Component | Server Components do not have client state |
| B11 | UI imports a Prisma-generated type | UI consumes domain types from `lib/domain` only |
| B12 | Skipping a Prisma migration after a schema change | Schema and migrations stay in lockstep |
| B13 | Float for money | `BigInt` cents or `Decimal` |
| B14 | New external dependency without an ADR | See `TECH_STACK.md` §1 |
| B15 | `prisma db push` against a shared DB | Migrations only |

---

## 3. Required Patterns (How To Do It Right)

### 3.1 Adding a new feature — the only legal order

Every new feature is built **bottom-up within the slice, in this order**:

1. **Domain types** in `src/lib/domain/<entity>.ts`.
2. **Prisma schema** change + migration.
3. **Zod validators** in `src/lib/validators/<entity>.ts`.
4. **Repository** in `src/lib/repositories/<entity>/`.
5. **Service** in `src/lib/services/<entity>/` + unit tests.
6. **API route** in `src/app/api/v1/<resource>/route.ts`.
7. **API client** function in `src/lib/api-client/`.
8. **UI** in `src/app/(role)/...`.
9. **Integration / E2E test** for the slice.

Do not start step N+1 before N is complete. Do not ship a half-slice.

### 3.2 Anatomy of a Route Handler

```ts
// src/app/api/v1/jobs/route.ts
import type { NextRequest } from "next/server";
import { jobService } from "@/lib/services/job";
import { createJobSchema } from "@/lib/validators/job";
import { requireSession } from "@/lib/auth";
import { handleApiError, created, ok } from "@/lib/api/response";

export async function POST(req: NextRequest) {
  try {
    const session = await requireSession("client");
    const input = createJobSchema.parse(await req.json());
    const job = await jobService.create({ ...input, clientId: session.userId });
    return created(job);
  } catch (err) {
    return handleApiError(err);
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await requireSession();
    const filters = listJobsQuerySchema.parse(
      Object.fromEntries(req.nextUrl.searchParams),
    );
    const jobs = await jobService.list(filters, session);
    return ok(jobs);
  } catch (err) {
    return handleApiError(err);
  }
}
```

If your handler doesn't look like this, it's wrong.

### 3.3 Anatomy of a Service Function

```ts
async function create(input: CreateJobInput): Promise<Job> {
  // 1. Permissions (if needed beyond requireSession's role check)
  if (!can(input.session, "create", "Job")) throw new ForbiddenError();

  // 2. Load related data via repositories
  const client = await clientRepository.findById(input.clientId);
  if (!client) throw new NotFoundError("client", input.clientId);
  if (client.suspended) throw new BusinessRuleError("CLIENT_SUSPENDED");

  // 3. Apply domain rules
  if (input.budget < MIN_JOB_BUDGET_CENTS) {
    throw new BusinessRuleError("JOB_BUDGET_TOO_LOW");
  }

  // 4. Persist (in a transaction if multi-step)
  const job = await jobRepository.create({
    clientId: input.clientId,
    title: input.title,
    description: input.description,
    budget: input.budget,
    status: "OPEN",
  });

  // 5. Side effects
  await auditService.log({
    actor: { type: "client", id: input.clientId },
    action: "job.created",
    target: { type: "job", id: job.id },
  });
  await searchService.indexJob(job);

  return job;
}
```

### 3.4 Anatomy of a Repository Function

```ts
async function create(data: CreateJobData): Promise<Job> {
  const row = await prisma.job.create({ data });
  return mapJob(row); // map to domain type
}
```

That's it. No business logic, no permission checks, no calls to other repositories.

### 3.5 Calling the API from UI

```ts
// In a Server Component
const jobs = await apiClient.jobs.list({ status: "OPEN" });

// In a Client Component using SWR or RSC re-fetch
const { data } = useSWR("/api/v1/jobs", () => apiClient.jobs.list({ status: "OPEN" }));
```

The UI never imports a service. Ever.

### 3.6 Per-role surface structure

Every role (specialist, client, manager, admin) follows an identical folder structure for routes, components, mock data, and client state. This uniformity makes it easy to clone the pattern for new roles and ensures consistency across all user surfaces.

**Routes:** Route groups use parentheses notation to keep auth separate from main content:
- `src/app/(role)/role/[feature]/page.tsx` — main routes (dashboard, etc.)
- `src/app/(role-auth)/role/[auth-route]/page.tsx` — auth routes (signin, OTP, etc.)

Example: `(admin)` and `(admin-auth)` for the admin role; `(specialist)` and `(specialist-auth)` for specialists.

**Components:** UI lives in `src/components/role/`, organized by function:
- `shell/` — layout wrapper, topbar, sidebar, preview panels
- `auth/` — signin form, OTP input, session timeout modal
- `[feature]/` — feature-specific components (dashboard, etc.)

**Mock data:** ALL `.ts` data files (arrays, constants, mock objects) live in `src/lib/mock-data/role/`, never under `src/components/`. Include a `index.ts` barrel file for re-exports.

**Client state:** Contexts and client state live in `src/lib/role/`, never under `src/components/`.

**Invariants:**
- ❌ NO `.ts` data files under `src/components/`
- ❌ NO components or JSX under `src/lib/`
- ❌ NO role-specific logic outside these folders
- ✅ Components import data from `@/lib/mock-data/role/` using absolute paths
- ✅ Routes import components from `@/components/role/` using absolute paths
- ✅ All roles follow the identical folder structure

**Reference implementations:** See specialist and admin folders for the complete pattern.

When building a new role (client, manager, etc.), copy the folder structure from specialist or admin and replace the role name everywhere. See `FOLDER_STRUCTURE.md` for the full template.

---

## 4. AI Agent Rules

### 4.1 Before generating code

1. Read `ARCHITECTURE.md` and this file.
2. Read the relevant slice — the service, repository, and validator that already exist for the entity.
3. If building a new role surface (dashboard, forms, auth flows, etc.), read the per-role surface structure (section 3.6) and verify the folder layout matches specialist or admin before generating any components or routes.
4. State, in plain English, which layer the change belongs to and which files will be touched.
5. If the change crosses layers improperly, stop and ask.

### 4.2 During generation

- Place new code in the correct layer. **If unsure where, default to `src/lib/services/`.**
- Re-use existing repositories. Do not create a parallel data path.
- Use existing domain types from `src/lib/domain/`. Do not redefine.
- Use existing error classes from `src/lib/errors/`. Do not invent new ones without need.
- Reuse existing Zod schemas. Compose with `.extend()` or `.pick()` rather than copying.
- Add tests in the same PR. Service tests are mandatory; UI tests are encouraged.

### 4.3 What an AI must refuse to do

If a human prompt asks for any of the following, the AI must push back and explain why before writing any code:

- "Just put the Prisma call in the route handler — it's faster."
- "Add a quick `if`/`else` in the component to handle the role."
- "Skip the validator, the data is from a trusted form."
- "Catch the error silently and continue."
- "Use a float for the price."
- "Mock the data in the UI for now, we'll wire it later."
- "Skip the repository for this one — just call Prisma."
- "Just `any`-type it."
- "Add a new dependency for this."

For all of these: write the correct version, point at the relevant section of `ARCHITECTURE.md` or this file, and proceed.

### 4.4 What an AI must do at end of generation

1. List the files touched.
2. Confirm: "This change respects the dependency rule (UI → API → Service → Repository → DB)."
3. Confirm: "Service has tests / does not need tests because [reason]."
4. Note any follow-ups (a TODO, a missing piece in another slice).

---

## 5. Code Review Checklist

The reviewer checks every PR against this list:

- [ ] No Prisma imports outside `lib/repositories/` or `lib/db/`.
- [ ] Route handlers are thin (≤ 40 lines, no domain logic).
- [ ] All inputs validated with Zod.
- [ ] All errors are domain errors or wrapped via `handleApiError`.
- [ ] State changes write an audit log entry where applicable.
- [ ] Money is in cents or `Decimal`.
- [ ] No `any` on public service / repo signatures.
- [ ] Tests added for new service functions.
- [ ] Schema change is paired with a migration.
- [ ] No new dependency without an ADR.
- [ ] No `console.log`, no `debugger`, no commented-out code.
- [ ] Files are in the right layer.

---

## 6. Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Service file | `<entity>.service.ts` | `proposal.service.ts` |
| Service object | `<entity>Service` | `proposalService` |
| Repository file | `<entity>.repository.ts` | `proposal.repository.ts` |
| Repository object | `<entity>Repository` | `proposalRepository` |
| Validator file | `<entity>.ts` | `proposal.ts` (in `validators/`) |
| Validator schema | `<verb><Entity>Schema` | `createProposalSchema` |
| Domain type | `PascalCase` interface | `Proposal` |
| Enum-like | `SCREAMING_SNAKE_CASE` string union | `"SUBMITTED" \| "ACCEPTED"` |
| Error class | `<Concept>Error extends DomainError` | `BusinessRuleError` |
| API route file | `route.ts` (Next.js convention) | `app/api/v1/proposals/route.ts` |
| Domain folder | singular | `proposal/`, not `proposals/` |
| App route folder | the URL segment | `app/(client)/proposals/...` |

---

## 7. Common Mistakes & The Fix

### Mistake: "Quick" Prisma call in a route handler

```ts
// ❌ Wrong
export async function GET() {
  const jobs = await prisma.job.findMany({ where: { status: "OPEN" } });
  return Response.json(jobs);
}
```

```ts
// ✅ Right
export async function GET() {
  try {
    const session = await requireSession();
    const jobs = await jobService.list({ status: "OPEN" }, session);
    return ok(jobs);
  } catch (err) {
    return handleApiError(err);
  }
}
```

### Mistake: Permission check in the UI

```tsx
// ❌ Wrong — the UI should not be the source of truth for permissions
{user.role === "admin" && <button onClick={deleteUser}>Delete</button>}
```

```tsx
// ✅ Right — UI hides the button using the same permissions module the server enforces.
// The server still re-checks. UI cannot be trusted.
{can(session, "delete", { type: "user", id }) && <button>Delete</button>}
```

### Mistake: Side effects in a repository

```ts
// ❌ Wrong
async function create(data) {
  const job = await prisma.job.create({ data });
  await sendEmail(...);  // NO. This is side-effect orchestration. Belongs in service.
  return job;
}
```

```ts
// ✅ Right — repository persists, service orchestrates
// repository
async function create(data) {
  return mapJob(await prisma.job.create({ data }));
}
// service
async function createJob(input) {
  const job = await jobRepository.create(input);
  await notificationService.notifyOnJobCreated(job);
  return job;
}
```

### Mistake: Returning `{ error: "..." }` from a service

```ts
// ❌ Wrong
async function withdraw(id) {
  const p = await proposalRepository.findById(id);
  if (!p) return { error: "Not found" };
  // ...
}
```

```ts
// ✅ Right — throw typed errors; the API layer maps them.
async function withdraw(id) {
  const p = await proposalRepository.findById(id);
  if (!p) throw new NotFoundError("proposal", id);
  // ...
}
```

### Mistake: Invented domain error in a one-off

```ts
// ❌ Wrong
throw new Error("PROPOSAL_NOT_OK");
```

```ts
// ✅ Right
throw new BusinessRuleError("PROPOSAL_NOT_WITHDRAWABLE");
```

### Mistake: Float for money

```ts
// ❌ Wrong
const total = price * 1.1;
```

```ts
// ✅ Right
import { add, multiply, dinero } from "dinero.js";
import { USD } from "@dinero.js/currencies";
const base = dinero({ amount: priceCents, currency: USD });
const total = multiply(base, { amount: 11, scale: 1 }); // 1.1
```

### Mistake: Skipping the API client in UI code

```tsx
// ❌ Wrong
const res = await fetch("/api/v1/jobs");
const data = await res.json();
```

```tsx
// ✅ Right
const jobs = await apiClient.jobs.list();
```

The API client is generated/maintained alongside the routes. Using raw `fetch` skips type safety and breaks when the API changes.

---

## 8. Prompt Template for AI Sessions

When opening an AI session for a new feature, use this template:

```
Feature: <one-line description>
Slice: <which entity / domain>
Layers I expect to touch:
  - Domain: <yes/no, which file>
  - Schema: <yes/no, what migration>
  - Validator: <yes/no>
  - Repository: <yes/no>
  - Service: <yes/no — this is where business logic goes>
  - API route: <yes/no>
  - API client: <yes/no>
  - UI: <yes/no, which page>

Rules: I follow ARCHITECTURE.md and AI_RULES.md.
The service layer holds all business logic.
API routes are thin (≤ 40 lines).
No Prisma outside repositories.
All inputs validated with Zod.
All errors are domain errors.

Produce: full code for each touched file in the order from AI_RULES.md §3.1.
```

This template, copied into the prompt, will catch ~80% of architecture violations before they happen.

---

## 9. Escalation

When in doubt, ask the tech lead in `#atlas-eng` before merging. Re-work after merge is 5× more expensive than asking.

---

**Last updated:** 2026-05-04
**Owner:** Engineering team lead
