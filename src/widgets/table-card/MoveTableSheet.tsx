type MoveTableModalProps = {
  open: boolean;
  member: {
    userId: number;
    name: string;
    email: string;
    level: number;
    currentTableNo: number;
  } | null;
  tables: Array<{
    tableNo: number;
    members: Array<unknown>;
  }>;
  selectedTargetTableNo: number | null;
  onSelectTable: (tableNo: number) => void;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting?: boolean;
};

export function MoveTableModal({
  open,
  member,
  tables,
  selectedTargetTableNo,
  onSelectTable,
  onClose,
  onConfirm,
  isSubmitting = false,
}: MoveTableModalProps) {
  if (open == false || member == null) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
      <div className="w-full max-w-sm p-5 bg-white shadow-xl rounded-2xl">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-buddyText">테이블 이동</h2>
          <p className="mt-1 text-sm text-buddySubText">
            <span className="font-medium text-buddyText">{member.name}</span>{" "}
            님을 이동할 테이블을 선택해주세요.
          </p>
        </div>

        <div className="space-y-2">
          {tables.map((table) => {
            const isCurrentTable = table.tableNo === member.currentTableNo;
            const isSelected = table.tableNo === selectedTargetTableNo;

            return (
              <button
                key={table.tableNo}
                type="button"
                disabled={isCurrentTable}
                onClick={() => onSelectTable(table.tableNo)}
                className={[
                  "w-full rounded-xl border px-4 py-3 text-left",
                  isSelected
                    ? "border-buddyPrimary bg-buddyPrimary/5"
                    : "border-buddyLine bg-white",
                  isCurrentTable ? "opacity-50" : "",
                ].join(" ")}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-buddyText">
                      {table.tableNo}번 테이블
                    </div>
                    <div className="text-sm text-buddySubText">
                      인원 {table.members.length}명
                    </div>
                  </div>

                  <div className="text-xs">
                    {isCurrentTable && (
                      <span className="text-buddySubText">현재 테이블</span>
                    )}
                    {isSelected && (
                      <span className="text-buddyPrimary">선택됨</span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex gap-2 mt-5">
          <button
            type="button"
            className="flex-1 px-4 py-3 text-sm border rounded-xl border-buddyLine"
            onClick={onClose}
            disabled={isSubmitting}
          >
            취소
          </button>
          <button
            type="button"
            className="flex-1 px-4 py-3 text-sm text-white rounded-xl bg-buddyPrimary disabled:opacity-50"
            onClick={onConfirm}
            disabled={selectedTargetTableNo == null || isSubmitting}
          >
            {isSubmitting ? "이동 중..." : "이동하기"}
          </button>
        </div>
      </div>
    </div>
  );
}
