import React from "react"
import type { User } from "@/App"
import { LoginForm } from "./components/form/login-form"

interface LoginPageProps {
  onLogin: (user: User) => void
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return <LoginForm onLogin={onLogin} />
}
