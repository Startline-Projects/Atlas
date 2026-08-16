/**
 * /candidate/signup
 *
 * Step 1 of the candidate funnel: account details → email OTP → done
 * (internal useState steps inside SignupForm). The done state hands
 * off to /candidate/dashboard?state=fresh.
 */
import { AuthCard } from "@/components/candidate/auth/auth-card";
import { AuthHeader } from "@/components/candidate/auth/auth-header";
import { SignupForm } from "@/components/candidate/auth/signup-form";

export default function CandidateSignupPage() {
  return (
    <>
      <AuthHeader
        eyebrow="Apply to Join · Free"
        headline={{ lead: "Create your", italic: "account", trail: "." }}
        lead="60 seconds to apply. Your first English-test attempt is free — and your result is yours to keep, pass or fail."
      />
      <AuthCard>
        <SignupForm />
      </AuthCard>
    </>
  );
}
