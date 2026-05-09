type PageTitleProps = {
  title: string;
  subtitle?: string;
};

export function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <div className="mb-5">
      <h1 className="text-2xl font-bold text-buddyText">{title}</h1>
      {subtitle ? (
        <p className="mt-1 text-sm text-buddySubText">{subtitle}</p>
      ) : null}
    </div>
  );
}
