import { useState } from "react";
import { SectionBlock } from "../../../../../shared/ui/section-block/SectionBlock";
import { BuddyCard } from "../../../../../shared/ui/buddy-card/BuddyCard";

type SessionHistoryTable = {
  tableName: string;
  members: string[];
};

type SessionHistoryTableRound = {
  roundNo: number;
  tables: SessionHistoryTable[];
};

type TableResultSectionProps = {
  tableSummary: SessionHistoryTableRound[];
};

export function TableResultSection({ tableSummary }: TableResultSectionProps) {
  const [openRounds, setOpenRounds] = useState<Record<number, boolean>>({});

  const handleToggleRound = (roundNo: number) => {
    setOpenRounds((prev) => ({
      ...prev,
      [roundNo]: prev[roundNo] === true ? false : true,
    }));
  };

  return (
    <SectionBlock
      title="테이블 결과"
      description="세션에서 배정된 테이블 구성이에요."
    >
      <div className="space-y-5">
        {tableSummary.map((round) => {
          const isOpen = openRounds[round.roundNo] === true;
          const visibleTables = isOpen
            ? round.tables
            : round.tables.slice(0, 1);
          const hiddenCount = Math.max(
            round.tables.length - visibleTables.length,
            0
          );

          return (
            <div
              key={round.roundNo}
              className="space-y-3 rounded-3xl border border-[#E2E6E8] bg-[#F9FBFB] p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-[#3AAFA9]">
                    ROUND {round.roundNo}
                  </p>
                  <p className="mt-1 text-base font-bold text-[#2F3A40]">
                    {round.roundNo === 1
                      ? "1차 테이블 결과"
                      : "2차 테이블 결과"}
                  </p>
                </div>

                <div className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#6C7A80] shadow-sm">
                  테이블 {round.tables.length}개
                </div>
              </div>

              <div className="space-y-3">
                {visibleTables.map((table, index) => (
                  <BuddyCard key={`${round.roundNo}-${table.tableName}`}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-xs font-medium text-[#6C7A80]">
                            ROUND {round.roundNo} · TABLE {index + 1}
                          </p>
                          <p className="mt-1 text-base font-bold text-[#2F3A40]">
                            {table.tableName}
                          </p>
                        </div>

                        <div className="rounded-full bg-[#F3F5F6] px-3 py-1 text-xs font-bold text-[#6C7A80]">
                          {table.members.length}명
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {table.members.map((member) => (
                          <span
                            key={`${round.roundNo}-${table.tableName}-${member}`}
                            className="rounded-full bg-[#DFF5F3] px-3 py-1.5 text-xs font-semibold text-[#2F3A40]"
                          >
                            {member}
                          </span>
                        ))}
                      </div>
                    </div>
                  </BuddyCard>
                ))}
              </div>

              {round.tables.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleToggleRound(round.roundNo)}
                  className="w-full rounded-2xl border border-[#E2E6E8] bg-white px-4 py-3 text-sm font-semibold text-[#3AAFA9] shadow-sm transition hover:bg-[#F3F8F8]"
                >
                  {isOpen
                    ? `Round ${round.roundNo} 접기`
                    : `Round ${round.roundNo} 테이블 ${hiddenCount}개 더 보기`}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </SectionBlock>
  );
}
