export type UserRole = "CLIENT" | "SELLER" | "ADMIN";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type LoginInput = {
  email: string;
  role: UserRole;
};

export type RegisterInput = {
  name: string;
  email: string;
  role: UserRole;
};
