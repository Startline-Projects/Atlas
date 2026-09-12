# Atlas

Atlas is a curated talent marketplace for connecting vetted global candidates with clients. Candidates build profiles, take an English assessment, browse roles, and apply; clients create accounts, post jobs, and manage their hiring workflow. Atlas staff operate dedicated admin and specialist surfaces for the marketplace.


![Atlas project screenshot — add `public/atlas-screenshot.png`](./public/hero.png)

## What is here

- Marketing pages for explaining the platform, pricing, trust, and talent network.
- Candidate flows for signup, email verification, profile completion, English testing, and job discovery.
- Client flows for signup, authentication, company profiles, and job management.
- Admin and specialist workspaces for platform operations.
- Versioned API routes under `/api/v1`, backed by services, repositories, Prisma, and Supabase.

## Stack

- Next.js 16 with the App Router, React 19, TypeScript, and Tailwind CSS 4
- PostgreSQL on Supabase, accessed through Prisma
- Supabase Auth and Storage
- Stripe for English-test retake payments
- Upstash Redis for rate limiting and account lockouts
- Zod for request and environment validation

## Run locally

Prerequisites: Node.js and pnpm.

```bash
pnpm install
Copy-Item .env.example .env.local
pnpm db:generate
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Fill in the required Supabase and PostgreSQL values in `.env.local` before using features that require them. `.env.example` documents every supported variable.

## Useful commands

```bash
pnpm dev          # Start the development server
pnpm lint         # Run ESLint
pnpm typecheck    # Check TypeScript without emitting files
pnpm build        # Create a production build
pnpm db:generate  # Generate the Prisma client
pnpm db:migrate   # Create and apply a development migration
pnpm db:deploy    # Apply committed migrations
pnpm admin:create # Provision an admin account
```

## Project structure

```text
src/app/           Pages, layouts, and HTTP route handlers
src/components/    UI organized by product surface
src/lib/domain/    Shared domain types
src/lib/services/  Business rules and workflows
src/lib/repositories/  Prisma-backed data access
src/lib/integrations/ External-service wrappers
src/lib/validators/ Zod schemas for untrusted input
prisma/            Database schema and migrations
docs/              Scope, architecture, and technical decisions
```

## Architecture rules

Atlas keeps UI, API handlers, business logic, and persistence separate. Route handlers validate input and delegate to services; services own workflows and permissions; repositories are the only layer that directly queries Prisma. External SDKs are wrapped in `src/lib/integrations`.

Read [the architecture guide](./docs/ARCHITECTURE.md), [project scope](./docs/PROJECT_SCOPE.md), and [technology stack](./docs/TECH_STACK.md) before making structural changes.

## Environment and data

Copy `.env.example` to `.env.local`; never commit `.env.local`. Migrations live in `prisma/migrations` and should be committed alongside every change to `prisma/schema.prisma`.

## License

Private and proprietary. All rights reserved.
