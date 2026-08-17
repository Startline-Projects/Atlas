/**
 * /client/signin
 *
 * Return path for existing clients. Reads `?next=` so a guarded page can send
 * an expired session here and get the visitor back afterwards.
 */
import { Suspense } from "react";

import { AuthCard } from "@/components/client/auth/auth-card";
import { AuthHeader } from "@/components/client/auth/auth-header";
import { ClientSigninForm } from "@/components/client/auth/signin-form";

export default function ClientSigninPage() {
  return (
    <>
      <AuthHeader
        eyebrow="Client portal"
        headline={{ lead: "Welcome", italic: "back", trail: "." }}
        lead="Sign in to manage your roles, review candidates, and post something new."
      />
      <AuthCard>
        {/* The form reads `?next=` — useSearchParams needs a boundary to prerender. */}
        <Suspense fallback={null}>
          <ClientSigninForm />
        </Suspense>
      </AuthCard>
    </>
  );
}
