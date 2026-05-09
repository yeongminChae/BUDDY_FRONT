import { useState } from "react";
import type { AdminSessionHistoryApplicant } from "../../../../../features/admin/session/session-past/model/AdminSessionHistoryApplicant";
import { SectionBlock } from "../../../../../shared/ui/section-block/SectionBlock";

type ApplicantsSectionProps = {
  applicants: AdminSessionHistoryApplicant[];
};

export function ApplicantsSection({ applicants }: ApplicantsSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const visibleApplicants = isOpen ? applicants : applicants.slice(0, 4);
  const hiddenCount = Math.max(applicants.length - visibleApplicants.length, 0);

  return (
    <SectionBlock
      title="확정 신청자"
      description={`총 ${applicants.length}명이 최종 신청 상태였어요.`}
    >
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          {visibleApplicants.map((applicant) => (
            <div
              key={applicant.userId}
              className="rounded-2xl border border-[#E2E6E8] bg-white px-4 py-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F3F5F6] text-sm font-bold text-[#6C7A80]">
                  {applicant.name.slice(0, 1)}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#2F3A40]">
                    {applicant.name}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-[#6C7A80]">
                    {applicant.nickname ?? "-"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {applicants.length > 4 && (
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-full rounded-2xl border border-[#E2E6E8] bg-white px-4 py-3 text-sm font-semibold text-[#3AAFA9] shadow-sm transition hover:bg-[#F9FBFB]"
          >
            {isOpen
              ? "확정 신청자 접기"
              : `확정 신청자 ${hiddenCount}명 더 보기`}
          </button>
        )}
      </div>
    </SectionBlock>
  );
}
