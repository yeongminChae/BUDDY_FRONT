import { ChevronLeft, Menu } from "lucide-react";

type AppHeaderProps = {
  showBackButton?: boolean;
  title?: string;
  onBack?: () => void;
  onMenuClick?: () => void;
};

export function AppHeader({
  showBackButton = false,
  title = "Buddy",
  onBack,
  onMenuClick,
}: AppHeaderProps) {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-buddyLine bg-[#F7FBFA] px-5 py-4">
        <div className="flex items-center justify-between mx-auto max-w-buddy">
          <button
            type="button"
            onClick={showBackButton ? onBack : onMenuClick}
            className="flex items-center justify-center w-10 h-10 bg-transparent rounded-full text-buddyText"
          >
            {showBackButton ? <ChevronLeft size={22} /> : <Menu size={22} />}
          </button>

          <div className="text-lg font-semibold text-buddyPrimary">{title}</div>

          <div className="w-10 h-10" />
        </div>
      </header>

      <div className="h-[73px]" />
    </>
  );
}
