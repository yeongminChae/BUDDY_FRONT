import type { ReactNode } from "react";

type BottomActionBarProps = {
  children: ReactNode;
};

export function BottomActionBar({ children }: BottomActionBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      <div className="px-5 pb-0 mx-auto max-w-buddy">
        <div className="p-3 border rounded-t-2xl border-buddyLine bg-white/95 shadow-buddyCard backdrop-blur-sm">
          {children}
        </div>
      </div>
  </div>
  );
}
