type EmptyStateProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-[#E2E6E8] bg-white px-5 py-8 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3F5F6] text-[#6C7A80]">
        {icon}
      </div>

      <p className="mt-4 text-sm font-bold text-[#2F3A40]">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-[#6C7A80]">
        {description}
      </p>
    </div>
  );
}
