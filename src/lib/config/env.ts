import { z } from "zod";

/**
 * The single source of truth for environment variables.
 *
 * Per AI_RULES B7, nothing outside this module reads `process.env`.
 * Import `config` (server) or `publicConfig` (browser-safe) instead.
 */

/* -------------------------------------------------------------------------- */
/* Client — inlined by Next at build time, safe to ship to the browser.        */
/* -------------------------------------------------------------------------- */

const clientSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_APP_URL: z.url().default("http://localhost:3000"),
});

/**
 * Next.js only inlines `process.env.NEXT_PUBLIC_*` when accessed as a full
 * literal expression, so this object cannot be built dynamically.
 */
const rawClientEnv = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
};

/* -------------------------------------------------------------------------- */
/* Server — never reaches the browser.                                        */
/* -------------------------------------------------------------------------- */

const serverSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required — see .env.example"),
  DIRECT_URL: z.string().min(1, "DIRECT_URL is required — see .env.example"),
  SUPABASE_SERVICE_ROLE_KEY: z
    .string()
    .min(1, "SUPABASE_SERVICE_ROLE_KEY is required — see .env.example"),
  /**
   * Temporary email-verification bypass. When set, signup sends no email and
   * `/verify-email` accepts exactly this code for every account. Leave unset
   * once real OTP delivery (custom SMTP + `{{ .Token }}` template) is live.
   */
  AUTH_DEV_FIXED_OTP: z
    .string()
    .regex(/^\d{6}$/, "AUTH_DEV_FIXED_OTP must be exactly 6 digits")
    .optional(),

  /**
   * Stripe. Optional at startup so a page that never charges can still build;
   * `lib/integrations/stripe` throws a clear error the moment a charge is
   * attempted without them.
   */
  STRIPE_SECRET_KEY: z.string().min(1).optional(),
  STRIPE_WEBHOOK_SECRET: z.string().min(1).optional(),
  /**
   * Temporary payments bypass. When set to "1", checkout skips Stripe and
   * marks the payment succeeded immediately — for local development before
   * Stripe keys exist. Refused in production by `paymentService`.
   */
  PAYMENTS_DEV_BYPASS: z.enum(["1"]).optional(),
});

type ClientEnv = z.infer<typeof clientSchema>;
type ServerEnv = z.infer<typeof serverSchema>;

function format(error: z.ZodError, scope: string): never {
  const lines = error.issues.map(
    (i) => `  • ${i.path.join(".") || "(root)"}: ${i.message}`,
  );
  throw new Error(
    `Invalid ${scope} environment variables:\n${lines.join("\n")}\n\n` +
      `Copy .env.example to .env.local and fill in the missing values.`,
  );
}

function parseClient(): ClientEnv {
  const parsed = clientSchema.safeParse(rawClientEnv);
  if (!parsed.success) format(parsed.error, "client");
  return parsed.data;
}

/**
 * Browser-safe config. Validated eagerly — these values exist in every
 * environment, including the build.
 */
export const publicConfig: ClientEnv = parseClient();

let serverCache: ServerEnv | undefined;

/**
 * Server-only config.
 *
 * Resolved lazily so that rendering a page which touches no server secret
 * does not fail a build on an unrelated missing key. The first module that
 * actually needs a secret is the one that fails, with a message naming it.
 */
export function serverConfig(): ServerEnv {
  if (serverCache) return serverCache;

  if (typeof window !== "undefined") {
    throw new Error(
      "serverConfig() was called in the browser. Use publicConfig instead.",
    );
  }

  const parsed = serverSchema.safeParse(process.env);
  if (!parsed.success) format(parsed.error, "server");

  serverCache = parsed.data;
  return serverCache;
}

export const isProduction = process.env.NODE_ENV === "production";
export const isDevelopment = process.env.NODE_ENV === "development";
