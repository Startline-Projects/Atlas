import type { ZodError } from "zod";

/**
 * Flattens a Zod failure into `{ fieldName: message }`.
 *
 * Kept in its own module — free of `next/server` — because both the route
 * handler and the client-side form need it, and a client bundle must not pull
 * in server-only code to get it.
 *
 * First message per field: a form shows one error per input, not a list.
 */
export function fieldsFromZod(error: ZodError): Record<string, string> {
  const fields: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".");
    if (key && !(key in fields)) fields[key] = issue.message;
  }
  return fields;
}
