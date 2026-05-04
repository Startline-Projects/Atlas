import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type LogoProps = {
  className?: string;
  href?: string;
};

export function Logo({ className, href = "/" }: LogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        "font-display flex items-center gap-2 text-[26px] font-medium tracking-[-0.02em]",
        className,
      )}
      aria-label="Atlas — home"
    >
      <span
        aria-hidden="true"
        className="bg-ink relative inline-block h-7 w-7 rounded-full after:absolute after:inset-[6px] after:rounded-full after:bg-lime after:content-['']"
      />
      <span>Atlas</span>
    </Link>
  );
}
