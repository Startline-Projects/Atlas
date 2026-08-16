import { z } from "zod";

/** English-test validators — ARCHITECTURE §7.3. */

/** One option index per question, or null for a skipped question. */
export const submitAttemptSchema = z.object({
  answers: z
    .array(z.number().int().min(0).max(9).nullable())
    .min(1)
    .max(100),
});
export type SubmitAttemptInput = z.infer<typeof submitAttemptSchema>;

export const startRetakeCheckoutSchema = z.object({
  /** Same-origin path to come back to. Validated again server-side. */
  returnPath: z
    .string()
    .regex(/^\/(?!\/)[^\s]*$/, "returnPath must be a same-origin path."),
});
export type StartRetakeCheckoutInput = z.infer<typeof startRetakeCheckoutSchema>;

export const confirmRetakeCheckoutSchema = z.object({
  sessionId: z.string().min(1).max(200),
});
export type ConfirmRetakeCheckoutInput = z.infer<typeof confirmRetakeCheckoutSchema>;
