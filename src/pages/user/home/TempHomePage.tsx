import { useNavigate } from "react-router-dom";
import { AppShell } from "../../../shared/ui/app-shell/AppShell";
import { AppTopBar } from "../../../shared/ui/app-topbar/AppTopBar";
import { SectionBlock } from "../../../shared/ui/section-block/SectionBlock";
import { BuddyCard } from "../../../shared/ui/buddy-card/BuddyCard";
import { BuddyButton } from "../../../shared/ui/buddy-button/BuddyButton";
// import { BottomActionBar } from "../../../shared/ui/bottom-action-bar/BottomActionBar";
import { useEffect, useState } from "react";
import type { AttendanceSessionItem } from "../../../features/user/attendance/attendance-session/model/AttendanceSessionItem";
import { getAttendanceSessions } from "../../../features/user/attendance/attendance-session/api/GetAttendanceSessions";
import { unwrapApiResponse } from "../../../features/client-common/unwrapApiResponse";
import { BuddyLoadingCard } from "../../../shared/ui/buddy-loading/BuddyLoadingCard";

export function TempHomePage() {
  const navigate = useNavigate();
  const [sessionList, setSessionList] = useState<AttendanceSessionItem[]>([]);
  const [isSessionLoading, setIsSessionLoading] = useState(true);

  useEffect(() => {
    const fetchAttendanceSessions = async () => {
      try {
        setIsSessionLoading(true);

        const response = await getAttendanceSessions();
        const data = unwrapApiResponse(response);

        const sessions = data.sessions ?? [];
        setSessionList(sessions);
      } catch (error) {
        console.error("출석 세션 목록 조회 실패", error);
        window.alert("출석 가능한 세션을 불러오지 못했습니다.");
      } finally {
        setIsSessionLoading(false);
      }
    };

    fetchAttendanceSessions();
  }, []);

  const sessions = sessionList ?? [];

  return (
    <AppShell hasBottomBar>
      <AppTopBar title="Buddy" />

      <div className="space-y-6">
        <SectionBlock
          title="임시 출석 페이지"
          description="오늘 참석하는 세션을 선택하고 출석 체크를 진행해주세요."
        >
          <BuddyCard className="space-y-3">
            <div className="text-base font-semibold text-buddyText">
              오늘 참석 예정이신가요?
            </div>
            <div className="text-sm leading-6 text-buddySubText">
              현재는 MVP 테스트 단계예요.
              <br />
              세션 선택 후 이름, 닉네임, 오늘의 영단어를 입력해 출석을
              완료해주세요.
            </div>
          </BuddyCard>
        </SectionBlock>

        <SectionBlock title="오늘의 세션">
          {isSessionLoading ? (
            <BuddyLoadingCard
              title="세션을 불러오고 있어요"
              description="오늘 참석 가능한 세션을 확인하는 중입니다."
            />
          ) : sessions.length === 0 ? (
            <BuddyCard className="p-5">
              <div className="text-sm text-buddySubText">
                출석 가능한 세션이 없습니다.
              </div>
            </BuddyCard>
          ) : (
            <div className="space-y-5">
              {sessions.map((session) => (
                <BuddyCard key={session.sessionId} className="p-5">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <div className="text-xl font-semibold text-buddyText">
                        {session.title}
                      </div>
                      <div className="text-sm text-buddySubText">
                        {session.startsAt} · {session.location}
                      </div>
                    </div>

                    <BuddyButton
                      fullWidth
                      onClick={() =>
                        navigate(`/${session.sessionId}/attendance`)
                      }
                    >
                      출석 체크하러 가기
                    </BuddyButton>
                  </div>
                </BuddyCard>
              ))}
            </div>
          )}
        </SectionBlock>
      </div>

      {/* <BottomActionBar>
        <div className="grid grid-cols-1 gap-3">
          <BuddyButton fullWidth onClick={() => navigate("/attendance")}>
            출석 체크
          </BuddyButton>
        </div>
      </BottomActionBar> */}
    </AppShell>
  );
}
