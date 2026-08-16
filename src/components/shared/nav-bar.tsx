"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils/cn";

const NAV_LINKS = [
  { label: "Find Talent", href: "/find-talent" },
  { label: "For Businesses", href: "/for-businesses" },
  { label: "For Candidates", href: "/for-candidates" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "sticky top-0 z-[100] border-b border-transparent backdrop-blur-md backdrop-saturate-[140%] transition-[border-color,background] duration-200",
        "bg-cream/80",
        scrolled && "border-line",
      )}
    >
      <div className="container-page mx-auto flex max-w-[1340px] items-center justify-between px-8 py-[18px]">
        <Logo />

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-ink-soft italic hover:text-ink hover:scale-110 rounded-sm px-[14px] py-2 text-sm font-semibold transition-all duration-150"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-[10px]">
          <a
            href="/candidate/signin"
            className="btn btn-ghost text-ink hidden font-medium md:inline-flex"
          >
            Sign In
          </a>
          <a
            href="/candidate/signup"
            className="bg-ink text-amber font-display rounded-full px-6 py-3 text-[17px] font-bold italic shadow-sm transition-transform hover:scale-[1.04]"
          >
            Sign Up
          </a>
          <button
            type="button"
            className="hover:bg-cream-deep flex h-10 w-10 items-center justify-center rounded-sm md:hidden"
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </div>
    </nav>
  );
}
