import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type BuddySelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  errorMessage?: string;
};

export const BuddySelect = forwardRef<HTMLSelectElement, BuddySelectProps>(
  ({ label, errorMessage, className, children, ...props }, ref) => {
    return (
      <label className="block">
        {label ? (
          <span className="block mb-2 text-sm font-medium text-buddyText">
            {label}
          </span>
        ) : null}

        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "h-12 w-full appearance-none rounded-buddyInput border border-buddyLine bg-white pl-4 pr-10 text-sm text-buddyText outline-none focus:border-buddyPrimary",
              className
            )}
            {...props}
          >
            {children}
          </select>

          <span className="absolute inset-y-0 flex items-center pointer-events-none right-4 text-buddySubText">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.75}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </div>

        {errorMessage ? (
          <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
        ) : null}
      </label>
    );
  }
);

// BuddySelect.displayName = "BuddySelect";
