import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AppShell } from "../../../../shared/ui/app-shell/AppShell";
import { PageTitle } from "../../../../shared/ui/page-title/PageTitle";
import { AppHeader } from "../../../../shared/ui/app-header/AppHeader";
import { BottomActionBar } from "../../../../shared/ui/bottom-action-bar/BottomActionBar";
import { BuddyButton } from "../../../../shared/ui/buddy-button/BuddyButton";
import { unwrapApiResponse } from "../../../../features/client-common/unwrapApiResponse";
import React, { useEffect, useMemo, useState } from "react";
import type { AttendanceSessionItem } from "../../../../features/user/attendance/attendance-session/model/AttendanceSessionItem";
import { getAttendanceSessions } from "../../../../features/user/attendance/attendance-session/api/GetAttendanceSessions";
import { createAttendanceWord } from "../../../../features/user/attendance/attendance-word/api/CreateAttendanceWord";
import { CheckCircle2 } from "lucide-react";
import { AttendanceHeroCard } from "./temp-home-attendanceHero-card/AttendanceHeroCard";
import { UserInfoInput } from "./temp-home-userInfo-input/UserInfoInput";
import { WordInput } from "./temp-home-word/WordInput";
import { ChooseDate } from "./temp-home-chooseDate/ChooseDate";
import type { GetTopicResponse } from "../../../../features/admin/topic/topic-get/model/GetTopicResponse";
import { getTopicQeustions } from "../../../../features/admin/topic/topic-get/api/GetTopic";
import { TopicSection } from "./temp-home-topic/HempHomeTopic";

export type TempAttendanceForm = {
  name: string;
  nickname: string;
  phrase: string;
  example: string;
};

export function TempAttendancePage222() {
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const [sessionList, setSessionList] = useState<AttendanceSessionItem[]>([]);
  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [topic, setTopic] = useState<GetTopicResponse | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TempAttendanceForm>({
    defaultValues: {
      name: "",
      nickname: "",
      phrase: "",
    },
  });

  const watchedName = watch("name");
  const watchedNickname = watch("nickname");
  const watchedWord = watch("phrase");

  const displayName = useMemo(() => {
    const name = watchedName.trim();
    const nickname = watchedNickname.trim();

    if (name === "" && nickname === "") return "참석자";
    if (name !== "" && nickname === "") return name;
    if (name === "" && nickname !== "") return nickname;

    return `${nickname} · ${name}`;
  }, [watchedName, watchedNickname]);

  useEffect(() => {
    const fetchTopicQuestions = async () => {
      try {
        const response = await getTopicQeustions(Number(sessionId));
        const data = unwrapApiResponse(response);
        setTopic(data);
      } catch (error) {
        console.error("세션 목록 조회 실패", error);
      }
    };

    fetchTopicQuestions();
  }, [sessionId]);

  const selectedSession = useMemo(() => {
    return sessionList.find(
      (session) => String(session.sessionId) === String(sessionId)
    );
  }, [sessionList, sessionId]);

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
  }, [selectedSession]);

  const onSubmit = async (form: TempAttendanceForm) => {
    try {
      const response = await createAttendanceWord({
        sessionId: Number(sessionId),
        name: form.name.trim(),
        nickname: form.nickname.trim(),
        phrase: form.phrase.trim(),
        example: form.example.trim() === "" ? null : form.example.trim(),
      });

      unwrapApiResponse(response);

      window.alert("출석이 저장되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("출석 저장 실패", error);
      window.alert(
        "출석 저장에 실패했습니다. 이름, 닉네임, 참석 세션을 다시 확인해주세요."
      );
    }
  };

  return (
    <AppShell hasBottomBar>
      <AppHeader showBackButton title="Buddy" onBack={() => navigate("/")} />

      <PageTitle
        title="출석 체크"
        subtitle="오늘 참석한 세션과 본인 정보를 입력해주세요."
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6 pb-36">
          <AttendanceHeroCard
            displayName={displayName}
            selectedSession={selectedSession}
            phrase={watchedWord}
          />

          <ChooseDate
            isSessionLoading={isSessionLoading}
            selectedSession={selectedSession}
          />

          <TopicSection
            topicTitle={topic?.mainTopic}
            topicQuestions={topic?.questions}
          />

          <UserInfoInput errors={errors} register={register} />

          <WordInput errors={errors} register={register} />
        </div>

        <BottomActionBar>
          <div className="grid grid-cols-1 gap-3">
            <BuddyButton
              fullWidth
              type="submit"
              leftIcon={<CheckCircle2 size={18} />}
              disabled={
                isSubmitting || isSessionLoading || sessionList.length === 0
              }
            >
              {isSubmitting ? "출석 저장 중..." : "출석 완료"}
            </BuddyButton>

            <BuddyButton
              fullWidth
              type="button"
              variant="secondary"
              onClick={() => navigate("/")}
            >
              취소
            </BuddyButton>
          </div>
        </BottomActionBar>
      </form>
    </AppShell>
  );
}

type FormFieldProps = {
  children: React.ReactNode;
  errorMessage?: string;
};

export function FormField({ children, errorMessage }: FormFieldProps) {
  return (
    <div>
      {children}

      {errorMessage != null && (
        <p className="mt-1.5 text-sm font-medium text-red-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
