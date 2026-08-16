/**
 * Provision an admin account — the only way one comes into existence.
 *
 *   pnpm admin:create --email ops@atlas.example --name "Aïsha Okafor" \
 *                     --title "Operations Admin" [--password '…']
 *
 * Reads `.env.local` (needs SUPABASE_SERVICE_ROLE_KEY + DATABASE_URL). When
 * `--password` is omitted a random one is generated and printed once — hand
 * it over out of band and have the admin change it (password change /
 * reset lands with the auth follow-ups).
 *
 * Runs through `adminService.provision()` so it obeys the same rules as
 * everything else (AI_RULES: no Prisma outside repositories, no auth-provider
 * calls outside integrations). `tsx` resolves the `@/` alias from tsconfig.
 */
import { randomBytes } from "node:crypto";
import { parseArgs } from "node:util";

import { DomainError } from "@/lib/errors";
import { adminService } from "@/lib/services/admin";
import { provisionAdminSchema } from "@/lib/validators/admin";

function generatePassword(): string {
  // 24 url-safe chars ≈ 143 bits — comfortably above the 12-char floor.
  return randomBytes(18).toString("base64url");
}

async function main(): Promise<void> {
  const { values } = parseArgs({
    options: {
      email: { type: "string" },
      name: { type: "string" },
      title: { type: "string" },
      password: { type: "string" },
    },
  });

  const generated = !values.password;
  const parsed = provisionAdminSchema.safeParse({
    email: values.email,
    fullName: values.name,
    title: values.title,
    password: values.password ?? generatePassword(),
  });

  if (!parsed.success) {
    console.error("Invalid arguments:");
    for (const issue of parsed.error.issues) {
      console.error(`  --${issue.path.join(".")}: ${issue.message}`);
    }
    console.error(
      '\nUsage: pnpm admin:create --email <email> --name "<full name>" [--title "<title>"] [--password <password>]',
    );
    process.exitCode = 1;
    return;
  }

  const admin = await adminService.provision(parsed.data);

  console.log("Admin created.");
  console.log(`  id:     ${admin.id}`);
  console.log(`  email:  ${admin.email}`);
  console.log(`  name:   ${admin.fullName}`);
  console.log(`  title:  ${admin.title}`);
  if (generated) {
    console.log(`  password (shown once): ${parsed.data.password}`);
  }
  console.log("\nSign in at /admin/signin.");
}

main().catch((error: unknown) => {
  if (error instanceof DomainError) {
    console.error(`Could not create the admin: ${error.message}`);
  } else {
    console.error(error);
  }
  process.exitCode = 1;
});
