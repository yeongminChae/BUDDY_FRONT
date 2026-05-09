#!/usr/bin/env bash
set -euo pipefail

PROJECT_NAME="${1:-buddy-app}"

echo "📦 Creating Vite React+TS app: ${PROJECT_NAME}"
npm create vite@latest "${PROJECT_NAME}" -- --template react-ts

cd "${PROJECT_NAME}"

echo "🧹 Cleaning default files"
rm -rf src

mkdir -p   src/app/router   src/app/styles   src/pages/admin/session-list   src/pages/admin/session-create   src/pages/admin/session-manage   src/pages/admin/participant-manage   src/pages/admin/participant-add   src/pages/admin/table-result   src/shared/lib   src/shared/ui/app-shell   src/shared/ui/app-header   src/shared/ui/page-title   src/shared/ui/buddy-button   src/shared/ui/buddy-card

cat > package.json <<'EOF'
{
  "name": "buddy-app",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "lucide-react": "^0.468.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.0.0",
    "tailwind-merge": "^2.5.5"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.6.3",
    "vite": "^5.4.10"
  }
}
EOF

cat > tailwind.config.js <<'EOF'
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        buddyPrimary: "#3AAFA9",
        buddyPrimarySoft: "#6BCBC7",
        buddyBg: "#F3F5F6",
        buddyCard: "#FFFFFF",
        buddyText: "#2F3A40",
        buddySubText: "#6C7A80",
        buddyLine: "#E2E6E8",
        buddyMintLight: "#DFF5F3",
        buddyDanger: "#E05A5A"
      },
      borderRadius: {
        buddyCard: "16px",
        buddyInput: "12px",
        buddyButton: "12px"
      },
      boxShadow: {
        buddyCard: "0 6px 14px rgba(0,0,0,0.05)",
        buddyButton: "0 6px 12px rgba(58,175,169,0.20)"
      },
      maxWidth: {
        buddy: "420px"
      }
    }
  },
  plugins: []
};
EOF

cat > postcss.config.js <<'EOF'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
EOF

cat > src/main.tsx <<'EOF'
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import "./app/styles/tokens.css";
import "./app/styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
EOF

cat > src/app/router/index.tsx <<'EOF'
import { createBrowserRouter, Navigate } from "react-router-dom";
import { AdminSessionListPage } from "../../pages/admin/session-list/AdminSessionListPage";
import { AdminSessionCreatePage } from "../../pages/admin/session-create/AdminSessionCreatePage";
import { AdminSessionManagePage } from "../../pages/admin/session-manage/AdminSessionManagePage";
import { AdminParticipantManagePage } from "../../pages/admin/participant-manage/AdminParticipantManagePage";
import { AdminParticipantAddPage } from "../../pages/admin/participant-add/AdminParticipantAddPage";
import { AdminTableResultPage } from "../../pages/admin/table-result/AdminTableResultPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/admin/sessions" replace />
  },
  {
    path: "/admin/sessions",
    element: <AdminSessionListPage />
  },
  {
    path: "/admin/sessions/create",
    element: <AdminSessionCreatePage />
  },
  {
    path: "/admin/sessions/:sessionId",
    element: <AdminSessionManagePage />
  },
  {
    path: "/admin/sessions/:sessionId/participants",
    element: <AdminParticipantManagePage />
  },
  {
    path: "/admin/sessions/:sessionId/participants/add",
    element: <AdminParticipantAddPage />
  },
  {
    path: "/admin/sessions/:sessionId/tables",
    element: <AdminTableResultPage />
  }
]);
EOF

cat > src/app/styles/tokens.css <<'EOF'
:root {
  --buddy-primary: #3AAFA9;
  --buddy-primary-soft: #6BCBC7;
  --buddy-bg: #F3F5F6;
  --buddy-card: #FFFFFF;
  --buddy-text: #2F3A40;
  --buddy-sub-text: #6C7A80;
  --buddy-line: #E2E6E8;
  --buddy-mint-light: #DFF5F3;
  --buddy-danger: #E05A5A;
}
EOF

cat > src/app/styles/globals.css <<'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

html,
body,
#root {
  min-height: 100%;
}

body {
  margin: 0;
  background: var(--buddy-bg);
  color: var(--buddy-text);
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Noto Sans KR",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

* {
  box-sizing: border-box;
}

button,
input,
textarea,
select {
  font: inherit;
}
EOF

cat > src/shared/lib/cn.ts <<'EOF'
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
EOF

cat > src/shared/ui/app-shell/AppShell.tsx <<'EOF'
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

type AppShellProps = {
  children: ReactNode;
  hasBottomBar?: boolean;
};

export function AppShell({ children, hasBottomBar = false }: AppShellProps) {
  return (
    <div className="min-h-screen bg-buddyBg">
      <div
        className={cn(
          "mx-auto max-w-buddy px-5 pb-8 pt-0",
          hasBottomBar ? "pb-28" : "pb-8"
        )}
      >
        {children}
      </div>
    </div>
  );
}
EOF

cat > src/shared/ui/app-header/AppHeader.tsx <<'EOF'
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
  onMenuClick
}: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-10 -mx-5 mb-6 border-b border-buddyLine bg-[#F7FBFA] px-5 py-4">
      <div className="mx-auto flex max-w-buddy items-center justify-between">
        <button
          type="button"
          onClick={showBackButton ? onBack : onMenuClick}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-buddyText"
        >
          {showBackButton ? <ChevronLeft size={22} /> : <Menu size={22} />}
        </button>

        <div className="text-lg font-semibold text-buddyPrimary">{title}</div>

        <div className="h-10 w-10" />
      </div>
    </header>
  );
}
EOF

cat > src/shared/ui/page-title/PageTitle.tsx <<'EOF'
type PageTitleProps = {
  title: string;
  subtitle?: string;
};

export function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <div className="mb-5">
      <h1 className="text-2xl font-bold text-buddyText">{title}</h1>
      {subtitle ? (
        <p className="mt-1 text-sm text-buddySubText">{subtitle}</p>
      ) : null}
    </div>
  );
}
EOF

cat > src/shared/ui/buddy-button/BuddyButton.tsx <<'EOF'
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

type BuddyButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "md" | "lg";
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export function BuddyButton({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}: BuddyButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-buddyButton font-semibold transition",
        size === "md" ? "h-11 px-4 text-sm" : "h-[52px] px-5 text-base",
        fullWidth ? "w-full" : "w-auto",
        variant === "primary" &&
          "bg-gradient-to-r from-buddyPrimary to-buddyPrimarySoft text-white shadow-buddyButton",
        variant === "secondary" &&
          "border border-buddyPrimary bg-white text-buddyPrimary",
        variant === "ghost" && "bg-transparent text-buddyText",
        variant === "danger" &&
          "border border-buddyDanger bg-white text-buddyDanger",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {leftIcon}
      <span>{children}</span>
      {rightIcon}
    </button>
  );
}
EOF

cat > src/shared/ui/buddy-card/BuddyCard.tsx <<'EOF'
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

type BuddyCardProps = {
  children: ReactNode;
  padding?: "sm" | "md" | "lg";
  className?: string;
};

export function BuddyCard({
  children,
  padding = "md",
  className
}: BuddyCardProps) {
  return (
    <div
      className={cn(
        "rounded-buddyCard bg-buddyCard shadow-buddyCard",
        padding === "sm" && "p-4",
        padding === "md" && "p-5",
        padding === "lg" && "p-6",
        className
      )}
    >
      {children}
    </div>
  );
}
EOF

cat > src/pages/admin/session-list/AdminSessionListPage.tsx <<'EOF'
import { Plus } from "lucide-react";
import { AppShell } from "../../../shared/ui/app-shell/AppShell";
import { AppHeader } from "../../../shared/ui/app-header/AppHeader";
import { PageTitle } from "../../../shared/ui/page-title/PageTitle";
import { BuddyButton } from "../../../shared/ui/buddy-button/BuddyButton";
import { BuddyCard } from "../../../shared/ui/buddy-card/BuddyCard";

const mockSessions = [
  {
    id: 1,
    title: "English Tuesday Session",
    dateTime: "5월 10일 오후 7:00",
    place: "잠실 스터디룸",
    participant: "8 / 12"
  },
  {
    id: 2,
    title: "React Workshop",
    dateTime: "5월 15일 오후 6:30",
    place: "강남 스터디룸",
    participant: "5 / 10"
  }
];

export function AdminSessionListPage() {
  return (
    <AppShell>
      <AppHeader title="Buddy" />
      <PageTitle title="세션 관리" />
      <BuddyButton fullWidth leftIcon={<Plus size={18} />}>
        세션 생성
      </BuddyButton>

      <div className="mt-4 space-y-4">
        {mockSessions.map((session) => (
          <BuddyCard key={session.id}>
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-base font-semibold text-buddyText">
                  {session.title}
                </h2>
                <BuddyButton variant="secondary" size="md">
                  관리하기
                </BuddyButton>
              </div>

              <div className="text-sm text-buddySubText">{session.dateTime}</div>
              <div className="text-sm text-buddySubText">{session.place}</div>
              <div className="text-sm text-buddySubText">👥 {session.participant}</div>
            </div>
          </BuddyCard>
        ))}
      </div>
    </AppShell>
  );
}
EOF

cat > src/pages/admin/session-create/AdminSessionCreatePage.tsx <<'EOF'
import { AppShell } from "../../../shared/ui/app-shell/AppShell";
import { AppHeader } from "../../../shared/ui/app-header/AppHeader";
import { PageTitle } from "../../../shared/ui/page-title/PageTitle";
import { BuddyButton } from "../../../shared/ui/buddy-button/BuddyButton";
import { BuddyCard } from "../../../shared/ui/buddy-card/BuddyCard";

export function AdminSessionCreatePage() {
  return (
    <AppShell>
      <AppHeader showBackButton title="Buddy" />
      <PageTitle title="세션 생성" />
      <BuddyCard>
        <div className="space-y-3 text-sm text-buddySubText">
          <div>세션명 입력 필드</div>
          <div>날짜 입력 필드</div>
          <div>시간 입력 필드</div>
          <div>장소 입력 필드</div>
          <div>정원 입력 필드</div>
          <div>주제 입력 필드</div>
        </div>
      </BuddyCard>

      <div className="mt-4">
        <BuddyButton fullWidth>세션 생성</BuddyButton>
      </div>
    </AppShell>
  );
}
EOF

cat > src/pages/admin/session-manage/AdminSessionManagePage.tsx <<'EOF'
import { AppShell } from "../../../shared/ui/app-shell/AppShell";
import { AppHeader } from "../../../shared/ui/app-header/AppHeader";
import { PageTitle } from "../../../shared/ui/page-title/PageTitle";
import { BuddyCard } from "../../../shared/ui/buddy-card/BuddyCard";

export function AdminSessionManagePage() {
  return (
    <AppShell>
      <AppHeader showBackButton title="Buddy" />
      <PageTitle title="English Tuesday Session 관리" />
      <BuddyCard>
        <div className="space-y-2 text-sm text-buddySubText">
          <div>5월 10일 오후 7:00</div>
          <div>잠실 스터디룸</div>
          <div>참여 인원 8 / 12</div>
        </div>
      </BuddyCard>

      <div className="mt-4 space-y-3">
        <BuddyCard className="text-buddyPrimary">참석자 관리</BuddyCard>
        <BuddyCard className="text-buddyPrimary">자리배치 실행</BuddyCard>
        <BuddyCard className="text-buddyPrimary">주제 관리</BuddyCard>
        <BuddyCard className="text-buddyDanger">세션 종료</BuddyCard>
      </div>
    </AppShell>
  );
}
EOF

cat > src/pages/admin/participant-manage/AdminParticipantManagePage.tsx <<'EOF'
import { AppShell } from "../../../shared/ui/app-shell/AppShell";
import { AppHeader } from "../../../shared/ui/app-header/AppHeader";
import { PageTitle } from "../../../shared/ui/page-title/PageTitle";
import { BuddyButton } from "../../../shared/ui/buddy-button/BuddyButton";
import { BuddyCard } from "../../../shared/ui/buddy-card/BuddyCard";

const mockParticipants = [
  { id: 1, name: "Alex", email: "alex@email.com" },
  { id: 2, name: "Jamie", email: "jamie@email.com" },
  { id: 3, name: "Chris", email: "chris@email.com" }
];

export function AdminParticipantManagePage() {
  return (
    <AppShell hasBottomBar>
      <AppHeader showBackButton title="Buddy" />
      <PageTitle title="참석자 관리" />

      <BuddyCard className="mb-4">
        <div className="space-y-1">
          <div className="font-semibold text-buddyText">English Tuesday Session</div>
          <div className="text-sm text-buddySubText">8 / 12명</div>
        </div>
      </BuddyCard>

      <BuddyButton fullWidth>+ 참석자 추가</BuddyButton>

      <div className="mt-4 space-y-3">
        {mockParticipants.map((participant) => (
          <BuddyCard key={participant.id}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-semibold text-buddyText">{participant.name}</div>
                <div className="text-sm text-buddySubText">{participant.email}</div>
              </div>
              <BuddyButton variant="danger">제거</BuddyButton>
            </div>
          </BuddyCard>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t border-buddyLine bg-white px-5 py-4">
        <div className="mx-auto max-w-buddy">
          <BuddyButton fullWidth>자리배치 실행</BuddyButton>
        </div>
      </div>
    </AppShell>
  );
}
EOF

cat > src/pages/admin/participant-add/AdminParticipantAddPage.tsx <<'EOF'
import { AppShell } from "../../../shared/ui/app-shell/AppShell";
import { AppHeader } from "../../../shared/ui/app-header/AppHeader";
import { PageTitle } from "../../../shared/ui/page-title/PageTitle";
import { BuddyCard } from "../../../shared/ui/buddy-card/BuddyCard";
import { BuddyButton } from "../../../shared/ui/buddy-button/BuddyButton";

const selectedUsers = ["Alex", "Jamie", "Chris"];
const allUsers = [
  { id: 1, name: "Alex", email: "alex@email.com", selected: true },
  { id: 2, name: "Jamie", email: "jamie@email.com", selected: true },
  { id: 3, name: "Chris", email: "chris@email.com", selected: true },
  { id: 4, name: "Mina", email: "mina@email.com", selected: false }
];

export function AdminParticipantAddPage() {
  return (
    <AppShell hasBottomBar>
      <AppHeader showBackButton title="Buddy" />
      <PageTitle title="참석자 추가" />

      <BuddyCard className="mb-4 text-sm text-buddySubText">
        닉네임 / 이름 검색 필드
      </BuddyCard>

      <div className="mb-4 flex flex-wrap gap-2">
        {selectedUsers.map((name) => (
          <div
            key={name}
            className="inline-flex items-center gap-2 rounded-full bg-buddyMintLight px-3 py-2 text-sm text-buddyText"
          >
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-semibold">
              {name.charAt(0)}
            </span>
            <span>{name}</span>
            <button type="button" className="text-buddyDanger">
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {allUsers.map((user) => (
          <BuddyCard key={user.id}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-semibold text-buddyText">{user.name}</div>
                <div className="text-sm text-buddySubText">{user.email}</div>
              </div>
              {user.selected ? (
                <BuddyButton variant="danger">제거</BuddyButton>
              ) : (
                <BuddyButton>+ 추가</BuddyButton>
              )}
            </div>
          </BuddyCard>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t border-buddyLine bg-white px-5 py-4">
        <div className="mx-auto max-w-buddy">
          <BuddyButton fullWidth>추가 완료</BuddyButton>
        </div>
      </div>
    </AppShell>
  );
}
EOF

cat > src/pages/admin/table-result/AdminTableResultPage.tsx <<'EOF'
import { AppShell } from "../../../shared/ui/app-shell/AppShell";
import { AppHeader } from "../../../shared/ui/app-header/AppHeader";
import { PageTitle } from "../../../shared/ui/page-title/PageTitle";
import { BuddyButton } from "../../../shared/ui/buddy-button/BuddyButton";
import { BuddyCard } from "../../../shared/ui/buddy-card/BuddyCard";

const tables = [
  {
    id: 1,
    name: "Table 1",
    members: ["Alex", "Jamie", "Chris", "Mina"]
  },
  {
    id: 2,
    name: "Table 2",
    members: ["John", "Emma", "Kevin"]
  }
];

export function AdminTableResultPage() {
  const isEdited = false;

  return (
    <AppShell hasBottomBar>
      <AppHeader showBackButton title="Buddy" />
      <PageTitle title="테이블 배치" />

      <div className="mb-4 flex gap-6 border-b border-buddyLine">
        <button className="border-b-2 border-buddyPrimary pb-2 text-sm font-semibold text-buddyPrimary">
          Round 1
        </button>
        <button className="pb-2 text-sm font-semibold text-buddySubText">
          Round 2
        </button>
      </div>

      <div className="space-y-4">
        {tables.map((table) => (
          <BuddyCard key={table.id}>
            <div className="mb-3 flex items-center justify-between">
              <div className="font-semibold text-buddyText">{table.name}</div>
              <div className="text-sm text-buddySubText">
                {table.members.length}명
              </div>
            </div>

            <div className="space-y-2">
              {table.members.map((member) => (
                <div
                  key={member}
                  className="flex items-center justify-between rounded-xl bg-[#F8FAFA] px-4 py-3"
                >
                  <div>
                    <div className="font-medium text-buddyText">{member}</div>
                    <div className="text-sm text-buddySubText">
                      member@email.com
                    </div>
                  </div>
                  <button className="text-buddySubText">{">"}</button>
                </div>
              ))}
            </div>
          </BuddyCard>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t border-buddyLine bg-white px-5 py-4">
        <div className="mx-auto flex max-w-buddy flex-col gap-3">
          <BuddyButton fullWidth>재배치</BuddyButton>
          <BuddyButton
            fullWidth
            variant={isEdited ? "primary" : "secondary"}
          >
            확인
          </BuddyButton>
        </div>
      </div>
    </AppShell>
  );
}
EOF

echo "📥 Installing dependencies"
npm install

echo ""
echo "✅ Scaffold created successfully."
echo "👉 Next steps:"
echo "   cd ${PROJECT_NAME}"
echo "   npm run dev"
