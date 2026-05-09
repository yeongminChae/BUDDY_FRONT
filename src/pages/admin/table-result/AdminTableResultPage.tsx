import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppShell } from "../../../shared/ui/app-shell/AppShell";
import { PageTitle } from "../../../shared/ui/page-title/PageTitle";
import { BuddyButton } from "../../../shared/ui/buddy-button/BuddyButton";
import { BuddyTabs } from "../../../shared/ui/buddy-tabs/BuddyTabs";
import { BottomActionBar } from "../../../shared/ui/bottom-action-bar/BottomActionBar";
import { TableCard } from "../../../widgets/table-card/TableCard";
import { TableMemberRow } from "../../../widgets/table-card/TableMemberRow";
import { AppTopBar } from "../../../shared/ui/app-topbar/AppTopBar";
import { getTableAssignments } from "../../../features/admin/session-table/api/GetTableAssignments";
import { unwrapApiResponse } from "../../../features/client-common/unwrapApiResponse";
import type { GetTableAssignmentsResponse } from "../../../features/admin/session-table/model/GetTableAssignmentsResponse";
import { AppHeader } from "../../../shared/ui/app-header/AppHeader";
import { MoveTableModal } from "../../../widgets/table-card/MoveTableSheet";
import { updateTableAssignments } from "../../../features/admin/session-table/api/UpdateTableAssignments";
import type { TableMoveChange } from "../../../features/admin/session-table/model/update/UpdateTableAssignmentsRequest";
import { buildTableingResultHtml } from "./BuildTableingResultHtml";
import { createTableing } from "../../../features/admin/session-table/api/CreateTableing";

type AdminSessionLoadingProps = {
  onBackBtnClick: () => void;
};

type RoundType = "round1" | "round2";

type SelectedMember = {
  userId: number;
  name: string;
  nickname: string;
  email: string;
  level: number;
  currentTableNo: number;
};

export function AdminTableResultPage() {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const numericSessionId = Number(sessionId);

  const [round, setRound] = useState<RoundType>("round1");
  const [tableData, setTableData] =
    useState<GetTableAssignmentsResponse | null>(null);
  const [selectedMember, setSelectedMember] = useState<SelectedMember | null>(
    null
  );
  const [selectedTargetTableNo, setSelectedTargetTableNo] = useState<
    number | null
  >(null);
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editedChanges, setEditedChanges] = useState<TableMoveChange[]>([]);
  const [isEdited, setIsEdited] = useState(false);

  const fetchTableAssignments = async () => {
    try {
      const response = await getTableAssignments(numericSessionId);
      const data = unwrapApiResponse(response);
      setTableData(data);
    } catch (error) {
      console.error("테이블 결과 목록 조회 실패", error);
    }
  };

  useEffect(() => {
    fetchTableAssignments();
  }, [numericSessionId]);

  const handleSaveEditedTableing = async () => {
    if (editedChanges.length === 0) {
      navigate(`/admin/sessions/${numericSessionId}`);
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await updateTableAssignments(numericSessionId, {
        changes: editedChanges,
      });

      unwrapApiResponse(response);

      setEditedChanges([]);
      setIsEdited(false);

      await fetchTableAssignments();
      window.alert("저장되었습니다.");
    } catch (error) {
      console.error("테이블 이동 저장 실패", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseMoveModal = () => {
    setIsMoveModalOpen(false);
    setSelectedMember(null);
    setSelectedTargetTableNo(null);
  };

  const handleMemberRowClick = (
    member: {
      userId: number;
      name: string;
      nickname: string;
      email: string;
      level: number;
    },
    currentTableNo: number
  ) => {
    setSelectedMember({
      userId: member.userId,
      name: member.name,
      nickname: member.nickname,
      email: member.email,
      level: member.level,
      currentTableNo,
    });
    setSelectedTargetTableNo(null);
    setIsMoveModalOpen(true);
  };

  const handleConfirmMove = () => {
    if (
      selectedMember == null ||
      selectedTargetTableNo == null ||
      tableData == null
    )
      return;

    const roundNo = round === "round1" ? 1 : 2;
    const fromTableNo = selectedMember.currentTableNo;
    const toTableNo = selectedTargetTableNo;

    if (fromTableNo === toTableNo) {
      handleCloseMoveModal();

      return;
    }

    setTableData((prev) => {
      if (prev == null) return prev;

      const targetTables =
        round == "round1" ? [...prev.round1Tables] : [...prev.round2Tables];

      const updatedTables = targetTables.map((table) => {
        if (table.tableNo === fromTableNo) {
          return {
            ...table,
            members: table.members.filter(
              (member) => member.userId !== selectedMember.userId
            ),
          };
        }

        if (table.tableNo === toTableNo) {
          return {
            ...table,
            members: [
              ...table.members,
              {
                userId: selectedMember.userId,
                name: selectedMember.name,
                nickname: selectedMember.nickname,
                email: selectedMember.email,
                level: selectedMember.level,
              },
            ],
          };
        }

        return table;
      });

      if (round === "round1") {
        return {
          ...prev,
          round1Tables: updatedTables,
        };
      }

      return {
        ...prev,
        round2Tables: updatedTables,
      };
    });

    setEditedChanges((prev) => {
      const next = prev.filter(
        (change) =>
          (change.userId === selectedMember.userId &&
            change.roundNo === roundNo) === false
      );

      return [
        ...next,
        {
          userId: selectedMember.userId,
          name: selectedMember.name,
          roundNo,
          fromTableNo,
          toTableNo,
        },
      ];
    });

    setIsEdited(true);
    handleCloseMoveModal();
  };

  if (tableData == null) {
    return (
      <AdminSessionLoading
        onBackBtnClick={() => navigate(`/admin/sessions/${numericSessionId}`)}
      />
    );
  }

  const openTableingResultInNewTab = () => {
    if (tableData == null) return;

    const tables =
      round === "round1" ? tableData.round1Tables : tableData.round2Tables;
    const html = buildTableingResultHtml(numericSessionId, round, tables);

    const newWindow = window.open("", "_blank");

    if (newWindow == null) {
      window.alert("새 탭을 열 수 없습니다. 팝업 차단을 확인해주세요.");
      return;
    }

    if (newWindow) {
      newWindow.document.title = `${round} Table Result`;
      newWindow.document.body.innerHTML = html;
    }
  };

  const tableInfo =
    round === "round1" ? tableData.round1Tables : tableData.round2Tables;

  const runTabeling = async () => {
    try {
      setIsSubmitting(true);
      const response = await createTableing(Number(sessionId));

      unwrapApiResponse(response);
      await fetchTableAssignments();
    } catch (error) {
      console.error("테이블링 실패", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppShell hasBottomBar>
      <AppTopBar
        title="Buddy"
        showBackButton={true}
        onBack={() => navigate(`/admin/sessions/${numericSessionId}`)}
      />
      <PageTitle title="테이블 배치" />

      <BuddyTabs
        items={[
          { label: "Round 1", value: "round1" },
          { label: "Round 2", value: "round2" },
        ]}
        value={round}
        onChange={(value) => setRound(value as RoundType)}
      />

      <div className="space-y-4">
        {tableInfo.map((table) => (
          <TableCard
            key={`${round}-${table.tableNo}`}
            tableName={`${table.tableNo} · ${round === "round1" ? "Round 1" : "Round 2"}`}
            participantCount={table.members.length}
          >
            {table.members.map((member) => (
              <TableMemberRow
                key={`${round}-${table.tableNo}-${member.userId}`}
                name={member.name}
                nickname={member.nickname}
                email={member.email}
                level={member.level}
                onCardClick={() => handleMemberRowClick(member, table.tableNo)}
              />
            ))}
          </TableCard>
        ))}
      </div>

      <BottomActionBar>
        <div className="flex flex-col gap-3">
          <BuddyButton onClick={runTabeling} fullWidth disabled={isSubmitting}>
            {isSubmitting ? "재배치 중..." : "재배치"}
          </BuddyButton>
          <BuddyButton
            fullWidth
            variant={isEdited ? "primary" : "secondary"}
            onClick={
              isEdited ? handleSaveEditedTableing : openTableingResultInNewTab
            }
          >
            확인
          </BuddyButton>
        </div>
      </BottomActionBar>

      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="flex flex-col items-center gap-3 px-6 py-5 bg-white shadow-lg rounded-2xl">
            <div className="w-8 h-8 border-2 rounded-full animate-spin border-buddyLine border-t-buddyPrimary" />
            <p className="text-sm font-medium text-buddyText">
              테이블을 재배치하는 중...
            </p>
          </div>
        </div>
      )}

      <MoveTableModal
        open={isMoveModalOpen}
        member={selectedMember}
        tables={tableInfo}
        selectedTargetTableNo={selectedTargetTableNo}
        onSelectTable={setSelectedTargetTableNo}
        onClose={handleCloseMoveModal}
        onConfirm={handleConfirmMove}
        isSubmitting={isSubmitting}
      />
    </AppShell>
  );
}

const AdminSessionLoading = ({ onBackBtnClick }: AdminSessionLoadingProps) => {
  return (
    <AppShell>
      <div className="relative">
        <AppHeader showBackButton title="Buddy" onBack={onBackBtnClick} />
      </div>
      <PageTitle title="세션 관리" />

      <div className="flex flex-col items-center justify-center gap-3 mt-10">
        <div className="border-2 rounded-full h-7 w-7 animate-spin border-buddyLine border-t-buddyPrimary" />
        <p className="text-sm text-buddySubText">세션 정보를 불러오는 중...</p>
      </div>
    </AppShell>
  );
};
