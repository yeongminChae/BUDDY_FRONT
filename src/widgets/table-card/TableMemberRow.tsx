type TableMemberRowProps = {
  name: string;
  nickname?: string;
  email: string;
  level?: number;
  onCardClick?: () => void;
};

export function TableMemberRow({
  name,
  nickname,
  email,
  level,
  onCardClick,
}: TableMemberRowProps) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between rounded-xl bg-[#F8FAFA] px-4 py-3 text-left"
      onClick={onCardClick}
    >
      <div>
        <div className="flex items-center gap-1">
          <div className="text-base font-semibold text-buddyText">{name}</div>
          <div> · </div>
          <div className="text-base font-semibold text-buddySubText">
            {nickname}
          </div>
        </div>
        <div className="text-sm text-buddySubText">{email}</div>
        <div className="text-sm text-buddySubText">{`level : ${level}`}</div>
      </div>
      <span className="text-buddySubText">{">"}</span>
    </button>
  );
}
