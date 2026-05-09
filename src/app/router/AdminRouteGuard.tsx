import { Navigate, Outlet } from "react-router-dom";

export function AdminRouteGuard() {
  const accessToken = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  if (accessToken == null) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "ADMIN") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
