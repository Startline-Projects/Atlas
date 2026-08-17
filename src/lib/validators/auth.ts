import { z } from "zod";

/**
 * Account-boundary rules shared by every self-registering surface (candidate,
 * client) — ARCHITECTURE §7.3. Written once so the two signup forms and the
 * two sets of routes can never drift on what an email, a password or a
 * verification code looks like.
 */

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email("Enter a valid email address."));

export const passwordSchema = z
  .string()
  .min(8, "Use at least 8 characters.")
  .max(72, "Passwords are limited to 72 characters.");

export const otpTokenSchema = z
  .string()
  .trim()
  .regex(/^\d{6}$/, "Enter the 6-digit code from your email.");

export const acceptedTermsSchema = z.literal(true, {
  message: "You need to accept the Terms and Privacy Policy.",
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Enter your password."),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const verifyEmailSchema = z.object({
  email: emailSchema,
  token: otpTokenSchema,
});

export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;

export const resendVerificationSchema = z.object({
  email: emailSchema,
});
