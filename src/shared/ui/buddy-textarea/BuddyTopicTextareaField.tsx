import { forwardRef } from "react";

type TextareaFieldProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

export const BuddyTopicTextareaField = forwardRef<
  HTMLTextAreaElement,
  TextareaFieldProps
>(({ label, className, ...props }, ref) => {
  return (
    <div>
      {label != null && label.trim() !== "" && (
        <label className="mb-2 block text-sm font-semibold text-[#2F3A40]">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        {...props}
        className={[
          "w-full rounded-2xl border border-[#E2E6E8] bg-white px-4 py-3 text-sm text-[#2F3A40] outline-none transition placeholder:text-buddySubText focus:border-[#3AAFA9]",
          className ?? "",
        ].join(" ")}
      />
    </div>
  );
});

BuddyTopicTextareaField.displayName = "TextareaField";
