import { NextResponse, type NextRequest } from "next/server";

import { ADMIN_SESSION_COOKIE, SESSION_COOKIE } from "@/lib/auth/cookie-names";
import {
  adminSignInPath,
  candidateSignInPath,
  PATHNAME_HEADER,
} from "@/lib/auth/redirects";

/**
 * Request proxy (Next 16's name for `middleware.ts`) — ARCHITECTURE §15:
 * "All routes default to authenticated. Public routes are explicitly listed."
 *
 * This is the cheap outer gate. It looks only at whether a session cookie is
 * *present* — no network, no database — and bounces anonymous visitors to the
 * matching sign-in page with a `?next=` so they land back where they were.
 * The cookie's *validity* is checked by the guarded layouts and pages through
 * `getCandidateSession()` / `getAdminSession()`; a stale cookie therefore gets
 * past this file and is caught one step later. That split is deliberate:
 * validating here would put a Supabase round-trip in front of every request
 * the matcher touches.
 *
 * Deliberately NOT done here: sending a visitor who *has* a cookie away from
 * a sign-in page. Presence is not validity, and a stale cookie would loop
 * (proxy → dashboard → layout finds no session → sign-in → proxy → …). The
 * auth layouts do that redirect after a real check.
 *
 * Only guards. No rewrites, no locale, no rate limiting yet (§7.6 lands with
 * Upstash) — keep it that way so the file stays auditable at a glance.
 */

interface Surface {
  /** URL prefix the surface owns. */
  prefix: string;
  /** Paths under the prefix an anonymous visitor may open. */
  publicPaths: ReadonlyArray<string>;
  /** Cookie whose presence lets a request through. */
  cookie: string;
  /** Where to send anonymous visitors, carrying `?next=`. */
  signInPath: (next: string) => string;
}

const SURFACES: ReadonlyArray<Surface> = [
  {
    prefix: "/candidate",
    publicPaths: ["/candidate/signin", "/candidate/signup"],
    cookie: SESSION_COOKIE,
    signInPath: candidateSignInPath,
  },
  {
    prefix: "/admin",
    publicPaths: ["/admin/signin"],
    cookie: ADMIN_SESSION_COOKIE,
    signInPath: adminSignInPath,
  },
];

function isUnder(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export function proxy(request: NextRequest): NextResponse {
  const { pathname, search } = request.nextUrl;
  const here = `${pathname}${search}`;

  for (const surface of SURFACES) {
    if (!isUnder(pathname, surface.prefix)) continue;
    if (surface.publicPaths.some((p) => isUnder(pathname, p))) break;
    if (request.cookies.has(surface.cookie)) break;
    return NextResponse.redirect(new URL(surface.signInPath(here), request.url));
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
