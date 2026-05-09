import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

type AppShellProps = {
  children: ReactNode;
  hasBottomBar?: boolean;
};

export function AppShell({ children, hasBottomBar = false }: AppShellProps) {
  return (
    <div className="min-h-screen bg-buddyBg">
      <div
        className={cn(
          "mx-auto max-w-buddy px-5 pb-8 pt-3",
          hasBottomBar ? "pb-28" : "pb-8"
        )}
      >
        {children}
      </div>
    </div>
  );
}
