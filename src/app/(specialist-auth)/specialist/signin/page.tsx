/**
 * /specialist/signin
 *
 * Default state: editorial header + credentials form (with internal
 * useState toggle to the 2FA step).
 *
 * Design-review preview for the lockout state: append `?state=lockout`.
 * Real auth-state selection is wired in a later session.
 */
import { AuthCard } from "@/components/specialist/auth/auth-card";
import { AuthHeader } from "@/components/specialist/auth/auth-header";
import {
  LockoutCard,
  SigninForm,
} from "@/components/specialist/auth/signin-form";

type PageProps = {
  searchParams: Promise<{ state?: string }>;
};

export default async function SpecialistSigninPage({ searchParams }: PageProps) {
  const { state } = await searchParams;
  const isLockout = state === "lockout";

  return (
    <>
      <AuthHeader
        eyebrow="Internal · Talent Specialist"
        headline={{ lead: "Today's", italic: "queue", trail: " is waiting." }}
        lead={
          isLockout
            ? "Sign-in is paused. Wait out the cooldown or contact security."
            : "Sign in to review candidates, support clients, and resolve disputes."
        }
      />
      <AuthCard>{isLockout ? <LockoutCard /> : <SigninForm />}</AuthCard>
    </>
  );
}
