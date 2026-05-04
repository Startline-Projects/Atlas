You are working in the Atlas monorepo. Atlas is a global talent marketplace. Your job in this session is to **scaffold the Next.js 15 frontend foundation and convert the public landing page** from `homepage__10_.html` into clean, componentized Next.js + TypeScript + Tailwind code.

---

### Step 1 — Read the architecture, no exceptions

Before writing a single line of code, read these files **in order** and confirm you understand them:

1. `docs/ARCHITECTURE.md` — the layered architecture and dependency rules.
2. `docs/AI_RULES.md` — the prime directives, hard bans, and required patterns.
3. `docs/FOLDER_STRUCTURE.md` — exact directory layout you must match.
4. `docs/TECH_STACK.md` — the locked technology choices.
5. `docs/PROJECT_SCOPE.md` — what is and isn't in MVP.
6. `homepage__10_.html` — skim the `<style>` block (lines 1–19000ish for design tokens and component styles), then read the `<main id="view-home">` section (~lines 19599–20562) carefully. Also read the `<nav class="nav">` (~line 19576) and the `<footer>` (~line 36984). **Ignore all other views (`view-browse`, `view-profile`, `view-pricing`, `view-blog`, `view-careers`, `view-legal-*`, etc.) — they are out of scope for this session.**

After reading, write a one-paragraph summary back to me confirming:
- The five-layer dependency rule (UI → API → Service → Repository → DB).
- Why business logic does not live in pages or components.
- Which sections of `view-home` you will convert and which you will skip.

Only after I confirm should you proceed to Step 2.

---

### Step 2 — Scope of this session (what you will and will not build)

**In scope (build now):**

- Next.js 15 project scaffolding using App Router, TypeScript strict, Tailwind CSS v4, pnpm.
- Centralized design system: Tailwind config carries every color, font, radius, shadow, and spacing token from the HTML. `globals.css` carries reusable component classes (`.btn`, `.display`, `.eyebrow`, `.container`, `.serif-italic`, `.underline-accent`) using `@layer components`.
- Marketing route group: `src/app/(marketing)/`.
- Marketing layout wrapping public pages with shared `<NavBar>` and `<Footer>`.
- Landing page (`/`) composed of section components, each in its own file.
- UI primitives: `Button`, `Container`, `Eyebrow`, `Logo` in `src/components/ui/`.
- Fonts loaded via `next/font` (Fraunces for display, Geist for body, Geist Mono for mono).
- Empty placeholder `lib/` structure matching `FOLDER_STRUCTURE.md` so future sessions can plug in services without restructuring. Create the folders with `.gitkeep` files only — **no service or repository code yet**.

**Out of scope (do not touch):**

- Any other view (`view-browse`, `view-profile`, `view-pricing`, `view-help`, `view-blog`, `view-trust`, `view-about`, `view-careers*`, `view-talent`, `view-contact`, all `view-legal-*`).
- The signup modal interactivity beyond a placeholder open/close.
- Any backend code, services, repositories, Prisma, database, or API routes.
- Any auth integration (Clerk / Auth.js).
- Any data fetching — all content on the landing page is static, hardcoded inside the components for now.
- Any analytics, Sentry, or third-party SDKs.

If a request would expand scope, **stop and ask me first**.

---

### Step 3 — Project setup

Run these commands from the repo root. Do not skip steps.

```bash
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm --no-turbopack
pnpm add clsx tailwind-merge class-variance-authority lucide-react
pnpm add -D prettier prettier-plugin-tailwindcss eslint-plugin-import @types/node
```

**Important:** if `create-next-app` complains the directory is non-empty, scaffold into a temporary directory and merge the relevant files (`package.json`, `tsconfig.json`, `next.config.mjs`, `postcss.config.mjs`, `src/app/layout.tsx`, `src/app/globals.css`) by hand. **Never delete `docs/` or `homepage__10_.html` or anything else already in the repo.**

After install, create:
- `.prettierrc` with `{ "plugins": ["prettier-plugin-tailwindcss"], "semi": true, "singleQuote": false, "trailingComma": "all" }`
- `.eslintrc.cjs` extending `next/core-web-vitals` and adding the `import/no-restricted-paths` rule per `ARCHITECTURE.md` §4 (UI may not import from `lib/services`, `lib/repositories`, `lib/db`, or Prisma).
- `tsconfig.json` with `"strict": true`, `"noUncheckedIndexedAccess": true`, `"exactOptionalPropertyTypes": true`.

---

### Step 4 — Centralize the design system

This is the part that matters most. **Every design token from the HTML must be in `tailwind.config.ts`.** Components must never hardcode hex colors, font names, or magic radii — they reference Tailwind tokens or component classes. This is what "global classes defined centrally" means.

Extract these tokens from `homepage__10_.html` `:root`:

**Colors:**
```
cream:       #F3EEE3
cream-deep:  #EAE3D4
ink:         #0E0E0C
ink-soft:    #2B2A26
ink-mute:    #6B6860
paper:       #FBF8F2
line:        #D9D2C3
line-soft:   #E4DDCE
lime:        #D6F24D
lime-deep:   #B9D92F
amber:       #E8763A
navy:        #16213E
danger:      #C2412B
```

**Fonts (load via `next/font/google` in `app/layout.tsx`):**
```
Fraunces — display, opsz 9..144, weights 300..900, italics yes
Geist — body, weights 300..900
Geist Mono — mono, weights 400..600
```

**Border radii:** `sm: 6px`, `md: 10px`, `lg: 18px`, `xl: 28px`

**Shadows:** Match the three custom shadows from `:root` (`--shadow-sm`, `--shadow-md`, `--shadow-lg`).

**Container max-width:** 1340px with 32px horizontal padding.

**Setup:**

1. **`tailwind.config.ts`** — extend the theme with all the tokens above. Use Tailwind v4's `@theme` directive in `globals.css` if you prefer the new approach, but the principle is the same: tokens are central.

2. **`src/app/globals.css`** — define reusable component classes inside `@layer components`. These mirror the HTML's utility classes so the conversion stays 1:1:
   - `.container-page` (the 1340px / 32px container — use `container-page` not `container` to avoid Tailwind's built-in collision)
   - `.eyebrow` (mono, 11px, uppercase, tracked)
   - `.display` (Fraunces, opsz 144, line-height 0.95, letter-spacing -0.025em)
   - `.serif-italic` (Fraunces italic, opsz 144)
   - `.underline-accent` (the highlighted underline behind text)
   - `.btn`, `.btn-primary`, `.btn-ghost`, `.btn-lime`, `.btn-lg` (the button system)

3. **`src/lib/utils/cn.ts`** — the standard `cn()` helper:
   ```ts
   import { clsx, type ClassValue } from "clsx";
   import { twMerge } from "tailwind-merge";
   export function cn(...inputs: ClassValue[]) {
     return twMerge(clsx(inputs));
   }
   ```

4. **No inline `style={{ ... }}` for design tokens.** If the HTML uses `style="background: var(--ink);"` you replace it with a Tailwind class (`bg-ink`). Inline styles are only allowed for genuinely dynamic values (e.g., gradient avatars whose colors come from data).

---

### Step 5 — Folder structure

Match `docs/FOLDER_STRUCTURE.md` exactly. For this session, create:

```
src/
├── app/
│   ├── (marketing)/
│   │   ├── layout.tsx          # wraps with NavBar + Footer
│   │   └── page.tsx            # landing page (composes home sections)
│   ├── layout.tsx              # root layout — fonts, metadata, html shell
│   ├── globals.css
│   ├── not-found.tsx
│   └── error.tsx
│
├── components/
│   ├── ui/                     # primitives
│   │   ├── button.tsx
│   │   ├── container.tsx
│   │   ├── eyebrow.tsx
│   │   └── logo.tsx
│   ├── shared/
│   │   ├── nav-bar.tsx
│   │   ├── footer.tsx
│   │   └── signup-modal.tsx    # placeholder — open/close only
│   └── marketing/
│       ├── hero.tsx
│       ├── fees.tsx
│       ├── featured-candidates.tsx
│       ├── vetting.tsx
│       ├── categories.tsx
│       ├── testimonials.tsx
│       ├── candidate-cta.tsx
│       ├── trust-strip.tsx
│       └── faq.tsx
│
├── lib/
│   ├── utils/
│   │   └── cn.ts
│   ├── domain/.gitkeep
│   ├── services/.gitkeep
│   ├── repositories/.gitkeep
│   ├── validators/.gitkeep
│   ├── errors/.gitkeep
│   ├── permissions/.gitkeep
│   ├── integrations/.gitkeep
│   ├── api-client/.gitkeep
│   ├── api/.gitkeep
│   ├── auth/.gitkeep
│   ├── db/.gitkeep
│   └── config/.gitkeep
│
├── hooks/.gitkeep
├── stores/.gitkeep
└── styles/.gitkeep
```

The `.gitkeep` placeholders matter — they preserve the structure for future sessions and signal to other engineers and AI agents where things go.

---

### Step 6 — Build order (vertical slice for the landing page)

Build in this exact sequence. Show me the diff for each step before moving on.

**6.1 — Foundation.**
- `tailwind.config.ts` with all tokens.
- `src/app/globals.css` with `@layer components` classes (`.eyebrow`, `.display`, `.serif-italic`, `.underline-accent`, `.btn*`).
- `src/app/layout.tsx` — root layout, loads Fraunces, Geist, Geist Mono via `next/font/google`, sets `font-body` on body, sets metadata (`title`, `description`, `og:*`).
- `src/lib/utils/cn.ts`.

**6.2 — Primitives.**
- `Button` component using `class-variance-authority` for variants (`primary | ghost | lime`) and sizes (`md | lg`). Maps directly to `.btn`, `.btn-primary`, etc.
- `Container` component (renders `<div className="container-page">`).
- `Eyebrow` component.
- `Logo` component (the circle-with-lime-dot mark + "Atlas" wordmark).

**6.3 — Shared shell.**
- `NavBar` — extracts `<nav class="nav">` from the HTML. Sticky, blurred backdrop, scroll-aware border. Use a small client component for the scroll listener; the wrapper stays a Server Component. Replace all `data-route` hash links with proper Next.js `<Link>` components pointing to anchor placeholders for now (`/#how`, `/#pricing`) or `/` for non-existent pages.
- `Footer` — extracts the `<footer>` block.
- `SignupModal` — placeholder client component, controlled by a `useState` toggle, opens/closes only. No real flow yet.
- `(marketing)/layout.tsx` — composes NavBar above `{children}` and Footer below.

**6.4 — Home sections.** Each section in its own file, in this order, matching the HTML order. Preserve **exact visual fidelity** including:
- Hero candidate cards (3 layered cards with avatars, tags, stats).
- Live stats row.
- Hero search form (presentational only, no submit handler beyond `e.preventDefault()`).
- Reveal-on-scroll animation: extract into a `useReveal` hook in `src/hooks/use-reveal.ts` and apply to the relevant elements. Keep the same easing and stagger.
- All SVG icons inline as React components or as `lucide-react` icons where the HTML uses generic ones. For brand-specific custom SVGs (logo mark, hero-card avatar paths), keep them inline.

Sections, in order:
1. `Hero` — badge, headline, sub, search, secondary line, live stats, hero visual cards.
2. `Fees` — pricing strip / fees calculator preview.
3. `FeaturedCandidates` — candidate grid + "Browse all 2,847 →" link.
4. `Vetting` — the vetting funnel visual.
5. `Categories` — role categories grid.
6. `Testimonials` — quotes with avatars.
7. `CandidateCTA` — "Looking for work?" CTA.
8. `TrustStrip` — the small trust logos / signals row.
9. `Faq` — accordion. Use `<details>`/`<summary>` for built-in accessibility, or build a controlled accordion with `useState`. Either is fine — pick the simpler one.

**6.5 — Compose `(marketing)/page.tsx`.** It just imports and stacks the section components. No logic.

**6.6 — Verification.** Run `pnpm dev`, open the page, compare side-by-side with `homepage__10_.html` open in another tab. The two should be visually indistinguishable for the home view. Check responsive at 1440px, 1024px, 768px, 375px. Run `pnpm typecheck` and `pnpm lint` — both must pass clean.

---

### Step 7 — Quality bar (non-negotiable)

For this session to be considered complete:

1. **Pixel-level fidelity** with the original home view at desktop (1440px) and mobile (375px). Side-by-side comparison should show no obvious visual differences in spacing, color, typography, or layout.
2. **Zero `any` types.** TypeScript strict mode passes with no escape hatches.
3. **Zero inline hex colors** in components. Everything goes through Tailwind tokens or component classes.
4. **Zero hardcoded font names** outside the `next/font` setup.
5. **Zero hash-based JS routing.** Use Next.js `<Link>` for navigation. Hash anchors that target sections on the same page (`#how-it-works`) are fine if the section exists; otherwise they go to `/` for now with a `// TODO: link to /how-it-works route` comment.
6. **Lighthouse Accessibility score ≥ 95** on the landing page. Specifically: every interactive element is keyboard-reachable, every image has alt text, every form input has a label, color contrast meets AA.
7. **No layout shift** on font load (use `display: "swap"` and `next/font` size adjustments).
8. **Lint and typecheck pass clean** with zero warnings suppressed.
9. **No `console.log`, `debugger`, or commented-out code** in committed files.
10. **Each section component is a Server Component by default.** Add `"use client"` only where it is genuinely needed (NavBar scroll listener, FAQ accordion, SignupModal, hero search form interactions, useReveal hook).

---

### Step 8 — Deliverable

When done, give me:

1. A short summary (≤ 10 lines) of what changed and how to run it (`pnpm dev`).
2. The list of created files, grouped by layer.
3. A note flagging any spots where you had to make a judgment call (e.g., "I split the Hero into Hero + HeroCards because Hero was over 200 lines").
4. A list of TODOs for the next session (e.g., "navigate to /browse — currently a placeholder link").

Do not commit. I will review and commit myself.

---

### Hard rules — reminder

These are from `AI_RULES.md`. They apply now and to every future session:

- API routes are thin wrappers. Not relevant this session (no API yet) but applies once we add one.
- All business logic in `src/lib/services/`. Not relevant this session — but **this means the landing page must not contain any business logic, role checks, or data-fetching logic that isn't trivially static.** All copy is hardcoded for now.
- No Prisma calls outside repositories. Not relevant this session.
- No `any` on public interfaces.
- No hardcoded secrets.
- No new dependencies beyond what is in Step 3 — if you think one is needed, ask first.

---

### Begin

Acknowledge by:
1. Confirming you have read the six files in Step 1.
2. Stating in one paragraph the dependency rule and where business logic lives.
3. Listing the nine sections of `view-home` you will convert.
4. Listing the files in the repo root **before** any of your changes (so we can verify nothing existing is being clobbered).

Then wait for my "go" before executing Step 3.
