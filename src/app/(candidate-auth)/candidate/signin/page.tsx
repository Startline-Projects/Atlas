/**
 * /candidate/signin
 *
 * Return path for existing applicants — including candidates who
 * didn't pass the English test: their account stays active and the
 * dashboard shows their saved result + the $10 retake option.
 */
import { Suspense } from "react";

import { AuthCard } from "@/components/candidate/auth/auth-card";
import { AuthHeader } from "@/components/candidate/auth/auth-header";
import { SigninForm } from "@/components/candidate/auth/signin-form";

export default function CandidateSigninPage() {
  return (
    <>
      <AuthHeader
        eyebrow="Candidate portal"
        headline={{ lead: "Welcome", italic: "back", trail: "." }}
        lead="Sign in to see your English-test result, continue vetting, or book a retake."
      />
      <AuthCard>
        {/* The form reads `?next=` — useSearchParams needs a boundary to prerender. */}
        <Suspense fallback={null}>
          <SigninForm />
        </Suspense>
      </AuthCard>
    </>
  );
}
