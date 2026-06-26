import { createBrowserRouter } from "react-router-dom";

import { DashboardLayout } from "../layouts/DashboardLayout";
import { PublicLayout } from "../layouts/PublicLayout";
import { ForgotPasswordPage } from "../modules/auth/pages/ForgotPasswordPage";
import { LoginPage } from "../modules/auth/pages/LoginPage";
import { RegisterPage } from "../modules/auth/pages/RegisterPage";
import { ClientDashboardPage } from "../pages/client/ClientDashboardPage";
import { SellerDashboardPage } from "../pages/seller/SellerDashboardPage";
import { AboutPage } from "../pages/public/AboutPage";
import { HomePage } from "../pages/public/HomePage";
import { HowItWorksPage } from "../pages/public/HowItWorksPage";
import { PublicSearchPage } from "../pages/public/PublicSearchPage";
import { StallDetailPage } from "../pages/public/StallDetailPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ProtectedRoute } from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/acerca", element: <AboutPage /> },
      { path: "/como-funciona", element: <HowItWorksPage /> },
      { path: "/buscar", element: <PublicSearchPage /> },
      { path: "/puestos/:stallId", element: <StallDetailPage /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  {
    element: <ProtectedRoute role="CLIENT" />,
    children: [
      {
        element: <DashboardLayout role="CLIENT" />,
        children: [
          { path: "/cliente", element: <ClientDashboardPage /> },
          { path: "/cliente/:section", element: <ClientDashboardPage /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute role="SELLER" />,
    children: [
      {
        element: <DashboardLayout role="SELLER" />,
        children: [
          { path: "/vendedor", element: <SellerDashboardPage /> },
          { path: "/vendedor/:section", element: <SellerDashboardPage /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
