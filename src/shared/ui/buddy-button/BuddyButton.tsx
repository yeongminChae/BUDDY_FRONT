import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

type BuddyButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export function BuddyButton({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}: BuddyButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3AAFA9]/30 focus-visible:ring-offset-2",
        "active:translate-y-px",
        size === "sm" && "h-9 px-3 text-xs",
        size === "md" && "h-11 px-4 text-sm",
        size === "lg" && "h-[52px] px-5 text-base",
        fullWidth ? "w-full" : "w-auto",

        variant === "primary" &&
          "bg-[#3AAFA9] text-white shadow-sm hover:bg-[#319E99]",

        variant === "secondary" &&
          "bg-[#DFF5F3] text-[#2F3A40] shadow-sm hover:bg-[#CFEFEB]",

        variant === "ghost" &&
          "bg-transparent text-[#6C7A80] hover:bg-[#F3F5F6] hover:text-[#2F3A40]",

        variant === "danger" &&
          "bg-red-50 text-red-500 shadow-sm hover:bg-red-100",

        disabled && "cursor-not-allowed opacity-50 active:translate-y-0",

        className
      )}
      disabled={disabled}
      {...props}
    >
      {leftIcon != null && (
        <span className="inline-flex items-center shrink-0">{leftIcon}</span>
      )}

      <span className="min-w-0 truncate">{children}</span>

      {rightIcon != null && (
        <span className="inline-flex items-center shrink-0">{rightIcon}</span>
      )}
    </button>
  );
}
