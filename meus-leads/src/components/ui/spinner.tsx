import * as React from "react";
import { cn } from "@/lib/utils";

const Spinner = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-b-2 border-current",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Spinner.displayName = "Spinner";

export { Spinner };
