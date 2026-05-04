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
        // UI may not reach below the API layer.
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
        // API routes may not touch repositories or db directly.
        {
          target: "./src/app/api",
          from: ["./src/lib/repositories", "./src/lib/db"],
          message:
            "API routes are thin wrappers. Delegate to a service in lib/services.",
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

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: { import: importPlugin },
    rules: layerRules,
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
