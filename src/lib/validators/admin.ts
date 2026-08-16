import { z } from "zod";

/**
 * Admin validators — ARCHITECTURE §7.3. Shared by the API route and the
 * sign-in form so both sides apply the same rules.
 */

export const adminLoginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Enter a valid email address.")),
  password: z.string().min(1, "Enter your password."),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;

/** Used by the provisioning script — stricter than sign-in on purpose. */
export const provisionAdminSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Enter a valid email address.")),
  password: z
    .string()
    .min(12, "Admin passwords must be at least 12 characters."),
  fullName: z.string().trim().min(2, "Enter the admin's full name."),
  title: z.string().trim().min(1).max(60).optional(),
});

export type ProvisionAdminInput = z.infer<typeof provisionAdminSchema>;
