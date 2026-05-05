/**
 * /specialist/forgot
 *
 * Editorial header + reset-request form. Form internally toggles
 * `request → sent` via useState. Real flow lands when auth wires up.
 */
import { AuthCard } from "@/components/specialist/auth/auth-card";
import { AuthHeader } from "@/components/specialist/auth/auth-header";
import { ForgotForm } from "@/components/specialist/auth/forgot-form";

export default function SpecialistForgotPage() {
  return (
    <>
      <AuthHeader
        eyebrow="Reset your password"
        headline={{ lead: "Forgot it", italic: "happens", trail: "." }}
        lead="We'll email a reset link. It expires in 30 minutes for security."
      />
      <AuthCard>
        <ForgotForm />
      </AuthCard>
    </>
  );
}
