import { useState } from "react";
import { SectionBlock } from "../../../../../shared/ui/section-block/SectionBlock";
import type { AdminSessionHistoryParticipant } from "../../../../../features/admin/session/session-past/model/AdminSessionHistoryParticipant";

type ParticipantsSectionProps = {
  participants: AdminSessionHistoryParticipant[];
};

export function ParticipantsSection({
  participants,
}: ParticipantsSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const visibleParticipants = isOpen ? participants : participants.slice(0, 4);
  const hiddenCount = Math.max(
    participants.length - visibleParticipants.length,
    0
  );

  return (
    <SectionBlock
      title="참석자"
      description={`총 ${participants.length}명이 참석했어요.`}
    >
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          {visibleParticipants.map((participant) => (
            <div
              key={participant.userId}
              className="rounded-2xl border border-[#E2E6E8] bg-white px-4 py-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#DFF5F3] text-sm font-bold text-[#3AAFA9]">
                  {participant.name.slice(0, 1)}
                </div>
                <p className="min-w-0 truncate text-sm font-semibold text-[#2F3A40]">
                  {participant.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        {participants.length > 4 && (
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-full rounded-2xl border border-[#E2E6E8] bg-white px-4 py-3 text-sm font-semibold text-[#3AAFA9] shadow-sm transition hover:bg-[#F9FBFB]"
          >
            {isOpen ? "참석자 접기" : `참석자 ${hiddenCount}명 더 보기`}
          </button>
        )}
      </div>
    </SectionBlock>
  );
}
