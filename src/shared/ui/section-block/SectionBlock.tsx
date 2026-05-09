import type { ReactNode } from "react";

type SectionBlockProps = {
  title?: string;
  description?: string;
  children: ReactNode;
};

export function SectionBlock({
  title,
  description,
  children
}: SectionBlockProps) {
  return (
    <section className="space-y-3">
      {title ? (
        <div>
          <h2 className="text-base font-semibold text-buddyText">{title}</h2>
          {description ? (
            <p className="mt-1 text-sm text-buddySubText">{description}</p>
          ) : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}
