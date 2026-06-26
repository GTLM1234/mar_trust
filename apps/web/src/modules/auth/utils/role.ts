import type { UserRole } from "../../../types/auth";

export function parseRoleParam(value: string | null): Extract<UserRole, "CLIENT" | "SELLER"> {
  if (value === "vendedor" || value === "seller") {
    return "SELLER";
  }

  return "CLIENT";
}

export function roleLabel(role: UserRole) {
  if (role === "SELLER") {
    return "vendedor";
  }

  if (role === "ADMIN") {
    return "administrador";
  }

  return "cliente";
}
