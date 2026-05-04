"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils/cn";

type NavBarProps = {
  onSignupClick?: () => void;
  onSigninClick?: () => void;
};

const NAV_LINKS = [
  // TODO: link to /browse route
  { label: "Find Talent", href: "/" },
  // TODO: link to /for-businesses route
  { label: "For Businesses", href: "/" },
  // TODO: link to /for-candidates route
  { label: "For Candidates", href: "/" },
  // TODO: link to /how-it-works route
  { label: "How It Works", href: "/" },
  // TODO: link to /pricing route
  { label: "Pricing", href: "/" },
];

export function NavBar({ onSignupClick, onSigninClick }: NavBarProps) {
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
              className="text-ink-soft hover:bg-cream-deep rounded-sm px-[14px] py-2 text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-[10px]">
          <Button
            variant="ghost"
            onClick={onSigninClick}
            className="hidden md:inline-flex"
          >
            Sign In
          </Button>
          <Button variant="primary" onClick={onSignupClick}>
            Sign Up
          </Button>
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
