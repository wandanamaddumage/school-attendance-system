"use client"

import { useState } from "react"
import { LoginForm } from "./components/login-form"
import { TeacherDashboard } from "./components/teacher-dashboard"
import { AdminDashboard } from "./components/admin-dashboard"

export type UserRole = "admin" | "teacher"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

export default function HomePage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const handleLogin = (user: User) => {
    setCurrentUser(user)
  }

  const handleLogout = () => {
    setCurrentUser(null)
  }

  if (!currentUser) {
    return <LoginForm onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-background">
      {currentUser.role === "admin" ? (
        <AdminDashboard user={currentUser} onLogout={handleLogout} />
      ) : (
        <TeacherDashboard user={currentUser} onLogout={handleLogout} />
      )}
    </div>
  )
}
