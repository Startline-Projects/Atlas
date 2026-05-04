# Atlas — Project Scope

> **Operated by:** Staffva LLC, doing business as Atlas, registered in Michigan, USA.
> **Mission:** Connect global talent with clients through a curated, vetted marketplace where candidates pay nothing and clients pay one transparent flat fee.
> **MVP target:** 4 weeks from kickoff to public soft launch.

---

## 1. What Atlas Is

A two-sided talent marketplace with five role surfaces:

| Role | Description | Phase |
|---|---|---|
| **Candidate** | Vetted talent, builds a profile, applies to jobs, gets paid. | MVP |
| **Client** | Hires talent, posts jobs, manages contracts, pays Atlas + candidates. | MVP |
| **Admin** | Internal Staffva staff. Full visibility, moderation, refunds, suspensions. | MVP (minimal) |
| **Talent Specialist** | Curates candidates, runs vetting interviews, supports clients. | Phase 2 |
| **Manager of Talent Specialists** | Oversees Specialists, audits decisions, manages pool health. | Phase 2 |

**Pricing model (locked):** 10% client fee, on top of the candidate's quoted rate. 0% candidate fee. No tiers, no Connects, no premium plans for MVP.

---

## 2. MVP — In Scope (Weeks 1–4)

### 2.1 Identity & Authentication

- Email + password signup with email verification.
- Sign-in with rate-limited attempts, lockout after 5 failures, 15-minute cooldown.
- 2FA via TOTP (optional in MVP, required for admins).
- Session management.
- Password reset.
- Account suspension state.
- Soft delete with 30-day recovery window.

### 2.2 Candidate Surface

**Profile & onboarding:**
- Multi-step signup (account → personal info → role category → terms).
- Identity verification via Stripe Identity or Persona (KYC).
- Profile builder: name, photo, headline, bio, country, languages, hourly rate, hours/week, availability.
- Skills and tools (tag-based, searchable).
- Work history (with manual verification flag).
- Portfolio (up to 6 items, each with image/title/description).
- Education and certifications.
- Profile strength meter.
- Profile preview in client mode.

**Discovery & work:**
- Browse open jobs (filter by category, rate, hours).
- Submit proposal (cover letter + proposed rate).
- Inbox / messaging with clients (real-time).
- View active contracts.
- View earnings + payout history.

**Settings:**
- Notification preferences.
- Payout setup (Stripe Connect Express or Wise).
- Account settings (password, 2FA, sessions, delete).

### 2.3 Client Surface

**Onboarding:**
- Signup (24-step flow; first 3 already prototyped — signup, email verification, sign-in).
- Email verification.
- Company profile (name, country, hiring categories, team size).
- Payment method on file (Stripe).

**Hiring:**
- Dashboard (active jobs, proposals received, active contracts, recent messages).
- Browse curated candidates.
- View candidate profile (with hire / message / save actions).
- Post a job.
- Receive proposals and shortlist.
- Direct messaging with candidates (real-time).
- Send a hire offer → candidate accepts → contract created.
- Active contract view (rate, hours, paid-to-date, recent activity).

**Billing:**
- Saved payment methods.
- Invoice history.
- Pay invoice (one-click via Stripe).
- Active subscriptions (none in MVP — pay as you go).

**Settings:**
- Company settings.
- Team members (single-seat in MVP, multi-seat in Phase 2).
- Notification preferences.
- Account settings.

### 2.4 Admin Surface (Minimal)

Just enough to run the business safely on day one.

- Admin sign-in (separate flow, mandatory 2FA).
- User search across candidates and clients.
- Per-user detail page with key signals.
- Suspend / unsuspend an account.
- Issue a manual refund.
- View recent transactions.
- Audit log viewer (read-only).
- Send a manual platform announcement (email).

### 2.5 Cross-Cutting

- Real-time messaging (Pusher).
- Email notifications (Resend) — verified email, proposal received, hire offer, contract signed, payment, dispute opened.
- File uploads (avatars, portfolios, ID docs) via signed URLs.
- Payments via Stripe Connect (client charged, candidate paid out).
- Audit log on every state-changing admin and user action.
- WCAG 2.1 AA accessibility.
- Mobile-responsive (web only — no native apps in MVP).
- English language only.

---

## 3. MVP — Explicitly Out of Scope

These are deferred. Each one represents weeks of work that will not fit in a 4-week window without sacrificing quality on what remains.

### 3.1 Deferred to Phase 2 (months 2–4)

- **Talent Specialist interface** (16 pages) — manual curation by Atlas staff.
- **Manager of Talent Specialists interface** (30 pages).
- **Full Admin interface** (40 pages — analytics, regulatory submissions, platform settings, categories management).
- **AI-based interview / screening** — proctored English assessment, video interviews, AI scoring.
- **Anti-cheat stack** — gaze tracking, audio analysis, behavioral signals.
- **Video interviews and recording** — Daily.co or 100ms integration.
- **Time tracker with screenshots** — desktop client.
- **Disputes resolution flow** — full version. MVP ships a "report a problem" form that creates a manual ticket for admins.
- **Replacement assistance** — automated rebooking after a bad hire.
- **Multi-language UI.**
- **Multi-seat client accounts.**
- **Subscription / enterprise plans.**
- **Mobile native apps (iOS/Android).**
- **Advanced search** (Algolia, semantic search).
- **Skills assessments and re-certifications.**
- **Affiliate / referral program.**
- **Public API for external clients.**

### 3.2 Will Never Be in Scope This Way

- Self-hosted WebSockets (use Pusher or Ably).
- Self-built video calling (use Daily.co or 100ms).
- Self-built payment processing (use Stripe Connect + Wise).
- Self-built KYC (use Stripe Identity or Persona).
- Microservices for the MVP.

---

## 4. Critical User Journeys

These are the four flows that **must work flawlessly** at launch. They drive QA priorities.

### Journey 1 — Candidate joins and lands first contract
1. Signs up → verifies email.
2. Completes profile (KYC, skills, portfolio).
3. Profile is approved (auto-approved in MVP; manually by admin if flagged).
4. Browses open jobs.
5. Submits a proposal.
6. Receives a hire offer.
7. Accepts → contract is created.
8. Logs hours / sends invoice.
9. Receives payout to Stripe Connect account.

### Journey 2 — Client posts a job and hires
1. Signs up → verifies email → adds payment method.
2. Posts a job.
3. Reviews incoming proposals.
4. Messages candidates.
5. Sends a hire offer.
6. Candidate accepts → contract is signed.
7. Pays first invoice.
8. Manages contract.

### Journey 3 — Real-time message between client and candidate
1. Either party sends a message.
2. Other party receives it within 1 second.
3. Unread count updates in nav.
4. Email notification fires if recipient has been offline > 5 minutes.

### Journey 4 — Admin handles a problem
1. Admin signs in with 2FA.
2. Searches for a user.
3. Reviews their activity.
4. Suspends account / refunds payment as needed.
5. Action is captured in the audit log.

---

## 5. Success Criteria for MVP

The MVP is shippable when:

- [ ] All four critical user journeys work end-to-end without manual intervention.
- [ ] Candidate can earn money and receive a payout.
- [ ] Client can pay an invoice.
- [ ] Stripe webhooks reconcile correctly with internal state.
- [ ] No P0 or P1 bugs open.
- [ ] WCAG 2.1 AA passes on critical pages (Axe + manual keyboard test).
- [ ] p95 API latency under budget.
- [ ] Sentry, structured logs, and audit log are wired and verified.
- [ ] Rate limits are active on signup / signin / OTP / message-send.
- [ ] At least one paying client and one candidate complete a full transaction in production.
- [ ] Runbooks exist for: refund, suspend user, restore user, rotate secret, restore from backup.
- [ ] All `.env` variables documented in `.env.example`.

---

## 6. Roles & RBAC (MVP)

| Role | Sees | Can do |
|---|---|---|
| `guest` | Public marketing pages, signup, signin | Read public content |
| `candidate` | Own profile, browse jobs, own proposals, own contracts, own messages, own earnings | Edit own profile; submit/withdraw proposals; message clients; accept/decline offers |
| `client` | Own jobs, candidate profiles, own contracts, own messages, own billing | Post jobs; message candidates; send offers; pay invoices |
| `admin` | Everything | Suspend, refund, send announcements, view audit log |

Phase-2 roles (`specialist`, `manager`) are reserved in the schema from day one to avoid migrations later.

---

## 7. Data We Hold

For privacy review and DPIA. All listed data is collected with user consent at signup.

**Personal identifiers:** name, email, phone, country, city, government ID document (KYC).
**Financial:** Stripe customer ID, Stripe Connect account ID, payment method tokens (no PANs).
**Behavioral:** logins, page views, message timestamps, audit log.
**Content:** profiles, portfolios, messages, contracts, invoices.

We do **not** hold: passwords (Clerk/Auth.js handles), full payment card numbers (Stripe), bank account numbers in plain (Wise/Stripe).

---

## 8. Compliance Posture (MVP)

- GDPR: data export and deletion endpoints in admin.
- CCPA: same.
- Stripe Identity covers KYC for candidates earning over $600/year.
- 1099-NEC issued at year end for US candidates over the threshold (manual in MVP, automated in Phase 2).
- Cookie banner with categorized consent.
- Privacy policy, ToS, Cookie policy, Biometric Consent — already drafted.

---

## 9. Out-of-Scope Reminders for AI / Engineers

If a request comes in to build any of the following during the MVP window, **escalate before building**:

- Anything in section 3 (Out of Scope).
- Anything that requires a new external vendor not in `TECH_STACK.md`.
- Anything that requires a new top-level concept not in this document.
- Anything that breaks the dependency rule in `ARCHITECTURE.md`.

---

**Last updated:** 2026-05-04
**Owner:** Product + Engineering leads
