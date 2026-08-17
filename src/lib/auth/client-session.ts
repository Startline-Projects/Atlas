import { cookies } from "next/headers";
import type { NextResponse } from "next/server";
import { cache } from "react";

import type { Client } from "@/lib/domain/client";
import { UnauthorizedError } from "@/lib/errors/domain-error";
import { clientService } from "@/lib/services/client";

import { CLIENT_SESSION_COOKIE } from "./cookie-names";
import {
  applySessionCookies,
  CLIENT_COOKIES,
  clearSessionCookies,
  type SessionTokens,
} from "./session-cookies";

/**
 * Client session — the hiring-side twin of `session.ts`.
 *
 * Same mechanics (Supabase access token in an HttpOnly cookie, refresh token
 * beside it, validated on every guarded render, memoised per request),
 * different cookies, different resolver: `clientService.fromAccessToken()`
 * only ever returns a `role = CLIENT` user, so a candidate token copied into
 * this cookie still gets `null`.
 */

export interface ClientSession {
  userId: string;
  email: string;
  contactName: string;
  companyName: string;
  client: Client;
}

export function applyClientSessionCookie(
  response: NextResponse,
  tokens: SessionTokens,
): void {
  applySessionCookies(response, CLIENT_COOKIES, tokens);
}

export function clearClientSessionCookie(response: NextResponse): void {
  clearSessionCookies(response, CLIENT_COOKIES);
}

/** The raw client access token from the cookie, for routes that revoke it. */
export async function currentClientAccessToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(CLIENT_SESSION_COOKIE)?.value ?? null;
}

export const getClientSession = cache(async (): Promise<ClientSession | null> => {
  const store = await cookies();
  const token = store.get(CLIENT_SESSION_COOKIE)?.value;
  if (!token) return null;

  const client = await clientService.fromAccessToken(token);
  if (!client) return null;

  return {
    userId: client.id,
    email: client.email,
    contactName: client.contactName,
    companyName: client.companyName,
    client,
  };
});

/** For route handlers: a missing or expired session is a 401, not a crash. */
export async function requireClientSession(): Promise<ClientSession> {
  const session = await getClientSession();
  if (!session) {
    throw new UnauthorizedError("Please sign in to continue.");
  }
  return session;
}
