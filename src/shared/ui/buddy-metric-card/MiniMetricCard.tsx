type MiniMetricCardProps = {
  label: string;
  value: string;
};

export function MiniMetricCard({ label, value }: MiniMetricCardProps) {
  return (
    <div className="rounded-2xl bg-[#F3F5F6] px-3 py-3 text-center">
      <p className="text-[11px] font-medium text-[#6C7A80]">{label}</p>
      <p className="mt-1 text-sm font-bold text-[#2F3A40]">{value}</p>
    </div>
  );
}
