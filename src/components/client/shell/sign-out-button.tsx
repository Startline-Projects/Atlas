"use client";

import { LogOut } from "lucide-react";
import { useState } from "react";

import { clientsApi } from "@/lib/api-client";
import { CLIENT_SIGNIN_PATH } from "@/lib/auth/redirects";

export function ClientSignOutButton() {
  const [pending, setPending] = useState(false);

  const handleClick = async () => {
    if (pending) return;
    setPending(true);
    try {
      await clientsApi.logout();
    } finally {
      // Hard navigation so every server component re-reads the (now empty) cookie.
      window.location.assign(CLIENT_SIGNIN_PATH);
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
