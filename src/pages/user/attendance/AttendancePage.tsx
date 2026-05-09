import { useNavigate } from "react-router-dom";
import { AppShell } from "../../../shared/ui/app-shell/AppShell";
import { BuddyCard } from "../../../shared/ui/buddy-card/BuddyCard";
import { PageTitle } from "../../../shared/ui/page-title/PageTitle";
import { SectionBlock } from "../../../shared/ui/section-block/SectionBlock";
import { AttendanceStatCard } from "../../../widgets/attendance-stat-card/AttendanceStatCard";
import { AppTopBar } from "../../../shared/ui/app-topbar/AppTopBar";

const attendanceLogMock = [
  "2026-03-01 · English Tuesday Session",
  "2026-03-08 · Weekend Free Talking",
  "2026-03-15 · English Tuesday Session",
  "2026-03-22 · Networking Meetup"
];

export function AttendancePage() {
  const navigate = useNavigate();

  return (
    <AppShell>
      <AppTopBar
        title="Buddy"
        showBackButton={true}
        onBack={() => navigate("/mypage")}
      />
      <PageTitle title="출석 현황" subtitle="내 출석 통계와 기록을 확인할 수 있어요." />

      <div className="space-y-6">
        <SectionBlock title="출석 통계">
          <AttendanceStatCard totalAttendance={14} monthlyAttendance={3} percentile={12} />
        </SectionBlock>

        <SectionBlock title="출석왕">
          <BuddyCard>
            <div className="space-y-2 text-sm text-buddyText">
              <div>🥇 Alex · 32회</div>
              <div>🥈 Jamie · 27회</div>
              <div>🥉 Chris · 21회</div>
            </div>
          </BuddyCard>
        </SectionBlock>

        <SectionBlock title="출석 기록">
          <div className="space-y-3">
            {attendanceLogMock.map((item) => (
              <BuddyCard key={item}>
                <div className="text-sm text-buddyText">{item}</div>
              </BuddyCard>
            ))}
          </div>
        </SectionBlock>
      </div>
    </AppShell>
  );
}
