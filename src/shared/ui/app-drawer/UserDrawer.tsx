import { useNavigate } from "react-router-dom";
import {
  Award,
  CalendarDays,
  Home,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { DrawerFrame, DrawerHeader, DrawerMenuItem } from "./Drawer";

type UserDrawerProps = {
  open?: boolean;
  onClose?: () => void;
};

export function AppDrawer({ open = false, onClose }: UserDrawerProps) {
  const navigate = useNavigate();

  if (open === false) return null;

  const handleMove = (path: string) => {
    navigate(path);
    onClose?.();
  };

  return (
    <DrawerFrame onClose={onClose}>
      <DrawerHeader
        eyebrow="BUDDY MENU"
        title="어디로 이동할까요?"
        description="현재 MVP에서는 홈과 관리자 모드를 먼저 사용할 수 있어요."
      />

      <div className="space-y-2">
        <DrawerMenuItem
          icon={<Home size={18} />}
          title="홈"
          description="Buddy 메인 화면으로 이동"
          onClick={() => handleMove("/")}
        />

        <DrawerMenuItem
          icon={<CalendarDays size={18} />}
          title="내 모임"
          description="MVP 이후 오픈 예정"
          disabled
          onClick={() => handleMove("/my-sessions")}
        />

        <DrawerMenuItem
          icon={<UserRound size={18} />}
          title="마이페이지"
          description="MVP 이후 오픈 예정"
          disabled
          onClick={() => handleMove("/mypage")}
        />

        <DrawerMenuItem
          icon={<Award size={18} />}
          title="출석 현황"
          description="MVP 이후 오픈 예정"
          disabled
          onClick={() => handleMove("/attendance")}
        />
      </div>

      <div className="mt-3 rounded-2xl bg-[#F3F5F6] p-2">
        <DrawerMenuItem
          icon={<ShieldCheck size={18} />}
          title="관리자 모드"
          description="세션과 유저를 관리하는 화면으로 이동"
          accent
          onClick={() => handleMove("/admin/sessions")}
        />
      </div>
    </DrawerFrame>
  );
}
