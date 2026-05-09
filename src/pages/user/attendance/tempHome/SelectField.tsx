import { forwardRef } from "react";

type SelectFieldProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  errorMessage?: string;
};

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, errorMessage, children, ...props }, ref) => {
    return (
      <div>
        <label className="mb-2 block text-sm font-semibold text-[#2F3A40]">
          {label}
        </label>

        <select
          ref={ref}
          {...props}
          className="h-12 w-full rounded-xl border border-[#E2E6E8] bg-white px-3 text-sm font-medium text-[#2F3A40] outline-none transition focus:border-[#3AAFA9]"
        >
          {children}
        </select>

        {errorMessage != null && (
          <p className="mt-1.5 text-sm font-medium text-red-500">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

SelectField.displayName = "SelectField";
