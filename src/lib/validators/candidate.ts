import { z } from "zod";

import { ROLE_CATEGORY_VALUES } from "@/lib/domain/candidate";

/**
 * Candidate boundary schemas — ARCHITECTURE §7.3.
 *
 * Shared by the API route and the signup form, so a rule is written once and
 * the client cannot drift from what the server will accept.
 */

export const signupSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(120, "That name is too long."),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Enter a valid email address.")),

  password: z
    .string()
    .min(8, "Use at least 8 characters.")
    .max(72, "Passwords are limited to 72 characters."),

  roleCategory: z.enum(
    ROLE_CATEGORY_VALUES as unknown as [string, ...string[]],
    { message: "Pick the category you're applying for." },
  ),

  acceptedTerms: z.literal(true, {
    message: "You need to accept the Terms and Privacy Policy.",
  }),
});

export type SignupInput = z.infer<typeof signupSchema>;

export const verifyEmailSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email()),
  token: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Enter the 6-digit code from your email."),
});

export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;

export const resendVerificationSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email()),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Enter a valid email address.")),

  password: z
    .string()
    .min(1, "Enter your password."),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const listCandidatesSchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(50),
  offset: z.coerce.number().int().min(0).default(0),
});
