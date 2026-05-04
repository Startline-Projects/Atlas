import * as React from "react";
import { cn } from "@/lib/utils/cn";

type EyebrowProps = React.HTMLAttributes<HTMLDivElement>;

export function Eyebrow({ className, children, ...props }: EyebrowProps) {
  return (
    <div className={cn("eyebrow", className)} {...props}>
      {children}
    </div>
  );
}
