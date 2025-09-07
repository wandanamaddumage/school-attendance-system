import type { User, UserRole } from "@/App";
import { TeacherDashboard } from "@/pages/teacher/teacher-dashboard";
import { AdminDashboard } from "@/pages/admin/admin-dashboard";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { LoginPage } from "@/pages/log-in/page";

interface AppRouterProps {
  currentUser: User | null;
  onLogin: (user: User) => void;
  onLogout: () => void;
}

const RequireAuth: React.FC<{ children: JSX.Element; currentUser: User | null; role?: UserRole }> = ({
  children,
  currentUser,
  role,
}) => {
  if (!currentUser) return <Navigate to="/login" replace />;
  if (role && currentUser.role !== role) return <Navigate to="/" replace />;
  return children;
};

export const AppRouter: React.FC<AppRouterProps> = ({ currentUser, onLogin, onLogout }) => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!currentUser ? <LoginPage onLogin={onLogin} /> : <Navigate to="/" replace />}
        />

        <Route
          path="/admin"
          element={
            <RequireAuth currentUser={currentUser} role="admin">
              <AdminDashboard user={currentUser!} onLogout={onLogout} />
            </RequireAuth>
          }
        />

        <Route
          path="/teacher"
          element={
            <RequireAuth currentUser={currentUser} role="teacher">
              <TeacherDashboard user={currentUser!} onLogout={onLogout} />
            </RequireAuth>
          }
        />

        <Route
          path="/"
          element={
            currentUser ? (
              currentUser.role === "admin" ? (
                <Navigate to="/admin" replace />
              ) : (
                <Navigate to="/teacher" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};
