import { existsSync } from "node:fs";

import { defineConfig } from "prisma/config";

/**
 * Prisma CLI configuration.
 *
 * Prisma 7 no longer accepts connection URLs in `schema.prisma`, and no longer
 * loads `.env` files by itself — hence both halves of this file.
 *
 * The URL here is used by the CLI only (migrate, studio, introspect), so it is
 * `DIRECT_URL`: Supabase's transaction pooler cannot run DDL. The application's
 * own connection is built in `src/lib/db/prisma.ts` from `DATABASE_URL`.
 */

// `process.loadEnvFile` is built into Node 20.12+ — no dotenv dependency.
// Later files do not overwrite variables already set, so a real environment
// variable (CI, Vercel) always wins over the local file.
for (const file of [".env.local", ".env"]) {
  if (existsSync(file)) process.loadEnvFile(file);
}

// This is a CLI config, not application code, so it is the one file outside
// `src/lib/config/env.ts` allowed to read `process.env` (AI_RULES B7).
// Omitted rather than empty when unset: `generate` needs no database, and
// commands that do need one produce a clearer error than a blank URL would.
const directUrl = process.env.DIRECT_URL?.trim();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  ...(directUrl ? { datasource: { url: directUrl } } : {}),
});
