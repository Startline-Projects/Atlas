import { cookies, headers } from "next/headers";
import type { NextResponse } from "next/server";
import { cache } from "react";

import { isProduction } from "@/lib/config";
import type { Candidate } from "@/lib/domain/candidate";
import { UnauthorizedError } from "@/lib/errors/domain-error";
import { candidateService } from "@/lib/services/candidate";

import { SESSION_COOKIE } from "./cookie-names";
import { PATHNAME_HEADER } from "./redirects";

/**
 * Candidate session — ARCHITECTURE §7.1.
 *
 * The session is a Supabase access token in an HttpOnly cookie. It is set by
 * the login route, cleared by the logout route, and read here — nowhere else
 * touches the cookie name. Route handlers call `requireCandidateSession()` and
 * pass `session.userId` down to services; services never read the cookie.
 *
 * Server Components use `getCandidateSession()` and redirect on `null`.
 *
 * `src/proxy.ts` only checks that the cookie *exists* (cheap, no network) so
 * anonymous visitors bounce before anything renders; the token itself is
 * validated here, on every request that reaches a guarded layout or page.
 */

export { SESSION_COOKIE };

export interface CandidateSession {
  userId: string;
  email: string;
  fullName: string;
  candidate: Candidate;
}

export function applySessionCookie(
  response: NextResponse,
  accessToken: string,
  maxAgeSeconds: number,
): void {
  response.cookies.set(SESSION_COOKIE, accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction,
    path: "/",
    maxAge: maxAgeSeconds,
  });
}

export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction,
    path: "/",
    maxAge: 0,
  });
}

/**
 * Wrapped in React `cache()` so the layout, the topbar and the page can each
 * ask for the session during one render and Supabase + the database are hit
 * once per request, not once per caller.
 */
export const getCandidateSession = cache(
  async (): Promise<CandidateSession | null> => {
    const store = await cookies();
    const token = store.get(SESSION_COOKIE)?.value;
    if (!token) return null;

    const candidate = await candidateService.fromAccessToken(token);
    if (!candidate) return null;

    return {
      userId: candidate.id,
      email: candidate.email,
      fullName: candidate.fullName,
      candidate,
    };
  },
);

/**
 * The path (+ query) of the request being rendered, as stamped by
 * `src/proxy.ts`. Null when the request did not pass through the proxy (a
 * route outside its matcher) — callers then redirect without a `?next=`.
 */
export async function currentRequestPath(): Promise<string | null> {
  const h = await headers();
  return h.get(PATHNAME_HEADER);
}

/** For route handlers: a missing or expired session is a 401, not a crash. */
export async function requireCandidateSession(): Promise<CandidateSession> {
  const session = await getCandidateSession();
  if (!session) {
    throw new UnauthorizedError("Please sign in to continue.");
  }
  return session;
}
