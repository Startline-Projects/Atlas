# Candidate Profile — slice notes

Implements PROJECT_SCOPE §2.2 "Profile & onboarding" (minus KYC): basics,
skills & tools, languages, work history, education, certifications, portfolio
(≤ 6), profile-strength meter, and preview-as-client. Also introduces the
first real **session** (HttpOnly cookie) — before this slice nothing on the
server knew who the signed-in candidate was.

## Layers (ARCHITECTURE §6)

| Step | File(s) |
|---|---|
| Domain | `src/lib/domain/candidate-profile.ts`, `src/lib/domain/countries.ts` |
| Schema | `prisma/schema.prisma` — `CandidateProfile` extended; new `Skill`, `CandidateSkill`, `CandidateLanguage`, `WorkExperience`, `Education`, `Certification`, `PortfolioItem` |
| Validator | `src/lib/validators/candidate-profile.ts` |
| Repository | `src/lib/repositories/candidate-profile/` |
| Service | `src/lib/services/candidate-profile/` (`profile-strength.ts` is the pure scoring function) |
| Session | `src/lib/auth/session.ts` — `getCandidateSession()`, `requireCandidateSession()`, cookie helpers |
| API | `src/app/api/v1/candidates/{login,logout,me,me/profile,me/profile/[section],me/uploads}/route.ts`, `src/app/api/v1/skills/route.ts` |
| Client | `src/lib/api-client/candidate-profile.ts` |
| UI | `src/components/candidate/profile/*`, pages `/candidate/profile` and `/candidate/profile/preview` |

## Endpoints

| Method | Path | Notes |
|---|---|---|
| POST | `/api/v1/candidates/login` | Sets `atlas_session` cookie (HttpOnly, SameSite=Lax, lifetime = Supabase token expiry) |
| POST | `/api/v1/candidates/logout` | Clears the cookie |
| GET | `/api/v1/candidates/me` | Signed-in candidate, 401 otherwise |
| GET | `/api/v1/candidates/me/profile` | `{ profile, strength }` |
| PATCH | `/api/v1/candidates/me/profile` | Basics: name, headline, bio, country, city, rate, hours, availability |
| PUT | `/api/v1/candidates/me/profile/{skills\|languages\|experiences\|education\|certifications\|portfolio}` | Replaces the whole section |
| POST | `/api/v1/candidates/me/uploads` | multipart `kind=avatar\|portfolio`, `file` → `{ url, view }` |
| GET | `/api/v1/skills?q=` | Typeahead over the shared skill vocabulary |

Field errors for list sections come back keyed `"<index>.<field>"`.

## Profile strength (weights sum to 100)

photo 10 · headline 10 · bio ≥ 80 chars 10 · country 5 · rate 10 · hours 5 ·
availability 5 · ≥ 1 language 5 · ≥ 3 skills 15 · ≥ 1 role 15 ·
education-or-certification 5 · ≥ 1 portfolio item 5.

## Running it

1. Fill `DATABASE_URL`, `DIRECT_URL`, `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`
   (they are currently empty on the dev machine — signup/login cannot work
   until they are).
2. `pnpm db:deploy` (or `pnpm db:migrate` in dev). The initial migration
   `prisma/migrations/20260816000000_init_candidate_profile` creates every
   table from scratch. If the database already has `User`/`CandidateProfile`
   from an earlier `prisma db push`, mark it applied instead:
   `npx prisma migrate resolve --applied 20260816000000_init_candidate_profile`
   and then `prisma db push` once to add the new tables.
3. Storage buckets `avatars` and `portfolio` are created automatically (public)
   on the first upload via the service-role client — no dashboard setup.
4. Supabase JWT expiry (Authentication → Sessions) sets how long a candidate
   stays signed in; there is no refresh-token flow yet.

## Known follow-ups

- Refresh-token rotation (session ends when the access token expires).
- Guard the whole `(candidate)` layout once the dashboard reads real data —
  today only `/candidate/profile*` redirects anonymous visitors, and the
  topbar falls back to the mock candidate when there is no session.
- Rate limiting on login/uploads (ARCHITECTURE §7.6).
- Client-side browse/detail of candidates will reuse
  `components/candidate/profile/client-profile-view.tsx`.
