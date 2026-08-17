import { z } from "zod";

import { TEAM_SIZE_VALUES } from "@/lib/domain/client";
import { isCountryCode } from "@/lib/domain/countries";

import {
  acceptedTermsSchema,
  emailSchema,
  loginSchema,
  passwordSchema,
  resendVerificationSchema,
  verifyEmailSchema,
} from "./auth";

/**
 * Client boundary schemas — ARCHITECTURE §7.3.
 *
 * Shared by the API route and the client signup form. Account rules (email,
 * password, OTP) come from `./auth`; only the company fields are specific
 * to this surface.
 */

export const clientSignupSchema = z.object({
  contactName: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(120, "That name is too long."),

  companyName: z
    .string()
    .trim()
    .min(2, "Enter your company name.")
    .max(160, "That company name is too long."),

  countryCode: z
    .string()
    .trim()
    .toUpperCase()
    .refine(isCountryCode, "Pick your country."),

  teamSize: z.enum(TEAM_SIZE_VALUES as unknown as [string, ...string[]], {
    message: "Pick your team size.",
  }),

  email: emailSchema,
  password: passwordSchema,

  acceptedTerms: acceptedTermsSchema,
});

export type ClientSignupInput = z.infer<typeof clientSignupSchema>;

export {
  loginSchema as clientLoginSchema,
  resendVerificationSchema as clientResendVerificationSchema,
  verifyEmailSchema as clientVerifyEmailSchema,
};
