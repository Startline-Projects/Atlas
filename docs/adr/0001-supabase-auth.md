# ADR 0001 — Authentication: Supabase Auth (not Clerk / Auth.js)

**Status:** Accepted · **Date:** 2026-08-16 · **Resolves:** TECH_STACK §7 item 1

## Context

TECH_STACK.md left the identity provider open between Clerk (recommended) and
Auth.js v5. When the first real backend slice landed (candidate signup →
profile), it was built on **Supabase Auth**, which the project already pays
for and already hosts the database and storage. This ADR records that choice
so the code and the docs stop disagreeing.

## Decision

Supabase Auth is the identity provider for every surface.

- **Passwords, email verification, refresh tokens** — Supabase (`auth.users`).
- **Who the user is to Atlas** (role, status, profile) — our own `User` table,
  linked by `User.authProviderId = auth.users.id`. Our database is the source
  of truth; Supabase is a credential store.
- **Sessions** — the Supabase access token in an HttpOnly cookie
  (`atlas_session` / `atlas_admin_session` / `atlas_client_session`) with a
  refresh token beside it (`atlas_refresh` / `atlas_admin_refresh` /
  `atlas_client_refresh`). Read via `getCandidateSession()` /
  `getAdminSession()` / `getClientSession()` in `src/lib/auth/`; refreshed
  in `src/proxy.ts`; revoked at logout via `auth.admin.signOut`.
- **Admins** are provisioned by an operator (`pnpm admin:create`) — never
  self-registered.
- **RBAC** — role lives on `User.role`; the resolvers only ever return a user
  of the expected role, so a candidate token can never resolve as an admin.
  A `can()` policy module (§7.2) still lands later.

## Alternatives considered

- **Clerk.** Would have given 2FA, password reset, magic links and impersonation
  out of the box (~5–7 days saved). Rejected for now: a second vendor + ~$25/mo
  for capabilities we can add incrementally on Supabase (which also has TOTP
  MFA), and a second user store to keep in sync with `auth.users`.
- **Auth.js v5.** Most control, most work; no hosted email/OTP. Rejected —
  Supabase gives us the hosted parts we would otherwise rebuild.

## Consequences

- TECH_STACK §2.5 / §7, ARCHITECTURE §7.1 and FOLDER_STRUCTURE's `clerk/`
  placeholders are superseded by this ADR (edited alongside it).
- Still to build on Supabase (tracked in CONVERSION_LOG follow-ups):
  password reset (email), TOTP 2FA for admins (Supabase MFA), real OTP
  delivery (custom SMTP — currently `AUTH_DEV_FIXED_OTP` bypass in dev).
- If Atlas ever leaves Supabase Auth, the seam is `src/lib/integrations/supabase`
  + the two `*.service.ts` login/verify paths; the session cookie contract and
  `User.authProviderId` stay.
