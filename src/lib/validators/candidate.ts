import { z } from "zod";

import { ROLE_CATEGORY_VALUES } from "@/lib/domain/candidate";

import {
  acceptedTermsSchema,
  emailSchema,
  loginSchema,
  passwordSchema,
  resendVerificationSchema,
  verifyEmailSchema,
} from "./auth";

/**
 * Candidate boundary schemas — ARCHITECTURE §7.3.
 *
 * Shared by the API route and the signup form, so a rule is written once and
 * the client cannot drift from what the server will accept. The account
 * rules (email, password, OTP) come from `./auth`, which the client surface
 * shares.
 */

export const signupSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(120, "That name is too long."),

  email: emailSchema,
  password: passwordSchema,

  roleCategory: z.enum(
    ROLE_CATEGORY_VALUES as unknown as [string, ...string[]],
    { message: "Pick the category you're applying for." },
  ),

  acceptedTerms: acceptedTermsSchema,
});

export type SignupInput = z.infer<typeof signupSchema>;

export { loginSchema, resendVerificationSchema, verifyEmailSchema };
export type { LoginInput, VerifyEmailInput } from "./auth";

export const listCandidatesSchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(50),
  offset: z.coerce.number().int().min(0).default(0),
});
