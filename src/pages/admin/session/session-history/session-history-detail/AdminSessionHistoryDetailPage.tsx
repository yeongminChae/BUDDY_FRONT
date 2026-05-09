import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppShell } from "../../../../../shared/ui/app-shell/AppShell";
import { AppHeader } from "../../../../../shared/ui/app-header/AppHeader";
import { PageTitle } from "../../../../../shared/ui/page-title/PageTitle";
import { getAdminSessionHistoryDetail } from "../../../../../features/admin/session/session-past/api/GetAdminSessionHistoryDetail";
import { unwrapApiResponse } from "../../../../../features/client-common/unwrapApiResponse";
import type { GetAdminSessionHistoryDetailResponse } from "../../../../../features/admin/session/session-past/model/GetAdminSessionHistoryDetailResponse";
import { TopicSection } from "../session-history-topic/AdminSessionHistoryTopic";
import { TableResultSection } from "../session-hitory-table/AdminSessionHistoryTable";
import { SessionHeroCard } from "../session-history-heroCard/AdminSessionHistoryHeroCard";
import { AttendanceSummarySection } from "../session-history-attendance/AdminSessionHistoryAttendance";
import { ParticipantsSection } from "../session-history-participants/AdminSessionHistoryParticipants";
import { ApplicantsSection } from "../session-history-applications/AdminSessionHistoryApplications";

export function AdminSessionHistoryDetailPage() {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const [sessionData, setSessionData] = useState<
    GetAdminSessionHistoryDetailResponse | undefined
  >();

  useEffect(() => {
    const fetchSessionList = async () => {
      try {
        const response = await getAdminSessionHistoryDetail(Number(sessionId));
        const data = unwrapApiResponse(response);

        setSessionData(data);
      } catch (error) {
        console.error("세션 목록 조회 실패", error);
      }
    };

    fetchSessionList();
  }, [sessionId]);

  const attendanceSummary = sessionData?.attendanceSummary;

  return (
    <AppShell>
      <AppHeader
        showBackButton
        title="Buddy"
        onBack={() => navigate("/admin/sessions")}
      />

      <PageTitle
        title="종료 세션 기록"
        subtitle="종료된 세션의 참석자, 테이블 결과, 주제와 추천 표현을 확인해요."
      />

      <div className="pb-8 space-y-6">
        {sessionData != null && attendanceSummary != null ? (
          <>
            <SessionHeroCard
              title={sessionData.title}
              dateTime={sessionData.dateTime}
              place={sessionData.place}
              attendanceRate={sessionData.attendanceRate}
              attendedCount={attendanceSummary.attendedCount}
              appliedCount={attendanceSummary.appliedCount}
            />

            <AttendanceSummarySection
              attendedCount={attendanceSummary.attendedCount}
              appliedCount={attendanceSummary.appliedCount}
              noShowCount={attendanceSummary.noShowCount}
              attendanceRate={sessionData.attendanceRate}
            />

            <ApplicantsSection applicants={sessionData.applicants} />

            <ParticipantsSection participants={sessionData.participants} />

            <TableResultSection tableSummary={sessionData.tableSummary} />

            <TopicSection
              topicTitle={sessionData.topicTitle}
              topicQuestions={sessionData.topicQuestions}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 mt-10">
            <div className="border-2 rounded-full h-7 w-7 animate-spin border-buddyLine border-t-buddyPrimary" />

            <p className="text-sm text-buddySubText">
              종료 세션 기록을 불러오는 중...
            </p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
