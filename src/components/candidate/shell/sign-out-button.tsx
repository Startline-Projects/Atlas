"use client";

import { LogOut } from "lucide-react";
import { useState } from "react";

import { candidatesApi } from "@/lib/api-client";

export function SignOutButton() {
  const [pending, setPending] = useState(false);

  const handleClick = async () => {
    if (pending) return;
    setPending(true);
    try {
      await candidatesApi.logout();
    } finally {
      // Hard navigation so every server component re-reads the (now empty) cookie.
      window.location.assign("/candidate/signin");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      aria-label="Sign out"
      title="Sign out"
      className="text-ink-mute hover:bg-cream-deep hover:text-ink grid h-8 w-8 place-items-center rounded-full transition-colors disabled:opacity-60"
    >
      <LogOut className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
    </button>
  );
}
