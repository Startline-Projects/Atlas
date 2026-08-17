/**
 * /client/signup
 *
 * Client onboarding, step 1: company account → email OTP → done (internal
 * states inside ClientSignupForm). The done state hands off to
 * /client/dashboard?state=fresh.
 */
import { AuthCard } from "@/components/client/auth/auth-card";
import { AuthHeader } from "@/components/client/auth/auth-header";
import { ClientSignupForm } from "@/components/client/auth/signup-form";

export default function ClientSignupPage() {
  return (
    <>
      <AuthHeader
        eyebrow="For businesses · Free to post"
        headline={{ lead: "Hire vetted", italic: "talent", trail: "." }}
        lead="Create your company account, post a role, and hear from candidates who passed our vetting — pay only when you hire."
      />
      <AuthCard>
        <ClientSignupForm />
      </AuthCard>
    </>
  );
}
