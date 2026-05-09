import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type BuddyInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const BuddyInput = forwardRef<HTMLInputElement, BuddyInputProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <label className="block w-full">
        {label ? (
          <span className="block mb-2 text-sm font-medium text-buddyText">
            {label}
          </span>
        ) : null}
        <input
          ref={ref}
          className={cn(
            "h-12 w-full rounded-buddyInput border border-buddyLine bg-white px-4 text-sm text-buddyText outline-none placeholder:text-buddySubText focus:border-buddyPrimary",
            className
          )}
          {...props}
        />
      </label>
    );
  }
);
