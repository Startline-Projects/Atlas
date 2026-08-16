import { headers } from "next/headers";

/**
 * Request options for calling our own API from a Server Component.
 *
 * Forwards the visitor's cookies (that is what authenticates the call) and
 * opts out of the fetch cache — these reads are per-user and must be fresh.
 * Kept in its own module because it imports `next/headers`, which must never
 * end up in a client bundle; the rest of `lib/api-client` is isomorphic.
 *
 * Usage:
 *   const overview = await englishTestApi.overview(await serverInit());
 */
export async function serverInit(): Promise<RequestInit> {
  const h = await headers();
  const cookie = h.get("cookie");
  return {
    cache: "no-store",
    headers: cookie ? { cookie } : {},
  };
}
