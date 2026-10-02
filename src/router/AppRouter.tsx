import { AuthPage } from "@/auth";
import { CalendarPage } from "@/calendar";
import { Navigate, Route, Routes } from "react-router";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useEffect } from "react";

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" replace />} />
      <Route
        path="/auth"
        element={
          status === "authenticated" ? (
            <Navigate to="/calendar" replace />
          ) : (
            <AuthPage />
          )
        }
      />
      <Route
        path="/calendar"
        element={
          status === "authenticated" ? (
            <CalendarPage />
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />
    </Routes>
  );
};
