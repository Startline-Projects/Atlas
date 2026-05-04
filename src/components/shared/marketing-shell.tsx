"use client";

import { useState } from "react";
import { Footer } from "@/components/shared/footer";
import { NavBar } from "@/components/shared/nav-bar";
import { SignupModal } from "@/components/shared/signup-modal";

export function MarketingShell({ children }: { children: React.ReactNode }) {
  const [signupOpen, setSignupOpen] = useState(false);
  return (
    <>
      <NavBar
        onSignupClick={() => setSignupOpen(true)}
        onSigninClick={() => setSignupOpen(true)}
      />
      <main id="view-home">{children}</main>
      <Footer />
      <SignupModal open={signupOpen} onClose={() => setSignupOpen(false)} />
    </>
  );
}
