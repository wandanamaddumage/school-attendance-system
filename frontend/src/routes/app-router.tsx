import type { User, UserRole } from "@/App"
import { TeacherDashboard } from "@/pages/teacher/teacher-dashboard"
import { AdminDashboard } from "@/pages/admin/admin-dashboard"
import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { LoginPage } from "@/pages/log-in/page"

interface AppRouterProps {
  currentUser: User | null
  onLogin: (user: User) => void
  onLogout: () => void
}

export const AppRouter: React.FC<AppRouterProps> = ({ currentUser, onLogin, onLogout }) => {
  const RequireAuth = ({ children, role }: { children: JSX.Element; role?: UserRole }) => {
    if (!currentUser) {
      return <Navigate to="/login" replace />
    }
    if (role && currentUser.role !== role) {
      return <Navigate to="/" replace />
    }
    return children
  }

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route
          path="/login"
          element={!currentUser ? <LoginPage onLogin={onLogin} /> : <Navigate to="/" replace />}
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <RequireAuth role="admin">
              <AdminDashboard user={currentUser!} onLogout={onLogout} />
            </RequireAuth>
          }
        />

        {/* Teacher Dashboard */}
        <Route
          path="/teacher"
          element={
            <RequireAuth role="teacher">
              <TeacherDashboard user={currentUser!} onLogout={onLogout} />
            </RequireAuth>
          }
        />

        {/* Default redirect */}
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
  )
}
