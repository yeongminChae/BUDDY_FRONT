import { useNavigate, useParams } from "react-router-dom";
import { AppShell } from "../../../../shared/ui/app-shell/AppShell";
import { AppHeader } from "../../../../shared/ui/app-header/AppHeader";
import { PageTitle } from "../../../../shared/ui/page-title/PageTitle";
import { SectionBlock } from "../../../../shared/ui/section-block/SectionBlock";
import { BuddyCard } from "../../../../shared/ui/buddy-card/BuddyCard";
import { BuddyButton } from "../../../../shared/ui/buddy-button/BuddyButton";
import {
  CalendarDays,
  Edit3,
  MessageSquareText,
  Plus,
  Send,
} from "lucide-react";
import { MiniMetricCard } from "../../../../shared/ui/buddy-metric-card/MiniMetricCard";
import { useEffect, useState } from "react";
import type { GetTopicResponse } from "../../../../features/admin/topic/topic-get/model/GetTopicResponse";
import { unwrapApiResponse } from "../../../../features/client-common/unwrapApiResponse";
import { getTopicQeustions } from "../../../../features/admin/topic/topic-get/api/GetTopic";
import { buildIntroMessage } from "../topic-create/AdminSessionTopicCreatePage";
import { BuddyLoadingCard } from "../../../../shared/ui/buddy-loading/BuddyLoadingCard";

export function AdminSessionTopicManagePage() {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const [topic, setTopic] = useState<GetTopicResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopicQuestions = async () => {
      try {
        const response = await getTopicQeustions(Number(sessionId));
        const data = unwrapApiResponse(response);
        setTopic(data);
      } catch (error) {
        console.error("세션 목록 조회 실패", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopicQuestions();
  }, [sessionId]);

  if (isLoading) {
    return (
      <BuddyLoadingCard
        title="주제를 불러오고 있어요"
        description="오늘 세션의 주제를 확인하는 중입니다."
      />
    );
  }

  if (topic?.mainTopic == null || topic.mainTopic.trim() == "") {
    navigate(`/admin/sessions/${sessionId}/topic/create`, {
      replace: true,
    });

    return null;
  }

  return (
    <AppShell>
      <AppHeader
        showBackButton
        title="Buddy"
        onBack={() => navigate(`/admin/sessions/${sessionId}`)}
      />

      <PageTitle
        title="주제 관리"
        subtitle="등록된 세션 주제와 토론 질문을 확인해요."
      />

      <div className="pb-8 space-y-6">
        <SessionTopicHeroCard
          sessionTitle={topic.sessionTitle}
          startsAt={topic.startsAt}
          location={topic.location}
          mainTopic={topic.mainTopic}
          questionCount={topic.questions.length}
          onEditClick={() => {
            // TODO 수정 화면 또는 인라인 수정 연결 예정
            window.alert("수정 기능은 이후 연결 예정입니다.");
          }}
        />

        <SectionBlock
          title="안내 문구"
          description="참여자에게 공유할 수 있는 모임 안내 메시지예요."
        >
          <BuddyCard>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#DFF5F3] text-[#3AAFA9]">
                  <Send size={17} />
                </div>

                <div>
                  <p className="text-sm font-bold text-[#2F3A40]">
                    공유용 안내 메시지
                  </p>
                  <p className="mt-0.5 text-xs text-[#6C7A80]">
                    카카오톡이나 공지에 그대로 활용할 수 있어요.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-[#F3F5F6] px-4 py-4">
                <p className="whitespace-pre-line text-sm leading-7 text-[#2F3A40]">
                  {buildIntroMessage(topic.mainTopic)}
                </p>
              </div>
            </div>
          </BuddyCard>
        </SectionBlock>

        <SectionBlock
          title="토론 질문"
          description="세션에서 사용할 질문 목록이에요."
        >
          <div className="space-y-3">
            {topic.questions
              .sort((a, b) => a.orderNo - b.orderNo)
              .map((question) => (
                <TopicQuestionViewCard
                  key={question.questionId}
                  orderNo={question.orderNo}
                  content={question.content}
                  onEditClick={() => {
                    // TODO 질문별 인라인 수정 연결 예정
                    window.alert("질문 수정 기능은 이후 연결 예정입니다.");
                  }}
                />
              ))}
          </div>
        </SectionBlock>

        <SectionBlock
          title="관리"
          description="주제 수정이나 신규 질문 추가는 이후 연결할 예정이에요."
        >
          <div className="grid grid-cols-1 gap-3">
            <BuddyButton
              fullWidth
              variant="secondary"
              leftIcon={<Edit3 size={17} />}
              onClick={() => {
                window.alert("전체 수정 기능은 이후 연결 예정입니다.");
              }}
            >
              전체 수정하기
            </BuddyButton>

            <BuddyButton
              fullWidth
              variant="secondary"
              leftIcon={<Plus size={17} />}
              onClick={() => {
                window.alert("질문 추가 기능은 이후 연결 예정입니다.");
              }}
            >
              질문 추가하기
            </BuddyButton>
          </div>
        </SectionBlock>
      </div>
    </AppShell>
  );
}

type SessionTopicHeroCardProps = {
  sessionTitle: string;
  startsAt: string;
  location: string;
  mainTopic: string;
  questionCount: number;
  onEditClick: () => void;
};

function SessionTopicHeroCard({
  sessionTitle,
  startsAt,
  location,
  mainTopic,
  questionCount,
  onEditClick,
}: SessionTopicHeroCardProps) {
  return (
    <BuddyCard>
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#3AAFA9]">
              REGISTERED TOPIC
            </p>

            <h2 className="mt-2 text-lg font-bold leading-snug text-[#2F3A40]">
              {mainTopic}
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-[#6C7A80]">
              이 세션에 등록된 토론 주제예요.
            </p>
          </div>

          <button
            type="button"
            onClick={onEditClick}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#F3F5F6] text-[#3AAFA9] transition hover:bg-[#DFF5F3]"
            aria-label="주제 수정"
          >
            <Edit3 size={17} />
          </button>
        </div>

        <div className="rounded-2xl bg-[#F3F5F6] px-4 py-3">
          <p className="text-sm font-bold text-[#2F3A40]">{sessionTitle}</p>

          <div className="mt-2 space-y-1.5 text-xs text-[#6C7A80]">
            <div className="flex items-center gap-2">
              <CalendarDays size={14} />
              <span>{startsAt}</span>
            </div>

            <div className="flex items-center gap-2">
              <MessageSquareText size={14} />
              <span>{location}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <MiniMetricCard label="질문 수" value={`${questionCount}개`} />
          <MiniMetricCard label="상태" value="등록 완료" />
        </div>
      </div>
    </BuddyCard>
  );
}

type TopicQuestionViewCardProps = {
  orderNo: number;
  content: string;
  onEditClick?: () => void;
};

function TopicQuestionViewCard({
  orderNo,
  content,
  onEditClick,
}: TopicQuestionViewCardProps) {
  return (
    <BuddyCard>
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#DFF5F3] text-xs font-bold text-[#3AAFA9]">
          {orderNo}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm leading-6 text-[#2F3A40]">{content}</p>
        </div>

        {onEditClick != null && (
          <button
            type="button"
            onClick={onEditClick}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-[#6C7A80] transition hover:bg-[#F3F5F6] hover:text-[#3AAFA9]"
            aria-label={`질문 ${orderNo} 수정`}
          >
            <Edit3 size={15} />
          </button>
        )}
      </div>
    </BuddyCard>
  );
}
