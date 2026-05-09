import { Award, CalendarDays, LayoutDashboard, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DrawerFrame, DrawerHeader, DrawerMenuItem } from "./Drawer";

type AdminDrawerProps = {
  open?: boolean;
  onClose?: () => void;
};

export function AdminDrawer({ open = false, onClose }: AdminDrawerProps) {
  const navigate = useNavigate();

  if (open === false) return null;

  const handleMove = (path: string) => {
    navigate(path);
    onClose?.();
  };

  return (
    <DrawerFrame onClose={onClose}>
      <DrawerHeader
        eyebrow="ADMIN MENU"
        title="관리자 메뉴"
        description="세션 운영, 유저 관리, 출석왕 현황을 확인해요."
      />

      <div className="space-y-2">
        <DrawerMenuItem
          icon={<LayoutDashboard size={18} />}
          title="일반 모드로 보기"
          description="사용자 화면으로 돌아가기"
          accent
          onClick={() => handleMove("/")}
        />

        <DrawerMenuItem
          icon={<CalendarDays size={18} />}
          title="세션 관리"
          description="세션 생성, 운영, 종료 기록 확인"
          onClick={() => handleMove("/admin/sessions")}
        />

        <DrawerMenuItem
          icon={<Users size={18} />}
          title="유저 관리"
          description="유저 목록, 상세 정보, 신규 등록"
          onClick={() => handleMove("/admin/users")}
        />

        <DrawerMenuItem
          icon={<Award size={18} />}
          title="출석왕 관리"
          description="월별 출석왕 후보와 랭킹 확인"
          onClick={() => handleMove("/admin/attendance-award")}
        />
      </div>
    </DrawerFrame>
  );
}
