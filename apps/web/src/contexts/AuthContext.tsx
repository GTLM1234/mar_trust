import {
  createContext,
  type ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";

import type { AuthUser, LoginInput, RegisterInput, UserRole } from "../types/auth";

const STORAGE_KEY = "martrust.auth.user";

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (input: LoginInput) => void;
  register: (input: RegisterInput) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredUser(): AuthUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawUser = window.localStorage.getItem(STORAGE_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as AuthUser;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

function buildSessionUser(input: LoginInput | RegisterInput): AuthUser {
  const fallbackName =
    input.role === "SELLER" ? "Vendedor MarTrust" : "Cliente MarTrust";

  return {
    id: crypto.randomUUID(),
    name: "name" in input ? input.name : fallbackName,
    email: input.email,
    role: input.role,
  };
}

function persistUser(user: AuthUser | null) {
  if (typeof window === "undefined") {
    return;
  }

  if (!user) {
    window.localStorage.removeItem(STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function roleDashboardPath(role: UserRole) {
  if (role === "SELLER") {
    return "/vendedor";
  }

  if (role === "ADMIN") {
    return "/admin";
  }

  return "/cliente";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => readStoredUser());

  const startSession = useCallback((input: LoginInput | RegisterInput) => {
    // Temporary frontend session. Replace this with FastAPI JWT + refresh token
    // once the backend authentication contract is implemented.
    const nextUser = buildSessionUser(input);

    setUser(nextUser);
    persistUser(nextUser);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    persistUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login: startSession,
      register: startSession,
      logout,
    }),
    [logout, startSession, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
