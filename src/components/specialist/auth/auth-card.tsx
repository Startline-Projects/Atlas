/**
 * Shared paper card used by SigninForm, ForgotForm, and lockout / sent
 * states. Renders the cream-paper card with the soft top accent strip.
 */
import { cn } from "@/lib/utils/cn";

type AuthCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <div
      className={cn(
        "bg-paper border-line shadow-card relative flex min-h-[420px] flex-col rounded-xl border p-7 sm:rounded-[28px] sm:p-9",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-6 left-6 h-0.5 opacity-[0.06]"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--color-ink), transparent)",
        }}
      />
      {children}
    </div>
  );
}
