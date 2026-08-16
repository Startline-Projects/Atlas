import { NextResponse, type NextRequest } from "next/server";

import { SESSION_COOKIE } from "@/lib/auth/cookie-names";
import { candidateSignInPath, PATHNAME_HEADER } from "@/lib/auth/redirects";

/**
 * Request proxy (Next 16's name for `middleware.ts`) — ARCHITECTURE §15:
 * "All routes default to authenticated. Public routes are explicitly listed."
 *
 * This is the cheap outer gate. It looks only at whether a session cookie is
 * *present* — no network, no database — and bounces anonymous visitors to the
 * matching sign-in page with a `?next=` so they land back where they were.
 * The cookie's *validity* is checked by the guarded layouts and pages through
 * `getCandidateSession()`; a stale cookie therefore gets past this file and is
 * caught one step later. That split is deliberate: validating here would put
 * a Supabase round-trip in front of every static asset the matcher touches.
 *
 * Deliberately NOT done here: sending a visitor who *has* a cookie away from
 * `/candidate/signin`. Presence is not validity, and a stale cookie would loop
 * (proxy → dashboard → layout finds no session → sign-in → proxy → …). The
 * auth layout does that redirect after a real check.
 *
 * Only guards. No rewrites, no locale, no rate limiting yet (§7.6 lands with
 * Upstash) — keep it that way so the file stays auditable at a glance.
 */

/** Paths under `/candidate` that an anonymous visitor may open. */
const CANDIDATE_PUBLIC_PATHS: ReadonlyArray<string> = [
  "/candidate/signin",
  "/candidate/signup",
];

function isUnder(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export function proxy(request: NextRequest): NextResponse {
  const { pathname, search } = request.nextUrl;
  const here = `${pathname}${search}`;

  if (
    isUnder(pathname, "/candidate") &&
    !CANDIDATE_PUBLIC_PATHS.some((p) => isUnder(pathname, p)) &&
    !request.cookies.has(SESSION_COOKIE)
  ) {
    return NextResponse.redirect(new URL(candidateSignInPath(here), request.url));
  }

  // Layouts cannot see the URL they are rendering for; hand it to them so a
  // session that turns out to be stale can still redirect with a `?next=`.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(PATHNAME_HEADER, here);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/candidate/:path*", "/admin/:path*"],
};
