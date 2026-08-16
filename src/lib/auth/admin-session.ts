import { cookies } from "next/headers";
import type { NextResponse } from "next/server";
import { cache } from "react";

import type { AdminUser } from "@/lib/domain/admin";
import { UnauthorizedError } from "@/lib/errors/domain-error";
import { adminService } from "@/lib/services/admin";

import { ADMIN_SESSION_COOKIE } from "./cookie-names";
import {
  ADMIN_COOKIES,
  applySessionCookies,
  clearSessionCookies,
  type SessionTokens,
} from "./session-cookies";

/**
 * Admin session — the console twin of `session.ts`.
 *
 * Same mechanics (Supabase access token in an HttpOnly cookie, refresh token
 * beside it, validated on every guarded render, memoised per request),
 * different cookies, different resolver: `adminService.fromAccessToken()`
 * only ever returns a `role = ADMIN` user, so a candidate who copies their
 * token into this cookie still gets `null`.
 */

export interface AdminSession {
  userId: string;
  email: string;
  fullName: string;
  admin: AdminUser;
}

export function applyAdminSessionCookie(
  response: NextResponse,
  tokens: SessionTokens,
): void {
  applySessionCookies(response, ADMIN_COOKIES, tokens);
}

export function clearAdminSessionCookie(response: NextResponse): void {
  clearSessionCookies(response, ADMIN_COOKIES);
}

/** The raw admin access token from the cookie, for routes that revoke it. */
export async function currentAdminAccessToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(ADMIN_SESSION_COOKIE)?.value ?? null;
}

export const getAdminSession = cache(async (): Promise<AdminSession | null> => {
  const store = await cookies();
  const token = store.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return null;

  const admin = await adminService.fromAccessToken(token);
  if (!admin) return null;

  return {
    userId: admin.id,
    email: admin.email,
    fullName: admin.fullName,
    admin,
  };
});

/** For route handlers: a missing or expired session is a 401, not a crash. */
export async function requireAdminSession(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) {
    throw new UnauthorizedError("Please sign in to continue.");
  }
  return session;
}
