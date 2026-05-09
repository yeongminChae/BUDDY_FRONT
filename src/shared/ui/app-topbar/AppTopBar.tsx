import { useState } from "react";
import { AppHeader } from "../app-header/AppHeader";
import { AppDrawer } from "../app-drawer/UserDrawer";

type AppTopBarProps = {
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
};

export function AppTopBar({
  title = "Buddy",
  showBackButton = false,
  onBack,
}: AppTopBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      <AppHeader
        title={title}
        showBackButton={showBackButton}
        onBack={onBack}
        onMenuClick={() => setIsMenuOpen((prev) => prev == false)}
      />
      <AppDrawer open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
}
