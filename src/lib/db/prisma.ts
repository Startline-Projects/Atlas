import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

import { isProduction, serverConfig } from "@/lib/config";

/**
 * Prisma singleton.
 *
 * Per ARCHITECTURE §5.7, this is the only place `PrismaClient` is constructed,
 * and only `lib/repositories/*` may import it. Services, API routes, and UI
 * must never touch it directly.
 *
 * Prisma 7 connects through a driver adapter rather than a URL in the schema.
 * `DATABASE_URL` is Supabase's transaction pooler (port 6543); migrations use
 * `DIRECT_URL` instead, wired in `prisma.config.ts`.
 *
 * Construction is deferred to the first query so that importing a repository
 * does not, by itself, demand a database URL — a page that renders without
 * touching the database still builds on a machine with no credentials.
 *
 * The global cache prevents `next dev` hot-reload from opening a new pool on
 * every recompile, which exhausts Supabase connection limits.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export function getPrisma(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  const client = new PrismaClient({
    adapter: new PrismaPg({
      connectionString: serverConfig().DATABASE_URL,
    }),
    log: isProduction ? ["error"] : ["query", "warn", "error"],
  });

  globalForPrisma.prisma = client;
  return client;
}
