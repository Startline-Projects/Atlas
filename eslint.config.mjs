import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import importPlugin from "eslint-plugin-import";

/**
 * Layer rules from docs/ARCHITECTURE.md §4. Dependencies flow downward only:
 *   UI -> API -> Service -> Repository -> DB
 * Each `from` zone lists which `target` directories it may NOT import.
 */
const layerRules = {
  "import/no-restricted-paths": [
    "error",
    {
      zones: [
        // UI may not reach below the API layer. Route handlers under
        // `src/app/api` are the API layer and are exempted by the override at
        // the bottom of this file.
        {
          target: "./src/app",
          from: [
            "./src/lib/services",
            "./src/lib/repositories",
            "./src/lib/db",
            "./src/lib/integrations",
          ],
          message:
            "UI may not import services, repositories, db, or integrations. Use lib/api-client.",
        },
        {
          target: "./src/components",
          from: [
            "./src/lib/services",
            "./src/lib/repositories",
            "./src/lib/db",
            "./src/lib/integrations",
          ],
          message:
            "UI may not import services, repositories, db, or integrations. Use lib/api-client.",
        },
        // Services must remain framework-free.
        {
          target: "./src/lib/services",
          from: ["./src/app", "./src/components"],
          message:
            "Services are framework-free. They may not import from app/ or components/.",
        },
        // Repositories may not call services or integrations.
        {
          target: "./src/lib/repositories",
          from: [
            "./src/lib/services",
            "./src/lib/integrations",
            "./src/app",
            "./src/components",
          ],
          message:
            "Repositories only wrap Prisma. No services, no integrations, no UI.",
        },
        // Integrations are leaf modules.
        {
          target: "./src/lib/integrations",
          from: [
            "./src/lib/services",
            "./src/lib/repositories",
            "./src/app",
            "./src/components",
          ],
          message:
            "Integrations are leaf modules. They may not depend on services, repositories, or UI.",
        },
      ],
    },
  ],
};

/**
 * Route handlers sit inside `src/app` but are not UI — they *are* the API
 * layer, so calling a service is exactly their job. This override replaces the
 * whole rule for them rather than adding to it: the only thing still forbidden
 * is reaching past the service, straight into a repository or the database.
 */
const apiRouteRules = {
  files: ["src/app/api/**/*.{ts,tsx}"],
  rules: {
    "import/no-restricted-paths": [
      "error",
      {
        zones: [
          {
            target: "./src/app/api",
            from: ["./src/lib/repositories", "./src/lib/db"],
            message:
              "API routes are thin wrappers. Delegate to a service in lib/services.",
          },
        ],
      },
    ],
  },
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: { import: importPlugin },
    rules: layerRules,
  },
  apiRouteRules,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
