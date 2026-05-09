// import { HomePage } from "../../pages/user/home/HomePage";
import { MySessionsPage } from "../../pages/user/my-sessions/MySessionsPage";
import { SessionDetailPage } from "../../pages/user/session-detail/SessionDetailPage";
import { SessionMembersPage } from "../../pages/user/session-members/SessionMembersPage";
import { SessionLikePage } from "../../pages/user/session-like/SessionLikePage";
import { MySessionReviewPage } from "../../pages/user/my-session-review/MySessionReviewPage";
import { MyPage } from "../../pages/user/mypage/MyPage";
// import { AttendancePage } from "../../pages/user/attendance/AttendancePage";
import { UserProfilePage } from "../../pages/user/user-profile/UserProfilePage";
import { BadgeManagePage } from "../../pages/user/badge-manage/BadgeManagePage";
import { AdminSessionListPage } from "../../pages/admin/session/session-list/AdminSessionListPage";
import { AdminSessionCreatePage } from "../../pages/admin/session/session-create/AdminSessionCreatePage";
import { AdminSessionManagePage } from "../../pages/admin/session/session-manage/AdminSessionManagePage";
import { AdminSessionHistoryDetailPage } from "../../pages/admin/session/session-history/session-history-detail/AdminSessionHistoryDetailPage";
import { AdminParticipantManagePage } from "../../pages/admin/participant-manage/AdminParticipantManagePage";
import { AdminParticipantAddPage } from "../../pages/admin/participant-add/AdminParticipantAddPage";
import { AdminTableResultPage } from "../../pages/admin/table-result/AdminTableResultPage";
import { AdminUserListPage } from "../../pages/admin/user-list/AdminUserListPage";
import { AdminUserDetailPage } from "../../pages/admin/user-detail/AdminUserDetailPage";
import { AdminUserBadgePage } from "../../pages/admin/user-badge/AdminUserBadgePage";
import { AdminUserCreatePage } from "../../pages/admin/user-create/AdminUserCreatePage";
import { LoginPage } from "../../pages/login/LoginPage";
import { AdminRouteGuard } from "./AdminRouteGuard";
import { TempHomePage } from "../../pages/user/home/TempHomePage";
import { TempAttendancePage } from "../../pages/user/attendance/tempHome/TempAttendancePage";
import { AdminAttendanceAwardPage } from "../../pages/admin/attendance-award/AdminAttendanceAwardPage";

import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "./RootLayout";
import { AdminSessionTopicManagePage } from "../../pages/admin/topic/topic-manage/AdminSessionTopicManagePage";
import { AdminSessionTopicCreatePage } from "../../pages/admin/topic/topic-create/AdminSessionTopicCreatePage";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <TempHomePage />,
        // element: <HomePage />, TODO : 추후 유저 페이지 개발되면 라우트 변경 예정
      },
      {
        path: "/my-sessions",
        element: <MySessionsPage />,
      },
      {
        path: "/my-sessions/:sessionId/review",
        element: <MySessionReviewPage />,
      },
      {
        path: "/sessions/:sessionId",
        element: <SessionDetailPage />,
      },
      {
        path: "/sessions/:sessionId/members",
        element: <SessionMembersPage />,
      },
      {
        path: "/sessions/:sessionId/likes",
        element: <SessionLikePage />,
      },
      {
        path: "/mypage",
        element: <MyPage />,
      },
      {
        path: "/mypage/badges",
        element: <BadgeManagePage />,
      },
      {
        path: "/:sessionId/attendance",
        element: <TempAttendancePage />,
      },
      {
        path: "/users/:userId",
        element: <UserProfilePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },

      {
        path: "/admin",
        element: <AdminRouteGuard />,
        children: [
          {
            index: true,
            element: <Navigate to="sessions" replace />,
          },
          {
            path: "sessions",
            element: <AdminSessionListPage />,
          },
          {
            path: "sessions/create",
            element: <AdminSessionCreatePage />,
          },
          {
            path: "sessions/:sessionId",
            element: <AdminSessionManagePage />,
          },
          {
            path: "session-history/:sessionId",
            element: <AdminSessionHistoryDetailPage />,
          },
          {
            path: "sessions/:sessionId/participants",
            element: <AdminParticipantManagePage />,
          },
          {
            path: "sessions/:sessionId/participants/add",
            element: <AdminParticipantAddPage />,
          },
          {
            path: "sessions/:sessionId/tables",
            element: <AdminTableResultPage />,
          },
          {
            path: "sessions/:sessionId/topic",
            element: <AdminSessionTopicManagePage />,
          },
          {
            path: "sessions/:sessionId/topic/create",
            element: <AdminSessionTopicCreatePage />,
          },
          {
            path: "users",
            element: <AdminUserListPage />,
          },
          {
            path: "users/create",
            element: <AdminUserCreatePage />,
          },
          {
            path: "users/:userId",
            element: <AdminUserDetailPage />,
          },
          {
            path: "users/:userId/badges",
            element: <AdminUserBadgePage />,
          },
          {
            path: "attendance-award",
            element: <AdminAttendanceAwardPage />,
          },
        ],
      },
    ],
  },
]);
