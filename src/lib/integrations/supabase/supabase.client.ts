import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { publicConfig, serverConfig } from "@/lib/config";

/**
 * Supabase SDK wrappers.
 *
 * Per ARCHITECTURE §5.6 this folder is the only place `@supabase/supabase-js`
 * is imported. Relational reads and writes go through Prisma + repositories —
 * Supabase is used here for Storage, Realtime, and the auth admin API.
 */

/**
 * Anon client — subject to Row Level Security. Safe in the browser.
 */
export function createAnonSupabaseClient(): SupabaseClient {
  return createClient(
    publicConfig.NEXT_PUBLIC_SUPABASE_URL,
    publicConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { auth: { persistSession: false } },
  );
}

let serviceClient: SupabaseClient | undefined;

/**
 * Service-role client — **bypasses Row Level Security**.
 *
 * Server only. Never import this from a component, and never pass its results
 * to the client without an explicit permission check first.
 */
export function getServiceSupabaseClient(): SupabaseClient {
  if (typeof window !== "undefined") {
    throw new Error(
      "getServiceSupabaseClient() was called in the browser. " +
        "The service-role key must never reach the client.",
    );
  }

  if (!serviceClient) {
    serviceClient = createClient(
      publicConfig.NEXT_PUBLIC_SUPABASE_URL,
      serverConfig().SUPABASE_SERVICE_ROLE_KEY,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
  }

  return serviceClient;
}
