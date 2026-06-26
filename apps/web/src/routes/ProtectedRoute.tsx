import { Navigate, Outlet, useLocation } from "react-router-dom";

import { roleDashboardPath } from "../contexts/AuthContext";
import { useAuth } from "../hooks/useAuth";
import type { UserRole } from "../types/auth";

type ProtectedRouteProps = {
  role: UserRole;
};

function loginRoleParam(role: UserRole) {
  if (role === "SELLER") {
    return "vendedor";
  }

  if (role === "ADMIN") {
    return "admin";
  }

  return "cliente";
}

export function ProtectedRoute({ role }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    const roleParam = loginRoleParam(role);
    const from = encodeURIComponent(location.pathname);

    return <Navigate replace to={`/login?role=${roleParam}&from=${from}`} />;
  }

  if (user.role !== role) {
    return <Navigate replace to={roleDashboardPath(user.role)} />;
  }

  return <Outlet />;
}
