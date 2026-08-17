import type { NextResponse } from "next/server";

import { isProduction } from "@/lib/config";

import {
  ADMIN_REFRESH_COOKIE,
  ADMIN_SESSION_COOKIE,
  CLIENT_REFRESH_COOKIE,
  CLIENT_SESSION_COOKIE,
  REFRESH_COOKIE,
  REFRESH_COOKIE_MAX_AGE_SECONDS,
  SESSION_COOKIE,
} from "./cookie-names";

/**
 * The one place session cookies are written. Login/logout routes and the
 * refresh path in `src/proxy.ts` all go through here, so the attributes
 * (HttpOnly, SameSite=Lax, Secure in prod, path=/) can never drift apart.
 *
 * Light on purpose — no services, no Prisma — because the proxy imports it.
 */

export interface SessionTokens {
  accessToken: string;
  refreshToken: string;
  /** Seconds until `accessToken` expires. */
  expiresIn: number;
}

export interface CookiePair {
  access: string;
  refresh: string;
}

export const CANDIDATE_COOKIES: CookiePair = {
  access: SESSION_COOKIE,
  refresh: REFRESH_COOKIE,
};

export const ADMIN_COOKIES: CookiePair = {
  access: ADMIN_SESSION_COOKIE,
  refresh: ADMIN_REFRESH_COOKIE,
};

export const CLIENT_COOKIES: CookiePair = {
  access: CLIENT_SESSION_COOKIE,
  refresh: CLIENT_REFRESH_COOKIE,
};

const BASE = {
  httpOnly: true,
  sameSite: "lax",
  secure: isProduction,
  path: "/",
} as const;

/** Writes both cookies for a surface. */
export function applySessionCookies(
  response: NextResponse,
  pair: CookiePair,
  tokens: SessionTokens,
): void {
  response.cookies.set(pair.access, tokens.accessToken, {
    ...BASE,
    maxAge: tokens.expiresIn,
  });
  response.cookies.set(pair.refresh, tokens.refreshToken, {
    ...BASE,
    maxAge: REFRESH_COOKIE_MAX_AGE_SECONDS,
  });
}

/** Clears both cookies for a surface. */
export function clearSessionCookies(response: NextResponse, pair: CookiePair): void {
  response.cookies.set(pair.access, "", { ...BASE, maxAge: 0 });
  response.cookies.set(pair.refresh, "", { ...BASE, maxAge: 0 });
}
